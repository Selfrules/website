// Security Type Definitions

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

export interface SecurityHeaders {
  'Content-Security-Policy': string;
  'Strict-Transport-Security': string;
  'X-Frame-Options': string;
  'X-Content-Type-Options': string;
  'X-XSS-Protection': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
}

export interface CORSConfig {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge: number;
}

export interface OAuth2Tokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  scope: string[];
}

export interface OAuth2Config {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  authorizationUrl: string;
  tokenUrl: string;
}

export interface GDPRConsent {
  userId: string;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: Date;
  ipAddress: string;
}

export interface DataExportRequest {
  userId: string;
  email: string;
  requestedAt: Date;
  format: 'json' | 'csv';
}

export interface DataDeletionRequest {
  userId: string;
  email: string;
  requestedAt: Date;
  reason?: string;
  confirmationToken: string;
}

export type EndpointType =
  | 'public'
  | 'chat'
  | 'calendar'
  | 'admin'
  | 'analytics';

export interface RateLimitByEndpoint {
  [key: string]: RateLimitConfig;
}
