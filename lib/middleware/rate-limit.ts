/**
 * Rate limiting middleware using Upstash Redis REST API
 * Optimized for serverless deployment (Vercel, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Upstash Redis client with REST API
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Rate limit configurations using Upstash Ratelimit
export const rateLimiters = {
  chat: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
    analytics: true,
    prefix: '@upstash/ratelimit:chat',
  }),
  analytics: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
    analytics: true,
    prefix: '@upstash/ratelimit:analytics',
  }),
  calendar: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 m'), // 3 requests per minute
    analytics: true,
    prefix: '@upstash/ratelimit:calendar',
  }),
  booking: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '5 m'), // 5 requests per 5 minutes
    analytics: true,
    prefix: '@upstash/ratelimit:booking',
  }),
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, '1 m'), // 50 requests per minute
    analytics: true,
    prefix: '@upstash/ratelimit:api',
  }),
};

// Helper to get client identifier (IP or fallback)
function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  const customId = req.headers.get('x-client-id');

  if (customId) return customId;

  const ip = cfConnectingIp || realIp || forwarded?.split(',')[0] || 'anonymous';
  return ip.trim();
}

// Rate limit check function
export async function checkRateLimit(
  req: NextRequest,
  limiterType: keyof typeof rateLimiters = 'api'
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const identifier = getClientIdentifier(req);
  const limiter = rateLimiters[limiterType];

  const { success, limit, remaining, reset } = await limiter.limit(identifier);

  return { success, limit, remaining, reset };
}

// Middleware wrapper for API routes
export function withRateLimit(
  limiterType: keyof typeof rateLimiters = 'api'
) {
  return async (req: NextRequest) => {
    const result = await checkRateLimit(req, limiterType);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again in ${Math.ceil(
            (result.reset - Date.now()) / 1000
          )} seconds.`,
          limit: result.limit,
          remaining: result.remaining,
          reset: result.reset,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.toString(),
            'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    return null; // Continue to handler
  };
}

// Direct rate limit checkers for use in API routes
export const chatRateLimiter = {
  checkLimit: async (req: NextRequest) => {
    const result = await checkRateLimit(req, 'chat');
    if (!result.success) {
      throw new Error(
        `Rate limit exceeded. Try again in ${Math.ceil(
          (result.reset - Date.now()) / 1000
        )} seconds.`
      );
    }
    return result;
  },
};

export const analyticsRateLimiter = {
  checkLimit: async (req: NextRequest) => {
    const result = await checkRateLimit(req, 'analytics');
    if (!result.success) {
      throw new Error(
        `Rate limit exceeded. Try again in ${Math.ceil(
          (result.reset - Date.now()) / 1000
        )} seconds.`
      );
    }
    return result;
  },
};

export const calendarRateLimiter = {
  checkLimit: async (req: NextRequest) => {
    const result = await checkRateLimit(req, 'calendar');
    if (!result.success) {
      throw new Error(
        `Rate limit exceeded. Try again in ${Math.ceil(
          (result.reset - Date.now()) / 1000
        )} seconds.`
      );
    }
    return result;
  },
};

export const bookingRateLimiter = {
  checkLimit: async (req: NextRequest) => {
    const result = await checkRateLimit(req, 'booking');
    if (!result.success) {
      throw new Error(
        `Rate limit exceeded. Try again in ${Math.ceil(
          (result.reset - Date.now()) / 1000
        )} seconds.`
      );
    }
    return result;
  },
};

export const apiRateLimiter = {
  checkLimit: async (req: NextRequest) => {
    const result = await checkRateLimit(req, 'api');
    if (!result.success) {
      throw new Error(
        `Rate limit exceeded. Try again in ${Math.ceil(
          (result.reset - Date.now()) / 1000
        )} seconds.`
      );
    }
    return result;
  },
};
