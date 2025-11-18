'use client';

import { Clock, Calendar } from 'lucide-react';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { getCategoryVariant } from '@/lib/blog/category-utils';
import type { BlogPost } from '@/lib/blog/mdx';
import { SimpleBreadcrumbs } from './Breadcrumbs';

interface ArticleHeaderProps {
  post: BlogPost;
  locale: string;
}

/**
 * ArticleHeader - Header section with breadcrumb, metadata, title, and excerpt
 * @component
 * @category Blog Components
 */
export default function ArticleHeader({ post, locale }: ArticleHeaderProps) {
  return (
    <header className="mb-10">
      {/* Breadcrumb Navigation */}
      <SimpleBreadcrumbs
        category={post.category}
        title={post.title}
        locale={locale}
      />

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <NeoBadge variant={getCategoryVariant(post.category)} size="sm">
          {post.category}
        </NeoBadge>
        <div className="flex items-center gap-4 text-brutalist-text-tertiary font-body text-sm">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-h1 text-brutalist-text-primary mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-body-large text-brutalist-text-secondary leading-relaxed mb-8">
          {post.excerpt}
        </p>
      )}
    </header>
  );
}
