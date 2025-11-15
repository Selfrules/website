import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock } from 'lucide-react';

export interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Badge variant for the category
   */
  variant?: 'design' | 'dev' | 'pm' | 'tool' | 'featured';
  /**
   * Blog post title (displayed in uppercase)
   */
  title: string;
  /**
   * Optional description (will be truncated with ellipsis)
   */
  description?: string;
  /**
   * Reading time in minutes
   */
  readingTime: number;
  /**
   * Publication date
   */
  date: string;
  /**
   * Optional click handler for the card
   */
  onClick?: () => void;
  /**
   * Optional href for the CTA button
   */
  href?: string;
}

/**
 * BlogCard Component
 *
 * @component
 * @category Blog
 *
 * @description
 * Neobrutalist blog card with two layout variants:
 * - With description: Shows truncated preview text
 * - Without description: More compact, focus on title and metadata
 *
 * Both variants maintain the same fixed height for consistent grid layouts.
 *
 * @example
 * ```tsx
 * // With description
 * <BlogCard
 *   variant="design"
 *   title="The art of saying no"
 *   description="Sometimes the best product decisions are the features you don't build. Here's why..."
 *   readingTime={5}
 *   date="15 Nov 2024"
 *   href="/blog/art-of-saying-no"
 * />
 *
 * // Without description
 * <BlogCard
 *   variant="dev"
 *   title="Quick wins: 3 micro-optimizations"
 *   readingTime={3}
 *   date="12 Nov 2024"
 *   href="/blog/quick-wins"
 * />
 * ```
 */
const BlogCard = React.forwardRef<HTMLDivElement, BlogCardProps>(
  ({
    className,
    variant = 'design',
    title,
    description,
    readingTime,
    date,
    onClick,
    href,
    ...props
  }, ref) => {
    // Mapping variant names to badge categories
    const badgeLabels = {
      design: 'Design/UX',
      dev: 'Development',
      pm: 'Product',
      tool: 'Tools',
      featured: 'Featured',
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base brutalist styles
          'bg-cream border-brutal border-black rounded-brutal shadow-brutal',
          'transition-all duration-200 ease-brutal',
          // Fixed height for both variants
          'h-[400px]',
          // Flex layout for content distribution
          'flex flex-col',
          // Hover effects
          'hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px]',
          // Clickable cursor
          (onClick || href) && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Badge */}
        <div className="p-6 pb-4">
          <Badge variant={variant} size="md">
            {badgeLabels[variant]}
          </Badge>
        </div>

        {/* Content Area - Flexible */}
        <div className="px-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-h3 font-heading font-black text-brutalist-text-primary uppercase mb-4 leading-tight">
            {title}
          </h3>

          {/* Description (if provided) */}
          {description && (
            <p className="text-body-small text-brutalist-text-secondary mb-4 line-clamp-3">
              {description}
            </p>
          )}

          {/* Spacer to push metadata and CTA to bottom */}
          <div className="flex-1" />

          {/* Metadata */}
          <div className="flex items-center gap-4 text-brutalist-text-tertiary mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span className="text-body-xs font-mono">{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span className="text-body-xs font-mono">{readingTime} min</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="p-6 pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full uppercase"
            onClick={(e) => {
              e.stopPropagation();
              if (href) {
                window.location.href = href;
              }
            }}
          >
            Leggi l'articolo
          </Button>
        </div>
      </div>
    );
  }
);

BlogCard.displayName = 'BlogCard';

export { BlogCard };
