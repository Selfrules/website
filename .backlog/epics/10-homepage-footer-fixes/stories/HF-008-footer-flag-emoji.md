# [HF-008] Footer Italian flag emoji

## Metadata
- **Story ID**: HF-008
- **Epic**: [EPIC-010 Homepage & Footer Fixes](../epic.md)
- **Priorità**: 🟢 Bassa
- **Dimensione**: 🟢 S (15-30min)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-15

---

## User Story

**Come** visitatore del sito
**Voglio** vedere l'emoji della bandiera italiana 🇮🇹 invece di "IT" testuale
**Così che** il language selector sia più visivo e internazionalmente riconoscibile

---

## Descrizione Dettagliata

### Contesto
Nel footer, il language selector mostra attualmente "IT" come testo. Per rendere il selettore più visivo e universalmente comprensibile, dovrebbe mostrare l'emoji della bandiera italiana 🇮🇹.

### Obiettivo Specifico
Sostituire il testo "IT" con l'emoji 🇮🇹 nel language selector del footer.

**Nota**: Se esiste anche "EN", considerare di sostituirlo con 🇬🇧 per consistenza.

---

## Criteri di Accettazione

- [ ] **AC1**: Emoji bandiera italiana visualizzata
  - Scenario: Quando scrivo fino al footer
  - Risultato atteso: Vedo 🇮🇹 invece di "IT"

- [ ] **AC2**: Funzionalità language selector intatta
  - Scenario: Quando clicco sulla bandiera
  - Risultato atteso: Lingua cambia correttamente (se selettore funzionale)

- [ ] **AC3**: Emoji bandiera UK per EN (se presente)
  - Scenario: Quando vedo la versione inglese
  - Risultato atteso: Vedo 🇬🇧 invece di "EN" (per consistenza)

- [ ] **AC4**: Accessibilità
  - Scenario: Quando uso screen reader
  - Risultato atteso: Attributo `aria-label` appropriato (es. "Italiano" o "Switch to Italian")

---

## Test Plan

### Checklist di Testing
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test i18n (IT/EN)
- [ ] Test accessibilità (screen reader)
- [ ] Test su diversi OS (emoji rendering può variare)

---

## Linee Guida Tecniche

### Implementazione
**HTML/React**:
```tsx
// ✅ CORRETTO - Con accessibilità
<button
  onClick={switchLanguage}
  aria-label="Cambia lingua in Italiano"
  className="text-2xl"
>
  🇮🇹
</button>

// ✅ ALTERNATIVA - Con testo + emoji
<button onClick={switchLanguage}>
  🇮🇹 IT
</button>

// ❌ SBAGLIATO - No accessibilità
<button onClick={switchLanguage}>🇮🇹</button>
```

**Emoji da usare**:
- Italiano: 🇮🇹 (U+1F1EE U+1F1F9)
- Inglese: 🇬🇧 (U+1F1EC U+1F1E7)

### Files da Modificare
- Footer component:
  - `/components/layout/Footer.tsx`
  - Oppure: `/app/[locale]/layout.tsx`
  - Oppure: `/components/Footer.tsx`

---

## Implementazione Guidata

### Step 1: Localizzare il language selector
- [ ] Aprire il componente Footer
- [ ] Trovare il language selector (probabilmente pulsante o link con "IT"/"EN")

### Step 2: Sostituire testo con emoji
- [ ] Sostituire "IT" con "🇮🇹"
- [ ] Se presente, sostituire "EN" con "🇬🇧"
- [ ] Aggiungere `aria-label` per accessibilità

### Step 3: Aggiustare styling
- [ ] Aumentare font-size se necessario (emoji potrebbero sembrare piccole)
- [ ] Verificare spaziatura e allineamento

### Step 4: Testing
- [ ] Test visivo su localhost:3000
- [ ] Verificare funzionalità switch lingua (se presente)
- [ ] Verificare su diversi browser/OS

---

## Note per Claude Code

### Attenzione Speciale A:
1. **Accessibilità**: SEMPRE aggiungere `aria-label` quando si usano emoji senza testo:
   ```tsx
   aria-label="Italiano"  // o "Switch to Italian" in EN
   ```

2. **Emoji rendering**: Emoji bandiere potrebbero apparire diversamente su:
   - Windows (potrebbe mostrare "IT" in box)
   - macOS (emoji colorate)
   - Linux (varia in base a font)
   - Mobile (generalmente buon supporto)

   Se emoji non funzionano bene, considerare alternativa: "🇮🇹 IT"

3. **Size**: Emoji potrebbero essere troppo piccole. Considerare:
   ```tsx
   className="text-2xl"  // o text-3xl
   ```

---

## Definition of Done

- [ ] Emoji 🇮🇹 visualizzata al posto di "IT"
- [ ] Emoji 🇬🇧 visualizzata al posto di "EN" (se presente)
- [ ] `aria-label` aggiunto per accessibilità
- [ ] Funzionalità language selector intatta
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile
- [ ] Test su diversi browser/OS

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-15 | Story creata | Todo |
