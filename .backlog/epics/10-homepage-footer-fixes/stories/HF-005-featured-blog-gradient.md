# [HF-005] Add gradient to featured blog card

## Metadata
- **Story ID**: HF-005
- **Epic**: [EPIC-010 Homepage & Footer Fixes](../epic.md)
- **Priorità**: 🟡 Media
- **Dimensione**: 🟢 S (1-2h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-15

---

## User Story

**Come** visitatore della homepage
**Voglio** che la card "da non perdere" nel blog section abbia un gradiente di sfondo distintivo
**Così che** sia visivamente evidenziata rispetto alle altre card del blog

---

## Descrizione Dettagliata

### Contesto
Nella sezione Blog della homepage, esiste una card speciale marcata come "da non perdere" (featured article). Attualmente ha sfondo solido, ma dovrebbe avere un **gradiente** per distinguerla visivamente.

### Obiettivo Specifico
Applicare uno dei gradienti definiti in `tailwind.config.ts` come sfondo della card "da non perdere". Il gradiente deve:
1. Utilizzare i colori della palette neobrutalist (Electric Blue, Teal, Deep Purple, Cyber Yellow, Neon Pink)
2. Essere già definito in `tailwind.config.ts` (no hard-coding)
3. Mantenere leggibilità del testo (contrasto WCAG AA)

---

## Criteri di Accettazione

- [ ] **AC1**: Card featured ha gradiente di sfondo
  - Scenario: Quando visito la sezione Blog homepage
  - Risultato atteso: Card "da non perdere" ha gradiente distintivo

- [ ] **AC2**: Gradiente da tailwind.config.ts
  - Scenario: Quando ispeziono il CSS
  - Risultato atteso: Gradiente utilizza utility custom da Tailwind config (es. `bg-gradient-brutal-blue`)

- [ ] **AC3**: Contrasto testo leggibile
  - Scenario: Quando leggo il testo sulla card
  - Risultato atteso: Testo leggibile con contrasto ≥4.5:1 (WCAG AA)

- [ ] **AC4**: Responsive su mobile
  - Scenario: Quando visualizzo su mobile
  - Risultato atteso: Gradiente visualizzato correttamente su schermi piccoli

---

## Test Plan

### Checklist di Testing
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test dark mode (se applicabile)
- [ ] Test i18n (IT/EN)
- [ ] Test accessibilità (contrasto WCAG AA)
- [ ] Test con diversi browser (Chrome, Firefox, Safari)

---

## Linee Guida Tecniche

### Design System

**Gradienti disponibili** (da verificare in `tailwind.config.ts`):
Controllare quale gradiente è definito nella configurazione. Possibili opzioni:
- Gradiente blu-teal (Electric Blue → Teal)
- Gradiente purple-pink (Deep Purple → Neon Pink)
- Gradiente yellow-pink (Cyber Yellow → Neon Pink)

**Contrasto colori**:
- Su gradiente scuro: testo bianco (`text-white`)
- Su gradiente chiaro: testo nero (`text-black`)

### Files da Modificare
- `/app/[locale]/page.tsx` - BlogSection component
- Oppure: `/components/sections/BlogSection.tsx`
- Verificare: `tailwind.config.ts` per gradienti disponibili

---

## Implementazione Guidata

### Step 1: Verificare gradienti disponibili
- [ ] Aprire `/tailwind.config.ts`
- [ ] Cercare sezione `backgroundImage` o `gradients`
- [ ] Identificare gradienti neobrutalist disponibili

### Step 2: Localizzare la card featured
- [ ] Aprire `/app/[locale]/page.tsx`
- [ ] Trovare la sezione Blog
- [ ] Identificare la card "da non perdere" (probabilmente ha prop `featured={true}` o simile)

### Step 3: Applicare gradiente
- [ ] Aggiungere classe gradiente alla card (es. `bg-gradient-to-br from-electric-blue to-teal`)
- [ ] Rimuovere eventuale `bg-[color]` esistente
- [ ] Verificare contrasto testo

### Step 4: Testing
- [ ] Test visivo su localhost:3000
- [ ] Verificare leggibilità testo
- [ ] Verificare su mobile

---

## Note per Claude Code

### Gradienti Possibili
Verificare in `tailwind.config.ts` quali gradienti sono definiti. Se non esistono gradienti custom, utilizzare utility Tailwind con i colori custom:

**Opzione A - Gradiente blu-teal**:
```tsx
className="bg-gradient-to-br from-electric-blue to-teal text-white"
```

**Opzione B - Gradiente purple-pink**:
```tsx
className="bg-gradient-to-br from-deep-purple to-neon-pink text-white"
```

**Opzione C - Gradiente giallo**:
```tsx
className="bg-gradient-to-br from-cyber-yellow to-electric-blue text-black"
```

**IMPORTANTE**: Verificare contrasto con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

---

## Definition of Done

- [ ] Card featured ha gradiente da design system
- [ ] Gradiente utilizza colori custom da tailwind.config.ts
- [ ] Contrasto testo WCAG AA verificato (≥4.5:1)
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile
- [ ] Test su diversi browser completati

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-15 | Story creata | Todo |
