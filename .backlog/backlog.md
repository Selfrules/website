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
| CC-005 | Footer: sostituire "Mattia Cintura" con "MFDL" | 🟢 | 🟢 S | 🌐 Web | ✅ Done (2025-11-15) |
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

## EPIC-007: Security Vulnerabilities Audit & Remediation

**Priorità**: 🔴 Critica | **Stima**: L (2-3 settimane) | **Ambiente**: 🌐 Web

### Obiettivo
Eliminare tutte le vulnerabilità di sicurezza identificate nell'audit prima del deployment in produzione. Implementare best practices OWASP Top 10 e garantire compliance GDPR.

### Context
Security audit ha identificato **31 vulnerabilità**: 4 Critical, 8 High, 16 Medium, 3 Low. Blocca il deployment in produzione fino al completamento delle Priority 0 stories.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| SEO-001 | Implementare robots.txt e sitemap.xml dinamico | 🔴 | 🟡 M | 🌐 Web | 📋 Todo |
| SEO-002 | Implementare JSON-LD Schema (Person, Article, WebSite) | 🔴 | 🔴 L | 🌐 Web | 📋 Todo |
| SEO-003 | Fix hreflang e canonical URLs per i18n | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| SEO-004 | Enhanceare blog metadata (tags, modifiedTime, featured images) | 🟠 | 🟡 M | 🌐 Web | 📋 Todo |
| SEO-005 | Implementare Author credibility schema e /about page | 🟠 | 🟡 M | 🌐 Web | 📋 Todo |
| SEO-006 | Implementare RSS/JSON feed per LLM ingestion | 🟠 | 🟢 S | 🌐 Web | 📋 Todo |
| SEO-007 | Enhanceare Blog API con endpoint per slug singoli | 🟡 | 🟢 S | 🌐 Web | 📋 Todo |
| SEO-008 | Ottimizzare Image SEO (alt validation, lazy loading) | 🟡 | 🟢 S | 🌐 Web | 📋 Todo |
| SEO-009 | Setup Lighthouse CI e Web Vitals monitoring | 🟡 | 🟡 M | 🌐 Web | 📋 Todo |

**Links**: [Epic](./epics/09-seo-optimization/epic.md) | [Stories](./epics/09-seo-optimization/stories/)

---

## EPIC-010: Homepage & Footer Fixes

**Priorità**: 🔴 Alta | **Stima**: S (3-5 giorni) | **Ambiente**: 🌐 Web

### Obiettivo
Correggere inconsistenze visive e di contenuto nelle sezioni Homepage (Hero, Journey, Blog) e Footer, garantendo aderenza al design system neobrutalist e accuratezza informazioni professionali.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| HF-001 | Fix hero button background color | 🟢 | 🟢 S | 🌐 Web | ✅ Done (2025-11-15) |
| HF-002 | Update languages in Journey section | 🟠 | 🟢 S | 🌐 Web | 📋 Todo |
| HF-003 | Fix project count consistency | 🟠 | 🟢 S | 🌐 Web | 📋 Todo |
| HF-004 | Update Flowing employment dates | 🟠 | 🟢 S | 🌐 Web | 📋 Todo |
| HF-005 | Add gradient to featured blog card | 🟡 | 🟢 S | 🌐 Web | ✅ Done (2025-11-15) |
| HF-006 | Fix Card borders globally | 🔴 | 🟡 M | 🌐 Web | ✅ Done (2025-11-15) |
| HF-007 | Footer navigation titles yellow color | 🟡 | 🟢 S | 🌐 Web | ✅ Done (2025-11-15) |
| HF-008 | Footer Italian flag emoji | 🟢 | 🟢 S | 🌐 Web | 📋 Todo |
| HF-009 | Footer MFDL branding | 🟡 | 🟢 S | 🌐 Web | 📋 Todo |

**Totale**: 9 stories (8 Small, 1 Medium)

**Links**: [Epic](./epics/10-homepage-footer-fixes/epic.md) | [Stories](./epics/10-homepage-footer-fixes/stories/)

---

## EPIC-011: Analytics Implementation & Event Tracking

**Priorità**: 🔴 Alta | **Stima**: S (3-5 giorni) | **Ambiente**: 🌐 Web

