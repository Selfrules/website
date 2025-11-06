# Integration Widgets - Quick Start Guide

Get up and running with the integration widgets in 5 minutes.

## 1. Install Dependencies (1 minute)

```bash
npm install zustand @tanstack/react-query framer-motion lucide-react react-hook-form @hookform/resolvers zod
```

## 2. Configure Tailwind (30 seconds)

Add to `tailwind.config.js`:

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

## 3. Add React Query Provider (1 minute)

Update your root layout:

```tsx
// app/layout.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

## 4. Use the Widgets (30 seconds)

### Chat Widget (Global)

```tsx
// app/layout.tsx
import { ChatWidget } from '@/components/integrations';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <ChatWidget /> {/* Floating button in bottom-right */}
    </>
  );
}
```

### Spotify Widget (Footer/Sidebar)

```tsx
// components/Footer.tsx
import { SpotifyWidget } from '@/components/integrations';

export function Footer() {
  return (
    <footer>
      <SpotifyWidget />
    </footer>
  );
}
```

### Calendar Widget (Booking Page)

```tsx
// app/book/page.tsx
import { CalendarWidget } from '@/components/integrations';

export default function BookingPage() {
  return (
    <main className="container mx-auto p-6">
      <CalendarWidget />
    </main>
  );
}
```

## 5. Set Up API Endpoints (2 minutes)

Create these API routes:

### Chat API
```tsx
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { message } = await request.json();

  // TODO: Implement streaming with Claude API
  // Return SSE format: data: {"content": "...", "done": false}

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}
```

### Spotify API
```tsx
// app/api/spotify/now-playing/route.ts
export async function GET() {
  // TODO: Fetch from Spotify API

  // If playing
  return Response.json({
    name: 'Song Name',
    artist: 'Artist',
    album: 'Album',
    albumArt: 'https://...',
    spotifyUrl: 'https://open.spotify.com/...',
    isPlaying: true,
  });

  // If not playing
  return new Response(null, { status: 204 });
}
```

### Calendar APIs
```tsx
// app/api/calendar/slots/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  // TODO: Fetch available slots from Google Calendar

  return Response.json({
    date,
    slots: [
      { start: '2024-01-15T10:00:00Z', end: '2024-01-15T10:30:00Z', available: true },
      // ...
    ],
  });
}

// app/api/calendar/book/route.ts
export async function POST(request: Request) {
  const { name, email, reason, slot } = await request.json();

  // TODO: Create Google Calendar event

  return Response.json({
    id: 'BOOK-123',
    calendarEventId: 'event-id',
    googleMeetLink: 'https://meet.google.com/...',
    icsDownloadUrl: '/api/calendar/ics?id=123',
  });
}
```

## 6. Test It Out!

Start your dev server:

```bash
npm run dev
```

Visit your app and:
1. ✅ Click the chat button (bottom-right)
2. ✅ See Spotify widget (footer)
3. ✅ Navigate to `/book` for calendar

## What's Next?

### Essential
1. Implement the API endpoints (see `README.md` for details)
2. Set up environment variables for API keys
3. Test on mobile devices

### Recommended
1. Add analytics tracking (see `USAGE_EXAMPLES.md`)
2. Configure error monitoring (Sentry)
3. Run accessibility audit
4. Performance testing with Lighthouse

### Optional
1. Customize colors in Tailwind config
2. Add Storybook for development
3. Set up E2E tests
4. Add more features (see `IMPLEMENTATION_SUMMARY.md`)

## Need Help?

- **Full Documentation:** `README.md`
- **Usage Examples:** `USAGE_EXAMPLES.md`
- **Implementation Details:** `IMPLEMENTATION_SUMMARY.md`
- **TypeScript Types:** `/types/integrations.ts`
- **State Stores:** `/lib/stores/`
- **React Query Hooks:** `/lib/hooks/`

## Common Issues

### Widget not showing
- Check React Query provider is in place
- Verify Tailwind config includes custom colors
- Check browser console for errors

### API errors
- Verify API endpoints exist and return correct format
- Check environment variables are set
- Test API endpoints directly with curl/Postman

### Styling issues
- Ensure Tailwind processes the component files
- Check custom colors are defined in config
- Verify `border-3` and `shadow-brutal` utilities exist

## Quick Command Reference

```bash
# Install dependencies
npm install

# Run development
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Test
npm test

# Build
npm run build
```

---

**Estimated setup time:** 5 minutes
**Estimated API implementation time:** 2-3 hours
**Ready for production:** After API implementation and testing
