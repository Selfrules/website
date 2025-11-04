import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import Projects from '@/components/sections/Projects';
import Blog from '@/components/sections/Blog';
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

      {/* Projects Showcase */}
      <Projects />

      {/* Blog Section with MDX Posts */}
      <Blog locale={locale} />

      {/* Contact/CTA Section - Coming Soon */}
      <section id="contact" className="brutal-section bg-accent/5 dark:bg-accent/10">
        <div className="brutal-container">
          <h2 className="text-h1 font-bold text-center mb-12">Lavoriamo insieme</h2>
          <div className="flex items-center justify-center h-64 border-brutal border-dashed border-black/20 rounded-brutal">
            <p className="text-xl text-brutalist-text-light/50">Contact form coming soon...</p>
          </div>
        </div>
      </section>
    </main>
  );
}
