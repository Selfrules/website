# [SEO-003] Fix hreflang e canonical URLs per i18n

## Metadata
- **Story ID**: SEO-003
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟢 S (< 1 giorno)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Not Started | **Data Completamento**: -

## User Story
**Come** motore di ricerca (Google) **Voglio** tag hreflang e canonical URL corretti **Così che** possa mostrare la versione linguistica corretta agli utenti italiani e inglesi

## Criteri di Accettazione
- [ ] **AC1**: Ogni pagina ha tag `<link rel="canonical">` nel `<head>`
- [ ] **AC2**: Ogni pagina ha tag `<link rel="alternate" hreflang="it">` per versione italiana
- [ ] **AC3**: Ogni pagina ha tag `<link rel="alternate" hreflang="en">` per versione inglese
- [ ] **AC4**: Homepage ha hreflang con `x-default` che punta a versione italiana
- [ ] **AC5**: metadataBase è configurato nel root layout
- [ ] **AC6**: Google Search Console non mostra errori hreflang dopo deploy

## Problema & Contesto

### Situazione Attuale

**Metadata esistente** (da audit):
```typescript
// app/[locale]/blog/[slug]/page.tsx - ✅ GOOD
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `/en/blog/${params.slug}`,
        it: `/it/blog/${params.slug}`,
      },
    },
  };
}

// app/layout.tsx - ❌ MISSING metadataBase
export const metadata: Metadata = {
  title: { ... },
  description: '...',
  // ❌ NO metadataBase defined
};

// app/[locale]/blog/page.tsx - ❌ MISSING alternates
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  return {
    title: `Blog - Mattia Filippo De Luca`,
    description: '...',
    // ❌ NO alternates.canonical
    // ❌ NO alternates.languages
  };
}

// app/[locale]/page.tsx - ❌ MISSING alternates
export default function HomePage() {
  // ❌ NO metadata export → falls back to root layout
}
```

**Test E2E che fallisce**:
```typescript
// e2e/complete-i18n.spec.ts:219-232
test('i18n metadata includes hreflang tags', async ({ page }) => {
  await page.goto('/it');

  const hreflangLinks = await page.locator('link[rel="alternate"][hreflang]').count();
  expect(hreflangLinks).toBeGreaterThan(0);
  // ❌ FAILS: Currently 0 hreflang tags found

  const hreflangIt = await page.locator('link[hreflang="it"]').getAttribute('href');
  expect(hreflangIt).toContain('/it');
  // ❌ FAILS: Tag not found
});
```

### Conseguenze
- ❌ Google non sa che esistono versioni IT/EN → mostra versione sbagliata agli utenti
- ❌ Duplicate content issues possibili (Google vede `/it` e `/en` come pagine separate senza relazione)
- ❌ GSC mostra errori hreflang (se verificato)
- ❌ Traffico internazionale perso (utenti inglesi vedono versione IT, si confondono, bounce)

## Implementazione Tecnica

### 1. Aggiungere `metadataBase` al root layout

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://mattiacintura.com'), // 🆕 ADD THIS
  title: {
    default: 'Mattia Filippo De Luca - Product Manager & Developer',
    template: '%s | Mattia Filippo De Luca',
  },
  description: '...',
  // ... rest of metadata
}
```

**Perché è necessario?**
- Next.js usa `metadataBase` per generare URLs assoluti nei tag `<link>`
- Senza di esso, `alternates.languages` genera URL relativi (non validi per hreflang)

### 2. Fix Homepage metadata

```typescript
// app/[locale]/page.tsx
import type { Metadata } from 'next'

type HomePageProps = {
  params: { locale: string }
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = params

  return {
    alternates: {
      canonical: `https://mattiacintura.com/${locale}`,
      languages: {
        en: '/en',
        it: '/it',
        'x-default': '/it', // 🆕 Default to Italian
      },
    },
  }
}

export default function HomePage({ params }: HomePageProps) {
  // ... existing component code
}
```

### 3. Fix Blog listing metadata

```typescript
// app/[locale]/blog/page.tsx
import type { Metadata } from 'next'

type BlogPageProps = {
  params: { locale: string }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = params

  return {
    title: locale === 'it' ? 'Blog' : 'Blog',
    description: locale === 'it'
      ? 'Articoli su Product Management, Design e Sviluppo'
      : 'Articles about Product Management, Design and Development',
    alternates: {
      canonical: `https://mattiacintura.com/${locale}/blog`, // 🆕 ADD
      languages: {
        en: '/en/blog',
        it: '/it/blog',
      },
    },
  }
}
```

### 4. Verify Blog post metadata (già corretto)

```typescript
// app/[locale]/blog/[slug]/page.tsx
// ✅ Already has alternates - verify it works after metadataBase is added

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const canonicalUrl = `https://mattiacintura.com/${params.locale}/blog/${params.slug}`;

  return {
    alternates: {
      canonical: canonicalUrl, // ✅ GOOD
      languages: {
        en: `/en/blog/${params.slug}`,
        it: `/it/blog/${params.slug}`,
      },
    },
  };
}
```

## Files da Modificare

```
🔧 MODIFY:
- /app/layout.tsx                    # Add metadataBase
- /app/[locale]/page.tsx             # Add generateMetadata with alternates
- /app/[locale]/blog/page.tsx        # Add alternates to existing generateMetadata
```

## Test Plan

### Manual Testing (dopo implementazione)
```bash
# 1. Run dev server
npm run dev

