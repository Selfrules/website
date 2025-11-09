'use client';

import { Clock } from 'lucide-react';

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  date: Date | null;
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSlotSelect: (slot: TimeSlot) => void;
  loading?: boolean;
}

/**
 * TimeSlotPicker - Select available time slots
 *
 * Features:
 * - Grid layout for time slots
 * - Loading state
 * - Disabled state for unavailable slots
 * - Neobrutalist button styling
 */
export default function TimeSlotPicker({
  date,
  slots,
  selectedSlot,
  onSlotSelect,
  loading = false,
}: TimeSlotPickerProps) {
  if (!date) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-brutal-lg border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0px_#000000]">
        <div>
          <Clock className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg font-semibold text-black">
            Seleziona una data
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Scegli una data dal calendario per vedere gli orari disponibili
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-brutal-lg border-4 border-black bg-white p-8 shadow-[8px_8px_0px_#000000]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-black border-t-primary" />
          <p className="text-lg font-semibold text-black">Caricamento orari...</p>
        </div>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-brutal-lg border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0px_#000000]">
        <div>
          <Clock className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg font-semibold text-black">
            Nessun orario disponibile
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Prova a selezionare un&apos;altra data
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-brutal-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000000]">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Clock className="h-6 w-6 text-black" />
        <div>
          <h3 className="font-heading text-xl font-bold text-black">
            Scegli l&apos;orario
          </h3>
          <p className="text-sm text-gray-600 capitalize">{formatDate(date)}</p>
        </div>
      </div>

      {/* Time slots grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {slots.map((slot, index) => {
          const isSelected =
            selectedSlot?.startTime === slot.startTime &&
            selectedSlot?.endTime === slot.endTime;

          return (
            <button
              key={index}
              onClick={() => slot.available && onSlotSelect(slot)}
              disabled={!slot.available}
              className={`rounded-lg border-2 border-black px-4 py-3 text-center font-medium transition-all
                ${
                  isSelected
                    ? 'bg-primary shadow-[4px_4px_0px_#000000] translate-x-[-2px] translate-y-[-2px]'
                    : ''
                }
                ${
                  slot.available && !isSelected
                    ? 'bg-white hover:bg-primary/20 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000000]'
                    : ''
                }
                ${
                  !slot.available
                    ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 line-through'
                    : ''
                }
                focus:outline-none focus:ring-2 focus:ring-primary disabled:focus:ring-0
              `}
              aria-label={`${slot.startTime} to ${slot.endTime}`}
            >
              <div className="text-sm">
                {slot.startTime}
                <br />
                {slot.endTime}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected slot info */}
      {selectedSlot && (
        <div className="mt-6 rounded-lg border-2 border-black bg-primary/10 p-4">
          <p className="text-sm font-medium text-black">
            <span className="font-semibold">Orario selezionato:</span>{' '}
            {selectedSlot.startTime} - {selectedSlot.endTime}
          </p>
        </div>
      )}
    </div>
  );
}
