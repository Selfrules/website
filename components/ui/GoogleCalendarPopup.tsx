'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GoogleCalendarPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoogleCalendarPopup({ isOpen, onClose }: GoogleCalendarPopupProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus close button when modal opens (accessibility)
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setIsLoading(true);
      setHasError(false);
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

  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe reload
    const iframe = document.querySelector('#calendar-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-brutal-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Google Calendar - Prenota un appuntamento"
        >
          {/* Backdrop/Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            data-testid="calendar-popup-overlay"
            aria-label="Chiudi popup"
          />

          {/* Modal - Centered with Flexbox */}
          <motion.div
            ref={modalRef}
            className="relative bg-white border-brutal shadow-brutal-lg rounded-brutal w-full max-w-[800px] h-[90vh] max-h-[700px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            data-testid="calendar-popup"
          >
            {/* Floating Close Button - Top Right */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="group absolute top-brutal-md right-brutal-md z-20 p-brutal-sm bg-white border-brutal shadow-brutal rounded-brutal
                         hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1
                         transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-electric-blue"
              aria-label="Chiudi calendario"
            >
              <X className="w-6 h-6 text-black group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
            </button>

            {/* Content Area - Full Height */}
            <div className="relative w-full h-full bg-white">
              {/* Loading State */}
              {isLoading && !hasError && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-cream z-10"
                  role="status"
                  aria-live="polite"
                >
                  <Loader2 className="w-12 h-12 text-electric-blue animate-spin mb-brutal-md" strokeWidth={3} />
                  <p className="text-body text-black font-medium">
                    Caricamento calendario...
                  </p>
                </div>
              )}

              {/* Error State */}
              {hasError && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-brutal-lg bg-cream z-10"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="border-brutal border-4 border-neon-pink bg-white p-brutal-lg rounded-brutal shadow-brutal max-w-md text-center">
                    <h3 className="text-h4 font-heading text-black mb-brutal-sm">
                      Oops! Qualcosa è andato storto
                    </h3>
                    <p className="text-body text-black mb-brutal-md">
                      Non riesco a caricare il calendario. Controlla la tua connessione e riprova.
                    </p>
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-2 px-brutal-md py-brutal-sm
                                 bg-electric-blue text-white font-heading border-brutal
                                 shadow-brutal rounded-brutal hover:shadow-brutal-hover
                                 hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200
                                 focus:outline-none focus:ring-4 focus:ring-electric-blue"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Riprova
                    </button>
                  </div>
                </div>
              )}

              {/* Google Calendar iframe */}
              <iframe
                id="calendar-iframe"
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2o-5L_7Zfq9aiQIN-euWoqcCltK9bJn_SDa_5XFZHm5OOPXtPCQsramR2k5Memd5_N2DZslh5v?gv=true"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                title="Google Calendar Appointment Scheduling"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                aria-label="Widget di prenotazione Google Calendar"
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
