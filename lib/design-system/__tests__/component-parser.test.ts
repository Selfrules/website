/**
 * Tests for Component Parser
 *
 * This test suite validates the component metadata extraction functionality
 * following TDD principles.
 */

import { parseComponent, scanComponents } from '../component-parser';
import path from 'path';

describe('Component Parser', () => {
  const componentsDir = path.join(process.cwd(), 'components', 'ui');

  describe('parseComponent', () => {
    it('should extract component metadata from Button.tsx', async () => {
      const buttonPath = path.join(componentsDir, 'Button.tsx');
      const metadata = await parseComponent(buttonPath);

      expect(metadata).toBeDefined();
      expect(metadata.name).toBe('Button');
      expect(metadata.filePath).toBe(buttonPath);
      expect(metadata.props.length).toBeGreaterThan(0);
    });

    it('should extract variant prop values from Button', async () => {
      const buttonPath = path.join(componentsDir, 'Button.tsx');
      const metadata = await parseComponent(buttonPath);

      const variantProp = metadata.variants.find(v => v.propName === 'variant');
      expect(variantProp).toBeDefined();
      expect(variantProp?.values).toContain('primary');
      expect(variantProp?.values).toContain('secondary');
      expect(variantProp?.values).toContain('accent');
      expect(variantProp?.values).toContain('outline');
      expect(variantProp?.values).toContain('ghost');
    });

    it('should extract size prop values from Button', async () => {
      const buttonPath = path.join(componentsDir, 'Button.tsx');
      const metadata = await parseComponent(buttonPath);

      const sizeProp = metadata.variants.find(v => v.propName === 'size');
      expect(sizeProp).toBeDefined();
      expect(sizeProp?.values).toContain('sm');
      expect(sizeProp?.values).toContain('md');
      expect(sizeProp?.values).toContain('lg');
      expect(sizeProp?.values).toContain('xl');
    });

    it('should extract props with their types', async () => {
      const buttonPath = path.join(componentsDir, 'Button.tsx');
      const metadata = await parseComponent(buttonPath);

      const variantProp = metadata.props.find(p => p.name === 'variant');
      expect(variantProp).toBeDefined();
      expect(variantProp?.required).toBe(false);

      const childrenProp = metadata.props.find(p => p.name === 'children');
      expect(childrenProp).toBeDefined();
    });

    it('should handle compound components like Card', async () => {
      const cardPath = path.join(componentsDir, 'Card.tsx');
      const metadata = await parseComponent(cardPath);

      expect(metadata.name).toBe('Card');
      expect(metadata.subComponents).toBeDefined();
      expect(metadata.subComponents!.length).toBeGreaterThan(0);

      const subComponentNames = metadata.subComponents!.map(c => c.name);
      expect(subComponentNames).toContain('CardHeader');
      expect(subComponentNames).toContain('CardTitle');
      expect(subComponentNames).toContain('CardContent');
    });

    it('should categorize Button as Buttons', async () => {
      const buttonPath = path.join(componentsDir, 'Button.tsx');
      const metadata = await parseComponent(buttonPath);

      expect(metadata.category).toBe('Buttons');
    });

    it('should categorize Card as Cards', async () => {
      const cardPath = path.join(componentsDir, 'Card.tsx');
      const metadata = await parseComponent(cardPath);

      expect(metadata.category).toBe('Cards');
    });

    it('should handle components without variant props', async () => {
      const cardTitlePath = path.join(componentsDir, 'Card.tsx');
      const metadata = await parseComponent(cardTitlePath);

      // CardTitle doesn't have variants, but Card does
      expect(metadata).toBeDefined();
    });
  });

  describe('scanComponents', () => {
    it('should scan all components in /components/ui/', async () => {
      const components = await scanComponents();

      expect(components.length).toBeGreaterThan(0);

      const componentNames = components.map(c => c.name);
      expect(componentNames).toContain('Button');
      expect(componentNames).toContain('Card');
    });

    it('should exclude test files and index.ts', async () => {
      const components = await scanComponents();

      const hasTestFiles = components.some(c =>
        c.filePath.includes('__tests__') ||
        c.filePath.includes('.test.') ||
        c.filePath.includes('index.ts')
      );

      expect(hasTestFiles).toBe(false);
    });

    it('should return components grouped by category', async () => {
      const components = await scanComponents();

      const categories = [...new Set(components.map(c => c.category))];
      expect(categories.length).toBeGreaterThan(0);
      expect(categories).toContain('Buttons');
      expect(categories).toContain('Cards');
    });
  });

  describe('Edge Cases', () => {
    it('should handle components without JSDoc gracefully', async () => {
      // Most current components don't have JSDoc
      const buttonPath = path.join(componentsDir, 'Button.tsx');
      const metadata = await parseComponent(buttonPath);

      expect(metadata.description).toBeDefined();
      // Should have auto-generated description if no JSDoc
    });

    it('should handle complex prop types', async () => {
      const buttonPath = path.join(componentsDir, 'Button.tsx');
      const metadata = await parseComponent(buttonPath);

      // Button extends React.ButtonHTMLAttributes
      const classNameProp = metadata.props.find(p => p.name === 'className');
      expect(classNameProp).toBeDefined();
    });
  });
});
