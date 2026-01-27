# Interventions from Senior UX/UI Audit of selfrules.org

**Source Audit:** 009-ux-ui-audit
**Audit Date:** 2026-01-27
**Total Interventions:** 15

---

## Intervention 1: Add Floating "Book a Call" CTA Button

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 2-3 ore |
| **Impact** | +0.5-0.8% conversion lift; CTA visible 100% of scroll depth instead of ~30% |
| **Category** | ux |

### Description
Once users scroll past the Hero section, there is no visible call-to-action for 3-4 full viewport heights. Users convinced mid-scroll (e.g., after reading the Journey timeline) have nowhere to act. Industry scroll-depth data shows 40-60% of users never reach the bottom half. A floating CTA ensures conversion opportunity is always available.

### Files to Modify
- `components/ui/FloatingCTA.tsx` - CREATE new fixed-position button component with neobrutalist styling
- `app/[locale]/page.tsx` or `app/[locale]/layout.tsx` - MODIFY to import and render FloatingCTA
- `messages/en.json` - MODIFY to add CTA label string
- `messages/it.json` - MODIFY to add CTA label string

### Acceptance Criteria
- [ ] Floating button appears after scrolling past Hero (>1 viewport height)
- [ ] Button triggers existing GoogleCalendarPopup on click
- [ ] Button uses neobrutalist styling (border-brutal, shadow-brutal)
- [ ] Button has aria-label for accessibility
- [ ] Button hides near WorkTogether section to avoid CTA collision
- [ ] Respects prefers-reduced-motion for animations

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 2: Add Skeleton Loading State to Booking Iframe

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 2 ore |
| **Impact** | +0.2-0.4% conversion lift; perceived load time from 2-3s to <1s |
| **Category** | ux |

### Description
When a user clicks "Book a Call", the Google Calendar iframe takes 2-3 seconds to load with only a spinner shown. This creates perceived slowness at the critical conversion moment. Adding a neobrutalist skeleton UI and pre-fetching the iframe on hover will dramatically reduce perceived wait time and booking abandonment.

### Files to Modify
- `components/ui/GoogleCalendarPopup.tsx` - MODIFY to add skeleton loading state and iframe preload on hover
- `components/ui/CalendarSkeleton.tsx` - CREATE optional extracted skeleton component

### Acceptance Criteria
- [ ] Skeleton UI appears immediately when modal opens (before iframe loads)
- [ ] Skeleton matches neobrutalist design (border-brutal-thin, animate-pulse)
- [ ] Skeleton hides when iframe onLoad fires
- [ ] Loading text displayed in both IT and EN
- [ ] Pre-fetch iframe URL on CTA hover

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 3: Add Global Focus-Visible Styles

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 1-2 ore |
| **Impact** | WCAG 2.4.7 compliance restored (39% -> ~95% coverage); legal risk reduction (European Accessibility Act) |
| **Category** | accessibility |

### Description
Only 39% of interactive elements have visible focus indicators - a WCAG 2.4.7 violation. 0% of links have focus styles. CTAButton (primary conversion button), Header nav links, language switcher, and hamburger all lack focus. Adding global focus-visible styles and a focus-brutal utility class will fix this across the entire site in one pass.

