# [EPIC-009] SEO Optimization for Search Engines & LLMs

## Metadata
- **Epic ID**: EPIC-009
- **Priorità**: 🔴 Alta
- **Stato**: 📋 Not Started
- **Execution Environment**: 🌐 Claude Code Web
- **Stima Totale**: L (2-3 settimane)
- **Data Creazione**: 2025-11-15
- **Ultima Modifica**: 2025-11-15

## Contesto e Problema

### Problema Corrente
Il sito ha fondamenta SEO solide (metadata OpenGraph, i18n, performance ottimizzata) ma manca di **ottimizzazioni critiche** per essere completamente scansionabile e indicizzabile da:
1. **Motori di ricerca tradizionali** (Google, Bing, etc.)
2. **Large Language Models** (ChatGPT, Perplexity, Claude, Gemini)

**Gap critici identificati dall'audit**:
- ❌ **Nessun sitemap.xml dinamico** → crawlers non scoprono tutte le pagine
- ❌ **Nessun robots.txt** → manca controllo sulla scansione
- ❌ **Zero structured data (JSON-LD)** → nessun rich snippet, nessuna entity recognition per LLM
- ⚠️ **hreflang incompleto** → versioni linguistiche non collegate correttamente
- ⚠️ **Metadata blog incomplete** → mancano tag, modifiedTime, featured images
- ⚠️ **Nessun feed RSS/JSON** → content non accessible per AI crawlers
- ⚠️ **Nessuna Author credibility** → manca markup per expertise e credentials

### Impatto
- **Utenti**: Difficoltà a trovare il sito su Google, meno traffico organico, missed opportunities per lead generation
- **Business**: Brand invisibile su ricerche chiave ("Product Manager Brescia", "Full-stack PM"), zero rich snippets, nessun knowledge graph
- **LLM/AI**: Impossibilità per ChatGPT/Perplexity di citare il portfolio come fonte autorevole, mancano credibility signals
- **Tecnico**: SEO non scalabile, ogni nuova pagina/articolo richiede controlli manuali

## Obiettivo

### Risultato Atteso
Un sistema SEO **completamente automatizzato e scalabile** dove:
- Ogni nuova pagina/blog post viene automaticamente inclusa nel sitemap
- Structured data (JSON-LD) viene generato automaticamente per ogni tipo di contenuto
- LLM possono facilmente estrarre entities, credentials, e contenuto in formato machine-readable
- Metriche SEO vengono monitorate automaticamente (Core Web Vitals, Lighthouse CI)
- **Zero controlli manuali** richiesti per validare SEO di nuovi contenuti

### Metriche di Successo
- [ ] **100% coverage**: Sitemap include tutte le pagine (main, blog, locales)
- [ ] **Rich snippets**: Google mostra Person/Article rich snippets nelle SERP
- [ ] **LLM citation**: Perplexity/ChatGPT citano il portfolio come fonte quando interrogati su "Mattia De Luca PM"
- [ ] **Lighthouse CI**: Score SEO 100/100 automatico su ogni PR
- [ ] **hreflang validation**: GSC non mostra errori hreflang
- [ ] **Feed accessibility**: LLM possono consumare `/api/feed.json` per content ingestion

## User Stories

### TIER 1: Critical (Blockers per indicizzazione)
- [ ] [SEO-001] Implementare robots.txt e sitemap.xml dinamico (Dimensione: M) - [Link](./stories/SEO-001-robots-sitemap.md)
- [ ] [SEO-002] Implementare JSON-LD Schema (Person, Article, WebSite) (Dimensione: L) - [Link](./stories/SEO-002-json-ld-schemas.md)
- [ ] [SEO-003] Fix hreflang e canonical URLs per i18n (Dimensione: S) - [Link](./stories/SEO-003-hreflang-fix.md)

