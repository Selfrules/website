# Advanced Analytics Implementation Specification

**Audit Date:** January 26, 2026
**Site:** https://selfrules.org
**Current Analytics Provider:** Umami Cloud + Custom Firebase API
**Status:** Infrastructure Complete, Integration Gaps Identified

---

## Executive Summary

The analytics infrastructure for selfrules.org is **technically complete but underutilized**. While Umami tracking and a custom Firebase analytics API are properly configured, critical user interactions remain untracked, resulting in **significant blind spots** in the conversion funnel.

### Current Coverage Assessment

| Area | Infrastructure | Integration | Coverage |
|------|---------------|-------------|----------|
| Page Views | ✅ 100% | ✅ 100% | Complete |
| Scroll Depth | ✅ 100% | ✅ 100% | Complete |
| CTA Clicks | ✅ 100% | 🔴 0% | **Critical Gap** |
| Form Submissions | ✅ 100% | 🔴 0% | **Critical Gap** |
| Chat Interactions | ✅ 100% | 🔴 0% | **Critical Gap** |
| Calendar Bookings | ✅ 100% | 🔴 0% | **Critical Gap** |
| Blog Views | ✅ 100% | 🔴 0% | Pending (blog not live) |
| Outbound Links | ✅ 100% | 🔴 0% | Missing |

**Overall Tracking Completeness: 25%**

---

## 1. CURRENT STATE

### 1.1 Infrastructure Components

#### UmamiScript Component
**File:** `components/analytics/UmamiScript.tsx`
**Status:** ✅ Fully Configured

```typescript
// Configuration
data-website-id={NEXT_PUBLIC_UMAMI_WEBSITE_ID}
data-host-url="https://cloud.umami.is"
data-auto-track="true"  // Automatic page views
data-do-not-track="true" // Respects DNT header
```

**Features:**
- Environment-aware loading (production by default)
- Conditional rendering based on config
- Privacy-compliant (DNT header respected)

#### Analytics Utilities Library
**File:** `lib/analytics/umami.ts`
**Status:** ✅ Fully Implemented

| Function | Purpose | Type Safety |
|----------|---------|-------------|
| `trackUmamiEvent()` | Core tracking function | ✅ Generic |
| `identifyUmamiSession()` | User identification | ✅ Generic |
| `UmamiTrackers.ctaClick()` | CTA button tracking | ✅ Typed |
| `UmamiTrackers.formSubmit()` | Form submission tracking | ✅ Typed |
| `UmamiTrackers.blogView()` | Blog post view tracking | ✅ Typed |
| `UmamiTrackers.chatInteraction()` | Chat tracking | ✅ Typed |
| `UmamiTrackers.calendarAction()` | Calendar tracking | ✅ Typed |
| `UmamiTrackers.scrollDepth()` | Scroll milestone tracking | ✅ Typed |
| `UmamiTrackers.download()` | File download tracking | ✅ Typed |
| `UmamiTrackers.outboundClick()` | External link tracking | ✅ Typed |

#### useAnalytics Hook
**File:** `lib/hooks/useAnalytics.ts`
**Status:** ✅ Fully Implemented

Features:
- Dual tracking (Custom API + Umami)
- Session ID generation with UUID
- Fire-and-forget architecture (non-blocking)
- Automatic event type classification

#### AnalyticsProvider
**File:** `components/providers/AnalyticsProvider.tsx`
**Status:** ✅ Active

Automatic Tracking:
- Page view tracking on route changes
- Scroll depth milestones (25%, 50%, 75%, 100%)
- Debounced scroll tracking

#### Custom Analytics API
**Files:**
- `app/api/analytics/route.ts` (Event tracking)
- `app/api/analytics/summary/route.ts` (Aggregations)
**Status:** ✅ Operational

Features:
- Firebase Firestore storage
- Rate limiting enabled
- Client-side aggregations for dashboard
- Conversion funnel calculation

### 1.2 Event Schema

#### Standardized Event Names
```typescript
export const EventNames = {
  CTA_CLICK: 'cta_click',
  CHAT_INTERACTION: 'chat_interaction',
  CALENDAR_ACTION: 'calendar_action',
  FORM_SUBMIT: 'form_submit',
  BLOG_VIEW: 'blog_view',
  OUTBOUND_CLICK: 'outbound_click',
  SCROLL_DEPTH: 'scroll_depth',
  DOWNLOAD: 'download',
  PAGE_VIEW: 'page_view',
} as const;
```

