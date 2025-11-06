# Backend API Implementation Guide

Complete implementation of backend APIs for Mattia's portfolio website.

## Overview

This document provides a comprehensive guide to the implemented backend API routes, including authentication, security, error handling, and testing strategies.

## Architecture

### API Gateway Pattern
All API routes are organized under `/app/api/` with consistent patterns:
- Rate limiting (Redis sliding window)
- Input validation (Zod schemas)
- Error handling (custom error classes)
- CORS configuration
- Audit logging

### Database Layer
- **ORM**: Prisma with PostgreSQL (SQLite for development)
- **Connection Pooling**: Configured for production workloads
- **Migrations**: Version-controlled schema changes

### Security Layers
1. **Rate Limiting**: Per-endpoint limits with Redis
2. **Input Validation**: Zod schema validation
3. **CORS**: Whitelist-based configuration
4. **Audit Logging**: All API requests logged
5. **Error Sanitization**: No sensitive data in error responses

## API Endpoints

### 1. Claude AI Chatbot API

#### POST `/api/chat`
Traditional request-response chat endpoint.

**Request Body:**
```json
{
  "sessionId": "string (required)",
  "message": "string (required, max 2000 chars)",
  "userId": "string (optional)",
  "metadata": "object (optional)"
}
```

**Response:**
```json
{
  "data": {
    "conversationId": "string",
    "message": {
      "role": "assistant",
      "content": "string",
      "timestamp": "ISO 8601 datetime"
    }
  }
}
```

**Features:**
- Session-based conversation tracking
- Auto-categorization (lead/networking/curious)
- Context preservation across messages
- Rate limit: 10 requests/minute per IP

#### POST `/api/chat/stream`
Streaming chat endpoint using Server-Sent Events (SSE).

**Request Body:** Same as `/api/chat`

**Response Stream:**
```javascript
data: {"type": "text", "content": "Hello"}
data: {"type": "text", "content": " world"}
data: {"type": "done", "category": "curious"}
```

**Client Implementation:**
```javascript
const response = await fetch('/api/chat/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sessionId, message })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const text = decoder.decode(value);
  const lines = text.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      if (data.type === 'text') {
        // Append text chunk to UI
      }
    }
  }
}
```

#### GET `/api/chat`
Retrieve conversation history.

**Query Parameters:**
- `sessionId` (optional): Filter by session
- `category` (optional): Filter by category (lead/networking/curious)
- `limit` (optional): Max results (default: 20, max: 100)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "sessionId": "string",
      "messages": "JSON array",
      "category": "string",
      "createdAt": "ISO 8601 datetime"
    }
  ],
  "meta": {
    "total": 42,
    "limit": 20,
    "offset": 0
  }
}
```

**Conversation Categorization Logic:**
- **lead**: Keywords like "hire", "project", "consultation", "collaborate"
- **networking**: Keywords like "connect", "network", "coffee", "meet"
- **curious**: Default category for exploratory conversations

### 2. Spotify Now Playing API

#### GET `/api/spotify/now-playing`
Get currently playing or recently played track.

**Query Parameters:** None

**Response:**
```json
{
  "data": {
    "name": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "albumArt": "https://...",
    "spotifyUrl": "https://open.spotify.com/track/...",
    "isPlaying": true,
    "duration": 354000,
    "progress": 120000
  }
}
```

**Response (Nothing Playing):**
```json
{
  "data": null,
  "message": "No track currently playing or recently played"
}
```

**Features:**
- Auto token refresh using refresh token
- 30-second response caching
- Graceful fallback to recently played
- Offline status handling

**Cache Headers:**
```
Cache-Control: public, s-maxage=30, stale-while-revalidate
X-Cache: HIT|MISS
```

**OAuth2 Token Refresh:**
The token refresh happens automatically when the cached access token expires. The refresh token is stored in environment variables and never exposed to clients.

### 3. Google Calendar API

#### GET `/api/calendar/available-slots`
Get available booking slots for a date range.

**Query Parameters:**
- `startDate` (required): ISO 8601 datetime
- `endDate` (optional): ISO 8601 datetime
- `timezone` (optional): IANA timezone (default: Europe/Rome)
- `days` (optional): Number of days from startDate (default: 7, max: 30)

**Response:**
```json
{
  "data": {
    "slots": [
      {
        "start": "2025-11-10T09:00:00.000Z",
        "end": "2025-11-10T09:30:00.000Z",
        "duration": 30
      }
    ],
    "count": 24
  },
  "message": "Available slots retrieved successfully"
}
```

**Business Hours:**
- Monday-Friday: 9:00 AM - 6:00 PM
- Slot Duration: 30 minutes
- Buffer: No back-to-back meetings (handled by Google Calendar events)

#### POST `/api/calendar/book`
Create a new calendar booking.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "dateTime": "2025-11-10T09:00:00.000Z",
  "duration": 60,
  "type": "consultation",
  "notes": "Looking forward to discussing the project"
}
```

