'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogFilters from '@/components/blog/BlogFilters';
import { BlogPost } from '@/lib/blog/mdx';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface BlogListingClientProps {
  initialPosts: BlogPost[];
  categories: string[];
  tags: string[];
  locale: string;
}

export default function BlogListingClient({
  initialPosts,
  categories,
  tags,
  locale,
}: BlogListingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Filter posts based on search, category, and tags
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        selectedCategory === null || post.category === selectedCategory;

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => post.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [initialPosts, searchQuery, selectedCategory, selectedTags]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Featured post (most recent)
  const featuredPost = initialPosts[0];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTags([]);
    setCurrentPage(1);
  };

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedTags]);

  return (
    <div className="brutal-container py-16 md:py-24">
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary border-4 border-black rounded-brutal shadow-brutal mb-4">
          <BookOpen className="w-8 h-8 text-black" />
          <h1 className="font-heading font-black text-h1 text-black">
            Blog
          </h1>
        </div>
        <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 text-body-lg max-w-2xl">
          Product management insights, startup lessons, and tech reflections from
          a PM who learned through failure.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        {/* Search + Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <BlogSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search articles..."
            resultsCount={filteredPosts.length}
          />

          <BlogFilters
            categories={categories}
            tags={tags}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            onCategoryChange={setSelectedCategory}
            onTagsChange={setSelectedTags}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="lg:col-span-3">
          {filteredPosts.length === 0 ? (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center py-16"
            >
              <div className="inline-block px-6 py-4 bg-white dark:bg-gray-900 border-4 border-black rounded-brutal shadow-brutal">
                <p className="text-brutalist-text-light dark:text-brutalist-text-dark text-body-lg">
                  No articles found. Try adjusting your filters.
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Featured Post (only on first page without filters) */}
              {currentPage === 1 &&
                selectedCategory === null &&
                selectedTags.length === 0 &&
                searchQuery === '' &&
                featuredPost && (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="mb-8"
                  >
                    <BlogCard post={featuredPost} locale={locale} featured />
                  </motion.div>
                )}

              {/* Posts Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {paginatedPosts.map((post) => (
                  <motion.div key={post.slug} variants={fadeInUp}>
                    <BlogCard post={post} locale={locale} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  variants={fadeInUp}
                  className="mt-12 flex justify-center gap-2"
                >
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = currentPage === pageNumber;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 border-4 border-black rounded-brutal font-heading font-bold transition-all ${
                          isActive
                            ? 'bg-primary text-black shadow-brutal'
                            : 'bg-white dark:bg-gray-900 text-brutalist-text-light dark:text-brutalist-text-dark hover:shadow-brutal-sm'
                        }`}
                        aria-label={`Go to page ${pageNumber}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
