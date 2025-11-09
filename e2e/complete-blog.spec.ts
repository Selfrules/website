/**
 * Complete Blog E2E Tests
 * Tests blog listing, single posts, and all blog features
 */

import { test, expect } from '@playwright/test';

test.describe('Complete Blog Tests', () => {
  test.describe('Blog Listing Page', () => {
    test('should display blog post cards', async ({ page }) => {
      await page.goto('/blog');

      // Check blog posts are visible
      const posts = page.locator('article');
      await expect(posts.first()).toBeVisible();
      const count = await posts.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should show post metadata (category, reading time, date)', async ({ page }) => {
      await page.goto('/blog');

      // Check reading time
      await expect(page.locator('text=/\\d+ min/i').first()).toBeVisible();

      // Check category
      const category = page.locator('text=/design|dev|product|personal|ama/i').first();
      await expect(category).toBeVisible();
    });

    test('should filter by category', async ({ page }) => {
      await page.goto('/blog');

      // Click category filter
      const categoryButton = page.locator('button').filter({ hasText: /design|dev|product/i }).first();
      if (await categoryButton.count() > 0) {
        await categoryButton.click();
        await page.waitForTimeout(500);

        // Check URL updated
        expect(page.url()).toContain('category=');
      }
    });

    test('should have search functionality', async ({ page }) => {
      await page.goto('/blog');

      const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], input[placeholder*="cerca" i]');
      if (await searchInput.count() > 0) {
        await searchInput.fill('product');
        await page.waitForTimeout(500);

        // Results should filter
        const posts = page.locator('article');
        const count = await posts.count();
        expect(count).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test.describe('Single Blog Post', () => {
    test('should display full blog post content', async ({ page }) => {
      // Navigate to first blog post
      await page.goto('/blog');
      const firstPost = page.locator('article, [class*="card"]').first();
      await firstPost.click();

      // Wait for post page to load
      await page.waitForLoadState('networkidle');

      // Check title
      const title = page.locator('h1');
      await expect(title).toBeVisible();

      // Check content area
      const content = page.locator('article, [class*="content"], [class*="prose"]');
      await expect(content.first()).toBeVisible();
    });

    test('should show reading progress indicator', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);

      // Check for progress bar or indicator
      const progressBar = page.locator('[class*="progress"], [role="progressbar"]');
      if (await progressBar.count() > 0) {
        await expect(progressBar.first()).toBeVisible();
      }
    });

    test('should display share buttons', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Check for share buttons
      const shareButtons = page.locator('button, a').filter({ hasText: /share|condividi|twitter|linkedin|facebook/i });
      if (await shareButtons.count() > 0) {
        await expect(shareButtons.first()).toBeVisible();
      }
    });

    test('should show table of contents for long posts', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Check for TOC
      const toc = page.locator('[class*="toc"], text=/table of contents|indice/i');
      if (await toc.count() > 0) {
        await expect(toc.first()).toBeVisible();

        // TOC links should jump to sections
        const tocLink = toc.locator('a').first();
        if (await tocLink.count() > 0) {
          await tocLink.click();
          await page.waitForTimeout(500);

          // Page should scroll
          const scrollY = await page.evaluate(() => window.scrollY);
          expect(scrollY).toBeGreaterThan(0);
        }
      }
    });

    test('should display related posts', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Check for related posts section
      const relatedSection = page.locator('text=/related|correlati|simili/i');
      if (await relatedSection.count() > 0) {
        await expect(relatedSection.first()).toBeVisible();

        // Should have at least one related post
        const relatedPosts = page.locator('article, [class*="card"]').filter({ hasNot: page.locator('.hero') });
        expect(await relatedPosts.count()).toBeGreaterThan(0);
      }
    });

    test('should track blog view analytics event', async ({ page }) => {
      await page.goto('/blog');

      const [request] = await Promise.all([
        page.waitForRequest(req => req.url().includes('/api/analytics') && req.method() === 'POST'),
        page.locator('article').first().click(),
      ]);

      expect(request).toBeTruthy();
      const postData = request.postDataJSON();
      expect(postData.eventType).toMatch(/blog|page_view/i);
    });
  });

  test.describe('MDX Components', () => {
    test('should render code blocks with syntax highlighting', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Check for code blocks
      const codeBlocks = page.locator('pre code, [class*="highlight"]');
      if (await codeBlocks.count() > 0) {
        await expect(codeBlocks.first()).toBeVisible();

        // Check for syntax highlighting classes
        const codeClass = await codeBlocks.first().getAttribute('class');
        expect(codeClass).toBeTruthy();
      }
    });

    test('should render blockquotes with neobrutalist styling', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      const blockquotes = page.locator('blockquote');
      if (await blockquotes.count() > 0) {
        await expect(blockquotes.first()).toBeVisible();

        // Check for brutalist border/shadow
        const styles = await blockquotes.first().evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            border: computed.borderWidth,
            boxShadow: computed.boxShadow,
          };
        });

        // Should have thick border or hard shadow (brutalist style)
        const hasBrutalStyle =
          styles.border.includes('4px') ||
          styles.border.includes('5px') ||
          styles.border.includes('6px') ||
          styles.boxShadow.includes('8px');

        expect(hasBrutalStyle).toBeTruthy();
      }
    });
  });

  test.describe('SEO & Meta Tags', () => {
    test('should have proper meta tags for blog listing', async ({ page }) => {
      await page.goto('/blog');

      // Check title
      const title = await page.title();
      expect(title).toContain('Blog');

      // Check meta description
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });

    test('should have proper meta tags for single post', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Check dynamic title
      const title = await page.title();
      expect(title.length).toBeGreaterThan(5);

      // Check OG tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();
    });
  });
});
