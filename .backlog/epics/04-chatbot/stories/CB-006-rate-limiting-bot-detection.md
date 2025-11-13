# [CB-006] Rate Limiting e Bot Detection

## Metadata
- **Story ID**: CB-006 | **Epic**: [EPIC-004](./../epic.md)
- **Priorità**: 🔴 Critica (security) | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 💻 **Claude Code Locale**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** sistema **Voglio** protezione da abuse e bot **Così che** risorse API non vengano sprecate

## Criteri di Accettazione
- [ ] **AC1**: Rate limiting per IP (es. 20 msg/ora)
- [ ] **AC2**: Rate limiting per session (es. 50 msg/giorno)
- [ ] **AC3**: Bot detection (honeypot, timing analysis)
- [ ] **AC4**: Token limit per conversazione (evitare context window abuse)
- [ ] **AC5**: Captcha su suspicious behavior

## Implementazione

### 1. Rate Limiting (Sliding Window)
```typescript
// lib/rate-limit.ts
import { Redis } from '@upstash/redis';

export async function checkRateLimit(ip: string): Promise<boolean> {
  const redis = new Redis({ url: process.env.REDIS_URL });

  const key = `rate-limit:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 3600); // 1 hour
  }

  return count <= 20; // Max 20 messages per hour
}
```

### 2. Bot Detection
```typescript
// lib/bot-detection.ts
export function detectBot(request: Request): boolean {
  // Check 1: Honeypot field
  const { honeypot } = await request.json();
  if (honeypot) return true; // Bot filled invisible field

  // Check 2: User-Agent
  const ua = request.headers.get('user-agent');
  if (!ua || /bot|crawler|spider/i.test(ua)) return true;

  // Check 3: Timing (too fast)
  // Implement timing analysis

  return false;
}
```

### 3. Token Limiting
```typescript
// lib/chatbot/token-limit.ts
export function checkTokenLimit(conversationId: string): boolean {
  const conversation = await db.conversation.findUnique({
    where: { id: conversationId },
    include: { messages: true }
  });

  const totalTokens = estimateTokens(conversation.messages);
  return totalTokens < 10000; // Max 10k tokens per conversation
}
```

### 4. Captcha Integration
```typescript
// Use Cloudflare Turnstile or hCaptcha
// Trigger on suspicious behavior
if (rateLimitExceeded || botDetected) {
  return { error: 'Please complete captcha', requiresCaptcha: true };
}
```

## Configuration
```env
# .env
REDIS_URL=...
RATE_LIMIT_MESSAGES_PER_HOUR=20
RATE_LIMIT_MESSAGES_PER_DAY=50
MAX_TOKENS_PER_CONVERSATION=10000
TURNSTILE_SECRET_KEY=...
```

## Test Plan
```typescript
test('rate limit blocks after threshold', async () => {
  // Send 21 messages from same IP
  // Expect 21st to be blocked
});

test('bot detection catches honeypot', async () => {
  const response = await fetch('/api/chat', {
    body: JSON.stringify({ message: 'test', honeypot: 'filled' })
  });
  expect(response.status).toBe(429);
});

test('token limit stops long conversations', async () => {
  // Create conversation with many messages
  // Expect rejection when token limit exceeded
});
```

## Definition of Done
- [ ] Rate limiting implementato (IP e session)
- [ ] Bot detection (honeypot, UA, timing)
- [ ] Token limiting per conversation
- [ ] Captcha integration
- [ ] Config in environment variables
- [ ] Tests passano
- [ ] Error messages user-friendly
- [ ] Logging per monitoring abuse patterns
