# Backlink Profile Assessment - selfrules.org

**Audit Date:** 2026-01-27
**Subtask ID:** subtask-7-1 (Link Profile Assessment - Phase 7)
**Auditor:** Claude (SEO Consultant Skill)

---

## Executive Summary

selfrules.org has a **near-zero backlink profile**. Comprehensive public search analysis found no editorial backlinks, no industry citations, and no content-driven inbound links. The only external references are self-controlled profiles (GitHub, LinkedIn) and automated business directory listings (Europages, The Org, RocketReach). Anchor text diversity is non-existent because there are no earned backlinks to analyze. This represents the single biggest SEO limitation for the domain and must be addressed through a systematic link building campaign.

**Backlink Profile Score: 8/100**

---

## Methodology

This assessment was conducted using publicly available search methods, as enterprise tools (Ahrefs, SEMrush, Moz) were not available per audit constraints.

| Method | Search Query | Purpose |
|--------|-------------|---------|
| Exact domain search | `"selfrules.org" -site:selfrules.org` | Find pages linking to or mentioning the domain |
| Brand + person search | `"mattia filippo de luca" product manager selfrules` | Find brand mentions across web |
| Person name search | `"mattia filippo de luca" guest post OR article OR interview` | Find external content/appearances |
| Platform check | `"selfrules" "mattia" site:medium.com OR site:dev.to OR site:producthunt.com` | Check content platform presence |
| Directory search | `"mattia filippo de luca" selfrules zoominfo rocketreach theorg crunchbase` | Identify directory listings |
| GitHub analysis | WebFetch github.com/Selfrules | Analyze code profile for links/stars |
| Cross-reference | Authoritativeness assessment (subtask-3-3) | Build on prior findings |

---

## Known Backlinks & Referring Domains

### Confirmed External References

| # | Referring Domain | URL | Link Type | Authority | Anchor Text | Follow Status |
|---|-----------------|-----|-----------|-----------|-------------|---------------|
| 1 | github.com | github.com/Selfrules | Profile link (self-controlled) | High DA (~95) | "info@selfrules.org" (email) | NoFollow |
| 2 | it.linkedin.com | it.linkedin.com/in/selfrules | Profile link (self-controlled) | High DA (~98) | Profile name "selfrules" | NoFollow |
| 3 | europages.co.uk | europages.co.uk/.../SELFRULES-DI-DE-LUCA-MATTIA-FILIPPO | Business directory listing | Medium DA (~60) | "SELFRULES DI DE LUCA MATTIA FILIPPO" | Likely DoFollow |
| 4 | theorg.com | theorg.com/org/qubicaamf/.../mattia-filippo-de-luca | Org chart directory | Medium DA (~55) | "Mattia Filippo de Luca" | Likely NoFollow |
| 5 | rocketreach.co | rocketreach.co/the-selfrule-organization-management | Scraped business listing | Medium DA (~65) | "The Selfrule Organization" | Likely NoFollow |

### Summary Statistics

| Metric | Value | Assessment |
|--------|-------|------------|
| **Total referring domains** | ~5 | Critical: <10 domains |
| **Editorial backlinks** | 0 | Critical: zero |
| **DoFollow links** | ~1 (Europages only) | Critical: near-zero |
| **NoFollow links** | ~4 | Low SEO value |
| **Industry-relevant links** | 0 | Critical: zero PM/tech links |
| **Content-driven links** | 0 | No content to attract links |
| **Government/Edu links** | 0 | N/A for personal brand |

---

## Referring Domain Quality Assessment

### Domain Classification

| Category | Count | Domains | SEO Value |
|----------|-------|---------|-----------|
| **Self-controlled profiles** | 2 | GitHub, LinkedIn | Minimal (NoFollow, expected) |
| **Business directories** | 2 | Europages, The Org | Low (automated listings) |
| **Data scrapers** | 1 | RocketReach | None (scraped data, NoFollow) |
| **Industry publications** | 0 | - | N/A |
| **PM/Tech blogs** | 0 | - | N/A |
| **News/Media** | 0 | - | N/A |
| **Educational** | 0 | - | N/A |

### Quality Distribution

```
High Authority (DA 80+):     2 domains (GitHub, LinkedIn) - BUT all NoFollow
Medium Authority (DA 50-79): 3 domains (Europages, TheOrg, RocketReach) - Low relevance
Low Authority (DA <50):      0 domains
Industry-Relevant:           0 domains - CRITICAL GAP
```

