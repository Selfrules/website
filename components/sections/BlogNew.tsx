import React from 'react';
import Link from 'next/link';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { Button } from '@/components/ui/Button';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/blog/mdx';

interface BlogProps {
  locale: string;
}

export default async function BlogNew({ locale }: BlogProps) {
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 3);
  const featuredPost = latestPosts[0];
  const regularPosts = latestPosts.slice(1, 3);

  const translations = {
    it: {
      badge: 'Dal campo',
      title: 'Errori che costano mesi (e come evitarli)',
      description: '"User testing inutile", "Roadmap che nessuno segue", "Feature che nessuno usa". ',
      descriptionHighlight: 'Come ho imparato a riconoscere i segnali prima del disastro.',
      viewAll: 'Vedi tutti gli articoli',
      readNow: 'Leggi',
    },
    en: {
      badge: 'From the field',
      title: 'Mistakes that cost months (and how to avoid them)',
      description: '"Useless user testing", "Roadmap nobody follows", "Features nobody uses". ',
      descriptionHighlight: 'How I learned to spot the signs before disaster.',
      viewAll: 'See all articles',
      readNow: 'Read',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.it;

  if (latestPosts.length === 0) {
    return (
      <section id="blog" className="bg-cream py-16 md:py-24 border-b-brutal border-black">
        <div className="container max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center">
            <NeoBadge color="pink">{t.badge}</NeoBadge>
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
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-glow-purple rounded-full blur-3xl" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <NeoBadge color="pink">{t.badge}</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4 font-heading">{t.title}</h2>
          <p className="text-body text-brutalist-text-secondary max-w-[600px] mx-auto font-body">
            Pensieri su design, sviluppo, product management e <strong className="text-neon-pink">tutto quello che ho imparato fallendo.</strong>
          </p>
        </div>

        {/* Grid - Mobile First: Stack, Desktop: Featured + 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <BlogCard post={featuredPost} locale={locale} featured={true} />
          )}

          {/* Regular Posts */}
          {regularPosts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link href={`/${locale}/blog`}>
            <Button variant="primary" size="lg" className="bg-neon-pink">
              {t.viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
