# SEO Health Score: selfrules.org

**Audit Date:** 2026-01-27
**Overall Score: 42/100**
**Status:** Needs Significant Improvement
**Target Audience:** Solo founder (Mattia Filippo De Luca)

---

## Executive Summary

selfrules.org scores **42/100** on overall SEO health. The site has strong content quality and personal brand storytelling (Experience 4/5, Expertise 4/5), but is critically undermined by missing technical foundations (no robots.txt, no sitemap, no schema markup), a near-zero backlink profile (8/100), and single-page architecture that wastes 92% of link equity. The good news: the highest-impact fixes (robots.txt, sitemap, schema markup) are also the easiest to implement.

---

## Overall Score Breakdown

| Category | Score | Weight | Weighted Score | Status |
|----------|-------|--------|----------------|--------|
| Technical SEO | 56/100 | 25% | 14.0 | 🟠 Needs Work |
| On-Page SEO | 39/100 | 25% | 9.75 | 🔴 Critical |
| E-E-A-T Signals | 60/100 | 25% | 15.0 | 🟠 Needs Work |
| Link Profile | 12/100 | 25% | 3.0 | 🔴 Critical |
| **TOTAL** | | **100%** | **41.75 → 42/100** | 🔴 |

---

## Category Detail: Technical SEO (56/100)

| Sub-Category | Score | Key Finding |
|-------------|-------|-------------|
| Crawlability | 60/100 | robots.txt missing (404), sitemap.xml missing (404), meta robots OK |
| Indexability | 45/100 | Only 1 page indexed by Google, canonical URLs misconfigured for locales |
| Core Web Vitals | 51/100 | Desktop-only testing, no mobile CWV, no INP measurement |
| Mobile & Security | 67/100 | Security headers only on API routes, no HSTS, viewport OK |

**Technical SEO Average:** (60 + 45 + 51 + 67) / 4 = **56/100**

### Critical Issues (Technical)

| # | Issue | Priority | Impact | Effort |
|---|-------|----------|--------|--------|
| T1 | Missing robots.txt | 🔴 High | Crawl directives absent | 30 min |
| T2 | Missing sitemap.xml | 🔴 High | Search engines can't discover pages | 1 hour |
| T3 | Only 1 page indexed | 🔴 High | 95%+ content invisible to Google | Ongoing |
| T4 | Canonical URL misconfiguration | 🔴 High | Locale pages point to root instead of self | 2 hours |
| T5 | No mobile CWV testing | 🟠 Medium | Google ranks using mobile-first indexing | 2 hours |
| T6 | Missing HSTS header | 🟠 Medium | Security downgrade possible | 1 hour |
| T7 | Security headers only on API routes | 🟠 Medium | Main pages unprotected | 2 hours |
| T8 | No INP measurement | 🟡 Low | Core Web Vital since March 2024 unmeasured | 1 hour |

---

## Category Detail: On-Page SEO (39/100)

| Sub-Category | Score | Key Finding |
|-------------|-------|-------------|
| Homepage Content | 55/100 | Title 83-87 chars (should be 50-60), meta desc 211-219 chars (should be 150-160) |
| Metadata Coherence | 80/100 | Improved from 4/10 to 8/10; translator metaphor now integrated |
| Schema Markup | 0/100 | **Zero** structured data implementation (no JSON-LD at all) |
| Internal Linking | 35/100 | Single-page architecture, 6 broken links, orphan pages |

**On-Page SEO Average:** (55 + 80 + 0 + 35) / 4 = **42.5 → rounded to 39/100** (adjusted down: keyword integration only 4/10 further depresses homepage score)

### Critical Issues (On-Page)

| # | Issue | Priority | Impact | Effort |
|---|-------|----------|--------|--------|
| O1 | Zero schema markup (JSON-LD) | 🔴 High | No rich snippets, no Knowledge Panel | 4 hours |
| O2 | Title tags too long (83-87 chars) | 🔴 High | Truncated in SERPs, reduced CTR | 1 hour |
| O3 | Meta descriptions too long (211-219 chars) | 🔴 High | Truncated in SERPs | 1 hour |
| O4 | 6 broken internal links (Privacy, Terms, resources) | 🔴 High | 404 errors damage trust + crawl budget | 3 hours |
| O5 | Keyword integration weak (4/10) | 🟠 Medium | Target keywords absent from content | 4 hours |
| O6 | Orphan pages (/demo, /design-system) | 🟡 Low | Pages unreachable from navigation | 1 hour |
| O7 | Hreflang missing x-default | 🟡 Low | Search engines may misroute users | 30 min |

---

## Category Detail: E-E-A-T Signals (60/100)

| Component | Score (1-5) | Equivalent /100 | Key Gap |
|-----------|-------------|------------------|---------|
| Experience | 4/5 | 80/100 | No original media (video/podcast), blog empty |
| Expertise | 4/5 | 80/100 | Certifications present but unverifiable (no Credly/LinkedIn links) |
| Authoritativeness | 2/5 | 40/100 | **Zero editorial backlinks**, no industry citations, GitHub 1 follower |
| Trustworthiness | 2/5 | 40/100 | Privacy Policy 404, Terms 404, no contact email, unverifiable testimonials |

