# Security Audit Report - Mattia's Portfolio Website

**Audit Date:** 2025-11-19  
**Status:** Requires Immediate Action  
**Total Issues Found:** 23 (4 Critical, 7 High, 7 Medium, 5 Low)

---

## Executive Summary

The codebase has a solid security foundation with proper middleware for rate limiting, CORS, and comprehensive security headers. However, there are **critical issues** related to database access control and unprotected admin endpoints that must be addressed before production deployment.

**Key Risk Areas:**
- ⚠️ **CRITICAL:** Firestore rules allow unrestricted read/write access
- ⚠️ **CRITICAL:** Admin endpoints lack authentication
- ⚠️ **HIGH:** Debug endpoints expose sensitive credentials
- ⚠️ **HIGH:** Known vulnerabilities in npm dependencies

---

## CRITICAL SEVERITY ISSUES

### 1. Overly Permissive Firestore Security Rules
**Location:** `/home/user/website/firestore.rules`  
**Severity:** CRITICAL  
**Risk Level:** IMMEDIATE EXPLOITATION

**Issue:**
```firestore
allow read, write: if request.time < timestamp.date(2025, 12, 6);
```

The firestore.rules file allows **unrestricted read/write access to all data** without authentication. The expiration date (2025-12-06) is already past or very close to expiration.

**Implications:**
- Anyone with the Firebase API key can read/write all data
- User PII (emails, phone numbers, booking details) exposed
- Chat conversations accessible to unauthorized users
- Analytics data, questions, and personal information compromised
- Malicious actors can delete or corrupt data

**Remediation:**
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Only admin can read questions (via server-side API with authentication)
    match /questions/{document=**} {
      allow read: if false;
      allow write: if false;
    }
    
    // Public can submit questions via API (rate limited server-side)
    match /analytics_events/{document=**} {
      allow write: if request.auth != null;
      allow read: if false;
    }
    
    // Chat conversations require authentication
    match /chat_conversations/{document=**} {
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      allow write: if request.auth != null &&
                     (resource == null || resource.data.userId == request.auth.uid);
    }
    
    // Deny all by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

### 2. Unprotected Admin Endpoint - GET /api/questions
**Location:** `/home/user/website/app/api/questions/route.ts` (lines 79-108)  
**Severity:** CRITICAL  
**Risk Level:** IMMEDIATE EXPLOITATION

**Issue:**
```typescript
export async function GET(req: NextRequest) {
  // NO AUTHENTICATION CHECK
  const questions = await queryDocumentsAdmin<Question>(
    COLLECTIONS.QUESTIONS,
    [{ field: 'status', operator: '==', value: status }],
    'createdAt',
    'desc',
    limit
  );
  // Returns all questions without authorization
}
```

**Code Evidence:**
- Line 77: Comment says "admin only - will be protected later" but no actual protection exists
- No authentication check before querying database
- Returns raw question data including user names and emails

**Implications:**
- Anyone can enumerate all submitted questions
- Leaks PII (names, emails) from users who submitted questions
- Potential harassment or spam based on exposed email addresses
- No rate limiting on question retrieval

**Remediation:**
```typescript
import { requireAuth } from '@/lib/security/auth';
import { isAdmin } from '@/lib/security/authorization';

export async function GET(req: NextRequest) {
  try {
    // 1. Check authentication
    const user = await requireAuth(req);
    
    // 2. Check authorization (admin only)
    if (!await isAdmin(user.id)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }
    
    // 3. Only return non-sensitive data
    const questions = await queryDocumentsAdmin<Question>(...);
    
    // 4. Redact PII
    const redacted = questions.map(q => ({
      id: q.id,
      question: q.question,
      status: q.status,
      createdAt: q.createdAt,
      // Don't include: name, email, userAgent, referrer
    }));
    
    return NextResponse.json(...);
  } catch (error) {
    return handleApiError(error);
  }
}
```

---

### 3. Spotify Debug Endpoint Exposes Credentials
**Location:** `/home/user/website/app/api/spotify/debug/route.ts`  
**Severity:** CRITICAL  
**Risk Level:** IMMEDIATE EXPLOITATION

**Issue:**
The endpoint explicitly states "WARNING: Remove or secure this endpoint before deploying to production!" but does not implement authentication.

**Code Evidence:**
```typescript
// Line 5-6: WARNING
// WARNING: Remove or secure this endpoint before deploying to production!

export async function GET(req: NextRequest) {
  // NO AUTHENTICATION CHECK
  
  const debug: any = {
    environment: {
      hasClientId: !!process.env.SPOTIFY_CLIENT_ID,
      clientIdLength: process.env.SPOTIFY_CLIENT_ID?.length || 0,
      refreshTokenLength: process.env.SPOTIFY_REFRESH_TOKEN?.length || 0,
      // Reveals token lengths - can be used to identify token patterns
    },
  };
  
  // Line 35-46: Actually performs token refresh with production credentials
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
  });
  
  // Returns token information including preview
  debug.tests.tokenRefresh = {
    tokenPreview: accessToken.substring(0, 20) + '...',
  };
}
```

