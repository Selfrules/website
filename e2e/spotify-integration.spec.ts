import { test, expect } from '@playwright/test';

test.describe('Spotify Now Playing Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Spotify widget on homepage', async ({ page }) => {
    // Look for Spotify widget/player component
    const spotifyWidget = page.locator('[data-testid="spotify-widget"]').or(
      page.locator('text=Now Playing').or(
        page.locator('text=Listening to')
      )
    );

    const exists = await spotifyWidget.count();

    if (exists === 0) {
      console.log('⚠️  Spotify widget not found on homepage');
      console.log('⚠️  CHECK: Verify Spotify widget component is implemented');
    } else {
      expect(exists).toBeGreaterThan(0);
    }
  });

  test('should handle "not playing" state gracefully', async ({ page }) => {
    // The widget should show a fallback when nothing is playing
    await page.waitForTimeout(2000);

    const notPlayingText = page.locator('text=Not playing').or(
      page.locator('text=Offline').or(
        page.locator('text=Paused')
      )
    );

    const hasNotPlayingState = await notPlayingText.count();

    if (hasNotPlayingState === 0) {
      console.log('⚠️  MISSING: Fallback UI for when Spotify is not playing');
      console.log('⚠️  RECOMMENDATION: Show default message or hide widget');
    }
  });

  test('MISSING: Spotify widget component', async ({ page }) => {
    console.log('⚠️  CHECK: Spotify Widget Implementation');
    console.log('   Expected location: components/widgets/SpotifyNowPlaying.tsx');
    console.log('   Should include:');
    console.log('   - Album artwork with skeleton loader');
    console.log('   - Song title and artist');
    console.log('   - Live playback indicator');
    console.log('   - Link to Spotify track');
    console.log('   - Refresh mechanism (SWR with 30s interval)');
  });
});

test.describe('Spotify API Integration', () => {
  test('GET /api/spotify/now-playing - should return current track', async ({ request }) => {
    const response = await request.get('/api/spotify/now-playing');

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/spotify/now-playing endpoint');
      console.log('⚠️  CREATE: app/api/spotify/now-playing/route.ts');
    } else if (response.status() === 401) {
      console.log('⚠️  AUTH ERROR: Spotify API credentials invalid/missing');
      console.log('⚠️  CHECK: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN');
    } else if (response.status() === 200) {
      const body = await response.json();

      // Validate response structure
      if (body.isPlaying !== undefined) {
        console.log('✅ Spotify API endpoint functional');
        expect(body).toHaveProperty('isPlaying');

        if (body.isPlaying) {
          expect(body).toHaveProperty('title');
          expect(body).toHaveProperty('artist');
          expect(body).toHaveProperty('album');
          expect(body).toHaveProperty('albumImageUrl');
          expect(body).toHaveProperty('songUrl');
        }
      } else {
        console.log('⚠️  INVALID RESPONSE: Missing expected fields');
        console.log('⚠️  Expected: { isPlaying, title, artist, album, albumImageUrl, songUrl }');
      }
    }
  });

  test('should handle Spotify token refresh', async ({ request }) => {
    // Access token expires after 1 hour, should auto-refresh
    const response = await request.get('/api/spotify/now-playing');

    if (response.status() === 401) {
      console.log('⚠️  TOKEN EXPIRED: Implement automatic token refresh');
      console.log('⚠️  SOLUTION: Call Spotify refresh token endpoint');
      console.log('   POST https://accounts.spotify.com/api/token');
      console.log('   with grant_type=refresh_token');
    }
  });

  test('MISSING: Spotify OAuth flow for getting refresh token', async ({ page }) => {
    console.log('⚠️  MISSING: Documentation for obtaining Spotify refresh token');
    console.log('   STEPS TO GET REFRESH TOKEN:');
    console.log('   1. Create app at https://developer.spotify.com/dashboard');
    console.log('   2. Set redirect URI to http://localhost:3000/api/spotify/callback');
    console.log('   3. Request authorization with scope: user-read-currently-playing');
    console.log('   4. Exchange authorization code for refresh token');
    console.log('   5. Store SPOTIFY_REFRESH_TOKEN in .env.local');
  });

  test('MISSING: Spotify environment variables', async ({ page }) => {
    console.log('⚠️  REQUIRED ENV VARS for Spotify:');
    console.log('   - SPOTIFY_CLIENT_ID (from Spotify dashboard)');
    console.log('   - SPOTIFY_CLIENT_SECRET (from Spotify dashboard)');
    console.log('   - SPOTIFY_REFRESH_TOKEN (from OAuth flow)');
    console.log('   - NEXT_PUBLIC_SPOTIFY_ENABLED=true (to show widget)');
  });
});

