# [SV-003] Remove CORS Wildcards

## Metadata
- **Story ID**: SV-003
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟢 S (0.5 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** security engineer **Voglio** che tutti gli endpoints API usino CORS whitelist invece di wildcard **Così che** solo origini autorizzate possano accedere alle API

## Vulnerabilità Correlate (Security Audit)
- **3.1**: Wildcard CORS Allow in Chat Stream Endpoint (HIGH)
- **3.2**: Permissive CORS Configuration in Development (MEDIUM)

## Criteri di Accettazione
- [ ] **AC1**: `/api/chat/stream` usa `addCorsHeaders()` invece di wildcard `*`
- [ ] **AC2**: Environment variable `ALLOWED_ORIGINS` contiene solo domini autorizzati
- [ ] **AC3**: Development mode consente solo localhost con porta specifica
- [ ] **AC4**: CORS middleware valida origin prima di rispondere
- [ ] **AC5**: OPTIONS preflight requests gestite correttamente
- [ ] **AC6**: Errori CORS loggati per monitoring

## Implementazione Tecnica

### 1. Fix Chat Stream Wildcard CORS

**File**: `app/api/chat/stream/route.ts:186,221`

```typescript
// PRIMA (VULNERABLE)
return new Response(stream, {
  headers: {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*', // WILDCARD!
  },
});

// DOPO (SECURE)
import { addCorsHeaders } from '@/lib/middleware/cors';

export async function POST(req: NextRequest) {
  try {
    // ... existing logic

    const stream = createStreamResponse(/* ... */);

    const response = new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

    // Use existing CORS utility (respects ALLOWED_ORIGINS)
    return addCorsHeaders(response, req);
  } catch (error) {
    // ... error handling
  }
}

// OPTIONS handler
export async function OPTIONS(req: NextRequest) {
  const response = new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });

  // Use CORS utility (no more wildcards)
  return addCorsHeaders(response, req);
}
```

### 2. Strengthen CORS Middleware Validation

**File**: `lib/middleware/cors.ts:31-33`

```typescript
// PRIMA (PERMISSIVE)
const isAllowedOrigin = config.allowedOrigins?.includes(origin) ||
                        config.allowedOrigins?.includes('*') ||
                        (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost'));

// DOPO (STRICT)
export function isOriginAllowed(origin: string | null, config: CorsConfig): boolean {
  if (!origin) return false;

  const allowedOrigins = config.allowedOrigins || [];

  // Warn if wildcard detected
  if (allowedOrigins.includes('*')) {
    console.warn('[SECURITY WARNING] CORS wildcard (*) detected in ALLOWED_ORIGINS. This is insecure!');

    // Allow in development only
    if (process.env.NODE_ENV !== 'production') {
      return true;
    } else {
      // Block wildcard in production
      console.error('[SECURITY ERROR] CORS wildcard not allowed in production!');
      return false;
    }
  }

  // Check explicit origin list
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Development: Only allow specific localhost ports
  if (process.env.NODE_ENV === 'development') {
    const allowedDevOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ];

    if (allowedDevOrigins.includes(origin)) {
      return true;
    }
  }

  // Log rejected origins for monitoring
  console.warn(`[CORS] Rejected origin: ${origin}`);
  return false;
}

export function addCorsHeaders(response: Response, req: NextRequest, config?: CorsConfig): Response {
  const origin = req.headers.get('origin');
  const corsConfig = config || {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Client-ID'],
    credentials: true,
  };

  // Validate origin
  if (!isOriginAllowed(origin, corsConfig)) {
    // Don't set CORS headers for disallowed origins
    return response;
  }

  // Set CORS headers for allowed origin
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', origin!);

  if (corsConfig.credentials) {
    headers.set('Access-Control-Allow-Credentials', 'true');
  }

  if (corsConfig.allowedMethods) {
    headers.set('Access-Control-Allow-Methods', corsConfig.allowedMethods.join(', '));
  }

  if (corsConfig.allowedHeaders) {
    headers.set('Access-Control-Allow-Headers', corsConfig.allowedHeaders.join(', '));
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
```

### 3. Update Environment Variables

**File**: `.env.example`

```bash
# CORS Configuration
# Comma-separated list of allowed origins (NO WILDCARDS in production!)
# Example: https://example.com,https://www.example.com
ALLOWED_ORIGINS=http://localhost:3000

# Production example (NEVER use '*'):
# ALLOWED_ORIGINS=https://mattiasaraceno.com,https://www.mattiasaraceno.com
```

**File**: `.env.local` (for development)
```bash
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

**Vercel Environment Variables** (production):
```bash
ALLOWED_ORIGINS=https://mattiasaraceno.com,https://www.mattiasaraceno.com
```

### 4. Add CORS Monitoring

**File**: `lib/middleware/cors.ts` (add logging)

```typescript
export function logCorsEvent(
  origin: string | null,
  allowed: boolean,
  endpoint: string
) {
  const event = {
    timestamp: new Date().toISOString(),
    origin,
    allowed,
    endpoint,
    environment: process.env.NODE_ENV,
  };

  if (!allowed) {
    // Log rejected CORS attempts (potential attack)
    console.warn('[CORS REJECTED]', JSON.stringify(event));

    // TODO: Send to monitoring service (Sentry, DataDog, etc.)
    // await sendToMonitoring('cors_rejection', event);
  } else if (process.env.NODE_ENV === 'development') {
    // Log allowed requests in dev for debugging
    console.log('[CORS ALLOWED]', JSON.stringify(event));
  }
}
```

Update `addCorsHeaders()` to use logging:
```typescript
export function addCorsHeaders(response: Response, req: NextRequest, config?: CorsConfig): Response {
  const origin = req.headers.get('origin');
  const endpoint = req.nextUrl.pathname;
  // ... existing validation

  const allowed = isOriginAllowed(origin, corsConfig);

  // Log CORS event
  logCorsEvent(origin, allowed, endpoint);

  if (!allowed) {
    return response;
  }

  // ... rest of implementation
}
```

## Files da Modificare
1. `app/api/chat/stream/route.ts` - Remove wildcard CORS, use addCorsHeaders()
2. `lib/middleware/cors.ts` - Strengthen validation, add logging
3. `.env.example` - Document CORS configuration
4. All API routes using wildcard CORS (search for `'Access-Control-Allow-Origin': '*'`)

## Test Plan

### Manual Testing
```bash
# 1. Test allowed origin (development)
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}' \
  -v
