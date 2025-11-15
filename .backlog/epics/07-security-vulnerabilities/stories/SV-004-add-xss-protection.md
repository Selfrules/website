# [SV-004] Add XSS Protection (HTML Sanitization)

## Metadata
- **Story ID**: SV-004
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** utente del sito **Voglio** che il contenuto renderizzato sia sanitized **Così che** non possa essere vittima di XSS attacks

## Vulnerabilità Correlate (Security Audit)
- **1.1**: Unsafe HTML Rendering with dangerouslySetInnerHTML in BlogArticleClient (HIGH)
- **1.2**: Unsafe HTML Rendering in Analytics3amClient (HIGH)
- **5.1**: Limited Input Validation for Blog Content (MEDIUM)

## Criteri di Accettazione
- [ ] **AC1**: Blog content è sanitized con DOMPurify prima del rendering
- [ ] **AC2**: Analytics content è sanitized con DOMPurify
- [ ] **AC3**: Input validation su blog content include HTML/script check
- [ ] **AC4**: MDX compilation è sicura (no arbitrary code execution)
- [ ] **AC5**: CSP nonce aggiunto agli inline scripts (se necessari)
- [ ] **AC6**: Test XSS payloads bloccati

## Implementazione Tecnica

### 1. Install DOMPurify

```bash
npm install dompurify
npm install --save-dev @types/dompurify

# For server-side rendering (Next.js)
npm install isomorphic-dompurify
```

### 2. Create Sanitization Utility

**File**: `lib/utils/sanitize.ts` (NEW)

```typescript
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(
  html: string,
  options?: {
    allowedTags?: string[];
    allowedAttributes?: { [tag: string]: string[] };
  }
): string {
  const config: DOMPurify.Config = {
    // Allow safe HTML tags for blog content
    ALLOWED_TAGS: options?.allowedTags || [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'em', 'u', 'del', 's',
      'a', 'img',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span',
    ],

    // Allow safe attributes
    ALLOWED_ATTR: options?.allowedAttributes
      ? Object.values(options.allowedAttributes).flat()
      : [
        'href', 'target', 'rel',
        'src', 'alt', 'width', 'height',
        'class', 'id',
        'title', 'aria-label', 'aria-describedby',
      ],

    // Additional security
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    SAFE_FOR_TEMPLATES: true,

    // Force target="_blank" for external links
    ADD_ATTR: ['target'],

    // Hook to add rel="noopener noreferrer" to external links
    HOOKS: {
      afterSanitizeAttributes: (node) => {
        if (node.tagName === 'A') {
          const href = node.getAttribute('href');
          if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            node.setAttribute('target', '_blank');
            node.setAttribute('rel', 'noopener noreferrer');
          }
        }
      },
    },
  };

  return DOMPurify.sanitize(html, config);
}

/**
 * Sanitize user input (remove all HTML)
 */
export function sanitizeUserInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * Validate that string doesn't contain script tags
 */
export function containsScripts(input: string): boolean {
  const scriptRegex = /<script[^>]*>[\s\S]*?<\/script>/gi;
  const eventHandlerRegex = /on\w+\s*=\s*["'][^"']*["']/gi;
  const javascriptProtocol = /javascript:/gi;

  return (
    scriptRegex.test(input) ||
    eventHandlerRegex.test(input) ||
    javascriptProtocol.test(input)
  );
}
```

### 3. Fix BlogArticleClient Component

**File**: `components/blog/BlogArticleClient.tsx:310`

```typescript
// PRIMA (VULNERABLE)
<div
  className="prose prose-lg max-w-none blog-article-content"
  dangerouslySetInnerHTML={{ __html: contentHtml }}
/>

// DOPO (SECURE)
import { sanitizeHtml } from '@/lib/utils/sanitize';

function BlogArticleClient({ post }: { post: BlogPost }) {
  // Sanitize HTML before rendering
  const sanitizedContent = sanitizeHtml(post.contentHtml);

  return (
    <article>
      {/* ... other content */}
      <div
        className="prose prose-lg max-w-none blog-article-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </article>
  );
}
```

### 4. Fix Analytics3amClient Component

**File**: `app/[locale]/blog/3am-analytics-test/Analytics3amClient.tsx`

