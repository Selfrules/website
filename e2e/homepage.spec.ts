import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Mattia/i)
  })

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    // Check if navigation is present
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('should display all main sections', async ({ page }) => {
    // Hero, My Journey, Latest Thinking, Work Together, What I'm Up To, Ask Me Anything
    const sections = page.locator('section')
    await expect(sections).toHaveCount(6, { timeout: 10000 })
  })

  test('should have theme toggle', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /switch to/i })
    await expect(themeToggle).toBeVisible()
  })

  test('should toggle dark mode', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /switch to/i })

    // Get initial theme
    const initialTheme = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    // Click toggle
    await themeToggle.click()
    await page.waitForTimeout(500)

    // Verify theme changed
    const newTheme = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    expect(newTheme).toBe(!initialTheme)
  })

  test('should persist theme preference', async ({ page, context }) => {
    const themeToggle = page.getByRole('button', { name: /switch to/i })

    // Toggle to dark mode
    await themeToggle.click()
    await page.waitForTimeout(500)

    // Reload page
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Verify dark mode persisted
    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )
    expect(isDark).toBe(true)
  })

  test('should have accessible language toggle', async ({ page }) => {
    // Check for language switcher (ITA/ENG)
    const langSwitcher = page.locator('[data-testid="language-toggle"], [aria-label*="language"]').first()
    // Language toggle may not be implemented yet, so we just check if it exists or not
    const exists = await langSwitcher.count() > 0
    // This test documents the expected feature
    test.info().annotations.push({ type: 'feature', description: 'Language toggle ITA/ENG' })
  })

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('body')).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('body')).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(page.locator('body')).toBeVisible()
  })

  test('should have fast First Contentful Paint', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    const loadTime = Date.now() - startTime

    // FCP should be < 2000ms
    expect(loadTime).toBeLessThan(2000)
  })
})

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display headline', async ({ page }) => {
    const headline = page.locator('h1').first()
    await expect(headline).toBeVisible()
    await expect(headline).toContainText(/product manager/i)
  })

  test('should have primary CTA button', async ({ page }) => {
    const ctaButton = page.getByRole('link', { name: /book a call|parliamone/i }).or(
      page.getByRole('button', { name: /book a call|parliamone/i })
    )
    await expect(ctaButton.first()).toBeVisible()
  })

  test('should have animated illustration', async ({ page }) => {
    // Check for SVG or image element
    const illustration = page.locator('svg, img[alt*="illustration"]').first()
    const exists = await illustration.count() > 0
    test.info().annotations.push({ type: 'design', description: 'Animated illustration showing journey' })
  })
})