# Expected: Response includes "Access-Control-Allow-Origin: http://localhost:3000"

# 2. Test disallowed origin
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Origin: https://evil.com" \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}' \
  -v
# Expected: No CORS headers in response, request fails

# 3. Test OPTIONS preflight
curl -X OPTIONS http://localhost:3000/api/chat/stream \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -v
# Expected: 204 No Content with CORS headers

# 4. Test wildcard rejection in production
# Set NODE_ENV=production temporarily
export NODE_ENV=production
export ALLOWED_ORIGINS="*"
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}' \
  -v
# Expected: Error logged, CORS headers not set

# 5. Verify no wildcard in codebase
grep -r "Access-Control-Allow-Origin.*\*" app/api/
# Expected: No matches (all wildcards removed)
```

### Automated Testing
```typescript
// e2e/cors.spec.ts
import { test, expect } from '@playwright/test';

test.describe('CORS Security', () => {
  test('should allow requests from whitelisted origin', async ({ request }) => {
    const res = await request.post('/api/chat/stream', {
      headers: {
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/json',
      },
      data: { message: 'test' },
    });

    const corsHeader = res.headers()['access-control-allow-origin'];
    expect(corsHeader).toBe('http://localhost:3000');
  });

  test('should reject requests from non-whitelisted origin', async ({ request }) => {
    const res = await request.post('/api/chat/stream', {
      headers: {
        'Origin': 'https://malicious-site.com',
        'Content-Type': 'application/json',
      },
      data: { message: 'test' },
    });

    const corsHeader = res.headers()['access-control-allow-origin'];
    expect(corsHeader).toBeUndefined();
  });

  test('should handle OPTIONS preflight correctly', async ({ request }) => {
    const res = await request.fetch('/api/chat/stream', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'POST',
      },
    });

    expect(res.status()).toBe(204);
    expect(res.headers()['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(res.headers()['access-control-allow-methods']).toContain('POST');
  });

  test('should not use wildcard CORS in any endpoint', async () => {
    // Grep for wildcard CORS
    const { execSync } = require('child_process');
    const result = execSync('grep -r "Access-Control-Allow-Origin.*\\*" app/api/ || true').toString();

    expect(result.trim()).toBe('');
  });
});
```

### Security Testing
```bash
# Test CORS bypass attempts
# 1. Try null origin
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Origin: null" \
  -d '{"message": "test"}'
# Expected: Rejected

# 2. Try origin with subdomain
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Origin: http://evil.localhost:3000" \
  -d '{"message": "test"}'
# Expected: Rejected (exact match only)

# 3. Try origin case variation
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Origin: HTTP://LOCALHOST:3000" \
  -d '{"message": "test"}'
# Expected: Rejected (case-sensitive)
```

## Definition of Done
- [ ] Wildcard CORS rimosso da `/api/chat/stream/route.ts`
- [ ] `isOriginAllowed()` implementato con strict validation
- [ ] Wildcard `*` bloccato in production
- [ ] CORS logging implementato
- [ ] `.env.example` aggiornato con CORS docs
- [ ] Production ALLOWED_ORIGINS configurato su Vercel
- [ ] Nessun wildcard CORS nel codebase (verificato con grep)
- [ ] All manual tests pass
- [ ] All automated tests pass
- [ ] Security tests pass (bypass attempts fail)
- [ ] Zero errori TypeScript
- [ ] Zero errori linting

---

## Note di Sicurezza
- **Origin Validation**: Usare exact match, non regex o wildcards
- **Credentials**: Solo con CORS specifico (never with `*`)
- **Preflight Caching**: Max-Age 24h per ridurre overhead
- **Monitoring**: Loggare tutti i CORS rejections per detect attacks

## Riferimenti
- MDN CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- OWASP CORS: https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#cross-origin-resource-sharing
- Next.js CORS: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors
