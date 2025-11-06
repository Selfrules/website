/**
 * Spotify Now Playing API Route
 * Returns currently playing or recently played track
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentOrRecentTrack } from '@/lib/api/spotify';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';

// Cache the response for 30 seconds
const CACHE_DURATION = 30;
let cachedResponse: any = null;
let cacheTimestamp: number = 0;

/**
 * GET /api/spotify/now-playing
 * Get currently playing or recently played track
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
    const track = await getCurrentOrRecentTrack();

    if (!track) {
      const response = NextResponse.json(
        formatSuccessResponse(null, 'No track currently playing or recently played'),
        { status: 200 }
      );
      response.headers.set('X-Cache', 'MISS');
      return addCorsHeaders(response, req);
    }

    // Update cache
    cachedResponse = formatSuccessResponse(track);
    cacheTimestamp = now;

    const response = NextResponse.json(cachedResponse, { status: 200 });
    response.headers.set('X-Cache', 'MISS');
    response.headers.set('Cache-Control', `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`);

    return addCorsHeaders(response, req);
  } catch (error: any) {
    // Graceful fallback for Spotify API errors
    if (error.response?.status === 401) {
      const response = NextResponse.json(
        formatSuccessResponse(null, 'Spotify authentication required'),
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
