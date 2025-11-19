# [AN-002] Add Chat Interaction Tracking

## Metadata
- **Story ID**: AN-002
- **Epic**: EPIC-011
- **Priorità**: 🔴 Critical (P0)
- **Dimensione**: 🟢 S (1-2h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 To Do

---

## User Story
**Come** Product Manager
**Voglio** tracciare open/close/message del chatbot AI
**Per** misurare engagement e giustificare investimento AI

---

## Acceptance Criteria
- [ ] Chat open tracciato (`chat_interaction`, `action: 'opened'`)
- [ ] Chat close tracciato (`chat_interaction`, `action: 'closed'`)
- [ ] Message send tracciato (`chat_interaction`, `action: 'message_sent'`)
- [ ] Eventi visibili in Umami Dashboard
- [ ] No regressions in chat functionality

---

## Implementation Guide

### Files to Update
1. **components/chat/ChatTrigger.tsx**:
   ```typescript
   import { useAnalytics } from '@/lib/hooks/useAnalytics';

   const ChatTrigger = () => {
     const analytics = useAnalytics();

     const handleClick = () => {
       if (!isOpen) {
         analytics.trackChatInteraction('opened');
       } else {
         analytics.trackChatInteraction('closed');
       }
       setIsOpen(!isOpen);
     };
   ```

2. **components/chat/ChatInterface.tsx**:
   ```typescript
   const handleSubmit = async () => {
     analytics.trackChatInteraction('message_sent');
     // ... existing submit logic
   };
   ```

3. **lib/hooks/useAnalytics.ts** (add method):
   ```typescript
   const trackChatInteraction = (action: 'opened' | 'closed' | 'message_sent') => {
     trackEvent('chat_interaction', { action });
   };
   ```

---

## Event Schema
```typescript
Event: 'chat_interaction'
Properties: {
  action: 'opened' | 'closed' | 'message_sent'
  timestamp: string
}
```

---

## Testing
- [ ] Manual: Click chat button → verify 'opened' event
- [ ] Manual: Send message → verify 'message_sent' event
- [ ] Manual: Close chat → verify 'closed' event
- [ ] Umami dashboard: Verify events appear
- [ ] E2E test: Add to `/e2e/analytics.spec.ts`

---

## Definition of Done
- [x] Tracking implemented in ChatTrigger + ChatInterface
- [x] Events visible in Umami
- [x] Tests passing
- [x] No chat functionality regressions

---

**Impact**: Measure chatbot ROI
**Effort**: 1-2h
**Created**: 2025-11-19
