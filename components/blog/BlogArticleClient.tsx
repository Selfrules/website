'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Link2, ChevronRight, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';

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
          className="h-full bg-gradient-brand transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-cream border-b-brutal-thick border-black mt-1">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBackToBlog}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">Torna al Blog</span>
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
                      <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                      Twitter
                    </Button>
                    <Button
                      onClick={() => handleShare('linkedin')}
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                    >
                      <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                      LinkedIn
                    </Button>
                    <Button
                      onClick={() => handleShare('copy')}
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                    >
                      <Link2 className="w-4 h-4" />
                      Copia link
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
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents */}
              <Card>
                <CardContent className="p-brutal-md">
                  <h3 className="text-body-small font-heading font-bold mb-4 pb-3 border-b-brutal border-black text-brutalist-text-primary">
                    📑 Indice
                  </h3>
                  <nav className="space-y-1">
                    {tableOfContents.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        variant={activeSection === item.id ? 'primary' : 'ghost'}
                        size="sm"
                        className={`w-full justify-start ${item.level === 2 ? 'pl-6 text-sm' : 'text-sm'}`}
                      >
                        {item.title}
                      </Button>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Share Buttons */}
              <Card>
                <CardContent className="p-brutal-md">
                  <h4 className="text-body-small font-heading font-bold mb-3 text-brutalist-text-primary">
                    🔗 Condividi
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleShare('twitter')}
                      variant="primary"
                      size="sm"
                      className="bg-[#1DA1F2] hover:bg-[#1a8cd8]"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                    <Button
                      onClick={() => handleShare('linkedin')}
                      variant="primary"
                      size="sm"
                      className="bg-[#0A66C2] hover:bg-[#095196]"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Button>
                    <Button
                      onClick={() => handleShare('copy')}
                      variant="outline"
                      size="sm"
                    >
                      <Link2 className="w-4 h-4" />
                      Copia link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Article Header */}
            <header className="mb-10">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm text-brutalist-text-tertiary">
                <Button
                  onClick={handleBackToBlog}
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto hover:text-electric-blue"
                >
                  Blog
                </Button>
                <ChevronRight className="w-3 h-3" />
                <span className="font-body">{post.category}</span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant={getCategoryVariant(post.category)} size="sm">
                  {post.category}
                </Badge>
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
            <div className="mt-16 bg-gradient-brand border-brutal-thick border-black rounded-brutal-lg shadow-brutal-lg p-brutal-xl -rotate-1 hover:rotate-0 transition-transform">
              <div className="text-center">
                <h3 className="text-white mb-4 font-heading font-black text-[28px]">
                  Vuoi implementare strategie simili nel tuo team?
                </h3>
                <p className="text-body-large text-white/95 mb-6 max-w-[600px] mx-auto leading-relaxed">
                  Offro sessioni di consulenza personalizzate per aiutarti a costruire processi di Product Management efficaci.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => router.push(`/${locale}#ask-me`)}
                    variant="accent"
                    size="lg"
                    className="bg-cyber-yellow text-dark hover:bg-cyber-yellow/90"
                  >
                    Prenota una consulenza
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleBackToBlog}
                    variant="outline"
                    size="lg"
                    className="bg-white"
                  >
                    Leggi altri articoli
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-h3 text-brutalist-text-primary">📚 Continua a leggere</h3>
                  <Button
                    onClick={handleBackToBlog}
                    variant="ghost"
                    size="sm"
                    className="text-electric-blue hover:underline"
                  >
                    Vedi tutti →
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

// Helper function to get category variant
function getCategoryVariant(category: string): 'design' | 'dev' | 'pm' | 'tool' | 'featured' {
  const variantMap: Record<string, 'design' | 'dev' | 'pm' | 'tool' | 'featured'> = {
    'Product': 'tool',      // Neon Pink
    'Strategy': 'pm',       // Deep Purple
    'OKRs': 'design',       // Electric Blue
    'Design': 'design',     // Electric Blue
    'Development': 'dev',   // Teal
    'Leadership': 'pm',     // Deep Purple
  };
  return variantMap[category] || 'design';
}
