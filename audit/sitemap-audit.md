# Sitemap.xml Audit Report

**Audit Date:** 2026-01-26
**Production URL:** https://selfrules.org
**Status:** CRITICAL - MISSING

---

## Executive Summary

The sitemap.xml file is **completely missing** from the production site, returning a 404 Not Found error. This is a critical technical SEO issue that impacts search engine crawlability and indexation efficiency.

---

## Test Results

### Endpoint Test

| Test | URL | Result |
|------|-----|--------|
| Sitemap.xml | `https://selfrules.org/sitemap.xml` | **404 Not Found** |
| HTTP Status | - | FAIL |
| XML Validity | - | N/A (file missing) |
| Content | - | N/A (file missing) |

### Codebase Analysis

| Check | Status | Details |
|-------|--------|---------|
| `sitemap.xml` static file | NOT FOUND | No file in `/public/sitemap.xml` |
| `sitemap.ts` dynamic generator | NOT FOUND | No `app/sitemap.ts` file |
| Middleware exclusion | CONFIGURED | Sitemap excluded from i18n middleware (correct) |
| Route configuration | MISSING | No sitemap route defined |

---

## Site Structure Analysis

### Crawlable Pages (Should Be In Sitemap)

Based on the app router structure and i18n configuration:

#### Public Pages

| URL | Type | Priority | Change Frequency |
|-----|------|----------|------------------|
| `https://selfrules.org/en` | Homepage (EN) | 1.0 | weekly |
| `https://selfrules.org/it` | Homepage (IT) | 1.0 | weekly |
| `https://selfrules.org/design-system` | Design System | 0.3 | monthly |
| `https://selfrules.org/demo` | Demo Page | 0.3 | monthly |

#### Future Pages (From Backlog)

| URL Pattern | Type | Notes |
|-------------|------|-------|
| `https://selfrules.org/[locale]/blog` | Blog Index | EPIC-006 planned |
| `https://selfrules.org/[locale]/blog/[slug]` | Blog Posts | EPIC-006 planned |

### Pages to Exclude (Not for Indexing)

| URL Pattern | Reason |
|-------------|--------|
| `/api/*` | API routes |
| `/_next/*` | Next.js internal |
| `/demo` | Development/testing page |

---

## Expected Sitemap Format

A properly formatted sitemap.xml should look like:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Italian Homepage -->
  <url>
    <loc>https://selfrules.org/it</loc>
    <lastmod>2026-01-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="it" href="https://selfrules.org/it"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://selfrules.org/en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://selfrules.org/it"/>
  </url>

  <!-- English Homepage -->
  <url>
    <loc>https://selfrules.org/en</loc>
    <lastmod>2026-01-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="it" href="https://selfrules.org/it"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://selfrules.org/en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://selfrules.org/it"/>
  </url>

  <!-- Design System (locale-independent) -->
  <url>
    <loc>https://selfrules.org/design-system</loc>
    <lastmod>2026-01-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>
```

---

## Compliance Checklist

| Requirement | Status | Notes |
|-------------|--------|-------|
| Sitemap exists | FAIL | Returns 404 |
| Valid XML format | N/A | No file to validate |
| URL count | N/A | Should have 3-4 URLs minimum |
| Lastmod dates | N/A | Should use ISO 8601 format |
| Change frequency | N/A | Recommended but optional |
| Priority values | N/A | 0.0-1.0 range |
| Hreflang for i18n | N/A | Required for multilingual sites |
| Under 50MB limit | N/A | N/A for missing file |
| Under 50,000 URLs | N/A | N/A for missing file |
| UTF-8 encoding | N/A | Required |
| Referenced in robots.txt | FAIL | robots.txt also missing (404) |
| Submitted to Search Console | UNKNOWN | Cannot verify without access |

---

## SEO Impact Assessment

### Critical Issues

1. **Missing Sitemap = Reduced Crawl Efficiency**
   - Search engines cannot efficiently discover all pages
   - New content may take longer to be indexed
   - Multilingual alternate versions may not be properly linked

2. **Hreflang Implementation Gap**
   - Without sitemap hreflang tags, search engines rely solely on HTML headers
   - Potential for incorrect language versions appearing in search results

3. **Combined with Missing robots.txt**
   - Both sitemap.xml AND robots.txt return 404
   - Complete absence of crawling guidance for search engines

### Impact Score

| Factor | Impact Level | SEO Weight |
|--------|--------------|------------|
| Crawlability | HIGH | Critical |
| Index Coverage | MEDIUM | Important |
| Hreflang Support | MEDIUM | Important |
| Fresh Content Discovery | MEDIUM | Important |

**Overall SEO Impact:** HIGH - Should be fixed immediately

---

## Recommendations

### Immediate Fix (Priority: Critical)

Create a dynamic sitemap using Next.js 14 App Router:

**File:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://selfrules.org';
  const locales = ['it', 'en'];
  const lastModified = new Date();

  // Homepage URLs with alternates
  const homepages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
    alternates: {
      languages: {
        it: `${baseUrl}/it`,
        en: `${baseUrl}/en`,
      },
    },
  }));

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/design-system`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [...homepages, ...staticPages];
}
```

### Additional Recommendations

1. **Submit to Google Search Console**
   - After creating sitemap, submit via Search Console
   - Monitor index coverage reports

2. **Add Sitemap Reference to robots.txt**
   - Once robots.txt is created, add:
   ```
   Sitemap: https://selfrules.org/sitemap.xml
   ```

3. **Implement Dynamic Blog Sitemap**
   - When blog feature is implemented (EPIC-006)
   - Create separate `app/blog/sitemap.ts` for blog posts
   - Use sitemap index for multiple sitemaps

4. **Set Up Automated Monitoring**
   - Add sitemap.xml endpoint to uptime monitoring
   - Validate XML format in CI/CD pipeline

---

## Verification Commands

```bash
# Test sitemap endpoint (currently fails)
curl -I https://selfrules.org/sitemap.xml

# Expected after fix:
# HTTP/2 200
# content-type: application/xml

# Validate XML format
curl https://selfrules.org/sitemap.xml | xmllint --format -

# Check sitemap URL count
curl -s https://selfrules.org/sitemap.xml | grep -c "<url>"
```

---

## Related Audit Findings

- **robots.txt Audit:** Also returns 404 (separate audit required)
- **Meta Tags Audit:** See `audit/meta-tags-audit.md`
- **Structured Data Audit:** See `audit/structured-data-audit.md`

---

## Conclusion

The absence of sitemap.xml is a **critical technical SEO gap** that should be addressed immediately. With only 3-4 pages currently, a sitemap provides marginal benefit for a site this small, but it's essential for:

1. Proper hreflang implementation for multilingual support
2. Signaling update frequency to search engines
3. Future scalability when blog content is added
4. Best practices compliance for technical SEO

**Recommendation:** Implement Next.js dynamic sitemap as highest priority SEO fix, alongside the missing robots.txt file.
