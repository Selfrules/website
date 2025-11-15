# [SEO-007] Enhanceare Blog API con Endpoint per Slug Singoli

## Metadata
- **Story ID**: SEO-007
- **Epic**: [EPIC-009](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟢 S (< 1 giorno)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Not Started | **Data Completamento**: -

## User Story
**Come** LLM o external API consumer **Voglio** endpoint API per recuperare singoli articoli via slug **Così che** possa accedere programmaticamente al contenuto senza parsing HTML

## Criteri di Accettazione
- [ ] **AC1**: Endpoint `GET /api/blog/[slug]` ritorna singolo articolo con full content
- [ ] **AC2**: Response include metadata completo (tags, category, author, dates)
- [ ] **AC3**: Endpoint supporta CORS per external consumption
- [ ] **AC4**: Rate limiting applicato (max 100 req/hour per IP)
- [ ] **AC5**: 404 error per slug non esistenti
- [ ] **AC6**: Response cached con stale-while-revalidate strategy

## Problema & Contesto

### Situazione Attuale
```bash
# Existing API:
GET /api/blog → Returns list of posts (excerpt only)

# Missing:
GET /api/blog/[slug] → 404 Not Found
```

**Use Cases Bloccati**:
- ❌ LLM che vogliono full content via API (attualmente devono parse HTML)
- ❌ External platforms che vogliono syndicate content
- ❌ Mobile app che vuole consumare blog posts
- ❌ Third-party analytics tools

## Implementazione Tecnica

### 1. Create Slug API Route

```typescript
// app/api/blog/[slug]/route.ts (NEW FILE)
import { NextRequest, NextResponse } from 'next/server'
import { getBlogPost } from '@/lib/blog/mdx'
import { addCorsHeaders } from '@/lib/api/cors'
import { rateLimit } from '@/lib/api/rate-limit'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // Rate limiting
  const rateLimitResult = await rateLimit(request, {
    limit: 100,
    window: 3600, // 1 hour
  })

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  try {
    const post = await getBlogPost(params.slug)

    // Check if published
    if (!post.published) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Return full post data
    const response = NextResponse.json(
      {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content, // 🆕 Full content
        author: post.author,
        date: post.date,
        modifiedDate: post.modifiedDate,
        category: post.category,
        tags: post.tags,
        coverImage: post.coverImage,
        readingTime: post.readingTime,
        locale: post.locale,
        url: `https://mattiacintura.com/${post.locale}/blog/${post.slug}`,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
        },
      }
    )

    return addCorsHeaders(request, response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    )
  }
}
```

### 2. Enhance `/api/blog` List Endpoint (optional)

```typescript
// app/api/blog/route.ts (MODIFY - add links)
export async function GET(request: NextRequest) {
  // ... existing logic

  const postsWithLinks = publishedPosts.map(post => ({
    ...post,
    url: `https://mattiacintura.com/${post.locale}/blog/${post.slug}`,
    apiUrl: `https://mattiacintura.com/api/blog/${post.slug}`, // 🆕 ADD
  }))

  return NextResponse.json({
    posts: postsWithLinks,
    total: postsWithLinks.length,
    // ... pagination if needed
  })
}
```

## Files da Modificare

```
📝 NEW FILES:
- /app/api/blog/[slug]/route.ts       # Single post API endpoint

🔧 MODIFY:
- /app/api/blog/route.ts              # Add apiUrl links (optional)
- /lib/api/rate-limit.ts              # Ensure rate limiting util exists
```

## Test Plan

### 1. Manual Testing
```bash
# Test existing post
curl http://localhost:3000/api/blog/come-gestiamo-product-roadmaps | jq .
# Expected: Full post object with content field

# Test non-existent post
curl http://localhost:3000/api/blog/non-existent-slug
# Expected: {"error":"Post not found"} (404)

# Test rate limiting (run 101 times)
for i in {1..101}; do curl http://localhost:3000/api/blog/test-slug; done
# Expected: Last request returns 429 Rate limit exceeded
```

### 2. Integration Test
```typescript
// __tests__/api/blog-slug.test.ts
import { GET } from '@/app/api/blog/[slug]/route'
import { NextRequest } from 'next/server'

describe('GET /api/blog/[slug]', () => {
  it('returns full post for valid slug', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog/test-slug')
    const response = await GET(request, { params: { slug: 'test-slug' } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.slug).toBe('test-slug')
    expect(data.content).toBeTruthy() // Full content
    expect(data.tags).toBeInstanceOf(Array)
  })

  it('returns 404 for non-existent slug', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog/fake')
    const response = await GET(request, { params: { slug: 'fake' } })

    expect(response.status).toBe(404)
    expect(await response.json()).toEqual({ error: 'Post not found' })
  })

  it('returns 404 for unpublished post', async () => {
    // Assuming you have an unpublished post for testing
    const request = new NextRequest('http://localhost:3000/api/blog/draft-post')
    const response = await GET(request, { params: { slug: 'draft-post' } })

    expect(response.status).toBe(404)
  })
})
```

### 3. CORS Test
```bash
# Test from external origin
curl -H "Origin: https://external-site.com" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     http://localhost:3000/api/blog/test-slug

# Expected headers:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

## Definition of Done
- [ ] `/api/blog/[slug]` route created
- [ ] Returns full post content for valid slugs
- [ ] Returns 404 for non-existent/unpublished posts
- [ ] CORS headers added for external access
- [ ] Rate limiting applied (100 req/hour)
- [ ] Response cached with stale-while-revalidate
- [ ] Integration tests passing
- [ ] Manual curl tests successful
- [ ] Build passes (`npm run build`)
- [ ] Type checking passes (`npm run type-check`)

---

## Note Implementative

### API Response Format
```json
{
  "slug": "come-gestiamo-product-roadmaps",
  "title": "Come gestiamo le product roadmaps che funzionano",
  "excerpt": "Le roadmap non sono promesse...",
  "content": "<full HTML or markdown content>",
  "author": "Mattia Filippo De Luca",
  "date": "2024-11-10",
  "modifiedDate": "2024-11-15",
  "category": "Product Management",
  "tags": ["Product Management", "Roadmap", "OKRs"],
  "coverImage": "https://...",
  "readingTime": "8 min read",
  "locale": "it",
  "url": "https://mattiacintura.com/it/blog/come-gestiamo-product-roadmaps"
}
```

### Rate Limiting Strategy
```
Tier 1: Anonymous users → 100 req/hour
Tier 2: Authenticated users (future) → 1000 req/hour
Tier 3: API key users (future) → 10000 req/hour
```

### Cache Strategy
Same as feed:
- **1 hour cache**: Content raramente cambia dopo pubblicazione
- **stale-while-revalidate**: Serve cached mentre rigenera
- **Purge on deploy**: Cache resettata quando nuovo post è pubblicato

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Story creata da SEO audit |
