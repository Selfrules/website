import { test, expect } from '@playwright/test';

test.describe('API Routes - Analytics', () => {
  test('POST /api/analytics - should accept valid analytics events', async ({ request }) => {
    const response = await request.post('/api/analytics', {
      data: {
        sessionId: 'test-session-123',
        eventType: 'page_view',
        eventName: 'test_page_view',
        page: '/test',
        metadata: { source: 'test' },
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });

  test('GET /api/analytics/summary - should return analytics data', async ({ request }) => {
    const response = await request.get('/api/analytics/summary?days=30');

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.data).toHaveProperty('overview');
    expect(body.data).toHaveProperty('interactions');
    expect(body.data).toHaveProperty('conversionFunnel');
    expect(body.data).toHaveProperty('topPages');
    expect(body.data).toHaveProperty('timeSeries');
  });

  test('MISSING: Analytics filtering endpoints', async ({ request }) => {
    console.log('⚠️  MISSING API ENDPOINTS:');
    console.log('   - GET /api/analytics/events?sessionId=xxx');
    console.log('   - GET /api/analytics/events?eventType=cta_click');
    console.log('   - GET /api/analytics/sessions?startDate=xxx&endDate=xxx');
    console.log('   - POST /api/analytics/batch (for bulk event tracking)');
  });
});

test.describe('API Routes - Chat/Chatbot', () => {
  test('POST /api/chat - endpoint existence check', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'Hello, test message',
        conversationId: 'test-conv-123',
      },
    });

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/chat endpoint not implemented');
      console.log('⚠️  REQUIRED: Create app/api/chat/route.ts');
    } else {
      expect([200, 500]).toContain(response.status());
    }
  });

  test('MISSING: Claude API environment variables', async ({ page }) => {
    console.log('⚠️  REQUIRED ENV VARS for Chatbot:');
    console.log('   - ANTHROPIC_API_KEY (Claude API key)');
    console.log('   - CLAUDE_MODEL (default: claude-3-sonnet-20240229)');
    console.log('   - CLAUDE_MAX_TOKENS (default: 1024)');
    console.log('   - CLAUDE_TEMPERATURE (default: 0.7)');
  });

  test('MISSING: Conversation management endpoints', async ({ page }) => {
    console.log('⚠️  MISSING API ENDPOINTS for Conversations:');
    console.log('   - GET /api/conversations (list all)');
    console.log('   - GET /api/conversations/[id] (get single)');
    console.log('   - POST /api/conversations (create new)');
    console.log('   - PUT /api/conversations/[id] (update)');
    console.log('   - DELETE /api/conversations/[id] (delete)');
    console.log('   - POST /api/conversations/[id]/categorize (ML categorization)');
  });

  test('HARDCODED: Chatbot context and personality', async ({ page }) => {
    console.log('⚠️  HARDCODED: Chatbot system prompt should be in database/config');
    console.log('   Current: Likely hardcoded in API route');
    console.log('   Better: Store in lib/chatbot/context.ts or database');
    console.log('   Include: Brand voice, Mattias background, tone guidelines');
  });
});

test.describe('API Routes - Calendar/Booking', () => {
  test('GET /api/calendar/availability - endpoint existence', async ({ request }) => {
    const response = await request.get('/api/calendar/availability?date=2025-11-15');

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/calendar/availability endpoint');
      console.log('⚠️  REQUIRED: Create app/api/calendar/availability/route.ts');
    }
  });

  test('POST /api/calendar/book - endpoint existence', async ({ request }) => {
    const response = await request.post('/api/calendar/book', {
      data: {
        slotId: 'test-slot',
        name: 'Test User',
        email: 'test@example.com',
        notes: 'Test booking',
      },
    });

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/calendar/book endpoint');
      console.log('⚠️  REQUIRED: Create app/api/calendar/book/route.ts');
    }
  });

  test('MISSING: Google Calendar API environment variables', async ({ page }) => {
    console.log('⚠️  REQUIRED ENV VARS for Calendar Integration:');
    console.log('   - GOOGLE_CLIENT_ID');
    console.log('   - GOOGLE_CLIENT_SECRET');
    console.log('   - GOOGLE_CALENDAR_ID');
    console.log('   - GOOGLE_REDIRECT_URI');
    console.log('   - GOOGLE_REFRESH_TOKEN (from OAuth flow)');
  });

  test('MISSING: Calendar webhook endpoint', async ({ page }) => {
    console.log('⚠️  MISSING: Google Calendar webhook for real-time updates');
    console.log('   - POST /api/calendar/webhook (for Google notifications)');
    console.log('   - Handles: booking created, updated, cancelled events');
  });

  test('MISSING: Booking confirmation/cancellation endpoints', async ({ page }) => {
    console.log('⚠️  MISSING API ENDPOINTS for Booking Management:');
    console.log('   - GET /api/bookings (list all bookings)');
    console.log('   - GET /api/bookings/[id] (get single booking)');
    console.log('   - PUT /api/bookings/[id]/confirm');
    console.log('   - PUT /api/bookings/[id]/cancel');
    console.log('   - POST /api/bookings/[id]/reschedule');
  });
});

