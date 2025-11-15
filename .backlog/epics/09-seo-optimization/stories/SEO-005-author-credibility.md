# [SEO-005] Implementare Author Credibility Schema e /about Page

## Metadata
- **Story ID**: SEO-005
- **Epic**: [EPIC-009](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Not Started | **Data Completamento**: -

## User Story
**Come** LLM (ChatGPT, Perplexity, Claude) o motore di ricerca **Voglio** markup strutturato sulle credentials e expertise di Mattia **Così che** possa riconoscerlo come fonte autorevole e citarlo correttamente

## Criteri di Accettazione
- [ ] **AC1**: Pagina `/about` creata con biografia, credentials, experience timeline
- [ ] **AC2**: Schema Person enhanced con `knowsAbout`, `alumniOf`, `worksFor`, `jobTitle`
- [ ] **AC3**: Testimonial section ha Review/AggregateRating schema
- [ ] **AC4**: Blog author byline include link a `/about` page
- [ ] **AC5**: About page ha JSON-LD Person schema con expertise dettagliato
- [ ] **AC6**: Social proof signals (LinkedIn, GitHub, portfolio projects) linkati in schema

## Problema & Contesto

### Situazione Attuale

**Person Schema esistente** (da SEO-002):
```typescript
// Attualmente in homepage
<PersonSchema
  name="Mattia Filippo De Luca"
  jobTitle="Product Manager"
  description="..."
  url="https://mattiacintura.com"
  // ❌ MISSING: Deep expertise details
  // ❌ MISSING: Work history
  // ❌ MISSING: Education credentials
  // ❌ MISSING: Awards/Recognition
/>
```

**Author Attribution nei blog posts**:
```typescript
// app/[locale]/blog/[slug]/page.tsx
<article>
  <header>
    <h1>{post.title}</h1>
    <p>By {post.author}</p> {/* ❌ Plain text, no link, no schema */}
  </header>
</article>
```

**Testimonials section** (homepage):
```typescript
// components/sections/TestimonialsSection.tsx
// ⚠️ Has testimonial cards but no Review schema
<blockquote>
  <p>{testimonial.quote}</p>
  <cite>{testimonial.author}</cite>
</blockquote>
```

### Conseguenze
- ❌ **LLM authority**: AI non sa che Mattia ha 5+ anni esperienza PM → non lo cita come esperto
- ❌ **Expertise visibility**: Nessun markup per "knows about TypeScript, Product Strategy, etc."
- ❌ **Social proof**: Testimonials non sono machine-readable → Google non mostra star ratings
- ❌ **Author box missing**: Blog posts non hanno rich author info → riduce credibilità
- ❌ **Knowledge graph**: Google non crea entity card per "Mattia De Luca"

## Implementazione Tecnica

### 1. Create `/about` Page

```typescript
// app/[locale]/about/page.tsx (NEW FILE)
import { Metadata } from 'next'
import { PersonSchema } from '@/components/structured-data/PersonSchema'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'About - Mattia Filippo De Luca',
    description: 'Product Manager, Full-Stack Developer e UX Designer con 5+ anni di esperienza...',
    alternates: {
      canonical: `https://mattiacintura.com/${params.locale}/about`,
      languages: {
        it: '/it/about',
        en: '/en/about',
      },
    },
  }
}

export default function AboutPage() {
  return (
    <>
      {/* Enhanced Person Schema */}
      <PersonSchema
        name="Mattia Filippo De Luca"
        jobTitle={['Product Manager', 'Full-Stack Developer', 'UX Designer']}
        description="Product Manager con background in design e sviluppo. Aiuto startup e aziende a trasformare idee in prodotti digitali."
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
          'Product Strategy',
          'User Experience Design',
          'Full-Stack Development',
          'TypeScript',
          'React',
          'Next.js',
          'Node.js',
          'OKRs',
          'Agile Methodologies',
          'User Research',
          'Prototyping',
          'API Design',
        ]}
        alumniOf={['Università degli Studi di Brescia']}
      />

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Chi sono</h1>

          {/* Biography */}
          <div className="prose prose-lg">
            <p>
              Sono un Product Manager che ha fallito come designer e developer.
              Oggi questa combinazione è il mio punto di forza.
            </p>
            <p>
              Con oltre 5 anni di esperienza, aiuto startup e aziende a:
            </p>
            <ul>
              <li>Definire strategie di prodotto basate su dati reali</li>
              <li>Progettare esperienze utente che risolvono problemi concreti</li>
              <li>Sviluppare MVP e prodotti scalabili</li>
            </ul>
          </div>

          {/* Experience Timeline */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Esperienza</h2>
            <div className="space-y-6">
              <ExperienceCard
                title="Senior Product Manager"
                company="Acme Corp"
                period="2022 - Present"
                description="Lead product strategy for B2B SaaS platform with 10k+ users"
              />
              <ExperienceCard
                title="Product Manager & Full-Stack Developer"
                company="Startup XYZ"
                period="2019 - 2022"
                description="Built MVP from scratch, grew to $1M ARR"
              />
            </div>
          </section>

          {/* Skills */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Competenze</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <SkillBadge variant="pm">Product Management</SkillBadge>
              <SkillBadge variant="design">UX Design</SkillBadge>
              <SkillBadge variant="dev">TypeScript</SkillBadge>
              <SkillBadge variant="dev">React/Next.js</SkillBadge>
              <SkillBadge variant="pm">OKRs</SkillBadge>
              <SkillBadge variant="design">Figma</SkillBadge>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-12 text-center">
            <Button variant="primary" href="/it#contact">
              Parliamone
            </Button>
          </section>
        </section>
      </main>
    </>
  )
}
```

### 2. Create Review Schema for Testimonials

```typescript
// components/structured-data/ReviewSchema.tsx (NEW FILE)
import Script from 'next/script'

