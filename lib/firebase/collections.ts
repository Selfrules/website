// Firestore Collections and TypeScript Types
// Based on the original Prisma schema

import { Timestamp, FieldValue } from 'firebase/firestore';

/**
 * Collection names as constants
 */
export const COLLECTIONS = {
  USERS: 'users',
  BLOG_POSTS: 'blog_posts',
  CHAT_CONVERSATIONS: 'chat_conversations',
  CALENDAR_BOOKINGS: 'calendar_bookings',
  ANALYTICS_EVENTS: 'analytics_events',
  NEWSLETTER_SUBSCRIPTIONS: 'newsletter_subscriptions',
  QUESTIONS: 'questions',
  CERTIFICATIONS: 'certifications',
  TESTIMONIALS: 'testimonials',
} as const;

/**
 * Base document interface with Firestore metadata
 */
export interface FirestoreDocument {
  id: string;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

/**
 * User model for authentication and preferences
 */
export interface User extends FirestoreDocument {
  email: string;
  name?: string;
  preferences?: Record<string, any>; // JSON object for user preferences
}

/**
 * Blog post model with markdown content
 */
export interface BlogPost extends FirestoreDocument {
  title: string;
  slug: string;
  content: string; // Full markdown content
  excerpt?: string; // Short summary
  category: string; // Design, Dev, Product, Personal, AMA
  locale: string; // 'en' or 'it'
  coverImage?: string; // URL to cover image
  readingTime?: number; // Estimated reading time in minutes
  published: boolean;
  publishedAt?: Timestamp | FieldValue;
  metadata?: Record<string, any>; // SEO metadata, tags, etc.
}

/**
 * Chat message structure
 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp | FieldValue;
}

/**
 * Chat conversation with AI chatbot
 */
export interface ChatConversation extends FirestoreDocument {
  userId?: string; // Optional for anonymous users
  sessionId: string; // Browser session identifier
  messages: ChatMessage[]; // Array of messages
  category?: string; // lead, networking, curious (auto-categorized)
  sentiment?: string; // positive, neutral, negative
  metadata?: Record<string, any>; // Additional context
}

/**
 * Calendar booking for consultation calls
 */
export interface CalendarBooking extends FirestoreDocument {
  userId?: string; // Optional user reference
  name: string;
  email: string;
  phone?: string;
  dateTime: Timestamp | FieldValue; // Scheduled date and time
  duration: number; // Duration in minutes (default: 60)
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: string; // consultation, brainstorming, mentorship
  notes?: string; // User notes/context
  adminNotes?: string; // Admin-only notes
  googleEventId?: string; // Google Calendar event ID
  reminderSent: boolean;
  metadata?: Record<string, any>; // Additional context
}

/**
 * Analytics event tracking
 */
export interface AnalyticsEvent extends FirestoreDocument {
  userId?: string; // Optional user reference
  sessionId: string; // Browser session identifier
  eventType: string; // page_view, button_click, form_submit, etc.
  eventName: string; // Descriptive name like "hero_cta_clicked"
  page?: string; // Page where event occurred
  metadata?: Record<string, any>; // Event-specific data
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
  timestamp: Timestamp | FieldValue;
}

/**
 * Newsletter subscription
 */
export interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed';
  source?: string; // Where they subscribed from
  preferences?: Record<string, any>; // Email preferences
  subscribedAt: Timestamp | FieldValue;
  unsubscribedAt?: Timestamp | FieldValue;
}

/**
 * Anonymous question for "Ask Me Anything"
 */
export interface Question extends FirestoreDocument {
  name?: string; // Optional name (can be anonymous)
  email?: string; // Optional email for notification
  question: string; // The actual question
  category?: string; // Design, Dev, Product, Career, etc.
  status: 'pending' | 'answered' | 'archived';
  answeredAt?: Timestamp | FieldValue;
  blogPostId?: string; // Link to blog post if answered publicly
  sessionId?: string; // Browser session for analytics
  metadata?: Record<string, any>; // Additional context
}

/**
 * Certification and credential
 */
export interface Certification extends FirestoreDocument {
  title: string; // e.g., "Certified Scrum Product Owner"
  issuer: string; // e.g., "Scrum Alliance"
  issueDate: Timestamp | FieldValue;
  expiryDate?: Timestamp | FieldValue;
  credentialId?: string; // Verification ID
  credentialUrl?: string; // Verification link
  description?: string; // Description or achievements
  skills?: string[]; // Array of related skills
  logo?: string; // URL to issuer logo
  displayOrder: number;
  visible: boolean;
  blockchain?: string; // Blockchain verification data
  metadata?: Record<string, any>; // Additional data
}

/**
 * Testimonial and recommendation
 */
export interface Testimonial extends FirestoreDocument {
  name: string; // Person's name
  role: string; // e.g., "CEO at Company"
  company?: string;
  avatar?: string; // URL to avatar image
  content: string; // Testimonial text
  rating?: number; // Optional 1-5 rating
  relationship?: string; // e.g., "worked together", "client", "mentor"
  projectContext?: string; // What project/context this relates to
  verified: boolean; // Verification status
  linkedinUrl?: string; // LinkedIn profile for verification
  displayOrder: number;
  visible: boolean;
  featured: boolean; // Show on homepage
  locale: string; // 'en' or 'it'
  givenAt?: Timestamp | FieldValue; // When the testimonial was given
  metadata?: Record<string, any>; // Additional data
}

/**
 * Helper type for creating new documents (without id, createdAt, updatedAt)
 */
export type CreateDocument<T extends FirestoreDocument> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Helper type for updating documents (all fields optional except id)
 */
export type UpdateDocument<T extends FirestoreDocument> = Partial<Omit<T, 'id' | 'createdAt'>> & { id: string };
