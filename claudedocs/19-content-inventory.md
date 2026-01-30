# Content Inventory - selfrules.org

**Document:** 19-content-inventory.md
**Phase:** 6 - Content Gap Analysis
**Subtask:** 6-1 - Map Current Content Inventory
**Date:** 2026-01-26

## Executive Summary

selfrules.org operates as a primarily **single-page application** with minimal standalone pages. The content inventory reveals a significant gap between the 20-keyword strategy and actual content coverage.

**Key Statistics:**
| Metric | Count |
|--------|-------|
| Total Accessible Pages | 3 |
| Total Broken/404 Pages | 4 |
| Total Orphan Pages | 2 |
| Keywords Covered | 7 of 20 (35%) |
| Keywords Not Covered | 13 of 20 (65%) |

---

## Complete Page Inventory

### Active Pages

| Page | URL(s) | Status | Content Type | Word Count (Est.) |
|------|--------|--------|--------------|-------------------|
| Homepage (IT) | `/it` | ✅ Active | Landing page | ~2,500 |
| Homepage (EN) | `/en` | ✅ Active | Landing page | ~2,400 |
| Demo | `/demo` | ⚠️ Orphan | Component showcase | ~500 |
| Design System | `/design-system` | ⚠️ Orphan | Documentation | ~3,000 |

### Broken/Missing Pages (404)

| Expected Page | URL Pattern | Status | Impact |
|---------------|-------------|--------|--------|
| Privacy Policy | `/[locale]/privacy` | ❌ 404 | GDPR compliance risk |
| Terms of Service | `/[locale]/terms` | ❌ 404 | Legal exposure |
| Blog Index | `/[locale]/blog` | ❌ 404 | Missing content strategy |
| Sitemap | `/sitemap.xml` | ❌ 404 | Crawlability issue |

---

## Homepage Content Structure

The homepage is a single-page design with 7 distinct content sections accessible via anchor links.

### Section-by-Section Inventory

| Section | Anchor | Primary Content | Target Keywords | SEO Score |
|---------|--------|-----------------|-----------------|-----------|
| **Hero** | `#home` | Value proposition, personal branding | product manager translator, PM che parla design e codice | 8/10 |
| **Journey** | `#journey` | Career timeline, experience highlights | PM con background tecnico, product manager design background | 9/10 |
| **Skills Matrix** | (within journey) | Full-stack competencies | technical product manager, bridge business tech teams | 7/10 |
| **Certifications** | (within journey) | Professional credentials | - | 5/10 |
| **Work Together** | `#work` | Service offerings, pricing | consulente product management, fractional PM consultant | 6/10 |
| **Testimonials** | (within work) | Client validation | - | 5/10 |
| **What I'm Up To** | `#now` | Current projects | - | 3/10 |
| **Ask Me Anything** | `#ask-me` | Contact form, FAQ concept | - | 4/10 |

### Homepage Metadata Analysis

**Root Layout (app/layout.tsx):**
```
Title: Mattia De Luca - Traduco tra business, design e codice quando il tuo team non si capisce
Length: 83-87 characters (EXCEEDS 50-60 recommended)

Description: Ho fallito come designer. Poi come developer. Ora traduco quando designer dice...
Length: 211-219 characters (EXCEEDS 150-160 recommended)

Keywords Declared:
- product manager translator ✓
- PM che parla design e codice ✓
- technical product manager ✓
- cross-functional team communication ✓
- product strategy pragmatico ✓
- business design tech bridge ✓
- PM con background design e sviluppo ✓
```

**Locale Page (app/[locale]/page.tsx):**
```
Title: Mattia De Luca - Il PM che chiami quando tutti dicono "sì" ma nessuno sa cosa fare
Length: 75 characters (EXCEEDS recommended)

Description: Perché dopo 13 anni ho capito: il problema non è mai quello che ti dicono...
Length: 215 characters (EXCEEDS recommended)
```

---

## Keyword-to-Content Mapping

### Covered Keywords (7/20)

