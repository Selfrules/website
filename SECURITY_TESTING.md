# Security Testing Checklist

Comprehensive security testing procedures and validation tools for the portfolio website.

## Pre-Deployment Security Checklist

### Authentication & Authorization

- [ ] **Environment Variables**
  - [ ] All secrets in environment variables, not hardcoded
  - [ ] Environment validation runs on startup
  - [ ] No NEXT_PUBLIC_ prefix on sensitive variables
  - [ ] Different secrets for dev/staging/production

- [ ] **OAuth2 Flow**
  - [ ] PKCE implemented for Google Calendar
  - [ ] State parameter validated
  - [ ] Tokens encrypted at rest (AES-256-GCM)
  - [ ] Automatic token refresh working
  - [ ] Token revocation implemented

- [ ] **Session Management**
  - [ ] Secure session cookies (httpOnly, secure, sameSite)
  - [ ] Session timeout configured (30 minutes idle)
  - [ ] Session invalidation on logout
  - [ ] CSRF protection enabled

### Input Validation & Sanitization

- [ ] **Validation Schemas**
  - [ ] All API inputs validated with Zod schemas
  - [ ] File uploads validated (type, size, extension)
  - [ ] Email addresses validated and sanitized
  - [ ] Phone numbers validated with regex
  - [ ] URLs validated and checked against whitelist

- [ ] **Sanitization**
  - [ ] HTML content sanitized with DOMPurify
  - [ ] Markdown content sanitized
  - [ ] SQL injection prevented (Prisma parameterized queries)
  - [ ] XSS prevention in content rendering
  - [ ] Path traversal prevention in file operations

### Rate Limiting & DDoS Protection

- [ ] **Rate Limits Configured**
  - [ ] Public endpoints: 30 req/min
  - [ ] Chat endpoint: 10 req/min
  - [ ] Calendar booking: 5 req/min
  - [ ] Admin endpoints: 100 req/min
  - [ ] Analytics: 50 req/min

- [ ] **Rate Limit Headers**
  - [ ] X-RateLimit-Limit header present
  - [ ] X-RateLimit-Remaining header present
  - [ ] X-RateLimit-Reset header present
  - [ ] Retry-After header on 429 responses

- [ ] **Implementation**
  - [ ] Redis enabled in production
  - [ ] Sliding window algorithm working
  - [ ] Per-IP rate limiting
  - [ ] Rate limit bypass for admins

### CORS & Security Headers

- [ ] **CORS Configuration**
  - [ ] Whitelist configured for allowed origins
  - [ ] Credentials enabled only for trusted origins
  - [ ] Preflight requests handled correctly
  - [ ] No wildcard (*) origins in production

- [ ] **Security Headers**
  - [ ] Content-Security-Policy configured
  - [ ] Strict-Transport-Security enabled (HSTS)
  - [ ] X-Frame-Options: DENY set
  - [ ] X-Content-Type-Options: nosniff set
  - [ ] X-XSS-Protection: 1; mode=block set
  - [ ] Referrer-Policy configured
  - [ ] Permissions-Policy configured

### GDPR Compliance

- [ ] **Consent Management**
  - [ ] Cookie consent banner implemented
  - [ ] Consent preferences stored securely
  - [ ] Consent version tracking
  - [ ] No tracking without consent

- [ ] **Data Subject Rights**
  - [ ] Data export endpoint implemented
  - [ ] Data deletion endpoint implemented
  - [ ] Confirmation email for deletion
  - [ ] 48-hour deletion processing
  - [ ] Retention policy documented

- [ ] **Privacy**
  - [ ] Privacy policy accessible
  - [ ] Data collection disclosed
  - [ ] Third-party integrations listed
  - [ ] Data processors identified

### Data Encryption

- [ ] **At Rest**
  - [ ] OAuth tokens encrypted (AES-256-GCM)
  - [ ] Passwords hashed with bcrypt (cost 12+)
  - [ ] PII encrypted in database
  - [ ] Encryption keys stored securely

- [ ] **In Transit**
  - [ ] HTTPS enforced (no HTTP)
  - [ ] TLS 1.2+ only
  - [ ] Strong cipher suites
  - [ ] HSTS header configured

### API Security

- [ ] **Claude API**
  - [ ] API key not exposed to client
  - [ ] Input length limits enforced
  - [ ] Response validation
  - [ ] Error messages sanitized

- [ ] **Google Calendar API**
  - [ ] OAuth2 flow secure
  - [ ] Scope minimization (readonly + events only)
  - [ ] Token storage encrypted
  - [ ] API errors handled gracefully

- [ ] **Spotify API**
  - [ ] Client secret not exposed
  - [ ] Refresh token encrypted
  - [ ] API rate limits respected
  - [ ] Fallback for API failures

## Security Testing Tools

### 1. Environment Validation

**Test**: Ensure all required environment variables are present and valid

