import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-heading font-semibold text-body text-brutalist-text-light dark:text-brutalist-text-dark"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'w-full px-4 py-3',
            'font-body text-body',
            'bg-brutalist-surface-light dark:bg-brutalist-surface-dark',
            'text-brutalist-text-light dark:text-brutalist-text-dark',
            'border-brutal border-brutalist-border rounded-brutal shadow-brutal-sm',
            'transition-all duration-200 ease-brutal',
            'placeholder:text-brutalist-text-light/40 dark:placeholder:text-brutalist-text-dark/40',
            'focus:outline-none focus:ring-4 focus:ring-primary focus:shadow-brutal',
            'hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-accent focus:ring-accent',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-body-sm text-accent font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-body-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
