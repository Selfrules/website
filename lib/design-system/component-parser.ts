/**
 * Component Parser
 *
 * Scans /components/ui/ directory and extracts metadata from React components
 * using TypeScript Compiler API and ts-morph for advanced parsing.
 */

import * as ts from 'typescript';
import { Project, SourceFile, SyntaxKind, InterfaceDeclaration, Type } from 'ts-morph';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  ComponentMetadata,
  PropDefinition,
  VariantDefinition,
  ExampleCode,
  ComponentCategory,
} from './types';

const COMPONENTS_DIR = path.join(process.cwd(), 'components', 'ui');

/**
 * Categorizes a component based on its name and props
 */
function categorizeComponent(name: string): ComponentCategory {
  const nameToCategory: Record<string, ComponentCategory> = {
    Button: 'Buttons',
    CTAButton: 'Buttons',
    AnimatedButton: 'Buttons',
    Card: 'Cards',
    Input: 'Forms',
    Textarea: 'Forms',
    Badge: 'Display',
    NeoBadge: 'Display',
    CertificationBadge: 'Display',
    Header: 'Navigation',
    Section: 'Layout',
    BentoGrid: 'Layout',
    Timeline: 'Display',
    Marquee: 'Display',
    Testimonial: 'Display',
    TestimonialModal: 'Feedback',
    CertificationModal: 'Feedback',
    GoogleCalendarPopup: 'Feedback',
    ThemeToggle: 'Navigation',
  };

  return nameToCategory[name] || 'Other';
}

/**
 * Extracts union type values from a type definition
 * e.g., "primary" | "secondary" | "accent" => ["primary", "secondary", "accent"]
 */
