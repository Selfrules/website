import type { Metadata } from 'next';
import ChatTrigger from '@/components/chat/ChatTrigger';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { UmamiScript } from '@/components/analytics/UmamiScript';
import { spaceGrotesk, inter, jetbrainsMono } from './fonts';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://selfrules.org'),
  title: {
    default: 'Mattia De Luca - Traduco tra business, design e codice quando il tuo team non si capisce',
    template: '%s | Mattia De Luca',
  },
  description: 'Ho fallito come designer. Poi come developer. Ora traduco quando designer dice "user journey", developer dice "technical debt", e business dice "fatturato". 13 anni di errori → 1 superpower: parlare tre lingue.',
  keywords: [
    'product manager translator',
    'PM che parla design e codice',
    'technical product manager',
    'cross-functional team communication',
    'product strategy pragmatico',
    'business design tech bridge',
    'PM con background design e sviluppo',
  ],
  authors: [{ name: 'Mattia Filippo De Luca' }],
  creator: 'Mattia Filippo De Luca',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon.svg',
        color: '#0D7EFF',
      },
    ],
  },
  alternates: {
    canonical: '/',
    languages: {
      'it-IT': '/it',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    alternateLocale: 'en_US',
    url: 'https://selfrules.org',
    siteName: 'Mattia De Luca',
    title: 'Ho fallito come designer e developer. Ora traduco tra business, design e tech.',
    description: '4 anni design. 4 anni dev. 5 anni PM. Quando il tuo team parla tre lingue diverse (business, design, tech) e nessuno si capisce → io traduco. Senza perdere pezzi.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ho fallito come designer e developer. Ora traduco tra business e tech.',
    description: '13 anni di errori → 1 superpower: parlare business, design e tech. Il PM che chiami quando il team non si capisce.',
    creator: '@mattiadluca',
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: '#0D7EFF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mattia De Luca',
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
        {/* Preconnect to Google Fonts for faster font loading */}
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