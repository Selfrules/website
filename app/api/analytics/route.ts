/**
 * Analytics API Routes
 * Handles event tracking and analytics data
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { createAnalyticsEventSchema, getAnalyticsEventsSchema } from '@/lib/validations/schemas';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { analyticsRateLimiter, apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';

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

    // Build query filters
    const where: any = {};
    if (validatedParams.eventType) where.eventType = validatedParams.eventType;
    if (validatedParams.eventName) where.eventName = validatedParams.eventName;
    if (validatedParams.sessionId) where.sessionId = validatedParams.sessionId;

    if (validatedParams.startDate || validatedParams.endDate) {
      where.timestamp = {};
      if (validatedParams.startDate) {
        where.timestamp.gte = new Date(validatedParams.startDate);
      }
      if (validatedParams.endDate) {
        where.timestamp.lte = new Date(validatedParams.endDate);
      }
    }

    const [events, total] = await Promise.all([
      prisma.analyticsEvent.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        take: validatedParams.limit,
        skip: validatedParams.offset,
        select: {
          id: true,
          sessionId: true,
          eventType: true,
          eventName: true,
          page: true,
          metadata: true,
          timestamp: true,
        },
      }),
      prisma.analyticsEvent.count({ where }),
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

    const event = await prisma.analyticsEvent.create({
      data: {
        ...validatedData,
        userAgent,
        ipAddress,
        referrer,
      },
    });

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
 */
export async function PATCH(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = new Date(startDate);
      if (endDate) where.timestamp.lte = new Date(endDate);
    }

    // Get aggregated statistics
    const [
      totalEvents,
      uniqueSessions,
      eventsByType,
      topPages,
    ] = await Promise.all([
      prisma.analyticsEvent.count({ where }),
      prisma.analyticsEvent.findMany({
        where,
        select: { sessionId: true },
        distinct: ['sessionId'],
      }),
      prisma.analyticsEvent.groupBy({
        by: ['eventType'],
        where,
        _count: { eventType: true },
        orderBy: { _count: { eventType: 'desc' } },
      }),
      prisma.analyticsEvent.groupBy({
        by: ['page'],
        where: { ...where, page: { not: null } },
        _count: { page: true },
        orderBy: { _count: { page: 'desc' } },
        take: 10,
      }),
    ]);

    const stats = {
      totalEvents,
      uniqueSessions: uniqueSessions.length,
      eventsByType: eventsByType.map(e => ({
        type: e.eventType,
        count: e._count.eventType,
      })),
      topPages: topPages.map(p => ({
        page: p.page,
        views: p._count.page,
      })),
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
