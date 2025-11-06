import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts, markdownToHtml } from '@/lib/blog/mdx';
import ReadingProgress from '@/components/blog/ReadingProgress';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { Badge } from '@/components/ui/Badge';

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
    title: `${post.title} - Mattia Cintura`,
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
    <>
      <ReadingProgress />

      <main className="min-h-screen bg-brutalist-bg-light dark:bg-brutalist-bg-dark">
        <article className="brutal-container py-16 md:py-24">
          {/* Back Button */}
          <Link
            href={`/${params.locale}/blog`}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white dark:bg-gray-900 border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all text-brutalist-text-light dark:text-brutalist-text-dark font-heading font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Header */}
              <header className="mb-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <Badge variant="primary" size="md">
                    {post.category}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-brutalist-text-light dark:text-brutalist-text-dark mb-6">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 mb-6">
                  {post.excerpt}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 mb-6 pb-6 border-b-4 border-black">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(params.locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readingTime}
                  </span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Share Buttons */}
                <ShareButtons
                  title={post.title}
                  excerpt={post.excerpt}
                  url={fullUrl}
                />
              </header>

              {/* MDX Content */}
              <div
                className="prose prose-lg max-w-none blog-content"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t-4 border-black">
                <ShareButtons
                  title={post.title}
                  excerpt={post.excerpt}
                  url={fullUrl}
                  className="mb-8"
                />

                {/* Author Bio */}
                <div className="bg-white dark:bg-gray-900 border-4 border-black rounded-brutal shadow-brutal p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary border-4 border-black rounded-full flex items-center justify-center font-heading font-black text-2xl">
                      M
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl text-brutalist-text-light dark:text-brutalist-text-dark mb-2">
                        {post.author}
                      </h3>
                      <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 text-sm">
                        Product Manager who learned through failure. Former designer
                        and developer. Now building products that solve real problems.
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </div>

            {/* Sidebar - Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <TableOfContents />
              </div>
            </aside>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <RelatedPosts
              posts={relatedPosts}
              locale={params.locale}
              className="mt-16"
            />
          )}
        </article>
      </main>
    </>
  );
}
