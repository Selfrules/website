'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';

// TypeScript definitions for Google Calendar API
declare global {
  interface Window {
    calendar?: {
      schedulingButton: {
        load: (config: {
          url: string;
          color: string;
          label: string;
          target: HTMLElement;
        }) => void;
      };
    };
  }
}

interface GoogleCalendarWidgetProps {
  className?: string;
}

/**
 * GoogleCalendarWidget - Official Google Calendar appointment scheduling widget
 *
 * Features:
 * - Direct integration with Google Calendar scheduling
 * - i18n support for button labels
 * - Neobrutalist design system integration
 * - Automatic script loading with cleanup
 *
 * Configuration:
 * - URL: Pre-configured scheduling link from Google Calendar
 * - Color: Primary Electric Blue (#1E90FF) from design system
 * - Label: i18n-aware (IT: "Fissa un appuntamento", EN: "Book an appointment")
 */
export default function GoogleCalendarWidget({ className = '' }: GoogleCalendarWidgetProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  // Localized labels
  const labels = {
    it: 'Fissa un appuntamento',
    en: 'Book an appointment',
  };

  const label = labels[locale as keyof typeof labels] || labels.it;

  useEffect(() => {
    // Load CSS
    const link = document.createElement('link');
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    link.rel = 'stylesheet';
    link.id = 'google-calendar-widget-css';
    document.head.appendChild(link);

    // Load JavaScript
    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    script.id = 'google-calendar-widget-js';

    script.onload = () => {
      if (window.calendar && targetRef.current) {
        try {
          window.calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2o-5L_7Zfq9aiQIN-euWoqcCltK9bJn_SDa_5XFZHm5OOPXtPCQsramR2k5Memd5_N2DZslh5v?gv=true',
            color: '#1E90FF', // Primary Electric Blue from design system
            label: label,
            target: targetRef.current,
          });
        } catch (error) {
          console.error('Error loading Google Calendar widget:', error);
        }
      }
    };

    script.onerror = () => {
      console.error('Failed to load Google Calendar script');
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingLink = document.getElementById('google-calendar-widget-css');
      const existingScript = document.getElementById('google-calendar-widget-js');

      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink);
      }

      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [label]);

  return (
    <div className={className}>
      {/* Neobrutalist wrapper for design system consistency */}
      <div className="rounded-brutal-lg border-4 border-black bg-white p-8 shadow-[8px_8px_0px_#000000] transition-all hover:shadow-[12px_12px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Calendar Icon */}
          <div className="rounded-full border-3 border-black bg-primary p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Description Text */}
          <div className="text-center">
            <h3 className="font-heading text-xl font-bold text-black mb-2">
              {locale === 'it' ? 'Scegli data e orario' : 'Choose date and time'}
            </h3>
            <p className="text-sm text-gray-600 max-w-md">
              {locale === 'it'
                ? 'Seleziona il momento migliore per te. Riceverai una conferma via email.'
                : 'Select the best time for you. You will receive an email confirmation.'}
            </p>
          </div>

          {/* Google Calendar Button Target */}
          <div ref={targetRef} className="w-full flex justify-center" />

          {/* Loading fallback */}
          {!targetRef.current && (
            <div className="text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-black border-t-primary" />
              <p className="mt-2 text-sm text-gray-600">
                {locale === 'it' ? 'Caricamento calendario...' : 'Loading calendar...'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Timezone notice */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          {locale === 'it'
            ? 'Gli orari sono visualizzati nel tuo fuso orario locale'
            : 'Times are displayed in your local timezone'}
        </p>
      </div>
    </div>
  );
}
