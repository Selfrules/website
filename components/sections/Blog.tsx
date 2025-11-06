import { Newspaper } from 'lucide-react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog/mdx';
import BlogCard from '@/components/blog/BlogCard';
import CTAButton from '@/components/ui/CTAButton';

interface BlogProps {
  locale: string;
}

export default async function Blog({ locale }: BlogProps) {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 6); // Show latest 6 posts

  const translations = {
    it: {
      subtitle: 'Blog',
      title: 'Ultimi pensieri',
      description: 'Storie di fallimenti, successi e tutto quello che sta in mezzo. Senza filtri.',
      viewAll: 'Leggi tutti gli articoli',
      noPosts: 'Nuovi articoli in arrivo...',
    },
    en: {
      subtitle: 'Blog',
      title: 'Latest thoughts',
      description: 'Stories of failures, successes, and everything in between. No filters.',
      viewAll: 'Read all articles',
      noPosts: 'New articles coming soon...',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.it;

  return (
    <section className="py-20 lg:py-32 bg-brutalist-bg-light dark:bg-brutalist-bg-dark">
      <div className="brutal-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20
                       border-4 border-primary rounded-brutal text-primary font-medium mb-4">
            <Newspaper className="w-4 h-4" />
            <span className="text-sm">{t.subtitle}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black mb-4 text-brutalist-text-light dark:text-brutalist-text-dark">
            {t.title}
          </h2>
          <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Blog Grid */}
        {latestPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {latestPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                  featured={index === 0}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link href={`/${locale}/blog`}>
                <CTAButton variant="secondary">
                  {t.viewAll}
                </CTAButton>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
              {t.noPosts}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}