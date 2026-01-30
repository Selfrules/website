# Robots.txt Audit Report

**Audit Date:** 2026-01-26
**Production URL:** https://selfrules.org
**Status:** ❌ CRITICAL - MISSING (404 Not Found)

---

## Executive Summary

The robots.txt file is **completely missing** from the production site, returning a 404 Not Found error. This represents a critical technical SEO issue that impacts crawl budget optimization, search engine guidance, and AI crawler management.

---

## Test Results

### Endpoint Verification

```bash
$ curl -I https://selfrules.org/robots.txt
HTTP/2 404
```

| Test | URL | Expected | Actual | Status |
|------|-----|----------|--------|--------|
| HTTP Request | `https://selfrules.org/robots.txt` | 200 OK | **404 Not Found** | FAIL |
| Content-Type | - | text/plain | N/A | FAIL |
| File Content | - | robots.txt directives | Empty/404 page | FAIL |

### Codebase Analysis

| Check | File Location | Status | Details |
|-------|---------------|--------|---------|
| Dynamic robots.ts | `/app/robots.ts` | **NOT FOUND** | No Next.js MetadataRoute file exists |
| Static robots.txt | `/public/robots.txt` | **NOT FOUND** | No static file in public directory |
| Middleware Exclusion | `/middleware.ts:34` | ✅ CONFIGURED | robots.txt excluded from i18n redirect |
| Page-Level robots | `/app/layout.tsx:65-68` | ✅ EXISTS | Has `robots: { index: true, follow: true }` |

**Middleware Configuration (Correct):**
```typescript
// middleware.ts:34
'/((?!api|_next/static|_next/image|icon|apple-icon|manifest.json|favicon.ico|robots.txt|sitemap.xml).*)',
```

The middleware correctly excludes robots.txt from locale processing, but the file itself doesn't exist.

---

## Impact Assessment

### SEO Impact: CRITICAL

| Impact Area | Severity | Description |
|-------------|----------|-------------|
| Crawl Budget | HIGH | Search engines have no guidance on what to crawl/avoid |
| API Protection | HIGH | `/api/*` routes are not blocked from crawling |
| Sitemap Discovery | HIGH | No sitemap reference for search engines |
| AI Crawler Management | MEDIUM | No crawl delay or specific rules for AI bots |
| Internal Pages | MEDIUM | Admin/internal pages not protected from indexing |
| Duplicate Content | LOW | No canonical guidance at robots level |

### Business Impact

1. **Wasted Crawl Budget**
   - Googlebot may waste resources crawling `/api/*` endpoints
   - Internal tool pages may be crawled unnecessarily
   - Reduced crawl frequency for valuable content

2. **Potential Privacy/Security Exposure**
   - API endpoints discoverable via Google
   - Admin routes could appear in search results
   - No control over what AI systems ingest

3. **Search Engine Trust Signals**
   - Missing robots.txt is a negative technical SEO signal
   - Indicates incomplete site configuration
   - May affect crawl priority algorithms

---

## Current vs Expected Configuration

### Current State

```
# https://selfrules.org/robots.txt
# STATUS: 404 Not Found - File does not exist
```

### Expected robots.txt

```txt
# Robots.txt for selfrules.org
# Generated dynamically via Next.js MetadataRoute

# Default rules for all crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /demo/
Disallow: /design-system/

# AI Crawler specific rules (good citizenship)
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Amazonbot
User-agent: anthropic-ai
Allow: /
Crawl-delay: 2

# Sitemap reference
Sitemap: https://selfrules.org/sitemap.xml
Host: https://selfrules.org
```

---

## Detailed Findings

### 1. Missing File - Critical

**Finding:** No robots.txt file exists (404 response)

**Evidence:**
```bash
$ curl -I https://selfrules.org/robots.txt
HTTP/2 404
```

**Impact:** HIGH - Search engines and crawlers have no guidance

**Recommendation:** Create `/app/robots.ts` using Next.js MetadataRoute

---

### 2. Unprotected API Routes - High

**Finding:** `/api/*` endpoints are not blocked from crawling

**Site API Routes Identified:**
| Route | Purpose | Should Block |
|-------|---------|--------------|
| `/api/chat` | AI chatbot endpoint | YES |
| `/api/availability` | Calendar availability | YES |
| `/api/analytics` | Analytics tracking | YES |

**Impact:**
- API routes may appear in search results
- Crawl budget wasted on non-content URLs
- Potential exposure of endpoint structure

**Recommendation:** Add `Disallow: /api/` to robots.txt

---

### 3. Missing Sitemap Reference - High

**Finding:** No sitemap URL referenced in robots.txt

**Impact:**
- Search engines rely on auto-discovery or Search Console submission
- Slower sitemap discovery
- Reduced crawl efficiency

**Recommendation:** Add `Sitemap: https://selfrules.org/sitemap.xml` directive

---

### 4. No AI Crawler Management - Medium

**Finding:** No specific rules for AI/LLM crawlers

**Known AI Crawlers:**
| User-Agent | Company | Behavior |
|------------|---------|----------|
| GPTBot | OpenAI | Content ingestion |
| ClaudeBot | Anthropic | Content ingestion |
| PerplexityBot | Perplexity | Real-time search |
| Amazonbot | Amazon | Alexa/product search |
| CCBot | Common Crawl | Dataset collection |

**Impact:**
- No control over AI content ingestion
- No crawl delay for resource-intensive bots
- Cannot opt-out of specific AI training if desired

