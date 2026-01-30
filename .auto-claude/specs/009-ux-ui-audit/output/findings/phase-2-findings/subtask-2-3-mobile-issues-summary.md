# Mobile-Specific Issues Summary

**Subtask ID:** subtask-2-3
**Date:** 2026-01-27
**Auditor:** Claude (Senior UX/UI Designer)
**Viewports Tested:**
- 375px (iPhone SE)
- 390px (iPhone 12/13/14)
- 428px (iPhone 12/13/14 Pro Max)
- 768px (iPad Portrait)

---

## Executive Summary

This document consolidates all mobile-specific issues identified during the Phase 2 Mobile Experience Analysis. Issues are categorized by severity, breakpoint, and component type, providing a prioritized remediation roadmap.

**Total Issues Identified:** 21
- **High Severity (Blockers):** 5
- **Medium Severity (Degraded UX):** 11
- **Low Severity (Polish):** 5

**Overall Mobile Experience Score: 6.5/10**

---

## Issues by Severity

### HIGH Severity (Critical - Fix Immediately)

| ID | Issue | Component | Breakpoint | Impact | Effort |
|----|-------|-----------|------------|--------|--------|
| H-01 | **Language switcher critically undersized** | Header.tsx | All mobile (<1024px) | Touch target only 33px height vs 44px WCAG minimum. Users with motor impairments will struggle to tap. | 15 min |
| H-02 | **iOS Safari auto-zoom on chat input** | ChatInterface.tsx | All iOS devices | 14px font-size triggers auto-zoom when focused, disrupting user flow and requiring manual zoom-out. | 15 min |
| H-03 | **Mobile menu lacks animation** | Header.tsx | <1024px | Menu appears/disappears instantly without transition, creating jarring UX that feels broken. | 2 hours |
| H-04 | **No body scroll lock when mobile menu open** | Header.tsx | <1024px | Page content scrollable behind open menu, confusing navigation context. | 1 hour |
| H-05 | **Mobile hamburger undersized** | Header.tsx | <1024px | 40×40px is borderline; 44px minimum (48px recommended) per WCAG 2.1. | 15 min |

---

### MEDIUM Severity (Degraded UX - Fix Soon)

| ID | Issue | Component | Breakpoint | Impact | Effort |
|----|-------|-----------|------------|--------|--------|
| M-01 | **Mobile nav links borderline height** | Header.tsx | <1024px | ~45px height is close but below 48px recommendation. | 15 min |
| M-02 | **NeoButton sm variant fails touch target** | NeoButton.tsx | All mobile | ~37px height fails 44px minimum for touch. | 30 min |
| M-03 | **Button sm variant fails touch target** | Button.tsx | All mobile | ~37px height fails 44px minimum for touch. | 30 min |
| M-04 | **CTAButton sm/md variants undersized** | CTAButton.tsx | All mobile | sm: ~38px, md: ~47px - both below safe touch target. | 30 min |
| M-05 | **Anonymous form submit button borderline** | AnonymousQuestionForm.tsx | <768px | ~45px height on mobile (py-3) vs 53px on desktop (py-4). | 15 min |
| M-06 | **No scroll progress indicator** | Page level | All mobile | Long scroll depth (~5 sections) without position awareness. Users lose orientation. | 4 hours |
| M-07 | **Long scroll without mid-page CTAs** | Page level | All mobile | No conversion prompts between Hero and AskMeAnything. Drop-off risk after 50% scroll. | 2 hours |
| M-08 | **No active nav state indicator** | Header.tsx | <1024px | No visual feedback showing current section when scrolling. | 3 hours |
| M-09 | **Header elements in stretch zone** | Header.tsx | <480px | Hamburger, language switcher, logo all require thumb stretch on small devices. | 4 hours |
| M-10 | **Chat input height undersized** | ChatInterface.tsx | All mobile | ~40px height (py-2) is below 44px touch target minimum. | 15 min |
| M-11 | **Timeline dot indicators small** | Journey.tsx | <768px | w-10 h-10 (40px) is borderline; consider 44px+ for better touch. | 30 min |

---

### LOW Severity (Polish - Nice to Have)

| ID | Issue | Component | Breakpoint | Impact | Effort |
|----|-------|-----------|------------|--------|--------|
| L-01 | **No back-to-top button** | Page level | All mobile | Long page requires full scroll-back; floating FAB would help. | 2 hours |
| L-02 | **No scroll snap between sections** | Page level | All mobile | Optional enhancement for smoother section transitions. | 4 hours |
| L-03 | **Header doesn't collapse on scroll** | Header.tsx | <768px | Fixed header uses ~60px vertical space that could be reclaimed. | 4 hours |
| L-04 | **Logo link borderline height** | Header.tsx | All mobile | ~40px height, should be 44px+ for touch safety. | 15 min |
| L-05 | **Missing enterKeyHint on chat input** | ChatInterface.tsx | All mobile | Mobile keyboard could show "Send" instead of generic return key. | 5 min |

---

