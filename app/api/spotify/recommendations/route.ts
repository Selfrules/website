/**
 * Spotify Featured Podcasts API Route
 * Returns curated podcast recommendations
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedPodcasts } from '@/lib/api/spotify';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';

// Cache the response for 7 days (weekly refresh for curated content)
const CACHE_DURATION = 7 * 24 * 60 * 60; // 7 days in seconds

// Cache version - increment to invalidate cache when content structure changes
const CACHE_VERSION = 2;

let cachedResponse: any = null;
let cacheTimestamp: number = 0;
let cacheVersion: number = 0;

/**
 * GET /api/spotify/recommendations
 * Get featured podcast shows (curated list)
 */
export async function GET(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    // Return cached response if still valid (time + version)
    const now = Date.now();
    const isCacheValid =
      cachedResponse &&
      cacheVersion === CACHE_VERSION &&
      now - cacheTimestamp < CACHE_DURATION * 1000;

    if (isCacheValid) {
      const response = NextResponse.json(cachedResponse, { status: 200 });
      response.headers.set('X-Cache', 'HIT');
      response.headers.set('Cache-Control', `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`);
      return addCorsHeaders(response, req);
    }

    // Fetch featured podcasts from Spotify
    const podcasts = await getFeaturedPodcasts();

    // Update cache with version
    cachedResponse = formatSuccessResponse(podcasts);
    cacheTimestamp = now;
    cacheVersion = CACHE_VERSION;

    const response = NextResponse.json(cachedResponse, { status: 200 });
    response.headers.set('X-Cache', 'MISS');
    response.headers.set('Cache-Control', `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`);

    return addCorsHeaders(response, req);
  } catch (error: any) {
    // Graceful fallback for Spotify API errors
    if (error.response?.status === 401) {
      const response = NextResponse.json(
        formatSuccessResponse([], 'Spotify authentication required'),
        { status: 200 }
      );
      return addCorsHeaders(response, req);
    }

    return handleApiError(error);
  }
}

export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, req);
}
