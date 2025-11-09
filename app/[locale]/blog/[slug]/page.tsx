import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts, markdownToHtml } from '@/lib/blog/mdx';
import BlogArticleClient from '@/components/blog/BlogArticleClient';

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  const locales = ['en', 'it'];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const canonicalUrl = `https://mattiacintura.com/${params.locale}/blog/${params.slug}`;

  return {
    title: `${post.title} - Mattia Filippo De Luca`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: canonicalUrl,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              alt: post.title,
            },
          ]
        : [],
      locale: params.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `/en/blog/${params.slug}`,
        it: `/it/blog/${params.slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post || !post.published) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(params.slug, 3);
  const fullUrl = `https://mattiacintura.com/${params.locale}/blog/${params.slug}`;

  // Convert markdown to HTML
  const contentHtml = await markdownToHtml(post.content || '');

  return (
    <Suspense fallback={<BlogArticleLoadingSkeleton />}>
      <BlogArticleClient
        post={post}
        relatedPosts={relatedPosts}
        locale={params.locale}
        contentHtml={contentHtml}
        fullUrl={fullUrl}
      />
    </Suspense>
  );
}

// Loading skeleton
function BlogArticleLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      {/* Sticky header skeleton */}
      <div className="sticky top-0 z-40 bg-[#FFFCF2] border-b-4 border-[#000] py-4">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="h-96 bg-white border-4 border-[#000] rounded-lg animate-pulse" />
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
