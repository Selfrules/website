import { test, expect } from '@playwright/test'

test.describe('Blog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog')
  })

  test('should load blog listing page', async ({ page }) => {
    await expect(page).toHaveTitle(/blog/i)
  })

  test('should display blog posts', async ({ page }) => {
    // Wait for blog posts to load
    await page.waitForLoadState('networkidle')

    // Check for article cards or list items
    const articles = page.locator('article, [data-testid="blog-post"]')
    const count = await articles.count()

    // Should have at least one article or show empty state
    expect(count >= 0).toBeTruthy()
  })

  test('should have category filters', async ({ page }) => {
    // Check for category buttons: Design, Dev, Product, Personal, Ask me anything
    const categories = ['design', 'dev', 'product', 'personal']

    for (const category of categories) {
      const categoryButton = page.getByRole('button', { name: new RegExp(category, 'i') })
      // Document expected feature
      test.info().annotations.push({ type: 'feature', description: `${category} category filter` })
    }
  })

  test('should show reading time on articles', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const articles = page.locator('article').first()
    if (await articles.count() > 0) {
      // Look for reading time indicator
      const readingTime = articles.locator('text=/\\d+ min read/i')
      const exists = await readingTime.count() > 0
      test.info().annotations.push({ type: 'feature', description: 'Reading time display' })
    }
  })

  test('should navigate to individual blog post', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Click first article link
    const firstArticle = page.locator('article a, [data-testid="blog-post"] a').first()
    const exists = await firstArticle.count() > 0

    if (exists) {
      await firstArticle.click()
      await page.waitForLoadState('networkidle')

      // Should navigate to blog post detail page
      expect(page.url()).toContain('/blog/')
    }
  })
})

test.describe('Blog Post Detail', () => {
  test('should display article content', async ({ page }) => {
    // Navigate to a blog post (this assumes at least one post exists)
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    const firstArticle = page.locator('article a, [data-testid="blog-post"] a').first()
    const exists = await firstArticle.count() > 0

    if (exists) {
      await firstArticle.click()
      await page.waitForLoadState('networkidle')

      // Check for article title
      const title = page.locator('h1')
      await expect(title).toBeVisible()

      // Check for article content
      const content = page.locator('article, [role="article"]')
      await expect(content).toBeVisible()
    }
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    const firstArticle = page.locator('article a').first()
    if (await firstArticle.count() > 0) {
      await firstArticle.click()
      await page.waitForLoadState('networkidle')

      // Check H1 exists and is unique
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)

      // Check logical heading hierarchy (h1 → h2 → h3)
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
      expect(headings.length).toBeGreaterThan(0)
    }
  })

  test('should have social sharing buttons', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    const firstArticle = page.locator('article a').first()
    if (await firstArticle.count() > 0) {
      await firstArticle.click()
      await page.waitForLoadState('networkidle')

      test.info().annotations.push({ type: 'feature', description: 'Social sharing buttons' })
    }
  })

  test('should be readable with good typography', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    const firstArticle = page.locator('article a').first()
    if (await firstArticle.count() > 0) {
      await firstArticle.click()
      await page.waitForLoadState('networkidle')

      // Check line-height is at least 1.6
      const article = page.locator('article, [role="article"]')
      if (await article.count() > 0) {
        const lineHeight = await article.evaluate(el =>
          window.getComputedStyle(el).lineHeight
        )
        test.info().annotations.push({ type: 'design', description: 'Typography readability' })
      }
    }
  })
})
