'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  featured?: boolean;
}

export default function BlogCard({ post, locale, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ x: -4, y: -4 }}
        transition={{ type: 'spring', stiffness: 400 }}
        className="col-span-full md:col-span-2 lg:col-span-2"
      >
        <Link href={`/${locale}/blog/${post.slug}`}>
          <div className="relative h-full bg-white dark:bg-gray-900 rounded-brutal border-4 border-black shadow-brutal hover:shadow-brutal-hover transition-all cursor-pointer overflow-hidden">
            {/* Featured badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-primary text-black font-bold text-sm rounded-full border-2 border-black">
                FEATURED
              </span>
            </div>

            {/* Cover image placeholder */}
            <div className="h-64 bg-gradient-to-br from-primary via-secondary to-accent opacity-80" />

            <div className="p-6">
              {/* Category */}
              <div className="mb-2">
                <span className="px-3 py-1 bg-secondary/20 text-secondary dark:text-secondary-light font-semibold text-sm rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 text-brutalist-text-light dark:text-brutalist-text-dark">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-primary font-bold group">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: -2, y: -2 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <Link href={`/${locale}/blog/${post.slug}`}>
        <div className="h-full bg-white dark:bg-gray-900 rounded-brutal border-4 border-black shadow-brutal hover:shadow-brutal-hover transition-all cursor-pointer p-6">
          {/* Category */}
          <div className="mb-2">
            <span className="px-2 py-1 bg-secondary/20 text-secondary dark:text-secondary-light font-semibold text-xs rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-bold mb-2 text-brutalist-text-light dark:text-brutalist-text-dark line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 text-sm mb-3 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}