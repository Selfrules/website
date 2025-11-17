import React from 'react';
import { cn } from '@/lib/utils';

interface NeoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
  noPadding?: boolean;
}

/**
 * NeoContainer component - Responsive container with Neobrutalist spacing
 * @component
 * @category UI
 */
export function NeoContainer({
  children,
  size = 'lg',
  center = true,
  noPadding = false,
  className,
  ...props
}: NeoContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'w-full',
        sizeClasses[size],
        center && 'mx-auto',
        !noPadding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}