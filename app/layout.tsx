import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ChatWidget } from '@/components/integrations/ChatWidget';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Mattia Cintura - Product Manager & Developer',
    template: '%s | Mattia Cintura',
  },
  description: 'Product Manager che ha fallito come designer e developer, ora costruisce prodotti che risolvono problemi reali.',
  keywords: ['Product Manager', 'Product Design', 'Full-stack Developer', 'UX Design', 'Product Strategy'],
  authors: [{ name: 'Mattia Cintura' }],
  creator: 'Mattia Cintura',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    alternateLocale: 'en_US',
    url: 'https://mattiacintura.com',
    siteName: 'Mattia Cintura Portfolio',
    title: 'Mattia Cintura - Product Manager & Developer',
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
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body bg-brutalist-bg-light dark:bg-brutalist-bg-dark text-brutalist-text-light dark:text-brutalist-text-dark antialiased`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <ThemeProvider>
            {children}
            <ChatWidget />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}