#### Event Property Types
```typescript
type CTAClickProperties = {
  cta: string;        // e.g., 'book_call', 'work_together'
  location: string;   // e.g., 'hero', 'footer'
  variant?: string;   // e.g., 'primary', 'secondary'
};

type FormSubmitProperties = {
  form: string;           // e.g., 'anonymous_question'
  success: boolean;
  questionLength?: number;
  locale?: string;
  error?: string;
};

type ChatInteractionProperties = {
  action: 'opened' | 'message_sent' | 'closed';
  sessionId?: string;
};

type CalendarActionProperties = {
  action: 'opened' | 'closed' | 'slot_selected' | 'booking_completed';
};
```

---

## 2. RECOMMENDED ENHANCEMENTS

### 2.1 Priority 0 (Critical) - CTA Tracking Integration

**Issue:** All CTA buttons use `NeoButton` without analytics integration
**Impact:** Cannot measure conversion funnel entry points
**Effort:** 4-6 hours

#### Components Requiring Integration

| Component | File | CTA | Current State |
|-----------|------|-----|---------------|
| Hero | `components/sections/Hero.tsx` | "Book a Call" | 🔴 Untracked |
| Hero | `components/sections/Hero.tsx` | "Explore Journey" | 🔴 Untracked |
| WorkTogether | `components/sections/WorkTogether.tsx` | "Book a Call" | 🔴 Untracked |
| AskMeAnything | `components/sections/AskMeAnything.tsx` | "Start Chat" | 🔴 Untracked |

#### Implementation Specification

**Option A: TrackedButton Wrapper Component (Recommended)**

Create a new component that wraps NeoButton with analytics:

```typescript
// components/analytics/TrackedButton.tsx
'use client';

import { useCallback } from 'react';
import { NeoButton, type NeoButtonProps } from '@/components/ui/NeoButton';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

interface TrackedButtonProps extends NeoButtonProps {
  /** CTA identifier for analytics (e.g., 'book_call') */
  analyticsLabel: string;
  /** Section location (e.g., 'hero', 'work_together') */
  analyticsLocation: string;
  /** Additional tracking metadata */
  analyticsData?: Record<string, any>;
}

export function TrackedButton({
  analyticsLabel,
  analyticsLocation,
  analyticsData,
  onClick,
  ...props
}: TrackedButtonProps) {
  const { trackCTAClick } = useAnalytics();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      trackCTAClick(analyticsLabel, analyticsLocation, analyticsData);
      onClick?.(e);
    },
    [trackCTAClick, analyticsLabel, analyticsLocation, analyticsData, onClick]
  );

  return <NeoButton {...props} onClick={handleClick} />;
}
```

**Usage in Hero.tsx:**
```tsx
<TrackedButton
  variant="primary"
  analyticsLabel="book_call"
  analyticsLocation="hero"
  onClick={openCalendar}
>
  Book a Call
</TrackedButton>
```

**Option B: Direct Integration (Simpler but more repetitive)**

Add tracking directly in component handlers:

```tsx
// In Hero.tsx
const { trackCTAClick } = useAnalytics();

const handleBookCall = () => {
  trackCTAClick('book_call', 'hero', { variant: 'primary' });
  openCalendar();
};
```

**Recommendation:** Option A for DRY compliance and consistent tracking

---

### 2.2 Priority 0 (Critical) - Chat Interaction Tracking

**Issue:** Chat widget has zero tracking
**Impact:** Cannot measure chat engagement or AI chatbot ROI
**Effort:** 2-3 hours

#### Events to Track

| Event | Trigger | Properties |
|-------|---------|------------|
| Chat Opened | User clicks chat button | `{ action: 'opened' }` |
| Message Sent | User sends a message | `{ action: 'message_sent', messageNumber: n }` |
| Chat Closed | User closes chat | `{ action: 'closed', messagesCount: n, duration: ms }` |

#### Implementation Specification

**ChatTrigger.tsx Integration:**

```typescript
// Add to ChatTrigger.tsx
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export function ChatTrigger() {
  const { trackChatInteraction } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      trackChatInteraction('opened');
    } else {
      trackChatInteraction('closed');
    }
    setIsOpen(!isOpen);
  };
  // ...
}
```

