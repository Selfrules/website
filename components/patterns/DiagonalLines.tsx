'use client';

import { cn } from '@/lib/utils';

interface DiagonalLinesProps {
  className?: string;
  color?: string;
  spacing?: 'tight' | 'normal' | 'wide';
  angle?: 45 | -45 | 30 | -30 | 60 | -60;
  opacity?: number;
  lineWidth?: 'thin' | 'normal' | 'thick';
  children?: React.ReactNode;
}

const spacingValues = {
  tight: '10px',
  normal: '20px',
  wide: '30px',
};

const lineWidths = {
  thin: '1px',
  normal: '2px',
  thick: '3px',
};

export default function DiagonalLines({
  className,
  color = 'text-brutalist-border/10',
  spacing = 'normal',
  angle = 45,
  opacity = 0.1,
  lineWidth = 'normal',
  children,
}: DiagonalLinesProps) {
  const patternStyle = {
    backgroundImage: `repeating-linear-gradient(
      ${angle}deg,
      currentColor,
      currentColor ${lineWidths[lineWidth]},
      transparent ${lineWidths[lineWidth]},
      transparent ${spacingValues[spacing]}
    )`,
    opacity,
  };

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn('absolute inset-0', color)}
        style={patternStyle}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}