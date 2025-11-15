/**
 * Security Module
 * Central export for all security features
 */

// Types
export * from './types';

// Middleware
// TODO: Create middleware/rateLimit module
// export {
//   rateLimitMiddleware,
//   checkRateLimit,
//   RATE_LIMITS,
// } from './middleware/rateLimit';

// Configuration
export {
  CORS_CONFIG,
  getAllowedOrigins,
  isOriginAllowed,
  getCORSHeaders,
  handlePreflight,
  corsMiddleware,
  validateCORSConfig,
} from './config/cors';

export {
  getSecurityHeaders,
  applySecurityHeaders,
  securityHeadersMiddleware,
  validateSecurityHeaders,
  generateCSPNonce,
  addNonceToCSP,
} from './config/headers';

export {
  getEnv,
  validateEnvironment,
  isAPIConfigured,
  getClientEnv,
} from './config/env';

// Validation
// TODO: Create validation/schemas module
// export {
//   // Schemas
//   blogPostCreateSchema,
//   blogPostUpdateSchema,
//   blogPostQuerySchema,
//   chatMessageSchema,
//   chatFeedbackSchema,
//   calendarBookingSchema,
//   calendarCancelSchema,
//   calendarRescheduleSchema,
//   analyticsEventSchema,
//   analyticsPageViewSchema,
//   adminLoginSchema,
//   adminContentGenerationSchema,
//   contactFormSchema,
//   newsletterSubscribeSchema,
//   newsletterUnsubscribeSchema,
//   // Helpers
//   validate,
//   validateSafe,
//   formatValidationErrors,
// } from './validation/schemas';

// Sanitization
// Temporarily disabled - requires isomorphic-dompurify package
// export {
//   sanitizeHTML,
//   sanitizeRichText,
//   sanitizePlainText,
//   sanitizeMarkdown,
//   sanitizeFilename,
//   sanitizeURL,
//   sanitizeEmail,
//   sanitizePhoneNumber,
//   sanitizeSlug,
//   removeInvisibleChars,
//   sanitizeJSON,
//   sanitizeChatMessage,
//   sanitizeSearchQuery,
//   sanitizeForDB,
//   sanitizeBase64,
//   sanitizeHexColor,
//   createSanitizationPipeline,
//   sanitizationPipelines,
// } from './sanitization/sanitize';

// OAuth
export {
  TokenEncryption,
  PKCEGenerator,
  GoogleCalendarOAuth,
  TokenManager,
  createGoogleCalendarOAuth,
} from './oauth/googleCalendar';

export type { TokenStorage } from './oauth/googleCalendar';

// GDPR
export {
  CookieCategory,
  ConsentManager,
  ConsentBannerController,
  ServerConsentManager,
  requireConsent,
  DEFAULT_CONSENT,
} from './gdpr/consent';

export type {
  ConsentPreferences,
  ConsentRecord,
  ConsentStorage,
} from './gdpr/consent';

export {
  DataExportService,
  handleDataExportRequest,
} from './gdpr/dataExport';

export type { UserDataExport } from './gdpr/dataExport';

export {
  DataDeletionService,
  DeletionStatus,
  DEFAULT_RETENTION,
  handleDeletionRequest,
  handleDeletionConfirmation,
} from './gdpr/dataDeletion';

export type { RetentionPolicy } from './gdpr/dataDeletion';
