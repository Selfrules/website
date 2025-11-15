# [CB-002] Sistema RAG con Conoscenza Professionale

## Metadata
- **Story ID**: CB-002 | **Epic**: [EPIC-004](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🔴 L (3-5 giorni)
- **Execution Environment**: 💻 **Claude Code Locale**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** chatbot **Voglio** accesso a conoscenza su Mattia via RAG **Così che** possa rispondere accuratamente su esperienza, skills, progetti

## Criteri di Accettazione
- [ ] **AC1**: Vector database configurato (Pinecone/Weaviate/PGVector)
- [ ] **AC2**: Contenuto indicizzato: CV, esperienze, progetti, articoli blog
- [ ] **AC3**: Semantic search funzionante (trova info rilevanti)
- [ ] **AC4**: RAG pipeline: query → retrieve → augment → generate
- [ ] **AC5**: Chatbot usa solo informazioni retrieved (no hallucination)
- [ ] **AC6**: Quando non sa, ammette e propone contatto

## Architettura RAG

### 1. Indexing Pipeline
```typescript
// scripts/index-content.ts
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

async function indexContent() {
  const documents = [
    // CV/Resume
    await loadDocument('/content/cv.md'),
    // Experiences
    await loadDocument('/content/experiences/*.md'),
    // Blog posts
    await loadDocument('/content/blog/*.mdx'),
  ];

  const embeddings = new OpenAIEmbeddings();
  await PineconeStore.fromDocuments(documents, embeddings);
}
```

### 2. Retrieval in Chat
```typescript
// lib/rag/retrieve.ts
export async function retrieveContext(query: string) {
  const vectorStore = await getPineconeStore();
  const docs = await vectorStore.similaritySearch(query, 3);
  return docs.map(d => d.pageContent).join('\n\n');
}
```

### 3. Augmented Prompt
```typescript
// lib/chatbot/system-prompt.ts
export function buildSystemPrompt(retrievedContext: string) {
  return `Sei l'assistente virtuale di Mattia Filippo De Luca.

Usa SOLO le seguenti informazioni per rispondere:
${retrievedContext}

Se la risposta non è nelle informazioni fornite, dillo onestamente e proponi di parlare direttamente con Mattia.

Tone of voice: pragmatico, accessibile, purpose-driven.`;
}
```

## Contenuti da Indicizzare
- [ ] `/content/cv.md` o equivalente
- [ ] Journey/Experiences da homepage
- [ ] Tutti gli articoli blog (quando disponibili)
- [ ] FAQ se esistenti
- [ ] Skills e competenze

## Test Plan
```typescript
test('RAG retrieves relevant context', async () => {
  const context = await retrieveContext('esperienza in product management');
  expect(context).toContain('product'); // Verify relevance
});

test('chatbot uses retrieved context', async () => {
  const response = await chatbot('Quali progetti hai fatto?');
  // Verify response includes info from indexed content
});

test('chatbot admits when does not know', async () => {
  const response = await chatbot('Qual è il tuo colore preferito?');
  expect(response).toMatch(/non.*informazioni|parlare.*Mattia/i);
});
```

## Vector Database Options
**Opzione A: Pinecone** (Managed, facile)
**Opzione B: Weaviate** (Open source, self-hosted)
**Opzione C: PGVector** (Postgres extension, stesso DB)

**Raccomandazione**: PGVector se già usi PostgreSQL, altrimenti Pinecone per semplicità.

## Dipendenze
- [ ] Vector database account/setup
- [ ] Embeddings API (OpenAI o Anthropic)
- [ ] Blog content (EPIC-006)

## Definition of Done
- [ ] Vector database configurato
- [ ] Pipeline di indexing creato
- [ ] Contenuto professionale indicizzato
- [ ] RAG pipeline funzionante in chat
- [ ] Test retrieval accuracy passano
- [ ] Chatbot usa solo info retrieved
- [ ] Fallback "non so" funziona