**Implications:**
- Token lengths leak could aid in token recovery attacks
- Partial token preview in response
- Can be used to verify if tokens are valid
- No rate limiting on token refresh attempts
- Debug endpoint accessible from internet

**Remediation - Option 1: Remove in Production**
```typescript
if (process.env.NODE_ENV === 'production') {
  return NextResponse.json(
    { error: 'This endpoint is only available in development' },
    { status: 403 }
  );
}
```

**Remediation - Option 2: Add Authentication**
```typescript
const adminIp = process.env.ADMIN_IP;
const clientIp = req.headers.get('x-forwarded-for') || 
                 req.headers.get('x-real-ip') ||
                 'unknown';

if (clientIp !== adminIp) {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 403 }
  );
}
```

---

### 4. Spotify Token Display - Full Credentials in Browser
**Location:** `/home/user/website/app/api/spotify/callback/route.ts` (lines 204-220)  
**Severity:** CRITICAL  
**Risk Level:** EXPLOITATION POSSIBLE

**Issue:**
```typescript
// Line 208: Raw refresh token displayed in HTML
${tokenData.refresh_token}

// Line 217: Raw access token displayed in HTML  
${tokenData.access_token}

// Lines 247-259: JavaScript copy-to-clipboard functionality
function copyToken(elementId) {
  const element = document.getElementById(elementId);
  const text = element.textContent.trim();
  navigator.clipboard.writeText(text);
}
```

**Implications:**
- Full refresh token visible in browser (not just preview)
- Tokens stored in page history
- Can be copied to clipboard and extracted from browser memory
- No automatic cleanup of page after token is obtained
- Tokens remain in browser history indefinitely

**Remediation:**
```typescript
// 1. Display only token preview
const preview = tokenData.refresh_token.substring(0, 15) + '...';

// 2. Auto-copy without displaying full token
function copyTokenSecure(token) {
  navigator.clipboard.writeText(token);
  // Don't show confirmation with full token
}

// 3. Clear sensitive data after 30 seconds
setTimeout(() => {
  element.textContent = '(cleared for security)';
}, 30000);

// 4. Set X-Frame-Options to prevent framing
response.headers.set('X-Frame-Options', 'DENY');

// 5. Add cache prevention headers
response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
response.headers.set('Pragma', 'no-cache');
```

---

## HIGH SEVERITY ISSUES

### 5. Known Vulnerabilities in Dependencies
**Location:** `/home/user/website/package.json`  
**Severity:** HIGH  
**Audit Result:** 4 vulnerabilities (1 moderate, 3 high)

**Vulnerable Packages:**

1. **glob - Command Injection (GHSA-5j98-mcp5-4vw2)**
   - Affected: `glob` 10.2.0-10.4.5
   - Risk: Command injection via `-c/--cmd` parameter with `executes matches with shell:true`
   - Dependency Chain: `eslint-config-next` → `@next/eslint-plugin-next` → `glob`
   - Status: NOT directly used but inherited through dev dependencies
   - Impact: Code execution vulnerability if ESLint runs with untrusted glob patterns

2. **js-yaml - Prototype Pollution (GHSA-mh29-5h37-fv8m)**
   - Affected: `js-yaml` 4.0.0-4.1.0
   - Risk: Prototype pollution in merge (<<) operator
   - Dependency Chain: `eslint` → `@eslint/eslintrc` → `js-yaml`
   - Impact: Potential code execution through YAML deserialization

**Remediation:**
```bash
npm audit fix --force
# Will upgrade eslint-config-next to 16.0.3 (breaking change)
# Review breaking changes before applying
```

**Detailed Fixes Needed:**
```json
{
  "dependencies": {
    "js-yaml": "^4.1.1"  // Current version with fix
  },
  "devDependencies": {
    "eslint-config-next": "^15.0.0"  // Latest with glob update
  }
}
```

---

### 6. Spotify Callback - Missing CSRF Protection
**Location:** `/home/user/website/app/api/spotify/callback/route.ts`  
**Severity:** HIGH  
**Risk Level:** ATTACK VECTOR

**Issue:**
```typescript
export async function GET(req: NextRequest) {
  const code = searchParams.get('code');
  // No state parameter verification for CSRF protection
  
  // Code is used directly without validation
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,  // Direct use of user input
    }),
  });
}
```

**Implications:**
- No CSRF state verification (OAuth 2.0 requirement)
- Callback can be exploited to link attacker's Spotify to user's site
- No validation of origin
- No check if code was actually generated by user's auth request

