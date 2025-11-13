#!/usr/bin/env node

/**
 * Update Story Status Script
 *
 * Automatically updates the status of a user story to "Done" when a PR is merged.
 *
 * Usage: node update-story-status.js STORY-ID
 * Example: node update-story-status.js GC-002
 */

const fs = require('fs');
const path = require('path');

// Get Story ID from command line arguments
const storyId = process.argv[2];

if (!storyId) {
  console.error('❌ Error: Story ID is required');
  console.error('Usage: node update-story-status.js STORY-ID');
  process.exit(1);
}

console.log(`🔍 Looking for story: ${storyId}`);

// Find story file in backlog
const backlogPath = path.join(process.cwd(), '.backlog/epics');

/**
 * Recursively search for story files
 */
function findStoryFiles(dir, storyId, results = []) {
  const files = fs.readdirSync(dir);

  // Patterns to exclude (summaries, test results, etc.)
  const excludePatterns = [
    '-COMPLETION-SUMMARY.md',
    '-TEST-RESULTS.md',
    '-SUMMARY.md',
    '-NOTES.md'
  ];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findStoryFiles(filePath, storyId, results);
    } else if (file.startsWith(`${storyId}-`) && file.endsWith('.md')) {
      // Skip excluded patterns
      const isExcluded = excludePatterns.some(pattern => file.includes(pattern));
      if (!isExcluded) {
        // Store relative path from backlogPath
        results.push(path.relative(backlogPath, filePath));
      }
    }
  }

  return results;
}

// Search for story file
let storyFiles;
try {
  storyFiles = findStoryFiles(backlogPath, storyId);
} catch (error) {
  console.error('❌ Error searching for story file:', error.message);
  process.exit(1);
}

if (storyFiles.length === 0) {
  console.error(`❌ No story file found for ID: ${storyId}`);
  console.error(`   Searched in: ${backlogPath}`);
  process.exit(1);
}

if (storyFiles.length > 1) {
  console.warn(`⚠️  Multiple files found for ${storyId}:`);
  storyFiles.forEach(file => console.warn(`   - ${file}`));
  console.warn('   Using the first one...');
}

const storyFile = path.join(backlogPath, storyFiles[0]);
console.log(`✓ Found story file: ${storyFiles[0]}`);

// Read story file
let content;
try {
  content = fs.readFileSync(storyFile, 'utf8');
} catch (error) {
  console.error(`❌ Error reading file: ${error.message}`);
  process.exit(1);
}

// Update status and date
const today = new Date().toISOString().split('T')[0];

// Regex to match the Stato line in Metadata section
// Format: - **Stato**: <emoji> <Status> | **Data**: YYYY-MM-DD
const statusRegex = /^(\s*-\s*\*\*Stato\*\*:\s*)([📋🔄✅⏸️❌])\s*([^|]+)(\s*\|\s*\*\*Data\*\*:\s*)(.+)$/m;

let updatedContent = content;
let statusChanged = false;

// Check current status
const currentMatch = content.match(statusRegex);
if (currentMatch) {
  const currentEmoji = currentMatch[2];
  const currentStatus = currentMatch[3].trim();
  const currentDate = currentMatch[5].trim();

  console.log(`📊 Current status: ${currentEmoji} ${currentStatus} (${currentDate})`);

  // Only update if not already Done
  if (currentEmoji !== '✅') {
    updatedContent = content.replace(
      statusRegex,
      `$1✅ Done $4${today}`
    );
    statusChanged = true;
    console.log(`✅ Updated status: ✅ Done (${today})`);
  } else {
    console.log('ℹ️  Story already marked as Done, updating date only...');
    // Update date even if already Done
    updatedContent = content.replace(
      statusRegex,
      `$1✅ Done $4${today}`
    );
    statusChanged = true;
  }
} else {
  console.error('❌ Could not find status line in story file');
  console.error('   Expected format: - **Stato**: <emoji> <status> | **Data**: YYYY-MM-DD');
  process.exit(1);
}

// Write updated content
if (statusChanged) {
  try {
    fs.writeFileSync(storyFile, updatedContent, 'utf8');
    console.log('✅ Story file updated successfully');
  } catch (error) {
    console.error(`❌ Error writing file: ${error.message}`);
    process.exit(1);
  }
} else {
  console.log('ℹ️  No changes needed');
}

console.log('🎉 Done!');
