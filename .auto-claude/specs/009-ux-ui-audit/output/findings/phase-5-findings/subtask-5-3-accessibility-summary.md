# Consolidated Accessibility Findings — WCAG 2.1 AA Compliance Summary

**Audit Date:** 2026-01-27
**Auditor:** Claude (Senior UX/UI Accessibility Specialist)
**Standard:** WCAG 2.1 Level AA
**Site:** selfrules.org
**Scope:** Full homepage, global components, design system tokens, all interactive elements

---

## Executive Summary

selfrules.org demonstrates a **split accessibility profile**: structural foundations are strong (skip link, heading hierarchy, landmark structure, form ARIA), but interaction-layer accessibility is significantly deficient. Only 39% of interactive elements have visible focus indicators, 3 of 4 modals lack dialog semantics, and touch targets fail for several persistent UI elements. Color contrast is conditionally compliant at 84% with large-text allowances, but critical failures exist in accent color usage.

The site's strongest accessibility asset is `GoogleCalendarPopup.tsx` — a model implementation scoring 9.5/10 — which should serve as the template for all other modals and dialogs. Approximately **3 hours of targeted remediation** could raise the overall accessibility score from **5.9/10 to ~8.5/10**.

---

## WCAG 2.1 AA Compliance Scorecard

### Category Scores

| # | WCAG Principle | Category | Score | Grade | Weight | Weighted |
|---|---------------|----------|-------|-------|--------|----------|
| 1 | Perceivable | Color Contrast (Normal Text) | 7.2/10 | B | 15% | 1.08 |
| 2 | Perceivable | Color Contrast (Large Text / UI) | 8.4/10 | B+ | 10% | 0.84 |
| 3 | Perceivable | Screen Reader Compatibility | 6.0/10 | C+ | 10% | 0.60 |
| 4 | Operable | Keyboard Navigation | 6.5/10 | B- | 15% | 0.98 |
| 5 | Operable | Focus Indicators | 4.0/10 | D | 15% | 0.60 |
| 6 | Operable | Touch Targets (Mobile) | 6.5/10 | B- | 10% | 0.65 |
| 7 | Operable | Modal/Dialog Accessibility | 4.5/10 | D+ | 10% | 0.45 |
| 8 | Understandable | Skip Link & Landmarks | 9.0/10 | A | 5% | 0.45 |
| 9 | Understandable | ARIA Implementation | 6.5/10 | B- | 5% | 0.33 |
| 10 | Robust | Reduced Motion Support | 7.0/10 | B | 5% | 0.35 |
| | | **OVERALL** | **5.9/10** | **C+** | **100%** | **5.93** |

### Principle-Level Summary

| WCAG Principle | Avg Score | Status | Key Gap |
|---------------|-----------|--------|---------|
| **1. Perceivable** | 7.2/10 | CONDITIONAL PASS | Accent colors on light backgrounds fail |
| **2. Operable** | 5.4/10 | FAIL | Focus indicators (39% coverage), modal traps |
| **3. Understandable** | 7.8/10 | PASS | Minor: skip link not localized |
| **4. Robust** | 6.8/10 | CONDITIONAL PASS | Framer Motion may bypass reduced-motion |

---

## Prioritized Issue List

### Tier 1: Critical (WCAG Violations — Fix Immediately)

| # | Issue | WCAG SC | Severity | Score Impact | Effort | Components Affected |
|---|-------|---------|----------|-------------|--------|---------------------|
| A1 | **61% of interactive elements lack focus indicators** | 2.4.7 Focus Visible | CRITICAL | -3.0 | 50 min | CTAButton, Header nav, ChatTrigger, hamburger, language switcher, footer links, modal close buttons |
| A2 | **CertificationModal lacks dialog accessibility** | 4.1.2 Name/Role/Value | CRITICAL | -1.0 | 30 min | CertificationModal.tsx |
| A3 | **TestimonialModal lacks dialog accessibility** | 4.1.2 Name/Role/Value | CRITICAL | -1.0 | 30 min | TestimonialModal.tsx |
| A4 | **ChatInterface lacks dialog accessibility** | 4.1.2 Name/Role/Value | CRITICAL | -0.5 | 30 min | ChatInterface.tsx |
| A5 | **Card accent variant: white text on Cyber Yellow** | 1.4.3 Contrast (Minimum) | CRITICAL | -0.3 | 5 min | Card.tsx accent variant |
| A6 | **Language switcher 33px height (vs 44px min)** | 2.5.8 Target Size | CRITICAL | -0.3 | 5 min | Header.tsx |

