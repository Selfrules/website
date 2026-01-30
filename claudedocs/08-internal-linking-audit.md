# Internal Linking Audit

**Subtask**: 2-4
**Date**: 2026-01-26
**Status**: ✅ Complete

## Executive Summary

**Overall Internal Linking Score: 35/100** - The site operates as a single-page application with anchor-based navigation, resulting in minimal true internal linking. Critical issues include broken footer links (privacy, terms pages return 404), dead resource links (`href="#"`), and orphan pages. The absence of blog content further limits internal linking opportunities.

## Site Architecture Overview

### Current Page Structure

| Page | URL Pattern | Status | Internal Links To |
|------|-------------|--------|-------------------|
| Homepage (IT) | `/it` | ✅ Active | Anchors only |
| Homepage (EN) | `/en` | ✅ Active | Anchors only |
| Privacy | `/[locale]/privacy` | ❌ 404 | N/A |
| Terms | `/[locale]/terms` | ❌ 404 | N/A |
| Blog | `/[locale]/blog` | ❌ 404 | N/A |
| Demo | `/demo` | ⚠️ Orphan | None inbound |
| Design System | `/design-system` | ⚠️ Orphan | None inbound |

**Critical Issue**: Only 2 pages are actively linked and accessible. The site functions as a single-page application with no true internal page-to-page linking.

## Navigation Analysis

### Header Navigation

```
Logo (MFDL) → /{locale}
├── Home → /{locale}#home
├── Percorso/Journey → /{locale}#journey
├── Now → /{locale}#now
├── Lavoriamo insieme/Work with me → /{locale}#work
└── Parliamo/Let's talk → /{locale}#ask-me
Language Switcher: IT ↔ EN
```

| Link | Destination | Type | Status |
|------|-------------|------|--------|
| Logo | `/{locale}` | Page | ✅ Working |
| Home | `/{locale}#home` | Anchor | ✅ Working |
| Journey | `/{locale}#journey` | Anchor | ✅ Working |
| Now | `/{locale}#now` | Anchor | ✅ Working |
| Work | `/{locale}#work` | Anchor | ✅ Working |
| Contact | `/{locale}#ask-me` | Anchor | ✅ Working |

**Assessment**: Navigation structure is functional but entirely anchor-based. No true page-to-page navigation exists.

### Footer Links

#### Quick Links Section
| Link | Destination | Status |
|------|-------------|--------|
| Home | `/{locale}` | ✅ Working |
| Work | `/{locale}#work-together` | ✅ Working |
| About | `/{locale}#journey` | ✅ Working |

#### Resources Section (CRITICAL ISSUES)
| Link | Destination | Status |
|------|-------------|--------|
| Tools I use | `#` | ❌ **Broken** - Dead link |
| Design resources | `#` | ❌ **Broken** - Dead link |
| Tech stack | `#` | ❌ **Broken** - Dead link |
| Newsletter | `#` | ❌ **Broken** - Dead link |

**Finding**: All 4 resource links are placeholder dead links (`href="#"`). This damages:
- User experience (frustrating clicks)
- SEO (wasted crawl budget on dead links)
- Trust signals (appears unfinished)

#### Legal Links Section (CRITICAL ISSUES)
| Link | Destination | Status |
|------|-------------|--------|
| Privacy | `/{locale}/privacy` | ❌ **404 Error** |
| Terms | `/{locale}/terms` | ❌ **404 Error** |

**Finding**: Both legal pages return 404. This is a **compliance risk** (GDPR requires accessible privacy policy) and an SEO red flag.

## Click Depth Analysis

### Click Depth Map

```
Homepage (0 clicks)
├── Hero Section (#home) - 0 clicks
├── Journey Section (#journey) - 0 clicks (via nav or CTA)
├── What I'm Up To (#now) - 0 clicks
├── Work Together (#work) - 0 clicks
├── Ask Me Anything (#ask-me) - 0 clicks
├── Privacy Page - 1 click (but 404!)
├── Terms Page - 1 click (but 404!)
└── Blog - Would be 1 click (but 404!)

Orphan Pages (unreachable):
├── /demo - ∞ clicks (no internal links)
└── /design-system - ∞ clicks (no internal links)
```

