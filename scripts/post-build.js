#!/usr/bin/env node
/**
 * Post-build script to sync blog HTML files to index.html locations
 * This ensures /blog/post-slug/ URLs work correctly with StaticSite
 */

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');
const BLOG_DIR = path.join(OUT_DIR, 'blog');

// Blog posts that need index.html copies
const BLOG_POSTS = [
  'ai-code-debt-tsunami',
  'invisible-codebase',
  'metrics-that-actually-matter',
  'semantic-duplicate-detection'
];

console.log('📝 Post-build: Creating blog index.html files...');

let successCount = 0;
let errorCount = 0;

BLOG_POSTS.forEach(slug => {
  const sourceFile = path.join(BLOG_DIR, `${slug}.html`);
  const targetDir = path.join(BLOG_DIR, slug);
  const targetFile = path.join(targetDir, 'index.html');

  if (!fs.existsSync(sourceFile)) {
    console.warn(`⚠️  Source file not found: ${slug}.html`);
    errorCount++;
    return;
  }

  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy file
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`✓ Created ${slug}/index.html`);
    successCount++;
  } catch (err) {
    console.error(`✗ Failed to create ${slug}/index.html:`, err.message);
    errorCount++;
  }
});

console.log(`\n✅ Post-build complete: ${successCount} files created${errorCount > 0 ? `, ${errorCount} errors` : ''}`);

if (errorCount > 0) {
  process.exit(1);
}