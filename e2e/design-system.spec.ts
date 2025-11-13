import { test, expect } from '@playwright/test';

test.describe('Design System Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/design-system');
  });

  test('should display page title and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Design System' })).toBeVisible();
    await expect(
      page.getByText(/Sistema di design neobrutalist con palette cold-tone/)
    ).toBeVisible();
  });

  test('can navigate categories and see content', async ({ page }) => {
    // Test Colors tab
    await page.click('text=Colors');
    await expect(page.getByText('Color Palette')).toBeVisible();
    await expect(page.getByText('#0D7EFF')).toBeVisible();

    // Test Typography tab
    await page.click('text=Typography');
    await expect(page.getByText('Typography Scale')).toBeVisible();
    await expect(page.getByText('text-hero')).toBeVisible();

    // Test Buttons tab
    await page.click('text=Buttons');
    await expect(page.getByText('Primary Button')).toBeVisible();

    // Test Cards tab
    await page.click('text=Cards');
    await expect(page.getByText('Basic Card')).toBeVisible();

    // Test Forms tab
    await page.click('text=Forms');
    await expect(page.getByText('Input Field')).toBeVisible();

    // Test Badges tab
    await page.click('text=Badges');
    await expect(page.getByText('Badge Variants')).toBeVisible();

    // Test Spacing tab
    await page.click('text=Spacing');
    await expect(page.getByText('8pt Grid System')).toBeVisible();
  });

  test('can copy code snippets', async ({ page }) => {
    // Navigate to a tab with code
    await page.click('text=Colors');

    // Find and click copy button
    const copyButton = page.locator('[data-copy-code]').first();
    await expect(copyButton).toBeVisible();
    await copyButton.click();

    // Verify button text changes to "Copiato!"
    await expect(copyButton).toHaveText('✓ Copiato!');

    // Wait for the button to reset
    await expect(copyButton).toHaveText('Copia', { timeout: 3000 });
  });

  test('is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that page is still accessible
    await expect(page.getByRole('heading', { name: 'Design System' })).toBeVisible();

    // Check that tabs wrap correctly
    const tabList = page.locator('[role="tablist"]');
    await expect(tabList).toBeVisible();

    // Navigate to a category
    await page.click('text=Colors');
    await expect(page.getByText('Color Palette')).toBeVisible();
  });

  test('all component examples are visible', async ({ page }) => {
    // Colors
    await page.click('text=Colors');
    await expect(page.getByText('Electric Blue')).toBeVisible();
    await expect(page.getByText('Teal')).toBeVisible();
    await expect(page.getByText('Deep Purple')).toBeVisible();
    await expect(page.getByText('Cyber Yellow')).toBeVisible();
    await expect(page.getByText('Neon Pink')).toBeVisible();

    // Badges
    await page.click('text=Badges');
    await expect(page.getByText('Design/UX')).toBeVisible();
    await expect(page.getByText('Development')).toBeVisible();
    await expect(page.getByText('Product/Strategy')).toBeVisible();
    await expect(page.getByText('Analytics/Tools')).toBeVisible();
    await expect(page.getByText('⭐ FEATURED')).toBeVisible();
  });
});
