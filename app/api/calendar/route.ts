/**
 * Calendar Booking API Routes
 * Handles consultation booking management
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { createBookingSchema, getBookingsSchema, updateBookingSchema } from '@/lib/validations/schemas';
import { handleApiError, formatSuccessResponse, NotFoundError, ConflictError } from '@/lib/utils/errors';
import { bookingRateLimiter, apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { nanoid } from 'nanoid';

/**
 * GET /api/calendar
 * Retrieve calendar bookings with filtering
 */
export async function GET(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    const { searchParams } = new URL(req.url);
    const params = {
      status: searchParams.get('status') || undefined,
      type: searchParams.get('type') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const validatedParams = getBookingsSchema.parse(params);

    // Build query filters
    const where: any = {};
    if (validatedParams.status) where.status = validatedParams.status;
    if (validatedParams.type) where.type = validatedParams.type;

    if (validatedParams.startDate || validatedParams.endDate) {
      where.dateTime = {};
      if (validatedParams.startDate) {
        where.dateTime.gte = new Date(validatedParams.startDate);
      }
      if (validatedParams.endDate) {
        where.dateTime.lte = new Date(validatedParams.endDate);
      }
    }

    const [bookings, total] = await Promise.all([
      prisma.calendarBooking.findMany({
        where,
        orderBy: { dateTime: 'asc' },
        take: validatedParams.limit,
        skip: validatedParams.offset,
        select: {
          id: true,
          name: true,
          email: true,
          dateTime: true,
          duration: true,
          status: true,
          type: true,
          notes: true,
          createdAt: true,
        },
      }),
      prisma.calendarBooking.count({ where }),
    ]);

    const response = NextResponse.json(
      formatSuccessResponse(bookings, undefined, {
        total,
        limit: validatedParams.limit,
        offset: validatedParams.offset,
      }),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/calendar
 * Create a new booking
 */
export async function POST(req: NextRequest) {
  try {
    await bookingRateLimiter.checkLimit(req);

    const body = await req.json();
    const validatedData = createBookingSchema.parse(body);

    const requestedDateTime = new Date(validatedData.dateTime);

    // Check if the slot is available
    const existingBooking = await prisma.calendarBooking.findFirst({
      where: {
        dateTime: requestedDateTime,
        status: {
          in: ['pending', 'confirmed'],
        },
      },
    });

    if (existingBooking) {
      throw new ConflictError('This time slot is already booked');
    }

    // Check if the requested time is in the past
    if (requestedDateTime < new Date()) {
      throw new ConflictError('Cannot book a time in the past');
    }

    // Create booking
    const booking = await prisma.calendarBooking.create({
      data: {
        ...validatedData,
        dateTime: requestedDateTime,
      },
    });

    // TODO: Send confirmation email
    // TODO: Create Google Calendar event

    const response = NextResponse.json(
      formatSuccessResponse(booking, 'Booking created successfully'),
      { status: 201 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * GET /api/calendar/availability
 * Check available time slots
 */
export async function PATCH(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    const body = await req.json();
    const { bookingId, ...updateData } = body;

    if (!bookingId) {
      throw new Error('Booking ID is required');
    }

    const validatedData = updateBookingSchema.parse(updateData);

    const booking = await prisma.calendarBooking.update({
      where: { id: bookingId },
      data: {
        ...validatedData,
        dateTime: validatedData.dateTime ? new Date(validatedData.dateTime) : undefined,
      },
    });

    const response = NextResponse.json(
      formatSuccessResponse(booking, 'Booking updated successfully'),
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
