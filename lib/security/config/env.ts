/**
 * Environment Variable Validation
 * Validates all required environment variables on startup
 */

import { z } from 'zod';

/**
 * Environment variable schema
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']),

  // Database
  DATABASE_URL: z.string().url('Invalid DATABASE_URL'),
  DATABASE_POOL_SIZE: z.coerce.number().int().positive().default(10),

  // Redis (optional in development)
  REDIS_URL: z
    .string()
    .url('Invalid REDIS_URL')
    .optional()
    .or(z.literal('')),

  // Claude API
  ANTHROPIC_API_KEY: z
    .string()
    .min(1, 'ANTHROPIC_API_KEY required')
    .startsWith('sk-ant-', 'Invalid Anthropic API key format'),
  ANTHROPIC_MODEL: z.string().default('claude-3-5-sonnet-20241022'),
  ANTHROPIC_MAX_TOKENS: z.coerce.number().int().positive().default(4096),

  // Google Calendar API
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET required'),
  GOOGLE_REDIRECT_URI: z.string().url('Invalid GOOGLE_REDIRECT_URI'),
  GOOGLE_CALENDAR_ID: z.string().email('Invalid GOOGLE_CALENDAR_ID'),

  // Spotify API
  SPOTIFY_CLIENT_ID: z.string().min(1, 'SPOTIFY_CLIENT_ID required'),
  SPOTIFY_CLIENT_SECRET: z.string().min(1, 'SPOTIFY_CLIENT_SECRET required'),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1, 'SPOTIFY_REFRESH_TOKEN required'),

  // Application URLs
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid NEXT_PUBLIC_APP_URL'),
  NEXT_PUBLIC_API_URL: z.string().url('Invalid NEXT_PUBLIC_API_URL'),

  // Security
  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters'),
  ENCRYPTION_KEY: z
    .string()
    .length(64, 'ENCRYPTION_KEY must be exactly 64 characters (32 bytes hex)'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),

  // Admin credentials
  ADMIN_EMAIL: z.string().email('Invalid ADMIN_EMAIL'),
  ADMIN_PASSWORD_HASH: z.string().min(1, 'ADMIN_PASSWORD_HASH required'),

  // Analytics
  MIXPANEL_TOKEN: z.string().optional(),
  SENTRY_DSN: z.string().url('Invalid SENTRY_DSN').optional(),

  // Email (optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().email('Invalid EMAIL_FROM').optional(),

  // Storage
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  // Rate limiting
  RATE_LIMIT_ENABLED: z.coerce.boolean().default(true),
  RATE_LIMIT_REDIS_ENABLED: z.coerce.boolean().default(false),

  // Feature flags
  FEATURE_AI_CHATBOT: z.coerce.boolean().default(true),
  FEATURE_CALENDAR_BOOKING: z.coerce.boolean().default(true),
  FEATURE_SPOTIFY_WIDGET: z.coerce.boolean().default(true),
  FEATURE_ANALYTICS: z.coerce.boolean().default(true),

  // Logging
  LOG_LEVEL: z
    .enum(['debug', 'info', 'warn', 'error'])
    .default('info'),
});

/**
 * Validated environment variables type
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Cached validated environment
 */
let cachedEnv: Env | null = null;

/**
 * Validate and get environment variables
 */
export function getEnv(): Env {
  // Return cached if already validated
  if (cachedEnv) {
    return cachedEnv;
  }

  try {
    // Validate environment variables
    cachedEnv = envSchema.parse(process.env);

    // Additional runtime validations
    validateEnvironmentConsistency(cachedEnv);

    return cachedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment variable validation failed:');
      console.error(
        error.errors.map((err) => `  - ${err.path.join('.')}: ${err.message}`)
      );
    }
    throw new Error('Invalid environment configuration');
  }
}

/**
 * Additional environment consistency checks
 */