### Quality Score Breakdown

| Quality Factor | Score | Max | Notes |
|----------------|-------|-----|-------|
| Domain diversity | 1/5 | 5 | Only 5 unique domains, all directory/profile type |
| Topical relevance | 0/5 | 5 | Zero PM, tech, or consulting links |
| Authority distribution | 1/5 | 5 | High DA domains are all NoFollow |
| Geographic relevance | 1/5 | 5 | Europages (EU) is only geographically relevant link |
| Freshness | 1/5 | 5 | Directory listings are static, no recent editorial links |
| **Total Quality Score** | **4/25 (16%)** | | **Critical: well below minimum threshold** |

---

## Anchor Text Analysis

Since there are effectively no editorial backlinks, anchor text diversity analysis is limited:

| Anchor Type | Count | % | Examples |
|-------------|-------|---|---------|
| Brand Name (company) | 1 | 20% | "SELFRULES DI DE LUCA MATTIA FILIPPO" |
| Personal Name | 2 | 40% | "Mattia Filippo de Luca", "Mattia Filippo De Luca" |
| Email / URL | 1 | 20% | "info@selfrules.org" |
| Brand (short) | 1 | 20% | "selfrules" (LinkedIn handle) |
| Keyword-rich | 0 | 0% | — |
| Generic ("click here") | 0 | 0% | — |
| Naked URL | 0 | 0% | — |

### Anchor Text Health Assessment

**Current State:** N/A (too few links to assess diversity meaningfully)

**Target Anchor Text Distribution (healthy profile):**

| Anchor Category | Target % | Current % | Gap |
|-----------------|----------|-----------|-----|
| Brand/name anchors | 40-60% | 80% | Overweight (expected for profiles) |
| Keyword-rich | 15-25% | 0% | Missing ("product manager consultant", "PM translator") |
| Natural/descriptive | 15-25% | 0% | Missing ("read more here", "this PM consultant") |
| Naked URL | 5-10% | 0% | Missing ("selfrules.org") |
| Generic | 5-10% | 0% | Missing ("click here", "learn more") |

> **Note:** The absence of keyword-rich anchors from editorial sources means Google has no anchor text signals tying selfrules.org to PM-related search queries.

---

## Content Platform Presence (Zero Found)

External content platforms were checked for published content that could generate backlinks:

| Platform | Status | Search Method |
|----------|--------|---------------|
| Medium | Not found | WebSearch for "selfrules" + "mattia" |
| Dev.to | Not found | WebSearch for "selfrules" + "mattia" |
| Product Hunt | Not found | WebSearch for "selfrules" + "mattia" |
| Hashnode | Not found | WebSearch for "selfrules" + "mattia" |
| Substack | Not found | WebSearch brand search |
| Product Coalition | Not found | WebSearch guest post search |
| Mind the Product | Not found | WebSearch guest post search |
| Product School Blog | Not found | WebSearch article search |
| HackerNoon | Not found | WebSearch brand search |
| LinkedIn Articles | Unknown | Not publicly searchable |
| Reddit r/productmanagement | Not found | WebSearch brand search |

> **Implication:** Zero external publishing means zero content-driven backlinks. This is both the root cause and the primary solution — publishing on external platforms generates backlinks as a byproduct.

---

## GitHub Profile Analysis (Link Equity Potential)

GitHub (github.com/Selfrules) is the highest-authority referring domain but provides minimal link equity:

| Metric | Value | Industry Benchmark | Gap |
|--------|-------|-------------------|-----|
| Public repos | 6 | 15-30 for PM/Dev | Below average |
| Followers | 1 | 50-100 for visibility | Critical |
| Stars (total) | 1 | 10+ for credibility | Critical |
| Forks received | 0 | 5+ for community interest | Zero |
| Profile links to selfrules.org | Email domain only | Direct website link | Indirect |

### Repository Inventory

| Repository | Language | Stars | Potential Link Value |
|------------|----------|-------|---------------------|
| Selfrules | TypeScript | 1 | High (personal website — could attract dev backlinks if well-documented) |
| artoo-campus | HTML | 0 | None (fork) |
| git-workshop | — | 0 | None (fork) |
| splinterlands-blog | Astro | 0 | None |
| Selfrules-blog | Astro | 0 | None |
| NoSkills | JavaScript | 0 | None |

