import type { Metadata } from 'next';
import { spaceGrotesk, inter, jetbrainsMono } from './fonts';
import ChatTrigger from '@/components/chat/ChatTrigger';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { UmamiScript } from '@/components/analytics/UmamiScript';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Mattia Filippo De Luca - Product Manager & Developer',
    template: '%s | Mattia Filippo De Luca',
  },
  description: 'Product Manager che ha fallito come designer e developer, ora costruisce prodotti che risolvono problemi reali.',
  keywords: ['Product Manager', 'Product Design', 'Full-stack Developer', 'UX Design', 'Product Strategy'],
  authors: [{ name: 'Mattia Filippo De Luca' }],
  creator: 'Mattia Filippo De Luca',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    alternateLocale: 'en_US',
    url: 'https://mattiacintura.com',
    siteName: 'Mattia Filippo De Luca Portfolio',
    title: 'Mattia Filippo De Luca - Product Manager & Developer',
    description: 'Dal fallimento al successo: la storia di un PM che sa davvero cosa costruire',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale?: string };
}) {
  return (
    <html lang={params?.locale || 'it'} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body bg-brutalist-bg-light text-brutalist-text-light antialiased`}
        suppressHydrationWarning
      >
        <UmamiScript />
        <ReactQueryProvider>
          {children}
          <ChatTrigger />
        </ReactQueryProvider>
      </body>
    </html>
  );
}