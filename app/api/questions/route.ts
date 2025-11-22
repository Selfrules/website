/**
 * Questions API Route - FIREBASE VERSION
 * Handles anonymous question submissions for "Ask Me Anything"
 * Migrated from Prisma to Firestore
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  COLLECTIONS,
  Question,
  queryDocumentsAdmin,
  createDocumentAdmin,
} from '@/lib/firebase';
import { handleApiError, formatSuccessResponse, ValidationError } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/security';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

const createQuestionSchema = z.object({
  name: z.string().max(100).nullable().optional(),
  email: z.string().email().max(255).nullable().optional(),
  question: z.string().min(10, 'Question must be at least 10 characters').max(1000),
});

/**
 * POST /api/questions
 * Submit a new anonymous question
 */
export async function POST(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    const body = await req.json();
    const validatedData = createQuestionSchema.parse(body);

    // Get session ID from cookie or header
    const sessionId = req.cookies.get('session_id')?.value || req.headers.get('x-session-id') || undefined;

    // Create question
    const question = await createDocumentAdmin<Question>(
      COLLECTIONS.QUESTIONS,
      {
        name: validatedData.name || undefined,
        email: validatedData.email || undefined,
        question: validatedData.question,
        sessionId,
        status: 'pending',
        metadata: {
          userAgent: req.headers.get('user-agent'),
          referrer: req.headers.get('referer'),
        },
      }
    );

    const response = NextResponse.json(
      formatSuccessResponse(
        {
          question: {
            id: question.id,
            createdAt: question.createdAt,
          },
        },
        'Question submitted successfully'
      ),
      { status: 201 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * GET /api/questions
 * Get questions (admin only - will be protected later)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'pending';
    const limit = parseInt(searchParams.get('limit') || '20');

    const questions = await queryDocumentsAdmin<Question>(
      COLLECTIONS.QUESTIONS,
      [{ field: 'status', operator: '==', value: status }],
      'createdAt',
      'desc',
      limit
    );

    const response = NextResponse.json(
      formatSuccessResponse(
        {
          questions,
          count: questions.length,
        },
        'Questions retrieved successfully'
      ),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, req);
}
