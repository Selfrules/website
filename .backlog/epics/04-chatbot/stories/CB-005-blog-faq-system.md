# [CB-005] Sistema Controllo Articoli Blog e FAQ

## Metadata
- **Story ID**: CB-005 | **Epic**: [EPIC-004](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 💻 **Claude Code Locale**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** chatbot **Voglio** verificare se una domanda è già stata risposta nel blog **Così che** possa linkare l'articolo invece di ripetere

## Criteri di Accettazione
- [ ] **AC1**: Quando riceve domanda, controlla se esiste articolo blog rilevante
- [ ] **AC2**: Se esiste, fornisce link all'articolo con summary
- [ ] **AC3**: Se non esiste, risponde normalmente (con RAG)
- [ ] **AC4**: Traccia domande frequenti senza risposta (per futuri articoli)

## Conversational Example

```
User: "Come si fa una buona roadmap di prodotto?"

Bot: "Ho scritto proprio su questo! 🎯

Nell'articolo 'Roadmap che funzionano: 3 principi' spiego:
- Perché la maggior parte delle roadmap fallisce
- I 3 principi per roadmap efficaci
- Esempio pratico da Flowing

Leggi qui: [link]/blog/roadmap-efficaci

Hai domande specifiche dopo averlo letto?"
```

## Implementazione

### 1. Check Blog Articles
```typescript
// lib/chatbot/check-blog.ts
export async function findRelevantArticle(query: string) {
  // Use RAG/vector search su articoli blog
  const articles = await vectorStore.similaritySearch(query, 1, {
    filter: { type: 'blog_post' }
  });

  if (articles[0].score > 0.8) { // High relevance
    return articles[0];
  }
  return null;
}
```

### 2. Response Pattern
```typescript
if (relevantArticle) {
  return formatBlogResponse(relevantArticle);
} else {
  return generateNormalResponse(query, context);
}

function formatBlogResponse(article) {
  return `Ho scritto proprio su questo!

${article.title}
${article.summary}

Leggi qui: ${article.url}

Hai domande specifiche?`;
}
```

### 3. Track Unanswered Questions
```typescript
// Database: unanswered questions for blog ideas
model UnansweredQuestion {
  id        String   @id
  question  String
  count     Int      @default(1)
  createdAt DateTime @default(now())
}
```

## Test Plan
```typescript
test('finds relevant blog article', async () => {
  const article = await findRelevantArticle('product roadmap');
  expect(article).toBeDefined();
  expect(article.title).toContain('roadmap');
});

test('returns normal response when no article', async () => {
  const response = await chatbot('domanda molto specifica senza articolo');
  expect(response).not.toContain('Ho scritto');
});

test('tracks unanswered questions', async () => {
  await chatbot('domanda senza risposta');
  const tracked = await db.unansweredQuestion.findFirst({
    where: { question: { contains: 'domanda senza risposta' } }
  });
  expect(tracked).toBeDefined();
});
```

## Dipendenze
- [ ] CB-002 (RAG system con blog indexing)
- [ ] EPIC-006 (Blog content disponibile)

## Definition of Done
- [ ] Chatbot controlla articoli blog
- [ ] Link articoli quando rilevanti
- [ ] Response pattern naturale
- [ ] Tracking domande senza risposta
- [ ] Test passano
- [ ] Integration con RAG system