function validateEnvironmentConsistency(env: Env): void {
  // Production checks
  if (env.NODE_ENV === 'production') {
    // Ensure HTTPS in production
    if (!env.NEXT_PUBLIC_APP_URL.startsWith('https://')) {
      throw new Error('NEXT_PUBLIC_APP_URL must use HTTPS in production');
    }

    // Ensure strong session secret
    if (env.SESSION_SECRET.length < 64) {
      console.warn(
        '⚠️  SESSION_SECRET should be at least 64 characters in production'
      );
    }

    // Ensure Redis is enabled for rate limiting
    if (env.RATE_LIMIT_ENABLED && !env.RATE_LIMIT_REDIS_ENABLED) {
      console.warn(
        '⚠️  Rate limiting without Redis in production may cause issues'
      );
    }
  }

  // Redis consistency
  if (env.RATE_LIMIT_REDIS_ENABLED && !env.REDIS_URL) {
    throw new Error('REDIS_URL required when RATE_LIMIT_REDIS_ENABLED is true');
  }

  // Email consistency
  const emailVars = [env.SMTP_HOST, env.SMTP_PORT, env.SMTP_USER, env.SMTP_PASSWORD];
  const emailVarsDefined = emailVars.filter(Boolean).length;

  if (emailVarsDefined > 0 && emailVarsDefined < 4) {
    console.warn(
      '⚠️  Partial email configuration detected. All SMTP variables should be set.'
    );
  }

  // Cloudinary consistency
  const cloudinaryVars = [
    env.CLOUDINARY_CLOUD_NAME,
    env.CLOUDINARY_API_KEY,
    env.CLOUDINARY_API_SECRET,
  ];
  const cloudinaryVarsDefined = cloudinaryVars.filter(Boolean).length;

  if (cloudinaryVarsDefined > 0 && cloudinaryVarsDefined < 3) {
    console.warn(
      '⚠️  Partial Cloudinary configuration detected. All variables should be set.'
    );
  }
}

/**
 * Validate environment on startup
 */
export function validateEnvironment(): void {
  console.log('🔍 Validating environment variables...');

  try {
    const env = getEnv();

    console.log('✅ Environment validation successful');
    console.log(`📍 Environment: ${env.NODE_ENV}`);
    console.log(`🌐 App URL: ${env.NEXT_PUBLIC_APP_URL}`);
    console.log(`🗄️  Database: ${env.DATABASE_URL.split('@')[1] || 'configured'}`);
    console.log(`🔐 Redis: ${env.REDIS_URL ? 'enabled' : 'disabled'}`);
    console.log(`🤖 AI Chatbot: ${env.FEATURE_AI_CHATBOT ? 'enabled' : 'disabled'}`);
    console.log(
      `📅 Calendar: ${env.FEATURE_CALENDAR_BOOKING ? 'enabled' : 'disabled'}`
    );
  } catch (error) {
    console.error('❌ Environment validation failed');
    if (process.env.NODE_ENV === 'production') {
      // Fail hard in production
      process.exit(1);
    }
    throw error;
  }
}

/**
 * Check if a specific API is configured
 */
export function isAPIConfigured(api: 'anthropic' | 'google' | 'spotify'): boolean {
  const env = getEnv();

  switch (api) {
    case 'anthropic':
      return !!env.ANTHROPIC_API_KEY;
    case 'google':
      return !!(
        env.GOOGLE_CLIENT_ID &&
        env.GOOGLE_CLIENT_SECRET &&
        env.GOOGLE_CALENDAR_ID
      );
    case 'spotify':
      return !!(
        env.SPOTIFY_CLIENT_ID &&
        env.SPOTIFY_CLIENT_SECRET &&
        env.SPOTIFY_REFRESH_TOKEN
      );
    default:
      return false;
  }
}

/**
 * Get safe environment info for client
 * Only returns NEXT_PUBLIC_* variables and feature flags
 */
export function getClientEnv() {
  const env = getEnv();

  return {
    appUrl: env.NEXT_PUBLIC_APP_URL,
    apiUrl: env.NEXT_PUBLIC_API_URL,
    nodeEnv: env.NODE_ENV,
    features: {
      aiChatbot: env.FEATURE_AI_CHATBOT,
      calendarBooking: env.FEATURE_CALENDAR_BOOKING,
      spotifyWidget: env.FEATURE_SPOTIFY_WIDGET,
      analytics: env.FEATURE_ANALYTICS,
    },
  };
}
