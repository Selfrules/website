# [SEO-006] Implementare RSS/JSON Feed per LLM Ingestion

## Metadata
- **Story ID**: SEO-006
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟢 S (< 1 giorno)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Not Started | **Data Completamento**: -

## User Story
**Come** LLM (ChatGPT, Perplexity, Claude) o RSS reader **Voglio** un feed machine-readable con tutti gli articoli **Così che** possa ingerire contenuto e citare il blog come fonte

## Criteri di Accettazione
- [ ] **AC1**: RSS feed XML disponibile su `/feed.xml` (standard RSS 2.0)
- [ ] **AC2**: JSON feed disponibile su `/api/feed.json` (per LLM ingestion)
- [ ] **AC3**: Feed include tutti gli articoli pubblicati con full content
- [ ] **AC4**: Feed si aggiorna automaticamente quando viene pubblicato nuovo articolo
- [ ] **AC5**: Feed include metadata: author, tags, categories, publish date
- [ ] **AC6**: Feed validato con [W3C Feed Validator](https://validator.w3.org/feed/)

## Problema & Contesto

### Situazione Attuale
```bash
# Audit check:
$ curl https://mattiacintura.com/feed.xml → 404 Not Found
$ curl https://mattiacintura.com/rss.xml → 404 Not Found
$ curl https://mattiacintura.com/api/feed.json → 404 Not Found
```

**API Blog endpoint esistente**:
```typescript
// app/api/blog/route.ts - ✅ EXISTS
// GET /api/blog
// Returns: Published posts with filtering
// ⚠️ Returns excerpt only, not full content
```

### Conseguenze
- ❌ **LLM ingestion impossible**: AI crawlers non possono consumare content automaticamente
- ❌ **RSS readers**: Utenti non possono seguire il blog via Feedly, Inoreader, etc.
- ❌ **Content distribution**: Nessun modo automatico per syndication
- ❌ **LLM citation**: Perplexity/ChatGPT non possono pre-index contenuto per citazioni rapide

### Use Cases
1. **RSS Readers**: Utenti abbonati ricevono notifiche di nuovi articoli
2. **LLM Training**: AI può consumare feed per training/indexing
3. **Content Aggregators**: Platform come Medium, Dev.to possono sindacare contenuto
4. **SEO Boost**: Google vede feed come signal di active content

## Implementazione Tecnica

### 1. RSS Feed XML (`/feed.xml`)

```typescript
// app/feed.xml/route.ts (NEW FILE)
import { getAllBlogPosts } from '@/lib/blog/mdx'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await getAllBlogPosts()
  const publishedPosts = posts.filter(post => post.published)

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mattia Filippo De Luca - Blog</title>
    <link>https://mattiacintura.com</link>
    <description>Articoli su Product Management, Design e Sviluppo</description>
    <language>it-IT</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://mattiacintura.com/feed.xml" rel="self" type="application/rss+xml" />

    ${publishedPosts
      .map(
        post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://mattiacintura.com/it/blog/${post.slug}</link>
      <guid isPermaLink="true">https://mattiacintura.com/it/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${post.content || post.excerpt}]]></content:encoded>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>mattia@mattiacintura.com (Mattia Filippo De Luca)</author>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
```

### 2. JSON Feed (`/api/feed.json`)

```typescript
// app/api/feed.json/route.ts (NEW FILE)
import { getAllBlogPosts } from '@/lib/blog/mdx'
import { NextResponse } from 'next/server'
import { addCorsHeaders } from '@/lib/api/cors'

export async function GET(request: Request) {
  const posts = await getAllBlogPosts()
  const publishedPosts = posts.filter(post => post.published)

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Mattia Filippo De Luca - Blog',
    home_page_url: 'https://mattiacintura.com',
    feed_url: 'https://mattiacintura.com/api/feed.json',
    description: 'Articoli su Product Management, Design e Sviluppo',
    icon: 'https://mattiacintura.com/images/icon-512.png',
    favicon: 'https://mattiacintura.com/favicon.ico',
    language: 'it',
    authors: [
      {
        name: 'Mattia Filippo De Luca',
        url: 'https://mattiacintura.com/it/about',
        avatar: 'https://mattiacintura.com/images/mattia-profile.jpg',
      },
    ],
    items: publishedPosts.map(post => ({
      id: `https://mattiacintura.com/it/blog/${post.slug}`,
      url: `https://mattiacintura.com/it/blog/${post.slug}`,
      title: post.title,
      content_html: post.content || post.excerpt, // Full content
      content_text: stripHtml(post.content || post.excerpt), // Plain text version
      summary: post.excerpt,
      image: post.coverImage,
      date_published: new Date(post.date).toISOString(),
      date_modified: post.modifiedDate
        ? new Date(post.modifiedDate).toISOString()
        : new Date(post.date).toISOString(),
      authors: [
        {
          name: post.author || 'Mattia Filippo De Luca',
          url: 'https://mattiacintura.com/it/about',
        },
      ],
      tags: [post.category, ...post.tags],
      language: post.locale || 'it',
    })),
  }

  const response = NextResponse.json(feed, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })

  return addCorsHeaders(request, response)
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}
```

### 3. Add Feed Discovery Links

```typescript
// app/layout.tsx (MODIFY)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://mattiacintura.com'),
  title: { ... },
  description: '...',
  // 🆕 Add feed discovery links
  alternates: {
    types: {
      'application/rss+xml': 'https://mattiacintura.com/feed.xml',
      'application/feed+json': 'https://mattiacintura.com/api/feed.json',
    },
  },
  // ... rest of metadata
}
```

This generates:
```html
<link rel="alternate" type="application/rss+xml" href="https://mattiacintura.com/feed.xml" />
<link rel="alternate" type="application/feed+json" href="https://mattiacintura.com/api/feed.json" />
```

### 4. Add Feed Link in Footer (optional)

```typescript
// components/layout/Footer.tsx (MODIFY)
export function Footer() {
  return (
    <footer>
      {/* Existing footer content */}
      <div className="mt-8 text-sm text-gray-600">
        <a
          href="/feed.xml"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          RSS Feed
        </a>
      </div>
    </footer>
  )
}
```

## Files da Modificare

```
📝 NEW FILES:
- /app/feed.xml/route.ts              # RSS 2.0 XML feed
- /app/api/feed.json/route.ts         # JSON Feed 1.1