**Remediation:**
```typescript
import { generateCSRFToken, verifyCSRFToken } from '@/lib/security/csrf';

// In /api/spotify/auth/start
export async function GET(req: NextRequest) {
  const state = generateCSRFToken();
  
  // Store state in session/cookie (server-side, encrypted)
  const response = NextResponse.redirect(authUrl.toString());
  response.cookies.set('spotify_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
  });
  
  return response;
}

// In /api/spotify/callback
export async function GET(req: NextRequest) {
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  const storedState = req.cookies.get('spotify_oauth_state')?.value;
  
  if (!state || state !== storedState) {
    return NextResponse.json(
      { error: 'Invalid state parameter - CSRF attack detected' },
      { status: 403 }
    );
  }
  
  // Clear state after use
  const response = ...;
  response.cookies.delete('spotify_oauth_state');
  
  return response;
}
```

---

### 7. Google Calendar Event Creation - Attendee Email Validation
**Location:** `/home/user/website/lib/api/google-calendar.ts` (lines 128-190)  
**Severity:** HIGH  
**Risk Level:** INFORMATION DISCLOSURE

**Issue:**
```typescript
export async function createCalendarEvent(
  summary: string,
  description: string,
  startTime: Date,
  endTime: Date,
  attendeeEmail: string,  // User-provided, added to calendar
  timezone: string = TIMEZONE
): Promise<CalendarEvent> {
  const event: calendar_v3.Schema$Event = {
    attendees: [{ email: attendeeEmail }],  // Added without sanitization
    // Error responses returned in 500 handler
  };
  
  const response = await calendar.events.insert({
    calendarId,
    sendUpdates: 'all',  // Sends calendar invite to attendee
    requestBody: event,
  });
}
```

**Implications:**
- User-provided email added to calendar without verification
- Spam/harassment vector - can add any email to Mattia's calendar
- Calendar invites sent to unverified addresses
- No rate limiting per email address

**Remediation:**
```typescript
// 1. Validate email format stricter
import { validateEmail } from '@/lib/utils/validation';

if (!validateEmail(attendeeEmail)) {
  throw new ValidationError('Invalid email address');
}

// 2. Don't auto-add attendee, require confirmation first
// Store in database with status 'pending_confirmation'
// Send confirmation email to attendee

// 3. Rate limit by email
const emailRateLimit = await checkEmailRateLimit(attendeeEmail);
if (!emailRateLimit.success) {
  throw new RateLimitError('Too many bookings from this email');
}

// 4. Validate domain (prevent honeypots/traps)
const domain = attendeeEmail.split('@')[1];
const blockedDomains = ['guerrillamail.com', 'tempmail.com', ...];
if (blockedDomains.includes(domain)) {
  throw new ValidationError('Disposable email addresses not allowed');
}
```

---

### 8. Rate Limiting - Missing Request Deduplication
**Location:** `/home/user/website/lib/middleware/rate-limit.ts`  
**Severity:** HIGH  
**Risk Level:** DISTRIBUTED ATTACK

**Issue:**
```typescript
function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const customId = req.headers.get('x-client-id');
  
  if (customId) return customId;  // PROBLEM: Trust user-provided ID
  
  const ip = cfConnectingIp || realIp || forwarded?.split(',')[0] || 'anonymous';
  return ip.trim();
}
```

**Implications:**
- Clients can bypass rate limiting by providing custom `x-client-id` header
- Can send unlimited requests with different client IDs
- No validation that custom ID belongs to the requester

**Remediation:**
```typescript
function getClientIdentifier(req: NextRequest): string {
  // 1. Trust only infrastructure headers
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  
  // 2. Don't use user-provided x-client-id for auth purposes
  const ip = cfConnectingIp || realIp || forwarded?.split(',')[0] || 'anonymous';
  
  // 3. Validate IP format
  if (!isValidIP(ip.trim())) {
    return 'anonymous';
  }
  
  return ip.trim();
}

function isValidIP(ip: string): boolean {
  // IPv4: 1-3 octets + 1-3 octets + 1-3 octets + 1-3 octets
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6: simplified check
  const ipv6 = /^[\da-f:]+$/i;
  
  return ipv4.test(ip) || ipv6.test(ip);
}
```

---

### 9. Analytics Data - PII Exposure
**Location:** `/home/user/website/app/api/analytics/route.ts` (lines 100-127)  
**Severity:** HIGH  
**Risk Level:** DATA BREACH

**Issue:**
```typescript
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedData = createAnalyticsEventSchema.parse(body);
  
  // Extract and store sensitive headers
  const userAgent = req.headers.get('user-agent') || undefined;
  const forwarded = req.headers.get('x-forwarded-for');
  const ipAddress = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || undefined;
  const referrer = req.headers.get('referer') || undefined;
  
  const event = await createDocumentAdmin<AnalyticsEvent>(
    COLLECTIONS.ANALYTICS_EVENTS,
    {
      userAgent,    // Can be used for fingerprinting
      ipAddress,    // Direct PII
      referrer,     // Can contain sensitive info
      timestamp: Timestamp.now(),
    }
  );
}
```

