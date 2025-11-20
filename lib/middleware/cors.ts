/**
 * CORS middleware configuration
 * Handles cross-origin requests with secure defaults
 */

import { NextRequest, NextResponse } from 'next/server';

export interface CorsConfig {
  allowedOrigins?: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

export interface CorsOptions extends CorsConfig {}

const defaultOptions: CorsConfig = {
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Client-ID', 'X-Requested-With'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

/**
 * Check if origin is allowed based on CORS configuration
 * SECURITY: Strict validation - no wildcards in production
 */
export function isOriginAllowed(origin: string | null, config: CorsConfig): boolean {
  if (!origin) return false;

  const allowedOrigins = config.allowedOrigins || [];

  // Warn if wildcard detected
  if (allowedOrigins.includes('*')) {
    console.warn('[SECURITY WARNING] CORS wildcard (*) detected in ALLOWED_ORIGINS. This is insecure!');

    // Allow in development only
    if (process.env.NODE_ENV !== 'production') {
      return true;
    } else {
      // Block wildcard in production
      console.error('[SECURITY ERROR] CORS wildcard not allowed in production!');
      return false;
    }
  }

  // Check explicit origin list
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Development: Only allow specific localhost ports
  if (process.env.NODE_ENV === 'development') {
    const allowedDevOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ];

    if (allowedDevOrigins.includes(origin)) {
      return true;
    }
  }

  // Log rejected origins for monitoring
  console.warn(`[CORS] Rejected origin: ${origin}`);
  return false;
}

/**
 * Log CORS events for monitoring and security auditing
 */
export function logCorsEvent(
  origin: string | null,
  allowed: boolean,
  endpoint: string
) {
  const event = {
    timestamp: new Date().toISOString(),
    origin,
    allowed,
    endpoint,
    environment: process.env.NODE_ENV,
  };

  if (!allowed) {
    // Log rejected CORS attempts (potential attack)
    console.warn('[CORS REJECTED]', JSON.stringify(event));

    // TODO: Send to monitoring service (Sentry, DataDog, etc.)
    // await sendToMonitoring('cors_rejection', event);
  } else if (process.env.NODE_ENV === 'development') {
    // Log allowed requests in dev for debugging
    console.log('[CORS ALLOWED]', JSON.stringify(event));
  }
}

/**
 * Add CORS headers to Response
 * SECURITY: Uses strict origin validation (no wildcards)
 *
 * @param response - The response to add CORS headers to
 * @param req - The incoming request
 * @param config - Optional CORS configuration (defaults to env vars)
 * @returns Response with CORS headers added
 */
export function addCorsHeaders(
  response: Response,
  req: NextRequest,
  config?: CorsConfig
): Response {
  const origin = req.headers.get('origin');
  const endpoint = req.nextUrl.pathname;
  const corsConfig = config || defaultOptions;

  // Validate origin
  const allowed = isOriginAllowed(origin, corsConfig);

  // Log CORS event
  logCorsEvent(origin, allowed, endpoint);

  if (!allowed) {
    // Don't set CORS headers for disallowed origins
    return response;
  }

  // Set CORS headers for allowed origin
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', origin!);

  if (corsConfig.credentials) {
    headers.set('Access-Control-Allow-Credentials', 'true');
  }

  if (corsConfig.allowedMethods) {
    headers.set('Access-Control-Allow-Methods', corsConfig.allowedMethods.join(', '));
  }

  if (corsConfig.allowedHeaders) {
    headers.set('Access-Control-Allow-Headers', corsConfig.allowedHeaders.join(', '));
  }

  if (corsConfig.exposedHeaders && corsConfig.exposedHeaders.length > 0) {
    headers.set('Access-Control-Expose-Headers', corsConfig.exposedHeaders.join(', '));
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * CORS middleware configuration function (for Next.js middleware)
 * @deprecated Use addCorsHeaders() instead for better control
 */
export function configureCors(options: CorsOptions = {}): (req: NextRequest) => NextResponse {
  const config = { ...defaultOptions, ...options };

  return (req: NextRequest): NextResponse => {
    const origin = req.headers.get('origin') || '';
    const allowed = isOriginAllowed(origin, config);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      const response = new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Methods': config.allowedMethods!.join(', '),
          'Access-Control-Allow-Headers': config.allowedHeaders!.join(', '),
          'Access-Control-Max-Age': config.maxAge!.toString(),
        },
      });

      if (allowed) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Credentials', config.credentials!.toString());
      }

      return response;
    }

    // Return null to allow request to continue
    return NextResponse.next();
  };
}
