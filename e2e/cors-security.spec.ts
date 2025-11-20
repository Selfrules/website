/**
 * E2E Tests for CORS Security (SV-003)
 * Verifies that CORS wildcards are removed and strict origin validation is enforced
 */

import { test, expect } from '@playwright/test';

test.describe('CORS Security - Origin Validation', () => {
  test('should allow requests from whitelisted origin (localhost:3000)', async ({ request }) => {
    const response = await request.post('/api/chat/stream', {
      headers: {
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/json',
      },
      data: {
        sessionId: 'test-session-cors-1',
        userId: 'test-user',
        message: 'CORS test message',
        metadata: { test: true },
      },
    });

    // Should allow the request
    expect(response.status()).not.toBe(403);

    // Should include CORS header with exact origin match
    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBe('http://localhost:3000');
  });

  test('should reject requests from non-whitelisted origin', async ({ request }) => {
    const response = await request.post('/api/chat/stream', {
      headers: {
        'Origin': 'https://malicious-site.com',
        'Content-Type': 'application/json',
      },
      data: {
        sessionId: 'test-session-cors-2',
        userId: 'test-user',
        message: 'CORS test message',
        metadata: { test: true },
      },
      failOnStatusCode: false, // Don't throw on non-2xx status
    });

    // CORS header should NOT be set for disallowed origins
    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBeUndefined();
  });

  test('should handle OPTIONS preflight correctly', async ({ request }) => {
    const response = await request.fetch('/api/chat/stream', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    });

    // Should return 204 No Content
    expect(response.status()).toBe(204);

    // Should include CORS headers for preflight
    const headers = response.headers();
    expect(headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(headers['access-control-allow-methods']).toContain('POST');
    expect(headers['access-control-allow-headers']).toBeDefined();
    expect(headers['access-control-max-age']).toBeDefined();
  });

  test('should reject OPTIONS preflight from non-whitelisted origin', async ({ request }) => {
    const response = await request.fetch('/api/chat/stream', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://evil.com',
        'Access-Control-Request-Method': 'POST',
      },
    });

    // Should not include CORS allow origin header
    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBeUndefined();
  });
});

test.describe('CORS Security - Wildcard Detection', () => {
  test('should not use wildcard CORS in any endpoint', async ({ request }) => {
    const endpoints = [
      '/api/chat/stream',
      '/api/analytics',
      '/api/calendar/available-slots',
      '/api/spotify/now-playing',
    ];

    for (const endpoint of endpoints) {
      const response = await request.fetch(endpoint, {
        method: 'OPTIONS',
        headers: {
          'Origin': 'http://test-origin.com',
        },
        failOnStatusCode: false,
      });

      const corsHeader = response.headers()['access-control-allow-origin'];

      // Should NEVER be wildcard
      expect(corsHeader).not.toBe('*');

      // If set, should be exact origin match or undefined
      if (corsHeader) {
        expect(corsHeader).toBe('http://test-origin.com');
      }
    }
  });
});

test.describe('CORS Security - Edge Cases', () => {
  test('should reject null origin', async ({ request }) => {
    const response = await request.post('/api/chat/stream', {
      headers: {
        'Origin': 'null',
        'Content-Type': 'application/json',
      },
      data: {
        sessionId: 'test-session-cors-null',
        userId: 'test-user',
        message: 'Test',
        metadata: {},
      },
      failOnStatusCode: false,
    });

    // Should not set CORS headers for null origin
    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBeUndefined();
  });

  test('should reject origin with subdomain manipulation', async ({ request }) => {
    const response = await request.post('/api/chat/stream', {
      headers: {
        'Origin': 'http://evil.localhost:3000',
        'Content-Type': 'application/json',
      },
      data: {
        sessionId: 'test-session-cors-subdomain',
        userId: 'test-user',
        message: 'Test',
        metadata: {},
      },
      failOnStatusCode: false,
    });

    // Should not set CORS headers (requires exact match)
    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBeUndefined();
  });

  test('should be case-sensitive for origin matching', async ({ request }) => {
    const response = await request.post('/api/chat/stream', {
      headers: {
        'Origin': 'HTTP://LOCALHOST:3000', // Uppercase
        'Content-Type': 'application/json',
      },
      data: {
        sessionId: 'test-session-cors-case',
        userId: 'test-user',
        message: 'Test',
        metadata: {},
      },
      failOnStatusCode: false,
    });

    // Should not set CORS headers (case-sensitive match)
    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBeUndefined();
  });
});

test.describe('CORS Security - Production Safety', () => {
  test.skip('should block wildcard CORS in production environment', async () => {
    // This test should be run manually in production-like environment
    // with NODE_ENV=production and ALLOWED_ORIGINS='*'
    // Expected: CORS should be blocked and logged as security error
    console.log('⚠️  MANUAL TEST REQUIRED:');
    console.log('   1. Set NODE_ENV=production');
    console.log('   2. Set ALLOWED_ORIGINS=*');
    console.log('   3. Make request to any API endpoint');
    console.log('   4. Expected: CORS header NOT set, error logged');
  });

  test.skip('should log CORS rejections for monitoring', async () => {
    // This test verifies logging is working
    // Expected: Console should show [CORS REJECTED] logs for invalid origins
    console.log('⚠️  MANUAL VERIFICATION:');
    console.log('   Check server logs for [CORS REJECTED] messages');
    console.log('   when requests from invalid origins are made');
  });
});
