# QA Fix Request

Status: REJECTED

## Feedback

## Riorganizza output dell'audit

### 1. Crea struttura cartelle
Crea la cartella `output/` nella directory della spec e organizza tutti i file di output:
```
output/
├── AUDIT-REPORT.md           # Report principale (rinomina se necessario)
├── INTERVENTIONS.md          # DA CREARE - vedi formato sotto
├── findings/                 # Analisi dettagliate (se presenti)
└── assets/                   # Moodboard, mockup, riferimenti
```

### 2. Sposta i file esistenti
- Tutti i file `.md` di output (report, analisi, calendari, strategy) → `output/`
- Mantieni nella root solo i file standard di Auto Claude: `spec.md`, `requirements.json`, `implementation_plan.json`, `context.json`, `task_metadata.json`, `task_logs.json`, `review_state.json`, `build-progress.txt`, `qa_report.md`, `complexity_assessment.json`, `project_index.json`, `research.json`
- La cartella `memory/` resta dov'è

### 3. Crea INTERVENTIONS.md
Estrai dal report principale tutte le azioni/interventi prioritari e crea `output/INTERVENTIONS.md` con questo formato ESATTO:
```markdown
# Interventions from [Nome Audit]

**Source Audit:** [ID-task]
**Audit Date:** [data]
**Total Interventions:** [numero]

---

## Intervention 1: [Titolo chiaro e actionable]

| Field | Value |
|-------|-------|
| **Priority** | Quick Win / Strategic / Transformational |
| **Effort** | [X ore/giorni] |
| **Impact** | [descrizione impatto] |
| **Category** | accessibility / layout / ux / performance / content / visual / seo / social |

### Description
[Descrizione dettagliata di cosa fare e perché]

### Files to Modify
- `path/to/file.ext` - [cosa modificare]
- `path/to/another.ext` - [cosa modificare]

### Acceptance Criteria
- [ ] [Criterio verificabile 1]
- [ ] [Criterio verificabile 2]
- [ ] [Criterio verificabile 3]

### Definition of Done
- [ ] Modifiche implementate
- [ ] Test passano (se applicabile)
- [ ] Nessuna regressione visiva
- [ ] Documentazione aggiornata (se necessario)

---

## Intervention 2: [Titolo]
[ripeti struttura...]
```

### 4. Verifica finale
- Ogni intervento deve essere una task autonoma e lavorabile
- I criteri di accettazione devono essere verificabili oggettivamente
- Se l'audit non ha interventi espliciti, estraili dalle raccomandazioni/priority improvements

Non modificare il contenuto sostanziale, solo riorganizza e formatta.

Created at: 2026-01-27T09:30:13.041Z
