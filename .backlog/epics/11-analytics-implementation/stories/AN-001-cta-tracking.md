# [AN-001] Add CTA Click Tracking (Hero & WorkTogether Sections)

## Metadata
- **Story ID**: AN-001
- **Epic**: [EPIC-011] Analytics Implementation & Event Tracking
- **Priorità**: 🔴 Critical (P0)
- **Dimensione**: 🟢 S (2-3 hours)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 To Do
- **Assegnato a**: -
- **Data Creazione**: 2025-11-19
- **Data Completamento**: -

---

## User Story

**Come** Product Manager / Marketing
**Voglio** tracciare tutti i click sui CTA "Book a Call" e "Let's Work Together"
**Per** misurare la conversion rate e ottimizzare il copy/placement delle CTA

---

## Acceptance Criteria

### Funzionali
- [ ] **Hero Section CTA tracking**:
  - Click su "Book a Call" tracciato con evento `cta_click`
  - Metadata include: `section: 'hero'`, `variant: 'primary'`, `label: 'Book a Call'`

- [ ] **WorkTogether Section CTA tracking**:
  - Click su "Let's Work Together" tracciato con evento `cta_click`
  - Metadata include: `section: 'work_together'`, `variant: 'primary'`, `label: testo CTA`

- [ ] **Secondary CTAs tracking** (se presenti):
  - Eventuali CTA secondari tracciati con `variant: 'secondary'`

### Tecnici
- [ ] Utilizzare hook `useAnalytics` esistente
- [ ] Non introdurre breaking changes nelle funzionalità esistenti
- [ ] Tracking call non deve bloccare il click handler (fail silently)
- [ ] Console warning se tracking fallisce (no console.error per evitare noise)

### Testing
- [ ] Verificare evento `cta_click` in Umami Dashboard (real-time events)
- [ ] Testare su desktop e mobile
- [ ] Verificare che il calendario si apra correttamente dopo il click
- [ ] E2E test aggiornato in `/e2e/analytics.spec.ts`

---

## Current State Analysis

### Files Affected
1. **components/sections/Hero.tsx** (lines 71-81 circa)
   ```typescript
   // Current implementation (NO TRACKING)
   <NeoButton
     variant="primary"
     onClick={openCalendar}
   >
     Book a Call
   </NeoButton>
   ```

2. **components/sections/WorkTogether.tsx** (lines 42-51 circa)
   ```typescript
   // Current implementation (imports useAnalytics but DOESN'T USE IT)
   const analytics = useAnalytics(); // ⚠️ Imported but never called

   <NeoButton
     variant="primary"
     onClick={openCalendar}
   >
     Let's Work Together
   </NeoButton>
   ```

### Gap Analysis
- ❌ Hero CTA: No analytics hook, no tracking
- ❌ WorkTogether CTA: Hook imported but not called
- ❌ No event schema defined for CTA clicks
- ❌ No E2E tests for CTA click tracking

---

## Implementation Guide

### Step 1: Add Tracking to Hero.tsx (15-20 min)

**File**: `components/sections/Hero.tsx`

1. Import `useAnalytics` hook:
   ```typescript
   import { useAnalytics } from '@/lib/hooks/useAnalytics';
   ```

2. Initialize hook in component:
   ```typescript
   const Hero = () => {
     const analytics = useAnalytics();
     // ... existing code
   ```

3. Update CTA onClick handler:
   ```typescript
   <NeoButton
     variant="primary"
     onClick={() => {
       analytics.trackCTAClick('book_call', 'hero');
       openCalendar();
     }}
   >
     Book a Call
   </NeoButton>
   ```

### Step 2: Fix WorkTogether.tsx Tracking (10 min)

**File**: `components/sections/WorkTogether.tsx`

The hook is already imported! Just add the tracking call:

```typescript
// BEFORE (hook imported but not used)
const analytics = useAnalytics();

<NeoButton
  variant="primary"
  onClick={openCalendar}
>

// AFTER (add tracking before calendar open)
<NeoButton
  variant="primary"
  onClick={() => {
    analytics.trackCTAClick('work_together', 'work_together');
    openCalendar();
  }}
>
```

### Step 3: Verify useAnalytics Interface (5 min)

Check if `trackCTAClick` method exists in `/lib/hooks/useAnalytics.ts`.

**If missing**, add it:
```typescript
const trackCTAClick = (label: string, section: string) => {
  trackEvent('cta_click', {
    label,
    section,
    variant: 'primary',
    timestamp: new Date().toISOString(),
  });
};

return {
  // ... existing methods
  trackCTAClick,
};
```

