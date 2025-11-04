/**
 * Zod validation schemas for API endpoints
 * Ensures type safety and input validation across all routes
 */

import { z } from 'zod';

// Blog Post schemas
export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(500).optional(),
  category: z.enum(['Design', 'Dev', 'Product', 'Personal', 'AMA']),
  locale: z.enum(['en', 'it']).default('en'),
  coverImage: z.string().url().optional(),
  readingTime: z.number().int().positive().optional(),
  published: z.boolean().default(false),
  publishedAt: z.string().datetime().optional(),
  metadata: z.record(z.any()).optional(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export const getBlogPostsSchema = z.object({
  category: z.enum(['Design', 'Dev', 'Product', 'Personal', 'AMA']).optional(),
  locale: z.enum(['en', 'it']).optional(),
  published: z.boolean().optional(),
  limit: z.number().int().positive().max(100).default(10),
  offset: z.number().int().nonnegative().default(0),
});

// Chat Conversation schemas
export const createChatMessageSchema = z.object({
  sessionId: z.string().min(1),
  message: z.string().min(1).max(2000),
  userId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const getChatConversationsSchema = z.object({
  sessionId: z.string().optional(),
  category: z.enum(['lead', 'networking', 'curious']).optional(),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().nonnegative().default(0),
});

// Calendar Booking schemas
export const createBookingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional(),
  dateTime: z.string().datetime('Invalid date format'),
  duration: z.number().int().positive().default(60),
  type: z.enum(['consultation', 'brainstorming', 'mentorship']),
  notes: z.string().max(1000).optional(),
  metadata: z.record(z.any()).optional(),
});

export const updateBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
  dateTime: z.string().datetime().optional(),
  adminNotes: z.string().max(1000).optional(),
  reminderSent: z.boolean().optional(),
});

export const getBookingsSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
  type: z.enum(['consultation', 'brainstorming', 'mentorship']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().nonnegative().default(0),
});

// Analytics Event schemas
export const createAnalyticsEventSchema = z.object({
  sessionId: z.string().min(1),
  eventType: z.string().min(1).max(50),
  eventName: z.string().min(1).max(100),
  page: z.string().max(200).optional(),
  userId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const getAnalyticsEventsSchema = z.object({
  eventType: z.string().optional(),
  eventName: z.string().optional(),
  sessionId: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.number().int().positive().max(1000).default(100),
  offset: z.number().int().nonnegative().default(0),
});

// User schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().max(100).optional(),
  preferences: z.record(z.any()).optional(),
});

export const updateUserSchema = createUserSchema.partial();

// Newsletter subscription schema
export const subscribeNewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().max(100).optional(),
  source: z.string().max(50).optional(),
  preferences: z.record(z.any()).optional(),
});

// Type exports for TypeScript
export type CreateBlogPost = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;
export type GetBlogPosts = z.infer<typeof getBlogPostsSchema>;
export type CreateChatMessage = z.infer<typeof createChatMessageSchema>;
export type GetChatConversations = z.infer<typeof getChatConversationsSchema>;
export type CreateBooking = z.infer<typeof createBookingSchema>;
export type UpdateBooking = z.infer<typeof updateBookingSchema>;
export type GetBookings = z.infer<typeof getBookingsSchema>;
export type CreateAnalyticsEvent = z.infer<typeof createAnalyticsEventSchema>;
export type GetAnalyticsEvents = z.infer<typeof getAnalyticsEventsSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type SubscribeNewsletter = z.infer<typeof subscribeNewsletterSchema>;