**ChatInterface.tsx Integration:**

```typescript
// Add to ChatInterface.tsx
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useRef, useEffect } from 'react';

export function ChatInterface({ onClose }: Props) {
  const { trackChatInteraction } = useAnalytics();
  const messageCountRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  const handleSendMessage = async () => {
    messageCountRef.current += 1;
    trackChatInteraction('message_sent', {
      messageNumber: messageCountRef.current,
    });
    // ... existing send logic
  };

  const handleClose = () => {
    const duration = Date.now() - startTimeRef.current;
    trackChatInteraction('closed', {
      messagesCount: messageCountRef.current,
      duration,
    });
    onClose();
  };

  return (
    // JSX with handlers
  );
}
```

---

### 2.3 Priority 0 (Critical) - Form Submission Tracking

**Issue:** Anonymous question form lacks tracking
**Impact:** Cannot measure lead generation effectiveness
**Effort:** 1-2 hours

#### Events to Track

| Event | Trigger | Properties |
|-------|---------|------------|
| Form Submitted | User submits form | `{ form, success, questionLength, locale }` |
| Form Error | Submission fails | `{ form, success: false, error }` |

#### Implementation Specification

**AnonymousQuestionForm.tsx Integration:**

```typescript
// Add to AnonymousQuestionForm.tsx
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useLocale } from 'next-intl';

export function AnonymousQuestionForm() {
  const { trackFormSubmit } = useAnalytics();
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        trackFormSubmit('anonymous_question', true, {
          questionLength: question.length,
          locale,
        });
        // Success handling
      } else {
        trackFormSubmit('anonymous_question', false, {
          error: 'api_error',
          statusCode: response.status,
        });
      }
    } catch (error) {
      trackFormSubmit('anonymous_question', false, {
        error: 'network_error',
      });
    }
  };
}
```

---

### 2.4 Priority 0 (Critical) - Calendar Booking Tracking

**Issue:** Calendar widget interactions untracked
**Impact:** Booking funnel completely opaque
**Effort:** 2-3 hours
**Challenge:** Google Calendar iframe has cross-origin restrictions

#### Events to Track

| Event | Trackable | Method |
|-------|-----------|--------|
| Calendar Opened | ✅ Yes | onClick handler |
| Calendar Closed | ✅ Yes | onClose handler |
| Load Error | ✅ Yes | onError handler |
| Slot Selected | ⚠️ Limited | Cross-origin restriction |
| Booking Completed | ⚠️ Limited | Cross-origin restriction |

#### Implementation Specification

**GoogleCalendarPopup.tsx Integration:**

```typescript
// Add to GoogleCalendarPopup.tsx
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useEffect, useRef } from 'react';

export function GoogleCalendarPopup({ isOpen, onClose }: Props) {
  const { trackCalendarAction } = useAnalytics();
  const hasTrackedOpen = useRef(false);

  useEffect(() => {
    if (isOpen && !hasTrackedOpen.current) {
      trackCalendarAction('opened');
      hasTrackedOpen.current = true;
    }

    if (!isOpen) {
      hasTrackedOpen.current = false;
    }
  }, [isOpen, trackCalendarAction]);

  const handleClose = () => {
    trackCalendarAction('closed');
    onClose();
  };

  const handleIframeError = () => {
    trackCalendarAction('load_error');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <iframe
        src={calendarUrl}
        onError={handleIframeError}
        // ...
      />
    </Dialog>
  );
}
```

**Workaround for Booking Completion:**

Since iframe events can't be captured directly, implement a post-booking tracking page:

```typescript
// app/[locale]/booking-confirmed/page.tsx
import { UmamiTrackers } from '@/lib/analytics/umami';

export default function BookingConfirmedPage() {
  useEffect(() => {
    UmamiTrackers.calendarAction('booking_completed');
  }, []);

  return <BookingConfirmation />;
}
```

Configure Google Calendar to redirect to this page after booking.

---

### 2.5 Priority 1 (High) - Outbound Link Tracking

**Issue:** External links untracked
**Impact:** Cannot measure social/outbound engagement
**Effort:** 3-4 hours

#### Implementation Options

**Option A: Global Click Handler (Recommended)**

