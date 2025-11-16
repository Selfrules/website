import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/layout/Footer';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
    <NextIntlClientProvider messages={messages}>
      <Suspense fallback={null}>
        <AnalyticsProvider>
          {/* Skip link for accessibility (WCAG 2.4.1) */}
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <Header locale={locale} />
          <main id="main-content">{children}</main>
          <Footer locale={locale} />
        </AnalyticsProvider>
      </Suspense>
    </NextIntlClientProvider>
  );
}
