/**
 * Documentation Generator
 *
 * Generates JSX/TSX markup for the design system page
 * from component metadata extracted by the parser
 */

import { ComponentMetadata, ComponentCategory } from './types';

/**
 * Generates a props table in markdown format
 */
function generatePropsTable(metadata: ComponentMetadata): string {
  if (metadata.props.length === 0) {
    return '';
  }

  const rows = metadata.props.map(prop => {
    return `| \`${prop.name}\` | \`${prop.type}\` | ${prop.required ? 'Yes' : 'No'} | ${prop.defaultValue || '-'} |`;
  });

  return `
### Props

| Prop | Type | Required | Default |
|------|------|----------|---------|
${rows.join('\n')}
`;
}

/**
 * Generates variant showcase with visual examples
 */
function generateVariantShowcase(metadata: ComponentMetadata): string {
  if (metadata.variants.length === 0) {
    return '';
  }

  const variantSections = metadata.variants
    .map(variant => {
      const examples = variant.values
        .map(
          value => `
<div className="p-4 border-brutal border-brutalist-border rounded-brutal">
  <p className="text-sm font-medium mb-2">${variant.propName}="${value}"</p>
  <${metadata.name} ${variant.propName}="${value}">
    ${metadata.name}
  </${metadata.name}>
</div>`
        )
        .join('\n');

      return `
#### ${variant.propName} variants

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
${examples}
</div>
`;
    })
    .join('\n');

  return `
### Variants

${variantSections}
`;
}

/**
 * Generates code examples section
 */
function generateCodeExamples(metadata: ComponentMetadata): string {
  if (metadata.examples.length === 0) {
    return '';
  }

  const exampleBlocks = metadata.examples
    .map(
      example => `
#### ${example.description}

\`\`\`tsx
${example.code}
\`\`\`
`
    )
    .join('\n');

  return `
### Usage Examples

${exampleBlocks}
`;
}

/**
 * Generates sub-components section for compound components
 */
function generateSubComponentsSection(metadata: ComponentMetadata): string {
  if (!metadata.subComponents || metadata.subComponents.length === 0) {
    return '';
  }

  const subComponentsList = metadata.subComponents
    .map(
      sub => `
#### ${sub.name}

${sub.description}

${sub.variants.length > 0 ? generateVariantShowcase(sub) : ''}

${sub.examples.length > 0 ? generateCodeExamples(sub) : ''}
`
    )
    .join('\n');

  return `
### Sub-Components

${subComponentsList}
`;
}

/**
 * Generates complete showcase for a single component
 */
export function generateComponentShowcase(metadata: ComponentMetadata): string {
  return `
## ${metadata.name}

${metadata.description}

${generatePropsTable(metadata)}

${generateVariantShowcase(metadata)}

${generateCodeExamples(metadata)}

${generateSubComponentsSection(metadata)}

---
`;
}

/**
 * Generates a category section with all components in that category
 */
export function generateCategorySection(
  category: ComponentCategory,
  components: ComponentMetadata[]
): string {
  const componentShowcases = components
    .map(comp => generateComponentShowcase(comp))
    .join('\n');

  return `
# ${category}

${componentShowcases}
`;
}

/**
 * Generates complete design system documentation
 * Returns markdown content that can be rendered in MDX
 */
export function generateDesignSystemDoc(components: ComponentMetadata[]): string {
  // Group components by category
  const grouped: Partial<Record<ComponentCategory, ComponentMetadata[]>> = {};

  for (const component of components) {
    if (!grouped[component.category]) {
      grouped[component.category] = [];
    }
    grouped[component.category]!.push(component);
  }

  // Generate sections for each category
  const categories = Object.keys(grouped) as ComponentCategory[];
  const sections = categories
    .sort()
    .map(category => generateCategorySection(category, grouped[category]!))
    .join('\n\n');

  return `---
title: Design System
description: Neobrutalist design system component catalog
generated: ${new Date().toISOString()}
---

# Design System

Auto-generated component catalog for the neobrutalist design system.

${sections}
`;
}

/**
 * Generates a JSON file with all component metadata
 * Useful for programmatic access to component information
 */
export function generateComponentsJSON(components: ComponentMetadata[]): string {
  return JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      componentsCount: components.length,
      components,
    },
    null,
    2
  );
}

/**
 * Generates TypeScript import statements for all components
 */
export function generateImportStatements(components: ComponentMetadata[]): string {
  const imports = components.map(comp => {
    const relativePath = comp.filePath.replace(/\\/g, '/').replace(/^.*\/components\//, '@/components/').replace('.tsx', '');

    if (comp.subComponents && comp.subComponents.length > 0) {
      const allComponents = [comp.name, ...comp.subComponents.map(sub => sub.name)];
      return `import { ${allComponents.join(', ')} } from '${relativePath}';`;
    }

    return `import { ${comp.name} } from '${relativePath}';`;
  });

  return imports.join('\n');
}
