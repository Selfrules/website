# [CB-004] Integrazione Booking Google Calendar

## Metadata
- **Story ID**: CB-004 | **Epic**: [EPIC-004](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 💻 **Claude Code Locale**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** chatbot **Voglio** proporre e fissare appuntamenti via Google Calendar **Così che** possa convertire conversazioni in call

## Criteri di Accettazione
- [ ] **AC1**: Chatbot riconosce quando proporre booking (intent detection)
- [ ] **AC2**: Mostra slot disponibili via Google Calendar API
- [ ] **AC3**: Raccoglie preferenza utente (giorno/ora)
- [ ] **AC4**: Conferma e crea evento in Google Calendar
- [ ] **AC5**: Invia conferma all'utente con dettagli meeting

## Conversational Flow

```
User: "Vorrei parlare del mio progetto"

Bot: "Ottimo! Parlarne di persona è il modo migliore.
Ho questi slot disponibili questa settimana:
- Martedì 14 Nov, 14:00-15:00
- Mercoledì 15 Nov, 10:00-11:00
- Giovedì 16 Nov, 16:00-17:00

Quale preferisci?"

User: "Martedì alle 14"

Bot: "Perfetto! Per confermare, mi serve:
- Nome completo
- Email
- Breve descrizione del progetto (1-2 righe)"

User: [fornisce info]

Bot: "✅ Call confermata per Martedì 14 Nov alle 14:00.
Ti ho inviato invito calendario via email.
Cosa vuoi discutere nella call?"
```

## Implementazione

### Intent Detection
```typescript
// lib/chatbot/intents.ts
export function detectBookingIntent(message: string): boolean {
  const patterns = [
    /vuoi.*parlare|possiamo.*parlare/i,
    /fissare.*call|booking|appuntamento/i,
    /quando.*disponibile/i,
  ];
  return patterns.some(p => p.test(message));
}
```

### Get Available Slots
```typescript
// Riusa API da EPIC-002 (Google Calendar)
const slots = await fetch('/api/calendar/availability').then(r => r.json());
```

### Create Event
```typescript
// lib/chatbot/booking.ts
export async function createCalendarEvent({
  datetime,
  userEmail,
  userName,
  description,
}: BookingDetails) {
  return fetch('/api/calendar/book', {
    method: 'POST',
    body: JSON.stringify({ datetime, userEmail, userName, description }),
  });
}
```

## Test Plan
```typescript
test('detects booking intent', () => {
  expect(detectBookingIntent('Vorrei parlare con te')).toBe(true);
  expect(detectBookingIntent('Ciao come stai')).toBe(false);
});

test('chatbot proposes available slots', async () => {
  // Mock conversation with booking intent
  // Verify bot returns available slots
});

test('chatbot creates calendar event', async () => {
  // Complete booking flow
  // Verify event created in Google Calendar (test environment)
});
```

## Dipendenze
- [ ] EPIC-002 GC-002 (Google Calendar API funzionante)
- [ ] CB-001 (Chat API)

## Definition of Done
- [ ] Intent detection funziona
- [ ] Chatbot mostra slot disponibili
- [ ] Conversational flow naturale
- [ ] Evento creato in Google Calendar
- [ ] Conferma inviata all'utente
- [ ] Test end-to-end passa
- [ ] Error handling (nessuno slot, API error)