| Rank | Keyword | Coverage Location | Content Match | Gap Notes |
|------|---------|-------------------|---------------|-----------|
| 1 | product manager translator | Homepage title, hero, journey | ✅ Strong | Already integrated |
| 3 | PM che parla design e codice | Homepage title, metadata | ✅ Strong | Already integrated |
| 6 | PM con background tecnico | Journey section | ✅ Moderate | Could be stronger |
| 7 | product strategy pragmatico | Metadata keywords | ⚠️ Weak | In keywords, not in content |
| 11 | technical product manager | Skills matrix, metadata | ⚠️ Weak | Generic mention |
| 18 | PM cross-functional teams | Metadata keywords | ⚠️ Weak | In keywords, not in content |
| 19 | bridge business tech teams | Metadata keywords | ⚠️ Weak | In keywords, not in content |

### Uncovered Keywords (13/20)

| Rank | Keyword | Intent | Required Content Type |
|------|---------|--------|----------------------|
| 2 | fractional product manager consultant | Transactional | Dedicated service page |
| 4 | when to hire first product manager startup | Commercial | Pillar blog post |
| 5 | consulente PM part-time freelance | Transactional | Italian service page |
| 8 | cosa deve sapere product manager designer | Informational | Blog post (IT) |
| 9 | consulente product management | Transactional | Italian service page |
| 10 | product manager freelance | Commercial | Service/landing page |
| 12 | product manager vs project manager differenza | Informational | Comparison blog post |
| 13 | come diventare product manager Italia | Informational | Career guide blog (IT) |
| 14 | how to communicate with developers as PM | Informational | Pillar blog post |
| 15 | product manager startup early stage | Commercial | Blog post + CTA |
| 16 | why product manager needs technical background | Informational | Opinion/expertise blog |
| 17 | product manager design background | Informational | Career story blog |
| 20 | PM facilitatore agile scrum team | Informational | Blog post (IT) |

---

## Content by Language

### Italian Content

| Page/Section | Content Present | Target Keywords | Status |
|--------------|-----------------|-----------------|--------|
| Homepage `/it` | Full translation | 3 of 8 IT keywords | ⚠️ Partial |
| Service descriptions | Translated | consulente PM | ✅ Present |
| Blog content | None | 4 keywords need IT blog | ❌ Missing |

### English Content

| Page/Section | Content Present | Target Keywords | Status |
|--------------|-----------------|-----------------|--------|
| Homepage `/en` | Full translation | 4 of 12 EN keywords | ⚠️ Partial |
| Service descriptions | Translated | fractional PM | ⚠️ Weak |
| Blog content | None | 9 keywords need EN blog | ❌ Missing |

---

## Content Type Distribution

### Current State

| Content Type | Count | % of Total | SEO Value |
|--------------|-------|------------|-----------|
| Landing page | 2 | 67% | High |
| Component demo | 1 | 17% | None (orphan) |
| Design docs | 1 | 17% | None (orphan) |
| Blog posts | 0 | 0% | Missing |
| Service pages | 0 | 0% | Missing |
| Legal pages | 0 | 0% | Missing |

### Required State (per Keyword Strategy)

| Content Type | Required | Current | Gap |
|--------------|----------|---------|-----|
| Landing page | 2 | 2 | ✅ |
| Service pages | 3 | 0 | -3 |
| Blog posts | 9+ | 0 | -9 |
| Pillar content | 3 | 0 | -3 |
| Legal pages | 2 | 0 | -2 |
| Sitemap | 1 | 0 | -1 |

---

## API Routes (Not Indexed)

These routes are functional but not SEO-relevant:

| Route | Purpose |
|-------|---------|
| `/api/analytics/*` | Analytics tracking |
| `/api/calendar/*` | Cal.com integration |
| `/api/chat/*` | AI chat functionality |
| `/api/questions/*` | FAQ/questions |
| `/api/spotify/*` | Now playing widget |

---

## Orphan Pages Analysis

### `/demo`

| Attribute | Value |
|-----------|-------|
| URL | `/demo` |
| Purpose | Component library showcase |
| Inbound links | 0 |
| Indexed | Unknown (likely not) |
| SEO value | None |
| Target keywords | None |

**Recommendation:** Add `noindex` meta tag OR link from footer as "Design System"

### `/design-system`

| Attribute | Value |
|-----------|-------|
| URL | `/design-system` |
| Purpose | Complete design documentation |
| Inbound links | 0 |
| Indexed | Unknown (likely not) |
| SEO value | Potential (developer audience) |
| Target keywords | None currently |

