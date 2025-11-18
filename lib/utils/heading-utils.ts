/**
 * Centralized heading ID generation utility
 *
 * This ensures consistent ID generation between:
 * - ToC extraction from raw MDX content
 * - Runtime heading component rendering
 *
 * Prevents ID mismatch that causes scroll-spy flickering.
 */

/**
 * Generates a URL-safe ID from heading text
 *
 * @param text - Heading text (can be string or React node)
 * @returns URL-safe ID string
 *
 * @example
 * generateHeadingId("What is Product Management?")
 * // Returns: "what-is-product-management"
 *
 * generateHeadingId(<span>Hello <strong>World</strong></span>)
 * // Returns: "hello-world"
 */
export function generateHeadingId(text: string | React.ReactNode): string {
  // Convert to string if React node
  const textContent = typeof text === 'string'
    ? text
    : text?.toString() || '';

  return textContent
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')  // Remove special chars
    .replace(/\s+/g, '-')          // Spaces to hyphens
    .replace(/-+/g, '-')           // Collapse multiple hyphens
    .trim();                       // Remove leading/trailing
}
