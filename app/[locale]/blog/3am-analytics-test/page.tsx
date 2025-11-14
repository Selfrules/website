import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, extractTableOfContents, type TocSection } from '@/lib/blog/mdx';
import Analytics3amClient from './Analytics3amClient';

interface Analytics3amPageProps {
  params: {
    locale: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: Analytics3amPageProps): Promise<Metadata> {
  const post = getPostBySlug('3am-analytics-test-draft');

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const canonicalUrl = `https://mattiacintura.com/${params.locale}/blog/3am-analytics-test`;

  return {
    title: `${post.title} - Mattia Filippo De Luca`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    keywords: ['analytics', 'dashboard', 'product management', 'metrics', 'data-driven decisions'],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: canonicalUrl,
      tags: ['Analytics', 'Product Strategy', 'Data-Driven', 'Product Management'],
      locale: params.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `/en/blog/3am-analytics-test`,
        it: `/it/blog/3am-analytics-test`,
      },
    },
  };
}

export default async function Analytics3amPage({ params }: Analytics3amPageProps) {
  const post = getPostBySlug('3am-analytics-test-draft');

  if (!post || !post.published) {
    notFound();
  }

  const fullUrl = `https://mattiacintura.com/${params.locale}/blog/3am-analytics-test`;

  // Extract table of contents from markdown
  const tocSections: TocSection[] = post.content ? extractTableOfContents(post.content) : [];

  return (
    <Suspense fallback={<ArticleLoadingSkeleton />}>
      <Analytics3amClient
        post={post}
        tocSections={tocSections}
        locale={params.locale}
        fullUrl={fullUrl}
      />
    </Suspense>
  );
}

// Loading skeleton
function ArticleLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Sticky header skeleton */}
      <div className="sticky top-0 z-40 bg-cream border-b-brutal border-black py-4">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="h-10 w-40 bg-gray-200 rounded-brutal animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="h-96 bg-white border-brutal border-black rounded-brutal animate-pulse" />
          </div>

          {/* Article skeleton */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-16 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-4 mt-12">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
