# [PF-001] Font Loading Optimization & Render Blocking Fix

## Metadata
- **Story ID**: PF-001
- **Epic**: [EPIC-008](../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Completamento**: -

## User Story
**Come** utente **Voglio** che i font si carichino istantaneamente senza bloccare il rendering **Così che** la pagina sia utilizzabile immediatamente

## Problema Attuale (Lighthouse Confirmed)
I font vengono caricati in modo inefficiente causando:
- **Font duplicate loading**: Dichiarati 3 volte (`app/fonts.ts` + `app/layout.tsx` + `globals.css`)
- **Render-blocking CSS**: `@import` in `globals.css` blocca il rendering
- **Missing preconnect**: Nessun hint DNS/preconnect per Google Fonts CDN
- **Over-fetching**: Tutti i weights (400, 500, 600, 700) caricati anche se non usati

### 🔴 Lighthouse Measurements (Production)
- **Google Fonts blocking time**: **790ms** (CRITICAL)
- **Element render delay (LCP)**: **1,420ms** (CRITICAL) - causato da animation delays + font loading
- **Network dependency chain**: HTML → CSS → Google Fonts CSS → 4 font files (422ms critical path)
- **Total render blocking**: **600ms savings** possibili
- **Fonts loaded**: 4 files (89 KiB total from fonts.gstatic.com)

**LCP Element**: `h1.text-hero` (Hero headline)
**TTFB**: 40ms (ottimo)
**Render delay**: 1,420ms (PROBLEMA - animazioni + fonts)

## Criteri di Accettazione
- [ ] **AC1**: Font caricati una sola volta tramite `next/font`
- [ ] **AC2**: Zero `@import` render-blocking in CSS
- [ ] **AC3**: Preconnect hints per Google Fonts CDN
- [ ] **AC4**: Solo font weights effettivamente utilizzati caricati
- [ ] **AC5**: `font-display: swap` abilitato per evitare FOIT (Flash Of Invisible Text)
- [ ] **AC6**: Lighthouse non segnala più "Eliminate render-blocking resources"

## Implementazione Guidata

### Step 1: Audit Font Usage
```bash
# Trova tutti i font weights usati
npx grep -r "font-weight" app/ components/ --include="*.tsx" --include="*.css"
npx grep -r "font-(light|normal|medium|semibold|bold)" app/ components/

# Output atteso: identificare weights realmente usati
```

### Step 2: Consolidare Font in `app/fonts.ts`
**File**: `app/fonts.ts`

```typescript
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

// Heading font - Space Grotesk
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'], // Solo weights usati (rimuovere 400, 600 se non necessari)
  display: 'swap',
  variable: '--font-heading',
  preload: true,
})

// Body font - Inter
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'], // Solo weights usati
  display: 'swap',
  variable: '--font-body',
  preload: true,
})

// Code font - JetBrains Mono
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'], // Solo weights usati
  display: 'swap',
  variable: '--font-mono',
  preload: true,
})
```

### Step 3: Rimuovere Duplicati in `app/layout.tsx`
**File**: `app/layout.tsx`

**RIMUOVERE** (linee 8-24 circa):
```typescript
// ❌ DELETE: Duplicato, già in fonts.ts
const spaceGrotesk = Space_Grotesk({ ... })
const inter = Inter({ ... })
```

**MANTENERE** solo import:
```typescript
import { spaceGrotesk, inter, jetbrainsMono } from './fonts'
```

### Step 4: Rimuovere @import in `globals.css`
**File**: `app/globals.css`

**RIMUOVERE** (linea 1):
```css
/* ❌ DELETE: Render-blocking */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
```

I font sono già gestiti da `next/font`, non servono import CSS.

### Step 5: Aggiungere Preconnect Hints
**File**: `app/layout.tsx`

Aggiungere nel `<head>`:
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

### Step 6: Fix Animation Delays (Reduce LCP Render Delay)
**File**: `components/sections/Hero.tsx`

Lighthouse mostra **1,420ms element render delay** per `h1.text-hero`. Questo è causato da animation delays su Framer Motion.

**CRITICAL FIX**: Rimuovere delays da elementi above-the-fold:

```tsx
// ❌ BEFORE (BAD - delays rendering)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }} // REMOVE delay!
>

// ✅ AFTER (GOOD - immediate render)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: 0 }} // No delay, faster duration
>
```

**Elementi da fixare** (Hero.tsx):
- Badge: `delay: 0.2` → `delay: 0`
- Headline (h1 LCP element): `delay: 0.4` → `delay: 0`
- Subtitle: `delay: 0.6` → `delay: 0`
- CTA button: `delay: 0.8` → `delay: 0`

**Impact**: -800ms to -1,000ms render delay

**Nota**: Mantieni animazioni (good UX), rimuovi solo i **delays** che bloccano il rendering.

### Step 7: Verificare CSS Variables
**File**: `tailwind.config.ts`

Assicurarsi che le variabili CSS siano mappate:
```typescript
fontFamily: {
  heading: ['var(--font-heading)', 'sans-serif'],
  body: ['var(--font-body)', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace'],
}
```

## Test Plan
```bash
# 1. Build production
npm run build

# 2. Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Verificare:
# - "Eliminate render-blocking resources" NON appare
# - FCP migliora di 300-500ms
# - Nessun warning su font loading

# 3. Visual test
npm run dev
# Aprire DevTools > Network > Filter: Font
# Verificare:
# - Ogni font caricato UNA sola volta
# - Font caricati da _next/static (non da Google CDN diretto)
# - `font-display: swap` presente negli headers

# 4. Coverage test
# DevTools > More Tools > Coverage
# Verificare che tutti i font weights caricati siano utilizzati (>80% usage)
```

## Definition of Done
- [ ] Font consolidati in `app/fonts.ts` (single source of truth)
- [ ] Duplicati rimossi da `app/layout.tsx`
- [ ] `@import` rimosso da `globals.css`
- [ ] Preconnect hints aggiunti
- [ ] Solo weights utilizzati caricati (verificato con grep/Coverage)
- [ ] `font-display: swap` attivo
- [ ] Lighthouse: "Eliminate render-blocking resources" passa ✅
- [ ] FCP migliora di almeno 200ms
- [ ] Build production senza errori
- [ ] Visual regression test passa (font rendering identico)

## Metriche di Successo
**Prima** (Lighthouse Misurato):
- **Google Fonts blocking**: 790ms
- **Element render delay**: 1,420ms
- **Total savings possibili**: 600ms
- Lighthouse Warning: "Eliminate render-blocking resources"
- Font loaded: 4 requests (89 KiB da Google CDN)

**Dopo** (target):
- **Google Fonts blocking**: <100ms (-690ms)
- **Element render delay**: <500ms (-920ms) - combinato con rimozione animation delays
- Lighthouse: ✅ Nessun warning font
- Font loaded: 3 requests self-hosted (next/font optimization)
- **Lighthouse Performance**: +5-10 punti

**Combined with animation fix** (rimuovere delays su Hero):
- **Total LCP improvement**: -1.0s a -1.2s
- **Target LCP**: <2.0s (da 3.4s attuale)

## Files da Modificare
- ✏️ `app/fonts.ts` (consolidare)
- ✏️ `app/layout.tsx` (rimuovere duplicati, aggiungere preconnect)
- ✏️ `app/globals.css` (rimuovere @import)
- 👀 `tailwind.config.ts` (verificare mapping)

## Note Tecniche
- `next/font` ottimizza automaticamente i font (self-hosting, subsetting)
- `display: swap` previene FOIT (Flash Of Invisible Text)
- Preconnect hints riducono latency DNS/TLS di ~100-200ms
- Solo i glyphs usati vengono inclusi (subsetting automatico)

## Riferimenti
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Web.dev: Font Best Practices](https://web.dev/font-best-practices/)
- [Google Fonts: Display Swap](https://web.dev/font-display/)

---

## Tracking
**Creata**: 2025-11-15
**Assegnata a**: Claude Code
**Dipendenze**: Nessuna
