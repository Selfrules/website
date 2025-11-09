'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  featured?: boolean;
}

// Category color mapping
const categoryColors: Record<string, string> = {
  'Product': '#FF006E',
  'Strategy': '#7209B7',
  'OKRs': '#0D7EFF',
  'Design': '#0D7EFF',
  'Development': '#2A687A',
  'Leadership': '#FF006E',
};

export default function BlogCard({ post, locale, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const categoryColor = categoryColors[post.category] || '#2D2D2D';

  if (featured) {
    return (
      <article className="lg:col-span-3">
        <Link href={`/${locale}/blog/${post.slug}`}>
          <div className="bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal p-6 md:p-10 min-h-[300px] md:min-h-[350px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer relative overflow-hidden">
            {/* Decorative Circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 border-2 border-[#000] rounded-lg text-[#0A0A0A] inline-block"
                  style={{
                    backgroundColor: '#FFD60A',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {post.category}
                </span>
                <span
                  className="px-3 py-1 bg-white border-2 border-[#000] rounded-lg text-[#0A0A0A] inline-block"
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}
                >
                  FEATURED
                </span>
              </div>

              <h3 className="text-h2 md:text-h1 text-white mb-4">
                {post.title}
              </h3>
              <p className="text-body-small md:text-body text-white/95 mb-6 max-w-[800px]">
                {post.excerpt}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD60A] text-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal-sm transition-all hover:-translate-y-1 hover:shadow-brutal"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px' }}
              >
                {locale === 'it' ? 'Leggi ora' : 'Read now'}
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 min-h-[300px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer group">
      <Link href={`/${locale}/blog/${post.slug}`}>
        <div>
          <span
            className="px-3 py-1 border-2 border-[#000] rounded text-white inline-block mb-3"
            style={{
              backgroundColor: categoryColor,
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            {post.category}
          </span>
          <h3 className="text-h3 text-[#0A0A0A] mb-3 group-hover:text-[#0D7EFF] transition-colors">
            {post.title}
          </h3>
          <p className="text-body-small text-[#0A0A0A] mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 text-body-small text-[#6B7280] mb-3">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="inline-flex items-center gap-2 text-body-small text-[#0D7EFF] transition-all group-hover:gap-3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
            {locale === 'it' ? 'Leggi articolo' : 'Read article'}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </article>
  );
}