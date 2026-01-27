# Specification: Social Media Strategy Audit for selfrules.org

## Overview

This task involves conducting a comprehensive social media strategy analysis for selfrules.org, the personal brand website of Mattia Filippo De Luca, a Product Manager with 13 years of experience offering B2B professional services (consulting, brainstorming, PM mentorship). The audit will evaluate current social presence, identify the optimal primary platform, develop a 30-day content plan, and create a community-focused engagement strategy that prioritizes meaningful relationships over vanity metrics.

## Workflow Type

**Type**: feature

**Rationale**: This is a strategic deliverable task that requires comprehensive analysis, framework application, and creation of actionable artifacts (audit report, content calendar, engagement playbook). While not a code implementation, it follows the feature workflow pattern of research → analysis → deliverable creation → validation.

## Task Scope

### Services Involved
- **main** (primary) - Website analysis for social integration assessment
- **social-media-manager skill** (framework) - Strategic analysis methodologies

### This Task Will:
- [ ] Analyze all current social media channels with quantified scoring
- [ ] Evaluate bidirectional website-social integration
- [ ] Identify and recommend the #1 priority platform with data-driven rationale
- [ ] Create a 30-day cross-platform content calendar
- [ ] Develop a community building engagement strategy (not follower acquisition)
- [ ] Apply REACH metrics and TRIBE community frameworks
- [ ] Generate actionable recommendations prioritized by impact/effort

### Out of Scope:
- Actual social media post creation (use copywriter-hybrid agent for that)
- Social media account setup or configuration
- Automated posting integrations or API development
- Paid advertising strategy
- Influencer partnership recommendations

## Service Context

### Main Website (selfrules.org)

**Tech Stack:**
- Language: TypeScript
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS (Neobrutalist design system)
- Key directories: app, components, lib

**Entry Point:** `app/[locale]/page.tsx`

**How to Run:**
```bash
npm run dev
```

**Port:** 3000

**Relevant Sections for Social Integration:**
- Homepage hero and CTAs
- Blog section
- Contact/Booking section
- Footer social links

### Social Media Manager Skill

**Location:** `.claude/skills/social-media-manager/SKILL.md`

**Key Frameworks Available:**
- Platform Selection Scorecard (1-10 rating system)
- REACH Metrics Model (Reach, Engagement, Amplification, Conversion, Holding)
- TRIBE Community Model (Target, Recruit, Invest, Bond, Empower)
- 4-1-1 Content Mix Rule (60% value, 25% engagement, 15% promotional)
- Platform-specific strategy deep dives

## Files to Modify

| File | Service | What to Change |
|------|---------|---------------|
| N/A - Strategic deliverable | N/A | Create audit report document |

**Output Deliverables:**
| Deliverable | Format | Description |
|-------------|--------|-------------|
| Social Audit Report | Markdown | Comprehensive analysis with scores |
| Platform Recommendation | Analysis | #1 platform with rationale |
| 30-Day Content Calendar | Table/Schedule | Cross-platform content plan |
| Engagement Playbook | Framework | Community building strategy |

## Files to Reference

These files provide context and frameworks:

| File | Pattern to Copy |
|------|----------------|
| `.claude/skills/social-media-manager/SKILL.md` | Platform Selection Scorecard, REACH metrics, TRIBE model |
| `.claude/skills/marketing-manager/SKILL.md` | AARRR Pirate Metrics, growth loops |
| `.claude/skills/web-analyst/SKILL.md` | HEART framework for site integration |
| `app/[locale]/page.tsx` | Website structure for integration analysis |
| `CLAUDE.md` | Brand voice and content guidelines |

## Patterns to Follow

### Platform Selection Scorecard

From `.claude/skills/social-media-manager/SKILL.md`:

| Factor | Question | Weight |
|--------|----------|--------|
| **Audience Presence** | Are ideal customers actively using this platform? | 2x |
| **Content Fit** | Does natural content style work here? | 1x |
| **Competitive Gap** | Is there room to stand out vs. competitors? | 1x |
| **Resource Match** | Can you consistently create required content? | 1x |
| **Business Alignment** | Does platform support conversion goals? | 1x |

