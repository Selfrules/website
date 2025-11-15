import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

/**
 * @component ProblemList
 * @category Blog Components
 * @description Lista numerata di problemi/challenges con stile neobrutalist
 */

export interface ProblemListProps {
  /** Titolo del box (opzionale) */
  title?: string;
  /** Lista di problemi */
  problems: string[];
  /** Variante colore */
  variant?: 'red' | 'blue' | 'purple' | 'default';
  className?: string;
}

const variantMap = {
  default: {
    bg: 'bg-cream',
    numberBg: 'bg-brutalist-text-primary',
  },
  red: {
    bg: 'bg-error/5',
    numberBg: 'bg-error',
  },
  blue: {
    bg: 'bg-electric-blue/5',
    numberBg: 'bg-electric-blue',
  },
  purple: {
    bg: 'bg-deep-purple/5',
    numberBg: 'bg-deep-purple',
  },
};

export const ProblemList = React.forwardRef<HTMLDivElement, ProblemListProps>(
  ({ title, problems, variant = 'default', className }, ref) => {
    const styles = variantMap[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border-brutal border-black rounded-brutal shadow-brutal',
          'p-brutal-lg',
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center gap-3 mb-brutal-md">
            <AlertCircle className="w-6 h-6 text-error" />
            <h3 className="text-h4 font-heading font-bold text-brutalist-text-primary">
              {title}
            </h3>
          </div>
        )}

        {/* Problem Items */}
        <div className="space-y-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={cn('rounded-brutal p-4 border-brutal-thin border-black', styles.bg)}
            >
              <div className="flex items-start gap-4">
                {/* Number Badge */}
                <div
                  className={cn(
                    'w-8 h-8 rounded-brutal border-2 border-black flex items-center justify-center shrink-0',
                    styles.numberBg
                  )}
                >
                  <span className="text-body-small font-heading font-black text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Problem Text */}
                <p className="text-body-small text-brutalist-text-primary flex-1 pt-1">
                  {problem}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ProblemList.displayName = 'ProblemList';
