# Design System Auto-Catalog System

Automatic component metadata extraction and documentation generation system for the neobrutalist design system.

## Overview

This system automatically scans all UI components in `/components/ui/`, extracts their metadata (props, variants, examples), and generates comprehensive documentation. This eliminates manual documentation maintenance and ensures the design system catalog is always up-to-date.

## Architecture

The system consists of three main components:

### 1. Component Parser (`component-parser.ts`)
- Scans `/components/ui/` directory for `.tsx` files
- Uses `ts-morph` (TypeScript Compiler API) to parse component files
- Extracts:
  - Component names
  - Props interfaces with types
  - Variant definitions (union type values)
  - JSDoc comments (when present)
  - Sub-components (for compound components like Card)
- Automatically categorizes components (Buttons, Cards, Forms, etc.)
- Generates usage examples based on variants

### 2. Documentation Generator (`doc-generator.ts`)
- Takes component metadata from parser
- Generates:
  - Markdown documentation
  - JSON metadata file
  - TypeScript import statements
- Creates organized sections by category
- Includes props tables, variant showcases, and code examples

### 3. Build Script (`scripts/generate-design-system.ts`)
- Orchestrates parser and generator
- Runs during build process (pre-build hook)
- Outputs generated files to `/lib/design-system/generated/`:
  - `components.md` - Full markdown documentation
  - `components.json` - JSON metadata for programmatic access
  - `imports.ts` - TypeScript imports for all components

## Usage

### Manual Generation

Generate documentation on-demand:

\`\`\`bash
npm run generate:design-system
\`\`\`

### Automatic Generation

Documentation is automatically regenerated during build:

\`\`\`bash
npm run build  # Runs generate:design-system before Next.js build
\`\`\`

### Development Mode

For hot-reload during development, run the generation script in watch mode (future enhancement) or manually after component changes.

## Component Requirements

For optimal auto-cataloging, components should follow these conventions:

### 1. Export Named Components

\`\`\`tsx
export function Button({ ...props }: ButtonProps) {
  // component code
}

// OR

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    // component code
  }
);
export { Button };
\`\`\`

### 2. Define Props Interfaces

\`\`\`tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}
\`\`\`

### 3. Use Union Types for Variants

Variant prop values should be defined as union types (not enums):

\`\`\`tsx
// ✅ Good
variant?: 'primary' | 'secondary' | 'accent';

// ❌ Avoid
variant?: ButtonVariant;  // enum
\`\`\`

### 4. Add JSDoc Comments (Optional)

JSDoc comments enhance generated documentation:

\`\`\`tsx
/**
 * @component Button
 * @description Primary button component with neobrutalist styling
 * @category Buttons
 *
 * @example
 * <Button variant="primary">Click me</Button>
 */
export function Button({ ...props }: ButtonProps) {
  // ...
}
\`\`\`

## Generated Files

All generated files are output to `/lib/design-system/generated/`:

### `components.md`
- Complete markdown documentation
- Organized by category
- Includes props tables, variant showcases, code examples
- Can be rendered in MDX components

### `components.json`
- JSON metadata for all components
- Useful for programmatic access
- Contains: component names, props, variants, examples, categories

### `imports.ts`
- Auto-generated import statements
- All design system components
- Re-exports components.json for convenience

## Current Limitations & Future Improvements

### Performance
- **Issue**: Parsing 20+ components can take time (3-5 seconds)
- **Solution**: Implement caching, parallel processing, or incremental generation

### Hot Reload
- **Issue**: Requires manual regeneration after component changes in dev mode
- **Solution**: Implement file watcher for automatic regeneration

### Complex Props
- **Issue**: Some complex TypeScript types may not parse perfectly
- **Solution**: Enhance type extraction logic, handle edge cases

### Default Values
- **Issue**: Default values not always extracted correctly
- **Solution**: Parse component code for default prop values

## Testing

Tests are located in `__tests__/`:

\`\`\`bash
# Run parser tests
npm test -- component-parser.test.ts

# Run generator tests
npm test -- doc-generator.test.ts

# Run all tests
npm run test:ci
\`\`\`

## Development

### Adding New Component Categories

Edit `categorizeComponent()` in `component-parser.ts`:

\`\`\`typescript
const nameToCategory: Record<string, ComponentCategory> = {
  NewComponent: 'NewCategory',  // Add mapping here
  // ...
};
\`\`\`

Update `ComponentCategory` type in `types.ts`:

\`\`\`typescript
export type ComponentCategory =
  | 'Buttons'
  | 'Cards'
  | 'NewCategory'  // Add new category
  | 'Other';
\`\`\`

### Customizing Output Format

Modify generator functions in `doc-generator.ts`:
- `generatePropsTable()` - Props documentation format
- `generateVariantShowcase()` - Variant display format
- `generateCodeExamples()` - Example code format

## Troubleshooting

### "No components found"
- Check `/components/ui/` contains `.tsx` files
- Ensure components export named functions/variables
- Verify component files have Props interfaces

### "Parsing errors"
- Check TypeScript syntax in component files
- Run `npm run type-check` to verify no type errors
- Check console for specific error messages

### "Build time too long"
- Consider running generation separately from build
- Implement caching for unchanged files
- Use incremental generation

## Contributing

When adding features to the auto-catalog system:

1. Write tests first (TDD approach)
2. Ensure backward compatibility
3. Update this README with new features
4. Document any new requirements for components

## Related Files

- `/lib/design-system/types.ts` - Type definitions
- `/lib/design-system/component-parser.ts` - Parser implementation
- `/lib/design-system/doc-generator.ts` - Generator implementation
- `/scripts/generate-design-system.ts` - Build script
- `/scripts/test-parser.ts` - Manual test script
- `/.backlog/epics/01-design-system/stories/DS-002-auto-catalog-components.md` - Original requirements

## Support

For issues or questions about the auto-catalog system:
1. Check this README
2. Review test files for usage examples
3. Check backlog story for detailed requirements
4. Contact: mattia@example.com (or create GitHub issue)
