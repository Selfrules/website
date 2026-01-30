# SEO Audit: selfrules.org

**Audit Date:** 2026-01-27
**Auditor:** Claude (SEO Consultant Skill)
**Scope:** Full-site comprehensive SEO audit
**Target Audience:** Solo founder (Mattia Filippo De Luca)
**Production URL:** https://selfrules.org

---

## Executive Summary

selfrules.org scores **42/100** on overall SEO health. The site has exceptional content storytelling (Hero 90/100, Journey 93/100, Work Together 95/100) and a genuine blue ocean positioning as the "Product Manager Translator," but is critically undermined by missing technical foundations, a near-zero backlink profile, and single-page architecture that prevents Google from indexing more than 1 page. The highest-impact fixes (robots.txt, sitemap, schema markup) are also the easiest to implement — a 4-hour sprint would lift the score to 56/100.

**Top 3 Priorities:**
1. **Create robots.txt + sitemap.xml** — currently both return 404, blocking all crawl efficiency
2. **Implement JSON-LD schema markup** — zero structured data means zero rich snippets
3. **Fix broken trust signals** — Privacy Policy and Terms of Service return 404 (GDPR violation risk)

---

## Technical Health

| Metric | Score | Status | Priority |
|--------|:-----:|:------:|:--------:|
| Crawlability | 60/100 | 🟠 | robots.txt + sitemap.xml missing |
| Indexability | 45/100 | 🔴 | Only 1 page indexed, canonical misconfigured |
| Core Web Vitals | 51/100 | 🟠 | Desktop-only testing, no mobile CWV |
| Mobile & Security | 67/100 | 🟠 | Security headers only on API routes |
| **Technical SEO Average** | **56/100** | **🟠** | |

### Technical SEO Detail

**Crawlability (60/100):**
- ❌ robots.txt returns 404 — no crawl directives for search engines
- ❌ sitemap.xml returns 404 — no page discovery mechanism
- ✅ Meta robots tag correctly set (index, follow)
- ✅ Canonical URLs present (but misconfigured for locales)
- ✅ Hreflang tags present for it-IT and en-US

**Indexability (45/100):**
- ❌ Only **1 page** indexed by Google (homepage only)
- ❌ Canonical URL misconfiguration: `/en` and `/it` point to root instead of self-referencing
- ❌ Blog/content pages return 404
- ⚠️ Missing x-default hreflang
- ⚠️ English title not localized (shows Italian)

**Core Web Vitals (51/100):**
- ✅ Desktop thresholds correctly configured (LCP ≤2.5s, CLS ≤0.1, TBT ≤300ms)
- ❌ **Mobile testing completely absent** — Google uses mobile CWV for ALL rankings
- ❌ No INP (Interaction to Next Paint) measurement — CWV since March 2024
- ⚠️ FCP threshold of 2000ms is slightly lenient

**Mobile & Security (67/100):**
- ✅ HTTPS active, mobile viewport correctly configured
- ✅ Mobile-first CSS architecture, responsive design
- ❌ HSTS header missing — security downgrade possible
- ❌ Security headers **only apply to `/api/:path*` routes** — main pages have ZERO security headers
- ⚠️ Some tap targets below 48px minimum (footer social icons 40px)

---

## E-E-A-T Assessment

| Component | Score | Key Gap |
|-----------|:-----:|---------|
| **Experience** | 4/5 | No original media (photos/videos), blog empty, testimonials unverifiable |
| **Expertise** | 4/5 | 6+ certifications but not linked to Credly, no GitHub/LinkedIn on site |
| **Authoritativeness** | 2/5 | **Zero editorial backlinks**, zero guest posts, zero podcasts, GitHub 1 follower |
| **Trustworthiness** | 2/5 | Privacy Policy 404, Terms 404, no contact email, security headers incomplete |
| **Overall E-E-A-T** | **3/5** | **Strong personal experience, critical external validation gaps** |

### E-E-A-T Strengths
- Personal journey narrative (designer → developer → PM) with specific failure stories and costs (€8K refund)
- 6+ certifications (Scrum Alliance, Product School, Reforge, Google)
- Exceptional content depth: translator metaphor is unique and authentic
- Topic focus consistency: 5/5

