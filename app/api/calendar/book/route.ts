/**
 * Calendar Booking API Route - FIREBASE VERSION
 * Creates a new calendar booking
 * Migrated from Prisma to Firestore
 */

import { NextRequest, NextResponse } from 'next/server';
import { createCalendarEvent } from '@/lib/api/google-calendar';
import {
  COLLECTIONS,
  CalendarBooking,
  queryDocumentsAdmin,
  createDocumentAdmin,
} from '@/lib/firebase';
import { createBookingSchema, bookingRateLimiter } from '@/lib/security';
import { handleApiError, formatSuccessResponse, ConflictError } from '@/lib/utils/errors';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { addMinutes, parseISO } from 'date-fns';
import { Timestamp } from 'firebase-admin/firestore';
import { nanoid } from 'nanoid';

/**
 * POST /api/calendar/book
 * Create a new booking
 */
export async function POST(req: NextRequest) {
  try {
    await bookingRateLimiter.checkLimit(req);

    const body = await req.json();
    const validatedData = createBookingSchema.parse(body);

    const requestedDateTime = parseISO(validatedData.dateTime);
    const endDateTime = addMinutes(requestedDateTime, validatedData.duration);

    // Check if the requested time is in the past
    if (requestedDateTime < new Date()) {
      throw new ConflictError('Cannot book a time in the past');
    }

    // Check if the slot is available in database
    const existingBookings = await queryDocumentsAdmin<CalendarBooking>(
      COLLECTIONS.CALENDAR_BOOKINGS,
      [
        { field: 'dateTime', operator: '==', value: Timestamp.fromDate(requestedDateTime) },
        { field: 'status', operator: 'in', value: ['pending', 'confirmed'] },
      ],
      undefined,
      'desc',
      1
    );

    if (existingBookings.length > 0) {
      throw new ConflictError('This time slot is already booked');
    }

    // Create Google Calendar event
    const calendarEvent = await createCalendarEvent(
      `${validatedData.type.charAt(0).toUpperCase() + validatedData.type.slice(1)} with ${validatedData.name}`,
      `Booking Type: ${validatedData.type}\n\nNotes from ${validatedData.name}:\n${validatedData.notes || 'No additional notes'}\n\nContact: ${validatedData.email}${validatedData.phone ? `\nPhone: ${validatedData.phone}` : ''}`,
      requestedDateTime,
      endDateTime,
      validatedData.email
    );

    // Create booking in database
    const booking = await createDocumentAdmin<CalendarBooking>(
      COLLECTIONS.CALENDAR_BOOKINGS,
      {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        dateTime: Timestamp.fromDate(requestedDateTime),
        duration: validatedData.duration,
        type: validatedData.type,
        notes: validatedData.notes,
        status: 'confirmed',
        googleEventId: calendarEvent.id,
        reminderSent: false,
        metadata: {
          conferenceLink: calendarEvent.conferenceLink,
          createdVia: 'website',
          userAgent: req.headers.get('user-agent'),
        },
      }
    );

    const response = NextResponse.json(
      formatSuccessResponse(
        {
          booking: {
            id: booking.id,
            name: booking.name,
            email: booking.email,
            dateTime: booking.dateTime,
            duration: booking.duration,
            type: booking.type,
            status: booking.status,
            conferenceLink: calendarEvent.conferenceLink,
          },
        },
        'Booking created successfully. Check your email for confirmation.'
      ),
      { status: 201 }
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
