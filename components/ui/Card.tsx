import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  hoverable?: boolean;
  clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverable = false, clickable = false, children, ...props }, ref) => {
    const baseStyles = cn(
      'border-brutal border-brutalist-border rounded-brutal shadow-brutal',
      'transition-all duration-200 ease-brutal',
      'bg-brutalist-surface-light dark:bg-brutalist-surface-dark'
    );

    const variantStyles = {
      default: 'bg-brutalist-surface-light dark:bg-brutalist-surface-dark',
      primary: 'bg-primary text-brutalist-text-light',
      secondary: 'bg-secondary text-white',
      accent: 'bg-accent text-white',
    };

    const interactiveStyles = cn(
      (hoverable || clickable) && [
        'hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px]',
        'active:shadow-brutal-active active:translate-x-[4px] active:translate-y-[4px]',
      ],
      clickable && 'cursor-pointer'
    );

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], interactiveStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 space-y-2', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-heading font-bold text-h4 text-sentence-case', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-body text-brutalist-text-light/80 dark:text-brutalist-text-dark/80', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0 flex items-center gap-4', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
