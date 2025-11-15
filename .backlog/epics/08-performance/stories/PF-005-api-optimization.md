# [PF-005] API & Data Fetching Optimization

## Metadata
- **Story ID**: PF-005
- **Epic**: [EPIC-008](../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Completamento**: -

## User Story
**Come** utente **Voglio** che i dati si carichino solo quando necessario **Così che** la pagina sia veloce e reattiva

## Problema Attuale
Le API calls non sono ottimizzate:
- **Spotify Widget**: Polling ogni 30s anche quando non visibile (waste di risorse)
- **Chat Interface**: Carica conversation history on mount (waterfall, potrebbe preload)
- **Blog Posts**: `getAllPosts()` legge file system ad ogni request (nessuna cache/ISR)
- **React Query**: `refetchOnWindowFocus` non disabilitato globalmente → refetch inutili

**Impatto misurato**: API overhead, UX degradata, bandwidth sprecato

## Criteri di Accettazione
- [ ] **AC1**: Spotify polling si ferma quando widget non visibile (Intersection Observer)
- [ ] **AC2**: Chat conversation history preloaded quando hover su trigger (predictive prefetch)
- [ ] **AC3**: Blog posts cached con ISR (revalidate: 3600s)
- [ ] **AC4**: React Query config ottimizzata (staleTime per tipo di dato)
- [ ] **AC5**: API routes con appropriate cache headers
- [ ] **AC6**: Zero API calls inutili durante navigazione (DevTools Network test)

## Implementazione Guidata

### Step 1: Optimize Spotify Polling con Visibility Detection
**File**: `lib/hooks/useSpotify.ts` (linea 20 circa)

**PRIMA**:
```typescript
// ❌ Polling continuo, anche se non visibile
useEffect(() => {
  const interval = setInterval(() => {
    fetchNowPlaying()
  }, 30000) // 30s

  return () => clearInterval(interval)
}, [])
```

**DOPO**:
```typescript
'use client'
import { useEffect, useRef, useState } from 'react'

export function useSpotify() {
  const [isVisible, setIsVisible] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Intersection Observer: stop polling when not visible
  useEffect(() => {
    if (!widgetRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 } // Trigger when 10% visible
    )

    observer.observe(widgetRef.current)
    return () => observer.disconnect()
  }, [])

  // Polling: solo se visibile
  useEffect(() => {
    if (!isVisible) return // ✅ Stop polling when not visible

    const interval = setInterval(() => {
      fetchNowPlaying()
    }, 30000)

    // Fetch immediately quando diventa visibile
    fetchNowPlaying()

    return () => clearInterval(interval)
  }, [isVisible])

  return { widgetRef, nowPlaying }
}

// Usage in component:
// const { widgetRef, nowPlaying } = useSpotify()
// <div ref={widgetRef}>...</div>
```

### Step 2: Prefetch Chat Conversation on Hover
**File**: `components/chat/ChatTrigger.tsx`

**DOPO**:
```tsx
'use client'
import { useMutation } from '@tanstack/react-query'

export function ChatTrigger() {
  const { data: conversations, prefetch } = useQuery({
    queryKey: ['chat-conversations'],
    queryFn: fetchConversations,
    enabled: false, // Don't fetch on mount
  })

  return (
    <button
      onClick={openChat}
      onMouseEnter={() => {
        // ✅ Prefetch on hover (predictive loading)
        prefetch()
      }}
      onFocus={() => {
        // ✅ Accessibilità: prefetch on focus (keyboard users)
        prefetch()
      }}
    >
      Chat
    </button>
  )
}
```

### Step 3: Blog Posts ISR Caching
**File**: `app/[locale]/blog/page.tsx`

**AGGIUNGERE**:
```typescript
// ✅ ISR: Revalidate ogni ora
export const revalidate = 3600 // 1 hour

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <BlogList posts={posts} />
}
```

**File**: `app/[locale]/blog/[slug]/page.tsx`

**AGGIUNGERE**:
```typescript
// ✅ ISR per single post
export const revalidate = 3600

// ✅ Generate static params per post popolari
export async function generateStaticParams() {
  const posts = await getAllPosts()
  // Pre-render top 10 posts
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  return <BlogPost post={post} />
}
```

**File**: `lib/blog/mdx.ts` (linee 66-75)

**AGGIUNGERE** memoization:
```typescript
import { cache } from 'react'

// ✅ Cache per request duration
export const getAllPosts = cache(async () => {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  const filenames = await fs.readdir(postsDirectory)

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      // ... parsing logic
    })
  )

  return posts.sort((a, b) => b.date - a.date)
})
```

### Step 4: Optimize React Query Global Config
**File**: `components/providers/ReactQueryProvider.tsx` (linee 12-14)

**PRIMA**:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // ❌ Troppo basso
      refetchOnWindowFocus: false, // ✅ Già OK
    },
  },
})
```

**DOPO**:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ Different stale times per tipo di dato
      staleTime: 5 * 60 * 1000, // 5 min default
      refetchOnWindowFocus: false,
      refetchOnReconnect: true, // Refetch su reconnect (utile per mobile)
      retry: 1, // Solo 1 retry (invece di 3)
    },
  },
})

// Per override specifici, usare queryClient.setQueryDefaults():
queryClient.setQueryDefaults(['spotify'], {
  staleTime: 30 * 1000, // 30s per Spotify (dati real-time)
})

queryClient.setQueryDefaults(['blog-posts'], {
  staleTime: 60 * 60 * 1000, // 1h per blog (raramente cambia)
})

queryClient.setQueryDefaults(['chat'], {
  staleTime: 2 * 60 * 1000, // 2min per chat
})
```

