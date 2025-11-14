/**
 * PullQuote component for highlighting quotes in MDX articles
 * @component
 * @category MDX Components
 */

import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
  className?: string;
}

export default function PullQuote({
  children,
  author,
  role,
  className,
}: PullQuoteProps) {
  return (
    <blockquote
      className={cn(
        'border-l-brutal-thick border-deep-purple pl-brutal-md my-brutal-lg relative',
        className
      )}
      role="blockquote"
    >
      <Quote
        className="absolute -left-4 -top-2 w-8 h-8 text-deep-purple/20"
        strokeWidth={3}
      />
      <div
        className="text-xl md:text-2xl italic text-brutalist-text-light leading-relaxed mb-brutal-sm"
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 500,
        }}
      >
        {children}
      </div>
      {(author || role) && (
        <cite className="not-italic flex flex-col gap-1">
          {author && (
            <span
              className="text-body font-bold text-dark"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              — {author}
            </span>
          )}
          {role && (
            <span className="text-body-small text-brutalist-text-tertiary">
              {role}
            </span>
          )}
        </cite>
      )}
    </blockquote>
  );
}