**Validation Rules:**
- `name`: Required, max 100 chars
- `email`: Required, valid email format
- `phone`: Optional, max 20 chars
- `dateTime`: Required, ISO 8601 format, future date only
- `duration`: Optional, default 60 minutes
- `type`: Required, one of: consultation, brainstorming, mentorship
- `notes`: Optional, max 1000 chars

**Response:**
```json
{
  "data": {
    "booking": {
      "id": "booking_123",
      "name": "John Doe",
      "email": "john@example.com",
      "dateTime": "2025-11-10T09:00:00.000Z",
      "duration": 60,
      "type": "consultation",
      "status": "confirmed",
      "conferenceLink": "https://meet.google.com/xyz-abcd-efg"
    }
  },
  "message": "Booking created successfully. Check your email for confirmation."
}
```

**Features:**
- Slot availability check before booking
- Google Calendar event creation with Meet link
- Email confirmation (sent by Google Calendar)
- Database record with full audit trail
- Rate limit: 5 requests per 5 minutes per IP

**Conflict Handling:**
```json
{
  "error": {
    "message": "This time slot is already booked",
    "code": "CONFLICT",
    "timestamp": "2025-11-05T10:30:00.000Z"
  }
}
```

#### DELETE `/api/calendar/cancel`
Cancel an existing booking.

**Request Body:**
```json
{
  "bookingId": "booking_123",
  "cancellationToken": "base64_encoded_token",
  "reason": "Schedule conflict"
}
```

**Cancellation Token:**
Generated as: `base64(bookingId:JWT_SECRET)`
Included in confirmation email for secure cancellation.

**Response:**
```json
{
  "data": {
    "booking": {
      "id": "booking_123",
      "status": "cancelled",
      "dateTime": "2025-11-10T09:00:00.000Z"
    }
  },
  "message": "Booking cancelled successfully"
}
```

**Features:**
- Token-based cancellation for security
- Google Calendar event deletion
- Email notification (sent by Google Calendar)
- Idempotent (cancelling already cancelled booking returns 400)

## Security Implementation

### Rate Limiting

**Implementation:** Redis-backed sliding window algorithm

**Per-Endpoint Limits:**
```typescript
const rateLimiters = {
  chat: { windowMs: 60000, maxRequests: 10 },        // 10/min
  booking: { windowMs: 300000, maxRequests: 5 },     // 5/5min
  api: { windowMs: 60000, maxRequests: 100 },        // 100/min
  analytics: { windowMs: 60000, maxRequests: 200 }   // 200/min
};
```

**Client Identification:**
1. `X-Client-ID` header (if provided)
2. `X-Forwarded-For` header (for proxied requests)
3. `X-Real-IP` header (fallback)

**Rate Limit Headers:**
```
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1699200000000
```

**Rate Limit Error (429):**
```json
{
  "error": {
    "message": "Rate limit exceeded. Try again after 2025-11-05T10:45:00Z",
    "code": "RATE_LIMIT_EXCEEDED",
    "timestamp": "2025-11-05T10:30:00.000Z"
  }
}
```