### E-E-A-T Critical Gaps
- **Authoritativeness (2/5):** Zero backlinks from industry publications, zero podcast appearances, zero guest posts, zero external content on any platform (Medium, Dev.to, Product Hunt, etc.)
- **Trustworthiness (2/5):** Privacy Policy and Terms of Service linked in footer return 404 — GDPR compliance violation for EU-based site collecting data via contact forms

---

## On-Page SEO Analysis

| Sub-Category | Score | Key Finding |
|-------------|:-----:|-------------|
| Homepage Content | 55/100 | Title 83-87 chars (limit: 60), description 211-219 chars (limit: 160) |
| Metadata Coherence | 80/100 | Improved from 4/10 to 8/10; translator metaphor integrated |
| Schema Markup | 0/100 | **Zero** JSON-LD structured data |
| Internal Linking | 35/100 | 6 broken links, orphan pages, 92% equity waste |
| **On-Page Average** | **39/100** | |

### Homepage Metadata (Current State)

**Italian Homepage:**
- Title: 87 chars ❌ (should be 50-60) — gets truncated in SERPs
- Description: 219 chars ❌ (should be 150-160) — key value prop hidden
- H1: Single H1 with strong storytelling ✅
- Keyword integration: 4/10 (implicit rather than explicit)

**Metadata Coherence (8/10):**
- Translator metaphor now central in metadata ✅ (was absent in Nov 2025)
- Romei-Toon-Sinek compliance: 94% (33/35 checks passing) ✅
- **Trade-off:** Rich storytelling exceeded character limits — brand differentiation prioritized over technical compliance

### Schema Markup (0/100 — CRITICAL)

Zero structured data exists on the site. Missing schemas:

| Schema Type | Impact | Effort | Priority |
|-------------|--------|--------|----------|
| Person | Rich snippets, Knowledge Panel | 2 hours | 🔴 High |
| WebSite | Site search in SERPs | 30 min | 🔴 High |
| Article | Blog post rich results | 1 hour | 🟠 Medium |
| BreadcrumbList | Navigation breadcrumbs | 30 min | 🟠 Medium |
| FAQ | "People Also Ask" snippets | 1 hour | 🟡 Low |
| Review | Star ratings in SERPs | 1 hour | 🟡 Low |

### Internal Linking (35/100)

| Metric | Value | Assessment |
|--------|-------|------------|
| Total internal links | ~12 | Too few |
| Broken links | 6 | Privacy (404), Terms (404), 4 dead `href="#"` resources |
| Orphan pages | 2 | /demo, /design-system (zero inbound links) |
| Link equity distribution | 100% homepage | No distribution possible |
| Equity waste rate | 92% | 11 of 12 internal links waste equity |

---

## Link Profile

| Metric | Value | Assessment |
|--------|-------|------------|
| Backlink Profile Score | 8/100 | 🔴 Critical |
| Internal Link Equity | 15/100 | 🔴 Critical |
| **Link Profile Average** | **12/100** | 🔴 |

### Backlink Profile (8/100)

| Metric | Value |
|--------|-------|
| Referring domains | ~5 (all NoFollow/directory) |
| Editorial backlinks | 0 |
| DoFollow links | ~1 (Europages only) |
| Domain Authority (est.) | 5-15/100 |
| Content platform presence | 0/11 platforms checked |
| Toxicity score | 0/100 (clean) |

**Known Referring Domains:**

| Domain | Authority | Type | Follow Status |
|--------|-----------|------|---------------|
| github.com | DA ~95 | Profile (self-controlled) | NoFollow |
| linkedin.com | DA ~98 | Profile (self-controlled) | NoFollow |
| europages.co.uk | DA ~60 | Business directory | Likely DoFollow |
| theorg.com | DA ~55 | Org chart directory | Likely NoFollow |
| rocketreach.co | DA ~65 | Scraped listing | NoFollow |

**Competitive Gap:** Nearest competitor (Gaetano Cuomo) has 20-50 referring domains; Product Heroes has 500+. selfrules.org needs 6-12 months of sustained link building to compete.

**Silver Lining:** Profile is completely clean (zero toxicity). Blank canvas for building correctly.

---

## Critical Issues

### 🔴 HIGH Priority (Fix within 2 weeks)

