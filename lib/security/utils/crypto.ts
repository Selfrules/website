/**
 * Cryptographic Utilities
 * Helper functions for secure encryption, hashing, and token generation
 */

import crypto from 'crypto';

/**
 * Generate cryptographically secure random token
 */
export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate secure random string (base64url)
 */
export function generateRandomString(length = 32): string {
  return crypto.randomBytes(length).toString('base64url');
}

/**
 * Hash data with SHA-256
 */
export function sha256(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Hash data with SHA-512
 */
export function sha512(data: string): string {
  return crypto.createHash('sha512').update(data).digest('hex');
}

/**
 * HMAC signature generation
 */
export function hmacSign(data: string, secret: string, algorithm = 'sha256'): string {
  return crypto.createHmac(algorithm, secret).update(data).digest('hex');
}

/**
 * Verify HMAC signature
 */
export function hmacVerify(
  data: string,
  signature: string,
  secret: string,
  algorithm = 'sha256'
): boolean {
  const expected = hmacSign(data, secret, algorithm);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(password, hash);
}

/**
 * Constant-time string comparison (prevent timing attacks)
 */
export function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Generate UUID v4
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  return generateSecureToken(32);
}

/**
 * Generate session ID
 */
export function generateSessionId(): string {
  return generateSecureToken(32);
}

/**
 * Derive key from password (PBKDF2)
 */
export function deriveKey(
  password: string,
  salt: string,
  iterations = 100000,
  keyLength = 32
): string {
  return crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, 'sha256')
    .toString('hex');
}

/**
 * Generate salt for key derivation
 */
export function generateSalt(length = 16): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Encrypt data with AES-256-GCM
 */
export function encryptAES256(data: string, key: string): string {
  const algorithm = 'aes-256-gcm';
  const keyBuffer = Buffer.from(key, 'hex');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  // Return: iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypt data with AES-256-GCM
 */
export function decryptAES256(encryptedData: string, key: string): string {
  const algorithm = 'aes-256-gcm';
  const keyBuffer = Buffer.from(key, 'hex');

  const parts = encryptedData.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format');
  }

  const [ivHex, authTagHex, encrypted] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Generate encryption key (32 bytes for AES-256)
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Mask sensitive data for logging
 */
export function maskSensitiveData(data: string, visibleChars = 4): string {
  if (data.length <= visibleChars) {
    return '*'.repeat(data.length);
  }

  return data.slice(0, visibleChars) + '*'.repeat(data.length - visibleChars);
}

/**
 * Generate fingerprint from request
 */
export function generateFingerprint(data: {
  ip?: string;
  userAgent?: string;
  acceptLanguage?: string;
}): string {
  const combined = `${data.ip || ''}:${data.userAgent || ''}:${data.acceptLanguage || ''}`;
  return sha256(combined);
}
