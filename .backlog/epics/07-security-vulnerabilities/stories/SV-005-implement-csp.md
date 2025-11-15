# [SV-005] Implement Content Security Policy (CSP)

## Metadata
- **Story ID**: SV-005
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** security engineer **Voglio** implementare Content Security Policy headers **Così che** il browser blocchi script injection e altri attacchi XSS

## Vulnerabilità Correlate (Security Audit)
- **7.1**: Missing Content Security Policy (HIGH)
- **7.2**: Missing Strict-Transport-Security (HSTS) (MEDIUM)
- **7.3**: Missing X-Permitted-Cross-Domain-Policies (LOW)

## Criteri di Accettazione
- [ ] **AC1**: CSP header implementato in `next.config.mjs`
- [ ] **AC2**: CSP permette solo script da origini trusted (self, CDN)
- [ ] **AC3**: Nonce-based CSP per inline scripts (se necessari)
- [ ] **AC4**: HSTS header implementato (max-age 1 anno)
- [ ] **AC5**: X-Permitted-Cross-Domain-Policies header implementato
- [ ] **AC6**: CSP violations loggati per monitoring
- [ ] **AC7**: Report-URI configurato per CSP reporting

## Implementazione Tecnica

### 1. Implement CSP Header in next.config.mjs

**File**: `next.config.mjs:47-63`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Existing headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },

          // NEW: Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              // Default fallback
              "default-src 'self'",

              // Scripts: self + trusted CDNs + nonce for inline
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com https://cloud.umami.is",

              // Styles: self + inline styles (for Tailwind)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // Fonts: self + Google Fonts
              "font-src 'self' https://fonts.gstatic.com data:",

              // Images: self + data URIs + trusted domains
              "img-src 'self' data: https: blob:",

              // Connect (AJAX/fetch): self + API endpoints
              "connect-src 'self' https://api.anthropic.com https://firestore.googleapis.com https://cloud.umami.is",

              // Frames: none (already have X-Frame-Options)
              "frame-src 'none'",

              // Objects/embeds: none
              "object-src 'none'",

              // Base URI: self only
              "base-uri 'self'",

              // Form actions: self only
              "form-action 'self'",

              // Frame ancestors: none
              "frame-ancestors 'none'",

              // Upgrade insecure requests
              "upgrade-insecure-requests",

              // CSP violation reporting
              "report-uri /api/csp-report",
            ].join('; '),
          },

          // NEW: Strict Transport Security (HSTS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },

          // NEW: Prevent cross-domain policy files
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },

          // NEW: Permissions Policy (formerly Feature-Policy)
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'interest-cohort=()', // Disable FLoC
            ].join(', '),
          },
        ],
      },
    ];
  },

  // ... rest of config
};

export default nextConfig;
```

### 2. Create CSP Violation Reporter

**File**: `app/api/csp-report/route.ts` (NEW)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';

export async function POST(req: NextRequest) {
  // Rate limit CSP reports (prevent flooding)
  await apiRateLimiter.checkLimit(req, {
    maxRequests: 50,
    windowMs: 60 * 1000, // 50 reports per minute
  });

  try {
    const report = await req.json();

    // Log CSP violation
    console.warn('[CSP VIOLATION]', JSON.stringify({
      timestamp: new Date().toISOString(),
      violation: report['csp-report'],
      userAgent: req.headers.get('user-agent'),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
    }, null, 2));

    // TODO: Send to monitoring service (Sentry, DataDog, etc.)
    // await sendToMonitoring('csp_violation', report);

    return NextResponse.json({ received: true }, { status: 204 });
  } catch (error) {
    console.error('[CSP REPORT ERROR]', error);
    return NextResponse.json({ error: 'Invalid report' }, { status: 400 });
  }
}
```

### 3. Nonce-Based CSP for Inline Scripts (if needed)

**File**: `app/layout.tsx`

```typescript
import { headers } from 'next/headers';
import crypto from 'crypto';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Generate nonce for inline scripts
  const nonce = crypto.randomBytes(16).toString('base64');

  return (
    <html lang="en">
      <head>
        {/* Inline script with nonce */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              // Inline script that requires nonce
              console.log('Initialized');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Update CSP to use nonce:
```javascript
"script-src 'self' 'nonce-{SERVER_GENERATED_NONCE}' https://cdn.jsdelivr.net",
```

**Note**: For Next.js, use middleware to inject nonce dynamically:

**File**: `middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

