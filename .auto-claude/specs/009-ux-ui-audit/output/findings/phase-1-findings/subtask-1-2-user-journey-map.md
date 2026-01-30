# Subtask 1-2: User Journey Map & Homepage Section Analysis

**Date:** 2026-01-26
**Auditor:** Claude (Senior UX/UI Designer Perspective)
**URL Analyzed:** https://selfrules.org

---

## Executive Summary

The homepage consists of **5 main sections** arranged in a vertical scroll layout, guiding users from value proposition to conversion. The site structure is optimized for a single-page experience with anchor navigation, supporting two primary conversion paths: **Google Calendar booking** and **AI chatbot/anonymous form engagement**.

---

## 1. Complete Site Structure

### 1.1 Page Hierarchy

```
selfrules.org
├── /[locale] (it/en)               # Homepage (5 sections)
│   ├── #home (Hero)                # First impression & primary CTA
│   ├── #journey (Journey)          # Career timeline & credibility
│   ├── #now (WhatImUpTo)           # Current activities & Spotify
│   ├── #work (WorkTogether)        # Service offerings & secondary CTA
│   └── #ask-me (AskMeAnything)     # Engagement & tertiary CTAs
├── /[locale]/design-system         # Design system reference (internal)
├── /[locale]/privacy               # Privacy policy
├── /[locale]/terms                 # Terms of service
└── /demo                           # Demo page (internal)
```

### 1.2 Navigation Structure

| Navigation Element | Location | Type | Accessibility |
|-------------------|----------|------|---------------|
| **Header (sticky)** | Top | Fixed | Desktop: 5 nav links, Mobile: hamburger |
| **MFDL Logo** | Header left | Link to /{locale} | Always visible |
| **Language Switcher** | Header right | IT/EN toggle | Always visible |
| **Footer** | Bottom | Full-width | Social links, quick links, resources |
| **Skip to main** | Hidden until focus | Accessibility | Tab-accessible |

---

## 2. Section-by-Section Analysis

### 2.1 Hero Section (#home)

**File:** `components/sections/Hero.tsx`
**Purpose:** First impression, value proposition delivery, primary conversion

