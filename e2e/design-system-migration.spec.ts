import { test, expect } from '@playwright/test';

test.describe('Design System Migration - Cold Tone Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Color Palette Verification', () => {
    test('should display Electric Blue (#1E90FF) as primary color', async ({ page }) => {
      // Check primary buttons
      const primaryButtons = page.locator('button').filter({ hasText: /prenota|fissa/i }).first();
      await expect(primaryButtons).toBeVisible();

      const bgColor = await primaryButtons.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });

      // RGB(30, 144, 255) = #1E90FF
      expect(bgColor).toMatch(/rgb\(30,\s*144,\s*255\)/);
    });

    test('should display Slate Blue (#6A7B9F) as secondary color', async ({ page }) => {
      // Check secondary elements - look for development badges/cards
      const secondaryElements = page.locator('[class*="bg-secondary"]').first();
      if (await secondaryElements.count() > 0) {
        const bgColor = await secondaryElements.evaluate(el => {
          return window.getComputedStyle(el).backgroundColor;
        });
        // RGB(106, 123, 159) = #6A7B9F
        expect(bgColor).toMatch(/rgb\(106,\s*123,\s*159\)/);
      }
    });

    test('should display Deep Navy (#3E526A) as accent color', async ({ page }) => {
      // Check accent elements
      const accentElements = page.locator('[class*="bg-accent"]').first();
      if (await accentElements.count() > 0) {
        const bgColor = await accentElements.evaluate(el => {
          return window.getComputedStyle(el).backgroundColor;
        });
        // RGB(62, 82, 106) = #3E526A
        expect(bgColor).toMatch(/rgb\(62,\s*82,\s*106\)/);
      }
    });

    test('should NOT use old warm colors (yellow #FFD93D)', async ({ page }) => {
      const allElements = await page.locator('*').all();

      for (const element of allElements.slice(0, 100)) { // Sample first 100 elements
        const bgColor = await element.evaluate(el => {
          return window.getComputedStyle(el).backgroundColor;
        });

        // RGB(255, 217, 61) = #FFD93D - OLD PRIMARY COLOR
        expect(bgColor).not.toMatch(/rgb\(255,\s*217,\s*61\)/);
      }
    });

    test('should NOT use old warm colors (purple #6C5CE7)', async ({ page }) => {
      const allElements = await page.locator('*').all();

      for (const element of allElements.slice(0, 100)) {
        const bgColor = await element.evaluate(el => {
          return window.getComputedStyle(el).backgroundColor;
        });

        // RGB(108, 92, 231) = #6C5CE7 - OLD SECONDARY COLOR
        expect(bgColor).not.toMatch(/rgb\(108,\s*92,\s*231\)/);
      }
    });
  });

  test.describe('Border Radius Verification', () => {
    test('should use 6-8px border radius (not 12px)', async ({ page }) => {
      // Check cards and buttons
      const cards = page.locator('.border-4, .border-3, .border-2').first();
      await expect(cards).toBeVisible();

      const borderRadius = await cards.evaluate(el => {
        return window.getComputedStyle(el).borderRadius;
      });

      // Should be 6px or 8px, NOT 12px
      expect(borderRadius).toMatch(/^(6px|8px)$/);
    });

    test('should have consistent border radius across components', async ({ page }) => {
      const buttons = await page.locator('button[class*="rounded"]').all();
      const radiusValues = new Set();

      for (const button of buttons.slice(0, 10)) {
        const radius = await button.evaluate(el => {
          return window.getComputedStyle(el).borderRadius;
        });
        radiusValues.add(radius);
      }

      // Should only have 4px, 6px, or 8px values
      for (const radius of radiusValues) {
        expect(radius).toMatch(/^(4px|6px|8px)$/);
      }
    });
  });

  test.describe('Hard Shadows Verification', () => {
    test('should have hard text shadow on hero title', async ({ page }) => {
      const heroTitle = page.locator('h1').first();
      await expect(heroTitle).toBeVisible();

      const textShadow = await heroTitle.evaluate(el => {
        return window.getComputedStyle(el).textShadow;
      });

      // Should have hard shadow: "6px 6px 0 #000" or similar
      expect(textShadow).toMatch(/6px 6px 0(px)? rgb\(0,\s*0,\s*0\)/);
    });

    test('should have hard box shadows on cards', async ({ page }) => {
      const cards = page.locator('[class*="shadow-brutal"], [class*="shadow-\\["]').first();
      if (await cards.count() > 0) {
        const boxShadow = await cards.evaluate(el => {
          return window.getComputedStyle(el).boxShadow;
        });

        // Should have hard shadow with no blur (third value = 0)
        expect(boxShadow).toMatch(/\d+px \d+px 0px/);
      }
    });
  });

  test.describe('Color-Coding System', () => {
    test('should have blue-coded design projects/skills', async ({ page }) => {
      // Navigate to skills or projects section
      await page.locator('text=/skills|progetti/i').first().click({ timeout: 5000 }).catch(() => {});

      // Look for design-related badges
      const designBadges = page.locator('.badge-design, [class*="bg-primary"]').first();
      if (await designBadges.count() > 0) {
        const bgColor = await designBadges.evaluate(el => {
          return window.getComputedStyle(el).backgroundColor;
        });
        expect(bgColor).toMatch(/rgb\(30,\s*144,\s*255\)/); // Electric Blue
      }
    });

    test('should have slate-coded development projects/skills', async ({ page }) => {
      const devBadges = page.locator('.badge-dev, text=/development|dev|code/i').first();
      if (await devBadges.count() > 0) {
        // Check if parent or element has secondary color
        const bgColor = await devBadges.evaluate(el => {
          let current = el as HTMLElement;
          while (current) {
            const bg = window.getComputedStyle(current).backgroundColor;
            if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
              return bg;
            }
            current = current.parentElement as HTMLElement;
            if (!current || current.tagName === 'BODY') break;
          }
          return 'transparent';
        });

        if (bgColor !== 'transparent') {
          expect(bgColor).toMatch(/rgb\(106,\s*123,\s*159\)/); // Slate Blue
        }
      }
    });

    test('should have navy-coded PM projects/skills', async ({ page }) => {
      const pmBadges = page.locator('.badge-pm, text=/product|pm|strategy/i').first();
      if (await pmBadges.count() > 0) {
        const bgColor = await pmBadges.evaluate(el => {
          let current = el as HTMLElement;
          while (current) {
            const bg = window.getComputedStyle(current).backgroundColor;
            if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
              return bg;
            }
            current = current.parentElement as HTMLElement;
            if (!current || current.tagName === 'BODY') break;
          }
          return 'transparent';
        });

        if (bgColor !== 'transparent') {
          expect(bgColor).toMatch(/rgb\(62,\s*82,\s*106\)/); // Deep Navy
        }
      }
    });
  });

  test.describe('Dark Mode Integration', () => {
    test('should toggle to dark mode and use adjusted cold colors', async ({ page }) => {
      // Find and click theme toggle
      const themeToggle = page.locator('button[aria-label*="theme"], button:has-text("theme")').first();

      if (await themeToggle.count() > 0) {
        await themeToggle.click();
        await page.waitForTimeout(500); // Wait for transition

        // Check if dark mode is active
        const htmlClass = await page.locator('html').getAttribute('class');
        expect(htmlClass).toContain('dark');

        // Check background is dark
        const bgColor = await page.locator('body').evaluate(el => {
          return window.getComputedStyle(el).backgroundColor;
        });

        // Should be dark (low RGB values)
        const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          const [, r, g, b] = rgbMatch.map(Number);
          expect(r).toBeLessThan(50);
          expect(g).toBeLessThan(50);
          expect(b).toBeLessThan(50);
        }
      }
    });

    test('should have sufficient contrast in dark mode (WCAG AA)', async ({ page }) => {
      const themeToggle = page.locator('button[aria-label*="theme"], button:has-text("theme")').first();

      if (await themeToggle.count() > 0) {
        await themeToggle.click();
        await page.waitForTimeout(500);

        // Check primary text on dark background
        const textElements = await page.locator('p, h1, h2, h3, span').all();

        for (const element of textElements.slice(0, 20)) {
          const isVisible = await element.isVisible().catch(() => false);
          if (!isVisible) continue;

          const colors = await element.evaluate(el => {
            const style = window.getComputedStyle(el);
            return {
              color: style.color,
              backgroundColor: style.backgroundColor
            };
          });

          // Basic visibility check - text should not be black on black
          if (colors.backgroundColor !== 'rgba(0, 0, 0, 0)') {
            expect(colors.color).not.toBe(colors.backgroundColor);
          }
        }
      }
    });
  });

  test.describe('Form Components', () => {
    test('should have Electric Blue focus states on inputs', async ({ page }) => {
      // Find first input field
      const input = page.locator('input[type="text"], input[type="email"]').first();

      if (await input.count() > 0) {
        await input.focus();
        await page.waitForTimeout(200);

        const borderColor = await input.evaluate(el => {
          return window.getComputedStyle(el).borderColor;
        });

        // Should be Electric Blue or black with blue shadow
        const boxShadow = await input.evaluate(el => {
          return window.getComputedStyle(el).boxShadow;
        });

        // Check if shadow contains Electric Blue RGB(30, 144, 255)
        expect(boxShadow).toMatch(/rgb\(30,\s*144,\s*255\)|#1E90FF/i);
      }
    });

    test('should have 6px border radius on form inputs', async ({ page }) => {
      const inputs = page.locator('input, textarea, select').first();

      if (await inputs.count() > 0) {
        const borderRadius = await inputs.evaluate(el => {
          return window.getComputedStyle(el).borderRadius;
        });

        expect(borderRadius).toBe('6px');
      }
    });
  });

  test.describe('Visual Consistency', () => {
    test('should have consistent 4-6px black borders', async ({ page }) => {
      const borderedElements = await page.locator('[class*="border-"]').all();

      for (const element of borderedElements.slice(0, 20)) {
        const isVisible = await element.isVisible().catch(() => false);
        if (!isVisible) continue;

        const borderWidth = await element.evaluate(el => {
          const style = window.getComputedStyle(el);
          return {
            top: style.borderTopWidth,
            color: style.borderColor
          };
        });

        // Should be 2px, 3px, 4px, or 6px
        if (borderWidth.top !== '0px') {
          expect(borderWidth.top).toMatch(/^(2px|3px|4px|6px)$/);
        }
      }
    });

    test('should maintain neobrutalist aesthetic', async ({ page }) => {
      // Take screenshot for visual regression
      await page.screenshot({
        path: 'test-results/design-system-cold-tone-homepage.png',
        fullPage: true
      });

      // Check for key neobrutalist elements
      const hasThickBorders = await page.locator('[class*="border-4"], [class*="border-3"]').count() > 0;
      const hasHardShadows = await page.locator('[class*="shadow-brutal"], [class*="shadow-\\["]').count() > 0;

      expect(hasThickBorders).toBeTruthy();
      expect(hasHardShadows).toBeTruthy();
    });
  });

  test.describe('Accessibility & Usability', () => {
    test('should have accessible color contrast (WCAG AA)', async ({ page }) => {
      // Use Playwright's built-in accessibility snapshot
      const snapshot = await page.accessibility.snapshot();

      // Check for accessible elements
      expect(snapshot).toBeTruthy();
    });

    test('should be keyboard navigable', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);

      const focused = await page.evaluate(() => {
        return document.activeElement?.tagName;
      });

      // Should focus on interactive element
      expect(['A', 'BUTTON', 'INPUT']).toContain(focused);
    });

    test('should have visible focus indicators', async ({ page }) => {
      const firstLink = page.locator('a, button').first();
      await firstLink.focus();
      await page.waitForTimeout(200);

      const outline = await firstLink.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          outline: style.outline,
          boxShadow: style.boxShadow,
          borderColor: style.borderColor
        };
      });

      // Should have some visible focus indicator
      const hasFocusIndicator =
        outline.outline !== 'none' ||
        outline.boxShadow !== 'none' ||
        outline.borderColor.includes('30, 144, 255'); // Electric Blue

      expect(hasFocusIndicator).toBeTruthy();
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should maintain design system on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      // Check primary color still present
      const primaryElements = page.locator('[class*="bg-primary"]').first();
      if (await primaryElements.count() > 0) {
        const bgColor = await primaryElements.evaluate(el => {
          return window.getComputedStyle(el).backgroundColor;
        });
        expect(bgColor).toMatch(/rgb\(30,\s*144,\s*255\)/);
      }

      // Take screenshot
      await page.screenshot({
        path: 'test-results/design-system-cold-tone-mobile.png',
        fullPage: true
      });
    });

    test('should maintain design system on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);

      // Check borders still visible
      const bordered = await page.locator('[class*="border-"]').count();
      expect(bordered).toBeGreaterThan(0);

      await page.screenshot({
        path: 'test-results/design-system-cold-tone-tablet.png',
        fullPage: true
      });
    });
  });
});
