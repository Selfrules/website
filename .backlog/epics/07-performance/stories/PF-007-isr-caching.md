# [PF-007] ISR & Caching Strategy

## Metadata
- **Story ID**: PF-007
- **Epic**: [EPIC-008](../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Completamento**: -

## User Story
**Come** utente **Voglio** che le pagine si carichino istantaneamente **Così che** non debba aspettare fetch API o rendering

## Problema Attuale
Nessuna strategia di caching implementata:
- **Blog pages**: No `revalidate` export → Ogni richiesta fetcha file system
- **API routes**: No cache headers → Ogni call rigenera response
- **Static assets**: Default caching → Potrebbe essere ottimizzato
- **Database queries** (se presenti): No cache layer

**Impatto misurato**: Server response time elevato, TTFB (Time To First Byte) >600ms

## Criteri di Accettazione
- [ ] **AC1**: Blog list page con ISR (`revalidate: 3600`)
- [ ] **AC2**: Blog post page con ISR + `generateStaticParams` per top posts
- [ ] **AC3**: API routes con appropriate `Cache-Control` headers
- [ ] **AC4**: Static assets con long-term caching (immutable)
- [ ] **AC5**: TTFB (Time To First Byte) <200ms per cached pages
- [ ] **AC6**: Lighthouse: "Serve static assets with cache policy" ✅
- [ ] **AC7**: Redis caching layer per API heavy calls (optional, se necessario)

## Implementazione Guidata

### Step 1: ISR per Blog List Page
**File**: `app/[locale]/blog/page.tsx`

**AGGIUNGERE**:
```typescript
// ✅ Incremental Static Regeneration
// Page si rigenera ogni 1h, ma serve cached version immediatamente
export const revalidate = 3600 // 1 hour

export default async function BlogListPage() {
  const posts = await getAllPosts()

  return <BlogList posts={posts} />
}
```

**Behavior**:
- Prima richiesta: Genera static HTML, cache per 1h
- Richieste successive (entro 1h): Serve cached HTML (instant)
- Dopo 1h: Serve cached HTML, rigenera in background, prossima richiesta ha nuovo HTML

### Step 2: ISR per Single Blog Post
**File**: `app/[locale]/blog/[slug]/page.tsx`

**AGGIUNGERE**:
```typescript
// ✅ ISR per single post
export const revalidate = 3600 // 1 hour

// ✅ Pre-render top 10 posts at build time
export async function generateStaticParams() {
  const posts = await getAllPosts()

  // Top 10 posts by views/date
  const topPosts = posts
    .sort((a, b) => b.views - a.views) // Assumendo ci sia field "views"
    .slice(0, 10)

  return topPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPost post={post} />
}
```

**Behavior**:
- Build time: 10 post più popolari pre-renderizzati
- Runtime: Altri post on-demand, poi cached per 1h

### Step 3: API Routes Cache Headers

#### High-Frequency API (Spotify Now Playing)
**File**: `app/api/spotify/now-playing/route.ts`

```typescript
export async function GET(request: Request) {
  try {
    const nowPlaying = await fetchSpotifyNowPlaying()

    return Response.json(nowPlaying, {
      status: 200,
      headers: {
        // ✅ Cache 30s, stale-while-revalidate 60s
        // = Serve cached per 30s, poi serve stale mentre refetch in background per altri 60s
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch' }, {
      status: 500,
      headers: {
        // ❌ Don't cache errors
        'Cache-Control': 'no-store',
      },
    })
  }
}
```

#### Low-Frequency API (Blog Posts List)
**File**: `app/api/blog/posts/route.ts` (se esiste)

```typescript
export async function GET(request: Request) {
  const posts = await getAllPosts()

  return Response.json(posts, {
    status: 200,
    headers: {
      // ✅ Cache 1h, stale-while-revalidate 1 day
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

#### Static API (rarely changes)
**File**: `app/api/config/route.ts` (esempio)

```typescript
export async function GET(request: Request) {
  const config = {
    siteTitle: 'Mattia Cintura',
    // ... static config
  }

  return Response.json(config, {
    status: 200,
    headers: {
      // ✅ Cache 1 day, immutable
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  })
}
```

### Step 4: Static Assets Long-Term Caching
**File**: `next.config.mjs`

```javascript
export default {
  // ... existing config

  async headers() {
    return [
      {
        // ✅ Cache static assets (images, fonts, etc) for 1 year
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // ✅ Cache fonts for 1 year
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // ✅ Preconnect hints (già coperto in PF-001, ma rinforzare)
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://fonts.googleapis.com>; rel=preconnect; crossorigin',
          },
        ],
      },
    ]
  },
}
```

### Step 5: React Cache for Duplicate Fetches
**File**: `lib/blog/mdx.ts`

**PROBLEMA**: `getAllPosts()` chiamato più volte nello stesso request

**DOPO**:
```typescript
import { cache } from 'react'

// ✅ Cache per request lifetime (evita doppi fetch in SSR)
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  const filenames = await fs.readdir(postsDirectory)

  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map(async (filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = await fs.readFile(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug: filename.replace(/\.mdx$/, ''),
          title: data.title,
          date: data.date,
          content,
          ...data,
        } as BlogPost
      })
  )

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// ✅ Anche per single post
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const posts = await getAllPosts() // Uses cache if called before in same request
  return posts.find((post) => post.slug === slug) || null
})
```

### Step 6: Redis Cache Layer (Optional - Advanced)
Se hai API molto pesanti (database queries, external API calls):

```bash
npm install ioredis
```

**File**: `lib/cache/redis.ts` (NEW)
```typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600 // 1h default
): Promise<T> {
  // Try cache first
  const cached = await redis.get(key)
  if (cached) {
    return JSON.parse(cached)
  }

  // Cache miss: fetch and store
  const data = await fetcher()
  await redis.setex(key, ttl, JSON.stringify(data))
  return data
}

