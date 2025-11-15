# [SV-001] Fix Authentication & Authorization on All Endpoints

## Metadata
- **Story ID**: SV-001
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🔴 XL (3-5 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** amministratore del sito **Voglio** che tutti gli endpoints admin e di scrittura siano protetti con autenticazione **Così che** solo utenti autorizzati possano accedere a dati sensibili e modificare contenuti

## Vulnerabilità Correlate (Security Audit)
- **2.1**: Admin password usando plain-text comparison (CRITICAL)
- **2.2**: Inconsistent authentication implementation (HIGH)
- **2.3**: Missing authentication on GET `/api/questions` (CRITICAL)
- **2.4**: Missing admin authentication on blog write operations (CRITICAL)
- **2.5**: Unprotected analytics data access (HIGH)

## Criteri di Accettazione
- [ ] **AC1**: Admin password usa bcrypt hashing invece di plain-text comparison
- [ ] **AC2**: Tutti gli endpoints admin usano un unico metodo di autenticazione (NextAuth)
- [ ] **AC3**: GET `/api/questions` richiede autenticazione admin
- [ ] **AC4**: POST/PUT/DELETE `/api/blog/*` richiedono autenticazione admin
- [ ] **AC5**: GET/POST `/api/analytics/*` richiedono autenticazione admin
- [ ] **AC6**: Rate limiting su login endpoint (max 5 tentativi in 15 minuti)
- [ ] **AC7**: Error messages non rivelano se username o password sono errati (generic error)

## Implementazione Tecnica

### 1. Fix Admin Password Hashing

**File**: `lib/auth/admin.ts:24`

```typescript
// PRIMA (VULNERABLE)
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

// DOPO (SECURE)
import bcrypt from 'bcryptjs';

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!passwordHash) {
    throw new Error('ADMIN_PASSWORD_HASH not configured');
  }

  return await bcrypt.compare(password, passwordHash);
}
```

**Environment Variable Update**:
```bash
# .env.local
# Remove ADMIN_PASSWORD=...
# Add ADMIN_PASSWORD_HASH=... (generato con bcrypt)

# Script per generare hash:
# node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_PASSWORD', 12))"
```

### 2. Standardize Authentication (Use NextAuth Everywhere)

**File**: `lib/middleware/auth.ts` (NEW FILE)

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function requireAdminAuth(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized access' },
      { status: 401 }
    );
  }

  return null; // Auth successful
}
```

### 3. Protect Question Endpoints

**File**: `app/api/questions/route.ts:79-107`

```typescript
import { requireAdminAuth } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  // ADD AUTH CHECK
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'pending';
    const questions = await queryDocumentsAdmin<Question>(/* ... */);
    // ... rest of implementation
  } catch (error) {
    // ... error handling
  }
}
```

### 4. Protect Blog Write Operations

**File**: `app/api/blog/route.ts` (POST), `app/api/blog/[slug]/route.ts` (PUT/DELETE)

```typescript
import { requireAdminAuth } from '@/lib/middleware/auth';

// POST /api/blog
export async function POST(req: NextRequest) {
  // ADD AUTH CHECK
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  // ... existing validation and creation logic
}

// PUT /api/blog/[slug]
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  // ADD AUTH CHECK
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  // ... existing update logic
}

// DELETE /api/blog/[slug]
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  // ADD AUTH CHECK
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  // ... existing delete logic
}
```

### 5. Protect Analytics Endpoints

**File**: `app/api/analytics/route.ts`

```typescript
import { requireAdminAuth } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  await apiRateLimiter.checkLimit(req);

  // ADD AUTH CHECK
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  // ... existing analytics query logic
}
```

### 6. Add Rate Limiting to Login

**File**: `app/api/admin/login/route.ts`

```typescript
import { apiRateLimiter } from '@/lib/middleware/rate-limit';

