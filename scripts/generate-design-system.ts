#!/usr/bin/env tsx
/**
 * Generate Design System Documentation
 *
 * This script scans all UI components in /components/ui/, extracts metadata,
 * and generates comprehensive documentation for the design system page.
 *
 * Can be run manually or as part of the build process:
 * - Development: Regenerates on each run for hot-reload
 * - Production: Runs once during build for optimal performance
 *
 * Usage:
 *   npm run generate:design-system
 *   npx tsx scripts/generate-design-system.ts
 */

import { scanComponents, groupByCategory } from '../lib/design-system/component-parser';
import {
  generateDesignSystemDoc,
  generateComponentsJSON,
  generateImportStatements,
} from '../lib/design-system/doc-generator';
import * as fs from 'fs-extra';
import * as path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'lib', 'design-system', 'generated');
const MARKDOWN_OUTPUT = path.join(OUTPUT_DIR, 'components.md');
const JSON_OUTPUT = path.join(OUTPUT_DIR, 'components.json');
const IMPORTS_OUTPUT = path.join(OUTPUT_DIR, 'imports.ts');

async function generateDesignSystem() {
  console.log('🎨 Starting Design System Generation...\n');

  try {
    const startTime = Date.now();

    // Ensure output directory exists
    await fs.ensureDir(OUTPUT_DIR);

    // Step 1: Scan all components
    console.log('📁 Scanning components in /components/ui/...');
    const components = await scanComponents();
    console.log(`✅ Found ${components.length} components\n`);

    if (components.length === 0) {
      console.warn('⚠️  No components found to document!');
      process.exit(1);
    }

    // Step 2: Group by category for summary
    const grouped = groupByCategory(components);
    console.log('📊 Components by category:');
    Object.entries(grouped).forEach(([category, comps]) => {
      console.log(`  - ${category}: ${comps.length} components`);
    });
    console.log();

    // Step 3: Generate markdown documentation
    console.log('📝 Generating markdown documentation...');
    const markdownContent = generateDesignSystemDoc(components);
    await fs.writeFile(MARKDOWN_OUTPUT, markdownContent, 'utf-8');
    console.log(`✅ Markdown saved to: ${path.relative(process.cwd(), MARKDOWN_OUTPUT)}\n`);

    // Step 4: Generate JSON metadata
    console.log('📋 Generating JSON metadata...');
    const jsonContent = generateComponentsJSON(components);
    await fs.writeFile(JSON_OUTPUT, jsonContent, 'utf-8');
    console.log(`✅ JSON saved to: ${path.relative(process.cwd(), JSON_OUTPUT)}\n`);

    // Step 5: Generate import statements
    console.log('📦 Generating TypeScript imports...');
    const importsContent = generateImportStatements(components);
    const importsFile = `/**
 * Auto-generated imports for all design system components
 * Generated at: ${new Date().toISOString()}
 */

${importsContent}

export { default as components } from './components.json';
`;
    await fs.writeFile(IMPORTS_OUTPUT, importsFile, 'utf-8');
    console.log(`✅ Imports saved to: ${path.relative(process.cwd(), IMPORTS_OUTPUT)}\n`);

    // Summary
    const duration = Date.now() - startTime;
    console.log('✨ Design System Generation Complete!');
    console.log(`⏱️  Duration: ${duration}ms`);
    console.log(`📦 Generated ${components.length} component documentations\n`);

    // List all generated files
    console.log('📄 Generated files:');
    console.log(`  1. ${path.relative(process.cwd(), MARKDOWN_OUTPUT)}`);
    console.log(`  2. ${path.relative(process.cwd(), JSON_OUTPUT)}`);
    console.log(`  3. ${path.relative(process.cwd(), IMPORTS_OUTPUT)}`);
    console.log();

    // Performance warning
    if (duration > 5000) {
      console.warn('⚠️  Generation took longer than 5 seconds. Consider optimizing for production builds.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating design system:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateDesignSystem();
}

export { generateDesignSystem };
