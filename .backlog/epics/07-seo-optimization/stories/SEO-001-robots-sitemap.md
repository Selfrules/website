# [SEO-001] Implementare robots.txt e sitemap.xml dinamico

## Metadata
- **Story ID**: SEO-001
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Not Started | **Data Completamento**: -

## User Story
**Come** motore di ricerca (Google, Bing) o LLM crawler **Voglio** un sitemap.xml aggiornato automaticamente e un robots.txt chiaro **Così che** possa scoprire e indicizzare tutte le pagine del sito

## Criteri di Accettazione
- [ ] **AC1**: File `/app/robots.ts` genera dinamicamente `robots.txt` con sitemap reference
- [ ] **AC2**: File `/app/sitemap.ts` genera sitemap.xml con tutte le route (main pages, blog posts, locales)
- [ ] **AC3**: Sitemap include `lastmod`, `changefreq`, `priority` per ogni URL
- [ ] **AC4**: Sitemap si aggiorna automaticamente quando viene pubblicato un nuovo blog post
- [ ] **AC5**: Robots.txt blocca `/api/*` e `/admin/*` dalla scansione
- [ ] **AC6**: Accessibile su `https://mattiacintura.com/robots.txt` e `https://mattiacintura.com/sitemap.xml`

## Problema & Contesto

### Situazione Attuale
```bash
# Verifica effettuata durante audit:
$ find . -name "sitemap.*" → Nessun risultato
$ find . -name "robots.*" → Nessun risultato
$ ls public/ → Directory non esiste
```

**Conseguenze**:
- ❌ Google Search Console mostra "Sitemap not found"
- ❌ Crawlers non scoprono automaticamente i blog posts
- ❌ Nessun controllo su cosa viene indicizzato (es. `/api` route potrebbe essere crawlata)
- ❌ LLM crawlers (Perplexity, ChatGPT) non sanno quali contenuti esistono

### Impatto Business
- **Traffico organico perso**: Blog posts non vengono indicizzati → zero visibilità su Google
- **Crawl budget sprecato**: Senza robots.txt, i crawlers perdono tempo su `/api/*` invece di contenuto utile
- **LLM citation impossibile**: AI non può citare blog posts se non li scopre

## Implementazione Tecnica

