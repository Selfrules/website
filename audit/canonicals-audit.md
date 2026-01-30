# Canonical URLs & Hreflang Tags Audit Report

**Site:** https://selfrules.org
**Audit Date:** 2026-01-26
**Auditor:** Auto-Claude Technical SEO Audit
**Focus:** i18n Implementation for Italian (it) and English (en)

---

## Executive Summary

| Category | Status | Score |
|----------|--------|-------|
| Canonical URL Configuration | ⚠️ Partial | 60% |
| Hreflang Meta Tags | ⚠️ Partial | 55% |
| Sitemap Hreflang Integration | ❌ Missing | 0% |
| Middleware i18n Handling | ✅ Good | 85% |
| X-Default Implementation | ❌ Missing | 0% |
| **Overall i18n SEO Score** | **⚠️ Needs Work** | **40%** |

---

## i18n Configuration Overview

### Supported Locales

| Locale | Code | Status | Default |
|--------|------|--------|---------|
| Italian | `it` | ✅ Active | ✅ Yes |
| English | `en` | ✅ Active | No |

### Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| `i18n.ts` | Root i18n config with next-intl | ✅ Configured |
| `lib/i18n.ts` | Locale exports | ✅ Configured |
| `middleware.ts` | Locale routing | ✅ Configured |
| `app/layout.tsx` | Root metadata with alternates | ⚠️ Partial |
| `app/[locale]/layout.tsx` | Locale-specific layout | ❌ Missing metadata |
| `app/[locale]/page.tsx` | Homepage metadata | ❌ Missing alternates |

---

## Current Implementation Analysis

### 1. Root Layout (`app/layout.tsx`)

**Current Configuration:**

```typescript
alternates: {
  canonical: '/',
  languages: {
    'it-IT': '/it',
    'en-US': '/en',
  },
},
```

#### Issues Identified

| Issue | Severity | Details |
|-------|----------|---------|
| Relative canonical URL | 🟠 Medium | Uses `/` instead of absolute URL |
| Missing x-default | 🔴 High | No x-default hreflang specified |
| Language code format | 🟡 Low | Uses `it-IT` format (valid but inconsistent with ISO 639-1) |
| Root path canonical | 🔴 High | Canonical `/` doesn't match actual URLs (`/it`, `/en`) |

#### What Gets Rendered

Based on Next.js metadata API, the root layout generates:

```html
<link rel="canonical" href="https://selfrules.org/" />
<link rel="alternate" hreflang="it-IT" href="https://selfrules.org/it" />
<link rel="alternate" hreflang="en-US" href="https://selfrules.org/en" />
```

#### Problems

1. **Canonical mismatch:** Root canonical `/` doesn't exist (redirects to `/it`)
2. **Missing x-default:** Search engines don't know the default language version
3. **No per-page overrides:** All pages inherit root canonical

---

### 2. Middleware i18n Handling (`middleware.ts`)

**Current Configuration:**

```typescript
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});
```

#### Analysis

| Setting | Value | Impact |
|---------|-------|--------|
| `localePrefix` | `always` | ✅ URLs always include locale prefix (`/it`, `/en`) |
| `localeDetection` | `true` | ⚠️ May redirect users based on browser language |
| `defaultLocale` | `it` | ✅ Italian is default |

#### URL Behavior

| Request | Redirect/Result | Notes |
|---------|-----------------|-------|
| `/` | → `/it` (redirect) | Default locale redirect |
| `/it` | Serve Italian | ✅ Correct |
| `/en` | Serve English | ✅ Correct |
| `/design-system` | Serve directly | Excluded from i18n |

---

### 3. Homepage Metadata (`app/[locale]/page.tsx`)

**Current Configuration:**

```typescript
export const metadata: Metadata = {
  title: 'Mattia De Luca - Il PM che chiami...',
  description: 'Perché dopo 13 anni...',
  openGraph: {
    title: 'Ho fallito come designer...',
    description: '4 anni design...',
    type: 'website',
  },
};
```

#### Missing Elements

| Element | Status | Impact |
|---------|--------|--------|
| Locale-specific canonical | ❌ Missing | Pages don't have correct canonical URLs |
| Locale-specific alternates | ❌ Missing | No hreflang at page level |
| Dynamic metadata generation | ❌ Missing | Should use `generateMetadata()` |

---

### 4. Locale Layout (`app/[locale]/layout.tsx`)

**Status:** ❌ No metadata configuration

The locale layout only handles:
- NextIntlClientProvider
- Header/Footer
- Analytics

It does **not** configure any locale-specific metadata or alternates.

---

## Expected vs Actual HTML Output

### Expected Hreflang for `/it` Page

