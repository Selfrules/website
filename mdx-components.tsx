import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

// Custom components for MDX
const components: MDXComponents = {
  // Override default HTML elements
  h1: (props: any) => (
    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 mt-8 text-brutalist-text-light dark:text-brutalist-text-dark" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl md:text-2xl font-display font-semibold mb-3 mt-6" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="mb-4 ml-8 list-disc space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 ml-8 list-decimal space-y-2" {...props} />
  ),
  li: (props: any) => (
    <li className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-6 text-brutalist-text-light/70 dark:text-brutalist-text-dark/70"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="px-2 py-1 rounded-sm bg-gray-100 dark:bg-gray-800 text-sm font-mono text-secondary"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="mb-6 p-4 bg-gray-900 rounded-brutal border-4 border-black overflow-x-auto shadow-brutal"
      {...props}
    />
  ),
  // Use Next.js Image component
  img: (props: any) => (
    <Image
      {...props}
      className="rounded-brutal border-4 border-black shadow-brutal mb-6"
      width={800}
      height={400}
      alt={props.alt || ''}
    />
  ),
  // Use Next.js Link component
  a: (props: any) => {
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
  // Custom components
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'tip' }) => {
    const styles = {
      info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500',
      tip: 'bg-green-50 dark:bg-green-900/20 border-green-500'
    }

    return (
      <div className={`p-4 mb-6 border-l-4 rounded-brutal ${styles[type]}`}>
        {children}
      </div>
    )
  },
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components
}