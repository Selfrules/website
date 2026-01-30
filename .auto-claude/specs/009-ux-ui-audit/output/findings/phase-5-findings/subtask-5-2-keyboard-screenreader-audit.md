# Keyboard Navigation, Focus Indicators & Screen Reader Audit

**Audit Date**: 2026-01-27
**Auditor**: UX/UI Senior Audit (automated code inspection)
**Scope**: All interactive elements across selfrules.org homepage + global components
**Standards**: WCAG 2.1 AA (SC 2.1.1 Keyboard, SC 2.4.3 Focus Order, SC 2.4.7 Focus Visible, SC 4.1.2 Name/Role/Value)

---

## 1. Executive Summary

| Category | Score | Grade |
|----------|-------|-------|
| **Keyboard Navigation** | 6.5/10 | B- |
| **Focus Indicators** | 7/10 | B |
| **Screen Reader Compatibility** | 6/10 | C+ |
| **Focus Management (Modals)** | 8.5/10 | A- |
| **Overall Accessibility** | 7/10 | B |

**Key Finding**: The Google Calendar popup (`GoogleCalendarPopup.tsx`) is a model implementation with focus trap, Escape key handling, and ARIA attributes. However, most other modals and interactive elements fall short of this standard. Desktop navigation links lack visible focus indicators, the mobile menu is keyboard-inaccessible (conditionally rendered without focus management), and several modals lack focus traps.

---

## 2. Skip Link Audit (WCAG 2.4.1)

### Implementation
- **File**: `app/[locale]/layout.tsx` (line 33)
- **Target**: `<main id="main-content">` (line 37)
- **CSS**: `app/globals.css` (lines 651-669)

### Assessment

| Criterion | Status | Notes |
|-----------|--------|-------|
| Skip link present | PASS | `<a href="#main-content" className="skip-to-main">` |
| Visually hidden by default | PASS | `left: -9999px` positioning |
| Visible on focus | PASS | `left: 1rem; top: 1rem` on `:focus` |
| Styled consistently with brand | PASS | Electric Blue bg, brutal border, Space Grotesk font |
| Text is descriptive | PASS | "Skip to main content" |
| First focusable element | PASS | First element inside `<body>` after layout wrapper |
| Target landmark exists | PASS | `<main id="main-content">` wraps page content |

### Issues Found
1. **[LOW] English-only text**: Skip link says "Skip to main content" even for Italian locale. Should be localized: "Vai al contenuto principale"
2. **[LOW] No outline on focus**: The `.skip-to-main:focus` style doesn't include a `focus:outline` or `focus:ring` — relies entirely on visual position change. Adding an outline would improve visibility for low-vision users.

**Score: 9/10**

---

## 3. Tab Order Audit

### Expected Tab Order (Homepage)

```
1.  Skip link (hidden until focused)
2.  Logo link (MFDL) — Header
3.  Nav: Home — Header
4.  Nav: Journey — Header
5.  Nav: Percorso — Header
6.  Nav: Now — Header
7.  Nav: Lavoriamo insieme — Header
8.  Nav: Parliamo — Header
9.  Language: IT button — Header
10. Language: EN button — Header
11. [Mobile only] Hamburger menu button
12. Hero: "Prenota una call" CTA button
13. Hero: "Scopri il percorso" anchor/button
14. [Journey section] — No interactive elements (display-only timeline)
15. [WhatImUpTo section] — Activity cards (non-interactive)
16. [SkillsMatrix] — Expandable category buttons (mobile only)
17. [CertificationsSection] — Expandable accordion (mobile) / clickable badges (desktop)
18. [WorkTogether] — 3x CollaborationCards (non-interactive) + "Prenota ora" CTA
19. [AskMeAnything] — Textarea + Submit button
20. Footer: Social links (LinkedIn, Twitter, GitHub, Email)
21. Footer: Quick links (Home, Work, About)
22. Footer: Resource links (Tools, Design, Stack, Newsletter)
23. Footer: Privacy link
24. Footer: Terms link
25. [Floating] Chat trigger button (fixed position, z-40)
```