export function middleware(req: NextRequest) {
  const nonce = crypto.randomBytes(16).toString('base64');

  // Clone response
  const response = NextResponse.next();

  // Get existing CSP header
  const cspHeader = response.headers.get('Content-Security-Policy');

  if (cspHeader) {
    // Replace nonce placeholder
    const cspWithNonce = cspHeader.replace('{SERVER_GENERATED_NONCE}', nonce);
    response.headers.set('Content-Security-Policy', cspWithNonce);
  }

  // Pass nonce to request for use in layout
  response.headers.set('x-nonce', nonce);

  return response;
}
```

### 4. Environment-Based CSP Configuration

**File**: `lib/config/csp.ts` (NEW)

```typescript
export function getCSPDirectives(env: 'development' | 'production' = 'production') {
  const baseDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
    'img-src': ["'self'", 'data:', 'https:', 'blob:'],
    'connect-src': ["'self'", 'https://api.anthropic.com', 'https://firestore.googleapis.com', 'https://cloud.umami.is'],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': [],
  };

  // Development: Allow unsafe-eval for React DevTools
  if (env === 'development') {
    baseDirectives['script-src'].push("'unsafe-eval'", "'unsafe-inline'");
  } else {
    // Production: Stricter CSP
    baseDirectives['script-src'].push('https://cdn.jsdelivr.net', 'https://unpkg.com', 'https://cloud.umami.is');
    baseDirectives['report-uri'] = ['/api/csp-report'];
  }

  // Convert to CSP string
  return Object.entries(baseDirectives)
    .map(([key, values]) => {
      if (values.length === 0) return key;
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
}
```

Use in `next.config.mjs`:
```javascript
import { getCSPDirectives } from './lib/config/csp.ts';

const cspValue = getCSPDirectives(process.env.NODE_ENV === 'production' ? 'production' : 'development');

// In headers():
{
  key: 'Content-Security-Policy',
  value: cspValue,
}
```

## Files da Modificare
1. `next.config.mjs` - Add CSP, HSTS, X-Permitted-Cross-Domain-Policies headers
2. `app/api/csp-report/route.ts` (NEW) - CSP violation reporter
3. `lib/config/csp.ts` (NEW) - CSP configuration utility
4. `middleware.ts` (OPTIONAL) - Nonce generation for inline scripts

## Test Plan

### Manual Testing
```bash
# 1. Verify CSP header is present
curl -I http://localhost:3000
# Expected: Content-Security-Policy header present

# 2. Test CSP blocking inline script
# Add this to a page temporarily:
# <script>alert('Should be blocked')</script>
# Expected: Script blocked, CSP violation logged

# 3. Verify HSTS header
curl -I https://localhost:3000
# Expected: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# 4. Check CSP report endpoint
curl -X POST http://localhost:3000/api/csp-report \
  -H "Content-Type: application/json" \
  -d '{
    "csp-report": {
      "document-uri": "http://localhost:3000/",
      "violated-directive": "script-src",
      "blocked-uri": "eval"
    }
  }'
# Expected: 204 No Content, logged in console

# 5. Verify allowed scripts work
# Navigate to pages with:
# - Umami analytics script
# - External CDN scripts
# Expected: All load successfully
```

### Automated Testing
```typescript
// tests/csp.test.ts
import { describe, test, expect } from '@jest/globals';

describe('Content Security Policy', () => {
  test('should include CSP header in response', async () => {
    const res = await fetch('http://localhost:3000');
    const csp = res.headers.get('Content-Security-Policy');

    expect(csp).toBeTruthy();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src");
    expect(csp).toContain("style-src");
  });

  test('should include HSTS header', async () => {
    const res = await fetch('https://localhost:3000');
    const hsts = res.headers.get('Strict-Transport-Security');

    expect(hsts).toBe('max-age=31536000; includeSubDomains; preload');
  });

  test('should block inline scripts in production', async () => {
    // Set NODE_ENV=production
    const csp = getCSPDirectives('production');

    expect(csp).not.toContain("'unsafe-inline'");
    expect(csp).not.toContain("'unsafe-eval'");
  });

  test('should allow inline scripts in development', async () => {
    const csp = getCSPDirectives('development');

    expect(csp).toContain("'unsafe-inline'");
    expect(csp).toContain("'unsafe-eval'");
  });
});
```

### Browser Testing
```typescript
// e2e/csp.spec.ts
import { test, expect } from '@playwright/test';

test.describe('CSP Browser Tests', () => {
  test('should block inline script execution', async ({ page }) => {
    let alertFired = false;

    page.on('dialog', () => {
      alertFired = true;
    });

    // Inject inline script (should be blocked by CSP)
    await page.goto('/');
    await page.evaluate(() => {
      const script = document.createElement('script');
      script.textContent = "alert('CSP should block this')";
      document.body.appendChild(script);
    });

    await page.waitForTimeout(1000);

    expect(alertFired).toBe(false);
  });

  test('should allow whitelisted external scripts', async ({ page }) => {
    await page.goto('/');

    // Check if Umami analytics loaded (whitelisted)
    const umamiLoaded = await page.evaluate(() => {
      return window.umami !== undefined;
    });

    expect(umamiLoaded).toBe(true);
  });

  test('should report CSP violations', async ({ page }) => {
    const violations: any[] = [];

    // Listen for CSP violations
    page.on('console', (msg) => {
      if (msg.text().includes('CSP')) {
        violations.push(msg.text());
      }
    });

    await page.goto('/');

    // Trigger CSP violation
    await page.evaluate(() => {
      eval('console.log("This should be blocked")');
    });

    await page.waitForTimeout(500);

    expect(violations.length).toBeGreaterThan(0);
  });
});
```

## Definition of Done
- [ ] CSP header implementato in `next.config.mjs`
- [ ] HSTS header implementato
- [ ] X-Permitted-Cross-Domain-Policies header implementato
- [ ] Permissions-Policy header implementato
- [ ] CSP violation reporter creato (`/api/csp-report`)
- [ ] CSP configuration utility creata (`lib/config/csp.ts`)
- [ ] Development CSP permette React DevTools
- [ ] Production CSP blocca unsafe-inline/unsafe-eval
- [ ] Inline scripts bloccati in browser
- [ ] Whitelisted scripts funzionano (Umami, CDN)
- [ ] CSP violations loggati
- [ ] All manual tests pass
- [ ] All automated tests pass
- [ ] Zero errori TypeScript
- [ ] Zero errori linting

---

## Note di Sicurezza
- **Report-Only Mode**: Iniziare con `Content-Security-Policy-Report-Only` per testing
- **Gradual Rollout**: Abilitare CSP progressivamente (prima report-only, poi enforce)
- **Monitoring**: Monitorare CSP violations per identificare false positives
- **HSTS Preload**: Considerare submission a HSTS preload list
- **Nonce Rotation**: Generare nonce unico per ogni request

## Riferimenti
- MDN CSP: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- CSP Evaluator: https://csp-evaluator.withgoogle.com/
- HSTS Preload: https://hstspreload.org/
- Content Security Policy Generator: https://report-uri.com/home/generate
