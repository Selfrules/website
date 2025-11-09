# Integration Widgets - Usage Examples

Real-world examples for integrating the widgets into Mattia's portfolio.

## Example 1: Global Chat Widget in Layout

Add the chat widget to all pages via the root layout:

```tsx
// app/[locale]/layout.tsx
import { ChatWidget } from '@/components/integrations';

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={cn(spaceGrotesk.variable, inter.variable)}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ChatWidget /> {/* Available on all pages */}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

## Example 2: Spotify Widget in Footer

Display currently playing music in the site footer:

```tsx
// components/layout/Footer.tsx
import { SpotifyWidgetCompact } from '@/components/integrations';

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-white">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-2">Get in touch</h3>
            <p className="text-sm">hello@mattia.dev</p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-2">Follow me</h3>
            <div className="flex gap-3">
              {/* Social icons */}
            </div>
          </div>

          {/* Now Playing */}
          <div>
            <h3 className="font-bold mb-2">Currently listening</h3>
            <SpotifyWidgetCompact />
          </div>
        </div>
      </div>
    </footer>
  );
}
```

## Example 3: Calendar Widget in Dedicated Page

Create a booking page with the calendar widget:

```tsx
// app/[locale]/book/page.tsx
import { CalendarWidget } from '@/components/integrations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Meeting | Mattia',
  description: 'Schedule a consultation or project discussion with Mattia',
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Let's talk about your project
          </h1>
          <p className="text-xl text-black/70 max-w-2xl mx-auto">
            Book a 30-minute call to discuss how we can work together
          </p>
        </div>

        {/* Widget */}
        <div className="max-w-2xl mx-auto">
          <CalendarWidget />
        </div>

        {/* Additional Info */}
        <div className="max-w-2xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 border-3 border-black rounded-lg bg-white">
            <h3 className="font-bold mb-2">📅 Duration</h3>
            <p className="text-sm">30-45 minutes</p>
          </div>
          <div className="p-6 border-3 border-black rounded-lg bg-white">
            <h3 className="font-bold mb-2">💻 Format</h3>
            <p className="text-sm">Google Meet video call</p>
          </div>
          <div className="p-6 border-3 border-black rounded-lg bg-white">
            <h3 className="font-bold mb-2">💰 Cost</h3>
            <p className="text-sm">Free consultation</p>
          </div>
        </div>
      </div>
    </main>
  );
}
```

## Example 4: Homepage Spotify Widget

Show Spotify status on the homepage hero section:

```tsx
// app/[locale]/page.tsx (homepage)
import { SpotifyWidget } from '@/components/integrations';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6">
              Hey, I'm Mattia
            </h1>
            <p className="text-xl mb-8">
              Full-stack developer, problem solver, and builder
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center mb-12">
              <button className="px-8 py-4 bg-yellow-primary border-4 border-black rounded-lg font-bold shadow-brutal">
                View Projects
              </button>
              <button className="px-8 py-4 bg-white border-4 border-black rounded-lg font-bold">
                Get in Touch
              </button>
            </div>

            {/* Spotify Widget */}
            <div className="flex justify-center">
              <SpotifyWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of homepage... */}
    </main>
  );
}
```

## Example 5: Programmatic Chat Opening

Open the chat programmatically from other components:

```tsx
// components/HelpButton.tsx
'use client';

import { useChatStore } from '@/lib/stores/chatStore';
import { MessageCircle } from 'lucide-react';

export function HelpButton() {
  const { openChat } = useChatStore();

  return (
    <button
      onClick={openChat}
      className="fixed bottom-24 right-6 p-3 bg-purple-primary text-white border-3 border-black rounded-full shadow-brutal hover:scale-105 transition-transform"
      aria-label="Need help? Chat with AI"
    >
      <MessageCircle className="w-5 h-5" />
    </button>
  );
}
```

## Example 6: Conditional Chat Based on Page

Only show chat on specific pages:

```tsx
// app/[locale]/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ChatWidget } from '@/components/integrations';

function ConditionalChatWidget() {
  const pathname = usePathname();

  // Only show chat on blog and project pages
  const showChat = pathname.includes('/blog') || pathname.includes('/projects');

  if (!showChat) return null;

  return <ChatWidget />;
}

