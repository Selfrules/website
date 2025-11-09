'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { NeoBadge } from '@/components/ui/NeoBadge';
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
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (featured) {
    return (
      <article className="lg:col-span-3">
        <Link href={`/${locale}/blog/${post.slug}`}>
          <div className="bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal p-6 md:p-10 min-h-[300px] md:min-h-[350px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer relative overflow-hidden">
            {/* Decorative Circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <NeoBadge color="yellow" className="mb-4">
                {post.category}
              </NeoBadge>
              <h3 className="text-h2 md:text-h1 text-white mb-4">
                {post.title}
              </h3>
              <p className="text-body-small md:text-body text-white/95 mb-6 max-w-[800px]">
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
              <button className="px-6 py-3 bg-[#FFD60A] text-[#0A0A0A] border-3 border-[#000] rounded shadow-brutal-sm transition-all hover:-translate-y-1 hover:shadow-brutal font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {locale === 'it' ? 'Leggi ora' : 'Read now'}
              </button>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 min-h-[280px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer group">
      <Link href={`/${locale}/blog/${post.slug}`}>
        <div>
          <NeoBadge color="neutral" className="mb-3 text-xs">
            {post.category}
          </NeoBadge>
          <h3 className="text-h3 mb-3 text-[#0A0A0A] group-hover:text-[#0D7EFF] transition-colors">
            {post.title}
          </h3>
          <p className="text-body-small text-[#2D2D2D] mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 text-[#6B7280] text-xs mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 text-[#0D7EFF] transition-all group-hover:gap-3 font-semibold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {locale === 'it' ? 'Leggi articolo' : 'Read article'}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </article>
  );
}