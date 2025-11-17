/**
 * ProseStyles - Enhanced prose styling wrapper for blog articles using design system
 * @component
 * @category Blog Components
 */

import { cn } from '@/lib/utils';

interface ProseStylesProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProseStyles({ children, className }: ProseStylesProps) {
  return (
    <div
      className={cn(
        'prose prose-lg max-w-none',
        // Headings
        'prose-headings:font-heading prose-headings:font-black prose-headings:text-brutalist-text-primary',
        'prose-h2:text-h2 prose-h2:mt-brutal-xl prose-h2:mb-brutal-md prose-h2:border-b-brutal prose-h2:border-black prose-h2:pb-brutal-sm',
        'prose-h3:text-h3 prose-h3:mt-brutal-lg prose-h3:mb-brutal-sm',
        'prose-h4:text-h4 prose-h4:mt-brutal-md prose-h4:mb-brutal-xs',
        // Paragraphs
        'prose-p:text-body prose-p:text-brutalist-text-light prose-p:leading-relaxed prose-p:mb-brutal-md',
        // Links
        'prose-a:text-electric-blue prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4',
        'prose-a:transition-colors prose-a:duration-200',
        'hover:prose-a:text-deep-purple hover:prose-a:decoration-neon-pink',
        // Lists
        'prose-ul:my-brutal-md prose-ul:list-none prose-ul:pl-0',
        'prose-li:relative prose-li:pl-brutal-lg prose-li:mb-brutal-xs',
        'prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.6em]',
        'prose-li:before:content-["■"] prose-li:before:text-electric-blue prose-li:before:text-sm',
        'prose-ol:my-brutal-md prose-ol:pl-brutal-lg',
        // Blockquotes
        'prose-blockquote:border-l-brutal prose-blockquote:border-electric-blue',
        'prose-blockquote:bg-cream prose-blockquote:pl-brutal-md prose-blockquote:pr-brutal-md',
        'prose-blockquote:py-brutal-sm prose-blockquote:my-brutal-lg',
        'prose-blockquote:not-italic prose-blockquote:font-body',
        'prose-blockquote:text-brutalist-text-light',
        // Code
        'prose-code:font-mono prose-code:text-sm',
        'prose-code:bg-dark/5 prose-code:px-2 prose-code:py-1',
        'prose-code:rounded-brutal prose-code:border prose-code:border-black/10',
        'prose-code:before:content-[""] prose-code:after:content-[""]',
        'prose-code:text-neon-pink',
        // Pre (code blocks)
        'prose-pre:bg-dark prose-pre:border-brutal prose-pre:border-black',
        'prose-pre:rounded-brutal-lg prose-pre:p-brutal-md prose-pre:my-brutal-lg',
        'prose-pre:shadow-brutal',
        'prose-pre:overflow-x-auto',
        // Strong
        'prose-strong:font-bold prose-strong:text-brutalist-text-primary',
        // Tables
        'prose-table:border-brutal prose-table:border-black prose-table:shadow-brutal',
        'prose-table:my-brutal-lg prose-table:w-full',
        'prose-thead:bg-cream',
        'prose-th:border-brutal prose-th:border-black prose-th:p-brutal-sm',
        'prose-th:font-heading prose-th:font-bold prose-th:text-left',
        'prose-td:border-brutal-thin prose-td:border-black prose-td:p-brutal-sm',
        'prose-tr:hover:bg-cream/50',
        // Images
        'prose-img:rounded-brutal-lg prose-img:border-brutal prose-img:border-black',
        'prose-img:shadow-brutal prose-img:my-brutal-lg',
        'prose-img:w-full',
        // Figure captions
        'prose-figcaption:text-body-small prose-figcaption:text-brutalist-text-tertiary',
        'prose-figcaption:text-center prose-figcaption:mt-brutal-xs prose-figcaption:italic',
        // Horizontal rule
        'prose-hr:border-brutal prose-hr:border-black prose-hr:my-brutal-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
