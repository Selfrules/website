'use client';

import { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Calendar } from 'lucide-react';

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

interface BookingFormProps {
  date: Date | null;
  slot: TimeSlot | null;
  onSubmit: (data: BookingData) => Promise<void>;
  onCancel: () => void;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  notes: string;
  date: string;
  startTime: string;
  endTime: string;
}

/**
 * BookingForm - Collect user information for booking
 *
 * Features:
 * - Form validation
 * - Loading state
 * - Error handling
 * - Neobrutalist styling
 */
export default function BookingForm({
  date,
  slot,
  onSubmit,
  onCancel,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Il telefono è obbligatorio';
    } else if (!/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = 'Inserisci un numero di telefono valido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !slot) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        date: date.toISOString(),
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({
        submit: 'Si è verificato un errore. Riprova più tardi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (!date || !slot) {
    return null;
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
      <div className="mb-6">
        <h3 className="font-heading text-2xl font-bold text-black">
          Completa la prenotazione
        </h3>
        <div className="mt-3 flex items-center gap-2 rounded-lg border-2 border-black bg-primary/10 p-3">
          <Calendar className="h-5 w-5 text-black" />
          <div className="text-sm">
            <p className="font-semibold capitalize">{formatDate(date)}</p>
            <p className="text-gray-600">
              {slot.startTime} - {slot.endTime}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name field */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-black"
          >
            <User className="h-4 w-4" />
            Nome completo *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-md border-3 px-4 py-3 text-sm text-[#0A0A0A] transition-all focus:outline-none placeholder:text-gray-500 placeholder:opacity-70
              ${
                errors.name
                  ? 'border-red-600 bg-red-50 shadow-[3px_3px_0_#dc2626] focus:border-red-600 focus:shadow-[5px_5px_0_#dc2626]'
                  : 'border-black bg-white shadow-[3px_3px_0_#000] focus:border-primary focus:shadow-[5px_5px_0_#1E90FF]'
              }
            `}
            placeholder="Mario Rossi"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-black"
          >
            <Mail className="h-4 w-4" />
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-md border-3 px-4 py-3 text-sm text-[#0A0A0A] transition-all focus:outline-none placeholder:text-gray-500 placeholder:opacity-70
              ${
                errors.email
                  ? 'border-red-600 bg-red-50 shadow-[3px_3px_0_#dc2626] focus:border-red-600 focus:shadow-[5px_5px_0_#dc2626]'
                  : 'border-black bg-white shadow-[3px_3px_0_#000] focus:border-primary focus:shadow-[5px_5px_0_#1E90FF]'
              }
            `}
            placeholder="mario.rossi@email.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-black"
          >
            <Phone className="h-4 w-4" />
            Telefono *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-md border-3 px-4 py-3 text-sm text-[#0A0A0A] transition-all focus:outline-none placeholder:text-gray-500 placeholder:opacity-70
              ${
                errors.phone
                  ? 'border-red-600 bg-red-50 shadow-[3px_3px_0_#dc2626] focus:border-red-600 focus:shadow-[5px_5px_0_#dc2626]'
                  : 'border-black bg-white shadow-[3px_3px_0_#000] focus:border-primary focus:shadow-[5px_5px_0_#1E90FF]'
              }
            `}
            placeholder="+39 333 1234567"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Notes field */}
        <div>
          <label
            htmlFor="notes"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-black"
          >
            <MessageSquare className="h-4 w-4" />
            Note (opzionale)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full resize-vertical rounded-md border-3 border-black bg-white px-4 py-3 text-sm text-[#0A0A0A] shadow-[3px_3px_0_#000] placeholder:text-gray-500 placeholder:opacity-70 transition-all focus:outline-none focus:border-primary focus:shadow-[5px_5px_0_#1E90FF]"
            placeholder="Dimmi brevemente cosa vorresti discutere..."
            disabled={isSubmitting}
          />
        </div>

        {/* Submit error */}
        {errors.submit && (
          <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 rounded-lg border-2 border-black bg-white px-6 py-3 font-semibold text-black transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-md border-4 border-black bg-primary px-6 py-3 font-semibold text-white shadow-[4px_4px_0_#000] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#000]"
          >
            {isSubmitting ? 'Prenotazione in corso...' : 'Conferma prenotazione'}
          </button>
        </div>
      </form>
    </div>
  );
}
