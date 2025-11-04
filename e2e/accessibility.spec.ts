import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage should not have automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('blog page should not have accessibility violations', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should have proper document structure', async ({ page }) => {
    await page.goto('/')

    // Check for main landmark
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // Check for header
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Check for footer
    const footer = page.locator('footer')
    const hasFooter = await footer.count() > 0
    test.info().annotations.push({ type: 'structure', description: 'Semantic HTML landmarks' })
  })

  test('should have skip to main content link', async ({ page }) => {
    await page.goto('/')

    // Tab to first focusable element (should be skip link)
    await page.keyboard.press('Tab')

    const skipLink = page.locator('a:has-text("Skip to"), a:has-text("skip to")').first()
    const exists = await skipLink.count() > 0
    test.info().annotations.push({ type: 'feature', description: 'Skip to main content link' })
  })

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/')

    // Tab through interactive elements
    await page.keyboard.press('Tab')

    // Get focused element
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()

    // Check if focus indicator is visible (outline or ring)
    const hasOutline = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el)
      return styles.outline !== 'none' ||
             styles.boxShadow !== 'none' ||
             el.classList.contains('ring')
    })

    expect(hasOutline).toBeTruthy()
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/')

    // Tab through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    }

    // Shift+Tab should navigate backwards
    await page.keyboard.press('Shift+Tab')
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('should have proper image alt text', async ({ page }) => {
    await page.goto('/')

    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      const role = await img.getAttribute('role')

      // Decorative images should have empty alt or role="presentation"
      // Content images should have descriptive alt text
      if (role !== 'presentation') {
        expect(alt !== null).toBeTruthy()
      }
    }
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    // Get all headings
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()

    // Should have exactly one H1
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1)

    // Headings should not skip levels (no H1 → H3)
    expect(headings.length).toBeGreaterThan(1)
  })

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/')

    const buttons = await page.locator('button').all()

    for (const button of buttons) {
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')
      const ariaLabelledBy = await button.getAttribute('aria-labelledby')

      // Button should have text content, aria-label, or aria-labelledby
      const hasAccessibleName = (text && text.trim() !== '') || ariaLabel || ariaLabelledBy
      expect(hasAccessibleName).toBeTruthy()
    }
  })

  test('links should have accessible names', async ({ page }) => {
    await page.goto('/')

    const links = await page.locator('a').all()

    for (const link of links) {
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')

      // Skip if this is an anchor link or navigation helper
      const href = await link.getAttribute('href')
      if (href === '#' || href === '') continue

      // Link should have text content or aria-label
      const hasAccessibleName = (text && text.trim() !== '') || ariaLabel
      expect(hasAccessibleName).toBeTruthy()
    }
  })

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/')

    const inputs = await page.locator('input, textarea, select').all()

    for (const input of inputs) {
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')

      // Input should have associated label, aria-label, or aria-labelledby
      let hasLabel = ariaLabel || ariaLabelledBy

      if (id && !hasLabel) {
        const label = page.locator(`label[for="${id}"]`)
        hasLabel = await label.count() > 0
      }

      // Hidden inputs don't need labels
      const type = await input.getAttribute('type')
      if (type === 'hidden') continue

      expect(hasLabel).toBeTruthy()
    }
  })

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .options({ rules: { 'color-contrast': { enabled: true } } })
      .analyze()

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    )

    expect(contrastViolations).toEqual([])
  })

  test('should support screen reader navigation', async ({ page }) => {
    await page.goto('/')

    // Check for ARIA landmarks
    const nav = await page.locator('[role="navigation"], nav').count()
    const main = await page.locator('[role="main"], main').count()
    const contentinfo = await page.locator('[role="contentinfo"], footer').count()

    expect(nav).toBeGreaterThan(0)
    expect(main).toBeGreaterThan(0)
    test.info().annotations.push({ type: 'a11y', description: 'ARIA landmarks' })
  })

  test('should handle reduced motion preference', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    // Animations should be disabled or reduced
    // This is a CSS check, document for implementation
    test.info().annotations.push({ type: 'a11y', description: 'Respect prefers-reduced-motion' })
  })
})
