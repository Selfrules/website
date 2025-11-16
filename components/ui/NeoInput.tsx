import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

/**
 * NeoInput component - Neobrutalist input field
 * @component
 * @category UI
 */
export const NeoInput = forwardRef<HTMLInputElement, NeoInputProps>(
  ({ label, error, helperText, fullWidth = false, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-heading font-bold uppercase tracking-wider text-text-primary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3',
            'bg-cream text-text-primary',
            'border-brutal-thin border-brutal-black rounded-brutal',
            'shadow-brutal-sm',
            'font-body text-body',
            'transition-all duration-200',
            'placeholder:text-text-tertiary',
            'focus:outline-none focus:ring-4 focus:ring-electric-blue/50',
            'focus:-translate-y-0.5 focus:shadow-brutal',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-error focus:ring-error/50',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error font-medium">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

NeoInput.displayName = 'NeoInput';