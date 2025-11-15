'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/blog/mdx';
import { Badge } from '@/components/ui/Badge';
import { NeoBadge } from '@/components/ui/NeoBadge';
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
            className="group bg-cyber-yellow border-brutal shadow-brutal hover:shadow-brutal-lg rounded-brutal-lg p-brutal-lg md:p-brutal-xl min-h-[300px] md:min-h-[350px] flex flex-col justify-between cursor-pointer relative overflow-hidden"
          >
            {/* Decorative Circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-black/5 rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-brutal-sm">
                <NeoBadge color="yellow">
                  {post.category}
                </NeoBadge>
                <Badge variant="featured" size="sm">
                  DA NON PERDERE
                </Badge>
              </div>

              <h3 className="text-h2 md:text-h1 text-brutalist-text-primary mb-brutal-sm font-heading font-black">
                {post.title}
              </h3>
              <p className="text-body-small md:text-body text-brutalist-text-secondary mb-brutal-md max-w-[800px]">
                {post.excerpt}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4 text-brutalist-text-secondary text-sm">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-body-small text-brutalist-text-primary font-heading font-bold group-hover:gap-3 transition-all">
                <span className="uppercase">{locale === 'it' ? 'Leggi ora' : 'Read now'}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
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
        <div className="p-6 flex flex-col h-full min-h-[280px]">
          {/* Badge inline */}
          <div className="mb-brutal-sm">
            <Badge variant={categoryVariant} size="sm">
              {post.category}
            </Badge>
          </div>

          {/* Title - hover changes color as per design system */}
          <h3 className="text-h4 mb-brutal-sm text-brutalist-text-primary group-hover:text-electric-blue transition-colors leading-snug font-heading font-bold">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-body-small text-brutalist-text-secondary line-clamp-3 mb-brutal-sm">
            {post.excerpt}
          </p>

          {/* Spacer to push metadata to bottom */}
          <div className="flex-1" />

          {/* Metadata Footer */}
          <div className="pt-brutal-sm">
            <div className="flex items-center gap-2 text-body-small text-brutalist-text-tertiary mb-3">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
              <span>-</span>
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-body-small text-electric-blue font-heading font-bold group-hover:gap-3 transition-all">
              <span className="uppercase">{locale === 'it' ? 'Leggi articolo' : 'Read article'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}