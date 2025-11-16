'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

interface ArticleSidebarProps {
  tableOfContents: TableOfContentItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  shareUrl: string;
  shareTitle: string;
}

/**
 * ArticleSidebar - Sticky sidebar with ToC and share buttons
 * @component
 * @category Blog Components
 */
export default function ArticleSidebar({
  tableOfContents,
  activeSection,
  onSectionClick,
  shareUrl,
  shareTitle,
}: ArticleSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
  };

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-28 space-y-6">
        {/* Table of Contents */}
        {tableOfContents.length > 0 && (
          <Card>
            <CardContent className="p-brutal-md">
              <h3 className="text-body-small font-heading font-bold mb-4 pb-3 border-b-brutal border-black text-brutalist-text-primary">
                📑 Indice
              </h3>
              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => onSectionClick(item.id)}
                    variant={activeSection === item.id ? 'primary' : 'ghost'}
                    size="sm"
                    className={`w-full justify-start ${
                      item.level === 2 ? 'pl-6 text-sm' : 'text-sm'
                    }`}
                  >
                    {item.title}
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
        )}

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
                className="bg-electric-blue hover:bg-electric-blue/90"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button
                onClick={() => handleShare('linkedin')}
                variant="primary"
                size="sm"
                className="bg-electric-blue hover:bg-electric-blue/90"
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
                {copied ? 'Copiato!' : 'Copia link'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
