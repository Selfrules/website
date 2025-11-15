# [SEO-002] Implementare JSON-LD Schema (Person, Article, WebSite)

## Metadata
- **Story ID**: SEO-002
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🔵 L (3-5 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Not Started | **Data Completamento**: -

## User Story
**Come** motore di ricerca (Google) o LLM (ChatGPT, Perplexity, Claude) **Voglio** structured data in formato JSON-LD **Così che** possa capire chi è Mattia, quali sono i suoi articoli, e mostrare rich snippets nelle SERP

## Criteri di Accettazione
- [ ] **AC1**: Schema Person implementato nella homepage con credenziali complete
- [ ] **AC2**: Schema Article implementato in ogni blog post con metadata completo
- [ ] **AC3**: Schema WebSite implementato nel root layout con search action
- [ ] **AC4**: Schema Organization (opzionale) per brand identity
- [ ] **AC5**: Tutti gli schema passano [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] **AC6**: Schema sono generati automaticamente (nessun hardcoding manuale per ogni articolo)

## Problema & Contesto

### Situazione Attuale
```bash
# Verifica audit:
$ grep -r "@context\|@type.*Person\|@type.*Article" → Nessun risultato
$ grep -r "application/ld\+json" → Nessun risultato
```

**Conseguenze**:
- ❌ Google non mostra rich snippets (author box, article metadata, breadcrumbs)
- ❌ Knowledge Graph non viene popolato (nessuna entity recognition)
- ❌ LLM non riconoscono Mattia come "Person" entity con credentials
- ❌ AI search engines (Perplexity, ChatGPT Search) non citano gli articoli come fonti autorevoli
- ❌ Zero structured data per social proof (nessun testimonial schema)

### Impatto Business
- **CTR perso**: Rich snippets aumentano CTR fino al 30% nelle SERP
- **Authority persa**: Senza Person/Organization schema, nessuna credibilità signals per LLM
- **Discoverability**: AI search engines non possono estrarre entities dal content

## Implementazione Tecnica

### Architettura: Componenti Riusabili

Creare componenti React per ogni schema type che **auto-inject** JSON-LD nel `<head>`:

```
/components/structured-data/
  ├── PersonSchema.tsx          # Schema.org Person
  ├── ArticleSchema.tsx         # Schema.org Article
  ├── WebSiteSchema.tsx         # Schema.org WebSite
  ├── OrganizationSchema.tsx    # Schema.org Organization (optional)
  └── types.ts                  # TypeScript types per schemas
```

### 1. PersonSchema Component

```typescript
// components/structured-data/PersonSchema.tsx
import Script from 'next/script'

export interface PersonSchemaProps {
  name: string
  jobTitle: string[]
  description: string
  url: string
  image: string
  email?: string
  sameAs?: string[] // Social profiles
  knowsAbout?: string[]
  alumniOf?: string[]
}

export function PersonSchema({
  name,
  jobTitle,
  description,
  url,
  image,
  email,
  sameAs,
  knowsAbout,
  alumniOf,
}: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    image,
    email,
    sameAs,
    knowsAbout,
    alumniOf,
  }

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Usage** (in `/app/[locale]/page.tsx` - Homepage):
```typescript
import { PersonSchema } from '@/components/structured-data/PersonSchema'

export default function HomePage({ params }: { params: { locale: string } }) {
  return (
    <>
      <PersonSchema
        name="Mattia Filippo De Luca"
        jobTitle={[
          'Product Manager',
          'Full-Stack Developer',
          'UX Designer',
        ]}
        description="Product Manager che ha fallito come designer e developer. Ora aiuto startup e aziende a trasformare idee in prodotti digitali concreti."
        url="https://mattiacintura.com"
        image="https://mattiacintura.com/images/mattia-profile.jpg"
        email="mattia@mattiacintura.com"
        sameAs={[
          'https://www.linkedin.com/in/mattia-de-luca',
          'https://github.com/mattiacintura',
          'https://twitter.com/mattiacintura',
        ]}
        knowsAbout={[
          'Product Management',
          'Product Design',
          'Full-Stack Development',
          'TypeScript',
          'React',
          'Next.js',
          'User Experience Design',
          'Product Strategy',
        ]}
        alumniOf={['Università degli Studi di Brescia']}
      />

      {/* Rest of homepage JSX */}
    </>
  )
}
```

### 2. ArticleSchema Component

```typescript
// components/structured-data/ArticleSchema.tsx
import Script from 'next/script'

export interface ArticleSchemaProps {
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author: {
    name: string
    url: string
  }
  publisher: {
    name: string
    logo: string
  }
  url: string
  keywords?: string[]
  articleSection?: string
  wordCount?: number
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
  url,
  keywords,
  articleSection,
  wordCount,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords,
    articleSection,
    wordCount,
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Usage** (in `/app/[locale]/blog/[slug]/page.tsx`):
```typescript
import { ArticleSchema } from '@/components/structured-data/ArticleSchema'
import { BlogPost } from '@/lib/blog/mdx'

export default function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        image={post.coverImage}
        datePublished={post.date}
        dateModified={post.modifiedDate || post.date}
        author={{
          name: post.author || 'Mattia Filippo De Luca',
          url: 'https://mattiacintura.com',
        }}
        publisher={{
          name: 'Mattia Filippo De Luca',
          logo: 'https://mattiacintura.com/images/logo.png',
        }}
        url={`https://mattiacintura.com/it/blog/${post.slug}`}
        keywords={post.tags}
        articleSection={post.category}
        wordCount={post.content ? post.content.split(' ').length : undefined}
      />

      {/* Rest of blog post JSX */}
    </>
  )
}
```

### 3. WebSiteSchema Component

```typescript
// components/structured-data/WebSiteSchema.tsx
import Script from 'next/script'

