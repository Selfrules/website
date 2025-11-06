import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import BlogListingClient from './BlogListingClient';
import { getAllPosts } from '@/lib/blog/mdx';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' });

  return {
    title: t('meta.title', { default: 'Blog - Mattia Cintura' }),
    description: t('meta.description', {
      default:
        'Product management insights, startup lessons, and tech reflections from a PM who learned through failure.',
    }),
    openGraph: {
      title: t('meta.title', { default: 'Blog - Mattia Cintura' }),
      description: t('meta.description', {
        default:
          'Product management insights, startup lessons, and tech reflections from a PM who learned through failure.',
      }),
      type: 'website',
      locale: params.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title', { default: 'Blog - Mattia Cintura' }),
      description: t('meta.description', {
        default:
          'Product management insights, startup lessons, and tech reflections from a PM who learned through failure.',
      }),
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  // Fetch all published posts
  const allPosts = await getAllPosts();

  // Extract unique categories and tags
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const allTags = allPosts.flatMap((post) => post.tags);
  const tags = Array.from(new Set(allTags));

  return (
    <main className="min-h-screen bg-brutalist-bg-light dark:bg-brutalist-bg-dark">
      <Suspense fallback={<BlogLoadingSkeleton />}>
        <BlogListingClient
          initialPosts={allPosts}
          categories={categories}
          tags={tags}
          locale={params.locale}
        />
      </Suspense>
    </main>
  );
}

// Loading skeleton component
function BlogLoadingSkeleton() {
  return (
    <div className="brutal-container py-16">
      <div className="mb-12 space-y-4">
        <div className="h-16 w-64 bg-gray-200 dark:bg-gray-800 rounded-brutal border-4 border-black animate-pulse" />
        <div className="h-6 w-96 bg-gray-200 dark:bg-gray-800 rounded-brutal border-2 border-black animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 dark:bg-gray-800 rounded-brutal border-4 border-black shadow-brutal animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