**Score Formula:** `(Audience × 2 + Content + Gap + Resources + Alignment) / 7`

**Threshold:** Prioritize platforms scoring 7+. Focus on 2-3 maximum.

### REACH Metrics Model

| Metric | Definition | Business Value |
|--------|------------|----------------|
| **R**each | Unique accounts who saw content | Awareness, top-of-funnel |
| **E**ngagement | Interactions / reach | Content resonance |
| **A**mplification | Shares, retweets, reposts | Organic distribution |
| **C**onversion | Clicks, profile visits, follows | Action-taking |
| **H**olding | Watch time, dwell time | Content quality |

### TRIBE Community Model

| Phase | Goal | Tactics |
|-------|------|---------|
| **T**arget | Define ideal community member | Persona development |
| **R**ecruit | Attract right people | Valuable content, strategic engagement |
| **I**nvest | Deliver consistent value | Exclusive content, recognition |
| **B**ond | Create member connections | Discussions, collaborations |
| **E**mpower | Turn members into advocates | UGC, ambassadors |

### Content Mix (4-1-1 Rule Adapted)

| Content Type | Percentage | Purpose |
|--------------|------------|---------|
| Value Posts | 60% | Educate, inspire, demonstrate expertise |
| Engagement Posts | 25% | Questions, polls, discussions |
| Promotional Posts | 15% | CTAs, offers, conversions |

## Requirements

### Functional Requirements

1. **Social Presence Audit**
   - Description: Comprehensive assessment of all existing social channels with quantified scoring
   - Acceptance: Each platform rated using Platform Selection Scorecard (1-10 scale with weighted formula)

2. **Website-Social Integration Analysis**
   - Description: Evaluate bidirectional flow between website and social channels
   - Acceptance: Document Site→Social and Social→Site integration points with effectiveness scores

3. **Primary Platform Recommendation**
   - Description: Identify the #1 platform to prioritize based on target audience fit
   - Acceptance: Clear recommendation with data-driven rationale using scorecard methodology

4. **30-Day Content Calendar**
   - Description: Cross-platform content plan with specific topics, formats, and timing
   - Acceptance: Daily/weekly schedule covering all recommended platforms with content types

5. **Community Engagement Strategy**
   - Description: Framework for building engaged community (not just follower acquisition)
   - Acceptance: TRIBE model application with specific tactics for each phase

### Edge Cases

1. **Limited Social Presence** - If few/no active social accounts exist, focus on greenfield strategy and platform launch recommendations
2. **Bilingual Audience** - Address Italian/English content split strategy for international reach
3. **B2B vs B2C Balance** - Professional services audience requires LinkedIn-first approach but may benefit from broader reach
4. **Time/Resource Constraints** - Solo practitioner means realistic, sustainable content cadence recommendations

## Implementation Notes

### DO
- Apply Platform Selection Scorecard with actual scores for each platform
- Use REACH metrics framework to define KPIs
- Focus on community building (TRIBE model) over follower counts
- Consider the B2B professional services context (consulting, PM mentorship)
- Account for bilingual (IT/EN) content needs
- Recommend sustainable posting cadences for a solo practitioner
- Include specific LinkedIn strategy (primary platform for B2B)

### DON'T
- Recommend vanity metrics (follower count) as primary success measures
- Suggest unsustainable posting frequencies
- Ignore the professional/B2B nature of the target audience
- Recommend platforms without clear audience-fit rationale
- Create generic strategies without platform-specific tactics

## Development Environment

### Access Website for Analysis

```bash
npm run dev
```

### Service URLs
- Website: http://localhost:3000

### External References
- LinkedIn Profile: https://it.linkedin.com/in/selfrules
- Website: https://selfrules.org (production)

## Success Criteria

The task is complete when:

