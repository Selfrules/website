# Security Audit Report - Next.js Portfolio Application
**Date**: 2025-11-15
**Severity Level Summary**: 11 Critical/High | 6 Medium | 3 Low

---

## 1. XSS VULNERABILITIES

### 1.1 Unsafe HTML Rendering with dangerouslySetInnerHTML
**Location**: `/home/user/website/components/blog/BlogArticleClient.tsx:310`
**Severity**: HIGH
**Issue**: Direct use of `dangerouslySetInnerHTML` without HTML sanitization for blog content
```tsx
<div
  className="prose prose-lg max-w-none blog-article-content"
  dangerouslySetInnerHTML={{ __html: contentHtml }}
/>
```
**Impact**: 
- Potential XSS attacks if blog content is dynamically generated or user-controlled
- HTML injection through markdown compilation
**Recommended Fix**:
- Use DOMPurify or similar library to sanitize HTML before rendering
- Consider using `<Markdown>` component instead of raw HTML
- Implement Content Security Policy to restrict inline scripts

### 1.2 Unsafe HTML Rendering in Analytics Component
**Location**: `/home/user/website/app/[locale]/blog/3am-analytics-test/Analytics3amClient.tsx`
**Severity**: HIGH
**Issue**: Another instance of `dangerouslySetInnerHTML` without sanitization
```tsx
dangerouslySetInnerHTML={{ __html: formatContent(sectionContent) }}
```
**Impact**: Same as above - XSS vulnerability
**Recommended Fix**: Apply same sanitization approach

---

## 2. AUTHENTICATION & AUTHORIZATION ISSUES

### 2.1 Admin Password Using Plain-Text Comparison (Not Hashed)
**Location**: `/home/user/website/lib/auth/admin.ts:24`
**Severity**: CRITICAL
**Issue**: Admin password verification uses direct string comparison instead of bcrypt
```ts
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
```
**Current State**: Environment variable contains the actual password
**Impact**:
- If .env is exposed, attacker has direct access
- No protection against brute force attacks
- Violates security best practices
**Recommended Fix**:
- Use bcrypt for password hashing (library already imported elsewhere)
- Store only the hash in environment variables
- Implement rate limiting on login attempts
- Use the existing NextAuth bcrypt implementation

### 2.2 Inconsistent Authentication Implementation
**Location**: Multiple admin routes use different auth methods
**Severity**: HIGH
**Issue**:
- `/api/admin/login` uses custom admin.ts auth
- `/api/admin/ai/generate` uses custom admin.ts auth
- `/api/admin/stats` uses `getServerSession(authOptions)` (NextAuth)
- `/api/admin/analytics-data` uses `getServerSession(authOptions)` (NextAuth)
**Impact**: Inconsistent security posture across admin endpoints
**Recommended Fix**: Standardize on one authentication method (NextAuth recommended)

### 2.3 Missing Authentication on GET Questions Endpoint
**Location**: `/home/user/website/app/api/questions/route.ts:79-107`
**Severity**: CRITICAL
**Issue**: GET /api/questions endpoint has no authentication check but retrieves admin data
```ts
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'pending';
    // NO AUTH CHECK - directly queries all questions
    const questions = await queryDocumentsAdmin<Question>(...)
```
**Impact**:
- Any user can retrieve all submitted questions
- No admin verification
- Information disclosure vulnerability
**Recommended Fix**: Add admin authentication check before querying

### 2.4 Missing Admin Authentication on Blog Write Operations
**Location**: `/home/user/website/app/api/blog/route.ts:85-122` (POST) and `/home/user/website/app/api/blog/[slug]/route.ts:59-104` (PUT/DELETE)
**Severity**: CRITICAL
**Issue**: Blog POST, PUT, DELETE operations don't require admin authentication
```ts
export async function POST(req: NextRequest) {
  // No admin auth check - anyone can create blog posts
  const validatedData = createBlogPostSchema.parse(body);
  const post = await createDocumentAdmin<BlogPost>(...)
}
```
**Impact**:
- Anyone can create, modify, or delete blog posts
- Content tampering vulnerability
- Unauthorized content publication
**Recommended Fix**: Add admin authentication check using NextAuth or custom admin middleware

### 2.5 Unprotected Analytics Data Access
**Location**: `/home/user/website/app/api/analytics/route.ts:26-91` (GET) and POST endpoints
**Severity**: HIGH
**Issue**: Analytics endpoints allow any user to query analytics data without authorization
```ts
export async function GET(req: NextRequest) {
  await apiRateLimiter.checkLimit(req);
  // Rate limited but NO AUTH CHECK - can query anyone's analytics
  const validatedParams = getAnalyticsEventsSchema.parse(params);
```
**Impact**:
- Information disclosure of user activity patterns
- Can identify user behavior and session information
- Privacy violation
**Recommended Fix**: 
- Implement admin authentication for analytics endpoints
- Consider separate endpoints for public analytics vs. admin analytics