export async function invalidateCache(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern)
  if (keys.length > 0) {
    await redis.del(...keys)
  }
}
```

**Usage**:
```typescript
// app/api/heavy-computation/route.ts
import { getCached } from '@/lib/cache/redis'

export async function GET() {
  const data = await getCached(
    'heavy-computation',
    async () => {
      // Heavy computation or DB query
      return await expensiveOperation()
    },
    1800 // Cache 30min
  )

  return Response.json(data)
}
```

### Step 7: Invalidate Cache on Content Update
**File**: `app/api/admin/invalidate/route.ts` (NEW - admin only)

```typescript
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { path, tag } = await request.json()

  // Verify admin authentication
  // ... auth check

  if (path) {
    revalidatePath(path) // ✅ Invalidate specific path
  }

  if (tag) {
    revalidateTag(tag) // ✅ Invalidate by tag
  }

  return Response.json({ success: true })
}
```

**Usage**: Trigger dopo publish nuovo blog post
```bash
curl -X POST https://yoursite.com/api/admin/invalidate \
  -H "Content-Type: application/json" \
  -d '{"path": "/blog"}'
```

## Test Plan
```bash
# 1. ISR Test
npm run build
npm run start
# Prima richiesta /blog
curl -I http://localhost:3000/blog
# Verificare header: X-Next-Cache: MISS (prima volta)

# Seconda richiesta /blog (entro 1h)
curl -I http://localhost:3000/blog
# Verificare header: X-Next-Cache: HIT (cached)

# 2. API Cache Test
curl -I http://localhost:3000/api/spotify/now-playing
# Verificare: Cache-Control: public, s-maxage=30, stale-while-revalidate=60

# 3. Static Assets Test
curl -I http://localhost:3000/images/logo.png
# Verificare: Cache-Control: public, max-age=31536000, immutable

# 4. TTFB Test
# DevTools > Network > localhost
# Verificare TTFB (Time To First Byte):
# - Cached pages: <100ms
# - ISR pages: <200ms
# - API routes: <300ms

# 5. Lighthouse
npx lighthouse http://localhost:3000 --view
# Verificare: "Serve static assets with cache policy" passa ✅
```

## Definition of Done
- [ ] Blog list page con `revalidate: 3600`
- [ ] Blog post page con `revalidate` + `generateStaticParams`
- [ ] React `cache()` per `getAllPosts()` e `getPostBySlug()`
- [ ] API routes con `Cache-Control` headers appropriati
- [ ] Static assets con long-term caching (1 year)
- [ ] `next.config.mjs` headers configured
- [ ] Admin invalidation endpoint (optional)
- [ ] Redis cache layer (optional, solo se necessario)
- [ ] TTFB <200ms per cached pages
- [ ] Lighthouse: "Cache policy" ✅
- [ ] Build production senza errori

## Metriche di Successo
**Prima**:
- TTFB: ~600ms (no cache)
- Server Load: High (ogni request rigenera)
- API calls: Ogni volta fresh fetch
- Lighthouse Warning: "Serve static assets with cache policy"

**Dopo** (target):
- TTFB: <200ms per cached pages (-400ms)
- Server Load: Low (90% requests cached)
- API calls: 90% cached (CDN edge cache)
- Lighthouse: ✅ No warnings
- Lighthouse Performance: +2-4 punti

## Files da Modificare
- ✏️ `app/[locale]/blog/page.tsx` (ISR revalidate)
- ✏️ `app/[locale]/blog/[slug]/page.tsx` (ISR + generateStaticParams)
- ✏️ `lib/blog/mdx.ts` (React cache)
- ✏️ `app/api/spotify/now-playing/route.ts` (cache headers)
- ✏️ Altri API routes (cache headers)
- ✏️ `next.config.mjs` (static assets headers)
- ✏️ `app/api/admin/invalidate/route.ts` (NEW - optional)
- ✏️ `lib/cache/redis.ts` (NEW - optional)

## Cache Strategy Matrix
| Resource | Strategy | TTL | Rationale |
|----------|----------|-----|-----------|
| Blog list | ISR | 1h | Content rarely changes |
| Blog post | ISR | 1h | Content rarely changes |
| Spotify API | stale-while-revalidate | 30s/60s | Real-time, but staleness OK |
| Images | Immutable | 1 year | Never change (use hash in filename) |
| Fonts | Immutable | 1 year | Never change |
| API config | max-age | 1 day | Rarely changes |
| Database queries | Redis | 5-30min | Expensive operations |

## Note Tecniche
- **ISR**: Best of static (speed) + dynamic (fresh data)
- **stale-while-revalidate**: Serve cache while fetching fresh in background (best UX)
- **React cache()**: Deduplicates fetches within single request (SSR optimization)
- **immutable**: Asset never changes → Browser can cache forever
- **Redis**: Distributed cache layer, shared across serverless functions

## Riferimenti
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [HTTP Caching](https://web.dev/http-cache/)
- [stale-while-revalidate](https://web.dev/stale-while-revalidate/)
- [React cache()](https://react.dev/reference/react/cache)

---

## Tracking
**Creata**: 2025-11-15
**Assegnata a**: Claude Code
**Dipendenze**: Nessuna (ma si integra bene con PF-005)
