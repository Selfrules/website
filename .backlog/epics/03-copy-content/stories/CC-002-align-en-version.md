# [CC-002] Allineamento Versione EN con Tone of Voice

## Metadata
- **Story ID**: CC-002 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 💻 **Claude Code Locale**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** utente anglofono **Voglio** contenuto EN coerente con versione IT e tone of voice **Così che** l'esperienza sia equivalente

## Criteri di Accettazione
- [ ] **AC1**: copywriter-hybrid verifica versione EN homepage
- [ ] **AC2**: Tone of voice EN equivale a IT (pragmatic, accessible, purpose-driven)
- [ ] **AC3**: Traduzioni non sono letterali ma adattate culturalmente
- [ ] **AC4**: CTAs EN sono conversion-optimized
- [ ] **AC5**: Aneddoti e metafore funzionano anche in EN

## Sezioni da Verificare
- Hero (EN vs IT)
- Journey/Experiences (EN vs IT)
- Blog section (EN vs IT)
- About/Contact (EN vs IT)

## Implementazione
1. Estrarre tutti i testi EN attuali
2. Lanciare copywriter-hybrid per analisi comparative IT/EN
3. Identificare discrepanze
4. Riscrivere sezioni EN che non rispettano tone of voice
5. Validare con hormozi-conversion-optimizer

## Files
- `/messages/en.json` (se i18n è basato su JSON)
- O `/app/[locale]/page.tsx` con conditional rendering

## Definition of Done
- [ ] Analisi comparativa IT/EN completata
- [ ] Tutte le discrepanze identificate e fixate
- [ ] Tone of voice EN equivalente a IT
- [ ] Test lettura completa versione EN
- [ ] Feedback su naturalezza EN ricevuto (se possibile)