| # | Issue | Category | Impact | Effort | ROI |
|---|-------|----------|:------:|--------|:---:|
| 1 | Missing robots.txt | Technical | 9/10 | 30 min | ★★★★★ |
| 2 | Missing sitemap.xml | Technical | 9/10 | 1 hour | ★★★★★ |
| 3 | Zero schema markup (JSON-LD) | On-Page | 8/10 | 4 hours | ★★★★☆ |
| 4 | Privacy Policy 404 | E-E-A-T | 8/10 | 4 hours | ★★★★☆ |
| 5 | Terms of Service 404 | E-E-A-T | 8/10 | 4 hours | ★★★★☆ |
| 6 | Title tags too long (83-87 chars) | On-Page | 7/10 | 1 hour | ★★★★★ |
| 7 | Meta descriptions too long (211-219 chars) | On-Page | 7/10 | 1 hour | ★★★★★ |
| 8 | No LinkedIn link on site | E-E-A-T | 7/10 | 30 min | ★★★★★ |
| 9 | Canonical URL misconfiguration | Technical | 7/10 | 2 hours | ★★★★☆ |
| 10 | 6 broken internal links | On-Page | 7/10 | 3 hours | ★★★★☆ |

### 🟠 MEDIUM Priority (Fix within 1 month)

| # | Issue | Category | Impact | Effort |
|---|-------|----------|:------:|--------|
| 11 | No mobile CWV testing | Technical | 6/10 | 2 hours |
| 12 | Security headers on all routes | Technical | 6/10 | 2 hours |
| 13 | Missing HSTS header | Technical | 5/10 | 1 hour |
| 14 | Keyword integration weak (4/10) | On-Page | 6/10 | 4 hours |
| 15 | Testimonials unverifiable | E-E-A-T | 5/10 | 2 hours |
| 16 | No headshot/photo | E-E-A-T | 5/10 | 1 hour |
| 17 | Certifications not linked to Credly | E-E-A-T | 5/10 | 2 hours |
| 18 | No content platform presence | Link Profile | 6/10 | 4 hours |

### 🟡 LOW Priority (Fix within 3 months)

| # | Issue | Category | Impact | Effort |
|---|-------|----------|:------:|--------|
| 19 | Orphan pages (/demo, /design-system) | On-Page | 3/10 | 1 hour |
| 20 | Hreflang missing x-default | On-Page | 3/10 | 30 min |
| 21 | No INP measurement | Technical | 4/10 | 1 hour |
| 22 | Anchor text diversity | Link Profile | 3/10 | Ongoing |

---

## 10x Opportunities

### 1. "Product Manager Translator" — Blue Ocean Keyword
**Zero** PM competitors claim this positioning. The keyword has low volume (50-100/mo) but is the perfect brand keyword. selfrules.org's content already embodies the translator metaphor — metadata optimization alone could capture position #1 within 30 days.

### 2. Italian Fractional PM Market — Unserved
Zero Italian-language fractional PM service pages exist. With "consulente PM part-time freelance" and "consulente product management" both at very low difficulty, 2 Italian service pages could dominate this growing market.

### 3. Beat Competitors with 12 Articles
Gaetano Cuomo (closest Italian personal brand competitor) has **zero** blog content. The Fractional PM has **zero** blog content. Publishing just 12 targeted articles makes selfrules.org the content leader in this niche.

### 4. Schema Markup First-Mover
No competitor in the Italian PM personal brand space uses structured data. Implementing Person, WebSite, and Article schemas first = rich snippets advantage in SERPs.

### 5. Failure Narrative — Unique SEO Hook
Most PM portfolios lead with achievements. Mattia's "Ho fallito come designer. Poi come developer." narrative is scroll-stopping and generates higher CTR. This is a competitive moat no one can copy.

---

## Priority Actions

### Solo Founder Roadmap

| Timeframe | Actions | Hours | Expected Score |
|-----------|---------|:-----:|:--------------:|
| **Week 1** | robots.txt + sitemap.xml + LinkedIn link + title/meta length fixes | 4h | 42 → 50 |
| **Week 2** | Schema markup (Person, WebSite) + Privacy Policy + Terms of Service | 8h | 50 → 56 |
| **Week 3-4** | Broken links + canonical URLs + security headers + mobile CWV | 12h | 56 → 65 |
| **Month 2** | Blog infrastructure + first 4 articles targeting Tier 1 keywords | 20h | 65 → 70 |
| **Month 3** | Guest posts + content platform presence + remaining articles | 20h | 70 → 73 |

