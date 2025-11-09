'use client';

import { CheckCircle, Calendar, Clock, Mail, Phone, Download } from 'lucide-react';

interface BookingConfirmationProps {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
  onClose: () => void;
}

/**
 * BookingConfirmation - Success message after booking
 *
 * Features:
 * - Booking details display
 * - Calendar invite download
 * - Email confirmation info
 * - Neobrutalist success styling
 */
export default function BookingConfirmation({
  bookingId,
  name,
  email,
  phone,
  date,
  startTime,
  endTime,
  notes,
  onClose,
}: BookingConfirmationProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDownloadICS = () => {
    // Generate ICS file content
    const event = new Date(date);
    const startDateTime = new Date(
      event.toDateString() + ' ' + startTime
    );
    const endDateTime = new Date(event.toDateString() + ' ' + endTime);

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mattia Filippo De Luca//Calendar Booking//EN
BEGIN:VEVENT
UID:${bookingId}@mattiacintura.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Meeting con Mattia Filippo De Luca
DESCRIPTION:${notes || 'Meeting prenotato tramite il sito web'}
LOCATION:Google Meet (link ricevuto via email)
ORGANIZER:mailto:mattia@mattiacintura.com
ATTENDEE;CN=${name}:mailto:${email}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking-${bookingId}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-brutal-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000000]">
      {/* Success icon and header */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-green-400">
          <CheckCircle className="h-10 w-10 text-black" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-black">
          Prenotazione confermata!
        </h3>
        <p className="mt-2 text-gray-600">
          Ti abbiamo inviato una email di conferma con tutti i dettagli
        </p>
      </div>

      {/* Booking details */}
      <div className="space-y-4 rounded-lg border-2 border-black bg-primary/10 p-4">
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-black" />
          <div>
            <p className="text-sm font-semibold text-black">Data</p>
            <p className="capitalize text-gray-700">{formatDate(date)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-black" />
          <div>
            <p className="text-sm font-semibold text-black">Orario</p>
            <p className="text-gray-700">
              {startTime} - {endTime}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-black" />
          <div>
            <p className="text-sm font-semibold text-black">Email</p>
            <p className="text-gray-700">{email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-black" />
          <div>
            <p className="text-sm font-semibold text-black">Telefono</p>
            <p className="text-gray-700">{phone}</p>
          </div>
        </div>

        {notes && (
          <div className="flex items-start gap-3 border-t-2 border-black/10 pt-4">
            <div>
              <p className="text-sm font-semibold text-black">Note</p>
              <p className="text-gray-700">{notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Booking ID */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          ID Prenotazione: <span className="font-mono font-semibold">{bookingId}</span>
        </p>
      </div>

      {/* Action buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleDownloadICS}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-6 py-3 font-semibold text-black transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Download className="h-5 w-5" />
          Aggiungi al calendario
        </button>

        <button
          onClick={onClose}
          className="w-full rounded-lg border-2 border-black bg-primary px-6 py-3 font-semibold text-black transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Torna alla home
        </button>
      </div>

      {/* Additional info */}
      <div className="mt-6 rounded-lg border-2 border-black bg-gray-50 p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Cosa succede ora?</span>
          <br />
          • Riceverai una email di conferma con il link per il meeting
          <br />
          • Un promemoria 24 ore prima dell&apos;appuntamento
          <br />
          • Puoi cancellare o riprogrammare usando il link nell&apos;email
        </p>
      </div>
    </div>
  );
}
