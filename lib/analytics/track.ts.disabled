/**
 * Server-side analytics tracking utility
 *
 * Use this for tracking events from API routes and server components
 */

import prisma from '@/lib/db/prisma';

export interface ServerTrackingData {
  sessionId: string;
  userId?: string;
  eventType: string;
  eventName: string;
  page?: string;
  metadata?: Record<string, any>;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
}

/**
 * Track an analytics event from server-side
 *
 * @example
 * await trackEvent({
 *   sessionId: req.cookies.get('session_id'),
 *   eventType: 'api_call',
 *   eventName: 'chat_message_sent',
 *   metadata: { messageLength: 150 }
 * });
 */
export async function trackEvent(data: ServerTrackingData): Promise<void> {
  try {
    await prisma.analyticsEvent.create({
      data: {
        sessionId: data.sessionId,
        userId: data.userId || null,
        eventType: data.eventType,
        eventName: data.eventName,
        page: data.page || null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        userAgent: data.userAgent || null,
        ipAddress: data.ipAddress || null,
        referrer: data.referrer || null,
      },
    });
  } catch (error) {
    // Log error but don't throw - tracking failures shouldn't break app
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Track page view from server component
 */
export async function trackPageView(
  sessionId: string,
  page: string,
  referrer?: string,
  userAgent?: string
): Promise<void> {
  return trackEvent({
    sessionId,
    eventType: 'page_view',
    eventName: 'page_view',
    page,
    referrer,
    userAgent,
  });
}

/**
 * Track API endpoint call
 */
export async function trackApiCall(
  sessionId: string,
  endpoint: string,
  method: string,
  statusCode: number,
  duration?: number
): Promise<void> {
  return trackEvent({
    sessionId,
    eventType: 'api_call',
    eventName: `api_${endpoint}_${method.toLowerCase()}`,
    metadata: {
      endpoint,
      method,
      statusCode,
      duration,
    },
  });
}

/**
 * Track form submission from API
 */
export async function trackFormSubmission(
  sessionId: string,
  formName: string,
  success: boolean,
  errors?: string[]
): Promise<void> {
  return trackEvent({
    sessionId,
    eventType: 'form_submission',
    eventName: `form_submit_${formName}`,
    metadata: {
      formName,
      success,
      errors,
    },
  });
}

/**
 * Track chat conversation event
 */
export async function trackChatEvent(
  sessionId: string,
  userId: string | undefined,
  action: 'started' | 'message_sent' | 'ended',
  metadata?: Record<string, any>
): Promise<void> {
  return trackEvent({
    sessionId,
    userId,
    eventType: 'chat',
    eventName: `chat_${action}`,
    metadata,
  });
}

/**
 * Track calendar booking event
 */
export async function trackBookingEvent(
  sessionId: string,
  userId: string | undefined,
  action: 'initiated' | 'slot_selected' | 'completed' | 'cancelled',
  metadata?: Record<string, any>
): Promise<void> {
  return trackEvent({
    sessionId,
    userId,
    eventType: 'calendar',
    eventName: `booking_${action}`,
    metadata,
  });
}

/**
 * Batch track multiple events (for efficiency)
 */
export async function trackEventsBatch(events: ServerTrackingData[]): Promise<void> {
  try {
    await prisma.analyticsEvent.createMany({
      data: events.map(event => ({
        sessionId: event.sessionId,
        userId: event.userId || null,
        eventType: event.eventType,
        eventName: event.eventName,
        page: event.page || null,
        metadata: event.metadata ? JSON.stringify(event.metadata) : null,
        userAgent: event.userAgent || null,
        ipAddress: event.ipAddress || null,
        referrer: event.referrer || null,
      })),
    });
  } catch (error) {
    console.error('Batch analytics tracking error:', error);
  }
}
