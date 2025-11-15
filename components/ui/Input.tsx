import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input component with neobrutalist design system styling
 *
 * @component
 * @category Form
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="your@email.com"
 *   error="Invalid email"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-heading font-semibold text-body text-brutalist-text-light"
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
            'bg-brutalist-surface-light',
            'text-brutalist-text-primary',
            'border-brutal border-brutalist-border rounded-brutal shadow-brutal-sm',
            'transition-all duration-200 ease-brutal',
            'placeholder:text-gray-500 placeholder:opacity-70',
            'focus:outline-none focus:border-primary focus:shadow-brutal-colored-blue',
            'hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px]',
            'disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100',
            error && 'border-red-600 shadow-brutal-sm focus:border-red-600 focus:shadow-brutal',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-body-sm text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-body-sm text-brutalist-text-light/60"
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
