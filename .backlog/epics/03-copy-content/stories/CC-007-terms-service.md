# [CC-007] Creare Pagina Termini di Servizio IT/EN

## Metadata
- **Story ID**: CC-007 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🟠 Alta (compliance) | **Dimensione**: 🟡 M (1 giorno)
- **Execution Environment**: 💻 Claude Code Locale
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** website owner **Voglio** Termini di Servizio chiari **Così che** l'uso del sito e servizi sia regolamentato

## Criteri di Accettazione
- [ ] **AC1**: Pagina `/terms` (IT) e `/en/terms` (EN) create
- [ ] **AC2**: Contenuto copre: uso del sito, limitazioni responsabilità, proprietà intellettuale
- [ ] **AC3**: Linguaggio accessibile (non solo legalese)
- [ ] **AC4**: Link a ToS nel footer

## Template Sezioni
1. Accettazione termini
2. Uso del sito
3. Proprietà intellettuale (contenuti blog, design)
4. Limitazioni di responsabilità
5. Modifiche ai termini
6. Legge applicabile e foro competente

## Implementazione
1. Usare copywriter-hybrid per generare bozza ToS
2. Includere specifiche: portfolio personale, blog, chatbot, booking
3. Creare pagina `/app/[locale]/terms/page.tsx`
4. Applicare design system
5. Aggiungere link nel footer

## Files da Creare
- `/app/[locale]/terms/page.tsx` (IT)
- `/app/en/terms/page.tsx` (EN)

## Definition of Done
- [ ] Pagine Terms create IT/EN
- [ ] Contenuto completo e chiaro
- [ ] Link nel footer funzionante
- [ ] Design leggibile
- [ ] copywriter-hybrid validation
