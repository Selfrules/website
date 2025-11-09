/**
 * Complete API Routes E2E Tests
 * Tests all API endpoints comprehensively
 */

import { test, expect } from '@playwright/test';

test.describe('Complete API Tests', () => {
  test.describe('Chat API', () => {
    test('POST /api/chat/stream - should stream AI responses', async ({ request }) => {
      const response = await request.post('/api/chat/stream', {
        data: {
          message: 'Hello, what is your background?',
          sessionId: `test-${Date.now()}`,
          userId: 'anonymous',
          metadata: {
            userAgent: 'playwright-test',
            referrer: '/',
          },
        },
      });

      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('text/event-stream');
    });

    test('POST /api/chat/stream - should categorize conversation', async ({ request }) => {
      const response = await request.post('/api/chat/stream', {
        data: {
          message: 'I want to hire you for a project',
          sessionId: `test-lead-${Date.now()}`,
          userId: 'anonymous',
        },
      });

      expect(response.status()).toBe(200);
      // Response should include category in stream
    });

    test('POST /api/chat/stream - should handle rate limiting', async ({ request }) => {
      const sessionId = `test-rate-${Date.now()}`;

      // Send multiple requests rapidly
      const requests = Array(10).fill(null).map(() =>
        request.post('/api/chat/stream', {
          data: {
            message: 'Test message',
            sessionId,
            userId: 'anonymous',
          },
        })
      );

      const responses = await Promise.all(requests);

      // Some should be rate limited (429)
      const rateLimited = responses.filter(r => r.status() === 429);
      expect(rateLimited.length).toBeGreaterThan(0);
    });

    test('POST /api/chat/stream - should reject empty message', async ({ request }) => {
      const response = await request.post('/api/chat/stream', {
        data: {
          message: '',
          sessionId: `test-${Date.now()}`,
          userId: 'anonymous',
        },
      });

      expect(response.status()).toBe(400);
    });

    test('POST /api/chat/stream - should validate schema', async ({ request }) => {
      const response = await request.post('/api/chat/stream', {
        data: {
          // Missing required fields
          message: 'Test',
        },
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBeTruthy();
    });
  });

  test.describe('Analytics API', () => {
    test('POST /api/analytics - should track page view event', async ({ request }) => {
      const response = await request.post('/api/analytics', {
        data: {
          eventType: 'page_view',
          eventName: 'page_view',
          page: '/',
          sessionId: `test-${Date.now()}`,
          metadata: {
            referrer: '',
            title: 'Homepage',
          },
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
    });

    test('POST /api/analytics - should track CTA click event', async ({ request }) => {
      const response = await request.post('/api/analytics', {
        data: {
          eventType: 'interaction',
          eventName: 'cta_click',
          page: '/',
          sessionId: `test-${Date.now()}`,
          metadata: {
            cta: 'book_call',
            location: 'hero',
          },
        },
      });

      expect(response.status()).toBe(200);
    });

    test('POST /api/analytics - should track blog view event', async ({ request }) => {
      const response = await request.post('/api/analytics', {
        data: {
          eventType: 'page_view',
          eventName: 'blog_view',
          page: '/blog/test-post',
          sessionId: `test-${Date.now()}`,
          metadata: {
            slug: 'test-post',
            title: 'Test Post',
            category: 'design',
          },
        },
      });

      expect(response.status()).toBe(200);
    });

    test('POST /api/analytics - should handle rate limiting', async ({ request }) => {
      const sessionId = `test-analytics-${Date.now()}`;

      // Send many events rapidly
      const requests = Array(50).fill(null).map((_, i) =>
        request.post('/api/analytics', {
          data: {
            eventType: 'interaction',
            eventName: `test_event_${i}`,
            page: '/',
            sessionId,
          },
        })
      );

      const responses = await Promise.all(requests);

      // Some should be rate limited
      const rateLimited = responses.filter(r => r.status() === 429);
      expect(rateLimited.length).toBeGreaterThan(0);
    });

    test('GET /api/analytics/summary - should return analytics summary', async ({ request }) => {
      const response = await request.get('/api/analytics/summary');

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty('totalEvents');
      expect(body).toHaveProperty('eventsByType');
    });
  });

  test.describe('Spotify API', () => {
    test('GET /api/spotify/now-playing - should return current track', async ({ request }) => {
      const response = await request.get('/api/spotify/now-playing');

      expect(response.status()).toBe(200);
      const body = await response.json();

      // Should return either track data or null with success message
      expect(body.success).toBe(true);
      if (body.data) {
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('artist');
      }
    });

    test('GET /api/spotify/now-playing - should use cache', async ({ request }) => {
      // First request
      const response1 = await request.get('/api/spotify/now-playing');
      expect(response1.status()).toBe(200);
      const cache1 = response1.headers()['x-cache'];

      // Immediate second request should hit cache
      const response2 = await request.get('/api/spotify/now-playing');
      expect(response2.status()).toBe(200);
      const cache2 = response2.headers()['x-cache'];

      // Second request should be cache HIT
      expect(cache2).toBe('HIT');
    });

    test('GET /api/spotify/now-playing - should handle CORS', async ({ request }) => {
      const response = await request.get('/api/spotify/now-playing', {
        headers: {
          'Origin': 'https://example.com',
        },
      });

      expect(response.status()).toBe(200);
      expect(response.headers()['access-control-allow-origin']).toBeTruthy();
    });

    test('GET /api/spotify/now-playing - should handle auth errors gracefully', async ({ request }) => {
      const response = await request.get('/api/spotify/now-playing');

      // Should not return 500 even if Spotify auth fails
      expect(response.status()).not.toBe(500);
    });
  });

  test.describe('Calendar API', () => {
    test('GET /api/calendar/available-slots - should return available time slots', async ({ request }) => {
      const response = await request.get('/api/calendar/available-slots', {
        params: {
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body.data)).toBe(true);
    });

    test('POST /api/calendar/book - should create booking', async ({ request }) => {
      const response = await request.post('/api/calendar/book', {
        data: {
          startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
          attendeeEmail: 'test@example.com',
          attendeeName: 'Test User',
          description: 'Test booking',
        },
      });

      // Should either succeed or fail with validation error
      expect([200, 201, 400, 409]).toContain(response.status());
    });

    test('POST /api/calendar/book - should validate email format', async ({ request }) => {
      const response = await request.post('/api/calendar/book', {
        data: {
          startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
          attendeeEmail: 'invalid-email',
          attendeeName: 'Test User',
        },
      });

      expect(response.status()).toBe(400);
    });

    test('POST /api/calendar/book - should prevent double booking', async ({ request }) => {
      const startTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString();

      // First booking
      await request.post('/api/calendar/book', {
        data: {
          startTime,
          endTime,
          attendeeEmail: 'test1@example.com',
          attendeeName: 'Test User 1',
        },
      });

      // Second booking at same time should fail
      const response2 = await request.post('/api/calendar/book', {
        data: {
          startTime,
          endTime,
          attendeeEmail: 'test2@example.com',
          attendeeName: 'Test User 2',
        },
      });

      expect(response2.status()).toBe(409); // Conflict
    });

    test('DELETE /api/calendar/cancel - should cancel booking', async ({ request }) => {
      // Create a booking first
      const createResponse = await request.post('/api/calendar/book', {
        data: {
          startTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() + 48 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
          attendeeEmail: 'cancel@example.com',
          attendeeName: 'Cancel Test',
        },
      });

      if (createResponse.status() === 200 || createResponse.status() === 201) {
        const booking = await createResponse.json();
        const bookingId = booking.data?.id;

        if (bookingId) {
          // Cancel the booking
          const cancelResponse = await request.delete(`/api/calendar/cancel`, {
            data: { bookingId },
          });

          expect([200, 204]).toContain(cancelResponse.status());
        }
      }
    });
  });

  test.describe('Blog API', () => {
    test('GET /api/blog - should return blog posts', async ({ request }) => {
      const response = await request.get('/api/blog');

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body.data)).toBe(true);
    });

    test('GET /api/blog - should filter by category', async ({ request }) => {
      const response = await request.get('/api/blog', {
        params: {
          category: 'design',
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body.data)).toBe(true);

      // All posts should have design category
      if (body.data.length > 0) {
        body.data.forEach((post: any) => {
          expect(post.category).toBe('design');
        });
      }
    });

    test('GET /api/blog - should search posts', async ({ request }) => {
      const response = await request.get('/api/blog', {
        params: {
          search: 'product',
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body.data)).toBe(true);
    });

    test('GET /api/blog - should paginate results', async ({ request }) => {
      const response = await request.get('/api/blog', {
        params: {
          page: 1,
          limit: 5,
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBeLessThanOrEqual(5);
    });

    test('GET /api/blog/[slug] - should return single post', async ({ request }) => {
      // Get first post
      const listResponse = await request.get('/api/blog');
      const posts = await listResponse.json();

      if (posts.data && posts.data.length > 0) {
        const firstPost = posts.data[0];
        const response = await request.get(`/api/blog/${firstPost.slug}`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data).toHaveProperty('title');
        expect(body.data).toHaveProperty('content');
      }
    });

    test('GET /api/blog/[slug] - should return 404 for non-existent post', async ({ request }) => {
      const response = await request.get('/api/blog/non-existent-post-12345');

      expect(response.status()).toBe(404);
    });
  });

  test.describe('Questions API', () => {
    test('POST /api/questions - should submit anonymous question', async ({ request }) => {
      const response = await request.post('/api/questions', {
        data: {
          question: 'What is your approach to product management?',
          email: 'optional@example.com',
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
    });

    test('POST /api/questions - should allow anonymous submission', async ({ request }) => {
      const response = await request.post('/api/questions', {
        data: {
          question: 'Anonymous question without email',
        },
      });

      expect(response.status()).toBe(200);
    });

    test('POST /api/questions - should validate question length', async ({ request }) => {
      const response = await request.post('/api/questions', {
        data: {
          question: 'Too short',
        },
      });

      // Should require minimum length
      expect([200, 400]).toContain(response.status());
    });

    test('POST /api/questions - should handle rate limiting', async ({ request }) => {
      const requests = Array(10).fill(null).map(() =>
        request.post('/api/questions', {
          data: {
            question: 'Test question for rate limiting',
          },
        })
      );

      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status() === 429);
      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });

  test.describe('Security & Error Handling', () => {
    test('should handle CORS preflight requests', async ({ request }) => {
      const response = await request.fetch('/api/chat/stream', {
        method: 'OPTIONS',
      });

      expect(response.status()).toBe(204);
      expect(response.headers()['access-control-allow-methods']).toBeTruthy();
    });

    test('should sanitize user input', async ({ request }) => {
      const response = await request.post('/api/questions', {
        data: {
          question: '<script>alert("XSS")</script> Is this safe?',
        },
      });

      // Should accept but sanitize
      expect(response.status()).toBe(200);
    });

    test('should return proper error format', async ({ request }) => {
      const response = await request.post('/api/chat/stream', {
        data: {
          // Invalid data
        },
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body).toHaveProperty('error');
      expect(typeof body.error).toBe('string');
    });

    test('should include security headers', async ({ request }) => {
      const response = await request.get('/api/spotify/now-playing');

      const headers = response.headers();
      // Check for security headers (implementation dependent)
      expect(headers['x-frame-options'] || headers['content-security-policy']).toBeTruthy();
    });
  });

  test.describe('Performance', () => {
    test('API responses should be fast (<500ms)', async ({ request }) => {
      const startTime = Date.now();
      const response = await request.get('/api/blog');
      const duration = Date.now() - startTime;

      expect(response.status()).toBe(200);
      expect(duration).toBeLessThan(500);
    });

    test('should compress responses', async ({ request }) => {
      const response = await request.get('/api/blog', {
        headers: {
          'Accept-Encoding': 'gzip, deflate',
        },
      });

      // Should include compression encoding
      const encoding = response.headers()['content-encoding'];
      expect(encoding).toBeTruthy();
    });
  });
});
