import React from 'react';
import { cn } from '@/lib/utils';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { Calendar, Clock } from 'lucide-react';

export interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Badge variant for the category
   */
  variant?: 'design' | 'dev' | 'pm' | 'tool' | 'featured';
  /**
   * Blog post title
   */
  title: string;
  /**
   * Optional description (truncated with line-clamp-3)
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
   * Optional href for navigation (currently unused but kept for future use)
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
 * Neobrutalist blog card following the Designprototipo pattern with two layout variants:
 * - With description: Shows truncated preview text (line-clamp-3)
 * - Without description: Compact layout, focus on title and metadata
 *
 * Pattern specifications (from prototype):
 * - White background (bg-white) with 4px black border
 * - Vertical hover animation (lifts up 8px)
 * - Title changes color to Electric Blue on hover
 * - Metadata footer separated by top border
 * - Badge inline with content (not in separate container)
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
 * // Without description (compact)
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
    // Mapping variant names to badge categories and colors
    const badgeLabels = {
      design: 'Design/UX',
      dev: 'Development',
      pm: 'Product',
      tool: 'Tools',
      featured: 'Featured',
    };

    const badgeColors = {
      design: 'blue' as const,
      dev: 'teal' as const,
      pm: 'purple' as const,
      tool: 'pink' as const,
      featured: 'yellow' as const,
    };

    // Gradient backgrounds based on variant
    const gradientBackgrounds = {
      design: 'bg-gradient-to-br from-electric-blue to-deep-purple',
      dev: 'bg-gradient-to-br from-teal to-electric-blue',
      pm: 'bg-gradient-to-br from-deep-purple via-neon-pink to-electric-blue',
      tool: 'bg-gradient-to-br from-neon-pink to-deep-purple',
      featured: 'bg-gradient-to-br from-cyber-yellow via-neon-pink to-electric-blue',
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base brutalist styles with gradient background
          'group border-brutal-thick border-black rounded-brutal-lg shadow-brutal',
          gradientBackgrounds[variant],
          'transition-all duration-200 ease-brutal',
          // Hover effects - VERTICAL ONLY
          'hover:shadow-brutal-lg hover:-translate-y-2',
          // Clickable cursor
          (onClick || href) && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Content Area - p-6 as per prototype */}
        <div className="p-6 flex flex-col h-full">
          {/* Badge inline */}
          <div className="mb-4">
            <NeoBadge color={badgeColors[variant]}>
              {badgeLabels[variant]}
            </NeoBadge>
          </div>

          {/* Title */}
          <h3 className="text-h4 mb-4 text-white transition-colors leading-snug font-heading font-bold">
            {title}
          </h3>

          {/* Description (if provided) */}
          {description && (
            <p className="text-body-small text-white/90 mb-4 line-clamp-3">
              {description}
            </p>
          )}

          {/* Spacer to push metadata to bottom */}
          <div className="flex-1" />

          {/* Metadata Footer - Compact */}
          <div className="flex items-center gap-3 text-body-small text-white/80">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BlogCard.displayName = 'BlogCard';

export { BlogCard };