### Obiettivo
Implementare 100% event tracking coverage su tutti i critical user paths (CTA clicks, chat interactions, calendar bookings, form submissions) per abilitare data-driven decisions.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| AN-001 | Add CTA Click Tracking (Hero, WorkTogether) | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| AN-002 | Add Chat Interaction Tracking | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| AN-003 | Add Calendar Booking Tracking | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| AN-004 | Add Form Submission Tracking | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| AN-005 | Create EventTypes Constant & Schema Docs | 🟠 | 🟢 S | 🌐 Web | 📋 Todo |
| AN-006 | Add Outbound Link Tracking | 🟠 | 🟢 S | 🌐 Web | 📋 Todo |
| AN-007 | Verify Events in Umami Dashboard | 🟠 | 🟢 S | 🌐 Web | 📋 Todo |
| AN-008 | Add Blog Post View & Engagement Tracking | 🟡 | 🟡 M | 🌐 Web | 📋 Todo |
| AN-009 | Improve Session Persistence | 🟡 | 🟡 M | 🌐 Web | 📋 Todo |

**Totale**: 9 stories (7 Small, 2 Medium)

**Links**: [Epic](./epics/11-analytics-implementation/epic.md) | [Stories](./epics/11-analytics-implementation/stories/)

---

## EPIC-013: Build Performance & Dependency Optimization

**Priorità**: 🟠 Alta | **Stima**: S (2-3 giorni) | **Ambiente**: 🌐 Web

### Obiettivo
Ottimizzare build pipeline per 20-30% faster builds, eliminare vulnerabilità di sicurezza, consolidare testing frameworks.

### User Stories
| ID | Titolo | Priorità | Dimensione | Ambiente | Stato |
|----|--------|----------|------------|----------|-------|
| BO-001 | Move 12 packages to devDependencies | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| BO-002 | Fix npm security vulnerabilities | 🔴 | 🟢 S | 🌐 Web | 📋 Todo |
| BO-003 | Remove Jest, consolidate on Vitest | 🟠 | 🟡 M | 🌐 Web | 📋 Todo |
| BO-004 | Add hash-based caching to design system | 🟠 | 🟡 M | 🌐 Web | 📋 Todo |
| BO-005 | Add AVIF, webpack cache, Vercel buildCache | 🟠 | 🟢 S | 🌐 Web | 📋 Todo |
| BO-006 | Remove downlevelIteration, optimize tsconfig | 🟡 | 🟢 S | 🌐 Web | 📋 Todo |
| BO-007 | Increase Jest workers, parallel builds | 🟡 | 🟢 S | 🌐 Web | 📋 Todo |

**Totale**: 7 stories (5 Small, 2 Medium)

**Links**: [Epic](./epics/13-build-optimization/epic.md) | [Stories](./epics/13-build-optimization/stories/)

---

## Statistiche Backlog

### Per Priorità
- 🔴 Critica: 22 stories (+8)
- 🟠 Alta: 24 stories (+6)
- 🟡 Media: 18 stories (+4)
- 🟢 Bassa: 5 stories

### Per Dimensione
- 🟢 Small (2-4h): 40 stories (+16)
- 🟡 Medium (1-2 giorni): 25 stories (+4)
- 🔴 Large (3-5 giorni): 6 stories

### Per Ambiente
- 🌐 Claude Code Web: 56 stories (+23)
- 💻 Claude Code Locale: 17 stories
- 🔄 Entrambi: 1 story

**Totale**: 13 epiche, 74 user stories (+23)

---

## Ordine Consigliato di Esecuzione

### Phase 0: 🚨 PRODUCTION BLOCKERS (Settimana 1) - DA COMPLETARE PRIMA DEL DEPLOYMENT
1. **EPIC-007** Security Vulnerabilities (🔴 CRITICO - blocca produzione)
   - Week 1 (P0 - Critical): SV-001, SV-002, SV-003, SV-004, SV-005
   - **Target**: 0 vulnerabilità critiche prima del go-live
   - **⚠️ CRITICAL**: Firestore rules scadono il 6 dicembre 2025!

2. **EPIC-013** Build Optimization - P0 Stories (parallelo a EPIC-007)
   - Week 1: BO-001 (15min), BO-002 (10min) - Fix security vulnerabilities in npm
   - **Target**: 0 vulnerabilità npm, build più veloce

### Phase 1: Foundations & Quick Wins (Settimana 2)
3. **EPIC-008** Performance Optimization - Quick Wins (🔴 ALTA priorità)
   - Week 2: PF-001 (font loading), PF-004 (deduplication), PF-008 (Next.js config)
   - **Target**: +15-20 punti Lighthouse in 1 giorno

