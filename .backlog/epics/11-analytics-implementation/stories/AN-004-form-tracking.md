# [AN-004] Add Form Submission Tracking

## Metadata
- **Story ID**: AN-004
- **Epic**: EPIC-011
- **Priorità**: 🔴 Critical (P0)
- **Dimensione**: 🟢 S (1h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 To Do

---

## User Story
**Come** Product Manager
**Voglio** tracciare submission del form "Ask Me Anything" con success/error status
**Per** misurare lead generation effectiveness e form completion rate

---

## Acceptance Criteria
- [ ] Form submit tracciato (`form_submit`, `form_type: 'anonymous_question'`)
- [ ] Include `success: boolean` e `error` se fallisce
- [ ] Optional metadata: `questionLength` per analisi engagement
- [ ] Eventi visibili in Umami Dashboard

---

## Implementation Guide

### File to Update
**components/forms/AnonymousQuestionForm.tsx**:

```typescript
import { useAnalytics } from '@/lib/hooks/useAnalytics';

const AnonymousQuestionForm = () => {
  const analytics = useAnalytics();

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        analytics.trackFormSubmit('anonymous_question', true, {
          questionLength: data.question.length,
        });
      } else {
        analytics.trackFormSubmit('anonymous_question', false, {
          error: 'submission_failed',
        });
      }
    } catch (error) {
      analytics.trackFormSubmit('anonymous_question', false, {
        error: error.message,
      });
    }
  };
```

**lib/hooks/useAnalytics.ts** (add method):
```typescript
const trackFormSubmit = (
  formType: string,
  success: boolean,
  metadata?: Record<string, any>
) => {
  trackEvent('form_submit', {
    form_type: formType,
    success,
    ...metadata,
  });
};
```

---

## Event Schema
```typescript
Event: 'form_submit'
Properties: {
  form_type: 'anonymous_question'
  success: boolean
  questionLength?: number
  error?: string
  timestamp: string
}
```

---

## Testing
- [ ] Submit valid question → verify `success: true`
- [ ] Submit invalid question (simulate error) → verify `success: false`, `error` present
- [ ] Umami dashboard: Verify events with properties
- [ ] E2E test

---

## Definition of Done
- [x] Form tracking implemented
- [x] Success/error states tracked
- [x] Events in Umami
- [x] Tests passing

---

**Impact**: Measure lead generation
**Effort**: 1h
**Created**: 2025-11-19
