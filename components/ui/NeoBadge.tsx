import React from 'react';
import { cn } from '@/lib/utils';

interface NeoBadgeProps {
  children: React.ReactNode;
  variant?: 'design' | 'dev' | 'pm' | 'tool' | 'featured' | 'blue' | 'pink' | 'yellow' | 'purple' | 'neutral' | 'teal' | 'lime';
  color?: 'blue' | 'pink' | 'yellow' | 'purple' | 'neutral' | 'teal' | 'lime'; // Legacy support
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

/**
 * NeoBadge component - Neobrutalist badge with multiple color variants
 * @component
 * @category UI
 */
export function NeoBadge({
  children,
  variant,
  color, // Legacy support
  size = 'md',
  className = '',
  onClick
}: NeoBadgeProps) {
  // Use color prop if variant is not provided (legacy support)
  const finalVariant = variant || color || 'blue';

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-[13px]',
    lg: 'px-4 py-2 text-sm'
  };

  const variantClasses = {
    // Project type variants
    design: 'bg-electric-blue text-white',
    dev: 'bg-teal text-white',
    pm: 'bg-deep-purple text-white',
    tool: 'bg-neon-pink text-white',
    featured: 'bg-cyber-yellow text-text-primary',

    // Color variants
    blue: 'bg-electric-blue text-white',
    pink: 'bg-neon-pink text-white',
    yellow: 'bg-cyber-yellow text-text-primary',
    purple: 'bg-deep-purple text-white',
    neutral: 'bg-cream text-text-primary',
    teal: 'bg-teal text-white',
    lime: 'bg-lime-green text-text-primary',
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-block font-heading font-bold tracking-wider uppercase',
        'border-brutal-thin border-brutal-black rounded-brutal',
        'shadow-brutal-sm',
        'transition-transform duration-200',
        'hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        sizeClasses[size],
        variantClasses[finalVariant],
        className
      )}
    >
      {children}
    </span>
  );
}