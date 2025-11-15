# [PF-006] Core Web Vitals Improvements (CLS, LCP, INP)

## Metadata
- **Story ID**: PF-006
- **Epic**: [EPIC-007](../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🔴 L (2-3 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Completamento**: -

## User Story
**Come** utente **Voglio** che il sito sia stabile, veloce e reattivo **Così che** possa interagire senza lag, shift o ritardi

## Problema Attuale
I Core Web Vitals hanno problemi:

### CLS (Cumulative Layout Shift): ~0.12 (❌ Needs Improvement)
- **Mobile menu**: Toggling senza spazio riservato causa shift
- **Chat window**: Appare dal nulla senza placeholder
- **Images**: Alcune senza width/height causano reflow

### LCP (Largest Contentful Paint): ~3.5s (❌ Needs Improvement)
- **Hero animations**: Delays artificiali (0.2s, 0.4s, 0.6s, 0.8s)
- **Font loading**: FOIT/FOUT ritarda text rendering
- **Images**: Above-fold senza priority

### INP (Interaction to Next Paint): ~180ms (🟡 Needs Improvement)
- **Framer Motion**: 30+ componenti con animazioni pesanti
- **Blog Cards**: Ogni card anima on hover (laggy su mobile)

**Target**: CLS <0.1, LCP <2.5s, INP <200ms (idealmente <100ms)

## Criteri di Accettazione
- [ ] **AC1**: CLS <0.05 (target: 0.02)
- [ ] **AC2**: LCP <2.5s (target: <2s)
- [ ] **AC3**: INP <200ms (target: <100ms)
- [ ] **AC4**: Mobile menu con spazio riservato (no layout shift)
- [ ] **AC5**: Chat window con placeholder/animation smooth
- [ ] **AC6**: Hero animations ridotte/ottimizzate
- [ ] **AC7**: Tutti i BlogCard con will-change/transform ottimizzati

## Implementazione Guidata

### PART 1: Fix CLS (Cumulative Layout Shift)

#### Step 1.1: Reserve Space for Mobile Menu
**File**: `components/ui/Header.tsx` (linee 160-179)

**PROBLEMA**: Mobile menu toggling causa shift

**PRIMA**:
```tsx
{isMenuOpen && (
  <nav className="md:hidden">
    {/* Menu items */}
  </nav>
)}
```

**DOPO** (Option A: Fixed height):
```tsx
<nav
  className={`
    md:hidden
    overflow-hidden
    transition-[max-height]
    duration-300
    ${isMenuOpen ? 'max-h-96' : 'max-h-0'}
  `}
>
  {/* Menu items - sempre renderizzati */}
  <ul>
    <li><Link href="/blog">Blog</Link></li>
    <li><Link href="/design-system">Design System</Link></li>
  </ul>
</nav>
```

**DOPO** (Option B: Absolute positioning - nessun shift):
```tsx
{/* Hamburger button - sempre stessa posizione */}
<button onClick={toggleMenu}>
  {isMenuOpen ? <X /> : <Menu />}
</button>

{/* Menu - absolute, non affetta layout */}
<nav
  className={`
    absolute top-full left-0 right-0
    bg-cream border-brutal
    transform transition-transform
    ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
  `}
>
  <ul>
    <li><Link href="/blog">Blog</Link></li>
    <li><Link href="/design-system">Design System</Link></li>
  </ul>
</nav>
```

**Raccomandazione**: Option B (absolute) → Zero CLS

#### Step 1.2: Chat Window Placeholder
**File**: `components/chat/ChatInterface.tsx` (linea 178)

**PROBLEMA**: Chat appare improvvisamente

**DOPO**:
```tsx
import { AnimatePresence, motion } from 'framer-motion'

export function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 w-96 h-[600px]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }} // ✅ Smooth, no CLS
        >
          {/* Chat content */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Key**: Usare `opacity` + `scale` (non `height` o `display`) → No reflow, no CLS

#### Step 1.3: Images Width/Height
Audit tutte le immagini e assicurarsi abbiano `width` e `height`:

```bash
# Trova immagini senza dimensioni
npx grep -r "<Image" components/ app/ --include="*.tsx" -A 5 | \
  grep -v "width=" | \
  grep -v "height="
```

**Fix**:
```tsx
// ❌ BAD: No dimensions
<Image src={src} alt={alt} />

// ✅ GOOD: Reserve space
<Image src={src} alt={alt} width={800} height={450} />
```

### PART 2: Optimize LCP (Largest Contentful Paint)

#### Step 2.1: Reduce Hero Animation Delays
**File**: `components/sections/Hero.tsx` (linee 29-46)

**PROBLEMA**: Staggered delays rallentano LCP

**PRIMA**:
```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.8 }} // ❌ 0.8s delay + duration
>
  Hero Title
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }} // ❌ 1.2s total
>
  Description
</motion.p>
```

**DOPO**:
```tsx
<motion.h1
  initial={{ opacity: 0, y: 10 }} // ✅ Ridotto y
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }} // ✅ No delay, 0.3s duration
>
  Hero Title
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1, duration: 0.3 }} // ✅ Solo 0.1s delay
>
  Description
</motion.p>
```

**Oppure** (RACCOMANDATO): Nessuna animazione su LCP element
```tsx
// ✅ BEST: No animation on LCP
<h1 className="opacity-100">
  Hero Title {/* Immediatamente visibile */}
</h1>

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2, duration: 0.4 }}
>
  Description {/* Solo questo anima */}
