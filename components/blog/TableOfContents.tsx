'use client';

import { BookOpen, ChevronRight } from 'lucide-react';
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
 * TableOfContents - Navigable table of contents with scroll-spy (aligned with design system)
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
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-5 w-5 text-text-tertiary" />
        <span className="font-heading font-bold text-sm">{t('toc.title')}</span>
      </div>
      <nav className="space-y-2" aria-label="Table of contents">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          const isH3 = item.level === 3;
          const isH2 = item.level === 2;

          return (
            <div
              key={item.id}
              onClick={() => onSectionClick(item.id)}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                isActive
                  ? 'text-electric-blue'
                  : 'text-text-secondary hover:text-electric-blue'
              } ${isH3 ? 'pl-6' : ''}`}
              aria-current={isActive ? 'location' : undefined}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSectionClick(item.id);
                }
              }}
            >
              <ChevronRight className={isH2 ? 'h-4 w-4' : 'h-3 w-3'} />
              <span className={`text-sm ${isH2 ? 'font-medium' : ''}`}>
                {item.title}
              </span>
            </div>
          );
        })}
      </nav>
    </>
  );

  if (variant === 'mobile') {
    return (
      <div className="lg:hidden mb-8 border-4 border-[#000] rounded-lg bg-white p-4">
        {content}
      </div>
    );
  }

  return (
    <div className="border-4 border-[#000] rounded-lg p-4 bg-white">
      {content}
    </div>
  );
}
