# [DS-005] Audit e Refactoring Componenti Esistenti

## Metadata
- **Story ID**: DS-005
- **Epic**: [EPIC-001](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🔴 L (3-5 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: ✅ Done | **Data Creazione**: 2025-11-13 | **Data Completamento**: 2025-11-14

## User Story
**Come** codebase **Voglio** che tutti i componenti esistenti usino il design system consolidato **Così che** ci sia coerenza totale in tutto il sito

## Criteri di Accettazione
- [x] **AC1**: Audit completo di tutti i file in `/components`, `/app` identifica componenti che non usano design tokens
- [x] **AC2**: Refactoring di tutti i componenti per usare utility custom (`border-brutal`, `shadow-brutal`, etc.)
- [x] **AC3**: Eliminazione di valori hard-coded (colori, spacing, shadows)
- [x] **AC4**: Tutti i componenti hanno JSDoc appropriati per auto-catalogazione
- [x] **AC5**: Test che verificano che i componenti mantengono lo stesso aspetto visivo

## Test Plan
**Visual Regression Tests**:
```typescript
// Use Chromatic or Percy for visual regression
// Cattura screenshot PRIMA del refactoring
// Confronta DOPO per assicurare stesso aspetto
```

**Audit Script**:
```bash
# Script che cerca pattern problematici
grep -r "bg-\[#" app/ components/  # Hard-coded colors
grep -r "shadow-\[" app/ components/  # Hard-coded shadows
```

## Linee Guida Tecniche
**Audit Checklist per Ogni Componente**:
- [ ] Usa colori da design tokens (no hex hard-coded)
- [ ] Usa `border-brutal-*` invece di `border-[value]`
- [ ] Usa `shadow-brutal-*` invece di `shadow-[value]`
- [ ] Usa `rounded-brutal-*` invece di `rounded-[value]`
- [ ] Usa spacing `p-brutal-*` o Tailwind standard 8pt grid
- [ ] Ha JSDoc con `@component` e `@category`

**Pattern di Refactoring**:
```tsx
// PRIMA
<div className="border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-lg">

// DOPO
<div className="border-brutal shadow-brutal rounded-brutal">
```

## Implementazione
1. Eseguire audit script per identificare tutti i componenti
2. Creare lista prioritizzata (componenti più usati prima)
3. Refactorare componente per componente
4. Testare visual regression
5. Aggiungere JSDoc se mancante
6. Commit incrementali

## Dipendenze
- **DEVE essere fatto DOPO**: DS-001, DS-003
- **Opzionale DOPO**: DS-002 (per auto-catalogazione)

## Files da Modificare
Probabilmente molti. Includono (non limitato a):
- `/components/ui/*.tsx`
- `/components/sections/*.tsx`
- `/app/[locale]/*/page.tsx`

## Definition of Done
- [x] Audit completo eseguito
- [x] Tutti i componenti identificati refactorati
- [x] Nessun valore hard-coded rimasto
- [x] Visual regression tests passano (nessun cambiamento visivo)
- [x] Tutti i componenti hanno JSDoc
- [x] Type-check e lint passano
- [x] Build completa senza warning
