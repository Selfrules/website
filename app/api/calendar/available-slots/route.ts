/**
 * Calendar Available Slots API Route
 * Returns available booking slots for a date range
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/api/google-calendar';
import { handleApiError, formatSuccessResponse, ValidationError } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/security';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { addDays, parseISO, isValid } from 'date-fns';
import { z } from 'zod';

const availableSlotsSchema = z.object({
  startDate: z.string().datetime('Invalid start date format'),
  endDate: z.string().datetime().optional(),
  timezone: z.string().default('Europe/Rome'),
  days: z.number().int().positive().max(30).default(7),
});

/**
 * GET /api/calendar/available-slots
 * Query params: startDate, endDate (optional), timezone (optional), days (optional)
 */
export async function GET(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    const { searchParams } = new URL(req.url);
    const params = {
      startDate: searchParams.get('startDate') || new Date().toISOString(),
      endDate: searchParams.get('endDate') || undefined,
      timezone: searchParams.get('timezone') || 'Europe/Rome',
      days: parseInt(searchParams.get('days') || '7'),
    };

    const validatedParams = availableSlotsSchema.parse(params);

    // Parse dates
    const startDate = parseISO(validatedParams.startDate);
    if (!isValid(startDate)) {
      throw new ValidationError('Invalid start date');
    }

    let endDate: Date;
    if (validatedParams.endDate) {
      endDate = parseISO(validatedParams.endDate);
      if (!isValid(endDate)) {
        throw new ValidationError('Invalid end date');
      }
    } else {
      endDate = addDays(startDate, validatedParams.days);
    }

    // Ensure start date is not in the past
    const now = new Date();
    if (startDate < now) {
      throw new ValidationError('Start date cannot be in the past');
    }

    // Fetch available slots
    const slots = await getAvailableSlots(startDate, endDate, validatedParams.timezone);

    const response = NextResponse.json(
      formatSuccessResponse(
        { slots, count: slots.length },
        'Available slots retrieved successfully'
      ),
      { status: 200 }
    );

    // Cache for 5 minutes
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate');

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, req);
}