**Implications:**
- IP addresses stored directly (PII in EU/GDPR)
- User agents enable device fingerprinting
- Referrer headers can leak search queries or private info
- Stored indefinitely without retention policy
- GDPR violation - no legal basis for processing this data
- No user consent for this level of tracking

**Remediation:**
```typescript
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedData = createAnalyticsEventSchema.parse(body);
  
  // Check GDPR consent first
  const consent = ConsentManager.getConsent();
  if (!consent?.analytics) {
    return NextResponse.json(
      { error: 'Analytics tracking requires user consent' },
      { status: 403 }
    );
  }
  
  // Hash and anonymize IP (keep last octet only for general location)
  const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
  const anonymizedIp = ipAddress ? 
    hashIP(ipAddress).substring(0, 16) : undefined;
  
  // Don't store user agent or referrer - use Umami instead
  const event = await createDocumentAdmin<AnalyticsEvent>(
    COLLECTIONS.ANALYTICS_EVENTS,
    {
      eventType: validatedData.eventType,
      eventName: validatedData.eventName,
      page: validatedData.page,
      sessionId: validatedData.sessionId,
      userId: validatedData.userId,
      metadata: validatedData.metadata,
      // Don't store: userAgent, fullIpAddress, referrer
      anonymizedIp,
      timestamp: Timestamp.now(),
      // Add data retention
      expiresAt: Timestamp.fromDate(addDays(new Date(), 90)),
    }
  );
}

function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex');
}
```

---

### 10. Chat API - Prompt Injection Risk
**Location:** `/home/user/website/app/api/chat/route.ts` (lines 134-233)  
**Severity:** HIGH  
**Risk Level:** ABUSE/POISONING

**Issue:**
```typescript
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedData = createChatMessageSchema.parse(body);
  
  const messages: ChatMessage[] = conversation?.messages || [];
  
  // Add user message directly without sanitization
  const userMessage: ChatMessage = {
    role: 'user',
    content: validatedData.message,  // User-provided, not sanitized
    timestamp: Timestamp.now(),
  };
  messages.push(userMessage);
  
  // Passed directly to Claude API
  const claudeMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,  // Unsanitized content
  }));
  
  const aiResponse = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: claudeMessages,  // Can include prompt injection
  });
}
```

**Implications:**
- Users can inject prompts to manipulate Claude's behavior
- Could extract system prompt or instructions
- Could prompt Claude to ignore Mattia's persona
- Could extract information from previous conversations
- No input sanitization or detection of injection attempts

**Remediation:**
```typescript
// 1. Sanitize user input
import DOMPurify from 'isomorphic-dompurify';
import { detectPromptInjection } from '@/lib/security/injection-detection';

const sanitized = DOMPurify.sanitize(validatedData.message, {
  ALLOWED_TAGS: [],  // Strip all HTML
});

// 2. Detect injection attempts
const injectionScore = detectPromptInjection(sanitized);
if (injectionScore > 0.7) {
  console.warn('Potential prompt injection detected', {
    sessionId: validatedData.sessionId,
    score: injectionScore,
  });
  
  // Either reject or flag for review
  if (injectionScore > 0.9) {
    throw new Error('Request appears to contain injection attempt');
  }
}

// 3. Add context isolation
const userMessage: ChatMessage = {
  role: 'user',
  content: sanitized,
  timestamp: Timestamp.now(),
  metadata: { injectionScore },  // Track for analysis
};

// 4. Monitor for system prompt extraction
const keywords = ['system prompt', 'instructions', 'as the system'];
if (keywords.some(kw => sanitized.toLowerCase().includes(kw))) {
  console.warn('System prompt extraction attempt', {
    sessionId: validatedData.sessionId,
  });
}

// 5. Add response validation
const aiResponse = await anthropic.messages.create(...);

// Validate response doesn't reveal system prompt
const responseText = aiResponse.content[0].type === 'text' ? 
                     aiResponse.content[0].text : '';

if (responseText.includes('SYSTEM_PROMPT') || 
    responseText.includes('your instructions are')) {
  console.error('System prompt leaked in response!');
  return NextResponse.json(
    { error: 'An error occurred processing your request' },
    { status: 500 }
  );
}
```

---

### 11. CORS Configuration - Development Mode Overly Permissive
**Location:** `/home/user/website/lib/middleware/cors.ts` (lines 30-33)  
**Severity:** HIGH  
**Risk Level:** EXPLOITATION IN STAGING

**Issue:**
```typescript
const isAllowedOrigin = config.allowedOrigins?.includes(origin) ||
                        config.allowedOrigins?.includes('*') ||
                        (process.env.NODE_ENV === 'development' && 
                         origin.startsWith('http://localhost'));
                         //  ↑ Also matches http://localhost-evil.com
```

**Implications:**
- In development, any origin starting with `http://localhost` is allowed
- Doesn't properly validate domain boundaries
- If deployed to staging with NODE_ENV='development', anyone can access APIs
- Staging environments often exposed to internet

