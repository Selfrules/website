# [HF-003] Fix project count consistency

## Metadata
- **Story ID**: HF-003
- **Epic**: [EPIC-010 Homepage & Footer Fixes](../epic.md)
- **Priorità**: 🟠 Alta
- **Dimensione**: 🟢 S (1-2h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-15

---

## User Story

**Come** visitatore del sito
**Voglio** vedere informazioni accurate e consistenti sul numero di progetti completati
**Così che** possa avere una percezione credibile dell'esperienza professionale di Mattia

---

## Descrizione Dettagliata

### Contesto
Attualmente il sito menziona "200+ progetti" in almeno due sezioni:
1. **Sezione Hero**: Badge o testo con "200+ progetti"
2. **Sezione Il Percorso (Journey)**: Statistica "200+ progetti"

Questo numero non è accurato. È necessario:
1. Determinare il numero corretto (o una formulazione diversa)
2. Applicare lo stesso valore in **entrambe le sezioni** per garantire coerenza

### Obiettivo Specifico
- Aggiornare il numero di progetti con valore accurato O trovare formulazione alternativa
- Garantire che Hero e Journey mostrino lo stesso valore
- Mantenere tone of voice pragmatico e credibile

**Possibili approcci**:
- Numero specifico: "50+ progetti" (se più accurato)
- Formulazione qualitativa: "Decine di prodotti digitali dal 2016"
- Focus su impatto: "Progetti per startup e Fortune 500"

---

## Criteri di Accettazione

- [ ] **AC1**: Numero progetti accurato
  - Scenario: Quando leggo sezione Hero e Journey
  - Risultato atteso: Vedo numero corretto o formulazione alternativa credibile

- [ ] **AC2**: Coerenza tra Hero e Journey
  - Scenario: Quando confronto Hero e Journey
  - Risultato atteso: Entrambe le sezioni mostrano lo stesso valore/formulazione

- [ ] **AC3**: Modifiche applicate a entrambe le versioni i18n
  - Scenario: Quando cambio lingua IT/EN
  - Risultato atteso: Valore consistente in entrambe le lingue

---

## Test Plan

### Checklist di Testing
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test i18n (IT/EN)
- [ ] Verifica coerenza tra Hero e Journey
- [ ] Verifica credibilità del numero con Mattia

---

## Linee Guida Tecniche

### Content Tone of Voice
Seguire framework Romei-Toon-Sinek:
- **Pragmatico**: Numeri realistici, no esagerazioni
- **Diretto**: Evitare "200+" se non accurato
- **Focus su impatto**: Qualità > quantità

**Esempi**:
- ✅ "50+ progetti dal 2016 tra startup e corporate"
- ✅ "Prodotti digitali per oltre 30 clienti"
- ❌ "200+ progetti completati" (se non accurato)

### Files da Modificare
- `/app/[locale]/page.tsx` - HeroSection component
- `/app/[locale]/page.tsx` - JourneySection component
- `/messages/it.json` (se i18n via file JSON)
- `/messages/en.json` (se i18n via file JSON)

---

## Implementazione Guidata

### Step 1: Identificare tutte le occorrenze
- [ ] Cercare "200" nel codebase
- [ ] Identificare sezione Hero (badge o testo)
- [ ] Identificare sezione Journey (statistiche)

### Step 2: Determinare valore corretto
- [ ] Opzione A: Chiedere a Mattia numero accurato
- [ ] Opzione B: Usare formulazione qualitativa

### Step 3: Applicare modifiche
- [ ] Aggiornare Hero section (IT/EN)
- [ ] Aggiornare Journey section (IT/EN)
- [ ] Verificare coerenza tra le due sezioni

### Step 4: Testing
- [ ] Test visivo su localhost:3000
- [ ] Verificare entrambe le sezioni
- [ ] Verificare entrambe le lingue (IT/EN)

---

## Note per Claude Code

### Proposte di Formulazione (DA VALIDARE):

**Opzione A - Numero specifico**:
- "50+ progetti dal 2016"
- "60+ prodotti digitali"

**Opzione B - Formulazione qualitativa**:
- "Decine di progetti tra startup e Fortune 500"
- "Prodotti digitali per oltre 30 clienti in 8 anni"

**Opzione C - Focus su impatto**:
- "Progetti che hanno generato milioni di € di valore"
- "Da MVP a prodotti usati da migliaia di persone"

**IMPORTANTE**:
1. Prima di implementare, verificare con Mattia il numero corretto
2. Se non disponibile, usare formulazione qualitativa (Opzione B)
3. Assicurarsi che Hero e Journey siano coerenti

---

## Definition of Done

- [ ] Numero/formulazione progetti accurati
- [ ] Coerenza tra sezione Hero e Journey
- [ ] Modifiche applicate a IT e EN
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile
- [ ] Credibilità informazione verificata

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-15 | Story creata | Todo |
