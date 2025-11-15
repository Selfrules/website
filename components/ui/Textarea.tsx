import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Textarea component with neobrutalist design system styling
 *
 * @component
 * @category Form
 * @example
 * ```tsx
 * <Textarea
 *   label="Message"
 *   placeholder="Type your message..."
 *   rows={4}
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-heading font-semibold text-body text-brutalist-text-light"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
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
            'resize-y min-h-[120px]',
            error && 'border-red-600 shadow-brutal-sm focus:border-red-600 focus:shadow-brutal',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-body-sm text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${textareaId}-helper`}
            className="text-body-sm text-brutalist-text-light/60"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
