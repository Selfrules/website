# [HF-001] Fix hero button "come sono arrivato qui" background

## Metadata
- **Story ID**: HF-001
- **Epic**: [EPIC-010 Homepage & Footer Fixes](../epic.md)
- **Priorità**: 🟢 Bassa
- **Dimensione**: 🟢 S (1-2h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-15

---

## User Story

**Come** visitatore del sito
**Voglio** vedere il pulsante "come sono arrivato qui" con sfondo bianco nello stato normale
**Così che** sia visivamente consistente con il design system e lo stato hover sia più evidente

---

## Descrizione Dettagliata

### Contesto
Nella sezione Hero della homepage, il pulsante secondario "come sono arrivato qui" attualmente ha sfondo neutro/trasparente nello stato non-hover. Questo crea inconsistenza visiva con altri pulsanti del sito e riduce la gerarchia visiva.

### Obiettivo Specifico
Modificare lo stile del pulsante "come sono arrivato qui" affinché abbia:
- **Stato normale**: Sfondo bianco (`bg-white`)
- **Stato hover**: Effetto brutalist standard (translate + shadow increase)

---

## Criteri di Accettazione

- [ ] **AC1**: Pulsante ha sfondo bianco nello stato non-hover
  - Scenario: Quando carico la homepage
  - Risultato atteso: Il pulsante "come sono arrivato qui" ha background bianco visibile

- [ ] **AC2**: Stato hover mantiene effetto brutalist
  - Scenario: Quando passo il mouse sul pulsante
  - Risultato atteso: Pulsante applica translate(-4px, -4px) e shadow-brutal-hover

- [ ] **AC3**: Modifiche applicate a entrambe le versioni i18n
  - Scenario: Quando cambio lingua IT/EN
  - Risultato atteso: Stile consistente in entrambe le lingue

---

## Test Plan

### Checklist di Testing
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test dark mode (se applicabile)
- [ ] Test i18n (IT/EN)
- [ ] Test accessibilità (contrasto colori WCAG AA)
- [ ] Test hover/focus states

---

## Linee Guida Tecniche

### Design System
- **Componenti**: Button component esistente o custom styling
- **Colori**:
  - Background: `bg-white` o `bg-cream` (#FFFCF2)
  - Text: `text-black` (#000000)
  - Border: `border-black border-brutal` (4px solid)
- **Shadows**: `shadow-brutal` (8px) → `shadow-brutal-hover` (12px) on hover
- **Border Radius**: `rounded-brutal` (6px)

### Files da Modificare
- `/app/[locale]/page.tsx` - HeroSection component
- Oppure: `/components/sections/HeroSection.tsx` (se separato)

---

## Implementazione Guidata

### Step 1: Localizzare il componente
- [ ] Aprire `/app/[locale]/page.tsx`
- [ ] Trovare la sezione Hero
- [ ] Identificare il pulsante "come sono arrivato qui"

### Step 2: Modificare lo stile
- [ ] Aggiungere/modificare classe `bg-white` o `bg-cream`
- [ ] Verificare che border-brutal sia applicato
- [ ] Verificare che shadow-brutal sia applicato
- [ ] Assicurarsi che hover state sia configurato correttamente

### Step 3: Testing
- [ ] Test visivo su localhost:3000
- [ ] Verificare entrambe le lingue (IT/EN)
- [ ] Verificare responsive mobile

---

## Definition of Done

- [ ] Pulsante ha sfondo bianco/cream nello stato normale
- [ ] Hover state funzionante con effetto brutalist
- [ ] Modifiche applicate a IT e EN
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile
- [ ] Accessibilità WCAG AA verificata

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-15 | Story creata | Todo |
