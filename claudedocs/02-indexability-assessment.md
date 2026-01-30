# Indexability Assessment - selfrules.org

**Audit Date:** 2026-01-26
**Subtask ID:** subtask-1-2 (Technical SEO Audit - Phase 1)

## Executive Summary

selfrules.org has **critical indexability issues**. Only **1 page is indexed by Google** (the homepage), and there's a canonical URL misconfiguration that conflicts with hreflang implementation. The site properly allows indexing via meta robots tags, but the lack of content pages (blog, design-system) and missing sitemap severely limits discoverability.

## Technical Health

| Metric | Status | Priority |
|--------|--------|----------|
| Indexed pages (site: search) | ❌ Only 1 page | 🔴 High |
| Meta robots tags | ✅ index, follow | ✅ Pass |
| Canonical URLs | ⚠️ Misconfigured | 🔴 High |
| Noindex directives | ✅ None found | ✅ Pass |
| Hreflang consistency | ⚠️ Conflicts with canonical | 🟡 Medium |
| Page availability | ✅ 200 OK (main pages) | ✅ Pass |

## Detailed Findings

### 1. Indexed Pages - CRITICAL ❌

**Search Query:** `site:selfrules.org`

**Result:** Only **1 page indexed** - the homepage

| URL | Indexed | Notes |
|-----|---------|-------|
| https://selfrules.org | ✅ Yes | Main result |
| https://selfrules.org/it | ❌ No | Locale version not separately indexed |
| https://selfrules.org/en | ❌ No | Locale version not separately indexed |
| https://selfrules.org/blog | ❌ N/A | Page returns 404 |
| https://selfrules.org/it/blog | ❌ N/A | Page returns 404 |
| https://selfrules.org/en/blog | ❌ N/A | Page returns 404 |
| https://selfrules.org/it/design-system | ❌ N/A | Page returns 404 |

**Impact:**
- Extremely limited organic search visibility
- No content pages to rank for informational queries
- Only brand searches can potentially find the site
- "Product manager translator" keyword opportunity completely missed

**Root Causes:**
1. Missing sitemap.xml (identified in subtask-1-1)
2. Missing robots.txt with sitemap reference (identified in subtask-1-1)
3. No blog or content pages exist (404 errors)
4. Canonical URL configuration may confuse Google

### 2. Meta Robots Tags - PASS ✅

All checked pages properly allow indexing:

| URL | Meta Robots |
|-----|-------------|
| https://selfrules.org | `<meta name="robots" content="index, follow">` |
| https://selfrules.org/en | `<meta name="robots" content="index, follow">` |
| https://selfrules.org/it | `<meta name="robots" content="index, follow">` |

**Assessment:** No accidental noindex tags blocking crawlers. Indexing is permitted on all main pages.

### 3. Canonical URL Configuration - CRITICAL ISSUE ⚠️

**Current Implementation:**

| Page URL | Canonical Points To | Expected |
|----------|---------------------|----------|
| https://selfrules.org | https://selfrules.org | ✅ Correct |
| https://selfrules.org/en | https://selfrules.org | ❌ Should be /en |
| https://selfrules.org/it | https://selfrules.org | ❌ Should be /it |

**Problem Analysis:**

The locale pages (`/en` and `/it`) have canonical URLs pointing to the root domain instead of their specific paths. This creates a conflict:

1. **Hreflang says:** "There are two versions - /it for Italian users, /en for English users"
2. **Canonical says:** "Actually, the canonical (main) version of all these pages is the root URL"

**Impact:**
- Google may consolidate all locale versions to root, ignoring hreflang
- Locale-specific pages may never rank in their target markets
- Mixed signals reduce crawl efficiency
- Potential for locale pages to be treated as duplicates

**Recommendation:** Update canonical URLs to be self-referencing:

```html
<!-- On /en page -->
<link rel="canonical" href="https://selfrules.org/en">

<!-- On /it page -->
<link rel="canonical" href="https://selfrules.org/it">

<!-- On root page - pick default locale -->
<link rel="canonical" href="https://selfrules.org">
<!-- OR redirect root to default locale -->
```

### 4. Noindex Directives - PASS ✅

**Finding:** No noindex meta tags or X-Robots-Tag headers found on any checked pages.

**Assessment:** All pages are correctly allowed to be indexed. The low index count is not due to noindex directives.

### 5. Hreflang Implementation - PARTIAL PASS ⚠️

**Current Implementation:**
```html
<link rel="alternate" hrefLang="it-IT" href="https://selfrules.org/it">
<link rel="alternate" hrefLang="en-US" href="https://selfrules.org/en">
```

