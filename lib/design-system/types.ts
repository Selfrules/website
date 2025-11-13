/**
 * Type definitions for the design system auto-catalog system
 */

/**
 * Represents a prop definition for a component
 */
export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

/**
 * Represents a variant definition (e.g., "primary", "secondary")
 */
export interface VariantDefinition {
  propName: string; // e.g., "variant", "size"
  values: string[]; // e.g., ["primary", "secondary", "accent"]
}

/**
 * Represents a code example for a component
 */
export interface ExampleCode {
  code: string;
  description?: string;
}

/**
 * Complete metadata for a component
 */
export interface ComponentMetadata {
  name: string;
  filePath: string;
  description: string;
  category: string;
  props: PropDefinition[];
  variants: VariantDefinition[];
  examples: ExampleCode[];
  subComponents?: ComponentMetadata[]; // For compound components like Card
}

/**
 * Categories for organizing components
 */
export type ComponentCategory =
  | 'Buttons'
  | 'Cards'
  | 'Forms'
  | 'Navigation'
  | 'Layout'
  | 'Feedback'
  | 'Display'
  | 'Other';
