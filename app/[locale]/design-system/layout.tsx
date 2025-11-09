import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System - Neobrutalist Components',
  description: 'Interactive design system showcase featuring neobrutalist UI components, color palette, typography scale, and code examples for developers.',
  openGraph: {
    title: 'Design System - Neobrutalist Components',
    description: 'Explore the complete neobrutalist design system with interactive components and live code examples.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design System - Neobrutalist Components',
    description: 'Interactive design system showcase with bold borders, hard shadows, and vibrant colors.',
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