```typescript
// components/providers/OutboundLinkTracker.tsx
'use client';

import { useEffect } from 'react';
import { UmamiTrackers } from '@/lib/analytics/umami';

export function OutboundLinkTracker({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Check if external link
      const isExternal = href.startsWith('http') &&
                         !href.includes(window.location.hostname);

      if (isExternal) {
        const section = detectSection(link);
        UmamiTrackers.outboundClick(href, section);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <>{children}</>;
}

function detectSection(element: HTMLElement): string {
  const section = element.closest('[data-section]');
  return section?.getAttribute('data-section') || 'unknown';
}
```

**Option B: TrackedLink Component**

```typescript
// components/analytics/TrackedLink.tsx
interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  analyticsLocation: string;
}

export function TrackedLink({
  analyticsLocation,
  href,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href) {
      UmamiTrackers.outboundClick(href, analyticsLocation);
    }
    onClick?.(e);
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
```

---

### 2.6 Priority 1 (High) - Blog View Tracking

**Issue:** Blog tracking not implemented (blog not yet live)
**Impact:** Content performance unmeasurable when launched
**Effort:** 2-3 hours

#### Implementation Specification

```typescript
// app/[locale]/blog/[slug]/page.tsx
import { UmamiTrackers } from '@/lib/analytics/umami';

export default function BlogPost({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  useEffect(() => {
    UmamiTrackers.blogView(slug, post.title, post.category);
  }, [slug, post]);

  return <Article post={post} />;
}
```

#### Enhanced Blog Metrics

```typescript
// lib/analytics/blog-metrics.ts
export function trackBlogEngagement(slug: string) {
  let readStartTime = Date.now();
  let maxScrollDepth = 0;

  // Track reading time on page unload
  window.addEventListener('beforeunload', () => {
    const readingTime = Math.round((Date.now() - readStartTime) / 1000);
    trackUmamiEvent('blog_read_complete', {
      slug,
      readingTimeSeconds: readingTime,
      maxScrollDepth,
    });
  });

  // Track scroll depth
  const handleScroll = debounce(() => {
    const depth = calculateScrollPercentage();
    if (depth > maxScrollDepth) {
      maxScrollDepth = depth;
    }
  }, 100);

  window.addEventListener('scroll', handleScroll);
}
```

---

### 2.7 Priority 2 (Medium) - Real User Monitoring (RUM)

**Issue:** No field data collection for actual user performance
**Impact:** Lab data may not reflect real user experience
**Effort:** 4-6 hours

#### Implementation Specification

```typescript
// lib/analytics/web-vitals.ts
import { onLCP, onINP, onCLS, onFCP, onTTFB, Metric } from 'web-vitals';
import { trackUmamiEvent } from './umami';

export function initWebVitalsTracking() {
  const sendToAnalytics = (metric: Metric) => {
    trackUmamiEvent('web_vital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType,
    });
  };

  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
```

**Integration in layout:**

```typescript
// app/layout.tsx
import { initWebVitalsTracking } from '@/lib/analytics/web-vitals';

export default function RootLayout({ children }) {
  useEffect(() => {
    initWebVitalsTracking();
  }, []);

  return (
    <html>
      {/* ... */}
    </html>
  );
}
```

---

### 2.8 Priority 2 (Medium) - UTM Parameter Tracking

**Issue:** No attribution for traffic sources
**Impact:** Cannot measure marketing campaign effectiveness
**Effort:** 2-3 hours

#### Implementation Specification

```typescript
// lib/analytics/attribution.ts
export function trackUTMParameters() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = params.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });

  if (Object.keys(utmParams).length > 0) {
    // Store for session
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));

    // Track arrival with UTM
    trackUmamiEvent('campaign_arrival', utmParams);
  }
}

export function getStoredUTMParams(): Record<string, string> | null {
  const stored = sessionStorage.getItem('utm_params');
  return stored ? JSON.parse(stored) : null;
}
```

---

### 2.9 Priority 2 (Medium) - Error Tracking Integration

**Issue:** Errors not correlated with user journeys
**Impact:** Cannot debug user-impacting issues
**Effort:** 3-4 hours

#### Implementation Specification

