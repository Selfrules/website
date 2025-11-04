/**
 * Rate limiting middleware using sliding window algorithm
 * Stores request counts in Redis for distributed rate limiting
 */

import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import { RateLimitError } from '../utils/errors';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    if (times > 3) return null;
    return Math.min(times * 200, 1000);
  },
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

const defaultConfig: RateLimitConfig = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  keyPrefix: 'rl:',
};

export class SlidingWindowRateLimiter {
  private config: Required<RateLimitConfig>;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = {
      ...defaultConfig,
      ...config,
      skipSuccessfulRequests: config.skipSuccessfulRequests ?? false,
      skipFailedRequests: config.skipFailedRequests ?? false,
    } as Required<RateLimitConfig>;
  }

  private getKey(identifier: string): string {
    return this.config.keyPrefix + identifier;
  }

  private getIdentifier(req: NextRequest): string {
    const customId = req.headers.get('x-client-id');
    if (customId) return customId;

    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() :
               req.headers.get('x-real-ip') || 'unknown';

    return ip;
  }

  async checkLimit(req: NextRequest): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
  }> {
    const identifier = this.getIdentifier(req);
    const key = this.getKey(identifier);
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    try {
      await redis.zremrangebyscore(key, '-inf', windowStart.toString());
      const requestCount = await redis.zcard(key);

      if (requestCount >= this.config.maxRequests) {
        const oldestRequest = await redis.zrange(key, 0, 0, 'WITHSCORES');
        const resetTime = oldestRequest[1]
          ? parseInt(oldestRequest[1]) + this.config.windowMs
          : now + this.config.windowMs;

        return { allowed: false, remaining: 0, resetTime };
      }

      const randomSuffix = Math.floor(Math.random() * 1000000);
      const uniqueId = now.toString() + '-' + randomSuffix.toString();
      await redis.zadd(key, now.toString(), uniqueId);
      await redis.expire(key, Math.ceil(this.config.windowMs / 1000));

      return {
        allowed: true,
        remaining: this.config.maxRequests - requestCount - 1,
        resetTime: now + this.config.windowMs,
      };
    } catch (error) {
      console.error('Rate limiter error:', error);
      return {
        allowed: true,
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowMs,
      };
    }
  }
}

export const apiRateLimiter = new SlidingWindowRateLimiter({
  windowMs: 60000,
  maxRequests: 100,
  keyPrefix: 'rl:api:',
});

export const chatRateLimiter = new SlidingWindowRateLimiter({
  windowMs: 60000,
  maxRequests: 10,
  keyPrefix: 'rl:chat:',
});

export const bookingRateLimiter = new SlidingWindowRateLimiter({
  windowMs: 300000,
  maxRequests: 5,
  keyPrefix: 'rl:booking:',
});

export const analyticsRateLimiter = new SlidingWindowRateLimiter({
  windowMs: 60000,
  maxRequests: 200,
  keyPrefix: 'rl:analytics:',
});

export function withRateLimit(rateLimiter: SlidingWindowRateLimiter = apiRateLimiter) {
  return async (req: NextRequest): Promise<NextResponse | null> => {
    const result = await rateLimiter.checkLimit(req);

    if (!result.allowed) {
      const resetDate = new Date(result.resetTime).toISOString();
      throw new RateLimitError('Rate limit exceeded. Try again after ' + resetDate);
    }

    return null;
  };
}
