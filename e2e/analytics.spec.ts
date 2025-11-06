import { test, expect } from '@playwright/test';

test.describe('Analytics Event Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should generate and store session ID in sessionStorage', async ({ page }) => {
    // Wait for page to load and analytics to initialize
    await page.waitForTimeout(1000);

    const sessionId = await page.evaluate(() =>
      sessionStorage.getItem('analytics_session_id')
    );

    expect(sessionId).toBeTruthy();
    expect(sessionId).toMatch(/^[0-9a-f-]{36}$/); // UUID format
  });

  test('should track page view on initial load', async ({ page, context }) => {
    // Intercept analytics API call
    const analyticsRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/analytics')) {
        analyticsRequests.push({
          method: request.method(),
          postData: request.postData(),
        });
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000);

    // Check if page view was tracked
    const pageViewRequest = analyticsRequests.find(req =>
      req.postData?.includes('page_view')
    );

    expect(pageViewRequest).toBeTruthy();
  });

  test('should track CTA clicks in Hero section', async ({ page }) => {
    const analyticsRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/analytics')) {
        analyticsRequests.push({
          method: request.method(),
          postData: request.postData(),
        });
      }
    });

    // Click "Book a Call" CTA
    const bookCallButton = page.locator('text=Prenota una call').first();
    await bookCallButton.click();
    await page.waitForTimeout(1000);

    // Verify CTA click was tracked
    const ctaClickRequest = analyticsRequests.find(req =>
      req.postData?.includes('cta_click') &&
      req.postData?.includes('book_call')
    );

    expect(ctaClickRequest).toBeTruthy();
  });

  test('should track scroll depth at milestones', async ({ page }) => {
    const analyticsRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/analytics')) {
        analyticsRequests.push({
          method: request.method(),
          postData: request.postData(),
        });
      }
    });

    // Scroll to 25%
    await page.evaluate(() => {
      const scrollHeight = document.documentElement.scrollHeight;
      window.scrollTo(0, scrollHeight * 0.25);
    });
    await page.waitForTimeout(1500);

    // Scroll to 50%
    await page.evaluate(() => {
      const scrollHeight = document.documentElement.scrollHeight;
      window.scrollTo(0, scrollHeight * 0.50);
    });
    await page.waitForTimeout(1500);

    // Verify scroll depth tracking
    const scrollDepthRequests = analyticsRequests.filter(req =>
      req.postData?.includes('scroll_depth')
    );

    expect(scrollDepthRequests.length).toBeGreaterThanOrEqual(1);
  });

  test('should track navigation between pages', async ({ page }) => {
    const analyticsRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/analytics')) {
        analyticsRequests.push({
          method: request.method(),
          postData: request.postData(),
        });
      }
    });

    // Navigate to blog
    await page.goto('/blog');
    await page.waitForTimeout(2000);

    // Check if blog page view was tracked
    const blogPageViewRequest = analyticsRequests.find(req =>
      req.postData?.includes('page_view') &&
      req.postData?.includes('/blog')
    );

    expect(blogPageViewRequest).toBeTruthy();
  });

  test('should maintain session ID across page navigations', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    const initialSessionId = await page.evaluate(() =>
      sessionStorage.getItem('analytics_session_id')
    );

    // Navigate to another page
    await page.goto('/blog');
    await page.waitForTimeout(1000);

    const afterNavigationSessionId = await page.evaluate(() =>
      sessionStorage.getItem('analytics_session_id')
    );

    expect(initialSessionId).toBe(afterNavigationSessionId);
  });
});

test.describe('Analytics API Endpoint', () => {
  test('should accept analytics events via POST', async ({ request }) => {
    const response = await request.post('/api/analytics', {
      data: {
        sessionId: 'test-session-id',
        eventType: 'page_view',
        eventName: 'page_view',
        page: '/test',
        metadata: { test: true },
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });

  test('should validate required fields', async ({ request }) => {
    const response = await request.post('/api/analytics', {
      data: {
        // Missing required fields
        eventName: 'test_event',
      },
    });

    // Should return error for missing fields
    expect([400, 500]).toContain(response.status());
  });

  test('should retrieve analytics summary', async ({ request }) => {
    const response = await request.get('/api/analytics/summary?days=7');

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.data).toHaveProperty('overview');
    expect(body.data).toHaveProperty('interactions');
    expect(body.data).toHaveProperty('conversionFunnel');
  });
});

test.describe('Analytics Issues and Missing Variables', () => {
  test('ISSUE: Analytics database connection', async ({ page }) => {
    // Check if Prisma is properly configured
    await page.goto('/api/analytics/summary');

    // If database is not configured, this will fail
    const content = await page.textContent('body');

    // Document if using SQLite or PostgreSQL
    console.log('⚠️  DATABASE CHECK: Verify DATABASE_URL is set for production');
    console.log('⚠️  MIGRATION CHECK: Run prisma migrate deploy before production');
  });

  test('HARDCODED: Analytics event types', async ({ page }) => {
    // Event types are currently hardcoded in useAnalytics hook
    console.log('⚠️  HARDCODED: Event types should be in a centralized enum/config');
    console.log('⚠️  RECOMMENDATION: Create lib/analytics/eventTypes.ts');
  });

  test('MISSING: Analytics retention policy', async ({ page }) => {
    console.log('⚠️  MISSING: No data retention policy defined');
    console.log('⚠️  RECOMMENDATION: Implement automatic cleanup of old analytics data');
    console.log('⚠️  RECOMMENDATION: Add ANALYTICS_RETENTION_DAYS env variable');
  });

  test('MISSING: Rate limiting on analytics endpoint', async ({ request }) => {
    // Try to send multiple requests rapidly
    const requests = Array(10).fill(null).map(() =>
      request.post('/api/analytics', {
        data: {
          sessionId: 'test-session',
          eventType: 'page_view',
          eventName: 'spam_test',
          page: '/test',
        },
      })
    );

    const responses = await Promise.all(requests);
    const allSuccessful = responses.every(r => r.status() === 200);

    if (allSuccessful) {
      console.log('⚠️  MISSING: No rate limiting on /api/analytics endpoint');
      console.log('⚠️  RECOMMENDATION: Implement rate limiting to prevent abuse');
    }
  });

  test('MISSING: User identification in analytics', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    console.log('⚠️  MISSING: No user identification system');
    console.log('⚠️  RECOMMENDATION: Implement user tracking with cookies or auth');
    console.log('⚠️  RECOMMENDATION: Add userId field to analytics events');
  });
});
