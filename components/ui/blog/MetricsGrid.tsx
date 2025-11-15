import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * @component MetricsGrid
 * @category Blog Components
 * @description Griglia di metriche/risultati con valori, descrizioni e trend
 */

export interface Metric {
  /** Valore della metrica (es: "+42%", "12s", "3x") */
  value: string;
  /** Descrizione della metrica */
  description: string;
  /** Trend: up, down, neutral */
  trend?: 'up' | 'down' | 'neutral';
  /** Colore del tema */
  color?: 'blue' | 'pink' | 'purple' | 'yellow' | 'teal' | 'green';
}

export interface MetricsGridProps {
  /** Titolo della sezione (opzionale) */
  title?: string;
  /** Lista di metriche */
  metrics: Metric[];
  /** Numero di colonne nel grid */
  columns?: 2 | 3 | 4;
  className?: string;
}

const colorMap = {
  blue: 'text-electric-blue',
  pink: 'text-neon-pink',
  purple: 'text-deep-purple',
  yellow: 'text-cyber-yellow',
  teal: 'text-teal',
  green: 'text-success',
};

const bgColorMap = {
  blue: 'bg-electric-blue/5',
  pink: 'bg-neon-pink/5',
  purple: 'bg-deep-purple/5',
  yellow: 'bg-cyber-yellow/5',
  teal: 'bg-teal/5',
  green: 'bg-success/5',
};

export const MetricsGrid = React.forwardRef<HTMLDivElement, MetricsGridProps>(
  ({ title, metrics, columns = 2, className }, ref) => {
    const gridCols = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
      <div ref={ref} className={cn('space-y-brutal-md', className)}>
        {/* Title */}
        {title && (
          <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary text-center">
            {title}
          </h3>
        )}

        {/* Metrics Grid */}
        <div className={cn('grid gap-6', gridCols[columns])}>
          {metrics.map((metric, index) => {
            const color = metric.color || 'blue';
            const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : null;

            return (
              <div
                key={index}
                className={cn(
                  'bg-white border-brutal border-black rounded-brutal shadow-brutal p-brutal-md text-center',
                  'hover:-translate-y-1 hover:shadow-brutal-hover transition-all'
                )}
              >
                {/* Value with optional trend icon */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className={cn('text-h1 font-heading font-black', colorMap[color])}>
                    {metric.value}
                  </p>
                  {TrendIcon && <TrendIcon className={cn('w-8 h-8', colorMap[color])} />}
                </div>

                {/* Description */}
                <p className="text-body-small text-brutalist-text-secondary">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

MetricsGrid.displayName = 'MetricsGrid';