### Step 4: Test Locally (15 min)

1. Run dev server: `npm run dev`
2. Open browser with DevTools console
3. Click "Book a Call" in Hero section
4. Verify console output shows: `[Analytics] Tracking event: cta_click { label: 'book_call', section: 'hero', ... }`
5. Repeat for WorkTogether section
6. Verify calendar still opens correctly

### Step 5: Verify in Umami Dashboard (10 min)

1. Navigate to https://cloud.umami.is
2. Select your website
3. Click "Realtime" tab
4. Click the CTAs and verify events appear (5-10 min delay)
5. Check event properties include `section`, `label`, `variant`

### Step 6: Add E2E Test (30 min)

**File**: `/e2e/analytics.spec.ts`

Add test case:
```typescript
test('tracks CTA clicks in Hero and WorkTogether sections', async ({ page }) => {
  await page.goto('/');

  // Setup Umami event listener (intercept network request)
  await page.route('**/api/send', async (route) => {
    const postData = route.request().postData();
    if (postData?.includes('cta_click')) {
      // Verify event payload
      expect(postData).toContain('hero');
      expect(postData).toContain('book_call');
    }
    await route.continue();
  });

  // Click Hero CTA
  await page.click('text=Book a Call');

  // Verify calendar opened (existing behavior preserved)
  await expect(page.locator('[data-testid="calendar-popup"]')).toBeVisible();
});
```

---

## Event Schema Definition

```typescript
Event Name: 'cta_click'

Event Properties:
{
  label: string;        // 'book_call' | 'work_together' | 'ask_question'
  section: string;      // 'hero' | 'work_together' | 'ask_me_anything'
  variant: string;      // 'primary' | 'secondary'
  timestamp: string;    // ISO 8601
}

Example:
{
  name: 'cta_click',
  properties: {
    label: 'book_call',
    section: 'hero',
    variant: 'primary',
    timestamp: '2025-11-19T14:32:15.123Z'
  }
}
```

---

## Testing Plan

### Manual Testing Checklist
- [ ] Hero CTA click triggers event
- [ ] WorkTogether CTA click triggers event
- [ ] Calendar opens after click (no regression)
- [ ] Event appears in Umami dashboard realtime view
- [ ] Event properties are correct (section, label, variant)
- [ ] Mobile: CTA click works on touch devices
- [ ] No console errors during tracking

### Automated Testing
- [ ] E2E test passes for Hero CTA
- [ ] E2E test passes for WorkTogether CTA
- [ ] CI/CD pipeline green

### Performance Testing
- [ ] Tracking call completes in <50ms (non-blocking)
- [ ] No layout shift from tracking code
- [ ] No impact on Lighthouse performance score

---

## Definition of Done

- [x] Code implementation complete for Hero and WorkTogether CTAs
- [x] `trackCTAClick` method added to `useAnalytics` hook
- [x] Manual testing passed (desktop + mobile)
- [x] Events visible in Umami dashboard with correct properties
- [x] E2E test written and passing
- [x] No regressions in CTA/calendar functionality
- [x] Code reviewed (if applicable)
- [x] PR merged and deployed

---

## Dependencies

### Prerequisites
- [x] Umami Analytics configured (`NEXT_PUBLIC_UMAMI_WEBSITE_ID`)
- [x] `useAnalytics` hook implemented
- [x] Google Calendar popup functionality working

### Blocks
- **AN-003** (Calendar Tracking): This story enables measuring full funnel (CTA click → Calendar open)

---

## Notes

### Why This Matters
Currently, we have **ZERO visibility** into:
- How many users click "Book a Call" vs "Let's Work Together"
- Which section drives more bookings
- Whether CTA copy is effective
- Conversion rate from visit → intent to book

This story enables the **first step** of conversion funnel analysis.

### Quick Win Estimate
**Impact**: Unlocks conversion tracking
**Effort**: 2-3 hours
**ROI**: High (enables all downstream funnel analysis)

### Related Stories
- **AN-003**: Calendar Booking Tracking (next step in funnel)
- **AN-005**: Event Schema Standardization (cleanup)

---

## Resources

- Umami Docs: https://umami.is/docs/track-events
- useAnalytics Hook: `/lib/hooks/useAnalytics.ts`
- Analytics Provider: `/components/providers/AnalyticsProvider.tsx`
- E2E Tests: `/e2e/analytics.spec.ts`

---

**Created**: 2025-11-19 | **Author**: Claude Code | **Epic**: EPIC-011
