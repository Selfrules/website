/**
 * Analytics API Routes - FIREBASE VERSION
 * Handles event tracking and analytics data
 * Migrated from Prisma to Firestore
 * NOTE: Complex aggregations (groupBy) temporarily simplified
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  COLLECTIONS,
  AnalyticsEvent,
  queryDocumentsAdmin,
  createDocumentAdmin,
  countDocumentsAdmin,
} from '@/lib/firebase';
import { createAnalyticsEventSchema, getAnalyticsEventsSchema } from '@/lib/validations/schemas';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { analyticsRateLimiter, apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * GET /api/analytics
 * Retrieve analytics events with filtering
 */
export async function GET(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    const { searchParams } = new URL(req.url);
    const params = {
      eventType: searchParams.get('eventType') || undefined,
      eventName: searchParams.get('eventName') || undefined,
      sessionId: searchParams.get('sessionId') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      limit: parseInt(searchParams.get('limit') || '100'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const validatedParams = getAnalyticsEventsSchema.parse(params);

    // Build Firestore filters
    const filters: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: any }> = [];
    if (validatedParams.eventType) {
      filters.push({ field: 'eventType', operator: '==', value: validatedParams.eventType });
    }
    if (validatedParams.eventName) {
      filters.push({ field: 'eventName', operator: '==', value: validatedParams.eventName });
    }
    if (validatedParams.sessionId) {
      filters.push({ field: 'sessionId', operator: '==', value: validatedParams.sessionId });
    }

    if (validatedParams.startDate) {
      filters.push({
        field: 'timestamp',
        operator: '>=',
        value: Timestamp.fromDate(new Date(validatedParams.startDate)),
      });
    }
    if (validatedParams.endDate) {
      filters.push({
        field: 'timestamp',
        operator: '<=',
        value: Timestamp.fromDate(new Date(validatedParams.endDate)),
      });
    }

    const [events, total] = await Promise.all([
      queryDocumentsAdmin<AnalyticsEvent>(
        COLLECTIONS.ANALYTICS_EVENTS,
        filters,
        'timestamp',
        'desc',
        validatedParams.limit
      ),
      countDocumentsAdmin(COLLECTIONS.ANALYTICS_EVENTS, filters),
    ]);

    const response = NextResponse.json(
      formatSuccessResponse(events, undefined, {
        total,
        limit: validatedParams.limit,
        offset: validatedParams.offset,
      }),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/analytics
 * Track a new analytics event
 */
export async function POST(req: NextRequest) {
  try {
    await analyticsRateLimiter.checkLimit(req);

    const body = await req.json();
    const validatedData = createAnalyticsEventSchema.parse(body);

    // Extract user agent and IP for tracking
    const userAgent = req.headers.get('user-agent') || undefined;
    const forwarded = req.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || undefined;
    const referrer = req.headers.get('referer') || undefined;

    const event = await createDocumentAdmin<AnalyticsEvent>(
      COLLECTIONS.ANALYTICS_EVENTS,
      {
        eventType: validatedData.eventType,
        eventName: validatedData.eventName,
        page: validatedData.page,
        sessionId: validatedData.sessionId,
        userId: validatedData.userId,
        metadata: validatedData.metadata,
        userAgent,
        ipAddress,
        referrer,
        timestamp: Timestamp.now(),
      }
    );

    const response = NextResponse.json(
      formatSuccessResponse({ eventId: event.id }, 'Event tracked successfully'),
      { status: 201 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * GET /api/analytics/stats
 * Get aggregated analytics statistics
 * NOTE: Temporarily using client-side aggregation for Firestore migration
 * TODO: Optimize with Cloud Functions for large datasets
 */
export async function PATCH(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build Firestore filters
    const filters: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: any }> = [];
    if (startDate) {
      filters.push({
        field: 'timestamp',
        operator: '>=',
        value: Timestamp.fromDate(new Date(startDate)),
      });
    }
    if (endDate) {
      filters.push({
        field: 'timestamp',
        operator: '<=',
        value: Timestamp.fromDate(new Date(endDate)),
      });
    }

    // Get total count and all events for aggregation
    const [totalEvents, allEvents] = await Promise.all([
      countDocumentsAdmin(COLLECTIONS.ANALYTICS_EVENTS, filters),
      queryDocumentsAdmin<AnalyticsEvent>(
        COLLECTIONS.ANALYTICS_EVENTS,
        filters,
        'timestamp',
        'desc',
        10000 // Reasonable limit for aggregation
      ),
    ]);

    // Client-side aggregations (Firestore doesn't have native groupBy/distinct)
    const uniqueSessionsSet = new Set(allEvents.map(e => e.sessionId));

    const eventTypeMap = new Map<string, number>();
    allEvents.forEach(e => {
      eventTypeMap.set(e.eventType, (eventTypeMap.get(e.eventType) || 0) + 1);
    });

    const pageMap = new Map<string, number>();
    allEvents.forEach(e => {
      if (e.page) {
        pageMap.set(e.page, (pageMap.get(e.page) || 0) + 1);
      }
    });

    const stats = {
      totalEvents,
      uniqueSessions: uniqueSessionsSet.size,
      eventsByType: Array.from(eventTypeMap.entries())
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count),
      topPages: Array.from(pageMap.entries())
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10),
    };

    const response = NextResponse.json(
      formatSuccessResponse(stats),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, req);
}