🔧 MODIFY:
- /app/layout.tsx                      # Add feed discovery links in metadata
- /components/layout/Footer.tsx        # Add RSS link (optional)
- /lib/blog/mdx.ts                     # Ensure getAllBlogPosts() returns full content
```

## Test Plan

### 1. Manual Testing
```bash
# Test RSS XML
curl http://localhost:3000/feed.xml
# Expected: Valid XML with <rss version="2.0">

# Test JSON Feed
curl http://localhost:3000/api/feed.json | jq .
# Expected: Valid JSON with "version": "https://jsonfeed.org/version/1.1"

# Verify feed has full content
curl http://localhost:3000/api/feed.json | jq '.items[0].content_html'
# Expected: Full article HTML, not just excerpt
```

### 2. W3C Feed Validator
```bash
# After deploy:
# https://validator.w3.org/feed/
# Input: https://mattiacintura.com/feed.xml

# Expected:
# ✅ This is a valid RSS feed
```

### 3. JSON Feed Validator
```bash
# https://validator.jsonfeed.org/
# Input: https://mattiacintura.com/api/feed.json

# Expected:
# ✅ Valid JSON Feed
```

### 4. RSS Reader Test
```bash
# Test in Feedly:
# 1. Add feed: https://mattiacintura.com/feed.xml
# 2. Verify all articles appear
# 3. Check article content is readable

# Or use local RSS reader (e.g., NetNewsWire)
```

### 5. E2E Test
```typescript
// e2e/seo/feeds.spec.ts
import { test, expect } from '@playwright/test';

