# Quick Wins List: selfrules.org UX/UI Audit

> **Audit:** selfrules.org UX/UI Audit
> **Date:** 2026-01-27
> **Criteria:** Each item implementable in <1 working day (8 hours), with clear implementation steps
> **Total Quick Wins Identified:** 10
> **Combined Effort:** ~18 hours (~2.5 working days for all)
> **Combined Conversion Impact:** +1.5-2.5% estimated lift

---

## Effort-vs-Impact Matrix

```
                        HIGH IMPACT
                            |
                   QW-1     |     QW-3
                  (2-3h)    |    (1-2h)
                            |
                   QW-2     |     QW-4
                  (2h)      |    (1h)
                            |
   HIGH EFFORT ─────────────┼───────────── LOW EFFORT
                            |
                   QW-7     |     QW-5
                  (3-4h)    |    (1.5h)
                            |
                   QW-8     |     QW-6
                  (2h)      |    (1h)
                            |
                            |     QW-9    QW-10
                            |    (30m)    (15m)
                        LOW IMPACT
```

### Matrix Quadrant Summary

| Quadrant | Items | Strategy |
|----------|-------|----------|
| **High Impact + Low Effort** (top-right) | QW-3, QW-4 | Do first |
| **High Impact + High Effort** (top-left) | QW-1, QW-2 | Do second |
| **Low Impact + Low Effort** (bottom-right) | QW-5, QW-6, QW-9, QW-10 | Batch together |
| **Low Impact + High Effort** (bottom-left) | QW-7, QW-8 | Do last or defer |

### Prioritized Execution Order

| Priority | Quick Win | Effort | Impact | ROI Score |
|----------|-----------|--------|--------|-----------|
| 1 | QW-3: Global focus-visible styles | 1-2h | HIGH | **10/10** |
| 2 | QW-4: Static urgency copy on WorkTogether | 1h | HIGH | **10/10** |
| 3 | QW-1: Floating "Book a Call" button | 2-3h | VERY HIGH | **9/10** |
| 4 | QW-5: Mobile touch target fixes (batch) | 1.5h | MEDIUM-HIGH | **8/10** |
| 5 | QW-2: Booking iframe skeleton loading | 2h | HIGH | **8/10** |
| 6 | QW-6: Remove placeholder footer links | 1h | MEDIUM | **7/10** |
| 7 | QW-9: Chat input iOS zoom fix | 30m | MEDIUM | **7/10** |
| 8 | QW-10: Hero CTA micro-copy enhancement | 15m | MEDIUM | **7/10** |
| 9 | QW-7: Mobile menu animation + scroll lock | 3-4h | MEDIUM | **5/10** |
| 10 | QW-8: Card accent variant contrast fix | 2h | MEDIUM | **5/10** |

---

## Quick Win #1: Add Floating "Book a Call" CTA Button