### Tier 2: High (Significant Gaps — Fix This Sprint)

| # | Issue | WCAG SC | Severity | Effort | Components Affected |
|---|-------|---------|----------|--------|---------------------|
| B1 | Neon Pink badge/text fails normal-text contrast on white (3.78:1) | 1.4.3 | HIGH | 15 min | Badge tool variant, Card secondary |
| B2 | Mobile hamburger menu button 40×40px (below 44px) | 2.5.8 | HIGH | 5 min | Header.tsx |
| B3 | Header hamburger lacks `aria-expanded` | 4.1.2 | HIGH | 5 min | Header.tsx |
| B4 | ChatTrigger `aria-label` doesn't toggle with state | 4.1.2 | HIGH | 5 min | ChatTrigger.tsx |
| B5 | `text-white/30` and below fail all contrast thresholds | 1.4.3 | HIGH | 15 min | Dark sections using low-opacity text |
| B6 | iOS auto-zoom on chat input (14px font) | 1.4.4 Resize Text | HIGH | 5 min | ChatInterface.tsx |
| B7 | Mobile menu lacks body scroll lock | 2.1.1 Keyboard | HIGH | 15 min | Header.tsx |

### Tier 3: Medium (Improvements — Next Sprint)

| # | Issue | WCAG SC | Severity | Effort | Components Affected |
|---|-------|---------|----------|--------|---------------------|
| C1 | Footer links have no focus indicators | 2.4.7 | MEDIUM | 15 min | Footer.tsx |
| C2 | AnonymousQuestionForm textarea has no label | 1.3.1 | MEDIUM | 5 min | AnonymousQuestionForm.tsx |
| C3 | Form status messages lack live regions | 4.1.3 | MEDIUM | 10 min | AnonymousQuestionForm.tsx |
| C4 | NeoButton uses `focus:` instead of `focus-visible:` | 2.4.7 | MEDIUM | 5 min | NeoButton.tsx |
| C5 | Electric Blue on cream/surface-light borderline (4.16-4.40:1) | 1.4.3 | MEDIUM | 10 min | Multiple sections |
| C6 | Small button variants (sm) below 44px touch target | 2.5.8 | MEDIUM | 15 min | NeoButton, Button, CTAButton |
| C7 | Hero double-focusable `<a>` > `<NeoButton>` pattern | 2.1.1 | MEDIUM | 10 min | Hero.tsx |

### Tier 4: Low (Polish — Backlog)

| # | Issue | WCAG SC | Effort | Components Affected |
|---|-------|---------|--------|---------------------|
| D1 | Skip link is English-only (not localized to Italian) | 3.1.2 | 10 min | Layout.tsx |
| D2 | `<section>` elements lack `aria-label` | 1.3.1 | 15 min | Multiple sections |
| D3 | Decorative Hero shapes lack `aria-hidden` | 1.3.1 | 5 min | Hero.tsx |
| D4 | Footer resource links point to `#` (non-functional) | 2.1.1 | 10 min | Footer.tsx |
| D5 | Return focus to trigger on modal close | 2.4.3 | 20 min | All modals |
| D6 | Mobile menu focus management (move focus on open) | 2.4.3 | 20 min | Header.tsx |
| D7 | Framer Motion animations may not respect `prefers-reduced-motion` | 2.3.3 | 30 min | Multiple components |

---

## Color Contrast Compliance Scorecard

### Overall Statistics

| Metric | Value |
|--------|-------|
| Total color combinations audited | 86 |
| Full WCAG AA pass (normal text) | 62 (72%) |
| Pass with large-text allowance | 72 (84%) |
| Critical failures | 6 combinations |
| Conditional (large text only) | 7 combinations |
| Borderline (monitor) | 2 combinations |

