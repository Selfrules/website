import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
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

      {/* Blog Section with MDX Posts */}
      <Blog locale={locale} />

      {/* Work Together Section */}
      <section id="contact" className="brutal-section bg-gradient-to-b from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10">
        <div className="brutal-container">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black mb-4">
              Come possiamo
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary ml-3">
                lavorare insieme
              </span>
            </h2>
            <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 max-w-2xl mx-auto">
              Non vendo consulenze. Non vendo ore. Vendo risultati. Se hai un problema concreto e vuoi qualcuno che capisca design, tech e business senza bisogno di traduttori, possiamo parlare.
            </p>
          </div>

          {/* Work Modes Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Modalità 1: Consulenze */}
            <div className="brutal-card p-6 hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="inline-flex px-3 py-1 bg-accent/20 text-accent font-bold text-sm rounded-brutal border-2 border-accent mb-4">
                Consulenze strategiche
              </div>
              <h3 className="text-2xl font-bold mb-3">Sblocchiamo il tuo prodotto in 90 minuti</h3>
              <p className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 mb-4">
                Hai un prodotto che non decolla? Un team che gira in tondo? Una roadmap che sembra strategica ma non porta risultati? Prendiamoci 90 minuti.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm"><span className="font-bold">Non aspettarti:</span> Slide bellissime con buzzword.</p>
                <p className="text-sm"><span className="font-bold">Aspettati:</span> Domande dirette, analisi pragmatica, piano d'azione chiaro.</p>
              </div>
              <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                Ideale per: Founder, Product Manager, Tech Lead che sanno di essere bloccati ma non capiscono dove.
              </p>
            </div>

            {/* Modalità 2: Brainstorming */}
            <div className="brutal-card p-6 hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="inline-flex px-3 py-1 bg-secondary/20 text-secondary font-bold text-sm rounded-brutal border-2 border-secondary mb-4">
                Brainstorming sessions
              </div>
              <h3 className="text-2xl font-bold mb-3">Due cervelli, un problema, infinite soluzioni</h3>
              <p className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 mb-4">
                A volte il problema non è che non hai soluzioni. È che ne hai troppe e non sai quale scegliere. O peggio, hai la soluzione sbagliata al problema giusto.
              </p>
              <p className="text-sm mb-4">
                <span className="font-bold">Cosa facciamo:</span> Session di lavoro pratico. Sketch, diagrammi, analisi costi-benefici. Usciamo con prototipi di soluzioni, non solo idee vaghe.
              </p>
              <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                Ideale per: Team in fase di discovery, decisioni architetturali complesse, quando hai bisogno di un esterno che sfidi le tue assunzioni.
              </p>
            </div>

            {/* Modalità 3: Mentorship */}
            <div className="brutal-card p-6 hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="inline-flex px-3 py-1 bg-primary/20 text-primary font-bold text-sm rounded-brutal border-2 border-primary mb-4">
                Mentorship
              </div>
              <h3 className="text-2xl font-bold mb-3">Il percorso che avrei voluto qualcuno mi mostrasse</h3>
              <p className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 mb-4">
                Sei un designer che vuole capire lo sviluppo? Uno sviluppatore che vuole passare al product? Un PM junior che vuole crescere?
              </p>
              <p className="text-sm mb-4">
                <span className="font-bold">Formato:</span> 1 ora ogni 2 settimane. Analisi del tuo lavoro attuale. Consigli pratici. Accesso a template e framework che uso io.
              </p>
              <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                Non è per te se cerchi qualcuno che ti dica cosa fare. È per te se vuoi imparare a pensare, non solo eseguire.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-accent text-white font-bold border-brutal border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
              Parliamo del tuo progetto →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