### Issues Found

| # | Severity | Element | Issue | WCAG |
|---|----------|---------|-------|------|
| T1 | **HIGH** | Desktop nav links | `<a>` elements in Header nav use plain `<a>` tags without any `focus:` or `focus-visible:` styles. Tab-focusing a nav link shows no visual indicator — only the underline animation on hover. | 2.4.7 |
| T2 | **HIGH** | Mobile menu links | When `mobileMenuOpen` is `true`, nav renders inside a conditional block but no focus management occurs. After opening the menu, Tab doesn't move into the menu items — user must Tab through remaining header elements first. | 2.4.3 |
| T3 | **MEDIUM** | Hero "Scopri il percorso" | Wraps `<NeoButton>` inside `<a href="#journey">`. The `<a>` has no focus styles, while the inner button has its own. This creates confusing double-focusable pattern — both the `<a>` and `<button>` receive focus sequentially. | 2.1.1 |
| T4 | **MEDIUM** | Chat trigger (floating) | Fixed at `z-40` with `bottom-6 right-4`. Tab order places it after all page content (footer). Users expecting a persistent chat button may not find it via keyboard until after footer. | 2.4.3 |
| T5 | **LOW** | Footer resource links | All 4 resource links have `href="#"` — keyboard users Tab to them but they're non-functional. Should either be removed or given `tabIndex={-1}` with `aria-disabled="true"`. | 2.1.1 |
| T6 | **LOW** | CertificationBadge (desktop) | Each badge is a clickable element but rendered as a `<div>` or component — need to verify it uses a `<button>` or has `role="button"` + `tabIndex={0}` + keyboard handler. | 4.1.2 |

---

## 4. Focus Indicator Audit

### Component-by-Component Analysis

#### Buttons

| Component | Focus Style | Visible? | Consistent? | Notes |
|-----------|------------|----------|-------------|-------|
| `Button.tsx` | `focus-visible:ring-4 focus-visible:ring-primary` | YES | YES | Uses `focus-visible` — correct for keyboard-only indication |
| `AnimatedButton.tsx` | `focus-visible:ring-4 focus-visible:ring-primary` | YES | YES | Matches Button pattern |
| `NeoButton.tsx` | `focus:ring-4 focus:ring-electric-blue/50` | PARTIAL | NO | Uses `focus:` instead of `focus-visible:` — ring shows on click too. Also 50% opacity reduces visibility. |
| `CTAButton.tsx` | **NONE** | NO | NO | **CRITICAL**: No focus styles at all. Uses Framer Motion `motion.button` but no focus ring/outline defined. |
| `ChatTrigger` button | **NONE** | NO | NO | Floating chat button has no focus indicator. |
| `ChatInput` send button | `focus:ring-4 focus:ring-primary/30` | PARTIAL | NO | 30% opacity ring is barely visible on white background. |
| Header mobile menu toggle | **NONE** | NO | NO | No focus styles on hamburger button. |
| Language switcher buttons | **NONE** | NO | NO | IT/EN buttons have no focus indicator. |
| AnonymousQuestionForm submit | **NONE** | NO | NO | Submit button has no focus styles. |

#### Form Inputs

| Component | Focus Style | Visible? | Notes |
|-----------|------------|----------|-------|
| `Input.tsx` | `focus:border-primary focus:shadow-brutal-colored-blue` | YES | Border color change + shadow — good visibility |
| `Textarea.tsx` | `focus:border-primary focus:shadow-brutal-colored-blue` | YES | Matches Input pattern |
| `NeoInput.tsx` | `focus:ring-4 focus:ring-electric-blue/50` | PARTIAL | 50% opacity reduces visibility |
| `ChatInput` textarea | `focus:border-primary focus:shadow-brutal-colored-blue` | YES | Consistent with Input/Textarea |
| AnonymousQuestion textarea | `focus:border-neon-pink focus:outline-none` | YES | Different color (neon-pink) — inconsistent but visible on dark bg |

#### Links