| Attribute | Value |
|-----------|-------|
| **ID** | `#home` |
| **Background** | `bg-cream` (#FFFCF2) |
| **Min Height** | 90vh (mobile), 100vh (desktop) |
| **Layout** | Centered, vertical stack |

**Visual Elements:**
- Pink badge with sparkles icon: "UX • CODE • PM"
- Large headline with yellow/blue underline highlights
- Subtitle with pink highlight
- Floating geometric shapes (desktop only)
- Grid pattern background (subtle)

**Content Structure:**
```
[Badge] UX • CODE • PM
[Headline] Ho fallito come designer. Poi come developer.
           Ora sono il PM che chiami quando tutti dicono "sì"
           ma nessuno sa cosa fare.
[Subtitle] Perché dopo 13 anni... il problema non è mai quello
           che ti dicono al primo meeting.
[CTA Row]  [Parliamone →] [Come ci sono arrivato]
```

**CTAs:**

| CTA | Label (IT) | Label (EN) | Action | Type |
|-----|------------|------------|--------|------|
| **Primary** | "Parliamone" | "Let's talk" | Opens GoogleCalendarPopup | Button (blue) |
| **Secondary** | "Come ci sono arrivato" | "How I got here" | Scrolls to #journey | Anchor link (outline) |

**User Flow from Hero:**
```
Hero → [Primary CTA] → Google Calendar Popup → Booking
Hero → [Secondary CTA] → Journey Section → Scroll engagement
Hero → [Scroll down] → Journey Section (natural flow)
```

---

### 2.2 Journey Section (#journey)

**File:** `components/sections/Journey.tsx`
**Purpose:** Credibility building through career timeline

| Attribute | Value |
|-----------|-------|
| **ID** | `#journey` |
| **Background** | `bg-white` |
| **Layout** | Vertical timeline (mobile: left-aligned, desktop: alternating) |

**Visual Elements:**
- Purple badge: "Il percorso"
- Section title with yellow underline highlight
- Timeline with gradient connecting line
- 4 milestone cards with role-colored badges
- Decorative shapes (top-right, bottom-left)

**Timeline Milestones:**

| # | Period | Role | Company | Badge Color | Icon |
|---|--------|------|---------|-------------|------|
| 1 | 2011-2015 | Designer | Multi-company | Purple | Palette |
| 2 | 2015-2019 | Developer | Multi-company | Yellow | Code |
| 3 | 2019-2022 | Product Owner | ActiveProspect | Pink | Rocket |
| 4 | 2022-Present | Product Manager | QubicaAMF | Blue (current) | Award |

**Each Card Contains:**
- Date badge (monospace)
- Role badge (colored)
- Company name
- Description (markdown rendered)
- Achievements list
- Skills/technologies tags
- Certifications (when applicable)

**CTAs:** None (scroll engagement section)

**User Flow:**
```
Journey Section → [Card hover] → Lift effect (engagement)
Journey Section → [Scroll] → WhatImUpTo Section
Journey Section → [End message] → Motivational close ("La storia non è finita..." 💪)
```

---

### 2.3 WhatImUpTo Section (#now)

**File:** `components/sections/WhatImUpTo.tsx`
**Purpose:** Humanization, current activities, relatability

| Attribute | Value |
|-----------|-------|
| **ID** | `#now` |
| **Background** | `bg-white` |
| **Layout** | 3-column grid (responsive: 1 → 2 → 3) |

**Visual Elements:**
- Blue badge: "Ora"
- Section title
- Decorative gradient blob (top-right)
- 3 Activity Cards

**Content Cards:**

| Card | Title | Icon | Color | Content Type |
|------|-------|------|-------|--------------|
| **Current Work** | "Cosa faccio ora" | Briefcase | Blue | Role at QubicaAMF, metric display |
| **Learning** | "Learning in public" | BookOpen | Pink | Current learning topic, examples |
| **Spotify** | "Cosa ascolto" | Music | Yellow | SpotifyWidget + Recommendations |

**Special Components:**
- `SpotifyWidget` - Live "Now Playing" integration
- `SpotifyRecommendations` - Music recommendations list
- `ActivityCard` - Custom card component with metric support

**CTAs:** None (engagement/humanization section)

**User Flow:**
```
WhatImUpTo → [Spotify interaction] → Engagement (not conversion)
WhatImUpTo → [Scroll] → WorkTogether Section
```

---

### 2.4 WorkTogether Section (#work)

**File:** `components/sections/WorkTogether.tsx`
**Purpose:** Service offerings presentation, secondary conversion

| Attribute | Value |
|-----------|-------|
| **ID** | `#work` |
| **Background** | `bg-cream` with dot pattern |
| **Layout** | 3-column grid + CTA banner |

**Visual Elements:**
- Yellow badge: "Collaboriamo"
- Section title with pink highlight
- Background dot pattern (5% opacity)
- 3 Collaboration Cards
- Gradient CTA banner (rotated -1deg)

**Service Offerings:**

| # | Service | Icon | Color | Problem Addressed |
|---|---------|------|-------|-------------------|
| 01 | Consulenza | Lightbulb | Blue | Team speaks 3 languages |
| 02 | Brainstorming | Users | Pink | Feature trap without strategy |
| 03 | Mentorship | GraduationCap | Purple | Career direction guidance |

**Each CollaborationCard Contains:**
- Number badge (01, 02, 03)
- Icon in colored circle
- Title
- Problem statement
- What we do
- What you get
- Features list

**CTA Banner:**

| Element | Content (IT) |
|---------|--------------|
| Title | "Una call da 15 minuti" |
| Subtitle | "Gratis. Senza impegno." |
| Description | "Per capire se posso aiutarti..." |
| Button | "Prenota ora" |

**CTAs:**

| CTA | Label (IT) | Label (EN) | Action | Type |
|-----|------------|------------|--------|------|
| **Primary** | "Prenota ora" | "Book now" | Opens GoogleCalendarPopup | Button (accent/yellow) |

**User Flow:**
```
WorkTogether → [Service card] → Understanding (no click action)
WorkTogether → [CTA Banner] → Google Calendar Popup → Booking
WorkTogether → [Scroll] → AskMeAnything Section
```

---

### 2.5 AskMeAnything Section (#ask-me)

**File:** `components/sections/AskMeAnything.tsx`
**Purpose:** Alternative engagement, conversation starter, lead capture

| Attribute | Value |
|-----------|-------|
| **ID** | `#ask-me` |
| **Background** | `bg-dark` (dark theme section) |
| **Layout** | 2-column grid (responsive: 1 → 2) |

**Visual Elements:**
- Yellow badge with sparkles: "Le domande scomode"
- Section title (white text)
- Description with yellow highlight
- Decorative floating shapes
- 2 Engagement Cards (dark theme)

**Engagement Options:**

| Card | Title | Icon | Border Color | Purpose |
|------|-------|------|--------------|---------|
| **AI Chat** | "Parla con il mio AI clone" | MessageCircle | Electric Blue | Chat with AI trained on Mattia's experience |
| **Anonymous Form** | "Chiedi anonimo" | Mail | Neon Pink | Submit anonymous questions |

**AI Chat Card Contains:**
- Icon in blue circle
- Title
- Introduction text
- Bullet list of conversation topics
- Ironic closer
- "Inizia chat" button

**Anonymous Form Card Contains:**
- Icon in pink circle
- Title
- Description (zero judgment promise)
- `AnonymousQuestionForm` component

**CTAs:**

| CTA | Label (IT) | Label (EN) | Action | Type |
|-----|------------|------------|--------|------|
| **Chat** | "Inizia chat" | "Start chat" | Opens ChatInterface (floating) | Button (primary/blue) |
| **Form** | "Invia domanda" | "Submit question" | Submits to /api/questions | Form submit (pink) |

**User Flow:**
```
AskMeAnything → [Chat button] → ChatInterface (floating widget)
AskMeAnything → [Form submit] → API call → Success message
AskMeAnything → [Scroll] → Footer
```

---

## 3. Complete User Journey Paths

### 3.1 Primary Conversion Path (Booking)

```
[Landing] → Hero
    ↓
[Value Prop] → Read headline, understand positioning
    ↓
[Primary CTA] → "Parliamone" button
    ↓
[Modal Open] → GoogleCalendarPopup
    ↓
[Loading State] → Spinner + "Caricamento calendario..."
    ↓
[Google Calendar] → iframe with appointment scheduler
    ↓
[Select Time] → User picks available slot
    ↓
[Confirm] → Booking complete (external to site)
```

**Clicks to Conversion:** 1-2 clicks (CTA → time selection)

### 3.2 Secondary Conversion Path (Service-Focused)

```
[Landing] → Hero
    ↓
[Explore] → "Come ci sono arrivato" → Scroll to Journey
    ↓
[Credibility] → Read timeline, achievements
    ↓
[Current State] → WhatImUpTo section
    ↓
[Services] → WorkTogether section
    ↓
[Understanding] → Read service cards
    ↓
[Decision] → CTA Banner "Prenota ora"
    ↓
[Modal Open] → GoogleCalendarPopup
    ↓
[Booking] → Same as primary path
```

**Clicks to Conversion:** 2-3 clicks (requires scroll + CTA)

### 3.3 Engagement Path (Chat)

```
[Landing] → Hero
    ↓
[Full Scroll] → Through Journey, WhatImUpTo, WorkTogether
    ↓
[AskMeAnything] → Read section
    ↓
[Chat Decision] → "Inizia chat" button
    ↓
[Chat Opens] → ChatInterface widget (floating, bottom-right)
    ↓
[Conversation] → User sends message
    ↓
[AI Response] → Streaming response from /api/chat/stream
    ↓
[Potential Conversion] → May lead to booking (chat can suggest it)
```

**Clicks to Conversion:** Variable (depends on conversation)

### 3.4 Anonymous Engagement Path

```
[Landing] → Hero
    ↓
[Full Scroll] → Through all sections
    ↓
[AskMeAnything] → Read section
    ↓
[Anonymous Option] → Textarea form
    ↓
[Type Question] → Minimum 10 characters
    ↓
[Submit] → "Invia domanda" button
    ↓
[API Call] → POST /api/questions
    ↓
[Success] → "Domanda inviata! Ti risponderò presto sul blog."
```

**Clicks to Conversion:** 2 clicks (type + submit)

---

## 4. CTA Inventory & Mapping

### 4.1 All CTAs on Homepage

| # | Section | CTA Text (IT) | Action | Visual Style | Analytics Event |
|---|---------|---------------|--------|--------------|-----------------|
| 1 | Hero | "Parliamone" | Google Calendar | Blue button + arrow | `book_call` / hero |
| 2 | Hero | "Come ci sono arrivato" | Scroll to #journey | Outline button | None |
| 3 | WorkTogether | "Prenota ora" | Google Calendar | Yellow/accent button | `work_together` |
| 4 | AskMeAnything | "Inizia chat" | Open ChatInterface | Blue button | (in chat component) |
| 5 | AskMeAnything | "Invia domanda" | Form submit | Pink button + send icon | `anonymous_question` |

### 4.2 Header Navigation CTAs

| # | Label (IT) | Target | Mobile | Desktop |
|---|------------|--------|--------|---------|
| 1 | Home | #home | Yes | Yes |
| 2 | Percorso | #journey | Yes | Yes |
| 3 | Now | #now | Yes | Yes |
| 4 | Lavoriamo insieme | #work | Yes | Yes |
| 5 | Parliamo | #ask-me | Yes | Yes |

### 4.3 Footer Links

| Category | Links |
|----------|-------|
| **Quick Links** | Home, Work Together, About |
| **Resources** | Tools, Design, Stack, Newsletter (all # placeholders) |
| **Social** | LinkedIn, Twitter, GitHub, Email |
| **Legal** | Privacy, Terms |

---

## 5. Conversion Funnel Visualization

```
                    ┌─────────────────────┐
                    │     LANDING         │  100%
                    │   (Hero Section)    │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
      ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
      │  IMMEDIATE    │ │    SCROLL     │ │    BOUNCE     │
      │  CONVERSION   │ │   EXPLORER    │ │               │
      │   (CTA #1)    │ │               │ │               │
      └───────┬───────┘ └───────┬───────┘ └───────────────┘
              │                 │               ~30-40%?
              ▼                 ▼
      ┌───────────────┐ ┌───────────────┐
      │   CALENDAR    │ │   JOURNEY     │
      │    POPUP      │ │   SECTION     │
      └───────┬───────┘ └───────┬───────┘
              │                 │
              ▼                 ▼
      ┌───────────────┐ ┌───────────────┐
      │   BOOKING     │ │  WHATIMUP TO  │
      │   COMPLETE    │ └───────┬───────┘
      │   (~2-5%?)    │         │
      └───────────────┘         ▼
                        ┌───────────────┐
                        │ WORKTOGETHER  │
                        │  (CTA #3)     │
                        └───────┬───────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
      ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
      │   BOOKING     │ │  ASKME        │ │    DROP       │
      │   COMPLETE    │ │  SECTION      │ │    OFF        │
      └───────────────┘ └───────┬───────┘ └───────────────┘
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            │   CHAT      │ │  ANONYMOUS  │ │   FOOTER    │
            │ ENGAGEMENT  │ │    FORM     │ │    EXIT     │
            └─────────────┘ └─────────────┘ └─────────────┘
```

---

## 6. Navigation Flow Diagram

```
                                    ┌─────────────────────┐
                                    │       HEADER        │
                                    │  [Logo] [Nav] [Lang]│
                                    └──────────┬──────────┘
                                               │
         ┌────────┬────────┬────────┬──────────┼──────────┐
         ▼        ▼        ▼        ▼          ▼          ▼
    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
    │ #home  │ │#journey│ │  #now  │ │ #work  │ │#ask-me │
    │  Hero  │ │Timeline│ │  Now   │ │Services│ │  AMA   │
    └────┬───┘ └────────┘ └────────┘ └───┬────┘ └───┬────┘
         │                               │          │
         ▼                               ▼          ▼
    ┌────────────┐                  ┌────────────┐ ┌────────────┐
    │ Calendar   │                  │  Calendar  │ │    Chat    │
    │   Popup    │◄─────────────────│   Popup    │ │  Interface │
    └────────────┘                  └────────────┘ └────────────┘
```

---

## 7. Section Interconnections

| From Section | To Section | Trigger | User Intent |
|--------------|------------|---------|-------------|
| Hero | Journey | Secondary CTA | Learn more |
| Hero | Calendar | Primary CTA | Book immediately |
| Journey | WhatImUpTo | Natural scroll | Continue exploring |
| WhatImUpTo | WorkTogether | Natural scroll | Understand services |
| WorkTogether | Calendar | CTA Banner | Book after research |
| WorkTogether | AskMeAnything | Natural scroll | Alternative engagement |
| AskMeAnything | Chat | Chat button | Low-commitment engagement |
| AskMeAnything | Form | Form submit | Anonymous inquiry |
| Any Section | Header Nav | Click nav item | Jump to section |

---

## 8. Key Findings

### Strengths

1. **Clear hierarchy**: Hero → Credibility → Current → Services → Engagement
2. **Multiple conversion opportunities**: 2 Calendar CTAs, 1 Chat, 1 Form
3. **Progressive disclosure**: Information revealed as user scrolls
4. **Consistent design language**: Neobrutalist elements throughout
5. **Bilingual support**: Seamless IT/EN switching

### Potential Friction Points

1. **Hero CTA visibility**: Primary CTA competes with floating shapes
2. **Long scroll depth**: 5 sections before reaching all CTAs
3. **No mid-page conversion prompts**: Only end-of-section CTAs
4. **Calendar iframe dependency**: External Google Calendar in modal
5. **Chat visibility**: Floating widget position may be missed

### Optimization Opportunities

1. Add sticky CTA or floating booking button
2. Consider mobile-specific CTA placement
3. Add micro-conversion (newsletter) earlier in journey
4. Implement scroll-triggered CTA prompts
5. Add exit-intent booking popup

---

## 9. Technical Implementation Notes

### Section IDs for Deep Linking
- `#home` - Hero section
- `#journey` - Timeline section
- `#now` - WhatImUpTo section
- `#work` - WorkTogether section
- `#ask-me` - AskMeAnything section

### Analytics Events Tracked
- `cta_click` (with location: hero, work_together)
- `calendar_action` (opened, closed)
- `chat_interaction` (message_sent)
- `form_submit` (anonymous_question)
- `outbound_click` (social links)

### Responsive Breakpoints
- Mobile: < 768px (single column)
- Tablet: 768px-1024px (2 columns)
- Desktop: > 1024px (full layout)

---

## Appendix: Component Dependencies

| Section | Key Components | External Dependencies |
|---------|----------------|----------------------|
| Hero | NeoButton, NeoBadge, GoogleCalendarPopup | Framer Motion |
| Journey | NeoBadge, renderMarkdown | Framer Motion, Lucide icons |
| WhatImUpTo | ActivityCard, SpotifyWidget | Spotify API |
| WorkTogether | CollaborationCard, NeoButton, GoogleCalendarPopup | Framer Motion |
| AskMeAnything | NeoButton, AnonymousQuestionForm, ChatInterface | Chat API |

---

*Document generated as part of Phase 1: Heuristic Walkthrough for UX/UI Audit*
