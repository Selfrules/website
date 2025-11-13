'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/mdx';
import type { TocSection } from '@/lib/blog/mdx';
import { Badge } from '@/components/ui/Badge';
import { LeadMagnetCard, CTACard } from '@/components/blog/article';
import ShareButtons from '@/components/blog/ShareButtons';
import ReadingProgress from '@/components/blog/ReadingProgress';

interface Analytics3amClientProps {
  post: BlogPost;
  tocSections: TocSection[];
  locale: string;
  fullUrl: string;
}

export default function Analytics3amClient({
  post,
  tocSections,
  locale,
  fullUrl,
}: Analytics3amClientProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>(tocSections[0]?.id || '');
  const [isTocOpen, setIsTocOpen] = useState(false);

  // Scroll spy for Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (let i = tocSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(tocSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tocSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocSections]);

  const handleBackToBlog = () => {
    router.push(`/${locale}/blog`);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      setIsTocOpen(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Track download event
    console.log('Download 3am Test Template');
    // Scroll to contact form
    const contactSection = document.getElementById('ask-me');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookSession = () => {
    // Track booking event
    console.log('Book Dashboard Clarity Session');
    // Scroll to contact form
    const contactSection = document.getElementById('ask-me');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-[#FFFCF2]">
        {/* Sticky Header with Back Button */}
        <div className="sticky top-0 z-40 bg-[#FFFCF2] border-b-brutal border-black">
          <div className="container max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
            <button
              onClick={handleBackToBlog}
              className="flex items-center gap-2 px-4 py-2 bg-white border-brutal border-black rounded-brutal shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all min-h-[48px]"
              aria-label="Back to blog"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              <span className="font-heading font-bold text-body-sm">Back to blog</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <article className="container max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Sidebar - Table of Contents & Share */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <nav
                  className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6 mb-6"
                  role="navigation"
                  aria-label="Table of contents"
                >
                  <h2 className="mb-4 pb-3 border-b-brutal border-black font-heading font-bold text-body">
                    Table of contents
                  </h2>
                  <ul className="space-y-2">
                    {tocSections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`block w-full text-left px-3 py-2 rounded-brutal transition-all min-h-[48px] flex items-center ${
                            activeSection === section.id
                              ? 'bg-[#2A687A] text-white'
                              : 'text-[#2D2D2D] hover:bg-gray-100'
                          }`}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            fontWeight: activeSection === section.id ? 600 : 400,
                          }}
                          aria-current={activeSection === section.id ? 'location' : undefined}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                <ShareButtons url={fullUrl} title={post.title} excerpt={post.excerpt} />
              </div>
            </aside>

            {/* Mobile ToC - Collapsible */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="w-full flex items-center justify-between p-4 bg-white border-brutal border-black rounded-brutal shadow-brutal min-h-[48px]"
                aria-expanded={isTocOpen}
                aria-controls="mobile-toc"
              >
                <span className="font-heading font-bold text-body">Table of contents</span>
                <svg
                  className={`w-5 h-5 transition-transform ${isTocOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isTocOpen && (
                <nav
                  id="mobile-toc"
                  className="mt-3 bg-white border-brutal border-black rounded-brutal shadow-brutal p-4"
                  role="navigation"
                  aria-label="Table of contents"
                >
                  <ul className="space-y-2">
                    {tocSections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`block w-full text-left px-3 py-2 rounded-brutal transition-all min-h-[48px] flex items-center ${
                            activeSection === section.id
                              ? 'bg-[#2A687A] text-white'
                              : 'text-[#2D2D2D] hover:bg-gray-100'
                          }`}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            fontWeight: activeSection === section.id ? 600 : 400,
                          }}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            {/* Article Content */}
            <div className="lg:col-span-9">
              {/* Article Header */}
              <header className="mb-8 md:mb-12">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="tool" size="md">
                    Analytics
                  </Badge>
                  <Badge variant="pm" size="md">
                    Product Strategy
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[#6B7280] text-body-sm mb-4">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>

                <h1 className="font-heading font-black text-h2 md:text-h1 text-[#0A0A0A] mb-6 leading-tight">
                  {post.title}
                </h1>

                <p className="text-body-lg text-[#2D2D2D] leading-relaxed max-w-[65ch]">
                  {post.excerpt}
                </p>
              </header>

              {/* Article Body - Render with proper heading IDs */}
              <div className="prose prose-lg max-w-none article-content">
                {renderArticleContent(post.content || '', handleDownloadTemplate, handleBookSession)}
              </div>

              {/* Mobile Share Buttons */}
              <div className="lg:hidden mt-12">
                <ShareButtons url={fullUrl} title={post.title} excerpt={post.excerpt} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

// Helper function to render article content with conversion elements
function renderArticleContent(
  content: string,
  onDownloadTemplate: () => void,
  onBookSession: () => void
) {
  const sections = content.split(/^##\s+/gm).filter(Boolean);

  return sections.map((section, index) => {
    const [title, ...paragraphs] = section.split('\n').filter(Boolean);
    const sectionId = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    const sectionContent = paragraphs.join('\n');

    // Insert Lead Magnet Card after "The 3am test framework" section
    const showLeadMagnet = title === 'The 3am test framework';

    // Insert CTA Card before "The 3am question" section
    const showCTA = title === 'The 3am question';

    return (
      <div key={index}>
        <section id={sectionId} className="mb-8 scroll-mt-24">
          <h2 className="font-heading font-bold text-h3 md:text-h2 text-[#0A0A0A] mb-4">
            {title}
          </h2>
          <div
            className="prose-content max-w-[65ch]"
            dangerouslySetInnerHTML={{ __html: formatContent(sectionContent) }}
          />
        </section>

        {showLeadMagnet && (
          <LeadMagnetCard
            title="Get the 3am Test Template"
            description="Turn these 3 questions into a 1-page audit template. Score your metrics, identify deletion candidates, document your reasoning."
            benefits={[
              '20-minute audit framework for 15-20 metrics',
              'Deletion decision matrix with scoring system',
              'PDF template with fillable sections',
            ]}
            ctaText="Download the Template"
            onDownload={onDownloadTemplate}
          />
        )}

        {showCTA && (
          <CTACard
            title="Book a Dashboard Clarity Session"
            description="I'll audit your current metrics against the 3am test. We'll identify what to delete, what to keep, and what's missing. You'll get a 1-page action plan with deletion priorities."
            ctaText="Book Your Audit"
            onAction={onBookSession}
            variant="gradient"
          />
        )}
      </div>
    );
  });
}

// Helper function to format content (basic markdown to HTML)
function formatContent(content: string): string {
  // Bold text
  content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Code blocks
  content = content.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // Inline code
  content = content.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Paragraphs
  content = content
    .split('\n\n')
    .filter(Boolean)
    .map((para) => `<p class="mb-4 leading-relaxed">${para.trim()}</p>`)
    .join('');

  return content;
}
