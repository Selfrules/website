# [HF-002] Update languages in Journey section

## Metadata
- **Story ID**: HF-002
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
**Voglio** vedere informazioni accurate sulle lingue parlate da Mattia
**Così che** possa avere informazioni corrette e credibili sulle sue competenze

---

## Descrizione Dettagliata

### Contesto
Nella sezione "Il Percorso" della homepage, viene indicato che Mattia parla 3 lingue, incluso lo spagnolo. In realtà Mattia parla solo **Italiano** e **Inglese** (2 lingue), non lo spagnolo.

### Obiettivo Specifico
Correggere le informazioni sulle lingue parlate, trovando una formulazione divertente/creativa per presentare le 2 lingue (Italiano e Inglese) in linea con il tone of voice del sito (Romei-Toon-Sinek).

**Esempi di formulazioni possibili**:
- "2 lingue + qualche parola di francese imparata guardando Emily in Paris"
- "Italiano e inglese fluente (il mio spagnolo si ferma a '¿Dónde está la biblioteca?')"
- "Bilingue IT/EN - lo spagnolo l'ho lasciato su Duolingo"

---

## Criteri di Accettazione

- [ ] **AC1**: Numero lingue corretto (2 invece di 3)
  - Scenario: Quando leggo la sezione Journey
  - Risultato atteso: Vedo informazioni accurate su Italiano e Inglese

- [ ] **AC2**: Formulazione creativa e in linea con tone of voice
  - Scenario: Quando leggo la descrizione lingue
  - Risultato atteso: Testo divertente, pragmatico, che riflette stile Romei-Toon-Sinek

- [ ] **AC3**: Modifiche applicate a entrambe le versioni i18n
  - Scenario: Quando cambio lingua IT/EN
  - Risultato atteso: Testo localizzato appropriatamente in entrambe le lingue

---

## Test Plan

### Checklist di Testing
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test i18n (IT/EN)
- [ ] Verifica tone of voice con Mattia (se possibile)
- [ ] Verifica leggibilità e chiarezza messaggio

---

## Linee Guida Tecniche

### Content Tone of Voice
Seguire framework Romei-Toon-Sinek:
1. **Romei's pragmatism**: Diretto, nessuna esagerazione
2. **Toon's accessibility**: Linguaggio conversazionale, relatable
3. **Sinek's purpose**: Focus sul "perché" (es. perché 2 lingue sono sufficienti)

**Esempi di scrittura**:
- ✅ "2 lingue bastano per lavorare con team internazionali (e per ordinare croissant a Parigi)"
- ❌ "Trilingual professional with advanced proficiency" (troppo formale)

### Files da Modificare
- `/app/[locale]/page.tsx` - JourneySection component
- `/messages/it.json` (se i18n via file JSON)
- `/messages/en.json` (se i18n via file JSON)

---

## Implementazione Guidata

### Step 1: Localizzare il testo
- [ ] Aprire `/app/[locale]/page.tsx`
- [ ] Trovare la sezione "Il Percorso" (Journey)
- [ ] Identificare il testo "3 lingue" o equivalente

### Step 2: Creare formulazione creativa
- [ ] Scrivere 2-3 varianti in italiano
- [ ] Scrivere 2-3 varianti in inglese
- [ ] Scegliere la migliore (o proporre a Mattia)

### Step 3: Applicare modifiche
- [ ] Aggiornare testo in versione IT
- [ ] Aggiornare testo in versione EN
- [ ] Verificare che numero sia 2 (non 3)

### Step 4: Testing
- [ ] Test visivo su localhost:3000
- [ ] Verificare entrambe le lingue (IT/EN)
- [ ] Leggere ad alta voce per verificare tone of voice

---

## Note per Claude Code

### Proposte di Testo (DA VALIDARE):

**Italiano**:
- Opzione A: "2 lingue (IT/EN) + un po' di francese da menu di ristorante"
- Opzione B: "Bilingue italiano-inglese (lo spagnolo è rimasto nel cassetto di Duolingo)"
- Opzione C: "2 lingue per lavorare ovunque - la terza la sto ancora procrastinando"

**Inglese**:
- Opzione A: "2 languages (IT/EN) + enough French to order croissants"
- Opzione B: "Bilingual IT/EN (Spanish is still on my Duolingo to-do list)"
- Opzione C: "2 languages to work anywhere - the third one? Still procrastinating"

**IMPORTANTE**: Prima di implementare, scegliere la variante più in linea con il resto del contenuto della pagina.

---

## Definition of Done

- [ ] Numero lingue corretto (2 invece di 3)
- [ ] Testo creativo e in linea con tone of voice
- [ ] Modifiche applicate a IT e EN
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile
- [ ] Tone of voice verificato

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-15 | Story creata | Todo |
