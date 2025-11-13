# [CC-006] Creare Pagina Privacy Policy IT/EN

## Metadata
- **Story ID**: CC-006 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🔴 Critica (compliance) | **Dimensione**: 🟡 M (1 giorno)
- **Execution Environment**: 💻 Claude Code Locale
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** website owner **Voglio** Privacy Policy compliant con GDPR/leggi privacy **Così che** il sito sia legalmente conforme

## Criteri di Accettazione
- [ ] **AC1**: Pagina `/privacy` (IT) e `/en/privacy` (EN) create
- [ ] **AC2**: Contenuto copre: raccolta dati, uso dati, cookies, diritti utente, contatti
- [ ] **AC3**: Conforme GDPR
- [ ] **AC4**: Linguaggio chiaro (non solo legalese)
- [ ] **AC5**: Link a Privacy Policy nel footer

## Template Sezioni
1. Introduzione
2. Dati raccolti (Google Calendar, Analytics, Chatbot)
3. Come usiamo i dati
4. Cookies e tracking
5. Diritti dell'utente (accesso, cancellazione, etc.)
6. Contatti per privacy

## Implementazione
1. Usare copywriter-hybrid per generare bozza Privacy Policy
2. Includere specifiche del sito (Google Calendar API, Claude chatbot, Analytics)
3. Creare pagina `/app/[locale]/privacy/page.tsx`
4. Applicare design system (leggibile, non solo muro di testo)
5. Aggiungere link nel footer

## Files da Creare
- `/app/[locale]/privacy/page.tsx` (IT)
- `/app/en/privacy/page.tsx` (EN)

## Definition of Done
- [ ] Pagine Privacy create IT/EN
- [ ] Contenuto GDPR compliant
- [ ] Link nel footer funzionante
- [ ] Design leggibile (headings, spacing)
- [ ] copywriter-hybrid validation
