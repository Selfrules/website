/**
 * Input Sanitization Utilities
 * Prevents XSS, SQL injection, and other injection attacks
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS
 */
export function sanitizeHTML(html: string, options?: DOMPurify.Config): string {
  const defaultOptions: DOMPurify.Config = {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'blockquote',
      'code',
      'pre',
    ],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  };

  return DOMPurify.sanitize(html, { ...defaultOptions, ...options });
}

/**
 * Sanitize HTML for rich text content (blog posts, comments)
 */
export function sanitizeRichText(html: string): string {
  return sanitizeHTML(html, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'blockquote',
      'code',
      'pre',
      'img',
      'figure',
      'figcaption',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt', 'width', 'height'],
  });
}

/**
 * Sanitize plain text (remove all HTML)
 */
export function sanitizePlainText(text: string): string {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}

/**
 * Sanitize markdown content
 */
export function sanitizeMarkdown(markdown: string): string {
  // Remove potentially dangerous patterns
  let sanitized = markdown;

  // Remove script tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove inline event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');

  return sanitized;
}

/**
 * Escape special characters for SQL LIKE queries
 * Note: Prisma handles SQL injection, but this is useful for LIKE patterns
 */
export function escapeSQLLike(value: string): string {
  return value.replace(/[%_\\]/g, '\\$&');
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and special characters
  let sanitized = filename.replace(/[\/\\]/g, '');

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  // Limit length
  const maxLength = 255;
  if (sanitized.length > maxLength) {
    const ext = sanitized.slice(sanitized.lastIndexOf('.'));
    sanitized = sanitized.slice(0, maxLength - ext.length) + ext;
  }

  return sanitized;
}

/**
 * Sanitize URL to prevent open redirect
 */
export function sanitizeURL(url: string, allowedDomains: string[]): string | null {
  try {
    const parsed = new URL(url);

    // Check protocol
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }

    // Check domain whitelist
    const hostname = parsed.hostname;
    const isAllowed = allowedDomains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );

    if (!isAllowed) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().replace(/[^\w.@+-]/g, '');
}

/**
 * Sanitize phone number (keep only digits and +)
 */
export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Sanitize slug for URLs
 */
export function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Remove invisible characters and control characters
 */
export function removeInvisibleChars(text: string): string {
  // Remove zero-width characters
  let cleaned = text.replace(/[\u200B-\u200D\uFEFF]/g, '');

  // Remove control characters except newlines and tabs
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return cleaned;
}

/**
 * Sanitize JSON input
 */
export function sanitizeJSON(json: string, maxDepth = 10): any {
  try {
    const parsed = JSON.parse(json);
    return sanitizeJSONObject(parsed, 0, maxDepth);
  } catch {
    throw new Error('Invalid JSON');
  }
}

/**
 * Recursively sanitize JSON object
 */
function sanitizeJSONObject(obj: any, depth: number, maxDepth: number): any {
  if (depth >= maxDepth) {
    throw new Error('JSON depth limit exceeded');
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeJSONObject(item, depth + 1, maxDepth));
  }

  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    // Sanitize key
    const sanitizedKey = key.replace(/[^\w.-]/g, '');
    sanitized[sanitizedKey] = sanitizeJSONObject(value, depth + 1, maxDepth);
  }

  return sanitized;
}

/**
 * Sanitize user input for chat messages
 */
export function sanitizeChatMessage(message: string): string {
  // Remove invisible characters
  let sanitized = removeInvisibleChars(message);

  // Trim whitespace
  sanitized = sanitized.trim();

  // Limit consecutive newlines
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n');

  // Remove extremely long words (likely spam/attacks)
  sanitized = sanitized.replace(/\S{200,}/g, '');

  return sanitized;
}

/**
 * Sanitize search query
 */
export function sanitizeSearchQuery(query: string): string {
  // Remove special regex characters
  let sanitized = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Remove excessive whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  // Limit length
  if (sanitized.length > 200) {
    sanitized = sanitized.slice(0, 200);
  }

  return sanitized;
}

/**
 * Sanitize object for database storage
 */
export function sanitizeForDB(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Remove invisible characters and null bytes
      sanitized[key] = removeInvisibleChars(value).replace(/\0/g, '');
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeForDB(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Validate and sanitize base64 data
 */
export function sanitizeBase64(data: string): string | null {
  // Remove whitespace
  const cleaned = data.replace(/\s/g, '');

  // Validate base64 format
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned)) {
    return null;
  }

  return cleaned;
}

/**
 * Sanitize color hex code
 */
export function sanitizeHexColor(color: string): string | null {
  const cleaned = color.trim().toLowerCase();

  if (!/^#[0-9a-f]{3}([0-9a-f]{3})?$/.test(cleaned)) {
    return null;
  }

  return cleaned;
}

/**
 * Create sanitization pipeline
 */
export function createSanitizationPipeline(
  ...sanitizers: Array<(input: string) => string>
) {
  return (input: string): string => {
    return sanitizers.reduce((result, sanitizer) => sanitizer(result), input);
  };
}

/**
 * Common sanitization pipelines
 */
export const sanitizationPipelines = {
  userInput: createSanitizationPipeline(removeInvisibleChars, sanitizePlainText),
  richText: createSanitizationPipeline(removeInvisibleChars, sanitizeRichText),
  chat: createSanitizationPipeline(removeInvisibleChars, sanitizeChatMessage),
  search: createSanitizationPipeline(removeInvisibleChars, sanitizeSearchQuery),
};
