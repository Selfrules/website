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
 * Event Names - Standardized constants to prevent typos
 * Use these constants instead of string literals when tracking events
 *
 * @example
 * import { EventNames } from '@/lib/analytics/umami';
 * trackUmamiEvent(EventNames.CTA_CLICK, { ... });
 */
export const EventNames = {
  /** User clicked a CTA button (Book a Call, Work Together, etc.) */
  CTA_CLICK: 'cta_click',
  /** User interacted with the AI chatbot */
  CHAT_INTERACTION: 'chat_interaction',
  /** User performed an action in the calendar popup */
  CALENDAR_ACTION: 'calendar_action',
  /** User submitted a form */
  FORM_SUBMIT: 'form_submit',
  /** User viewed a blog post */
  BLOG_VIEW: 'blog_view',
  /** User clicked an outbound/external link */
  OUTBOUND_CLICK: 'outbound_click',
  /** User scrolled to a depth milestone */
  SCROLL_DEPTH: 'scroll_depth',
  /** User downloaded a file */
  DOWNLOAD: 'download',
  /** Page view (auto-tracked by Umami) */
  PAGE_VIEW: 'page_view',
} as const;

/**
 * Event property types for type safety
 */
export type CTAClickProperties = {
  /** CTA identifier (e.g., 'book_call', 'work_together') */
  cta: string;
  /** Section where CTA is located (e.g., 'hero', 'work_together') */
  location: string;
  /** Button variant (e.g., 'primary', 'secondary', 'accent') */
  variant?: string;
};

export type ChatInteractionProperties = {
  /** Action type */
  action: 'opened' | 'message_sent' | 'closed';
  /** Optional session identifier */
  sessionId?: string;
};

export type CalendarActionProperties = {
  /** Action type */
  action: 'opened' | 'closed' | 'slot_selected' | 'booking_completed' | 'booking_cancelled';
};

export type FormSubmitProperties = {
  /** Form identifier */
  form: string;
  /** Whether submission was successful */
  success: boolean;
  /** Length of submitted content (for engagement analysis) */
  questionLength?: number;
  /** User locale */
  locale?: string;
  /** Error message if failed */
  error?: string;
};

export type OutboundClickProperties = {
  /** Destination URL */
  url: string;
  /** Section where link is located */
  location: 'social' | 'footer' | 'content' | string;
};

/**
 * Complete Event Schema Documentation
 *
 * This serves as the single source of truth for all analytics events.
 * Update this when adding new events or modifying existing ones.
 *
 * Event Naming Convention:
 * - Use snake_case (e.g., 'cta_click', 'form_submit')
 * - Be descriptive but concise
 * - Group related events with common prefixes (e.g., 'calendar_*')
 *
 * Property Guidelines:
 * - Include 'section' or 'location' for spatial context
 * - Include 'action' or 'variant' for action context
 * - Never include PII (personally identifiable information)
 * - Use consistent property names across events
 *
 * @example Event Schema
 * ```typescript
 * // CTA Click Event
 * {
 *   event: 'cta_click',
 *   properties: {
 *     cta: 'book_call',
 *     location: 'hero',
 *     variant: 'primary'
 *   }
 * }
 *
 * // Form Submit Event
 * {
 *   event: 'form_submit',
 *   properties: {
 *     form: 'anonymous_question',
 *     success: true,
 *     questionLength: 145,
 *     locale: 'it'
 *   }
 * }
 * ```
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
 * @param eventName - Event name (use EventNames constants for type safety)
 * @param eventData - Optional event properties
 *
 * @example
 * import { EventNames } from '@/lib/analytics/umami';
 * trackUmamiEvent(EventNames.CTA_CLICK, { cta: 'book_call', location: 'hero' });
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
 *
 * These provide a type-safe, consistent API for tracking events.
 * Use these instead of calling trackUmamiEvent directly when possible.
 *
 * @example
 * import { UmamiTrackers } from '@/lib/analytics/umami';
 * UmamiTrackers.ctaClick('book_call', 'hero', { variant: 'primary' });
 */
export const UmamiTrackers = {
  /**
   * Track CTA button click
   *
   * @param ctaName - CTA identifier (e.g., 'book_call', 'work_together')
   * @param location - Section location (e.g., 'hero', 'work_together')
   * @param additionalData - Optional additional properties
   *
   * @example
   * UmamiTrackers.ctaClick('book_call', 'hero', { variant: 'primary' });
   */
  ctaClick: (ctaName: string, location: string, additionalData?: Record<string, any>) => {
    return trackUmamiEvent(EventNames.CTA_CLICK, {
      cta: ctaName,
      location,
      ...additionalData,
    });
  },

  /**
   * Track form submission
   *
   * @param formName - Form identifier
   * @param success - Whether submission succeeded
   * @param additionalData - Optional additional properties (questionLength, locale, error, etc.)
   */
  formSubmit: (formName: string, success: boolean, additionalData?: Record<string, any>) => {
    return trackUmamiEvent(EventNames.FORM_SUBMIT, {
      form: formName,
      success,
      ...additionalData,
    });
  },

  /**
   * Track blog post view
   *
   * @param postSlug - Post URL slug
   * @param postTitle - Post title
   * @param category - Post category
   */
  blogView: (postSlug: string, postTitle: string, category: string) => {
    return trackUmamiEvent(EventNames.BLOG_VIEW, {
      slug: postSlug,
      title: postTitle,
      category,
    });
  },

  /**
   * Track chatbot interaction
   *
   * @param action - Interaction type ('opened', 'message_sent', 'closed')
   * @param metadata - Optional metadata (sessionId, etc.)
   */
  chatInteraction: (action: 'opened' | 'message_sent' | 'closed', metadata?: Record<string, any>) => {
    return trackUmamiEvent(EventNames.CHAT_INTERACTION, {
      action,
      ...metadata,
    });
  },

  /**
   * Track calendar booking action
   *
   * @param action - Calendar action type
   * @param metadata - Optional metadata
   */
  calendarAction: (
    action: 'opened' | 'closed' | 'slot_selected' | 'booking_completed' | 'booking_cancelled',
    metadata?: Record<string, any>
  ) => {
    return trackUmamiEvent(EventNames.CALENDAR_ACTION, {
      action,
      ...metadata,
    });
  },

  /**
   * Track scroll depth milestone
   *
   * @param depth - Scroll percentage (25, 50, 75, 100)
   * @param page - Current page path
   */
  scrollDepth: (depth: number, page: string) => {
    return trackUmamiEvent(EventNames.SCROLL_DEPTH, {
      depth,
      page,
    });
  },

  /**
   * Track file download
   *
   * @param fileName - Downloaded file name
   * @param fileType - File extension/type
   * @param location - Section where download link is located
   */
  download: (fileName: string, fileType: string, location: string) => {
    return trackUmamiEvent(EventNames.DOWNLOAD, {
      file: fileName,
      type: fileType,
      location,
    });
  },

  /**
   * Track outbound link click
   *
   * @param url - Destination URL
   * @param location - Section where link is located ('social', 'footer', 'content')
   *
   * @example
   * UmamiTrackers.outboundClick('https://linkedin.com/in/username', 'social');
   */
  outboundClick: (url: string, location: string) => {
    return trackUmamiEvent(EventNames.OUTBOUND_CLICK, {
      url,
      location,
    });
  },
};
