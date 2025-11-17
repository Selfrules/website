'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

export interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  variant?: 'sidebar' | 'mobile';
}

/**
 * TableOfContents - Navigable table of contents with scroll-spy
 * @component
 * @category Blog Components
 *
 * @example
 * ```tsx
 * <TableOfContents
 *   items={tocItems}
 *   activeSection="introduction"
 *   onSectionClick={(id) => scrollToSection(id)}
 *   variant="sidebar"
 * />
 * ```
 */
export default function TableOfContents({
  items,
  activeSection,
  onSectionClick,
  variant = 'sidebar',
}: TableOfContentsProps) {
  const t = useTranslations('blog.article');

  if (items.length === 0) {
    return null;
  }

  const content = (
    <>
      <h3 className="text-body-small font-heading font-bold mb-4 pb-3 border-b-brutal border-black text-brutalist-text-primary">
        📑 {t('toc.title')}
      </h3>
      <nav className="space-y-1" aria-label="Table of contents">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          const isH3 = item.level === 3;

          return (
            <Button
              key={item.id}
              onClick={() => onSectionClick(item.id)}
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              className={`w-full justify-start text-left ${
                isH3 ? 'pl-6 text-sm' : 'text-sm'
              } ${isActive ? 'font-semibold' : 'font-normal'}`}
              aria-current={isActive ? 'location' : undefined}
            >
              {item.title}
            </Button>
          );
        })}
      </nav>
    </>
  );

  if (variant === 'mobile') {
    return (
      <div className="lg:hidden mb-8 border-brutal border-black rounded-brutal shadow-brutal bg-white p-brutal-md">
        {content}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-brutal-md">{content}</CardContent>
    </Card>
  );
}
