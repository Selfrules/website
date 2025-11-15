# [HF-009] Footer MFDL branding

## Metadata
- **Story ID**: HF-009
- **Epic**: [EPIC-010 Homepage & Footer Fixes](../epic.md)
- **Priorità**: 🟡 Media
- **Dimensione**: 🟢 S (30min - 1h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-15

---

## User Story

**Come** owner del sito (Mattia)
**Voglio** che il footer mostri "MFDL" invece di "Mattia De Luca"
**Così che** il branding sia consistente con la mia identità professionale abbreviata

---

## Descrizione Dettagliata

### Contesto
Nel footer del sito, attualmente viene visualizzato il nome completo "Mattia De Luca". Per coerenza con il branding personale e per un look più moderno/minimale, dovrebbe essere sostituito con l'acronimo **"MFDL"** (Mattia F. De Luca).

### Obiettivo Specifico
Sostituire tutte le occorrenze di "Mattia De Luca" nel footer con "MFDL", mantenendo eventualmente tooltip o `aria-label` con nome completo per accessibilità.

---

## Criteri di Accettazione

- [ ] **AC1**: Footer mostra "MFDL"
  - Scenario: Quando scrivo fino al footer
  - Risultato atteso: Vedo "MFDL" invece di "Mattia De Luca"

- [ ] **AC2**: Modifiche applicate a IT/EN
  - Scenario: Quando cambio lingua
  - Risultato atteso: "MFDL" in entrambe le versioni (acronimo non cambia)

- [ ] **AC3**: Accessibilità mantenuta
  - Scenario: Quando uso screen reader o passo il mouse
  - Risultato atteso: Nome completo disponibile via tooltip o `aria-label`

- [ ] **AC4**: Copyright con MFDL
  - Scenario: Quando leggo copyright footer
  - Risultato atteso: "© 2024 MFDL" (o anno corrente)

---

## Test Plan

### Checklist di Testing
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test i18n (IT/EN)
- [ ] Test accessibilità (tooltip/aria-label)
- [ ] Verificare coerenza branding in tutto il sito

---

## Linee Guida Tecniche

### Implementazione
**Opzioni**:

**Opzione A - Solo MFDL (minimal)**:
```tsx
<p>© 2024 MFDL. Tutti i diritti riservati.</p>
```

**Opzione B - MFDL con tooltip**:
```tsx
<p>
  © 2024{' '}
  <abbr title="Mattia F. De Luca" className="no-underline cursor-help">
    MFDL
  </abbr>
  . Tutti i diritti riservati.
</p>
```

**Opzione C - MFDL con aria-label**:
```tsx
<p>
  © 2024{' '}
  <span aria-label="Mattia F. De Luca">MFDL</span>
  . Tutti i diritti riservati.
</p>
```

### Files da Modificare
- Footer component:
  - `/components/layout/Footer.tsx`
  - Oppure: `/app/[locale]/layout.tsx`
  - Oppure: `/components/Footer.tsx`

### Branding Considerations
Verificare se "MFDL" è già usato altrove nel sito (es. logo, hero) per consistenza.

---

## Implementazione Guidata

### Step 1: Localizzare "Mattia De Luca" nel footer
- [ ] Cercare "Mattia De Luca" o "Mattia Cintura" nel codebase
- [ ] Identificare tutte le occorrenze nel footer
- [ ] Aprire il componente Footer

### Step 2: Sostituire con MFDL
- [ ] Sostituire "Mattia De Luca" con "MFDL"
- [ ] Aggiungere tooltip/aria-label per accessibilità (scegliere Opzione B o C)
- [ ] Aggiornare copyright se presente

### Step 3: Verificare altre sezioni (opzionale)
- [ ] Cercare "Mattia De Luca" in tutto il sito
- [ ] Valutare se altre occorrenze dovrebbero essere MFDL per consistenza

### Step 4: Testing
- [ ] Test visivo su localhost:3000
- [ ] Verificare tooltip (se implementato)
- [ ] Verificare entrambe le lingue (IT/EN)

---

## Note per Claude Code

### Attenzione Speciale A:
1. **Consistenza branding**: Prima di implementare, verificare se "MFDL" è già usato nel sito:
   ```bash
   grep -r "MFDL" app/ components/
   ```
   Se sì, mantienere stile consistente. Se no, questa potrebbe essere la prima occorrenza.

2. **Altre occorrenze "Mattia De Luca"**: Cercare tutte le occorrenze nel sito:
   ```bash
   grep -r "Mattia De Luca" app/ components/
   grep -r "Mattia Cintura" app/ components/  # Potrebbe essere nome precedente
   ```
   Valutare quali dovrebbero rimanere nome completo (es. About page) e quali MFDL (es. footer, copyright).

3. **SEO considerations**: Se "Mattia De Luca" è importante per SEO (es. in metadata, schema.org), mantenerlo lì e usare MFDL solo per UI.

### Files da Cercare:
```bash
# Cercare componente footer
grep -r "Tutti i diritti riservati" app/ components/
grep -r "All rights reserved" app/ components/

# Cercare copyright
grep -r "©" app/ components/
```

---

## Definition of Done

- [ ] Footer mostra "MFDL" invece di "Mattia De Luca"
- [ ] Tooltip o aria-label con nome completo per accessibilità
- [ ] Modifiche applicate a IT e EN
- [ ] Copyright aggiornato (se presente)
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile
- [ ] Branding consistente verificato

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-15 | Story creata | Todo |