```bash
# Run validation
npm run validate:env

# Expected output
✅ Environment validation successful
📍 Environment: production
🌐 App URL: https://mattia-portfolio.com
🗄️  Database: configured
🔐 Redis: enabled
🤖 AI Chatbot: enabled
📅 Calendar: enabled
```

**Automated Test**:
```typescript
// tests/security/env.test.ts
import { validateEnvironment } from '@/lib/security/config/env';

describe('Environment Validation', () => {
  it('should validate all required variables', () => {
    expect(() => validateEnvironment()).not.toThrow();
  });
});
```

### 2. Rate Limiting Test

**Test**: Verify rate limits are enforced

```bash
# Test rate limit on chat endpoint
for i in {1..15}; do
  curl -X POST https://mattia-portfolio.com/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message":"test"}' \
    -w "\n%{http_code}\n"
done

# Expected: First 10 succeed (200), remaining fail (429)
```

**Automated Test**:
```typescript
// tests/security/rateLimit.test.ts
import { checkRateLimit } from '@/lib/security/middleware/rateLimit';

describe('Rate Limiting', () => {
  it('should block after max requests', async () => {
    // Make 11 requests (limit is 10)
    for (let i = 0; i < 11; i++) {
      const result = await checkRateLimit(mockRequest, 'chat');
      if (i < 10) {
        expect(result.allowed).toBe(true);
      } else {
        expect(result.allowed).toBe(false);
      }
    }
  });
});
```

### 3. Input Validation Test

**Test**: Verify all schemas reject invalid input

```bash
# Test invalid email
curl -X POST https://mattia-portfolio.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email","message":"test"}'

# Expected: 400 Bad Request with validation errors
```

**Automated Test**:
```typescript
// tests/security/validation.test.ts
import { contactFormSchema } from '@/lib/security/validation/schemas';

describe('Input Validation', () => {
  it('should reject invalid email', () => {
    expect(() => {
      contactFormSchema.parse({
        email: 'invalid',
        message: 'test',
        name: 'Test',
        subject: 'Test',
        gdprConsent: true,
      });
    }).toThrow();
  });

  it('should reject XSS attempts', () => {
    const malicious = '<script>alert("xss")</script>';
    expect(() => {
      contactFormSchema.parse({
        email: 'test@example.com',
        message: malicious,
        name: 'Test',
        subject: 'Test',
        gdprConsent: true,
      });
    }).not.toThrow(); // Should pass validation but be sanitized later
  });
});
```

### 4. CORS Test

**Test**: Verify CORS policy is enforced

```bash
# Test from unauthorized origin
curl -X POST https://mattia-portfolio.com/api/chat \
  -H "Origin: https://evil-site.com" \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}' \
  -v

# Expected: No Access-Control-Allow-Origin header or 403
```

**Automated Test**:
```typescript
// tests/security/cors.test.ts
import { isOriginAllowed } from '@/lib/security/config/cors';

describe('CORS Configuration', () => {
  it('should allow production domain', () => {
    expect(isOriginAllowed('https://mattia-portfolio.com')).toBe(true);
  });

  it('should block unauthorized domains', () => {
    expect(isOriginAllowed('https://evil-site.com')).toBe(false);
  });

  it('should block null origin', () => {
    expect(isOriginAllowed(null)).toBe(false);
  });
});
```

### 5. Security Headers Test

**Test**: Verify all security headers are present

```bash
# Check security headers
curl -I https://mattia-portfolio.com

# Expected headers:
# Content-Security-Policy: ...
# Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
```

**Automated Test**:
```typescript
// tests/security/headers.test.ts
import { getSecurityHeaders } from '@/lib/security/config/headers';

describe('Security Headers', () => {
  it('should include all required headers', () => {
    const headers = getSecurityHeaders();

    expect(headers['Content-Security-Policy']).toBeDefined();
    expect(headers['Strict-Transport-Security']).toContain('max-age');
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
  });
});
```

### 6. OAuth2 Security Test

**Test**: Verify PKCE flow is secure

```typescript
// tests/security/oauth.test.ts
import { PKCEGenerator, GoogleCalendarOAuth } from '@/lib/security/oauth/googleCalendar';

describe('OAuth2 PKCE Flow', () => {
  it('should generate valid code verifier and challenge', () => {
    const pkce = new PKCEGenerator();
    const verifier = pkce.getVerifier();
    const challenge = pkce.getChallenge();

    expect(verifier).toHaveLength(43); // Base64url of 32 bytes
    expect(challenge).toHaveLength(43);
    expect(verifier).not.toBe(challenge);
  });

  it('should encrypt and decrypt tokens', () => {
    const oauth = new GoogleCalendarOAuth(mockConfig, mockEncryptionKey);
    const tokens = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      expiresAt: Date.now() + 3600000,
      scope: ['calendar.readonly'],
    };

    const encrypted = oauth.encryptTokens(tokens);
    const decrypted = oauth.decryptTokens(encrypted);

    expect(decrypted).toEqual(tokens);
  });
});
```