---

## Deliverable 1: SEO Health Score

**Overall Score: 42/100**

| Category | Score | Weight | Weighted | Status |
|----------|:-----:|:------:|:--------:|:------:|
| Technical SEO | 56/100 | 25% | 14.0 | 🟠 Needs Work |
| On-Page SEO | 39/100 | 25% | 9.75 | 🔴 Critical |
| E-E-A-T Signals | 60/100 | 25% | 15.0 | 🟠 Needs Work |
| Link Profile | 12/100 | 25% | 3.0 | 🔴 Critical |
| **TOTAL** | | **100%** | **41.75 → 42** | **🔴** |

**Score Improvement Projections:**

| Timeline | Projected Score | Change |
|----------|:--------------:|:------:|
| After HIGH fixes (2 weeks) | 56/100 | +14 |
| After HIGH + MEDIUM fixes (1 month) | 65/100 | +23 |
| After 3-month plan (all priorities) | 73/100 | +31 |

**Previous Audit Comparison (2025-11-22 → 2026-01-27):**

| Metric | Previous | Current | Trend |
|--------|----------|---------|:-----:|
| Metadata Coherence | 4/10 | 8/10 | ✅ +100% |
| Hero Content Quality | 90/100 | 90/100 | ➡️ Maintained |
| Schema Markup | Not assessed | 0/100 | 🔴 New finding |
| Backlink Profile | Not assessed | 8/100 | 🔴 New finding |

→ **Full details:** [seo-health-score.md](seo-health-score.md)

---

## Deliverable 2: 20-Keyword Strategy with Search Intent Mapping

### Strategy Summary
- **Total keywords:** 20 (12 English, 8 Italian)
- **70% Low/Very Low difficulty** — achievable for a new domain
- **50% Commercial+ intent** — balanced lead generation and authority
- **Blue ocean verified:** "product manager translator" has zero PM competitors

### Complete Keyword Table

| Rank | Keyword | Volume | Difficulty | Intent | Lang | Tier |
|:----:|---------|:------:|:----------:|:------:|:----:|:----:|
| 1 | product manager translator | 50-100 | Low (15-25) | Navigational | EN | 1 |
| 2 | fractional product manager consultant | 260-480 | Low (25-35) | Transactional | EN | 1 |
| 3 | PM che parla design e codice | 10-50 | Very Low (5-10) | Commercial | IT | 1 |
| 4 | when to hire first product manager startup | 170-320 | Low (20-30) | Commercial | EN | 1 |
| 5 | consulente PM part-time freelance | 40-90 | Low (15-25) | Transactional | IT | 1 |
| 6 | PM con background tecnico | 20-90 | Low (15-25) | Commercial | IT | 2 |
| 7 | product strategy pragmatico | 10-50 | Very Low (5-15) | Commercial | IT | 2 |
| 8 | cosa deve sapere product manager designer | 20-50 | Very Low (10-15) | Informational | IT | 2 |
| 9 | consulente product management | 110-260 | Low (20-30) | Transactional | IT | 2 |
| 10 | product manager freelance | 720-1,300 | Medium (45-55) | Commercial | EN | 2 |
| 11 | technical product manager | 2,900-5,400 | High (65-75) | Informational | EN | 3 |
| 12 | product manager vs project manager differenza | 1,300-2,400 | Medium (40-50) | Informational | Mix | 3 |
| 13 | come diventare product manager Italia | 390-720 | Medium (35-45) | Informational | IT | 3 |
| 14 | how to communicate with developers as PM | 210-390 | Low (25-35) | Informational | EN | 3 |
| 15 | product manager startup early stage | 320-590 | Medium (35-45) | Commercial | EN | 3 |
| 16 | why product manager needs technical background | 110-210 | Low (20-30) | Informational | EN | 4 |
| 17 | product manager design background | 70-170 | Low (25-35) | Informational | EN | 4 |
| 18 | PM cross-functional teams | 320-590 | Medium (40-50) | Informational | EN | 4 |
| 19 | bridge business tech teams | 40-110 | Low (20-30) | Informational | EN | 4 |
| 20 | PM facilitatore agile scrum team | 30-70 | Very Low (10-20) | Informational | IT | 4 |