# 2. Inspect head tags
# Homepage IT
curl http://localhost:3000/it | grep -E 'canonical|hreflang'
# Expected output:
# <link rel="canonical" href="https://mattiacintura.com/it" />
# <link rel="alternate" hreflang="it" href="https://mattiacintura.com/it" />
# <link rel="alternate" hreflang="en" href="https://mattiacintura.com/en" />
# <link rel="alternate" hreflang="x-default" href="https://mattiacintura.com/it" />

# Homepage EN
curl http://localhost:3000/en | grep -E 'canonical|hreflang'

# Blog listing IT
curl http://localhost:3000/it/blog | grep -E 'canonical|hreflang'

# Blog post IT
curl http://localhost:3000/it/blog/come-gestiamo-product-roadmaps | grep -E 'canonical|hreflang'
```

### E2E Test (update existing)
```typescript
// e2e/complete-i18n.spec.ts (modify existing test)

test('i18n metadata includes hreflang tags', async ({ page }) => {
  await page.goto('/it');

  // Check hreflang tags exist
  const hreflangLinks = await page.locator('link[rel="alternate"][hreflang]').count();
  expect(hreflangLinks).toBeGreaterThanOrEqual(3); // it, en, x-default

  // Check IT hreflang
  const hreflangIt = await page.locator('link[hreflang="it"]').getAttribute('href');
  expect(hreflangIt).toBe('https://mattiacintura.com/it');

  // Check EN hreflang
  const hreflangEn = await page.locator('link[hreflang="en"]').getAttribute('href');
  expect(hreflangEn).toBe('https://mattiacintura.com/en');

  // Check x-default hreflang
  const hreflangDefault = await page.locator('link[hreflang="x-default"]').getAttribute('href');
  expect(hreflangDefault).toBe('https://mattiacintura.com/it');

  // Check canonical
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonical).toBe('https://mattiacintura.com/it');
});

test('blog listing has correct hreflang', async ({ page }) => {
  await page.goto('/it/blog');

  const hreflangIt = await page.locator('link[hreflang="it"]').getAttribute('href');
  expect(hreflangIt).toContain('/it/blog');

  const hreflangEn = await page.locator('link[hreflang="en"]').getAttribute('href');
  expect(hreflangEn).toContain('/en/blog');
});

test('blog posts have correct hreflang', async ({ page }) => {
  await page.goto('/it/blog/come-gestiamo-product-roadmaps');

  const hreflangIt = await page.locator('link[hreflang="it"]').getAttribute('href');
  expect(hreflangIt).toContain('/it/blog/come-gestiamo-product-roadmaps');

  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonical).toContain('/it/blog/come-gestiamo-product-roadmaps');
});
```

### Validation Tools
```bash
# Google Search Console - dopo deploy
# https://search.google.com/search-console
# → Internazionalizzazione → hreflang

# hreflang tags tester
# https://technicalseo.com/tools/hreflang/
```

## Definition of Done
- [ ] `metadataBase` aggiunto a `/app/layout.tsx`
- [ ] Homepage (`/app/[locale]/page.tsx`) ha `generateMetadata` con alternates
- [ ] Blog listing (`/app/[locale]/blog/page.tsx`) ha alternates
- [ ] Blog posts hanno alternates (verify existing implementation)
- [ ] E2E test per hreflang passing (`npm run test:e2e`)
- [ ] Manual curl test mostra tag corretti (canonical + hreflang)
- [ ] Build passa senza errori (`npm run build`)
- [ ] Type checking passa (`npm run type-check`)

## Post-Implementation: Google Search Console

Dopo deploy in produzione:
1. Vai su [Google Search Console](https://search.google.com/search-console)
2. Seleziona proprietà `mattiacintura.com`
3. **Internazionalizzazione** → **hreflang**
   - Verifica: Nessun errore
   - Aspetta 2-4 settimane per vedere versioni linguistiche indicizzate correttamente
4. **Copertura** → **Pagine**
   - Verifica che `/it` e `/en` siano entrambe indicizzate senza duplicazioni

---

## Note Implementative

### hreflang Best Practices
```html
<!-- ✅ CORRECT: Absolute URLs -->
<link rel="alternate" hreflang="it" href="https://mattiacintura.com/it" />
<link rel="alternate" hreflang="en" href="https://mattiacintura.com/en" />

<!-- ❌ WRONG: Relative URLs -->
<link rel="alternate" hreflang="it" href="/it" />
<link rel="alternate" hreflang="en" href="/en" />
```

### x-default Usage
```html
<!-- x-default = fallback per utenti senza lingua specifica -->
<!-- Usa versione italiana come default -->
<link rel="alternate" hreflang="x-default" href="https://mattiacintura.com/it" />
```

### Canonical Self-Reference
Ogni pagina deve avere canonical che punta a sé stessa:
```html
<!-- On https://mattiacintura.com/it/blog -->
<link rel="canonical" href="https://mattiacintura.com/it/blog" />
<!-- NOT pointing to /en/blog -->
```

### Bi-directional Linking
hreflang deve essere bi-direzionale:
- Pagina `/it` deve linkare a `/en` (e viceversa)
- Pagina `/it` deve anche linkare a sé stessa (self-referential)

Next.js `alternates.languages` gestisce questo automaticamente ✅

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Story creata da SEO audit |
