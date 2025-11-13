# [BL-005] Sistema AI-Assisted Content Creation

## Metadata
- **Story ID**: BL-005 | **Epic**: [EPIC-006](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🔴 L (3-5 giorni)
- **Execution Environment**: 💻 **Claude Code Locale** (agenti)
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** content creator **Voglio** supporto AI per scrivere articoli **Così che** possa pubblicare contenuti di qualità più velocemente

## Criteri di Accettazione
- [ ] **AC1**: Workflow: argomento → outline → bozza → refinement → publish
- [ ] **AC2**: copywriter-hybrid genera outline e prima bozza
- [ ] **AC3**: hormozi-conversion-optimizer ottimizza per conversion
- [ ] **AC4**: Tone of voice sempre coerente con Mattia
- [ ] **AC5**: Output in formato MDX pronto per pubblicazione
- [ ] **AC6**: Inclusione CTA naturali e non invasive

## Workflow di Content Creation

### Step 1: Selezione Argomento
```bash
# Input: argomento dal pool (BL-004)
TOPIC="Da 7 click a 3: anatomia di un checkout semplificato"
BUCKET="Prodotto"
TARGET_AUDIENCE="PM, Product Designer"
```

### Step 2: Generazione Outline
```bash
# Lanciare copywriter-hybrid
Prompt: "Crea outline dettagliato per articolo su: ${TOPIC}

Context:
- Basato su esperienza reale Flowing
- Risultato: +12% velocità checkout
- Target: ${TARGET_AUDIENCE}
- Tone: pragmatico, accessibile, purpose-driven

Outline deve includere:
1. Hook/Intro (parte dal problema)
2. 3-4 sezioni principali
3. Esempi concreti, no genericità
4. Takeaway pratici
5. CTA naturale

Output format: Markdown con H2/H3"
```

**Expected Output**:
```markdown
# Da 7 click a 3: anatomia di un checkout semplificato

## Il problema: quando ogni click è un'opportunità di abbandono
[Intro che parte dal pain point]

## Anatomia di un checkout complesso
[Analisi del problema con esempio reale]

## I 3 principi della semplificazione
[Framework applicabile]

### 1. Elimina, non nascondere
### 2. Raggruppa per mental model
### 3. Feedback immediato

## Il caso Flowing: da 7 a 3 click
[Case study dettagliato]

## Come applicarlo al tuo prodotto
[Takeaway pratici]

## Vuoi semplificare il tuo checkout?
[CTA naturale]
```

### Step 3: Generazione Bozza
```bash
# copywriter-hybrid espande outline
Prompt: "Scrivi articolo completo basato su outline.

Regole:
- Paragrafi 3-4 righe max
- Esempi concreti, no astrazioni
- Metafore quotidiane quando utili
- Tone: conversazionale ma professionale
- 1500-2000 parole
- Include aneddoti dal progetto Flowing

Output: MDX con frontmatter"
```

### Step 4: Optimization per Conversion
```bash
# hormozi-conversion-optimizer
Prompt: "Analizza articolo e suggerisci:
1. Dove inserire CTA (senza essere invasivi)
2. Come rafforzare value proposition
3. Objection handling da includere
4. Lead magnet ideas correlati

Mantieni autenticità e tone of voice."
```

### Step 5: Refinement e Review
- Review manuale per accuracy tecnica
- Aggiungere immagini/screenshot se necessario
- Verificare SEO (meta description, keywords)
- Test leggibilità

## Template Script
```typescript
// scripts/create-article.ts
import { copywriterHybrid, hormoziOptimizer } from './agents';

async function createArticle(topic: string) {
  // 1. Generate outline
  const outline = await copywriterHybrid.generateOutline({
    topic,
    context: mattiaContext,
    targetAudience: topic.targetAudience,
  });

  console.log('Outline generato. Review? (y/n)');
  await waitForConfirmation();

  // 2. Generate draft
  const draft = await copywriterHybrid.expandOutline(outline);

  // 3. Optimize for conversion
  const optimized = await hormoziOptimizer.optimize(draft);

  // 4. Create MDX file
  const mdx = formatAsMDX({
    frontmatter: {
      title: topic.title,
      excerpt: generateExcerpt(optimized),
      tags: [topic.bucket],
      publishedAt: new Date().toISOString(),
    },
    content: optimized,
  });

  // 5. Save file
  await writeFile(`/content/blog/${slugify(topic.title)}.mdx`, mdx);

  console.log('Articolo creato! Review manuale richiesta.');
}
```

## Output MDX Format
```mdx
---
title: "Da 7 click a 3: anatomia di un checkout semplificato"
excerpt: "Come abbiamo velocizzato i pagamenti del 12% eliminando friction inutile. Niente teoria, solo decisioni pratiche."
tags: ["Prodotto", "UX", "Case Study"]
coverImage: "/images/blog/checkout-semplificato.jpg"
publishedAt: "2025-11-15"
readingTime: 8
---

## Il problema: quando ogni click è un'opportunità di abbandono

[Content...]

<Callout type="tip">
**Takeaway**: Prima di aggiungere un campo, chiediti: è davvero necessario adesso?
</Callout>

[More content...]

## Vuoi semplificare il tuo prodotto?

Se hai un checkout (o qualsiasi flow) che senti complicato, possiamo parlarne.
A volte basta uno sguardo esterno per trovare le friction nascoste.

[Prenota una call](link)
```

## Definition of Done
- [ ] Workflow documentato e testato
- [ ] Script `create-article.ts` funzionante
- [ ] copywriter-hybrid genera outline di qualità
- [ ] copywriter-hybrid espande in bozza completa
- [ ] hormozi-conversion-optimizer ottimizza per conversion
- [ ] Output MDX formattato correttamente
- [ ] Tone of voice sempre coerente
- [ ] Almeno 3 articoli test creati e pubblicati
- [ ] Documentation per processo

## Dipendenze
- [ ] BL-004 (pool argomenti)
- [ ] BL-003 (template articolo per test)
- [ ] Agenti: copywriter-hybrid, hormozi-conversion-optimizer

## Note
Questo sistema NON sostituisce review e editing manuale. L'AI genera bozze di alta qualità che richiedono comunque:
- Verifica accuracy tecnica
- Aggiunta dettagli personali/aneddoti
- Aggiunta immagini
- Final polish
