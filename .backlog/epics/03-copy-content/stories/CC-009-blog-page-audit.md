# [CC-009] Audit Tone of Voice Pagina Blog

## Metadata
- **Story ID**: CC-009 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1 giorno)
- **Execution Environment**: 💻 **Claude Code Locale** (richiede copywriter-hybrid)
- **Stato**: 📋 Todo | **Data**: 2025-11-16

## User Story
**Come** lettore **Voglio** che la pagina blog listing abbia un tone of voice coerente con l'homepage **Così che** l'esperienza sia uniforme e autentica

## Contesto
La pagina `/blog` è il listing di tutti gli articoli. Contiene:
- Hero section con gradient background
- Badge, title, description
- Search bar e filtri
- Cards degli articoli con preview

Il tone deve essere:
- Diretto e pragmatico (Romei)
- Conversazionale e accessibile (Toon)
- Purpose-driven (Sinek)
- Con un pizzico di ironia

## Criteri di Accettazione
- [ ] **AC1**: Agent copywriter-hybrid analizza tutti i testi della pagina blog
- [ ] **AC2**: Hero section allineato al tone of voice
- [ ] **AC3**: Meta description SEO-friendly ma autentica
- [ ] **AC4**: Placeholder search e filtri sono chiari e non corporate
- [ ] **AC5**: Empty states hanno personalità

## Contenuti da Analizzare

### Meta Tags
Attuale (IT):
```
title: "Lezioni dal campo - Mattia Filippo De Luca"
description: "12 anni. 8 settori, 50+ implementazioni. Cosa ho imparato costruendo prodotti, guidando team, e sopravvivendo a meeting infiniti."
```

Attuale (EN):
```
title: "Lessons from the Trenches - Mattia Filippo De Luca"
description: "12 years. 8 sectors, 50+ implementations. What I learned building products, leading teams, and surviving endless meetings."
```

### Hero Section
- Badge
- Title
- Description
- CTA (se presente)

### Filters & Search
- Search placeholder
- Category labels
- Tags
- Sort options

### Empty States
- No results found
- No posts in category
- Loading states

## Implementazione

### Step 1: Audit con copywriter-hybrid
```bash
@copywriter-hybrid

Analizza il tone of voice della pagina blog listing.

Contenuti da verificare:
1. Meta title e description (SEO + Brand)
2. Hero section (badge, title, description)
3. Filtri e search (placeholder, labels)
4. Empty states

Per ognuno verifica:
- È diretto e concreto? O generico?
- È conversazionale? O corporate?
- Parte dal "perché"? O va dritto alle feature?
- Ha un pizzico di ironia? O è troppo serio?

Tone Target:
- Romei (70%): Pragmatico, diretto, no fluff
- Toon (20%): Conversazionale, metafore quotidiane
- Sinek (10%): Purpose-driven, "perché" prima del "cosa"

Output:
✅ MANTIENI
⚠️ MIGLIORA
💡 SUGGERIMENTI (con esempi)
```

### Step 2: Applicare Modifiche
- Aggiornare meta tags in `/app/[locale]/blog/page.tsx`
- Aggiornare contenuti in `/messages/it.json` e `/messages/en.json`
- Aggiornare componente `BlogListingClient.tsx` se necessario

## Files
- `/app/[locale]/blog/page.tsx`
- `/app/[locale]/blog/BlogListingClient.tsx`
- `/messages/it.json` (sezione `blog`)
- `/messages/en.json` (sezione `blog`)

## Definition of Done
- [ ] Agent eseguito e report generato
- [ ] Meta tags ottimizzati (IT e EN)
- [ ] Hero section allineato al tone
- [ ] Filtri e search con copy chiaro
- [ ] Empty states con personalità
- [ ] Modifiche implementate
- [ ] Test manuale navigazione blog
- [ ] Verifica SEO meta tags

## Note
La pagina blog è l'entry point per il content marketing. Il tone deve essere immediatamente riconoscibile e coerente con l'homepage.
