# [SV-009] Add CSRF Protection

## Metadata
- **Story ID**: SV-009
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1 giorno)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** developer **Voglio** CSRF token validation su state-changing operations **Così che** preveniamo attacchi CSRF

## Vulnerabilità Correlate
- **4.1**: Missing CSRF Tokens on State-Changing Operations (MEDIUM)

## Criteri di Accettazione
- [ ] **AC1**: CSRF token generato per ogni sessione
- [ ] **AC2**: Token validato su POST/PUT/DELETE/PATCH
- [ ] **AC3**: Token incluso in forms e API requests
- [ ] **AC4**: SameSite cookie attribute = 'strict' (already 'lax')
- [ ] **AC5**: Double-submit cookie pattern implementato

## Implementazione

**File**: `lib/middleware/csrf.ts` (NEW)
```typescript
import crypto from 'crypto';

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function verifyCsrfToken(token: string, expectedToken: string): boolean {
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expectedToken)
  );
}

export async function checkCsrfToken(req: NextRequest): Promise<boolean> {
  const token = req.headers.get('x-csrf-token');
  const cookieToken = req.cookies.get('csrf_token')?.value;

  if (!token || !cookieToken) return false;

  try {
    return verifyCsrfToken(token, cookieToken);
  } catch {
    return false;
  }
}
```

**Add CSRF middleware to API routes**:
```typescript
// app/api/blog/route.ts
import { checkCsrfToken } from '@/lib/middleware/csrf';

export async function POST(req: NextRequest) {
  // Check CSRF
  if (!await checkCsrfToken(req)) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  // ... rest of implementation
}
```

**Generate token on login**:
```typescript
// app/api/admin/login/route.ts
export async function POST(req: NextRequest) {
  // ... verify password

  const csrfToken = generateCsrfToken();

  const response = NextResponse.json({ success: true, csrfToken });

  response.cookies.set('csrf_token', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return response;
}
```

## Files da Modificare
1. `lib/middleware/csrf.ts` (NEW) - CSRF utilities
2. All POST/PUT/DELETE/PATCH API routes - Add CSRF check
3. `app/api/admin/login/route.ts` - Generate CSRF token
4. Client-side forms - Include CSRF token in requests

## Test Plan
```bash
# Test request without CSRF token
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","slug":"test","content":"Test"}'
# Expected: 403 Forbidden

# Test with valid CSRF token
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: YOUR_TOKEN" \
  -H "Cookie: csrf_token=YOUR_TOKEN" \
  -d '{"title":"Test","slug":"test","content":"Test"}'
# Expected: 200 OK (if authenticated)
```

## Definition of Done
- [ ] CSRF middleware implemented
- [ ] All write operations validate CSRF token
- [ ] CSRF token generated on login
- [ ] Client forms include CSRF token
- [ ] Tests pass
- [ ] CSRF attacks blocked