### Critical Contrast Failures

| Combination | Ratio | Required | Fix |
|------------|-------|----------|-----|
| Cyber Yellow text on White | 1.48:1 | 4.5:1 | Never use as text on light; background-only with dark text |
| Lime Green text on White | 1.46:1 | 4.5:1 | Never use as text on light; background-only with dark text |
| Card accent (Cyber Yellow bg + White text) | 1.48:1 | 4.5:1 | Change text to `#0A0A0A` → 13.91:1 |
| Neon Pink on White (normal text) | 3.78:1 | 4.5:1 | Restrict to large text (24px+) or darken to `#D4005B` |
| `text-white/30` on Dark | 2.71:1 | 3.0:1 | Increase to `text-white/40` minimum |
| `text-white/20` on Dark | 1.80:1 | 3.0:1 | Decorative use only |

### Category Pass Rates

| Category | Pass Rate (Normal) | Pass Rate (Large Text) |
|----------|-------------------|----------------------|
| Structural text (body copy) | **100%** | **100%** |
| Button variants | **100%** | **100%** |
| Badge variants | **92%** | **100%** |
| Footer combinations | **80%** | **90%** |
| Brand on dark backgrounds | **71%** | **100%** |
| Card variants | **67%** | **83%** |
| Opacity text (dark mode) | **67%** | **67%** |
| Semantic colors | **50%** | **63%** |
| Brand on light backgrounds | **43%** | **57%** |

**Key Insight:** The primary reading experience (dark text on cream/white, white text on dark) achieves AAA levels. Failures are concentrated in decorative/accent color combinations.

---

## Focus & Keyboard Compliance Scorecard

### Focus Indicator Coverage

| Element Type | Total | With Focus | Without | Pass Rate |
|-------------|-------|-----------|---------|-----------|
| Buttons | 9 types | 3 | 6 | **33%** |
| Form Inputs | 5 types | 4 | 1 | **80%** |
| Links | 5 categories | 0 | 5 | **0%** |
| Modal controls | 4 | 2 | 2 | **50%** |
| **TOTAL** | **23** | **9** | **14** | **39%** |

### Modal Dialog Compliance

| Modal | Score | Focus Trap | Escape Key | role="dialog" | aria-modal | Focus on Open |
|-------|-------|-----------|-----------|---------------|-----------|--------------|
| GoogleCalendarPopup | **9.5/10** | YES | YES | YES | YES | YES |
| CertificationModal | **2.0/10** | NO | NO | NO | NO | NO |
| TestimonialModal | **2.5/10** | NO | NO | NO | NO | NO |
| ChatInterface | **4.0/10** | NO | NO | NO | NO | NO |

### Keyboard Interaction Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Tab order | PASS (with issues) | Logical flow; mobile menu breaks order |
| Skip link | PASS | Present, styled, targets `<main>` |
| Escape to close modals | PARTIAL | Only GoogleCalendarPopup |
| Enter/Space on buttons | PASS | All use native `<button>` elements |
| Focus trap in modals | PARTIAL | Only GoogleCalendarPopup |

---

## Touch Target Compliance Scorecard

### Summary by Status

| Status | Count | Percentage |
|--------|-------|-----------|
| PASS (≥48px) | 7 element types | 50% |
| BORDERLINE (40-47px) | 4 element types | 29% |
| FAIL (<44px) | 3 element types | 21% |

### Critical Touch Target Failures

| Element | Current Size | Required | Gap | Fix |
|---------|-------------|----------|-----|-----|
| Language switcher (IT/EN) | 33px height | 44px | -11px | `py-1.5` → `py-3` |
| Small button variants (sm) | ~37px height | 44px | -7px | Add `min-h-[44px]` |
| Mobile hamburger menu | 40×40px | 44×44px | -4px | `w-10 h-10` → `w-12 h-12` |

---

## Remediation Roadmap

### Phase 1: Quick Fixes (Est. 1.5 hours) — Score: 5.9 → ~7.5

These are single-line or few-line code changes with high accessibility impact:

