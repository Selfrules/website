/**
 * Admin Analytics Data API - FIREBASE VERSION
 * Provides detailed analytics data for admin dashboard
 * Protected by admin authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import {
  COLLECTIONS,
  queryDocumentsAdmin,
  AnalyticsEvent,
} from '@/lib/firebase';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { Timestamp } from 'firebase-admin/firestore';
import { addCorsHeaders } from '@/lib/middleware/cors';

interface AnalyticsData {
  overview: {
    totalPageViews: number;
    uniqueVisitors: number;
    avgSessionDuration: number;
    bounceRate: number;
    trends: {
      pageViews: number;
      visitors: number;
      duration: number;
      bounce: number;
    };
  };
  topPages: Array<{
    path: string;
    views: number;
    avgTime: number;
  }>;
  traffic: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
  events: Array<{
    name: string;
    count: number;
    category: string;
  }>;
}

/**
 * GET /api/admin/analytics-data
 * Retrieve analytics data with optional time range
 * Query params: timeRange (7d, 30d, 90d) - defaults to 30d
 */
export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get time range from query params
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get('timeRange') || '30d';

    // Calculate date range
    const now = new Date();
    const daysAgo = timeRange === '7d' ? 7 : timeRange === '90d' ? 90 : 30;
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - daysAgo);
    const startTimestamp = Timestamp.fromDate(startDate);

    // Fetch all analytics events in time range
    const events = await queryDocumentsAdmin<AnalyticsEvent>(
      COLLECTIONS.ANALYTICS_EVENTS,
      [{ field: 'timestamp', operator: '>=', value: startTimestamp }],
      'timestamp',
      'desc',
      10000 // Limit for performance
    );

    // Process events to calculate statistics
    const pageViews = events.filter((e) => e.eventType === 'page_view');
    const uniqueSessions = new Set(events.map((e) => e.sessionId)).size;

    // Calculate page view counts by path
    const pageViewsByPath: Record<string, { views: number; totalTime: number }> = {};
    pageViews.forEach((event) => {
      const page = event.page || '/';
      if (!pageViewsByPath[page]) {
        pageViewsByPath[page] = { views: 0, totalTime: 0 };
      }
      pageViewsByPath[page].views++;
      // Estimate time on page (placeholder logic)
      pageViewsByPath[page].totalTime += 180; // 3 min average
    });

    // Get top pages
    const topPages = Object.entries(pageViewsByPath)
      .map(([path, data]) => ({
        path,
        views: data.views,
        avgTime: Math.round(data.totalTime / data.views),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Calculate daily traffic
    const trafficByDate: Record<string, { views: number; sessions: Set<string> }> = {};
    pageViews.forEach((event) => {
      const date = new Date((event.timestamp as any).toDate?.() || event.timestamp).toISOString().split('T')[0];
      if (!trafficByDate[date]) {
        trafficByDate[date] = { views: 0, sessions: new Set() };
      }
      trafficByDate[date].views++;
      trafficByDate[date].sessions.add(event.sessionId);
    });

    const traffic = Object.entries(trafficByDate)
      .map(([date, data]) => ({
        date,
        views: data.views,
        visitors: data.sessions.size,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Count events by type
    const eventCounts: Record<string, number> = {};
    events.forEach((event) => {
      const eventName = event.eventName || event.eventType;
      eventCounts[eventName] = (eventCounts[eventName] || 0) + 1;
    });

    const topEvents = Object.entries(eventCounts)
      .map(([name, count]) => ({
        name,
        count,
        category: name.includes('click') ? 'engagement' :
                 name.includes('submit') ? 'conversion' :
                 name.includes('share') ? 'social' : 'interaction',
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate trends (compare to previous period)
    const previousStartDate = new Date(startDate);
    previousStartDate.setDate(previousStartDate.getDate() - daysAgo);
    const previousStartTimestamp = Timestamp.fromDate(previousStartDate);

    const previousEvents = await queryDocumentsAdmin<AnalyticsEvent>(
      COLLECTIONS.ANALYTICS_EVENTS,
      [
        { field: 'timestamp', operator: '>=', value: previousStartTimestamp },
        { field: 'timestamp', operator: '<', value: startTimestamp }
      ],
      'timestamp',
      'desc',
      10000
    );

    const previousPageViews = previousEvents.filter((e) => e.eventType === 'page_view').length;
    const previousSessions = new Set(previousEvents.map((e) => e.sessionId)).size;

    const pageViewTrend = previousPageViews > 0
      ? ((pageViews.length - previousPageViews) / previousPageViews) * 100
      : 0;
    const visitorTrend = previousSessions > 0
      ? ((uniqueSessions - previousSessions) / previousSessions) * 100
      : 0;

    // Calculate bounce rate (sessions with only 1 page view)
    const sessionPageViews: Record<string, number> = {};
    pageViews.forEach((event) => {
      sessionPageViews[event.sessionId] = (sessionPageViews[event.sessionId] || 0) + 1;
    });
    const bouncedSessions = Object.values(sessionPageViews).filter((count) => count === 1).length;
    const bounceRate = uniqueSessions > 0 ? (bouncedSessions / uniqueSessions) * 100 : 0;

    // Prepare response data
    const analyticsData: AnalyticsData = {
      overview: {
        totalPageViews: pageViews.length,
        uniqueVisitors: uniqueSessions,
        avgSessionDuration: 245, // Placeholder - would need session tracking
        bounceRate: Math.round(bounceRate * 10) / 10,
        trends: {
          pageViews: Math.round(pageViewTrend * 10) / 10,
          visitors: Math.round(visitorTrend * 10) / 10,
          duration: 0, // Placeholder
          bounce: 0, // Placeholder
        },
      },
      topPages,
      traffic,
      events: topEvents,
    };

    const response = NextResponse.json(
      formatSuccessResponse(analyticsData),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}
