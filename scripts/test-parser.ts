/**
 * Quick test script to verify component parser functionality
 */

import { parseComponent, scanComponents } from '../lib/design-system/component-parser';
import { Project } from 'ts-morph';
import path from 'path';

async function testParser() {
  console.log('🧪 Testing Component Parser...\n');

  // Create ts-morph project
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });

  try {
    // Test parsing Button component
    console.log('📝 Parsing Button.tsx...');
    const buttonPath = path.join(process.cwd(), 'components', 'ui', 'Button.tsx');
    const buttonSourceFile = project.addSourceFileAtPath(buttonPath);
    const buttonMetadata = parseComponent(buttonSourceFile, buttonPath);

    console.log('✅ Button metadata:', JSON.stringify(buttonMetadata, null, 2));
    console.log('\n');

    // Test parsing Card component
    console.log('📝 Parsing Card.tsx...');
    const cardPath = path.join(process.cwd(), 'components', 'ui', 'Card.tsx');
    const cardSourceFile = project.addSourceFileAtPath(cardPath);
    const cardMetadata = parseComponent(cardSourceFile, cardPath);

    console.log('✅ Card metadata:', JSON.stringify(cardMetadata, null, 2));
    console.log('\n');

    // Test scanning all components
    console.log('📁 Scanning all components...');
    const allComponents = await scanComponents();

    console.log(`✅ Found ${allComponents.length} components:`);
    allComponents.forEach(c => {
      console.log(`  - ${c.name} (${c.category}) - ${c.variants.length} variants`);
    });

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testParser();