**Remediation:**
```typescript
function isAllowedOrigin(origin: string): boolean {
  // 1. Strict localhost matching
  const localhostPatterns = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://[::1]:3000',
  ];
  
  if (localhostPatterns.includes(origin)) {
    return true;
  }
  
  // 2. Production whitelist
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
  return allowedOrigins.includes(origin);
}
```

---

### 12. Calendar Booking - Time Validation Bypass
**Location:** `/home/user/website/app/api/calendar/book/route.ts` (lines 37-40)  
**Severity:** HIGH  
**Risk Level:** DATA CORRUPTION

**Issue:**
```typescript
const requestedDateTime = parseISO(validatedData.dateTime);
const endDateTime = addMinutes(requestedDateTime, validatedData.duration);

// Check if the requested time is in the past
if (requestedDateTime < new Date()) {
  throw new ConflictError('Cannot book a time in the past');
}

// But then checks booking database
const existingBookings = await queryDocumentsAdmin<CalendarBooking>(
  COLLECTIONS.CALENDAR_BOOKINGS,
  [
    { field: 'dateTime', operator: '==', value: Timestamp.fromDate(requestedDateTime) },
    { field: 'status', operator: 'in', value: ['pending', 'confirmed'] },
  ],
);
```

**Implications:**
- Uses exact equality check for time - doesn't check 30-minute slot duration
- Two users could book same time slot if not exactly aligned
- Concurrent requests not properly handled
- No database-level unique constraints

**Remediation:**
```typescript
// 1. Add time range validation
const existingBookings = await queryDocumentsAdmin<CalendarBooking>(
  COLLECTIONS.CALENDAR_BOOKINGS,
  [
    // Check for overlaps within the duration
    {
      field: 'dateTime',
      operator: '>=',
      value: Timestamp.fromDate(addMinutes(requestedDateTime, -validatedData.duration))
    },
    {
      field: 'dateTime',
      operator: '<',
      value: Timestamp.fromDate(endDateTime)
    },
    { field: 'status', operator: 'in', value: ['pending', 'confirmed'] },
  ],
);

// 2. Add database constraint
// Create a composite unique index on (dateTime, status)
// Firestore cannot enforce this at DB level, use transaction

// 3. Use transaction for atomicity
const transaction = db.transaction();
await transaction.runTransaction(async (tx) => {
  const existing = await tx.get(collection(...));
  if (existing.docs.length > 0) {
    throw new ConflictError('Time slot already booked');
  }
  await tx.set(docRef, bookingData);
});
```

---

## MEDIUM SEVERITY ISSUES

### 13. No Authentication/Authorization Framework
**Location:** Throughout codebase  
**Severity:** MEDIUM  
**Risk Level:** FUTURE VULNERABILITY

**Issue:** The codebase has no centralized authentication system. API routes use rate limiting as the only defense.

**Affected Endpoints:**
- GET `/api/questions` (should be admin-only)
- PATCH `/api/calendar/:id` (should be owner/admin only)
- GET `/api/analytics` (should be admin-only)

**Remediation:**
Create `/lib/security/auth.ts`:
```typescript
export async function requireAuth(req: NextRequest): Promise<User> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing authentication token');
  }
  
  const token = authHeader.substring(7);
  const user = await verifyToken(token);
  
  if (!user) {
    throw new UnauthorizedError('Invalid token');
  }
  
  return user;
}

export async function getOptionalAuth(req: NextRequest): Promise<User | null> {
  try {
    return await requireAuth(req);
  } catch {
    return null;
  }
}
```

---

### 14. Error Messages Leak Internal Details
**Location:** `/home/user/website/lib/utils/errors.ts` (lines 102-115)  
**Severity:** MEDIUM  
**Risk Level:** INFORMATION DISCLOSURE

**Issue:**
```typescript
if (error instanceof Error) {
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message;  // Exposes full error in development
  
  return {
    error: {
      message,
      code: 'INTERNAL_ERROR',
      timestamp,
    },
  };
}
```

**Implications:**
- Development errors exposed if NODE_ENV accidentally set to 'development'
- Stack traces logged to console (line 141) - visible in logs
- Third-party library errors might leak implementation details

**Remediation:**
```typescript
if (error instanceof Error) {
  // Always hide internal errors
  const isProduction = process.env.NODE_ENV === 'production' || 
                       process.env.DEPLOYMENT === 'production';
  
  const message = isProduction 
    ? 'An error occurred processing your request'
    : error.message;
  
  // Log to secure logging service, not stdout
  if (isProduction) {
    await logToSentry({
      error,
      url: context.request.url,
      timestamp: new Date(),
    });
  } else {
    console.error('[DEV] API Error:', error);
  }
  
  return {
    error: {
      message,
      code: 'INTERNAL_ERROR',
      requestId: context.requestId,  // For support tickets
      timestamp,
    },
  };
}
```

