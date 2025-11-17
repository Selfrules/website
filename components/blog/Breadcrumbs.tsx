'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getCategoryVariant } from '@/lib/blog/category-utils';
import { NeoBadge } from '@/components/ui/NeoBadge';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

/**
 * Breadcrumbs - Neobrutalist navigation breadcrumbs with Schema.org structured data
 * @component
 * @category Blog Components
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: 'Blog', href: '/blog' },
 *     { label: 'Strategy', href: '/blog?category=Strategy' },
 *     { label: 'Article Title', href: '/blog/article-slug', current: true }
 *   ]}
 *   locale="it"
 * />
 * ```
 */
export default function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  // Generate Schema.org BreadcrumbList structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}${item.href}` : undefined,
    })),
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center gap-2">
                {!isLast ? (
                  <>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 text-brutalist-text-tertiary hover:text-electric-blue transition-colors font-body font-medium"
                    >
                      {isFirst && <Home className="w-3.5 h-3.5" />}
                      {item.label}
                    </Link>
                    <ChevronRight className="w-3 h-3 text-brutalist-text-tertiary" aria-hidden="true" />
                  </>
                ) : (
                  <span
                    className="text-brutalist-text-primary font-body font-semibold"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/**
 * SimpleBreadcrumbs - Simplified breadcrumb for common blog article pattern
 * @component
 * @category Blog Components
 *
 * @example
 * ```tsx
 * <SimpleBreadcrumbs
 *   category="Strategy"
 *   title="How to Build a Design System"
 *   locale="it"
 * />
 * ```
 */
export function SimpleBreadcrumbs({
  category,
  title,
  locale,
}: {
  category: string;
  title: string;
  locale: string;
}) {
  const items: BreadcrumbItem[] = [
    { label: 'Blog', href: `/${locale}/blog` },
    { label: category, href: `/${locale}/blog?category=${encodeURIComponent(category)}` },
    { label: title, href: '', current: true },
  ];

  return <Breadcrumbs items={items} locale={locale} />;
}
