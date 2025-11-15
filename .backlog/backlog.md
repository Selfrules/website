# Backlog Master

Backlog strutturato per Claude Code con epiche e user stories dettagliate.

**Data Creazione**: 2025-11-13
**Ultima Modifica**: 2025-11-15

---

## Come Usare Questo Backlog

### Per Claude Code
1. Leggi l'epica per comprendere il contesto
2. Seleziona una user story in base a priorità e dimensione
3. Segui la sezione "Implementazione Guidata" nella story
4. Completa la Definition of Done
5. Marca la story come completata

### Legenda
- **Priorità**: 🔴 Critica / 🟠 Alta / 🟡 Media / 🟢 Bassa
- **Dimensione**: 🟢 S (2-4h) / 🟡 M (1-2 giorni) / 🔴 L (3-5 giorni)
- **Execution Environment**:
  - 🌐 Claude Code Web: Eseguibile su claude.ai/code
  - 💻 Claude Code Locale: Richiede agenti/MCP disponibili solo in locale
  - 🔄 Entrambi: Parte Web, parte Locale

---

## EPIC-001: Consolidamento e Automazione Design System

**Priorità**: 🔴 Alta | **Stima**: M (1-2 settimane) | **Ambiente**: 🔄 Entrambi

### Obiettivo
Consolidare il design system neobrutalist, eliminare ambiguità tra Tailwind vanilla e custom utilities, automatizzare catalogazione componenti.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| DS-001 | Consolidare design tokens in tailwind.config | 🔴 | 🟡 M | 🌐 Web | 📋 Todo |
| DS-002 | Sistema auto-catalogazione componenti | 🟠 | 🔴 L | 💻 Locale | 📋 Todo |
| DS-003 | Aggiornare CLAUDE.md con linee guida | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| DS-004 | Documentazione interattiva design system | 🟡 | 🟡 M | 🌐 Web | 📋 Todo |
| DS-005 | Audit e refactoring componenti esistenti | 🟠 | 🔴 L | 🌐 Web | 📋 Todo |

**Links**: [Epic](./epics/01-design-system/epic.md) | [Stories](./epics/01-design-system/stories/)

---

## EPIC-002: Fix e Miglioramento Google Calendar Widget

**Priorità**: 🔴 Alta | **Stima**: S (3-5 giorni) | **Ambiente**: 🌐 Web

### Obiettivo
Rendere il widget Google Calendar completamente funzionale e usabile su desktop e mobile.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| GC-001 | Fix popup centering & responsiveness | 🔴 | 🟡 M | 🌐 Web | ✅ Completato (2025-11-13) |
| GC-002 | Test e validazione booking flow | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| GC-003 | Miglioramenti UX e design system | 🟡 | 🟢 S | 🌐 Web | 📋 Todo |

**Links**: [Epic](./epics/02-google-calendar/epic.md) | [Stories](./epics/02-google-calendar/stories/)

---

## EPIC-003: Ottimizzazione Copy e Contenuti Sito

**Priorità**: 🟠 Alta | **Stima**: M (1-2 settimane) | **Ambiente**: 💻 Locale

### Obiettivo
Ottimizzare tutti i contenuti del sito per tone of voice, conversione, e compliance legale.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| CC-001 | Verifica e ottimizzazione CTAs homepage | 🟠 | 🟡 M | 💻 Locale | 📋 Todo |
| CC-002 | Allineamento versione EN con tone of voice | 🟠 | 🟡 M | 💻 Locale | 📋 Todo |
| CC-003 | Aggiunta aneddoti esperienze | 🟡 | 🟢 S | 💻 Locale | 📋 Todo |
| CC-004 | Verifica badge hero "PM • Designer • Dev" | 🟢 | 🟢 S | 💻 Locale | 📋 Todo |
| CC-005 | Footer: sostituire "Mattia Cintura" con "MFDL" | 🟢 | 🟢 S | 🌐 Web | 📋 Todo |
| CC-006 | Creare pagina Privacy Policy IT/EN | 🔴 | 🟡 M | 💻 Locale | 📋 Todo |
| CC-007 | Creare pagina Termini di Servizio IT/EN | 🟠 | 🟡 M | 💻 Locale | 📋 Todo |

**Links**: [Epic](./epics/03-copy-content/epic.md) | [Stories](./epics/03-copy-content/stories/)

---

## EPIC-004: Chatbot AI Funzionale e Intelligente

**Priorità**: 🔴 Alta | **Stima**: L (2-4 settimane) | **Ambiente**: 💻 Locale

### Obiettivo
Implementare chatbot AI completamente funzionale con RAG, tone of voice personalizzato, integrazione Calendar, e protezioni anti-abuse.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| CB-001 | Connessione API Claude e gestione conversazioni | 🔴 | 🔴 L | 💻 Locale | 📋 Todo |
| CB-002 | Sistema RAG con conoscenza professionale | 🔴 | 🔴 L | 💻 Locale | 📋 Todo |
| CB-003 | Tone of voice personalizzato | 🟠 | 🟡 M | 💻 Locale | 📋 Todo |
| CB-004 | Integrazione booking Google Calendar | 🟠 | 🟡 M | 💻 Locale | 📋 Todo |
| CB-005 | Sistema controllo articoli blog e FAQ | 🟡 | 🟡 M | 💻 Locale | 📋 Todo |
| CB-006 | Rate limiting e bot detection | 🔴 | 🟢 S | 💻 Locale | 📋 Todo |
| CB-007 | UI/UX chatbot e apertura da homepage | 🟡 | 🟢 S | 🌐 Web | 📋 Todo |

**Links**: [Epic](./epics/04-chatbot/epic.md) | [Stories](./epics/04-chatbot/stories/)