---

### 15. Environment Variables - Missing Validation
**Location:** `lib/firebase/config.ts`, `lib/api/spotify.ts`  
**Severity:** MEDIUM  
**Risk Level:** DEPLOYMENT FAILURE

**Issue:**
```typescript
// No validation that required env vars are set before use
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,  // Might be undefined
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
};

// Only validated at initialization
const validateConfig = () => {
  if (missing.length > 0) {
    throw new Error(...);
  }
};
```

**Implications:**
- Validators might not be called until first use
- Production builds might start with invalid config
- No early-fail mechanism
- Environment variable typos not caught

**Remediation:**
Create `/lib/config/env-validator.ts`:
```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  
  // Required for client
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  
  // Required for server
  FIREBASE_ADMIN_PROJECT_ID: z.string().min(1),
  FIREBASE_ADMIN_CLIENT_EMAIL: z.string().email(),
  FIREBASE_ADMIN_PRIVATE_KEY: z.string().min(1),
  
  // API Keys
  ANTHROPIC_API_KEY: z.string().startsWith('sk-'),
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  
  // Rate limiting
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
});

export const config = envSchema.parse(process.env);

// Call at startup in layout.tsx or _app.tsx
// Ensures validation happens before any API calls
```

---

### 16. Session Management - No Session Invalidation
**Location:** `/home/user/website/lib/hooks/useAnalytics.ts`  
**Severity:** MEDIUM  
**Risk Level:** SESSION HIJACKING

**Issue:**
```typescript
// Session IDs stored in sessionStorage but never validated/invalidated
let sessionId = sessionStorage.getItem('analytics_session_id');
if (!sessionId) {
  sessionId = nanoid();
  sessionStorage.setItem('analytics_session_id', sessionId);
}

// No expiration, no rotation, no server-side validation
```

**Implications:**
- Session IDs never expire
- No way to invalidate compromised sessions
- If sessionStorage leaked, attacker can impersonate user indefinitely
- No check if session ID was generated by server

**Remediation:**
```typescript
interface SessionData {
  id: string;
  createdAt: number;
  rotatedAt: number;
  expiresAt: number;
}

export function getOrCreateSession(): SessionData {
  const now = Date.now();
  const SESSION_LIFETIME = 24 * 60 * 60 * 1000; // 24 hours
  const SESSION_ROTATION = 60 * 60 * 1000; // 1 hour
  
  let session: SessionData | null = null;
  try {
    const stored = sessionStorage.getItem('session');
    session = JSON.parse(stored || 'null');
  } catch {
    session = null;
  }
  
  // Create new session if missing/expired
  if (!session || now > session.expiresAt) {
    session = {
      id: nanoid(),
      createdAt: now,
      rotatedAt: now,
      expiresAt: now + SESSION_LIFETIME,
    };
  }
  
  // Rotate session ID hourly
  if (now - session.rotatedAt > SESSION_ROTATION) {
    const newId = nanoid();
    
    // Notify server of rotation
    fetch('/api/session/rotate', {
      method: 'POST',
      body: JSON.stringify({
        oldId: session.id,
        newId: newId,
      }),
    });
    
    session.id = newId;
    session.rotatedAt = now;
  }
  
  sessionStorage.setItem('session', JSON.stringify(session));
  return session;
}
```

---

### 17. Content Security Policy - 'unsafe-inline' Usage
**Location:** `/home/user/website/lib/security/config/headers.ts` (lines 20-26)  
**Severity:** MEDIUM  
**Risk Level:** XSS VULNERABILITY

**Issue:**
```typescript
'script-src': [
  "'self'",
  isDevelopment ? "'unsafe-eval'" : '',
  "'unsafe-inline'",  // Weakens CSP protection
  'https://vercel.live',
],
```

**Implications:**
- Allows inline scripts from any source
- Reduces effectiveness of CSP against XSS
- Required for Next.js but suboptimal
- Should use nonce-based approach instead

**Remediation:**
```typescript
// Use nonce for inline scripts instead of 'unsafe-inline'
export function getContentSecurityPolicy(nonce?: string): string {
  const scriptSrc = [
    "'self'",
    ...(!nonce ? ["'unsafe-inline'"] : []),  // Fall back if no nonce
    nonce ? `'nonce-${nonce}'` : null,
    'https://vercel.live',
  ].filter(Boolean);
  
  return [
    `script-src ${scriptSrc.join(' ')}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // ... other directives
  ].join('; ');
}

