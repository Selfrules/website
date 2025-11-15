import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog/mdx';

interface BlogProps {
  locale: string;
}

// Category color mapping
const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'Product': '#FF006E',    // Neon Pink
    'Strategy': '#7209B7',   // Deep Purple
    'OKRs': '#0D7EFF',       // Electric Blue
    'Design': '#0D7EFF',     // Electric Blue
    'Development': '#2A687A', // Teal
  };
  return colorMap[category] || '#0D7EFF';
};

export default async function BlogNew({ locale }: BlogProps) {
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 3);
  const featuredPost = latestPosts[0];
  const regularPosts = latestPosts.slice(1, 3);

  const translations = {
    it: {
      badge: 'Latest thinking',
      title: 'Dal blog',
      description: 'Pensieri su design, sviluppo, product management e ',
      descriptionHighlight: 'tutto quello che ho imparato fallendo.',
      viewAll: 'Visualizza tutti gli articoli',
      readNow: 'Leggi ora',
    },
    en: {
      badge: 'Latest thinking',
      title: 'From the blog',
      description: 'Thoughts on design, development, product management and ',
      descriptionHighlight: 'everything I learned by failing.',
      viewAll: 'View all articles',
      readNow: 'Read now',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.it;

  if (latestPosts.length === 0) {
    return (
      <section id="blog" className="bg-cream py-16 md:py-24 border-b-brutal border-black">
        <div className="container max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center">
            <Badge variant="secondary">{t.badge}</Badge>
            <h2 className="text-h1 mt-4 mb-4 font-heading">{t.title}</h2>
            <p className="text-body text-brutalist-text-secondary">Nuovi articoli in arrivo...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="bg-cream py-16 md:py-24 border-b-brutal border-black relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-deep-purple/10 to-transparent rounded-full blur-3xl" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <Badge variant="secondary">Latest thinking</Badge>
          </div>
          <h2 className="text-h1 mb-4 font-heading">Dal blog</h2>
          <p className="text-body text-brutalist-text-secondary max-w-[600px] mx-auto font-body">
            Pensieri su design, sviluppo, product management e <strong className="text-neon-pink">tutto quello che ho imparato fallendo.</strong>
          </p>
        </div>

        {/* Grid - Mobile First: Stack, Desktop: Featured + 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <div className="lg:col-span-3">
              <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                <article className="bg-gradient-blog-hero border-brutal border-black rounded-brutal shadow-brutal p-6 md:p-10 min-h-[300px] md:min-h-[350px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer relative overflow-hidden">
                  {/* Decorative Circle */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />

                  <div className="relative z-10">
                    <Badge variant="featured" className="mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h3 className="text-h2 md:text-h1 text-white mb-4 font-heading">
                      {featuredPost.title}
                    </h3>
                    <p className="text-body-sm md:text-body text-white/95 mb-6 max-w-[800px] font-body">
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
                        {new Date(featuredPost.date).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <span className="px-6 py-3 bg-cyber-yellow text-brutalist-text-primary border-brutal-thin border-black rounded-brutal-sm shadow-brutal-sm transition-all hover:-translate-y-1 hover:shadow-brutal font-bold text-sm font-heading">
                      {t.readNow}
                    </span>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
              <article className="group bg-white border-brutal border-black rounded-brutal shadow-brutal hover:-translate-y-2 hover:shadow-brutal-lg transition-all cursor-pointer">
                <div className="p-6">
                  <span
                    className="inline-block px-3 py-1 mb-4 border-2 border-black rounded-brutal-sm text-white font-mono text-xs font-bold"
                    style={{
                      backgroundColor: getCategoryColor(post.category),
                    }}
                  >
                    {post.category}
                  </span>
                  <h3 className="text-body mb-4 text-brutalist-text-primary group-hover:text-electric-blue transition-colors leading-snug font-heading font-bold">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-body-sm text-brutalist-text-tertiary font-body">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {post.readingTime}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-electric-blue group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link href={`/${locale}/blog`}>
            <Button variant="accent" size="md">
              {t.viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
