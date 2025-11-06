/**
 * Calendar Cancellation API Route - FIREBASE VERSION
 * Cancels an existing booking
 * Migrated from Prisma to Firestore
 */

import { NextRequest, NextResponse } from 'next/server';
import { cancelCalendarEvent } from '@/lib/api/google-calendar';
import {
  COLLECTIONS,
  CalendarBooking,
  getDocumentAdmin,
  updateDocumentAdmin,
} from '@/lib/firebase';
import { handleApiError, formatSuccessResponse, NotFoundError, ValidationError } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { generateCancellationToken, verifyCancellationToken } from '@/lib/utils/token';
import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

const cancelBookingSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  cancellationToken: z.string().optional(),
  reason: z.string().max(500).optional(),
});

/**
 * DELETE /api/calendar/cancel
 * Cancel a booking
 */
export async function DELETE(req: NextRequest) {
  try {
    await apiRateLimiter.checkLimit(req);

    const body = await req.json();
    const validatedData = cancelBookingSchema.parse(body);

    // Find booking
    const booking = await getDocumentAdmin<CalendarBooking>(
      COLLECTIONS.CALENDAR_BOOKINGS,
      validatedData.bookingId
    );

    if (!booking) {
      throw new NotFoundError('Booking');
    }

    // Verify cancellation token if provided
    if (validatedData.cancellationToken) {
      const isValid = verifyCancellationToken(
        validatedData.bookingId,
        validatedData.cancellationToken
      );

      if (!isValid) {
        throw new ValidationError('Invalid cancellation token');
      }
    }

    // Check if already cancelled
    if (booking.status === 'cancelled') {
      throw new ValidationError('Booking is already cancelled');
    }

    // Cancel Google Calendar event
    if (booking.googleEventId) {
      try {
        await cancelCalendarEvent(booking.googleEventId);
      } catch (error) {
        console.error('Failed to cancel Google Calendar event:', error);
        // Continue with database update even if calendar cancellation fails
      }
    }

    // Update booking status
    await updateDocumentAdmin<CalendarBooking>(
      COLLECTIONS.CALENDAR_BOOKINGS,
      validatedData.bookingId,
      {
        status: 'cancelled',
        adminNotes: validatedData.reason
          ? `Cancelled by user. Reason: ${validatedData.reason}`
          : 'Cancelled by user',
      }
    );

    const cancelledBooking = await getDocumentAdmin<CalendarBooking>(
      COLLECTIONS.CALENDAR_BOOKINGS,
      validatedData.bookingId
    );

    if (!cancelledBooking) {
      throw new NotFoundError('Booking');
    }

    const response = NextResponse.json(
      formatSuccessResponse(
        {
          booking: {
            id: cancelledBooking.id,
            status: cancelledBooking.status,
            dateTime: cancelledBooking.dateTime,
          },
        },
        'Booking cancelled successfully'
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