```html
<link rel="canonical" href="https://selfrules.org/it" />
<link rel="alternate" hreflang="it" href="https://selfrules.org/it" />
<link rel="alternate" hreflang="en" href="https://selfrules.org/en" />
<link rel="alternate" hreflang="x-default" href="https://selfrules.org/it" />
```

### Expected Hreflang for `/en` Page

```html
<link rel="canonical" href="https://selfrules.org/en" />
<link rel="alternate" hreflang="it" href="https://selfrules.org/it" />
<link rel="alternate" hreflang="en" href="https://selfrules.org/en" />
<link rel="alternate" hreflang="x-default" href="https://selfrules.org/it" />
```

### Actual Output (Based on Code Analysis)

```html
<!-- From root layout - same for all pages -->
<link rel="canonical" href="https://selfrules.org/" />
<link rel="alternate" hreflang="it-IT" href="https://selfrules.org/it" />
<link rel="alternate" hreflang="en-US" href="https://selfrules.org/en" />
```

---

## Compliance Checklist

### Google's Hreflang Guidelines

| Requirement | Status | Details |
|-------------|--------|---------|
| Self-referencing hreflang | ⚠️ Partial | Present but with wrong URL |
| Bidirectional hreflang | ✅ Pass | Both locales reference each other |
| x-default for default version | ❌ Fail | Not implemented |
| Canonical matches hreflang | ❌ Fail | Canonical is `/`, hreflang points to `/it`, `/en` |
| Valid ISO 639-1 language codes | ⚠️ Partial | Using `it-IT` instead of `it` |
| Absolute URLs in hreflang | ✅ Pass | Uses metadataBase |

### SEO Best Practices

| Practice | Status | Notes |
|----------|--------|-------|
| One canonical per page | ⚠️ Partial | Same canonical inherited everywhere |
| Canonical = preferred URL | ❌ Fail | `/` doesn't exist (redirects) |
| Hreflang in HTML head | ⚠️ Partial | Present but incomplete |
| Hreflang in sitemap | ❌ Fail | Sitemap doesn't exist |
| Hreflang in HTTP headers | ⏭️ Not Required | HTML method sufficient |

---

## Page-by-Page Analysis

### 1. Italian Homepage (`/it`)

| Element | Expected | Actual | Status |
|---------|----------|--------|--------|
| Canonical | `https://selfrules.org/it` | `https://selfrules.org/` | ❌ Wrong |
| hreflang="it" | `https://selfrules.org/it` | `/it` (via root) | ✅ OK |
| hreflang="en" | `https://selfrules.org/en` | `/en` (via root) | ✅ OK |
| hreflang="x-default" | `https://selfrules.org/it` | Missing | ❌ Missing |

### 2. English Homepage (`/en`)

| Element | Expected | Actual | Status |
|---------|----------|--------|--------|
| Canonical | `https://selfrules.org/en` | `https://selfrules.org/` | ❌ Wrong |
| hreflang="it" | `https://selfrules.org/it` | `/it` (via root) | ✅ OK |
| hreflang="en" | `https://selfrules.org/en` | `/en` (via root) | ✅ OK |
| hreflang="x-default" | `https://selfrules.org/it` | Missing | ❌ Missing |

### 3. Design System (`/design-system`)

| Element | Expected | Actual | Status |
|---------|----------|--------|--------|
| Canonical | `https://selfrules.org/design-system` | `https://selfrules.org/` | ❌ Wrong |
| hreflang | Not needed (single language) | Present (inherited) | ⚠️ Unnecessary |

---

## SEO Impact Assessment

### Current Issues Impact

| Issue | SEO Impact | Risk Level |
|-------|------------|------------|
| Wrong canonical URL | Search engines may index wrong URL | 🔴 High |
| Missing x-default | Users may see wrong language version in SERPs | 🔴 High |
| Inconsistent language codes | Minor confusion for search engines | 🟡 Low |
| No sitemap hreflang | Duplicate effort needed in HTML | 🟠 Medium |

### Potential Consequences

1. **Duplicate content signals:** Search engines may see `/` and `/it` as duplicates
2. **Wrong SERP language:** Users may click Italian results expecting English (or vice versa)
3. **Crawl budget waste:** Search engines crawling non-existent `/` URL
4. **Ranking dilution:** Link equity split between `/` and locale URLs

---

## Recommendations

### 🔴 Critical Priority (Fix Immediately)

#### 1. Fix Locale-Specific Canonical URLs

**File:** `app/[locale]/layout.tsx`

Add `generateMetadata` function:

