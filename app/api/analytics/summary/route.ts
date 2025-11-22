/**
 * Analytics Summary API - FIREBASE VERSION
 * Provides aggregated analytics data for dashboard
 * Migrated from Prisma to Firestore with client-side aggregations
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  COLLECTIONS,
  AnalyticsEvent,
  queryDocumentsAdmin,
  countDocumentsAdmin,
} from '@/lib/firebase';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/security';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * GET /api/analytics/summary
 * Get comprehensive analytics summary for dashboard
 * NOTE: Uses client-side aggregations due to Firestore limitations
 * TODO: Consider Cloud Functions for better performance with large datasets
 */
export async function GET(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startTimestamp = Timestamp.fromDate(startDate);

    // Build base filter for date range
    const baseFilters: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: any }> = [
      { field: 'timestamp', operator: '>=', value: startTimestamp },
    ];

    // Fetch all events for the time period (needed for client-side aggregations)
    // Limit to reasonable dataset size for MVP
    const allEvents = await queryDocumentsAdmin<AnalyticsEvent>(
      COLLECTIONS.ANALYTICS_EVENTS,
      baseFilters,
      'timestamp',
      'desc',
      10000 // Reasonable limit for dashboard analytics
    );

    // Run count queries in parallel
    const [
      totalEvents,
      pageViewsCount,
      ctaClicksCount,
      formSubmissionsCount,
      chatInteractionsCount,
      calendarActionsCount,
      blogViewsCount,
    ] = await Promise.all([
      // Total events count
      countDocumentsAdmin(COLLECTIONS.ANALYTICS_EVENTS, baseFilters),

      // Page views count
      countDocumentsAdmin(COLLECTIONS.ANALYTICS_EVENTS, [
        ...baseFilters,
        { field: 'eventType', operator: '==', value: 'page_view' },
      ]),

      // CTA clicks count (events where eventName contains 'cta')
      // Note: Firestore doesn't have 'contains', so we filter client-side
      Promise.resolve(allEvents.filter(e => e.eventName?.includes('cta')).length),

      // Form submissions count
      countDocumentsAdmin(COLLECTIONS.ANALYTICS_EVENTS, [
        ...baseFilters,
        { field: 'eventType', operator: '==', value: 'form_submission' },
      ]),

      // Chat interactions count
      countDocumentsAdmin(COLLECTIONS.ANALYTICS_EVENTS, [
        ...baseFilters,
        { field: 'eventType', operator: '==', value: 'chat' },
      ]),

      // Calendar actions count
      countDocumentsAdmin(COLLECTIONS.ANALYTICS_EVENTS, [
        ...baseFilters,
        { field: 'eventType', operator: '==', value: 'calendar' },
      ]),

      // Blog views count
      countDocumentsAdmin(COLLECTIONS.ANALYTICS_EVENTS, [
        ...baseFilters,
        { field: 'eventName', operator: '==', value: 'blog_view' },
      ]),
    ]);

    // Client-side aggregations

    // Unique sessions (distinct sessionId)
    const uniqueSessionsSet = new Set(allEvents.map(e => e.sessionId));
    const uniqueSessions = uniqueSessionsSet.size;

    // Top pages by views (groupBy page for page_view events)
    const pageViewEvents = allEvents.filter(e => e.eventType === 'page_view' && e.page);
    const pageViewsMap = new Map<string, number>();
    pageViewEvents.forEach(e => {
      if (e.page) {
        pageViewsMap.set(e.page, (pageViewsMap.get(e.page) || 0) + 1);
      }
    });
    const topPages = Array.from(pageViewsMap.entries())
      .map(([page, count]) => ({ page, views: count }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Events by type distribution (groupBy eventType)
    const eventTypeMap = new Map<string, number>();
    allEvents.forEach(e => {
      eventTypeMap.set(e.eventType, (eventTypeMap.get(e.eventType) || 0) + 1);
    });
    const eventsByType = Array.from(eventTypeMap.entries())
      .map(([type, count]) => ({
        type,
        count,
        percentage: ((count / totalEvents) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count);

    // Events by day (time series) - client-side grouping by date
    const eventsByDayMap = new Map<string, number>();
    allEvents.forEach(e => {
      const date = (e.timestamp as Timestamp).toDate().toISOString().split('T')[0]; // YYYY-MM-DD
      eventsByDayMap.set(date, (eventsByDayMap.get(date) || 0) + 1);
    });
    const eventsByDay = Array.from(eventsByDayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Recent events (last 50)
    const recentEvents = allEvents
      .slice(0, 50)
      .map(e => ({
        id: e.id,
        eventType: e.eventType,
        eventName: e.eventName,
        page: e.page,
        timestamp: (e.timestamp as Timestamp).toDate().toISOString(),
      }));

    // Conversion funnel analysis
    const conversionFunnel = calculateConversionFunnel(allEvents);

    // Calculate engagement metrics
    const avgEventsPerSession = uniqueSessions > 0
      ? (totalEvents / uniqueSessions).toFixed(2)
      : '0';

    const summary = {
      overview: {
        totalEvents,
        uniqueSessions,
        pageViews: pageViewsCount,
        avgEventsPerSession: parseFloat(avgEventsPerSession),
        timeRange: {
          startDate: startDate.toISOString(),
          endDate: new Date().toISOString(),
          days,
        },
      },
      interactions: {
        ctaClicks: ctaClicksCount,
        formSubmissions: formSubmissionsCount,
        chatInteractions: chatInteractionsCount,
        calendarActions: calendarActionsCount,
        blogViews: blogViewsCount,
      },
      topPages,
      eventsByType,
      eventsByDay,
      recentEvents,
      conversionFunnel,
    };

    const response = NextResponse.json(
      formatSuccessResponse(summary),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Calculate conversion funnel metrics
 * Client-side implementation using all events
 */
function calculateConversionFunnel(allEvents: AnalyticsEvent[]) {
  // Extract unique sessions for each funnel step
  const visitedSessions = new Set(
    allEvents
      .filter(e => e.eventType === 'page_view')
      .map(e => e.sessionId)
  );

  const viewedBlogSessions = new Set(
    allEvents
      .filter(e => e.eventName === 'blog_view')
      .map(e => e.sessionId)
  );

  const clickedCTASessions = new Set(
    allEvents
      .filter(e => e.eventName?.includes('cta'))
      .map(e => e.sessionId)
  );

  const startedChatSessions = new Set(
    allEvents
      .filter(e => e.eventType === 'chat')
      .map(e => e.sessionId)
  );

  const bookedCallSessions = new Set(
    allEvents
      .filter(e => e.eventName === 'booking_completed')
      .map(e => e.sessionId)
  );

  const visitedCount = visitedSessions.size;
  const viewedBlogCount = viewedBlogSessions.size;
  const clickedCTACount = clickedCTASessions.size;
  const startedChatCount = startedChatSessions.size;
  const bookedCallCount = bookedCallSessions.size;

  return {
    steps: [
      {
        name: 'Visited Site',
        count: visitedCount,
        percentage: 100,
      },
      {
        name: 'Viewed Blog',
        count: viewedBlogCount,
        percentage: visitedCount > 0 ? ((viewedBlogCount / visitedCount) * 100).toFixed(1) : '0',
      },
      {
        name: 'Clicked CTA',
        count: clickedCTACount,
        percentage: visitedCount > 0 ? ((clickedCTACount / visitedCount) * 100).toFixed(1) : '0',
      },
      {
        name: 'Started Chat',
        count: startedChatCount,
        percentage: visitedCount > 0 ? ((startedChatCount / visitedCount) * 100).toFixed(1) : '0',
      },
      {
        name: 'Booked Call',
        count: bookedCallCount,
        percentage: visitedCount > 0 ? ((bookedCallCount / visitedCount) * 100).toFixed(1) : '0',
      },
    ],
    conversionRate: visitedCount > 0
      ? ((bookedCallCount / visitedCount) * 100).toFixed(2)
      : '0',
  };
}

export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, req);
}