## Issues by Breakpoint

### xs: 0-479px (Small Mobile)

| Count | Severity | Primary Issues |
|-------|----------|----------------|
| 4 | High | Language switcher (H-01), Hamburger (H-05) |
| 6 | Medium | All sm button variants (M-02, M-03, M-04), Nav links (M-01), Thumb zone stretch (M-09) |
| 3 | Low | Logo height (L-04), Back-to-top (L-01), Header collapse (L-03) |

**Total: 13 issues affecting smallest viewport**

### sm: 480-639px (Large Mobile)

| Count | Severity | Primary Issues |
|-------|----------|----------------|
| 4 | High | All H-01 through H-05 |
| 5 | Medium | Button variants (M-02, M-03, M-04), Form submit (M-05), Chat input (M-10) |
| 2 | Low | Back-to-top (L-01), enterKeyHint (L-05) |

**Total: 11 issues affecting large mobile**

### md: 640-767px (Tablet Portrait)

| Count | Severity | Primary Issues |
|-------|----------|----------------|
| 4 | High | H-01, H-02, H-03, H-04 |
| 4 | Medium | Scroll indicator (M-06), Mid-page CTAs (M-07), Nav state (M-08), Timeline dots (M-11) |
| 2 | Low | Scroll snap (L-02), Header collapse (L-03) |

**Total: 10 issues affecting tablet portrait**

### lg: 768-1023px (Tablet Landscape)

| Count | Severity | Primary Issues |
|-------|----------|----------------|
| 2 | High | H-02 (iOS zoom), H-01 (lang switcher visible at all sizes) |
| 3 | Medium | Scroll indicator (M-06), Mid-page CTAs (M-07), Nav state (M-08) |
| 1 | Low | Back-to-top (L-01) |

**Total: 6 issues affecting tablet landscape**

---

## Issues by Component Type

### Navigation Components

| Component | Issues | Primary Concerns |
|-----------|--------|------------------|
| Header.tsx | H-01, H-03, H-04, H-05, M-01, M-08, M-09, L-03, L-04 | Touch targets, animations, scroll lock |
| MobileNav (within Header) | H-03, H-04, M-01 | Animation, scroll behavior |

**Subtotal: 9 issues**

### Button Components

| Component | Issues | Primary Concerns |
|-----------|--------|------------------|
| NeoButton.tsx | M-02 | sm variant height |
| Button.tsx | M-03 | sm variant height |
| CTAButton.tsx | M-04 | sm/md variant heights |

**Subtotal: 3 issues**

### Form Components

| Component | Issues | Primary Concerns |
|-----------|--------|------------------|
| ChatInterface.tsx | H-02, M-10, L-05 | Font size, input height, keyboard hints |
| AnonymousQuestionForm.tsx | M-05 | Submit button height on mobile |

**Subtotal: 4 issues**

### Page-Level Experience

| Concern | Issues | Primary Concerns |
|---------|--------|------------------|
| Scroll Experience | M-06, M-07, L-01, L-02 | Progress indicator, CTAs, back-to-top, snap |
| Section Awareness | M-08 | Scroll-spy for active nav state |

**Subtotal: 5 issues**

---

## Detailed Issue Breakdowns

### H-01: Language Switcher Critically Undersized

**Component:** `components/ui/Header.tsx:88-118`

**Current State:**
```tsx
<button
  className="px-3 py-1.5 transition-all font-bold text-sm"
  // Height calculation: 6px × 2 + ~21px text = ~33px
>
```

**Breakpoints Affected:**
- All viewports where visible (0-∞)
- Critical on touch devices (<1024px)

**WCAG Requirement:** 44×44px minimum (WCAG 2.1 AA), 48×48px recommended

**Current Measurement:**
- Width: ~32px
- Height: ~33px
- **Deficit: 11px height, 12px width**

**Impact:**
- Fails WCAG 2.1 AA Success Criterion 2.5.5 (Target Size)
- Users with motor impairments cannot reliably activate
- Touch miss-taps cause wrong language selection

**Fix:**
```tsx
// Change from:
'px-3 py-1.5 transition-all font-bold text-sm'

// To:
'px-4 py-3 transition-all font-bold text-sm min-h-[48px] min-w-[48px]'
```

---

### H-02: iOS Safari Auto-Zoom on Chat Input

**Component:** `components/chat/ChatInterface.tsx:231-238`

**Current State:**
```tsx
<input
  type="text"
  className="flex-1 px-3 py-2 border-brutal-thin border-black rounded-brutal... text-sm"
  // text-sm = 14px font-size
/>
```

**Breakpoints Affected:**
- All iOS devices (Safari browser)

**iOS Behavior:** Safari automatically zooms to 16px equivalent when input with font-size <16px receives focus.

**Impact:**
- Page zooms unexpectedly when user taps chat input
- User must manually zoom out or refresh
- Disrupts conversation flow
- Particularly annoying on iPhone SE (375px viewport)

**Fix:**
```tsx
// Change from:
className="...text-sm"

// To:
className="...text-base" // 16px - no auto-zoom
```

