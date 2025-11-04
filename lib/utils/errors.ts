/**
 * Error handling utilities
 * Provides consistent error responses and error classes
 */

import { ZodError } from 'zod';
import { NextResponse } from 'next/server';

// Custom error classes
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(400, message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string = 'Resource') {
    super(404, `${resource} not found`, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized access') {
    super(401, message, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(403, message, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string = 'Too many requests') {
    super(429, message, 'RATE_LIMIT_EXCEEDED');
    this.name = 'RateLimitError';
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

// Error response formatter
export interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: any;
    timestamp: string;
  };
}

export function formatErrorResponse(error: unknown): ErrorResponse {
  const timestamp = new Date().toISOString();

  if (error instanceof ApiError) {
    return {
      error: {
        message: error.message,
        code: error.code,
        details: error.details,
        timestamp,
      },
    };
  }

  if (error instanceof ZodError) {
    return {
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
        timestamp,
      },
    };
  }

  if (error instanceof Error) {
    // Don't expose internal error messages in production
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message;

    return {
      error: {
        message,
        code: 'INTERNAL_ERROR',
        timestamp,
      },
    };
  }

  return {
    error: {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      timestamp,
    },
  };
}

// Error handler middleware wrapper
export function handleApiError(error: unknown): NextResponse {
  const errorResponse = formatErrorResponse(error);
  
  let statusCode = 500;
  
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
  } else if (error instanceof ZodError) {
    statusCode = 400;
  }

  // Log errors in development
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', error);
  }

  return NextResponse.json(errorResponse, { status: statusCode });
}

// Success response formatter
export interface SuccessResponse<T = any> {
  data: T;
  message?: string;
  meta?: {
    total?: number;
    limit?: number;
    offset?: number;
  };
}

export function formatSuccessResponse<T>(
  data: T,
  message?: string,
  meta?: SuccessResponse['meta']
): SuccessResponse<T> {
  const response: SuccessResponse<T> = { data };
  
  if (message) response.message = message;
  if (meta) response.meta = meta;
  
  return response;
}
