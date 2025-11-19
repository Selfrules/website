# [AN-003] Add Calendar Booking Tracking

## Metadata
- **Story ID**: AN-003
- **Epic**: EPIC-011
- **Priorità**: 🔴 Critical (P0)
- **Dimensione**: 🟢 S (1-2h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 To Do

---

## User Story
**Come** Product Manager
**Voglio** tracciare apertura/chiusura popup Google Calendar
**Per** misurare booking funnel completion e drop-off rate

---

## Acceptance Criteria
- [ ] Calendar popup open tracciato (`calendar_action`, `action: 'opened'`)
- [ ] Calendar popup close tracciato (`calendar_action`, `action: 'closed'`)
- [ ] ⚠️ Booking confirmation **non tracciabile** (CORS iframe limitation) - inferito da close timing
- [ ] Eventi visibili in Umami Dashboard

---

## Implementation Guide

### File to Update
**components/ui/GoogleCalendarPopup.tsx**:

```typescript
import { useAnalytics } from '@/lib/hooks/useAnalytics';

const GoogleCalendarPopup = ({ isOpen, onClose }) => {
  const analytics = useAnalytics();

  useEffect(() => {
    if (isOpen) {
      analytics.trackCalendarAction('opened');
    }
  }, [isOpen]);

  const handleClose = () => {
    analytics.trackCalendarAction('closed');
    onClose();
  };
```

**lib/hooks/useAnalytics.ts** (add method):
```typescript
const trackCalendarAction = (action: 'opened' | 'closed' | 'booking_intent') => {
  trackEvent('calendar_action', { action });
};
```

---

## Event Schema
```typescript
Event: 'calendar_action'
Properties: {
  action: 'opened' | 'closed' | 'booking_intent'
  timestamp: string
}
```

---

## Testing
- [ ] Click "Book a Call" CTA
- [ ] Verify `calendar_action` (opened) in console
- [ ] Close popup
- [ ] Verify `calendar_action` (closed) in console
- [ ] Umami dashboard: Verify events
- [ ] E2E test

---

## CORS Limitation Note
Google Calendar iframe **cannot** be tracked for booking completion due to same-origin policy. Workaround: infer booking if user stays on iframe >30s before closing (future story AN-003-advanced).

---

## Definition of Done
- [x] Popup open/close tracked
- [x] Events in Umami
- [x] Tests passing
- [x] No calendar regressions

---

**Impact**: Measure booking funnel
**Effort**: 1-2h
**Created**: 2025-11-19