---

## 3. CORS & CROSS-ORIGIN ISSUES

### 3.1 Wildcard CORS Allow in Chat Stream Endpoint
**Location**: `/home/user/website/app/api/chat/stream/route.ts:186 and 221`
**Severity**: HIGH
**Issue**: Hardcoded wildcard CORS origin instead of environment-based whitelist
```ts
'Access-Control-Allow-Origin': '*',
// AND in OPTIONS handler:
'Access-Control-Allow-Origin': '*',
```
**Impact**:
- Allows any domain to access chat stream
- Circumvents CORS protection
- Potential CSRF and data exfiltration attacks
**Recommended Fix**:
- Use the existing `addCorsHeaders` utility which respects ALLOWED_ORIGINS
- Replace with:
```ts
return addCorsHeaders(response, req);
```

### 3.2 Permissive CORS Configuration in Development
**Location**: `/home/user/website/lib/middleware/cors.ts:31-33`
**Severity**: MEDIUM
**Issue**: Allows any request from localhost and accepts environment variable without validation
```ts
const isAllowedOrigin = config.allowedOrigins?.includes(origin) ||
                        config.allowedOrigins?.includes('*') ||
                        (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost'));
```
**Impact**: If wildcard is set in ALLOWED_ORIGINS, it defeats CORS
**Recommended Fix**: Validate against actual domain list, warn if wildcard detected

---

## 4. CSRF PROTECTION

### 4.1 Missing CSRF Tokens on State-Changing Operations
**Location**: All POST/PUT/DELETE/PATCH API routes
**Severity**: MEDIUM
**Issue**: No CSRF token validation on form submissions or API mutations
```ts
// All these routes accept requests without CSRF verification
export async function POST(req: NextRequest) {
  const body = await req.json();
  // No CSRF check
}
```
**Impact**: 
- CSRF attacks possible (especially for authenticated operations)
- Unauthorized actions could be triggered from third-party sites
**Recommended Fix**:
- Implement CSRF tokens in forms and API requests
- Validate tokens on state-changing operations
- Use SameSite cookie attribute (already set to 'lax' for admin sessions)

---

## 5. INPUT VALIDATION & SANITIZATION

### 5.1 Limited Input Validation for Blog Content
**Location**: `/home/user/website/lib/validations/schemas.ts:9-21`
**Severity**: MEDIUM
**Issue**: Blog content field only has length validation, no HTML/code validation
```ts
export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  content: z.string().min(1, 'Content is required'),  // Only length check!
```
**Impact**:
- Allows arbitrary HTML/JavaScript in content
- Relies on frontend sanitization (unreliable)
- Content injection possible
**Recommended Fix**:
- Add HTML validation/sanitization at validation layer
- Use DOMPurify on content field
- Or enforce Markdown-only content

### 5.2 Incomplete Slug Validation
**Location**: `/home/user/website/lib/validations/schemas.ts:11`
**Severity**: LOW
**Issue**: Slug regex allows hyphens but doesn't prevent double-hyphens or leading/trailing hyphens
```ts
slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
```
**Recommended Fix**: Refine regex to prevent edge cases:
```ts
regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/)
```

---

## 6. SECRETS & CREDENTIALS MANAGEMENT

### 6.1 Default Bcrypt Hash in .env.example
**Location**: `/home/user/website/.env.example:44`
**Severity**: CRITICAL
**Issue**: Default password hash included in example file
```env
ADMIN_PASSWORD_HASH=$2a$12$JvWRVN79guQ8lFFfUhNQFeJ7pdLQJ.gYahsq0aKGONYpCqz42FKXq
```
**Impact**:
- Known default credentials discoverable
- Anyone with access to .env.example can access with default password
- Development password visible in version control
**Recommended Fix**:
- Remove default hash or use placeholder like "HASH_HERE"
- Add pre-deployment check to ensure hash is changed
- Document required password generation

### 6.2 Firebase Private Key in Environment Variables
**Location**: `/home/user/website/.env.example:28`
**Severity**: CRITICAL (if exposed)
**Issue**: Firebase admin private key must be in environment variables
```env
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
```
**Impact**: 
- If .env is exposed (common in git history), full database access is compromised
- Critical for Firebase security
**Recommended Fix**:
- Use Firebase environment-based authentication when on Google Cloud
- Never commit actual keys
- Rotate keys if exposed
- Consider using service account impersonation

### 6.3 API Keys Visible in Console Errors
**Location**: `/home/user/website/app/api/admin/ai/generate/route.ts:79-106`
**Severity**: MEDIUM
**Issue**: If fetch fails, error might contain API key details
```ts
const response = await fetch(CLAUDE_API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': CLAUDE_API_KEY,  // Could be exposed in error logs
```
**Recommended Fix**:
- Ensure sensitive headers are not logged
- Review error handling to prevent key leakage
- Use generic error messages in responses

