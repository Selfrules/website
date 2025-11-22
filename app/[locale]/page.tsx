import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import WhatImUpTo from '@/components/sections/WhatImUpTo';
import AskMeAnything from '@/components/sections/AskMeAnything';
import WorkTogether from '@/components/sections/WorkTogether';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Mattia De Luca - Il PM che chiami quando tutti dicono "sì" ma nessuno sa cosa fare',
  description: 'Perché dopo 13 anni ho capito: il problema non è mai quello che ti dicono al primo meeting. Ho fallito come designer e developer. Ora traduco tra business, design e tech quando il tuo team parla tre lingue diverse.',
  openGraph: {
    title: 'Ho fallito come designer. Poi come developer. Ora sono il PM che traduce tra i due.',
    description: '4 anni design. 4 anni dev. 5 anni PM. Quando designer vuole user journey, developer dice technical debt, e business vuole fatturato → io traduco. Senza perdere pezzi.',
    type: 'website',
  },
};

interface PageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: PageProps) {
  const { locale } = params;

  // Enable static rendering for i18n
  setRequestLocale(locale);

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section with new design system */}
        <Hero />

        {/* Journey Timeline */}
        <Journey />

        {/* What I'm Up To Section */}
        <WhatImUpTo locale={locale} />

        {/* Work Together Section */}
        <WorkTogether />

        {/* Ask Me Anything Section */}
        <AskMeAnything locale={locale} />
      </main>
    </>
  );
}