**Recommendation:** Could target "neobrutalist design system" if made public, or add `noindex` if internal-only

---

## Content Quality Assessment

### Homepage Sections Quality Scores

| Section | E-E-A-T Alignment | Keyword Density | CTA Presence | Mobile Optimized |
|---------|-------------------|-----------------|--------------|------------------|
| Hero | 5/5 | 3/5 | ✅ Yes | ✅ Yes |
| Journey | 5/5 | 4/5 | ⚠️ Weak | ✅ Yes |
| Skills | 4/5 | 2/5 | ❌ No | ✅ Yes |
| Work Together | 4/5 | 3/5 | ✅ Yes | ✅ Yes |
| Testimonials | 3/5 | 1/5 | ❌ No | ✅ Yes |
| Now | 3/5 | 1/5 | ⚠️ Weak | ✅ Yes |
| Ask Me | 4/5 | 1/5 | ✅ Yes | ✅ Yes |

---

## Content Inventory Summary Table

| URL | Type | Primary Keyword | Intent | Status | Priority |
|-----|------|-----------------|--------|--------|----------|
| `/it` | Landing | product manager translator | Navigational | ✅ Live | - |
| `/en` | Landing | product manager translator | Navigational | ✅ Live | - |
| `/demo` | Demo | - | - | ⚠️ Orphan | Low |
| `/design-system` | Docs | - | - | ⚠️ Orphan | Low |
| `/[locale]/privacy` | Legal | - | - | ❌ 404 | 🔴 Critical |
| `/[locale]/terms` | Legal | - | - | ❌ 404 | 🔴 Critical |
| `/[locale]/blog` | Blog | various | various | ❌ 404 | 🔴 Critical |
| `/services/fractional-pm` | Service | fractional PM consultant | Transactional | ❌ Missing | 🔴 High |
| `/servizi/consulenza-pm` | Service | consulente PM | Transactional | ❌ Missing | 🔴 High |
| `/sitemap.xml` | Technical | - | - | ❌ 404 | 🔴 Critical |
| `/robots.txt` | Technical | - | - | ❌ 404 | 🔴 Critical |

---

## Key Findings

### Critical Gaps

1. **Zero blog content** - 9 informational keywords have no content
2. **Zero service pages** - 4 transactional keywords have no dedicated pages
3. **Missing technical SEO files** - robots.txt and sitemap.xml return 404
4. **Missing legal pages** - Privacy and Terms return 404 (GDPR risk)

### Strengths

1. **Homepage keyword integration** - Brand keywords well-integrated
2. **Content quality** - Existing content is high-quality and E-E-A-T aligned
3. **Bilingual structure** - i18n infrastructure ready for content expansion
4. **Strong CTAs** - Booking integration functional

### Content Velocity Required

To cover all 20 keywords, the following content creation is needed:

| Content Type | Count | Estimated Time (Solo Founder) |
|--------------|-------|------------------------------|
| Service pages | 3 | 1-2 days |
| Blog posts | 9 | 6-8 weeks (1/week) |
| Pillar content | 3 | 3 weeks |
| Legal pages | 2 | 1 day |
| Technical files | 2 | 1 hour |

**Total estimated time:** 10-12 weeks at sustainable pace

---

## Next Steps

1. **Immediate (Week 1):**
   - Create robots.txt and sitemap.xml
   - Create Privacy and Terms pages
   - Add `noindex` to demo/design-system OR link from navigation

2. **Short-term (Weeks 2-4):**
   - Create 3 service pages for transactional keywords
   - Plan blog architecture

3. **Medium-term (Weeks 5-12):**
   - Execute blog content calendar
   - Build pillar content for commercial keywords

---

## Appendix: Files Analyzed

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root metadata configuration |
| `app/[locale]/page.tsx` | Locale-specific metadata |
| `app/demo/page.tsx` | Demo page structure |
| `app/design-system/page.tsx` | Design system documentation |
| `claudedocs/08-internal-linking-audit.md` | Broken links reference |
| `claudedocs/15-search-intent-mapping.md` | Keyword strategy reference |

---

## Sources

- Live site analysis via WebFetch (https://selfrules.org)
- Codebase review of app/ directory structure
- Previous audit documents (subtasks 2-4, 4-3)
- Keyword strategy mapping (Document 15)