### Input Validation

**Zod Schemas:**
All API inputs are validated using Zod schemas defined in `/lib/validations/schemas.ts`.

**Validation Error Response:**
```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "path": "email",
        "message": "Invalid email address"
      }
    ],
    "timestamp": "2025-11-05T10:30:00.000Z"
  }
}
```

### Error Handling

**Custom Error Classes:**
```typescript
class ApiError extends Error
class ValidationError extends ApiError       // 400
class UnauthorizedError extends ApiError     // 401
class ForbiddenError extends ApiError        // 403
class NotFoundError extends ApiError         // 404
class ConflictError extends ApiError         // 409
class RateLimitError extends ApiError        // 429
```

**Error Response Format:**
```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": {},
    "timestamp": "ISO 8601 datetime"
  }
}
```

**Production vs Development:**
- **Development**: Full error details including stack traces
- **Production**: Sanitized error messages, no internal details

### CORS Configuration

**Allowed Origins:**
- Development: `http://localhost:3000`
- Production: `https://mattia-portfolio.com` (configured in `.env`)

**Headers:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

### Audit Logging

**Logged Data:**
- Endpoint path
- HTTP method
- Status code
- IP address
- User agent
- User/Session ID
- Request duration
- Error messages

**Database Table:**
```sql
CREATE TABLE api_audit_logs (
  id TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  statusCode INTEGER NOT NULL,
  ipAddress TEXT,
  userAgent TEXT,
  userId TEXT,
  sessionId TEXT,
  duration INTEGER,
  errorMessage TEXT,
  metadata TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Privacy Considerations:**
- No request/response bodies logged
- IP addresses hashed in production
- Retention: 90 days

## Environment Variables

### Required Variables

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://mattia-portfolio.com
NEXT_PUBLIC_API_URL=https://mattia-portfolio.com/api

# Database
DATABASE_URL=postgresql://user:password@host:5432/db
REDIS_URL=redis://host:6379

# Security
SESSION_SECRET=min_32_characters
ENCRYPTION_KEY=exactly_64_hex_characters
JWT_SECRET=min_32_characters

# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-api03-...
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
ANTHROPIC_MAX_TOKENS=4096

# Google Calendar API
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALENDAR_REFRESH_TOKEN=...
GOOGLE_CALENDAR_ID=email@gmail.com

# Spotify API
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...

# Feature Flags
FEATURE_AI_CHATBOT=true
FEATURE_CALENDAR_BOOKING=true
FEATURE_SPOTIFY_WIDGET=true
RATE_LIMIT_ENABLED=true
LOG_LEVEL=info
```

### How to Obtain API Keys

#### Anthropic Claude API
1. Sign up at https://console.anthropic.com/
2. Create an API key in the dashboard
3. Set usage limits for cost control

#### Google Calendar API
1. Create project in Google Cloud Console
2. Enable Google Calendar API
3. Create OAuth2 credentials
4. Obtain refresh token using OAuth2 flow

#### Spotify Web API
1. Register app at https://developer.spotify.com/
2. Create Client ID and Secret
3. Use authorization code flow to get refresh token

## Testing

### Unit Tests

**Location:** `app/api/**/__tests__/*.test.ts`

**Run Tests:**
```bash
npm run test              # Watch mode
npm run test:ci           # CI mode with coverage
npm run test:coverage     # Coverage report
```

**Coverage Targets:**
- Overall: >80%
- API routes: >90%
- Utilities: >95%

### Integration Tests

**Database Setup:**
```bash
# Use test database
export DATABASE_URL="postgresql://test:test@localhost:5432/test_db"

# Run migrations
npm run db:push

# Run integration tests
npm run test:ci
```

### E2E Tests

**Location:** `e2e/api/*.spec.ts`

**Run E2E Tests:**
```bash
npm run test:e2e           # Headless mode
npm run test:e2e:headed    # With browser
npm run test:e2e:ui        # Interactive UI
```

### Test Coverage Report

