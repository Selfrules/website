import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Custom components for MDX
const components: MDXComponents = {
  // Override default HTML elements
  h1: (props: React.ComponentProps<'h1'>) => (
    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary" {...props} />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 mt-8 text-brutalist-text-light dark:text-brutalist-text-dark" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="text-xl md:text-2xl font-display font-semibold mb-3 mt-6" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mb-4 text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 leading-relaxed" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mb-4 ml-8 list-disc space-y-2" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mb-4 ml-8 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-6 text-brutalist-text-light/70 dark:text-brutalist-text-dark/70"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <code
      className="px-2 py-1 rounded-sm bg-gray-100 dark:bg-gray-800 text-sm font-mono text-secondary"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre
      className="mb-6 p-4 bg-gray-900 rounded-brutal border-4 border-black overflow-x-auto shadow-brutal"
      {...props}
    />
  ),
  // Use Next.js Image component
  img: (props: React.ComponentProps<'img'>) => {
    // Next Image requires src, so we provide a fallback
    const src = props.src || '/placeholder.png';
    return (
      <Image
        src={src}
        className="rounded-brutal border-4 border-black shadow-brutal mb-6"
        width={props.width ? Number(props.width) : 800}
        height={props.height ? Number(props.height) : 400}
        alt={props.alt || ''}
      />
    );
  },
  // Use Next.js Link component
  a: (props: React.ComponentProps<'a'>) => {
    const href = props.href
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'))

    if (isInternal) {
      return (
        <Link
          href={href}
          className="text-primary hover:text-secondary underline underline-offset-4 transition-colors"
          {...props}
        />
      )
    }

    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-secondary underline underline-offset-4 transition-colors"
        {...props}
      />
    )
  },
  // Custom storytelling components
  Callout: ({ children, type = 'info', title }: { children: React.ReactNode; type?: 'info' | 'warning' | 'tip'; title?: string }) => {
    const styles = {
      info: 'bg-secondary/5 dark:bg-secondary/10 border-secondary-600',
      warning: 'bg-accent/5 dark:bg-accent/10 border-accent',
      tip: 'bg-primary/5 dark:bg-primary/10 border-primary'
    }

    const icons = {
      info: '💡',
      warning: '⚠️',
      tip: '✨'
    }

    return (
      <div className={`story-callout ${styles[type]} border-4`}>
        {title && (
          <div className="story-callout-title flex items-center gap-2">
            <span>{icons[type]}</span>
            <span>{title}</span>
          </div>
        )}
        <div className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 leading-relaxed">
          {children}
        </div>
      </div>
    )
  },

  Quote: ({ children, author }: { children: React.ReactNode; author?: string }) => (
    <div className="story-quote">
      <div className="relative">
        <span className="absolute -top-4 -left-2 text-6xl text-primary/20">&ldquo;</span>
        <div className="relative z-10">{children}</div>
      </div>
      {author && (
        <div className="mt-6 text-lg md:text-xl font-normal opacity-70">
          &mdash; {author}
        </div>
      )}
    </div>
  ),

  Section: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <section className="story-section">
      {title && (
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-brutalist-text-light dark:text-brutalist-text-dark pb-4 border-b-4 border-black">
          {title}
        </h3>
      )}
      {children}
    </section>
  ),

  Highlight: ({ children }: { children: React.ReactNode }) => (
    <mark className="bg-primary/30 dark:bg-primary/20 px-2 py-1 rounded font-semibold">
      {children}
    </mark>
  ),
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components
}