---

## 7. SECURITY HEADERS & CONFIGURATION

### 7.1 Missing Content Security Policy (CSP)
**Location**: `/home/user/website/next.config.mjs:47-63`
**Severity**: HIGH
**Issue**: Only basic security headers, no CSP header
```ts
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // NO CSP!
```
**Impact**:
- Allows inline scripts and unsafe content
- Vulnerable to XSS attacks
- No script source control
**Recommended Fix**:
```ts
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.usefathom.com; style-src 'self' 'unsafe-inline'"
},
```

### 7.2 Missing Strict-Transport-Security (HSTS)
**Location**: `/home/user/website/next.config.mjs`
**Severity**: MEDIUM
**Issue**: No HSTS header to enforce HTTPS
**Impact**:
- Vulnerable to downgrade attacks
- HTTP version could be intercepted
**Recommended Fix**: Add HSTS header:
```ts
{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }
```

### 7.3 Missing X-Permitted-Cross-Domain-Policies
**Location**: `/home/user/website/next.config.mjs`
**Severity**: LOW
**Issue**: No header to control cross-domain policies
**Recommended Fix**: Add:
```ts
{ key: 'X-Permitted-Cross-Domain-Policies', value: 'none' }
```

---

## 8. RATE LIMITING ISSUES

### 8.1 Inconsistent Rate Limiting Coverage
**Location**: Various API routes
**Severity**: MEDIUM
**Issue**: Some endpoints have rate limiting, others don't
- `/api/questions` POST has rate limiting ✓
- `/api/questions` GET has NO rate limiting ✗ (can enumerate all questions)
- `/api/admin/stats` has NO rate limiting ✗
- `/api/admin/analytics-data` has NO rate limiting ✗
**Impact**: 
- DoS vulnerability on unprotected endpoints
- Information enumeration attacks
**Recommended Fix**: Apply rate limiting to all endpoints, especially admin ones

### 8.2 Rate Limiting Based on IP Only
**Location**: `/home/user/website/lib/middleware/rate-limit.ts:51-61`
**Severity**: MEDIUM
**Issue**: Rate limiting only by IP, can be bypassed with X-Client-ID header or spoofed IP
```ts
function getClientIdentifier(req: NextRequest): string {
  const customId = req.headers.get('x-client-id');
  if (customId) return customId;
  // Otherwise uses IP...
}
```
**Impact**:
- Customizable identifier can be used to bypass limits
- Distributed attacks harder to detect
**Recommended Fix**: 
- Require authentication for custom ID
- Use multiple identifiers (IP + User Agent hash + etc.)
- Validate X-Client-ID format strictly

---

## 9. SESSION MANAGEMENT ISSUES

### 9.1 Session Token Not Encrypted
**Location**: `/home/user/website/lib/auth/admin.ts:43-49`
**Severity**: MEDIUM
**Issue**: Admin session stored as plaintext JSON in cookie
```ts
cookieStore.set(ADMIN_SESSION_COOKIE, JSON.stringify(session), {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: SESSION_DURATION / 1000,
  path: '/',
});
```
**Impact**:
- If cookie is compromised, session details are readable
- Expiration time is predictable
- No additional protection on token itself
**Recommended Fix**:
- Encrypt session data before storing
- Use JWT tokens instead of JSON
- Add a nonce or random component

### 9.2 Long Session Duration (24 hours)
**Location**: `/home/user/website/lib/auth/admin.ts:6`
**Severity**: MEDIUM
**Issue**: Admin sessions last 24 hours without re-authentication
```ts
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
```
**Impact**:
- Compromised session valid for full day
- Can't revoke stolen credentials quickly
**Recommended Fix**:
- Reduce to 4-8 hours
- Implement refresh token mechanism
- Add session invalidation endpoint

---

## 10. THIRD-PARTY DEPENDENCY VULNERABILITIES

### 10.1 js-yaml Prototype Pollution Vulnerability
**Location**: `package.json` (via dependencies)
**Severity**: MODERATE
**Issue**: Vulnerable version of js-yaml in dependency chain
```
js-yaml <4.1.1
Prototype pollution in merge (<<)
```
**CVE**: GHSA-mh29-5h37-fv8m
**Impact**:
- Potential prototype pollution attacks
- Affects build tools (ESLint, Jest)
- Not direct application impact but reduces defense-in-depth
**Fix**: Run `npm audit fix` or update dependencies

### 10.2 tmp Arbitrary File Write Vulnerability
**Location**: `package.json` (via devDependencies)
**Severity**: LOW
**Issue**: Vulnerable tmp module in test dependencies
```
tmp <=0.2.3
Arbitrary temporary file/directory write via symbolic link
```
**CVE**: GHSA-52f5-9888-hmc6
**Impact**: 
- Affects development/CI pipeline only
- No production impact
**Fix**: Update tmp dependency

