import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import WhatImUpTo from '@/components/sections/WhatImUpTo';
import AskMeAnything from '@/components/sections/AskMeAnything';
import WorkTogether from '@/components/sections/WorkTogether';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Mattia De Luca - PM che parla designer e scrive codice',
  description: 'Ho fallito come designer. Poi come developer. Ora sono il PM che vuoi quando nessuno capisce cosa il team tecnico sta dicendo.',
  openGraph: {
    title: 'Mattia De Luca - PM che parla designer e scrive codice',
    description: '3 anni come designer. 5 come developer. 12 come PM. Traduco tra business, design e tech senza perdere pezzi per strada.',
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
