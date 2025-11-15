# [SEO-004] Enhanceare Blog Metadata (tags, modifiedTime, featured images)

## Metadata
- **Story ID**: SEO-004
- **Epic**: [EPIC-009](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Not Started | **Data Completamento**: -

## User Story
**Come** motore di ricerca e LLM **Voglio** metadata blog completi e accurati **Così che** possa capire topic, freshness, e rilevanza degli articoli per ranking e citazioni

## Criteri di Accettazione
- [ ] **AC1**: Frontmatter MDX include campo `tags: string[]` (oltre a `category`)
- [ ] **AC2**: Frontmatter include campo `modifiedDate: string` (optional, fallback a `date`)
- [ ] **AC3**: Frontmatter include campo `coverImage: string` (required per OpenGraph)
- [ ] **AC4**: Frontmatter include campo `locale: 'it' | 'en'` per multi-language support
- [ ] **AC5**: Zod schema valida frontmatter all'import, blocca build se incompleto
- [ ] **AC6**: OpenGraph metadata include `tags` come keywords
- [ ] **AC7**: Template MDX per nuovi articoli include tutti i campi richiesti

## Problema & Contesto

### Situazione Attuale

**BlogPost interface** (`lib/blog/mdx.ts`):
```typescript
export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  category: string     // ✅ Single category
  tags: string[]       // ⚠️ Exists but not in frontmatter
  readingTime: string
  coverImage?: string  // ⚠️ Optional, molti posts non ce l'hanno
  published: boolean
  content?: string
}
```

**Frontmatter attuale** (esempio da `/content/blog/come-gestiamo-product-roadmaps.mdx`):
```yaml
---
title: "Come gestiamo le product roadmaps che funzionano"
date: "2024-11-10"
excerpt: "Le roadmap non sono promesse..."
category: "Product Management"
featured: true
published: true
# ❌ MISSING: tags
# ❌ MISSING: modifiedDate
# ❌ MISSING: coverImage
# ❌ MISSING: locale
---
```

**OpenGraph metadata generato**:
```typescript
// app/[locale]/blog/[slug]/page.tsx
openGraph: {
  title: post.title,
  type: 'article',
  publishedTime: post.date,
  authors: [post.author],
  // ❌ MISSING: tags (no keywords)
  // ❌ MISSING: modifiedTime
  // ❌ MISSING: section (article section)
  images: post.coverImage ? [{ url: post.coverImage }] : [],
  // ⚠️ Molti posts hanno array vuoto
}
```

### Conseguenze
- ❌ **Topic relevance**: Senza tags, Google non capisce sub-topics dell'articolo (es. "OKRs", "User Stories", "Agile")
- ❌ **Freshness signals**: Senza `modifiedDate`, Google pensa che articoli aggiornati siano vecchi
- ❌ **Social sharing**: Senza `coverImage`, OpenGraph cards sono vuote su LinkedIn/Twitter
- ❌ **LLM context**: AI non può filtrare articoli per tags (es. "articoli su TypeScript")
- ❌ **Related posts**: Algoritmo related posts ha solo `category` per matching (troppo broad)

## Implementazione Tecnica

### 1. Enhanceare Frontmatter Schema

```typescript
// lib/blog/frontmatter-schema.ts (NEW FILE)
import { z } from 'zod'

export const frontmatterSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  excerpt: z.string().min(50, 'Excerpt must be at least 50 characters'),
  category: z.enum([
    'Product Management',
    'Product Design',
    'Development',
    'Case Study',
  ]),
  tags: z.array(z.string()).min(1, 'At least 1 tag required').max(10, 'Max 10 tags'),
  coverImage: z.string().url('Cover image must be valid URL'),
  author: z.string().optional().default('Mattia Filippo De Luca'),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  locale: z.enum(['it', 'en']).default('it'),
  modifiedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})

export type Frontmatter = z.infer<typeof frontmatterSchema>
```

### 2. Integrare Validation in MDX Parser

```typescript
// lib/blog/mdx.ts (MODIFY)
import { frontmatterSchema } from './frontmatter-schema'
import matter from 'gray-matter'

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  // 🆕 Validate frontmatter with Zod
  const validatedData = frontmatterSchema.parse(data)
  // ⚠️ Throws ZodError if validation fails → blocks build

  return {
    slug,
    title: validatedData.title,
    date: validatedData.date,
    excerpt: validatedData.excerpt,
    author: validatedData.author,
    category: validatedData.category,
    tags: validatedData.tags, // 🆕 Now from frontmatter
    coverImage: validatedData.coverImage, // 🆕 Now required
    published: validatedData.published,
    featured: validatedData.featured,
    modifiedDate: validatedData.modifiedDate, // 🆕 NEW field
    locale: validatedData.locale, // 🆕 NEW field
    readingTime: calculateReadingTime(content),
    content,
  }
}
```

### 3. Update BlogPost Interface

```typescript
// lib/blog/mdx.ts (MODIFY interface)
export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  readingTime: string
  coverImage: string // 🆕 Now required (not optional)
  published: boolean
  featured?: boolean
  locale: 'it' | 'en' // 🆕 NEW field
  modifiedDate?: string // 🆕 NEW field
  content?: string
}
```

### 4. Enhance OpenGraph Metadata

```typescript
// app/[locale]/blog/[slug]/page.tsx (MODIFY)
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  return {
    title: `${post.title} - Mattia Filippo De Luca`,
    description: post.excerpt,
    keywords: [...post.tags, post.category], // 🆕 Add tags as keywords
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modifiedDate || post.date, // 🆕 Add modifiedTime
      authors: [post.author],
      tags: post.tags, // 🆕 Add tags
      section: post.category, // 🆕 Add section
      url: canonicalUrl,
      images: [
        {
          url: post.coverImage,
          alt: post.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `/en/blog/${params.slug}`,
        it: `/it/blog/${params.slug}`,
      },
    },
  }
}
```

### 5. Update Existing Blog Posts Frontmatter

Aggiornare i 3 blog posts esistenti con i nuovi campi:

```yaml
---
title: "Come gestiamo le product roadmaps che funzionano"
date: "2024-11-10"
modifiedDate: "2024-11-15" # 🆕 ADD (se modificato, altrimenti omit)
excerpt: "Le roadmap non sono promesse..."
category: "Product Management"
tags: # 🆕 ADD
  - "Product Management"
  - "Roadmap"
  - "OKRs"
  - "Product Strategy"
coverImage: "https://res.cloudinary.com/your-cloud/image/upload/v1/blog/roadmaps-cover.jpg" # 🆕 ADD
locale: "it" # 🆕 ADD
featured: true
published: true
---
```

### 6. Create MDX Template

```markdown
<!-- content/blog/_TEMPLATE.mdx -->
---
title: "Your Article Title Here"
date: "YYYY-MM-DD"
modifiedDate: "YYYY-MM-DD" # Optional: only if you update the article
excerpt: "A compelling 50-150 character summary that will appear in social shares and search results"
category: "Product Management" # Options: Product Management | Product Design | Development | Case Study
tags:
  - "Tag1"
  - "Tag2"
  - "Tag3"
  # Add 3-8 relevant tags
coverImage: "https://your-cdn.com/image.jpg" # Required: 1200x630px for OpenGraph
locale: "it" # or "en"
author: "Mattia Filippo De Luca" # Optional: defaults to this
published: false # Set to true when ready to publish
featured: false # Set to true for homepage feature
---

# Your Article Title

Your content here...
```

## Files da Modificare

```
📝 NEW FILES:
- /lib/blog/frontmatter-schema.ts    # Zod validation schema
- /content/blog/_TEMPLATE.mdx        # Template for new blog posts

🔧 MODIFY:
- /lib/blog/mdx.ts                   # Integrate Zod validation, update interface
- /app/[locale]/blog/[slug]/page.tsx # Enhance OpenGraph metadata
- /content/blog/come-gestiamo-product-roadmaps.mdx # Add missing fields
- /content/blog/prima-startup-fallimento-lezioni.mdx # Add missing fields
- /content/blog/design-system-componenti-riusabili.mdx # Add missing fields
```

## Test Plan

### 1. Build-time Validation Test
```bash
# Test che build fallisce con frontmatter invalido
# Modify one blog post to have missing `tags` field
npm run build
# Expected: Build fails with Zod error "At least 1 tag required"

# Fix frontmatter, re-run
npm run build
# Expected: Build succeeds
```

### 2. Metadata Inspection Test
```bash
# Run dev server
npm run dev

# Inspect OpenGraph tags
curl http://localhost:3000/it/blog/come-gestiamo-product-roadmaps | grep -E 'og:article|twitter:'
# Expected output includes:
# <meta property="og:article:tag" content="Product Management" />
# <meta property="og:article:tag" content="Roadmap" />
# <meta property="og:article:modified_time" content="2024-11-15" />
# <meta property="og:image" content="https://..." />
# <meta name="twitter:card" content="summary_large_image" />
```

### 3. OpenGraph Preview Test
```bash
# Use OpenGraph preview tools
# https://www.opengraph.xyz/
# Input: https://mattiacintura.com/it/blog/come-gestiamo-product-roadmaps

# Verify:
# - Cover image displays correctly (1200x630)
# - Title, description appear
# - Tags are present
```

### 4. E2E Test (optional)
```typescript
// e2e/seo/blog-metadata.spec.ts
test('blog post has complete metadata', async ({ page }) => {
  await page.goto('/it/blog/come-gestiamo-product-roadmaps');

  // Check tags in meta keywords
  const keywords = await page.locator('meta[name="keywords"]').getAttribute('content');
  expect(keywords).toContain('Product Management');
  expect(keywords).toContain('Roadmap');

  // Check OpenGraph tags
  const ogTags = await page.locator('meta[property^="og:article:tag"]').count();
  expect(ogTags).toBeGreaterThan(0);

  // Check cover image
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(ogImage).toBeTruthy();
  expect(ogImage).toMatch(/^https?:\/\//);
});
```

## Definition of Done
- [ ] `frontmatter-schema.ts` created with Zod validation
- [ ] `mdx.ts` integrates Zod validation (throws error on invalid frontmatter)
- [ ] `BlogPost` interface updated with new fields (`locale`, `modifiedDate`, required `coverImage`)
- [ ] Blog post metadata generation enhanced (keywords, tags, modifiedTime, section)
- [ ] All 3 existing blog posts updated with complete frontmatter (tags, coverImage, locale)
- [ ] `_TEMPLATE.mdx` created with all required fields
- [ ] Build passes with valid frontmatter (`npm run build`)
- [ ] Build FAILS with invalid frontmatter (tested manually)
- [ ] OpenGraph preview tools show correct image and metadata
- [ ] Type checking passes (`npm run type-check`)
- [ ] Zero linting errors (`npm run lint`)

## Post-Implementation: Content Workflow

**Per scrivere un nuovo blog post**:
1. Copia `_TEMPLATE.mdx` → `new-post.mdx`
2. Compila tutti i campi (title, excerpt, tags, coverImage, etc.)
3. `npm run build` → Zod valida automaticamente
4. Se validation fails → Fix frontmatter, retry
5. Se passa → Post è SEO-compliant! ✅

**Per aggiornare un post esistente**:
1. Modifica contenuto
2. Aggiorna `modifiedDate: "YYYY-MM-DD"` nel frontmatter
3. Google vedrà freshness signal e re-crawlerà

---

## Note Implementative

### Perché Zod invece di TypeScript interfaces?
- ✅ **Runtime validation**: TypeScript è compile-time only
- ✅ **Build-time safety**: Blocca build se frontmatter è incompleto
- ✅ **Error messages**: Zod dà messaggi chiari ("At least 1 tag required")
- ✅ **Default values**: `author` default a "Mattia Filippo De Luca"

### Cover Image Best Practices
```
Dimensions: 1200x630px (OpenGraph standard)
Format: JPG or PNG (WebP con fallback)
Max size: 300KB (comprimi con TinyPNG)
Aspect ratio: 1.91:1
Text overlay: Leggibile anche a 600px width
```

### Suggested Tags per Category
```yaml
Product Management:
  - Product Strategy, OKRs, Roadmap, User Stories, Agile, Scrum, Product-Market Fit

Product Design:
  - UX Design, UI Design, Figma, User Research, Wireframing, Prototyping, Design System

Development:
  - TypeScript, React, Next.js, Node.js, API Design, Database, Testing

Case Study:
  - Startup, Failure, Lessons Learned, Real-world Example
```

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Story creata da SEO audit |
