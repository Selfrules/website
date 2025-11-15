'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/blog/mdx';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getCategoryVariant } from '@/lib/blog/category-utils';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  featured?: boolean;
}

export default function BlogCard({ post, locale, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const categoryVariant = getCategoryVariant(post.category);

  if (featured) {
    return (
      <article className="lg:col-span-3">
        <Link href={`/${locale}/blog/${post.slug}`}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-gradient-to-br from-electric-blue via-deep-purple to-neon-pink border-brutal shadow-brutal hover:shadow-brutal-lg rounded-brutal-lg bg-white p-brutal-lg md:p-brutal-xl min-h-[300px] md:min-h-[350px] flex flex-col justify-between cursor-pointer relative overflow-hidden"
          >
            {/* Decorative Circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-brutal-sm">
                <Badge variant="featured" size="sm">
                  {post.category}
                </Badge>
                <Badge variant="featured" size="sm">
                  FEATURED
                </Badge>
              </div>

              <h3 className="text-h2 md:text-h1 text-white mb-brutal-sm">
                {post.title}
              </h3>
              <p className="text-body-small md:text-body text-white/95 mb-brutal-md max-w-[800px]">
                {post.excerpt}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
              </div>
              <Button variant="accent" size="sm">
                {locale === 'it' ? 'Leggi ora' : 'Read now'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </Link>
      </article>
    );
  }

  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group bg-white border-brutal shadow-brutal hover:shadow-brutal-lg rounded-brutal-lg cursor-pointer"
      >
        <div className="p-brutal-md flex flex-col h-full">
          <div className="mb-auto">
            <Badge variant={categoryVariant} size="sm" className="mb-brutal-sm">
              {post.category}
            </Badge>
            <h3 className="text-body mb-brutal-sm text-black group-hover:text-electric-blue transition-colors leading-snug font-heading font-bold">
              {post.title}
            </h3>
            <p className="text-body-small text-brutalist-text-secondary line-clamp-3 mb-brutal-sm">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-auto pt-brutal-sm border-t border-brutal-thin border-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-body-small text-brutalist-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-electric-blue group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}