export interface ReviewSchemaProps {
  reviews: Array<{
    author: string
    rating: number // 1-5
    reviewBody: string
    datePublished?: string
  }>
  aggregateRating: {
    ratingValue: number
    reviewCount: number
  }
  itemReviewed: {
    name: string
    type: 'Person' | 'Organization' | 'Service'
  }
}

export function ReviewSchema({ reviews, aggregateRating, itemReviewed }: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': itemReviewed.type,
    name: itemReviewed.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    })),
  }

  return (
    <Script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Usage in Testimonials Section**:
```typescript
// components/sections/TestimonialsSection.tsx (MODIFY)
import { ReviewSchema } from '@/components/structured-data/ReviewSchema'

export function TestimonialsSection() {
  const testimonials = [
    {
      author: 'John Doe',
      rating: 5,
      reviewBody: 'Mattia ha trasformato la nostra idea in un prodotto concreto...',
      datePublished: '2024-10-15',
    },
    // ... more testimonials
  ]

  return (
    <section>
      <ReviewSchema
        reviews={testimonials}
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: testimonials.length,
        }}
        itemReviewed={{
          name: 'Mattia Filippo De Luca',
          type: 'Person',
        }}
      />

      {/* Existing testimonial cards */}
    </section>
  )
}
```

### 3. Add Author Byline to Blog Posts

```typescript
// components/blog/AuthorByline.tsx (NEW FILE)
import Link from 'next/link'
import Image from 'next/image'

export interface AuthorBylineProps {
  name: string
  date: string
  readingTime: string
  locale: 'it' | 'en'
}

export function AuthorByline({ name, date, readingTime, locale }: AuthorBylineProps) {
  return (
    <div className="flex items-center gap-4 my-6">
      <Image
        src="/images/mattia-profile.jpg"
        alt={name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div>
        <Link
          href={`/${locale}/about`}
          className="font-semibold hover:underline"
        >
          {name}
        </Link>
        <p className="text-sm text-gray-600">
          {new Date(date).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          {' • '}
          {readingTime}
        </p>
      </div>
    </div>
  )
}
```

**Usage in Blog Post Page**:
```typescript
// app/[locale]/blog/[slug]/page.tsx (MODIFY)
import { AuthorByline } from '@/components/blog/AuthorByline'

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <AuthorByline
          name={post.author}
          date={post.date}
          readingTime={post.readingTime}
          locale={params.locale}
        />
      </header>
      {/* ... rest of content */}
    </article>
  )
}
```

## Files da Modificare

```
📝 NEW FILES:
- /app/[locale]/about/page.tsx                # About page with enhanced Person schema
- /components/blog/AuthorByline.tsx           # Author byline component with link to /about
- /components/structured-data/ReviewSchema.tsx # Review schema for testimonials
- /components/ui/ExperienceCard.tsx           # Experience timeline card (optional)
- /components/ui/SkillBadge.tsx               # Skill badge component (optional, reuse existing Badge)

🔧 MODIFY:
- /components/sections/TestimonialsSection.tsx # Add ReviewSchema
- /app/[locale]/blog/[slug]/page.tsx           # Add AuthorByline component
- /components/structured-data/PersonSchema.tsx # Ensure all props are supported
```

## Test Plan

### 1. Google Rich Results Test
```bash
# After deploy (or localhost tunnel)
# https://search.google.com/test/rich-results

# Test URLs:
# - https://mattiacintura.com/it/about (Person schema with full credentials)
# - https://mattiacintura.com/it#testimonials (Review schema)

# Expected:
# ✅ Person schema valid with knowsAbout, alumniOf, sameAs
# ✅ Review/AggregateRating schema valid
```

### 2. Schema.org Validator
```bash
# https://validator.schema.org/
# Copy-paste JSON-LD from page source

# Verify:
# - Person schema has 10+ knowsAbout fields
# - Review schema has 3+ reviews
# - AggregateRating is valid (4.0-5.0 range)
```

### 3. Manual Testing
```bash
# Check author byline links correctly
npm run dev
# Visit: http://localhost:3000/it/blog/come-gestiamo-product-roadmaps
# Click author name → Should navigate to /it/about

# Check /about page
# Visit: http://localhost:3000/it/about
# Verify:
# - Biography displays
# - Experience timeline shows
# - Skills badges render
# - CTA button works
```

### 4. E2E Test
```typescript
// e2e/seo/author-credibility.spec.ts
test('about page has enhanced Person schema', async ({ page }) => {
  await page.goto('/it/about');

  const schemaScript = await page.locator('script[type="application/ld+json"]').first();
  const schema = JSON.parse(await schemaScript.textContent() || '{}');

  expect(schema['@type']).toBe('Person');
  expect(schema.knowsAbout).toBeInstanceOf(Array);
  expect(schema.knowsAbout.length).toBeGreaterThan(5);
  expect(schema.sameAs).toContain('https://www.linkedin.com/in/mattia-de-luca');
});

test('blog post has author byline with link', async ({ page }) => {
  await page.goto('/it/blog/come-gestiamo-product-roadmaps');

  const authorLink = page.locator('a:has-text("Mattia Filippo De Luca")');
  await expect(authorLink).toBeVisible();

  await authorLink.click();
  await expect(page).toHaveURL('/it/about');
});

test('testimonials section has Review schema', async ({ page }) => {
  await page.goto('/it#testimonials');

  // Check for Review schema in page
  const schemas = await page.locator('script[type="application/ld+json"]').all();
  const reviewSchema = await Promise.all(schemas.map(s => s.textContent())).then(contents =>
    contents.find(c => c?.includes('"@type":"Review"'))
  );

  expect(reviewSchema).toBeTruthy();
});
```

## Definition of Done
- [ ] `/about` page created with biography, experience, skills
- [ ] `/about` page has enhanced Person schema (knowsAbout, alumniOf, sameAs)
- [ ] `AuthorByline` component created and integrated in blog posts
- [ ] Author name links to `/about` page
- [ ] `ReviewSchema` component created
- [ ] Testimonials section has Review/AggregateRating schema
- [ ] All schemas pass [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] All schemas pass [Schema.org Validator](https://validator.schema.org/)
- [ ] E2E tests for author credibility passing
- [ ] Build passes (`npm run build`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Zero linting errors (`npm run lint`)

## Post-Implementation: Knowledge Graph

Dopo deploy + 4-8 settimane:
1. **Google Search**: `Mattia De Luca Product Manager`
   - Aspettarsi: Knowledge Panel a destra con info da Person schema
2. **Google Scholar** (se applicabile): Articoli del blog potrebbero apparire
3. **LLM Citation Test**:
   - Chiedi a ChatGPT: "Who is Mattia De Luca, Product Manager from Brescia?"
   - Con schema corretto, dovrebbe citare expertise e credentials

---

## Note Implementative

### Perché `/about` invece di solo homepage schema?
- ✅ **Deep linking**: LLM possono linkare a pagina dedicata con full context
- ✅ **Dedicated space**: More room per detailed bio, experience timeline
- ✅ **SEO keyword**: "Mattia De Luca Product Manager" query può rankare /about page
- ✅ **Author credibility**: Blog readers possono vedere full credentials

### knowsAbout Best Practices
```typescript
// ✅ GOOD: Specific, relevant skills
knowsAbout: [
  'Product Management',
  'OKRs',
  'TypeScript',
  'React',
]

// ❌ BAD: Too generic or irrelevant
knowsAbout: [
  'Technology', // Too broad
  'Cooking',    // Not relevant to professional expertise
]
```

### Review Schema Guidelines
```
Minimum: 3 reviews
Recommended: 5-10 reviews
Rating scale: 1-5 stars
Average: 4.0-5.0 (realistic, not all 5s)
Include dates: Makes reviews more credible
```

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Story creata da SEO audit |