test.describe('API Routes - Blog', () => {
  test('GET /api/blog - endpoint existence', async ({ request }) => {
    const response = await request.get('/api/blog');

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/blog endpoint');
      console.log('⚠️  REQUIRED: Create app/api/blog/route.ts');
      console.log('   Should return: paginated list of published posts');
    }
  });

  test('GET /api/blog/[slug] - endpoint existence', async ({ request }) => {
    const response = await request.get('/api/blog/test-post');

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/blog/[slug] endpoint');
      console.log('⚠️  REQUIRED: Create app/api/blog/[slug]/route.ts');
      console.log('   Should return: single blog post by slug');
    }
  });

  test('POST /api/blog - create post endpoint', async ({ request }) => {
    const response = await request.post('/api/blog', {
      data: {
        title: 'Test Post',
        content: 'Test content',
        slug: 'test-post',
      },
    });

    if (response.status() === 404) {
      console.log('❌ MISSING: POST /api/blog endpoint for creating posts');
      console.log('⚠️  REQUIRED: Admin-only endpoint for blog post creation');
    }
  });

  test('MISSING: Blog management endpoints', async ({ page }) => {
    console.log('⚠️  MISSING API ENDPOINTS for Blog Management:');
    console.log('   - PUT /api/blog/[id] (update post)');
    console.log('   - DELETE /api/blog/[id] (delete post)');
    console.log('   - POST /api/blog/[id]/publish (change status)');
    console.log('   - GET /api/blog/drafts (admin only)');
    console.log('   - POST /api/blog/generate (AI-assisted content)');
  });

  test('MISSING: Blog analytics endpoints', async ({ page }) => {
    console.log('⚠️  MISSING: Blog-specific analytics endpoints');
    console.log('   - GET /api/blog/[slug]/stats (views, shares, time on page)');
    console.log('   - POST /api/blog/[slug]/view (increment view count)');
    console.log('   - GET /api/blog/popular (most viewed posts)');
  });

  test('HARDCODED: Blog content currently in MDX files', async ({ page }) => {
    console.log('⚠️  CURRENT: Blog posts stored as MDX files in /content/blog/');
    console.log('   ISSUE: Not easily manageable through admin interface');
    console.log('   RECOMMENDATION: Migrate to database (BlogPost model)');
    console.log('   BENEFIT: Dynamic CRUD via admin dashboard');
  });
});

test.describe('API Routes - Spotify Integration', () => {
  test('GET /api/spotify/now-playing - endpoint existence', async ({ request }) => {
    const response = await request.get('/api/spotify/now-playing');

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/spotify/now-playing endpoint');
      console.log('⚠️  REQUIRED: Create app/api/spotify/now-playing/route.ts');
    } else if (response.status() === 401 || response.status() === 500) {
      console.log('⚠️  ENDPOINT EXISTS but likely missing Spotify credentials');
    }
  });

  test('GET /api/spotify/refresh - token refresh endpoint', async ({ request }) => {
    const response = await request.get('/api/spotify/refresh');

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/spotify/refresh endpoint');
      console.log('⚠️  REQUIRED: Automatic token refresh mechanism');
    }
  });

  test('MISSING: Spotify API environment variables', async ({ page }) => {
    console.log('⚠️  REQUIRED ENV VARS for Spotify Integration:');
    console.log('   - SPOTIFY_CLIENT_ID');
    console.log('   - SPOTIFY_CLIENT_SECRET');
    console.log('   - SPOTIFY_REFRESH_TOKEN');
    console.log('   - Get from: https://developer.spotify.com/dashboard');
  });

  test('MISSING: Spotify webhook for real-time updates', async ({ page }) => {
    console.log('⚠️  OPTIONAL: Spotify webhook for real-time playback updates');
    console.log('   - POST /api/spotify/webhook');
    console.log('   - Alternative: Polling with SWR/React Query');
  });
});

