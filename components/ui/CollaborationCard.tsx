import React from 'react';
import { cn } from '@/lib/utils';
import { Check, LucideIcon } from 'lucide-react';

export interface CollaborationCardProps {
  /** Large number to display (e.g., "01", "02", "03") */
  number: string;
  /** Title of the collaboration mode */
  title: string;
  /** Description text */
  description: string;
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
  ({ number, title, description, features, icon: Icon, color, className, ...props }, ref) => {
    // Map color to dynamic utility classes
    const colorClasses = {
      blue: {
        icon: 'bg-dynamic-blue',
        text: 'text-dynamic-blue',
      },
      pink: {
        icon: 'bg-dynamic-pink',
        text: 'text-dynamic-pink',
      },
      purple: {
        icon: 'bg-dynamic-purple',
        text: 'text-dynamic-purple',
      },
      teal: {
        icon: 'bg-dynamic-teal',
        text: 'text-dynamic-teal',
      },
      yellow: {
        icon: 'bg-dynamic-yellow',
        text: 'text-dynamic-yellow',
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
              'text-6xl opacity-10 font-heading font-black',
              colors.text
            )}
          >
            {number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-h3 mb-3 text-brutalist-text-primary">{title}</h3>

        {/* Description */}
        <p className="text-body-small text-brutalist-text-secondary mb-5">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check
                className={cn(
                  'w-5 h-5 flex-shrink-0 mt-0.5',
                  colors.text
                )}
                strokeWidth={3}
              />
              <span className="text-body-small text-brutalist-text-secondary leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </article>
    );
  }
);

CollaborationCard.displayName = 'CollaborationCard';
