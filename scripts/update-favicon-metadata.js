#!/usr/bin/env node

/**
 * Script to update app/layout.tsx with favicon metadata
 * Run with: node scripts/update-favicon-metadata.js
 */

const fs = require('fs');
const path = require('path');

const LAYOUT_PATH = path.join(__dirname, '../app/layout.tsx');

const FAVICON_METADATA = `  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon.svg',
        color: '#0D7EFF',
      },
    ],
  },`;

const PWA_METADATA = `  themeColor: '#0D7EFF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mattia De Luca',
  },`;

console.log('📝 Updating app/layout.tsx with favicon metadata...');

try {
  // Read the file
  let content = fs.readFileSync(LAYOUT_PATH, 'utf8');

  // Check if already updated
  if (content.includes('manifest: \'/manifest.json\'')) {
    console.log('✅ Layout already contains favicon metadata. No changes needed.');
    process.exit(0);
  }

  // Insert favicon metadata after "creator" line
  const creatorRegex = /(creator: ['"]Mattia Filippo De Luca['"],?\r?\n)/;
  if (!creatorRegex.test(content)) {
    console.error('❌ Could not find "creator" field in metadata object');
    console.error('Content around creator:', content.substring(content.indexOf('creator'), content.indexOf('creator') + 100));
    process.exit(1);
  }

  content = content.replace(creatorRegex, `$1${FAVICON_METADATA}\n`);

  // Insert PWA metadata before closing brace of metadata object
  const robotsRegex = /(robots: \{[\s\S]*?\},\r?\n)(\};)/;
  if (!robotsRegex.test(content)) {
    console.error('❌ Could not find "robots" field in metadata object');
    console.error('Content around end:', content.substring(content.indexOf('robots'), content.indexOf('robots') + 150));
    process.exit(1);
  }

  content = content.replace(robotsRegex, `$1${PWA_METADATA}\n$2`);

  // Write the updated content
  fs.writeFileSync(LAYOUT_PATH, content, 'utf8');

  console.log('✅ Successfully updated app/layout.tsx');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Run: npm run dev');
  console.log('  2. Check browser tab for favicon');
  console.log('  3. Inspect with DevTools → Application → Manifest');
  console.log('');
  console.log('For more details, see: FAVICON_SETUP.md');
} catch (error) {
  console.error('❌ Error updating layout.tsx:', error.message);
  console.error('');
  console.error('Please manually update app/layout.tsx following the instructions in FAVICON_SETUP.md');
  process.exit(1);
}
