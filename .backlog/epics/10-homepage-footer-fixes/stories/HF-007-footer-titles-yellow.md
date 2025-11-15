# [HF-007] Footer navigation titles yellow color

## Metadata
- **Story ID**: HF-007
- **Epic**: [EPIC-010 Homepage & Footer Fixes](../epic.md)
- **Priorità**: 🟡 Media
- **Dimensione**: 🟢 S (30min - 1h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: ✅ Done
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-15
- **Data Completamento**: 2025-11-15 (Already completed in commit f9dcfa7)

---

## User Story

**Come** visitatore del sito
**Voglio** che i titoli delle sezioni del footer ("Navigazione", "Risorse") siano in giallo
**Così che** siano visivamente evidenziati e rispettino la palette colori del sito

---

## Descrizione Dettagliata

### Contesto
Nel footer del sito, i titoli delle sezioni "Navigazione" e "Risorse" hanno attualmente colore nero (`text-black`). Per migliorare la gerarchia visiva e utilizzare la palette neobrutalist, dovrebbero essere in **giallo** (Cyber Yellow).

### Obiettivo Specifico
Modificare il colore dei titoli footer da nero a **Cyber Yellow** (#FFD60A) utilizzando la utility `text-cyber-yellow` definita in `tailwind.config.ts`.

---

## Criteri di Accettazione

- [ ] **AC1**: Titoli footer in giallo
  - Scenario: Quando scrivo fino al footer
  - Risultato atteso: Titoli "Navigazione" e "Risorse" sono in Cyber Yellow

- [ ] **AC2**: Utilizza utility design system
  - Scenario: Quando ispeziono il CSS
  - Risultato atteso: Classe `text-cyber-yellow` applicata (non colore hard-coded)

- [ ] **AC3**: Contrasto leggibile
  - Scenario: Quando leggo i titoli
  - Risultato atteso: Contrasto ≥4.5:1 su sfondo footer (WCAG AA)

- [ ] **AC4**: Modifiche applicate a IT/EN
  - Scenario: Quando cambio lingua
  - Risultato atteso: Colore consistente in entrambe le lingue

---

## Test Plan

### Checklist di Testing
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test dark mode (verificare contrasto su sfondo scuro)
- [ ] Test i18n (IT/EN)
- [ ] Test accessibilità (contrasto WCAG AA)

---

## Linee Guida Tecniche

### Design System
- **Colore**: Cyber Yellow #FFD60A
- **Utility Tailwind**: `text-cyber-yellow`
- **Contrasto**: Su sfondo scuro (es. black/deep-navy), Cyber Yellow ha contrasto sufficiente

**Riferimento**:
```tsx
// ✅ CORRETTO
<h3 className="text-cyber-yellow">Navigazione</h3>

// ❌ SBAGLIATO
<h3 className="text-[#FFD60A]">Navigazione</h3>
<h3 className="text-black">Navigazione</h3>
```

### Files da Modificare
- Footer component (da identificare):
  - Potenzialmente: `/components/layout/Footer.tsx`
  - Oppure: `/app/[locale]/layout.tsx` (se footer inline)
  - Oppure: `/components/Footer.tsx`

---

## Implementazione Guidata

### Step 1: Localizzare il footer
- [ ] Cercare "Navigazione" e "Risorse" nel codebase
- [ ] Identificare il componente Footer
- [ ] Aprire il file corrispondente

### Step 2: Modificare colore titoli
- [ ] Trovare elementi `<h2>`, `<h3>` o `<h4>` con testo "Navigazione" e "Risorse"
- [ ] Sostituire `text-black` (o colore attuale) con `text-cyber-yellow`
- [ ] Verificare che non ci siano altri stili inline che sovrascrivono

### Step 3: Testing
- [ ] Test visivo su localhost:3000
- [ ] Scrollare fino al footer
- [ ] Verificare entrambe le lingue (IT/EN)
- [ ] Verificare contrasto su sfondo footer

---

## Note per Claude Code

### Attenzione Speciale A:
1. **Sfondo footer**: Verificare colore sfondo del footer - se è molto chiaro, Cyber Yellow potrebbe non avere contrasto sufficiente. In tal caso:
   - Opzione A: Usare colore più scuro (es. `text-deep-purple`)
   - Opzione B: Scurire sfondo footer
   - Opzione C: Usare Cyber Yellow con shadow/outline per migliorare leggibilità

2. **Altri titoli footer**: Verificare se ci sono altri titoli footer (es. "Contatti", "Social") che dovrebbero avere lo stesso colore per consistenza

### Files da Cercare:
```bash
# Cercare componente footer
grep -r "Navigazione" app/ components/

# Cercare "Risorse"
grep -r "Risorse" app/ components/
```

---

## Definition of Done

- [ ] Titoli "Navigazione" e "Risorse" in Cyber Yellow
- [ ] Utility `text-cyber-yellow` utilizzata (no hard-coding)
- [ ] Contrasto WCAG AA verificato (≥4.5:1)
- [ ] Modifiche applicate a IT e EN
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-15 | Story creata | Todo |
| 2025-11-15 | Story verified as already completed in commit f9dcfa7 - Footer titles already using text-cyber-yellow | Done |