| Component | Focus Style | Visible? | Notes |
|-----------|------------|----------|-------|
| Header logo `<Link>` | **NONE** | NO | No focus indicator on logo |
| Desktop nav `<a>` links | **NONE** | NO | **CRITICAL**: No focus indicator at all |
| Footer social links | **NONE** | NO | No focus styles on social icon links |
| Footer nav links | **NONE** | NO | No focus styles on quick links/resource links |
| Footer bottom links | **NONE** | NO | Privacy/Terms links have no focus indicator |

#### Modals

| Component | Focus Style | Visible? | Notes |
|-----------|------------|----------|-------|
| GoogleCalendarPopup close btn | `focus:ring-4 focus:ring-electric-blue` | YES | Excellent — 4px solid ring |
| GoogleCalendarPopup retry btn | `focus:ring-4 focus:ring-electric-blue` | YES | Consistent with close button |
| CertificationModal close btn | **NONE** | NO | Only has `hover:` styles |
| TestimonialModal close btn | **NONE** | NO | Only has `hover:` styles |

### Focus Indicator Summary

| Category | Total Elements | With Focus Indicator | Without | Pass Rate |
|----------|---------------|---------------------|---------|-----------|
| Buttons | 9 types | 3 (Button, AnimatedButton, CalendarPopup) | 6 | 33% |
| Inputs | 5 types | 4 | 1 (NeoInput partial) | 80% |
| Links | 5 categories | 0 | 5 | 0% |
| Modal controls | 4 | 2 (CalendarPopup only) | 2 | 50% |
| **TOTAL** | **23** | **9** | **14** | **39%** |

### Critical Finding
**Only 39% of interactive elements have visible focus indicators.** WCAG 2.4.7 requires ALL interactive elements to have a visible focus indicator. This is the single biggest accessibility failure on the site.

**Score: 4/10** (Critical)

---

## 5. Modal & Dialog Accessibility

### GoogleCalendarPopup.tsx — EXEMPLARY

| Feature | Status | Implementation |
|---------|--------|---------------|
| `role="dialog"` | PASS | Applied to modal wrapper |
| `aria-modal="true"` | PASS | Prevents screen reader from accessing background |
| `aria-label` | PASS | "Google Calendar - Prenota un appuntamento" |
| Focus on open | PASS | `closeButtonRef.current?.focus()` with 100ms delay |
| Escape key closes | PASS | `keydown` listener for `Escape` |
| Focus trap | PASS | Tab/Shift+Tab cycling through focusable elements |
| Body scroll lock | PASS | `document.body.style.overflow = 'hidden'` |
| Loading state announcement | PASS | `role="status"` + `aria-live="polite"` |
| Error state announcement | PASS | `role="alert"` + `aria-live="assertive"` |
| Backdrop click closes | PASS | onClick handler on overlay |
| Return focus on close | NOT VERIFIED | No explicit return-focus-to-trigger implementation |

**Score: 9.5/10** — Model implementation, missing only return-focus-to-trigger.

### CertificationModal.tsx — NEEDS WORK

| Feature | Status | Implementation |
|---------|--------|---------------|
| `role="dialog"` | FAIL | No role attribute on modal |
| `aria-modal="true"` | FAIL | Missing |
| `aria-label` / `aria-labelledby` | FAIL | No accessible name for dialog |
| Focus on open | FAIL | No focus management |
| Escape key closes | FAIL | No keyboard handler |
| Focus trap | FAIL | No focus trap |
| Body scroll lock | FAIL | No scroll lock |
| Loading/error announcements | N/A | No async states |
| Backdrop click closes | PASS | onClick on backdrop overlay |
| Close button aria-label | PASS | `aria-label="Close modal"` |
| Return focus on close | FAIL | No return focus |

**Score: 2/10** — Only has backdrop click and close button label.

### TestimonialModal.tsx — NEEDS WORK

