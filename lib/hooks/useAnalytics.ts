'use client';

import { useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface AnalyticsEventData {
  eventType: string;
  eventName: string;
  page?: string;
  metadata?: Record<string, any>;
}

/**
 * Custom hook for client-side analytics tracking
 *
 * @example
 * const analytics = useAnalytics();
 * analytics.track('cta_click', { button: 'book_call', location: 'hero' });
 */
export function useAnalytics() {
  const sessionIdRef = useRef<string | null>(null);

  // Initialize or retrieve session ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sessionId = sessionStorage.getItem('analytics_session_id');
      if (!sessionId) {
        sessionId = uuidv4();
        sessionStorage.setItem('analytics_session_id', sessionId);
      }
      sessionIdRef.current = sessionId || null;
    }
  }, []);

  /**
   * Track an analytics event
   */
  const track = useCallback(async (
    eventName: string,
    metadata?: Record<string, any>
  ) => {
    if (!sessionIdRef.current) return;

    try {
      const eventData: AnalyticsEventData = {
        eventType: getEventType(eventName),
        eventName,
        page: window.location.pathname,
        metadata,
      };

      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          sessionId: sessionIdRef.current,
        }),
      });
    } catch (error) {
      // Silently fail - don't block user experience
      console.warn('Analytics tracking failed:', error);
    }
  }, []);

  /**
   * Track page view
   */
  const trackPageView = useCallback(async () => {
    if (!sessionIdRef.current) return;

    track('page_view', {
      referrer: document.referrer,
      title: document.title,
    });
  }, [track]);

  /**
   * Track CTA click
   */
  const trackCTAClick = useCallback(async (
    ctaName: string,
    location: string,
    additionalData?: Record<string, any>
  ) => {
    track('cta_click', {
      cta: ctaName,
      location,
      ...additionalData,
    });
  }, [track]);

  /**
   * Track form submission
   */
  const trackFormSubmit = useCallback(async (
    formName: string,
    success: boolean,
    additionalData?: Record<string, any>
  ) => {
    track('form_submit', {
      form: formName,
      success,
      ...additionalData,
    });
  }, [track]);

  /**
   * Track blog post view with reading time
   */
  const trackBlogView = useCallback(async (
    postSlug: string,
    postTitle: string,
    category: string
  ) => {
    track('blog_view', {
      slug: postSlug,
      title: postTitle,
      category,
    });
  }, [track]);

  /**
   * Track chatbot interaction
   */
  const trackChatInteraction = useCallback(async (
    action: 'opened' | 'message_sent' | 'closed',
    metadata?: Record<string, any>
  ) => {
    track('chat_interaction', {
      action,
      ...metadata,
    });
  }, [track]);

  /**
   * Track calendar booking action
   */
  const trackCalendarAction = useCallback(async (
    action: 'opened' | 'slot_selected' | 'booking_completed' | 'booking_cancelled',
    metadata?: Record<string, any>
  ) => {
    track('calendar_action', {
      action,
      ...metadata,
    });
  }, [track]);

  /**
   * Track scroll depth
   */
  const trackScrollDepth = useCallback(async (
    depth: number,
    page: string
  ) => {
    track('scroll_depth', {
      depth,
      page,
    });
  }, [track]);

  return {
    track,
    trackPageView,
    trackCTAClick,
    trackFormSubmit,
    trackBlogView,
    trackChatInteraction,
    trackCalendarAction,
    trackScrollDepth,
  };
}

/**
 * Derive event type from event name
 */
function getEventType(eventName: string): string {
  if (eventName.includes('click') || eventName.includes('cta')) {
    return 'interaction';
  }
  if (eventName.includes('view') || eventName === 'page_view') {
    return 'page_view';
  }
  if (eventName.includes('submit') || eventName.includes('form')) {
    return 'form_submission';
  }
  if (eventName.includes('chat')) {
    return 'chat';
  }
  if (eventName.includes('calendar') || eventName.includes('booking')) {
    return 'calendar';
  }
  if (eventName.includes('scroll')) {
    return 'engagement';
  }
  return 'custom';
}
