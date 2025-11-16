import React from 'react';
import { cn } from '@/lib/utils';

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'inset' | 'colored';
  color?: 'blue' | 'pink' | 'yellow' | 'purple' | 'teal' | 'lime';
  noPadding?: boolean;
}

/**
 * NeoCard component - Neobrutalist card container
 * @component
 * @category UI
 */
export function NeoCard({
  children,
  variant = 'default',
  color = 'blue',
  noPadding = false,
  className,
  ...props
}: NeoCardProps) {
  const baseClasses = cn(
    'bg-cream',
    'border-brutal border-brutal-black rounded-brutal',
    !noPadding && 'p-brutal-md md:p-brutal-lg',
    'transition-all duration-200'
  );

  const variantClasses = {
    default: 'shadow-brutal',
    elevated: cn(
      'shadow-brutal-lg',
      'hover:-translate-y-1 hover:shadow-brutal-xl'
    ),
    inset: 'shadow-none border-brutal-thick',
    colored: cn(
      color === 'blue' && 'shadow-brutal-colored-blue',
      color === 'pink' && 'shadow-brutal-colored-pink',
      color === 'yellow' && 'shadow-brutal-colored-yellow',
      color === 'purple' && 'shadow-brutal-colored-purple',
      color === 'teal' && 'shadow-brutal-colored-teal',
      color === 'lime' && 'shadow-brutal-colored-lime',
      'hover:-translate-y-1'
    ),
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}