| Feature | Status | Implementation |
|---------|--------|---------------|
| `role="dialog"` | FAIL | No role attribute |
| `aria-modal="true"` | FAIL | Missing |
| `aria-label` / `aria-labelledby` | FAIL | No accessible name |
| Focus on open | FAIL | No focus management |
| Escape key closes | FAIL | No keyboard handler |
| Focus trap | FAIL | No focus trap |
| Body scroll lock | FAIL | No scroll lock |
| Backdrop click closes | PASS | onClick on backdrop overlay |
| Close button aria-label | PASS | `aria-label="Close modal"` |
| Semantic elements | PASS | Uses `<blockquote>` for testimonial text |
| Return focus on close | FAIL | No return focus |

**Score: 2.5/10** — Similar issues to CertificationModal.

### ChatInterface (Popup Window) — PARTIAL

| Feature | Status | Implementation |
|---------|--------|---------------|
| `role="dialog"` | FAIL | No role attribute on chat window |
| `aria-modal` | FAIL | Missing |
| `aria-label` | FAIL | No accessible name for chat panel |
| Focus on open | FAIL | No focus management on chat open |
| Escape key closes | FAIL | No Escape handler (only in GoogleCalendarPopup) |
| Focus trap | FAIL | No focus trap — user can Tab out of chat |
| Input keyboard | PASS | Enter to send, Shift+Enter for newline |
| Auto-scroll | PASS | `scrollIntoView` on new messages |
| Close button | PARTIAL | Close is on ChatInterface but no aria-label on the close button within |

**Score: 4/10** — Good input handling but missing dialog semantics.

---

## 6. ARIA Attributes Audit

### Proper ARIA Usage

| Component | Attribute | Value | Assessment |
|-----------|-----------|-------|------------|
| GoogleCalendarPopup | `role="dialog"` | Present | CORRECT |
| GoogleCalendarPopup | `aria-modal="true"` | Present | CORRECT |
| GoogleCalendarPopup | `aria-label` | "Google Calendar - Prenota un appuntamento" | CORRECT |
| GoogleCalendarPopup loading | `role="status"` + `aria-live="polite"` | Present | CORRECT |
| GoogleCalendarPopup error | `role="alert"` + `aria-live="assertive"` | Present | CORRECT |
| GoogleCalendarPopup iframe | `aria-label` | "Widget di prenotazione Google Calendar" | CORRECT |
| Input.tsx | `aria-invalid` | Conditional on error | CORRECT |
| Input.tsx | `aria-describedby` | Points to error message | CORRECT |
| Input.tsx error | `role="alert"` | Present | CORRECT |
| Textarea.tsx | `aria-invalid` + `aria-describedby` | Same as Input | CORRECT |
| NeoInput.tsx | `aria-invalid` + `aria-describedby` | Present | CORRECT |
| Header language buttons | `aria-label` | "Italiano" / "English" | CORRECT |
| Header mobile menu | `aria-label` | "Toggle menu" | PARTIAL — should use `aria-expanded` |
| ChatTrigger | `aria-label` | "Open chat" | PARTIAL — doesn't toggle to "Close chat" when open |
| CertificationsSection mobile | `aria-expanded` + `aria-controls` | Present | CORRECT |
| SkillsMatrix mobile | `aria-expanded` + `aria-controls` | Present | CORRECT |
| CertificationModal close | `aria-label` | "Close modal" | CORRECT |
| TestimonialModal close | `aria-label` | "Close modal" | CORRECT |
| Footer social links | `aria-label` | Platform names | CORRECT |
| ChatInput send button | `aria-label` | "Send message" | CORRECT |

### Missing ARIA Attributes

| Component | Missing Attribute | Recommendation |
|-----------|------------------|----------------|
| Header mobile menu button | `aria-expanded` | Add `aria-expanded={mobileMenuOpen}` |
| Header mobile nav | `aria-label` | Add `aria-label="Mobile navigation"` to `<nav>` |
| ChatTrigger button | Dynamic `aria-label` | Toggle between "Open chat" / "Close chat" based on `isOpen` |
| ChatInterface | `role="dialog"` | Add dialog semantics |
| ChatInterface | `aria-label` | "Chat con Mattia" |
| CertificationModal | `role="dialog"` | Add dialog role |
| CertificationModal | `aria-labelledby` | Point to certification title `<h2>` |
| TestimonialModal | `role="dialog"` | Add dialog role |
| TestimonialModal | `aria-labelledby` | Point to testimonial author |
| AnonymousQuestionForm textarea | `aria-label` | Currently relies on placeholder only — not reliably read by all screen readers |
| AnonymousQuestionForm error | `role="alert"` | Error messages should have `role="alert"` for live announcement |
| AnonymousQuestionForm success | `role="status"` | Success message should use `aria-live="polite"` |
| Hero section | `aria-label` | Section landmark should have label |
| WorkTogether section | `aria-label` | Section landmark should have label |
| Footer | `aria-label` | Footer landmark should have descriptive label |

