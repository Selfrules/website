# [PF-003] Image Optimization & AVIF Support

## Metadata
- **Story ID**: PF-003
- **Epic**: [EPIC-008](../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Completamento**: -

## User Story
**Come** utente **Voglio** che le immagini si carichino velocemente in formato moderno **Così che** possa vedere i contenuti visivi senza attendere

## Problema Attuale
Le immagini non sono ottimizzate correttamente:
- **Missing AVIF**: `next.config.mjs` supporta solo WebP (AVIF è 20-30% più efficiente)
- **No priority flags**: Immagini above-the-fold (Hero, Spotify album) non marcate come `priority`
- **Missing sizes attribute**: Next.js non sa quali dimensioni generare
- **Spotify album art**: Lazy-loaded anche quando visibile (degrada LCP)

**Impatto misurato**: ~200-400ms delay in LCP, Lighthouse "Use modern image formats" warning

## Criteri di Accettazione
- [ ] **AC1**: AVIF format abilitato in `next.config.mjs`
- [ ] **AC2**: Immagini Hero marcate con `priority={true}`
- [ ] **AC3**: Spotify album art con `priority={true}` quando Now Playing visibile
- [ ] **AC4**: Tutti i `<Image>` hanno attributo `sizes` appropriato
- [ ] **AC5**: Placeholder blur per immagini dinamiche (Spotify, blog thumbnails)
- [ ] **AC6**: Lighthouse: "Use modern image formats" passa ✅
- [ ] **AC7**: Lighthouse: "Properly size images" passa ✅

## Implementazione Guidata

### Step 1: Enable AVIF in Next.js Config
**File**: `next.config.mjs` (linea 43)

**PRIMA**:
```javascript
images: {
  formats: ['image/webp'],
  // ...
}
```

**DOPO**:
```javascript
images: {
  formats: ['image/avif', 'image/webp'], // AVIF first (smallest), WebP fallback
  minimumCacheTTL: 31536000, // 1 year cache for optimized images
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Default is good
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Default is good
}
```

### Step 2: Add Priority to Hero Images
**File**: `components/sections/Hero.tsx`

Identificare immagini above-the-fold (se presenti) e aggiungere `priority`:
```tsx
import Image from 'next/image'

export function Hero() {
  return (
    <section>
      {/* Se c'è un'immagine hero/avatar */}
      <Image
        src="/images/hero-avatar.jpg"
        alt="Mattia Cintura"
        width={400}
        height={400}
        priority={true} // ✅ Preload per LCP
        sizes="(max-width: 768px) 200px, 400px"
      />
    </section>
  )
}
```

### Step 3: Optimize Spotify Album Art
**File**: `components/integrations/SpotifyWidget.tsx` (linee 99-106, 153-160)

**PRIMA**:
```tsx
<Image
  src={albumArt}
  alt={`${track.name} album cover`}
  width={64}
  height={64}
  className="rounded-brutal"
  // ❌ Default: loading="lazy"
/>
```

**DOPO**:
```tsx
<Image
  src={albumArt}
  alt={`${track.name} album cover`}
  width={64}
  height={64}
  className="rounded-brutal"
  priority={isNowPlaying} // ✅ Priority se visibile
  sizes="64px" // ✅ Exact size
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // ✅ Blur placeholder (vedi helper sotto)
/>
```

**Helper per blur placeholder**:
```typescript
// lib/utils/image.ts
export function getBlurDataURL(width: number, height: number): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#e5e5e5"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

// Usage
import { getBlurDataURL } from '@/lib/utils/image'

<Image
  blurDataURL={getBlurDataURL(64, 64)}
  // ...
/>
```

### Step 4: Add Sizes Attribute to All Images
Audit tutti gli `<Image>` components e aggiungere `sizes`.

**File**: Cercare globalmente
```bash
npx grep -r "<Image" components/ app/ --include="*.tsx" -A 5
```

**Regola per `sizes`**:
```tsx
// Immagine full-width mobile, 50% desktop
sizes="(max-width: 768px) 100vw, 50vw"

// Immagine fixed-size
sizes="200px"

// Immagine responsive con breakpoints
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

**Esempi**:

**Blog Card Image**:
```tsx
// components/blog/BlogCard.tsx
<Image
  src={post.coverImage}
  alt={post.title}
  width={800}
  height={450}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={post.blurDataURL || getBlurDataURL(800, 450)}
/>
```

**Avatar/Logo** (fixed size):
```tsx
<Image
  src="/images/logo.png"
  alt="Logo"
  width={48}
  height={48}
  sizes="48px"
/>
```

### Step 5: Optimize Static Images (if any)
Se ci sono immagini statiche in `/public/images/`:

```bash
# Install image optimization tools
npm install -D sharp

# Optimize all images (one-time)
npx @next/image-optimizer ./public/images
```

**Oppure** usa servizio online: [Squoosh.app](https://squoosh.app/)

### Step 6: Configure Image Loader (Optional - Advanced)
Se usi CDN esterno (Cloudflare Images, Cloudinary):

**File**: `next.config.mjs`
```javascript
images: {
  loader: 'custom',
  loaderFile: './lib/image-loader.ts',
}
```

**File**: `lib/image-loader.ts`
```typescript
export default function cloudflareLoader({ src, width, quality }) {
  return `https://imagedelivery.net/<YOUR_ACCOUNT_HASH>/${src}/w=${width},q=${quality || 75}`
}
```

## Test Plan
```bash
# 1. Build production
npm run build

# 2. Check generated images
ls -lh .next/cache/images
# Verificare presenza file .avif (più piccoli di .webp)

# 3. Lighthouse audit
npx lighthouse http://localhost:3000 --view
# Verificare:
# - "Use modern image formats" passa
# - "Properly size images" passa
# - LCP migliora (immagine hero caricata più velocemente)

# 4. Network test
npm run dev
# DevTools > Network > Filter: Img
# Verificare:
# - Browser moderni ricevono AVIF (Type: avif)
# - Safari riceve WebP fallback
# - Immagini con priority caricate subito (no lazy)
# - Dimensioni immagini appropriate (non 4K per thumbnail 200px)

# 5. Visual test su diversi device
# Responsive Design Mode
# Verificare che immagini si caricano nelle dimensioni corrette
```

## Definition of Done
- [ ] AVIF enabled in `next.config.mjs`
- [ ] Cache TTL configurato (1 year)
- [ ] Hero images con `priority={true}`
- [ ] Spotify album art con `priority` conditional
- [ ] Tutti gli `<Image>` hanno `sizes` attribute
- [ ] Blur placeholders aggiunti per immagini dinamiche
- [ ] Lighthouse: "Use modern image formats" ✅
- [ ] Lighthouse: "Properly size images" ✅
- [ ] LCP migliora di almeno 150ms
- [ ] Visual regression test passa
- [ ] Build production senza errori

## Metriche di Successo
**Prima**:
- LCP: ~3.5s (se hero image è LCP element)
- Lighthouse Warning: "Use modern image formats: 300KB savings"
- Lighthouse Warning: "Properly size images"
- Image requests: WebP only

**Dopo** (target):
- LCP: <3s (-500ms se image-based)
- Lighthouse: ✅ No warnings
- Image savings: 20-30% vs WebP
- Image requests: AVIF (Chrome/Edge), WebP (Safari/Firefox)
- Lighthouse Performance: +3-5 punti

## Files da Modificare
- ✏️ `next.config.mjs` (enable AVIF, cache TTL)
- ✏️ `components/sections/Hero.tsx` (priority flags)
- ✏️ `components/integrations/SpotifyWidget.tsx` (priority, sizes, blur)
- ✏️ `components/blog/BlogCard.tsx` (sizes, blur)
- ✏️ `lib/utils/image.ts` (NEW - blur placeholder helper)
- 👀 Tutti i componenti con `<Image>` (audit sizes)

## Checklist Audit Images
```bash
# Genera lista di tutti gli Image components
npx grep -r "<Image" components/ app/ --include="*.tsx" -B 2 -A 8 > image-audit.txt

# Per ogni Image, verificare:
# [ ] Ha width/height
# [ ] Ha sizes attribute
# [ ] Ha priority se above-the-fold
# [ ] Ha placeholder se dinamico
# [ ] Ha alt text descrittivo
```

## Note Tecniche
- **AVIF**: ~30% più piccolo di WebP, ~50% più piccolo di JPEG (browser support: 94%+)
- **WebP fallback**: Automatico per browser che non supportano AVIF
- **minimumCacheTTL**: Immagini ottimizzate cachate 1 anno (immutable)
- **priority**: Previene lazy loading, aggiunge `<link rel="preload">`
- **sizes**: Permette a Next.js di generare dimensioni ottimali per responsive breakpoints
- **placeholder="blur"**: Migliora perceived performance (no CLS)

## Riferimenti
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [AVIF vs WebP](https://jakearchibald.com/2020/avif-has-landed/)
- [Web.dev: Optimize Images](https://web.dev/fast/#optimize-your-images)
- [Responsive Images Guide](https://web.dev/serve-responsive-images/)

---

## Tracking
**Creata**: 2025-11-15
**Assegnata a**: Claude Code
**Dipendenze**: Nessuna
