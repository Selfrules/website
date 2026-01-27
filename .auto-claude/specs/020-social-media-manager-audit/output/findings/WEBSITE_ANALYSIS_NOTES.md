# Website Structure & Social Integration Analysis

## Document Metadata
- **Task**: Subtask 1-1 - Analyze website structure and social integration points
- **Website**: selfrules.org
- **Date**: 2026-01-26
- **Analyst**: Auto-Claude

---

## Executive Summary

selfrules.org is a neobrutalist personal brand website for Mattia Filippo De Luca, a Product Manager with 13 years of cross-functional experience (design → development → PM). The site is built with Next.js 14, features bilingual support (IT/EN), and serves as a B2B professional services platform offering consulting, brainstorming sessions, and PM mentorship.

### Key Social Integration Findings
- **Current State**: Basic social presence in footer only
- **Gaps Identified**: No social sharing buttons, limited social proof integration
- **Opportunities**: High-quality content sections perfect for social repurposing

---

## 1. Hero Section Value Proposition

### Location
`components/sections/Hero.tsx`

### Content Analysis

**Badge**: Dynamic (translated) - signals positioning

**Headline Structure** (Italian):
```
Il PM che chiami quando tutti dicono "sì" ma nessuno sa cosa fare
```

**Unique Value Proposition**:
- Translator between business, design, and tech
- 13 years of experience spanning design → development → PM
- Problem-solver for cross-functional miscommunication

**Subtitle Highlights**:
- "Ho fallito come designer e developer"
- Positions failures as credentials
- Emphasizes "translation" superpower

**CTAs Present**:
1. **Primary CTA**: "Prenota una call" → Opens Google Calendar popup
2. **Secondary CTA**: "Scopri il mio percorso" → Scrolls to #journey section

### Social Content Potential
- Hero messaging is highly shareable (contrarian, personal story)
- "Failure to success" narrative resonates on LinkedIn
- Value prop could be condensed into viral LinkedIn hooks:
  - "Ho fallito come designer. Poi come developer. Ora sono il PM che traduce."

---

## 2. Journey Timeline Section

### Location
`components/sections/Journey.tsx`

### Content Structure

**4 Career Milestones**:
| Phase | Role | Color | Duration |
|-------|------|-------|----------|
| 1 | Designer | Purple | ~4 years |
| 2 | Developer | Yellow | ~4 years |
| 3 | Product Owner | Pink | Transition |
| 4 | Product Manager | Blue (Current) | 5+ years |

**For Each Milestone**:
- Date range
- Role badge
- Company name
- Description with markdown formatting
- Achievements list
- Skills/technologies used
- Certifications (where applicable)

### Social Content Potential
- **Timeline graphic**: Perfect for LinkedIn carousel or infographic
- **Individual milestone stories**: Each phase = 1 week of LinkedIn content
- **"Lessons learned" format**: Extract achievements as standalone posts
- **Certification showcases**: CSPO, CSM badges for credibility posts

---

## 3. Work Together CTAs Section

### Location
`components/sections/WorkTogether.tsx`

### Service Offerings (3 Cards)

