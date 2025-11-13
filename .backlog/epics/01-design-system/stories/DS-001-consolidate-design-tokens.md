# [DS-001] Consolidare Design Tokens e Utility Tailwind Custom

## Metadata
- **Story ID**: DS-001
- **Epic**: [EPIC-001 - Design System](./../epic.md)
- **Priorità**: 🔴 Critica
- **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 **Claude Code Web**
- **Stato**: 📋 Todo
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-13

---

## User Story

**Come** Claude Code
**Voglio** avere un set consolidato di design tokens e utility Tailwind custom
**Così che** possa sempre utilizzare gli stili corretti del design system senza ambiguità

---

## Descrizione Dettagliata

### Contesto
Attualmente `tailwind.config.ts` contiene alcune utility custom (`border-brutal`, `shadow-brutal`, etc.) ma non tutte le varianti e componenti sono coperte. Dobbiamo consolidare tutti i design tokens (colori, spacing, shadows, borders) in un sistema completo.

### Obiettivo Specifico
Estendere `tailwind.config.ts` con tutte le utility custom necessarie per implementare il design system neobrutalist senza dover usare utility Tailwind vanilla.

---

## Criteri di Accettazione

- [ ] **AC1**: Tutti i colori del design system sono definiti in `tailwind.config.ts`
  - Scenario: Quando Claude Code deve usare un colore brand
  - Risultato atteso: Può usare `bg-electric-blue` invece di `bg-[#1E90FF]`

- [ ] **AC2**: Tutte le varianti di border brutalist sono disponibili
  - Scenario: Quando deve creare un componente con border
  - Risultato atteso: Ha accesso a `border-brutal`, `border-brutal-thick`, `border-brutal-thin`

- [ ] **AC3**: Tutte le varianti di shadow brutalist sono disponibili
  - Scenario: Quando deve aggiungere shadow a un componente
  - Risultato atteso: Ha accesso a `shadow-brutal`, `shadow-brutal-hover`, `shadow-brutal-lg`, `shadow-brutal-sm`

- [ ] **AC4**: Border radius standardizzati sono disponibili
  - Scenario: Quando deve arrotondare gli angoli
  - Risultato atteso: Ha accesso a `rounded-brutal` (6px), `rounded-brutal-lg` (8px)

- [ ] **AC5**: Spacing system 8pt grid è esplicito
  - Scenario: Quando deve applicare spacing
  - Risultato atteso: Può usare `p-brutal-sm`, `m-brutal-md`, `gap-brutal-lg` basati su 8pt grid

---

## Test Plan

### Test da Creare PRE-Sviluppo (TDD)

#### Test di Configurazione
```typescript
// File: tailwind.config.test.ts
import tailwindConfig from '../tailwind.config';

describe('Tailwind Design System Configuration', () => {
  it('should have all brand colors defined', () => {
    expect(tailwindConfig.theme.extend.colors).toHaveProperty('electric-blue');
    expect(tailwindConfig.theme.extend.colors).toHaveProperty('slate-blue');
    expect(tailwindConfig.theme.extend.colors).toHaveProperty('deep-navy');
    expect(tailwindConfig.theme.extend.colors).toHaveProperty('teal');
  });

  it('should have brutal border utilities', () => {
    expect(tailwindConfig.theme.extend).toHaveProperty('borderWidth');
    // Verify brutal-* border widths exist
  });

  it('should have brutal shadow utilities', () => {
    expect(tailwindConfig.theme.extend.boxShadow).toHaveProperty('brutal');
    expect(tailwindConfig.theme.extend.boxShadow).toHaveProperty('brutal-hover');
  });

  it('should have brutal border radius', () => {
    expect(tailwindConfig.theme.extend.borderRadius).toHaveProperty('brutal');
  });
});
```

#### Test Visivi
```typescript
// File: components/ui/DesignSystemShowcase.test.tsx
// Test che verifica che le utility custom vengono applicate correttamente
```

### Checklist di Testing
- [ ] Test di configurazione passano
- [ ] Verifica manuale che le utility funzionano in un componente test
- [ ] Build di Tailwind completa senza errori
- [ ] IntelliSense VSCode riconosce le nuove utility
- [ ] Dark mode funziona con i nuovi colori
- [ ] Contrasto colori WCAG AA verificato

---

## Linee Guida Tecniche

### Design System Tokens da Implementare

