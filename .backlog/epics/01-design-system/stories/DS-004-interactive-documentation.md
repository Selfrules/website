# [DS-004] Documentazione Interattiva Design System

## Metadata
- **Story ID**: DS-004
- **Epic**: [EPIC-001](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Creazione**: 2025-11-13

## User Story
**Come** developer **Voglio** una pagina design-system interattiva e ben strutturata **Così che** possa rapidamente trovare componenti, copiare codice e vedere esempi live

## Criteri di Accettazione
- [ ] **AC1**: Pagina design-system ha navigazione per categorie (Buttons, Cards, Forms, Typography, Colors, Spacing)
- [ ] **AC2**: Ogni componente ha preview interattiva (posso cambiare varianti in real-time)
- [ ] **AC3**: Code snippets copiabili con un click per ogni esempio
- [ ] **AC4**: Dark mode toggle per vedere componenti in entrambi i temi
- [ ] **AC5**: Responsive design - funziona su mobile

## Test Plan
**Test E2E**:
```typescript
// e2e/design-system.spec.ts
test('can navigate categories and copy code', async ({ page }) => {
  await page.goto('/design-system');
  await page.click('text=Buttons');
  await page.click('[data-copy-code]');
  // Verify clipboard
});
```

**Checklist**: Test mobile, dark mode, tutti i componenti visibili, copy-to-clipboard funziona

## Linee Guida Tecniche
- Usa `@radix-ui/react-tabs` per navigazione categorie
- Usa `react-syntax-highlighter` per code snippets
- Implementa copy-to-clipboard con `navigator.clipboard.writeText()`
- Struttura: Hero → Navigation → Component Grid (categorizzato) → Footer

## Implementazione
1. Creare layout con tabs per categorie
2. Per ogni componente: showcase + code snippet + props table
3. Implementare dark mode toggle
4. Implementare copy-to-clipboard
5. Test responsive

## Dipendenze
- DS-001 (design tokens)
- DS-002 (auto-catalogazione - può generare il contenuto)

## Definition of Done
- [ ] Pagina navigabile per categorie
- [ ] Tutti i componenti UI mostrati con esempi
- [ ] Copy-to-clipboard funziona
- [ ] Dark mode funziona
- [ ] Mobile responsive
- [ ] Test E2E passa
