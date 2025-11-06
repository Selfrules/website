/**
 * API Audit Logger Middleware
 * Logs all API requests for security and monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export interface AuditLogData {
  endpoint: string;
  method: string;
  statusCode: number;
  ipAddress?: string;
  userAgent?: string;
  userId?: string;
  sessionId?: string;
  duration?: number;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

/**
 * Log API request to database
 */
export async function logApiRequest(data: AuditLogData): Promise<void> {
  try {
    // Only log in production or if explicitly enabled
    if (process.env.NODE_ENV === 'development' && process.env.ENABLE_AUDIT_LOGS !== 'true') {
      return;
    }

    await prisma.$executeRaw`
      INSERT INTO api_audit_logs (
        id, endpoint, method, statusCode, ipAddress, userAgent,
        userId, sessionId, duration, errorMessage, metadata, timestamp
      ) VALUES (
        ${generateId()},
        ${data.endpoint},
        ${data.method},
        ${data.statusCode},
        ${data.ipAddress},
        ${data.userAgent},
        ${data.userId},
        ${data.sessionId},
        ${data.duration},
        ${data.errorMessage},
        ${data.metadata ? JSON.stringify(data.metadata) : null},
        ${new Date()}
      )
    `;
  } catch (error) {
    // Don't fail the request if audit logging fails
    console.error('Audit logging error:', error);
  }
}

/**
 * Extract audit data from request
 */
export function extractAuditData(
  req: NextRequest,
  response: NextResponse,
  startTime: number
): Omit<AuditLogData, 'userId' | 'sessionId'> {
  const forwarded = req.headers.get('x-forwarded-for');
  const ipAddress = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || undefined;

  return {
    endpoint: new URL(req.url).pathname,
    method: req.method,
    statusCode: response.status,
    ipAddress,
    userAgent,
    duration: Date.now() - startTime,
  };
}

/**
 * Audit logging middleware wrapper
 */
export function withAuditLog() {
  return async (
    req: NextRequest,
    handler: (req: NextRequest) => Promise<NextResponse>
  ): Promise<NextResponse> => {
    const startTime = Date.now();

    try {
      const response = await handler(req);
      const auditData = extractAuditData(req, response, startTime);

      // Log asynchronously without blocking response
      logApiRequest(auditData).catch(console.error);

      return response;
    } catch (error) {
      const errorResponse = NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );

      const auditData = extractAuditData(req, errorResponse, startTime);
      auditData.errorMessage = error instanceof Error ? error.message : 'Unknown error';

      logApiRequest(auditData).catch(console.error);

      throw error;
    }
  };
}

function generateId(): string {
  return `cuid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
