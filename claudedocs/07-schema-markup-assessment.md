# Schema Markup Assessment

**Subtask**: 2-3
**Date**: 2026-01-26
**Status**: ✅ Complete

## Executive Summary

**Critical Finding**: selfrules.org has **ZERO structured data/JSON-LD implementation**. Despite having comprehensive HTML meta tags, the site lacks machine-readable schema markup, significantly impacting SEO visibility and rich snippet opportunities.

## Current Implementation Status

### Live Site Analysis

| Schema Type | Status | Implementation Location |
|-------------|--------|------------------------|
| Person | ❌ Not Implemented | N/A |
| Organization | ❌ Not Implemented | N/A |
| WebSite | ❌ Not Implemented | N/A |
| Article | ❌ Not Implemented | N/A |
| FAQ | ❌ Not Implemented | N/A |
| BreadcrumbList | ❌ Not Implemented | N/A |
| LocalBusiness | ❌ Not Implemented | N/A |
| Review/Testimonial | ❌ Not Implemented | N/A |

### Verification Methods Used

1. **Live Site Inspection**: WebFetch of https://selfrules.org - No `<script type="application/ld+json">` tags found
2. **Italian Homepage Check**: WebFetch of https://selfrules.org/it - Confirmed no structured data
3. **Codebase Grep**: `@type.*Person|Organization|FAQ|BreadcrumbList` - Only found in documentation/backlog files
4. **Component Search**: No `/components/structured-data/` directory exists
5. **Layout File Review**: `app/layout.tsx` and `app/[locale]/layout.tsx` contain no JSON-LD injection

## What Exists vs What's Missing

### ✅ Current Implementation (HTML Meta Tags)

The site has excellent traditional metadata:

```html
<!-- From app/layout.tsx -->
<title>Mattia De Luca - Traduco tra business, design e codice...</title>
<meta name="description" content="Ho fallito come designer..."/>
<meta name="keywords" content="product manager translator, PM che parla design e codice..."/>
<meta name="author" content="Mattia Filippo De Luca"/>
<meta property="og:title" content="Ho fallito come designer e developer..."/>
<meta name="twitter:card" content="summary_large_image"/>
<link rel="canonical" href="https://selfrules.org"/>
<link rel="alternate" hreflang="it-IT" href="/it"/>
<link rel="alternate" hreflang="en-US" href="/en"/>
```

### ❌ Missing Structured Data (JSON-LD)

**NONE of the following exist**:

#### 1. Person Schema (CRITICAL for Personal Brand)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mattia Filippo De Luca",
  "jobTitle": ["Product Manager", "Full-Stack Developer", "UX Designer"],
  "description": "Product Manager che traduce tra business, design e tech",
  "url": "https://selfrules.org",
  "sameAs": ["LinkedIn URL", "GitHub URL", "Twitter URL"],
  "knowsAbout": ["Product Management", "UX Design", "Full-Stack Development"]
}
```

#### 2. WebSite Schema (Required for Site Search)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mattia De Luca Portfolio",
  "url": "https://selfrules.org",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://selfrules.org/search?q={search_term_string}"
  }
}
```

#### 3. BreadcrumbList (Navigation Structure)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://selfrules.org" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://selfrules.org/blog" }
  ]
}
```

#### 4. Organization Schema (Brand Identity)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mattia De Luca Consulting",
  "url": "https://selfrules.org",
  "logo": "https://selfrules.org/logo.png",
  "founder": { "@type": "Person", "name": "Mattia De Luca" }
}
```

#### 5. FAQ Schema (If FAQ Content Exists)
Would enable rich FAQ snippets in Google search results.

#### 6. Article Schema (For Blog Posts)
Required for each blog post to enable article rich results.

## Rich Snippet Opportunities Lost

### Currently Missing Rich Results

| Rich Result Type | Schema Required | Opportunity Value |
|-----------------|-----------------|-------------------|
| **Knowledge Panel** | Person | 🔴 High - Would show Mattia in search sidebar |
| **Sitelinks Searchbox** | WebSite + SearchAction | 🟠 Medium - Enables in-SERP search |
| **Breadcrumbs** | BreadcrumbList | 🟡 Medium - Shows URL structure in SERP |
| **Article Rich Results** | Article | 🔴 High - Thumbnail + date in blog listings |
| **FAQ Dropdowns** | FAQPage | 🟠 Medium - Expandable FAQ in SERP |
| **Review Snippets** | Review/AggregateRating | 🟡 Medium - Star ratings for testimonials |
| **Author Bylines** | Person linked to Article | 🔴 High - Shows author credibility |