### Search Intent Distribution

| Intent Type | Count | % | Content Strategy |
|-------------|:-----:|:-:|-----------------|
| Informational | 9 | 45% | Blog posts, guides, tutorials |
| Commercial Investigation | 6 | 30% | Case studies, comparison guides, landing pages |
| Transactional | 4 | 20% | Service pages with booking CTAs |
| Navigational | 1 | 5% | Homepage optimization |

### Intent-to-Content Mapping

| Search Intent | Primary Content Type | CTA Type | Conversion Goal |
|---------------|---------------------|----------|-----------------|
| Navigational | Homepage, About page | Newsletter signup | Brand awareness |
| Informational | Blog posts, Guides | Content download | Email capture |
| Commercial Investigation | Case studies, Comparison | Free consultation | Lead qualification |
| Transactional | Service pages | Book now | Direct conversion |

→ **Full details:** [keyword-strategy.md](keyword-strategy.md)

---

## Deliverable 3: 3-Month SEO Content Calendar

### Calendar Overview

| Month | Theme | Focus | Posts/Week |
|-------|-------|-------|:----------:|
| **Month 1** | Foundation | Tier 1 keywords, service pages, infrastructure fixes | 1/week |
| **Month 2** | Content Launch | Tier 2 keywords, blog series, Italian market | 1-2/week |
| **Month 3** | Authority Building | Tier 3-4 keywords, content clusters, internal linking | 1-2/week |

### Month 1: Foundation (Weeks 1-4)

