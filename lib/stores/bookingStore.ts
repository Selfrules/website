import { create } from 'zustand';
import type { BookingDetails, BookingStep, TimeSlot } from '@/types/integrations';

interface BookingStore {
  // State
  currentStep: BookingStep;
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  bookingDetails: Partial<BookingDetails>;

  // Actions
  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  setSelectedDate: (date: Date) => void;
  setSelectedSlot: (slot: TimeSlot) => void;
  setBookingDetails: (details: Partial<BookingDetails>) => void;
  resetBooking: () => void;
}

const STEP_ORDER: BookingStep[] = ['date', 'time', 'details', 'confirmation'];

export const useBookingStore = create<BookingStore>((set, get) => ({
  // Initial state
  currentStep: 'date',
  selectedDate: null,
  selectedSlot: null,
  bookingDetails: {},

  // Actions
  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    const nextIndex = Math.min(currentIndex + 1, STEP_ORDER.length - 1);
    set({ currentStep: STEP_ORDER[nextIndex] });
  },

  previousStep: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    const prevIndex = Math.max(currentIndex - 1, 0);
    set({ currentStep: STEP_ORDER[prevIndex] });
  },

  setSelectedDate: (date) => set({ selectedDate: date }),

  setSelectedSlot: (slot) => set({ selectedSlot: slot }),

  setBookingDetails: (details) =>
    set((state) => ({
      bookingDetails: { ...state.bookingDetails, ...details },
    })),

  resetBooking: () =>
    set({
      currentStep: 'date',
      selectedDate: null,
      selectedSlot: null,
      bookingDetails: {},
    }),
}));
