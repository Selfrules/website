# [HF-006] Fix Card component borders globally

## Metadata
- **Story ID**: HF-006
- **Epic**: [EPIC-010 Homepage & Footer Fixes](../epic.md)
- **Priorità**: 🔴 Alta
- **Dimensione**: 🟡 M (2-4h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-15

---

## User Story

**Come** designer/sviluppatore del sito
**Voglio** che tutti i componenti Card abbiano bordi neri come da design system
**Così che** il sito sia visivamente consistente e rispetti il design neobrutalist

---

## Descrizione Dettagliata

### Contesto
Il componente Card è utilizzato in multiple sezioni del sito (blog homepage, pagina blog, potenzialmente altri). Attualmente le card hanno **bordi grigi** invece dei **bordi neri** definiti nel design system neobrutalist.

**Sezioni impattate** (identificate finora):
1. **Blog section homepage**: Card articoli hanno bordo grigio
2. **Pagina Blog** (`/blog`): Card articoli hanno bordo grigio
3. Potenzialmente altre sezioni che utilizzano lo stesso componente

### Obiettivo Specifico
Modificare il componente Card base (`/components/ui/Card.tsx` o equivalente) per utilizzare `border-black` invece di qualsiasi bordo grigio. Questa modifica sarà **propagata automaticamente** a tutte le sezioni che utilizzano il componente.

---

## Criteri di Accettazione

- [ ] **AC1**: Componente Card usa border-black
  - Scenario: Quando ispeziono il componente Card
  - Risultato atteso: Classe `border-black` applicata di default

- [ ] **AC2**: Blog homepage con bordi neri
  - Scenario: Quando visito la sezione Blog homepage
  - Risultato atteso: Tutte le card articoli hanno bordi neri

- [ ] **AC3**: Pagina blog con bordi neri
  - Scenario: Quando visito `/blog`
  - Risultato atteso: Tutte le card articoli hanno bordi neri

- [ ] **AC4**: Nessuna regressione in altre sezioni
  - Scenario: Quando navigo altre pagine che usano Card
  - Risultato atteso: Card funzionano correttamente con bordi neri

- [ ] **AC5**: Compatibilità design system
  - Scenario: Quando confronto con `/design-system`
  - Risultato atteso: Card rispettano utility `border-brutal` (4px solid black)

---

## Test Plan

### Checklist di Testing
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test dark mode (verificare contrasto bianco/nero)
- [ ] Test i18n (IT/EN)
- [ ] Test su tutte le sezioni che usano Card:
  - [ ] Blog section homepage
  - [ ] Pagina Blog (`/blog`)
  - [ ] Eventualmente Journey section
  - [ ] Eventualmente Projects section
- [ ] Visual regression test (se disponibile)

---

## Linee Guida Tecniche

### Design System
- **Border**: `border-brutal` (4px solid black)
- **Border Color**: `border-black` (#000000)
- **Alternative**: `border-brutal-thick` (6px) se necessario emphasis

**Riferimento**:
```tsx
// ✅ CORRETTO
<div className="border-brutal border-black">

// ❌ SBAGLIATO
<div className="border-4 border-gray-300">
<div className="border-4 border-gray-800">
```

### Files da Modificare/Verificare
1. **Componente base**: `/components/ui/Card.tsx`
2. **Sezioni che lo usano**:
   - `/app/[locale]/page.tsx` (BlogSection)
   - `/app/[locale]/blog/page.tsx` (Blog list page)
   - Eventualmente altri componenti

---

## Implementazione Guidata

### Step 1: Localizzare il componente Card
- [ ] Aprire `/components/ui/Card.tsx`
- [ ] Identificare la classe border attuale
- [ ] Verificare se Card ha varianti (es. `variant="outline"`)

### Step 2: Modificare border
- [ ] Sostituire `border-gray-*` con `border-black`
- [ ] Verificare che `border-brutal` (o `border-4`) sia applicato
- [ ] Se Card ha varianti, aggiornare tutte

### Step 3: Verificare propagazione
- [ ] Cercare tutte le occorrenze di `<Card` nel codebase
- [ ] Identificare tutte le sezioni che usano Card
- [ ] Creare lista di test

### Step 4: Testing globale
- [ ] Test blog homepage
- [ ] Test pagina `/blog`
- [ ] Test altre sezioni (se presenti)
- [ ] Verificare nessuna regressione

---

## Note per Claude Code

### Attenzione Speciale A:
1. **Componente centrale**: Card è probabilmente usato in molte sezioni - modifiche devono essere backward compatible
2. **Dark mode**: Verificare che bordi neri siano visibili anche su sfondo scuro (potrebbero servire `border-white` in dark mode)
3. **Varianti**: Se Card ha varianti (outline, filled, etc.), assicurarsi che tutte rispettino design system

### Files da Modificare:
- `/components/ui/Card.tsx` - Componente base (CRITICO)
- Eventualmente: `/app/[locale]/page.tsx` - Se Card è inline invece che componente separato
- Eventualmente: `/app/[locale]/blog/page.tsx` - Se Card è inline

### Comandi da Eseguire:
```bash
# Cercare tutte le occorrenze di Card
npm run dev

# Verificare build
npm run build

# Eseguire linting
npm run lint
```

### Possibili Scenari:

**Scenario A - Card è componente separato**:
1. Modificare `/components/ui/Card.tsx`
2. Propagazione automatica a tutte le sezioni

**Scenario B - Card è inline in ogni sezione**:
1. Cercare tutte le occorrenze di pattern "card-like"
2. Modificare ogni occorrenza manualmente
3. Considerare refactor verso componente unico

---

## Definition of Done

- [ ] Componente Card usa `border-black border-brutal`
- [ ] Blog homepage ha card con bordi neri
- [ ] Pagina blog ha card con bordi neri
- [ ] Nessuna regressione in altre sezioni
- [ ] Tutti i test passano
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile
- [ ] Dark mode verificato (se applicabile)
- [ ] Design system compliance verificato

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-15 | Story creata | Todo |