| Week | Content Piece | Type | Target Keyword (Rank) | Intent | Est. Hours |
|:----:|---------------|:----:|----------------------|:------:|:----------:|
| 1 | robots.txt + sitemap.xml | 🟠 Tech | — | Infrastructure | 2h |
| 1 | Blog index page | 🟠 Tech | — | Infrastructure | 4h |
| 2 | Fractional PM Service (EN) | 🔵 Service | fractional PM consultant (#2) | Transactional | 5h |
| 2 | Homepage metadata optimization | 🟠 Optimize | product manager translator (#1) | Navigational | 2h |
| 3 | Fractional PM Service (IT) | 🔵 Service | consulente PM part-time (#5) | Transactional | 4h |
| 3 | Schema markup (Person, WebSite) | 🟠 Tech | — | Infrastructure | 3h |
| 4 | "When to Hire Your First PM" | 🟢 Pillar | when to hire first PM (#4) | Commercial | 12h |

### Month 2: Content Launch (Weeks 5-8)

| Week | Content Piece | Type | Target Keyword (Rank) | Intent | Est. Hours |
|:----:|---------------|:----:|----------------------|:------:|:----------:|
| 5 | "Cosa Deve Sapere un PM sul Design" | 🟢 Blog (IT) | cosa deve sapere PM designer (#8) | Informational | 5h |
| 5 | Italian PM Consulting page | 🔵 Service | consulente product management (#9) | Transactional | 4h |
| 6 | "How to Communicate with Developers" | 🟢 Pillar | communicate with developers (#14) | Informational | 10h |
| 7 | "PM con Background Tecnico" landing | 🔵 Landing | PM con background tecnico (#6) | Commercial | 5h |
| 8 | "Product Strategy Pragmatico" | 🟢 Blog (IT) | product strategy pragmatico (#7) | Commercial | 5h |

### Month 3: Authority Building (Weeks 9-12)

| Week | Content Piece | Type | Target Keyword (Rank) | Intent | Est. Hours |
|:----:|---------------|:----:|----------------------|:------:|:----------:|
| 9 | "PM vs Project Manager: la differenza" | 🟢 Blog | PM vs project manager (#12) | Informational | 10h |
| 10 | "Come Diventare PM in Italia" | 🟢 Blog (IT) | come diventare PM Italia (#13) | Informational | 8h |
| 11 | "Why PMs Need Technical Background" | 🟢 Blog | why PM technical background (#16) | Informational | 5h |
| 12 | "Designer to PM: My Story" + internal linking sprint | 🟢 Blog | PM design background (#17) | Informational | 6h |

### Expected Output After 12 Weeks

| Content Type | Count |
|--------------|:-----:|
| Technical SEO files | 2 |
| Service/landing pages | 4 |
| Pillar pages | 2 |
| Blog posts | 6+ |
| Lead magnets | 2 |
| **Total** | **16+** |

| SEO Metric | Before | After 12 Weeks |
|------------|:------:|:--------------:|
| Keywords covered | 7/20 (35%) | 15/20 (75%) |
| Indexed pages | 1 | 10-12 |
| Service pages | 0 | 3-4 |
| Est. organic traffic | ~100/mo | 500-1,000/mo |

→ **Full details:** [content-calendar.md](content-calendar.md)

---

## Deliverable 4: Link Building Strategy

### Current State

| Metric | Current | 6-Month Target | 12-Month Target |
|--------|:-------:|:--------------:|:---------------:|
| Referring domains | ~5 | 20-30 | 40-60 |
| Editorial backlinks | 0 | 8-12 | 20-30 |
| DoFollow links | ~1 | 10-15 | 25-35 |
| Domain Authority (est.) | 5-15 | 15-20 | 20-30 |
| Content platforms | 0/11 | 3-4 | 5-6 |

### Strategy: 3 Phases for Solo Founder

**Time Budget:** 3-5 hours per week on link building

#### Phase 1: Foundation (Months 1-2) — 3h/week

| Tactic | Effort | Expected Links | DoFollow? |
|--------|--------|:--------------:|:---------:|
| 1. Fix GitHub profile (add selfrules.org link, README) | 30 min | Improve existing | NoFollow |
| 2. Add LinkedIn website link | 15 min | Social signal | NoFollow |
| 3. Submit to Italian PM directories | 2 hours | 2-3 | Mix |
| 4. Create Medium account + first article | 6 hours | 1-2 | DoFollow |
| 5. Create Dev.to profile + cross-post | 3 hours | 1-2 | DoFollow |

#### Phase 2: Growth (Months 3-6) — 4h/week

| Tactic | Effort/Month | Expected Links/Month | DoFollow? |
|--------|:------------:|:--------------------:|:---------:|
| 6. Guest post on PM publications (Product Coalition, Better Programming) | 8-12h | 1-2 | DoFollow |
| 7. HARO/Connectively expert responses | 8-12h | 1-3 | DoFollow |
| 8. Podcast interviews (pitch 5/month, land 1-2) | 4-6h | 1-2 | DoFollow |
| 9. Publish original blog content on selfrules.org | Ongoing | Linkable assets | N/A |

#### Phase 3: Authority (Months 6-12) — 5h/week

| Tactic | Effort | Expected Links | DoFollow? |
|--------|--------|:--------------:|:---------:|
| 10. Open-source neobrutalist design system | 20-40h one-time | 5-20 | DoFollow |
| 11. Original research ("State of PM in Italy 2026") | 20-30h | 3-10 | DoFollow |
| 12. Tool vendor case studies (Figma, Miro, Notion) | 5-10h each | 1 each | DoFollow |
| 13. PM meetup/conference speaking | 10-15h | 1-3 | DoFollow |
| 14. Resource page outreach to PM curated lists | 4-8h | 1-2 | DoFollow |

### Expected Growth Trajectory

| Timeframe | Referring Domains | Est. DA | Key Milestone |
|-----------|:-----------------:|:-------:|---------------|
| Current | ~5 | 5-10 | Baseline |
| Month 3 | 10-15 | 10-15 | First editorial backlinks |
| Month 6 | 20-30 | 15-20 | Guest post + podcast links |
| Month 12 | 40-60 | 20-30 | Sustained link acquisition |

→ **Full details:** [link-building-strategy.md](link-building-strategy.md)

---

## Competitor Landscape

### Top 5 SEO Competitors

| Competitor | Type | Market | Content Volume | E-E-A-T | Threat |
|------------|------|--------|:--------------:|:-------:|:------:|
| Product Heroes | Platform | Italy | 200+ articles | 5/5 | 🔴 HIGH |
| Mind the Product | Platform | Global | 1000+ articles | 5/5 | 🔴 HIGH |
| The Fractional PM | Service | US | 0 articles | 2/5 | 🟠 MEDIUM |
| Gaetano Cuomo | Personal | Italy | 0 articles | 3/5 | 🟡 MEDIUM |
| FreelancePM.com | Collective | DACH | ~15 articles | 4/5 | 🟡 LOW |

### Key Competitive Insight

**"Product Manager Translator" is a verified BLUE OCEAN.** Zero competitors claim this positioning. Gaetano Cuomo and The Fractional PM have zero blog content — publishing 12 articles makes selfrules.org the content leader in the Italian fractional PM niche.

### 8 Competitive Gap Opportunities

| Gap | Score | Competition | Priority |
|-----|:-----:|:-----------:|:--------:|
| PM Translator positioning | 4.7/5 | ZERO | P1 |
| Italian Fractional PM market | 4.6/5 | ZERO (Italian) | P1 |
| Technical-Design bridge content | 4.1/5 | Weak | P1 |
| First PM hiring guide | 4.1/5 | No Italian | P1 |
| Beat Gaetano on content volume | 3.9/5 | He has ZERO | P1 |
| Italian PM career content | 3.5/5 | Product Heroes leaves gaps | P2 |
| Pragmatic/Anti-Corporate voice | 3.5/5 | All competitors institutional | P2 |
| E-E-A-T vs Anonymous services | 3.5/5 | Fractional PM weak | P2 |

---

## Content Gap Analysis

### Content Inventory

| Metric | Value |
|--------|-------|
| Total accessible pages | 3 (homepage IT, homepage EN, orphan pages) |
| Broken pages | 4 (Privacy, Terms, Blog, Sitemap) |
| Keywords covered | 7/20 (35%) |
| Keywords NOT covered | 13/20 (65%) |
| Total content gaps identified | 15 |

### Priority Content Gaps (Effort/Impact Matrix)

**CRITICAL — Infrastructure (Week 1):**
1. robots.txt + sitemap.xml (Impact 10/10, Effort 1/10)
2. Blog index page (Impact 9/10, Effort 2/10)

**QUICK WINS — High Impact, Low Effort (Weeks 2-3):**
3. Fractional PM Service EN (Impact 9/10, Effort 4/10)
4. Fractional PM Service IT (Impact 8/10, Effort 4/10)
5. PM-Designer Guide IT (Impact 7/10, Effort 3/10)

**STRATEGIC INVESTMENTS — High Impact, High Effort (Months 1-2):**
6. When to Hire First PM Guide (Impact 9/10, Effort 7/10)
7. How to Communicate with Devs (Impact 8/10, Effort 7/10)
8. PM vs Project Manager (Impact 8/10, Effort 8/10)

---

## Key Strengths (What's Working)

1. **Exceptional Content Quality:** Hero 90/100, Journey 93/100, Work Together 95/100 — storytelling is world-class
2. **Unique Positioning:** "Product Manager Translator" is authentic and uncontested
3. **Metadata Coherence:** Improved from 4/10 to 8/10 since last audit — translator metaphor now integrated
4. **Romei-Toon-Sinek Compliance:** 94% — brand voice is consistent and distinctive
5. **Clean Backlink Profile:** Zero toxicity — blank canvas for building correctly
6. **Bilingual Architecture:** IT/EN with hreflang tags — ready for Italian market capture

---

## Key Weaknesses (Biggest Gaps)

1. **Link Profile (12/100):** Near-zero backlinks, estimated DA 5-15, zero editorial links
2. **Schema Markup (0/100):** Zero structured data — zero rich snippets possible
3. **Single-Page Architecture:** Only 1 page indexed, 92% link equity wasted, no blog or service pages
4. **Trust Signals Broken:** Privacy Policy and Terms of Service return 404, no contact email
5. **Mobile CWV Gap:** Google ranks using mobile-first indexing but only desktop testing exists

---

## Appendix A: Audit Methodology

This audit was conducted across 7 phases with 23 individual assessments:

| Phase | Assessments | Documents |
|-------|:-----------:|-----------|
| 1. Technical SEO | 4 | Crawlability, Indexability, Core Web Vitals, Mobile & Security |
| 2. On-Page SEO | 4 | Homepage Content, Metadata Coherence, Schema Markup, Internal Linking |
| 3. E-E-A-T | 4 | Experience, Expertise, Authoritativeness, Trustworthiness |
| 4. Keyword Research | 3 | Primary Keywords, Secondary Keywords, Search Intent Mapping |
| 5. Competitor Analysis | 3 | Identification, Content Analysis, Competitive Gaps |
| 6. Content Gap Analysis | 3 | Inventory, Gaps Analysis, Opportunity Prioritization |
| 7. Link Profile | 2 | Backlink Profile, Internal Link Equity |

### Tools Used
- **WebFetch:** robots.txt, sitemap.xml, meta tags, structured data, security headers
- **WebSearch:** Keyword research, competitor analysis, backlink discovery
- **Codebase Review:** Lighthouse CI config, layout files, component analysis, middleware
- **Previous Audit:** Baseline comparison (2025-11-22 metadata coherence report)

### Constraints
- No Google Search Console access (external tools only)
- No enterprise SEO tools (Ahrefs, SEMrush, Moz) — public methods used
- Desktop Lighthouse only (mobile testing gap identified as finding)

---

## Appendix B: Document Reference

All detailed assessment documents are in `claudedocs/`:

| # | Document | Phase |
|---|----------|-------|
| 01 | crawlability-assessment.md | Technical SEO |
| 02 | indexability-assessment.md | Technical SEO |
| 03 | core-web-vitals-assessment.md | Technical SEO |
| 04 | mobile-security-assessment.md | Technical SEO |
| 05 | homepage-content-audit.md | On-Page SEO |
| 06 | metadata-coherence-review.md | On-Page SEO |
| 07 | schema-markup-assessment.md | On-Page SEO |
| 08 | internal-linking-audit.md | On-Page SEO |
| 09 | experience-signals-assessment.md | E-E-A-T |
| 10 | expertise-signals-assessment.md | E-E-A-T |
| 11 | authoritativeness-signals-assessment.md | E-E-A-T |
| 12 | trustworthiness-signals-assessment.md | E-E-A-T |
| 13 | primary-keyword-research.md | Keyword Strategy |
| 14 | secondary-keyword-research.md | Keyword Strategy |
| 15 | search-intent-mapping.md | Keyword Strategy |
| 16 | competitor-identification.md | Competitor Analysis |
| 17 | competitor-content-analysis.md | Competitor Analysis |
| 18 | competitive-gaps-analysis.md | Competitor Analysis |
| 19 | content-inventory.md | Content Gap Analysis |
| 20 | content-gaps-analysis.md | Content Gap Analysis |
| 21 | content-opportunity-prioritization.md | Content Gap Analysis |
| 22 | backlink-profile-assessment.md | Link Profile |
| 23 | internal-link-equity-assessment.md | Link Profile |

### Standalone Deliverables

| Deliverable | File |
|-------------|------|
| SEO Health Score | [seo-health-score.md](seo-health-score.md) |
| Keyword Strategy | [keyword-strategy.md](keyword-strategy.md) |
| Content Calendar | [content-calendar.md](content-calendar.md) |
| Link Building Strategy | [link-building-strategy.md](link-building-strategy.md) |

---

## Appendix C: Previous Audit Integration

The November 2025 audit identified metadata-content coherence as the primary issue (4/10 score). Key findings from that audit:

| Finding | Status (Jan 2026) |
|---------|:-----------------:|
| Corporate jargon in metadata | ✅ Fixed — translator metaphor now integrated |
| Missing "why" in descriptions | ✅ Fixed — Sinek check passing |
| Tone mismatch (formal vs conversational) | ✅ Fixed — Romei-Toon-Sinek 94% |
| Missing structured data schemas | ❌ Still missing — escalated to #1 priority |
| Target "product manager translator" keyword | ⚠️ Partially addressed — in metadata, no dedicated content |

**Improvements since Nov 2025:** Metadata coherence +100% (4/10 → 8/10)
**New findings:** Schema markup 0/100, backlink profile 8/100, single-page indexation

---

*Report compiled from 23 individual assessments across 7 audit phases. For implementation guidance, start with the Solo Founder Roadmap in the Priority Actions section.*

**Report End**
