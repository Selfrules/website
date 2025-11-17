'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Clock, Calendar, Eye } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { getCategoryVariant } from '@/lib/blog/category-utils';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  featured?: boolean;
}

export default function BlogCard({ post, locale, featured = false }: BlogCardProps) {
  const t = useTranslations('blog');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const categoryVariant = getCategoryVariant(post.category);

  // Map category to gradient header
  const gradientHeaderMap: Record<string, string> = {
    primary: 'bg-gradient-to-br from-neon-pink to-cyber-yellow',
    secondary: 'bg-gradient-to-br from-teal to-electric-blue',
    accent: 'bg-gradient-to-br from-electric-blue via-deep-purple to-deep-purple',
    pm: 'bg-gradient-to-br from-electric-blue via-deep-purple to-deep-purple',
    design: 'bg-gradient-to-br from-neon-pink to-cyber-yellow',
    dev: 'bg-gradient-to-br from-teal to-electric-blue',
    tool: 'bg-gradient-to-br from-neon-pink to-deep-purple',
    featured: 'bg-gradient-to-br from-cyber-yellow via-neon-pink to-electric-blue',
  };

  const gradientHeader = gradientHeaderMap[categoryVariant] || 'bg-gradient-to-br from-electric-blue via-deep-purple to-deep-purple';

  // Featured post - Large card with purple gradient
  if (featured) {
    return (
      <article className="lg:col-span-3">
        <Link href={`/${locale}/blog/${post.slug}`}>
          <div
            className="group border-brutal-thick border-black rounded-brutal-lg shadow-brutal-lg overflow-hidden bg-white hover:-translate-y-2 hover:shadow-brutal-lg transition-all cursor-pointer"
          >
            {/* Gradient Header - Featured (larger) */}
            <div className={`p-brutal-lg md:p-brutal-xl min-h-[200px] md:min-h-[250px] relative ${gradientHeader}`}>
              <div className="flex items-center gap-3">
                <NeoBadge variant={categoryVariant} size="sm">
                  {post.category}
                </NeoBadge>
                <NeoBadge variant="featured" size="sm">
                  {t('card.featured')}
                </NeoBadge>
              </div>
            </div>

            {/* White Body */}
            <div className="p-brutal-lg md:p-brutal-xl">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                {post.title}
              </h3>
              <p className="text-text-secondary text-sm md:text-base mb-6 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-text-tertiary">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Regular post - Standard card
  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <article
        className="border-brutal-thick border-black rounded-brutal-lg shadow-brutal-lg overflow-hidden bg-white hover:-translate-y-2 hover:shadow-brutal-lg transition-all cursor-pointer"
      >
        {/* Gradient Header */}
        <div className={`p-6 min-h-[140px] relative ${gradientHeader}`}>
          <NeoBadge variant={categoryVariant} size="sm">
            {post.category}
          </NeoBadge>
        </div>

        {/* White Body */}
        <div className="p-6">
          <h3 className="font-heading font-bold text-xl mb-2">
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-text-tertiary">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
