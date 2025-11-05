import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import WhatImUpTo from '@/components/sections/WhatImUpTo';
import Blog from '@/components/sections/Blog';
import AskMeAnything from '@/components/sections/AskMeAnything';
import WorkTogether from '@/components/sections/WorkTogether';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mattia Cintura - Product Manager & Developer',
  description: 'Product Manager che ha fallito come designer e developer, ora costruisce prodotti che risolvono problemi reali.',
  openGraph: {
    title: 'Mattia Cintura - Product Manager & Developer',
    description: 'Dal fallimento al successo: la storia di un PM che sa davvero cosa costruire',
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

  return (
    <main className="min-h-screen">
      {/* Hero Section with new design system */}
      <Hero />

      {/* Journey Timeline */}
      <Journey />

      {/* What I'm Up To Section */}
      <WhatImUpTo locale={locale} />

      {/* Blog Section with MDX Posts */}
      <Blog locale={locale} />

      {/* Ask Me Anything Section */}
      <AskMeAnything locale={locale} />

      {/* Work Together Section */}
      <WorkTogether />
    </main>
  );
}
