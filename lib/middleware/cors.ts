/**
 * CORS middleware configuration
 * Handles cross-origin requests with secure defaults
 */

import { NextRequest, NextResponse } from 'next/server';

export interface CorsOptions {
  allowedOrigins?: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

const defaultOptions: CorsOptions = {
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Client-ID', 'X-Requested-With'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

export function configureCors(options: CorsOptions = {}): (req: NextRequest) => NextResponse {
  const config = { ...defaultOptions, ...options };

  return (req: NextRequest): NextResponse => {
    const origin = req.headers.get('origin') || '';
    const isAllowedOrigin = config.allowedOrigins?.includes(origin) ||
                            config.allowedOrigins?.includes('*') ||
                            (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost'));

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': isAllowedOrigin ? origin : config.allowedOrigins![0],
          'Access-Control-Allow-Methods': config.allowedMethods!.join(', '),
          'Access-Control-Allow-Headers': config.allowedHeaders!.join(', '),
          'Access-Control-Max-Age': config.maxAge!.toString(),
          'Access-Control-Allow-Credentials': config.credentials!.toString(),
        },
      });
    }

    // Return null to allow request to continue
    return new NextResponse(null);
  };
}

export function addCorsHeaders(
  response: NextResponse,
  req: NextRequest,
  options: CorsOptions = {}
): NextResponse {
  const config = { ...defaultOptions, ...options };
  const origin = req.headers.get('origin') || '';
  const isAllowedOrigin = config.allowedOrigins?.includes(origin) ||
                          config.allowedOrigins?.includes('*') ||
                          (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost'));

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', config.credentials!.toString());

    if (config.exposedHeaders && config.exposedHeaders.length > 0) {
      response.headers.set('Access-Control-Expose-Headers', config.exposedHeaders.join(', '));
    }
  }

  return response;
}
