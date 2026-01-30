# Top 5 Conversion-Killing Problems

> **Audit:** selfrules.org UX/UI Audit
> **Date:** 2026-01-27
> **Overall Estimated Current Conversion Rate:** 2-4%
> **Potential Post-Fix Conversion Rate:** 3.5-6.0% (+50-75% improvement)

---

## Ranking Methodology

Problems are ranked by **composite conversion impact** using three weighted factors:

| Factor | Weight | Description |
|--------|--------|-------------|
| Reach | 40% | % of users affected by this problem |
| Severity | 35% | How badly the problem hurts conversion per affected user |
| Fixability | 25% | Ease of fix (higher = quicker ROI) |

**Impact Score** = (Reach x 0.4) + (Severity x 0.35) + (Fixability x 0.25), scaled 1-10.

---

## Problem #1: No Persistent CTA Visible During Scroll

**Impact Score: 9.2/10**
**Estimated Conversion Lift if Fixed: +0.8-1.2%**

### The Problem

The site has 5 content sections spanning 4-6 viewport heights. The two booking CTAs are anchored at the top (Hero) and bottom (WorkTogether section). Once a visitor scrolls past the Hero, there is **no visible call-to-action for 3-4 full screens** until they reach the WorkTogether banner. Users who feel convinced mid-scroll have nowhere to act on that impulse.

### Root Cause

The page was designed section-by-section rather than as a conversion funnel. Each section is self-contained with its own purpose, but no persistent conversion layer spans the full journey. The architectural assumption is that users will scroll the entire page before deciding - a pattern that contradicts scroll-depth analytics showing 40-60% of users never reach the bottom half.

### Evidence

| Source | Finding |
|--------|---------|
| Phase 1 - User Journey Map | 5 sections mapped; CTAs clustered at positions 1 and 4 of 5. No mid-page conversion prompts identified. |
| Phase 3 - CTA Click Path | 25 CTAs catalogued; primary booking CTAs score 7/10 and 9/10 but require 3-6 clicks from entry. "Users reaching WorkTogether have already scrolled through ~3000px of content." |
| Phase 3 - LIFT Model | Friction score: 6/10. "Long scroll depth (4-5 viewports) creates abandonment risk before reaching primary conversion CTA." |
| Phase 4 - Competitive Gap | Gibson Biddle uses a sticky header CTA; Lenny Rachitsky places newsletter capture above the fold. Both eliminate the "scroll to convert" problem. |

### Recommended Fix

Add a **floating "Book a Call" button** that appears after scrolling past the Hero section (>1 viewport). Use the existing `GoogleCalendarPopup` component as the trigger target. Estimated effort: 2-3 hours.

```
Floating CTA (position: fixed, bottom-right)
  └── Triggers GoogleCalendarPopup on click
  └── Appears: after scrollY > window.innerHeight
  └── Style: neobrutalist button with shadow-brutal, pulse animation
```

---

## Problem #2: Google Calendar Iframe Creates Brand Disconnect and Friction

**Impact Score: 8.5/10**
**Estimated Conversion Lift if Fixed: +0.5-0.8%**

### The Problem

The booking flow - the site's **sole monetization path** - hands users off to a Google Calendar iframe that takes 2-3 seconds to load and presents a completely different visual language (Google Material Design) inside a neobrutalist wrapper. This creates:

1. **Perceived slowness**: No skeleton/placeholder during the 2-3s load, just a spinner
2. **Brand discontinuity**: Google's rounded corners, subtle shadows, and system fonts clash with the site's bold borders, hard shadows, and Space Grotesk typography
3. **Trust disruption**: The iframe feels like leaving the site, reducing the "safe environment" the narrative content carefully built

### Root Cause

The booking system uses `GoogleCalendarPopup.tsx` which embeds `calendar.google.com` via iframe. While the modal wrapper is well-built (9.5/10 accessibility), the iframe content is uncontrollable. Additionally, an unused custom booking infrastructure exists (`bookingStore.ts` with Zustand + `google-calendar.ts` API functions) that could power a native branded experience but was never connected.

### Evidence

| Source | Finding |
|--------|---------|
| Phase 3 - Form/Booking Audit | "2-3s iframe loading with no skeleton UI. Brand disconnect between neobrutalist wrapper and Google Material UI inside iframe." |
| Phase 3 - LIFT Model | Friction: 6/10. "Iframe booking creates perceived complexity. Users experience jarring visual transition." |
| Phase 4 - Competitive Gap | Teresa Torres uses a branded Calendly embed with customized styling. Gibson Biddle uses native calendar integration. Both maintain brand consistency. |
| Codebase Discovery | `lib/stores/bookingStore.ts` and `lib/api/google-calendar.ts` exist with full booking flow logic (date selection, time slots, event creation) but are unused. |