test.describe('API Routes - Admin/Dashboard', () => {
  test('GET /api/admin/stats - dashboard stats endpoint', async ({ request }) => {
    const response = await request.get('/api/admin/stats');

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/admin/stats endpoint');
      console.log('⚠️  REQUIRED: Dashboard overview statistics');
      console.log('   Should return: analytics summary, recent posts, conversations');
    }
  });

  test('MISSING: Authentication middleware', async ({ request }) => {
    const response = await request.get('/api/admin/stats');

    // Should require authentication
    if (response.status() === 200) {
      console.log('⚠️  SECURITY ISSUE: Admin endpoints not protected');
      console.log('⚠️  REQUIRED: Implement auth middleware');
      console.log('   Options: NextAuth.js, Clerk, Auth0, or custom JWT');
    }
  });

  test('MISSING: Admin authentication setup', async ({ page }) => {
    console.log('⚠️  MISSING: Authentication system for admin routes');
    console.log('   REQUIRED ENV VARS:');
    console.log('   - NEXTAUTH_SECRET (for NextAuth.js)');
    console.log('   - NEXTAUTH_URL (for NextAuth.js)');
    console.log('   - ADMIN_EMAIL (whitelist)');
    console.log('   - ADMIN_PASSWORD_HASH (or use OAuth)');
  });

  test('MISSING: Admin user management endpoints', async ({ page }) => {
    console.log('⚠️  MISSING: Admin user management endpoints');
    console.log('   - GET /api/admin/users');
    console.log('   - POST /api/admin/users (create admin)');
    console.log('   - PUT /api/admin/users/[id] (update role)');
    console.log('   - DELETE /api/admin/users/[id]');
  });
});

test.describe('API Routes - General Issues', () => {
  test('MISSING: API rate limiting', async ({ request }) => {
    console.log('⚠️  MISSING: Global API rate limiting');
    console.log('   RECOMMENDATION: Use @upstash/ratelimit or similar');
    console.log('   Configure per-route limits:');
    console.log('   - /api/chat: 10 req/min');
    console.log('   - /api/analytics: 100 req/min');
    console.log('   - /api/calendar/book: 3 req/min');
  });

  test('MISSING: API error handling middleware', async ({ page }) => {
    console.log('⚠️  MISSING: Centralized error handling');
    console.log('   Create: lib/api/errorHandler.ts');
    console.log('   Should handle: Prisma errors, validation errors, auth errors');
    console.log('   Should return: Consistent error response format');
  });

  test('MISSING: API request validation', async ({ page }) => {
    console.log('⚠️  MISSING: Request validation middleware');
    console.log('   Use Zod schemas for all API routes');
    console.log('   Create: lib/api/validateRequest.ts');
    console.log('   Validate: body, query params, headers');
  });

  test('MISSING: API response formatting', async ({ page }) => {
    console.log('⚠️  INCONSISTENT: API response formats');
    console.log('   Create standard response helpers:');
    console.log('   - successResponse(data, message)');
    console.log('   - errorResponse(error, statusCode)');
    console.log('   - paginatedResponse(data, meta)');
  });

  test('MISSING: API documentation', async ({ page }) => {
    console.log('⚠️  MISSING: API documentation');
    console.log('   RECOMMENDATION: Add Swagger/OpenAPI spec');
    console.log('   Create: docs/api/openapi.yaml');
    console.log('   Tool: next-swagger-doc or manual documentation');
  });

  test('MISSING: CORS configuration', async ({ page }) => {
    console.log('⚠️  MISSING: CORS configuration for API routes');
    console.log('   Required if frontend is on different domain');
    console.log('   Configure in: next.config.js or middleware.ts');
    console.log('   Whitelist specific origins only');
  });

  test('MISSING: API versioning', async ({ page }) => {
    console.log('⚠️  MISSING: API versioning strategy');
    console.log('   RECOMMENDATION: Use /api/v1/ prefix');
    console.log('   Allows breaking changes without affecting existing clients');
    console.log('   Example: /api/v1/blog, /api/v1/analytics');
  });
});
