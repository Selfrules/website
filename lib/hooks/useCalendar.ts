import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  AvailableSlotsResponse,
  BookingDetails,
  BookingConfirmation,
} from '@/types/integrations';

export function useAvailableSlots(date: Date | null) {
  return useQuery<AvailableSlotsResponse>({
    queryKey: ['calendar', 'slots', date?.toISOString()],
    queryFn: async () => {
      if (!date) throw new Error('No date selected');

      const response = await fetch(
        `/api/calendar/slots?date=${date.toISOString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }

      return response.json();
    },
    enabled: !!date, // Only fetch when date is selected
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBooking() {
  const queryClient = useQueryClient();

  return useMutation<BookingConfirmation, Error, BookingDetails>({
    mutationFn: async (details) => {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create booking');
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      // Invalidate slots for the booked date
      queryClient.invalidateQueries({
        queryKey: ['calendar', 'slots', variables.slot.start],
      });
    },
  });
}