**Issues:**
1. No `x-default` hreflang for fallback
2. Conflicts with canonical URL configuration (see section 3)
3. Root URL hreflang should be defined

**Recommended Fix:**
```html
<link rel="alternate" hrefLang="it-IT" href="https://selfrules.org/it">
<link rel="alternate" hrefLang="en-US" href="https://selfrules.org/en">
<link rel="alternate" hrefLang="x-default" href="https://selfrules.org/en">
```

### 6. Title Tag Configuration

**Finding:** Interesting observation - all locale versions show the same Italian title:

```html
<title>Mattia De Luca - Il PM che chiami quando tutti dicono "sì" ma nessuno sa cosa fare | Mattia De Luca</title>
```

**Issue:** The `/en` page should have an English title for proper localization.

## Indexability Score

| Category | Score | Max |
|----------|-------|-----|
| Number of indexed pages | 5 | 30 |
| Meta robots configuration | 15 | 15 |
| Canonical URL setup | 5 | 20 |
| Noindex compliance | 10 | 10 |
| Hreflang consistency | 10 | 15 |
| Content availability | 0 | 10 |
| **Total** | **45** | **100** |

## Critical Issues Identified

1. **🔴 HIGH - Only 1 page indexed**
   - Root Cause: No sitemap, missing content pages
   - Effort: Medium (requires content creation + sitemap)
   - Impact: Critical - no organic visibility

2. **🔴 HIGH - Canonical URL misconfiguration**
   - Root Cause: All pages point canonical to root
   - Effort: Low (code fix in layout)
   - Impact: High - locale pages won't rank properly

3. **🟡 MEDIUM - Missing x-default hreflang**
   - Root Cause: Incomplete hreflang implementation
   - Effort: Low (one line addition)
   - Impact: Medium - affects geo-targeting

4. **🟡 MEDIUM - English title not localized**
   - Root Cause: i18n issue with meta tags
   - Effort: Low (translation + i18n config)
   - Impact: Medium - affects English market CTR

5. **🔴 HIGH - No content pages exist**
   - Root Cause: Blog/content sections not implemented
   - Effort: High (requires content strategy)
   - Impact: Critical - no keyword targeting possible

## Comparison with Subtask 1-1 Findings

| Issue | Subtask 1-1 | Subtask 1-2 | Combined Impact |
|-------|-------------|-------------|-----------------|
| robots.txt missing | ❌ Critical | Contributes to low indexing | 🔴 High |
| sitemap.xml missing | ❌ Critical | Contributes to low indexing | 🔴 High |
| Canonical URLs | ✅ (homepage only) | ⚠️ Misconfigured for locales | 🔴 High |
| Meta robots | ✅ Pass | ✅ Pass | ✅ OK |
| Content pages | N/A | ❌ Don't exist | 🔴 Critical |

## Priority Actions for Solo Founder

| # | Action | Effort | Expected Impact |
|---|--------|--------|-----------------|
| 1 | Fix canonical URLs for locale pages | 30 mins | Fix hreflang/canonical conflict |
| 2 | Add x-default hreflang | 15 mins | Improve geo-targeting |
| 3 | Localize English title tag | 30 mins | Improve English market CTR |
| 4 | Create robots.txt + sitemap.xml | 2 hrs | Enable proper crawling |
| 5 | Build blog section with content | 2-4 weeks | Enable keyword targeting |

## Technical Implementation Guide

### Fix 1: Canonical URLs (app/layout.tsx or generateMetadata)

```typescript
// In generateMetadata function
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const baseUrl = 'https://selfrules.org';

  return {
    // ... other metadata
    alternates: {
      canonical: `${baseUrl}/${locale}`, // Self-referencing canonical
      languages: {
        'it-IT': `${baseUrl}/it`,
        'en-US': `${baseUrl}/en`,
        'x-default': `${baseUrl}/en`, // Add x-default
      },
    },
  };
}
```

### Fix 2: Localized Title Tags

```typescript
// In messages/en.json
{
  "metadata": {
    "title": "Mattia De Luca - The PM you call when everyone says 'yes' but no one knows what to do"
  }
}
```

## Verification Method

This assessment was performed using:
- WebSearch: `site:selfrules.org` (returned 1 result)
- WebFetch analysis of https://selfrules.org (200 OK)
- WebFetch analysis of https://selfrules.org/en (200 OK)
- WebFetch analysis of https://selfrules.org/it (200 OK)
- WebFetch analysis of /blog, /en/blog, /it/blog (all 404)
- WebFetch analysis of /it/design-system (404)

---

**Previous Subtask:** subtask-1-1 (Crawlability Assessment)
**Next Subtask:** subtask-1-3 (Core Web Vitals Analysis)
