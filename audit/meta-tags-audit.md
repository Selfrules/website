# Meta Tags Audit Report

**Site:** https://selfrules.org
**Audit Date:** 2026-01-26
**Auditor:** Auto-Claude Technical SEO Audit

---

## Executive Summary

| Category | Status | Score |
|----------|--------|-------|
| Title Tags | ✅ Good | 85% |
| Meta Descriptions | ✅ Good | 85% |
| Open Graph | ⚠️ Needs Work | 60% |
| Twitter Cards | ⚠️ Needs Work | 55% |
| Icons & Favicons | ✅ Excellent | 95% |
| PWA Manifest | ✅ Excellent | 90% |
| Robots/Sitemap | ❌ Critical | 0% |
| **Overall Score** | **⚠️ Needs Improvement** | **67%** |

---

## Page-by-Page Analysis

### 1. Root Layout (`app/layout.tsx`)

**Status:** ✅ Well Configured

#### Title Configuration
```typescript
title: {
  default: 'Mattia De Luca - Traduco tra business, design e codice quando il tuo team non si capisce',
  template: '%s | Mattia De Luca',
}
```
- **Length:** 86 characters (optimal: 50-60, acceptable: up to 70)
- **Issue:** Title exceeds recommended length - may be truncated in SERPs
- **Recommendation:** Shorten to ~55-60 characters for optimal display

#### Meta Description
```typescript
description: 'Ho fallito come designer. Poi come developer. Ora traduco quando designer dice "user journey", developer dice "technical debt", e business dice "fatturato". 13 anni di errori → 1 superpower: parlare tre lingue.'
```
- **Length:** 215 characters (optimal: 150-160)
- **Issue:** Description exceeds recommended length
- **Recommendation:** Shorten to 150-160 characters while maintaining key message

#### Keywords
```typescript
keywords: [
  'product manager translator',
  'PM che parla design e codice',
  'technical product manager',
  'cross-functional team communication',
  'product strategy pragmatico',
  'business design tech bridge',
  'PM con background design e sviluppo',
]
```
- **Status:** ✅ Good variety of Italian and English keywords
- **Note:** Keywords meta tag has minimal SEO impact but useful for internal tracking

#### Open Graph Tags
| Tag | Value | Status |
|-----|-------|--------|
| `og:type` | website | ✅ |
| `og:locale` | it_IT | ✅ |
| `og:alternateLocale` | en_US | ✅ |
| `og:url` | https://selfrules.org | ✅ |
| `og:site_name` | Mattia De Luca | ✅ |
| `og:title` | Ho fallito come designer e developer... | ✅ |
| `og:description` | 4 anni design. 4 anni dev... | ✅ |
| `og:image` | Not specified | ❌ **CRITICAL** |

#### Twitter Card Tags
| Tag | Value | Status |
|-----|-------|--------|
| `twitter:card` | summary_large_image | ✅ |
| `twitter:title` | Ho fallito come designer e developer... | ✅ |
| `twitter:description` | 13 anni di errori → 1 superpower... | ✅ |
| `twitter:creator` | @mattiadluca | ✅ |
| `twitter:image` | Not specified | ❌ **CRITICAL** |

#### Other Meta Tags
| Tag | Value | Status |
|-----|-------|--------|
| `metadataBase` | https://selfrules.org | ✅ |
| `robots` | index, follow | ✅ |
| `themeColor` | #0D7EFF | ✅ |
| `authors` | Mattia Filippo De Luca | ✅ |
| `creator` | Mattia Filippo De Luca | ✅ |
| `canonical` | / | ✅ |
| `alternates.languages` | it-IT, en-US | ✅ |

---

### 2. Homepage (`app/[locale]/page.tsx`)

**Status:** ⚠️ Partially Configured

#### Metadata Exported
```typescript
export const metadata: Metadata = {
  title: 'Mattia De Luca - Il PM che chiami quando tutti dicono "sì" ma nessuno sa cosa fare',
  description: 'Perché dopo 13 anni ho capito: il problema non è mai quello che ti dicono al primo meeting...',
  openGraph: {
    title: 'Ho fallito come designer. Poi come developer. Ora sono il PM che traduce tra i due.',
    description: '4 anni design. 4 anni dev. 5 anni PM...',
    type: 'website',
  },
};
```