4. **EPIC-011** Analytics Implementation - P0 Stories (🔴 ALTA priorità)
   - Week 2: AN-001, AN-002, AN-003, AN-004 (1-2 giorni totali)
   - **Target**: 80% conversion funnel tracked

5. **EPIC-013** Build Optimization - P1 Stories
   - Week 2: BO-003 (Jest removal), BO-004 (design system cache)
   - **Target**: -20-40% CI build time

### Phase 2: Performance & Analytics Completion (Settimana 3)
6. **EPIC-008** Performance Optimization - Medium Priority
   - Week 3: PF-002 (bundle splitting), PF-003 (image optimization)
   - **Target**: +10-15 punti Lighthouse

7. **EPIC-011** Analytics Implementation - P1 Stories
   - Week 3: AN-005 (event schema), AN-006 (outbound tracking), AN-007 (dashboard validation)
   - **Target**: 95% coverage + data quality verified

8. **EPIC-001** Design System (prerequisito per UI consistency)
   - Week 3: DS-001, DS-003 (Web)

### Phase 3: Core Web Vitals & UI Fixes (Settimana 4)
9. **EPIC-008** Performance Optimization - Core Web Vitals
   - Week 4: PF-006, PF-007, PF-005
   - **Target finale**: Lighthouse 90-95+

10. **EPIC-010** Homepage & Footer Fixes
    - Week 4: HF-002, HF-003, HF-004, HF-006 (content accuracy + card borders)
    - **Target**: Homepage visivamente consistente

11. **EPIC-002** Google Calendar
    - Week 4: GC-002, GC-003 (testing & UX improvements)

### Phase 4: SEO Foundations (Settimana 5)
12. **EPIC-009** SEO Optimization - TIER 1 Critical
    - Week 5: SEO-001 (sitemap/robots), SEO-002 (JSON-LD), SEO-003 (hreflang)
    - **Target**: SEO crawlability al 100%

### Phase 5: Content & Copy (Settimane 6-7)
13. **EPIC-009** SEO Optimization - TIER 2 High Impact
    - SEO-004 (blog metadata), SEO-005 (author credibility), SEO-006 (RSS/JSON feeds)

14. **EPIC-003** Copy/Contenuto (con agenti copywriter-hybrid)
    - CC-001, CC-002, CC-006, CC-007

15. **EPIC-006** Blog redesign
    - BL-001, BL-002, BL-003

### Phase 6: Advanced Features (Settimane 8-10)
16. **EPIC-004** Chatbot (complesso, richiede tempo)
17. **EPIC-005** Spotify Player
18. **EPIC-001** Design System - Advanced (DS-002 auto-catalogazione, DS-004, DS-005)
19. **EPIC-009** SEO Optimization - TIER 3 (SEO-007, SEO-008, SEO-009)
20. **BL-004, BL-005** Content generation con AI

---

### 🚨 ROADMAP PRIORITIZZATA (Prima Settimana)

**Giorno 1 (Lunedì)**: CRITICAL Security + Build
- [ ] SV-001 (Fix authentication) - 4h
- [ ] BO-001 (Move dependencies) - 15min
- [ ] BO-002 (Fix npm vulnerabilities) - 10min
- **Impact**: Security compliance, build più veloce

**Giorno 2 (Martedì)**: CRITICAL Security
- [ ] SV-002 (Secrets management) - 3h
- [ ] SV-003 (Fix CORS) - 1h
- [ ] SV-004 (XSS protection) - 3h
- **Impact**: Protezione dati utente

**Giorno 3 (Mercoledì)**: Security + Performance Quick Wins
- [ ] SV-005 (CSP) - 3h
- [ ] PF-001 (Font loading) - 2h
- [ ] PF-004 (Component dedup) - 1h
- **Impact**: Security completa, +10 punti Lighthouse

**Giorno 4 (Giovedì)**: Analytics P0
- [ ] AN-001 (CTA tracking) - 2h
- [ ] AN-002 (Chat tracking) - 1h
- [ ] AN-003 (Calendar tracking) - 1h
- [ ] AN-004 (Form tracking) - 1h
- **Impact**: 80% conversion funnel tracked

**Giorno 5 (Venerdì)**: Performance + Analytics Completion
- [ ] PF-008 (Next.js config) - 1h
- [ ] AN-005 (Event schema) - 2h
- [ ] AN-007 (Dashboard validation) - 1h
- [ ] BO-003 (Jest removal) - 2h
- **Impact**: Lighthouse +15-20 pts, analytics 95% coverage

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