| # | Service | Icon | Color | Target |
|---|---------|------|-------|--------|
| 01 | Consulting | Lightbulb | Blue (#0D7EFF) | Companies needing PM expertise |
| 02 | Brainstorming | Users | Pink (#FF006E) | Teams needing facilitation |
| 03 | Mentorship | GraduationCap | Purple (#7209B7) | Aspiring PMs |

**Card Structure**:
- Number badge
- Title
- Problem statement
- "What we do"
- "What you get"
- Features list (3 items each)

**CTA Banner**:
- Gradient background with rotation (-1deg neobrutalist style)
- Title + subtitle + description
- **Primary CTA**: Opens Google Calendar popup
- Analytics tracking: `work_together` action

### Social Content Potential
- **Service spotlights**: Each service = LinkedIn post series
- **Problem/solution format**: "Struggling with [problem]? Here's how I help..."
- **Testimonial opportunities**: Can collect and showcase client stories
- **Booking CTA integration**: Direct link to calendar from social profiles

---

## 4. Social Footer Links

### Location
`components/layout/Footer.tsx`

### Current Social Links

| Platform | URL | Icon | Status |
|----------|-----|------|--------|
| LinkedIn | https://www.linkedin.com/in/selfrules/ | Linkedin | ✅ Active |
| Twitter/X | https://x.com/Matt_Selfrules | Twitter | ✅ Configured |
| GitHub | https://github.com/Selfrules | Github | ✅ Configured |
| Email | mailto:info@selfrules.org | Mail | ✅ Configured |

**Implementation Details**:
- Icons from lucide-react library
- Color-coded with brand palette:
  - LinkedIn: Electric Blue (`#0D7EFF`)
  - Twitter: Neon Pink (`#FF006E`)
  - GitHub: Deep Purple (`#7209B7`)
  - Email: Cyber Yellow (`#FFD60A`)
- Hover effects with translate and color change
- **Analytics tracking**: `handleSocialClick()` tracks outbound clicks with platform identifier

### Integration Assessment

**Site → Social (Current)**:
- ✅ Footer social icons with tracking
- ❌ No social sharing buttons on content
- ❌ No "Follow me on LinkedIn" CTAs in sections
- ❌ No social proof badges/follower counts

**Social → Site (Current)**:
- ✅ LinkedIn profile links to selfrules.org (verified)
- ❓ Twitter bio link status unknown
- ❓ GitHub profile link status unknown

---

## 5. Blog Integration Points

### Current Status
- **Blog directory planned**: `/app/[locale]/blog/[slug]/` (referenced in CLAUDE.md)
- **Blog content planned**: MDX support configured
- **Blog section on homepage**: Not currently active
- **Epic in backlog**: EPIC-006 - Blog Redesign & Content Generation (High Priority)

### Planned Features (from backlog)
- Neobrutalist blog cards
- Social sharing components
- Open Graph images per post
- Category/tag system

### Social Integration Opportunities
- **Auto-share on publish**: Connect to social posting workflow
- **Social sharing buttons**: Add to each blog post
- **Twitter/LinkedIn cards**: Already have Open Graph metadata foundation
- **Content repurposing**: Blog → LinkedIn articles → Twitter threads

---

## 6. Other Key Sections

### WhatImUpTo Section
`components/sections/WhatImUpTo.tsx`

**3 Activity Cards**:
1. **Current Work** - PM role at QubicaAMF, Bologna
   - Metrics displayed (projects managed)
   - Examples of work
2. **Learning in Public** - Current learning topics
   - AI/Product intersection focus
   - Examples of experiments
3. **Spotify Widget** - Now playing integration
   - SpotifyWidget component
   - SpotifyRecommendations component

**Social Potential**:
- "What I'm working on" updates = weekly LinkedIn content
- "Learning in public" aligns perfectly with LinkedIn's professional development content

### AskMeAnything Section
`components/sections/AskMeAnything.tsx`

**Two Interaction Modes**:
1. **AI Chat** - Claude-powered chatbot trained on Mattia's experience
2. **Anonymous Form** - Question submission without login

**Social Potential**:
- Q&A responses can become social content
- "Ask me anything" format works great on Twitter/LinkedIn
- Builds community engagement

---

## 7. Open Graph & Social Metadata

### Root Layout Configuration
`app/layout.tsx`

**Current Metadata**:
```typescript
openGraph: {
  type: 'website',
  locale: 'it_IT',
  alternateLocale: 'en_US',
  url: 'https://selfrules.org',
  siteName: 'Mattia De Luca',
  title: 'Ho fallito come designer e developer. Ora traduco tra business, design e tech.',
  description: '4 anni design. 4 anni dev. 5 anni PM...'
}

twitter: {
  card: 'summary_large_image',
  title: 'Ho fallito come designer e developer...',
  description: '13 anni di errori → 1 superpower...',
  creator: '@mattiadluca'  // Note: Different handle than footer link
}
```

### Assessment
- ✅ Basic OG tags configured
- ✅ Twitter card configured
- ⚠️ Twitter handle mismatch: `@mattiadluca` vs `@Matt_Selfrules`
- ❌ No OG images configured
- ❌ Homepage-specific OG overrides exist but no images

---

## 8. Analytics Integration

### Location
`components/analytics/UmamiScript.tsx`, `lib/hooks/useAnalytics.ts`

**Tracking Points Relevant to Social**:
- CTA clicks: `trackCTAClick('book_call', 'hero', {...})`
- Outbound social clicks: `trackOutboundClick(url, 'social', { platform })`
- Form submissions
- Chat interactions

**Value for Social Strategy**:
- Can measure which CTAs drive bookings
- Can track social profile traffic
- Can identify high-performing content for social sharing

---

## 9. Bilingual Content Strategy

### Implementation
- i18n routing: `/it/` and `/en/`
- `next-intl` for translations
- Language switcher in header

**Current Split**:
- Primary: Italian (local market)
- Secondary: English (international reach)

**Social Implications**:
- Dual-language posting strategy needed
- LinkedIn: Can post in both languages
- Twitter: Consider audience majority language
- Geographic targeting may differ by platform

---

## Summary: Social Integration Gaps & Opportunities

### Current Strengths ✅
1. Strong brand identity with consistent design system
2. Compelling value proposition and personal story
3. Well-structured content sections (perfect for repurposing)
4. Analytics tracking in place
5. Basic Open Graph metadata configured
6. Footer social links with tracking

### Current Gaps ❌
1. No social sharing buttons on any content
2. No social proof elements (follower counts, testimonials)
3. No OG images configured
4. Twitter handle inconsistency in metadata
5. No blog section live yet (planned in backlog)
6. No "Follow me" CTAs within page content
7. No LinkedIn article cross-posting integration

### Highest-Impact Opportunities 🎯
1. **LinkedIn carousel from Journey timeline** - Immediate content piece
2. **Add sharing buttons to sections** - Easy technical implementation
3. **Fix Twitter handle consistency** - Quick metadata fix
4. **Create OG images** - Improves social card appearance
5. **Repurpose service descriptions** - 3 posts from WorkTogether content
6. **Q&A content series** - Use AskMeAnything questions for social posts

---

## Appendix: File References

| Section | Primary File | Supporting Files |
|---------|-------------|------------------|
| Hero | `components/sections/Hero.tsx` | `components/ui/NeoButton.tsx`, `components/ui/GoogleCalendarPopup.tsx` |
| Journey | `components/sections/Journey.tsx` | `components/ui/NeoBadge.tsx` |
| WorkTogether | `components/sections/WorkTogether.tsx` | `components/ui/CollaborationCard.tsx` |
| Footer | `components/layout/Footer.tsx` | `lib/hooks/useAnalytics.ts` |
| WhatImUpTo | `components/sections/WhatImUpTo.tsx` | `components/integrations/SpotifyWidget.tsx` |
| AskMeAnything | `components/sections/AskMeAnything.tsx` | `components/forms/AnonymousQuestionForm.tsx` |
| Layout | `app/layout.tsx` | `app/[locale]/layout.tsx` |