#### Issues Identified
| Issue | Severity | Details |
|-------|----------|---------|
| Missing OG image | 🔴 High | No `og:image` specified for homepage |
| Missing Twitter overrides | 🟡 Medium | No page-specific Twitter card content |
| Missing canonical per locale | 🟡 Medium | Should have `/it` or `/en` canonical |
| Title length | 🟡 Medium | 82 chars - may truncate in SERPs |
| Description length | 🟡 Medium | 201 chars - exceeds optimal 160 |

---

### 3. Demo Page (`app/demo/page.tsx`)

**Status:** ❌ No SEO Configuration

#### Issues Identified
- **Client Component:** Uses `'use client'` directive
- **No metadata export:** Cannot export metadata from client components
- **No SEO:** Falls back to root layout defaults

#### Recommendation
If this page should be indexed:
1. Create a separate `app/demo/layout.tsx` with metadata
2. Or convert to server component with client component children

If this page should NOT be indexed (internal/dev page):
1. Add to `robots.txt` disallow rules
2. Or add `robots: { index: false, follow: false }` via layout

---

### 4. Design System Page (`app/design-system/page.tsx`)

**Status:** ❌ No SEO Configuration

#### Issues Identified
- **Client Component:** Uses `'use client'` directive
- **No metadata export:** Falls back to root layout
- **Rendered title:** "Neobrutalist design system" (h1) but not in meta

#### Recommendation
This appears to be an internal documentation page:
1. Should be excluded from search indexing
2. Add `robots: { index: false, follow: false }`
3. Or add to `robots.txt` disallow rules

---

### 5. Locale Layout (`app/[locale]/layout.tsx`)

**Status:** ⚠️ No metadata overrides

#### Issues
- No locale-specific metadata
- Relies entirely on root layout
- Missing hreflang implementation at page level

---

## Icons & Favicons Audit

### Files Present
| File | Size | Status |
|------|------|--------|
| `app/icon.svg` | any | ✅ SVG favicon |
| `app/icon.tsx` | 32x32 | ✅ PNG generator |
| `app/icon-192.tsx` | 192x192 | ✅ Android icon |
| `app/icon-512.tsx` | 512x512 | ✅ Large icon |
| `app/apple-icon.tsx` | 180x180 | ✅ iOS icon |

### Configuration in Layout
```typescript
icons: {
  icon: [
    { url: '/icon.svg', type: 'image/svg+xml' },
    { url: '/icon', sizes: '32x32', type: 'image/png' },
    { url: '/icon-192', sizes: '192x192', type: 'image/png' },
    { url: '/icon-512', sizes: '512x512', type: 'image/png' },
  ],
  apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  other: [{ rel: 'mask-icon', url: '/icon.svg', color: '#0D7EFF' }],
}
```

**Status:** ✅ Excellent - All sizes covered with dynamic generation

---

## PWA Manifest Audit (`app/manifest.json`)

| Field | Value | Status |
|-------|-------|--------|
| `name` | Mattia Filippo De Luca - Product Manager & Developer | ✅ |
| `short_name` | Mattia De Luca | ✅ |
| `description` | Product Manager che ha fallito... | ✅ |
| `start_url` | / | ✅ |
| `display` | standalone | ✅ |
| `background_color` | #FFFCF2 | ✅ |
| `theme_color` | #0D7EFF | ✅ |
| `orientation` | portrait-primary | ✅ |
| `icons` | 5 icons configured | ✅ |
| `categories` | business, productivity, portfolio | ✅ |
| `lang` | it-IT | ✅ |
| `screenshots` | [] (empty) | ⚠️ Optional |

**Status:** ✅ Well configured for PWA

---

## Critical Missing Files

### 1. robots.txt / app/robots.ts - ❌ CRITICAL

**Current Status:** Returns 404 on production
**Impact:** Search engines cannot determine crawling rules

