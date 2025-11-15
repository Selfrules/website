import Link from 'next/link';
import { getAllPosts } from '@/lib/blog/mdx';
import BlogCard from '@/components/blog/BlogCard';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { Button } from '@/components/ui/Button';

interface BlogProps {
  locale: string;
}

export default async function Blog({ locale }: BlogProps) {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3); // Show latest 3 posts

  const translations = {
    it: {
      badge: 'Latest thinking',
      title: 'Dal blog',
      description: 'Pensieri su design, sviluppo, product management e ',
      descriptionHighlight: 'tutto quello che ho imparato fallendo.',
      viewAll: 'Vedi tutti gli articoli',
      noPosts: 'Nuovi articoli in arrivo...',
    },
    en: {
      badge: 'Latest thinking',
      title: 'From the blog',
      description: 'Thoughts on design, development, product management and ',
      descriptionHighlight: 'everything I learned by failing.',
      viewAll: 'View all articles',
      noPosts: 'New articles coming soon...',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.it;

  return (
    <section id="blog" className="bg-cream py-brutal-xl md:py-brutal-2xl border-b-brutal border-brutalist-border relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-glow-purple rounded-full blur-3xl" />

      <div className="container max-w-[1200px] mx-auto px-brutal-sm md:px-brutal-lg relative z-10">
        {/* Section Header */}
        <div className="text-center mb-brutal-lg md:mb-brutal-xl">
          <div className="flex justify-center mb-brutal-sm">
            <NeoBadge color="pink">{t.badge}</NeoBadge>
          </div>
          <h2 className="text-h1 mb-brutal-sm md:mb-brutal-md text-black">{t.title}</h2>
          <p className="text-body text-brutalist-text-light max-w-[600px] mx-auto">
            {t.description}<strong className="text-neon-pink">{t.descriptionHighlight}</strong>
          </p>
        </div>

        {/* Blog Grid - Featured Post + Regular Posts */}
        {latestPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-brutal-md md:gap-brutal-lg">
              {/* Featured Post - Full Width */}
              {latestPosts[0] && (
                <BlogCard
                  key={latestPosts[0].slug}
                  post={latestPosts[0]}
                  locale={locale}
                  featured={true}
                />
              )}

              {/* Regular Posts - 2 columns */}
              {latestPosts.slice(1, 3).map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                  featured={false}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-brutal-lg">
              <Link href={`/${locale}/blog`}>
                <Button variant="accent" size="md">
                  {t.viewAll}
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-brutal-xl">
            <p className="text-lg text-brutalist-text-light/60">
              {t.noPosts}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}