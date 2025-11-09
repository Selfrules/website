'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, Calendar, Filter, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';

interface BlogListingClientProps {
  initialPosts: BlogPost[];
  categories: string[];
  tags: string[];
  locale: string;
}

// Color mapping for categories
const categoryColors: Record<string, string> = {
  'Product': '#FF006E',
  'Strategy': '#7209B7',
  'OKRs': '#0D7EFF',
  'Design': '#0D7EFF',
  'Development': '#2A687A',
  'Leadership': '#FF006E',
};

export default function BlogListingClient({
  initialPosts,
  categories,
  tags,
  locale,
}: BlogListingClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Add 'All' to categories list
  const allCategories = useMemo(() => ['All', ...categories], [categories]);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const handleArticleClick = (slug: string) => {
    router.push(`/${locale}/blog/${slug}`);
  };

  const handleBackToHome = () => {
    router.push(`/${locale}`);
  };

  const handleContactClick = () => {
    router.push(`/${locale}#ask-me`);
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
              onClick={handleBackToHome}
              className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-3 border-white/40 rounded-lg hover:bg-white/30 transition-all flex items-center gap-2"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px' }}
            >
              ← Home
            </button>

            <h1 className="text-h1 md:text-[64px] text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
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
            <h3 className="text-h3 text-[#0A0A0A]">
              Filtra per categoria
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {allCategories.map((category) => {
              const isActive = selectedCategory === category;
              const categoryColor = categoryColors[category] || '#2D2D2D';

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
                      ({initialPosts.filter(p => p.category === category).length})
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
            {filteredPosts.length === initialPosts.length
              ? `${filteredPosts.length} articoli totali`
              : `${filteredPosts.length} di ${initialPosts.length} articoli`}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post) => {
              const categoryColor = categoryColors[post.category] || '#2D2D2D';

              return (
                <article
                  key={post.slug}
                  onClick={() => handleArticleClick(post.slug)}
                  className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 min-h-[320px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-3 py-1 border-2 border-[#000] rounded text-white inline-block"
                        style={{
                          backgroundColor: categoryColor,
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-h3 text-[#0A0A0A] mb-3 group-hover:text-[#0D7EFF] transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-body-small text-[#0A0A0A] mb-4 line-clamp-3">
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
                        {new Date(post.date).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-body-small text-[#0D7EFF] transition-all group-hover:gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
                      Leggi articolo
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          // No Results
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white border-4 border-[#000] rounded-lg shadow-brutal mb-6">
              <Search className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
              <h3 className="text-h3 text-[#0A0A0A] mb-3">
                Nessun articolo trovato
              </h3>
              <p className="text-body text-[#0A0A0A] mb-6 max-w-[400px]">
                Prova a modificare i filtri o la ricerca per trovare quello che cerchi.
              </p>
              <button
                onClick={handleResetFilters}
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
            <p className="text-body text-[#0A0A0A] mb-6 max-w-[600px] mx-auto" style={{ opacity: 0.8 }}>
              Scrivimi direttamente! Sono sempre felice di rispondere a domande specifiche o suggerimenti per futuri articoli.
            </p>
            <button
              onClick={handleContactClick}
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