| # | Fix | Effort | Impact | Files |
|---|-----|--------|--------|-------|
| QF1 | Add `focus-visible:ring-4 focus-visible:ring-electric-blue` to CTAButton | 5 min | HIGH | CTAButton.tsx |
| QF2 | Add focus styles to desktop nav links in Header | 10 min | HIGH | Header.tsx |
| QF3 | Add focus styles to ChatTrigger button | 5 min | HIGH | ChatTrigger.tsx |
| QF4 | Add focus styles to hamburger menu button | 5 min | HIGH | Header.tsx |
| QF5 | Add focus styles to language switcher buttons | 5 min | HIGH | Header.tsx |
| QF6 | Fix Card accent variant: text-white → text-brutal-black | 5 min | HIGH | Card.tsx |
| QF7 | Increase language switcher padding (`py-1.5` → `py-3`) | 5 min | HIGH | Header.tsx |
| QF8 | Increase hamburger button size (`w-10 h-10` → `w-12 h-12`) | 5 min | MEDIUM | Header.tsx |
| QF9 | Add `aria-expanded={mobileMenuOpen}` to hamburger | 5 min | MEDIUM | Header.tsx |
| QF10 | Toggle ChatTrigger aria-label based on open state | 5 min | MEDIUM | ChatTrigger.tsx |
| QF11 | Fix chat input font-size to 16px (prevent iOS zoom) | 5 min | HIGH | ChatInterface.tsx |
| QF12 | Add `aria-label` to AnonymousQuestionForm textarea | 5 min | MEDIUM | AnonymousQuestionForm.tsx |
| QF13 | Change NeoButton `focus:` to `focus-visible:` | 5 min | LOW | NeoButton.tsx |

### Phase 2: Strategic Fixes (Est. 2.5 hours) — Score: 7.5 → ~8.5

These require implementing patterns from the GoogleCalendarPopup exemplar:

| # | Fix | Effort | Impact | Files |
|---|-----|--------|--------|-------|
| SF1 | Add full dialog a11y to CertificationModal (role, aria-modal, focus trap, Escape, scroll lock) | 30 min | HIGH | CertificationModal.tsx |
| SF2 | Add full dialog a11y to TestimonialModal | 30 min | HIGH | TestimonialModal.tsx |
| SF3 | Add dialog a11y to ChatInterface | 30 min | HIGH | ChatInterface.tsx |
| SF4 | Add focus styles to all footer links | 15 min | MEDIUM | Footer.tsx |
| SF5 | Add live regions to AnonymousQuestionForm | 10 min | MEDIUM | AnonymousQuestionForm.tsx |
| SF6 | Create standardized `focus-brutal` utility class | 20 min | HIGH | tailwind.config.ts, globals.css |
| SF7 | Add `min-h-[44px]` to small button variants | 15 min | MEDIUM | NeoButton, Button, CTAButton |

### Phase 3: Polish (Est. 2 hours) — Score: 8.5 → ~9.0

| # | Fix | Effort | Impact |
|---|-----|--------|--------|
| PF1 | Localize skip link text (IT/EN) | 10 min | LOW |
| PF2 | Add `aria-label` to all `<section>` landmarks | 15 min | LOW |
| PF3 | Add `aria-hidden="true"` to decorative Hero shapes | 5 min | LOW |
| PF4 | Implement return-focus-to-trigger for all modals | 20 min | MEDIUM |
| PF5 | Mobile menu focus management | 20 min | MEDIUM |
| PF6 | Create accessible color alternatives (darkened Neon Pink, lighter Teal/Purple) | 20 min | MEDIUM |
| PF7 | Ensure Framer Motion respects `useReducedMotion()` in all components | 30 min | MEDIUM |

---

## Design System Recommendations

### 1. Standardize Focus Ring

Create a reusable focus utility to eliminate the current inconsistency (4 different focus patterns + 14 elements with none):

```css
/* Proposed: focus-brutal utility */
.focus-brutal:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px #0D7EFF; /* Electric Blue, 4px solid */
}
```

Apply to all buttons, links, and custom interactive components.

### 2. Color Usage Guidelines