export async function POST(req: NextRequest) {
  // ADD RATE LIMITING (5 attempts per 15 minutes)
  await apiRateLimiter.checkLimit(req, {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  });

  try {
    const { password } = await req.json();

    // Use async bcrypt verification
    const isValid = await verifyAdminPassword(password);

    if (!isValid) {
      // Generic error message (don't reveal if password is wrong)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // ... create session
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
```

### 7. Update .env.example

**File**: `.env.example:44`

```bash
# REMOVE default hash
# ADMIN_PASSWORD_HASH=$2a$12$JvWRVN79guQ8lFFfUhNQFeJ7pdLQJ.gYahsq0aKGONYpCqz42FKXq

# ADD placeholder
ADMIN_PASSWORD_HASH=YOUR_BCRYPT_HASH_HERE
# Generate with: node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('your-secure-password', 12))"
```

## Files da Modificare
1. `lib/auth/admin.ts` - Add bcrypt verification
2. `lib/middleware/auth.ts` (NEW) - Centralized auth middleware
3. `app/api/questions/route.ts` - Add auth to GET
4. `app/api/blog/route.ts` - Add auth to POST
5. `app/api/blog/[slug]/route.ts` - Add auth to PUT/DELETE
6. `app/api/analytics/route.ts` - Add auth to GET/POST
7. `app/api/admin/login/route.ts` - Add rate limiting, use bcrypt, generic errors
8. `.env.example` - Remove default hash, add placeholder

## Test Plan

### Manual Testing
```bash
# 1. Generate bcrypt hash
node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('TestPassword123!', 12))"

# 2. Update .env.local with hash
# ADMIN_PASSWORD_HASH=<generated_hash>

# 3. Test login with correct password
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password": "TestPassword123!"}'
# Expected: 200 OK with session cookie

# 4. Test login with wrong password
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password": "WrongPassword"}'
# Expected: 401 Unauthorized with generic error "Invalid credentials"

# 5. Test rate limiting (6 failed attempts)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/admin/login \
    -H "Content-Type: application/json" \
    -d '{"password": "wrong"}'
done
# Expected: First 5 return 401, 6th returns 429 Too Many Requests

# 6. Test unauthenticated access to protected endpoints
curl -X GET http://localhost:3000/api/questions
# Expected: 401 Unauthorized

curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "slug": "test", "content": "Test"}'
# Expected: 401 Unauthorized

curl -X GET http://localhost:3000/api/analytics
# Expected: 401 Unauthorized

# 7. Test authenticated access (with valid session cookie)
# Login first to get cookie, then:
curl -X GET http://localhost:3000/api/questions \
  -H "Cookie: admin_session=<your_session_cookie>"
# Expected: 200 OK with questions data
```

### Automated Testing
```typescript
// e2e/admin-auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Authentication', () => {
  test('should reject unauthenticated requests to admin endpoints', async ({ request }) => {
    // Test /api/questions GET
    const questionsRes = await request.get('/api/questions');
    expect(questionsRes.status()).toBe(401);

    // Test /api/blog POST
    const blogRes = await request.post('/api/blog', {
      data: { title: 'Test', slug: 'test', content: 'Test' }
    });
    expect(blogRes.status()).toBe(401);

    // Test /api/analytics GET
    const analyticsRes = await request.get('/api/analytics');
    expect(analyticsRes.status()).toBe(401);
  });

  test('should accept authenticated requests', async ({ request }) => {
    // Login
    const loginRes = await request.post('/api/admin/login', {
      data: { password: process.env.ADMIN_PASSWORD }
    });
    expect(loginRes.ok()).toBeTruthy();

    // Extract session cookie
    const cookies = await loginRes.headers()['set-cookie'];

    // Access protected endpoint
    const questionsRes = await request.get('/api/questions', {
      headers: { Cookie: cookies }
    });
    expect(questionsRes.ok()).toBeTruthy();
  });

  test('should rate limit login attempts', async ({ request }) => {
    const attempts = [];

    for (let i = 0; i < 6; i++) {
      attempts.push(
        request.post('/api/admin/login', {
          data: { password: 'wrong' }
        })
      );
    }

    const results = await Promise.all(attempts);

    // First 5 should be 401 Unauthorized
    results.slice(0, 5).forEach(res => {
      expect(res.status()).toBe(401);
    });

    // 6th should be 429 Rate Limited
    expect(results[5].status()).toBe(429);
  });

  test('should not reveal password verification details', async ({ request }) => {
    const res = await request.post('/api/admin/login', {
      data: { password: 'WrongPassword123!' }
    });

    const body = await res.json();

    // Error message should be generic
    expect(body.error).toBe('Invalid credentials');
    expect(body.error).not.toContain('password');
    expect(body.error).not.toContain('incorrect');
  });
});
```

## Definition of Done
- [ ] Bcrypt password hashing implementato in `lib/auth/admin.ts`
- [ ] Middleware centralizzato `lib/middleware/auth.ts` creato
- [ ] Auth check aggiunto a GET `/api/questions`
- [ ] Auth check aggiunto a POST/PUT/DELETE `/api/blog/*`
- [ ] Auth check aggiunto a GET/POST `/api/analytics/*`
- [ ] Rate limiting su `/api/admin/login` (5 attempts / 15 min)
- [ ] Error messages generici (no info disclosure)
- [ ] `.env.example` aggiornato (no default hash)
- [ ] All manual tests pass
- [ ] All automated tests pass
- [ ] Zero errori TypeScript
- [ ] Zero errori linting
- [ ] Documentation aggiornata (README per generare bcrypt hash)

---

## Note di Sicurezza
- **Bcrypt cost factor**: Usare 12 rounds (bilanciamento sicurezza/performance)
- **Session cookies**: Devono essere `httpOnly`, `secure` (production), `sameSite: 'lax'`
- **Rate limiting**: Applicare a livello globale, non solo per IP (usa x-client-id validato)
- **Error handling**: Mai rivelare dettagli interni (stack traces, query details, validation failures)
- **Password requirements**: Considerare di aggiungere validazione password strength (min length, complexity)

## Riferimenti
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- bcryptjs docs: https://github.com/dcodeIO/bcrypt.js
- NextAuth.js docs: https://next-auth.js.org/
