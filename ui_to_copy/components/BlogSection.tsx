import React from 'react';
import { NeoBadge } from './NeoBadge';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  date: string;
  color: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: 'Product',
    title: 'Il fallimento come feature, non come bug',
    excerpt: 'Ho sprecato 3 mesi su un contratto di 50 pagine che nessuno ha mai letto. Oggi uso un accordo di 2 pagine e funziona meglio. Ecco perché il fallimento è la migliore forma di apprendimento.',
    readingTime: '8 min',
    date: '5 Nov 2025',
    color: '#FF006E',
    featured: true,
  },
  {
    id: 2,
    category: 'Strategy',
    title: 'Product-Market Fit: Il mito da sfatare',
    excerpt: 'Non esiste un momento magico dove "trovi" il PMF. È un processo continuo di aggiustamenti.',
    readingTime: '6 min',
    date: '28 Ott 2025',
    color: '#7209B7',
  },
  {
    id: 3,
    category: 'OKRs',
    title: 'OKR che funzionano vs OKR che sembrano fighi',
    excerpt: 'La differenza tra OKR che portano risultati e quelli che finiscono in un Google Doc dimenticato.',
    readingTime: '7 min',
    date: '15 Ott 2025',
    color: '#0D7EFF',
  },
];

export { blogPosts };
export type { BlogPost };

interface BlogSectionProps {
  onArticleClick?: (article: BlogPost) => void;
  onViewAllClick?: () => void;
}

export function BlogSection({ onArticleClick, onViewAllClick }: BlogSectionProps) {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="bg-[#FFFCF2] py-16 md:py-24 border-b-4 border-[#000] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#7209B7]/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <NeoBadge color="pink">Latest thinking</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4">Dal blog</h2>
          <p className="text-body text-[#2D2D2D] max-w-[600px] mx-auto">
            Pensieri su design, sviluppo, product management e <strong className="text-[#FF006E]">tutto quello che ho imparato fallendo.</strong>
          </p>
        </div>

        {/* Grid - Mobile First: Stack, Desktop: Featured + 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <div className="lg:col-span-3">
              <article 
                onClick={() => onArticleClick?.(featuredPost)}
                className="bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal p-6 md:p-10 min-h-[300px] md:min-h-[350px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer relative overflow-hidden"
              >
                {/* Decorative Circle */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
                
                <div className="relative z-10">
                  <NeoBadge color="yellow" className="mb-4">
                    {featuredPost.category}
                  </NeoBadge>
                  <h3 className="text-h2 md:text-h1 text-white mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-body-small md:text-body text-white/95 mb-6 max-w-[800px]">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readingTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                  </div>
                  <button className="px-6 py-3 bg-[#FFD60A] text-[#0A0A0A] border-3 border-[#000] rounded shadow-brutal-sm transition-all hover:-translate-y-1 hover:shadow-brutal font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Leggi ora
                  </button>
                </div>
              </article>
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onArticleClick?.(post)}
              className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 min-h-[280px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer group"
            >
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
                    {post.date}
                  </span>
                </div>
                <a 
                  href="#"
                  className="inline-flex items-center gap-2 text-[#0D7EFF] transition-all group-hover:gap-3 font-semibold text-sm"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Leggi articolo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        {onViewAllClick && (
          <div className="text-center mt-8">
            <button
              onClick={onViewAllClick}
              className="px-6 py-3 bg-[#FFD60A] text-[#0A0A0A] border-3 border-[#000] rounded shadow-brutal-sm transition-all hover:-translate-y-1 hover:shadow-brutal font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Visualizza tutti gli articoli
            </button>
          </div>
        )}
      </div>
    </section>
  );
}