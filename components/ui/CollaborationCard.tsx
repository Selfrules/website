import React from 'react';
import { cn } from '@/lib/utils';
import { Check, LucideIcon } from 'lucide-react';

export interface CollaborationCardProps {
  /** Large number to display (e.g., "01", "02", "03") */
  number: string;
  /** Title of the collaboration mode */
  title: string;
  /** Problem statement - the pain point this addresses */
  problem: string;
  /** "What we do" section label */
  whatWeDo: string;
  /** "What we do" detailed description */
  whatWeDoDetail: string;
  /** "What you get" section label */
  whatYouGet: string;
  /** "What you get" detailed description */
  whatYouGetDetail: string;
  /** List of features or benefits */
  features: string[];
  /** Icon to display */
  icon: LucideIcon;
  /** Color theme for icon, number, and checkmarks */
  color: 'blue' | 'pink' | 'purple' | 'teal' | 'yellow';
  /** Additional CSS classes */
  className?: string;
}

/**
 * CollaborationCard component for displaying collaboration modes or service offerings
 *
 * A structured card component designed for "Let's Work Together" sections featuring:
 * - Large decorative number watermark (01, 02, 03)
 * - Colored icon container
 * - Title and description
 * - Features list with colored check icons
 * - Brutalist design with hover effects
 *
 * Perfect for showcasing different collaboration modes, service tiers, or offering types.
 *
 * @component
 * @category Display
 *
 * @example
 * ```tsx
 * <CollaborationCard
 *   number="01"
 *   title="Consulting"
 *   description="Strategic guidance for your product challenges"
 *   features={[
 *     "Product strategy sessions",
 *     "User research analysis",
 *     "Roadmap planning"
 *   ]}
 *   icon={Lightbulb}
 *   color="blue"
 * />
 * ```
 */
export const CollaborationCard = React.forwardRef<HTMLDivElement, CollaborationCardProps>(
  ({ number, title, problem, whatWeDo, whatWeDoDetail, whatYouGet, whatYouGetDetail, features, icon: Icon, color, className, ...props }, ref) => {
    // Map color to design system utility classes
    const colorClasses = {
      blue: {
        icon: 'bg-electric-blue',
        text: 'text-electric-blue',
      },
      pink: {
        icon: 'bg-neon-pink',
        text: 'text-neon-pink',
      },
      purple: {
        icon: 'bg-deep-purple',
        text: 'text-deep-purple',
      },
      teal: {
        icon: 'bg-teal',
        text: 'text-teal',
      },
      yellow: {
        icon: 'bg-cyber-yellow',
        text: 'text-cyber-yellow',
      },
    };

    const colors = colorClasses[color];

    return (
      <article
        ref={ref}
        className={cn(
          'bg-white border-brutal border-black rounded-lg shadow-brutal p-6 md:p-8',
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg',
          className
        )}
        {...props}
      >
        {/* Icon & Number */}
        <div className="flex items-center justify-between mb-5">
          {/* Icon Container */}
          <div
            className={cn(
              'w-14 h-14 rounded-lg border-brutal border-black',
              'flex items-center justify-center',
              colors.icon
            )}
          >
            <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>

          {/* Large Number Watermark */}
          <span
            className={cn(
              'text-6xl opacity-20 font-heading font-black',
              colors.text
            )}
          >
            {number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-h3 mb-3 text-brutalist-text-primary">{title}</h3>

        {/* Problem Statement */}
        <p className="text-body-small text-brutalist-text-secondary mb-5 italic">
          {problem}
        </p>

        {/* What We Do */}
        <div className="mb-4">
          <h4 className="text-xs font-bold mb-1 text-brutalist-text-primary font-heading uppercase tracking-wide">
            {whatWeDo}
          </h4>
          <p className="text-body-small text-brutalist-text-secondary">
            {whatWeDoDetail}
          </p>
        </div>

        {/* What You Get */}
        <div className="mb-5 bg-white/50 border-l-4 p-3 rounded" style={{ borderColor: `var(--${color})` }}>
          <h4 className="text-xs font-bold mb-1 text-brutalist-text-primary font-heading uppercase tracking-wide">
            {whatYouGet}
          </h4>
          <p className="text-body-small text-brutalist-text-secondary">
            {whatYouGetDetail}
          </p>
        </div>
      </article>
    );
  }
);

CollaborationCard.displayName = 'CollaborationCard';
