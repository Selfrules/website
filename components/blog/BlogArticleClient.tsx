'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Twitter, Linkedin, Link2, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { getCategoryVariant } from '@/lib/blog/category-utils';
import ReadingProgressBar from './ReadingProgressBar';
import ArticleHeader from './ArticleHeader';
import ArticleSidebar from './ArticleSidebar';
import ProseStyles from './ProseStyles';

interface BlogArticleClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: string;
  contentHtml: string;
  fullUrl: string;
}

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

// Extract headings from HTML content to build ToC
function extractHeadings(html: string): TableOfContentItem[] {
  const tempDiv = typeof window !== 'undefined' ? document.createElement('div') : null;
  if (!tempDiv) return [];

  tempDiv.innerHTML = html;
  const headings = tempDiv.querySelectorAll('h2, h3');

  const toc: TableOfContentItem[] = [];
  headings.forEach((heading, index) => {
    const level = heading.tagName === 'H2' ? 1 : 2;
    const title = heading.textContent || '';
    const id = heading.id || `heading-${index}`;

    // Ensure heading has ID for scroll-to functionality
    heading.id = id;

    toc.push({ id, title, level });
  });

  return toc;
}

export default function BlogArticleClient({
  post,
  relatedPosts,
  locale,
  contentHtml,
  fullUrl,
}: BlogArticleClientProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentItem[]>([]);

  // Extract ToC from content on mount
  useEffect(() => {
    const toc = extractHeadings(contentHtml);
    setTableOfContents(toc);
  }, [contentHtml]);

  const shareUrl = fullUrl;
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setShowShareMenu(false);
    } else if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  const handleBackToBlog = () => {
    router.push(`/${locale}/blog`);
  };

  // Scroll spy for ToC
  useEffect(() => {
    const handleScroll = () => {
      if (tableOfContents.length === 0) return;

      const sections = tableOfContents.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowShareMenu(!showShareMenu)}
                variant="outline"
                size="sm"
                className="relative p-2"
              >
                <Share2 className="w-4 h-4" />
              </Button>

              {showShareMenu && (
                <Card className="absolute top-16 right-6 p-3 min-w-[180px] z-10">
                  <CardContent className="p-0 flex flex-col gap-2">
                    <Button
                      onClick={() => handleShare('twitter')}
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                    >
                      <Twitter className="w-4 h-4 text-electric-blue" />
                      Twitter
                    </Button>
                    <Button
                      onClick={() => handleShare('linkedin')}
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                    >
                      <Linkedin className="w-4 h-4 text-electric-blue" />
                      LinkedIn
                    </Button>
                    <Button
                      onClick={() => handleShare('copy')}
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                    >
                      <Link2 className="w-4 h-4" />
                      {locale === 'it' ? 'Copia link' : 'Copy link'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
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
              onBackClick={handleBackToBlog}
            />

            {/* Article Content with Enhanced Prose */}
            <ProseStyles>
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
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
                    <Card
                      key={related.slug}
                      onClick={() => router.push(`/${locale}/blog/${related.slug}`)}
                      hoverable
                      clickable
                      className="group"
                    >
                      <CardContent className="p-brutal-md">
                        <Badge variant={getCategoryVariant(related.category)} size="sm" className="mb-4">
                          {related.category}
                        </Badge>
                        <h4 className="text-body mb-4 text-brutalist-text-primary group-hover:text-electric-blue transition-colors font-heading font-bold">
                          {related.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-body-small text-brutalist-text-tertiary flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {related.readingTime}
                          </span>
                          <ChevronRight className="w-5 h-5 text-electric-blue group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                        </div>
                      </CardContent>
                    </Card>
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
