# Interventions from Social Media Strategy Audit

**Source Audit:** 020-social-media-manager-audit
**Audit Date:** 2026-01-26
**Total Interventions:** 15

---

## Intervention 1: Fix Twitter Handle Consistency

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 5 minutes |
| **Impact** | Eliminates broken social attribution and confusion between @Matt_Selfrules and @mattiadluca |
| **Category** | social |

### Description
The website footer links to @Matt_Selfrules while the metadata references @mattiadluca. This inconsistency causes broken Twitter card attribution and confuses users trying to find the correct account. Verify which handle is the correct one and update all references to match.

### Files to Modify
- `app/layout.tsx` - Update `twitter.creator` metadata to match the correct handle
- Footer component - Ensure footer social link points to the correct Twitter/X profile

### Acceptance Criteria
- [ ] Correct Twitter/X handle identified and verified
- [ ] `app/layout.tsx` metadata `twitter.creator` matches the correct handle
- [ ] Footer social link URL matches the correct handle
- [ ] All references to Twitter handle are consistent across the codebase

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (if applicable)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 2: Create and Add OG Image

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 1 hour |
| **Impact** | 70% higher social card engagement when sharing links on LinkedIn and Twitter |
| **Category** | social |

### Description
No Open Graph image is currently configured. When selfrules.org links are shared on social media, they display a generic card without a branded preview image. Create a 1200x630px branded OG image and add it to the site metadata.

### Files to Modify
- `public/` - Add new OG image file (1200x630px)
- `app/layout.tsx` - Add `images` property to OpenGraph metadata

### Acceptance Criteria
- [ ] OG image created at 1200x630px with selfrules.org branding
- [ ] Image added to `public/` directory
- [ ] `app/layout.tsx` metadata includes OpenGraph `images` property
- [ ] Social card preview renders correctly when sharing URL

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (if applicable)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 3: Optimize LinkedIn Featured Section

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 15 minutes |
| **Impact** | Shortcuts 4-step conversion funnel to 2-step (Profile -> Book), increasing booking rate |
| **Category** | social |

### Description
LinkedIn Featured section is currently unused. This is prime real estate for conversion. Add a booking link, a top-performing post, and a service overview to the Featured section. This shortcuts the conversion funnel from Content -> Profile -> Website -> Book to Profile -> Book.

### Files to Modify
- LinkedIn profile (external) - Add Featured items: booking link, top post, service overview

### Acceptance Criteria
- [ ] LinkedIn Featured section contains booking link (selfrules.org/work-together or Calendly)
- [ ] LinkedIn Featured section contains at least one top-performing post
- [ ] LinkedIn Featured section contains service overview or portfolio link
- [ ] Featured items are visible on profile visit

### Definition of Done
- [ ] Modifiche implementate
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 4: Update LinkedIn Bio with CTA

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 10 minutes |
| **Impact** | Increases micro-conversions from profile views to website visits/bookings |
| **Category** | social |

### Description
LinkedIn bio currently lacks an explicit call-to-action. Adding a clear CTA like "Free strategy call: selfrules.org" makes the conversion path obvious for profile visitors.

### Files to Modify
- LinkedIn profile (external) - Update headline or About section with CTA

### Acceptance Criteria
- [ ] LinkedIn bio/headline includes explicit CTA with link to selfrules.org
- [ ] CTA mentions booking or consultation availability
- [ ] Link is functional and points to correct page

### Definition of Done
- [ ] Modifiche implementate
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 5: Set Up UTM Tracking Parameters

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 1 hour |
| **Impact** | Enables accurate measurement of social media traffic and conversion attribution |
| **Category** | seo |

### Description
No UTM tracking parameters are currently used for social media links. Without UTM tracking, it's impossible to measure which social posts drive website traffic and bookings. Define UTM parameter standards and apply them to all social bio links and post links.

### Files to Modify
- LinkedIn profile (external) - Update website link with UTM parameters
- Content calendar templates - Add UTM guidance for post links

### Acceptance Criteria
- [ ] UTM parameter naming convention defined (utm_source, utm_medium, utm_campaign)
- [ ] LinkedIn profile link includes UTM parameters
- [ ] GA4 can track social media traffic source
- [ ] UTM template documented for future posts

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (if applicable)
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 6: Implement 30-Day Content Calendar

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 4 hours setup |
| **Impact** | Establishes consistent LinkedIn posting cadence (4 posts/week, 3.5 hrs/week) that builds thought leadership |
| **Category** | content |

### Description
Execute the 30-day content calendar created in this audit. The calendar covers 17 LinkedIn posts across 30 days with a 58.8% value / 29.4% engagement / 11.8% promotional content mix. Posts follow the 4-1-1 rule, use 13 different hook formulas, and integrate the TRIBE community model phases.

