'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';
import ReadingProgressBar from './ReadingProgressBar';

interface BlogArticleClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: string;
  contentHtml: string;
  fullUrl: string;
}

// Mock section data - in real implementation, this would be extracted from MDX
const articleSections = [
  { id: 'introduzione', title: 'Introduzione' },
  { id: 'il-problema', title: 'Il problema' },
  { id: 'la-soluzione', title: 'La soluzione' },
  { id: 'risultati', title: 'Risultati' },
  { id: 'conclusioni', title: 'Conclusioni' },
];

export default function BlogArticleClient({
  post,
  relatedPosts,
  locale,
  contentHtml,
  fullUrl,
}: BlogArticleClientProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('introduzione');
  const [copied, setCopied] = useState(false);

  // Scroll spy for Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const sections = articleSections.map((section) =>
        document.getElementById(section.id)
      );

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(articleSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToBlog = () => {
    router.push(`/${locale}/blog`);
  };

  const handleRelatedArticleClick = (slug: string) => {
    router.push(`/${locale}/blog/${slug}`);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(post.title);
    const encodedText = encodeURIComponent(post.excerpt);

    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Category color mapping
  const categoryColors: Record<string, string> = {
    'Product': '#FF006E',
    'Strategy': '#7209B7',
    'OKRs': '#0D7EFF',
    'Design': '#0D7EFF',
    'Development': '#2A687A',
    'Leadership': '#FF006E',
  };

  const categoryColor = categoryColors[post.category] || '#2D2D2D';

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Sticky Header with Back Button */}
      <div className="sticky top-0 z-40 bg-[#FFFCF2] border-b-4 border-[#000]">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-4">
          <button
            onClick={handleBackToBlog}
            className="flex items-center gap-2 px-4 py-2 bg-white border-4 border-[#000] rounded-lg shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all text-[#0A0A0A]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px' }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            Torna al Blog
          </button>
        </div>
      </div>

      {/* Main Content */}
      <article className="container max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Table of Contents & Share */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <div className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6">
                {/* Table of Contents */}
                <h3
                  className="mb-4 pb-3 border-b-4 border-[#000] text-[#0A0A0A]"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '16px' }}
                >
                  Indice
                </h3>
                <nav className="space-y-2 mb-6">
                  {articleSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-[#0D7EFF] text-white'
                          : 'text-[#2D2D2D] hover:bg-gray-100'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: activeSection === section.id ? 600 : 400 }}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>

                {/* Share Buttons */}
                <div className="pt-4 border-t-4 border-[#000]">
                  <h4
                    className="mb-3 text-[#0A0A0A]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px' }}
                  >
                    Condividi
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-3 w-full px-4 py-2 bg-[#1DA1F2] text-white border-2 border-[#000] rounded hover:opacity-90 transition-opacity"
                    >
                      <Twitter className="w-4 h-4" />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500 }}>
                        Twitter
                      </span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-3 w-full px-4 py-2 bg-[#0A66C2] text-white border-2 border-[#000] rounded hover:opacity-90 transition-opacity"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500 }}>
                        LinkedIn
                      </span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 w-full px-4 py-2 bg-white text-[#0A0A0A] border-2 border-[#000] rounded hover:bg-gray-50 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500 }}>
                        {copied ? 'Copiato!' : 'Copia link'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <div className="lg:col-span-9">
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 border-4 border-[#000] rounded-lg text-white inline-block"
                  style={{
                    backgroundColor: categoryColor,
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-[#6B7280]" style={{ fontSize: '14px' }}>
                  <span>
                    {new Date(post.date).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h1
                className="text-[#0A0A0A] mb-6 leading-tight"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(32px, 5vw, 56px)',
                }}
              >
                {post.title}
              </h1>

              <p className="text-body-large text-[#2D2D2D] mb-6">
                {post.excerpt}
              </p>
            </header>

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none blog-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Gradient CTA Section */}
            <div className="mt-16 bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E] border-4 border-[#000] rounded-lg shadow-brutal-lg p-8 md:p-12 -rotate-1">
              <h3 className="text-h3 text-white mb-4">
                Vuoi implementare strategie simili nel tuo team?
              </h3>
              <p className="text-body text-white/90 mb-6 max-w-[600px]">
                Parliamone! Sono sempre disponibile per discutere di product management, strategia e innovazione.
              </p>
              <button
                onClick={() => router.push(`/${locale}#ask-me`)}
                className="px-8 py-4 bg-white text-[#0A0A0A] border-4 border-[#000] rounded-lg shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '16px' }}
              >
                Contattami
              </button>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-20">
                <h3
                  className="mb-8 text-[#0A0A0A]"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '28px' }}
                >
                  Articoli correlati
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => {
                    const relatedColor = categoryColors[related.category] || '#2D2D2D';

                    return (
                      <article
                        key={related.slug}
                        onClick={() => handleRelatedArticleClick(related.slug)}
                        className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 hover:-translate-y-1 hover:shadow-brutal-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[260px]"
                      >
                        <div>
                          <span
                            className="px-3 py-1 border-4 border-[#000] rounded-lg text-white inline-block mb-3"
                            style={{
                              backgroundColor: relatedColor,
                              fontFamily: 'Space Mono, monospace',
                              fontSize: '10px',
                              fontWeight: 700,
                            }}
                          >
                            {related.category}
                          </span>
                          <h4
                            className="text-[#0A0A0A] mb-2 group-hover:text-[#0D7EFF] transition-colors"
                            style={{
                              fontFamily: 'Space Grotesk, sans-serif',
                              fontWeight: 700,
                              fontSize: '18px',
                              lineHeight: '1.3',
                            }}
                          >
                            {related.title}
                          </h4>
                        </div>

                        <div>
                          <div className="flex items-center gap-3 text-[#6B7280] text-xs mb-3">
                            <span>
                              {new Date(related.date).toLocaleDateString('it-IT', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                            <span>•</span>
                            <span>{related.readingTime}</span>
                          </div>
                          <div
                            className="inline-flex items-center gap-2 text-[#0D7EFF] transition-all group-hover:gap-3"
                            style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '14px' }}
                          >
                            Leggi articolo
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
