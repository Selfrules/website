'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { cn } from '@/lib/utils';

export function CalendarPicker() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { selectedDate, setSelectedDate, nextStep } = useBookingStore();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleContinue = () => {
    if (selectedDate) {
      nextStep();
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  const isPastDate = (date: Date) => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className={cn(
            'p-2 rounded-lg border-3 border-black',
            'bg-white hover:bg-gray-100',
            'transition-colors'
          )}
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h3 className="font-bold text-lg">
            {currentMonth.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>
        </div>

        <button
          onClick={nextMonth}
          className={cn(
            'p-2 rounded-lg border-3 border-black',
            'bg-white hover:bg-gray-100',
            'transition-colors'
          )}
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-bold text-black/60 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            i + 1
          );
          const isPast = isPastDate(date);
          const isWeekendDay = isWeekend(date);
          const isSelected =
            selectedDate?.toDateString() === date.toDateString();

          return (
            <motion.button
              key={i}
              onClick={() => !isPast && !isWeekendDay && handleDateSelect(date)}
              disabled={isPast || isWeekendDay}
              className={cn(
                'aspect-square rounded-lg border-3 border-black',
                'flex items-center justify-center',
                'font-bold text-sm transition-all',
                'hover:scale-105 active:scale-95',
                isSelected &&
                  'bg-purple-primary text-white shadow-[4px_4px_0px_#000000]',
                !isSelected && !isPast && !isWeekendDay && 'bg-white hover:bg-yellow-primary',
                (isPast || isWeekendDay) &&
                  'bg-gray-100 text-black/30 cursor-not-allowed border-black/20'
              )}
              whileHover={
                !isPast && !isWeekendDay
                  ? { y: -2, boxShadow: '6px 6px 0px #000000' }
                  : {}
              }
            >
              {i + 1}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 rounded-lg border-3 border-black bg-yellow-primary"
        >
          <p className="text-sm font-bold">Selected date:</p>
          <p className="text-lg">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-black bg-white" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-black/20 bg-gray-100" />
          <span className="text-black/60">Past/Weekend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-black bg-purple-primary" />
          <span>Selected</span>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!selectedDate}
        className={cn(
          'w-full py-3 px-6 rounded-lg',
          'bg-purple-primary text-white font-bold',
          'border-4 border-black',
          'shadow-[8px_8px_0px_#000000]',
          'transition-all',
          'hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'disabled:hover:shadow-[8px_8px_0px_#000000] disabled:hover:translate-x-0 disabled:hover:translate-y-0'
        )}
      >
        Continue to Time Selection
      </button>
    </motion.div>
  );
}

// Helper functions
function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}
