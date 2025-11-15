/**
 * Spotify Recent Podcasts API Route
 * Returns recently played podcast episodes
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRecentPodcasts } from '@/lib/api/spotify';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';

// Cache the response for 24 hours (daily update)
const CACHE_DURATION = 24 * 60 * 60; // 24 hours in seconds
let cachedResponse: any = null;
let cacheTimestamp: number = 0;

/**
 * GET /api/spotify/recent-podcasts
 * Get recently played podcast episodes (top 2)
 */
export async function GET(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    // Return cached response if still valid
    const now = Date.now();
    if (cachedResponse && now - cacheTimestamp < CACHE_DURATION * 1000) {
      const response = NextResponse.json(cachedResponse, { status: 200 });
      response.headers.set('X-Cache', 'HIT');
      response.headers.set('Cache-Control', `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`);
      return addCorsHeaders(response, req);
    }

    // Fetch fresh data from Spotify
    const podcasts = await getRecentPodcasts(2);

    // Update cache
    cachedResponse = formatSuccessResponse(podcasts);
    cacheTimestamp = now;

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