### Recommended Fix

**Quick win (2 hours):** Add skeleton loading state matching neobrutalist design, pre-fetch iframe on CTA hover to reduce perceived load time.

**Strategic fix (1-2 days):** Activate the existing `bookingStore` + `google-calendar.ts` API to build a native branded booking flow. The infrastructure already exists - it needs UI components and wiring.

---

## Problem #3: Missing Urgency and Scarcity Signals

**Impact Score: 7.8/10**
**Estimated Conversion Lift if Fixed: +0.4-0.7%**

### The Problem

The site excels at Clarity (9/10) and Anxiety reduction (8/10) but scores only **5/10 on Urgency** - the lowest LIFT model dimension. There are zero mechanisms communicating:

- **Availability scarcity**: How many client slots are open?
- **Time pressure**: When is the next available slot?
- **Social momentum**: How many others are booking?
- **Consequence of delay**: What happens if they wait?

The implicit message is "I'm always available" - which paradoxically reduces the perceived value of the consultation and removes motivation to act now.

### Root Cause

The site's content strategy focuses on storytelling and trust-building (which it does exceptionally well) but treats the conversion moment as a passive endpoint rather than an active trigger. No dynamic data from the Google Calendar API is surfaced to create real-time urgency signals. The booking CTA text ("Prenota ora" / "Parliamone") is static and gives no indication of availability.

### Evidence

| Source | Finding |
|--------|---------|
| Phase 3 - LIFT Model | Urgency: 5/10 (lowest score). "No explicit urgency mechanisms. No scarcity indicators, countdown timers, or availability signals." |
| Phase 3 - CTA Analysis | "CTA copy is action-oriented but lacks urgency framing. No dynamic availability indicators near CTAs." |
| Phase 4 - Feature Gap | Gibson Biddle displays "limited spots" messaging. Teresa Torres uses cohort-based enrollment with deadlines. selfrules.org has neither. |
| Phase 1 - First Impression | Trust indicators are strong (13 years, named companies) but no "act now" triggers present in first 5 seconds. |

### Recommended Fix

**Quick win (1 hour):** Add static urgency copy to WorkTogether banner: "Currently accepting 3 new clients this month" or "Next available slot: [date]".

**Dynamic fix (4-6 hours):** Use the existing Google Calendar API integration to fetch and display the next available booking slot near primary CTAs: "Next free slot: Thursday 2:30 PM".

---

## Problem #4: Widespread Focus Indicator Failures Block Keyboard Users

**Impact Score: 7.3/10**
**Estimated Conversion Lift if Fixed: +0.2-0.3% (direct), Legal/compliance risk avoidance (indirect)**

### The Problem

Only **39% of interactive elements** have visible focus indicators. This is a **WCAG 2.4.7 violation** affecting every keyboard-only user, screen reader user, and motor-impaired user navigating with switch devices. Specifically:

- **0% of links** have custom focus styles (all navigation, footer, inline links)
- **CTAButton** (the primary conversion button) has no focus indicator
- **Header navigation links**: invisible to keyboard users
- **Language switcher, hamburger menu, footer links**: all lack focus styles
- **CertificationModal and TestimonialModal**: lack `role="dialog"`, focus trapping, and Escape key handling

The irony: `GoogleCalendarPopup` (the booking modal) has **exemplary** accessibility (9.5/10) - proving the team knows how to do it right, but the pattern wasn't replicated.

### Root Cause

Focus styles were implemented per-component by the design system (`Button.tsx`, `Input.tsx` have good focus rings) but never applied globally to links and interactive elements outside the formal design system. The `CTAButton` component (used for primary conversion CTAs) was built separately from `Button.tsx` and missed the focus style pattern entirely. Modal accessibility was implemented for `GoogleCalendarPopup` but `CertificationModal` and `TestimonialModal` were built without the same rigor.

### Evidence

| Source | Finding |
|--------|---------|
| Phase 5 - Keyboard/Screen Reader Audit | Focus indicator coverage: 4/10. "Only 39% of interactive elements have visible focus indicators. All links at 0%." |
| Phase 5 - Accessibility Report | Overall keyboard score: 5.78/10 (Grade C+). "WCAG 2.4.7 non-compliance across navigation, CTAs, and utility elements." |
| Phase 5 - Screen Reader Findings | CertificationModal and TestimonialModal scored 2/10 for accessibility. "No role=dialog, no focus trap, no Escape key handler, no aria-modal." |
| Phase 2 - Mobile Issues | Hamburger menu lacks `aria-expanded` attribute; language switcher has no focus indicator. |

