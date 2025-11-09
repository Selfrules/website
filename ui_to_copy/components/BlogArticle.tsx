import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Facebook, Link2, ChevronRight } from 'lucide-react';
import { Header } from './Header';

interface BlogArticleProps {
  onBack: () => void;
  article: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    color: string;
    featured?: boolean;
  };
  currentLang?: 'IT' | 'EN';
  onLanguageChange?: (lang: 'IT' | 'EN') => void;
}

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function BlogArticle({ onBack, article, currentLang, onLanguageChange }: BlogArticleProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Mock Table of Contents
  const tableOfContents: TableOfContentItem[] = [
    { id: 'intro', title: 'Introduzione', level: 1 },
    { id: 'problema', title: 'Il problema che ho affrontato', level: 1 },
    { id: 'contesto', title: 'Il contesto del progetto', level: 2 },
    { id: 'sfide', title: 'Le sfide principali', level: 2 },
    { id: 'soluzione', title: 'La mia soluzione', level: 1 },
    { id: 'approccio', title: 'Approccio metodologico', level: 2 },
    { id: 'implementazione', title: 'Implementazione pratica', level: 2 },
    { id: 'risultati', title: 'Risultati e impatto', level: 1 },
    { id: 'metriche', title: 'Metriche chiave', level: 2 },
    { id: 'lezioni', title: 'Lezioni apprese', level: 1 },
    { id: 'conclusione', title: 'Conclusione', level: 1 },
  ];

  // Related articles
  const relatedArticles = [
    {
      id: 2,
      title: 'Product-Led Growth: Da dove iniziare',
      category: 'Strategy',
      readTime: '8 min',
      color: '#7209B7',
    },
    {
      id: 3,
      title: 'Atomic Design per Design Systems scalabili',
      category: 'Design',
      readTime: '12 min',
      color: '#0D7EFF',
    },
    {
      id: 4,
      title: 'Workshop: Come creare roadmap efficaci',
      category: 'Workshop',
      readTime: '6 min',
      color: '#FFD60A',
    },
  ];

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article.title;

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copiato negli appunti!');
    } else if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  // Scroll spy for ToC
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FFFCF2] border-b-4 border-[#000]">
        <div className="container max-w-[1440px] mx-auto px-6 md:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white border-3 border-[#000] rounded-lg shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            Torna al Blog
          </button>
        </div>
      </div>

      <div className="container max-w-[1440px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Table of Contents - Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
                <h3
                  className="mb-4 pb-3 border-b-3 border-[#000]"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                  }}
                >
                  Indice
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded transition-all text-sm ${
                        activeSection === item.id
                          ? 'bg-[#0D7EFF] text-white'
                          : 'text-[#2D2D2D] hover:bg-[#FFFCF2]'
                      } ${item.level === 2 ? 'pl-6' : ''}`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: activeSection === item.id ? 600 : 400,
                      }}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>

                {/* Share Buttons in Sidebar */}
                <div className="mt-6 pt-6 border-t-3 border-[#000]">
                  <h4
                    className="mb-3"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                    }}
                  >
                    Condividi
                  </h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 px-3 py-2 bg-[#1DA1F2] text-white border-3 border-[#000] rounded shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600 }}
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-2 px-3 py-2 bg-[#0A66C2] text-white border-3 border-[#000] rounded shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600 }}
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-2 px-3 py-2 bg-white text-[#0A0A0A] border-3 border-[#000] rounded shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600 }}
                    >
                      <Link2 className="w-4 h-4" />
                      Copia link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Article Header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 border-3 border-[#000] rounded-lg shadow-brutal-sm text-white"
                  style={{
                    backgroundColor: article.color,
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  {article.category}
                </span>
                <div className="flex items-center gap-4 text-[#2D2D2D]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              <h1 className="text-h1 text-[#0A0A0A] mb-4">{article.title}</h1>
              <p className="text-body-large text-[#2D2D2D]">{article.excerpt}</p>

              {/* Mobile Share Button */}
              <div className="lg:hidden mt-6 relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-3 border-[#000] rounded-lg shadow-brutal-sm"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px' }}
                >
                  <Share2 className="w-4 h-4" />
                  Condividi
                </button>

                {showShareMenu && (
                  <div className="absolute top-full mt-2 left-0 bg-white border-3 border-[#000] rounded-lg shadow-brutal p-3 flex flex-col gap-2 min-w-[180px] z-10">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-[#FFFCF2] rounded text-left"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                    >
                      <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-[#FFFCF2] rounded text-left"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                    >
                      <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-[#FFFCF2] rounded text-left"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                    >
                      <Link2 className="w-4 h-4" />
                      Copia link
                    </button>
                  </div>
                )}
              </div>
            </header>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              {/* Intro */}
              <section id="intro" className="mb-12">
                <h2 className="text-h2 text-[#0A0A0A] mb-4">Introduzione</h2>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Quando ho iniziato il mio percorso nel Product Management, mi sono reso conto che la teoria dei libri 
                  e dei corsi online era molto diversa dalla realtà del lavoro quotidiano. Questo articolo racconta la mia 
                  esperienza e le lezioni che ho imparato sul campo.
                </p>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Voglio condividere con te <strong className="text-[#FF006E]">gli errori che ho fatto</strong>, le strategie 
                  che hanno funzionato, e soprattutto come ho imparato a <strong className="text-[#0D7EFF]">trasformare 
                  i fallimenti in opportunità di crescita</strong>.
                </p>
              </section>

              {/* Problema */}
              <section id="problema" className="mb-12">
                <h2 className="text-h2 text-[#0A0A0A] mb-4">Il problema che ho affrontato</h2>
                <p className="text-body text-[#2D2D2D] mb-4">
                  All'inizio della mia carriera come PM, mi sono trovato di fronte a una sfida comune ma complessa: 
                  come bilanciare le richieste degli stakeholder con le reali esigenze degli utenti?
                </p>

                <div className="bg-[#FFD60A] border-4 border-[#000] rounded-lg shadow-brutal p-6 my-6 -rotate-1">
                  <p className="text-body text-[#0A0A0A] m-0" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                    💡 Insight chiave: Il 70% delle feature richieste dagli stakeholder non risolvevano problemi reali degli utenti.
                  </p>
                </div>

                <h3 id="contesto" className="text-h3 text-[#0A0A0A] mb-3 mt-8">Il contesto del progetto</h3>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Stavo lavorando su una piattaforma B2B SaaS con oltre 10.000 utenti attivi. Il team era composto da 
                  8 sviluppatori, 2 designer e me come unico PM. La pressione per rilasciare nuove feature era altissima.
                </p>

                <h3 id="sfide" className="text-h3 text-[#0A0A0A] mb-3 mt-8">Le sfide principali</h3>
                <ul className="list-disc list-inside text-body text-[#2D2D2D] space-y-2 mb-4">
                  <li>Roadmap sovraffollata di feature request non validate</li>
                  <li>Mancanza di dati quantitativi sulle priorità</li>
                  <li>Comunicazione frammentata tra team e stakeholder</li>
                  <li>Deadline irrealistiche imposte dal management</li>
                </ul>
              </section>

              {/* Soluzione */}
              <section id="soluzione" className="mb-12">
                <h2 className="text-h2 text-[#0A0A0A] mb-4">La mia soluzione</h2>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Ho deciso di implementare un framework di prioritizzazione basato su tre pilastri: 
                  <strong className="text-[#7209B7]"> impatto utente, sforzo tecnico e allineamento strategico</strong>.
                </p>

                <h3 id="approccio" className="text-h3 text-[#0A0A0A] mb-3 mt-8">Approccio metodologico</h3>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Il primo passo è stato creare un sistema di scoring trasparente. Ogni feature proposta veniva valutata 
                  su una scala da 1 a 10 per ciascuno dei tre criteri. Solo le feature con un punteggio combinato 
                  superiore a 21 entravano in roadmap.
                </p>

                <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 my-6">
                  <h4 className="text-h4 text-[#0A0A0A] mb-3">Framework di prioritizzazione</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#FFFCF2] border-2 border-[#000] rounded p-4">
                      <h5 className="text-body-small mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                        Impatto Utente
                      </h5>
                      <p className="text-body-small text-[#2D2D2D]">Quanti utenti beneficiano?</p>
                    </div>
                    <div className="bg-[#FFFCF2] border-2 border-[#000] rounded p-4">
                      <h5 className="text-body-small mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                        Sforzo Tecnico
                      </h5>
                      <p className="text-body-small text-[#2D2D2D]">Complessità e tempo richiesto</p>
                    </div>
                    <div className="bg-[#FFFCF2] border-2 border-[#000] rounded p-4">
                      <h5 className="text-body-small mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                        Allineamento
                      </h5>
                      <p className="text-body-small text-[#2D2D2D]">Coerenza con vision aziendale</p>
                    </div>
                  </div>
                </div>

                <h3 id="implementazione" className="text-h3 text-[#0A0A0A] mb-3 mt-8">Implementazione pratica</h3>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Ho organizzato workshop settimanali con il team per valutare collettivamente ogni proposta. 
                  Questo ha creato un senso di ownership condiviso e ha ridotto drasticamente i conflitti sulla roadmap.
                </p>
              </section>

              {/* Risultati */}
              <section id="risultati" className="mb-12">
                <h2 className="text-h2 text-[#0A0A0A] mb-4">Risultati e impatto</h2>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Dopo 6 mesi di applicazione di questo framework, i risultati sono stati significativi e misurabili.
                </p>

                <h3 id="metriche" className="text-h3 text-[#0A0A0A] mb-3 mt-8">Metriche chiave</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="bg-[#0D7EFF] border-4 border-[#000] rounded-lg shadow-brutal p-6">
                    <p className="text-5xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, color: 'white' }}>
                      +42%
                    </p>
                    <p className="text-body-small text-white m-0">User engagement sulle nuove feature</p>
                  </div>
                  <div className="bg-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal p-6">
                    <p className="text-5xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, color: 'white' }}>
                      -60%
                    </p>
                    <p className="text-body-small text-white m-0">Feature ignorate dagli utenti</p>
                  </div>
                  <div className="bg-[#7209B7] border-4 border-[#000] rounded-lg shadow-brutal p-6">
                    <p className="text-5xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, color: 'white' }}>
                      +35%
                    </p>
                    <p className="text-body-small text-white m-0">Velocità di delivery del team</p>
                  </div>
                  <div className="bg-[#FFD60A] border-4 border-[#000] rounded-lg shadow-brutal p-6">
                    <p className="text-5xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, color: '#0A0A0A' }}>
                      4.8/5
                    </p>
                    <p className="text-body-small text-[#0A0A0A] m-0">Soddisfazione stakeholder</p>
                  </div>
                </div>
              </section>

              {/* Lezioni */}
              <section id="lezioni" className="mb-12">
                <h2 className="text-h2 text-[#0A0A0A] mb-4">Lezioni apprese</h2>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Questa esperienza mi ha insegnato alcune lezioni fondamentali che porto con me in ogni progetto:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#0D7EFF] pl-4 py-2">
                    <h4 className="text-body mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                      1. La trasparenza vince sempre
                    </h4>
                    <p className="text-body-small text-[#2D2D2D]">
                      Rendere visibile il processo decisionale elimina il 90% delle dispute sulla roadmap.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#FF006E] pl-4 py-2">
                    <h4 className="text-body mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                      2. I dati battono le opinioni
                    </h4>
                    <p className="text-body-small text-[#2D2D2D]">
                      Un framework quantitativo toglie l'emotività dalle decisioni difficili.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#7209B7] pl-4 py-2">
                    <h4 className="text-body mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                      3. Il team deve essere coinvolto
                    </h4>
                    <p className="text-body-small text-[#2D2D2D]">
                      Le decisioni prese insieme hanno un tasso di successo 3x superiore.
                    </p>
                  </div>
                </div>
              </section>

              {/* Conclusione */}
              <section id="conclusione" className="mb-12">
                <h2 className="text-h2 text-[#0A0A0A] mb-4">Conclusione</h2>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Il Product Management non è una scienza esatta, ma questo non significa che debba essere caotico. 
                  Implementare processi chiari e trasparenti può trasformare completamente la dinamica di un team 
                  e la qualità del prodotto finale.
                </p>
                <p className="text-body text-[#2D2D2D] mb-4">
                  Se stai affrontando sfide simili, ricorda: <strong className="text-[#0D7EFF]">inizia con piccoli 
                  esperimenti</strong>, misura i risultati, e itera. Non esiste una soluzione perfetta, ma esiste 
                  sempre un modo migliore di lavorare.
                </p>
              </section>
            </article>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal-lg p-8 md:p-12 -rotate-1">
              <div className="text-center">
                <h3 className="text-h3 text-white mb-4">
                  Vuoi implementare strategie simili nel tuo team?
                </h3>
                <p className="text-body text-white/90 mb-6 max-w-[600px] mx-auto">
                  Offro sessioni di consulenza personalizzate per aiutarti a costruire processi di Product Management efficaci.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="#ask-me"
                    onClick={(e) => {
                      e.preventDefault();
                      onBack();
                      setTimeout(() => {
                        document.getElementById('ask-me')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="inline-block px-8 py-4 bg-[#FFD60A] text-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '16px' }}
                  >
                    Prenota una consulenza
                  </a>
                  <button
                    onClick={onBack}
                    className="inline-block px-8 py-4 bg-white text-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '16px' }}
                  >
                    Leggi altri articoli
                  </button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <h3 className="text-h3 text-[#0A0A0A] mb-6">Articoli correlati</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <article
                    key={related.id}
                    className="bg-white border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all cursor-pointer"
                  >
                    <div className="p-6">
                      <span
                        className="inline-block px-3 py-1 mb-3 border-2 border-[#000] rounded text-white"
                        style={{
                          backgroundColor: related.color,
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        {related.category}
                      </span>
                      <h4 className="text-body mb-3 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                        {related.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-body-small text-[#2D2D2D] flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {related.readTime}
                        </span>
                        <ChevronRight className="w-5 h-5 text-[#0D7EFF]" strokeWidth={2.5} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}