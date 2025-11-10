import Link from 'next/link';
import { getAllPosts } from '@/lib/blog/mdx';
import BlogCard from '@/components/blog/BlogCard';
import { NeoBadge } from '@/components/ui/NeoBadge';

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
    <section id="blog" className="bg-[#FFFCF2] py-16 md:py-24 border-b-4 border-[#000] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#7209B7]/10 to-transparent rounded-full blur-3xl" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <NeoBadge color="pink">{t.badge}</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4 md:mb-6 text-[#0A0A0A]">{t.title}</h2>
          <p className="text-body text-[#2D2D2D] max-w-[600px] mx-auto">
            {t.description}<strong className="text-[#FF006E]">{t.descriptionHighlight}</strong>
          </p>
        </div>

        {/* Blog Grid */}
        {latestPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
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
                <button
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFD60A] text-[#0A0A0A] border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  {t.viewAll}
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-[#2D2D2D]/60">
              {t.noPosts}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}