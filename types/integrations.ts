// Integration Widgets Types

// Chat Widget Types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatStreamResponse {
  content: string;
  done: boolean;
  error?: string;
}

// Spotify Widget Types
export interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  spotifyUrl: string;
  isPlaying: boolean;
}

export interface SpotifyError {
  message: string;
  retryable: boolean;
}

// Calendar Widget Types
export interface TimeSlot {
  start: string; // ISO datetime
  end: string;   // ISO datetime
  available: boolean;
}

export interface BookingDetails {
  name: string;
  email: string;
  reason: string;
  slot: TimeSlot;
}

export interface BookingConfirmation {
  id: string;
  calendarEventId: string;
  googleMeetLink?: string;
  icsDownloadUrl: string;
}

export interface AvailableSlotsResponse {
  date: string;
  slots: TimeSlot[];
}

export type BookingStep = 'date' | 'time' | 'details' | 'confirmation';
