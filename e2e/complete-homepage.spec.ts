/**
 * Complete Homepage E2E Tests
 * Tests all homepage sections and interactions
 */

import { test, expect } from '@playwright/test';

test.describe('Complete Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Hero Section', () => {
    test('should display hero section with headline and CTA', async ({ page }) => {
      // Check headline is visible
      const headline = page.locator('h1').first();
      await expect(headline).toBeVisible();
      await expect(headline).toContainText(/fallito|failed/i);

      // Check subtitle/description
      const description = page.locator('text=/perché|because/i').first();
      await expect(description).toBeVisible();

      // Check primary CTA
      const ctaButton = page.locator('button, a').filter({ hasText: /book|prenota/i }).first();
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toHaveClass(/brutal/i);
    });

    test('should have animated visual element', async ({ page }) => {
      // Check for illustration or animated element
      const illustration = page.locator('[class*="illustration"], [class*="animation"], svg').first();
      await expect(illustration).toBeVisible();
    });

    test('should track CTA click event', async ({ page }) => {
      const [request] = await Promise.all([
        page.waitForRequest(req => req.url().includes('/api/analytics')),
        page.locator('button, a').filter({ hasText: /book|prenota/i }).first().click(),
      ]);
      expect(request).toBeTruthy();
    });
  });

  test.describe('My Journey Section', () => {
    test('should display timeline with all career phases', async ({ page }) => {
      // Scroll to journey section
      await page.locator('text=/journey|percorso/i').first().scrollIntoViewIfNeeded();

      // Check timeline years
      await expect(page.locator('text=/2012-2018/i')).toBeVisible();
      await expect(page.locator('text=/2016-2020/i')).toBeVisible();
      await expect(page.locator('text=/2021/i')).toBeVisible();

      // Check key learnings
      await expect(page.locator('text=/design.*strategia|design.*strategy/i')).toBeVisible();
      await expect(page.locator('text=/codice.*inutile|code.*useless/i')).toBeVisible();
    });

    test('should display skills radar chart', async ({ page }) => {
      await page.locator('text=/skills|competenze/i').first().scrollIntoViewIfNeeded();

      // Check chart exists
      const chart = page.locator('[class*="recharts"], canvas, svg').filter({ has: page.locator('text=/product|design|development/i') });
      await expect(chart.first()).toBeVisible();
    });

    test('should display certification badges', async ({ page }) => {
      await page.locator('text=/certificazioni|certifications/i').first().scrollIntoViewIfNeeded();

      // Check for at least 6 certifications
      const badges = page.locator('[class*="certification"], [class*="badge"]');
      await expect(badges).toHaveCount(6, { timeout: 10000 });

      // Verify blockchain verification mention
      await expect(page.locator('text=/blockchain|verificabili/i')).toBeVisible();
    });

    test('should open certification modal on click', async ({ page }) => {
      await page.locator('text=/certificazioni|certifications/i').first().scrollIntoViewIfNeeded();

      const firstBadge = page.locator('[class*="certification"], [class*="badge"]').first();
      await firstBadge.click();

      // Check modal opens
      const modal = page.locator('[role="dialog"], [class*="modal"]');
      await expect(modal).toBeVisible();

      // Check modal has close button
      const closeButton = modal.locator('button').filter({ hasText: /close|chiudi|×/i });
      await expect(closeButton).toBeVisible();
    });
  });

  test.describe('Latest Thinking (Blog) Section', () => {
    test('should display blog preview cards', async ({ page }) => {
      await page.locator('text=/latest thinking|ultimi pensieri|blog/i').first().scrollIntoViewIfNeeded();

      // Check for blog cards
      const blogCards = page.locator('article, [class*="blog-card"], [class*="card"]').filter({ has: page.locator('text=/read|leggi|min/i') });
      await expect(blogCards.first()).toBeVisible();
    });

    test('should show reading time and category', async ({ page }) => {
      await page.locator('text=/latest thinking|blog/i').first().scrollIntoViewIfNeeded();

      // Check reading time
      await expect(page.locator('text=/\\d+ min/i').first()).toBeVisible();

      // Check category tags
      await expect(page.locator('text=/design|dev|product|personal|ama/i').first()).toBeVisible();
    });

    test('should navigate to blog post on click', async ({ page }) => {
      await page.locator('text=/latest thinking|blog/i').first().scrollIntoViewIfNeeded();

      const firstCard = page.locator('article, [class*="blog-card"]').first();
      await firstCard.click();

      // Should navigate to blog post page
      await expect(page).toHaveURL(/\/blog\/.+/);
    });
  });

  test.describe('Work Together Section', () => {
    test('should display three collaboration modes', async ({ page }) => {
      await page.locator('text=/work together|lavoriamo insieme/i').first().scrollIntoViewIfNeeded();

      // Check for three service types
      await expect(page.locator('text=/consulenze|consulting/i')).toBeVisible();
      await expect(page.locator('text=/brainstorming/i')).toBeVisible();
      await expect(page.locator('text=/mentorship/i')).toBeVisible();
    });

    test('should display testimonials', async ({ page }) => {
      await page.locator('text=/work together|lavoriamo insieme/i').first().scrollIntoViewIfNeeded();

      // Check testimonial components
      const testimonials = page.locator('[class*="testimonial"]');
      await expect(testimonials.first()).toBeVisible();

      // Check quote marks
      await expect(page.locator('text=/"|"/i').first()).toBeVisible();
    });

    test('should have verified badge on testimonials', async ({ page }) => {
      await page.locator('text=/work together/i').first().scrollIntoViewIfNeeded();

      const verifiedBadge = page.locator('[class*="verified"], text=/verified|verificat/i');
      await expect(verifiedBadge.first()).toBeVisible();
    });
  });

  test.describe('What I\'m Up To Section', () => {
    test('should display current work info', async ({ page }) => {
      await page.locator('text=/what.*up to|cosa.*facendo/i').first().scrollIntoViewIfNeeded();

      // Check current role
      await expect(page.locator('text=/product manager|qubicaamf/i')).toBeVisible();
    });

    test('should display Spotify widget', async ({ page }) => {
      await page.locator('text=/spotify|soundtrack/i').first().scrollIntoViewIfNeeded();

      // Check Spotify widget container
      const spotifyWidget = page.locator('[class*="spotify"]');
      await expect(spotifyWidget.first()).toBeVisible();

      // Widget should either show:
      // 1. Current track (if playing)
      // 2. Recent track (if not playing)
      // 3. Loading state
      // 4. Error state (if API fails)
      const hasContent = await page.locator('text=/listening|ascoltando|track|brano|loading|error/i').count();
      expect(hasContent).toBeGreaterThan(0);
    });
  });

  test.describe('Ask Me Anything Section', () => {
    test('should display chatbot trigger button', async ({ page }) => {
      // Check for floating chat button (could be anywhere on page)
      const chatTrigger = page.locator('button').filter({ hasText: /chat|chatta|ask|chiedi/i });
      await expect(chatTrigger.first()).toBeVisible();
    });

    test('should display anonymous question form', async ({ page }) => {
      await page.locator('text=/ask me anything|chiedi/i').first().scrollIntoViewIfNeeded();

      // Check form exists
      const questionForm = page.locator('form, textarea').filter({ hasText: /question|domanda/i });
      await expect(questionForm.first()).toBeVisible();
    });

    test('should mention 48h response time', async ({ page }) => {
      await page.locator('text=/ask me anything/i').first().scrollIntoViewIfNeeded();

      await expect(page.locator('text=/48h|48 h/i')).toBeVisible();
    });
  });

  test.describe('Accessibility & Performance', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1); // Only one H1 on page

      // Check other headings exist
      const h2Count = await page.locator('h2').count();
      expect(h2Count).toBeGreaterThan(0);
    });

    test('should have alt text on images', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });

    test('should have skip to main content link', async ({ page }) => {
      // Focus on first element (usually skip link)
      await page.keyboard.press('Tab');

      const skipLink = page.locator('a').filter({ hasText: /skip|salta/i });
      await expect(skipLink.first()).toBeFocused();
    });

    test('should load page in under 3 seconds', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test('should have Core Web Vitals in acceptable ranges', async ({ page }) => {
      const performanceMetrics = await page.evaluate(() => {
        return {
          fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
          lcp: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
        };
      });

      if (performanceMetrics.fcp) {
        expect(performanceMetrics.fcp).toBeLessThan(2500); // FCP < 2.5s
      }
      if (performanceMetrics.lcp) {
        expect(performanceMetrics.lcp).toBeLessThan(4000); // LCP < 4s (acceptable)
      }
    });
  });

  test.describe('Dark Mode', () => {
    test('should toggle dark mode', async ({ page }) => {
      // Find dark mode toggle
      const darkModeToggle = page.locator('button').filter({ hasText: /dark|light|theme/i });
      await expect(darkModeToggle.first()).toBeVisible();

      // Get initial theme
      const initialClass = await page.locator('html, body, [class*="theme"]').first().getAttribute('class');

      // Click toggle
      await darkModeToggle.first().click();
      await page.waitForTimeout(500); // Wait for theme transition

      // Check theme changed
      const newClass = await page.locator('html, body, [class*="theme"]').first().getAttribute('class');
      expect(newClass).not.toBe(initialClass);
    });

    test('should persist dark mode preference', async ({ page }) => {
      // Toggle dark mode
      const darkModeToggle = page.locator('button').filter({ hasText: /dark|light|theme/i });
      await darkModeToggle.first().click();
      await page.waitForTimeout(500);

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check theme persisted
      const themeClass = await page.locator('html, body, [class*="theme"]').first().getAttribute('class');
      expect(themeClass).toContain('dark');
    });
  });
});