### 7. Sanitization Test

**Test**: Verify input sanitization prevents XSS

```typescript
// tests/security/sanitization.test.ts
import { sanitizeHTML, sanitizeChatMessage } from '@/lib/security/sanitization/sanitize';

describe('Input Sanitization', () => {
  it('should remove script tags', () => {
    const malicious = '<script>alert("xss")</script><p>Safe</p>';
    const sanitized = sanitizeHTML(malicious);

    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('<p>Safe</p>');
  });

  it('should remove event handlers', () => {
    const malicious = '<img src="x" onerror="alert(\'xss\')">';
    const sanitized = sanitizeHTML(malicious);

    expect(sanitized).not.toContain('onerror');
  });

  it('should sanitize chat messages', () => {
    const message = '  Test\u200B\u200Cmessage\n\n\n\nwith\n\n\n\nspaces  ';
    const sanitized = sanitizeChatMessage(message);

    expect(sanitized).toBe('Test message\n\nwith\n\nspaces');
  });
});
```

### 8. GDPR Compliance Test

**Test**: Verify data export and deletion

```typescript
// tests/security/gdpr.test.ts
import { DataExportService, DataDeletionService } from '@/lib/security/gdpr';

describe('GDPR Compliance', () => {
  it('should export user data', async () => {
    const service = new DataExportService();
    const data = await service.exportJSON('user123');

    expect(data.user).toBeDefined();
    expect(data.conversations).toBeDefined();
    expect(data.consent).toBeDefined();
  });

  it('should delete user data', async () => {
    const service = new DataDeletionService();
    const request = await service.createDeletionRequest(
      'user123',
      'user@example.com'
    );

    expect(request.confirmationToken).toBeDefined();
    expect(request.requestedAt).toBeInstanceOf(Date);
  });
});
```

## Penetration Testing Scenarios

### 1. SQL Injection Attempt
```bash
# Attempt SQL injection in search
curl -X GET "https://mattia-portfolio.com/api/blog?search='; DROP TABLE users; --"

# Expected: Escaped by Prisma, no SQL execution
```

### 2. Path Traversal Attempt
```bash
# Attempt to access sensitive files
curl "https://mattia-portfolio.com/api/files?path=../../.env"

# Expected: 400 Bad Request or 403 Forbidden
```

### 3. XSS Injection Attempt
```bash
# Attempt stored XSS in blog comment
curl -X POST https://mattia-portfolio.com/api/comments \
  -H "Content-Type: application/json" \
  -d '{"content":"<script>document.cookie</script>"}'

# Expected: Content sanitized, script tags removed
```

### 4. CSRF Attack Simulation
```bash
# Attempt cross-site request without CSRF token
curl -X POST https://mattia-portfolio.com/api/admin/delete \
  -H "Cookie: session=xxx" \
  -H "Origin: https://evil-site.com"

# Expected: 403 Forbidden (CSRF token missing or invalid)
```

### 5. Brute Force Attack
```bash
# Attempt multiple login attempts
for i in {1..10}; do
  curl -X POST https://mattia-portfolio.com/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@example.com","password":"wrong'$i'"}'
done

# Expected: Rate limited after 5 attempts
```

## Continuous Security Monitoring

### GitHub Actions Security Workflow

```yaml
# .github/workflows/security.yml
name: Security Checks
on: [push, pull_request]

jobs:
  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: TruffleHog Scan
        uses: trufflesecurity/trufflehog@main

  dependency-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run npm audit
        run: npm audit --audit-level=moderate

  security-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run security tests
        run: npm run test:security
```

### Security Metrics Dashboard

Track these metrics in production:

- Failed authentication attempts
- Rate limit violations
- CORS policy violations
- Validation errors
- API error rates
- Token refresh failures
- Unusual access patterns

## Vulnerability Response Plan

### Severity Levels

**Critical** (Fix within 24 hours):
- Authentication bypass
- SQL injection
- Remote code execution
- Data breach

**High** (Fix within 7 days):
- XSS vulnerabilities
- CSRF vulnerabilities
- Privilege escalation
- Information disclosure

**Medium** (Fix within 30 days):
- Missing security headers
- Weak encryption
- Rate limiting issues
- Input validation gaps

**Low** (Fix in next release):
- Security best practice violations
- Documentation issues
- Non-critical configurations

### Response Checklist

- [ ] Vulnerability identified and confirmed
- [ ] Severity assessed
- [ ] Affected systems identified
- [ ] Fix developed and tested
- [ ] Security review completed
- [ ] Deployment scheduled
- [ ] Monitoring enabled
- [ ] Post-mortem documented

## Security Audit Schedule

- **Daily**: Automated security tests in CI/CD
- **Weekly**: Review security logs and alerts
- **Monthly**: Dependency vulnerability scan
- **Quarterly**: Full penetration test
- **Annually**: Third-party security audit