```typescript
// PRIMA (VULNERABLE)
dangerouslySetInnerHTML={{ __html: formatContent(sectionContent) }}

// DOPO (SECURE)
import { sanitizeHtml } from '@/lib/utils/sanitize';

function Analytics3amClient() {
  const formatAndSanitize = (content: string) => {
    const formatted = formatContent(content);
    return sanitizeHtml(formatted);
  };

  return (
    <div
      dangerouslySetInnerHTML={{ __html: formatAndSanitize(sectionContent) }}
    />
  );
}
```

### 5. Add Input Validation for Blog Content

**File**: `lib/validations/schemas.ts:9-21`

```typescript
import { z } from 'zod';
import { containsScripts } from '@/lib/utils/sanitize';

// PRIMA
export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  content: z.string().min(1, 'Content is required'), // Only length check!
  // ...
});

// DOPO
export const createBlogPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200)
    .refine((val) => !containsScripts(val), {
      message: 'Title cannot contain scripts',
    }),

  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, 'Invalid slug format')
    .refine((val) => !val.includes('--'), {
      message: 'Slug cannot contain consecutive hyphens',
    }),

  content: z
    .string()
    .min(1, 'Content is required')
    .max(500000, 'Content too large') // Max 500KB
    .refine((val) => !containsScripts(val), {
      message: 'Content cannot contain inline scripts',
    }),

  excerpt: z
    .string()
    .max(500)
    .optional()
    .refine((val) => !val || !containsScripts(val), {
      message: 'Excerpt cannot contain scripts',
    }),

  // ... rest of schema
});
```

### 6. Secure MDX Compilation (if using MDX)

**File**: `lib/mdx/compile.ts` (if exists)

```typescript
import { compile } from '@mdx-js/mdx';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';

export async function compileMdx(source: string) {
  const compiled = await compile(source, {
    outputFormat: 'function-body',
    development: false,

    // Add sanitization plugin
    rehypePlugins: [
      rehypeSanitize, // Sanitize HTML in MDX
      rehypeSlug,     // Add IDs to headings
    ],
  });

  return compiled;
}
```

Install rehype-sanitize:
```bash
npm install rehype-sanitize
```

## Files da Modificare
1. Install: `isomorphic-dompurify`, `rehype-sanitize`
2. `lib/utils/sanitize.ts` (NEW) - Create sanitization utilities
3. `components/blog/BlogArticleClient.tsx` - Sanitize blog content
4. `app/[locale]/blog/3am-analytics-test/Analytics3amClient.tsx` - Sanitize analytics content
5. `lib/validations/schemas.ts` - Add script detection validation
6. `lib/mdx/compile.ts` (if exists) - Add rehype-sanitize plugin

## Test Plan

### XSS Attack Vectors to Test
```typescript
const xssPayloads = [
  // Basic script injection
  '<script>alert("XSS")</script>',

  // Event handlers
  '<img src=x onerror="alert(\'XSS\')">',
  '<body onload="alert(\'XSS\')">',

  // JavaScript protocol
  '<a href="javascript:alert(\'XSS\')">Click</a>',

  // Encoded scripts
  '<script>alert(String.fromCharCode(88,83,83))</script>',

  // SVG-based XSS
  '<svg onload="alert(\'XSS\')"></svg>',

  // Data URI XSS
  '<iframe src="data:text/html,<script>alert(\'XSS\')</script>"></iframe>',

  // HTML entities
  '&lt;script&gt;alert("XSS")&lt;/script&gt;',

  // Nested tags
  '<div><script>alert("XSS")</script></div>',

  // Style-based XSS
  '<style>body { background: url("javascript:alert(\'XSS\')") }</style>',
];
```

### Manual Testing
```bash
# 1. Test blog content sanitization
# Create a blog post with XSS payload
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_session=YOUR_SESSION" \
  -d '{
    "title": "Test Post",
    "slug": "test-xss",
    "content": "<script>alert(\"XSS\")</script><p>Safe content</p>",
    "excerpt": "Test",
    "status": "draft"
  }'

# Expected: Post created but script tag removed

# 2. Verify rendered content
curl http://localhost:3000/blog/test-xss

# Expected: HTML should contain "<p>Safe content</p>" but NOT "<script>"

# 3. Test validation rejection
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_session=YOUR_SESSION" \
  -d '{
    "title": "<script>alert(1)</script>",
    "slug": "test-title-xss",
    "content": "Normal content"
  }'

# Expected: 400 Bad Request "Title cannot contain scripts"
```

