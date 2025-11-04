import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
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
    default: 'Mattia - Product Manager',
    template: '%s | Mattia',
  },
  description:
    'Product Manager with a unique background in design and development. Building products that solve real problems.',
  keywords: [
    'Product Manager',
    'Product Design',
    'Full-stack Developer',
    'UX Design',
    'Product Strategy',
  ],
  authors: [{ name: 'Mattia' }],
  creator: 'Mattia',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    alternateLocale: 'en_US',
    url: 'https://mattia.dev',
    siteName: 'Mattia Portfolio',
    title: 'Mattia - Product Manager',
    description:
      'Product Manager with a unique background in design and development.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-brutalist-bg-light dark:bg-brutalist-bg-dark text-brutalist-text-light dark:text-brutalist-text-dark antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
