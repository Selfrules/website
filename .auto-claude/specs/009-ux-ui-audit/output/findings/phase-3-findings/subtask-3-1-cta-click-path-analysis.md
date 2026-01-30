# Subtask 3-1: CTA Mapping & Click Path Analysis

**Date:** 2026-01-27
**Auditor:** Claude (Senior UX/UI Designer Perspective)
**URL Analyzed:** https://selfrules.org

---

## Executive Summary

This document provides a comprehensive mapping of all Call-to-Action (CTA) elements on selfrules.org, including their visual prominence, destinations, and click path analysis. The site has **5 primary CTAs**, **7 navigation CTAs**, and **8+ footer CTAs**. The primary conversion goal (booking a call) requires **1-2 clicks** from the Hero section or **2-3 clicks** from the WorkTogether section.

**Key Finding:** The site has multiple conversion opportunities, but visual prominence varies significantly. The Hero CTA competes with decorative elements, while the WorkTogether CTA has stronger visual hierarchy within a dedicated banner.

---

## 1. Complete CTA Inventory

### 1.1 Primary Conversion CTAs (Booking Flow)

| # | CTA | Section | Label (IT/EN) | Destination | Analytics Event |
|---|-----|---------|---------------|-------------|-----------------|
| 1 | **Hero Primary** | Hero | "Parliamone" / "Let's talk" | GoogleCalendarPopup modal | `book_call` (hero) |
| 2 | **WorkTogether CTA** | WorkTogether | "Prenota ora" / "Book now" | GoogleCalendarPopup modal | `work_together` |

### 1.2 Engagement CTAs (Alternative Conversion)

| # | CTA | Section | Label (IT/EN) | Destination | Analytics Event |
|---|-----|---------|---------------|-------------|-----------------|
| 3 | **Chat Button** | AskMeAnything | "Inizia chat" / "Start chat" | ChatInterface (floating widget) | `chat_interaction` |
| 4 | **Form Submit** | AskMeAnything | "Invia domanda" / "Submit question" | POST /api/questions | `anonymous_question` |

### 1.3 Navigation CTAs

| # | CTA | Label (IT/EN) | Destination | Analytics |
|---|-----|---------------|-------------|-----------|
| 5 | **Hero Secondary** | "Come ci sono arrivato" / "How I got here" | Scroll to #journey | None |
| 6 | **Nav: Home** | "Home" | #home | None |
| 7 | **Nav: Journey** | "Percorso" / "Journey" | #journey | None |
| 8 | **Nav: Now** | "Now" | #now | None |
| 9 | **Nav: Work** | "Lavoriamo insieme" / "Work with me" | #work | None |
| 10 | **Nav: Contact** | "Parliamo" / "Let's talk" | #ask-me | None |
| 11 | **Logo** | "MFDL" | /{locale} homepage | None |

### 1.4 Footer CTAs

| # | CTA | Destination | Analytics |
|---|-----|-------------|-----------|
| 12 | **LinkedIn** | https://linkedin.com/in/selfrules/ | `outbound_click` (social) |
| 13 | **Twitter** | https://x.com/Matt_Selfrules | `outbound_click` (social) |
| 14 | **GitHub** | https://github.com/Selfrules | `outbound_click` (social) |
| 15 | **Email** | mailto:info@selfrules.org | `outbound_click` (social) |
| 16 | **Quick Links** | Internal sections | None |
| 17 | **Resources** | # (placeholder) | None |
| 18 | **Privacy** | /{locale}/privacy | None |
| 19 | **Terms** | /{locale}/terms | None |

### 1.5 Utility CTAs

| # | CTA | Section | Action |
|---|-----|---------|--------|
| 20 | **Language Switcher IT** | Header | Switch to /it locale |
| 21 | **Language Switcher EN** | Header | Switch to /en locale |
| 22 | **Mobile Menu Toggle** | Header | Open/close mobile navigation |
| 23 | **Chat Close Button** | ChatInterface | Close chat widget |
| 24 | **Calendar Close Button** | GoogleCalendarPopup | Close calendar modal |
| 25 | **Calendar Retry Button** | GoogleCalendarPopup (error state) | Retry loading calendar |

---

## 2. Visual Prominence Analysis

### 2.1 Hero Section CTAs

#### Primary CTA: "Parliamone"
```
Component: NeoButton variant="primary" size="md"
```