| Color | Safe On Light | Safe On Dark | Restriction |
|-------|-------------|-------------|-------------|
| Electric Blue | YES (text) | YES (text) | Borderline on cream — prefer on white |
| Teal | YES (text) | LARGE TEXT ONLY | No body text on dark |
| Deep Purple | YES (text) | LARGE TEXT ONLY | No body text on dark |
| Neon Pink | LARGE TEXT ONLY | YES (text) | Darken to #D4005B for small text on light |
| Cyber Yellow | BACKGROUND ONLY | YES (text) | Never as text on light; always dark text on yellow bg |
| Lime Green | BACKGROUND ONLY | YES (text) | Never as text on light; always dark text on green bg |

### 3. Touch Target Minimum

Add a design system rule: all interactive elements must meet 44×44px minimum. Implement via:
- `touch-target-safe` utility class (`min-h-[48px] min-w-[48px]`)
- Apply automatically to all `sm` button variants on touch devices

### 4. Modal Template

Extract GoogleCalendarPopup's accessibility pattern into a reusable `AccessibleModal` component with:
- `role="dialog"` + `aria-modal="true"`
- `aria-label` or `aria-labelledby`
- Focus trap (Tab/Shift+Tab cycling)
- Escape key to close
- Body scroll lock
- Focus on open → return focus on close

---

## Strengths to Preserve

| Strength | Score | Why It Works |
|----------|-------|-------------|
| Skip link implementation | 9/10 | Properly hidden, branded styling, correct target |
| Heading hierarchy | 9/10 | Single h1, logical nesting, no skipped levels |
| Landmark structure | 8/10 | header, nav, main, section, footer all present |
| Form input ARIA | 9/10 | aria-invalid, aria-describedby, role="alert" on errors |
| GoogleCalendarPopup | 9.5/10 | Model implementation — focus trap, Escape, ARIA, scroll lock |
| Structural text contrast | 10/10 | Body text achieves AAA on all backgrounds |
| Button/Badge contrast | 9.5/10 | Nearly perfect across all interactive components |
| Reduced motion CSS | 7/10 | Global `prefers-reduced-motion` media query in place |

---

## Overall Accessibility Verdict

| Metric | Value |
|--------|-------|
| **Overall Score** | **5.9/10 (C+)** |
| **Projected Score After Quick Fixes** | **~7.5/10 (B)** |
| **Projected Score After Strategic Fixes** | **~8.5/10 (A-)** |
| **Projected Score After Full Remediation** | **~9.0/10 (A)** |
| **Total Remediation Effort** | **~6 hours** |
| **Quick Win Effort (biggest ROI)** | **~1.5 hours → +1.6 points** |
| **Total Issues Identified** | **28** |
| **Critical Issues** | **6** |
| **High Issues** | **7** |
| **Medium Issues** | **7** |
| **Low Issues** | **8** |

### Risk Assessment

| Risk Level | Area | Explanation |
|-----------|------|-------------|
| **HIGH** | Legal/Compliance | Focus indicator gaps (61% missing) constitute WCAG 2.4.7 violations. European Accessibility Act (EAA) enforcement begins June 2025. |
| **MEDIUM** | User Impact | Keyboard-only and screen reader users cannot effectively use modals (3/4 non-compliant). |
| **LOW** | Color Contrast | Primary reading experience is AAA-compliant. Failures are in accent/decorative contexts. |
| **LOW** | Touch Targets | Most primary CTAs pass. Failures are in secondary UI (language switcher, small buttons). |

### Bottom Line

The site has a **strong structural accessibility foundation** (landmarks, headings, skip link, form ARIA) but an **interaction accessibility gap** (focus indicators, modal dialogs, keyboard navigation). The gap is highly concentrated — fixing focus indicators alone would raise the score by ~2 points. The GoogleCalendarPopup proves the team can build excellent accessible components; the challenge is applying that same pattern consistently across all interactive elements.

---

**Status:** Complete
**Generated:** 2026-01-27
**Standard:** WCAG 2.1 Level AA
**Cross-references:** subtask-5-1 (Color Contrast), subtask-5-2 (Keyboard/Screen Reader), subtask-2-1 (Touch Targets)