### Click Depth Score by Importance

| Page/Section | Importance | Target Depth | Actual Depth | Status |
|--------------|------------|--------------|--------------|--------|
| Homepage | Critical | 0 | 0 | ✅ Pass |
| Journey (about) | High | ≤1 | 0 | ✅ Pass |
| Work Together | High | ≤1 | 0 | ✅ Pass |
| Contact/Ask Me | High | ≤1 | 0 | ✅ Pass |
| Privacy Policy | Medium | ≤1 | 1 | ❌ 404 |
| Terms of Service | Medium | ≤1 | 1 | ❌ 404 |
| Blog Content | High | ≤2 | N/A | ❌ 404 |
| Demo Page | Low | ≤3 | ∞ | ❌ Orphan |
| Design System | Low | ≤3 | ∞ | ❌ Orphan |

**Assessment**: Click depth is excellent for existing content (single-page design), but several important pages are either broken or orphaned.

## Contextual Links Analysis

### Hero Section
| Link Type | Anchor Text | Destination | Purpose |
|-----------|-------------|-------------|---------|
| CTA Button | "Parliamone"/"Let's talk" | Calendar Popup | Primary conversion |
| Secondary CTA | "Come sono arrivato qui"/"How I got here" | `#journey` | Engagement |

### Journey Section
| Link Type | Destination | Notes |
|-----------|-------------|-------|
| None found | - | No contextual links to external resources or portfolio |

### Work Together Section
| Link Type | Anchor Text | Destination | Purpose |
|-----------|-------------|-------------|---------|
| CTA Button | "Prenota 15 minuti"/"Book 15 minutes" | Calendar Popup | Conversion |

### Ask Me Anything Section
| Link Type | Destination | Notes |
|-----------|-------------|-------|
| Form submission | Internal API | No visible outbound links |

**Assessment**: Contextual linking is minimal. Sections lack:
- Links to relevant blog posts (would help if blog existed)
- Links between related sections
- External links to portfolio/case studies

## Internal Link Distribution

### Link Equity Flow

```
                    [Homepage]
                        │
            ┌───────────┼───────────┐
            ▼           ▼           ▼
        [#home]     [#journey]   [#work]
            │           │           │
            └───────────┴───────────┘
                        │
                  (All equity stays
                   on single page)
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    [Privacy]       [Terms]        [Blog]
     (404)           (404)          (404)
```

**Finding**: All link equity concentrates on the homepage. With no working subpages:
- No PageRank distribution to inner pages
- No opportunity for long-tail keyword targeting
- No blog content to link to/from

### Inbound Link Count by Section

| Section | Internal Links Pointing To | Assessment |
|---------|---------------------------|------------|
| #home | 2 (header, footer) | ✅ Adequate |
| #journey | 3 (header, hero CTA, footer) | ✅ Good |
| #now | 1 (header only) | ⚠️ Underprioritized |
| #work | 2 (header, footer) | ✅ Adequate |
| #ask-me | 1 (header only) | ⚠️ Underprioritized |
| Privacy | 1 (footer) | ❌ 404 |
| Terms | 1 (footer) | ❌ 404 |

## Orphan Pages Identified

### Completely Orphaned (Zero Inbound Internal Links)

| Page | URL | Purpose | Discoverability |
|------|-----|---------|-----------------|
| Demo | `/demo` | Component demo | Not indexed, not linked |
| Design System | `/design-system` | Design documentation | Not indexed, not linked |

**Impact**: These pages are:
- Invisible to search engines (no internal links = hard to discover)
- Only accessible via direct URL knowledge
- Wasting potential indexed content

**Recommendation**: Either:
1. Add internal links to these pages (if public-facing)
2. Add `noindex` meta tags (if internal-only)

## Broken Links Summary

| Location | Link Text | Expected URL | Actual Status |
|----------|-----------|--------------|---------------|
| Footer | Privacy | `/{locale}/privacy` | ❌ 404 |
| Footer | Terms | `/{locale}/terms` | ❌ 404 |
| Footer | Tools I use | `#` | ❌ Dead link |
| Footer | Design resources | `#` | ❌ Dead link |
| Footer | Tech stack | `#` | ❌ Dead link |
| Footer | Newsletter | `#` | ❌ Dead link |

