/**
 * CORS Configuration
 * Whitelist specific domains with proper preflight handling
 */

import type { CORSConfig } from '../types';

// Allowed origins for CORS
const ALLOWED_ORIGINS = {
  development: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
  ],
  staging: [
    'https://staging.mattia-portfolio.vercel.app',
    'https://preview.mattia-portfolio.vercel.app',
  ],
  production: [
    'https://mattia-portfolio.com',
    'https://www.mattia-portfolio.com',
  ],
};

/**
 * Get allowed origins based on environment
 */
export function getAllowedOrigins(): string[] {
  const env = (process.env.NODE_ENV || 'development') as string;

  switch (env) {
    case 'production':
      return ALLOWED_ORIGINS.production;
    case 'test':
    case 'staging':
      return [...ALLOWED_ORIGINS.staging, ...ALLOWED_ORIGINS.development];
    default:
      return ALLOWED_ORIGINS.development;
  }
}

/**
 * Default CORS configuration
 */
export const CORS_CONFIG: CORSConfig = {
  allowedOrigins: getAllowedOrigins(),
  allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-CSRF-Token',
    'Accept',
    'Accept-Language',
  ],
  exposedHeaders: [
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'Retry-After',
  ],
  credentials: true,
  maxAge: 86400, // 24 hours
};

/**
 * Check if origin is allowed
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;

  const allowedOrigins = getAllowedOrigins();

  // Exact match
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Allow all Vercel preview deployments in non-production
  if (
    process.env.NODE_ENV !== 'production' &&
    origin.match(/^https:\/\/.*\.vercel\.app$/)
  ) {
    return true;
  }

  return false;
}

/**
 * Get CORS headers for a request
 */
export function getCORSHeaders(origin: string | null): HeadersInit {
  if (!isOriginAllowed(origin)) {
    return {};
  }

  return {
    'Access-Control-Allow-Origin': origin!,
    'Access-Control-Allow-Methods': CORS_CONFIG.allowedMethods.join(', '),
    'Access-Control-Allow-Headers': CORS_CONFIG.allowedHeaders.join(', '),
    'Access-Control-Expose-Headers': CORS_CONFIG.exposedHeaders.join(', '),
    'Access-Control-Allow-Credentials': CORS_CONFIG.credentials.toString(),
    'Access-Control-Max-Age': CORS_CONFIG.maxAge.toString(),
  };
}

/**
 * Handle preflight OPTIONS request
 */
export function handlePreflight(origin: string | null): Response {
  if (!isOriginAllowed(origin)) {
    return new Response('Origin not allowed', { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: getCORSHeaders(origin),
  });
}

/**
 * CORS middleware for API routes
 */
export function corsMiddleware(handler: Function) {
  return async (request: Request) => {
    const origin = request.headers.get('origin');

    // Handle preflight request
    if (request.method === 'OPTIONS') {
      return handlePreflight(origin);
    }

    // Check origin for actual request
    if (!isOriginAllowed(origin)) {
      return new Response(
        JSON.stringify({
          error: 'Origin not allowed',
          message: 'CORS policy does not allow access from this origin',
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Execute handler and add CORS headers to response
    const response = await handler(request);
    const corsHeaders = getCORSHeaders(origin);

    // Add CORS headers to existing response
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  };
}

/**
 * Validate CORS configuration on startup
 */
export function validateCORSConfig(): void {
  const allowedOrigins = getAllowedOrigins();

  if (allowedOrigins.length === 0) {
    console.warn(
      '⚠️  No CORS origins configured. API will reject all cross-origin requests.'
    );
  }

  // Warn if production URLs are accessible in development
  if (
    process.env.NODE_ENV === 'development' &&
    allowedOrigins.some((origin) => origin.includes('mattia-portfolio.com'))
  ) {
    console.warn(
      '⚠️  Production URLs are allowed in development mode. This may cause security issues.'
    );
  }

  console.log('✅ CORS configured for origins:', allowedOrigins);
}