### TIER 2: High Impact (Visibility e credibility)
- [ ] [SEO-004] Enhanceare metadata blog (tags, modifiedTime, featured images) (Dimensione: M) - [Link](./stories/SEO-004-blog-metadata-enhancement.md)
- [ ] [SEO-005] Implementare Author credibility schema e /about page (Dimensione: M) - [Link](./stories/SEO-005-author-credibility.md)
- [ ] [SEO-006] Implementare RSS/JSON feed per LLM ingestion (Dimensione: S) - [Link](./stories/SEO-006-rss-json-feed.md)

### TIER 3: Optimization (Nice-to-have)
- [ ] [SEO-007] Enhanceare Blog API con endpoint per slug singoli (Dimensione: S) - [Link](./stories/SEO-007-blog-api-enhancement.md)
- [ ] [SEO-008] Ottimizzare Image SEO (alt validation, lazy loading consistency) (Dimensione: S) - [Link](./stories/SEO-008-image-seo.md)
- [ ] [SEO-009] Setup Lighthouse CI e Web Vitals monitoring (Dimensione: M) - [Link](./stories/SEO-009-lighthouse-ci.md)

## Dipendenze

### Dipendenze Tecniche
- Next.js 14 App Router: Per generazione dinamica sitemap/robots
- TypeScript: Type-safe schema generation
- Zod: Validation automatica frontmatter
- MDX: Blog content extraction

### Dipendenze da Altre Epiche
- **EPIC-006 (Blog Redesign)**: SEO-004 beneficia da content strutturato
- Nessun blocker: tutte le stories sono implementabili indipendentemente

## Vincoli e Considerazioni

### Vincoli Tecnici
- **Performance**: Generazione sitemap/schema non deve aumentare build time >5%
- **Backward compatibility**: Metadata esistente deve rimanere funzionante
- **Validation**: Schema JSON-LD deve passare Google Rich Results Test
- **i18n**: Tutti gli schema devono supportare dual locale (it/en)

### Vincoli di Business
- **Privacy**: Non esporre informazioni sensibili in structured data
- **Brand consistency**: Schema.org Person deve riflettere tone of voice
- **Maintenance**: Sistema deve essere zero-maintenance dopo implementazione

## Approccio "Global Impact" (Scalabilità)

Ogni story è progettata per avere **impatto globale** e non richiedere controlli manuali:

1. **Componenti riusabili**: `<PersonSchema>`, `<ArticleSchema>`, `<WebSiteSchema>` auto-inject JSON-LD
2. **Hook automatici**: `useMetadata()` hook genera metadata completa per ogni page type
3. **Validation automatica**: Zod schema valida frontmatter all'import, blocca build se incompleto
4. **CI/CD checks**: Lighthouse CI verifica SEO score su ogni PR, blocca merge se <95
5. **Template enforcement**: Template MDX per nuovi blog posts include tutti i campi SEO richiesti

## Note e Risorse

### Audit Report
Audit completo effettuato il 2025-11-15 ha identificato:
- ✅ **Strengths**: Metadata base, i18n, performance, font optimization
- ❌ **Critical gaps**: Sitemap, robots.txt, structured data
- ⚠️ **Improvement areas**: Blog metadata, author credibility, feeds

### Riferimenti Esterni
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Schema.org Person](https://schema.org/Person)
- [Schema.org Article](https://schema.org/Article)
- [Next.js App Router Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [LLM-Friendly SEO Best Practices](https://www.searchenginejournal.com/ai-seo-guide/)

### File Chiave da Modificare
```
/app/layout.tsx                              # Add metadataBase
/app/robots.ts                               # NEW - Dynamic robots.txt
/app/sitemap.ts                              # NEW - Dynamic sitemap
/components/structured-data/PersonSchema.tsx # NEW - Person JSON-LD
/components/structured-data/ArticleSchema.tsx# NEW - Article JSON-LD
/lib/blog/mdx.ts                             # Enhance frontmatter
/lib/hooks/useMetadata.ts                    # NEW - Global metadata hook
```

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Epica creata da audit SEO completo |
| 2025-11-15 | Claude Code | Rinumerata da EPIC-007 a EPIC-009 per allineamento con master |
