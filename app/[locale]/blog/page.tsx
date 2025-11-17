import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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
    title: t('meta.title', { default: 'Lessons from the Trenches - Mattia Filippo De Luca' }),
    description: t('meta.description', {
      default:
        '200+ fallimenti documentati. Cosa ho imparato costruendo prodotti, guidando team, e sopravvivendo a meeting infiniti.',
    }),
    openGraph: {
      title: t('meta.title', { default: 'Lessons from the Trenches - Mattia Filippo De Luca' }),
      description: t('meta.description', {
        default:
          '200+ fallimenti documentati. Cosa ho imparato costruendo prodotti, guidando team, e sopravvivendo a meeting infiniti.',
      }),
      type: 'website',
      locale: params.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title', { default: 'Lessons from the Trenches - Mattia Filippo De Luca' }),
      description: t('meta.description', {
        default:
          '200+ fallimenti documentati. Cosa ho imparato costruendo prodotti, guidando team, e sopravvivendo a meeting infiniti.',
      }),
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  // Enable static rendering for i18n
  setRequestLocale(params.locale);

  // Fetch all published posts
  const allPosts = await getAllPosts();

  // Extract unique categories and tags
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const allTags = allPosts.flatMap((post) => post.tags);
  const tags = Array.from(new Set(allTags));

  return (
    <main className="min-h-screen bg-cream">
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
    <div className="min-h-screen bg-cream">
      {/* Hero Skeleton */}
      <div className="bg-gradient-cta border-b-4 border-black py-16 md:py-24">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="h-12 w-48 bg-white/20 rounded-lg mb-6 animate-pulse" />
          <div className="h-16 w-96 bg-white/30 rounded-lg mb-6 animate-pulse" />
          <div className="h-6 w-[600px] bg-white/20 rounded-lg mb-8 animate-pulse" />
          <div className="h-14 w-[600px] bg-white rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="h-8 w-48 bg-gray-200 rounded-lg mb-10 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-white border-brutal-thick border-black rounded-lg shadow-brutal animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
