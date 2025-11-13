# [GC-002] Test e Validazione End-to-End Booking Flow

## Metadata
- **Story ID**: GC-002
- **Epic**: [EPIC-002](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: ✅ Done | **Data**: 2025-11-13

## User Story
**Come** utente **Voglio** completare una prenotazione Google Calendar dall'inizio alla fine **Così che** possa effettivamente parlare con Mattia

## Criteri di Accettazione
- [ ] **AC1**: Posso selezionare un giorno disponibile nel widget
- [ ] **AC2**: Posso selezionare un orario disponibile
- [ ] **AC3**: Posso inserire i miei dati (nome, email)
- [ ] **AC4**: Ricevo conferma della prenotazione
- [ ] **AC5**: Evento appare in Google Calendar di Mattia
- [ ] **AC6**: Ricevo email di conferma (se configurato)

## Test Plan

### Test Manuale End-to-End
```
1. Aprire homepage
2. Click su CTA "Parliamone" (Hero)
3. Verificare popup si apre centrato ✓
4. Selezionare giorno disponibile ✓
5. Selezionare orario ✓
6. Inserire dati (nome, email) ✓
7. Confermare prenotazione ✓
8. Verificare messaggio di conferma ✓
9. Controllare Google Calendar (verifica reale) ✓
10. Controllare email ricevuta ✓
```

### Test da Desktop
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (se disponibile)

### Test da Mobile
- [ ] iOS Safari
- [ ] Android Chrome

## Linee Guida
- Se il booking flow non funziona, investigare:
  - OAuth2 configuration
  - Google Calendar API permissions
  - API endpoint `/api/calendar`

## Definition of Done
- [ ] Booking completato con successo da desktop
- [ ] Booking completato con successo da mobile
- [ ] Evento visibile in Google Calendar
- [ ] Conferma mostrata all'utente
- [ ] Tutti i browser testati funzionano
- [ ] Documentato processo di troubleshooting se errori

## Dipendenze
- GC-001 (popup deve essere utilizzabile prima)
