import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { generateHeadingId } from '@/lib/utils/heading-utils'

// Lightweight components (keep as regular imports)
import Callout from '@/components/mdx/Callout'
import PullQuote from '@/components/mdx/PullQuote'
import AIInsight from '@/components/mdx/AIInsight'
import RecommendationCard from '@/components/mdx/RecommendationCard'
import InArticleCTA from '@/components/blog/InArticleCTA'

// OPTIMIZATION 2.1: Lazy load CodeBlock (~150-200 kB savings)
// Only loads when article has code blocks
const CodeBlock = dynamic(() => import('@/components/mdx/CodeBlock'), {
  loading: () => (
    <pre className="mb-6 p-4 bg-gray-900 rounded-brutal border-brutal border-black overflow-x-auto shadow-brutal">
      <code className="text-sm text-white">Loading syntax highlighter...</code>
    </pre>
  ),
  ssr: false, // Code highlighting is progressive enhancement
})

// OPTIMIZATION 2.2: Lazy load heavy/rarely-used components (~40-60 kB savings)
// Only loads when article uses them
const StatsCard = dynamic(() => import('@/components/mdx/StatsCard').then(mod => ({ default: mod.StatsCard })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-brutal" />,
})

const StatsGrid = dynamic(() => import('@/components/mdx/StatsCard').then(mod => ({ default: mod.StatsGrid })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded-brutal" />,
})

const ActivityTimeline = dynamic(() => import('@/components/mdx/ActivityTimeline'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-brutal" />,
})

const ImageGallery = dynamic(() => import('@/components/mdx/ImageGallery'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-brutal" />,
})

// Custom components for MDX
export const components: MDXComponents = {
  // Override default HTML elements
  h1: (props: React.ComponentProps<'h1'>) => {
    const id = useMemo(() => generateHeadingId(props.children), [props.children]);
    return <h1 id={id} className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary" {...props} />;
  },
  h2: (props: React.ComponentProps<'h2'>) => {
    const id = useMemo(() => generateHeadingId(props.children), [props.children]);
    return <h2 id={id} className="text-2xl md:text-3xl font-display font-bold mb-4 mt-8 text-brutalist-text-light" {...props} />;
  },
  h3: (props: React.ComponentProps<'h3'>) => {
    const id = useMemo(() => generateHeadingId(props.children), [props.children]);
    return <h3 id={id} className="text-xl md:text-2xl font-display font-semibold mb-3 mt-6" {...props} />;
  },
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mb-4 text-brutalist-text-light/80 leading-relaxed" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mb-4 ml-8 list-disc space-y-2" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mb-4 ml-8 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="text-brutalist-text-light/80" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-6 text-brutalist-text-light/70"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<'code'>) => {
    // If code is inside a pre tag, it will be handled by CodeBlock
    // This is for inline code only
    if (props.className) {
      return <code {...props} />;
    }
    return (
      <code
        className="px-2 py-1 rounded-sm bg-gray-100 text-sm font-mono text-brutalist-text-secondary border border-gray-300"
        {...props}
      />
    );
  },
  pre: (props: React.ComponentProps<'pre'>) => {
    // Extract code from children
    const children = props.children as React.ReactElement;
    const code = children?.props?.children;
    const className = children?.props?.className;

    if (typeof code === 'string') {
      return (
        <CodeBlock className={className}>
          {code}
        </CodeBlock>
      );
    }

    // Fallback to default pre if code structure is unexpected
    return (
      <pre
        className="mb-6 p-4 bg-gray-900 rounded-brutal border-brutal border-black overflow-x-auto shadow-brutal"
        {...props}
      />
    );
  },
  // OPTIMIZATION 2.3: Optimize Image loading
  // Use Next.js Image component with explicit lazy loading
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
        loading="lazy" // Explicit lazy loading
        quality={85} // Optimize quality/size tradeoff
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
  Callout: Callout as any,
  PullQuote: PullQuote as any,
  ImageGallery: ImageGallery as any,

  // Admin components for rich content
  StatsCard: StatsCard as any,
  StatsGrid: StatsGrid as any,
  ActivityTimeline: ActivityTimeline as any,
  AIInsight: AIInsight as any,
  RecommendationCard: RecommendationCard as any,

  // Engagement components
  InArticleCTA: InArticleCTA as any,

  // Legacy Quote component (kept for backwards compatibility)
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
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-brutalist-text-light pb-4 border-b-4 border-black">
          {title}
        </h3>
      )}
      {children}
    </section>
  ),

  Highlight: ({ children }: { children: React.ReactNode }) => (
    <mark className="bg-primary/30 px-2 py-1 rounded font-semibold">
      {children}
    </mark>
  ),
}

export function useMDXComponents(otherComponents: MDXComponents): MDXComponents {
  return {
    ...components,
    ...otherComponents,
  }
}