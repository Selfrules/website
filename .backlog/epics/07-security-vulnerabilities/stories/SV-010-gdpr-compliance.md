# [SV-010] GDPR Compliance Implementation

## Metadata
- **Story ID**: SV-010
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🔴 L (3-5 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** EU resident **Voglio** controllo sui miei dati personali **Così che** rispettiamo GDPR e privacy laws

## Vulnerabilità Correlate
- **13.1**: IP Address Collection Without Consent (MEDIUM)
- **13.2**: Personal Data in Chat Messages (MEDIUM)

## Criteri di Accettazione
- [ ] **AC1**: Privacy policy pubblicata e accessibile
- [ ] **AC2**: Cookie consent banner implementato
- [ ] **AC3**: Data deletion endpoint (`/api/gdpr/delete`)
- [ ] **AC4**: Data export endpoint (`/api/gdpr/export`)
- [ ] **AC5**: IP addresses anonimizzati o hash
- [ ] **AC6**: Opt-in per analytics tracking
- [ ] **AC7**: Chat message TTL (30 giorni)

## Implementazione

**File**: `components/CookieConsent.tsx` (NEW)
```tsx
'use client';

import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShow(false);
    // Initialize analytics
    window.umami?.trackView();
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-black text-white p-4">
      <p>
        Usiamo cookie per migliorare l'esperienza. Consulta la{' '}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>
      <button onClick={accept}>Accetta</button>
    </div>
  );
}
```

**File**: `app/api/gdpr/delete/route.ts` (NEW)
```typescript
export async function POST(req: NextRequest) {
  const { email, sessionId } = await req.json();

  // Delete user data
  await prisma.chatMessage.deleteMany({ where: { sessionId } });
  await prisma.analyticsEvent.deleteMany({ where: { sessionId } });
  await prisma.question.deleteMany({ where: { email } });

  return NextResponse.json({ success: true, message: 'Data deleted' });
}
```

**File**: `app/api/gdpr/export/route.ts` (NEW)
```typescript
export async function POST(req: NextRequest) {
  const { sessionId, email } = await req.json();

  const data = {
    chatMessages: await prisma.chatMessage.findMany({ where: { sessionId } }),
    analytics: await prisma.analyticsEvent.findMany({ where: { sessionId } }),
    questions: await prisma.question.findMany({ where: { email } }),
  };

  return NextResponse.json(data);
}
```

**Anonymize IPs**:
```typescript
function anonymizeIp(ip: string): string {
  const parts = ip.split('.');
  if (parts.length === 4) {
    // IPv4: 192.168.1.1 -> 192.168.1.0
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  // IPv6: hash it
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);
}
```

**Add TTL to chat messages**:
```typescript
// Cron job to delete old messages
export async function DELETE_OLD_MESSAGES() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  await prisma.chatMessage.deleteMany({
    where: { createdAt: { lt: thirtyDaysAgo } },
  });
}
```

## Files da Modificare
1. `components/CookieConsent.tsx` (NEW)
2. `app/api/gdpr/delete/route.ts` (NEW)
3. `app/api/gdpr/export/route.ts` (NEW)
4. `app/privacy-policy/page.tsx` (NEW)
5. `lib/utils/anonymize.ts` (NEW)
6. Analytics tracking - Only after consent

## Test Plan
```bash
# Test data deletion
curl -X POST http://localhost:3000/api/gdpr/delete \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"abc123","email":"user@example.com"}'
# Expected: Data deleted from DB

# Test data export
curl -X POST http://localhost:3000/api/gdpr/export \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"abc123"}'
# Expected: JSON with all user data
```

## Definition of Done
- [ ] Cookie consent banner implemented
- [ ] Privacy policy page created
- [ ] Data deletion endpoint working
- [ ] Data export endpoint working
- [ ] IP anonymization implemented
- [ ] Chat message TTL implemented
- [ ] Analytics opt-in working
- [ ] Tests pass
