'use client';

import { useState, useEffect } from 'react';
import BookingCalendar from './BookingCalendar';
import TimeSlotPicker from './TimeSlotPicker';
import BookingForm, { BookingData } from './BookingForm';
import BookingConfirmation from './BookingConfirmation';

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

type BookingStep = 'calendar' | 'timeslot' | 'form' | 'confirmation';

interface BookingWidgetProps {
  locale?: string;
}

/**
 * BookingWidget - Main booking flow orchestrator
 *
 * Features:
 * - Multi-step booking flow
 * - Available slots fetching
 * - Booking submission
 * - Success confirmation
 */
export default function BookingWidget({ locale = 'it' }: BookingWidgetProps) {
  const [step, setStep] = useState<BookingStep>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  // Fetch available dates on mount
  useEffect(() => {
    fetchAvailableDates();
  }, []);

  // Fetch available slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableDates = async () => {
    try {
      // For now, set next 30 days as available (mock data)
      // In production, this would call /api/calendar/available-slots
      const dates: Date[] = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 1; i <= 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        // Skip weekends for now
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          dates.push(date);
        }
      }

      setAvailableDates(dates);
    } catch (error) {
      console.error('Error fetching available dates:', error);
    }
  };

  const fetchAvailableSlots = async (date: Date) => {
    setLoadingSlots(true);
    try {
      const response = await fetch(
        `/api/calendar/available-slots?date=${date.toISOString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch slots');
      }

      const data = await response.json();

      // Transform API response to component format
      const slots: TimeSlot[] = data.slots || [];
      setAvailableSlots(slots);

      // Move to timeslot step if we have slots
      if (slots.length > 0) {
        setStep('timeslot');
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      // Fallback: generate mock slots for demo
      const mockSlots: TimeSlot[] = [
        { startTime: '09:00', endTime: '10:00', available: true },
        { startTime: '10:00', endTime: '11:00', available: true },
        { startTime: '11:00', endTime: '12:00', available: false },
        { startTime: '14:00', endTime: '15:00', available: true },
        { startTime: '15:00', endTime: '16:00', available: true },
        { startTime: '16:00', endTime: '17:00', available: true },
      ];
      setAvailableSlots(mockSlots);
      setStep('timeslot');
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setStep('form');
  };

  const handleBookingSubmit = async (data: BookingData) => {
    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const result = await response.json();
      setBookingResult(result);
      setStep('confirmation');
    } catch (error) {
      console.error('Booking error:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    if (step === 'form') {
      setStep('timeslot');
      setSelectedSlot(null);
    } else if (step === 'timeslot') {
      setStep('calendar');
      setSelectedDate(null);
      setSelectedSlot(null);
    }
  };

  const handleReset = () => {
    setStep('calendar');
    setSelectedDate(null);
    setSelectedSlot(null);
    setBookingResult(null);
    setAvailableSlots([]);
  };

  return (
    <div className="w-full">
      {/* Progress indicator */}
      {step !== 'confirmation' && (
        <div className="mb-6 flex items-center justify-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-black font-semibold transition-colors ${
              step === 'calendar'
                ? 'bg-primary'
                : selectedDate
                ? 'bg-green-400'
                : 'bg-white'
            }`}
          >
            1
          </div>
          <div className="h-1 w-12 bg-black" />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-black font-semibold transition-colors ${
              step === 'timeslot'
                ? 'bg-primary'
                : selectedSlot
                ? 'bg-green-400'
                : 'bg-white'
            }`}
          >
            2
          </div>
          <div className="h-1 w-12 bg-black" />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-black font-semibold transition-colors ${
              step === 'form' ? 'bg-primary' : 'bg-white'
            }`}
          >
            3
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="space-y-6">
        {/* Calendar step */}
        {(step === 'calendar' || step === 'timeslot') && (
          <BookingCalendar
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            availableDates={availableDates}
          />
        )}

        {/* Timeslot step */}
        {(step === 'timeslot' || step === 'form') && (
          <TimeSlotPicker
            date={selectedDate}
            slots={availableSlots}
            selectedSlot={selectedSlot}
            onSlotSelect={handleSlotSelect}
            loading={loadingSlots}
          />
        )}

        {/* Form step */}
        {step === 'form' && (
          <BookingForm
            date={selectedDate}
            slot={selectedSlot}
            onSubmit={handleBookingSubmit}
            onCancel={handleCancel}
          />
        )}

        {/* Confirmation step */}
        {step === 'confirmation' && bookingResult && (
          <BookingConfirmation
            bookingId={bookingResult.bookingId || 'N/A'}
            name={bookingResult.name || ''}
            email={bookingResult.email || ''}
            phone={bookingResult.phone || ''}
            date={bookingResult.date || ''}
            startTime={bookingResult.startTime || ''}
            endTime={bookingResult.endTime || ''}
            notes={bookingResult.notes}
            onClose={handleReset}
          />
        )}
      </div>

      {/* Back button for non-form steps */}
      {step === 'timeslot' && (
        <div className="mt-6 text-center">
          <button
            onClick={handleCancel}
            className="text-sm font-semibold text-gray-600 underline transition-colors hover:text-black"
          >
            ← Cambia data
          </button>
        </div>
      )}
    </div>
  );
}
