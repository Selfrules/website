'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';
import { Button } from '@/components/ui/Button';
import ReadingProgressBar from './ReadingProgressBar';
import ArticleHeader from './ArticleHeader';
import ArticleSidebar from './ArticleSidebar';
import ProseStyles from './ProseStyles';
import BlogCard from './BlogCard';

interface BlogArticleClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: string;
  fullUrl: string;
  children: ReactNode; // Pre-compiled MDX content
}

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

// Extract headings from rendered DOM (after hydration)
function extractHeadingsFromDOM(): TableOfContentItem[] {
  const headings = document.querySelectorAll('article h2, article h3');
  const toc: TableOfContentItem[] = [];

  headings.forEach((heading) => {
    if (heading.id) {
      toc.push({
        id: heading.id,
        title: heading.textContent || '',
        level: heading.tagName === 'H2' ? 1 : 2,
      });
    }
  });

  return toc;
}

export default function BlogArticleClient({
  post,
  relatedPosts,
  locale,
  fullUrl,
  children, // Receive pre-compiled content
}: BlogArticleClientProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tableOfContents, setTableOfContents] = useState<TableOfContentItem[]>([]);

  // Extract ToC from rendered DOM (after hydration)
  useEffect(() => {
    // Wait for content to be in DOM
    const timer = setTimeout(() => {
      const toc = extractHeadingsFromDOM();
      setTableOfContents(toc);
    }, 100);

    return () => clearTimeout(timer);
  }, [children]); // Re-extract if content changes

  const shareUrl = fullUrl;
  const shareTitle = post.title;

  const handleBackToBlog = () => {
    router.push(`/${locale}/blog`);
  };

  // Replace scroll spy with IntersectionObserver (eliminates layout thrashing)
  useEffect(() => {
    if (tableOfContents.length === 0) return;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '-150px 0px -50% 0px', // Trigger when heading is in top half
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      // Find the topmost intersecting heading
      let topEntry: IntersectionObserverEntry | null = null;
      let topPosition = Infinity;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          if (rect.top < topPosition) {
            topPosition = rect.top;
            topEntry = entry;
          }
        }
      }

      if (topEntry && topEntry.target instanceof HTMLElement) {
        setActiveSection(topEntry.target.id);
      }
    }, observerOptions);

    // Observe all heading elements
    tableOfContents.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [tableOfContents]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Reading Progress Bar - Fixed at top */}
      <ReadingProgressBar />

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-cream border-b-brutal-thick border-black mt-1">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBackToBlog}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">
                {locale === 'it' ? 'Torna al Blog' : 'Back to Blog'}
              </span>
              <span className="sm:hidden">Blog</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar - ToC & Share */}
          <ArticleSidebar
            tableOfContents={tableOfContents}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            shareUrl={shareUrl}
            shareTitle={shareTitle}
          />

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Article Header */}
            <ArticleHeader
              post={post}
              locale={locale}
            />

            {/* Article Content with Enhanced Prose */}
            <ProseStyles>
              <article>
                {children} {/* Render pre-compiled MDX content */}
              </article>
            </ProseStyles>

            {/* Main CTA Section */}
            <div className="mt-16 bg-gradient-cta border-brutal-thick border-black rounded-brutal-lg shadow-brutal-lg p-brutal-xl -rotate-1 hover:rotate-0 transition-transform">
              <div className="text-center">
                <h3 className="text-white mb-4 font-heading font-black text-[28px]">
                  {locale === 'it'
                    ? 'Vuoi implementare strategie simili nel tuo team?'
                    : 'Want to implement similar strategies in your team?'}
                </h3>
                <p className="text-body-large text-white/95 mb-6 max-w-[600px] mx-auto leading-relaxed">
                  {locale === 'it'
                    ? 'Offro sessioni di consulenza personalizzate per aiutarti a costruire processi di Product Management efficaci.'
                    : 'I offer personalized consulting sessions to help you build effective Product Management processes.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => router.push(`/${locale}#ask-me`)}
                    variant="accent"
                    size="lg"
                    className="bg-cyber-yellow text-dark hover:bg-cyber-yellow/90"
                  >
                    {locale === 'it' ? 'Prenota una consulenza' : 'Book a consultation'}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleBackToBlog}
                    variant="outline"
                    size="lg"
                    className="bg-white"
                  >
                    {locale === 'it' ? 'Leggi altri articoli' : 'Read more articles'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-h3 text-brutalist-text-primary">
                    📚 {locale === 'it' ? 'Continua a leggere' : 'Continue reading'}
                  </h3>
                  <Button
                    onClick={handleBackToBlog}
                    variant="ghost"
                    size="sm"
                    className="text-electric-blue hover:underline"
                  >
                    {locale === 'it' ? 'Vedi tutti →' : 'See all →'}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <BlogCard
                      key={related.slug}
                      post={related}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