export default function Layout({ children }) {
  return (
    <>
      {children}
      <ConditionalChatWidget />
    </>
  );
}
```

## Example 7: Quick Booking CTA

Add a quick booking link that scrolls to calendar or opens modal:

```tsx
// components/CTASection.tsx
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-yellow-primary border-y-4 border-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to work together?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Book a free 30-minute call to discuss your project
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-8 py-4 bg-purple-primary text-white border-4 border-black rounded-lg font-bold shadow-brutal hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
        >
          Book a Meeting
        </Link>
      </div>
    </section>
  );
}
```

## Example 8: Sidebar with Multiple Widgets

Combine widgets in a sidebar layout:

```tsx
// components/layout/Sidebar.tsx
import { SpotifyWidgetCompact } from '@/components/integrations';

export function Sidebar() {
  return (
    <aside className="w-64 border-l-4 border-black bg-white p-6 space-y-6">
      {/* Profile Card */}
      <div className="border-3 border-black rounded-lg p-4">
        <img
          src="/avatar.jpg"
          alt="Mattia"
          className="w-20 h-20 rounded-full border-3 border-black mx-auto mb-3"
        />
        <h3 className="font-bold text-center">Mattia</h3>
        <p className="text-sm text-center text-black/60">
          Full-stack Developer
        </p>
      </div>

      {/* Now Playing */}
      <div>
        <h4 className="font-bold text-sm mb-2">Currently listening</h4>
        <SpotifyWidgetCompact />
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="font-bold text-sm mb-2">Quick actions</h4>
        <button className="w-full py-2 px-3 border-2 border-black rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm font-bold">
          Download Resume
        </button>
        <button className="w-full py-2 px-3 border-2 border-black rounded-lg bg-yellow-primary hover:bg-yellow-400 transition-colors text-sm font-bold">
          Book a Call
        </button>
      </div>
    </aside>
  );
}
```

## Example 9: Mobile-Optimized Calendar Modal

Open calendar in a modal on mobile devices:

```tsx
// components/BookingModal.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CalendarWidget } from '@/components/integrations';

export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto px-6 py-3 bg-purple-primary text-white border-3 border-black rounded-lg font-bold"
      >
        Book a Meeting
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 bg-white border-4 border-black rounded-xl shadow-brutal overflow-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Widget */}
              <div className="p-6">
                <CalendarWidget />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

## Example 10: Analytics Integration

Track widget interactions:

```tsx
// lib/analytics.ts
export function trackChatOpen() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'chat_opened', {
      event_category: 'engagement',
      event_label: 'Chat Widget',
    });
  }
}

export function trackBookingStarted() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'booking_started', {
      event_category: 'conversion',
      event_label: 'Calendar Widget',
    });
  }
}

export function trackBookingCompleted(bookingId: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'booking_completed', {
      event_category: 'conversion',
      event_label: 'Calendar Widget',
      value: 1,
      booking_id: bookingId,
    });
  }
}
```

Then use in widgets:

```tsx
// In ChatWidget.tsx
import { trackChatOpen } from '@/lib/analytics';

function ChatButton({ onClick }: ChatButtonProps) {
  const handleClick = () => {
    trackChatOpen();
    onClick();
  };

  return <button onClick={handleClick}>...</button>;
}
```

## Environment Variables

Add these to your `.env.local`:

```env
# Chat API
CLAUDE_API_KEY=sk-ant-xxx

# Spotify API
SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx
SPOTIFY_REFRESH_TOKEN=xxx

# Google Calendar API
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REFRESH_TOKEN=xxx
GOOGLE_CALENDAR_ID=primary
```

## Next Steps

1. Implement API endpoints (`/api/chat`, `/api/spotify/now-playing`, `/api/calendar/*`)
2. Configure OAuth flows for Spotify and Google Calendar
3. Set up error monitoring (Sentry, LogRocket)
4. Add analytics tracking (GA4, PostHog)
5. Test accessibility with screen readers
6. Performance audit with Lighthouse
7. Deploy to production with Vercel

## Support

For issues or questions:
- Check the main README.md in this directory
- Review TypeScript types in `/types/integrations.ts`
- Inspect Zustand stores in `/lib/stores/`
- Debug React Query hooks in `/lib/hooks/`
