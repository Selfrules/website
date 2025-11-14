'use client';

import { motion } from 'framer-motion';
import { Clock, ChevronLeft, Loader2 } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { useAvailableSlots } from '@/lib/hooks/useCalendar';
import { cn } from '@/lib/utils';
import type { TimeSlot } from '@/types/integrations';

export function TimeSlotGrid() {
  const { selectedDate, selectedSlot, setSelectedSlot, previousStep, nextStep } =
    useBookingStore();

  const { data: slotsData, isLoading, isError } = useAvailableSlots(selectedDate);

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleContinue = () => {
    if (selectedSlot) {
      nextStep();
    }
  };

  if (!selectedDate) {
    return (
      <div className="text-center py-8">
        <p className="text-black/60">No date selected</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-sm text-black/60">Loading available time slots...</p>
      </motion.div>
    );
  }

  if (isError || !slotsData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="p-4 rounded-lg border-3 border-red-500 bg-red-50 mb-4">
          <p className="font-bold text-red-700">Failed to load time slots</p>
          <p className="text-sm text-red-600 mt-1">Please try again later</p>
        </div>
        <button
          onClick={previousStep}
          className={cn(
            'px-6 py-2 rounded-lg',
            'bg-white border-3 border-black',
            'hover:bg-gray-100 transition-colors'
          )}
        >
          Back to Date Selection
        </button>
      </motion.div>
    );
  }

  const availableSlots = slotsData.slots.filter((slot) => slot.available);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Date Header */}
      <div className="mb-6 p-4 rounded-lg border-3 border-black bg-primary">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5" />
          <h3 className="font-bold text-lg">Select a time slot</h3>
        </div>
        <p className="text-sm">
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Time Slots Grid */}
      {availableSlots.length === 0 ? (
        <div className="text-center py-8 mb-6">
          <p className="text-lg font-bold mb-2">No available slots</p>
          <p className="text-sm text-black/60">
            Please select a different date
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {slotsData.slots.map((slot, index) => {
            const startTime = new Date(slot.start).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });
            const endTime = new Date(slot.end).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });

            const isSelected =
              selectedSlot?.start === slot.start &&
              selectedSlot?.end === slot.end;

            return (
              <motion.button
                key={index}
                onClick={() => handleSlotSelect(slot)}
                disabled={!slot.available}
                className={cn(
                  'min-h-[44px] p-3 rounded-lg',
                  'border-3 border-black',
                  'font-bold text-sm transition-all',
                  'hover:scale-105 active:scale-95',
                  isSelected &&
                    'bg-purple-primary text-white shadow-brutal-sm',
                  !isSelected &&
                    slot.available &&
                    'bg-white hover:bg-primary',
                  !slot.available &&
                    'bg-gray-100 text-black/30 cursor-not-allowed border-black/20 line-through'
                )}
                whileHover={
                  slot.available
                    ? { y: -2, boxShadow: '6px 6px 0px #000000' }
                    : {}
                }
              >
                {startTime} - {endTime}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Selected Slot Display */}
      {selectedSlot && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg border-3 border-black bg-purple-primary/10"
        >
          <p className="text-sm font-bold mb-1">Selected time:</p>
          <p className="text-lg">
            {new Date(selectedSlot.start).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}{' '}
            -{' '}
            {new Date(selectedSlot.end).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={previousStep}
          className={cn(
            'px-6 py-3 rounded-lg',
            'bg-white border-3 border-black',
            'font-bold',
            'hover:bg-gray-100 transition-colors',
            'flex items-center gap-2'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={!selectedSlot}
          className={cn(
            'flex-1 py-3 px-6 rounded-lg',
            'bg-purple-primary text-white font-bold',
            'border-4 border-black',
            'shadow-brutal',
            'transition-all',
            'hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'disabled:hover:shadow-brutal disabled:hover:translate-x-0 disabled:hover:translate-y-0'
          )}
        >
          Continue to Details
        </button>
      </div>
    </motion.div>
  );
}