### Files to Modify
- `app/globals.css` - MODIFY to add global focus-visible CSS rules (outline: 4px solid #0D7EFF)
- `tailwind.config.ts` - MODIFY to add focus-brutal utility class
- `components/ui/CTAButton.tsx` - MODIFY to add focus-visible ring
- `components/ui/NeoButton.tsx` - MODIFY to change focus: to focus-visible: (avoid ring on mouse clicks)
- `components/ui/Header.tsx` - MODIFY to add aria-expanded on hamburger button

### Acceptance Criteria
- [ ] All links show 4px Electric Blue outline on keyboard focus
- [ ] All buttons show focus ring on keyboard focus
- [ ] No focus ring appears on mouse click (focus-visible, not focus)
- [ ] CTAButton has explicit focus-visible styling
- [ ] Hamburger button has aria-expanded attribute
- [ ] Focus indicator coverage >= 95%

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 4: Add Static Urgency Copy to WorkTogether Banner

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 1 ora |
| **Impact** | LIFT Urgency score from 5/10 to 6.5-7/10; +0.3-0.5% conversion lift |
| **Category** | ux |

### Description
The site scores only 5/10 on Urgency (lowest LIFT factor). There are zero mechanisms communicating availability scarcity or time pressure. Adding static urgency micro-copy near the primary CTA creates perceived scarcity and motivation to act now, without requiring dynamic API integration.

### Files to Modify
- `components/sections/WorkTogether.tsx` - MODIFY to add urgency copy near CTA
- `messages/en.json` - MODIFY to add urgency strings ("Currently accepting 3 new clients per month")
- `messages/it.json` - MODIFY to add urgency strings ("Accetto al massimo 3 nuovi clienti al mese")

### Acceptance Criteria
- [ ] Urgency copy visible near WorkTogether CTA in both IT and EN
- [ ] Copy styled with subtle emphasis (text-sm font-medium)
- [ ] Secondary indicator present ("Next available slot: this week")
- [ ] Copy doesn't displace or crowd existing CTA button

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 5: Fix Mobile Touch Targets (Batch)

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 1.5 ore |
| **Impact** | WCAG 2.5.8 compliance (3 critical failures -> 0); mobile tap accuracy 85% -> 98%+ |
| **Category** | accessibility |

### Description
Three persistent UI elements fail WCAG 2.5.8 minimum touch target requirements (44x44px): language switcher (33px), hamburger button (40x40px), and small button variants (~37px). These affect 60%+ of visitors on mobile devices. Simple padding/size increases fix all issues.

### Files to Modify
- `components/ui/Header.tsx` - MODIFY language switcher padding (py-1.5 -> py-3, add min-h-[48px]) and hamburger size (w-10 h-10 -> w-12 h-12)
- `components/chat/ChatInterface.tsx` - MODIFY chat input padding (py-2 -> py-3)
- `components/ui/NeoButton.tsx` - MODIFY sm variant to add min-h-[44px]
- `components/ui/Button.tsx` - MODIFY sm variant to add min-h-[44px]
- `components/ui/CTAButton.tsx` - MODIFY sm variant to add min-h-[44px]

### Acceptance Criteria
- [ ] Language switcher height >= 44px (measured in DevTools)
- [ ] Hamburger button size >= 48x48px
- [ ] Chat input height >= 44px
- [ ] All sm button variants have min-height 44px
- [ ] No layout breakage from size increases

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 6: Remove Placeholder Footer Links

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 1 ora |
| **Impact** | Eliminates 4 broken # links; trust improvement; LIFT Distraction 7/10 -> 7.5/10 |
| **Category** | ux |

### Description
The footer contains a "Resources" section with 4 links (Tools, Design, Stack, Newsletter) all pointing to `#` (non-functional placeholders). Broken links signal an unfinished site, erode trust, and confuse keyboard/screen reader users. Either remove the section entirely or replace with real content.

### Files to Modify
- `components/layout/Footer.tsx` - MODIFY to remove Resources section or replace with real links
- `messages/en.json` - MODIFY footer strings if needed
- `messages/it.json` - MODIFY footer strings if needed

### Acceptance Criteria
- [ ] Zero links pointing to `#` in footer
- [ ] Footer layout remains balanced (3 columns or adjusted grid)
- [ ] Keyboard navigation through footer encounters no dead-end links
- [ ] If links replaced, destinations are real and functional

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 7: Add Mobile Menu Animation and Scroll Lock

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 3-4 ore |
| **Impact** | Mobile menu UX score 4/10 -> 8/10; eliminates scroll-behind issue |
| **Category** | ux |

### Description
The mobile hamburger menu appears/disappears instantly without any transition animation, and the page body remains scrollable behind the open menu. This creates a jarring, unpolished experience. Adding Framer Motion AnimatePresence animation and body scroll lock brings mobile menu to modern standards.

### Files to Modify
- `components/ui/Header.tsx` - MODIFY to wrap mobile nav in AnimatePresence, add motion.nav with entrance/exit animations, add useEffect for body overflow toggle, add aria-expanded to hamburger, manage focus on open/close

### Acceptance Criteria
- [ ] Mobile menu animates in/out (opacity + height transition, ~200ms)
- [ ] Body scroll is locked when menu is open
- [ ] Scroll lock restored on menu close and component unmount
- [ ] Focus moves to first menu link on open
- [ ] Focus returns to hamburger button on close
- [ ] aria-expanded attribute toggles correctly

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 8: Fix Color Contrast Violations (Batch)

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 2 ore |
| **Impact** | WCAG 1.4.3 compliance: 6 critical failures -> 0-1; color contrast compliance 72% -> ~90% |
| **Category** | accessibility |

### Description
Six critical color contrast failures exist: Card accent variant (white on Cyber Yellow, 1.48:1 vs 4.5:1 required), low-opacity text (text-white/30 on dark), Neon Pink on white for normal text (3.78:1). Primary reading experience passes AAA, but accent/decorative combinations fail.

### Files to Modify
- `components/ui/Card.tsx` - MODIFY accent variant text color (text-white -> text-brutal-black on Cyber Yellow)
- `components/ui/Badge.tsx` - MODIFY Neon Pink to accessible variant (#D4005B) for normal text
- Various section components - MODIFY text-white/30 instances to text-white/45 minimum
- `tailwind.config.ts` - MODIFY to add neon-pink-accessible color variant

### Acceptance Criteria
- [ ] Card accent variant: text on Cyber Yellow achieves 4.5:1+ contrast ratio
- [ ] No text-white/30 or text-white/20 instances on dark backgrounds (unless aria-hidden)
- [ ] Neon Pink on white achieves 4.5:1+ for normal text
- [ ] Zero critical WCAG 1.4.3 failures remaining

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 9: Fix iOS Safari Auto-Zoom on Chat Input

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 30 minuti |
| **Impact** | Eliminates iOS viewport disruption on chat focus; chat input usability 4/10 -> 9/10 on iOS |
| **Category** | ux |

### Description
The chat input uses text-sm (14px font-size). iOS Safari automatically zooms the viewport when focusing inputs below 16px, disrupting the conversation flow and requiring manual zoom-out. Changing to text-base (16px) prevents this behavior entirely. Also add enterKeyHint="send" for better mobile keyboard UX.

### Files to Modify
- `components/chat/ChatInterface.tsx` - MODIFY chat input className: text-sm -> text-base; add enterKeyHint="send" attribute

### Acceptance Criteria
- [ ] Chat input font-size is 16px (text-base)
- [ ] No viewport zoom on iOS Safari when focusing chat input
- [ ] Mobile keyboard shows "Send" action button
- [ ] Chat input still fits within interface layout

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 10: Enhance Hero CTA Micro-Copy

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 15 minuti |
| **Impact** | Hero CTA click-through +5-10%; LIFT Anxiety at Hero 7/10 -> 8/10 |
| **Category** | ux |

### Description
The Hero CTA button says "Parliamone" / "Let's talk" but provides no context about what happens next. Users don't know the call is free, only 15 minutes, and no commitment. Adding micro-copy below the button ("15 minuti. Gratis. Senza impegno." / "15 minutes. Free. No strings attached.") reduces anxiety at the first conversion opportunity.

### Files to Modify
- `components/sections/Hero.tsx` - MODIFY to add micro-copy text below CTA button
- `messages/en.json` - MODIFY to add hero micro-copy strings
- `messages/it.json` - MODIFY to add hero micro-copy strings

### Acceptance Criteria
- [ ] Micro-copy visible below Hero CTA in both IT and EN
- [ ] Text styled subtly (text-xs text-muted-foreground)
- [ ] Copy communicates: free, 15 minutes, no commitment
- [ ] Does not displace secondary CTA or break layout

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 11: Build Graduated Engagement Ladder

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 3-4 settimane |
| **Impact** | 5-10x total site engagement; email capture 0% -> 8-15%; conversion 2-4% -> 8-12% |
| **Category** | ux |

### Description
The site operates a binary engagement model: visitors either browse passively or book a paid consultation. There are zero intermediate commitment steps. Introduce 4 engagement tiers: Discover (browse) -> Sample (free resource download, email capture) -> Engage (newsletter, chat) -> Commit (discovery call) -> Convert (paid consultation). Teresa Torres (best-in-class competitor, 7.5/10) operates this exact model.

### Files to Modify
- `components/sections/LeadMagnet.tsx` - CREATE email capture component with neobrutalist styling
- `app/[locale]/page.tsx` - MODIFY to add lead magnet section between Journey and Blog
- `messages/en.json` - MODIFY to add engagement ladder strings
- `messages/it.json` - MODIFY to add engagement ladder strings
- Email service integration (Resend/ConvertKit/Buttondown) - CREATE API route
- Newsletter template - CREATE

### Acceptance Criteria
- [ ] Lead magnet download available with email capture
- [ ] Email capture component uses neobrutalist design tokens
- [ ] Newsletter infrastructure configured and sending
- [ ] Nurture sequence (3-5 emails) created
- [ ] Email signup rate measurable via analytics
- [ ] Behavioral triggers surface booking CTA for engaged users

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 12: Replace Google Calendar Iframe with Native Branded Booking

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 1-2 settimane |
| **Impact** | 2-3x booking completion; load time 2-3s -> <500ms; full WCAG AA compliance on booking |
| **Category** | ux |

### Description
The sole monetization path hands users to a Google Calendar iframe with 2-3s load, Google Material Design UI, and brand disconnect. An unused custom booking infrastructure already exists (bookingStore.ts + google-calendar.ts API). Build a native 3-step booking wizard (Select Service -> Choose Time -> Confirm & Book) using the existing infrastructure, with full neobrutalist styling.

### Files to Modify
- `components/booking/BookingWizard.tsx` - CREATE 3-step booking flow component
- `components/booking/DatePicker.tsx` - CREATE neobrutalist date picker
- `components/booking/TimeSlotGrid.tsx` - CREATE time slot selection using Badge components
- `lib/stores/bookingStore.ts` - MODIFY to connect to new UI components
- `lib/api/google-calendar.ts` - MODIFY to wire up existing API functions
- `components/ui/GoogleCalendarPopup.tsx` - MODIFY to use native flow instead of iframe (keep iframe as fallback)

### Acceptance Criteria
- [ ] 3-step booking wizard functional (Service -> Time -> Confirm)
- [ ] All elements use neobrutalist design tokens
- [ ] Booking load time < 500ms
- [ ] Booking completion rate measurable
- [ ] Full keyboard navigation and screen reader support
- [ ] Mobile optimized with compliant touch targets
- [ ] Google Calendar iframe kept as fallback via feature flag

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 13: Implement Quantified Social Proof System

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 1-2 settimane |
| **Impact** | 2-4x trust signal effectiveness; LIFT Urgency 5 -> 7.5-8; competitive trust gap closed |
| **Category** | content |

### Description
The site lacks quantified outcome metrics - the single most impactful trust gap vs competitors. All top-performing competitors display quantified results (Gibson: NPS=69, Teresa: 13K students, Lenny: 700K subscribers). Implement three components: (A) Outcome metrics banner with counter animation, (B) Enhanced testimonial cards with measurable results and photos, (C) Live activity signals ("3 calls booked this week").

### Files to Modify
- `components/sections/MetricsBanner.tsx` - CREATE metrics strip with counter animation (Framer Motion useInView)
- `components/sections/WorkTogether.tsx` or testimonials area - MODIFY to use enhanced testimonial cards
- `components/ui/TestimonialCard.tsx` - CREATE rich proof card with Card base, Badge tags, star rating
- `components/ui/ActivityIndicator.tsx` - CREATE live activity signal component
- `messages/en.json` - MODIFY to add metrics and activity strings
- `messages/it.json` - MODIFY to add metrics and activity strings

### Acceptance Criteria
- [ ] Metrics banner visible between Journey and WorkTogether sections
- [ ] Counter animation triggers on scroll-into-view
- [ ] Testimonial cards show outcomes, roles, company types, star ratings
- [ ] Activity signals visible near booking CTA
- [ ] All strings localized IT/EN
- [ ] All components use neobrutalist design tokens

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 14: Redesign Mobile-First Navigation with Intent-Based Architecture

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 1-2 settimane |
| **Impact** | Mobile UX 6.5 -> 8.0-8.5/10; mobile bounce rate -20pp; 2-3x mobile engagement depth |
| **Category** | layout |

### Description
Mobile UX scores 6.5/10 (lowest dimension). Compounding issues: undersized touch targets, no menu animation, section-based nav labels don't serve high-intent visitors, no sticky mobile CTA. Redesign with intent-based labels ("My approach" / "Work with me" / "Results" / "Let's talk"), 48px+ touch targets throughout, Framer Motion menu animation, body scroll lock, and sticky mobile CTA bar below fold.

### Files to Modify
- `components/ui/Header.tsx` - MODIFY mobile menu with 48px+ touch targets, AnimatePresence animation, scroll lock, intent-based labels
- `components/ui/MobileStickyBar.tsx` - CREATE sticky bottom CTA bar for mobile
- `messages/en.json` - MODIFY navigation labels to intent-based
- `messages/it.json` - MODIFY navigation labels to intent-based
- `app/globals.css` - MODIFY if needed for sticky bar positioning

### Acceptance Criteria
- [ ] Navigation labels are intent-based (not section-based)
- [ ] All mobile touch targets >= 48px
- [ ] Mobile menu animates in/out with Framer Motion
- [ ] Body scroll locked when menu open
- [ ] Sticky CTA bar appears below fold on mobile
- [ ] Language buttons are 48x48px minimum
- [ ] All interactive elements have focus-visible indicators
- [ ] Screen reader tested (VoiceOver + TalkBack)

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 15: Activate AI Chatbot as Engagement & Qualification Engine

| Field | Value |
|-------|-------|
| **Priority** | Transformational |
| **Effort** | 2-3 settimane |
| **Impact** | 3-5x visitor qualification; chat engagement 3-5% -> 12-20%; new chat-to-booking funnel |
| **Category** | ux |

### Description
The AI chatbot exists as a passive Q&A tool with no proactive triggers, no lead qualification, and no conversion handoff. Transform it into an intelligent engagement engine with: (A) Proactive triggers based on scroll depth, time on page, return visits; (B) 3-tier intent classification (Curious -> Evaluating -> Ready); (C) Automated booking CTA insertion when high intent detected. This becomes the missing Tier 1-2 engagement layer in the graduated engagement ladder.

### Files to Modify
- `components/chat/ChatInterface.tsx` - MODIFY to add proactive trigger logic, fix iOS zoom (text-base), add enterKeyHint
- `components/chat/ChatTrigger.tsx` - CREATE proactive engagement trigger component with slide-up animation
- `lib/hooks/useChatTriggers.ts` - CREATE scroll-depth, time-on-page, return-visit event listeners
- `lib/chat/intentClassifier.ts` - CREATE 3-tier classification schema integrated with Claude API prompt
- `lib/chat/conversionHandoff.ts` - CREATE booking CTA insertion logic for high-intent conversations
- `messages/en.json` - MODIFY to add trigger messages and classification responses
- `messages/it.json` - MODIFY to add trigger messages and classification responses

### Acceptance Criteria
- [ ] Proactive chat trigger appears after 90s+ on page (max 1 per session)
- [ ] Scroll-depth trigger at >75% without CTA click
- [ ] Return visitor detection via localStorage
- [ ] 3-tier intent classification operational
- [ ] Booking CTA surfaces in chat when intent = "Ready"
- [ ] Chat input 16px minimum (no iOS zoom)
- [ ] Analytics tracking for chat engagement funnel
- [ ] Trigger frequency conservative (not intrusive)

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)