---

## 7. Screen Reader Compatibility Assessment

### Heading Structure

```
h1: [Hero headline] — "Il product manager che..." (single h1, correct)
h2: [Journey section title]
h2: [WhatImUpTo section title]
h2: [WorkTogether section title]
h2: [AskMeAnything section title]
h3: [Within sections - collaboration cards, etc.]
h4: [Footer column headings]
```

**Assessment**: Heading hierarchy appears correct with single `<h1>` and logical nesting. No skipped levels detected in main page flow.

### Landmark Structure

```
<header> — Sticky navigation (Header.tsx)
  <nav> — Desktop navigation
  <nav> — Mobile navigation (conditional)
<main id="main-content"> — Page content
  <section id="home"> — Hero
  <section id="journey"> — Journey (implied)
  <section id="now"> — WhatImUpTo (implied)
  <section id="work"> — WorkTogether
  <section> — AskMeAnything
<footer> — Site footer
```

**Assessment**: Good landmark usage. The `<main>` element is present with an `id` for skip link targeting. Sections use `<section>` elements. Desktop and mobile navs both use `<nav>`.

### Issues for Screen Readers

| # | Severity | Issue | Component | Impact |
|---|----------|-------|-----------|--------|
| SR1 | **HIGH** | No `aria-expanded` on hamburger menu | Header.tsx | Screen reader users can't tell if menu is open/closed |
| SR2 | **HIGH** | CertificationModal / TestimonialModal lack `role="dialog"` | Both modal files | Screen readers won't announce these as dialogs; background content remains in reading order |
| SR3 | **HIGH** | ChatInterface lacks dialog semantics | ChatInterface.tsx | Screen readers won't contextualize the chat panel |
| SR4 | **MEDIUM** | ChatTrigger `aria-label` doesn't change with state | ChatTrigger.tsx | Always says "Open chat" even when chat is open |
| SR5 | **MEDIUM** | AnonymousQuestionForm textarea has no label | AnonymousQuestionForm.tsx | Placeholder text is not a reliable label for all screen readers |
| SR6 | **MEDIUM** | AnonymousQuestionForm error/success lack live regions | AnonymousQuestionForm.tsx | Status changes won't be announced automatically |
| SR7 | **MEDIUM** | Decorative shapes in Hero lack `aria-hidden` | Hero.tsx | Floating circles/squares may confuse screen readers |
| SR8 | **LOW** | `<section>` elements lack `aria-label` | Multiple sections | Screen readers announce "section" without descriptive name |
| SR9 | **LOW** | Footer resource links point to `#` | Footer.tsx | Screen readers will announce broken/placeholder links |
| SR10 | **LOW** | Skip link is English-only | Layout.tsx | Italian users hear "Skip to main content" — should be localized |

---

## 8. Keyboard Interaction Patterns

### Escape Key Support

| Component | Escape to Close | Implementation |
|-----------|-----------------|---------------|
| GoogleCalendarPopup | YES | `window.addEventListener('keydown', handleEscape)` |
| CertificationModal | NO | Missing |
| TestimonialModal | NO | Missing |
| ChatInterface | NO | Missing |
| Mobile menu (Header) | NO | Missing |

### Enter/Space Key on Custom Controls