**Total Broken Links**: 6
**Severity**: High (includes legal compliance pages)

## Internal Linking Issues & Recommendations

### 🔴 Critical Priority

| Issue | Impact | Recommendation | Effort |
|-------|--------|----------------|--------|
| Privacy page 404 | GDPR compliance risk, SEO penalty | Create `/[locale]/privacy/page.tsx` | 2-4 hours |
| Terms page 404 | Legal exposure | Create `/[locale]/terms/page.tsx` | 2-4 hours |
| Dead resource links | Poor UX, wasted clicks | Remove or create destination pages | 1-2 hours |

### 🟠 High Priority

| Issue | Impact | Recommendation | Effort |
|-------|--------|----------------|--------|
| No blog internal links | Missing SEO opportunity | Build blog content and link from sections | 1-2 weeks |
| Single-page structure | Limited keyword targeting | Add dedicated pages for services/about | 1 week |
| Orphan pages | Wasted content | Add links or noindex tags | 1 hour |

### 🟡 Medium Priority

| Issue | Impact | Recommendation | Effort |
|-------|--------|----------------|--------|
| Weak contextual linking | Lower engagement | Add inline links between sections | 2-3 hours |
| No breadcrumbs | Poor navigation signals | Add BreadcrumbList (pair with schema) | 2-4 hours |
| #now underlinked | Section deprioritized | Add link from hero or another section | 30 min |

### 🟢 Low Priority

| Issue | Impact | Recommendation | Effort |
|-------|--------|----------------|--------|
| External links use `target="_blank"` | Minor security | Add `rel="noopener noreferrer"` | Already done ✅ |

## Anchor Text Optimization

### Current Anchor Text Distribution

| Anchor Text | Count | Keyword Relevance |
|-------------|-------|-------------------|
| "Home" | 2 | Generic |
| "Percorso/Journey" | 3 | Low |
| "Now" | 1 | Generic |
| "Lavoriamo insieme/Work with me" | 2 | Good (service intent) |
| "Parliamo/Let's talk" | 1 | Good (action intent) |

**Finding**: Anchor text is functional but not optimized for target keywords like "product manager translator" or "PM freelance."

**Recommendation**: Consider renaming navigation items to include keywords:
- "Journey" → "My PM Journey" (if aligns with brand)
- Add "translator" terminology in CTAs where natural

## Internal Linking Score Breakdown

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Link Structure | 25% | 30/100 | 7.5 |
| Broken Links | 25% | 20/100 | 5.0 |
| Click Depth | 20% | 80/100 | 16.0 |
| Contextual Links | 15% | 25/100 | 3.75 |
| Anchor Text | 15% | 40/100 | 6.0 |
| **Total** | **100%** | - | **38.25/100** |

**Rounded Score: 35/100**

## Action Plan (Solo Founder Prioritized)

### Week 1 (2-3 hours total)
1. ✅ Create `/[locale]/privacy/page.tsx` with basic privacy policy
2. ✅ Create `/[locale]/terms/page.tsx` with basic terms of service
3. ✅ Fix or remove broken resource links in footer

### Week 2-4 (if building blog)
1. Plan blog architecture with internal linking strategy
2. Ensure each blog post links to 2-3 other posts/pages
3. Add blog post previews to relevant homepage sections

### Ongoing
1. When creating new pages, add at least 2 internal links to existing content
2. Use descriptive anchor text with keywords
3. Review click depth quarterly as site grows

## Conclusion

The site's single-page structure limits internal linking opportunities significantly. The most critical issues are:

1. **Broken legal pages** (Privacy/Terms 404) - compliance and trust issue
2. **Dead resource links** - poor user experience
3. **No blog content** - missing primary internal linking vehicle
4. **Orphan pages** - wasted potential content

With only 2 accessible pages and no working subpages, the site cannot effectively:
- Distribute link equity
- Target long-tail keywords
- Build topical authority through content interconnection

**Immediate actions**: Fix the 6 broken links before addressing structural issues.

---

*Assessment conducted through WebFetch analysis of live site, codebase review of Header.tsx and Footer.tsx components, and page existence verification.*
