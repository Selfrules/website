/**
 * Security Helper Functions
 * Utility functions for common security operations
 */

import { NextRequest } from 'next/server';

/**
 * Extract IP address from request
 */
export function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * Check if IP is in whitelist
 */
export function isIPWhitelisted(ip: string, whitelist: string[]): boolean {
  return whitelist.includes(ip);
}

/**
 * Check if IP is in blacklist
 */
export function isIPBlacklisted(ip: string, blacklist: string[]): boolean {
  return blacklist.includes(ip);
}

/**
 * Extract user agent from request
 */
export function getUserAgent(request: NextRequest): string {
  return request.headers.get('user-agent') || 'unknown';
}

/**
 * Check if request is from bot
 */
export function isBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /slurp/i,
    /mediapartners/i,
    /bingpreview/i,
    /lighthouse/i,
  ];

  return botPatterns.some((pattern) => pattern.test(userAgent));
}

/**
 * Get request origin
 */
export function getOrigin(request: NextRequest): string | null {
  return request.headers.get('origin');
}

/**
 * Get referer
 */
export function getReferer(request: NextRequest): string | null {
  return request.headers.get('referer');
}

/**
 * Check if request is HTTPS
 */
export function isHTTPS(request: NextRequest): boolean {
  const proto = request.headers.get('x-forwarded-proto');
  return proto === 'https' || request.url.startsWith('https://');
}

/**
 * Validate HTTP method
 */
export function isValidMethod(
  method: string,
  allowed: string[]
): boolean {
  return allowed.includes(method.toUpperCase());
}

/**
 * Parse Authorization header
 */
export function parseAuthHeader(
  authHeader: string | null
): { type: string; token: string } | null {
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return null;

  return {
    type: parts[0],
    token: parts[1],
  };
}

/**
 * Extract Bearer token
 */
export function extractBearerToken(
  request: NextRequest
): string | null {
  const authHeader = request.headers.get('authorization');
  const parsed = parseAuthHeader(authHeader);

  if (parsed?.type === 'Bearer') {
    return parsed.token;
  }

  return null;
}

/**
 * Check content type
 */
export function isContentType(
  request: NextRequest,
  expectedType: string
): boolean {
  const contentType = request.headers.get('content-type');
  if (!contentType) return false;

  return contentType.toLowerCase().includes(expectedType.toLowerCase());
}

/**
 * Validate request body size
 */
export function validateBodySize(
  contentLength: number | null,
  maxSize: number
): boolean {
  if (contentLength === null) return true; // Unknown size
  return contentLength <= maxSize;
}

/**
 * Generate security event log
 */
export interface SecurityEvent {
  type: 'auth' | 'ratelimit' | 'validation' | 'access' | 'error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export function logSecurityEvent(event: SecurityEvent): void {
  const logLevel = {
    low: 'info',
    medium: 'warn',
    high: 'error',
    critical: 'error',
  }[event.severity];

  console[logLevel](
    `[SECURITY:${event.type.toUpperCase()}] ${event.message}`,
    {
      ip: event.ip,
      userAgent: event.userAgent,
      timestamp: event.timestamp.toISOString(),
      ...event.metadata,
    }
  );
}

/**
 * Create security response
 */
export function createSecurityResponse(
  status: number,
  message: string,
  additionalHeaders?: Record<string, string>
): Response {
  return new Response(
    JSON.stringify({
      error: true,
      message,
      timestamp: new Date().toISOString(),
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...additionalHeaders,
      },
    }
  );
}

/**
 * Validate API key format
 */
export function validateAPIKeyFormat(
  apiKey: string,
  prefix: string
): boolean {
  return apiKey.startsWith(prefix) && apiKey.length > prefix.length;
}

/**
 * Check password strength
 */
export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  isStrong: boolean;
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  else feedback.push('Password should be at least 12 characters');

  // Character variety
  if (/[a-z]/.test(password)) score++;
  else feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Add uppercase letters');

  if (/[0-9]/.test(password)) score++;
  else feedback.push('Add numbers');

  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else feedback.push('Add special characters');

  // Common patterns (reduce score)
  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 1);
    feedback.push('Avoid repeated characters');
  }

  if (/^[0-9]+$/.test(password)) {
    score = 0;
    feedback.push('Password cannot be only numbers');
  }

  // Normalize score to 0-4
  score = Math.min(4, Math.max(0, score - 2));

  return {
    score,
    feedback,
    isStrong: score >= 3,
  };
}

/**
 * Generate nonce for CSP
 */
export function generateNonce(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

/**
 * Sanitize error message for client
 */
export function sanitizeErrorMessage(error: any): string {
  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production') {
    return 'An error occurred. Please try again.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

/**
 * Check if request is from same site
 */
export function isSameSite(request: NextRequest): boolean {
  const origin = getOrigin(request);
  if (!origin) return false;

  const requestHost = new URL(request.url).host;
  const originHost = new URL(origin).host;

  return requestHost === originHost;
}

/**
 * Validate redirect URL (prevent open redirect)
 */
export function isValidRedirect(
  url: string,
  allowedDomains: string[]
): boolean {
  try {
    const parsed = new URL(url);

    // Allow relative URLs
    if (!parsed.protocol) return true;

    // Check protocol
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }

    // Check domain
    const hostname = parsed.hostname;
    return allowedDomains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

/**
 * Rate limit key generator
 */
export function generateRateLimitKey(
  identifier: string,
  endpoint: string
): string {
  return `ratelimit:${endpoint}:${identifier}`;
}

/**
 * Check if timestamp is expired
 */
export function isExpired(timestamp: number, ttl: number): boolean {
  return Date.now() > timestamp + ttl;
}
