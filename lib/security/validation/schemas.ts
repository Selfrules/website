/**
 * Zod Validation Schemas
 * Input validation for all API endpoints
 */

import { z } from 'zod';

// ============================================================================
// COMMON SCHEMAS
// ============================================================================

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(255, 'Email too long')
  .toLowerCase()
  .trim();

export const urlSchema = z
  .string()
  .url('Invalid URL format')
  .max(2048, 'URL too long');

export const uuidSchema = z.string().uuid('Invalid UUID format');

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
  .min(1, 'Slug too short')
  .max(100, 'Slug too long');

export const localeSchema = z.enum(['en', 'it'], {
  errorMap: () => ({ message: 'Locale must be either "en" or "it"' }),
});

// ============================================================================
// BLOG POST SCHEMAS
// ============================================================================

export const blogPostCreateSchema = z.object({
  title: z.string().min(1, 'Title required').max(200, 'Title too long'),
  slug: slugSchema,
  excerpt: z.string().max(500, 'Excerpt too long').optional(),
  content: z.string().min(1, 'Content required').max(50000, 'Content too long'),
  category: z.enum(['design', 'dev', 'product', 'personal', 'ama'], {
    errorMap: () => ({ message: 'Invalid category' }),
  }),
  locale: localeSchema,
  published: z.boolean().default(false),
  publishedAt: z.coerce.date().optional(),
  tags: z.array(z.string().max(50)).max(10, 'Too many tags').optional(),
  readingTime: z.number().int().positive().optional(),
  featuredImage: urlSchema.optional(),
  metaTitle: z.string().max(60, 'Meta title too long').optional(),
  metaDescription: z.string().max(160, 'Meta description too long').optional(),
});

export const blogPostUpdateSchema = blogPostCreateSchema.partial();

export const blogPostQuerySchema = z.object({
  category: z
    .enum(['design', 'dev', 'product', 'personal', 'ama'])
    .optional(),
  locale: localeSchema.optional(),
  published: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.enum(['publishedAt', 'updatedAt', 'title']).default('publishedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ============================================================================
// CHAT SCHEMAS
// ============================================================================

export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message too long')
    .trim(),
  conversationId: uuidSchema.optional(),
  locale: localeSchema.default('en'),
  metadata: z
    .object({
      userAgent: z.string().max(500).optional(),
      timezone: z.string().max(50).optional(),
      referrer: z.string().max(500).optional(),
    })
    .optional(),
});

export const chatFeedbackSchema = z.object({
  messageId: uuidSchema,
  rating: z.enum(['positive', 'negative'], {
    errorMap: () => ({ message: 'Rating must be "positive" or "negative"' }),
  }),
  feedback: z.string().max(1000).optional(),
});

// ============================================================================
// CALENDAR BOOKING SCHEMAS
// ============================================================================

export const calendarBookingSchema = z.object({
  name: z.string().min(1, 'Name required').max(100, 'Name too long').trim(),
  email: emailSchema,
  type: z.enum(['consultation', 'brainstorming', 'mentorship'], {
    errorMap: () => ({ message: 'Invalid booking type' }),
  }),
  date: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Booking date must be in the future',
  }),
  duration: z.enum(['30', '60', '90'], {
    errorMap: () => ({ message: 'Duration must be 30, 60, or 90 minutes' }),
  }),
  timezone: z.string().min(1, 'Timezone required').max(100),
  notes: z.string().max(1000, 'Notes too long').optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),
  company: z.string().max(100).optional(),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: 'GDPR consent required' }),
  }),
});

export const calendarCancelSchema = z.object({
  bookingId: uuidSchema,
  reason: z.string().max(500).optional(),
});

export const calendarRescheduleSchema = z.object({
  bookingId: uuidSchema,
  newDate: z.coerce.date().refine((date) => date > new Date(), {
    message: 'New booking date must be in the future',
  }),
  reason: z.string().max(500).optional(),
});

// ============================================================================
// ANALYTICS SCHEMAS
// ============================================================================

export const analyticsEventSchema = z.object({
  eventName: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z_]+$/, 'Event name must be lowercase with underscores'),
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
  timestamp: z.coerce.date().default(() => new Date()),
  sessionId: uuidSchema.optional(),
  userId: uuidSchema.optional(),
});

export const analyticsPageViewSchema = z.object({
  path: z.string().min(1).max(500),
  referrer: z.string().max(500).optional(),
  sessionId: uuidSchema.optional(),
  userId: uuidSchema.optional(),
  duration: z.number().int().positive().optional(),
});

// ============================================================================
// ADMIN SCHEMAS
// ============================================================================

export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, 'Password must be at least 8 characters'),
  totpCode: z
    .string()
    .regex(/^\d{6}$/, '2FA code must be 6 digits')
    .optional(),
});

export const adminContentGenerationSchema = z.object({
  topic: z.string().min(1).max(200),
  keywords: z.array(z.string().max(50)).max(10),
  targetLength: z.enum(['short', 'medium', 'long']).default('medium'),
  category: z.enum(['design', 'dev', 'product', 'personal', 'ama']),
  locale: localeSchema,
  tone: z.enum(['casual', 'professional', 'humorous']).default('casual'),
});

// ============================================================================
// CONTACT FORM SCHEMAS
// ============================================================================

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name required').max(100, 'Name too long').trim(),
  email: emailSchema,
  subject: z.string().min(1, 'Subject required').max(200, 'Subject too long'),
  message: z
    .string()
    .min(10, 'Message too short')
    .max(5000, 'Message too long')
    .trim(),
  company: z.string().max(100).optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: 'GDPR consent required' }),
  }),
});

// ============================================================================
// NEWSLETTER SCHEMAS
// ============================================================================

export const newsletterSubscribeSchema = z.object({
  email: emailSchema,
  name: z.string().min(1).max(100).optional(),
  preferences: z
    .object({
      design: z.boolean().default(false),
      dev: z.boolean().default(false),
      product: z.boolean().default(false),
    })
    .optional(),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: 'GDPR consent required' }),
  }),
});

export const newsletterUnsubscribeSchema = z.object({
  email: emailSchema,
  token: z.string().uuid('Invalid unsubscribe token'),
  reason: z.string().max(500).optional(),
});

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate data against schema and return typed result
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Safe validation that returns error instead of throwing
 */
export function validateSafe<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, errors: result.error };
}

/**
 * Format validation errors for API responses
 */
export function formatValidationErrors(error: z.ZodError): {
  field: string;
  message: string;
}[] {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
}
