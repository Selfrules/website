/**
 * Shared utilities for blog category styling and mapping
 */

export type CategoryVariant = 'design' | 'dev' | 'pm' | 'tool' | 'featured';

export type KnownCategory = 'Product' | 'Strategy' | 'OKRs' | 'Design' | 'Development' | 'Leadership';

/**
 * Maps blog post categories to badge/component variants
 */
export const categoryToVariant: Readonly<Record<KnownCategory, CategoryVariant>> = {
  'Product': 'tool',      // Neon Pink
  'Strategy': 'pm',       // Deep Purple
  'OKRs': 'design',       // Electric Blue
  'Design': 'design',     // Electric Blue
  'Development': 'dev',   // Teal
  'Leadership': 'pm',     // Deep Purple
};

/**
 * Maps blog post categories to background colors (hex values)
 * Use this for inline styles when Tailwind classes don't work due to specificity
 */
export const categoryToBgColor: Readonly<Record<KnownCategory, string>> = {
  'Product': '#FF006E',    // Neon Pink
  'Strategy': '#7209B7',   // Deep Purple
  'OKRs': '#0D7EFF',       // Electric Blue
  'Design': '#0D7EFF',     // Electric Blue
  'Development': '#2A687A', // Teal
  'Leadership': '#7209B7', // Deep Purple
};

/**
 * Get badge variant for a given category
 */
export function getCategoryVariant(category: string): CategoryVariant {
  const variant = categoryToVariant[category as KnownCategory];
  if (!variant && process.env.NODE_ENV === 'development') {
    console.warn(`Unknown category "${category}", defaulting to "design" variant`);
  }
  return variant || 'design';
}

/**
 * Get background color (hex) for a given category
 * Useful for inline styles when CSS specificity is an issue
 */
export function getCategoryBgColor(category: string): string {
  const color = categoryToBgColor[category as KnownCategory];
  if (!color && process.env.NODE_ENV === 'development') {
    console.warn(`Unknown category "${category}", defaulting to Electric Blue`);
  }
  return color || '#0D7EFF';
}
