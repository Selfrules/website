# [CC-004] Verifica Badge Hero "PM • Designer • Dev"

## Metadata
- **Story ID**: CC-004 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🟢 Bassa | **Dimensione**: 🟢 S (1h)
- **Execution Environment**: 💻 Claude Code Locale
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** visitatore **Voglio** un badge hero che rappresenti accuratamente Mattia **Così che** capisca subito il suo skillset

## Criteri di Accettazione
- [ ] **AC1**: copywriter-hybrid valida che "PM • Designer • Dev" sia accurato
- [ ] **AC2**: Se non accurato, propone alternative basate su esperienza reale
- [ ] **AC3**: Ordine riflette priorità/focus (cosa fa di più)
- [ ] **AC4**: Versione EN allineata

## Opzioni Alternative (se necessario)
- "Product • Design • Code"
- "Strategy • UX • Dev"
- "PM • UX • Frontend"

## Implementazione
1. Lanciare copywriter-hybrid con context su background Mattia
2. Validare badge corrente
3. Se necessario, applicare modifica
4. Aggiornare IT e EN

## Files
- `/app/[locale]/page.tsx` (Hero section)

## Definition of Done
- [ ] Badge validato o aggiornato
- [ ] copywriter-hybrid approval
- [ ] IT e EN allineate
