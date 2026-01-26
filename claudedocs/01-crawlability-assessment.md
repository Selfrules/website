# Crawlability Assessment - selfrules.org

**Audit Date:** 2026-01-26
**Subtask ID:** subtask-1-1 (Technical SEO Audit - Phase 1)

## Executive Summary

selfrules.org has **critical crawlability issues** - both `robots.txt` and `sitemap.xml` are missing (404 errors). However, the site is properly configured to allow indexing via meta tags.

## Technical Health

| Metric | Status | Priority |
|--------|--------|----------|
| robots.txt | ❌ Missing (404) | 🔴 High |
| sitemap.xml | ❌ Missing (404) | 🔴 High |
| Meta robots tag | ✅ Present (index, follow) | ✅ Pass |
| Canonical URL | ✅ Correctly implemented | ✅ Pass |
| Hreflang tags | ✅ Present (it-IT, en-US) | ✅ Pass |
| X-Robots-Tag | ⚠️ Not detected | 🟡 Low |
| Page accessibility | ✅ HTTP 200 OK | ✅ Pass |

## Detailed Findings

### 1. robots.txt - MISSING ❌

**Status:** 404 Not Found at https://selfrules.org/robots.txt

**Impact:**
- Search engines cannot receive crawl directives
- No way to specify crawl-delay or block specific bot user-agents
- Sitemap location cannot be advertised to crawlers
- Loss of crawl budget optimization opportunity

**Recommendation:** Create a robots.txt file immediately.

```text
# robots.txt for selfrules.org
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://selfrules.org/sitemap.xml

# Crawl-delay (optional - useful for small servers)
# Crawl-delay: 1
```

### 2. sitemap.xml - MISSING ❌

**Status:** 404 Not Found at https://selfrules.org/sitemap.xml

**Impact:**
- Search engines cannot efficiently discover all pages
- No communication of page priority or update frequency
- Slower indexing of new content
- No ability to list blog posts, localized versions, or dynamic pages

**Recommendation:** Implement sitemap generation. For Next.js 14:
- Use next-sitemap package or
- Create app/sitemap.ts for dynamic generation

**Required sitemap elements:**
- Homepage (both locales: /it, /en)
- All blog posts with lastmod dates
- Design system page (if public)
- Any other public pages

### 3. Meta Robots Tag - PASS ✅

**Current Implementation:**
```html
<meta name="robots" content="index, follow">
```

**Assessment:** Correctly configured to allow indexing and link following.

### 4. Canonical URL - PASS ✅

**Current Implementation:**
```html
<link rel="canonical" href="https://selfrules.org">
```

**Assessment:** Properly self-referencing canonical URL prevents duplicate content issues.

### 5. Hreflang Tags - PASS ✅

**Current Implementation:**
```html
<link rel="alternate" hreflang="it-IT" href="https://selfrules.org/it">
<link rel="alternate" hreflang="en-US" href="https://selfrules.org/en">
```

**Assessment:** Correctly implemented for Italian and English locales. Google can properly serve localized versions.

### 6. X-Robots-Tag Header - NOT DETECTED ⚠️

**Status:** Not found in response (acceptable - meta tag is sufficient)

**Impact:** Low priority - meta robots tag achieves the same goal.

## Crawlability Score

| Category | Score | Max |
|----------|-------|-----|
| robots.txt | 0 | 20 |
| sitemap.xml | 0 | 20 |
| Meta directives | 20 | 20 |
| Canonical | 15 | 15 |
| Hreflang | 15 | 15 |
| Accessibility | 10 | 10 |
| **Total** | **60** | **100** |

## Critical Issues Identified

1. **🔴 HIGH - Missing robots.txt**
   - Effort: Low (30 mins)
   - Impact: High
   - Action: Create robots.txt in public/ directory

2. **🔴 HIGH - Missing sitemap.xml**
   - Effort: Medium (1-2 hours)
   - Impact: High
   - Action: Implement next-sitemap or app/sitemap.ts

## Priority Actions for Solo Founder

| # | Action | Effort | Expected Impact |
|---|--------|--------|-----------------|
| 1 | Create robots.txt | 30 mins | Immediate crawl optimization |
| 2 | Implement sitemap.xml | 1-2 hrs | Faster indexing, better discovery |
| 3 | Submit sitemap to Google Search Console | 15 mins | Accelerate indexing |

## Verification Method

This assessment was performed using:
- WebFetch analysis of https://selfrules.org/robots.txt (404)
- WebFetch analysis of https://selfrules.org/sitemap.xml (404)
- WebFetch analysis of https://selfrules.org (200 OK)
- Code inspection for local robots.txt/sitemap files (not found)

---

**Next Subtask:** subtask-1-2 (Check indexability via site: search)
