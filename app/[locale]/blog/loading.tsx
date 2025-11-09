import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export default function BlogLoading() {
  return (
    <Section spacing="lg">
      <div className="brutal-container">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4 animate-pulse">
          <div className="h-12 w-48 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
          <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-brutal mb-2" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-brutal" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