function extractUnionValues(type: Type): string[] {
  if (type.isUnion()) {
    return type
      .getUnionTypes()
      .map(t => {
        const text = t.getText().replace(/['"]/g, '');
        return text;
      })
      .filter(v => v !== 'undefined');
  }
  return [];
}

/**
 * Extracts variant definitions from component props
 */
function extractVariants(propsInterface: InterfaceDeclaration | undefined): VariantDefinition[] {
  if (!propsInterface) return [];

  const variants: VariantDefinition[] = [];
  const properties = propsInterface.getProperties();

  for (const prop of properties) {
    const propName = prop.getName();
    const propType = prop.getType();

    // Check if this property is a union type (potential variant)
    const values = extractUnionValues(propType);

    if (values.length > 0 && !propName.includes('children') && !propName.includes('className')) {
      variants.push({
        propName,
        values,
      });
    }
  }

  return variants;
}

/**
 * Extracts prop definitions from a component's props interface
 */
function extractProps(propsInterface: InterfaceDeclaration | undefined): PropDefinition[] {
  if (!propsInterface) return [];

  const props: PropDefinition[] = [];
  const properties = propsInterface.getProperties();

  for (const prop of properties) {
    const propName = prop.getName();
    const propType = prop.getType();
    const isOptional = prop.hasQuestionToken();
    const jsDocComment = prop.getJsDocs()[0];

    // Get default value from JSDoc if available
    const defaultValueMatch = jsDocComment
      ?.getDescription()
      .match(/@default\s+(.+)/);
    const defaultValue = defaultValueMatch ? defaultValueMatch[1].trim() : undefined;

    props.push({
      name: propName,
      type: propType.getText(),
      required: !isOptional,
      defaultValue,
      description: jsDocComment?.getDescription() || undefined,
    });
  }

  return props;
}

/**
 * Generates example code for a component based on its variants
 */
function generateExamples(name: string, variants: VariantDefinition[]): ExampleCode[] {
  const examples: ExampleCode[] = [];

  if (variants.length === 0) {
    // Basic example without variants
    examples.push({
      code: `<${name}>Content</${name}>`,
      description: `Basic ${name} usage`,
    });
    return examples;
  }

  // Generate examples for first variant values
  const mainVariant = variants[0];
  const mainVariantValues = mainVariant.values.slice(0, 3); // Limit to 3 examples

  for (const value of mainVariantValues) {
    examples.push({
      code: `<${name} ${mainVariant.propName}="${value}">Content</${name}>`,
      description: `${name} with ${mainVariant.propName}="${value}"`,
    });
  }

  // If there's a size variant, add one combined example
  const sizeVariant = variants.find(v => v.propName === 'size');
  if (sizeVariant && mainVariantValues.length > 0) {
    examples.push({
      code: `<${name} ${mainVariant.propName}="${mainVariantValues[0]}" ${sizeVariant.propName}="${sizeVariant.values[0]}">Content</${name}>`,
      description: `${name} with multiple props`,
    });
  }

  return examples;
}

/**
 * Extracts metadata from a single component file
 */
export async function parseComponent(filePath: string): Promise<ComponentMetadata> {
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
  });

  const sourceFile = project.addSourceFileAtPath(filePath);
  const fileName = path.basename(filePath, '.tsx');

  // Find all exported interfaces ending with "Props"
  const propsInterfaces = sourceFile
    .getInterfaces()
    .filter(i => i.isExported() && i.getName().endsWith('Props'));

  // Find main component (usually matches filename or is the first exported function component)
  const mainPropsInterface = propsInterfaces.find(i => i.getName() === `${fileName}Props`) || propsInterfaces[0];

  // Extract all exported components from the file
  const exportedComponents = sourceFile
    .getExportSymbols()
    .map(s => s.getName())
    .filter(name => name !== 'default' && !name.endsWith('Props'));

  const mainComponentName = exportedComponents.includes(fileName)
    ? fileName
    : exportedComponents[0] || fileName;

  // Extract metadata
  const variants = extractVariants(mainPropsInterface);
  const props = extractProps(mainPropsInterface);
  const category = categorizeComponent(mainComponentName);
  const examples = generateExamples(mainComponentName, variants);

  // Get JSDoc description from component function if available
  const componentFunc = sourceFile
    .getFunctions()
    .find(f => f.getName() === mainComponentName);
  const jsDoc = componentFunc?.getJsDocs()[0];
  const description =
    jsDoc?.getDescription() ||
    `${mainComponentName} component from the neobrutalist design system`;

  // Handle compound components (e.g., Card, CardHeader, CardTitle)
  const subComponents: ComponentMetadata[] = [];

  if (exportedComponents.length > 1) {
    for (const compName of exportedComponents) {
      if (compName === mainComponentName) continue;

      const compPropsInterface = propsInterfaces.find(i => i.getName() === `${compName}Props`);
      const compVariants = extractVariants(compPropsInterface);
      const compProps = extractProps(compPropsInterface);

      subComponents.push({
        name: compName,
        filePath,
        description: `${compName} sub-component`,
        category,
        props: compProps,
        variants: compVariants,
        examples: generateExamples(compName, compVariants),
      });
    }
  }

  return {
    name: mainComponentName,
    filePath,
    description,
    category,
    props,
    variants,
    examples,
    subComponents: subComponents.length > 0 ? subComponents : undefined,
  };
}

/**
 * Scans all components in /components/ui/ and returns their metadata
 */
export async function scanComponents(): Promise<ComponentMetadata[]> {
  const files = await fs.readdir(COMPONENTS_DIR);

  // Filter to only .tsx files, excluding tests, index, and __tests__ directory
  const componentFiles = files.filter(
    file =>
      file.endsWith('.tsx') &&
      !file.includes('.test.') &&
      !file.includes('index.') &&
      file !== '__tests__'
  );

  const components: ComponentMetadata[] = [];

  for (const file of componentFiles) {
    try {
      const filePath = path.join(COMPONENTS_DIR, file);
      const metadata = await parseComponent(filePath);
      components.push(metadata);
    } catch (error) {
      console.error(`Error parsing ${file}:`, error);
      // Continue with other files even if one fails
    }
  }

  // Sort by category then by name
  return components.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Groups components by category
 */
export function groupByCategory(
  components: ComponentMetadata[]
): Record<ComponentCategory, ComponentMetadata[]> {
  const grouped: Partial<Record<ComponentCategory, ComponentMetadata[]>> = {};

  for (const component of components) {
    const category = component.category as ComponentCategory;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category]!.push(component);
  }

  return grouped as Record<ComponentCategory, ComponentMetadata[]>;
}
