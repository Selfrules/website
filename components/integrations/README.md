# Integration Widgets

Frontend integration widgets for Mattia's portfolio with neobrutalist design system.

## Overview

This directory contains three main integration widgets:
1. **ChatWidget** - Claude AI-powered chatbot with streaming support
2. **SpotifyWidget** - Now Playing display with auto-refresh
3. **CalendarWidget** - Multi-step appointment booking system

## Installation & Setup

### 1. Install Dependencies

```bash
npm install zustand @tanstack/react-query framer-motion lucide-react react-hook-form @hookform/resolvers zod
```

### 2. Configure Providers

Wrap your app with the required providers:

```tsx
// app/layout.tsx or pages/_app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 3. Add Tailwind Configuration

Ensure these colors are in your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'yellow-primary': '#FFD93D',
        'purple-primary': '#6C5CE7',
      },
      boxShadow: {
        'brutal': '8px 8px 0px #000000',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
};
```

## Usage

### ChatWidget

Floating chat interface with AI-powered conversations.

```tsx
import { ChatWidget } from '@/components/integrations';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
}
```

**Features:**
- Floating button in bottom-right corner
- Expandable chat panel (400x600px)
- Streaming message support
- Session persistence (localStorage)
- Typing indicators
- Error handling with retry

**API Requirements:**
- `POST /api/chat` - Streaming endpoint for chat messages
  - Body: `{ message: string, sessionId?: string }`
  - Response: Server-Sent Events (SSE) with `data:` prefix
  - Format: `{ content: string, done: boolean, error?: string }`

### SpotifyWidget

Display currently playing track from Spotify.

```tsx
import { SpotifyWidget, SpotifyWidgetCompact } from '@/components/integrations';

// Full widget (300x100px)
<SpotifyWidget />

// Compact variant for sidebars
<SpotifyWidgetCompact />
```

**Features:**
- Auto-refresh every 30 seconds
- Playing/paused status indicator
- Album art with 64x64px display
- External link to Spotify
- Skeleton loading states
- Offline fallback

**API Requirements:**
- `GET /api/spotify/now-playing`
  - Response 200: `{ name, artist, album, albumArt, spotifyUrl, isPlaying }`
  - Response 204: Not playing (no content)

### CalendarWidget

Multi-step appointment booking system.

```tsx
import { CalendarWidget } from '@/components/integrations';

export default function BookingPage() {
  return (
    <div className="container mx-auto p-6">
      <CalendarWidget />
    </div>
  );
}
```

**Features:**
- 4-step booking flow:
  1. Date selection (calendar picker)
  2. Time slot selection (available slots grid)
  3. Details form (name, email, reason)
  4. Confirmation (with download/Google Meet links)
- Form validation with Zod
- Optimistic updates
- Step indicator progress
- Responsive design (mobile-friendly)

**API Requirements:**

1. `GET /api/calendar/slots?date={ISO_DATE}`
   - Response: `{ date: string, slots: TimeSlot[] }`
   - TimeSlot: `{ start: string, end: string, available: boolean }`

2. `POST /api/calendar/book`
   - Body: `{ name, email, reason, slot: { start, end } }`
   - Response: `{ id, calendarEventId, googleMeetLink?, icsDownloadUrl }`

## State Management

### Chat Store (Zustand)

```ts
import { useChatStore } from '@/lib/stores/chatStore';

const {
  isOpen,
  currentSession,
  isStreaming,
  openChat,
  closeChat,
  toggleChat,
  addMessage,
  updateLastMessage,
  setStreaming,
  clearSession,
} = useChatStore();
```

**Persistence:** Conversation history is stored in localStorage under `chat-storage`.

### Booking Store (Zustand)

```ts
import { useBookingStore } from '@/lib/stores/bookingStore';

const {
  currentStep,
  selectedDate,
  selectedSlot,
  bookingDetails,
  setStep,
  nextStep,
  previousStep,
  setSelectedDate,
  setSelectedSlot,
  setBookingDetails,
  resetBooking,
} = useBookingStore();
```

## React Query Hooks

### Chat Hook

```ts
import { useChatStream } from '@/lib/hooks/useChat';

const { mutate: sendMessage, isPending, isError, error } = useChatStream();

sendMessage({ message: 'Hello!', sessionId: 'optional-id' });
```

