# [EPIC-004] Chatbot AI Funzionale e Intelligente

## Metadata
- **Epic ID**: EPIC-004
- **Priorità**: 🔴 Alta
- **Stato**: 📋 Not Started
- **Execution Environment**: 💻 Claude Code Locale (API integrations, RAG)
- **Stima Totale**: L (2-4 settimane)
- **Data Creazione**: 2025-11-13

## Contesto e Problema
Il chatbot attuale esiste ma non è funzionalmente completo:
- Non collegato alle API Claude
- Non ha RAG con informazioni su Mattia
- Non gestisce conversazioni efficacemente
- Non spinge a conversione (call booking)

### Impatto
- **Utenti**: Chatbot non risponde → frustrazione
- **Business**: Opportunità lead generation persa
- **Brand**: Esperienza incompleta

## Obiettivo
Chatbot AI completamente funzionale che:
- Risponde con tone of voice di Mattia
- Ha conoscenza professionale via RAG
- Gestisce booking Google Calendar
- Riconosce bot/spam
- Ha limiti di utilizzo appropriati

## User Stories
- [ ] [CB-001] Connessione API Claude e gestione conversazioni (L) - [Link](./stories/CB-001-claude-api-integration.md)
- [ ] [CB-002] Sistema RAG con conoscenza professionale (L) - [Link](./stories/CB-002-rag-system.md)
- [ ] [CB-003] Tone of voice personalizzato (M) - [Link](./stories/CB-003-tone-of-voice.md)
- [ ] [CB-004] Integrazione booking Google Calendar (M) - [Link](./stories/CB-004-calendar-integration.md)
- [ ] [CB-005] Sistema controllo articoli blog e FAQ (M) - [Link](./stories/CB-005-blog-faq-system.md)
- [ ] [CB-006] Rate limiting e bot detection (S) - [Link](./stories/CB-006-rate-limiting-bot-detection.md)
- [ ] [CB-007] UI/UX chatbot e apertura da homepage (S) - [Link](./stories/CB-007-ui-ux-improvements.md)

## Dipendenze
- Claude API access
- Google Calendar API (EPIC-002)
- Blog content (EPIC-006)
- Vector database per RAG (Pinecone/Weaviate/PGVector)

---
**Creata**: 2025-11-13
