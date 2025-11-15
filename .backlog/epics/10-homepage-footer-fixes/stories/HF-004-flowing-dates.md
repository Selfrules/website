# [HF-004] Update Flowing employment dates

## Metadata
- **Story ID**: HF-004
- **Epic**: [EPIC-010 Homepage & Footer Fixes](../epic.md)
- **Priorità**: 🟠 Alta
- **Dimensione**: 🟢 S (30min - 1h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-15

---

## User Story

**Come** visitatore del sito
**Voglio** vedere le date di employment corrette per Flowing
**Così che** possa avere informazioni accurate sul percorso professionale di Mattia

---

## Descrizione Dettagliata

### Contesto
Nella sezione "Il Percorso" (Journey) della homepage, le date di employment per Flowing sono errate. Il periodo corretto è:
- **Inizio**: 2016
- **Fine**: 2020

### Obiettivo Specifico
Correggere le date di Flowing nella timeline professionale da qualsiasi valore attuale a **2016 - 2020**.

---

## Criteri di Accettazione

- [ ] **AC1**: Date Flowing corrette
  - Scenario: Quando leggo la sezione Journey
  - Risultato atteso: Vedo "2016 - 2020" per Flowing

- [ ] **AC2**: Modifiche applicate a entrambe le versioni i18n
  - Scenario: Quando cambio lingua IT/EN
  - Risultato atteso: Date consistenti in entrambe le lingue

---

## Test Plan

### Checklist di Testing
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test i18n (IT/EN)
- [ ] Verifica accuratezza date

---

## Linee Guida Tecniche

### Files da Modificare
- `/app/[locale]/page.tsx` - JourneySection component
- Oppure: `/components/sections/JourneySection.tsx`
- Oppure: `/data/timeline.ts` (se timeline è in file separato)

---

## Implementazione Guidata

### Step 1: Localizzare il testo
- [ ] Aprire `/app/[locale]/page.tsx`
- [ ] Trovare la sezione "Il Percorso" (Journey)
- [ ] Identificare la voce "Flowing" nella timeline

### Step 2: Aggiornare le date
- [ ] Modificare data inizio a 2016
- [ ] Modificare data fine a 2020
- [ ] Formato: "2016 - 2020" o "2016-2020" (mantenere consistenza con altre voci)

### Step 3: Testing
- [ ] Test visivo su localhost:3000
- [ ] Verificare entrambe le lingue (IT/EN)

---

## Definition of Done

- [ ] Date Flowing corrette: 2016 - 2020
- [ ] Modifiche applicate a IT e EN
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-15 | Story creata | Todo |
