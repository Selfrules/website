import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline' | 'design' | 'dev' | 'pm' | 'tool' | 'featured';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    // Per le varianti semantiche (design, dev, pm, tool, featured), non applichiamo font-heading/font-bold
    // perché hanno già i loro stili completi definiti in globals.css con i colori corretti
    const isSemanticVariant = ['design', 'dev', 'pm', 'tool', 'featured'].includes(variant);

    const baseStyles = cn(
      'inline-flex items-center justify-center gap-1',
      !isSemanticVariant && 'font-heading font-bold uppercase tracking-wider',
      'border-brutal border-brutalist-border rounded-brutal-sm',
      'whitespace-nowrap'
    );

    const variantStyles = {
      default: cn(
        'bg-brutalist-surface-light dark:bg-brutalist-surface-dark',
        'text-brutalist-text-light dark:text-brutalist-text-dark',
        'shadow-brutal-sm'
      ),
      primary: cn('bg-primary text-brutalist-text-light shadow-brutal-sm'),
      secondary: cn('bg-secondary text-white shadow-brutal-sm'),
      accent: cn('bg-accent text-white shadow-brutal-sm'),
      outline: cn(
        'bg-transparent',
        'text-brutalist-text-light dark:text-brutalist-text-dark',
        'shadow-brutal-sm'
      ),
      // Semantic variants (color-coded by project type)
      // Questi badge hanno gli stili completi definiti in globals.css
      design: cn('badge-design'), // Electric Blue - Design/UX projects
      dev: cn('badge-dev'),       // Teal - Development projects
      pm: cn('badge-pm'),         // Deep Purple - PM/Strategy projects
      tool: cn('badge-tool'),     // Neon Pink - Tools/Analytics
      featured: cn('badge-featured'), // Cyber Yellow - Featured/Special items
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-[0.75rem]',
      md: 'px-3 py-1 text-body-sm',
      lg: 'px-4 py-1.5 text-body',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