---

## 11. INFORMATION DISCLOSURE

### 11.1 Error Messages Expose Internal Details
**Location**: `/home/user/website/lib/utils/errors.ts:104-115`
**Severity**: MEDIUM (in development), LOW (production)
**Issue**: Development mode exposes full error messages
```ts
const message =
  process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : error.message;
```
**Impact**:
- Stack traces visible in development
- Database/API errors could leak implementation details
- Could reveal valid fields for injection attacks
**Current Mitigation**: Production mode uses generic message ✓
**Recommendation**: Be careful with what gets logged

### 11.2 API Key in Console Logs
**Location**: `/home/user/website/app/api/chat/stream/route.ts:165,172` and other routes
**Severity**: MEDIUM
**Issue**: Error objects might be logged containing sensitive data
```ts
console.error('Stream error:', error);  // Could contain error details
console.error('AI streaming error:', error);
```
**Impact**:
- Server logs might be accessible to less-privileged users
- CloudWatch/log aggregators might expose data
**Recommendation**: Sanitize error logs in production

---

## 12. UNIMPLEMENTED SECURITY FEATURES

### 12.1 Cancellation Token Verification Not Implemented
**Location**: `/home/user/website/app/api/calendar/cancel/route.ts:50-59`
**Severity**: MEDIUM
**Issue**: Cancellation token function is called but might not be implemented
```ts
const isValid = verifyCancellationToken(
  validatedData.bookingId,
  validatedData.cancellationToken
);
```
**Impact**: 
- Users might be able to cancel other users' bookings if endpoint path is guessable
**Recommendation**: Verify token generation and validation is secure

### 12.2 Google Calendar Events Not Fully Linked to Bookings
**Location**: `/home/user/website/app/api/calendar/route.ts:156`
**Severity**: MEDIUM
**Issue**: TODO comment indicates feature not implemented
```ts
// TODO: Create Google Calendar event (requires OAuth flow setup)
```
**Impact**: Booking creates database entry but not calendar event
**Recommendation**: Implement or document why not needed

---

## 13. POTENTIAL COMPLIANCE ISSUES

### 13.1 IP Address Collection Without Consent
**Location**: `/home/user/website/app/api/analytics/route.ts:109-110`
**Severity**: MEDIUM (GDPR/Privacy)
**Issue**: IP addresses collected in analytics without clear consent mechanism
```ts
const ipAddress = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || undefined;
```
**Impact**:
- GDPR requires consent for IP collection
- Privacy violation potential
**Recommendation**:
- Add privacy policy notice
- Implement explicit consent for analytics
- Consider anonymizing IPs (hash or partial mask)

### 13.2 Personal Data in Chat Messages
**Location**: `/home/user/website/app/api/chat/route.ts` (entire file)
**Severity**: MEDIUM (GDPR/Privacy)
**Issue**: Chat conversations stored with message content and metadata
**Impact**:
- GDPR right to erasure applies
- Users can't easily delete their chat history
**Recommendation**:
- Implement data deletion endpoint
- Add privacy policy
- Consider message TTL (Time To Live)

---

## SUMMARY TABLE

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Authentication | 2 | 3 | 1 | 0 |
| CORS/CSRF | 0 | 2 | 2 | 0 |
| Input Validation | 0 | 2 | 1 | 1 |
| Secrets | 2 | 0 | 1 | 0 |
| Headers/Config | 0 | 1 | 2 | 1 |
| Rate Limiting | 0 | 0 | 2 | 0 |
| Sessions | 0 | 0 | 2 | 0 |
| Dependencies | 0 | 0 | 1 | 1 |
| Disclosure | 0 | 0 | 2 | 0 |
| Compliance | 0 | 0 | 2 | 0 |
| **TOTAL** | **4** | **8** | **16** | **3** |

---

## IMMEDIATE ACTIONS REQUIRED (P0)

1. **Add authentication to all write operations**: `/api/blog/*`, `/api/questions` GET
2. **Fix admin authentication**: Use bcrypt hashing for password, standardize with NextAuth
3. **Remove CORS wildcards**: Replace in `/api/chat/stream/route.ts`
4. **Add HTML sanitization**: For blog content rendering
5. **Implement CSP header**: In next.config.mjs
6. **Protect analytics endpoints**: Add admin authentication

---

## RECOMMENDED FOLLOW-UP ACTIONS (P1)

1. Update npm dependencies (js-yaml, tmp)
2. Add HSTS header
3. Implement CSRF token protection
4. Add rate limiting to all unprotected endpoints
5. Encrypt session tokens
6. Reduce session duration or implement refresh tokens
7. Implement data deletion endpoints for GDPR compliance

---

