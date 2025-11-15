import React from 'react';
import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

// Custom Callout component for MDX
interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'tip';
  children: React.ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-500',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    tip: {
      bg: 'bg-purple-50',
      border: 'border-purple-500',
      icon: <AlertCircle className="w-5 h-5 text-purple-500" />,
    },
  };

  const style = styles[type];

  return (
    <div
      className={`my-6 p-4 border-l-4 ${style.border} ${style.bg} rounded-brutal-sm border-2 border-black shadow-brutal-sm`}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
        <div className="flex-1 text-body text-brutalist-text-light">
          {children}
        </div>
      </div>
    </div>
  );
}

// MDX Components with Neobrutalist styling
export const MDXComponents = {
  // Headings
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="font-heading font-black text-h1 text-brutalist-text-light mt-12 mb-6 first:mt-0"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-heading font-bold text-h2 text-brutalist-text-light mt-10 mb-4 pb-2 border-b-4 border-black"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-heading font-bold text-h3 text-brutalist-text-light mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="font-heading font-bold text-h4 text-brutalist-text-light mt-6 mb-2"
      {...props}
    />
  ),

  // Paragraphs and Text
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-body text-brutalist-text-light mb-4 leading-relaxed"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-primary" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-secondary" {...props} />
  ),

  // Lists
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-none space-y-2 my-4 pl-0"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-none counter-reset-item space-y-2 my-4 pl-0"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="flex gap-3 text-body text-brutalist-text-light before:content-['�'] before:text-primary before:font-bold before:flex-shrink-0"
      {...props}
    />
  ),

  // Blockquote
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 pl-6 border-l-4 border-primary bg-primary/10 py-4 pr-4 rounded-brutal-sm border-2 border-black shadow-brutal-sm"
      {...props}
    />
  ),

  // Code
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // Inline code
    if (!props.className) {
      return (
        <code
          className="px-2 py-0.5 bg-gray-100 border-2 border-black rounded-brutal-sm font-mono text-sm text-primary"
          {...props}
        />
      );
    }
    // Code block (handled by rehype-pretty-code)
    return <code {...props} />;
  },

  // Pre (code blocks)
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 p-4 bg-surface-dark border-4 border-black rounded-brutal shadow-brutal overflow-x-auto"
      {...props}
    />
  ),

  // Links
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-secondary underline decoration-2 underline-offset-2 hover:text-primary hover:decoration-primary transition-colors font-medium"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),

  // Horizontal Rule
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-8 border-t-4 border-black"
      {...props}
    />
  ),

  // Table
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-4 border-black shadow-brutal rounded-brutal overflow-hidden"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-primary" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="bg-white" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b-2 border-black" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left font-heading font-bold text-black border-r-2 border-black last:border-r-0"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 text-brutalist-text-light border-r-2 border-black last:border-r-0"
      {...props}
    />
  ),

  // Custom Components
  Callout,
};
