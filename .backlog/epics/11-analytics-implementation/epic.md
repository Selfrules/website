# [EPIC-011] Analytics Implementation & Event Tracking

## Metadata
- **Epic ID**: EPIC-011
- **Priorità**: 🔴 Alta
- **Stato**: 📋 Not Started
- **Execution Environment**: 🌐 Claude Code Web
- **Stima Totale**: S (3-5 giorni)
- **Data Creazione**: 2025-11-19
- **Ultima Modifica**: 2025-11-19

## Contesto e Problema

### Problema Corrente
L'infrastruttura Umami Analytics è configurata al **100%** ma l'integrazione effettiva è solo al **20%**. Audit completo ha identificato **critical tracking gaps** nelle user journey più importanti:

**Infrastructure Status**: ✅ Complete
- UmamiScript component: ✅ Configured
- Analytics hook (`useAnalytics`): ✅ Implemented with dual tracking
- AnalyticsProvider: ✅ Wrapping app with auto page views
- API layer: ✅ Firebase + Umami integration ready

**Integration Status**: 🔴 Critical Gaps (20% coverage)
- **CTA Clicks**: 0% tracked (Hero, WorkTogether sections)
- **Chat Interactions**: 0% tracked (open/close/messages)
- **Calendar Bookings**: 0% tracked (popup open/confirm/close)
- **Form Submissions**: 0% tracked (anonymous questions)
- **Blog Views**: Not yet live
- **Outbound Links**: 0% tracked (social media, external references)

### Impatto
- **Business**:
  - Cannot measure conversion funnel effectiveness (booking CTA → Calendar open → Confirmed)
  - No data to optimize marketing spend and CTA placement
  - Cannot justify continued AI chatbot investment (no engagement metrics)
  - Missing critical insights on user behavior and content performance

- **Decisioni Data-Driven Impossibili**:
  - Which CTAs convert better?
  - Do users engage with the chat?
  - Where do users drop off in booking flow?
  - Which blog posts drive traffic?
  - What's the actual conversion rate?

- **Compliance**:
  - GDPR: ✅ Umami is privacy-first (no cookies, no PII)
  - Session tracking: ⚠️ Limited (sessionStorage cleared on tab close)

### Audit Report
Full analysis: `/home/user/website/ANALYTICS_AUDIT_REPORT.md`

## Obiettivo

### Risultato Atteso
Implementare **100% event tracking coverage** su tutti i critical user paths per abilitare data-driven decisions.

### Conversion Funnel Target
```
User Journey                          Current  Target
├─ Land on homepage                   ✅ 100%  ✅ 100%
├─ Scroll depth (25/50/75/100%)       ✅ 100%  ✅ 100%
├─ Click "Book a Call" CTA            🔴 0%    ✅ 100%
├─ Calendar popup opens               🔴 0%    ✅ 100%
├─ Browse available slots             🔴 0%    ⚠️ N/A (iframe CORS)
└─ Booking confirmed                  🔴 0%    ⚠️ Partial (infer from close)

Chat Journey:
├─ Chat button visible                ✅ Auto  ✅ Auto
├─ Chat opened                        🔴 0%    ✅ 100%
├─ Message sent                       🔴 0%    ✅ 100%
└─ Chat closed                        🔴 0%    ✅ 100%

Content Journey:
├─ Blog card clicked                  🔴 0%    ✅ 100%
├─ Article read (scroll depth)        🔴 0%    ✅ 100%
└─ Outbound link clicked              🔴 0%    ✅ 100%
```

### Metriche di Successo
- [x] **CTA Tracking**: 100% CTAs tracked (Hero, WorkTogether, Blog, Calendar triggers)
- [x] **Chat Tracking**: Open/close/message events tracked
- [x] **Calendar Tracking**: Popup open/close tracked, booking intent inferred
- [x] **Form Tracking**: Anonymous question submissions tracked with success/error states
- [x] **Blog Tracking**: Article views, read depth, shares tracked
- [x] **Outbound Tracking**: Social links, external references tracked
- [x] **Event Schema**: Consistent naming with EventTypes enum
- [x] **Dashboard Verification**: All events visible in Umami Cloud dashboard

## User Stories

### Critical Path (P0 - Settimana 1)
- [ ] [AN-001](./stories/AN-001-cta-tracking.md) Add CTA Click Tracking (Hero, WorkTogether) (🔴 S, 2-3h)
- [ ] [AN-002](./stories/AN-002-chat-tracking.md) Add Chat Interaction Tracking (🔴 S, 1-2h)
- [ ] [AN-003](./stories/AN-003-calendar-tracking.md) Add Calendar Booking Tracking (🔴 S, 1-2h)
- [ ] [AN-004](./stories/AN-004-form-tracking.md) Add Form Submission Tracking (🔴 S, 1h)

### High Priority (P1 - Settimana 1-2)
- [ ] [AN-005](./stories/AN-005-event-schema.md) Create EventTypes Constant & Schema Docs (🟠 S, 2h)
- [ ] [AN-006](./stories/AN-006-outbound-tracking.md) Add Outbound Link Tracking (🟠 S, 1-2h)
- [ ] [AN-007](./stories/AN-007-dashboard-validation.md) Verify Events in Umami Dashboard (🟠 S, 1h)

