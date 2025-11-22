/**
 * Calendar Booking API Routes - FIREBASE VERSION
 * Handles consultation booking management
 * Migrated from Prisma to Firestore
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  COLLECTIONS,
  CalendarBooking,
  queryDocumentsAdmin,
  createDocumentAdmin,
  updateDocumentAdmin,
  countDocumentsAdmin,
  getDocumentAdmin,
} from '@/lib/firebase';
import { createBookingSchema, getBookingsSchema, updateBookingSchema, bookingRateLimiter, apiRateLimiter } from '@/lib/security';
import { handleApiError, formatSuccessResponse, NotFoundError, ConflictError } from '@/lib/utils/errors';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { Timestamp } from 'firebase-admin/firestore';
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

    // Build Firestore filters
    const filters: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: any }> = [];
    if (validatedParams.status) {
      filters.push({ field: 'status', operator: '==', value: validatedParams.status });
    }
    if (validatedParams.type) {
      filters.push({ field: 'type', operator: '==', value: validatedParams.type });
    }

    if (validatedParams.startDate) {
      filters.push({
        field: 'dateTime',
        operator: '>=',
        value: Timestamp.fromDate(new Date(validatedParams.startDate)),
      });
    }
    if (validatedParams.endDate) {
      filters.push({
        field: 'dateTime',
        operator: '<=',
        value: Timestamp.fromDate(new Date(validatedParams.endDate)),
      });
    }

    const [bookings, total] = await Promise.all([
      queryDocumentsAdmin<CalendarBooking>(
        COLLECTIONS.CALENDAR_BOOKINGS,
        filters,
        'dateTime',
        'asc',
        validatedParams.limit
      ),
      countDocumentsAdmin(COLLECTIONS.CALENDAR_BOOKINGS, filters),
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

    const requestedDateTime = Timestamp.fromDate(new Date(validatedData.dateTime));

    // Check if the slot is available
    const existingBookings = await queryDocumentsAdmin<CalendarBooking>(
      COLLECTIONS.CALENDAR_BOOKINGS,
      [
        { field: 'dateTime', operator: '==', value: requestedDateTime },
        { field: 'status', operator: 'in', value: ['pending', 'confirmed'] },
      ],
      undefined,
      'desc',
      1
    );

    if (existingBookings.length > 0) {
      throw new ConflictError('This time slot is already booked');
    }

    // Check if the requested time is in the past
    if (requestedDateTime.toDate() < new Date()) {
      throw new ConflictError('Cannot book a time in the past');
    }

    // Create booking
    const booking = await createDocumentAdmin<CalendarBooking>(
      COLLECTIONS.CALENDAR_BOOKINGS,
      {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        dateTime: requestedDateTime,
        duration: validatedData.duration,
        type: validatedData.type,
        notes: validatedData.notes,
        metadata: validatedData.metadata,
        status: 'pending',
        reminderSent: false,
      }
    );

    // Send confirmation emails (non-blocking)
    // Don't await - send in background to avoid delaying response
    import('@/lib/email/notifications').then(({ sendBookingConfirmation, sendAdminBookingNotification }) => {
      sendBookingConfirmation(booking).catch((err) =>
        console.error('Failed to send booking confirmation:', err)
      );
      sendAdminBookingNotification(booking).catch((err) =>
        console.error('Failed to send admin notification:', err)
      );
    });

    // TODO: Create Google Calendar event (requires OAuth flow setup)

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

    const { dateTime, ...otherFields } = validatedData;
    const updatePayload: Partial<CalendarBooking> = {
      ...otherFields,
    };

    if (dateTime) {
      updatePayload.dateTime = Timestamp.fromDate(new Date(dateTime));
    }

    await updateDocumentAdmin<CalendarBooking>(
      COLLECTIONS.CALENDAR_BOOKINGS,
      bookingId,
      updatePayload
    );

    const booking = await getDocumentAdmin<CalendarBooking>(
      COLLECTIONS.CALENDAR_BOOKINGS,
      bookingId
    );

    if (!booking) {
      throw new NotFoundError('Booking');
    }

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
