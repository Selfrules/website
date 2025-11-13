# [CC-003] Aggiunta Aneddoti Esperienze

## Metadata
- **Story ID**: CC-003 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 💻 **Claude Code Locale**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** lettore **Voglio** aneddoti rilevanti per ogni esperienza **Così che** possa capire meglio il valore e l'impatto del lavoro di Mattia

## Criteri di Accettazione
- [ ] **AC1**: Ogni experience ha un aneddoto come già fatto per Flowing
- [ ] **AC2**: Aneddoti sono concreti e specifici (no genericità)
- [ ] **AC3**: Seguono pattern: problema → soluzione → risultato
- [ ] **AC4**: copywriter-hybrid valida coerenza con tone of voice
- [ ] **AC5**: Versione IT e EN allineate

## Esempio (Flowing)
```
"Come i pagamenti sono passati da 7 click a 3"
→ Problema: troppi click
→ Soluzione: semplificazione
→ Risultato: 12% velocità in più
```

## Experiences da Aggiornare
- Tutte le experience cards nella sezione Journey
- Verificare quali hanno già aneddoto vs quali mancano

## Implementazione
1. Identificare experiences senza aneddoti
2. Per ciascuna, usare copywriter-hybrid per generare aneddoto basato su:
   - Descrizione esperienza
   - Skillset utilizzato
   - Risultati raggiunti
3. Applicare aneddoti sia versione IT che EN

## Definition of Done
- [ ] Tutti le experience hanno aneddoto
- [ ] Aneddoti validati da copywriter-hybrid
- [ ] IT e EN allineate
- [ ] Formato consistente con Flowing example
