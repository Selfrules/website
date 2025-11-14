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

// Color mapping for categories (using Tailwind classes)
const categoryColorClasses: Record<string, string> = {
  'Product': 'bg-neon-pink',
  'Strategy': 'bg-deep-purple',
  'OKRs': 'bg-electric-blue',
  'Design': 'bg-electric-blue',
  'Development': 'bg-teal',
  'Leadership': 'bg-neon-pink',
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Add 'All' to categories list
  const allCategories = useMemo(() => ['All', ...categories], [categories]);

  // Filter posts based on search, category, and tags
  const filteredPosts = useMemo(() => {
    const filtered = initialPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(selectedTag => post.tags?.includes(selectedTag));

      return matchesSearch && matchesCategory && matchesTags;
    });

    // Reset to page 1 when filters change
    setCurrentPage(1);

    return filtered;
  }, [initialPosts, searchQuery, selectedCategory, selectedTags]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage, postsPerPage]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rotate-45" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full" />
        </div>

        <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-[800px]">
            <button
              onClick={handleBackToHome}
              className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-brutal border-white/40 rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 font-heading font-bold text-sm"
            >
              ← Home
            </button>

            <h1 className="text-h1 md:text-[64px] text-white mb-6 font-heading">
              Tutti gli articoli
            </h1>
            <p className="text-body-large text-white/95 mb-8 max-w-[600px]">
              Pensieri, riflessioni e lezioni apprese dal mondo del Product Management, Design e Development.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-[600px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brutalist-text-tertiary" />
                <input
                  type="text"
                  placeholder="Cerca articoli per titolo, contenuto o categoria..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white border-brutal-thick border-black rounded-lg shadow-brutal focus:outline-none focus:shadow-brutal-lg transition-all text-dark font-body text-base"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brutalist-text-tertiary hover:text-dark transition-colors"
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
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-brutalist-text-secondary" />
            <h3 className="text-h3 text-dark">
              Filtra per categoria
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {allCategories.map((category) => {
              const isActive = selectedCategory === category;
              const categoryColorClass = categoryColorClasses[category] || 'bg-brutalist-text-secondary';

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 border-brutal border-black rounded-lg shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:shadow-brutal font-heading font-bold text-sm ${
                    isActive ? `${categoryColorClass} text-white` : 'bg-white text-dark'
                  }`}
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

        {/* Tag Filters */}
        {tags.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-h3 text-dark">
                Filtra per tag
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isActive = selectedTags.includes(tag);

                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 border-2 border-black rounded-lg shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:shadow-brutal font-mono font-semibold text-xs ${
                      isActive
                        ? 'bg-teal text-white'
                        : 'bg-white text-dark'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(selectedCategory !== 'All' || selectedTags.length > 0) && (
          <div className="mb-6 p-4 bg-white border-brutal border-black rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-body-small font-bold text-dark">
                Filtri attivi:
              </span>
              <button
                onClick={handleResetFilters}
                className="text-body-small text-electric-blue hover:underline font-heading font-semibold"
              >
                Resetta tutto
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'All' && (
                <span className="px-3 py-1 bg-electric-blue text-white border-2 border-black rounded text-xs font-bold">
                  Categoria: {selectedCategory}
                </span>
              )}
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-teal text-white border-2 border-black rounded text-xs font-bold flex items-center gap-1"
                >
                  #{tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-body-small text-brutalist-text-tertiary">
            {filteredPosts.length === initialPosts.length
              ? `${filteredPosts.length} articoli totali`
              : `${filteredPosts.length} di ${initialPosts.length} articoli`}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {paginatedPosts.map((post) => {
              const categoryColorClass = categoryColorClasses[post.category] || 'bg-brutalist-text-secondary';

              return (
                <article
                  key={post.slug}
                  onClick={() => handleArticleClick(post.slug)}
                  className="bg-white border-brutal-thick border-black rounded-lg shadow-brutal p-6 min-h-[320px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 border-2 border-black rounded text-white inline-block font-mono text-[11px] font-bold ${categoryColorClass}`}
                      >
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-h3 text-dark mb-3 group-hover:text-electric-blue transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-body-small text-dark mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 text-brutalist-text-tertiary mb-4 text-[13px]">
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

                    <div className="flex items-center gap-2 text-body-small text-electric-blue transition-all group-hover:gap-3 font-heading font-semibold">
                      Leggi articolo
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 border-brutal border-black rounded-lg shadow-brutal-sm transition-all font-heading font-bold text-sm ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-dark hover:-translate-y-0.5 hover:shadow-brutal'
                }`}
              >
                ← Precedente
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                  if (!showPage) {
                    // Show ellipsis
                    if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return <span key={pageNum} className="px-2 text-dark">...</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 border-brutal border-black rounded-lg shadow-brutal-sm transition-all font-heading font-bold text-sm ${
                        currentPage === pageNum
                          ? 'bg-electric-blue text-white'
                          : 'bg-white text-dark hover:-translate-y-0.5 hover:shadow-brutal'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border-brutal border-black rounded-lg shadow-brutal-sm transition-all font-heading font-bold text-sm ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-dark hover:-translate-y-0.5 hover:shadow-brutal'
                }`}
              >
                Successivo →
              </button>
            </div>
          )}
          </>
        ) : (
          // No Results
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white border-brutal-thick border-black rounded-lg shadow-brutal mb-6">
              <Search className="w-16 h-16 text-brutalist-text-tertiary mx-auto mb-4" />
              <h3 className="text-h3 text-dark mb-3">
                Nessun articolo trovato
              </h3>
              <p className="text-body text-dark mb-6 max-w-[400px]">
                Prova a modificare i filtri o la ricerca per trovare quello che cerchi.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 bg-electric-blue text-white border-brutal border-black rounded-lg shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all font-heading font-bold text-sm"
              >
                Resetta filtri
              </button>
            </div>
          </div>
        )}

        {/* CTA Section at bottom */}
        {filteredPosts.length > 0 && (
          <div className="mt-20 bg-cyber-yellow border-brutal-thick border-black rounded-lg shadow-brutal-lg p-8 md:p-12 text-center -rotate-1">
            <h3 className="text-h3 text-dark mb-4">
              Non trovi quello che cerchi?
            </h3>
            <p className="text-body text-dark/80 mb-6 max-w-[600px] mx-auto">
              Scrivimi direttamente! Sono sempre felice di rispondere a domande specifiche o suggerimenti per futuri articoli.
            </p>
            <button
              onClick={handleContactClick}
              className="px-8 py-4 bg-dark text-white border-brutal-thick border-black rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-heading font-bold text-base"
            >
              Contattami
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
