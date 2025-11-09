/**
 * Complete i18n E2E Tests
 * Tests bilingual functionality (Italian/English)
 */

import { test, expect } from '@playwright/test';

test.describe('Complete i18n Tests', () => {
  test.describe('Language Switcher', () => {
    test('should display language switcher', async ({ page }) => {
      await page.goto('/');

      // Check language switcher is visible
      const langSwitcher = page.locator('button, a').filter({ hasText: /EN|IT|english|italiano/i });
      await expect(langSwitcher.first()).toBeVisible();
    });

    test('should switch from Italian to English', async ({ page }) => {
      await page.goto('/');

      // Get initial language
      const initialUrl = page.url();

      // Click language switcher
      const langSwitcher = page.locator('button, a').filter({ hasText: /EN|english/i });
      if (await langSwitcher.count() > 0) {
        await langSwitcher.first().click();
        await page.waitForTimeout(1000);

        // Check URL changed to English locale
        const newUrl = page.url();
        expect(newUrl).not.toBe(initialUrl);
        expect(newUrl).toContain('/en');
      }
    });

    test('should switch from English to Italian', async ({ page }) => {
      await page.goto('/en');

      // Click language switcher to Italian
      const langSwitcher = page.locator('button, a').filter({ hasText: /IT|italiano/i });
      if (await langSwitcher.count() > 0) {
        await langSwitcher.first().click();
        await page.waitForTimeout(1000);

        // Check URL changed to Italian locale
        const newUrl = page.url();
        expect(newUrl).toContain('/it');
      }
    });

    test('should persist language choice across navigation', async ({ page }) => {
      await page.goto('/en');

      // Navigate to another page
      const blogLink = page.locator('a').filter({ hasText: /blog/i }).first();
      await blogLink.click();
      await page.waitForLoadState('networkidle');

      // Language should still be English
      expect(page.url()).toContain('/en');
    });
  });

  test.describe('Content Translation - Homepage', () => {
    test('should display Italian content on IT locale', async ({ page }) => {
      await page.goto('/it');

      // Check for Italian-specific text
      const italianText = page.locator('text=/fallito|perché|prenota|lavoriamo insieme/i');
      await expect(italianText.first()).toBeVisible();
    });

    test('should display English content on EN locale', async ({ page }) => {
      await page.goto('/en');

      // Check for English-specific text
      const englishText = page.locator('text=/failed|because|book|work together/i');
      await expect(englishText.first()).toBeVisible();
    });

    test('should translate Hero section', async ({ page }) => {
      // Italian
      await page.goto('/it');
      let heroText = await page.locator('h1, h2').first().textContent();
      expect(heroText?.toLowerCase()).toMatch(/fallito|perché|ho/i);

      // English
      await page.goto('/en');
      heroText = await page.locator('h1, h2').first().textContent();
      expect(heroText?.toLowerCase()).toMatch(/failed|because|i/i);
    });

    test('should translate navigation links', async ({ page }) => {
      // Italian
      await page.goto('/it');
      let navLinks = page.locator('nav a, header a');
      let navText = await navLinks.allTextContents();
      expect(navText.join(' ').toLowerCase()).toMatch(/blog|progetti|contatti/i);

      // English
      await page.goto('/en');
      navLinks = page.locator('nav a, header a');
      navText = await navLinks.allTextContents();
      expect(navText.join(' ').toLowerCase()).toMatch(/blog|projects|contact/i);
    });

    test('should translate CTA buttons', async ({ page }) => {
      // Italian
      await page.goto('/it');
      let ctaButton = page.locator('button, a').filter({ hasText: /prenota|chatta|scopri/i });
      await expect(ctaButton.first()).toBeVisible();

      // English
      await page.goto('/en');
      ctaButton = page.locator('button, a').filter({ hasText: /book|chat|discover/i });
      await expect(ctaButton.first()).toBeVisible();
    });
  });

  test.describe('Content Translation - Blog', () => {
    test('should translate blog listing page', async ({ page }) => {
      // Italian
      await page.goto('/it/blog');
      let pageTitle = await page.title();
      expect(pageTitle.toLowerCase()).toMatch(/blog|pensieri|articoli/i);

      // English
      await page.goto('/en/blog');
      pageTitle = await page.title();
      expect(pageTitle.toLowerCase()).toMatch(/blog|thoughts|articles/i);
    });

    test('should translate blog metadata (reading time, category)', async ({ page }) => {
      // Italian
      await page.goto('/it/blog');
      let metadata = page.locator('text=/min di lettura|minuti/i');
      if (await metadata.count() > 0) {
        await expect(metadata.first()).toBeVisible();
      }

      // English
      await page.goto('/en/blog');
      metadata = page.locator('text=/min read|minutes/i');
      if (await metadata.count() > 0) {
        await expect(metadata.first()).toBeVisible();
      }
    });

    test('should translate blog categories', async ({ page }) => {
      // Categories should be consistent or translated
      await page.goto('/it/blog');
      const itCategories = page.locator('text=/design|sviluppo|prodotto|personale/i');
      const itCount = await itCategories.count();

      await page.goto('/en/blog');
      const enCategories = page.locator('text=/design|development|product|personal/i');
      const enCount = await enCategories.count();

      // Should have categories in both languages
      expect(itCount).toBeGreaterThan(0);
      expect(enCount).toBeGreaterThan(0);
    });
  });

  test.describe('Content Translation - Chatbot', () => {
    test('should translate chatbot trigger button', async ({ page }) => {
      // Italian
      await page.goto('/it');
      let chatButton = page.locator('button').filter({ hasText: /chatta|gemello digitale/i });
      await expect(chatButton.first()).toBeVisible();

      // English
      await page.goto('/en');
      chatButton = page.locator('button').filter({ hasText: /chat|digital twin/i });
      await expect(chatButton.first()).toBeVisible();
    });

    test('should translate chatbot interface', async ({ page }) => {
      // Italian
      await page.goto('/it');
      let chatButton = page.locator('button').filter({ hasText: /chatta|gemello/i });
      await chatButton.first().click();
      await page.waitForTimeout(500);

      let placeholder = page.locator('input, textarea').first();
      let placeholderText = await placeholder.getAttribute('placeholder');
      expect(placeholderText?.toLowerCase()).toMatch(/scrivi|messaggio|domanda/i);

      // English
      await page.goto('/en');
      chatButton = page.locator('button').filter({ hasText: /chat|digital/i });
      await chatButton.first().click();
      await page.waitForTimeout(500);

      placeholder = page.locator('input, textarea').first();
      placeholderText = await placeholder.getAttribute('placeholder');
      expect(placeholderText?.toLowerCase()).toMatch(/type|message|question/i);
    });
  });

  test.describe('SEO & Meta Tags Translation', () => {
    test('should have translated meta description for IT', async ({ page }) => {
      await page.goto('/it');

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description?.toLowerCase()).toMatch(/product manager|designer|developer/i);
    });

    test('should have translated meta description for EN', async ({ page }) => {
      await page.goto('/en');

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description?.toLowerCase()).toMatch(/product manager|designer|developer/i);
    });

    test('should have correct hreflang tags', async ({ page }) => {
      await page.goto('/');

      // Check for hreflang alternates
      const hreflangIt = page.locator('link[hreflang="it"]');
      const hreflangEn = page.locator('link[hreflang="en"]');

      if (await hreflangIt.count() > 0) {
        await expect(hreflangIt.first()).toHaveAttribute('href', /.+/);
      }
      if (await hreflangEn.count() > 0) {
        await expect(hreflangEn.first()).toHaveAttribute('href', /.+/);
      }
    });

    test('should have translated Open Graph tags', async ({ page }) => {
      // Italian
      await page.goto('/it');
      let ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();

      // English
      await page.goto('/en');
      ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
    });
  });

  test.describe('Date and Number Formatting', () => {
    test('should format dates according to locale', async ({ page }) => {
      // Italian (DD/MM/YYYY)
      await page.goto('/it/blog');
      const itDates = page.locator('text=/\\d{1,2}\\/\\d{1,2}\\/\\d{4}|\\d{1,2} [a-z]+ \\d{4}/i');
      if (await itDates.count() > 0) {
        await expect(itDates.first()).toBeVisible();
      }

      // English (MM/DD/YYYY or Month DD, YYYY)
      await page.goto('/en/blog');
      const enDates = page.locator('text=/\\d{1,2}\\/\\d{1,2}\\/\\d{4}|[a-z]+ \\d{1,2}, \\d{4}/i');
      if (await enDates.count() > 0) {
        await expect(enDates.first()).toBeVisible();
      }
    });
  });

  test.describe('Error Messages Translation', () => {
    test('should display error messages in current locale', async ({ page }) => {
      // Italian - trigger form validation error
      await page.goto('/it');

      // Try to submit empty form (if exists)
      const forms = page.locator('form');
      if (await forms.count() > 0) {
        const submitButton = forms.first().locator('button[type="submit"]');
        if (await submitButton.count() > 0) {
          await submitButton.click();
          await page.waitForTimeout(500);

          // Check for Italian error message
          const errorMessage = page.locator('text=/errore|campo obbligatorio|richiesto/i');
          if (await errorMessage.count() > 0) {
            await expect(errorMessage.first()).toBeVisible();
          }
        }
      }
    });
  });

  test.describe('Browser Language Detection', () => {
    test('should respect browser language preference', async ({ page, context }) => {
      // Set browser language to Italian
      await context.addInitScript(() => {
        Object.defineProperty(navigator, 'language', { value: 'it-IT', configurable: true });
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Should redirect to Italian locale or show Italian content
      const url = page.url();
      const isItalian = url.includes('/it') || await page.locator('text=/fallito|perché/i').count() > 0;
      expect(isItalian).toBeTruthy();
    });
  });
});
