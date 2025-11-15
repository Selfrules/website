import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

/**
 * @component FrameworkDisplay
 * @category Blog Components
 * @description Framework display a 3 colonne con icone e descrizioni
 */

export interface FrameworkColumn {
  /** Titolo della colonna */
  title: string;
  /** Descrizione */
  description: string;
  /** Icona (optional) */
  icon?: LucideIcon;
  /** Colore del tema */
  color?: 'blue' | 'pink' | 'purple' | 'yellow' | 'teal';
}

export interface FrameworkDisplayProps {
  /** Titolo del framework (opzionale) */
  title?: string;
  /** Colonne del framework */
  columns: FrameworkColumn[];
  className?: string;
}

const colorMap = {
  blue: {
    bg: 'bg-electric-blue',
    border: 'border-electric-blue',
    bgLight: 'bg-electric-blue/5',
  },
  pink: {
    bg: 'bg-neon-pink',
    border: 'border-neon-pink',
    bgLight: 'bg-neon-pink/5',
  },
  purple: {
    bg: 'bg-deep-purple',
    border: 'border-deep-purple',
    bgLight: 'bg-deep-purple/5',
  },
  yellow: {
    bg: 'bg-cyber-yellow',
    border: 'border-cyber-yellow',
    bgLight: 'bg-cyber-yellow/5',
  },
  teal: {
    bg: 'bg-teal',
    border: 'border-teal',
    bgLight: 'bg-teal/5',
  },
};

export const FrameworkDisplay = React.forwardRef<HTMLDivElement, FrameworkDisplayProps>(
  ({ title, columns, className }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-brutal-md', className)}>
        {/* Title */}
        {title && (
          <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary text-center mb-brutal-lg">
            {title}
          </h3>
        )}

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column, index) => {
            const Icon = column.icon;
            const colors = column.color ? colorMap[column.color] : colorMap.blue;

            return (
              <div
                key={index}
                className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-brutal-md hover:-translate-y-1 hover:shadow-brutal-hover transition-all"
              >
                {/* Icon */}
                {Icon && (
                  <div className={cn('w-12 h-12 rounded-brutal border-brutal-thin border-black flex items-center justify-center mb-4', colors.bg)}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                )}

                {/* Title */}
                <h4 className="text-h4 font-heading font-bold text-brutalist-text-primary mb-3">
                  {column.title}
                </h4>

                {/* Description */}
                <p className="text-body-small text-brutalist-text-secondary">
                  {column.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

FrameworkDisplay.displayName = 'FrameworkDisplay';
