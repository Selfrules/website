import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface ActivityCardProps {
  /** Title of the activity */
  title: string;
  /** Icon to display */
  icon: LucideIcon;
  /** Color theme for icon and accents */
  color: 'blue' | 'pink' | 'yellow' | 'purple' | 'teal';
  /** Main content/children */
  children: React.ReactNode;
  /** Optional metric or badge to show at bottom */
  metric?: {
    label: string;
    icon?: LucideIcon;
  };
  /** Additional CSS classes */
  className?: string;
}

/**
 * ActivityCard component for displaying current activities and updates
 *
 * A feature-rich card component designed for "What I'm Up To" sections with:
 * - Colored icon container with hover rotation effect
 * - Decorative background blob with scale animation
 * - Flexible content area supporting rich text and highlights
 * - Optional metric/badge display
 * - Brutalist design with hover effects
 *
 * Perfect for showcasing current work, learning activities, or real-time updates.
 *
 * @component
 * @category Display
 *
 * @example
 * ```tsx
 * <ActivityCard
 *   title="Current Work"
 *   icon={Briefcase}
 *   color="blue"
 *   metric={{ label: "+2 quick wins", icon: TrendingUp }}
 * >
 *   <p className="text-body-small text-brutalist-text-secondary">
 *     Product Manager @ <strong className="text-electric-blue">QubicaAMF</strong>
 *   </p>
 *   <div className="bg-white/50 border-l-4 border-electric-blue p-3 rounded">
 *     <p className="text-xs font-heading font-semibold mb-2">Last week:</p>
 *     <ul className="text-body-small space-y-1">
 *       <li>• 6 hours of user interviews</li>
 *       <li>• 3 critical insights</li>
 *     </ul>
 *   </div>
 * </ActivityCard>
 * ```
 */
export const ActivityCard = React.forwardRef<HTMLDivElement, ActivityCardProps>(
  ({ title, icon: Icon, color, children, metric, className, ...props }, ref) => {
    // Map color to Tailwind classes
    const colorClasses = {
      blue: {
        bg: 'bg-electric-blue',
        text: 'text-electric-blue',
        blob: 'bg-electric-blue',
        border: 'border-electric-blue',
      },
      pink: {
        bg: 'bg-neon-pink',
        text: 'text-neon-pink',
        blob: 'bg-neon-pink',
        border: 'border-neon-pink',
      },
      yellow: {
        bg: 'bg-cyber-yellow',
        text: 'text-cyber-yellow',
        blob: 'bg-cyber-yellow',
        border: 'border-cyber-yellow',
      },
      purple: {
        bg: 'bg-deep-purple',
        text: 'text-deep-purple',
        blob: 'bg-deep-purple',
        border: 'border-deep-purple',
      },
      teal: {
        bg: 'bg-teal',
        text: 'text-teal',
        blob: 'bg-teal',
        border: 'border-teal',
      },
    };

    const colors = colorClasses[color];

    return (
      <div
        ref={ref}
        className={cn(
          'bg-cream border-brutal border-black rounded-lg shadow-brutal p-5 md:p-6',
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg',
          'relative overflow-hidden group',
          className
        )}
        {...props}
      >
        {/* Decorative Blob */}
        <div
          className={cn(
            'absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2',
            'opacity-5 group-hover:scale-150 transition-transform duration-500',
            colors.blob
          )}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div
            className={cn(
              'w-12 h-12 border-brutal-thin border-black rounded-lg',
              'flex items-center justify-center mb-4',
              'group-hover:rotate-6 transition-transform',
              colors.bg
            )}
          >
            <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>

          {/* Title */}
          <h3 className="text-h3 mb-3 text-brutalist-text-primary">{title}</h3>

          {/* Content */}
          <div className="space-y-3">{children}</div>

          {/* Optional Metric */}
          {metric && (
            <div className="mt-4 flex items-center gap-2">
              {metric.icon && (
                <metric.icon className={cn('w-4 h-4', colors.text)} />
              )}
              <span className={cn('text-xs font-bold font-mono', colors.text)}>
                {metric.label}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ActivityCard.displayName = 'ActivityCard';
