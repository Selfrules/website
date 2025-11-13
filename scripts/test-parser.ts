/**
 * Quick test script to verify component parser functionality
 */

import { parseComponent, scanComponents } from '../lib/design-system/component-parser';
import path from 'path';

async function testParser() {
  console.log('🧪 Testing Component Parser...\n');

  try {
    // Test parsing Button component
    console.log('📝 Parsing Button.tsx...');
    const buttonPath = path.join(process.cwd(), 'components', 'ui', 'Button.tsx');
    const buttonMetadata = await parseComponent(buttonPath);

    console.log('✅ Button metadata:', JSON.stringify(buttonMetadata, null, 2));
    console.log('\n');

    // Test parsing Card component
    console.log('📝 Parsing Card.tsx...');
    const cardPath = path.join(process.cwd(), 'components', 'ui', 'Card.tsx');
    const cardMetadata = await parseComponent(cardPath);

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
