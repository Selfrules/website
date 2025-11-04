/**
 * Rate Limiting Middleware
 * Implements sliding window algorithm using Redis
 * Different limits for different endpoint types
 */

import { NextRequest, NextResponse } from 'next/server';
import type {
  RateLimitConfig,
  RateLimitResult,
  RateLimitByEndpoint,
  EndpointType,
} from '../types';

// Rate limit configurations by endpoint type
export const RATE_LIMITS: RateLimitByEndpoint = {
  public: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
    keyPrefix: 'rl:public',
  },
  chat: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    keyPrefix: 'rl:chat',
  },
  calendar: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    keyPrefix: 'rl:calendar',
  },
  admin: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    keyPrefix: 'rl:admin',
  },
  analytics: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 50,
    keyPrefix: 'rl:analytics',
  },
};

/**
 * In-memory store for rate limiting (for development)
 * In production, use Redis for distributed rate limiting
 */
class InMemoryStore {
  private store = new Map<string, { count: number; resetTime: number }>();

  async increment(
    key: string,
    windowMs: number
  ): Promise<{ count: number; resetTime: number }> {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now > entry.resetTime) {
      const resetTime = now + windowMs;
      this.store.set(key, { count: 1, resetTime });
      return { count: 1, resetTime };
    }

    entry.count++;
    this.store.set(key, entry);
    return entry;
  }

  async cleanup() {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now > value.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

const store = new InMemoryStore();

// Cleanup expired entries every 5 minutes
setInterval(() => store.cleanup(), 5 * 60 * 1000);

/**
 * Get client identifier (IP address or user ID)
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get IP from headers (works with proxies)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to a default identifier
  return 'unknown';
}

/**
 * Check rate limit for a request
 */
export async function checkRateLimit(
  request: NextRequest,
  endpointType: EndpointType
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[endpointType];
  const clientId = getClientIdentifier(request);
  const key = `${config.keyPrefix}:${clientId}`;

  const { count, resetTime } = await store.increment(key, config.windowMs);

  const allowed = count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - count);

  return {
    allowed,
    remaining,
    resetTime,
    retryAfter: allowed ? undefined : Math.ceil((resetTime - Date.now()) / 1000),
  };
}

/**
 * Rate limiting middleware factory
 */
export function rateLimitMiddleware(endpointType: EndpointType) {
  return async (request: NextRequest) => {
    const result = await checkRateLimit(request, endpointType);

    // Add rate limit headers to response
    const headers = new Headers();
    headers.set('X-RateLimit-Limit', RATE_LIMITS[endpointType].maxRequests.toString());
    headers.set('X-RateLimit-Remaining', result.remaining.toString());
    headers.set('X-RateLimit-Reset', result.resetTime.toString());

    if (!result.allowed) {
      headers.set('Retry-After', result.retryAfter!.toString());
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again in ${result.retryAfter} seconds.`,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...Object.fromEntries(headers),
          },
        }
      );
    }

    return { headers };
  };
}

/**
 * Redis-based rate limiter (for production)
 * Uncomment and configure when Redis is available
 */
/*
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

export async function checkRateLimitRedis(
  request: NextRequest,
  endpointType: EndpointType
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[endpointType];
  const clientId = getClientIdentifier(request);
  const key = `${config.keyPrefix}:${clientId}`;
  const now = Date.now();

  // Sliding window using sorted sets
  const pipeline = redis.pipeline();

  // Remove old entries outside the window
  pipeline.zremrangebyscore(key, 0, now - config.windowMs);

  // Add current request
  pipeline.zadd(key, now, `${now}`);

  // Count requests in window
  pipeline.zcard(key);

  // Set expiry
  pipeline.expire(key, Math.ceil(config.windowMs / 1000));

  const results = await pipeline.exec();
  const count = results?.[2]?.[1] as number;

  const allowed = count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - count);
  const resetTime = now + config.windowMs;

  return {
    allowed,
    remaining,
    resetTime,
    retryAfter: allowed ? undefined : Math.ceil(config.windowMs / 1000),
  };
}
*/
