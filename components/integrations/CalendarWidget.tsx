'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { CalendarPicker } from './calendar/CalendarPicker';
import { TimeSlotGrid } from './calendar/TimeSlotGrid';
import { BookingForm } from './calendar/BookingForm';
import { BookingConfirmation } from './calendar/BookingConfirmation';
import { cn } from '@/lib/utils';

const STEPS = [
  { key: 'date', label: 'Select date', number: 1 },
  { key: 'time', label: 'Choose time', number: 2 },
  { key: 'details', label: 'Your details', number: 3 },
  { key: 'confirmation', label: 'Confirmed', number: 4 },
];

export function CalendarWidget() {
  const { currentStep } = useBookingStore();

  return (
    <div
      className={cn(
        'w-full max-w-2xl mx-auto',
        'border-4 border-black rounded-xl',
        'bg-white shadow-brutal',
        'overflow-hidden'
      )}
    >
      <StepIndicator />
      <div className="p-6">
        <AnimatePresence mode="wait">
          {currentStep === 'date' && <CalendarPicker key="date" />}
          {currentStep === 'time' && <TimeSlotGrid key="time" />}
          {currentStep === 'details' && <BookingForm key="details" />}
          {currentStep === 'confirmation' && <BookingConfirmation key="confirmation" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepIndicator() {
  const { currentStep } = useBookingStore();
  const currentStepNumber = STEPS.find((s) => s.key === currentStep)?.number || 1;

  return (
    <div className="bg-yellow-primary border-b-4 border-black p-4">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.key} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className={cn(
                  'w-10 h-10 rounded-full border-3 border-black',
                  'flex items-center justify-center',
                  'font-bold text-sm transition-colors',
                  step.number <= currentStepNumber
                    ? 'bg-purple-primary text-white'
                    : 'bg-white text-black/40'
                )}
                animate={{
                  scale: step.number === currentStepNumber ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {step.number}
              </motion.div>
            </div>

            {/* Connecting Line */}
            {index < STEPS.length - 1 && (
              <div className="flex-1 h-1 mx-2 bg-black/20 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-purple-primary"
                  initial={{ width: '0%' }}
                  animate={{
                    width: step.number < currentStepNumber ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Label */}
      <div className="mt-3 text-center">
        <p className="font-bold text-lg">
          {STEPS.find((s) => s.key === currentStep)?.label}
        </p>
        <p className="text-xs text-black/60 mt-1">
          Step {currentStepNumber} of {STEPS.length}
        </p>
      </div>
    </div>
  );
}
