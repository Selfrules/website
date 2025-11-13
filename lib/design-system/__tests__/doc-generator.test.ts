/**
 * Tests for Documentation Generator
 *
 * Validates the generation of React components and JSX for the design system page
 */

import { generateComponentShowcase, generateCategorySection } from '../doc-generator';
import { ComponentMetadata } from '../types';

describe('Documentation Generator', () => {
  const mockButtonMetadata: ComponentMetadata = {
    name: 'Button',
    filePath: '/components/ui/Button.tsx',
    description: 'Button component from the neobrutalist design system',
    category: 'Buttons',
    props: [
      {
        name: 'variant',
        type: '"primary" | "secondary" | "accent"',
        required: false,
      },
      {
        name: 'size',
        type: '"sm" | "md" | "lg"',
        required: false,
      },
    ],
    variants: [
      {
        propName: 'variant',
        values: ['primary', 'secondary', 'accent'],
      },
      {
        propName: 'size',
        values: ['sm', 'md', 'lg'],
      },
    ],
    examples: [
      {
        code: '<Button variant="primary">Click me</Button>',
        description: 'Primary button',
      },
      {
        code: '<Button variant="secondary" size="lg">Large Button</Button>',
        description: 'Large secondary button',
      },
    ],
  };

  describe('generateComponentShowcase', () => {
    it('should generate showcase with component name and description', () => {
      const showcase = generateComponentShowcase(mockButtonMetadata);

      expect(showcase).toContain('Button');
      expect(showcase).toContain('Button component from the neobrutalist design system');
    });

    it('should include all variant examples', () => {
      const showcase = generateComponentShowcase(mockButtonMetadata);

      expect(showcase).toContain('primary');
      expect(showcase).toContain('secondary');
      expect(showcase).toContain('accent');
    });

    it('should include props table', () => {
      const showcase = generateComponentShowcase(mockButtonMetadata);

      expect(showcase).toContain('variant');
      expect(showcase).toContain('size');
      expect(showcase).toContain('"primary" | "secondary" | "accent"');
    });

    it('should include code examples', () => {
      const showcase = generateComponentShowcase(mockButtonMetadata);

      expect(showcase).toContain('<Button variant="primary">Click me</Button>');
      expect(showcase).toContain('Primary button');
    });

    it('should handle components without variants', () => {
      const simpleComponent: ComponentMetadata = {
        ...mockButtonMetadata,
        variants: [],
        examples: [
          {
            code: '<Simple>Content</Simple>',
            description: 'Basic usage',
          },
        ],
      };

      const showcase = generateComponentShowcase(simpleComponent);

      expect(showcase).toBeDefined();
      expect(showcase).toContain('Simple');
    });

    it('should handle sub-components', () => {
      const cardMetadata: ComponentMetadata = {
        ...mockButtonMetadata,
        name: 'Card',
        subComponents: [
          {
            name: 'CardHeader',
            filePath: '/components/ui/Card.tsx',
            description: 'CardHeader sub-component',
            category: 'Cards',
            props: [],
            variants: [],
            examples: [],
          },
          {
            name: 'CardTitle',
            filePath: '/components/ui/Card.tsx',
            description: 'CardTitle sub-component',
            category: 'Cards',
            props: [],
            variants: [],
            examples: [],
          },
        ],
      };

      const showcase = generateComponentShowcase(cardMetadata);

      expect(showcase).toContain('CardHeader');
      expect(showcase).toContain('CardTitle');
    });
  });

  describe('generateCategorySection', () => {
    it('should group components by category', () => {
      const components: ComponentMetadata[] = [mockButtonMetadata];

      const section = generateCategorySection('Buttons', components);

      expect(section).toContain('Buttons');
      expect(section).toContain('Button');
    });

    it('should include all components in category', () => {
      const components: ComponentMetadata[] = [
        mockButtonMetadata,
        {
          ...mockButtonMetadata,
          name: 'CTAButton',
        },
      ];

      const section = generateCategorySection('Buttons', components);

      expect(section).toContain('Button');
      expect(section).toContain('CTAButton');
    });
  });
});