1. [ ] Social presence audit completed with quantified scores for each platform
2. [ ] Platform Selection Scorecard applied with weighted calculations
3. [ ] Website-social integration analyzed (bidirectional flow)
4. [ ] Primary platform (#1) clearly identified with data-driven rationale
5. [ ] 30-day content calendar created with specific topics and timing
6. [ ] Community engagement strategy documented using TRIBE framework
7. [ ] Recommendations prioritized by impact/effort matrix
8. [ ] All analysis frameworks properly applied (REACH, TRIBE, 4-1-1)

## QA Acceptance Criteria

**CRITICAL**: These criteria must be verified by the QA Agent before sign-off.

### Deliverable Completeness

| Deliverable | Required Sections | What to Verify |
|-------------|-------------------|----------------|
| Social Audit Report | Executive Summary, Platform Assessment, Engagement Analysis | All platforms scored, benchmarks compared |
| Platform Recommendation | Score breakdown, Rationale, Priority ranking | Clear #1 with data support |
| Content Calendar | 30 days, Multiple platforms, Content types | Realistic cadence, variety in content |
| Engagement Playbook | TRIBE phases, Specific tactics | Actionable, community-focused |

### Framework Application Verification

| Framework | Application | Expected |
|-----------|-------------|----------|
| Platform Selection Scorecard | Each platform rated | Score = (Audience×2 + Content + Gap + Resources + Alignment) / 7 |
| REACH Metrics | KPIs defined | All 5 metrics addressed per platform |
| TRIBE Model | Community strategy | All 5 phases with specific tactics |
| 4-1-1 Content Mix | Calendar balance | 60% value, 25% engagement, 15% promotional |

### Content Calendar Validation

| Check | Criteria | Expected |
|-------|----------|----------|
| Coverage | Days covered | Full 30 days |
| Platform balance | Posts per platform | Aligned with priority recommendation |
| Content variety | Types of posts | Mix of value, engagement, promotional |
| Realistic cadence | Posts per week | Sustainable for solo practitioner |
| Bilingual consideration | Language mix | IT/EN strategy addressed |

### Quality Checks

| Check | Question | Pass Criteria |
|-------|----------|---------------|
| Specificity | Are recommendations specific to selfrules.org? | No generic advice |
| Data-driven | Are scores and rationale quantified? | Numbers, not just opinions |
| Actionability | Can recommendations be implemented immediately? | Clear next steps |
| Community focus | Is strategy about community vs followers? | TRIBE model applied |
| Sustainability | Is cadence realistic for solo practitioner? | Not overwhelming |

### QA Sign-off Requirements
- [ ] All four deliverables present and complete
- [ ] Platform Selection Scorecard correctly calculated
- [ ] REACH metrics defined for priority platforms
- [ ] TRIBE model fully applied with specific tactics
- [ ] 30-day calendar covers all days with realistic cadence
- [ ] Content mix aligns with 4-1-1 rule
- [ ] Recommendations prioritized by impact/effort
- [ ] Strategy focuses on community building, not follower acquisition
- [ ] B2B professional context properly addressed
- [ ] Bilingual content strategy considered

## Known Context

### Target Profile
- **Name**: Mattia Filippo De Luca
- **Role**: Product Manager (13 years experience)
- **Certifications**: CSPO, CSM (Scrum Alliance)
- **Current Employer**: QubicaAMF (Bologna, Italy)
- **Services**: B2B professional consulting, brainstorming, PM mentorship
- **Geographic Scope**: Italy-based, globally available (remote)
- **Languages**: Italian, English (bilingual website)

### Current Social Presence
| Platform | Status | URL |
|----------|--------|-----|
| LinkedIn | **Verified Active** | https://it.linkedin.com/in/selfrules |
| Twitter/X | Unverified/Uncertain | @mattiadluca (mentioned in metadata) |
| Instagram | No presence found | N/A |
| TikTok | No presence found | N/A |
| YouTube | No presence found | N/A |

### Expected Primary Recommendation
Based on B2B professional services model, LinkedIn should score highest on Platform Selection Scorecard due to:
- Perfect audience-fit (professionals, decision-makers)
- Content-fit for thought leadership
- Business alignment with consulting/mentorship services
