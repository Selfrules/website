'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Link2, ChevronRight, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';

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
  const [readingProgress, setReadingProgress] = useState(0);

  // Table of Contents - extracted from content or mock
  const tableOfContents: TableOfContentItem[] = [
    { id: 'intro', title: 'Introduzione', level: 1 },
    { id: 'problema', title: 'Il problema', level: 1 },
    { id: 'contesto', title: 'Il contesto', level: 2 },
    { id: 'sfide', title: 'Le sfide', level: 2 },
    { id: 'soluzione', title: 'La soluzione', level: 1 },
    { id: 'approccio', title: 'Approccio', level: 2 },
    { id: 'implementazione', title: 'Implementazione', level: 2 },
    { id: 'risultati', title: 'Risultati', level: 1 },
    { id: 'lezioni', title: 'Lezioni apprese', level: 1 },
    { id: 'conclusione', title: 'Conclusione', level: 1 },
  ];

  const shareUrl = fullUrl;
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copiato negli appunti!');
    } else if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const handleBackToBlog = () => {
    router.push(`/${locale}/blog`);
  };

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy for ToC
  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

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
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r bg-gradient-brand transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-cream border-b-brutal-thick border-black mt-1">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToBlog}
              className="flex items-center gap-2 px-4 py-2 bg-white text-brutalist-text-primary border-brutal border-black rounded-brutal shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">Torna al Blog</span>
              <span className="sm:hidden">Blog</span>
            </button>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="relative p-2 bg-white text-brutalist-text-primary border-brutal border-black rounded-brutal shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {showShareMenu && (
                <div className="absolute top-16 right-6 bg-white border-brutal border-black rounded-brutal shadow-brutal p-3 flex flex-col gap-2 min-w-[180px] z-10">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-3 py-2 text-brutalist-text-primary hover:bg-cream rounded text-left transition-colors font-body text-sm"
                  >
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-3 py-2 text-brutalist-text-primary hover:bg-cream rounded text-left transition-colors font-body text-sm"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 px-3 py-2 text-brutalist-text-primary hover:bg-cream rounded text-left transition-colors font-body text-sm"
                  >
                    <Link2 className="w-4 h-4" />
                    Copia link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar - ToC & Share */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents */}
              <div className="bg-white border-brutal-thick border-black rounded-brutal shadow-brutal p-5">
                <h3
                  className="mb-4 pb-3 border-b-brutal border-black text-brutalist-text-primary"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  📑 Indice
                </h3>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-brutal transition-all group ${
                        activeSection === item.id
                          ? 'bg-[#0D7EFF] text-white shadow-brutal-sm'
                          : 'text-brutalist-text-secondary hover:bg-cream hover:translate-x-1'
                      } ${item.level === 2 ? 'pl-6 text-sm' : 'text-sm'}`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: activeSection === item.id ? 600 : 400,
                      }}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Share Buttons */}
              <div className="bg-white border-brutal-thick border-black rounded-brutal shadow-brutal p-5">
                <h4
                  className="mb-3 text-brutalist-text-primary"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  🔗 Condividi
                </h4>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-3 py-2.5 bg-[#1DA1F2] text-white border-brutal border-black rounded-brutal shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all font-body text-sm font-semibold"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-3 py-2.5 bg-[#0A66C2] text-white border-brutal border-black rounded-brutal shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all font-body text-sm font-semibold"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 px-3 py-2.5 bg-white text-brutalist-text-primary border-brutal border-black rounded-brutal shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all font-body text-sm font-semibold"
                  >
                    <Link2 className="w-4 h-4" />
                    Copia link
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Article Header */}
            <header className="mb-10">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm text-brutalist-text-tertiary">
                <button
                  onClick={handleBackToBlog}
                  className="hover:text-[#0D7EFF] transition-colors font-body"
                >
                  Blog
                </button>
                <ChevronRight className="w-3 h-3" />
                <span className="font-body">{post.category}</span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className="px-3 py-1.5 border-brutal border-black rounded-brutal shadow-brutal-sm text-white"
                  style={{
                    backgroundColor: getCategoryColor(post.category),
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-brutalist-text-tertiary font-body text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readingTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-h1 text-brutalist-text-primary mb-6 leading-tight">{post.title}</h1>

              {/* Excerpt */}
              <p className="text-body-large text-brutalist-text-secondary leading-relaxed mb-8">{post.excerpt}</p>
            </header>

            {/* Article Content with MDX */}
            <div
              className="prose prose-lg max-w-none blog-article-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Main CTA Section */}
            <div className="mt-16 bg-gradient-brand border-brutal-thick border-black rounded-brutal shadow-brutal-lg p-8 md:p-12 -rotate-1 hover:rotate-0 transition-transform">
              <div className="text-center rotate-1 hover:-rotate-1 transition-transform">
                <h3 className="text-white mb-4 font-heading font-black text-[28px]">
                  Vuoi implementare strategie simili nel tuo team?
                </h3>
                <p className="text-body-large text-white/95 mb-6 max-w-[600px] mx-auto leading-relaxed">
                  Offro sessioni di consulenza personalizzate per aiutarti a costruire processi di Product Management efficaci.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      router.push(`/${locale}#ask-me`);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyber-yellow text-brutalist-text-primary border-brutal-thick border-black rounded-brutal shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-heading font-bold text-base"
                  >
                    Prenota una consulenza
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleBackToBlog}
                    className="inline-block px-8 py-4 bg-white text-brutalist-text-primary border-brutal-thick border-black rounded-brutal shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all font-heading font-bold text-base"
                  >
                    Leggi altri articoli
                  </button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-h3 text-brutalist-text-primary">📚 Continua a leggere</h3>
                  <button
                    onClick={handleBackToBlog}
                    className="text-[#0D7EFF] hover:underline text-body-small transition-all font-heading font-semibold"
                  >
                    Vedi tutti →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <article
                      key={related.slug}
                      onClick={() => router.push(`/${locale}/blog/${related.slug}`)}
                      className="group bg-white border-brutal-thick border-black rounded-brutal shadow-brutal hover:-translate-y-2 hover:shadow-brutal-lg transition-all cursor-pointer"
                    >
                      <div className="p-6">
                        <span
                          className="inline-block px-3 py-1 mb-4 border-2 border-black rounded-brutal text-white"
                          style={{
                            backgroundColor: getCategoryColor(related.category),
                            fontFamily: 'Space Mono, monospace',
                            fontSize: '11px',
                            fontWeight: 700,
                          }}
                        >
                          {related.category}
                        </span>
                        <h4 className="text-body mb-4 text-brutalist-text-primary group-hover:text-[#0D7EFF] transition-colors font-heading font-bold">
                          {related.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-body-small text-brutalist-text-tertiary flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {related.readingTime}
                          </span>
                          <ChevronRight className="w-5 h-5 text-[#0D7EFF] group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                        </div>
                      </div>
                    </article>
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

// Helper function to get category color
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'Product': '#FF006E',    // Neon Pink
    'Strategy': '#7209B7',   // Deep Purple
    'OKRs': '#0D7EFF',       // Electric Blue
    'Design': '#0D7EFF',     // Electric Blue
    'Development': '#2A687A', // Teal
    'Leadership': '#7209B7', // Deep Purple
  };
  return colorMap[category] || '#0D7EFF';
}
