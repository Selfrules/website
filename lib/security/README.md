# Security Module

Comprehensive security implementation for the Mattia Portfolio website.

## Overview

This security module provides enterprise-grade security features including:

- **Rate Limiting**: Sliding window algorithm with Redis support
- **CORS**: Domain whitelist with preflight handling
- **Input Validation**: Zod schemas for all API endpoints
- **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- **OAuth2**: PKCE flow for Google Calendar with token encryption
- **Sanitization**: XSS prevention and input cleaning
- **GDPR**: Consent management, data export, data deletion
- **Environment Validation**: Startup checks for all required variables

## Directory Structure

```
lib/security/
├── config/           # Configuration files
│   ├── cors.ts      # CORS settings and whitelist
│   ├── headers.ts   # Security headers (CSP, HSTS, etc.)
│   └── env.ts       # Environment variable validation
├── middleware/       # Request middleware
│   └── rateLimit.ts # Rate limiting implementation
├── validation/       # Input validation
│   └── schemas.ts   # Zod validation schemas
├── sanitization/     # Input sanitization
│   └── sanitize.ts  # XSS prevention and cleaning
├── oauth/           # OAuth2 implementations
│   └── googleCalendar.ts # Google Calendar OAuth2 + PKCE
├── gdpr/            # GDPR compliance
│   ├── consent.ts   # Cookie consent management
│   ├── dataExport.ts # Right to data portability
│   └── dataDeletion.ts # Right to erasure
├── utils/           # Security utilities
│   ├── crypto.ts    # Cryptographic functions
│   └── helpers.ts   # Security helper functions
├── types/           # TypeScript type definitions
│   └── index.ts     # Shared types
└── index.ts         # Main exports
```

## Quick Start

### 1. Install Dependencies

```bash
npm install zod isomorphic-dompurify googleapis bcryptjs
npm install -D @types/bcryptjs
```

### 2. Setup Environment Variables

```bash
cp .env.example .env.local
```

See [SECRETS_MANAGEMENT.md](../../SECRETS_MANAGEMENT.md) for details.

### 3. Validate Environment

```typescript
import { validateEnvironment } from '@/lib/security';

// In your app startup (e.g., app/layout.tsx or middleware)
validateEnvironment();
```

## Usage Examples

### Rate Limiting

```typescript
// app/api/chat/route.ts
import { rateLimitMiddleware } from '@/lib/security';

export async function POST(request: NextRequest) {
  // Check rate limit
  const rateLimitResult = await rateLimitMiddleware('chat')(request);

  if (rateLimitResult instanceof NextResponse) {
    return rateLimitResult; // Rate limit exceeded
  }

  // Process request...
  return NextResponse.json({ success: true });
}
```

### CORS

```typescript
// middleware.ts
import { getCORSHeaders } from '@/lib/security';

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCORSHeaders(origin);

  return NextResponse.next({
    headers: corsHeaders,
  });
}
```

### Input Validation

```typescript
// app/api/contact/route.ts
import { contactFormSchema, validateSafe } from '@/lib/security';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = validateSafe(contactFormSchema, body);

  if (!result.success) {
    return NextResponse.json(
      { errors: formatValidationErrors(result.errors) },
      { status: 400 }
    );
  }

  // Use validated data
  const validData = result.data;
  // ...
}
```

### Security Headers

```typescript
// middleware.ts
import { applySecurityHeaders } from '@/lib/security';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  applySecurityHeaders(response.headers);
  return response;
}
```

### Input Sanitization

```typescript
import { sanitizeHTML, sanitizeChatMessage } from '@/lib/security';

// Sanitize user input
const clean = sanitizeHTML(userInput);

// Sanitize chat message
const cleanMessage = sanitizeChatMessage(chatInput);
```

### OAuth2 with PKCE

```typescript
import { createGoogleCalendarOAuth } from '@/lib/security';

const oauth = createGoogleCalendarOAuth(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!,
  process.env.ENCRYPTION_KEY!
);

// Generate auth URL
const { url, codeVerifier, state } = await oauth.generateAuthUrl();

// Exchange code for tokens
const tokens = await oauth.exchangeCodeForTokens(code, codeVerifier);

// Encrypt tokens for storage
const encrypted = oauth.encryptTokens(tokens);
```

### GDPR Consent

```typescript
import { ConsentManager, CookieCategory } from '@/lib/security';

// Check if analytics is allowed
if (ConsentManager.isAllowed(CookieCategory.ANALYTICS)) {
  // Track analytics
}

// Save consent
ConsentManager.saveConsent({
  necessary: true,
  analytics: true,
  marketing: false,
  preferences: true,
});
```

### Data Export

```typescript
import { DataExportService } from '@/lib/security';

const service = new DataExportService();
await service.createExportRequest(userId, email, 'json');
```

### Data Deletion

```typescript
import { DataDeletionService } from '@/lib/security';

const service = new DataDeletionService();
const request = await service.createDeletionRequest(userId, email, reason);
```

## API Route Examples

### Complete Secured API Route