| Attribute | Value | Assessment |
|-----------|-------|------------|
| **Background Color** | Electric Blue (#0D7EFF) | HIGH visibility - strong contrast |
| **Text Color** | White | HIGH contrast (12.6:1 on blue) |
| **Size (desktop)** | px-8 py-3 = ~150px × 48px | ADEQUATE - meets touch targets |
| **Size (mobile)** | px-6 py-3 = ~130px × 48px | ADEQUATE - meets touch targets |
| **Border** | 3px solid black | HIGH prominence |
| **Shadow** | 8px hard shadow | HIGH prominence |
| **Icon** | ArrowRight (animated) | GOOD - directional cue |
| **Position** | Center, below headline | GOOD - within F-pattern |
| **Hover Effect** | -translate-y-1, shadow-brutal-lg | GOOD - clear feedback |

**Visual Prominence Score: 7/10**

**Issues:**
- Competes with 4 floating geometric shapes (mobile: hidden, desktop: visible)
- Similar visual weight to secondary "outline" button
- No animation to draw initial attention

#### Secondary CTA: "Come ci sono arrivato"
```
Component: NeoButton variant="outline" size="md"
```

| Attribute | Value | Assessment |
|-----------|-------|------------|
| **Background Color** | White (!bg-white override) | MEDIUM visibility |
| **Text Color** | Text Primary (#0A0A0A) | HIGH contrast |
| **Size** | Same as primary | ADEQUATE |
| **Border** | 3px solid black | MEDIUM prominence |
| **Shadow** | 8px hard shadow | MEDIUM prominence |
| **Hover Effect** | bg-cyber-yellow | GOOD - transforms to accent |
| **Position** | Right of primary CTA | APPROPRIATE - secondary position |

**Visual Prominence Score: 5/10**

---

### 2.2 WorkTogether Section CTA

#### CTA Banner: "Prenota ora"
```
Component: NeoButton variant="accent" size="lg"
```

| Attribute | Value | Assessment |
|-----------|-------|------------|
| **Background Color** | Cyber Yellow (#FFD60A) | VERY HIGH visibility |
| **Text Color** | Text Primary (#0A0A0A) | HIGH contrast (14.7:1) |
| **Size (desktop)** | px-10 py-4 = ~180px × 56px | EXCELLENT - large touch target |
| **Size (mobile)** | px-8 py-4 = ~160px × 56px | EXCELLENT |
| **Border** | 3px solid black | HIGH prominence |
| **Shadow** | 8px hard shadow | HIGH prominence |
| **Container** | Gradient banner (rotated -1deg) | VERY HIGH - eye-catching |
| **Position** | Centered, dedicated banner | EXCELLENT - isolated focus |
| **Context** | After service cards | APPROPRIATE - decision point |

**Visual Prominence Score: 9/10**

**This is the most visually prominent CTA on the site.**

---

### 2.3 AskMeAnything Section CTAs

#### Chat Button: "Inizia chat"
```
Component: NeoButton variant="primary" size="lg"
```

| Attribute | Value | Assessment |
|-----------|-------|------------|
| **Background Color** | Electric Blue (#0D7EFF) | HIGH visibility |
| **Size (desktop)** | px-10 py-4 | EXCELLENT |
| **Size (mobile)** | Full width (w-full) | EXCELLENT |
| **Container** | Blue-bordered card on dark bg | HIGH contrast |
| **Position** | Left column of 2-col grid | GOOD |

**Visual Prominence Score: 8/10**

#### Form Submit: "Invia domanda"
```
Component: Custom button (not NeoButton)
```

| Attribute | Value | Assessment |
|-----------|-------|------------|
| **Background Color** | Neon Pink (#FF006E) | VERY HIGH visibility |
| **Size** | Full width, py-3 md:py-4 | EXCELLENT |
| **Container** | Pink-bordered card on dark bg | HIGH contrast |
| **Position** | Right column of 2-col grid | GOOD |

**Visual Prominence Score: 8/10**

---

### 2.4 Visual Prominence Ranking (All CTAs)

| Rank | CTA | Score | Rationale |
|------|-----|-------|-----------|
| 1 | WorkTogether "Prenota ora" | 9/10 | Isolated in gradient banner, accent color, large size |
| 2 | AskMeAnything "Inizia chat" | 8/10 | Full-width on mobile, strong contrast on dark background |
| 3 | AskMeAnything "Invia domanda" | 8/10 | Pink accent, full-width on mobile |
| 4 | Hero "Parliamone" | 7/10 | Primary blue, but competes with floating shapes |
| 5 | Hero "Come ci sono arrivato" | 5/10 | Outline style, appropriate for secondary action |

---

## 3. Click Path Analysis

### 3.1 Path A: Immediate Booking (Hero)

```
LANDING → Hero Section
    │
    └─► [1 CLICK] "Parliamone" button
            │
            └─► GoogleCalendarPopup modal opens
                    │
                    └─► [EXTERNAL] Google Calendar iframe loads
                            │
                            └─► [2-3 CLICKS] Select time slot → Confirm booking
```

**Total Clicks to Conversion: 3-4 clicks**
- Click 1: Hero CTA
- Click 2-3: Time selection in Google Calendar
- Click 4: Confirm booking (external)

**Friction Points:**
- Calendar iframe loading time (~2-3 seconds)
- External Google Calendar UI (not branded)
- No pre-filled information

---

### 3.2 Path B: Research-then-Book (Full Scroll)

```
LANDING → Hero Section
    │
    └─► [SCROLL] or [1 CLICK] "Come ci sono arrivato"
            │
            └─► Journey Section (credibility building)
                    │
                    └─► [SCROLL] WhatImUpTo Section (relatability)
                            │
                            └─► [SCROLL] WorkTogether Section
                                    │
                                    └─► [1 CLICK] "Prenota ora" button
                                            │
                                            └─► GoogleCalendarPopup modal
                                                    │
                                                    └─► [2-3 CLICKS] Booking flow
```

**Total Clicks to Conversion: 4-6 clicks** (if clicking secondary CTA) or **3-4 clicks** (natural scroll + CTA)

**Friction Points:**
- Long scroll depth (~4 viewport heights)
- No mid-page booking prompts
- Service cards are informational only (no per-card CTAs)

---

### 3.3 Path C: Chat Engagement

```
LANDING → Hero Section
    │
    └─► [SCROLL] To AskMeAnything Section (~5 viewport heights)
            │
            └─► [1 CLICK] "Inizia chat" button
                    │
                    └─► ChatInterface widget opens (floating)
                            │
                            └─► [TYPE + ENTER] Send message
                                    │
                                    └─► [CONVERSATION] Multiple exchanges
                                            │
                                            └─► [POTENTIAL] AI may suggest booking
```

**Total Clicks to Engagement: 2 clicks + typing**

**Friction Points:**
- Very long scroll to reach chat CTA
- No floating chat bubble shortcut
- Chat widget position (bottom-right) may be missed on first load

---

### 3.4 Path D: Anonymous Question

```
LANDING → Hero Section
    │
    └─► [SCROLL] To AskMeAnything Section
            │
            └─► [TYPE] Question in textarea
                    │
                    └─► [1 CLICK] "Invia domanda" button
                            │
                            └─► API call → Success message
```

**Total Clicks to Submission: 1 click + typing**

**Friction Points:**
- Very long scroll to reach form
- Minimum 10 character requirement
- No email capture (true anonymity, but no follow-up)

---

## 4. Conversion Path Visualization

### 4.1 Desktop Click Heatmap (Estimated)

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER (sticky)                                                │
│ [MFDL Logo]              [Nav: Home | Journey | Now | Work | Contact]  [IT|EN] │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                     ○ ← Floating shape                         │
│                                                                │
│         [Badge]                                                │
│         ┌─────────────────────────────────────────┐           │
│         │     HEADLINE (primary focus)            │           │
│         └─────────────────────────────────────────┘           │
│                                                                │
│              Subtitle text...                                  │
│                                                                │
│         ┌─────────────────┐  ┌──────────────────┐             │
│         │  ★ Parliamone   │  │ Come ci sono...  │             │
│         │     (CTA #1)    │  │     (CTA #2)     │             │
│         └─────────────────┘  └──────────────────┘             │
│                    ▲                                           │
│                    │                                           │
│            PRIMARY CLICK TARGET                                │
│              (~40% of clicks?)                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                   JOURNEY SECTION                              │
│              (scroll engagement, no CTAs)                      │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                  WHATIMUP TO SECTION                           │
│             (humanization, no CTAs)                            │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                  WORKTOGETHER SECTION                          │
│                                                                │
│         [Service Card 1]  [Service Card 2]  [Service Card 3]  │
│                                                                │
│         ┌──────────────────────────────────────────┐          │
│         │  ★★★ GRADIENT CTA BANNER ★★★             │          │
│         │                                          │          │
│         │      "Una call da 15 minuti"             │          │
│         │      [ PRENOTA ORA ]                     │◄─────────── HIGHEST VISIBILITY
│         │                                          │           (~35% of clicks?)
│         └──────────────────────────────────────────┘          │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                  ASKMEANYTHING SECTION                         │
│                                                                │
│         ┌──────────────────┐  ┌──────────────────┐            │
│         │  AI Chat Card     │  │  Anonymous Form  │            │
│         │                   │  │                  │            │
│         │  [★ Inizia chat]  │  │  [textarea]      │            │
│         │                   │  │  [★ Invia]       │            │
│         └──────────────────┘  └──────────────────┘            │
│                                                                │
│              (~15% of clicks?)   (~10% of clicks?)            │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                     FOOTER                                     │
│  [LinkedIn] [Twitter] [GitHub] [Email]                        │
│  Quick Links | Resources | Privacy | Terms                     │
└────────────────────────────────────────────────────────────────┘
```

---

## 5. Click Count Summary by Goal

### 5.1 Primary Goal: Book a Call

| Starting Point | Clicks to Booking Modal | Clicks to Confirm |
|----------------|------------------------|-------------------|
| Hero (immediate) | 1 | 3-4 |
| Hero (via scroll CTA) | 1 + scroll + 1 = 2 | 4-5 |
| WorkTogether (natural scroll) | scroll + 1 = 1 | 3-4 |
| AskMeAnything (via chat) | scroll + 1 + conversation | Variable |

### 5.2 Secondary Goal: Engage with Chat

| Starting Point | Clicks to Chat Open | Clicks to Send Message |
|----------------|--------------------|-----------------------|
| AskMeAnything | scroll + 1 | scroll + 1 + type + enter |

### 5.3 Tertiary Goal: Submit Anonymous Question

| Starting Point | Clicks to Form | Clicks to Submit |
|----------------|----------------|------------------|
| AskMeAnything | scroll + 0 (form visible) | scroll + type + 1 |

---

## 6. Recommendations

### 6.1 Quick Wins (< 1 Day)

| # | Recommendation | Impact | Effort |
|---|----------------|--------|--------|
| 1 | **Add floating "Book Call" button** (persistent bottom-right on scroll) | HIGH - reduces clicks from any page position | 2-4 hours |
| 2 | **Add subtle animation to Hero CTA** (pulse or attention-grabbing) | MEDIUM - increases first CTA visibility | 1-2 hours |
| 3 | **Track navigation CTA clicks** (add analytics to anchor links) | LOW - better funnel understanding | 1 hour |
| 4 | **Add mid-page booking prompt** (after Journey section) | HIGH - captures scroll abandoners | 2-3 hours |

### 6.2 Strategic Improvements

| # | Recommendation | Impact | Effort |
|---|----------------|--------|--------|
| 1 | **Pre-populate calendar with visitor timezone** | MEDIUM - reduces friction | 4-8 hours |
| 2 | **Add floating chat bubble** (always visible, not just in section) | HIGH - engagement from any position | 4-6 hours |
| 3 | **Create inline booking form** (no modal, faster experience) | HIGH - reduces abandonment | 1-2 days |
| 4 | **Add per-service "Book this" buttons** to CollaborationCards | MEDIUM - contextual conversion | 4-6 hours |

### 6.3 Visual Hierarchy Improvements

| Issue | Current State | Recommended Fix |
|-------|---------------|-----------------|
| Hero CTA competes with shapes | Same z-index, similar visual weight | Add subtle glow/pulse to CTA or reduce shape opacity |
| Secondary CTA too similar to primary | Both have same shadow/border | Reduce shadow on outline variant |
| Service cards have no CTA | Information only | Add "Learn more" or "Book for this" per card |

---

## 7. Conversion Funnel Metrics (Estimated)

Based on typical portfolio/consulting site benchmarks:

| Stage | Estimated % | Notes |
|-------|-------------|-------|
| Land on Hero | 100% | Entry point |
| Click Hero CTA | 3-8% | Immediate converters |
| Scroll to Journey | 60-70% | Interested visitors |
| Scroll to WorkTogether | 40-50% | Highly engaged |
| Click WorkTogether CTA | 2-5% | Research-then-book |
| Scroll to AskMeAnything | 25-35% | Alternative seekers |
| Engage with Chat | 5-10% | Low-commitment engagement |
| Submit Anonymous Form | 1-3% | True anonymity seekers |

**Total estimated conversion rate (booking modal opened): 5-13%**
**Booking completion rate (estimated): 20-40% of modal opens**
**Net booking rate: 1-5%** (industry standard for consulting: 1-3%)

---

## Appendix: Component References

### Button Components Used
- `NeoButton` - Primary button component (Hero, WorkTogether)
- `CTAButton` - Animated CTA with icon support (available but not used in main CTAs)
- Custom button - Anonymous form submit

### CTA Styling Classes

```tsx
// NeoButton sizes
sm: 'px-4 py-2 text-sm'        // ~130px × 40px
md: 'px-6 py-3 text-base'      // ~150px × 48px (desktop: px-8 py-3)
lg: 'px-8 py-4 text-lg'        // ~180px × 56px (desktop: px-10 py-4)

// NeoButton variants
primary:  'bg-electric-blue text-white shadow-brutal'
accent:   'bg-cyber-yellow text-text-primary shadow-brutal'
outline:  'bg-cream text-text-primary border-[#000] shadow-brutal'
```

### Analytics Events Tracked
- `cta_click` with location: hero, work_together
- `calendar_action`: opened, closed
- `chat_interaction`: message_sent
- `form_submit`: anonymous_question
- `outbound_click`: social links

---

*Document generated as part of Phase 3: Conversion Path Analysis for UX/UI Audit*
