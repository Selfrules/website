# [SV-007] Improve Rate Limiting Coverage

## Metadata
- **Story ID**: SV-007
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** system administrator **Voglio** rate limiting su tutti gli endpoints **Così che** preveniamo DoS e brute force attacks

## Vulnerabilità Correlate
- **8.1**: Inconsistent Rate Limiting Coverage (MEDIUM)
- **8.2**: Rate Limiting Based on IP Only (MEDIUM)

## Criteri di Accettazione
- [ ] **AC1**: Rate limiting su tutti gli endpoints (GET inclusi)
- [ ] **AC2**: Rate limiting basato su IP + fingerprint (non solo IP)
- [ ] **AC3**: X-Client-ID validato (no bypass)
- [ ] **AC4**: Rate limits diversi per endpoint type (read vs write)
- [ ] **AC5**: Rate limit headers esposti (X-RateLimit-*)

## Implementazione

**File**: `lib/middleware/rate-limit.ts` (UPDATE)
```typescript
// Add to all unprotected endpoints
export const rateLimitConfigs = {
  read: { maxRequests: 100, windowMs: 60 * 1000 },      // 100/min
  write: { maxRequests: 20, windowMs: 60 * 1000 },      // 20/min
  auth: { maxRequests: 5, windowMs: 15 * 60 * 1000 },   // 5/15min
  admin: { maxRequests: 50, windowMs: 60 * 1000 },      // 50/min
};

// Improve client identifier (IP + User-Agent hash)
function getClientIdentifier(req: NextRequest): string {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || '';
  const hash = crypto.createHash('sha256').update(userAgent).digest('hex').slice(0, 16);

  return `${ip}:${hash}`;
}
```

**Add to unprotected endpoints**:
```typescript
// app/api/questions/route.ts - GET
export async function GET(req: NextRequest) {
  await apiRateLimiter.checkLimit(req, rateLimitConfigs.read); // ADD THIS
  // ... rest
}

// app/api/admin/stats/route.ts
export async function GET(req: NextRequest) {
  await apiRateLimiter.checkLimit(req, rateLimitConfigs.admin); // ADD THIS
  // ... rest
}
```

## Files da Modificare
1. `lib/middleware/rate-limit.ts` - Improve identifier, add configs
2. `app/api/questions/route.ts` - Add rate limiting to GET
3. `app/api/admin/stats/route.ts` - Add rate limiting
4. `app/api/admin/analytics-data/route.ts` - Add rate limiting

## Test Plan
```bash
# Test read endpoint rate limit
for i in {1..101}; do curl http://localhost:3000/api/questions; done
# Expected: First 100 succeed, 101st returns 429

# Test different endpoints use different limits
for i in {1..6}; do curl -X POST http://localhost:3000/api/admin/login -d '{"password":"wrong"}'; done
# Expected: First 5 return 401, 6th returns 429
```

## Definition of Done
- [ ] All endpoints have rate limiting
- [ ] Client identifier includes IP + User-Agent hash
- [ ] Different limits for read/write/auth/admin
- [ ] Tests pass
- [ ] Rate limit bypass attempts fail