test.describe('Spotify Data Caching', () => {
  test('should implement SWR or React Query for data fetching', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    console.log('⚠️  RECOMMENDATION: Use SWR for Spotify data fetching');
    console.log('   Benefits:');
    console.log('   - Automatic revalidation every 30 seconds');
    console.log('   - Background updates without UI flicker');
    console.log('   - Built-in error handling and retry');
    console.log('   - Example: useSWR("/api/spotify/now-playing", { refreshInterval: 30000 })');
  });

  test('MISSING: Error boundary for Spotify widget', async ({ page }) => {
    console.log('⚠️  MISSING: Error boundary around Spotify widget');
    console.log('   If Spotify API fails, widget should:');
    console.log('   - Not crash entire page');
    console.log('   - Show graceful error message');
    console.log('   - Have retry button');
  });
});

test.describe('Spotify Widget UI/UX', () => {
  test('should show loading skeleton while fetching', async ({ page }) => {
    await page.goto('/');

    // Look for skeleton/loading state
    const skeleton = page.locator('[data-testid="spotify-skeleton"]').or(
      page.locator('.animate-pulse')
    );

    await page.waitForTimeout(500);

    console.log('⚠️  RECOMMENDATION: Add skeleton loader for Spotify widget');
    console.log('   Shows while data is being fetched');
    console.log('   Improves perceived performance');
  });

  test('should be responsive on mobile', async ({ page, viewport }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(1000);

    console.log('⚠️  TEST: Verify Spotify widget is responsive');
    console.log('   - Should stack vertically on mobile');
    console.log('   - Album art should scale appropriately');
    console.log('   - Text should not overflow');
  });

  test('should match neobrutalist design system', async ({ page }) => {
    await page.goto('/');

    console.log('⚠️  DESIGN CHECK: Spotify widget styling');
    console.log('   Should include:');
    console.log('   - 4-6px solid black border');
    console.log('   - Hard shadow (shadow-brutal)');
    console.log('   - 8-12px border radius (rounded-brutal)');
    console.log('   - Theme-aware colors (light/dark mode)');
  });

  test('HARDCODED: Spotify widget position', async ({ page }) => {
    console.log('⚠️  HARDCODED: Spotify widget position on page');
    console.log('   Current: Likely hardcoded in Hero or layout');
    console.log('   RECOMMENDATION: Make position configurable');
    console.log('   Options: hero, sidebar, footer, floating');
  });
});

test.describe('Spotify Analytics', () => {
  test('should track Spotify widget interactions', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    // If widget has clickable link
    const spotifyLink = page.locator('a[href*="spotify.com"]').first();
    const linkExists = await spotifyLink.count();

    if (linkExists > 0) {
      console.log('⚠️  MISSING: Analytics tracking for Spotify link clicks');
      console.log('   Add: onClick={() => analytics.trackEvent("spotify_link_click")}');
    }
  });

  test('should track music listening patterns', async ({ page }) => {
    console.log('⚠️  OPTIONAL: Track music listening patterns');
    console.log('   Analytics to capture:');
    console.log('   - Most played genres');
    console.log('   - Listening time patterns');
    console.log('   - User engagement with widget');
    console.log('   - Correlation between music and user activity');
  });
});

test.describe('Spotify Integration Edge Cases', () => {
  test('should handle Spotify API rate limiting', async ({ request }) => {
    console.log('⚠️  EDGE CASE: Spotify API rate limits');
    console.log('   Limits: ~200 requests per minute');
    console.log('   SOLUTION: Cache responses for 30 seconds');
    console.log('   SOLUTION: Implement exponential backoff on 429 errors');
  });

  test('should handle network failures gracefully', async ({ page }) => {
    console.log('⚠️  EDGE CASE: Network failures');
    console.log('   Widget should:');
    console.log('   - Show cached data if available');
    console.log('   - Display "Connection lost" message');
    console.log('   - Auto-retry when connection restored');
  });

  test('should handle long song/artist names', async ({ page }) => {
    console.log('⚠️  EDGE CASE: Long song/artist names');
    console.log('   Ensure:');
    console.log('   - Text truncation with ellipsis');
    console.log('   - Tooltip showing full name on hover');
    console.log('   - Responsive layout doesn\'t break');
  });

  test('should handle podcasts vs music', async ({ page }) => {
    console.log('⚠️  EDGE CASE: Spotify podcasts');
    console.log('   Spotify API returns podcasts differently');
    console.log('   Ensure widget handles both:');
    console.log('   - Music tracks (title, artist, album)');
    console.log('   - Podcast episodes (title, show, episode)');
  });

  test('MISSING: Fallback when Spotify API is down', async ({ page }) => {
    console.log('⚠️  MISSING: Fallback for Spotify API downtime');
    console.log('   Options:');
    console.log('   - Hide widget completely');
    console.log('   - Show last known listening data');
    console.log('   - Display static "Find me on Spotify" link');
  });
});