export interface WebSiteSchemaProps {
  name: string
  description: string
  url: string
  searchUrl?: string // For site search functionality
}

export function WebSiteSchema({
  name,
  description,
  url,
  searchUrl,
}: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    ...(searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${searchUrl}?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Usage** (in `/app/layout.tsx` - Root layout):
```typescript
import { WebSiteSchema } from '@/components/structured-data/WebSiteSchema'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <WebSiteSchema
          name="Mattia Filippo De Luca Portfolio"
          description="Product Manager, Full-Stack Developer e UX Designer. Portfolio e blog su Product Management, Design e Sviluppo."
          url="https://mattiacintura.com"
          searchUrl="https://mattiacintura.com/blog" // Future: implement search
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 4. TypeScript Types (shared)

```typescript
// components/structured-data/types.ts

export interface Schema {
  '@context': 'https://schema.org'
  '@type': string
  [key: string]: any
}

export interface PersonSchema extends Schema {
  '@type': 'Person'
  name: string
  jobTitle: string | string[]
  description: string
  url: string
  image?: string
  email?: string
  sameAs?: string[]
  knowsAbout?: string[]
  alumniOf?: string[]
}

export interface ArticleSchema extends Schema {
  '@type': 'Article'
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author: {
    '@type': 'Person'
    name: string
    url: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  url: string
  keywords?: string[]
  articleSection?: string
  wordCount?: number
}

export interface WebSiteSchema extends Schema {
  '@type': 'WebSite'
  name: string
  description: string
  url: string
  potentialAction?: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }
}
```

## Files da Modificare

```
📝 NEW FILES:
- /components/structured-data/PersonSchema.tsx
- /components/structured-data/ArticleSchema.tsx
- /components/structured-data/WebSiteSchema.tsx
- /components/structured-data/OrganizationSchema.tsx (optional)
- /components/structured-data/types.ts

🔧 MODIFY:
- /app/layout.tsx                         # Add <WebSiteSchema>
- /app/[locale]/page.tsx                  # Add <PersonSchema>
- /app/[locale]/blog/[slug]/page.tsx      # Add <ArticleSchema>
- /lib/blog/mdx.ts                        # Add modifiedDate to BlogPost type
```

## Test Plan

### 1. Google Rich Results Test
```bash
# Dopo deploy in produzione (o usando tunnel per localhost):
# https://search.google.com/test/rich-results

# Test URLs:
# - https://mattiacintura.com (Person + WebSite schema)
# - https://mattiacintura.com/it/blog/come-gestiamo-product-roadmaps (Article schema)
```

**Expected Results**:
- ✅ Person schema: Valid, con name, jobTitle, knowsAbout
- ✅ Article schema: Valid, con headline, datePublished, author
- ✅ WebSite schema: Valid, con name, url

### 2. Schema.org Validator
```bash
# https://validator.schema.org/

# Copy-paste generated JSON-LD from page source
```

### 3. E2E Test (automated)

```typescript
// e2e/seo/structured-data.spec.ts
import { test, expect } from '@playwright/test';

test('homepage has Person schema', async ({ page }) => {
  await page.goto('/');

  // Find script tag with type="application/ld+json"
  const schemaScript = await page.locator('script[type="application/ld+json"]').first();
  const schemaContent = await schemaScript.textContent();

  const schema = JSON.parse(schemaContent || '{}');

  expect(schema['@context']).toBe('https://schema.org');
  expect(schema['@type']).toBe('Person');
  expect(schema.name).toBe('Mattia Filippo De Luca');
  expect(schema.jobTitle).toContain('Product Manager');
  expect(schema.url).toBe('https://mattiacintura.com');
});

test('blog post has Article schema', async ({ page }) => {
  await page.goto('/it/blog/come-gestiamo-product-roadmaps');

  const schemaScript = await page.locator('script[type="application/ld+json"]').nth(1); // 0 is WebSite, 1 is Article
  const schemaContent = await schemaScript.textContent();

  const schema = JSON.parse(schemaContent || '{}');

  expect(schema['@type']).toBe('Article');
  expect(schema.headline).toBeTruthy();
  expect(schema.author.name).toBeTruthy();
  expect(schema.datePublished).toBeTruthy();
});
```

## Definition of Done
- [ ] `PersonSchema.tsx` component creato
- [ ] `ArticleSchema.tsx` component creato
- [ ] `WebSiteSchema.tsx` component creato
- [ ] `types.ts` con TypeScript interfaces
- [ ] PersonSchema integrato in homepage (`/app/[locale]/page.tsx`)
- [ ] ArticleSchema integrato in blog posts (`/app/[locale]/blog/[slug]/page.tsx`)
- [ ] WebSiteSchema integrato in root layout (`/app/layout.tsx`)
- [ ] Tutti gli schema passano [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Tutti gli schema passano [Schema.org Validator](https://validator.schema.org/)
- [ ] E2E test per structured data passing
- [ ] Build passa senza errori (`npm run build`)
- [ ] Type checking passa (`npm run type-check`)
- [ ] Zero errori linting (`npm run lint`)

## Post-Implementation: Monitoring

Dopo deploy in produzione:
1. **Google Search Console** → Coverage → Enhancements
   - Verifica che "Person" e "Article" appaiano nei report
   - Check per errori di validazione
2. **Rich Results Status Report**
   - Aspetta 2-4 settimane per vedere rich snippets live su Google
3. **Test manuale**:
   - Google search: `site:mattiacintura.com Mattia De Luca`
   - Verifica se appare knowledge panel con Person info

---

## Note Implementative

### Perché Next.js `<Script>` invece di `<Head>`?
- ✅ **Hydration safety**: Script tag viene gestito correttamente dal framework
- ✅ **Deduplication**: Next.js previene duplicati automaticamente
- ✅ **Type safety**: Props validation con TypeScript

### Schema Opzionali (Nice-to-have)
Se tempo disponibile, implementare anche:
- **BreadcrumbList**: Per navigation breadcrumbs
- **Review/AggregateRating**: Per testimonial section
- **FAQPage**: Se aggiungi FAQ al blog

### LLM-Specific Benefits
Structured data aiuta LLM a:
- ✅ Riconoscere "Mattia De Luca" come entity con expertise specifico
- ✅ Estrarre credentials (jobTitle, knowsAbout) per valutare authority
- ✅ Collegare blog articles all'autore (citation attribution)
- ✅ Capire topic hierarchy (articleSection, keywords)

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Story creata da SEO audit |
