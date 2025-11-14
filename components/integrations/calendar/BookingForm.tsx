'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, User, Mail, MessageSquare, Loader2 } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { useBooking } from '@/lib/hooks/useCalendar';
import { cn } from '@/lib/utils';
import type { BookingDetails } from '@/types/integrations';

const bookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  reason: z
    .string()
    .min(10, 'Please provide at least 10 characters')
    .max(500, 'Reason must be less than 500 characters'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const { selectedDate, selectedSlot, previousStep, nextStep, setBookingDetails } =
    useBookingStore();

  const { mutate: createBooking, isPending, isError, error } = useBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    if (!selectedSlot) return;

    const bookingDetails: BookingDetails = {
      ...data,
      slot: selectedSlot,
    };

    createBooking(bookingDetails, {
      onSuccess: (confirmation) => {
        setBookingDetails({ ...bookingDetails });
        nextStep();
      },
    });
  };

  if (!selectedDate || !selectedSlot) {
    return (
      <div className="text-center py-8">
        <p className="text-black/60">No date or time selected</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Booking Summary */}
      <div className="mb-6 p-4 rounded-lg border-3 border-black bg-primary">
        <h3 className="font-bold text-lg mb-2">Your booking</h3>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-bold">Date:</span>{' '}
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <p>
            <span className="font-bold">Time:</span>{' '}
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
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            <User className="w-4 h-4 inline mr-1" />
            Full name
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="John Doe"
            className={cn(
              'w-full px-4 py-3 rounded-lg',
              'border-3 border-black',
              'text-[#0A0A0A]',
              'focus:outline-none focus:ring-2 focus:ring-purple-primary',
              errors.name && 'border-red-500'
            )}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            <Mail className="w-4 h-4 inline mr-1" />
            Email address
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="john@example.com"
            className={cn(
              'w-full px-4 py-3 rounded-lg',
              'border-3 border-black',
              'text-[#0A0A0A]',
              'focus:outline-none focus:ring-2 focus:ring-purple-primary',
              errors.email && 'border-red-500'
            )}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Reason Field */}
        <div>
          <label className="block text-sm font-bold mb-2" htmlFor="reason">
            <MessageSquare className="w-4 h-4 inline mr-1" />
            Reason for meeting
          </label>
          <textarea
            {...register('reason')}
            id="reason"
            placeholder="Tell me briefly what you'd like to discuss..."
            rows={4}
            className={cn(
              'w-full px-4 py-3 rounded-lg',
              'border-3 border-black',
              'text-[#0A0A0A]',
              'focus:outline-none focus:ring-2 focus:ring-purple-primary',
              'resize-none',
              errors.reason && 'border-red-500'
            )}
          />
          {errors.reason && (
            <p className="text-red-600 text-sm mt-1">{errors.reason.message}</p>
          )}
          <p className="text-xs text-black/60 mt-1">
            {register('reason').name && '10-500 characters'}
          </p>
        </div>

        {/* Error Message */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border-3 border-red-500 bg-red-50"
          >
            <p className="font-bold text-red-700">Booking failed</p>
            <p className="text-sm text-red-600 mt-1">
              {error?.message || 'Please try again later'}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={previousStep}
            disabled={isPending}
            className={cn(
              'px-6 py-3 rounded-lg',
              'bg-white border-3 border-black',
              'font-bold',
              'hover:bg-gray-100 transition-colors',
              'flex items-center gap-2',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="submit"
            disabled={isPending}
            className={cn(
              'flex-1 py-3 px-6 rounded-lg',
              'bg-purple-primary text-white font-bold',
              'border-4 border-black',
              'shadow-brutal',
              'transition-all',
              'hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'disabled:hover:shadow-brutal disabled:hover:translate-x-0 disabled:hover:translate-y-0',
              'flex items-center justify-center gap-2'
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Booking...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </div>
      </form>

      {/* Privacy Notice */}
      <p className="text-xs text-black/60 text-center">
        Your information will only be used for this booking and won&apos;t be shared
        with third parties.
      </p>
    </motion.div>
  );
}