**E-E-A-T Average:** (80 + 80 + 40 + 40) / 4 = **60/100**

### Critical Issues (E-E-A-T)

| # | Issue | Priority | Impact | Effort |
|---|-------|----------|--------|--------|
| E1 | Privacy Policy returns 404 | 🔴 High | GDPR compliance risk, trust signal absent | 4 hours |
| E2 | Terms of Service returns 404 | 🔴 High | Legal exposure, trust signal absent | 4 hours |
| E3 | No LinkedIn link on site | 🔴 High | Primary authority signal missing | 30 min |
| E4 | Testimonials unverifiable | 🟠 Medium | Generic names without company/LinkedIn | 2 hours |
| E5 | No headshot/photo on site | 🟠 Medium | Personal brand without face | 1 hour |
| E6 | Certifications not linked to Credly | 🟠 Medium | Claims unverifiable by Google | 2 hours |
| E7 | Zero external content presence | 🟠 Medium | No guest posts, podcasts, or speaking mentions | Ongoing |

---

## Category Detail: Link Profile (12/100)

| Sub-Category | Score | Key Finding |
|-------------|-------|-------------|
| Backlink Profile | 8/100 | ~5 referring domains (all NoFollow/directory), zero editorial links |
| Internal Link Equity | 15/100 | 92% equity waste, single-page architecture, 2/20 keywords supported |

**Link Profile Average:** (8 + 15) / 2 = **11.5 → 12/100**

### Critical Issues (Link Profile)

| # | Issue | Priority | Impact | Effort |
|---|-------|----------|--------|--------|
| L1 | Zero editorial/earned backlinks | 🔴 High | Domain authority estimated 5-15/100 | Ongoing |
| L2 | 92% link equity waste | 🔴 High | Single-page architecture can't distribute PageRank | 8+ hours |
| L3 | No content platform presence | 🟠 Medium | Missing from Medium, Dev.to, Product Hunt, etc. | 4 hours |
| L4 | Anchor text 100% brand, 0% keyword-rich | 🟡 Low | No keyword relevance signals in backlinks | Ongoing |
| L5 | Brand confusion with theselfrule.org | 🟡 Low | Similar domain may dilute brand signals | Monitor |

---

## Prioritized Critical Issues (All Categories)

### 🔴 HIGH Priority (Fix within 2 weeks)

| Rank | Issue | Category | Impact Score | Effort | ROI |
|------|-------|----------|-------------|--------|-----|
| 1 | Missing robots.txt | Technical | 9/10 | 30 min | ★★★★★ |
| 2 | Missing sitemap.xml | Technical | 9/10 | 1 hour | ★★★★★ |
| 3 | Zero schema markup (JSON-LD) | On-Page | 8/10 | 4 hours | ★★★★☆ |
| 4 | Privacy Policy 404 | E-E-A-T | 8/10 | 4 hours | ★★★★☆ |
| 5 | Terms of Service 404 | E-E-A-T | 8/10 | 4 hours | ★★★★☆ |
| 6 | Title tags too long | On-Page | 7/10 | 1 hour | ★★★★★ |
| 7 | Meta descriptions too long | On-Page | 7/10 | 1 hour | ★★★★★ |
| 8 | Add LinkedIn link to site | E-E-A-T | 7/10 | 30 min | ★★★★★ |
| 9 | Canonical URL misconfiguration | Technical | 7/10 | 2 hours | ★★★★☆ |
| 10 | 6 broken internal links | On-Page | 7/10 | 3 hours | ★★★★☆ |

### 🟠 MEDIUM Priority (Fix within 1 month)

| Rank | Issue | Category | Impact Score | Effort | ROI |
|------|-------|----------|-------------|--------|-----|
| 11 | No mobile CWV testing | Technical | 6/10 | 2 hours | ★★★☆☆ |
| 12 | Security headers on all routes | Technical | 6/10 | 2 hours | ★★★☆☆ |
| 13 | Missing HSTS header | Technical | 5/10 | 1 hour | ★★★☆☆ |
| 14 | Keyword integration weak (4/10) | On-Page | 6/10 | 4 hours | ★★★☆☆ |
| 15 | Testimonials unverifiable | E-E-A-T | 5/10 | 2 hours | ★★★☆☆ |
| 16 | No headshot/photo | E-E-A-T | 5/10 | 1 hour | ★★★★☆ |
| 17 | Certifications not linked to Credly | E-E-A-T | 5/10 | 2 hours | ★★★☆☆ |
| 18 | No content platform presence | Link Profile | 6/10 | 4 hours | ★★☆☆☆ |
| 19 | Zero external content/guest posts | E-E-A-T | 6/10 | Ongoing | ★★☆☆☆ |

### 🟡 LOW Priority (Fix within 3 months)

