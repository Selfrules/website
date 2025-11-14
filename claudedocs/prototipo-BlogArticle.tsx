import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Link2, ChevronRight, Bookmark, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Footer } from './Footer';
import { ChatBot } from './ChatBot';

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
  onLogoClick?: () => void;
  onViewAllArticles?: () => void;
}

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function BlogArticle({ onBack, article, currentLang, onLanguageChange, onLogoClick, onViewAllArticles }: BlogArticleProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Mock Table of Contents
  const tableOfContents: TableOfContentItem[] = [
    { id: 'intro', title: 'Introduzione', level: 1 },
    { id: 'problema', title: 'Il problema', level: 1 },
    { id: 'contesto', title: 'Il contesto', level: 2 },
    { id: 'sfide', title: 'Le sfide', level: 2 },
    { id: 'soluzione', title: 'La soluzione', level: 1 },
    { id: 'approccio', title: 'Approccio', level: 2 },
    { id: 'implementazione', title: 'Implementazione', level: 2 },
    { id: 'risultati', title: 'Risultati', level: 1 },
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
      date: '28 Ott 2025',
      color: '#7209B7',
    },
    {
      id: 3,
      title: 'Atomic Design per Design Systems scalabili',
      category: 'Design',
      readTime: '12 min',
      date: '15 Ott 2025',
      color: '#0D7EFF',
    },
    {
      id: 4,
      title: 'Workshop: Come creare roadmap efficaci',
      category: 'Workshop',
      readTime: '6 min',
      date: '2 Ott 2025',
      color: '#FFD60A',
    },
  ];

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article.title;

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copiato negli appunti!');
    } else if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy for ToC
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

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
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#E5E5E5] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#0D7EFF] via-[#7209B7] to-[#FF006E] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FFFCF2] border-b-4 border-[#000] mt-1">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
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
              <span className="hidden sm:inline">Torna al Blog</span>
              <span className="sm:hidden">Blog</span>
            </button>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="relative p-2 bg-white border-3 border-[#000] rounded-lg shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              {showShareMenu && (
                <div className="absolute top-16 right-6 bg-white border-3 border-[#000] rounded-lg shadow-brutal p-3 flex flex-col gap-2 min-w-[180px] z-10">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#FFFCF2] rounded text-left transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                  >
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#FFFCF2] rounded text-left transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#FFFCF2] rounded text-left transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                  >
                    <Link2 className="w-4 h-4" />
                    Copia link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar - ToC & Share */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents */}
              <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-5">
                <h3
                  className="mb-4 pb-3 border-b-3 border-[#000] text-[#0A0A0A]"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  📑 Indice
                </h3>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all group ${
                        activeSection === item.id
                          ? 'bg-[#0D7EFF] text-white shadow-brutal-sm'
                          : 'text-[#2D2D2D] hover:bg-[#FFFCF2] hover:translate-x-1'
                      } ${item.level === 2 ? 'pl-6 text-sm' : 'text-sm'}`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: activeSection === item.id ? 600 : 400,
                      }}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Share Buttons */}
              <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-5">
                <h4
                  className="mb-3 text-[#0A0A0A]"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  🔗 Condividi
                </h4>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-3 py-2.5 bg-[#1DA1F2] text-white border-3 border-[#000] rounded-lg shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600 }}
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-3 py-2.5 bg-[#0A66C2] text-white border-3 border-[#000] rounded-lg shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600 }}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 px-3 py-2.5 bg-white text-[#0A0A0A] border-3 border-[#000] rounded-lg shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600 }}
                  >
                    <Link2 className="w-4 h-4" />
                    Copia link
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Article Header */}
            <header className="mb-10">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm text-[#6B7280]">
                <button 
                  onClick={onBack}
                  className="hover:text-[#0D7EFF] transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Blog
                </button>
                <ChevronRight className="w-3 h-3" />
                <span style={{ fontFamily: 'Inter, sans-serif' }}>{article.category}</span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className="px-3 py-1.5 border-3 border-[#000] rounded-lg shadow-brutal-sm text-white"
                  style={{
                    backgroundColor: article.color,
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  {article.category}
                </span>
                <div className="flex items-center gap-4 text-[#6B7280]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}> 
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-h1 text-[#0A0A0A] mb-6 leading-tight">{article.title}</h1>
              
              {/* Excerpt */}
              <p className="text-body-large text-[#2D2D2D] leading-relaxed mb-8">{article.excerpt}</p>
            </header>

            {/* Quick Summary Box - Above the fold CTA */}
            <div className="bg-gradient-to-br from-[#0D7EFF] to-[#7209B7] border-4 border-[#000] rounded-lg shadow-brutal-lg p-6 md:p-8 mb-12 rotate-1">
              <div className="flex items-start gap-4 -rotate-1">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-white mb-3"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '18px' }}
                  >
                    📌 Cosa imparerai in questo articolo
                  </h3>
                  <ul className="space-y-2 text-white/95 mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Come bilanciare richieste stakeholder e bisogni utenti</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Framework pratico di prioritizzazione con scoring trasparente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Risultati misurabili: +42% engagement, -60% feature ignorate</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => scrollToSection('soluzione')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFD60A] text-[#0A0A0A] border-3 border-[#000] rounded-lg shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px' }}
                  >
                    Vai alla soluzione
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              {/* Intro */}
              <section id="intro" className="mb-16 scroll-mt-28">
                <h2 className="text-h2 text-[#0A0A0A] mb-6">Introduzione</h2>
                <p className="text-body text-[#2D2D2D] mb-5 leading-relaxed">
                  Quando ho iniziato il mio percorso nel Product Management, mi sono reso conto che <strong className="text-[#0D7EFF]">la teoria dei libri 
                  e dei corsi online era molto diversa dalla realtà</strong> del lavoro quotidiano.
                </p>
                
                <p className="text-body text-[#2D2D2D] mb-5 leading-relaxed">
                  Questo articolo racconta la mia esperienza e le lezioni che ho imparato sul campo.
                </p>

                <p className="text-body text-[#2D2D2D] leading-relaxed">
                  Voglio condividere con te <strong className="text-[#FF006E]">gli errori che ho fatto</strong>, le strategie 
                  che hanno funzionato, e soprattutto come ho imparato a <strong className="text-[#7209B7]">trasformare 
                  i fallimenti in opportunità di crescita</strong>.
                </p>
              </section>

              {/* Problema */}
              <section id="problema" className="mb-16 scroll-mt-28">
                <h2 className="text-h2 text-[#0A0A0A] mb-6">Il problema che ho affrontato</h2>
                
                <p className="text-body text-[#2D2D2D] mb-6 leading-relaxed">
                  All'inizio della mia carriera come PM, mi sono trovato di fronte a una sfida comune ma complessa: 
                  <strong className="text-[#0D7EFF]"> come bilanciare le richieste degli stakeholder con le reali esigenze degli utenti?</strong>
                </p>

                {/* Insight Callout */}
                <div className="bg-[#FFD60A] border-4 border-[#000] rounded-lg shadow-brutal-lg p-6 my-8 -rotate-1 hover:rotate-0 transition-transform">
                  <div className="rotate-1">
                    <p className="text-body text-[#0A0A0A] m-0 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                      💡 <span className="underline decoration-4 decoration-[#FF006E]">Insight chiave:</span> Il 70% delle feature richieste dagli stakeholder non risolvevano problemi reali degli utenti.
                    </p>
                  </div>
                </div>

                <h3 id="contesto" className="text-h3 text-[#0A0A0A] mb-4 mt-12 scroll-mt-28">Il contesto del progetto</h3>
                
                <p className="text-body text-[#2D2D2D] mb-6 leading-relaxed">
                  Stavo lavorando su una piattaforma <strong>B2B SaaS con oltre 10.000 utenti attivi</strong>. 
                </p>

                <div className="bg-white border-3 border-[#E5E5E5] rounded-lg p-5 my-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-[#0A0A0A] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '28px' }}>8</p>
                      <p className="text-body-small text-[#6B7280]">Sviluppatori</p>
                    </div>
                    <div>
                      <p className="text-[#0A0A0A] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '28px' }}>2</p>
                      <p className="text-body-small text-[#6B7280]">Designer</p>
                    </div>
                    <div>
                      <p className="text-[#0A0A0A] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '28px' }}>1</p>
                      <p className="text-body-small text-[#6B7280]">PM (io)</p>
                    </div>
                  </div>
                </div>

                <p className="text-body text-[#2D2D2D] leading-relaxed">
                  La pressione per rilasciare nuove feature era <strong className="text-[#FF006E]">altissima</strong>.
                </p>

                <h3 id="sfide" className="text-h3 text-[#0A0A0A] mb-4 mt-12 scroll-mt-28">Le sfide principali</h3>
                
                <div className="space-y-3 my-6">
                  <div className="flex items-start gap-3 p-4 bg-[#FFFCF2] border-2 border-[#E5E5E5] rounded-lg hover:border-[#FF006E] transition-colors">
                    <div className="w-6 h-6 rounded-full bg-[#FF006E] flex-shrink-0 flex items-center justify-center text-white" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '12px' }}>1</div>
                    <p className="text-body text-[#2D2D2D] m-0">Roadmap sovraffollata di feature request non validate</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[#FFFCF2] border-2 border-[#E5E5E5] rounded-lg hover:border-[#0D7EFF] transition-colors">
                    <div className="w-6 h-6 rounded-full bg-[#0D7EFF] flex-shrink-0 flex items-center justify-center text-white" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '12px' }}>2</div>
                    <p className="text-body text-[#2D2D2D] m-0">Mancanza di dati quantitativi sulle priorità</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[#FFFCF2] border-2 border-[#E5E5E5] rounded-lg hover:border-[#7209B7] transition-colors">
                    <div className="w-6 h-6 rounded-full bg-[#7209B7] flex-shrink-0 flex items-center justify-center text-white" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '12px' }}>3</div>
                    <p className="text-body text-[#2D2D2D] m-0">Comunicazione frammentata tra team e stakeholder</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[#FFFCF2] border-2 border-[#E5E5E5] rounded-lg hover:border-[#FFD60A] transition-colors">
                    <div className="w-6 h-6 rounded-full bg-[#FFD60A] flex-shrink-0 flex items-center justify-center text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '12px' }}>4</div>
                    <p className="text-body text-[#2D2D2D] m-0">Deadline irrealistiche imposte dal management</p>
                  </div>
                </div>
              </section>

              {/* Soluzione */}
              <section id="soluzione" className="mb-16 scroll-mt-28">
                <h2 className="text-h2 text-[#0A0A0A] mb-6">La mia soluzione</h2>
                
                <p className="text-body text-[#2D2D2D] mb-6 leading-relaxed">
                  Ho deciso di implementare un <strong className="text-[#7209B7]">framework di prioritizzazione basato su tre pilastri</strong>: 
                  impatto utente, sforzo tecnico e allineamento strategico.
                </p>

                <h3 id="approccio" className="text-h3 text-[#0A0A0A] mb-4 mt-12 scroll-mt-28">Approccio metodologico</h3>
                
                <p className="text-body text-[#2D2D2D] mb-6 leading-relaxed">
                  Il primo passo è stato creare un <strong>sistema di scoring trasparente</strong>. 
                </p>

                <p className="text-body text-[#2D2D2D] mb-8 leading-relaxed">
                  Ogni feature proposta veniva valutata su una scala da 1 a 10 per ciascuno dei tre criteri. 
                  Solo le feature con un <strong className="text-[#0D7EFF]">punteggio combinato superiore a 21</strong> entravano in roadmap.
                </p>

                {/* Framework Box */}
                <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal-lg p-6 md:p-8 my-8">
                  <h4 className="text-h4 text-[#0A0A0A] mb-6">⚙️ Framework di prioritizzazione</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-[#0D7EFF]/10 border-3 border-[#0D7EFF] rounded-lg p-5 hover:shadow-brutal-sm hover:-translate-y-1 transition-all">
                      <div className="w-10 h-10 bg-[#0D7EFF] border-2 border-[#000] rounded-lg flex items-center justify-center mb-3">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-body mb-2 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                        Impatto Utente
                      </h5>
                      <p className="text-body-small text-[#2D2D2D]">Quanti utenti beneficiano della feature?</p>
                    </div>
                    <div className="bg-[#7209B7]/10 border-3 border-[#7209B7] rounded-lg p-5 hover:shadow-brutal-sm hover:-translate-y-1 transition-all">
                      <div className="w-10 h-10 bg-[#7209B7] border-2 border-[#000] rounded-lg flex items-center justify-center mb-3">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-body mb-2 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                        Sforzo Tecnico
                      </h5>
                      <p className="text-body-small text-[#2D2D2D]">Complessità di sviluppo e tempo richiesto</p>
                    </div>
                    <div className="bg-[#FFD60A]/10 border-3 border-[#FFD60A] rounded-lg p-5 hover:shadow-brutal-sm hover:-translate-y-1 transition-all">
                      <div className="w-10 h-10 bg-[#FFD60A] border-2 border-[#000] rounded-lg flex items-center justify-center mb-3">
                        <TrendingUp className="w-5 h-5 text-[#0A0A0A]" />
                      </div>
                      <h5 className="text-body mb-2 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                        Allineamento
                      </h5>
                      <p className="text-body-small text-[#2D2D2D]">Coerenza con vision e strategia aziendale</p>
                    </div>
                  </div>
                </div>

                <h3 id="implementazione" className="text-h3 text-[#0A0A0A] mb-4 mt-12 scroll-mt-28">Implementazione pratica</h3>
                
                <p className="text-body text-[#2D2D2D] mb-6 leading-relaxed">
                  Ho organizzato <strong>workshop settimanali</strong> con il team per valutare collettivamente ogni proposta. 
                </p>

                <p className="text-body text-[#2D2D2D] leading-relaxed">
                  Questo ha creato un <strong className="text-[#7209B7]">senso di ownership condiviso</strong> e ha ridotto drasticamente i conflitti sulla roadmap.
                </p>
              </section>

              {/* Inline CTA */}
              <div className="my-12 bg-gradient-to-r from-[#FF006E] to-[#7209B7] border-4 border-[#000] rounded-lg shadow-brutal-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '20px' }}>
                      🚀 Ti piace questo approccio?
                    </h3>
                    <p className="text-white/90 text-body">
                      Scopri come posso aiutarti a implementarlo nel tuo team
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onBack();
                      setTimeout(() => {
                        document.getElementById('ask-me')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-6 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all whitespace-nowrap"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '16px' }}
                  >
                    Parliamone →
                  </button>
                </div>
              </div>

              {/* Risultati */}
              <section id="risultati" className="mb-16 scroll-mt-28">
                <h2 className="text-h2 text-[#0A0A0A] mb-6">Risultati e impatto</h2>
                
                <p className="text-body text-[#2D2D2D] mb-8 leading-relaxed">
                  Dopo <strong>6 mesi</strong> di applicazione di questo framework, i risultati sono stati significativi e misurabili:
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10">
                  <div className="bg-[#0D7EFF] border-4 border-[#000] rounded-lg shadow-brutal-lg p-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <TrendingUp className="w-8 h-8 text-white mb-3" />
                    <p className="mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '48px', color: 'white', lineHeight: '1' }}>
                      +42%
                    </p>
                    <p className="text-body text-white/95 m-0">User engagement sulle nuove feature</p>
                  </div>
                  <div className="bg-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal-lg p-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <CheckCircle className="w-8 h-8 text-white mb-3" />
                    <p className="mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '48px', color: 'white', lineHeight: '1' }}>
                      -60%
                    </p>
                    <p className="text-body text-white/95 m-0">Feature ignorate dagli utenti</p>
                  </div>
                  <div className="bg-[#7209B7] border-4 border-[#000] rounded-lg shadow-brutal-lg p-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <TrendingUp className="w-8 h-8 text-white mb-3" />
                    <p className="mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '48px', color: 'white', lineHeight: '1' }}>
                      +35%
                    </p>
                    <p className="text-body text-white/95 m-0">Velocità di delivery del team</p>
                  </div>
                  <div className="bg-[#FFD60A] border-4 border-[#000] rounded-lg shadow-brutal-lg p-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <Users className="w-8 h-8 text-[#0A0A0A] mb-3" />
                    <p className="mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '48px', color: '#0A0A0A', lineHeight: '1' }}>
                      4.8/5
                    </p>
                    <p className="text-body text-[#0A0A0A] m-0">Soddisfazione stakeholder</p>
                  </div>
                </div>
              </section>

              {/* Lezioni */}
              <section id="lezioni" className="mb-16 scroll-mt-28">
                <h2 className="text-h2 text-[#0A0A0A] mb-6">Lezioni apprese</h2>
                
                <p className="text-body text-[#2D2D2D] mb-8 leading-relaxed">
                  Questa esperienza mi ha insegnato alcune <strong>lezioni fondamentali</strong> che porto con me in ogni progetto:
                </p>

                <div className="space-y-5">
                  <div className="bg-white border-l-4 border-[#0D7EFF] shadow-brutal p-6 hover:-translate-x-1 transition-transform">
                    <h4 className="text-body mb-3 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                      1. La trasparenza vince sempre
                    </h4>
                    <p className="text-body text-[#2D2D2D] m-0 leading-relaxed">
                      Rendere visibile il processo decisionale <strong className="text-[#0D7EFF]">elimina il 90% delle dispute</strong> sulla roadmap. 
                      Tutti sanno come e perché vengono prese le decisioni.
                    </p>
                  </div>

                  <div className="bg-white border-l-4 border-[#FF006E] shadow-brutal p-6 hover:-translate-x-1 transition-transform">
                    <h4 className="text-body mb-3 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                      2. I dati battono le opinioni
                    </h4>
                    <p className="text-body text-[#2D2D2D] m-0 leading-relaxed">
                      Un framework quantitativo <strong className="text-[#FF006E]">toglie l'emotività</strong> dalle decisioni difficili. 
                      Le discussioni diventano oggettive e costruttive.
                    </p>
                  </div>

                  <div className="bg-white border-l-4 border-[#7209B7] shadow-brutal p-6 hover:-translate-x-1 transition-transform">
                    <h4 className="text-body mb-3 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                      3. Il team deve essere coinvolto
                    </h4>
                    <p className="text-body text-[#2D2D2D] m-0 leading-relaxed">
                      Le decisioni prese insieme hanno un <strong className="text-[#7209B7]">tasso di successo 3x superiore</strong>. 
                      L'ownership condiviso fa la differenza.
                    </p>
                  </div>
                </div>
              </section>

              {/* Conclusione */}
              <section id="conclusione" className="mb-12 scroll-mt-28">
                <h2 className="text-h2 text-[#0A0A0A] mb-6">Conclusione</h2>
                
                <p className="text-body text-[#2D2D2D] mb-5 leading-relaxed">
                  Il Product Management non è una scienza esatta, ma questo <strong>non significa che debba essere caotico</strong>. 
                </p>

                <p className="text-body text-[#2D2D2D] mb-5 leading-relaxed">
                  Implementare processi chiari e trasparenti può <strong className="text-[#0D7EFF]">trasformare completamente</strong> la dinamica 
                  di un team e la qualità del prodotto finale.
                </p>

                <p className="text-body text-[#2D2D2D] leading-relaxed">
                  Se stai affrontando sfide simili, ricorda: <strong className="text-[#7209B7]">inizia con piccoli esperimenti</strong>, 
                  misura i risultati, e itera. Non esiste una soluzione perfetta, ma esiste sempre un modo migliore di lavorare.
                </p>
              </section>
            </article>

            {/* Main CTA Section */}
            <div className="mt-16 bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal-lg p-8 md:p-12 -rotate-1 hover:rotate-0 transition-transform">
              <div className="text-center rotate-1 hover:-rotate-1 transition-transform">
                <h3 className="text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '28px' }}>
                  Vuoi implementare strategie simili nel tuo team?
                </h3>
                <p className="text-body-large text-white/95 mb-6 max-w-[600px] mx-auto leading-relaxed">
                  Offro sessioni di consulenza personalizzate per aiutarti a costruire processi di Product Management efficaci.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      onBack();
                      setTimeout(() => {
                        document.getElementById('ask-me')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFD60A] text-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '16px' }}
                  >
                    Prenota una consulenza
                    <ArrowRight className="w-5 h-5" />
                  </button>
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

            {/* Related Articles - Learning Center Approach */}
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-h3 text-[#0A0A0A]">📚 Continua a leggere</h3>
                <button
                  onClick={onBack}
                  className="text-[#0D7EFF] hover:underline text-body-small transition-all"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}
                >
                  Vedi tutti →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <article
                    key={related.id}
                    className="group bg-white border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-2 hover:shadow-brutal-lg transition-all cursor-pointer"
                  >
                    <div className="p-6">
                      <span
                        className="inline-block px-3 py-1 mb-4 border-2 border-[#000] rounded-lg text-white"
                        style={{
                          backgroundColor: related.color,
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        {related.category}
                      </span>
                      <h4 className="text-body mb-4 text-[#0A0A0A] group-hover:text-[#0D7EFF] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                        {related.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-body-small text-[#6B7280] flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {related.readTime}
                        </span>
                        <ChevronRight className="w-5 h-5 text-[#0D7EFF] group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating ChatBot */}
      <ChatBot />
    </div>
  );
}