// In layout.tsx
export default function RootLayout() {
  const nonce = generateCSPNonce();
  
  return (
    <html>
      <head>
        <meta property="csp-nonce" content={nonce} />
        
        {/* Inline scripts need nonce */}
        <script nonce={nonce} dangerouslySetInnerHTML={{
          __html: `console.log('app loaded')`
        }} />
      </head>
    </html>
  );
}
```

---

### 18. Rate Limiting - No Burst Protection
**Location:** `/home/user/website/lib/middleware/rate-limit.ts`  
**Severity:** MEDIUM  
**Risk Level:** DOS/ABUSE

**Issue:**
```typescript
// Uses sliding window but no burst limit
export const chatRateLimiter = new Ratelimit({
  limiter: Ratelimit.slidingWindow(10, '1 m'),  // 10 req/min average
  // But allows all 10 at once (burst)
});
```

**Implications:**
- Attacker can send 10 requests immediately, then wait 6 seconds
- No protection against rapid-fire requests
- Chat endpoint could be overwhelmed with legitimate requests that pass rate limit

**Remediation:**
```typescript
// Implement fixed window with burst limit
export const chatRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '60 s'),  // 5 per minute max
  analytics: true,
});

// Or implement token bucket with refill rate
export const bookingRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.tokenBucket(3, '1 m', 1),  // 1 token/sec refill, max 3
  analytics: true,
});
```

---

### 19. Chat - Missing Message Validation
**Location:** `/home/user/website/app/api/chat/route.ts` (lines 155-185)  
**Severity:** MEDIUM  
**Risk Level:** DATA INTEGRITY

**Issue:**
```typescript
const createChatMessageSchema = z.object({
  sessionId: z.string().min(1),
  message: z.string().min(1).max(2000),  // Only checks length
  userId: z.string().optional(),
  metadata: z.record(z.any()).optional(),  // Accepts any metadata
});

// But doesn't validate:
// - No check for HTML/script injection
// - No check for spam patterns
// - No check for repeated messages
// - metadata can contain anything
```

**Implications:**
- XSS payloads in messages
- Spam/harassment
- Data integrity issues
- Metadata could be weaponized

**Remediation:**
```typescript
const createChatMessageSchema = z.object({
  sessionId: z.string().uuid(),  // Stricter validation
  message: z.string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message too long')
    .refine(msg => !hasHTMLTags(msg), 'HTML not allowed')
    .refine(msg => !isSpam(msg), 'Message appears to be spam'),
  userId: z.string().uuid().optional(),
  metadata: z.object({
    // Whitelist allowed fields
    source: z.enum(['web', 'api']).optional(),
    platform: z.string().max(50).optional(),
  }).optional(),
});

function hasHTMLTags(text: string): boolean {
  return /<[^>]*>/g.test(text);
}

function isSpam(text: string): boolean {
  // Check for excessive repetition, caps lock, etc.
  const repeatChars = text.match(/(.)\1{10,}/g);
  const upperRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  
  return (repeatChars?.length || 0) > 2 || upperRatio > 0.7;
}
```

---

## LOW SEVERITY ISSUES

### 20. Missing HTTP Security Headers - Cache Control
**Location:** `/home/user/website/next.config.mjs`  
**Severity:** LOW  
**Risk Level:** DATA LEAKAGE

**Issue:**
Some API endpoints return sensitive data but don't set cache headers:
```typescript
// In /api/calendar/available-slots
response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate');

// But other endpoints don't set cache policy at all
```

**Remediation:**
Add to all API responses:
```typescript
response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
response.headers.set('Pragma', 'no-cache');
response.headers.set('Expires', '0');
```

---

### 21. Missing Database Encryption at Rest
**Location:** Firebase/Firestore config  
**Severity:** LOW  
**Risk Level:** COMPLIANCE

**Issue:** No mention of encryption at rest for Firestore data.

**Remediation:**
- Firestore provides encryption at rest by default with Google-managed keys
- For GDPR/HIPAA compliance, consider customer-managed encryption keys (CMEK)
- Document this in security documentation

---

### 22. No Audit Logging
**Location:** API routes  
**Severity:** LOW  
**Risk Level:** COMPLIANCE/FORENSICS

**Issue:** No audit trail for sensitive operations.

**Remediation:**
```typescript
import { auditLog } from '@/lib/security/audit';

export async function POST(req: NextRequest) {
  // ... validation ...
  
  await auditLog({
    action: 'calendar_booking_created',
    resource: 'booking',
    resourceId: booking.id,
    userId: user?.id || 'anonymous',
    ipAddress: getClientIP(req),
    timestamp: new Date(),
    details: {
      email: booking.email,
      type: booking.type,
    },
  });
}
```

---

### 23. TypeScript Strict Mode Not Enforced
**Location:** `tsconfig.json`  
**Severity:** LOW  
**Risk Level:** TYPE SAFETY

**Issue:** Type safety issues might not be caught during development.

**Remediation:**
```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## SUMMARY TABLE

