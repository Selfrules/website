# Backlog System - Documentation

Sistema di backlog strutturato per Claude Code con epiche e user stories dettagliate.

**Versione**: 1.0
**Data Creazione**: 2025-11-13
**Maintainer**: Claude Code + Mattia Cintura

---

## Indice

1. [Introduzione](#introduzione)
2. [Struttura del Backlog](#struttura-del-backlog)
3. [Come Usare il Backlog](#come-usare-il-backlog)
4. [Anatomia di una Epic](#anatomia-di-una-epic)
5. [Anatomia di una User Story](#anatomia-di-una-user-story)
6. [Execution Environments](#execution-environments)
7. [Workflow](#workflow)
8. [Best Practices](#best-practices)
9. [FAQ](#faq)

---

## Introduzione

### Cos'è questo Backlog System?

Questo è un sistema di gestione del lavoro strutturato specificamente per essere interpretato ed eseguito da Claude Code (sia versione Web che Locale).

### Perché esiste?

**Problema**: Quando chiedi a Claude Code di sviluppare funzionalità, le linee guida possono essere inconsistenti o mancanti, causando implementazioni non ottimali.

**Soluzione**: Un backlog strutturato dove ogni attività è documentata come:
- **Epic**: Obiettivo macro (es. "Consolidare Design System")
- **User Story**: Task specifico con criteri di accettazione, test plan, linee guida tecniche, e definition of done

### Benefici

✅ **Coerenza**: Ogni story ha linee guida chiare
✅ **Tracciabilità**: Sai cosa è fatto, cosa manca
✅ **Efficienza**: Claude Code sa esattamente cosa fare
✅ **Qualità**: Ogni story include test plan e acceptance criteria
✅ **Chiarezza**: Distinzione tra task Web vs Locale (agenti)

---

## Struttura del Backlog

```
.backlog/
├── README.md                    # Questo file
├── backlog.md                   # Master backlog con overview di tutte le epiche
├── templates/
│   ├── epic-template.md         # Template per nuove epiche
│   └── user-story-template.md   # Template per nuove user stories
└── epics/
    ├── 01-design-system/
    │   ├── epic.md              # Descrizione epica
    │   └── stories/
    │       ├── DS-001-consolidate-design-tokens.md
    │       ├── DS-002-auto-catalog-components.md
    │       ├── DS-003-update-claude-guidelines.md
    │       ├── DS-004-interactive-documentation.md
    │       └── DS-005-audit-refactor-components.md
    ├── 02-google-calendar/
    ├── 03-copy-content/
    ├── 04-chatbot/
    ├── 05-spotify-player/
    └── 06-blog/
```

### Convenzioni di Naming

- **Epic**: `EPIC-XXX` (es. EPIC-001, EPIC-002)
- **Story ID**: `[EPIC-PREFIX]-XXX` (es. DS-001, GC-001, CB-001)
- **File Epic**: `epic.md`
- **File Story**: `[STORY-ID]-[kebab-case-title].md`

---

## Come Usare il Backlog

### Per Claude Code

#### 1. Quando ricevi un task dall'utente

```
User: "Voglio sistemare il design system"
```

**Cosa fare**:
1. Leggi `.backlog/backlog.md` per trovare l'epica correlata
2. Trova: **EPIC-001 - Design System Consolidation**
3. Leggi `epic.md` per contesto
4. Scegli la story appropriata (es. DS-001 per design tokens)
5. Segui la story step-by-step

#### 2. Quando lavori su una story

```markdown
# Struttura di esecuzione
1. Leggere Metadata e User Story
2. Verificare Criteri di Accettazione
3. Leggere Test Plan e creare test (TDD)
4. Seguire "Implementazione Guidata"
5. Eseguire test
6. Verificare "Definition of Done"
7. Marcare story come completata
```

#### 3. Quando completi una story

- Aggiornare stato in `.backlog/epics/XX-epic-name/epic.md`
- Aggiornare data completamento nella story
- Aggiornare `.backlog/backlog.md` (tabella master)

### Per Developers/Product Owners

#### Creare una Nuova Epic

1. Copiare `.backlog/templates/epic-template.md`
2. Salvare in `.backlog/epics/XX-new-epic/epic.md`
3. Compilare tutte le sezioni
4. Aggiungere alla lista in `.backlog/backlog.md`

#### Creare una Nuova User Story

1. Copiare `.backlog/templates/user-story-template.md`
2. Salvare in `.backlog/epics/XX-epic/stories/STORY-ID-title.md`
3. Compilare tutte le sezioni
4. Linkare dalla epic.md

---

## Anatomia di una Epic

### Sezioni Principali

#### 1. Metadata
```markdown
- Epic ID: EPIC-XXX
- Priorità: Alta/Media/Bassa
- Stato: Not Started / In Progress / Completed
- Execution Environment: Web / Locale / Entrambi
- Stima Totale: XS/S/M/L/XL
```

#### 2. Contesto e Problema
Descrizione del problema che l'epica risolve.

#### 3. Obiettivo
Cosa vogliamo ottenere.

#### 4. User Stories
Lista di tutte le stories dell'epica.

#### 5. Dipendenze
Tecnologie, API, altre epiche richieste.

---

## Anatomia di una User Story

### Sezioni Principali

#### 1. Metadata
```markdown
- Story ID
- Epic reference
- Priorità (🔴/🟠/🟡/🟢)
- Dimensione (🟢 S / 🟡 M / 🔴 L)
- Execution Environment (🌐/💻/🔄)
- Stato (📋/🔄/✅/⏸️/❌)
```

#### 2. User Story
```
Come [tipo utente]
Voglio [funzionalità]
Così che [beneficio]
```

#### 3. Criteri di Accettazione
```markdown
- [ ] AC1: Condizione 1
- [ ] AC2: Condizione 2
```

#### 4. Test Plan
- Test da creare PRE-sviluppo (TDD)
- Test unitari, integration, E2E
- Checklist testing

#### 5. Linee Guida Tecniche
- Design System da usare
- Pattern architetturali
- API endpoints
- Performance targets
- Security checklist

#### 6. Implementazione Guidata
Step-by-step guide:
1. Preparazione
2. Sviluppo
3. Review
4. Testing
5. Deployment

#### 7. Definition of Done
Checklist finale per considerare story completata.

---

## Execution Environments

### 🌐 Claude Code Web
**Dove**: claude.ai/code
**Cosa può fare**:
- Lettura/scrittura file
- Esecuzione comandi bash standard
- Sviluppo UI/componenti
- Test automation

**Cosa NON può fare**:
- Usare agenti (copywriter-hybrid, hormozi-optimizer, etc.)
- Usare MCP tools avanzati

**Esempi di Stories Web**:
- DS-001: Design tokens
- DS-003: Update CLAUDE.md
- GC-001: Fix popup centering
- BL-001: Redesign blog section

### 💻 Claude Code Locale
**Dove**: Desktop app locale
**Cosa può fare**:
- Tutto quello che può fare Web
- **+ Agenti AI** (copywriter-hybrid, hormozi-conversion-optimizer)
- **+ MCP tools** avanzati
- **+ File system operations** più complesse

**Esempi di Stories Locale**:
- DS-002: Auto-catalogazione (richiede automation)
- CC-001: Ottimizzazione CTAs (richiede copywriter-hybrid)
- CB-001: Claude API integration
- CB-002: RAG system
- BL-004: Topic generation (richiede agenti)

### 🔄 Entrambi
Alcune stories richiedono entrambi gli ambienti per parti diverse.

---

## Workflow

### Workflow Tipico per Claude Code

```
1. User Request
   ↓
2. Consulta backlog.md
   ↓
3. Identifica Epic correlata
   ↓
4. Leggi epic.md
   ↓
5. Seleziona Story appropriata
   ↓
6. Leggi story completa
   ↓
7. Verifica Execution Environment
   ├─ Web → Procedi
   └─ Locale → Informa user se sei in Web
   ↓
8. Crea test (TDD)
   ↓
9. Implementa seguendo "Implementazione Guidata"
   ↓
10. Esegui test
   ↓
11. Verifica Definition of Done
   ↓
12. Marca story completata
   ↓
13. Update backlog.md
```

### Workflow per Nuove Features

```
1. Nuova richiesta dall'utente
   ↓
2. Esiste già una story?
   ├─ Sì → Usa quella
   └─ No → Crea nuova story
       ↓
       a. Usa template
       b. Compila tutte le sezioni
       c. Review con user
       d. Aggiungi al backlog
```

---

## Best Practices

### Per Claude Code

#### ✅ DO

- Leggere SEMPRE l'intera story prima di iniziare
- Creare test PRIMA di implementare (TDD)
- Seguire le linee guida tecniche specificate
- Verificare tutti i criteri di accettazione
- Aggiornare stato story quando completi
- Riferire l'utente al backlog quando task è già pianificato

#### ❌ DON'T

- Non iniziare senza leggere story
- Non saltare test plan
- Non ignorare Definition of Done
- Non inventare implementazioni quando ci sono linee guida
- Non marcare completato se manca qualcosa

### Per Developers/PO

#### ✅ DO

- Scrivere criteri di accettazione chiari e testabili
- Includere esempi di codice nelle linee guida
- Specificare execution environment correttamente
- Aggiornare backlog regolarmente
- Decompose large stories in smaller ones

#### ❌ DON'T

- Non scrivere stories vaghe
- Non omettere test plan
- Non dimenticare dipendenze
- Non creare stories troppo grandi (> 5 giorni)

---

## FAQ

### Q: Quando Claude Code deve consultare il backlog?

**A**: Quando:
- User chiede di lavorare su feature pianificate
- User chiede "cosa c'è nel backlog" o "roadmap"
- Stai iniziando una nuova feature e vuoi vedere se è già pianificata

### Q: Come fa Claude Code a sapere se usare Web o Locale?

**A**: Ogni story ha metadata "Execution Environment":
- 🌐 = Web only
- 💻 = Locale only (agenti/MCP)
- 🔄 = Entrambi

Se sei Claude Code Web e la story richiede Locale, informa l'utente.

### Q: Come si aggiungono nuove stories?

**A**:
1. Usa template: `.backlog/templates/user-story-template.md`
2. Compila tutte le sezioni
3. Salva in epic appropriata
4. Aggiorna epic.md e backlog.md

### Q: Cosa fare se una story è bloccata?

**A**:
1. Marca stato come "⏸️ Blocked"
2. Documenta blocker nella sezione "Dipendenze > Blockers"
3. Informa user
4. Passa a story non bloccata

### Q: Come si traccia il progresso?

**A**: 3 livelli:
1. **Story level**: Stato in metadata (Todo/In Progress/Done/Blocked)
2. **Epic level**: Checkbox stories in epic.md
3. **Backlog level**: Tabella master in backlog.md

### Q: Il backlog è versioned?

**A**: Sì, fa parte del repository git. Ogni modifica al backlog può essere committata per tracking storico.

### Q: Posso modificare stories in corso?

**A**: Sì, ma:
- Documenta modifiche in "Storia delle Modifiche"
- Se cambi criteri di accettazione, informa team
- Aggiorna data ultima modifica

---

## Manutenzione

### Review Periodica

**Ogni Sprint/Settimana**:
- [ ] Aggiornare stati stories completate
- [ ] Verificare priorità ancora valide
- [ ] Rimuovere/archiviare stories obsolete
- [ ] Aggiungere nuove stories se necessario

### Metrics da Tracciare

- Stories completate per sprint
- Velocity (story points se usate)
- Blockers ricorrenti
- Stories Web vs Locale

---

## Support

Per domande o problemi con il backlog system:
1. Leggi questa documentazione
2. Consulta template per esempi
3. Apri issue su GitHub (se pubblico)
4. Contatta maintainer

---

**Happy Coding! 🚀**