```typescript
// lib/analytics/error-tracking.ts
import { trackUmamiEvent } from './umami';

export function initErrorTracking() {
  // Global error handler
  window.addEventListener('error', (event) => {
    trackUmamiEvent('error', {
      type: 'runtime',
      message: event.message,
      source: event.filename,
      line: event.lineno,
      page: window.location.pathname,
    });
  });

  // Unhandled promise rejection
  window.addEventListener('unhandledrejection', (event) => {
    trackUmamiEvent('error', {
      type: 'promise_rejection',
      reason: event.reason?.message || String(event.reason),
      page: window.location.pathname,
    });
  });
}

// API error tracking
export function trackAPIError(endpoint: string, error: Error, statusCode?: number) {
  trackUmamiEvent('api_error', {
    endpoint,
    message: error.message,
    statusCode,
    page: window.location.pathname,
  });
}
```

---

### 2.10 Priority 3 (Low) - A/B Testing Infrastructure

**Issue:** No experimentation capability
**Impact:** Cannot data-drive UX decisions
**Effort:** 8-12 hours

#### Implementation Specification

```typescript
// lib/analytics/experiments.ts
import { trackUmamiEvent } from './umami';

interface Experiment {
  id: string;
  variants: string[];
  weights?: number[]; // Default: equal distribution
}

const EXPERIMENTS: Record<string, Experiment> = {
  'hero-cta-text': {
    id: 'hero-cta-text',
    variants: ['book_call', 'schedule_meeting', 'lets_chat'],
  },
  'pricing-display': {
    id: 'pricing-display',
    variants: ['monthly', 'annual_first'],
    weights: [0.5, 0.5],
  },
};

export function getVariant(experimentId: string): string {
  const experiment = EXPERIMENTS[experimentId];
  if (!experiment) return 'control';

  // Check for stored variant
  const stored = localStorage.getItem(`exp_${experimentId}`);
  if (stored) return stored;

  // Assign variant
  const variant = selectVariant(experiment);
  localStorage.setItem(`exp_${experimentId}`, variant);

  // Track assignment
  trackUmamiEvent('experiment_assignment', {
    experiment: experimentId,
    variant,
  });

  return variant;
}

export function trackConversion(experimentId: string, conversionEvent: string) {
  const variant = localStorage.getItem(`exp_${experimentId}`);
  if (!variant) return;

  trackUmamiEvent('experiment_conversion', {
    experiment: experimentId,
    variant,
    conversionEvent,
  });
}
```

---

## 3. IMPLEMENTATION ROADMAP

### Week 1: Critical Integrations (P0)

| Task | Effort | Files | Expected Outcome |
|------|--------|-------|------------------|
| Create TrackedButton component | 2 hrs | `components/analytics/TrackedButton.tsx` | Reusable CTA tracking |
| Integrate Hero CTAs | 1 hr | `components/sections/Hero.tsx` | Hero funnel visible |
| Integrate WorkTogether CTA | 1 hr | `components/sections/WorkTogether.tsx` | Work section funnel |
| Integrate Chat tracking | 3 hrs | `components/chat/*.tsx` | Chat engagement visible |
| Integrate Form tracking | 2 hrs | `components/forms/AnonymousQuestionForm.tsx` | Lead gen visible |
| Integrate Calendar tracking | 2 hrs | `components/ui/GoogleCalendarPopup.tsx` | Booking funnel visible |
| **Total** | **11 hrs** | | **Critical gaps closed** |

### Week 2: High Priority (P1)

| Task | Effort | Files | Expected Outcome |
|------|--------|-------|------------------|
| Implement OutboundLinkTracker | 3 hrs | `components/providers/OutboundLinkTracker.tsx` | External link tracking |
| Implement blog view tracking | 2 hrs | `app/[locale]/blog/[slug]/page.tsx` | Content performance |
| Add UTM parameter tracking | 2 hrs | `lib/analytics/attribution.ts` | Campaign attribution |
| **Total** | **7 hrs** | | **Marketing visibility** |

### Week 3-4: Medium Priority (P2)

| Task | Effort | Files | Expected Outcome |
|------|--------|-------|------------------|
| Implement Web Vitals RUM | 4 hrs | `lib/analytics/web-vitals.ts` | Field performance data |
| Implement error tracking | 3 hrs | `lib/analytics/error-tracking.ts` | Error correlation |
| Create analytics dashboard | 8 hrs | `app/admin/analytics/page.tsx` | Internal visibility |
| **Total** | **15 hrs** | | **Full observability** |

### Month 2: Advanced Features (P3)

