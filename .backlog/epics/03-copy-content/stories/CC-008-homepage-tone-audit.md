# [CC-008] Audit Completo Tone of Voice Homepage

## Metadata
- **Story ID**: CC-008 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🔴 Altissima | **Dimensione**: 🔴 L (2-3 giorni)
- **Execution Environment**: 💻 **Claude Code Locale** (richiede copywriter-hybrid)
- **Stato**: 📋 Todo | **Data**: 2025-11-16

## User Story
**Come** content manager **Voglio** un audit completo del tone of voice su tutte le sezioni homepage **Così che** il messaggio sia coerente, autentico e rispetti la brand identity

## Contesto
L'homepage è composta da 6 sezioni principali. Ogni sezione ha:
- Badge
- Headline/Titoli
- Sottotitoli e paragrafi
- CTAs
- Contenuti specifici (testimonials, metriche, ecc.)

Tutto il contenuto deve rispettare:
- **Romei's pragmatism**: Diretto, no-nonsense
- **Toon's accessibility**: Conversazionale, relatable
- **Sinek's purpose**: Sempre partire dal "perché"
- **Un pizzico di ironia costruttiva**

## Criteri di Accettazione
- [ ] **AC1**: Agent copywriter-hybrid analizza ogni sezione della homepage
- [ ] **AC2**: Identifica contenuti non allineati al tone of voice
- [ ] **AC3**: Suggerisce miglioramenti specifici con esempi
- [ ] **AC4**: Verifica coerenza dello storytelling tra sezioni
- [ ] **AC5**: Valida uso di sentence case, no marketing fluff
- [ ] **AC6**: Controlla che badge, headline, CTAs siano autentici e diretti

## Sezioni Homepage da Analizzare

### 1. Hero Section
Elementi:
- Badge: "UX • DEV • PM"
- Headline principale (5 righe)
- Subtitle con highlight
- 2 CTAs: primaria e secondaria

### 2. Journey Section
Elementi:
- Badge: "Il percorso" / "The journey"
- Headline con highlight
- Subtitle introduttivo
- 4 Experience cards (Selfrules, Flowing, ActiveProspect, QubicaAMF)
- Ogni card ha: date, role, company, description, achievements, skills, certifications
- End message

### 3. WhatImUpTo Section
Elementi:
- Badge: "Cosa sto facendo ora"
- Title e description
- CurrentWork subsection (QubicaAMF)
- Learning subsection (AI workflow)
- Spotify widget title

### 4. WorkTogether Section
Elementi:
- Badge: "Lavoriamo insieme"
- Title con highlight
- Subtitle (2 parti)
- 3 modalità di lavoro (consulting, brainstorming, mentorship)
- Ogni modalità ha: badge, title, description, 3 features
- 4 Testimonials
- CTA finale

### 5. BlogNew Section
Elementi:
- Badge, title, subtitle
- CTA di navigazione
- Preview cards degli articoli

### 6. AskMeAnything Section
Elementi:
- Badge e title
- Description e CTA

## Implementazione

### Step 1: Preparazione Contenuto
```bash
# Estrarre tutti i contenuti da:
- /messages/it.json (italiano)
- /messages/en.json (inglese)
- Tutte le sezioni homepage in /components/sections/
```

### Step 2: Audit con copywriter-hybrid
```bash
# Invocare agent con prompt strutturato:
@copywriter-hybrid

Fai un audit completo del tone of voice della homepage.

Analizza ogni sezione (Hero, Journey, WhatImUpTo, WorkTogether, Blog, AskMeAnything) e per ognuna:

1. **Verifica Badge**: Sono diretti? Autentici? O suonano come buzzword?
2. **Verifica Headlines**: Catturano l'attenzione con il "perché"? O sono generiche?
3. **Verifica Paragraphs**: Sono conversazionali? O formali/corporate?
4. **Verifica CTAs**: Sono chiare e specifiche? O vaghe?
5. **Verifica Storytelling**: C'è una narrazione coerente? O salti logici?

Tone of Voice Target:
- Romei's pragmatism (diretto, no-nonsense)
- Toon's accessibility (conversazionale, relatable, metafore quotidiane)
- Sinek's purpose (sempre partire dal "perché")
- Un pizzico di ironia costruttiva

Output per ogni sezione:
✅ MANTIENI: Cosa funziona e perché
⚠️ MIGLIORA: Cosa suona off-brand e perché
💡 SUGGERIMENTI: Riscritture proposte con esempi concreti
```

### Step 3: Report e Prioritizzazione
Agent genera report strutturato con:
- Scorecard per sezione (1-10)
- Lista prioritizzata di miglioramenti
- Esempi concreti di riscritture

### Step 4: Applicazione Modifiche
- Implementare suggerimenti approvati
- Aggiornare file di traduzione IT/EN
- Verificare rendering su homepage

## Files
- `/messages/it.json`
- `/messages/en.json`
- `/components/sections/Hero.tsx`
- `/components/sections/Journey.tsx`
- `/components/sections/WhatImUpTo.tsx`
- `/components/sections/WorkTogether.tsx`
- `/components/sections/BlogNew.tsx`
- `/components/sections/AskMeAnything.tsx`

## Definition of Done
- [ ] Agent copywriter-hybrid eseguito e report generato
- [ ] Report analizza tutte e 6 le sezioni homepage
- [ ] Scorecard tone of voice per ogni sezione
- [ ] Lista prioritizzata di miglioramenti con esempi
- [ ] Suggerimenti validati e approvati
- [ ] Modifiche implementate in IT e EN
- [ ] Test manuale lettura homepage completa
- [ ] Storytelling coerente dalla Hero al Footer

## Note
Questo è l'audit più importante dell'epica. Definisce la baseline di quality per tutto il contenuto del sito.