```typescript
// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  rateLimitMiddleware,
  getCORSHeaders,
  validateSafe,
  sanitizeForDB,
  applySecurityHeaders,
} from '@/lib/security';

export async function POST(request: NextRequest) {
  // 1. Check rate limit
  const rateLimitResult = await rateLimitMiddleware('admin')(request);
  if (rateLimitResult instanceof NextResponse) {
    return rateLimitResult;
  }

  // 2. Validate CORS
  const origin = request.headers.get('origin');
  const corsHeaders = getCORSHeaders(origin);
  if (Object.keys(corsHeaders).length === 0) {
    return NextResponse.json(
      { error: 'Origin not allowed' },
      { status: 403 }
    );
  }

  // 3. Validate input
  const body = await request.json();
  const result = validateSafe(yourSchema, body);

  if (!result.success) {
    return NextResponse.json(
      { errors: formatValidationErrors(result.errors) },
      { status: 400 }
    );
  }

  // 4. Sanitize data
  const sanitizedData = sanitizeForDB(result.data);

  // 5. Process request
  // ... your business logic ...

  // 6. Return response with security headers
  const response = NextResponse.json({ success: true });
  applySecurityHeaders(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
```

## Testing

See [SECURITY_TESTING.md](../../SECURITY_TESTING.md) for comprehensive testing procedures.

### Run Security Tests

```bash
# All security tests
npm run test:security

# Specific tests
npm run test tests/security/rateLimit.test.ts
npm run test tests/security/validation.test.ts
npm run test tests/security/sanitization.test.ts
```

### Manual Testing

```bash
# Test rate limiting
for i in {1..15}; do curl -X POST http://localhost:3000/api/chat; done

# Test CORS
curl -X POST http://localhost:3000/api/chat \
  -H "Origin: https://evil-site.com" \
  -v

# Test validation
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid"}'
```

## Configuration

### Rate Limits

Edit `lib/security/middleware/rateLimit.ts`:

```typescript
export const RATE_LIMITS: RateLimitByEndpoint = {
  public: { windowMs: 60000, maxRequests: 30 },
  chat: { windowMs: 60000, maxRequests: 10 },
  // ... customize per endpoint
};
```

### CORS Origins

Edit `lib/security/config/cors.ts`:

```typescript
const ALLOWED_ORIGINS = {
  production: ['https://your-domain.com'],
  // ... add your domains
};
```

### Security Headers

Edit `lib/security/config/headers.ts`:

```typescript
function getContentSecurityPolicy(): string {
  // ... customize CSP directives
}
```

## Best Practices

### ✅ DO

1. **Validate all inputs**
   ```typescript
   const result = validateSafe(schema, input);
   if (!result.success) throw new Error();
   ```

2. **Sanitize all user content**
   ```typescript
   const clean = sanitizeHTML(userContent);
   ```

3. **Use environment variables for secrets**
   ```typescript
   const apiKey = process.env.API_KEY;
   ```

4. **Apply rate limiting to all public endpoints**
   ```typescript
   await rateLimitMiddleware('public')(request);
   ```

5. **Check CORS for cross-origin requests**
   ```typescript
   const corsHeaders = getCORSHeaders(origin);
   ```

### ❌ DON'T

1. **Never hardcode secrets**
2. **Never trust user input**
3. **Never skip validation**
4. **Never expose internal errors to clients**
5. **Never use weak encryption**

## Security Checklist

Before deployment, ensure:

- [ ] All environment variables validated
- [ ] Rate limiting enabled on all public endpoints
- [ ] CORS configured with whitelist (no wildcards)
- [ ] Security headers applied to all responses
- [ ] All inputs validated with Zod schemas
- [ ] All user content sanitized
- [ ] OAuth2 using PKCE flow
- [ ] Tokens encrypted at rest
- [ ] GDPR consent banner implemented
- [ ] Data export endpoint working
- [ ] Data deletion endpoint working
- [ ] Secrets rotation policy documented
- [ ] Security tests passing
- [ ] Penetration testing completed

## Troubleshooting

### Environment Validation Fails

```bash
# Check which variables are missing
npm run validate:env

# Verify .env.local exists
ls -la .env.local

# Check gitignore
grep ".env.local" .gitignore
```

### Rate Limiting Not Working

```bash
# Check Redis connection
redis-cli ping

# Check rate limit configuration
grep "RATE_LIMIT" .env.local
```

### CORS Errors

```bash
# Check allowed origins
grep "ALLOWED_ORIGINS" lib/security/config/cors.ts

# Test with correct origin
curl -H "Origin: https://your-domain.com" http://localhost:3000/api/test
```

## Support

- **Documentation**: See [SECURITY_TESTING.md](../../SECURITY_TESTING.md) and [SECRETS_MANAGEMENT.md](../../SECRETS_MANAGEMENT.md)
- **Issues**: Check for common issues in troubleshooting section
- **Security Incidents**: Follow incident response plan in SECRETS_MANAGEMENT.md

## License

This security module is part of the Mattia Portfolio project.
