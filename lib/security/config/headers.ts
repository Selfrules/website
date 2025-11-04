/**
 * Security Headers Configuration
 * CSP, HSTS, X-Frame-Options, and other security headers
 */

import type { SecurityHeaders } from '../types';

/**
 * Content Security Policy (CSP)
 * Prevents XSS, clickjacking, and other code injection attacks
 */
function getContentSecurityPolicy(): string {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const directives = {
    // Default source for resources
    'default-src': ["'self'"],

    // Script sources
    'script-src': [
      "'self'",
      isDevelopment ? "'unsafe-eval'" : '', // Allow eval in dev for hot reload
      "'unsafe-inline'", // Required for Next.js
      'https://vercel.live',
      'https://cdn.vercel-insights.com',
    ],

    // Style sources
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for styled-jsx and Tailwind
      'https://fonts.googleapis.com',
    ],

    // Image sources
    'img-src': [
      "'self'",
      'data:',
      'blob:',
      'https://*.vercel.app',
      'https://cloudinary.com',
      'https://res.cloudinary.com',
      'https://i.scdn.co', // Spotify images
    ],

    // Font sources
    'font-src': ["'self'", 'https://fonts.gstatic.com'],

    // Connect sources (API endpoints)
    'connect-src': [
      "'self'",
      'https://api.anthropic.com', // Claude API
      'https://www.googleapis.com', // Google Calendar API
      'https://api.spotify.com', // Spotify API
      'https://accounts.spotify.com',
      'https://vitals.vercel-insights.com',
      isDevelopment ? 'ws://localhost:*' : '', // WebSocket for dev
      isDevelopment ? 'http://localhost:*' : '',
    ],

    // Frame sources (for embeds)
    'frame-src': [
      "'self'",
      'https://open.spotify.com', // Spotify player
      'https://calendar.google.com', // Google Calendar
    ],

    // Media sources (audio/video)
    'media-src': ["'self'", 'https://p.scdn.co'], // Spotify audio

    // Object sources (plugins)
    'object-src': ["'none'"],

    // Base URI restriction
    'base-uri': ["'self'"],

    // Form action restriction
    'form-action': ["'self'"],

    // Frame ancestors (clickjacking protection)
    'frame-ancestors': ["'none'"],

    // Upgrade insecure requests
    'upgrade-insecure-requests': !isDevelopment ? [] : null,
  };

  // Build CSP string
  return Object.entries(directives)
    .filter(([_, value]) => value !== null)
    .map(([key, value]) => {
      const values = (value as string[]).filter(Boolean).join(' ');
      return values ? `${key} ${values}` : key;
    })
    .join('; ');
}

/**
 * Get all security headers
 */
export function getSecurityHeaders(): SecurityHeaders {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    // Content Security Policy
    'Content-Security-Policy': getContentSecurityPolicy(),

    // HSTS (HTTP Strict Transport Security)
    // Forces HTTPS for 2 years, include subdomains
    'Strict-Transport-Security': isDevelopment
      ? 'max-age=0'
      : 'max-age=63072000; includeSubDomains; preload',

    // Prevent clickjacking
    'X-Frame-Options': 'DENY',

    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',

    // XSS Protection (legacy but still useful)
    'X-XSS-Protection': '1; mode=block',

    // Referrer Policy
    // Send full URL for same-origin, only origin for cross-origin
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Permissions Policy (formerly Feature Policy)
    // Restrict access to browser features
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  };
}

/**
 * Apply security headers to Next.js response
 */
export function applySecurityHeaders(headers: Headers): void {
  const securityHeaders = getSecurityHeaders();

  Object.entries(securityHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
}

/**
 * Security headers middleware for API routes
 */
export function securityHeadersMiddleware(handler: Function) {
  return async (request: Request) => {
    const response = await handler(request);

    // Add security headers
    const securityHeaders = getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  };
}

/**
 * Next.js middleware configuration
 * Add this to middleware.ts
 */
export const SECURITY_HEADERS_CONFIG = {
  headers: Object.entries(getSecurityHeaders()).map(([key, value]) => ({
    key,
    value,
  })),
};

/**
 * CSP violation reporting endpoint
 * Implement this to collect CSP violations
 */
export const CSP_REPORT_CONFIG = {
  'report-uri': '/api/security/csp-report',
  'report-to': 'csp-endpoint',
};

/**
 * Validate security headers on startup
 */
export function validateSecurityHeaders(): void {
  const headers = getSecurityHeaders();

  // Check critical headers are present
  const criticalHeaders = [
    'Content-Security-Policy',
    'Strict-Transport-Security',
    'X-Frame-Options',
  ];

  const missing = criticalHeaders.filter((header) => !headers[header]);

  if (missing.length > 0) {
    console.error('❌ Missing critical security headers:', missing);
    throw new Error('Security headers validation failed');
  }

  // Warn about development-specific configurations
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '⚠️  Running in development mode. Some security headers are relaxed.'
    );
  }

  console.log('✅ Security headers configured');
}

/**
 * CSP Nonce generation for inline scripts
 * Use this to allow specific inline scripts while maintaining CSP
 */
export function generateCSPNonce(): string {
  if (typeof crypto === 'undefined') {
    // Fallback for environments without crypto API
    return Buffer.from(Math.random().toString()).toString('base64');
  }

  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString('base64');
}

/**
 * Add nonce to CSP header
 */
export function addNonceToCSP(csp: string, nonce: string): string {
  return csp.replace(
    /script-src ([^;]*)/,
    `script-src $1 'nonce-${nonce}'`
  );
}
