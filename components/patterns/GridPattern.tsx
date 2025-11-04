'use client';

import { cn } from '@/lib/utils';

interface GridPatternProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
  variant?: 'grid' | 'diagonal' | 'diagonal-reverse' | 'cross';
  children?: React.ReactNode;
}

const gridSizes = {
  sm: 'bg-grid-size-sm',
  md: 'bg-grid-size',
  lg: 'bg-grid-size-lg',
};

const gridVariants = {
  grid: 'bg-grid-pattern',
  diagonal: 'bg-diagonal-lines',
  'diagonal-reverse': 'bg-diagonal-lines-reverse',
  cross: 'bg-grid-pattern',
};

export default function GridPattern({
  className,
  color = 'text-brutalist-border/5',
  size = 'md',
  opacity = 0.05,
  variant = 'grid',
  children,
}: GridPatternProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className={cn(
          'absolute inset-0',
          gridVariants[variant],
          variant === 'grid' || variant === 'cross' ? gridSizes[size] : '',
          color,
        )}
        style={{
          opacity,
          ...(variant === 'cross' && {
            backgroundImage:
              'linear-gradient(currentColor 2px, transparent 2px), linear-gradient(90deg, currentColor 2px, transparent 2px)',
          }),
        }}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}