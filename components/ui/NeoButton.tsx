import React from 'react';
import { cn } from '@/lib/utils';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * NeoButton component - Neobrutalist button with multiple variants
 * @component
 * @category UI
 */
export function NeoButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: NeoButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2',
    'font-heading font-bold uppercase tracking-wider',
    'border-brutal border-brutal-black rounded-brutal',
    'transition-all duration-200',
    'focus:outline-none focus:ring-4 focus:ring-electric-blue/50',
    fullWidth && 'w-full'
  );

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base md:px-8 md:py-3',
    lg: 'px-8 py-4 text-lg md:px-10 md:py-4',
  };

  const variantClasses = {
    primary: cn(
      'bg-electric-blue text-white',
      'shadow-brutal',
      'hover:-translate-y-1 hover:shadow-brutal-hover',
      'active:translate-y-0 active:shadow-brutal-sm'
    ),
    secondary: cn(
      'bg-teal text-white',
      'shadow-brutal',
      'hover:-translate-y-1 hover:shadow-brutal-hover',
      'active:translate-y-0 active:shadow-brutal-sm'
    ),
    accent: cn(
      'bg-cyber-yellow text-text-primary',
      'shadow-brutal',
      'hover:-translate-y-1 hover:shadow-brutal-hover',
      'active:translate-y-0 active:shadow-brutal-sm'
    ),
    outline: cn(
      'bg-cream text-text-primary',
      'border-brutal-black',
      'shadow-brutal',
      'hover:bg-cyber-yellow hover:-translate-y-1 hover:shadow-brutal-hover',
      'active:translate-y-0 active:shadow-brutal-sm'
    ),
    ghost: cn(
      'bg-transparent text-text-primary',
      'border-transparent shadow-none',
      'hover:bg-surface-light hover:border-brutal-black hover:shadow-brutal',
      'active:translate-y-0 active:shadow-brutal-sm'
    ),
  };

  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}