### Recommended Fix

**Quick win (1 hour):** Add global focus-visible styles to `globals.css`:
```css
a:focus-visible, button:focus-visible {
  outline: 4px solid #0D7EFF;
  outline-offset: 2px;
}
```

**Component fix (2-3 hours):** Add `focus-visible:ring-4 focus-visible:ring-electric-blue` to CTAButton. Replicate GoogleCalendarPopup's modal pattern (focus trap, Escape, aria-modal) to CertificationModal and TestimonialModal.

---

## Problem #5: Mobile Touch Target and Interaction Failures

**Impact Score: 7.0/10**
**Estimated Conversion Lift if Fixed: +0.2-0.4%**

### The Problem

Five distinct mobile interaction issues compound to create a frustrating experience for the 60%+ of visitors likely arriving on mobile devices:

1. **Language switcher at 33px height** (WCAG minimum: 44px) - 25% below compliance
2. **Chat input at 14px font** triggers iOS Safari auto-zoom, disrupting the conversation flow
3. **Mobile menu has no animation** - appears/disappears instantly, feels broken or glitchy
4. **No body scroll lock when menu is open** - page scrolls behind the menu overlay
5. **Hamburger button at 40x40px** - borderline (44px is WCAG AA target)

These issues don't each kill conversion alone, but together they create a "death by a thousand cuts" experience where mobile users subconsciously feel the site isn't polished enough to trust with their time.

### Root Cause

The site was primarily designed for desktop with mobile as a secondary consideration. Evidence: the neobrutalist design tokens (border-brutal, shadow-brutal) translate well visually to mobile, but interaction patterns (touch targets, scroll behaviors, input focus) weren't specifically audited. The mobile hamburger menu was implemented as a minimal toggle (`display: none` / `display: block`) without the scroll management and animation polish that mobile users expect from 2025+ web experiences.

### Evidence

| Source | Finding |
|--------|---------|
| Phase 2 - Touch Target Audit | Language switcher: 33px (11px below 44px minimum). Hamburger: 40x40px (4px below minimum). Button sm variants: ~37px (7px below). |
| Phase 2 - Mobile Navigation | "Menu transition is instant (no animation), creating a jarring experience. No body scroll lock - page content remains scrollable behind menu." |
| Phase 2 - Mobile Issues Summary | 21 total issues: 5 High, 11 Medium, 5 Low. Overall mobile score: 6.5/10. |
| Phase 5 - Accessibility | Language switcher flagged independently as WCAG touch target failure. iOS zoom on chat input confirmed via font-size analysis. |

### Recommended Fix

**Quick wins (30 minutes total):**
- Language switcher: increase padding (`py-1.5` -> `py-3`) for 45px+ height
- Hamburger: increase size (`w-10 h-10` -> `w-12 h-12`) for 48px
- Chat input: change `text-sm` to `text-base` (16px prevents iOS zoom)

**Polish fixes (2-3 hours):**
- Add CSS transition or Framer Motion animation to mobile menu open/close
- Implement `useScrollLock` hook for menu overlay
- Add `aria-expanded` to hamburger button

---

## Summary: Impact Matrix

| Rank | Problem | Impact Score | Conv. Lift | Effort | ROI Priority |
|------|---------|-------------|------------|--------|-------------|
| #1 | No persistent CTA during scroll | 9.2 | +0.8-1.2% | 2-3 hrs | **Highest** |
| #2 | Booking iframe brand disconnect | 8.5 | +0.5-0.8% | 2 hrs (quick) / 2 days (full) | **High** |
| #3 | Missing urgency/scarcity signals | 7.8 | +0.4-0.7% | 1-6 hrs | **High** |
| #4 | Focus indicator failures (a11y) | 7.3 | +0.2-0.3% + compliance | 1-3 hrs | **High (legal)** |
| #5 | Mobile touch/interaction failures | 7.0 | +0.2-0.4% | 30 min - 3 hrs | **Quick win** |

### Combined Potential

| Scenario | Effort | Conversion Impact |
|----------|--------|-------------------|
| Quick wins only (#1 floating CTA + #3 static urgency + #4 global focus + #5 touch fixes) | ~5 hours | +1.0-1.5% |
| All recommended fixes | ~2-3 days | +2.1-3.4% |
| Full strategic fixes (native booking + dynamic urgency + complete a11y remediation) | ~1-2 weeks | +2.5-4.0% |

**Bottom line:** From an estimated 2-4% baseline conversion rate, implementing all quick wins could push the site to 3-5.5%, and full strategic fixes could achieve 4.5-8% - placing selfrules.org in the **top quartile** of consulting portfolio conversion rates.
