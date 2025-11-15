import React from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';

/**
 * @component InsightBox
 * @category Blog Components
 * @description Callout box per insight chiave con emoji lightbulb
 */

export interface InsightBoxProps {
  /** Contenuto dell'insight */
  children: React.ReactNode;
  /** Titolo del box (default: "Insight chiave") */
  title?: string;
  /** Variante colore */
  variant?: 'default' | 'blue' | 'pink' | 'purple' | 'yellow';
  className?: string;
}

const variantMap = {
  default: {
    bg: 'bg-cream',
    border: 'border-black',
    icon: 'bg-cyber-yellow',
  },
  blue: {
    bg: 'bg-electric-blue/5',
    border: 'border-electric-blue',
    icon: 'bg-electric-blue',
  },
  pink: {
    bg: 'bg-neon-pink/5',
    border: 'border-neon-pink',
    icon: 'bg-neon-pink',
  },
  purple: {
    bg: 'bg-deep-purple/5',
    border: 'border-deep-purple',
    icon: 'bg-deep-purple',
  },
  yellow: {
    bg: 'bg-cyber-yellow/5',
    border: 'border-cyber-yellow',
    icon: 'bg-cyber-yellow',
  },
};

export const InsightBox = React.forwardRef<HTMLDivElement, InsightBoxProps>(
  ({ children, title = 'Insight chiave', variant = 'default', className }, ref) => {
    const styles = variantMap[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'border-brutal-thick rounded-brutal shadow-brutal',
          'p-brutal-md',
          styles.bg,
          styles.border,
          className
        )}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={cn('w-10 h-10 rounded-brutal border-brutal-thin border-black flex items-center justify-center shrink-0', styles.icon)}>
            <Lightbulb className="w-5 h-5 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-body font-heading font-bold text-brutalist-text-primary mb-2">
              💡 {title}:
            </p>
            <div className="text-body-sm text-brutalist-text-secondary">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InsightBox.displayName = 'InsightBox';