### Step 5: API Routes Cache Headers
**File**: `app/api/spotify/now-playing/route.ts` (esempio)

**AGGIUNGERE**:
```typescript
export async function GET(request: Request) {
  const nowPlaying = await fetchSpotifyNowPlaying()

  return new Response(JSON.stringify(nowPlaying), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // ✅ Cache for 30s, revalidate in background for 60s
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  })
}
```

**File**: `app/api/blog/posts/route.ts` (se esiste)

```typescript
export async function GET(request: Request) {
  const posts = await getAllPosts()

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // ✅ Cache for 1h
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

### Step 6: Parallel Data Fetching
**File**: Se ci sono waterfalls (es. fetch user → fetch posts → fetch comments)

**PRIMA** (waterfall):
```typescript
const user = await fetchUser()
const posts = await fetchPosts(user.id) // ❌ Waits for user
const comments = await fetchComments(posts[0].id) // ❌ Waits for posts
```

**DOPO** (parallel):
```typescript
// ✅ Fetch in parallel dove possibile
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(), // Se non dipende da user
])

const comments = await fetchComments(posts[0].id) // Questo deve aspettare posts
```

## Test Plan
```bash
# 1. Spotify polling test
npm run dev
# DevTools > Network
# Aprire homepage (Spotify visible)
# Verificare: request ogni 30s ✅
# Scroll down (Spotify non visible)
# Verificare: request STOP ✅
# Scroll up (Spotify visible again)
# Verificare: request riprende ✅

# 2. Chat prefetch test
# DevTools > Network
# Hover su ChatTrigger (senza cliccare)
# Verificare: request /api/chat/conversations prefetched ✅
# Click su ChatTrigger
# Verificare: dati già disponibili (no loading) ✅

# 3. Blog ISR test
npm run build
npm run start
# Request /blog
# Verificare: cache header presente
# Response Headers: Cache-Control: s-maxage=3600, stale-while-revalidate

# 4. React Query devtools
# Aprire React Query Devtools
# Verificare staleTime:
# - spotify: 30s
# - blog: 1h
# - chat: 2min

# 5. Bundle test
# Verificare che Intersection Observer non aggiunga bundle size
# (è nativo browser API, 0KB)
```

## Definition of Done
- [ ] Spotify polling con Intersection Observer (stop quando invisible)
- [ ] Chat prefetch on hover/focus
- [ ] Blog pages con ISR (revalidate: 3600)
- [ ] `getAllPosts()` con React cache()
- [ ] React Query staleTime ottimizzato per tipo di dato
- [ ] API routes con Cache-Control headers
- [ ] Zero API waterfalls (Promise.all dove possibile)
- [ ] DevTools Network test passa (no chiamate inutili)
- [ ] Build production senza errori

## Metriche di Successo
**Prima**:
- Spotify requests: Continui (anche quando non visibile)
- Chat load time: ~200ms (waterfall)
- Blog page: No caching (fetch ogni volta)
- API overhead: ~500ms per navigazione

**Dopo** (target):
- Spotify requests: Solo quando visibile (-60% requests)
- Chat load time: <50ms (prefetch on hover)
- Blog page: Cached 1h (ISR)
- API overhead: <100ms per navigazione
- Lighthouse Performance: +1-3 punti

## Files da Modificare
- ✏️ `lib/hooks/useSpotify.ts` (Intersection Observer)
- ✏️ `components/chat/ChatTrigger.tsx` (prefetch on hover)
- ✏️ `app/[locale]/blog/page.tsx` (ISR revalidate)
- ✏️ `app/[locale]/blog/[slug]/page.tsx` (ISR + generateStaticParams)
- ✏️ `lib/blog/mdx.ts` (React cache)
- ✏️ `components/providers/ReactQueryProvider.tsx` (staleTime config)
- ✏️ `app/api/spotify/now-playing/route.ts` (cache headers)
- ✏️ Altri API routes (cache headers)

## Note Tecniche
- **Intersection Observer**: Zero performance overhead (nativo, hardware-accelerated)
- **Prefetch on hover**: Media 200-500ms vantaggio (tempo tra hover e click)
- **ISR**: Incremental Static Regeneration (best of static + dynamic)
- **React cache()**: Cache per request duration (evita doppi fetch in SSR)
- **stale-while-revalidate**: Serve cache stale mentre revalidata in background (best UX)

## Riferimenti
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [React Query Prefetching](https://tanstack.com/query/latest/docs/react/guides/prefetching)
- [Cache-Control Headers](https://web.dev/http-cache/)

---

## Tracking
**Creata**: 2025-11-15
**Assegnata a**: Claude Code
**Dipendenze**: Nessuna