| # | Issue | Severity | File | Line | Status |
|---|-------|----------|------|------|--------|
| 1 | Firestore rules overly permissive | 🔴 CRITICAL | firestore.rules | 15 | ❌ Not Fixed |
| 2 | Unprotected GET /api/questions | 🔴 CRITICAL | app/api/questions/route.ts | 79 | ❌ Not Fixed |
| 3 | Spotify debug endpoint exposed | 🔴 CRITICAL | app/api/spotify/debug/route.ts | 5 | ❌ Not Fixed |
| 4 | Spotify tokens in browser | 🔴 CRITICAL | app/api/spotify/callback/route.ts | 208 | ❌ Not Fixed |
| 5 | Dependency vulnerabilities | 🔴 HIGH | package.json | - | ⚠️ Partial Fix |
| 6 | Spotify callback CSRF missing | 🔴 HIGH | app/api/spotify/callback/route.ts | 10 | ❌ Not Fixed |
| 7 | Calendar attendee validation weak | 🔴 HIGH | lib/api/google-calendar.ts | 151 | ❌ Not Fixed |
| 8 | Rate limit header bypass | 🔴 HIGH | lib/middleware/rate-limit.ts | 55 | ❌ Not Fixed |
| 9 | Analytics PII exposure | 🔴 HIGH | app/api/analytics/route.ts | 108 | ❌ Not Fixed |
| 10 | Chat prompt injection risk | 🔴 HIGH | app/api/chat/route.ts | 164 | ❌ Not Fixed |
| 11 | CORS development too permissive | 🔴 HIGH | lib/middleware/cors.ts | 32 | ❌ Not Fixed |
| 12 | Booking time validation weak | 🔴 HIGH | app/api/calendar/book/route.ts | 42 | ❌ Not Fixed |
| 13 | No authentication framework | 🟠 MEDIUM | Throughout | - | ❌ Not Fixed |
| 14 | Error messages leak details | 🟠 MEDIUM | lib/utils/errors.ts | 104 | ❌ Not Fixed |
| 15 | Env vars not validated early | 🟠 MEDIUM | lib/firebase/config.ts | 20 | ❌ Not Fixed |
| 16 | No session invalidation | 🟠 MEDIUM | lib/hooks/useAnalytics.ts | - | ❌ Not Fixed |
| 17 | CSP uses unsafe-inline | 🟠 MEDIUM | lib/security/config/headers.ts | 23 | ⚠️ Necessary |
| 18 | Rate limit no burst protection | 🟠 MEDIUM | lib/middleware/rate-limit.ts | 18 | ❌ Not Fixed |
| 19 | Chat message validation weak | 🟠 MEDIUM | app/api/chat/route.ts | 156 | ❌ Not Fixed |
| 20 | Missing cache control headers | 🟡 LOW | Throughout | - | ❌ Not Fixed |
| 21 | No encryption at rest docs | 🟡 LOW | Firebase | - | ℹ️ Documented |
| 22 | No audit logging | 🟡 LOW | API routes | - | ❌ Not Fixed |
| 23 | TypeScript strict mode | 🟡 LOW | tsconfig.json | - | ❌ Not Fixed |

---

## REMEDIATION PRIORITY

### Immediate (Deploy Blocking):
1. ✅ Fix Firestore security rules
2. ✅ Add authentication to GET /api/questions
3. ✅ Remove/secure Spotify debug endpoint
4. ✅ Secure Spotify callback (CSRF + token hiding)
5. ✅ Update vulnerable dependencies

### High Priority (Before Next Release):
6. ✅ Implement authentication framework
7. ✅ Add email validation for calendar bookings
8. ✅ Fix rate limiting header bypass
9. ✅ Anonymize analytics PII
10. ✅ Add prompt injection detection

### Medium Priority (Next Sprint):
11. ✅ Improve CORS configuration
12. ✅ Enhance session management
13. ✅ Fix error message leakage
14. ✅ Add burst protection to rate limiting
15. ✅ Implement early env var validation

### Low Priority (Nice to Have):
16. ✅ Add cache control headers
17. ✅ Implement audit logging
18. ✅ Enable TypeScript strict mode
19. ✅ Document encryption at rest

---

## RECOMMENDED ACTIONS

### Phase 1: Critical Fixes (1-2 weeks)
- [ ] Update Firestore rules
- [ ] Implement authentication
- [ ] Secure Spotify endpoints
- [ ] Run `npm audit fix --force`

### Phase 2: Security Hardening (2-3 weeks)
- [ ] Add input sanitization
- [ ] Implement CSRF protection
- [ ] Add audit logging
- [ ] Improve error handling

### Phase 3: Compliance (Ongoing)
- [ ] GDPR audit (PII handling)
- [ ] Documentation
- [ ] Security policy update
- [ ] Staff training

---

## SECURITY TESTING RECOMMENDATIONS

```bash
# Run security audits
npm audit
npm audit fix

# Type check
npm run type-check

# Lint
npm run lint

# OWASP Top 10 checks
# Consider adding security testing tools:
# - npm install --save-dev eslint-plugin-security
# - npm install --save-dev @snyk/cli
```

---

**Report Generated:** 2025-11-19  
**Next Audit Recommended:** 2025-12-19 (30 days)
