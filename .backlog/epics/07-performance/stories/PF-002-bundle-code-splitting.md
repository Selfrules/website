# [PF-002] Bundle Size Reduction & Dynamic Imports

## Metadata
- **Story ID**: PF-002
- **Epic**: [EPIC-008](../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🔴 L (3-5 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Completamento**: -

## User Story
**Come** utente **Voglio** che il sito carichi solo il codice JavaScript necessario **Così che** la pagina sia interattiva in <3 secondi anche su connessioni lente

## Problema Attuale
Il bundle JavaScript è eccessivamente grande (~2-3MB) senza code splitting:
- **Firebase + firebase-admin**: ~2-3MB (usato solo in API routes, ma bundled ovunque)
- **googleapis**: ~1.5MB (usato solo in calendar API)
- **recharts**: ~500KB (usato solo in admin dashboard)
- **@anthropic-ai/sdk**: ~300KB (già dynamic import ✅, good!)
- **framer-motion**: ~200KB (caricato in 30+ componenti, no lazy loading)
- **Chat components**: ~50KB (caricato 2 volte, no lazy loading)

**Impatto misurato**: ~1-2s TTI (Time to Interactive), Lighthouse "Reduce unused JavaScript" warning

## Criteri di Accettazione
- [ ] **AC1**: Firebase lazy-loaded solo in API routes (non nel client bundle)
- [ ] **AC2**: googleapis lazy-loaded solo in calendar API
- [ ] **AC3**: recharts lazy-loaded solo in admin pages
- [ ] **AC4**: Chat components con dynamic imports + SSR: false
- [ ] **AC5**: Framer Motion lazy-loaded o sostituito con CSS animations dove possibile
- [ ] **AC6**: Main bundle <500KB (gzipped), riduzione 60%+ dal baseline
- [ ] **AC7**: Lighthouse: "Reduce unused JavaScript" passa ✅
- [ ] **AC8**: Bundle analyzer configurato e report disponibile

## Implementazione Guidata

### Step 1: Setup Bundle Analyzer
```bash
npm install --save-dev @next/bundle-analyzer
```

**File**: `next.config.mjs`
```javascript
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer({
  // ... existing config
})
```

**Run analysis**:
```bash
ANALYZE=true npm run build
# Apre automaticamente browser con visualizzazione interattiva
```

### Step 2: Dynamic Import Chat Components
**File**: `app/layout.tsx` (linea 66)

**PRIMA**:
```tsx
import ChatTrigger from '@/components/chat/ChatTrigger'

export default function Layout() {
  return (
    <>
      <ChatTrigger />
    </>
  )
}
```

**DOPO**:
```tsx
import dynamic from 'next/dynamic'

const ChatTrigger = dynamic(() => import('@/components/chat/ChatTrigger'), {
  ssr: false, // Client-only component
  loading: () => null, // No loading state needed (invisible trigger)
})

export default function Layout() {
  return (
    <>
      <ChatTrigger />
    </>
  )
}
```

**File**: `app/[locale]/page.tsx` (linea 52) - RIMUOVERE (duplicato, vedi PF-004)

### Step 3: Dynamic Import Heavy Sections
**File**: Identificare sezioni pesanti nella homepage

```tsx
// app/[locale]/page.tsx
import dynamic from 'next/dynamic'

// Lazy load components below the fold
const BlogSection = dynamic(() => import('@/components/sections/BlogNew'), {
  loading: () => <div className="h-96 animate-pulse bg-cream" />,
})

const ProjectsSection = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div className="h-96 animate-pulse bg-cream" />,
})

// Hero should NOT be lazy (above the fold)
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <>
      <Hero /> {/* Immediate load */}
      <ProjectsSection /> {/* Lazy load */}
      <BlogSection /> {/* Lazy load */}
    </>
  )
}
```

### Step 4: Optimize Framer Motion Usage
**Opzione A**: Lazy load Framer Motion

**File**: `components/ui/Button.tsx` (esempio)
```tsx
import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

const MotionButton = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.button),
  { ssr: false }
)

export function Button({ children, ...props }: ComponentProps<'button'>) {
  return (
    <MotionButton
      whileHover={{ x: -4, y: -4 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </MotionButton>
  )
}
```

**Opzione B**: CSS Animations per componenti semplici (RACCOMANDATO)

**File**: `components/ui/Button.tsx`
```tsx
// ❌ DELETE Framer Motion
import { motion } from 'framer-motion'

// ✅ USE CSS transition
export function Button({ children, ...props }: ComponentProps<'button'>) {
  return (
    <button
      className="transition-transform hover:-translate-x-1 hover:-translate-y-1 active:scale-98"
      {...props}
    >
      {children}
    </button>
  )
}
```

**Identificare componenti da convertire**:
```bash
# Lista tutti i componenti con Framer Motion
npx grep -r "from 'framer-motion'" components/ --include="*.tsx" -l

# Priorità: componenti semplici con solo whileHover/whileTap
# Mantenere Framer Motion per: animazioni complesse, stagger, variants
```

### Step 5: Admin Dashboard Code Splitting
**File**: `app/admin/page.tsx` (o simile)

```tsx
import dynamic from 'next/dynamic'

// Recharts è usato solo qui
const AnalyticsChart = dynamic(() => import('@/components/admin/AnalyticsChart'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-cream" />,
})

export default function AdminPage() {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <AnalyticsChart />
    </>
  )
}
```

### Step 6: Firebase/googleapis Server-Only
Questi sono già usati solo in API routes, MA verificare che non siano nel client bundle.

**File**: `app/api/calendar/route.ts`
```typescript
// ✅ GOOD: già dynamic import
const { google } = await import('googleapis')

// Se NON è già così, cambiare:
// ❌ BAD
import { google } from 'googleapis'

// ✅ GOOD
export async function GET() {
  const { google } = await import('googleapis')
  // ... rest of code
}
```

**Verificare con Bundle Analyzer**: googleapis/firebase NON devono apparire nel client bundle.

### Step 7: Next.js Package Auto-Optimization
**File**: `next.config.mjs`

```javascript
export default {
  // ... existing config

  experimental: {
    // Auto-optimize common packages
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'recharts',
    ],
  },

  // Ensure server-only packages stay server-only
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude server-only packages from client bundle
      config.resolve.alias = {
        ...config.resolve.alias,
        'firebase-admin': false,
        'googleapis': false,
      }
    }
    return config
  },
}
```

## Test Plan
```bash
# 1. Bundle analysis BEFORE
ANALYZE=true npm run build
# Screenshot del bundle size

# 2. Implement changes

# 3. Bundle analysis AFTER
ANALYZE=true npm run build
# Confrontare:
# - Main bundle size (dovrebbe ridursi 40-60%)
# - Numero di chunks (dovrebbe aumentare = good splitting)
# - Framer Motion/recharts/firebase NON in main bundle

# 4. Lighthouse audit
npx lighthouse http://localhost:3000 --view
# Verificare:
# - "Reduce unused JavaScript" passa
# - TTI migliora di 1-2s

# 5. Visual regression test
npm run dev
# Verificare che tutte le animazioni funzionino ancora
# Verificare che i lazy-loaded components appaiano correttamente

# 6. Coverage test
# DevTools > Coverage
# Verificare che unused JavaScript sia <20% (vs >50% prima)
```

## Definition of Done
- [ ] Bundle analyzer configurato (`npm run analyze`)
- [ ] Chat components con dynamic import
- [ ] Blog/Projects sections con dynamic import (below fold)
- [ ] Framer Motion: almeno 10 componenti convertiti a CSS o lazy-loaded
- [ ] Admin dashboard (recharts) con dynamic import
- [ ] Firebase/googleapis verificati server-only (non in client bundle)
- [ ] `optimizePackageImports` configurato in next.config
- [ ] Main bundle <500KB gzipped (riduzione 60%+ da baseline ~1.2MB)
- [ ] Lighthouse: "Reduce unused JavaScript" ✅
- [ ] TTI migliora di almeno 1s
- [ ] Zero regressioni visive (animazioni funzionano)
- [ ] Build production senza errori

## Metriche di Successo
**Prima**:
- Main bundle: ~1.2MB gzipped (~3.5MB uncompressed)
- TTI: ~4.2s
- Lighthouse Warning: "Reduce unused JavaScript: 1.8MB"
- Chunks: 3-5

**Dopo** (target):
- Main bundle: <500KB gzipped (~1.5MB uncompressed) → -60%
- TTI: <3s (-1.2s)
- Lighthouse: ✅ No warnings
- Chunks: 15-20 (code splitting efficace)
- Lighthouse Performance: +8-12 punti

## Files da Modificare
- ✏️ `next.config.mjs` (bundle analyzer, optimizePackageImports, webpack config)
- ✏️ `app/layout.tsx` (ChatTrigger dynamic import)
- ✏️ `app/[locale]/page.tsx` (sections dynamic import)
- ✏️ `components/ui/Button.tsx` (CSS animations o lazy Framer Motion)
- ✏️ `components/ui/Card.tsx` (CSS animations)
- ✏️ 10+ altri componenti con Framer Motion (convertire o lazy load)
- ✏️ `app/admin/page.tsx` (recharts dynamic import)
- 👀 `app/api/**/*.ts` (verificare firebase/googleapis già dynamic)

## Note Tecniche
- **dynamic()** crea chunk separato, caricato on-demand
- **ssr: false** previene SSR errors per componenti client-only
- **loading** component migliora perceived performance
- CSS animations sono **10x più leggere** di Framer Motion per casi semplici
- Bundle analyzer visualizza tree map interattiva (utile per identificare bloat)

## Priorità Implementazione (Day-by-Day)
**Day 1**: Setup + Chat/Admin (Quick wins)
- Bundle analyzer
- ChatTrigger dynamic import
- Admin recharts dynamic import
- Deploy + measure (aspettarsi +3-4 punti)

**Day 2-3**: Framer Motion Conversion (Biggest impact)
- Audit 30+ componenti
- Convertire 10 componenti a CSS
- Lazy load altri 5-10 componenti complessi
- Deploy + measure (aspettarsi +5-7 punti)

**Day 4**: Sections + Polishing
- Homepage sections dynamic import
- Next.js optimizePackageImports
- Final bundle analysis
- Deploy + measure (aspettarsi +2-3 punti finale)

## Riferimenti
- [Next.js Dynamic Imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Framer Motion Code Splitting](https://www.framer.com/motion/guide-reduce-bundle-size/)
- [Web.dev: Reduce JavaScript](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

## Tracking
**Creata**: 2025-11-15
**Assegnata a**: Claude Code
**Dipendenze**: Nessuna (ma sbloccherà altre epiche come EPIC-004 Chatbot)