</motion.p>
```

#### Step 2.2: Font Display Swap
(Già coperto in PF-001, verificare)

**File**: `app/fonts.ts`
```typescript
export const spaceGrotesk = Space_Grotesk({
  display: 'swap', // ✅ Previene FOIT
  // ...
})
```

#### Step 2.3: Preload LCP Image (se hero ha immagine)
**File**: `app/layout.tsx`

```tsx
export default function RootLayout() {
  return (
    <html>
      <head>
        {/* ✅ Preload hero image se è LCP element */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-avatar.jpg"
          type="image/jpeg"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### PART 3: Optimize INP (Interaction to Next Paint)

#### Step 3.1: Optimize Blog Card Hover Animations
**File**: `components/blog/BlogCard.tsx` (linee 42-44, 92-94)

**PROBLEMA**: Ogni card calcola transform on hover → lag

**PRIMA**:
```tsx
<motion.div
  whileHover={{ x: -4, y: -4 }} // ❌ JavaScript-driven
  whileTap={{ scale: 0.98 }}
  className="border-brutal shadow-brutal"
>
  {/* Content */}
</motion.div>
```

**DOPO** (CSS-based):
```tsx
<div
  className="
    border-brutal shadow-brutal
    transition-transform duration-200
    hover:-translate-x-1 hover:-translate-y-1
    active:scale-98
    will-change-transform
  "
>
  {/* Content */}
</div>
```

**OPPURE** (keep Framer Motion ma ottimizzato):
```tsx
<motion.div
  whileHover={{ x: -4, y: -4 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
  style={{ willChange: 'transform' }} // ✅ GPU hint
  className="border-brutal shadow-brutal"
>
  {/* Content */}
</motion.div>
```

#### Step 3.2: Debounce Heavy Interactions
Se ci sono input con onChange pesanti:

```tsx
import { useDebouncedCallback } from 'use-debounce'

export function SearchInput() {
  const handleSearch = useDebouncedCallback(
    (query: string) => {
      // Heavy search logic
    },
    300 // ✅ Debounce 300ms
  )

  return <input onChange={(e) => handleSearch(e.target.value)} />
}
```

#### Step 3.3: Virtualize Long Lists (se presente)
Se ci sono liste lunghe (>50 items):

```bash
npm install @tanstack/react-virtual
```

```tsx
import { useVirtualizer } from '@tanstack/react-virtual'

export function BlogList({ posts }: { posts: Post[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200, // Estimated row height
  })

  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <BlogCard
            key={virtualRow.key}
            post={posts[virtualRow.index]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
```

## Test Plan
```bash
# 1. CLS Test
# Chrome DevTools > Rendering > Layout Shift Regions (enable)
npm run dev
# Navigate, toggle menu, open chat
# Verificare: No blue regions (no shifts)

# 2. LCP Test
# DevTools > Performance > Record
# Reload page
# Stop recording
# Look for "LCP" marker
# Verificare: LCP <2.5s, idealmente <2s

# 3. INP Test
# DevTools > Performance > Interactions
# Hover su cards, click buttons, type in inputs
# Verificare: All interactions <200ms

# 4. Lighthouse CI
npx lighthouse http://localhost:3000 --view
# Verificare:
# - CLS: <0.1 (verde)
# - LCP: <2.5s (verde)
# - TBT (Total Blocking Time): <200ms
# - Performance Score: >90

# 5. Real Device Test
# Test su mobile reale (non emulator)
# Verificare interactions fluide (no lag)
```

## Definition of Done
- [ ] Mobile menu con absolute positioning (no CLS)
- [ ] Chat window con smooth animation (no CLS)
- [ ] Tutte le immagini con width/height
- [ ] Hero animations ridotte (<0.3s, no delays su LCP)
- [ ] Font display: swap attivo
- [ ] Blog cards con CSS transitions (o will-change)
- [ ] Heavy interactions debounced (se presenti)
- [ ] Long lists virtualized (se presenti, >50 items)
- [ ] Lighthouse: CLS <0.1 ✅
- [ ] Lighthouse: LCP <2.5s ✅
- [ ] Lighthouse: INP <200ms ✅
- [ ] Mobile test passa (no lag)

## Metriche di Successo
**Prima**:
- CLS: 0.12 (❌ Needs Improvement)
- LCP: 3.5s (❌ Needs Improvement)
- INP: 180ms (🟡 Needs Improvement)

**Dopo** (target):
- CLS: <0.05 (✅ Good)
- LCP: <2s (✅ Good)
- INP: <100ms (✅ Good)
- Lighthouse Performance: +5-8 punti

## Files da Modificare
- ✏️ `components/ui/Header.tsx` (mobile menu absolute)
- ✏️ `components/chat/ChatInterface.tsx` (smooth animation)
- ✏️ `components/sections/Hero.tsx` (reduce delays)
- ✏️ `components/blog/BlogCard.tsx` (CSS transitions)
- ✏️ Tutti i componenti con immagini (width/height audit)
- ✏️ `app/layout.tsx` (preload LCP image se necessario)
- 👀 `components/ui/Button.tsx` (verificare will-change)

## Note Tecniche
- **CLS**: Causato da DOM changes senza spazio riservato
- **LCP**: Spesso causato da font, images, animations su hero
- **INP**: Causato da JavaScript pesante durante interactions
- **will-change: transform**: Hint per GPU acceleration (usare con moderazione)
- **Absolute positioning**: Non affetta layout flow → Zero CLS
- **opacity/scale animations**: Composited, no reflow

## Riferimenti
- [Web Vitals](https://web.dev/vitals/)
- [CLS Best Practices](https://web.dev/cls/)
- [LCP Optimization](https://web.dev/lcp/)
- [INP Guide](https://web.dev/inp/)
- [Animation Performance](https://web.dev/animations-guide/)

---

## Tracking
**Creata**: 2025-11-15
**Assegnata a**: Claude Code
**Dipendenze**: PF-001 (font loading) aiuta LCP