---

## EPIC-005: Integrazione Spotify Player e Podcast

**Priorità**: 🟡 Media | **Stima**: S (3-5 giorni) | **Ambiente**: 🔄 Entrambi

### Obiettivo
Integrare Spotify nella sezione "Now Playing" mostrando musica in ascolto e podcast recenti.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| SP-001 | Integrazione Spotify API Now Playing | 🟠 | 🟡 M | 💻 Locale | 📋 Todo |
| SP-002 | Widget podcast recenti | 🟡 | 🟢 S | 💻 Locale | 📋 Todo |
| SP-003 | UI/UX sezione Now Playing | 🟡 | 🟢 S | 🌐 Web | 📋 Todo |

**Links**: [Epic](./epics/05-spotify-player/epic.md) | [Stories](./epics/05-spotify-player/stories/)

---

## EPIC-006: Redesign e Content Generation Blog

**Priorità**: 🟠 Alta | **Stima**: L (2-4 settimane) | **Ambiente**: 💻 Locale

### Obiettivo
Redesign completo blog basato su prototipo Figma e implementazione sistema AI-assisted content creation.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| BL-001 | Ricostruzione design sezione blog homepage | 🟠 | 🟡 M | 🌐 Web | 📋 Todo |
| BL-002 | Redesign pagina blog (lista articoli) | 🟠 | 🟡 M | 🌐 Web | 📋 Todo |
| BL-003 | Redesign singola pagina articolo | 🔴 | 🔴 L | 🌐 Web | 📋 Todo |
| BL-004 | Generazione pool argomenti con agenti | 🟠 | 🟡 M | 💻 Locale | 📋 Todo |
| BL-005 | Sistema AI-assisted content creation | 🟡 | 🔴 L | 💻 Locale | 📋 Todo |

**Links**: [Epic](./epics/06-blog/epic.md) | [Stories](./epics/06-blog/stories/)

---

## EPIC-008: Production Performance Optimization

**Priorità**: 🔴 Alta | **Stima**: M (1-2 settimane) | **Ambiente**: 🌐 Web

### Obiettivo
Portare il sito a Lighthouse score 90-95+ ottimizzando font loading, bundle size, immagini, Core Web Vitals, caching e configurazione Next.js per produzione.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| PF-001 | Font Loading Optimization & Render Blocking Fix | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| PF-002 | Bundle Size Reduction & Dynamic Imports | 🔴 | 🔴 L | 🌐 Web | 📋 Todo |
| PF-003 | Image Optimization & AVIF Support | 🟠 | 🟡 M | 🌐 Web | 📋 Todo |
| PF-004 | Remove Component Duplication | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| PF-005 | API & Data Fetching Optimization | 🟡 | 🟡 M | 🌐 Web | 📋 Todo |
| PF-006 | Core Web Vitals Improvements (CLS, LCP, INP) | 🟠 | 🔴 L | 🌐 Web | 📋 Todo |
| PF-007 | ISR & Caching Strategy | 🟠 | 🟡 M | 🌐 Web | 📋 Todo |
| PF-008 | Next.js Build Configuration Optimization | 🟡 | 🟢 S | 🌐 Web | 📋 Todo |

**Links**: [Epic](./epics/08-performance/epic.md) | [Stories](./epics/08-performance/stories/)

---

## Statistiche Backlog

### Per Priorità
- 🔴 Critica: 13 stories
- 🟠 Alta: 15 stories
- 🟡 Media: 10 stories
- 🟢 Bassa: 3 stories

### Per Dimensione
- 🟢 Small (2-4h): 15 stories
- 🟡 Medium (1-2 giorni): 19 stories
- 🔴 Large (3-5 giorni): 7 stories

### Per Ambiente
- 🌐 Claude Code Web: 23 stories
- 💻 Claude Code Locale: 17 stories
- 🔄 Entrambi: 1 story

**Totale**: 8 epiche, 41 user stories

---

## Ordine Consigliato di Esecuzione

### Phase 1: Foundations & Performance (Settimane 1-3)
1. **EPIC-008** Performance Optimization (🔴 CRITICO per produzione)
   - Week 1: PF-001, PF-004, PF-008 (Quick wins: +15-20 pts)
   - Week 2: PF-002, PF-003 (Bundle & Images: +10-15 pts)
   - Week 3: PF-006, PF-007, PF-005 (Core Web Vitals: +10-15 pts)
   - **Target finale**: Lighthouse 90-95+

2. **EPIC-001** Design System (prerequisito per UI consistency)
   - Iniziare con DS-001, DS-003 (Web)
   - Poi DS-002 (Locale per auto-catalogazione)
   - Poi DS-004, DS-005

### Phase 2: Quick Wins & Conversion (Settimana 4)
3. **EPIC-002** Google Calendar (critico per conversione)
4. **CC-005** Footer update (veloce)

### Phase 3: Content & Copy (Settimane 5-6)
5. **EPIC-003** Copy/Contenuto (con agenti)
6. **EPIC-006** Blog redesign (BL-001, BL-002, BL-003)

### Phase 4: Advanced Features (Settimane 7-10)
7. **EPIC-004** Chatbot (complesso, richiede tempo)
8. **EPIC-005** Spotify Player
9. **BL-004, BL-005** Content generation con AI

---

## Manutenzione Backlog

### Quando Aggiornare
- Dopo completamento di ogni story
- Quando emergono nuovi requisiti
- Quando cambiano priorità

### Come Aggiornare
1. Aggiornare stato stories in tabelle epiche
2. Aggiornare questo file master
3. Aggiungere date completamento nelle stories
4. Documentare learnings e blockers

---

**Per supporto o domande sul backlog system, consultare**: [README.md](./README.md)
