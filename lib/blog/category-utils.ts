/**
 * Shared utilities for blog category styling and mapping
 */

export type CategoryVariant = 'design' | 'dev' | 'pm' | 'tool' | 'featured';

/**
 * Maps blog post categories to badge/component variants
 */
export const categoryToVariant: Record<string, CategoryVariant> = {
  'Product': 'tool',      // Neon Pink
  'Strategy': 'pm',       // Deep Purple
  'OKRs': 'design',       // Electric Blue
  'Design': 'design',     // Electric Blue
  'Development': 'dev',   // Teal
  'Leadership': 'pm',     // Deep Purple
};

/**
 * Maps blog post categories to Tailwind color classes
 * Use this for components that need direct color classes (not Badge/Button variants)
 */
export const categoryToColorClass: Record<string, string> = {
  'Product': 'bg-neon-pink text-white',
  'Strategy': 'bg-deep-purple text-white',
  'OKRs': 'bg-electric-blue text-white',
  'Design': 'bg-electric-blue text-white',
  'Development': 'bg-teal text-white',
  'Leadership': 'bg-deep-purple text-white',
};

/**
 * Get badge variant for a given category
 */
export function getCategoryVariant(category: string): CategoryVariant {
  return categoryToVariant[category] || 'design';
}

/**
 * Get color class for a given category
 */
export function getCategoryColorClass(category: string): string {
  return categoryToColorClass[category] || 'bg-electric-blue text-white';
}
