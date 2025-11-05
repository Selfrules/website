import type { Metadata } from 'next';
import { spaceGrotesk, inter, jetbrainsMono } from './fonts';
import { ThemeProvider } from '@/components/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mattia | Product Manager',
  description: 'Product Manager che ha fatto il percorso al contrario. Designer → Developer → PM.',
  keywords: ['Product Manager', 'Design', 'Development', 'Portfolio'],
  authors: [{ name: 'Mattia' }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    title: 'Mattia | Product Manager',
    description: 'Product Manager che ha fatto il percorso al contrario',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body bg-brutalist-bg-light dark:bg-brutalist-bg-dark text-brutalist-text-light dark:text-brutalist-text-dark antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
