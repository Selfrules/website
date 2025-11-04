'use client';

import { cn } from '@/lib/utils';

interface DotPatternProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
  children?: React.ReactNode;
}

const dotSizes = {
  sm: 'bg-dot-size',
  md: '[background-size:30px_30px]',
  lg: '[background-size:40px_40px]',
};

export default function DotPattern({
  className,
  color = 'text-primary/10',
  size = 'md',
  opacity = 0.1,
  children,
}: DotPatternProps) {
  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'absolute inset-0 bg-dot-pattern',
          dotSizes[size],
          color,
        )}
        style={{
          opacity,
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
        }}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}