**Recommendation:** Add specific User-agent rules for AI crawlers with appropriate crawl delays

---

### 5. Internal/Development Pages - Medium

**Finding:** Development pages are not blocked

**Pages to Consider Blocking:**
| URL | Type | Recommendation |
|-----|------|----------------|
| `/design-system` | Internal documentation | Consider blocking |
| `/demo` | Development testing | Block |
| `/_next/static/` | Build artifacts | Block |

**Recommendation:** Add `Disallow` rules for internal pages

---

### 6. No Host Directive - Low

**Finding:** Missing Host directive for canonical domain

**Impact:** Minor - helps with domain consolidation

**Recommendation:** Add `Host: https://selfrules.org`

---

## Compliance Checklist

| Standard Practice | Status | Priority |
|-------------------|--------|----------|
| robots.txt exists and returns 200 | ❌ FAIL | Critical |
| Valid text/plain content type | ❌ N/A | Critical |
| User-agent directive present | ❌ FAIL | Critical |
| Allow directive for public content | ❌ FAIL | High |
| Disallow for API routes | ❌ FAIL | High |
| Disallow for admin routes | ❌ FAIL | High |
| Sitemap reference | ❌ FAIL | High |
| Host directive | ❌ FAIL | Low |
| Crawl-delay for aggressive bots | ❌ FAIL | Medium |
| AI crawler management | ❌ FAIL | Medium |
| File size under 500KB | ✅ N/A | Info |
| UTF-8 encoding | ❌ N/A | Info |

---

## Recommended Implementation

### Next.js MetadataRoute Solution

Create `/app/robots.ts`:

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://selfrules.org';

  return {
    rules: [
      {
        // Default rules for all crawlers
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/demo/',
        ],
      },
      {
        // AI crawlers with rate limiting
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'Amazonbot',
          'anthropic-ai',
          'CCBot',
        ],
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
```

### Why Dynamic vs Static?

| Aspect | Static (`/public/robots.txt`) | Dynamic (`/app/robots.ts`) |
|--------|-------------------------------|----------------------------|
| Type Safety | ❌ Plain text | ✅ TypeScript validation |
| Environment Aware | ❌ Hardcoded | ✅ Can use env vars |
| Maintainability | ❌ Manual updates | ✅ Code-based |
| Next.js Integration | ❌ Separate file | ✅ Native MetadataRoute |
| Build Validation | ❌ None | ✅ Type checking |

**Recommendation:** Use dynamic `/app/robots.ts` for type safety and maintainability

---

## Verification Commands

### After Implementation

```bash
# 1. Verify robots.txt endpoint (should return 200)
curl -I https://selfrules.org/robots.txt

# Expected:
# HTTP/2 200
# content-type: text/plain

# 2. Check content
curl https://selfrules.org/robots.txt

# Expected output:
# User-agent: *
# Allow: /
# Disallow: /api/
# ...

# 3. Validate with Google
# Use: https://www.google.com/webmasters/tools/robots-testing-tool

# 4. Test specific URL against rules
# https://technicalseo.com/tools/robots-txt/
```

---

## Related Audit Findings

| Related Audit | File | Key Finding |
|---------------|------|-------------|
| Sitemap Audit | `audit/sitemap-audit.md` | sitemap.xml also returns 404 |
| Meta Tags Audit | `audit/meta-tags-audit.md` | Page-level robots meta tag exists |
| Lighthouse | `audit/lighthouse-*.json` | SEO score impacted (92/100) |

---

## Existing Backlog Reference

**Story:** [SEO-001] Implementare robots.txt e sitemap.xml dinamico
**Location:** `.backlog/epics/09-seo-optimization/stories/SEO-001-robots-sitemap.md`
**Status:** 📋 Not Started
**Priority:** 🔴 Critical

The implementation requirements are already documented in the backlog. This audit validates and reinforces the critical priority of this story.

---

## Priority Ranking

| # | Issue | SEO Impact | Effort | Priority |
|---|-------|------------|--------|----------|
| 1 | Create robots.txt file | Critical | Low | P0 |
| 2 | Block /api/* routes | High | Low | P0 |
| 3 | Add sitemap reference | High | Low | P0 |
| 4 | Block internal pages | Medium | Low | P1 |
| 5 | Add AI crawler rules | Medium | Low | P1 |
| 6 | Add Host directive | Low | Low | P2 |

---

## Conclusion

The absence of robots.txt is a **critical technical SEO gap** that should be addressed immediately. While modern search engines can crawl sites without robots.txt, the file is essential for:

1. **Crawl Budget Optimization** - Prevent wasting resources on API routes
2. **Security Boundaries** - Keep admin/internal pages out of search results
3. **AI Crawler Management** - Control how AI systems interact with your content
4. **Professional Standards** - Signals a well-configured, trustworthy site

### Immediate Action Required

1. Implement `/app/robots.ts` using Next.js MetadataRoute (estimated: 30 minutes)
2. Deploy to production
3. Verify via Google Search Console robots.txt tester
4. Monitor crawl stats for improved efficiency

### Expected Outcome After Fix

| Metric | Before | After |
|--------|--------|-------|
| robots.txt Status | 404 | 200 |
| Lighthouse SEO Score | 92 | 95+ |
| API Route Crawling | Uncontrolled | Blocked |
| Sitemap Discovery | Manual only | Automatic |

---

**Recommendation:** Implement robots.txt as highest priority SEO fix, alongside the missing sitemap.xml file (see `audit/sitemap-audit.md`).