test('RSS feed is valid XML', async ({ request }) => {
  const response = await request.get('/feed.xml');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('xml');

  const body = await response.text();
  expect(body).toContain('<rss version="2.0">');
  expect(body).toContain('<title>Mattia Filippo De Luca - Blog</title>');
  expect(body).toContain('<item>');
});

test('JSON feed is valid', async ({ request }) => {
  const response = await request.get('/api/feed.json');
  expect(response.status()).toBe(200);

  const feed = await response.json();
  expect(feed.version).toBe('https://jsonfeed.org/version/1.1');
  expect(feed.items).toBeInstanceOf(Array);
  expect(feed.items.length).toBeGreaterThan(0);
  expect(feed.items[0].title).toBeTruthy();
  expect(feed.items[0].content_html).toBeTruthy();
});

test('feed discovery links present in head', async ({ page }) => {
  await page.goto('/');

  const rssLink = await page.locator('link[type="application/rss+xml"]').getAttribute('href');
  expect(rssLink).toBe('https://mattiacintura.com/feed.xml');

  const jsonLink = await page.locator('link[type="application/feed+json"]').getAttribute('href');
  expect(jsonLink).toBe('https://mattiacintura.com/api/feed.json');
});
```

## Definition of Done
- [ ] `/feed.xml` route created with RSS 2.0 format
- [ ] `/api/feed.json` route created with JSON Feed 1.1 format
- [ ] Both feeds include full article content (not just excerpts)
- [ ] Both feeds include metadata (author, tags, dates, images)
- [ ] Feed discovery links added to root layout metadata
- [ ] RSS feed passes [W3C Feed Validator](https://validator.w3.org/feed/)
- [ ] JSON feed passes [JSON Feed Validator](https://validator.jsonfeed.org/)
- [ ] Feeds update automatically when new blog post published
- [ ] E2E tests for feeds passing
- [ ] Build passes (`npm run build`)
- [ ] Type checking passes (`npm run type-check`)

## Post-Implementation: Feed Submission

Dopo deploy in produzione:
1. **Submit to Google**:
   - Google Search Console → Sitemap → Add `/feed.xml`
2. **Submit to Bing**:
   - Bing Webmaster Tools → Sitemap → Add `/feed.xml`
3. **Test in RSS Readers**:
   - Feedly: https://feedly.com/
   - Inoreader: https://www.inoreader.com/
4. **LLM Accessibility**:
   - Mention feed URL in About page
   - AI crawlers will discover via `<link rel="alternate">`

---

## Note Implementative

### Perché sia RSS che JSON Feed?
- ✅ **RSS XML**: Standard universale, supportato da tutti i reader tradizionali
- ✅ **JSON Feed**: Più facile per LLM e API consumers (parsing più semplice)
- ✅ **Backward compatibility**: RSS per legacy systems, JSON per modern APIs

### Full Content vs Excerpt
```typescript
// ✅ GOOD: Full content
content_html: post.content // Entire article

// ❌ BAD: Excerpt only
content_html: post.excerpt // Just summary
```

**Perché full content?**
- LLM hanno bisogno del contenuto completo per indexing
- Migliora user experience in RSS readers
- SEO boost: Google vede content syndication come positive signal

### Cache Strategy
```typescript
headers: {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
}
```
- **3600s (1h)**: Feed è servito da cache per 1 ora
- **stale-while-revalidate**: Serve stale content mentre rigenera in background
- **Rebuild**: Feed si aggiorna automaticamente dopo build quando nuovo post è pubblicato

### RSS 2.0 Best Practices
```xml
<!-- ✅ GOOD: Include namespaces for rich content -->
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">

<!-- Use CDATA for HTML content -->
<content:encoded><![CDATA[<p>Full HTML here</p>]]></content:encoded>

<!-- Use atom:link for feed self-reference -->
<atom:link href="https://mattiacintura.com/feed.xml" rel="self" type="application/rss+xml" />
```

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Story creata da SEO audit |