> **Opportunity:** The TypeScript "Selfrules" repository could be turned into a linkable asset by adding comprehensive documentation, README, and open-sourcing the neobrutalist design system components.

---

## Domain Authority Estimation

Without enterprise tool access, domain authority is estimated from observable signals:

| Metric | Estimated Value | Basis |
|--------|----------------|-------|
| Moz DA | 5-15/100 | Zero editorial backlinks, ~5 referring domains |
| Ahrefs DR | 0-5/100 | No DoFollow editorial links discovered |
| SEMrush AS | 5-10/100 | Minimal backlink profile, low referring domains |

### DA Context

| Site Type | Typical DA | Notes |
|-----------|-----------|-------|
| Brand new site | 1-5 | No links at all |
| **selfrules.org (est.)** | **5-15** | **← Current position** |
| New personal blog (6 months active) | 10-20 | A few guest posts |
| Established consultant site | 25-40 | Regular content + backlinks |
| Industry thought leader | 40-60 | Sustained publishing + community |
| Major PM publication | 60-80+ | Years of content + industry links |

> **To rank for competitive PM keywords**, a DA of 25+ is typically needed. This requires 6-12 months of sustained link building.

---

## Competitive Backlink Gap

### Estimated Competitor Profiles

| Competitor | Est. Referring Domains | Est. DA | Primary Backlink Sources |
|------------|----------------------|---------|--------------------------|
| Mind the Product | 10,000+ | 75+ | Industry publications, conferences, newsletters |
| Product Heroes | 500+ | 40+ | Italian PM community, courses, events |
| The Fractional PM | 50-100 | 15-25 | Guest posts, directories, podcast show notes |
| Gaetano Cuomo | 20-50 | 10-20 | Italian PM blogs, LinkedIn articles |
| **selfrules.org** | **~5** | **5-10** | **Only profiles + directories** |

### Gap by Source Type

| Source Type | Competitors Have | selfrules.org Has | Gap Severity |
|-------------|-----------------|-------------------|-------------|
| PM publications | ✅ Yes | ❌ No | Critical |
| Guest posts on Medium/Substack | ✅ Yes | ❌ No | Critical |
| Podcast show notes | ✅ Yes | ❌ No | High |
| Conference/event pages | ✅ Yes | ❌ No | High |
| Resource pages / blogrolls | ✅ Some | ❌ No | Medium |
| Tool vendor case studies | ✅ Some | ❌ No | Medium |
| Social profiles | ✅ Yes | ✅ Yes | Parity |
| Business directories | ✅ Yes | ✅ Yes | Parity |

---

## Link Toxicity Assessment

| Risk Factor | Status | Notes |
|-------------|--------|-------|
| Spammy backlinks | ✅ Clean | No toxic links detected |
| PBN (Private Blog Network) links | ✅ Clean | No PBN patterns |
| Paid link patterns | ✅ Clean | No paid link signals |
| Over-optimized anchors | ✅ Clean | No keyword stuffing |
| Negative SEO attack | ✅ Clean | No suspicious patterns |

**Toxicity Score: 0/100 (Clean)**

> **Silver Lining:** While the profile is nearly empty, it is completely clean. No toxic links to disavow, no penalties to recover from. This is a blank canvas for building correctly.

---

## Brand Confusion Risk

During research, references to **"The Selfrule Organization"** (theselfrule.org) were found, a separate Web3/blockchain entity:

| Property | selfrules.org | theselfrule.org |
|----------|--------------|-----------------|
| Focus | PM / Personal Brand | Blockchain / Token-based Tech |
| LinkedIn | /in/selfrules | /company/the-selfrule-organization |
| Mirror.xyz | — | mirror.xyz/theselfruleorg.eth |
| RocketReach | Lists as "The Selfrule Organization" | Same listing |

**Risk:** RocketReach lists Mattia's company as "The Selfrule Organization" which may create confusion. Google search results for "selfrules" mix both entities.

**Mitigation:** Always pair "Selfrules" with "Mattia De Luca" or "Product Manager" in anchor text to disambiguate.

---

## Backlink Profile Score Calculation

| Component | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Referring domain quantity | 25% | 1/10 | 0.25 |
| Referring domain quality | 25% | 1/10 | 0.25 |
| Anchor text diversity | 15% | 1/10 | 0.15 |
| Topical relevance of links | 20% | 0/10 | 0.00 |
| Link velocity/growth | 15% | 1/10 | 0.15 |
| **Total** | **100%** | | **0.80/10 → 8/100** |