| Task | Effort | Files | Expected Outcome |
|------|--------|-------|------------------|
| A/B testing infrastructure | 10 hrs | `lib/analytics/experiments.ts` | Experimentation capability |
| User segmentation | 6 hrs | `lib/analytics/segments.ts` | Cohort analysis |
| Custom booking widget | 20 hrs | `components/booking/*` | Full booking funnel |
| **Total** | **36 hrs** | | **Advanced analytics** |

---

## 4. SUCCESS METRICS

### KPIs to Track Post-Implementation

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| **Conversion Funnel Visibility** | 25% | 100% | Events tracked / Events defined |
| **CTA Click Rate** | Unknown | >5% | CTA clicks / Page views |
| **Chat Open Rate** | Unknown | >10% | Chat opens / Visitors |
| **Chat Completion Rate** | Unknown | >50% | Multi-message sessions / Opens |
| **Form Submission Rate** | Unknown | >3% | Submissions / Form views |
| **Calendar Open Rate** | Unknown | >8% | Calendar opens / CTA clicks |
| **Booking Completion Rate** | Unknown | >30% | Bookings / Calendar opens |

### Data Quality Metrics

| Metric | Target | Validation |
|--------|--------|------------|
| Event Name Consistency | 100% | All events use EventNames constants |
| Property Completeness | >90% | Required properties always present |
| Session Continuity | >95% | SessionId present across events |
| Duplicate Event Rate | <1% | No double-tracking bugs |

---

## 5. TECHNICAL SPECIFICATIONS

### Event Payload Standards

```typescript
// All events should follow this structure
interface StandardEvent {
  // Required
  eventName: string;           // From EventNames constant
  timestamp: number;           // Unix timestamp
  sessionId: string;           // UUID from sessionStorage
  page: string;                // Current pathname

  // Recommended
  locale: string;              // 'it' | 'en'
  viewport: 'mobile' | 'desktop';

  // Event-specific
  properties: Record<string, any>;
}
```

### Privacy Compliance

```typescript
// Never track PII
const FORBIDDEN_PROPERTIES = [
  'email',
  'name',
  'phone',
  'address',
  'ip', // Use hashed version only
  'password',
];

// Validate before tracking
function sanitizeProperties(props: Record<string, any>): Record<string, any> {
  const sanitized = { ...props };
  FORBIDDEN_PROPERTIES.forEach(key => {
    delete sanitized[key];
  });
  return sanitized;
}
```

### Rate Limiting

```typescript
// Prevent event spam
const eventQueue = new Map<string, number>();
const RATE_LIMIT_MS = 1000;

function shouldTrack(eventName: string): boolean {
  const lastTracked = eventQueue.get(eventName) || 0;
  const now = Date.now();

  if (now - lastTracked < RATE_LIMIT_MS) {
    return false;
  }

  eventQueue.set(eventName, now);
  return true;
}
```

---

## 6. VERIFICATION CHECKLIST

### Pre-Implementation

- [ ] Review existing `lib/analytics/umami.ts` utilities
- [ ] Confirm Umami dashboard access
- [ ] Verify Firebase analytics collection
- [ ] Test development mode logging

### Post-Implementation

- [ ] All CTAs firing `cta_click` events
- [ ] Chat widget tracking open/close/messages
- [ ] Form submissions tracked with success/error
- [ ] Calendar interactions tracked
- [ ] Outbound links tracked automatically
- [ ] No duplicate events firing
- [ ] Session IDs consistent across events
- [ ] Privacy compliance verified (no PII)

### Dashboard Validation

- [ ] Conversion funnel visualized in Umami
- [ ] Top CTAs visible in custom API
- [ ] Chat engagement metrics available
- [ ] Form conversion rate calculable

---

## 7. RELATED DOCUMENTS

- **Analytics Audit Report:** `ANALYTICS_AUDIT_REPORT.md`
- **Performance Report:** `audit/performance-report.md`
- **Refactoring Roadmap:** `audit/refactoring-roadmap.md`
- **Umami Utilities:** `lib/analytics/umami.ts`
- **Analytics Hook:** `lib/hooks/useAnalytics.ts`
- **Analytics API:** `app/api/analytics/route.ts`

---

**Document Version:** 1.0
**Last Updated:** January 26, 2026
**Author:** Front-End Developer Audit Agent
**Next Review:** After Phase 1 implementation complete