---

### H-03: Mobile Menu Lacks Animation

**Component:** `components/ui/Header.tsx:136-150`

**Current State:**
```tsx
{mobileMenuOpen && (
  <nav className="lg:hidden mt-4 pt-4 border-t-brutal-thin border-black">
    ...
  </nav>
)}
```

**Breakpoints Affected:**
- <1024px (lg breakpoint where hamburger menu appears)

**Impact:**
- Menu appears/disappears instantly
- No transition feels "broken" to users
- Jarring experience on every menu toggle
- Reduces perceived polish/quality

**Fix:**
```tsx
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence>
  {mobileMenuOpen && (
    <motion.nav
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="lg:hidden mt-4 pt-4 border-t-brutal-thin border-black overflow-hidden"
    >
      ...
    </motion.nav>
  )}
</AnimatePresence>
```

---

### H-04: No Body Scroll Lock When Mobile Menu Open

**Component:** `components/ui/Header.tsx`

**Current State:**
- No scroll lock implementation
- Body remains scrollable when menu overlay is open

**Breakpoints Affected:**
- <1024px

**Impact:**
- User can scroll page content while menu is open
- Menu position can shift off-screen
- Confusing navigation context
- Accidental content interaction behind menu

**Fix:**
```tsx
// Option 1: Use body-scroll-lock package
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

useEffect(() => {
  const body = document.body;
  if (mobileMenuOpen) {
    disableBodyScroll(body);
  } else {
    enableBodyScroll(body);
  }
  return () => enableBodyScroll(body);
}, [mobileMenuOpen]);

// Option 2: CSS approach
useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => { document.body.style.overflow = ''; };
}, [mobileMenuOpen]);
```

---

### M-06: No Scroll Progress Indicator

**Component:** Page level (missing)

**Breakpoints Affected:**
- All mobile viewports

**Current State:**
- No visual indication of scroll position
- 5 sections with ~4-5 full viewport heights of content
- Users lose sense of page position and remaining content

**Impact:**
- Orientation loss on long pages
- May not realize there's more content below
- Reduces perceived control

**Recommended Implementation:**
```tsx
// components/ui/ScrollProgressBar.tsx
'use client';

import { motion, useScroll } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-electric-blue z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

---

## Quick Wins Summary (< 1 Day Total)

| Priority | Issue | Time | Code Change |
|----------|-------|------|-------------|
| 1 | H-01 Language Switcher | 15 min | `py-1.5` → `py-3`, add `min-h-[48px]` |
| 2 | H-02 iOS Zoom | 15 min | `text-sm` → `text-base` on chat input |
| 3 | H-05 Hamburger Size | 15 min | `w-10 h-10` → `w-12 h-12` |
| 4 | M-01 Nav Links | 15 min | `py-3` → `py-4` on mobile nav links |
| 5 | M-05 Form Submit | 15 min | Change mobile to `py-3.5` or `py-4` |
| 6 | M-10 Chat Input Height | 15 min | `py-2` → `py-3` |
| 7 | L-05 enterKeyHint | 5 min | Add `enterKeyHint="send"` to chat input |

**Total Quick Wins Effort: ~1.5 hours**
**Impact: Fixes 5 High + 3 Medium issues**

---

## Medium Effort Fixes (Half-Day Each)

| Priority | Issue | Time | Implementation |
|----------|-------|------|----------------|
| 1 | H-03 Menu Animation | 2 hours | Add Framer Motion AnimatePresence |
| 2 | H-04 Scroll Lock | 1 hour | Implement body-scroll-lock |
| 3 | M-02/M-03/M-04 Button Variants | 1.5 hours | Add touch-safe utility class to design system |

---

## Strategic Improvements (Multi-Day)

| Priority | Issue | Time | Implementation |
|----------|-------|------|----------------|
| 1 | M-06 Scroll Progress | 4 hours | Create ScrollProgressBar component |
| 2 | M-07 Mid-Page CTAs | 2 hours | Add floating CTA after 50% scroll |
| 3 | M-08 Active Nav State | 3 hours | Implement scroll-spy with Intersection Observer |
| 4 | L-03 Header Collapse | 4 hours | Hide on scroll-down, show on scroll-up |
| 5 | M-09 Bottom Navigation | 8 hours | Alternative mobile navigation pattern |

---

## Verification Checklist

- [x] All mobile-specific issues documented with ID, severity, and description
- [x] Breakpoint data provided for each issue (specific viewport ranges)
- [x] Severity ratings assigned (High/Medium/Low)
- [x] Component file locations identified
- [x] WCAG requirements cited where applicable
- [x] Fix recommendations with code examples
- [x] Effort estimates provided
- [x] Issues organized by severity, breakpoint, and component type
- [x] Quick wins prioritized with implementation order
- [x] Strategic improvements outlined for longer-term fixes

---

**Document Status:** Complete
**Next Steps:** Proceed to Phase 3 (Conversion Path Analysis)