### Files to Modify
- Scheduling tool or LinkedIn - Create and schedule posts per calendar
- Reference: `output/CONTENT_CALENDAR_30_DAY.md` for full schedule

### Acceptance Criteria
- [ ] Week 1 posts (4 posts) drafted and scheduled
- [ ] Hook formulas applied per calendar specification
- [ ] Content mix maintains 60/25/15 value/engagement/promotional ratio
- [ ] Bilingual strategy applied (70% Italian, 30% English)
- [ ] Posting times follow recommended schedule (7:30 AM or 12:00 PM CET)

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (if applicable)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 7: Set Up Content Batching Workflow

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 2 hours setup |
| **Impact** | Makes content creation sustainable for solo practitioner by batching production |
| **Category** | content |

### Description
Establish a weekly content batching workflow: monthly planning session (1 hr) + weekly writing sessions (2 hrs) to prepare 4 posts in advance. This prevents the trap of daily content creation which is unsustainable for a solo practitioner with a full-time job.

### Files to Modify
- Personal productivity system - Set up recurring calendar blocks
- Reference: `output/findings/POSTING_CADENCE_RECOMMENDATIONS.md` for workflow details

### Acceptance Criteria
- [ ] Monthly planning session scheduled (1 hour, last Sunday of month)
- [ ] Weekly writing session scheduled (2 hours, Sunday)
- [ ] Content queue maintains 1-week buffer of ready posts
- [ ] Batch workflow documented for consistency

### Definition of Done
- [ ] Modifiche implementate
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 8: Join LinkedIn PM Groups

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 30 minutes |
| **Impact** | Access to thousands of target personas for community building and content distribution |
| **Category** | social |

### Description
Join 3-5 LinkedIn groups focused on Product Management, Agile, and PM careers. Become a recognized helpful voice by commenting thoughtfully on group discussions 2x/week (20 min/week investment). Target groups: Product Management Italia, PM & UX, Agile Coach Network.

### Files to Modify
- LinkedIn (external) - Join groups and begin participation

### Acceptance Criteria
- [ ] 3-5 relevant LinkedIn PM groups joined
- [ ] First meaningful comment posted in each group
- [ ] Weekly participation schedule established (2x/week, 20 min)
- [ ] Groups include at least one Italian-language PM community

### Definition of Done
- [ ] Modifiche implementate
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 9: Establish Daily Engagement Routine

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 15 minutes/day (ongoing) |
| **Impact** | Builds community relationships through consistent value-first commenting and rapid reply times |
| **Category** | social |

### Description
Implement a daily 25-minute engagement routine: 15 min value-first commenting on target persona posts + 10 min replying to comments on own posts. The TRIBE model Recruit phase depends on consistent outbound engagement, not just publishing content.

### Files to Modify
- Reference: `output/COMMUNITY_ENGAGEMENT_PLAYBOOK.md` for daily routine details

### Acceptance Criteria
- [ ] Daily engagement routine documented and scheduled
- [ ] Value-first commenting targets identified (5-10 target accounts)
- [ ] Reply time target set (< 2 hours for own post comments)
- [ ] Weekly engagement metrics tracked (comments given, replies made)

### Definition of Done
- [ ] Modifiche implementate
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 10: Create Comment Reply Templates

| Field | Value |
|-------|-------|
| **Priority** | Quick Win |
| **Effort** | 30 minutes |
| **Impact** | Speeds up engagement routine and ensures consistent, high-quality responses using C.A.R.E. framework |
| **Category** | content |

### Description
Create reply templates following the C.A.R.E. framework (Compliment, Add value, Relate, Encourage) for common comment types: exceptional comments, questions, agreements, disagreements, and generic responses. Templates should be personalized starting points, not copy-paste responses.

### Files to Modify
- Reference: `output/COMMUNITY_ENGAGEMENT_PLAYBOOK.md` for C.A.R.E. framework details

### Acceptance Criteria
- [ ] Templates created for 5 comment types (exceptional, questions, agreements, disagreements, generic)
- [ ] Each template follows C.A.R.E. framework structure
- [ ] Templates stored in accessible format for daily use
- [ ] Templates include personalization placeholders

### Definition of Done
- [ ] Modifiche implementate
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 11: Add Social Sharing Buttons to Website

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 4 hours |
| **Impact** | Enables organic content distribution from website blog posts to social channels |
| **Category** | ux |

### Description
The website currently has no social sharing buttons on any page. Blog posts and key pages need sharing buttons (LinkedIn, Twitter/X, copy-link) to enable readers to distribute content organically. This is a critical gap in the Site-to-Social integration flow.

### Files to Modify
- Blog post template/component - Add sharing buttons (LinkedIn, Twitter/X, copy-link)
- Component library - Create reusable `SocialShareButtons` component
- Styles - Add Tailwind/Neobrutalist styling consistent with design system