**Required Implementation:**
```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/demo/', '/design-system/'],
    },
    sitemap: 'https://selfrules.org/sitemap.xml',
  };
}
```

### 2. sitemap.xml / app/sitemap.ts - ❌ CRITICAL

**Current Status:** Returns 404 on production
**Impact:** Search engines cannot discover all pages

**Required Implementation:**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://selfrules.org',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          it: 'https://selfrules.org/it',
          en: 'https://selfrules.org/en',
        },
      },
    },
    {
      url: 'https://selfrules.org/it',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://selfrules.org/en',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
```

### 3. Open Graph Image - ❌ HIGH PRIORITY

**Current Status:** No `og:image` defined
**Impact:** Social shares show no preview image

**Required Implementation:**
```typescript
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mattia De Luca - PM che traduce tra business, design e tech';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ /* neobrutalist design */ }}>
        {/* OG image content */}
      </div>
    ),
    { ...size }
  );
}
```

### 4. Twitter Image - ❌ HIGH PRIORITY

**Current Status:** No `twitter:image` defined
**Impact:** Twitter shares show no preview image

Can share the same image as OG or create separate:
```typescript
// app/twitter-image.tsx - can be identical to opengraph-image.tsx
```

---

## Recommendations by Priority

### 🔴 Critical (Fix Immediately)

1. **Create `app/robots.ts`**
   - Currently returning 404
   - Blocking proper search engine crawling

2. **Create `app/sitemap.ts`**
   - Currently returning 404
   - Search engines cannot discover pages

3. **Create `app/opengraph-image.tsx`**
   - Social shares have no preview
   - Major impact on click-through rates

### 🟠 High Priority (Fix This Week)

4. **Create `app/twitter-image.tsx`**
   - Twitter/X shares have no preview

5. **Shorten titles to 55-60 characters**
   - Current titles truncate in SERPs
   - Root: 86 chars → 55-60 chars
   - Homepage: 82 chars → 55-60 chars

6. **Shorten descriptions to 150-160 characters**
   - Current descriptions truncate
   - Maintain key value proposition

### 🟡 Medium Priority (Fix This Month)

7. **Add locale-specific canonical URLs**
   - `/it` pages should have canonical `/it`
   - `/en` pages should have canonical `/en`

8. **Add robots noindex to internal pages**
   - `/demo/` - development showcase
   - `/design-system/` - internal documentation

9. **Add structured data (JSON-LD)**
   - Person schema for portfolio
   - WebSite schema
   - Article schema for future blog

### 🟢 Low Priority (Nice to Have)

10. **Add PWA screenshots to manifest**
    - Improves install experience

11. **Add breadcrumb structured data**
    - Improves search appearance

---

## Social Preview Testing

### Tools to Verify Fixes
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **Meta Tag Checker:** https://metatags.io/

---

## Character Count Summary

| Element | Current | Optimal | Status |
|---------|---------|---------|--------|
| Root Title | 86 | 55-60 | ⚠️ Too long |
| Homepage Title | 82 | 55-60 | ⚠️ Too long |
| Root Description | 215 | 150-160 | ⚠️ Too long |
| Homepage Description | 201 | 150-160 | ⚠️ Too long |
| OG Title | 72 | 60-90 | ✅ Good |
| OG Description | 143 | 200 max | ✅ Good |
| Twitter Title | 68 | 70 max | ✅ Good |
| Twitter Description | 117 | 200 max | ✅ Good |

---

## Implementation Checklist

- [ ] Create `app/robots.ts` with proper rules
- [ ] Create `app/sitemap.ts` with all pages
- [ ] Create `app/opengraph-image.tsx` (1200x630)
- [ ] Create `app/twitter-image.tsx` (1200x630)
- [ ] Shorten root layout title
- [ ] Shorten root layout description
- [ ] Shorten homepage title
- [ ] Shorten homepage description
- [ ] Add noindex to /demo/ page
- [ ] Add noindex to /design-system/ page
- [ ] Test with social media debuggers
- [ ] Verify robots.txt accessibility
- [ ] Submit sitemap to Google Search Console

---

*Report generated by Auto-Claude Technical SEO Audit*
