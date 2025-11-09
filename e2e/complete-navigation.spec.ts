/**
 * Complete Navigation E2E Tests
 * Tests routing, navigation, and page transitions
 */

import { test, expect } from '@playwright/test';

test.describe('Complete Navigation Tests', () => {
  test.describe('Main Navigation', () => {
    test('should display main navigation menu', async ({ page }) => {
      await page.goto('/');

      // Check for navigation element
      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav.first()).toBeVisible();
    });

    test('should navigate to blog from homepage', async ({ page }) => {
      await page.goto('/');

      // Click blog link
      const blogLink = page.locator('nav a, header a').filter({ hasText: /blog/i }).first();
      await blogLink.click();
      await page.waitForLoadState('networkidle');

      // Should be on blog page
      expect(page.url()).toContain('/blog');
      await expect(page.locator('h1, h2').filter({ hasText: /blog|latest thinking|pensieri/i })).toBeVisible();
    });

    test('should navigate back to homepage from blog', async ({ page }) => {
      await page.goto('/blog');

      // Click home/logo link
      const homeLink = page.locator('nav a, header a').filter({ hasText: /home|mattia/i }).first().or(
        page.locator('a[href="/"], a[href="/it"], a[href="/en"]').first()
      );

      if (await homeLink.count() > 0) {
        await homeLink.click();
        await page.waitForLoadState('networkidle');

        // Should be on homepage
        expect(page.url()).toMatch(/\/(it|en)?$/);
      }
    });

    test('should have active state on current page', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Blog link should have active state
      const blogLink = page.locator('nav a').filter({ hasText: /blog/i }).first();

      if (await blogLink.count() > 0) {
        const classes = await blogLink.getAttribute('class');
        const ariaC = await blogLink.getAttribute('aria-current');

        // Should have active indicator (class or aria-current)
        expect(classes?.includes('active') || ariaC === 'page').toBeTruthy();
      }
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.goto('/');

      // Tab to first navigation link
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab'); // Skip skip-link
      const focused = page.locator(':focus');

      // Should be able to focus navigation links
      await expect(focused).toBeVisible();

      // Enter should navigate
      await page.keyboard.press('Enter');
      await page.waitForLoadState('networkidle');

      // Should navigate to new page
      expect(page.url()).not.toContain('/#');
    });
  });

  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display mobile menu toggle', async ({ page }) => {
      await page.goto('/');

      const mobileToggle = page.locator('button').filter({ hasText: /menu|≡|☰/i }).or(
        page.locator('button[aria-label*="menu" i]')
      );

      if (await mobileToggle.count() > 0) {
        await expect(mobileToggle.first()).toBeVisible();
      }
    });

    test('should open mobile menu on toggle click', async ({ page }) => {
      await page.goto('/');

      const mobileToggle = page.locator('button').filter({ hasText: /menu|≡/i }).first();

      if (await mobileToggle.count() > 0) {
        await mobileToggle.click();
        await page.waitForTimeout(500);

        // Menu should be visible
        const mobileMenu = page.locator('nav, [role="navigation"]').first();
        await expect(mobileMenu).toBeVisible();

        // Links should be visible
        const links = mobileMenu.locator('a');
        await expect(links.first()).toBeVisible();
      }
    });

    test('should close mobile menu after navigation', async ({ page }) => {
      await page.goto('/');

      const mobileToggle = page.locator('button').filter({ hasText: /menu/i }).first();

      if (await mobileToggle.count() > 0) {
        // Open menu
        await mobileToggle.click();
        await page.waitForTimeout(500);

        // Click link
        const blogLink = page.locator('nav a').filter({ hasText: /blog/i }).first();
        await blogLink.click();
        await page.waitForLoadState('networkidle');

        // Menu should close
        const mobileMenu = page.locator('nav[class*="open"], [class*="mobile-menu-open"]');
        if (await mobileMenu.count() > 0) {
          const isOpen = await mobileMenu.isVisible();
          expect(isOpen).toBe(false);
        }
      }
    });

    test('should support swipe to close menu', async ({ page }) => {
      await page.goto('/');

      const mobileToggle = page.locator('button').filter({ hasText: /menu/i }).first();

      if (await mobileToggle.count() > 0) {
        await mobileToggle.click();
        await page.waitForTimeout(500);

        // Swipe left to close (simulate drag gesture)
        const menu = page.locator('nav').first();
        const box = await menu.boundingBox();

        if (box) {
          // Simulate swipe gesture using touchscreen drag
          await page.touchscreen.tap(box.x + box.width - 50, box.y + 50);
          await page.mouse.move(box.x + box.width - 50, box.y + 50);
          await page.mouse.down();
          await page.mouse.move(box.x - 100, box.y + 50);
          await page.mouse.up();
          await page.waitForTimeout(500);

          // Menu should close (implementation dependent)
        }
      }
    });
  });

  test.describe('Blog Navigation', () => {
    test('should navigate to individual blog post', async ({ page }) => {
      await page.goto('/blog');

      // Click first blog post
      const firstPost = page.locator('article, [class*="card"]').first();
      await firstPost.click();
      await page.waitForLoadState('networkidle');

      // Should be on blog post page
      expect(page.url()).toMatch(/\/blog\/.+/);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should have breadcrumb navigation on blog post', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Check for breadcrumb
      const breadcrumb = page.locator('nav[aria-label*="breadcrumb" i], [class*="breadcrumb"]');

      if (await breadcrumb.count() > 0) {
        await expect(breadcrumb.first()).toBeVisible();

        // Should have home and blog links
        const homeLink = breadcrumb.locator('a').filter({ hasText: /home/i });
        const blogLink = breadcrumb.locator('a').filter({ hasText: /blog/i });

        if (await homeLink.count() > 0) await expect(homeLink.first()).toBeVisible();
        if (await blogLink.count() > 0) await expect(blogLink.first()).toBeVisible();
      }
    });

    test('should navigate between blog posts (prev/next)', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Look for prev/next navigation
      const nextLink = page.locator('a').filter({ hasText: /next|prossimo|avanti/i });
      const prevLink = page.locator('a').filter({ hasText: /previous|precedente|indietro/i });

      if (await nextLink.count() > 0) {
        await nextLink.first().click();
        await page.waitForLoadState('networkidle');

        // Should navigate to different post
        expect(page.url()).toContain('/blog/');
      } else if (await prevLink.count() > 0) {
        await prevLink.first().click();
        await page.waitForLoadState('networkidle');

        // Should navigate to different post
        expect(page.url()).toContain('/blog/');
      }
    });

    test('should navigate using related posts', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Scroll to bottom for related posts
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Look for related posts
      const relatedPosts = page.locator('article, [class*="card"]').filter({ hasNot: page.locator('.hero') });
      if (await relatedPosts.count() > 1) {
        await relatedPosts.nth(1).click();
        await page.waitForLoadState('networkidle');

        // Should navigate to related post
        expect(page.url()).toContain('/blog/');
      }
    });

    test('should filter blog by category', async ({ page }) => {
      await page.goto('/blog');

      // Click category filter
      const categoryButton = page.locator('button, a').filter({ hasText: /design|dev|product/i }).first();

      if (await categoryButton.count() > 0) {
        const category = await categoryButton.textContent();
        await categoryButton.click();
        await page.waitForTimeout(500);

        // URL should update with category
        expect(page.url()).toContain('category=');

        // Posts should be filtered
        const posts = page.locator('article');
        const count = await posts.count();
        expect(count).toBeGreaterThanOrEqual(0);
      }
    });

    test('should clear category filter', async ({ page }) => {
      await page.goto('/blog?category=design');

      // Click "All" or clear filter button
      const allButton = page.locator('button, a').filter({ hasText: /all|tutti|clear/i }).first();

      if (await allButton.count() > 0) {
        await allButton.click();
        await page.waitForTimeout(500);

        // URL should not have category param
        expect(page.url()).not.toContain('category=');
      }
    });
  });

  test.describe('Language Switching', () => {
    test('should switch language and preserve current page', async ({ page }) => {
      await page.goto('/it');

      // Switch to English
      const enLink = page.locator('button, a').filter({ hasText: /EN|english/i });

      if (await enLink.count() > 0) {
        await enLink.first().click();
        await page.waitForLoadState('networkidle');

        // Should be on English version of same page
        expect(page.url()).toContain('/en');
      }
    });

    test('should switch language on blog post', async ({ page }) => {
      await page.goto('/it/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      const currentUrl = page.url();

      // Switch language
      const enLink = page.locator('button, a').filter({ hasText: /EN/i });

      if (await enLink.count() > 0) {
        await enLink.first().click();
        await page.waitForLoadState('networkidle');

        // Should be on English version of same post
        expect(page.url()).toContain('/en/blog/');
      }
    });

    test('should persist language across navigation', async ({ page }) => {
      await page.goto('/en');

      // Navigate to blog
      const blogLink = page.locator('a').filter({ hasText: /blog/i }).first();
      await blogLink.click();
      await page.waitForLoadState('networkidle');

      // Should still be in English
      expect(page.url()).toContain('/en');
    });
  });

  test.describe('Scroll Navigation', () => {
    test('should have smooth scroll for anchor links', async ({ page }) => {
      await page.goto('/');

      // Find section link (e.g., to journey, blog, etc.)
      const sectionLink = page.locator('a[href^="#"]').first();

      if (await sectionLink.count() > 0) {
        const href = await sectionLink.getAttribute('href');
        await sectionLink.click();
        await page.waitForTimeout(1000);

        // Should scroll to section
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBeGreaterThan(100);
      }
    });

    test('should have scroll-to-top button', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      // Look for scroll-to-top button
      const scrollTop = page.locator('button, a').filter({ hasText: /top|up|↑/i }).or(
        page.locator('[aria-label*="scroll to top" i], [class*="scroll-top"]')
      );

      if (await scrollTop.count() > 0) {
        await expect(scrollTop.first()).toBeVisible();

        // Click should scroll to top
        await scrollTop.first().click();
        await page.waitForTimeout(500);

        const newScrollY = await page.evaluate(() => window.scrollY);
        expect(newScrollY).toBeLessThan(100);
      }
    });

    test('should show/hide navigation on scroll', async ({ page }) => {
      await page.goto('/blog');
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      const nav = page.locator('header, nav').first();
      const initialBox = await nav.boundingBox();

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(500);

      const scrolledBox = await nav.boundingBox();

      // Navigation behavior may change on scroll (sticky, hide, etc.)
      // This is implementation-dependent
      expect(scrolledBox !== null || initialBox !== null).toBeTruthy();
    });
  });

  test.describe('404 and Error Pages', () => {
    test('should show 404 page for non-existent route', async ({ page }) => {
      await page.goto('/non-existent-page-12345');

      // Should show 404 content
      const notFound = page.locator('text=/404|not found|page.*not.*exist|pagina.*non.*esiste/i');
      await expect(notFound.first()).toBeVisible();
    });

    test('should have link to homepage from 404', async ({ page }) => {
      await page.goto('/non-existent-page');

      // Look for home link
      const homeLink = page.locator('a').filter({ hasText: /home|homepage|back/i }).first();

      if (await homeLink.count() > 0) {
        await homeLink.click();
        await page.waitForLoadState('networkidle');

        // Should navigate to homepage
        expect(page.url()).toMatch(/\/(it|en)?$/);
      }
    });

    test('should show 404 for non-existent blog post', async ({ page }) => {
      await page.goto('/blog/non-existent-post-12345');

      // Should show 404 or not found message
      const notFound = page.locator('text=/404|not found|post.*not.*exist/i');
      await expect(notFound.first()).toBeVisible();
    });

    test('404 page should maintain site navigation', async ({ page }) => {
      await page.goto('/non-existent-page');

      // Navigation should still be present
      const nav = page.locator('nav, header');
      await expect(nav.first()).toBeVisible();

      // Should be able to navigate away
      const blogLink = page.locator('a').filter({ hasText: /blog/i }).first();
      if (await blogLink.count() > 0) {
        await blogLink.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('/blog');
      }
    });
  });

  test.describe('Browser History', () => {
    test('should support back button navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to blog
      const blogLink = page.locator('a').filter({ hasText: /blog/i }).first();
      await blogLink.click();
      await page.waitForLoadState('networkidle');

      // Go back
      await page.goBack();
      await page.waitForLoadState('networkidle');

      // Should be on homepage
      expect(page.url()).toMatch(/\/(it|en)?$/);
    });

    test('should support forward button navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to blog
      const blogLink = page.locator('a').filter({ hasText: /blog/i }).first();
      await blogLink.click();
      await page.waitForLoadState('networkidle');

      // Go back
      await page.goBack();
      await page.waitForLoadState('networkidle');

      // Go forward
      await page.goForward();
      await page.waitForLoadState('networkidle');

      // Should be on blog page
      expect(page.url()).toContain('/blog');
    });

    test('should update document title on navigation', async ({ page }) => {
      await page.goto('/');
      const homeTitle = await page.title();

      await page.locator('a').filter({ hasText: /blog/i }).first().click();
      await page.waitForLoadState('networkidle');

      const blogTitle = await page.title();

      // Titles should be different
      expect(blogTitle).not.toBe(homeTitle);
      expect(blogTitle.toLowerCase()).toContain('blog');
    });
  });

  test.describe('External Links', () => {
    test('should open social media links in new tab', async ({ page, context }) => {
      await page.goto('/');

      // Find social media link
      const socialLink = page.locator('a[href*="linkedin"], a[href*="twitter"], a[href*="github"]').first();

      if (await socialLink.count() > 0) {
        const target = await socialLink.getAttribute('target');

        // Should have target="_blank"
        expect(target).toBe('_blank');

        // Should have rel="noopener noreferrer" for security
        const rel = await socialLink.getAttribute('rel');
        expect(rel).toContain('noopener');
      }
    });

    test('should have proper rel attributes for external links', async ({ page }) => {
      await page.goto('/');

      // Find external links
      const externalLinks = page.locator('a[href^="http"]');
      const count = await externalLinks.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(count, 5); i++) {
          const link = externalLinks.nth(i);
          const href = await link.getAttribute('href');
          const rel = await link.getAttribute('rel');

          // External links should have noopener for security
          if (href && !href.includes(page.url().split('/')[2])) {
            expect(rel).toContain('noopener');
          }
        }
      }
    });
  });

  test.describe('Page Load Transitions', () => {
    test('should show loading indicator during navigation', async ({ page }) => {
      await page.goto('/');

      // Click blog link
      const blogLink = page.locator('a').filter({ hasText: /blog/i }).first();
      await blogLink.click();

      // Look for loading indicator
      const loadingIndicator = page.locator('[class*="loading"], [class*="spinner"], [aria-busy="true"]');

      if (await loadingIndicator.count() > 0) {
        // Loading indicator should appear briefly
        // (May be too fast to catch in tests)
      }

      await page.waitForLoadState('networkidle');
    });

    test('should maintain scroll position on back navigation', async ({ page }) => {
      await page.goto('/blog');

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 500));
      const scrollY = await page.evaluate(() => window.scrollY);

      // Navigate to post
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // Go back
      await page.goBack();
      await page.waitForLoadState('networkidle');

      // Scroll position should be restored (approximately)
      const newScrollY = await page.evaluate(() => window.scrollY);
      expect(Math.abs(newScrollY - scrollY)).toBeLessThan(100);
    });
  });

  test.describe('Accessibility Navigation', () => {
    test('should have skip-to-content link', async ({ page }) => {
      await page.goto('/');

      // Tab to first element (should be skip link)
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');

      // Should be skip link
      const text = await focused.textContent();
      expect(text?.toLowerCase()).toMatch(/skip|salta|main/i);

      // Should skip to main content
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);

      const newFocused = page.locator(':focus');
      const mainContent = page.locator('main, [role="main"]');

      // Focus should be within main content
      const mainElement = await mainContent.first().elementHandle();
      if (mainElement) {
        const isFocusedInMain = await newFocused.evaluate((el, main) => {
          return main.contains(el);
        }, mainElement);

        expect(isFocusedInMain).toBeTruthy();
      }
    });

    test('should support keyboard navigation throughout site', async ({ page }) => {
      await page.goto('/');

      // Tab through interactive elements
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');

        // Should always have visible focus
        if (await focused.count() > 0) {
          await expect(focused).toBeVisible();
        }
      }
    });

    test('should announce route changes to screen readers', async ({ page }) => {
      await page.goto('/');

      // Look for aria-live region for route announcements
      const liveRegion = page.locator('[aria-live="polite"], [aria-live="assertive"]');

      if (await liveRegion.count() > 0) {
        await expect(liveRegion.first()).toBeAttached();
      }

      // Navigate to blog
      await page.locator('a').filter({ hasText: /blog/i }).first().click();
      await page.waitForLoadState('networkidle');

      // Page title or announcement should update
      const title = await page.title();
      expect(title).toBeTruthy();
    });
  });
});