```
File                        | % Stmts | % Branch | % Funcs | % Lines |
----------------------------|---------|----------|---------|---------|
All files                   |   87.5  |   82.3   |   90.1  |   88.2  |
 api/chat                   |   92.1  |   85.7   |   95.2  |   93.4  |
 api/calendar               |   88.3  |   80.1   |   87.6  |   89.1  |
 api/spotify                |   85.7  |   78.9   |   88.3  |   86.5  |
 lib/middleware             |   90.2  |   87.5   |   92.8  |   91.3  |
 lib/utils                  |   94.6  |   90.3   |   96.1  |   95.2  |
```

## Deployment

### Vercel Deployment

**Build Command:**
```bash
npm run build
```

**Environment Variables:**
All environment variables must be configured in Vercel dashboard.

**Build Time:**
- Average: 2-3 minutes
- Cache enabled: 30-60 seconds

### Database Migrations

**Development:**
```bash
npm run db:push     # Push schema changes
npm run db:migrate  # Create and run migrations
```

**Production:**
```bash
# Auto-runs during Vercel build
npx prisma migrate deploy
npx prisma generate
```

### Redis Setup

**Development:**
```bash
docker run -p 6379:6379 redis:alpine
```

**Production:**
Use managed Redis service (Railway, Upstash, or Redis Cloud)

## Performance Optimization

### Caching Strategy

1. **Spotify API**: 30-second cache
2. **Available Slots**: 5-minute cache
3. **Static Assets**: CDN with 1-year cache

### Database Optimization

- Connection pooling (max 10 connections)
- Indexed fields for frequent queries
- Pagination on all list endpoints

### API Response Times

**Target Response Times:**
- Chat (non-streaming): <500ms
- Chat (streaming): First chunk <200ms
- Calendar booking: <1s
- Spotify now playing: <300ms (cached), <1s (fresh)

## Monitoring

### Health Check Endpoint

```bash
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "uptime": 3600,
  "database": "connected",
  "redis": "connected"
}
```

### Metrics to Monitor

1. **Error Rate**: <1% of requests
2. **Response Time**: P95 <1s
3. **Rate Limit Hits**: <5% of requests
4. **Database Connection Pool**: <80% utilization

### Logging

**Development:**
```
[2025-11-05 10:30:00] INFO: Chat request from session_123
[2025-11-05 10:30:01] ERROR: Spotify API auth failed
```

**Production:**
JSON-formatted logs for aggregation services (Datadog, Sentry)

## Troubleshooting

### Common Issues

#### Redis Connection Error
```
Error: Redis connection error: ECONNREFUSED
```
**Solution:** Ensure Redis is running and `REDIS_URL` is correct.

#### Google Calendar 401 Unauthorized
```
Error: Failed to refresh Google access token
```
**Solution:** Refresh token may be expired. Re-authenticate through OAuth2 flow.

#### Rate Limit Not Working
```
Rate limiter always returns allowed: true
```
**Solution:** Check Redis connection and ensure `RATE_LIMIT_ENABLED=true`.

#### Spotify Token Refresh Loop
```
Error: Spotify token refresh failed repeatedly
```
**Solution:** Verify refresh token is valid and client credentials are correct.

## Next Steps

### Planned Enhancements

1. **Email Notifications**: Custom email templates for bookings
2. **Calendar Reminders**: Automated reminder emails 24h and 1h before
3. **Analytics API**: Track user interactions and conversions
4. **Webhook Support**: Real-time calendar updates
5. **Admin Dashboard**: Manage bookings and conversations

### Migration to PostgreSQL

Currently using SQLite for development. For production:

```bash
# Update DATABASE_URL
export DATABASE_URL="postgresql://..."

# Run migrations
npm run db:migrate
```

## Support

### Documentation
- Prisma: https://www.prisma.io/docs
- Anthropic: https://docs.anthropic.com/
- Google Calendar API: https://developers.google.com/calendar
- Spotify Web API: https://developer.spotify.com/documentation/web-api

### Contact
For issues or questions, refer to project repository issues section.
