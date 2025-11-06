'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Download, ExternalLink, RotateCcw } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { cn } from '@/lib/utils';

export function BookingConfirmation() {
  const { selectedDate, selectedSlot, bookingDetails, resetBooking } =
    useBookingStore();

  if (!selectedDate || !selectedSlot || !bookingDetails.name) {
    return (
      <div className="text-center py-8">
        <p className="text-black/60">No booking information available</p>
      </div>
    );
  }

  const handleNewBooking = () => {
    resetBooking();
  };

  // Mock confirmation data (replace with actual API response)
  const confirmationData = {
    id: 'BOOK-' + Math.random().toString(36).substring(7).toUpperCase(),
    googleMeetLink: 'https://meet.google.com/xxx-yyyy-zzz',
    icsDownloadUrl: '/api/calendar/ics?id=123',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-24 h-24 mx-auto bg-green-500 rounded-full border-4 border-black flex items-center justify-center shadow-brutal">
          <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-2">Booking confirmed!</h2>
        <p className="text-black/60 mb-6">
          Your meeting has been scheduled successfully
        </p>
      </motion.div>

      {/* Booking Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 p-6 rounded-lg border-4 border-black bg-yellow-primary text-left"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5" />
          <h3 className="font-bold text-lg">Meeting details</h3>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-black/60 mb-1">Confirmation ID</p>
            <p className="font-mono font-bold">{confirmationData.id}</p>
          </div>

          <div className="border-t-2 border-black/20 pt-3">
            <p className="text-xs text-black/60 mb-1">Attendee</p>
            <p className="font-bold">{bookingDetails.name}</p>
            <p className="text-sm text-black/70">{bookingDetails.email}</p>
          </div>

          <div className="border-t-2 border-black/20 pt-3">
            <p className="text-xs text-black/60 mb-1">Date & Time</p>
            <p className="font-bold">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className="text-sm">
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

          {bookingDetails.reason && (
            <div className="border-t-2 border-black/20 pt-3">
              <p className="text-xs text-black/60 mb-1">Meeting purpose</p>
              <p className="text-sm">{bookingDetails.reason}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        {/* Google Meet Link */}
        {confirmationData.googleMeetLink && (
          <a
            href={confirmationData.googleMeetLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'w-full py-3 px-6 rounded-lg',
              'bg-purple-primary text-white font-bold',
              'border-4 border-black',
              'shadow-[8px_8px_0px_#000000]',
              'transition-all',
              'hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px]',
              'flex items-center justify-center gap-2',
              'inline-flex'
            )}
          >
            <ExternalLink className="w-5 h-5" />
            Join Google Meet
          </a>
        )}

        {/* Download Calendar Invite */}
        <a
          href={confirmationData.icsDownloadUrl}
          download
          className={cn(
            'w-full py-3 px-6 rounded-lg',
            'bg-white text-black font-bold',
            'border-3 border-black',
            'hover:bg-gray-100',
            'transition-colors',
            'flex items-center justify-center gap-2',
            'inline-flex'
          )}
        >
          <Download className="w-5 h-5" />
          Add to Calendar
        </a>

        {/* New Booking Button */}
        <button
          onClick={handleNewBooking}
          className={cn(
            'w-full py-3 px-6 rounded-lg',
            'bg-white text-black font-bold',
            'border-3 border-black',
            'hover:bg-gray-100',
            'transition-colors',
            'flex items-center justify-center gap-2'
          )}
        >
          <RotateCcw className="w-5 h-5" />
          Book Another Meeting
        </button>
      </motion.div>

      {/* Email Confirmation Notice */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-black/60 mt-6"
      >
        A confirmation email with meeting details has been sent to{' '}
        <span className="font-bold">{bookingDetails.email}</span>
      </motion.p>
    </motion.div>
  );
}
