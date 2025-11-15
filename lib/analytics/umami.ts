/**
 * Umami Analytics Utilities
 *
 * Type-safe wrapper for Umami tracker functions.
 * Provides methods for tracking custom events with Umami.
 *
 * @module lib/analytics/umami
 * @see https://umami.is/docs/tracker-functions
 */

/**
 * Extended Window interface with Umami tracker
 */
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => Promise<void>;
      identify: (data: Record<string, any>) => Promise<void>;
    };
  }
}

/**
 * Check if Umami is available
 */
export function isUmamiAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.umami !== 'undefined';
}

/**
 * Track a custom event with Umami
 *
 * @param eventName - Event name (e.g., 'cta_click', 'form_submit')
 * @param eventData - Optional event properties
 *
 * @example
 * trackUmamiEvent('cta_click', { button: 'book_call', location: 'hero' });
 */
export async function trackUmamiEvent(
  eventName: string,
  eventData?: Record<string, any>
): Promise<void> {
  if (!isUmamiAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Umami] Event tracked (dev):', eventName, eventData);
    }
    return;
  }

  try {
    await window.umami?.track(eventName, eventData);
  } catch (error) {
    console.warn('[Umami] Event tracking failed:', error);
  }
}

/**
 * Identify a user session with custom properties
 *
 * @param data - User properties (never include PII!)
 *
 * @example
 * identifyUmamiSession({ plan: 'free', locale: 'it' });
 */
export async function identifyUmamiSession(
  data: Record<string, any>
): Promise<void> {
  if (!isUmamiAvailable()) {
    return;
  }

  try {
    await window.umami?.identify(data);
  } catch (error) {
    console.warn('[Umami] Session identification failed:', error);
  }
}

/**
 * Pre-configured event trackers for common actions
 */
export const UmamiTrackers = {
  /**
   * Track CTA button click
   */
  ctaClick: (ctaName: string, location: string, additionalData?: Record<string, any>) => {
    return trackUmamiEvent('cta_click', {
      cta: ctaName,
      location,
      ...additionalData,
    });
  },

  /**
   * Track form submission
   */
  formSubmit: (formName: string, success: boolean, additionalData?: Record<string, any>) => {
    return trackUmamiEvent('form_submit', {
      form: formName,
      success,
      ...additionalData,
    });
  },

  /**
   * Track blog post view
   */
  blogView: (postSlug: string, postTitle: string, category: string) => {
    return trackUmamiEvent('blog_view', {
      slug: postSlug,
      title: postTitle,
      category,
    });
  },

  /**
   * Track chatbot interaction
   */
  chatInteraction: (action: 'opened' | 'message_sent' | 'closed', metadata?: Record<string, any>) => {
    return trackUmamiEvent('chat_interaction', {
      action,
      ...metadata,
    });
  },

  /**
   * Track calendar booking action
   */
  calendarAction: (
    action: 'opened' | 'slot_selected' | 'booking_completed' | 'booking_cancelled',
    metadata?: Record<string, any>
  ) => {
    return trackUmamiEvent('calendar_action', {
      action,
      ...metadata,
    });
  },

  /**
   * Track scroll depth milestone
   */
  scrollDepth: (depth: number, page: string) => {
    return trackUmamiEvent('scroll_depth', {
      depth,
      page,
    });
  },

  /**
   * Track file download
   */
  download: (fileName: string, fileType: string, location: string) => {
    return trackUmamiEvent('download', {
      file: fileName,
      type: fileType,
      location,
    });
  },

  /**
   * Track outbound link click
   */
  outboundClick: (url: string, location: string) => {
    return trackUmamiEvent('outbound_click', {
      url,
      location,
    });
  },
};