### Impact on Search Visibility

1. **No Knowledge Panel**: Google cannot build entity understanding of "Mattia De Luca"
2. **No Author Authority**: Articles can't be linked to author credentials
3. **No Rich Snippets**: Standard blue links only, lower CTR than competitors with rich results
4. **LLM Blindness**: AI search engines (Perplexity, ChatGPT) can't extract structured entity data

## Planned Implementation (From Backlog)

Story **SEO-002** exists in `.backlog/epics/09-seo-optimization/stories/SEO-002-json-ld-schemas.md`:

| Planned Schema | Priority | Effort | Status |
|---------------|----------|--------|--------|
| Person | 🔴 Critical | ~1 day | 📋 Not Started |
| Article | 🔴 Critical | ~1 day | 📋 Not Started |
| WebSite | 🟠 High | ~0.5 day | 📋 Not Started |
| Organization | 🟡 Medium | ~0.5 day | 📋 Not Started |
| BreadcrumbList | 🟡 Medium | ~0.5 day | Not Planned |
| FAQ | 🟢 Low | ~0.5 day | Not Planned |

### Implementation Architecture (Pre-Designed)

The backlog story already defines:
- `/components/structured-data/PersonSchema.tsx`
- `/components/structured-data/ArticleSchema.tsx`
- `/components/structured-data/WebSiteSchema.tsx`
- TypeScript types for all schemas
- Integration points in layouts

## Priority Recommendations

### 🔴 Critical (Implement First)

1. **Person Schema** - Homepage
   - Establishes Mattia as a recognized entity
   - Enables Knowledge Panel
   - Required for author attribution
   - **Impact**: +30% potential CTR from rich results

2. **WebSite Schema** - Root Layout
   - Enables sitelinks searchbox
   - Declares site ownership to search engines

### 🟠 High Priority

3. **Article Schema** - Blog Posts
   - Enables article rich results
   - Links articles to Person author
   - Shows publish dates and thumbnails

4. **BreadcrumbList** - All Pages
   - Improves SERP appearance
   - Helps Google understand site structure

### 🟡 Medium Priority

5. **Organization Schema** - Optional
   - Only if building a brand beyond personal

6. **FAQ Schema** - If FAQ content exists
   - Easy win if there's FAQ-style content

## Schema Markup Score

| Category | Score | Notes |
|----------|-------|-------|
| Person Schema | 0/100 | Not implemented |
| Organization Schema | 0/100 | Not implemented |
| WebSite Schema | 0/100 | Not implemented |
| Article Schema | 0/100 | Not implemented |
| BreadcrumbList | 0/100 | Not implemented |
| FAQ Schema | 0/100 | Not implemented |
| **Overall Schema Score** | **0/100** | **CRITICAL GAP** |

## Competitive Disadvantage

Without structured data:
- Competitors with Person schemas will appear in Knowledge Panels
- Competitors with Article schemas get thumbnail-rich search results
- AI search engines will cite competitors as authoritative sources
- Rich snippet CTR advantage goes to competitors (up to 30% higher)

## Technical Requirements for Implementation

### Files to Create
```
components/structured-data/
├── PersonSchema.tsx
├── ArticleSchema.tsx
├── WebSiteSchema.tsx
├── BreadcrumbListSchema.tsx
├── OrganizationSchema.tsx (optional)
├── FAQSchema.tsx (optional)
└── types.ts
```

### Files to Modify
- `app/layout.tsx` - Add WebSiteSchema
- `app/[locale]/page.tsx` - Add PersonSchema
- `app/[locale]/blog/[slug]/page.tsx` - Add ArticleSchema + BreadcrumbListSchema

### Validation Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## Conclusion

The complete absence of structured data is a **critical SEO gap**. The site has excellent content and metadata, but lacks the machine-readable markup that enables:
1. Rich snippets in search results
2. Knowledge Panel presence
3. AI search engine entity recognition
4. Author credibility signals

**Recommendation**: Prioritize SEO-002 story implementation immediately. The backlog already contains a well-designed implementation plan.

---

*Assessment conducted using WebFetch analysis, codebase inspection, and comparison against SEO best practices.*
