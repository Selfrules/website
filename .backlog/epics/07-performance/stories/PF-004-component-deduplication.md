# [PF-004] Remove Component Duplication

## Metadata
- **Story ID**: PF-004
- **Epic**: [EPIC-007](../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟢 S (1-2h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Completamento**: -

## User Story
**Come** sviluppatore **Voglio** che i componenti siano caricati una sola volta **Così che** il bundle JavaScript non contenga codice duplicato

## Problema Attuale
**ChatTrigger** è importato e renderizzato in DUE posizioni diverse:
1. `app/layout.tsx` (linea 66) - Global layout
2. `app/[locale]/page.tsx` (linea 52) - Homepage

**Risultato**:
- Componente chat bundled 2 volte (~50KB × 2 = 100KB sprecati)
- Possibili conflitti di state management
- Event listeners duplicati

**Impatto misurato**: ~50KB bundle waste, possibili memory leaks

## Criteri di Accettazione
- [ ] **AC1**: ChatTrigger importato in UN SOLO posto
- [ ] **AC2**: Chat trigger visibile e funzionante su tutte le pagine
- [ ] **AC3**: Nessun import duplicato di altri componenti
- [ ] **AC4**: Bundle size ridotto di ~50KB
- [ ] **AC5**: Zero console warnings/errors

## Implementazione Guidata

### Step 1: Verificare Duplicati
```bash
# Cerca tutti gli import di ChatTrigger
npx grep -r "ChatTrigger" app/ --include="*.tsx"

# Output atteso:
# app/layout.tsx:66: import ChatTrigger from '@/components/chat/ChatTrigger'
# app/[locale]/page.tsx:52: import ChatTrigger from '@/components/chat/ChatTrigger'
```

### Step 2: Rimuovere da Homepage
**File**: `app/[locale]/page.tsx` (linea 52 circa)

**RIMUOVERE**:
```tsx
// ❌ DELETE: Duplicato, già in layout.tsx
import ChatTrigger from '@/components/chat/ChatTrigger'

export default function HomePage() {
  return (
    <>
      {/* ❌ DELETE */}
      <ChatTrigger />

      <Hero />
      <Projects />
      {/* ... */}
    </>
  )
}
```

**RISULTATO**:
```tsx
// ✅ KEEP: Nessun import ChatTrigger
export default function HomePage() {
  return (
    <>
      {/* ChatTrigger renderizzato da layout.tsx */}
      <Hero />
      <Projects />
      {/* ... */}
    </>
  )
}
```

### Step 3: Verificare Layout.tsx
**File**: `app/layout.tsx` (linea 66 circa)

**MANTENERE** (questo è l'unico import corretto):
```tsx
import ChatTrigger from '@/components/chat/ChatTrigger'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}

        {/* ✅ KEEP: Global chat trigger */}
        <ChatTrigger />
      </body>
    </html>
  )
}
```

**Rationale**: In `layout.tsx` il trigger è globale → disponibile su tutte le pagine.

### Step 4: Audit Altri Componenti Potenzialmente Duplicati
```bash
# Cerca componenti importati multiple volte
npx grep -r "^import.*from '@/components" app/ --include="*.tsx" | \
  awk -F: '{print $2}' | \
  sort | \
  uniq -d

# Analizzare l'output:
# Se un componente appare 2+ volte, verificare se è duplicato o legittimo
```

**Componenti legittimi da importare più volte**:
- UI components (Button, Card, Badge) - OK
- Section components usati in pagine diverse - OK

**Componenti NON OK da duplicare**:
- Singleton components (ChatTrigger, Analytics, Theme Provider)
- Heavy components (>10KB)
- Components con global state

### Step 5: Bundle Comparison
```bash
# PRIMA della fix
npm run build
# Nota il "First Load JS" size

# DOPO la fix
npm run build
# Confronta - dovrebbe ridursi di ~50KB
```

## Test Plan
```bash
# 1. Build verification
npm run build
# Verificare:
# - No warnings "Component rendered multiple times"
# - Bundle size ridotto

# 2. Runtime test
npm run dev
# Aprire homepage
# DevTools > Console
# Verificare:
# - Zero errori
# - ChatTrigger visibile (click per aprire chat)

# 3. Navigation test
# Click su link interni (Blog, Design System)
# Verificare che ChatTrigger sia SEMPRE disponibile (global)

# 4. React DevTools
# Components tab
# Cercare "ChatTrigger"
# Verificare che appaia UNA sola volta nella component tree
```

## Definition of Done
- [ ] ChatTrigger rimosso da `app/[locale]/page.tsx`
- [ ] ChatTrigger mantenuto solo in `app/layout.tsx`
- [ ] Build senza errori/warnings
- [ ] Chat trigger funzionante su homepage
- [ ] Chat trigger funzionante su pagine interne (blog, design-system)
- [ ] Bundle size ridotto di ~50KB
- [ ] React DevTools mostra UN solo ChatTrigger
- [ ] Zero console errors/warnings

## Metriche di Successo
**Prima**:
- ChatTrigger instances: 2
- Bundle includes: ChatTrigger code × 2
- Total JS: +50KB sprecati

**Dopo** (target):
- ChatTrigger instances: 1
- Bundle includes: ChatTrigger code × 1
- Total JS: -50KB
- Lighthouse Performance: +3-5 punti (meno JavaScript)

## Files da Modificare
- ✏️ `app/[locale]/page.tsx` (RIMUOVERE import e render)
- 👀 `app/layout.tsx` (verificare che sia presente)

## Note Tecniche
- **Layout.tsx** renderizza su TUTTE le pagine → componenti qui sono globali
- **Page.tsx** renderizza solo su quella specifica route
- Componenti globali (Analytics, Chat, Theme) vanno SEMPRE in layout
- Se un componente deve essere visibile solo su homepage, allora page.tsx è corretto (ma ChatTrigger è globale)

## Componenti da Verificare (Checklist)
```typescript
// Componenti che DEVONO essere globali (layout.tsx):
// - ChatTrigger ✅
// - UmamiScript (analytics) ✅
// - ThemeProvider (se presente)
// - ToastContainer (se presente)

// Componenti che DEVONO essere locali (page.tsx):
// - Hero (solo homepage)
// - Projects (solo homepage)
// - BlogSection (solo homepage)
```

## Quick Win!
Questa è una **quick win** che può essere completata in 1-2 ore con impatto immediato:
- ✅ Basso rischio (solo rimozione codice duplicato)
- ✅ Alto impatto (50KB savings)
- ✅ Zero breaking changes
- ✅ Facile da testare

**Suggerimento**: Fai questa story PRIMA di PF-002 (Bundle Splitting) per baseline più pulita.

## Riferimenti
- [Next.js Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [React Component Composition](https://react.dev/learn/passing-props-to-a-component)

---

## Tracking
**Creata**: 2025-11-15
**Assegnata a**: Claude Code
**Dipendenze**: Nessuna
**Priorità Esecuzione**: ALTA (quick win, fare per prima)