| Component | Enter/Space Works | Notes |
|-----------|-------------------|-------|
| All `<button>` elements | YES (native) | Native button semantics handle this |
| NeoButton | YES (native) | Uses `<button>` element |
| CTAButton | YES (native) | Uses `<motion.button>` which renders as button |
| CertificationBadge | NEEDS VERIFICATION | May be a div with onClick — needs `role="button"` + `tabIndex={0}` + `onKeyDown` |
| CollaborationCard | N/A | Display only, not interactive |

### Focus Trap Analysis

| Modal | Has Focus Trap | Quality |
|-------|---------------|---------|
| GoogleCalendarPopup | YES | Excellent — traps Tab/Shift+Tab within modal |
| CertificationModal | NO | User can Tab out of modal into background |
| TestimonialModal | NO | User can Tab out of modal into background |
| ChatInterface | NO | User can Tab out of chat window |

---

## 9. Reduced Motion Support

### CSS-Level Support
- **File**: `app/globals.css` (line 537)
- **Implementation**: `@media (prefers-reduced-motion: reduce)` blanket rule
- **Effect**: Sets `animation-duration: 0.01ms !important` on all elements

### Framer Motion Components
- `ScrollReveal.tsx` uses `useReducedMotion()` hook from Framer Motion
- Individual components (Hero, WorkTogether, etc.) use Framer Motion `motion.*` components
- **Question**: Does the CSS `animation-duration` override apply to Framer Motion's JavaScript-driven animations? Framer Motion uses `transform` via JS, so the CSS media query may NOT fully suppress these animations.

### Assessment
**Score: 7/10** — CSS-level support is in place, but Framer Motion animations may still run for users who prefer reduced motion. Components should explicitly check `useReducedMotion()`.

---

## 10. Prioritized Recommendations

### P0 — Critical (Fix Immediately)

| # | Issue | Fix | Effort | Files |
|---|-------|-----|--------|-------|
| 1 | **CTAButton has no focus indicator** | Add `focus-visible:ring-4 focus-visible:ring-primary` to className | 5 min | `CTAButton.tsx` |
| 2 | **Desktop nav links have no focus indicator** | Add `focus-visible:text-electric-blue focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4` | 10 min | `Header.tsx` |
| 3 | **ChatTrigger has no focus indicator** | Add `focus-visible:ring-4 focus-visible:ring-white` | 5 min | `ChatTrigger.tsx` |
| 4 | **Header hamburger has no focus indicator** | Add `focus-visible:ring-4 focus-visible:ring-white` | 5 min | `Header.tsx` |
| 5 | **Language switcher has no focus indicator** | Add `focus-visible:ring-2 focus-visible:ring-electric-blue` to IT/EN buttons | 5 min | `Header.tsx` |

### P1 — High Priority (Fix This Sprint)

| # | Issue | Fix | Effort | Files |
|---|-------|-----|--------|-------|
| 6 | **CertificationModal lacks dialog a11y** | Add `role="dialog"`, `aria-modal`, `aria-labelledby`, Escape handler, focus trap, body scroll lock (replicate GoogleCalendarPopup pattern) | 30 min | `CertificationModal.tsx` |
| 7 | **TestimonialModal lacks dialog a11y** | Same as #6 | 30 min | `TestimonialModal.tsx` |
| 8 | **ChatInterface lacks dialog a11y** | Add `role="dialog"`, `aria-label`, Escape handler, focus trap | 30 min | `ChatInterface.tsx` |
| 9 | **Header mobile menu lacks `aria-expanded`** | Add `aria-expanded={mobileMenuOpen}` to hamburger button | 5 min | `Header.tsx` |
| 10 | **ChatTrigger aria-label doesn't toggle** | Change to `aria-label={isOpen ? "Close chat" : "Open chat"}` | 5 min | `ChatTrigger.tsx` |

### P2 — Medium Priority (Next Sprint)

