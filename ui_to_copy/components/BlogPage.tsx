import React, { useState, useMemo } from 'react';
import { Search, X, Clock, Calendar, Filter, ArrowRight } from 'lucide-react';
import { BlogPost } from './BlogSection';

interface BlogPageProps {
  onArticleClick: (article: BlogPost) => void;
  onBackToHome: () => void;
}

// Extended blog posts array
const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    category: 'Product',
    title: 'Il fallimento come feature, non come bug',
    excerpt: 'Ho sprecato 3 mesi su un contratto di 50 pagine che nessuno ha mai letto. Oggi uso un accordo di 2 pagine e funziona meglio. Ecco perché il fallimento è la migliore forma di apprendimento.',
    readingTime: '8 min',
    date: '5 Nov 2025',
    color: '#FF006E',
    featured: true,
  },
  {
    id: 2,
    category: 'Strategy',
    title: 'Product-Market Fit: Il mito da sfatare',
    excerpt: 'Non esiste un momento magico dove "trovi" il PMF. È un processo continuo di aggiustamenti.',
    readingTime: '6 min',
    date: '28 Ott 2025',
    color: '#7209B7',
  },
  {
    id: 3,
    category: 'OKRs',
    title: 'OKR che funzionano vs OKR che sembrano fighi',
    excerpt: 'La differenza tra OKR che portano risultati e quelli che finiscono in un Google Doc dimenticato.',
    readingTime: '7 min',
    date: '15 Ott 2025',
    color: '#0D7EFF',
  },
  {
    id: 4,
    category: 'Design',
    title: 'Design Systems: Quando il sistema ti blocca invece di aiutarti',
    excerpt: 'Ho costruito un design system perfetto che nessuno usava. Poi ho capito che la perfezione è nemica della praticità.',
    readingTime: '10 min',
    date: '2 Ott 2025',
    color: '#0D7EFF',
  },
  {
    id: 5,
    category: 'Product',
    title: 'User Research che mente (e come smascherarla)',
    excerpt: 'Gli utenti dicono una cosa e ne fanno un\'altra. Ho imparato a leggere tra le righe delle interviste.',
    readingTime: '9 min',
    date: '18 Set 2025',
    color: '#FF006E',
  },
  {
    id: 6,
    category: 'Development',
    title: 'Code Review che migliorano il team (non solo il codice)',
    excerpt: 'Le migliori code review che ho fatto non riguardavano il codice, ma la cultura del team.',
    readingTime: '7 min',
    date: '5 Set 2025',
    color: '#FFD60A',
  },
  {
    id: 7,
    category: 'Strategy',
    title: 'Roadmap Agile: L\'ossimoro che funziona',
    excerpt: 'Come pianificare senza essere rigidi e rimanere agili senza essere caotici.',
    readingTime: '11 min',
    date: '22 Ago 2025',
    color: '#7209B7',
  },
  {
    id: 8,
    category: 'Leadership',
    title: 'Il PM non è il capo: è il facilitatore',
    excerpt: 'Ho smesso di dare ordini e ho iniziato a fare domande. Il team è diventato 3x più produttivo.',
    readingTime: '6 min',
    date: '8 Ago 2025',
    color: '#FF006E',
  },
  {
    id: 9,
    category: 'Design',
    title: 'Atomic Design per chi odia la teoria',
    excerpt: 'Atomic Design spiegato con esempi pratici e zero gergo tecnico. Spoiler: funziona davvero.',
    readingTime: '12 min',
    date: '25 Lug 2025',
    color: '#0D7EFF',
  },
  {
    id: 10,
    category: 'OKRs',
    title: 'OKR trimestrali vs annuali: cosa ho imparato',
    excerpt: 'Un anno è troppo lungo, una settimana troppo corta. Il trimestre è il sweet spot.',
    readingTime: '8 min',
    date: '11 Lug 2025',
    color: '#0D7EFF',
  },
  {
    id: 11,
    category: 'Product',
    title: 'Feature Flags: Il superpotere nascosto del PM',
    excerpt: 'Come ho rilasciato 15 feature in un giorno senza rompere nulla (e senza stress).',
    readingTime: '9 min',
    date: '28 Giu 2025',
    color: '#FF006E',
  },
  {
    id: 12,
    category: 'Development',
    title: 'Da Developer a PM: Le skill che contano davvero',
    excerpt: 'Non è il codice che ti rende un buon PM. È capire perché lo stai scrivendo.',
    readingTime: '10 min',
    date: '14 Giu 2025',
    color: '#FFD60A',
  },
];

export { allBlogPosts };

export function BlogPage({ onArticleClick, onBackToHome }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allBlogPosts.map(post => post.category)));
    return ['All', ...cats];
  }, []);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-b-4 border-[#000] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rotate-45" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full" />
        </div>

        <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-[800px]">
            <button
              onClick={onBackToHome}
              className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-3 border-white/40 rounded-lg hover:bg-white/30 transition-all flex items-center gap-2"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px' }}
            >
              ← Home
            </button>

            <h1 className="text-h1 md:text-[64px] text-white mb-6">
              Tutti gli articoli
            </h1>
            <p className="text-body-large text-white/95 mb-8 max-w-[600px]">
              Pensieri, riflessioni e lezioni apprese dal mondo del Product Management, Design e Development.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-[600px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Cerca articoli per titolo, contenuto o categoria..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white border-4 border-[#000] rounded-lg shadow-brutal focus:outline-none focus:shadow-brutal-lg transition-all text-[#0A0A0A]"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="container max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Category Filters */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-[#2D2D2D]" />
            <h3
              className="text-[#0A0A0A]"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '18px' }}
            >
              Filtra per categoria
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const categoryColor = allBlogPosts.find(p => p.category === category)?.color || '#2D2D2D';
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 border-3 border-[#000] rounded-lg shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:shadow-brutal ${
                    isActive ? 'text-white' : 'bg-white text-[#0A0A0A]'
                  }`}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    backgroundColor: isActive ? categoryColor : undefined,
                  }}
                >
                  {category}
                  {category !== 'All' && (
                    <span className="ml-2 opacity-70">
                      ({allBlogPosts.filter(p => p.category === category).length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-body-small text-[#6B7280]">
            {filteredPosts.length === allBlogPosts.length 
              ? `${filteredPosts.length} articoli totali`
              : `${filteredPosts.length} di ${allBlogPosts.length} articoli`}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onArticleClick(post)}
                className={`bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 min-h-[320px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer group ${
                  post.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-1 border-2 border-[#000] rounded text-white inline-block"
                      style={{
                        backgroundColor: post.color,
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      {post.category}
                    </span>
                    {post.featured && (
                      <span
                        className="px-2 py-1 bg-[#FFD60A] border-2 border-[#000] rounded text-[#0A0A0A]"
                        style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '10px',
                          fontWeight: 700,
                        }}
                      >
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-[#0A0A0A] mb-3 group-hover:text-[#0D7EFF] transition-colors leading-tight"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 700,
                      fontSize: '20px',
                    }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-body-small text-[#2D2D2D] mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-[#6B7280] mb-4" style={{ fontSize: '13px' }}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#0D7EFF] transition-all group-hover:gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '14px' }}>
                    Leggi articolo
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // No Results
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white border-4 border-[#000] rounded-lg shadow-brutal mb-6">
              <Search className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
              <h3 className="text-h3 text-[#0A0A0A] mb-3">
                Nessun articolo trovato
              </h3>
              <p className="text-body text-[#2D2D2D] mb-6 max-w-[400px]">
                Prova a modificare i filtri o la ricerca per trovare quello che cerchi.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded-lg shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px' }}
              >
                Resetta filtri
              </button>
            </div>
          </div>
        )}

        {/* CTA Section at bottom */}
        {filteredPosts.length > 0 && (
          <div className="mt-20 bg-[#FFD60A] border-4 border-[#000] rounded-lg shadow-brutal-lg p-8 md:p-12 text-center -rotate-1">
            <h3 className="text-h3 text-[#0A0A0A] mb-4">
              Non trovi quello che cerchi?
            </h3>
            <p className="text-body text-[#0A0A0A]/80 mb-6 max-w-[600px] mx-auto">
              Scrivimi direttamente! Sono sempre felice di rispondere a domande specifiche o suggerimenti per futuri articoli.
            </p>
            <button
              onClick={() => {
                onBackToHome();
                setTimeout(() => {
                  document.getElementById('ask-me')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-8 py-4 bg-[#0A0A0A] text-white border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '16px' }}
            >
              Contattami
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
