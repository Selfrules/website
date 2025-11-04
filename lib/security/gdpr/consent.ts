/**
 * GDPR Consent Management
 * Cookie consent, data processing consent tracking
 */

import type { GDPRConsent } from '../types';

/**
 * Cookie categories as per GDPR
 */
export enum CookieCategory {
  NECESSARY = 'necessary',
  ANALYTICS = 'analytics',
  MARKETING = 'marketing',
  PREFERENCES = 'preferences',
}

/**
 * Cookie consent preferences
 */
export interface ConsentPreferences {
  necessary: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

/**
 * Default consent preferences (minimal, GDPR-compliant)
 */
export const DEFAULT_CONSENT: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

/**
 * Cookie consent manager
 */
export class ConsentManager {
  private static STORAGE_KEY = 'gdpr_consent';
  private static CONSENT_VERSION = '1.0';

  /**
   * Get current consent preferences
   */
  static getConsent(): ConsentPreferences | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const data = JSON.parse(stored);
      if (data.version !== this.CONSENT_VERSION) {
        return null; // Invalidate old consent
      }

      return data.preferences;
    } catch {
      return null;
    }
  }

  /**
   * Save consent preferences
   */
  static saveConsent(preferences: ConsentPreferences): void {
    if (typeof window === 'undefined') return;

    const data = {
      version: this.CONSENT_VERSION,
      preferences,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

    // Trigger consent change event
    window.dispatchEvent(
      new CustomEvent('consentChange', { detail: preferences })
    );
  }

  /**
   * Check if user has given consent
   */
  static hasConsent(): boolean {
    return this.getConsent() !== null;
  }

  /**
   * Check if specific category is allowed
   */
  static isAllowed(category: CookieCategory): boolean {
    const consent = this.getConsent();
    if (!consent) return category === CookieCategory.NECESSARY;

    return consent[category] === true;
  }

  /**
   * Clear all consent data
   */
  static clearConsent(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('consentCleared'));
  }

  /**
   * Get consent timestamp
   */
  static getConsentTimestamp(): Date | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const data = JSON.parse(stored);
      return new Date(data.timestamp);
    } catch {
      return null;
    }
  }
}

/**
 * Cookie consent banner controller
 */
export class ConsentBannerController {
  private onAccept: (preferences: ConsentPreferences) => void;
  private onReject: () => void;

  constructor(
    onAccept: (preferences: ConsentPreferences) => void,
    onReject: () => void
  ) {
    this.onAccept = onAccept;
    this.onReject = onReject;
  }

  /**
   * Accept all cookies
   */
  acceptAll(): void {
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };

    ConsentManager.saveConsent(preferences);
    this.onAccept(preferences);
  }

  /**
   * Reject all non-necessary cookies
   */
  rejectAll(): void {
    ConsentManager.saveConsent(DEFAULT_CONSENT);
    this.onReject();
  }

  /**
   * Save custom preferences
   */
  savePreferences(preferences: Partial<ConsentPreferences>): void {
    const fullPreferences: ConsentPreferences = {
      ...DEFAULT_CONSENT,
      ...preferences,
      necessary: true, // Always required
    };

    ConsentManager.saveConsent(fullPreferences);
    this.onAccept(fullPreferences);
  }
}

/**
 * Track consent in database
 */
export interface ConsentRecord extends GDPRConsent {
  id: string;
  sessionId?: string;
  userAgent?: string;
}

/**
 * Consent storage interface
 */
export interface ConsentStorage {
  saveConsent(record: Omit<ConsentRecord, 'id'>): Promise<ConsentRecord>;
  getConsent(userId: string): Promise<ConsentRecord | null>;
  updateConsent(
    userId: string,
    preferences: ConsentPreferences
  ): Promise<ConsentRecord>;
}

/**
 * Server-side consent tracking
 */
export class ServerConsentManager {
  constructor(private storage: ConsentStorage) {}

  /**
   * Record user consent
   */
  async recordConsent(
    userId: string,
    preferences: ConsentPreferences,
    metadata: {
      ipAddress: string;
      userAgent?: string;
      sessionId?: string;
    }
  ): Promise<ConsentRecord> {
    const record: Omit<ConsentRecord, 'id'> = {
      userId,
      necessary: preferences.necessary,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      timestamp: new Date(),
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
      sessionId: metadata.sessionId,
    };

    return this.storage.saveConsent(record);
  }

  /**
   * Get user's consent record
   */
  async getUserConsent(userId: string): Promise<ConsentRecord | null> {
    return this.storage.getConsent(userId);
  }

  /**
   * Check if user has given specific consent
   */
  async hasUserConsent(
    userId: string,
    category: CookieCategory
  ): Promise<boolean> {
    const record = await this.getUserConsent(userId);
    if (!record) return false;

    return record[category] === true;
  }

  /**
   * Update user consent
   */
  async updateConsent(
    userId: string,
    preferences: ConsentPreferences
  ): Promise<ConsentRecord> {
    return this.storage.updateConsent(userId, preferences);
  }
}

/**
 * Consent requirement decorator for API routes
 */
export function requireConsent(category: CookieCategory) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const request = args[0];
      const userId = request.userId; // Assume userId is attached to request

      if (!userId) {
        throw new Error('User not authenticated');
      }

      const consentManager = new ServerConsentManager(
        /* storage implementation */
        {} as any
      );

      const hasConsent = await consentManager.hasUserConsent(userId, category);

      if (!hasConsent && category !== CookieCategory.NECESSARY) {
        throw new Error(`Consent required for ${category}`);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