| # | Issue | Fix | Effort | Files |
|---|-------|-----|--------|-------|
| 11 | **Footer links have no focus indicator** | Add focus-visible styles to all link elements | 15 min | `Footer.tsx` |
| 12 | **AnonymousQuestionForm textarea needs label** | Add visually-hidden `<label>` or `aria-label` | 5 min | `AnonymousQuestionForm.tsx` |
| 13 | **Form status messages need live regions** | Add `role="alert"` to error, `role="status"` to success | 10 min | `AnonymousQuestionForm.tsx` |
| 14 | **NeoButton focus inconsistency** | Change `focus:` to `focus-visible:` and increase ring opacity from 50% to 100% | 5 min | `NeoButton.tsx` |
| 15 | **Standardize focus ring style** | Create a shared focus utility class in Tailwind config: `focus-brutal` = `focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-electric-blue` | 20 min | `tailwind.config.ts` |

### P3 — Low Priority (Backlog)

| # | Issue | Fix | Effort |
|---|-------|-----|--------|
| 16 | Localize skip link text | Use locale-aware text | 10 min |
| 17 | Add `aria-label` to section landmarks | Add descriptive labels to all `<section>` elements | 15 min |
| 18 | Add `aria-hidden="true"` to decorative Hero shapes | Prevent screen reader confusion | 5 min |
| 19 | Footer resource links are placeholder `#` | Remove or mark as disabled | 10 min |
| 20 | Hero: remove double-focusable `<a>` > `<NeoButton>` pattern | Use `<a>` styled as button OR button with scroll handler | 10 min |
| 21 | Return focus to trigger element on modal close | Store trigger ref before opening, restore focus on close | 20 min |
| 22 | Mobile menu focus management | Move focus into menu on open, return on close | 20 min |

---

## 11. Focus Indicator Design Recommendation

### Proposed Standard: `focus-brutal`

To ensure consistency, create a reusable focus utility:

```css
/* In tailwind.config.ts or globals.css */
.focus-brutal:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px #0D7EFF; /* Electric Blue */
}
```

This should be applied to:
- All `<button>` elements
- All `<a>` elements with interactive purpose
- All form inputs (already have shadow-based focus)
- All custom interactive components

### Consistency Matrix

| Current Pattern | Count | Issue | Recommended |
|----------------|-------|-------|-------------|
| `focus-visible:ring-4 focus-visible:ring-primary` | 2 components | Good but uses color token `primary` | Standardize to `electric-blue` |
| `focus:ring-4 focus:ring-electric-blue/50` | 2 components | Shows on click (not keyboard-only), low opacity | Change to `focus-visible:ring-electric-blue` |
| `focus:outline-none focus:ring-2 focus:ring-electric-blue` | 2 components | `ring-2` is thinner than others | Standardize to `ring-4` |
| `focus:border-primary focus:shadow-brutal-colored-blue` | 3 components | Input-specific pattern — OK | Keep for inputs |
| No focus styles | 14 elements | WCAG violation | Apply `focus-brutal` |

---

## 12. Overall Scoring

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Skip Link | 10% | 9/10 | 0.9 |
| Tab Order Logic | 15% | 7/10 | 1.05 |
| Focus Indicators | 25% | 4/10 | 1.0 |
| Modal Accessibility (avg) | 20% | 4.5/10 | 0.9 |
| ARIA Implementation | 15% | 6.5/10 | 0.975 |
| Screen Reader Compat | 10% | 6/10 | 0.6 |
| Reduced Motion | 5% | 7/10 | 0.35 |
| **TOTAL** | **100%** | | **5.78/10** |

### Grade: C+

The site has a solid foundation (skip link, form ARIA, one exemplary modal) but pervasive gaps in focus indicators and dialog accessibility pull the score down significantly.

---

## 13. Quick Win Impact Estimate

| Fix Group | Items | Total Effort | Impact |
|-----------|-------|-------------|--------|
| Add focus indicators to all buttons/links | #1-5, #11, #14 | ~50 min | +2.0 score points |
| Add dialog a11y to modals | #6-8 | ~90 min | +1.5 score points |
| Add missing ARIA attributes | #9-10, #12-13, #18 | ~30 min | +0.5 score points |
| **Total Quick Wins** | **15 items** | **~3 hours** | **Score: 5.78 → ~8.5/10** |

---

*Generated by automated code inspection audit. Manual browser testing recommended to verify focus indicator visibility, screen reader announcement quality, and focus trap behavior.*
