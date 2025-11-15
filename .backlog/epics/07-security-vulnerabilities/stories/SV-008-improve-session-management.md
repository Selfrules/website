# [SV-008] Improve Session Management

## Metadata
- **Story ID**: SV-008
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1 giorno)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** admin **Voglio** sessioni sicure con durata ridotta e encryption **Così che** le sessioni rubate abbiano impatto limitato

## Vulnerabilità Correlate
- **9.1**: Session Token Not Encrypted (MEDIUM)
- **9.2**: Long Session Duration (24 hours) (MEDIUM)

## Criteri di Accettazione
- [ ] **AC1**: Session token encrypted (JWT o simile)
- [ ] **AC2**: Session duration ridotta a 4-8 ore
- [ ] **AC3**: Refresh token mechanism implementato
- [ ] **AC4**: Session invalidation endpoint (`/api/admin/logout`)
- [ ] **AC5**: Session rotation dopo azioni critiche

## Implementazione

**File**: `lib/auth/admin.ts`
```typescript
import jwt from 'jsonwebtoken';

const SESSION_DURATION = 4 * 60 * 60 * 1000; // 4 hours (was 24)
const REFRESH_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// Use JWT instead of plain JSON
export async function createAdminSession(): Promise<string> {
  const secret = process.env.JWT_SECRET!;

  const token = jwt.sign(
    {
      role: 'admin',
      exp: Math.floor(Date.now() / 1000) + (SESSION_DURATION / 1000),
    },
    secret,
    { algorithm: 'HS256' }
  );

  return token;
}

export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret);
    return decoded.role === 'admin';
  } catch {
    return false;
  }
}
```

**Add refresh token**:
```typescript
export async function createRefreshToken(): Promise<string> {
  const secret = process.env.JWT_SECRET!;

  return jwt.sign(
    {
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + (REFRESH_DURATION / 1000),
    },
    secret
  );
}
```

**File**: `app/api/admin/refresh/route.ts` (NEW)
```typescript
export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  if (!verifyRefreshToken(refreshToken)) {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }

  const newSessionToken = await createAdminSession();

  return NextResponse.json({ sessionToken: newSessionToken });
}
```

## Files da Modificare
1. `lib/auth/admin.ts` - Use JWT, reduce duration, add refresh
2. `app/api/admin/refresh/route.ts` (NEW) - Refresh endpoint
3. `app/api/admin/logout/route.ts` (NEW) - Logout endpoint
4. `.env.example` - Add JWT_SECRET

## Test Plan
```bash
# Test session expires after 4 hours
# Login, wait 4+ hours, try to access admin endpoint
# Expected: 401 Unauthorized

# Test refresh token
curl -X POST http://localhost:3000/api/admin/refresh \
  -d '{"refreshToken": "YOUR_REFRESH_TOKEN"}'
# Expected: New session token returned
```

## Definition of Done
- [ ] Sessions use JWT encryption
- [ ] Session duration = 4 hours
- [ ] Refresh token mechanism working
- [ ] Logout endpoint implemented
- [ ] Tests pass
