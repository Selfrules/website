import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2',
      'border-brutal border-brutalist-border rounded-brutal',
      'transition-all duration-200 ease-brutal',
      'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'active:translate-x-[4px] active:translate-y-[4px]'
    );

    const variantStyles = {
      primary: cn(
        'button-primary shadow-brutal',
        'hover:bg-primary-600 hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px]',
        'active:shadow-brutal-active'
      ),
      secondary: cn(
        'button-secondary shadow-brutal',
        'hover:bg-secondary-600 hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px]',
        'active:shadow-brutal-active'
      ),
      accent: cn(
        'button-accent shadow-brutal',
        'hover:bg-accent-600 hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px]',
        'active:shadow-brutal-active'
      ),
      outline: cn(
        'button-outline shadow-brutal',
        'hover:bg-brutalist-text-light hover:text-brutalist-bg-light hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px]',
        'dark:hover:bg-brutalist-text-dark dark:hover:text-brutalist-bg-dark',
        'active:shadow-brutal-active'
      ),
      ghost: cn(
        'button-ghost border-transparent shadow-none',
        'hover:bg-brutalist-border/5 hover:translate-x-[-2px] hover:translate-y-[-2px]',
        'active:translate-x-[2px] active:translate-y-[2px]'
      ),
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-body-sm',
      md: 'px-6 py-3 text-body',
      lg: 'px-8 py-4 text-body-lg',
      xl: 'px-10 py-5 text-body-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
