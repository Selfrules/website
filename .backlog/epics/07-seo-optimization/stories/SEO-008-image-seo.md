# [SEO-008] Ottimizzare Image SEO (alt validation, lazy loading consistency)

## Metadata
- **Story ID**: SEO-008
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟢 S (< 1 giorno)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Not Started | **Data Completamento**: -

## User Story
**Come** motore di ricerca e screen reader **Voglio** immagini con alt text descrittivo e lazy loading consistente **Così che** possa indicizzare il contenuto visivo e migliorare l'accessibilità

## Criteri di Accettazione
- [ ] **AC1**: Tutte le immagini hanno attributo `alt` non vuoto
- [ ] **AC2**: ESLint rule blocca build se `<img>` o `<Image>` hanno `alt=""` o missing alt
- [ ] **AC3**: Lazy loading applicato consistentemente a tutte le immagini below-the-fold
- [ ] **AC4**: Cover images dei blog posts hanno alt text descrittivo (non solo titolo)
- [ ] **AC5**: OpenGraph images hanno dimensioni corrette (1200x630)
- [ ] **AC6**: Audit tool automatico verifica image SEO su ogni build

## Problema & Contesto

### Situazione Attuale (da audit)
```typescript
// Audit findings:
// ✅ next/image used in 5 components
// ⚠️ Lazy loading found in 2 components (inconsistent)
// ❌ No ESLint rule enforcing alt text
```

**Image Usage Examples**:
```typescript
// ✅ GOOD: SpotifyWidget.tsx
<Image
  src={track.album.images[0]?.url}
  alt={`${track.name} by ${track.artists[0]?.name}`}
  loading="lazy"
/>

// ⚠️ POTENTIAL ISSUE: Generic alt text
<Image
  src={post.coverImage}
  alt={post.title} // Could be more descriptive
/>

// ❌ BAD: No alt validation
<img src="..." /> // No compile-time check
```

### Conseguenze
- ❌ **Google Image Search**: Immagini non indicizzate senza alt text
- ❌ **Accessibility**: Screen readers non possono descrivere immagini
- ❌ **SEO**: Missed opportunity per ranking su image search
- ❌ **Performance**: Immagini above-the-fold con lazy loading causano LCP issues

## Implementazione Tecnica

### 1. ESLint Rule per Alt Text

```json
// .eslintrc.json (MODIFY)
{
  "extends": [
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["jsx-a11y"],
  "rules": {
    // 🆕 Enforce alt text on images
    "jsx-a11y/alt-text": [
      "error",
      {
        "elements": ["img", "Image"],
        "img": ["Image"]
      }
    ],
    // 🆕 Prevent empty alt
    "jsx-a11y/img-redundant-alt": "warn"
  }
}
```

### 2. Create Image SEO Utility

```typescript
// lib/utils/image-seo.ts (NEW FILE)

/**
 * Generates descriptive alt text for blog cover images
 * Instead of just using post title, adds context
 */
export function generateCoverImageAlt(
  postTitle: string,
  category: string
): string {
  return `${postTitle} - ${category} article cover image`
}

/**
 * Validates image dimensions for OpenGraph
 */
export function validateOgImageDimensions(
  width: number,
  height: number
): boolean {
  const OPTIMAL_WIDTH = 1200
  const OPTIMAL_HEIGHT = 630
  const ASPECT_RATIO = OPTIMAL_WIDTH / OPTIMAL_HEIGHT

  const actualRatio = width / height
  return Math.abs(actualRatio - ASPECT_RATIO) < 0.1 // 10% tolerance
}

/**
 * Determines if image should be lazy loaded
 * Images above-the-fold (hero, first blog card) → eager
 * Images below-the-fold → lazy
 */
export function shouldLazyLoad(position: 'above-fold' | 'below-fold'): boolean {
  return position === 'below-fold'
}
```

### 3. Update Blog Cover Images

```typescript
// app/[locale]/blog/[slug]/page.tsx (MODIFY)
import { generateCoverImageAlt } from '@/lib/utils/image-seo'
import Image from 'next/image'

export default function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <article>
      <header>
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={generateCoverImageAlt(post.title, post.category)} // 🆕 Descriptive alt
            width={1200}
            height={630}
            priority // 🆕 Above-the-fold = eager loading
            className="w-full h-auto"
          />
        )}
      </header>
      {/* ... rest of content */}
    </article>
  )
}
```

### 4. Update Blog Card Images

```typescript
// components/blog/BlogCard.tsx (MODIFY - assuming exists)
import { shouldLazyLoad, generateCoverImageAlt } from '@/lib/utils/image-seo'

export function BlogCard({ post, position }: { post: BlogPost; position: number }) {
  const isAboveFold = position < 3 // First 3 cards visible

  return (
    <div className="blog-card">
      <Image
        src={post.coverImage}
        alt={generateCoverImageAlt(post.title, post.category)}
        width={600}
        height={315}
        loading={isAboveFold ? 'eager' : 'lazy'} // 🆕 Conditional lazy loading
      />
      {/* ... rest of card */}
    </div>
  )
}
```

### 5. Image Audit Script

