import React from 'react';
import { cn } from '@/lib/utils';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { Calendar, Clock, Eye } from 'lucide-react';

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
   * Optional description (truncated with line-clamp-2)
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
 * Neobrutalist blog card following the design system pattern with:
 * - Gradient header with badge
 * - White body with black/gray text
 * - Metadata footer with icons
 * - Vertical hover animation
 *
 * Pattern specifications (from design system):
 * - White background (bg-white) with 4px black border
 * - Gradient header section with NeoBadge
 * - Vertical hover animation (lifts up 8px)
 * - Black text for title, gray for description
 * - Metadata with Calendar, Clock, and Eye icons
 *
 * @example
 * ```tsx
 * // With description
 * <BlogCard
 *   variant="pm"
 *   title="How I Turned Failure into Feature"
 *   description="A deep dive into product management lessons learned from shipping products that users actually love..."
 *   readingTime={8}
 *   date="15 Nov 2025"
 *   href="/blog/failure-into-feature"
 * />
 *
 * // Without description (compact)
 * <BlogCard
 *   variant="design"
 *   title="Design System 101"
 *   readingTime={5}
 *   date="12 Nov 2025"
 *   href="/blog/design-system-101"
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
    // Mapping variant names to badge labels
    const badgeLabels = {
      design: 'DESIGN',
      dev: 'DEVELOPMENT',
      pm: 'PRODUCT MANAGEMENT',
      tool: 'TOOLS',
      featured: 'FEATURED',
    };

    // Mapping variant to NeoBadge variant
    const badgeVariants = {
      design: 'design' as const,
      dev: 'dev' as const,
      pm: 'yellow' as const, // PM uses yellow badge
      tool: 'tool' as const,
      featured: 'featured' as const,
    };

    // Gradient backgrounds for header section
    const gradientHeaders = {
      design: 'bg-gradient-to-br from-neon-pink to-cyber-yellow',
      dev: 'bg-gradient-to-br from-teal to-electric-blue',
      pm: 'bg-gradient-to-br from-electric-blue via-deep-purple to-deep-purple',
      tool: 'bg-gradient-to-br from-neon-pink to-deep-purple',
      featured: 'bg-gradient-to-br from-cyber-yellow via-neon-pink to-electric-blue',
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base brutalist styles - WHITE BACKGROUND
          'border-4 border-[#000] rounded-lg shadow-brutal-lg overflow-hidden bg-white',
          'transition-all duration-200',
          // Hover effects - VERTICAL ONLY
          'hover:-translate-y-2 hover:shadow-brutal-lg',
          // Clickable cursor
          (onClick || href) && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Gradient Header with Badge */}
        <div className={cn(
          'p-6 min-h-[140px] relative',
          gradientHeaders[variant]
        )}>
          <NeoBadge variant={badgeVariants[variant]} size="sm">
            {badgeLabels[variant]}
          </NeoBadge>
        </div>

        {/* White Body */}
        <div className="p-6">
          {/* Title - Black text */}
          <h3 className="font-heading font-bold text-xl mb-2">
            {title}
          </h3>

          {/* Description - Gray text (if provided) */}
          {description && (
            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {/* Metadata Footer */}
          <div className="flex items-center gap-4 text-xs text-text-tertiary">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{readingTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BlogCard.displayName = 'BlogCard';

export { BlogCard };
