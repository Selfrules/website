# [CB-001] Connessione API Claude e Gestione Conversazioni

## Metadata
- **Story ID**: CB-001 | **Epic**: [EPIC-004](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🔴 L (3-5 giorni)
- **Execution Environment**: 💻 **Claude Code Locale**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** chatbot **Voglio** connettermi alle API Claude **Così che** possa rispondere intelligentemente alle domande degli utenti

## Criteri di Accettazione
- [ ] **AC1**: API endpoint `/api/chat` funzionante
- [ ] **AC2**: Connessione a Claude API (Anthropic) con API key sicura
- [ ] **AC3**: Gestione conversazione multi-turn (context mantenuto)
- [ ] **AC4**: Streaming responses per UX fluida
- [ ] **AC5**: Error handling robusto (API down, rate limit, timeout)
- [ ] **AC6**: Logging conversazioni per analytics

## Implementazione Tecnica

### API Route Structure
```typescript
// app/api/chat/route.ts
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
  const { messages, conversationId } = await req.json();

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  // Retrieve conversation context from DB
  const context = await getConversationContext(conversationId);

  // Call Claude API with streaming
  const stream = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [...context, ...messages],
    stream: true,
  });

  // Stream response back to client
  return new Response(stream);
}
```

### Database Schema
```prisma
model Conversation {
  id        String   @id @default(cuid())
  userId    String?  // Optional if user identified
  messages  Message[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Message {
  id             String   @id @default(cuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  role           String   // 'user' | 'assistant'
  content        String   @db.Text
  createdAt      DateTime @default(now())
}
```

## Test Plan
```typescript
// Test API endpoint
test('POST /api/chat returns response', async () => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'Ciao' }],
    }),
  });

  expect(response.ok).toBe(true);
  const data = await response.json();
  expect(data.message).toBeDefined();
});

// Test streaming
test('streaming response works', async () => {
  // Test streaming functionality
});
```

## Security
- [ ] API key in environment variables
- [ ] Rate limiting (vedi CB-006)
- [ ] Input validation (Zod schema)
- [ ] CORS appropriato
- [ ] No PII in logs

## Definition of Done
- [ ] API route `/api/chat` creato e funzionante
- [ ] Claude API connessa e testata
- [ ] Streaming responses implementato
- [ ] Database schema per conversations creato
- [ ] Error handling completo
- [ ] Tests passano
- [ ] Security checklist completata
- [ ] Logging implementato
