'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  availableDates?: Date[];
}

/**
 * BookingCalendar - Date picker for calendar bookings
 *
 * Features:
 * - Month navigation
 * - Available date highlighting
 * - Neobrutalist styling
 * - Mobile-responsive
 */
export default function BookingCalendar({
  onDateSelect,
  selectedDate,
  availableDates = [],
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.toDateString() === date.toDateString()
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isDatePast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square p-2" />
      );
    }

    // Render days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isPast = isDatePast(date);
      const isAvailable = isDateAvailable(date);
      const isSelected = isDateSelected(date);

      days.push(
        <button
          key={day}
          onClick={() => !isPast && onDateSelect(date)}
          disabled={isPast || !isAvailable}
          className={`aspect-square p-2 text-sm font-medium transition-all rounded-lg border-2 border-black
            ${
              isSelected
                ? 'bg-primary shadow-[4px_4px_0px_#000000] translate-x-[-2px] translate-y-[-2px]'
                : ''
            }
            ${
              isAvailable && !isSelected
                ? 'bg-white hover:bg-primary/20 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000000]'
                : ''
            }
            ${
              isPast || !isAvailable
                ? 'opacity-30 cursor-not-allowed border-gray-300'
                : ''
            }
          `}
          aria-label={`${day} ${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-full rounded-brutal-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000000]">
      {/* Header with month navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={previousMonth}
          className="rounded-lg border-2 border-black p-2 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5 text-black" />
        </button>

        <h3 className="font-heading text-xl font-bold text-black">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={nextMonth}
          className="rounded-lg border-2 border-black p-2 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5 text-black" />
        </button>
      </div>

      {/* Day names */}
      <div className="mb-2 grid grid-cols-7 gap-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-black bg-primary" />
          <span className="text-gray-600">Selezionato</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-black bg-white" />
          <span className="text-gray-600">Disponibile</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-gray-300 bg-white opacity-30" />
          <span className="text-gray-600">Non disponibile</span>
        </div>
      </div>
    </div>
  );
}
