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
    'border-4 border-[#000] rounded-lg',
    !noPadding && 'p-brutal-md md:p-brutal-lg',
    'transition-all duration-200'
  );

  const variantClasses = {
    default: 'shadow-brutal',
    elevated: cn(
      'shadow-brutal',
      'hover:-translate-y-2 hover:shadow-brutal-lg'
    ),
    inset: 'shadow-none border-[6px]',
    colored: cn(
      color === 'blue' && 'shadow-brutal-blue',
      color === 'pink' && 'shadow-brutal-pink',
      color === 'yellow' && 'shadow-brutal-yellow',
      color === 'purple' && 'shadow-brutal-purple',
      color === 'teal' && 'shadow-brutal-teal',
      color === 'lime' && 'shadow-brutal-lime',
      'hover:-translate-y-2'
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