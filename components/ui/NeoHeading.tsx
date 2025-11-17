import React from 'react';
import { cn } from '@/lib/utils';

interface NeoHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  weight?: 'normal' | 'medium' | 'bold' | 'black';
  color?: 'primary' | 'secondary' | 'blue' | 'pink' | 'purple' | 'yellow';
  children: React.ReactNode;
}

/**
 * NeoHeading component - Neobrutalist heading with responsive typography
 * @component
 * @category UI
 */
export function NeoHeading({
  as: Component = 'h2',
  size,
  weight = 'bold',
  color = 'primary',
  children,
  className,
  ...props
}: NeoHeadingProps) {
  // Use size prop or fall back to component level
  const finalSize = size || Component;

  const sizeClasses = {
    hero: 'text-hero-mobile md:text-[52px] lg:text-display-1',
    h1: 'text-h1-mobile md:text-[38px] lg:text-h1',
    h2: 'text-h2-mobile md:text-[30px] lg:text-h2',
    h3: 'text-h3',
    h4: 'text-h4',
    h5: 'text-h5',
    h6: 'text-h6',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
    black: 'font-black',
  };

  const colorClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    blue: 'text-electric-blue',
    pink: 'text-neon-pink',
    purple: 'text-deep-purple',
    yellow: 'text-cyber-yellow',
  };

  return (
    <Component
      className={cn(
        'font-heading leading-tight',
        sizeClasses[finalSize],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}