### Acceptance Criteria
- [ ] Social sharing component created with LinkedIn, Twitter/X, and copy-link buttons
- [ ] Sharing buttons appear on all blog post pages
- [ ] Share links pre-populate with correct post title and URL
- [ ] Buttons styled consistently with Neobrutalist design system
- [ ] No layout shift when buttons render

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (if applicable)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 12: Establish Content Repurposing Workflow

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 2 hours setup + ongoing |
| **Impact** | 3 months of content already exists on website; each source generates 3-5 social posts |
| **Category** | content |

### Description
The website has rich content (Journey timeline, Service descriptions, Q&A responses) that is not being leveraged for social media. Create a systematic workflow to repurpose website content into LinkedIn posts. Each website page/section should yield 3-5 social media posts minimum.

### Files to Modify
- Content planning system - Document repurposing workflow
- Reference: `output/findings/CONTENT_MIX_STRATEGY.md` for content pillar mapping

### Acceptance Criteria
- [ ] Inventory of repurposable website content created
- [ ] Repurposing workflow documented (website content -> social post format)
- [ ] At least 10 social post ideas generated from existing website content
- [ ] Weekly repurposing time block scheduled (30 min/week)

### Definition of Done
- [ ] Modifiche implementate
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 13: Launch TRIBE Community Tactics

| Field | Value |
|-------|-------|
| **Priority** | Transformational |
| **Effort** | Ongoing (15 min/day) |
| **Impact** | Transforms from broadcaster to community builder; 50% reduction in content creation burden long-term |
| **Category** | social |

### Description
Execute the full TRIBE (Target, Recruit, Invest, Bond, Empower) community model over 90 days. Phase 1 (Days 1-30): Target + Recruit. Phase 2 (Days 31-60): Invest + Bond. Phase 3 (Days 61-90): Empower. This systematic approach builds genuine community relationships vs. follower accumulation.

### Files to Modify
- Reference: `output/COMMUNITY_ENGAGEMENT_PLAYBOOK.md` for full 90-day roadmap
- Reference: `output/findings/TRIBE_COMMUNITY_STRATEGY.md` for 30 specific tactics

### Acceptance Criteria
- [ ] Target personas identified and documented (3 community personas)
- [ ] Recruit tactics active (value-first commenting, group participation, strategic connections)
- [ ] Weekly community engagement metrics tracked
- [ ] Month 1 targets met: 5-10 return commenters, 3.0 comment quality average

### Definition of Done
- [ ] Modifiche implementate
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 14: Set Up KPI Tracking Dashboard

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 1 hour |
| **Impact** | Enables data-driven optimization of social strategy using REACH metrics |
| **Category** | performance |

### Description
Create a simple KPI tracking dashboard (spreadsheet or tool) to monitor REACH metrics monthly: Reach (impressions), Engagement (comments), Amplification (shares), Conversion (website clicks), Holding (return commenters). Include anti-vanity metrics guardrails.

### Files to Modify
- Spreadsheet or analytics tool - Create KPI dashboard
- Reference: `output/findings/REACH_KPI_FRAMEWORK.md` for metric definitions and targets

### Acceptance Criteria
- [ ] Dashboard tracks all 5 REACH metrics monthly
- [ ] Month 1/3/6 targets visible for comparison
- [ ] Anti-vanity metrics excluded (follower count, total impressions, likes)
- [ ] Comment quality scoring rubric (1-5) implemented
- [ ] Dashboard updated at least monthly

### Definition of Done
- [ ] Modifiche implementate
- [ ] Documentazione aggiornata (if necessary)

---

## Intervention 15: Begin Twitter/X Cross-Posting (Conditional)

| Field | Value |
|-------|-------|
| **Priority** | Strategic |
| **Effort** | 2 hours/week |
| **Impact** | Expands reach to global PM community on secondary platform |
| **Category** | social |

### Description
After LinkedIn foundation is established (Month 1+), begin cross-posting repurposed content to Twitter/X. This is conditional on: (1) Twitter handle inconsistency resolved, (2) LinkedIn posting cadence stable, (3) Available bandwidth confirmed. Twitter/X should receive 20% of total effort, using repurposed content only (no original Twitter content).

### Files to Modify
- Twitter/X profile (external) - Set up profile, verify handle
- Reference: `output/findings/PLATFORM_SCORECARD_RESULTS.md` for Twitter/X scoring rationale

### Acceptance Criteria
- [ ] Twitter/X handle inconsistency resolved (one canonical handle chosen)
- [ ] Profile optimized with bio, link to selfrules.org, profile image
- [ ] 1-2 repurposed posts/week scheduled
- [ ] 50/50 Italian/English content split applied on Twitter/X
- [ ] Only initiated after LinkedIn Month 1 targets met

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (if applicable)
- [ ] Documentazione aggiornata (if necessary)
