'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Filter, ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';
import BlogCard from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { Input } from '@/components/ui/Input';
import { getCategoryVariant } from '@/lib/blog/category-utils';

interface BlogListingClientProps {
  initialPosts: BlogPost[];
  categories: string[];
  tags: string[];
  locale: string;
}

// Helper function to map category to NeoBadge color
const getCategoryColor = (category: string): 'blue' | 'pink' | 'yellow' | 'purple' | 'neutral' | 'teal' => {
  const categoryLower = category.toLowerCase();

  if (categoryLower.includes('design') || categoryLower.includes('ux')) return 'blue';
  if (categoryLower.includes('dev') || categoryLower.includes('sviluppo')) return 'teal';
  if (categoryLower.includes('pm') || categoryLower.includes('product') || categoryLower.includes('strategy')) return 'purple';
  if (categoryLower.includes('tool') || categoryLower.includes('analytic') || categoryLower.includes('strumenti')) return 'pink';
  if (categoryLower.includes('featured') || categoryLower.includes('special')) return 'yellow';

  return 'neutral';
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
    return initialPosts.filter(post => {
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
  }, [initialPosts, searchQuery, selectedCategory, selectedTags]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedTags]);

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
      <section className="bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-b-brutal-thick border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rotate-45" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full" />
        </div>

        <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-[800px]">
            <Button
              onClick={handleBackToHome}
              variant="outline"
              size="md"
              className="mb-6 bg-white text-brutalist-text-primary border-brutal border-black hover:-translate-y-1"
            >
              <ArrowLeft className="w-5 h-5" />
              Home
            </Button>

            <h1 className="text-h1 md:text-[64px] text-white mb-6 font-heading">
              Cose che ho imparato (sbagliando)
            </h1>
            <p className="text-body-large text-white/95 mb-8 max-w-[600px]">
              200+ progetti. 12 anni di carriera. Ogni articolo qui è una lezione che è costata tempo, soldi o orgoglio. O tutti e tre.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-[600px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brutalist-text-tertiary z-10" aria-hidden="true" />
                <Input
                  type="text"
                  placeholder="Cerca un problema specifico..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12"
                  aria-label="Cerca articoli"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brutalist-text-tertiary hover:text-dark transition-colors z-10"
                    aria-label="Cancella ricerca"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
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

              // For "All" category, use neutral color
              if (category === 'All') {
                return (
                  <NeoBadge
                    key={category}
                    color={isActive ? 'neutral' : 'neutral'}
                    onClick={() => setSelectedCategory(category)}
                    className={`cursor-pointer transition-all ${
                      isActive ? 'ring-4 ring-black/20' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {category}
                  </NeoBadge>
                );
              }

              return (
                <NeoBadge
                  key={category}
                  color={getCategoryColor(category)}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer transition-all ${
                    isActive ? 'ring-4 ring-black/20' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {category}
                  <span className="ml-2 opacity-70">
                    ({initialPosts.filter(p => p.category === category).length})
                  </span>
                </NeoBadge>
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
                    className={`inline-flex items-center justify-center gap-1 px-3 py-1 border-brutal border-black rounded-brutal-sm shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all text-body-sm font-heading font-bold uppercase tracking-wider whitespace-nowrap ${
                      isActive ? 'bg-teal text-white' : 'bg-white text-black'
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Filtra per tag ${tag}`}
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
          <div className="mb-6 p-brutal-md bg-white border-brutal border-black rounded-brutal shadow-brutal-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-body-small font-bold text-dark">
                Filtri attivi:
              </span>
              <Button
                onClick={handleResetFilters}
                variant="ghost"
                size="sm"
                className="text-electric-blue hover:underline"
              >
                Resetta tutto
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'All' && (
                <Badge variant={getCategoryVariant(selectedCategory)} size="sm">
                  Categoria: {selectedCategory}
                </Badge>
              )}
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="dev"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  #{tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 hover:opacity-70"
                    aria-label={`Rimuovi filtro ${tag}`}
                  >
                    <X className="w-3 h-3" aria-hidden="true" />
                  </button>
                </Badge>
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
              {paginatedPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                />
              ))}
            </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                ← Indietro
              </Button>

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
                    <Button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      variant={currentPage === pageNum ? 'primary' : 'outline'}
                      size="sm"
                      className="w-10 h-10 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
              >
                Avanti →
              </Button>
            </div>
          )}
          </>
        ) : (
          // No Results
          <div className="text-center py-20">
            <div className="inline-block p-brutal-xl bg-white border-brutal-thick border-black rounded-brutal shadow-brutal mb-6">
              <Search className="w-16 h-16 text-brutalist-text-tertiary mx-auto mb-4" />
              <h3 className="text-h3 text-dark mb-3">
                Niente qui
              </h3>
              <p className="text-body text-dark mb-6 max-w-[400px]">
                Prova altri filtri oppure fammi una domanda diretta. Magari diventa un articolo.
              </p>
              <Button
                onClick={handleResetFilters}
                variant="primary"
                size="md"
              >
                Resetta filtri
              </Button>
            </div>
          </div>
        )}

        {/* CTA Section at bottom */}
        {filteredPosts.length > 0 && (
          <div className="mt-20 bg-cyber-yellow border-brutal-thick border-black rounded-brutal-lg shadow-brutal-lg p-brutal-xl text-center -rotate-1 hover:rotate-0 transition-transform">
            <h3 className="text-h3 text-dark mb-4">
              Il tuo problema non è qui?
            </h3>
            <p className="text-body text-dark/80 mb-6 max-w-[600px] mx-auto">
              Fammi una domanda diretta. Se è interessante, diventa il prossimo articolo. Se no, rispondo comunque.
            </p>
            <Button
              onClick={handleContactClick}
              variant="primary"
              size="lg"
              className="bg-brutalist-text-primary text-white hover:bg-brutalist-text-primary/90"
            >
              Fammi una domanda
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
