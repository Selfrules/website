# [STORY-ID] Titolo User Story

## Metadata
- **Story ID**: [EPIC-XXX]-[NUMBER] (es. DS-001, GC-002)
- **Epic**: [Link all'epica](./../epic.md)
- **Priorità**: 🔴 Critica / 🟠 Alta / 🟡 Media / 🟢 Bassa
- **Dimensione**: 🟢 S (2-4h) / 🟡 M (1-2 giorni) / 🔴 L (3-5 giorni)
- **Execution Environment**:
  - 🌐 **Claude Code Web**: Può essere completata su claude.ai/code
  - 💻 **Claude Code Locale**: Richiede agenti/MCP solo disponibili in locale
- **Stato**: 📋 Todo / 🔄 In Progress / ✅ Done / ⏸️ Blocked / ❌ Cancelled
- **Assegnata a**: Claude Code
- **Data Creazione**: YYYY-MM-DD
- **Data Completamento**: YYYY-MM-DD (se completata)

---

## User Story

**Come** [tipo di utente]
**Voglio** [azione/funzionalità]
**Così che** [beneficio/valore]

---

## Descrizione Dettagliata

<!-- Spiegazione approfondita di cosa deve essere fatto e perché -->

### Contesto
[Contesto di questa specifica story]

### Obiettivo Specifico
[Cosa vogliamo ottenere con questa singola story]

---

## Criteri di Accettazione

<!-- Condizioni che devono essere soddisfatte per considerare la story completata -->

- [ ] **AC1**: [Descrizione criterio 1]
  - Scenario: [Quando/Se...]
  - Risultato atteso: [Allora...]

- [ ] **AC2**: [Descrizione criterio 2]
  - Scenario: [Quando/Se...]
  - Risultato atteso: [Allora...]

- [ ] **AC3**: [Descrizione criterio 3]
  - Scenario: [Quando/Se...]
  - Risultato atteso: [Allora...]

---

## Test Plan

### Test da Creare PRE-Sviluppo (TDD)

#### Test Unitari
```typescript
// Descrizione: [Cosa testa]
// File: [path/to/test.spec.ts]
describe('[Component/Function Name]', () => {
  it('should [comportamento atteso]', () => {
    // Test implementation
  });
});
```

#### Test di Integrazione
```typescript
// Descrizione: [Cosa testa]
// File: [path/to/integration.spec.ts]
describe('[Integration Scenario]', () => {
  it('should [comportamento atteso]', () => {
    // Test implementation
  });
});
```

#### Test E2E (se applicabile)
```typescript
// Descrizione: [User flow da testare]
// File: [path/to/e2e.spec.ts]
test('[User flow description]', async ({ page }) => {
  // Test implementation
});
```

### Checklist di Testing
- [ ] Test unitari passano (green)
- [ ] Test di integrazione passano (green)
- [ ] Test E2E passano (se applicabili)
- [ ] Test manuali su desktop
- [ ] Test manuali su mobile
- [ ] Test dark mode
- [ ] Test i18n (IT/EN)
- [ ] Test accessibilità (WCAG AA)
- [ ] Test performance (Core Web Vitals)

---

## Linee Guida Tecniche

### Design System
<!-- Riferimenti specifici al design system da utilizzare -->

- **Componenti da utilizzare**: [Lista componenti esistenti]
- **Colori**: [Palette specifica]
  - Primary: Electric Blue #1E90FF
  - Secondary: Slate Blue #6A7B9F
  - Accent: Deep Navy #3E526A
  - Alternative: Teal #2A687A
- **Typography**: [Font e dimensioni]
- **Spacing**: [Sistema di spacing da usare]
- **Borders & Shadows**:
  - Borders: 4-6px solid black (border-brutal)
  - Shadows: 8px offset, no blur (shadow-brutal)
- **Border Radius**: 6-8px (rounded-brutal)

### Architettura e Pattern
<!-- Pattern architetturali da seguire -->

- **Pattern da utilizzare**: [Es. API Gateway, Component Composition, etc.]
- **Struttura file**: [Dove vanno i nuovi file]
- **Naming conventions**: [Convenzioni da seguire]
- **State management**: [Quale soluzione usare]

### API e Integrazioni
<!-- Se la story coinvolge API o integrazioni esterne -->

- **API endpoints**: [Lista endpoint da utilizzare/creare]
- **Autenticazione**: [Metodo di auth]
- **Rate limiting**: [Limiti da rispettare]
- **Error handling**: [Come gestire gli errori]

### Performance e Sicurezza
<!-- Requisiti di performance e sicurezza -->

- **Performance targets**:
  - FCP: <2s
  - INP: <100ms
  - Lazy loading: [Se necessario]

- **Security checklist**:
  - [ ] Input validation con Zod
  - [ ] XSS protection
  - [ ] CSRF protection (se form)
  - [ ] Rate limiting (se API)
  - [ ] Environment variables per secrets

---

## Implementazione Guidata

### Step 1: Preparazione
- [ ] Leggere l'epic completa
- [ ] Verificare dipendenze
- [ ] Creare branch: `claude/[story-id]-[short-description]`
- [ ] Creare i test (TDD)

### Step 2: Sviluppo
- [ ] Implementare la funzionalità
- [ ] Seguire le linee guida del design system
- [ ] Verificare i criteri di accettazione
- [ ] Far passare i test

### Step 3: Review e Refactoring
- [ ] Code review (se possibile)
- [ ] Refactoring se necessario
- [ ] Documentazione inline (JSDoc)
- [ ] Update README se necessario

### Step 4: Testing
- [ ] Eseguire tutti i test
- [ ] Test manuali
- [ ] Test su diversi dispositivi
- [ ] Test accessibilità

### Step 5: Deployment
- [ ] Commit con messaggio descrittivo
- [ ] Push su branch
- [ ] Creare PR (se richiesto)
- [ ] Deploy preview (Vercel)
- [ ] Final verification

---

## Dipendenze

### Dipendenze Tecniche
- [ ] [Libreria/Package]: [Versione] - [Motivo]

### Dipendenze da Altre Stories
- [ ] [STORY-ID]: [Descrizione dipendenza]

### Blockers
- [ ] [Descrizione blocco]: [Come risolverlo]

---

## Risorse e Riferimenti

### Design
- [Link a Figma/Mockup]
- [Link a design system page]

### Documentazione
- [Link a docs esterni]
- [Link a RFC/ADR se esistono]

### Esempi di Codice
- [Link a implementazioni simili]
- [Link a best practices]

---

## Note per Claude Code

<!-- Istruzioni specifiche per Claude Code quando esegue questa story -->

### Attenzione Speciale A:
- [Punto critico 1]
- [Punto critico 2]

### Files da Modificare/Creare:
- `/path/to/file1.ts` - [Cosa fare]
- `/path/to/file2.tsx` - [Cosa fare]

### Comandi da Eseguire:
```bash
# Comando 1
npm run [command]

# Comando 2
npm test -- [test-path]
```

---

## Definition of Done

- [ ] Tutti i criteri di accettazione sono soddisfatti
- [ ] Tutti i test passano (unit, integration, e2e)
- [ ] Code coverage >80% per nuovo codice
- [ ] Nessun warning di linting/type-checking
- [ ] Test manuali completati su desktop e mobile
- [ ] Dark mode funzionante
- [ ] i18n implementato (IT/EN)
- [ ] Performance targets raggiunti
- [ ] Accessibilità WCAG AA verificata
- [ ] Documentazione aggiornata
- [ ] Code review completata (se richiesta)
- [ ] Branch merged in main (se richiesto)
- [ ] Deploy completato

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| YYYY-MM-DD | Story creata | Todo |
| YYYY-MM-DD | Implementazione completata | Done |