---

## Key Findings Summary

### Critical Issues

| # | Issue | Impact | Priority |
|---|-------|--------|----------|
| 1 | Zero editorial/earned backlinks | Cannot rank for competitive keywords | P0 |
| 2 | No DoFollow backlinks from external sites | No PageRank transfer to selfrules.org | P0 |
| 3 | Only ~5 referring domains (all NoFollow/directory) | Domain authority stuck at 5-10 | P0 |
| 4 | Zero link velocity (no new links being acquired) | No growth momentum | P1 |
| 5 | No external content creating linkable assets | Nothing for others to link to | P1 |

### Positive Signals

| # | Signal | Value |
|---|--------|-------|
| 1 | Clean backlink profile (zero toxicity) | Good foundation, no cleanup needed |
| 2 | High-DA profiles exist (GitHub DA~95, LinkedIn DA~98) | Social signals present even if NoFollow |
| 3 | GitHub activity (Pull Shark, Pair Extraordinaire badges) | Technical credibility signal |
| 4 | Established domain (5+ years) | Domain age factor is positive |
| 5 | "Product manager translator" is a blue ocean keyword | Low DA needed to rank for unique terms |

---

## Link Acquisition Opportunities

### Tier 1: Quick Wins (Weeks 1-2)

| Opportunity | Effort | Expected Links | DoFollow? |
|-------------|--------|----------------|-----------|
| Add selfrules.org link to GitHub profile prominently | 15 min | Improve existing | NoFollow |
| Add LinkedIn link to website footer | 15 min | Reciprocal signal | NoFollow |
| Verify The Org profile | 30 min | Improve existing | NoFollow |
| Submit to Italian PM directories | 2 hours | 2-3 | Mix |

### Tier 2: Content-Driven (Months 1-3)

| Opportunity | Effort | Expected Links | DoFollow? |
|-------------|--------|----------------|-----------|
| Guest post on Medium PM publication | 8-12 hours | 1-2 | DoFollow |
| Guest post on Product Coalition | 8-12 hours | 1-2 | DoFollow |
| HARO/Connectively expert responses | 2-3 hours/week | 1-3 | DoFollow |
| Podcast interview (show notes backlink) | 2-3 hours | 1-2 | DoFollow |
| Publish original blog content on selfrules.org | Ongoing | Linkable assets | N/A |

### Tier 3: Strategic (Months 3-6)

| Opportunity | Effort | Expected Links | DoFollow? |
|-------------|--------|----------------|-----------|
| Open-source neobrutalist design system | 20-40 hours | 5-20 | DoFollow |
| Original research ("State of PM in Italy 2026") | 20-30 hours | 3-10 | DoFollow |
| Tool case study submission (Figma, Miro, Notion) | 5-10 hours | 1 | DoFollow |
| PM meetup/conference speaking | 10-15 hours | 1-3 | DoFollow |
| Resource page outreach to PM curated lists | 4-8 hours | 1-2 | DoFollow |

### Expected Growth Trajectory

| Timeframe | Est. Referring Domains | Est. DA | Key Milestone |
|-----------|----------------------|---------|---------------|
| Current | ~5 | 5-10 | Baseline |
| Month 3 | 10-15 | 10-15 | First editorial backlinks |
| Month 6 | 20-30 | 15-20 | Guest post + podcast links |
| Month 12 | 40-60 | 20-30 | Sustained link acquisition |

---

## Verification Checklist

- [x] Known backlinks documented (5 referring domains found)
- [x] Referring domain quality assessed (all NoFollow/directory, 4/25 quality score)
- [x] Anchor text diversity analyzed (100% brand/name, 0% keyword-rich)
- [x] Domain authority estimated (DA 5-15)
- [x] Competitive backlink gap documented (4-20x behind nearest competitors)
- [x] Link toxicity assessed (clean, 0/100)
- [x] Unlinked mention opportunities checked (0 actionable)
- [x] Content platform presence verified (zero on 11 platforms)
- [x] Brand confusion risk identified (The Selfrule Organization)
- [x] Link acquisition opportunities prioritized by effort/impact
- [x] Solo founder constraints respected throughout

---

**Next Subtask:** subtask-7-2 (Evaluate internal link equity: Assess how link value flows through the site architecture)