### Spotify Hook

```ts
import { useNowPlaying } from '@/lib/hooks/useSpotify';

const { data: track, isLoading, isError } = useNowPlaying();
// Automatically refetches every 30 seconds
```

### Calendar Hooks

```ts
import { useAvailableSlots, useBooking } from '@/lib/hooks/useCalendar';

// Fetch available time slots
const { data: slotsData, isLoading } = useAvailableSlots(selectedDate);

// Create booking
const { mutate: createBooking, isPending } = useBooking();
createBooking(bookingDetails, {
  onSuccess: (confirmation) => {
    // Handle success
  },
});
```

## Design System

### Neobrutalist Principles

All widgets follow these design rules:

- **Borders:** 3-4px solid black on all interactive elements
- **Shadows:** Hard shadows with 8px offset, no blur (`shadow-brutal`)
- **Border Radius:** 8-12px for cards, full circle for avatars
- **Colors:**
  - Primary: `#FFD93D` (yellow) for highlights
  - Secondary: `#6C5CE7` (purple) for CTAs
  - Black borders and shadows
- **Typography:** Bold for headings, medium for body

### Animations

Purposeful animations using Framer Motion:

- **Button Hover:** Lift effect with `whileHover={{ x: -4, y: -4 }}`
- **Panel Enter:** Scale + fade with spring physics
- **Message Bubbles:** Slide up with fade-in
- **Loading States:** Skeleton loaders and spinners

## Accessibility

All widgets follow WCAG 2.1 AA standards:

- **Keyboard Navigation:** Full support with Tab, Enter, Escape
- **ARIA Labels:** Descriptive labels on all interactive elements
- **Focus Management:** Visible focus indicators
- **Screen Readers:** Proper semantic HTML and announcements
- **Touch Targets:** Minimum 44x44px for mobile
- **Color Contrast:** High contrast for readability

## Error Handling

### Chat Widget
- Network errors → Retry button
- Stream interruption → Partial message preserved
- Session loss → Graceful recovery with new session

### Spotify Widget
- API failure → Error state with retry option
- No content (204) → "Not currently playing" message
- Timeout → Automatic retry after interval

### Calendar Widget
- Slot fetch failure → Error message with back button
- Booking failure → Error alert with retry option
- Form validation → Inline error messages

## Performance Optimizations

- **React Query Caching:** Stale data served immediately while refetching
- **Optimistic Updates:** UI updates before API confirmation
- **Lazy Loading:** Components load on demand
- **Debounced Inputs:** Textarea auto-resize debounced
- **Conditional Polling:** Spotify polling stops when tab inactive

## Testing

### Unit Tests

```bash
npm test -- components/integrations/ChatWidget.spec.tsx
npm test -- components/integrations/SpotifyWidget.spec.tsx
npm test -- components/integrations/CalendarWidget.spec.tsx
```

### E2E Tests (Playwright)

```bash
npm run test:e2e -- tests/integrations.spec.ts
```

## Customization

### Theme Overrides

Override colors in `tailwind.config.js`:

```js
colors: {
  'yellow-primary': '#YOUR_COLOR',
  'purple-primary': '#YOUR_COLOR',
}
```

### Widget Sizing

Adjust sizes via className overrides:

```tsx
<div className="max-w-[600px]"> {/* Custom width */}
  <CalendarWidget />
</div>
```

### API Endpoints

Change API paths in hook files:
- `/lib/hooks/useChat.ts`
- `/lib/hooks/useSpotify.ts`
- `/lib/hooks/useCalendar.ts`

## Troubleshooting

### Chat Widget Not Streaming
- Ensure API returns SSE format with `data:` prefix
- Check CORS headers allow streaming
- Verify response Content-Type: `text/event-stream`

### Spotify Widget Always Offline
- Check API key configuration
- Verify `/api/spotify/now-playing` returns 200 or 204
- Ensure token refresh is working

### Calendar Widget Slots Not Loading
- Verify date format is ISO 8601
- Check timezone handling in API
- Ensure slots array has correct structure

## License

MIT - Part of Mattia's Portfolio Project
