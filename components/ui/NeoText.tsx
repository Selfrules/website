import React from 'react';
import { cn } from '@/lib/utils';

interface NeoTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'blue' | 'pink' | 'purple' | 'yellow';
  children: React.ReactNode;
}

/**
 * NeoText component - Neobrutalist text component with consistent typography
 * @component
 * @category UI
 */
export function NeoText({
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  children,
  className,
  ...props
}: NeoTextProps) {
  const sizeClasses = {
    xs: 'text-body-xs',
    sm: 'text-body-sm',
    base: 'text-body',
    lg: 'text-body-lg',
    xl: 'text-body-xl',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    tertiary: 'text-text-tertiary',
    blue: 'text-electric-blue',
    pink: 'text-neon-pink',
    purple: 'text-deep-purple',
    yellow: 'text-cyber-yellow',
  };

  return (
    <Component
      className={cn(
        'font-body',
        sizeClasses[size],
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