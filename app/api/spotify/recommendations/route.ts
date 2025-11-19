/**
 * Spotify Recommendations API Route
 * Returns personalized track recommendations based on listening history
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations } from '@/lib/api/spotify';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';

// Cache the response for 24 hours (daily refresh for fresh recommendations)
const CACHE_DURATION = 24 * 60 * 60; // 24 hours in seconds
let cachedResponse: any = null;
let cacheTimestamp: number = 0;

/**
 * GET /api/spotify/recommendations
 * Get personalized music recommendations (top 3)
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

    // Fetch fresh recommendations from Spotify
    const recommendations = await getRecommendations(3);

    // Update cache
    cachedResponse = formatSuccessResponse(recommendations);
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