**Effort:** 2-3 hours | **Impact:** VERY HIGH (+0.5-0.8% conversion lift)
**Source:** Phase 3 (CTA analysis), Phase 6 (Problem #1)

### Problem

Once users scroll past the Hero section, there is no visible call-to-action for 3-4 full viewport heights. Users convinced mid-scroll (e.g., after reading the Journey timeline) have no way to act on that impulse without scrolling to the bottom. Industry scroll-depth data shows 40-60% of users never reach the page bottom.

### Implementation Steps

1. Create `components/ui/FloatingCTA.tsx`:
   - Fixed-position button (bottom-right corner)
   - Appears after `scrollY > window.innerHeight` (past Hero)
   - On click: open existing `GoogleCalendarPopup`
   - Style: neobrutalist (`border-brutal`, `shadow-brutal`, `bg-cyber-yellow`, `text-brutal-black`)
   - Entrance animation: slide-up with Framer Motion
   - Pulse animation on idle (subtle `scale` oscillation)
2. Add to `app/[locale]/layout.tsx` or homepage
3. Add `aria-label="Book a free 15-minute call"` for accessibility
4. Hide when user is near WorkTogether section (avoid CTA collision)
5. Respect `prefers-reduced-motion` for animations

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| CTA visibility during scroll | ~30% of scroll depth | ~100% of scroll depth |
| Impulse conversion capture | 0% (mid-scroll) | Estimated 15-25% of convinced mid-scrollers |
| Estimated conversion lift | Baseline | +0.5-0.8% |

### Files to Modify/Create

| File | Action |
|------|--------|
| `components/ui/FloatingCTA.tsx` | CREATE |
| `app/[locale]/page.tsx` or layout | MODIFY (import + render) |
| `messages/en.json` | MODIFY (add CTA label) |
| `messages/it.json` | MODIFY (add CTA label) |

---

## Quick Win #2: Add Skeleton Loading State to Booking Iframe

**Effort:** 2 hours | **Impact:** HIGH (+0.2-0.4% conversion lift)
**Source:** Phase 3 (Booking flow audit), Phase 6 (Problem #2)

### Problem

When a user clicks "Book a Call", the Google Calendar iframe takes 2-3 seconds to load. During this time, only a spinner is shown. This creates perceived slowness and increases the chance of abandonment at the critical moment of conversion.

### Implementation Steps

1. Open `components/ui/GoogleCalendarPopup.tsx`
2. Create a skeleton UI that matches the expected calendar layout:
   - Neobrutalist card header with pulsing placeholder bars
   - Grid of 7 columns (days) x 4-5 rows (time slots) as skeleton blocks
   - Use `animate-pulse` on `bg-gray-200` blocks with `border-brutal-thin`
3. Show skeleton immediately when modal opens
4. Hide skeleton when iframe `onLoad` fires
5. Add loading state text: "Caricamento disponibilita..." / "Loading availability..."
6. Pre-fetch iframe URL on CTA hover (`<link rel="preconnect">` or hidden iframe)

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| Perceived load time | 2-3s (blank/spinner) | <1s (skeleton → content) |
| Booking modal abandonment | Estimated 15-20% | Estimated 8-12% |
| Estimated conversion lift | Baseline | +0.2-0.4% |

### Files to Modify/Create

| File | Action |
|------|--------|
| `components/ui/GoogleCalendarPopup.tsx` | MODIFY (add skeleton + preload) |
| `components/ui/CalendarSkeleton.tsx` | CREATE (optional, extracted component) |

---

## Quick Win #3: Add Global Focus-Visible Styles

**Effort:** 1-2 hours | **Impact:** HIGH (WCAG compliance + accessibility)
**Source:** Phase 5 (Keyboard/Screen Reader audit), Phase 6 (Problem #4)

### Problem

Only 39% of interactive elements have visible focus indicators. This is a WCAG 2.4.7 violation affecting keyboard users, screen reader users, and users with motor impairments. 0% of links have focus styles. The European Accessibility Act enforcement began June 2025, creating legal compliance risk.

### Implementation Steps

1. Add global focus styles to `app/globals.css`:
   ```css
   /* Global focus-visible styles (neobrutalist) */
   a:focus-visible,
   button:focus-visible,
   [role="button"]:focus-visible,
   [tabindex]:focus-visible {
     outline: 4px solid #0D7EFF; /* Electric Blue */
     outline-offset: 2px;
   }
   ```
2. Create `focus-brutal` utility class in `tailwind.config.ts`:
   ```js
   '.focus-brutal': {
     '@apply focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-electric-blue focus-visible:ring-offset-2': {}
   }
   ```
3. Add `focus-visible:ring-4 focus-visible:ring-electric-blue` to `CTAButton.tsx`
4. Fix `NeoButton.tsx`: change `focus:` to `focus-visible:` (avoid showing ring on mouse clicks)
5. Add `aria-expanded` attribute to hamburger menu button in `Header.tsx`

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| Focus indicator coverage | 39% | ~95% |
| WCAG 2.4.7 compliance | FAIL | PASS |
| Keyboard user conversion rate | Near 0% | Enabled |
| Legal compliance risk | HIGH | LOW |

### Files to Modify/Create

| File | Action |
|------|--------|
| `app/globals.css` | MODIFY (add global focus styles) |
| `tailwind.config.ts` | MODIFY (add focus-brutal utility) |
| `components/ui/CTAButton.tsx` | MODIFY (add focus ring) |
| `components/ui/NeoButton.tsx` | MODIFY (focus: to focus-visible:) |
| `components/ui/Header.tsx` | MODIFY (aria-expanded on hamburger) |

---

## Quick Win #4: Add Static Urgency Copy to WorkTogether Banner

**Effort:** 1 hour | **Impact:** HIGH (+0.3-0.5% conversion lift)
**Source:** Phase 3 (LIFT model - Urgency 5/10), Phase 6 (Problem #3)

### Problem

The site scores only 5/10 on Urgency (lowest LIFT factor). There are zero mechanisms communicating availability scarcity, time pressure, or social momentum. The implicit message is "I'm always available," which paradoxically reduces perceived value and removes motivation to act now.

### Implementation Steps

1. Open WorkTogether section component
2. Add urgency micro-copy above or near the primary CTA banner:
   - IT: "Accetto al massimo 3 nuovi clienti al mese"
   - EN: "Currently accepting 3 new clients per month"
3. Add secondary urgency indicator:
   - IT: "Prossimo slot disponibile: questa settimana"
   - EN: "Next available slot: this week"
4. Style with subtle emphasis: `text-sm font-medium text-electric-blue` or similar
5. Add to `messages/en.json` and `messages/it.json` for i18n
6. Position: directly above or below the "Prenota una call" CTA button

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| LIFT Urgency score | 5/10 | 6.5-7/10 |
| CTA click-through rate | Baseline | +15-25% estimated increase |
| Estimated conversion lift | Baseline | +0.3-0.5% |

### Files to Modify/Create

| File | Action |
|------|--------|
| `components/sections/WorkTogether.tsx` | MODIFY (add urgency copy) |
| `messages/en.json` | MODIFY (add urgency strings) |
| `messages/it.json` | MODIFY (add urgency strings) |

---

## Quick Win #5: Fix Mobile Touch Targets (Batch)

**Effort:** 1.5 hours | **Impact:** MEDIUM-HIGH (WCAG compliance + mobile UX)
**Source:** Phase 2 (Touch target audit), Phase 5 (Accessibility summary)

### Problem

Three persistent UI elements fail WCAG 2.5.8 minimum touch target requirements (44x44px), affecting 60%+ of visitors on mobile devices:
- Language switcher: 33px height (25% below minimum)
- Hamburger button: 40x40px (borderline)
- Small button variants: ~37px height

### Implementation Steps

1. **Language switcher** in `Header.tsx`:
   - Change `py-1.5` to `py-3` (increases height from 33px to ~45px)
   - Add `min-h-[48px] min-w-[48px]` for safe touch target
   - Ensure both IT and EN buttons are resized

2. **Hamburger button** in `Header.tsx`:
   - Change `w-10 h-10` to `w-12 h-12` (48x48px)
   - Verify icon SVG scales properly within larger button

3. **Chat input** in `ChatInterface.tsx`:
   - Change `py-2` to `py-3` (increases from ~40px to ~48px height)

4. **Small button variants** in `NeoButton.tsx`, `Button.tsx`, `CTAButton.tsx`:
   - Add `min-h-[44px]` to all `sm` variant classes
   - Use `@media (pointer: coarse)` to apply only on touch devices if desired

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| Touch target compliance | 50% pass rate | ~90% pass rate |
| WCAG 2.5.8 violations | 3 critical elements | 0 critical elements |
| Mobile tap accuracy | Estimated 85% | Estimated 98%+ |
| Mobile UX score | 6.5/10 | 7.5/10 |

### Files to Modify

| File | Action |
|------|--------|
| `components/ui/Header.tsx` | MODIFY (language switcher padding, hamburger size) |
| `components/chat/ChatInterface.tsx` | MODIFY (input height) |
| `components/ui/NeoButton.tsx` | MODIFY (sm variant min-height) |
| `components/ui/Button.tsx` | MODIFY (sm variant min-height) |
| `components/ui/CTAButton.tsx` | MODIFY (sm variant min-height) |

---

## Quick Win #6: Remove Placeholder Footer Links

**Effort:** 1 hour | **Impact:** MEDIUM (trust + distraction reduction)
**Source:** Phase 3 (LIFT model - Distraction 7/10), Phase 5 (Accessibility)

### Problem

The footer contains a "Resources" section with 4 links (Tools, Design, Stack, Newsletter) that all point to `#` (non-functional placeholders). This creates:
1. **Broken expectation**: Users click and nothing happens
2. **Trust erosion**: Broken links signal unfinished site
3. **Distraction**: 4 links that lead nowhere compete for attention
4. **WCAG issue**: Non-functional links confuse keyboard/screen reader users

### Implementation Steps

1. Open `components/layout/Footer.tsx`
2. Remove the entire "Resources" section (4 placeholder links)
3. OR replace with real content:
   - "Tools" -> Link to design-system page (`/[locale]/design-system`)
   - "Newsletter" -> Replace with email subscription form or mailto link
   - Remove "Design" and "Stack" until content exists
4. Update `messages/en.json` and `messages/it.json` if footer strings are localized
5. Verify footer layout remains balanced with 3 columns instead of 4

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| Broken link count | 4 | 0 |
| LIFT Distraction score | 7/10 | 7.5/10 |
| Perceived site completeness | Reduced (broken links) | Improved |
| Footer trust signal | Negative (placeholder) | Neutral/Positive |

### Files to Modify

| File | Action |
|------|--------|
| `components/layout/Footer.tsx` | MODIFY (remove/replace Resources section) |
| `messages/en.json` | MODIFY (update footer strings if needed) |
| `messages/it.json` | MODIFY (update footer strings if needed) |

---

## Quick Win #7: Add Mobile Menu Animation and Scroll Lock

**Effort:** 3-4 hours | **Impact:** MEDIUM (perceived polish + mobile UX)
**Source:** Phase 2 (Mobile navigation audit, Issues H-03 & H-04)

### Problem

The mobile hamburger menu appears/disappears instantly without any transition animation, and the page body remains scrollable behind the open menu. This creates a jarring, unpolished experience that reduces trust on mobile (60%+ of visitors).

### Implementation Steps

1. **Menu animation** in `Header.tsx`:
   - Wrap mobile nav in `<AnimatePresence>` from Framer Motion
   - Add `<motion.nav>` with entrance/exit animations:
     ```
     initial: { opacity: 0, height: 0 }
     animate: { opacity: 1, height: 'auto' }
     exit: { opacity: 0, height: 0 }
     transition: { duration: 0.2, ease: 'easeInOut' }
     ```
   - Add `overflow-hidden` to parent for clean animation

2. **Body scroll lock**:
   - Add `useEffect` that toggles `document.body.style.overflow = 'hidden'` when menu is open
   - Clean up on unmount: restore `overflow: ''`
   - Alternative: use `body-scroll-lock` package for iOS compatibility

3. **Focus management**:
   - Move focus to first menu link on open
   - Return focus to hamburger button on close

4. Add `aria-expanded={mobileMenuOpen}` to hamburger button

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| Mobile menu UX score | 4/10 | 8/10 |
| Perceived site polish | Reduced | Professional |
| Accidental scroll-behind | Frequent | Eliminated |
| Overall mobile score | 6.5/10 | 7.0/10 |

### Files to Modify

| File | Action |
|------|--------|
| `components/ui/Header.tsx` | MODIFY (AnimatePresence, scroll lock, aria-expanded) |

---

## Quick Win #8: Fix Color Contrast Violations (Batch)

**Effort:** 2 hours | **Impact:** MEDIUM (WCAG compliance + readability)
**Source:** Phase 5 (Color contrast audit)

### Problem

Six critical color contrast failures exist, concentrated in accent color usage. The most impactful: Card accent variant uses white text on Cyber Yellow background (1.48:1 ratio vs 4.5:1 required). Low-opacity text (`text-white/30`, `text-white/20`) in dark sections also fails.

### Implementation Steps

1. **Card accent variant** in `Card.tsx`:
   - Change text color from `text-white` to `text-brutal-black` (`#0A0A0A`) when using Cyber Yellow background
   - Ratio improvement: 1.48:1 -> 13.91:1

2. **Low-opacity text** in dark sections:
   - Find all instances of `text-white/30` and increase to `text-white/45` minimum
   - Find all instances of `text-white/20` and increase to `text-white/45` or mark as `aria-hidden` if purely decorative
   - Use search: `grep -r "text-white/[12][0-9]" components/`

3. **Neon Pink on white** (Badge tool variant):
   - For normal-sized text (<24px), darken Neon Pink to `#D4005B` (achieves 4.5:1)
   - OR restrict Neon Pink to large text only (24px+)
   - Add design system rule: `neon-pink-accessible: #D4005B`

4. **Electric Blue on cream** (borderline 4.16:1):
   - Monitor only; prefer Electric Blue on white (#FFFFFF) backgrounds
   - Add comment in `tailwind.config.ts` noting borderline status

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| Color contrast compliance (normal text) | 72% | ~90% |
| Critical contrast failures | 6 | 0-1 |
| WCAG 1.4.3 compliance | FAIL (partial) | PASS |

### Files to Modify

| File | Action |
|------|--------|
| `components/ui/Card.tsx` | MODIFY (accent variant text color) |
| `components/ui/Badge.tsx` | MODIFY (Neon Pink accessible alternative) |
| Various section components | MODIFY (low-opacity text increases) |
| `tailwind.config.ts` | MODIFY (add accessible color variant) |

---

## Quick Win #9: Fix iOS Safari Auto-Zoom on Chat Input

**Effort:** 30 minutes | **Impact:** MEDIUM (iOS mobile UX)
**Source:** Phase 2 (Issue H-02), Phase 5 (WCAG 1.4.4)

### Problem

The chat input in `ChatInterface.tsx` uses `text-sm` (14px font-size). iOS Safari automatically zooms the viewport when a user focuses an input with font-size below 16px. This zooms the page unexpectedly, requiring manual zoom-out and disrupting the conversation flow.

### Implementation Steps

1. Open `components/chat/ChatInterface.tsx`
2. Find the input element (around line 231-238)
3. Change `text-sm` to `text-base` in the className
4. Verify the input still fits within the chat interface layout
5. Add `enterKeyHint="send"` attribute to show "Send" on mobile keyboard
6. Test on iOS Safari (or simulate in DevTools)

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| iOS zoom trigger on chat focus | Yes (every time) | No |
| Chat input usability (iOS) | 4/10 | 9/10 |
| Mobile keyboard action label | Generic "Return" | "Send" |

### Files to Modify

| File | Action |
|------|--------|
| `components/chat/ChatInterface.tsx` | MODIFY (text-sm -> text-base, add enterKeyHint) |

---

## Quick Win #10: Enhance Hero CTA Micro-Copy

**Effort:** 15 minutes | **Impact:** MEDIUM (clarity + anxiety reduction)
**Source:** Phase 3 (LIFT model - Clarity improvements), Phase 1 (First impression)

### Problem

The Hero CTA button says "Parliamone" / "Let's talk" but provides no additional context about what happens when clicked. Users may hesitate because:
1. They don't know the call is free
2. They don't know it's only 15 minutes
3. They don't know there's no commitment

This information IS present elsewhere (WorkTogether section) but not at the point of first conversion opportunity.

### Implementation Steps

1. Add micro-copy below the Hero CTA button:
   - IT: "15 minuti. Gratis. Senza impegno."
   - EN: "15 minutes. Free. No strings attached."
2. Style: `text-xs text-muted-foreground mt-2`
3. Add to `messages/en.json` and `messages/it.json`
4. Position: directly below the primary "Parliamone" / "Let's talk" button
5. Ensure it doesn't displace the secondary CTA

### Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| Hero CTA click-through | Baseline | +5-10% estimated increase |
| LIFT Anxiety score at Hero | 7/10 | 8/10 |
| First-visit conversion friction | Medium (unknown commitment) | Low (explicit free offer) |

### Files to Modify

| File | Action |
|------|--------|
| `components/sections/Hero.tsx` | MODIFY (add micro-copy) |
| `messages/en.json` | MODIFY (add hero micro-copy strings) |
| `messages/it.json` | MODIFY (add hero micro-copy strings) |

---

## Implementation Roadmap

### Day 1: Highest ROI (6 hours)

| Order | Quick Win | Time | Cumulative Impact |
|-------|-----------|------|-------------------|
| 1 | QW-3: Global focus-visible styles | 1.5h | WCAG compliance restored |
| 2 | QW-4: Static urgency copy | 1h | +0.3-0.5% conversion |
| 3 | QW-10: Hero CTA micro-copy | 15m | +anxiety reduction |
| 4 | QW-5: Mobile touch target batch | 1.5h | WCAG touch compliance |
| 5 | QW-9: iOS zoom fix | 30m | iOS UX fixed |
| 6 | QW-6: Remove placeholder links | 1h | Trust improvement |

**Day 1 Total: ~6 hours | Impact: WCAG compliance + ~0.5-0.8% conversion lift**

### Day 2: Conversion Focus (5 hours)

| Order | Quick Win | Time | Cumulative Impact |
|-------|-----------|------|-------------------|
| 1 | QW-1: Floating CTA button | 2.5h | +0.5-0.8% conversion |
| 2 | QW-2: Booking skeleton loading | 2h | +0.2-0.4% conversion |

**Day 2 Total: ~5 hours | Impact: +0.7-1.2% additional conversion lift**

### Day 3: Polish (5 hours)

| Order | Quick Win | Time | Cumulative Impact |
|-------|-----------|------|-------------------|
| 1 | QW-7: Mobile menu animation + scroll lock | 3.5h | Mobile UX polish |
| 2 | QW-8: Color contrast fixes | 2h | Full WCAG contrast compliance |

**Day 3 Total: ~5.5 hours | Impact: Mobile UX score 6.5 -> 7.5, contrast compliance**

---

## Combined Impact Summary

| Category | Before | After All Quick Wins |
|----------|--------|---------------------|
| **Estimated Conversion Rate** | 2-4% | 3.5-5.5% (+50-75%) |
| **WCAG 2.4.7 (Focus)** | FAIL (39% coverage) | PASS (~95% coverage) |
| **WCAG 2.5.8 (Touch)** | FAIL (3 elements) | PASS (0 failures) |
| **WCAG 1.4.3 (Contrast)** | FAIL (6 critical) | PASS (0-1 critical) |
| **LIFT Urgency Score** | 5/10 | 6.5-7/10 |
| **LIFT Friction Score** | 6/10 | 7.5-8/10 |
| **Mobile UX Score** | 6.5/10 | 7.5-8/10 |
| **Nielsen Overall Score** | 7.6/10 | 8.2-8.5/10 |
| **Accessibility Score** | 5.9/10 | 7.5-8.0/10 |

### Total Investment vs. Return

| Metric | Value |
|--------|-------|
| **Total effort (all 10 wins)** | ~18 hours (~2.5 working days) |
| **Estimated conversion lift** | +1.5-2.5% (from 2-4% to 3.5-5.5%) |
| **WCAG compliance status** | FAIL -> Conditional PASS |
| **Legal risk reduction** | HIGH -> LOW |
| **ROI (at 1000 visitors/month)** | 15-25 additional conversions/month |

---

## Cross-Reference to Audit Phases

| Quick Win | Phase 1 (Heuristic) | Phase 2 (Mobile) | Phase 3 (Conversion) | Phase 4 (Benchmark) | Phase 5 (Accessibility) | Phase 6 (Top 5) |
|-----------|---------------------|-------------------|----------------------|---------------------|-------------------------|------------------|
| QW-1 Floating CTA | - | M-07 | CTA analysis | Gibson Biddle sticky CTA | - | Problem #1 |
| QW-2 Skeleton loading | - | - | Booking flow friction | Teresa Torres branded embed | - | Problem #2 |
| QW-3 Focus styles | H6 (Recognition) | - | - | - | A1 (61% missing) | Problem #4 |
| QW-4 Urgency copy | - | - | LIFT Urgency 5/10 | All 3 competitors | - | Problem #3 |
| QW-5 Touch targets | - | H-01, H-05, M-10 | - | - | A6, B2 | Problem #5 |
| QW-6 Footer links | H8 (Aesthetics) | - | LIFT Distraction | - | D4 | - |
| QW-7 Menu animation | - | H-03, H-04 | - | - | B7 | Problem #5 |
| QW-8 Contrast fixes | - | - | - | - | A5, B1, B5 | - |
| QW-9 iOS zoom | - | H-02 | - | - | B6 | Problem #5 |
| QW-10 Hero micro-copy | First impression | - | LIFT Clarity/Anxiety | - | - | - |

---

**Status:** Complete
**Generated:** 2026-01-27
**Cross-references:** subtask-6-1 (Top 5 Problems), Phase 1-5 findings
