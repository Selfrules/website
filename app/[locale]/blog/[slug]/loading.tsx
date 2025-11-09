import { Section } from '@/components/ui/Section';

export default function BlogPostLoading() {
  return (
    <Section spacing="lg">
      <div className="brutal-container max-w-4xl mx-auto">
        <article className="animate-pulse">
          {/* Header Skeleton */}
          <header className="mb-12 space-y-6">
            <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
            <div className="flex gap-4">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
              <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
            </div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-brutal" />
          </header>

          {/* Content Skeleton */}
          <div className="prose dark:prose-invert max-w-none space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
              </div>
            ))}
          </div>

          {/* Footer Skeleton */}
          <footer className="mt-12 pt-8 border-t-4 border-black space-y-4">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
              ))}
            </div>
          </footer>
        </article>
      </div>
    </Section>
  );
}