```typescript
import { Metadata } from 'next';
import { locales, defaultLocale } from '@/lib/i18n';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseUrl = 'https://selfrules.org';

  // Create alternates object with x-default
  const alternates: Metadata['alternates'] = {
    canonical: `${baseUrl}/${params.locale}`,
    languages: {
      'it': `${baseUrl}/it`,
      'en': `${baseUrl}/en`,
      'x-default': `${baseUrl}/${defaultLocale}`,
    },
  };

  return {
    alternates,
  };
}
```

#### 2. Add x-default Hreflang

Update alternates to include x-default pointing to Italian (default locale):

```typescript
languages: {
  'it': `${baseUrl}/it`,
  'en': `${baseUrl}/en`,
  'x-default': `${baseUrl}/it`,
},
```

#### 3. Update Root Layout Alternates

**File:** `app/layout.tsx`

Change from:

```typescript
alternates: {
  canonical: '/',
  languages: {
    'it-IT': '/it',
    'en-US': '/en',
  },
},
```

To:

```typescript
alternates: {
  canonical: 'https://selfrules.org/it',
  languages: {
    'it': 'https://selfrules.org/it',
    'en': 'https://selfrules.org/en',
    'x-default': 'https://selfrules.org/it',
  },
},
```

### 🟠 High Priority (Fix This Week)

#### 4. Create Dynamic Sitemap with Hreflang

**File:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

const baseUrl = 'https://selfrules.org';
const locales = ['it', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate localized homepage entries
  const homepages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${baseUrl}/${l}`]),
        ['x-default', `${baseUrl}/it`],
      ]),
    },
  }));

  // Non-localized pages
  const staticPages = [
    {
      url: `${baseUrl}/design-system`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [...homepages, ...staticPages];
}
```

### 🟡 Medium Priority (Fix This Month)

#### 5. Use Consistent Language Code Format

Standardize on ISO 639-1 (2-letter codes):
- Use `it` instead of `it-IT`
- Use `en` instead of `en-US`

Or use full BCP 47 format consistently:
- Use `it-IT` everywhere if regional targeting needed
- Use `en-US` everywhere if regional targeting needed

#### 6. Handle Design System Page

Since `/design-system` is excluded from i18n middleware, it should have:
- Its own canonical (not inherited from root)
- No hreflang tags (single-language page)

Add layout or page-level metadata:

```typescript
// app/design-system/layout.tsx
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://selfrules.org/design-system',
    // No languages - this is a single-language page
  },
};
```

---

## Verification Commands

```bash
# Check canonical and hreflang tags on live site
curl -s https://selfrules.org/it | grep -E "canonical|hreflang"

# Validate hreflang implementation
# Use: https://technicalseo.com/tools/hreflang/

# Check Google Search Console
# Navigate to: Search Console > Enhancements > International Targeting

# Test with Google's URL Inspection Tool
# Submit: https://selfrules.org/it and https://selfrules.org/en
```

---

## Implementation Checklist

### Immediate Fixes

- [ ] Add `generateMetadata` to `app/[locale]/layout.tsx`
- [ ] Set locale-specific canonical URLs
- [ ] Add `x-default` hreflang pointing to `/it`
- [ ] Update root layout alternates to absolute URLs
- [ ] Standardize language codes (choose `it` or `it-IT`)

### After Sitemap Creation

- [ ] Add hreflang to sitemap entries
- [ ] Include x-default in sitemap
- [ ] Submit updated sitemap to Search Console

### Validation

- [ ] Test `/it` page canonical and hreflang
- [ ] Test `/en` page canonical and hreflang
- [ ] Verify `/design-system` has correct canonical
- [ ] Run hreflang validator tool
- [ ] Check Search Console international targeting

---

## Related Audit Documents

- **Sitemap Audit:** `audit/sitemap-audit.md` (sitemap missing - creates hreflang gap)
- **Meta Tags Audit:** `audit/meta-tags-audit.md` (overlapping canonical issues)
- **Robots Audit:** `audit/robots-audit.md` (crawl rules for localized content)

---

## Conclusion

The current i18n SEO implementation is **partially configured** but has significant gaps:

1. **Canonical URLs are incorrect** - All pages inherit `/` as canonical, which redirects
2. **x-default is missing** - Critical for proper language targeting
3. **No sitemap hreflang** - Sitemap doesn't exist, so no backup hreflang source
4. **Inconsistent language codes** - Mix of `it-IT` and `it` formats

**Priority recommendation:** Fix the canonical URLs and add x-default as the highest priority, as these directly impact which language version Google shows in search results for users in different regions.

The middleware and locale routing are well-configured, so the fix primarily involves updating the metadata configuration in the locale layout and ensuring each page generates the correct canonical for its locale.

---

*Report generated by Auto-Claude Technical SEO Audit*
