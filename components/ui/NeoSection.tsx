import React from 'react';
import { cn } from '@/lib/utils';

interface NeoSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'cream' | 'white' | 'dark' | 'gradient' | 'transparent';
  pattern?: 'grid' | 'dots' | 'diagonal' | 'none';
}

/**
 * NeoSection component - Section wrapper with Neobrutalist patterns and spacing
 * @component
 * @category UI
 */
export function NeoSection({
  children,
  spacing = 'lg',
  background = 'transparent',
  pattern = 'none',
  className,
  ...props
}: NeoSectionProps) {
  const spacingClasses = {
    sm: 'py-brutal-xl',
    md: 'py-brutal-2xl',
    lg: 'py-brutal-3xl',
    xl: 'py-brutal-4xl',
  };

  const backgroundClasses = {
    cream: 'bg-cream',
    white: 'bg-white',
    dark: 'bg-text-primary text-white',
    gradient: 'bg-gradient-to-br from-electric-blue/10 to-neon-pink/10',
    transparent: 'bg-transparent',
  };

  const patternClasses = {
    grid: 'bg-grid-pattern bg-grid-sm opacity-5',
    dots: 'bg-dots-pattern bg-dots opacity-5',
    diagonal: 'bg-diagonal-pattern opacity-5',
    none: '',
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {pattern !== 'none' && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none',
            patternClasses[pattern]
          )}
          aria-hidden="true"
        />
      )}
      <div className="relative">{children}</div>
    </section>
  );
}