### 1. Robots.txt dinamico (`/app/robots.ts`)

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        // Specific rules for AI crawlers
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot'],
        allow: '/',
        crawlDelay: 2, // Be respectful with API-heavy crawlers
      },
    ],
    sitemap: 'https://mattiacintura.com/sitemap.xml',
    host: 'https://mattiacintura.com',
  }
}
```

**Features**:
- ✅ Blocca API routes e admin panel
- ✅ Permette crawling di tutto il resto
- ✅ Aggiunge crawl delay per AI bots (good citizenship)
- ✅ Riferimento esplicito al sitemap

### 2. Sitemap dinamico (`/app/sitemap.ts`)

```typescript
import type { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mattiacintura.com'

  // Get all published blog posts
  const posts = await getAllBlogPosts()

  // Main pages (manual list)
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          it: `${baseUrl}/it`,
        },
      },
    },
    {
      url: `${baseUrl}/it/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          it: `${baseUrl}/it/blog`,
        },
      },
    },
  ]

  // Blog posts (dynamic)
  const blogPages: MetadataRoute.Sitemap = posts.flatMap(post => [
    {
      url: `${baseUrl}/it/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.8 : 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${post.slug}`,
          it: `${baseUrl}/it/blog/${post.slug}`,
        },
      },
    },
  ])

  return [...mainPages, ...blogPages]
}
```

**Features**:
- ✅ Auto-discovery di tutti i blog posts pubblicati
- ✅ `lastModified` basato su frontmatter `date`
- ✅ `priority` più alta per featured posts
- ✅ `alternates.languages` per hreflang SEO
- ✅ `changeFrequency` basato su tipo di pagina (homepage weekly, blog monthly)

### 3. Enhanceare `getAllBlogPosts()` per sitemap (se necessario)

```typescript
// lib/blog/mdx.ts
export async function getAllBlogPosts(locale?: string): Promise<BlogPost[]> {
  // Assicurarsi che restituisca:
  // - slug
  // - date (per lastModified)
  // - published: true/false (exclude unpublished)
  // - featured (per priority calculation)
}
```

## Files da Modificare
```
📝 NEW FILES:
- /app/robots.ts                    # Dynamic robots.txt generation
- /app/sitemap.ts                   # Dynamic sitemap.xml generation

🔧 MODIFY (se necessario):
- /lib/blog/mdx.ts                  # Ensure getAllBlogPosts() returns necessary fields
```

## Test Plan

### Manual Testing
```bash
# 1. Build in produzione
npm run build

# 2. Verifica robots.txt
curl http://localhost:3000/robots.txt
# Expected output:
# User-agent: *
# Allow: /
# Disallow: /api/
# Disallow: /admin/
# Sitemap: https://mattiacintura.com/sitemap.xml

# 3. Verifica sitemap.xml
curl http://localhost:3000/sitemap.xml
# Expected: XML con <url> entries per ogni pagina
```

### Validation Tools
```bash
# Google Rich Results Test
# Paste: https://mattiacintura.com/sitemap.xml

# Sitemap validator
# https://www.xml-sitemaps.com/validate-xml-sitemap.html

# Robots.txt tester
# Google Search Console → Strumenti → Tester robots.txt
```

### E2E Test (opzionale)
```typescript
// e2e/seo/sitemap.spec.ts
import { test, expect } from '@playwright/test';

test('sitemap.xml is accessible and valid', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('xml');

  const body = await response.text();
  expect(body).toContain('<urlset');
  expect(body).toContain('https://mattiacintura.com/it/blog');
  expect(body).toContain('<loc>');
  expect(body).toContain('<lastmod>');
});

test('robots.txt is accessible', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('User-agent:');
  expect(body).toContain('Sitemap: https://mattiacintura.com/sitemap.xml');
  expect(body).toContain('Disallow: /api/');
});
```

## Definition of Done
- [ ] `/app/robots.ts` creato e funzionante
- [ ] `/app/sitemap.ts` creato e funzionante
- [ ] Sitemap include tutte le pagine (homepage, blog list, 3+ blog posts, locales)
- [ ] Sitemap ha `lastModified`, `changeFrequency`, `priority` per ogni URL
- [ ] Sitemap ha `alternates.languages` per i18n
- [ ] Robots.txt blocca `/api/*` e `/admin/*`
- [ ] Robots.txt referenzia sitemap URL
- [ ] Accessibile su `https://mattiacintura.com/robots.txt` (dopo deploy)
- [ ] Accessibile su `https://mattiacintura.com/sitemap.xml` (after deploy)
- [ ] Validato con [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validato con [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [ ] Build passa senza errori (`npm run build`)
- [ ] Type checking passa (`npm run type-check`)

## Post-Implementation: Google Search Console

Dopo il deploy in produzione:
1. Accedi a [Google Search Console](https://search.google.com/search-console)
2. Aggiungi proprietà per `mattiacintura.com` (se non già presente)
3. Vai a **Sitemap** → Aggiungi nuovo sitemap: `https://mattiacintura.com/sitemap.xml`
4. Verifica che Google inizi a crawlare le pagine (check dopo 24-48h)

---

## Note Implementative

### Perché Next.js App Router invece di file statici?
- ✅ **Dynamic content**: Blog posts vengono aggiunti dinamicamente
- ✅ **Type safety**: TypeScript validation su sitemap structure
- ✅ **DRY**: Riusa `getAllBlogPosts()` esistente invece di duplicare logica
- ✅ **Build-time generation**: Sitemap viene generato a build time, non runtime (zero performance impact)

### Priorità Sitemap Suggerite
```
1.0  → Homepage (/)
0.9  → Blog listing (/blog)
0.8  → Featured blog posts
0.7  → Regular blog posts
0.5  → Archive pages (se implementate in futuro)
```

### ChangeFrequency Suggerite
```
daily   → Blog listing page (nuovi posts vengono aggiunti)
weekly  → Homepage (sezioni cambiano raramente)
monthly → Individual blog posts (content statico dopo pubblicazione)
yearly  → Legal pages (Terms, Privacy)
```

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Story creata da SEO audit |
