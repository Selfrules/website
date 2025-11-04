/**
 * OAuth2 Security Implementation for Google Calendar
 * Implements PKCE flow, secure token storage, and automatic refresh
 */

import { google } from 'googleapis';
import crypto from 'crypto';
import type { OAuth2Tokens, OAuth2Config } from '../types';

/**
 * Token encryption using AES-256-GCM
 */
export class TokenEncryption {
  private algorithm = 'aes-256-gcm';
  private key: Buffer;

  constructor(encryptionKey: string) {
    // Derive key from hex string
    this.key = Buffer.from(encryptionKey, 'hex');
  }

  /**
   * Encrypt token data
   */
  encrypt(data: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    // Return: iv:authTag:encrypted
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  /**
   * Decrypt token data
   */
  decrypt(encryptedData: string): string {
    const parts = encryptedData.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }

    const [ivHex, authTagHex, encrypted] = parts;

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

/**
 * PKCE (Proof Key for Code Exchange) implementation
 */
export class PKCEGenerator {
  private verifier: string;
  private challenge: string;

  constructor() {
    this.verifier = this.generateCodeVerifier();
    this.challenge = this.generateCodeChallenge(this.verifier);
  }

  /**
   * Generate random code verifier
   */
  private generateCodeVerifier(): string {
    return crypto.randomBytes(32).toString('base64url');
  }

  /**
   * Generate code challenge from verifier
   */
  private generateCodeChallenge(verifier: string): string {
    return crypto
      .createHash('sha256')
      .update(verifier)
      .digest('base64url');
  }

  getVerifier(): string {
    return this.verifier;
  }

  getChallenge(): string {
    return this.challenge;
  }
}

/**
 * Google Calendar OAuth2 client
 */
export class GoogleCalendarOAuth {
  private oauth2Client: any;
  private tokenEncryption: TokenEncryption;
  private config: OAuth2Config;

  constructor(config: OAuth2Config, encryptionKey: string) {
    this.config = config;
    this.tokenEncryption = new TokenEncryption(encryptionKey);

    this.oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    );
  }

  /**
   * Generate authorization URL with PKCE
   */
  async generateAuthUrl(): Promise<{
    url: string;
    codeVerifier: string;
    state: string;
  }> {
    const pkce = new PKCEGenerator();
    const state = crypto.randomBytes(32).toString('hex');

    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.config.scopes,
      state,
      code_challenge: pkce.getChallenge(),
      code_challenge_method: 'S256',
      prompt: 'consent', // Force consent to get refresh token
    });

    return {
      url,
      codeVerifier: pkce.getVerifier(),
      state,
    };
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCodeForTokens(
    code: string,
    codeVerifier: string
  ): Promise<OAuth2Tokens> {
    const { tokens } = await this.oauth2Client.getToken({
      code,
      code_verifier: codeVerifier,
    });

    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Failed to obtain tokens');
    }

    const expiresAt = tokens.expiry_date || Date.now() + 3600 * 1000;

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt,
      scope: tokens.scope?.split(' ') || this.config.scopes,
    };
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(refreshToken: string): Promise<OAuth2Tokens> {
    this.oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const { credentials } = await this.oauth2Client.refreshAccessToken();

    if (!credentials.access_token) {
      throw new Error('Failed to refresh token');
    }

    const expiresAt = credentials.expiry_date || Date.now() + 3600 * 1000;

    return {
      accessToken: credentials.access_token,
      refreshToken: refreshToken, // Keep original refresh token
      expiresAt,
      scope: credentials.scope?.split(' ') || this.config.scopes,
    };
  }

  /**
   * Check if tokens are expired
   */
  isTokenExpired(expiresAt: number): boolean {
    // Add 5 minute buffer
    return Date.now() >= expiresAt - 5 * 60 * 1000;
  }

  /**
   * Get valid access token (auto-refresh if needed)
   */
  async getValidAccessToken(
    tokens: OAuth2Tokens,
    onTokenRefresh?: (newTokens: OAuth2Tokens) => Promise<void>
  ): Promise<string> {
    if (!this.isTokenExpired(tokens.expiresAt)) {
      return tokens.accessToken;
    }

    // Token expired, refresh
    const newTokens = await this.refreshAccessToken(tokens.refreshToken);

    // Save refreshed tokens if callback provided
    if (onTokenRefresh) {
      await onTokenRefresh(newTokens);
    }

    return newTokens.accessToken;
  }

  /**
   * Encrypt tokens for storage
   */
  encryptTokens(tokens: OAuth2Tokens): string {
    return this.tokenEncryption.encrypt(JSON.stringify(tokens));
  }

  /**
   * Decrypt tokens from storage
   */
  decryptTokens(encryptedTokens: string): OAuth2Tokens {
    const decrypted = this.tokenEncryption.decrypt(encryptedTokens);
    return JSON.parse(decrypted) as OAuth2Tokens;
  }

  /**
   * Revoke access token
   */
  async revokeToken(accessToken: string): Promise<void> {
    await this.oauth2Client.revokeToken(accessToken);
  }

  /**
   * Get Google Calendar API client
   */
  getCalendarClient(accessToken: string) {
    this.oauth2Client.setCredentials({ access_token: accessToken });
    return google.calendar({ version: 'v3', auth: this.oauth2Client });
  }
}

/**
 * Secure token storage interface
 * Implement this based on your database
 */
export interface TokenStorage {
  saveTokens(userId: string, encryptedTokens: string): Promise<void>;
  getTokens(userId: string): Promise<string | null>;
  deleteTokens(userId: string): Promise<void>;
}

/**
 * Token manager with automatic refresh
 */
export class TokenManager {
  private oauth: GoogleCalendarOAuth;
  private storage: TokenStorage;

  constructor(oauth: GoogleCalendarOAuth, storage: TokenStorage) {
    this.oauth = oauth;
    this.storage = storage;
  }

  /**
   * Save tokens securely
   */
  async saveTokens(userId: string, tokens: OAuth2Tokens): Promise<void> {
    const encrypted = this.oauth.encryptTokens(tokens);
    await this.storage.saveTokens(userId, encrypted);
  }

  /**
   * Get valid access token (auto-refresh if needed)
   */
  async getValidAccessToken(userId: string): Promise<string> {
    const encryptedTokens = await this.storage.getTokens(userId);

    if (!encryptedTokens) {
      throw new Error('No tokens found for user');
    }

    const tokens = this.oauth.decryptTokens(encryptedTokens);

    return this.oauth.getValidAccessToken(tokens, async (newTokens) => {
      await this.saveTokens(userId, newTokens);
    });
  }

  /**
   * Revoke and delete tokens
   */
  async revokeTokens(userId: string): Promise<void> {
    const encryptedTokens = await this.storage.getTokens(userId);

    if (encryptedTokens) {
      const tokens = this.oauth.decryptTokens(encryptedTokens);
      await this.oauth.revokeToken(tokens.accessToken);
    }

    await this.storage.deleteTokens(userId);
  }
}

/**
 * Factory function to create OAuth client
 */
export function createGoogleCalendarOAuth(
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  encryptionKey: string
): GoogleCalendarOAuth {
  const config: OAuth2Config = {
    clientId,
    clientSecret,
    redirectUri,
    scopes: [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar.events',
    ],
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  };

  return new GoogleCalendarOAuth(config, encryptionKey);
}