### Automated Testing
```typescript
// tests/xss-protection.test.ts
import { describe, test, expect } from '@jest/globals';
import { sanitizeHtml, containsScripts, sanitizeUserInput } from '@/lib/utils/sanitize';

const xssPayloads = [
  '<script>alert("XSS")</script>',
  '<img src=x onerror="alert(\'XSS\')">',
  '<a href="javascript:alert(\'XSS\')">Click</a>',
  '<svg onload="alert(\'XSS\')"></svg>',
  '<iframe src="data:text/html,<script>alert(\'XSS\')</script>"></iframe>',
];

describe('XSS Protection', () => {
  test.each(xssPayloads)('should sanitize XSS payload: %s', (payload) => {
    const sanitized = sanitizeHtml(payload);

    // Should not contain script execution
    expect(sanitized).not.toContain('<script');
    expect(sanitized).not.toContain('onerror=');
    expect(sanitized).not.toContain('javascript:');
    expect(sanitized).not.toContain('onload=');
  });

  test('should preserve safe HTML', () => {
    const safeHtml = '<p>Hello <strong>world</strong></p><a href="https://example.com">Link</a>';
    const sanitized = sanitizeHtml(safeHtml);

    expect(sanitized).toContain('<p>');
    expect(sanitized).toContain('<strong>');
    expect(sanitized).toContain('<a href');
  });

  test('should add rel="noopener noreferrer" to external links', () => {
    const html = '<a href="https://external.com">External</a>';
    const sanitized = sanitizeHtml(html);

    expect(sanitized).toContain('rel="noopener noreferrer"');
    expect(sanitized).toContain('target="_blank"');
  });

  test('should detect scripts in content', () => {
    expect(containsScripts('<script>alert(1)</script>')).toBe(true);
    expect(containsScripts('<img onerror="alert(1)">')).toBe(true);
    expect(containsScripts('javascript:alert(1)')).toBe(true);
    expect(containsScripts('Normal content')).toBe(false);
  });

  test('should remove all HTML from user input', () => {
    const input = '<p>Hello <script>alert(1)</script></p>';
    const sanitized = sanitizeUserInput(input);

    expect(sanitized).toBe('Hello ');
    expect(sanitized).not.toContain('<');
  });
});
```

### E2E Testing
```typescript
// e2e/xss-protection.spec.ts
import { test, expect } from '@playwright/test';

test.describe('XSS Protection E2E', () => {
  test('should not execute injected scripts in blog posts', async ({ page }) => {
    let dialogOpened = false;

    page.on('dialog', () => {
      dialogOpened = true;
    });

    // Navigate to blog post with XSS attempt
    await page.goto('/blog/test-xss');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Verify no alert was triggered
    expect(dialogOpened).toBe(false);

    // Verify content is sanitized
    const content = await page.textContent('.blog-article-content');
    expect(content).not.toContain('<script>');
  });
});
```

## Definition of Done
- [ ] `isomorphic-dompurify` installato
- [ ] `lib/utils/sanitize.ts` creato con utilities
- [ ] Blog content sanitized in `BlogArticleClient.tsx`
- [ ] Analytics content sanitized in `Analytics3amClient.tsx`
- [ ] Input validation aggiornata in `schemas.ts`
- [ ] MDX compilation secured con rehype-sanitize (if applicable)
- [ ] All XSS payloads bloccati (nessun alert triggered)
- [ ] Safe HTML preserved (formatting, links, images)
- [ ] External links have rel="noopener noreferrer"
- [ ] All manual tests pass
- [ ] All automated tests pass
- [ ] Zero errori TypeScript
- [ ] Zero errori linting

---

## Note di Sicurezza
- **Defense in Depth**: Sanitize sia server-side che client-side
- **Allowlist Approach**: Solo tag/attributi whitelisted, non blacklist
- **CSP**: Implementare CSP header come second layer (SV-005)
- **Regular Updates**: Mantenere DOMPurify aggiornato (vulnerabilities)

## Riferimenti
- OWASP XSS Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
- DOMPurify: https://github.com/cure53/DOMPurify
- MDN XSS: https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting
