# Integration Widgets - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ ChatWidget   │  │SpotifyWidget │  │CalendarWidget│        │
│  │              │  │              │  │              │        │
│  │ • FloatingBtn│  │ • AlbumArt   │  │ • DatePicker │        │
│  │ • ChatPanel  │  │ • TrackInfo  │  │ • TimeSlots  │        │
│  │ • Messages   │  │ • Status     │  │ • BookingForm│        │
│  │ • Input      │  │              │  │ • Confirm    │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                 │                  │                 │
└─────────┼─────────────────┼──────────────────┼─────────────────┘
          │                 │                  │
          ▼                 ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────┐        ┌─────────────────────┐       │
│  │   Zustand Stores    │        │   React Query       │       │
│  │                     │        │                     │       │
│  │  • chatStore        │        │  • useChatStream    │       │
│  │    - isOpen         │        │  • useNowPlaying    │       │
│  │    - currentSession │        │  • useAvailableSlots│       │
│  │    - isStreaming    │        │  • useBooking       │       │
│  │                     │        │                     │       │
│  │  • bookingStore     │        │  Cache & Polling:   │       │
│  │    - currentStep    │        │  • 30s Spotify poll │       │
│  │    - selectedDate   │        │  • 5min slots cache │       │
│  │    - selectedSlot   │        │  • Optimistic updates│       │
│  │    - bookingDetails │        │                     │       │
│  └─────────────────────┘        └─────────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
          │                                       │
          ▼ (localStorage)                       ▼ (API calls)
┌─────────────────────────────────────────────────────────────────┐
│                         PERSISTENCE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────┐              ┌────────────────┐           │
│  │  localStorage  │              │   API Routes   │           │
│  │                │              │                │           │
│  │  chat-storage: │              │  /api/chat     │           │
│  │  {             │              │  /api/spotify  │           │
│  │    currentSess │              │  /api/calendar │           │
│  │    messages[]  │              │                │           │
│  │  }             │              │  SSE Streaming │           │
│  └────────────────┘              │  REST Responses│           │
│                                  └────────┬───────┘           │
└─────────────────────────────────────────┼─────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   Claude    │  │   Spotify   │  │   Google    │           │
│  │     API     │  │   Web API   │  │  Calendar   │           │
│  │             │  │             │  │     API     │           │
│  │ • Streaming │  │ • Now Playing│ │ • Events    │           │
│  │ • Context   │  │ • Token     │  │ • Free/Busy │           │
│  │ • Messages  │  │   Refresh   │  │ • Meet Link │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

### ChatWidget Tree
```
ChatWidget
├── ChatButton
│   └── Icon (MessageCircle/X with animation)
└── ChatPanel (AnimatePresence)
    ├── ChatHeader
    │   ├── Title & Subtitle
    │   └── Actions (Reset, Close)
    ├── MessageList
    │   ├── MessageBubble[] (user/assistant)
    │   ├── TypingIndicator (when streaming)
    │   └── ScrollRef
    └── ChatInput
        ├── Textarea (auto-resize)
        ├── SendButton
        └── ErrorAlert (conditional)
```

### SpotifyWidget Tree
```
SpotifyWidget
├── SpotifySkeleton (loading state)
├── SpotifyError (error state)
├── SpotifyOffline (not playing state)
└── SpotifyNowPlaying (active state)
    ├── AlbumArt (with border)
    ├── TrackInfo
    │   ├── SongTitle
    │   ├── Artist
    │   └── Status (playing/paused)
    └── ExternalLinkIcon
```

### CalendarWidget Tree
```
CalendarWidget
├── StepIndicator
│   ├── StepCircle[4] (numbered)
│   └── ConnectingLine[3] (progress)
└── AnimatePresence (step content)
    ├── CalendarPicker (step 1)
    │   ├── MonthNavigation
    │   ├── DayLabels
    │   ├── CalendarGrid
    │   │   └── DayButton[28-31]
    │   ├── SelectedDateDisplay
    │   ├── Legend
    │   └── ContinueButton
    ├── TimeSlotGrid (step 2)
    │   ├── DateHeader
    │   ├── SlotsGrid
    │   │   └── SlotButton[n]
    │   ├── SelectedSlotDisplay
    │   └── Actions (Back, Continue)
    ├── BookingForm (step 3)
    │   ├── BookingSummary
    │   ├── Form
    │   │   ├── NameInput
    │   │   ├── EmailInput
    │   │   └── ReasonTextarea
    │   ├── ErrorAlert (conditional)
    │   └── Actions (Back, Submit)
    └── BookingConfirmation (step 4)
        ├── SuccessIcon (animated)
        ├── SuccessMessage
        ├── BookingDetailsCard
        │   ├── ConfirmationID
        │   ├── Attendee
        │   ├── DateTime
        │   └── Purpose
        ├── ActionButtons
        │   ├── GoogleMeetLink
        │   ├── DownloadICS
        │   └── NewBooking
        └── EmailNotice
```

## Data Flow Patterns

### 1. Chat Stream Flow
```
User types message
    ↓
ChatInput.onSubmit()
    ↓
useChatStream.mutate()
    ↓
chatStore.addMessage(userMessage)
    ↓
POST /api/chat (SSE)
    ↓
chatStore.addMessage(assistantMessage, content: '')
    ↓
For each SSE chunk:
    chatStore.updateLastMessage(accumulatedContent)
    ↓
MessageList auto-scrolls to bottom
    ↓
Stream completes
    ↓
chatStore.setStreaming(false)
```

### 2. Spotify Polling Flow
```
Component mounts
    ↓
useNowPlaying() query executes
    ↓
GET /api/spotify/now-playing
    ↓
Response: SpotifyTrack | null
    ↓
Component renders state
    ↓
Wait 30 seconds
    ↓
If tab active: refetch
    ↓
Repeat
```

### 3. Booking Flow
```
Step 1: Date Selection
    CalendarPicker
        ↓
    User clicks date
        ↓
    bookingStore.setSelectedDate(date)
        ↓
    bookingStore.nextStep() → 'time'

Step 2: Time Selection
    TimeSlotGrid
        ↓
    useAvailableSlots(selectedDate) query
        ↓
    GET /api/calendar/slots?date=...
        ↓
    Render available slots
        ↓
    User clicks slot
        ↓
    bookingStore.setSelectedSlot(slot)
        ↓
    bookingStore.nextStep() → 'details'

Step 3: Form Submission
    BookingForm
        ↓
    User fills form
        ↓
    React Hook Form validation (Zod)
        ↓
    onSubmit → useBooking.mutate()
        ↓
    POST /api/calendar/book
        ↓
    bookingStore.setBookingDetails(data)
        ↓
    bookingStore.nextStep() → 'confirmation'

Step 4: Confirmation
    BookingConfirmation
        ↓
    Display confirmation details
        ↓
    User downloads ICS or opens Meet
        ↓
    Optional: bookingStore.resetBooking()
```

## State Management Strategy

### Zustand Stores (Client State)

**chatStore:**
- **Purpose:** UI state and session management
- **Persistence:** localStorage (session only)
- **Sync:** Manual save/load
- **Scope:** Single device

**bookingStore:**
- **Purpose:** Multi-step flow state
- **Persistence:** None (ephemeral)
- **Sync:** N/A
- **Scope:** Current session

### React Query (Server State)

**useChatStream:**
- **Type:** Mutation
- **Cache:** None (streaming)
- **Retry:** None
- **Side Effects:** Updates chatStore

**useNowPlaying:**
- **Type:** Query
- **Cache:** 20s stale time
- **Refetch:** 30s interval
- **Retry:** 1 attempt

**useAvailableSlots:**
- **Type:** Query
- **Cache:** 5min stale time
- **Refetch:** On window focus
- **Enabled:** When date selected

**useBooking:**
- **Type:** Mutation
- **Cache:** None
- **Retry:** None
- **Side Effects:** Invalidates slots query

## API Integration Patterns

### SSE Streaming (Chat)
```typescript
// Server
export async function POST(request: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Stream chunks
      for await (const chunk of aiStream) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`)
        );
      }
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`)
      );
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}

// Client
const reader = response.body.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value);
  // Parse and process
}
```

### REST API (Spotify, Calendar)
```typescript
// Server
export async function GET() {
  try {
    const data = await fetchExternal();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}

// Client (React Query)
const { data, isLoading, error } = useQuery({
  queryKey: ['key'],
  queryFn: async () => {
    const res = await fetch('/api/endpoint');
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
});
```

## Performance Optimizations

### Bundle Splitting
```
components/integrations/
├── ChatWidget.tsx       → Lazy load on first open
├── SpotifyWidget.tsx    → Static import (small)
└── CalendarWidget.tsx   → Route-level code split
```

### Query Optimization
- **Stale While Revalidate:** Show cached data, fetch in background
- **Polling Control:** Stop when tab inactive
- **Request Deduplication:** Multiple components share same query
- **Optimistic Updates:** UI updates before API confirmation

### Animation Performance
- **GPU Acceleration:** Use `transform` and `opacity`
- **Reduce Repaints:** Absolute positioning for overlays
- **Spring Physics:** Natural, performance-optimized animations
- **Lazy Rendering:** AnimatePresence only renders active step

## Security Considerations

### Client-Side
- **Input Validation:** Zod schemas before API calls
- **XSS Prevention:** React auto-escapes content
- **CSRF Protection:** Same-origin requests only
- **Rate Limiting:** Prevent API spam

### Server-Side
- **API Key Security:** Environment variables only
- **OAuth Tokens:** Refresh token flow
- **Request Validation:** Validate all inputs
- **Rate Limiting:** Per-IP or per-user limits

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Keyboard Navigation:** Tab, Enter, Escape, Arrow keys
- **Focus Management:** Visible focus indicators, focus trap in modals
- **Screen Readers:** ARIA labels, semantic HTML, live regions
- **Color Contrast:** Minimum 4.5:1 for text
- **Touch Targets:** Minimum 44x44px
- **Error Handling:** Clear error messages with context

### Keyboard Shortcuts
- **Chat:** `Escape` to close, `Enter` to send, `Shift+Enter` for newline
- **Calendar:** Arrow keys for date navigation, `Enter` to select
- **Form:** Tab between fields, `Enter` to submit

## Error Handling Strategy

### Levels
1. **Network Errors:** Retry with exponential backoff
2. **API Errors:** Show user-friendly message with retry
3. **Validation Errors:** Inline form feedback
4. **Unexpected Errors:** Error boundary with fallback UI

### User Feedback
- **Loading States:** Skeletons, spinners, progress indicators
- **Success States:** Animations, confirmation messages
- **Error States:** Clear messages, actionable suggestions
- **Empty States:** Helpful guidance, call-to-action

## Monitoring & Observability

### Client-Side Metrics
- **Performance:** Component render times, API latency
- **Errors:** JavaScript errors, API failures
- **Usage:** Widget open rates, conversion funnels
- **Engagement:** Message counts, booking completions

### Server-Side Metrics
- **API Performance:** Response times, throughput
- **Error Rates:** 4xx, 5xx responses
- **External APIs:** Spotify/Google API health
- **Rate Limiting:** Throttle events

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Static Assets         Next.js App          API Routes │
│  (CDN cached)          (SSR/SSG)            (Serverless)│
│       │                    │                     │      │
│       ▼                    ▼                     ▼      │
│  ┌─────────┐        ┌──────────┐         ┌──────────┐ │
│  │ Widgets │        │ Pages    │         │ /api/*   │ │
│  │ Bundles │        │ rendered │         │ Functions│ │
│  └─────────┘        └──────────┘         └──────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
              ┌──────────────────────────┐
              │   External Services      │
              │  • Claude API            │
              │  • Spotify API           │
              │  • Google Calendar API   │
              └──────────────────────────┘
```

## Scalability Considerations

### Client-Side
- **Code Splitting:** Lazy load non-critical components
- **Tree Shaking:** Remove unused code
- **Image Optimization:** WebP with fallbacks
- **Bundle Analysis:** Monitor size growth

### Server-Side
- **Caching:** Redis for API responses
- **Rate Limiting:** Prevent abuse
- **CDN:** Static assets at edge
- **Database:** Connection pooling

## Testing Strategy

### Unit Tests
- Store actions and selectors
- Hook behavior (mocked API)
- Utility functions
- Validation schemas

### Integration Tests
- Component with stores
- API integration (mocked)
- Form submission flows
- Error scenarios

### E2E Tests
- Complete booking flow
- Chat conversation
- Spotify widget states
- Accessibility navigation

### Visual Tests
- Storybook visual regression
- Cross-browser compatibility
- Mobile responsiveness
- Dark mode variants