| Rank | Issue | Category | Impact Score | Effort | ROI |
|------|-------|----------|-------------|--------|-----|
| 20 | Orphan pages (/demo, /design-system) | On-Page | 3/10 | 1 hour | ★★★☆☆ |
| 21 | Hreflang missing x-default | On-Page | 3/10 | 30 min | ★★★☆☆ |
| 22 | No INP measurement | Technical | 4/10 | 1 hour | ★★★☆☆ |
| 23 | Anchor text diversity | Link Profile | 3/10 | Ongoing | ★☆☆☆☆ |
| 24 | Brand confusion monitoring | Link Profile | 2/10 | Monitor | ★☆☆☆☆ |

---

## Score Improvement Projections

### If HIGH priority issues are fixed (2-week sprint):

| Category | Current | Projected | Change |
|----------|---------|-----------|--------|
| Technical SEO | 56 | 75 | +19 |
| On-Page SEO | 39 | 62 | +23 |
| E-E-A-T Signals | 60 | 72 | +12 |
| Link Profile | 12 | 15 | +3 |
| **Overall** | **42** | **56** | **+14** |

### If HIGH + MEDIUM priority issues are fixed (1-month sprint):

| Category | Current | Projected | Change |
|----------|---------|-----------|--------|
| Technical SEO | 56 | 82 | +26 |
| On-Page SEO | 39 | 72 | +33 |
| E-E-A-T Signals | 60 | 80 | +20 |
| Link Profile | 12 | 25 | +13 |
| **Overall** | **42** | **65** | **+23** |

### 3-month target (all priorities + content + link building):

| Category | Current | Projected | Change |
|----------|---------|-----------|--------|
| Technical SEO | 56 | 88 | +32 |
| On-Page SEO | 39 | 78 | +39 |
| E-E-A-T Signals | 60 | 85 | +25 |
| Link Profile | 12 | 40 | +28 |
| **Overall** | **42** | **73** | **+31** |

---

## Scoring Methodology

### Category Weights
Each of the 4 categories is weighted equally at 25%, reflecting the holistic nature of modern SEO:
- **Technical SEO (25%)**: Foundation - can the site be found and crawled?
- **On-Page SEO (25%)**: Content - is the content optimized for search?
- **E-E-A-T Signals (25%)**: Trust - does Google trust this source?
- **Link Profile (25%)**: Authority - do others vouch for this site?

### Sub-Category Scoring
Each sub-category was scored 0-100 based on:
- Industry best practices and Google's published guidelines
- Comparison against competitor benchmarks
- Previous audit findings (2025-11-22) for trend analysis
- seo-consultant skill E-E-A-T framework (1-5 scale converted to /100)

### Data Sources
All scores derived from publicly available analysis:
- WebFetch analysis of live site (robots.txt, sitemap, meta tags, headers)
- WebSearch for indexation, backlinks, competitor research
- Codebase review (Lighthouse CI config, layout files, component analysis)
- Previous SEO audit (2025-11-22) for baseline comparison

---

## Previous Audit Comparison

| Metric | Previous (2025-11-22) | Current (2026-01-27) | Trend |
|--------|----------------------|---------------------|-------|
| Metadata Coherence | 4/10 | 8/10 | ✅ +100% improvement |
| Hero Content Quality | 90/100 | 90/100 | ➡️ Maintained |
| Journey Section Quality | 93/100 | 93/100 | ➡️ Maintained |
| Schema Markup | Not assessed | 0/100 | 🔴 New critical finding |
| Backlink Profile | Not assessed | 8/100 | 🔴 New critical finding |
| robots.txt | Not assessed | Missing | 🔴 New critical finding |

---

## Key Strengths (What's Working)

1. **Content Quality**: Hero (90/100), Journey (93/100), Work Together (95/100) - exceptional storytelling
2. **Metadata Coherence**: Improved from 4/10 to 8/10 - translator metaphor now integrated
3. **Unique Positioning**: "Product Manager Translator" is a blue ocean keyword with zero competition
4. **HTTPS**: Active and properly configured
5. **i18n Architecture**: Bilingual (IT/EN) with hreflang tags
6. **Romei-Toon-Sinek Compliance**: 94% (33/35 checks passing)

## Key Weaknesses (Biggest Gaps)

1. **Link Profile**: 12/100 - near-zero backlinks, estimated DA 5-15
2. **Schema Markup**: 0/100 - zero structured data implementation
3. **Content Architecture**: Single-page site with no blog, no service pages
4. **Trust Signals**: Privacy/Terms 404, unverifiable testimonials
5. **Indexation**: Only 1 page indexed by Google out of potential many

---

## Solo Founder Action Plan (Quick Reference)

**Week 1** (4 hours): robots.txt + sitemap.xml + LinkedIn link + title/meta length fixes
**Week 2** (8 hours): Schema markup (Person, WebSite) + Privacy Policy + Terms of Service
**Week 3-4** (12 hours): Broken links + canonical URLs + security headers + mobile CWV testing
**Month 2** (20 hours): Blog infrastructure + first 4 articles targeting P1 keywords
**Month 3** (20 hours): Guest posts + content platform presence + remaining articles

**Expected outcome**: Score improvement from **42/100 → 73/100** within 3 months.

---

*This SEO Health Score aggregates findings from 23 individual assessments conducted across 7 audit phases. For detailed findings, see the corresponding assessment documents (claudedocs/01-23).*
