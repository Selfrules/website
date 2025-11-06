/**
 * Calendar Booking API Tests
 */

import { NextRequest } from 'next/server';
import { POST as createBooking } from '../book/route';
import { DELETE as cancelBooking } from '../cancel/route';
import { GET as getAvailableSlots } from '../available-slots/route';
import prisma from '@/lib/db/prisma';
import * as googleCalendar from '@/lib/api/google-calendar';

// Mock dependencies
jest.mock('@/lib/db/prisma', () => ({
  __esModule: true,
  default: {
    calendarBooking: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock('@/lib/api/google-calendar', () => ({
  getAvailableSlots: jest.fn(),
  createCalendarEvent: jest.fn(),
  cancelCalendarEvent: jest.fn(),
}));

jest.mock('@/lib/middleware/rate-limit', () => ({
  bookingRateLimiter: {
    checkLimit: jest.fn().mockResolvedValue({ allowed: true, remaining: 4, resetTime: Date.now() + 300000 }),
  },
  apiRateLimiter: {
    checkLimit: jest.fn().mockResolvedValue({ allowed: true, remaining: 99, resetTime: Date.now() + 60000 }),
  },
}));

describe('Calendar API - Available Slots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return available slots', async () => {
    const mockGetAvailableSlots = googleCalendar.getAvailableSlots as jest.Mock;

    mockGetAvailableSlots.mockResolvedValue([
      {
        start: '2025-11-10T09:00:00.000Z',
        end: '2025-11-10T09:30:00.000Z',
        duration: 30,
      },
      {
        start: '2025-11-10T10:00:00.000Z',
        end: '2025-11-10T10:30:00.000Z',
        duration: 30,
      },
    ]);

    const request = new NextRequest(
      'http://localhost:3000/api/calendar/available-slots?startDate=2025-11-10T00:00:00.000Z&days=1'
    );

    const response = await getAvailableSlots(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.slots).toHaveLength(2);
    expect(data.data.count).toBe(2);
  });

  it('should reject past dates', async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const request = new NextRequest(
      `http://localhost:3000/api/calendar/available-slots?startDate=${pastDate.toISOString()}`
    );

    const response = await getAvailableSlots(request);
    expect(response.status).toBe(400);
  });
});

describe('Calendar API - Create Booking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a booking successfully', async () => {
    const mockPrismaFindFirst = prisma.calendarBooking.findFirst as jest.Mock;
    const mockPrismaCreate = prisma.calendarBooking.create as jest.Mock;
    const mockCreateCalendarEvent = googleCalendar.createCalendarEvent as jest.Mock;

    mockPrismaFindFirst.mockResolvedValue(null); // No existing booking

    mockCreateCalendarEvent.mockResolvedValue({
      id: 'gcal_event_123',
      summary: 'Consultation with John Doe',
      start: '2025-11-10T09:00:00.000Z',
      end: '2025-11-10T10:00:00.000Z',
      conferenceLink: 'https://meet.google.com/xyz',
    });

    mockPrismaCreate.mockResolvedValue({
      id: 'booking_123',
      name: 'John Doe',
      email: 'john@example.com',
      dateTime: new Date('2025-11-10T09:00:00.000Z'),
      duration: 60,
      type: 'consultation',
      status: 'confirmed',
      googleEventId: 'gcal_event_123',
    });

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const request = new NextRequest('http://localhost:3000/api/calendar/book', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        dateTime: futureDate.toISOString(),
        duration: 60,
        type: 'consultation',
        notes: 'Looking forward to discussing the project',
      }),
    });

    const response = await createBooking(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.data.booking.name).toBe('John Doe');
    expect(data.data.booking.status).toBe('confirmed');
    expect(mockCreateCalendarEvent).toHaveBeenCalled();
    expect(mockPrismaCreate).toHaveBeenCalled();
  });

  it('should reject booking for already taken slot', async () => {
    const mockPrismaFindFirst = prisma.calendarBooking.findFirst as jest.Mock;

    mockPrismaFindFirst.mockResolvedValue({
      id: 'existing_booking',
      status: 'confirmed',
    });

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const request = new NextRequest('http://localhost:3000/api/calendar/book', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Jane Smith',
        email: 'jane@example.com',
        dateTime: futureDate.toISOString(),
        duration: 60,
        type: 'consultation',
      }),
    });

    const response = await createBooking(request);
    expect(response.status).toBe(409);
  });

  it('should reject past date bookings', async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const request = new NextRequest('http://localhost:3000/api/calendar/book', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        dateTime: pastDate.toISOString(),
        duration: 60,
        type: 'consultation',
      }),
    });

    const response = await createBooking(request);
    expect(response.status).toBe(409);
  });

  it('should validate email format', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const request = new NextRequest('http://localhost:3000/api/calendar/book', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        dateTime: futureDate.toISOString(),
        duration: 60,
        type: 'consultation',
      }),
    });

    const response = await createBooking(request);
    expect(response.status).toBe(400);
  });
});

describe('Calendar API - Cancel Booking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should cancel a booking successfully', async () => {
    const mockPrismaFindUnique = prisma.calendarBooking.findUnique as jest.Mock;
    const mockPrismaUpdate = prisma.calendarBooking.update as jest.Mock;
    const mockCancelCalendarEvent = googleCalendar.cancelCalendarEvent as jest.Mock;

    mockPrismaFindUnique.mockResolvedValue({
      id: 'booking_123',
      status: 'confirmed',
      googleEventId: 'gcal_event_123',
    });

    mockCancelCalendarEvent.mockResolvedValue(undefined);

    mockPrismaUpdate.mockResolvedValue({
      id: 'booking_123',
      status: 'cancelled',
      dateTime: new Date('2025-11-10T09:00:00.000Z'),
    });

    const request = new NextRequest('http://localhost:3000/api/calendar/cancel', {
      method: 'DELETE',
      body: JSON.stringify({
        bookingId: 'booking_123',
        reason: 'Schedule conflict',
      }),
    });

    const response = await cancelBooking(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.booking.status).toBe('cancelled');
    expect(mockCancelCalendarEvent).toHaveBeenCalledWith('gcal_event_123');
    expect(mockPrismaUpdate).toHaveBeenCalled();
  });

  it('should return 404 for non-existent booking', async () => {
    const mockPrismaFindUnique = prisma.calendarBooking.findUnique as jest.Mock;

    mockPrismaFindUnique.mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/calendar/cancel', {
      method: 'DELETE',
      body: JSON.stringify({
        bookingId: 'non_existent',
      }),
    });

    const response = await cancelBooking(request);
    expect(response.status).toBe(404);
  });

  it('should reject cancelling already cancelled booking', async () => {
    const mockPrismaFindUnique = prisma.calendarBooking.findUnique as jest.Mock;

    mockPrismaFindUnique.mockResolvedValue({
      id: 'booking_123',
      status: 'cancelled',
    });

    const request = new NextRequest('http://localhost:3000/api/calendar/cancel', {
      method: 'DELETE',
      body: JSON.stringify({
        bookingId: 'booking_123',
      }),
    });

    const response = await cancelBooking(request);
    expect(response.status).toBe(400);
  });
});
