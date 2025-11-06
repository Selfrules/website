/**
 * Google Calendar API Integration
 * Handles calendar operations for booking system
 */

import { google, calendar_v3 } from 'googleapis';
import { addMinutes, format, startOfDay, endOfDay, isWithinInterval, parseISO } from 'date-fns';

const BUSINESS_HOURS_START = 9; // 9 AM
const BUSINESS_HOURS_END = 18; // 6 PM
const SLOT_DURATION = 30; // minutes
const TIMEZONE = 'Europe/Rome'; // Mattia's timezone

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: string;
  end: string;
  attendees?: string[];
  conferenceLink?: string;
}

interface AvailableSlot {
  start: string;
  end: string;
  duration: number;
}

/**
 * Get authenticated Google Calendar client
 */
function getCalendarClient(): calendar_v3.Calendar {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // Set refresh token for server-to-server auth
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

/**
 * Get available time slots for a date range
 */
export async function getAvailableSlots(
  startDate: Date,
  endDate: Date,
  timezone: string = TIMEZONE
): Promise<AvailableSlot[]> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    // Fetch existing events in the date range
    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: timezone,
    });

    const existingEvents = response.data.items || [];
    const availableSlots: AvailableSlot[] = [];

    // Generate all possible slots within business hours
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayStart = startOfDay(currentDate);
      const dayEnd = endOfDay(currentDate);

      // Generate slots for this day
      for (let hour = BUSINESS_HOURS_START; hour < BUSINESS_HOURS_END; hour++) {
        for (let minute = 0; minute < 60; minute += SLOT_DURATION) {
          const slotStart = new Date(currentDate);
          slotStart.setHours(hour, minute, 0, 0);
          const slotEnd = addMinutes(slotStart, SLOT_DURATION);

          // Check if slot is in the future
          if (slotStart < new Date()) continue;

          // Check if slot conflicts with existing events
          const hasConflict = existingEvents.some((event) => {
            if (!event.start?.dateTime || !event.end?.dateTime) return false;

            const eventStart = parseISO(event.start.dateTime);
            const eventEnd = parseISO(event.end.dateTime);

            return (
              isWithinInterval(slotStart, { start: eventStart, end: eventEnd }) ||
              isWithinInterval(slotEnd, { start: eventStart, end: eventEnd }) ||
              (slotStart <= eventStart && slotEnd >= eventEnd)
            );
          });

          if (!hasConflict) {
            availableSlots.push({
              start: slotStart.toISOString(),
              end: slotEnd.toISOString(),
              duration: SLOT_DURATION,
            });
          }
        }
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);
    }

    return availableSlots;
  } catch (error) {
    console.error('Google Calendar availability error:', error);
    throw new Error('Failed to fetch available slots');
  }
}

/**
 * Create a calendar event (booking)
 */
export async function createCalendarEvent(
  summary: string,
  description: string,
  startTime: Date,
  endTime: Date,
  attendeeEmail: string,
  timezone: string = TIMEZONE
): Promise<CalendarEvent> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const event: calendar_v3.Schema$Event = {
      summary,
      description,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: timezone,
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: timezone,
      },
      attendees: [{ email: attendeeEmail }],
      conferenceData: {
        createRequest: {
          requestId: `booking-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'email', minutes: 60 }, // 1 hour before
          { method: 'popup', minutes: 10 }, // 10 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: event,
    });

    const createdEvent = response.data;

    return {
      id: createdEvent.id!,
      summary: createdEvent.summary!,
      description: createdEvent.description || undefined,
      start: createdEvent.start!.dateTime!,
      end: createdEvent.end!.dateTime!,
      attendees: createdEvent.attendees?.map((a) => a.email!) || [],
      conferenceLink: createdEvent.hangoutLink || createdEvent.conferenceData?.entryPoints?.[0]?.uri || undefined,
    };
  } catch (error) {
    console.error('Google Calendar create event error:', error);
    throw new Error('Failed to create calendar event');
  }
}

/**
 * Cancel a calendar event
 */
export async function cancelCalendarEvent(eventId: string): Promise<void> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'all',
    });
  } catch (error) {
    console.error('Google Calendar cancel event error:', error);
    throw new Error('Failed to cancel calendar event');
  }
}

/**
 * Update a calendar event
 */
export async function updateCalendarEvent(
  eventId: string,
  updates: Partial<calendar_v3.Schema$Event>
): Promise<CalendarEvent> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const response = await calendar.events.patch({
      calendarId,
      eventId,
      sendUpdates: 'all',
      requestBody: updates,
    });

    const updatedEvent = response.data;

    return {
      id: updatedEvent.id!,
      summary: updatedEvent.summary!,
      description: updatedEvent.description || undefined,
      start: updatedEvent.start!.dateTime!,
      end: updatedEvent.end!.dateTime!,
      attendees: updatedEvent.attendees?.map((a) => a.email!) || [],
      conferenceLink: updatedEvent.hangoutLink || updatedEvent.conferenceData?.entryPoints?.[0]?.uri || undefined,
    };
  } catch (error) {
    console.error('Google Calendar update event error:', error);
    throw new Error('Failed to update calendar event');
  }
}