#### Colori
```typescript
colors: {
  // Brand Colors
  'electric-blue': '#1E90FF',
  'slate-blue': '#6A7B9F',
  'deep-navy': '#3E526A',
  'teal': '#2A687A',

  // Functional Colors
  'brutal-black': '#000000',
  'brutal-white': '#FFFFFF',

  // Semantic Colors (derivati dai brand)
  'primary': '#1E90FF',      // electric-blue
  'secondary': '#6A7B9F',    // slate-blue
  'accent': '#3E526A',       // deep-navy
  'alternative': '#2A687A',  // teal
}
```

#### Borders
```typescript
borderWidth: {
  'brutal': '4px',
  'brutal-thin': '3px',
  'brutal-thick': '6px',
  'brutal-extra-thick': '8px',
}
```

#### Shadows
```typescript
boxShadow: {
  'brutal': '8px 8px 0px 0px #000000',
  'brutal-hover': '12px 12px 0px 0px #000000',
  'brutal-sm': '4px 4px 0px 0px #000000',
  'brutal-lg': '16px 16px 0px 0px #000000',
  'brutal-colored-blue': '8px 8px 0px 0px #1E90FF',
  'brutal-colored-navy': '8px 8px 0px 0px #3E526A',
}
```

#### Border Radius
```typescript
borderRadius: {
  'brutal': '6px',
  'brutal-lg': '8px',
  'brutal-sm': '4px',
}
```

#### Spacing (8pt Grid)
```typescript
spacing: {
  'brutal-xs': '8px',   // 1 unit
  'brutal-sm': '16px',  // 2 units
  'brutal-md': '24px',  // 3 units
  'brutal-lg': '32px',  // 4 units
  'brutal-xl': '48px',  // 6 units
  'brutal-2xl': '64px', // 8 units
}
```

---

## Implementazione Guidata

### Step 1: Preparazione
- [ ] Leggere epic completa
- [ ] Leggere `tailwind.config.ts` esistente
- [ ] Creare branch: `claude/ds-001-design-tokens`
- [ ] Creare test di configurazione

### Step 2: Sviluppo
- [ ] Aggiornare `tailwind.config.ts` con tutti i tokens
- [ ] Aggiungere commenti esplicativi per ogni sezione
- [ ] Verificare che le utility esistenti (`border-brutal`, etc.) siano preservate
- [ ] Estendere con le nuove utility mancanti

### Step 3: Testing
- [ ] Far passare i test di configurazione
- [ ] Creare componente showcase per test visivo
- [ ] Testare build di Tailwind
- [ ] Verificare IntelliSense

### Step 4: Documentazione
- [ ] Commentare ogni sezione in `tailwind.config.ts`
- [ ] Creare tabella di riferimento rapido (può andare in DS-004)

### Step 5: Commit e Push
- [ ] Commit: "feat(design-system): consolidate design tokens in tailwind config"
- [ ] Push su branch

---

## Dipendenze

### Dipendenze Tecniche
- [ ] Tailwind CSS: v3.x
- [ ] TypeScript: Per type-safe config

### Dipendenze da Altre Stories
Nessuna - questa è la base per le altre

---

## Risorse e Riferimenti

### Design
- [Neobrutalism Design System](https://neobrutalism.dev/)
- Pagina design-system corrente: `/app/[locale]/design-system/page.tsx`

### Documentazione
- [Tailwind Custom Configuration](https://tailwindcss.com/docs/configuration)
- [Tailwind Theme Extension](https://tailwindcss.com/docs/theme#extending-the-default-theme)

---

## Note per Claude Code

### Attenzione Speciale A:
- Non rimuovere utility Tailwind esistenti, solo estendere
- Mantenere compatibilità con componenti già esistenti
- Verificare che i colori abbiano contrasto WCAG AA

### Files da Modificare/Creare:
- `/tailwind.config.ts` - Aggiungere tutti i design tokens
- `/tailwind.config.test.ts` - Creare test di configurazione (nuovo file)

### Comandi da Eseguire:
```bash
# Build Tailwind per verificare
npm run build

# Type check
npm run type-check

# Se ci sono test
npm test -- tailwind.config.test.ts
```

---

## Definition of Done

- [ ] Tutti i criteri di accettazione sono soddisfatti
- [ ] Test di configurazione passano
- [ ] Build completa senza errori o warning
- [ ] IntelliSense riconosce tutte le nuove utility
- [ ] Verifica manuale visiva completata
- [ ] Contrasto colori WCAG AA verificato
- [ ] Documentazione inline (commenti) aggiunta
- [ ] Branch pushed

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-13 | Story creata | Todo |