### Medium Priority (P2 - Future)
- [ ] [AN-008](./stories/AN-008-blog-tracking.md) Add Blog Post View & Engagement Tracking (🟡 M, 2-3h)
- [ ] [AN-009](./stories/AN-009-session-persistence.md) Improve Session Persistence (🟡 M, 3-4h)

## Dipendenze

### Dipendenze Tecniche
- ✅ Umami Cloud account configured (`NEXT_PUBLIC_UMAMI_WEBSITE_ID`)
- ✅ `useAnalytics` hook already implemented
- ✅ Firebase Firestore for custom analytics storage
- ✅ Event validation with Zod schemas

### Dipendenze da Altre Epiche
- **EPIC-002** (Google Calendar): Calendar tracking depends on popup functionality
- **EPIC-004** (Chatbot): Chat tracking depends on ChatInterface/ChatTrigger components
- **EPIC-006** (Blog): Blog tracking depends on blog posts being live

**Note**: Può essere eseguita in parallelo con tutte le altre epiche (nessuna dipendenza bloccante)

## Vincoli e Considerazioni

### Vincoli Tecnici
- **CORS Limitation**: Google Calendar iframe booking completion cannot be directly tracked (inferire da popup close)
- **Session Storage**: Current implementation clears on tab close (AN-009 addresses this)
- **Privacy**: Umami is GDPR-compliant (no cookies, no PII), mantenere questo standard

### Vincoli di Business
- Non rallentare l'esperienza utente con tracking overhead
- Evitare tracking invasivo o PII collection
- Dashboard Umami deve rimanere leggibile (no event spam)

### Best Practices
- **Event Naming Convention**: Usare `snake_case` (es: `cta_click`, `chat_opened`)
- **Event Properties**: Includere sempre `section`, `variant`, `metadata` quando rilevante
- **Error Handling**: Tracking failure non deve bloccare funzionalità (fail silently con console.warn)
- **Testing**: Verificare eventi in Umami dashboard prima di merge
- **Documentation**: Aggiornare event schema docs in `lib/analytics/umami.ts`

## Ordine di Esecuzione Raccomandato

### Day 1-2: Critical Path (P0)
**Target**: Track 80% of critical conversion funnel
1. **AN-001**: CTA Tracking (2-3h) → Abilita conversion funnel measurement
2. **AN-002**: Chat Tracking (1-2h) → Measure chatbot engagement
3. **AN-003**: Calendar Tracking (1-2h) → Track booking intent
4. **AN-004**: Form Tracking (1h) → Track lead generation

**Impact**: Da 20% a 80% coverage in 1-2 giorni

### Day 3: High Priority (P1)
**Target**: Reach 95% coverage + validation
5. **AN-005**: Event Schema (2h) → Standardize naming, prevent drift
6. **AN-006**: Outbound Tracking (1-2h) → Track social referrals
7. **AN-007**: Dashboard Validation (1h) → Verify all events flowing correctly

**Impact**: Da 80% a 95% coverage + confidence in data quality

### Future (P2)
8. **AN-008**: Blog Tracking (quando blog è live)
9. **AN-009**: Session Persistence (quando serve cross-tab tracking)

**Total Effort**: ~10-15 ore (1.5-2 giorni di lavoro effettivo)

## Note e Risorse

### Current Implementation Files
```
✅ components/analytics/UmamiScript.tsx
✅ lib/analytics/umami.ts (trackEvent, trackPageView)
✅ lib/hooks/useAnalytics.ts (dual tracking: custom API + Umami)
✅ components/providers/AnalyticsProvider.tsx
✅ app/api/analytics/route.ts (Firebase integration)
```

### Files to Update (Tracking Gaps)
```
🔴 components/sections/Hero.tsx (CTA tracking missing)
🔴 components/sections/WorkTogether.tsx (CTA tracking missing)
🔴 components/chat/ChatTrigger.tsx (chat open/close missing)
🔴 components/chat/ChatInterface.tsx (message send missing)
🔴 components/ui/GoogleCalendarPopup.tsx (popup tracking missing)
🔴 components/forms/AnonymousQuestionForm.tsx (form submit missing)
🔴 components/ui/NeoButton.tsx (could add default onClick tracking)
```

### Event Schema Reference (To Standardize in AN-005)
```typescript
// Current events (auto-tracked)
page_view: { path, title, referrer }
scroll_depth: { depth: 25 | 50 | 75 | 100, path }

// Missing events (to implement)
cta_click: { section: 'hero' | 'work_together', variant: 'primary' | 'secondary' }
chat_interaction: { action: 'opened' | 'closed' | 'message_sent' }
calendar_action: { action: 'opened' | 'closed' | 'booking_intent' }
form_submit: { form_type: 'anonymous_question', success: boolean, metadata? }
blog_view: { slug, title, category }
outbound_click: { url, section: 'social' | 'footer' | 'content' }
```

### Umami Dashboard
- **URL**: https://cloud.umami.is
- **Website ID**: Configured via `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- **Features**:
  - Real-time event tracking
  - Funnel analysis
  - Cohort analysis
  - Custom event filtering
  - No cookie banner needed (GDPR compliant)

### Testing Strategy
1. **Local Testing**: Use `console.log` in `trackEvent` to verify calls
2. **Umami Dashboard**: Check real-time events tab (5-10 min delay)
3. **E2E Tests**: Extend `/home/user/website/e2e/analytics.spec.ts` with new events
4. **Production Monitoring**: Set up dashboard alerts for anomalies

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-19 | Claude | Epic creata da comprehensive analytics audit |