```typescript
// scripts/audit-images.ts (NEW FILE)
import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

async function auditImages() {
  const files = await glob('**/*.{tsx,ts,jsx,js}', {
    ignore: ['node_modules/**', '.next/**'],
  })

  let errors = 0

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8')

    // Check for <img> without alt
    const imgMatches = content.match(/<img[^>]*>/g) || []
    for (const match of imgMatches) {
      if (!match.includes('alt=')) {
        console.error(`❌ ${file}: <img> missing alt attribute`)
        errors++
      } else if (match.includes('alt=""') || match.includes("alt=''")) {
        console.error(`❌ ${file}: <img> has empty alt attribute`)
        errors++
      }
    }

    // Check for Image without alt
    const ImageMatches = content.match(/<Image[^>]*\/>/g) || []
    for (const match of ImageMatches) {
      if (!match.includes('alt=')) {
        console.error(`❌ ${file}: <Image> missing alt attribute`)
        errors++
      }
    }
  }

  if (errors > 0) {
    console.error(`\n❌ Found ${errors} image SEO issues`)
    process.exit(1)
  } else {
    console.log('✅ All images have valid alt text')
  }
}

auditImages()
```

**Add to package.json**:
```json
{
  "scripts": {
    "audit:images": "tsx scripts/audit-images.ts",
    "build": "npm run audit:images && next build"
  }
}
```

## Files da Modificare

```
📝 NEW FILES:
- /lib/utils/image-seo.ts             # Image SEO utilities
- /scripts/audit-images.ts            # Build-time audit script

🔧 MODIFY:
- /.eslintrc.json                      # Add jsx-a11y rules
- /app/[locale]/blog/[slug]/page.tsx   # Fix cover image alt + priority
- /components/blog/BlogCard.tsx        # Fix lazy loading (if exists)
- /package.json                        # Add audit:images script
```

## Test Plan

### 1. ESLint Test
```bash
# Intentionally add image without alt
<Image src="..." /> # Missing alt

# Run linting
npm run lint
# Expected: Error "img elements must have an alt prop"

# Fix it
<Image src="..." alt="Description" />

# Re-run
npm run lint
# Expected: No errors
```

### 2. Image Audit Script Test
```bash
# Run audit
npm run audit:images
# Expected: Lists all images without alt text

# Fix issues, re-run
npm run audit:images
# Expected: "✅ All images have valid alt text"
```

### 3. Manual Inspection
```bash
# Build and check HTML output
npm run build
npm run start

# Inspect blog post page
curl http://localhost:3000/it/blog/test-post | grep -A2 '<img'
# Expected:
# <img src="..." alt="Descriptive text here" loading="lazy">

# Verify OpenGraph image
curl http://localhost:3000/it/blog/test-post | grep 'og:image'
# Expected:
# <meta property="og:image" content="..." />
# <meta property="og:image:width" content="1200" />
# <meta property="og:image:height" content="630" />
```

### 4. Lighthouse CI
```bash
# Run Lighthouse audit
npm run lighthouse

# Check "Accessibility" score
# Expected: 100/100 (no image alt text warnings)

# Check "SEO" score
# Expected: Image elements have alt attributes
```

## Definition of Done
- [ ] ESLint rule enforcing alt text added (`.eslintrc.json`)
- [ ] `image-seo.ts` utility created with alt generation helpers
- [ ] Blog cover images use descriptive alt text
- [ ] Blog cards have conditional lazy loading (eager for above-fold)
- [ ] Image audit script created (`scripts/audit-images.ts`)
- [ ] Audit script runs on every build (`npm run build`)
- [ ] ESLint passes with no alt text errors (`npm run lint`)
- [ ] Lighthouse Accessibility score 100/100
- [ ] Build passes (`npm run build`)

---

## Note Implementative

### Alt Text Best Practices
```typescript
// ✅ GOOD: Descriptive, context-aware
alt="Product roadmap planning session with sticky notes and whiteboard"

// ⚠️ OK: Uses post title + context
alt="Come gestiamo le product roadmaps che funzionano - Product Management article"

// ❌ BAD: Just post title
alt="Come gestiamo le product roadmaps che funzionano"

// ❌ TERRIBLE: Empty or generic
alt=""
alt="image"
alt="photo"
```

### Lazy Loading Strategy
```
Above-the-fold (priority=true):
- Hero images
- First 2-3 blog cards on listing page
- Cover image on blog post page

Below-the-fold (loading="lazy"):
- Blog cards beyond #3
- Footer images
- Testimonial avatars
- Related posts images
```

### OpenGraph Image Requirements
```
Optimal: 1200×630 px (1.91:1 aspect ratio)
Minimum: 600×315 px
Maximum: 5MB file size
Format: JPG, PNG (WebP with fallback)
```

### ESLint jsx-a11y Plugin
```bash
# Install if not already present
npm install --save-dev eslint-plugin-jsx-a11y
```

Rules enforced:
- `alt-text`: Requires alt on <img> and <Image>
- `img-redundant-alt`: Warns on alt text containing "image", "photo", etc.

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Story creata da SEO audit |
