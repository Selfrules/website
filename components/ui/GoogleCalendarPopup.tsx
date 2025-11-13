'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GoogleCalendarPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoogleCalendarPopup({ isOpen, onClose }: GoogleCalendarPopupProps) {
  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop/Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            data-testid="calendar-popup-overlay"
          />

          {/* Modal - Centered with Flexbox */}
          <motion.div
            className="relative bg-white border-4 border-[#000] rounded-lg shadow-brutal w-full max-w-[800px] h-[90vh] max-h-[700px] flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            data-testid="calendar-popup"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b-4 border-[#000] bg-[#FFFCF2]">
              <h2 className="text-h3 md:text-h2 text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Fissa un appuntamento
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#FFD60A] border-2 border-[#000] rounded transition-all hover:-translate-y-0.5"
                aria-label="Chiudi"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Google Calendar iframe */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2o-5L_7Zfq9aiQIN-euWoqcCltK9bJn_SDa_5XFZHm5OOPXtPCQsramR2k5Memd5_N2DZslh5v?gv=true"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                title="Google Calendar Appointment Scheduling"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to use the Google Calendar popup
export function useGoogleCalendar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const openCalendar = () => setIsOpen(true);
  const closeCalendar = () => setIsOpen(false);

  return {
    isOpen,
    openCalendar,
    closeCalendar,
  };
}
