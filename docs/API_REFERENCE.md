# API Reference Guide

Complete reference for all backend API endpoints with request/response examples.

## Base URL

Development: `http://localhost:3000/api`
Production: `https://mattia-portfolio.vercel.app/api` (TBD)

## Authentication

Currently, most endpoints are public. Admin endpoints (future) will require JWT authentication.

## Common Headers

All requests should include:
```
Content-Type: application/json
X-Client-ID: <optional-unique-identifier>
```

Rate limit headers in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 2024-11-04T12:01:00Z
```

---

## Blog API

### List Blog Posts

**GET** `/api/blog`

Query parameters:
- `category` (optional): Design | Dev | Product | Personal | AMA
- `locale` (optional): en | it
- `published` (optional): true | false
- `limit` (optional, default: 10): Number of posts to return
- `offset` (optional, default: 0): Pagination offset

Example request:
```bash
GET /api/blog?category=Product&locale=en&published=true&limit=5
```

Example response:
```json
{
  "data": [
    {
      "id": "clxxxx",
      "title": "OKRs that work vs OKRs that look good",
      "slug": "okrs-that-actually-work",
      "excerpt": "How to write OKRs that drive real change...",
      "category": "Product",
      "locale": "en",
      "coverImage": "https://...",
      "readingTime": 6,
      "publishedAt": "2024-11-01T00:00:00Z",
      "createdAt": "2024-10-25T10:00:00Z",
      "updatedAt": "2024-10-25T10:00:00Z"
    }
  ],
  "meta": {
    "total": 15,
    "limit": 5,
    "offset": 0
  }
}
```

### Get Single Blog Post

**GET** `/api/blog/:slug`

Example request:
```bash
GET /api/blog/okrs-that-actually-work
```

Example response:
```json
{
  "data": {
    "id": "clxxxx",
    "title": "OKRs that work vs OKRs that look good",
    "slug": "okrs-that-actually-work",
    "content": "# The OKR theater\n\nMost OKRs are...",
    "excerpt": "How to write OKRs that drive real change...",
    "category": "Product",
    "locale": "en",
    "coverImage": "https://...",
    "readingTime": 6,
    "published": true,
    "publishedAt": "2024-11-01T00:00:00Z",
    "metadata": {
      "tags": ["product", "okr", "strategy"],
      "seo": {
        "title": "Writing Effective OKRs",
        "description": "OKRs that drive change..."
      }
    },
    "createdAt": "2024-10-25T10:00:00Z",
    "updatedAt": "2024-10-25T10:00:00Z"
  }
}
```

### Create Blog Post

**POST** `/api/blog`

Request body:
```json
{
  "title": "My New Blog Post",
  "slug": "my-new-blog-post",
  "content": "# Heading\n\nContent here...",
  "excerpt": "Short description",
  "category": "Dev",
  "locale": "en",
  "coverImage": "https://...",
  "readingTime": 5,
  "published": false,
  "metadata": {
    "tags": ["development", "tutorial"]
  }
}
```

Response: 201 Created with full blog post object

### Update Blog Post

**PUT** `/api/blog/:slug`

Request body (all fields optional):
```json
{
  "title": "Updated Title",
  "published": true,
  "publishedAt": "2024-11-05T00:00:00Z"
}
```

Response: 200 OK with updated blog post object

### Delete Blog Post

**DELETE** `/api/blog/:slug`

Response:
```json
{
  "data": null,
  "message": "Blog post deleted successfully"
}
```

---

## Chat API

### List Conversations

**GET** `/api/chat`

Query parameters:
- `sessionId` (optional): Filter by session
- `category` (optional): lead | networking | curious
- `limit` (optional, default: 20)
- `offset` (optional, default: 0)

Example request:
```bash
GET /api/chat?category=lead&limit=10
```

Example response:
```json
{
  "data": [
    {
      "id": "clxxxx",
      "userId": "clxxxx",
      "sessionId": "session-abc123",
      "messages": [
        {
          "role": "user",
          "content": "How do you approach product strategy?",
          "timestamp": "2024-11-03T10:00:00Z"
        },
        {
          "role": "assistant",
          "content": "I don't balance them. I merge them...",
          "timestamp": "2024-11-03T10:00:30Z"
        }
      ],
      "category": "networking",
      "sentiment": null,
      "metadata": {},
      "createdAt": "2024-11-03T10:00:00Z",
      "updatedAt": "2024-11-03T10:01:00Z"
    }
  ],
  "meta": {
    "total": 25,
    "limit": 10,
    "offset": 0
  }
}
```

### Send Chat Message

**POST** `/api/chat`

Request body:
```json
{
  "sessionId": "session-abc123",
  "message": "How do you handle technical debt?",
  "userId": "clxxxx",
  "metadata": {
    "page": "/",
    "referrer": "google"
  }
}
```

Response:
```json
{
  "data": {
    "conversationId": "clxxxx",
    "message": {
      "role": "assistant",
      "content": "Technical debt is like financial debt. The key is knowing when to take it on...",
      "timestamp": "2024-11-04T12:00:00Z"
    }
  }
}
```

Rate limit: 10 requests per minute

---

## Calendar API

### List Bookings

**GET** `/api/calendar`

Query parameters:
- `status` (optional): pending | confirmed | cancelled | completed
- `type` (optional): consultation | brainstorming | mentorship
- `startDate` (optional): ISO 8601 datetime
- `endDate` (optional): ISO 8601 datetime
- `limit` (optional, default: 20)
- `offset` (optional, default: 0)

Example request:
```bash
GET /api/calendar?status=confirmed&startDate=2024-11-01T00:00:00Z
```

Example response:
```json
{
  "data": [
    {
      "id": "clxxxx",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "dateTime": "2024-11-10T14:00:00Z",
      "duration": 60,
      "status": "confirmed",
      "type": "consultation",
      "notes": "Need help with product roadmap",
      "createdAt": "2024-11-01T10:00:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "limit": 20,
    "offset": 0
  }
}
```

### Create Booking

**POST** `/api/calendar`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "dateTime": "2024-12-01T14:00:00Z",
  "duration": 60,
  "type": "consultation",
  "notes": "Want to discuss product-market fit strategy"
}
```

Response: 201 Created
```json
{
  "data": {
    "id": "clxxxx",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "dateTime": "2024-12-01T14:00:00Z",
    "duration": 60,
    "status": "pending",
    "type": "consultation",
    "notes": "Want to discuss product-market fit strategy",
    "adminNotes": null,
    "googleEventId": null,
    "reminderSent": false,
    "metadata": null,
    "createdAt": "2024-11-04T12:00:00Z",
    "updatedAt": "2024-11-04T12:00:00Z"
  },
  "message": "Booking created successfully"
}
```

Validation:
- Email must be valid format
- DateTime must be in the future
- DateTime slot must be available
- Type must be: consultation | brainstorming | mentorship

Rate limit: 5 requests per 5 minutes

### Update Booking

**PATCH** `/api/calendar`

Request body:
```json
{
  "bookingId": "clxxxx",
  "status": "confirmed",
  "adminNotes": "Confirmed via email",
  "reminderSent": true
}
```

Response: 200 OK with updated booking object

---

## Analytics API

### List Events

**GET** `/api/analytics`

Query parameters:
- `eventType` (optional): page_view | button_click | form_submit | etc
- `eventName` (optional): Specific event name
- `sessionId` (optional): Filter by session
- `startDate` (optional): ISO 8601 datetime
- `endDate` (optional): ISO 8601 datetime
- `limit` (optional, default: 100)
- `offset` (optional, default: 0)

Example request:
```bash
GET /api/analytics?eventType=button_click&limit=50
```

Example response:
```json
{
  "data": [
    {
      "id": "clxxxx",
      "sessionId": "session-abc123",
      "eventType": "button_click",
      "eventName": "hero_cta_clicked",
      "page": "/",
      "metadata": {
        "button": "Book a call",
        "position": "hero"
      },
      "timestamp": "2024-11-04T12:00:00Z"
    }
  ],
  "meta": {
    "total": 1523,
    "limit": 50,
    "offset": 0
  }
}
```

### Track Event

**POST** `/api/analytics`

Request body:
```json
{
  "sessionId": "session-abc123",
  "eventType": "page_view",
  "eventName": "blog_post_viewed",
  "page": "/blog/okrs-that-actually-work",
  "userId": "clxxxx",
  "metadata": {
    "readingTime": 180,
    "scrollDepth": 75
  }
}
```

Response: 201 Created
```json
{
  "data": {
    "eventId": "clxxxx"
  },
  "message": "Event tracked successfully"
}
```

Auto-captured data:
- User-Agent header
- IP address (from X-Forwarded-For or X-Real-IP)
- Referrer header

Rate limit: 200 requests per minute

### Get Analytics Statistics

**PATCH** `/api/analytics`

Query parameters:
- `startDate` (optional): ISO 8601 datetime
- `endDate` (optional): ISO 8601 datetime

Example request:
```bash
PATCH /api/analytics?startDate=2024-11-01T00:00:00Z&endDate=2024-11-30T23:59:59Z
```

Example response:
```json
{
  "data": {
    "totalEvents": 15234,
    "uniqueSessions": 3421,
    "eventsByType": [
      {
        "type": "page_view",
        "count": 8932
      },
      {
        "type": "button_click",
        "count": 4521
      },
      {
        "type": "form_submit",
        "count": 1781
      }
    ],
    "topPages": [
      {
        "page": "/",
        "views": 5234
      },
      {
        "page": "/blog/okrs-that-actually-work",
        "views": 1523
      }
    ]
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": {},
    "timestamp": "2024-11-04T12:00:00Z"
  }
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict (e.g., duplicate) |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

### Example Error Responses

**Validation Error**
```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "path": "email",
        "message": "Invalid email address"
      },
      {
        "path": "dateTime",
        "message": "Invalid date format"
      }
    ],
    "timestamp": "2024-11-04T12:00:00Z"
  }
}
```

**Rate Limit Error**
```json
{
  "error": {
    "message": "Rate limit exceeded. Try again after 2024-11-04T12:01:00Z",
    "code": "RATE_LIMIT_EXCEEDED",
    "timestamp": "2024-11-04T12:00:00Z"
  }
}
```

**Not Found Error**
```json
{
  "error": {
    "message": "Blog post not found",
    "code": "NOT_FOUND",
    "timestamp": "2024-11-04T12:00:00Z"
  }
}
```

**Conflict Error**
```json
{
  "error": {
    "message": "This time slot is already booked",
    "code": "CONFLICT",
    "timestamp": "2024-11-04T12:00:00Z"
  }
}
```

---

## Rate Limits Summary

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/blog/*` | 100 requests | 1 minute |
| `/api/chat` | 10 requests | 1 minute |
| `/api/calendar` POST | 5 requests | 5 minutes |
| `/api/calendar` GET/PATCH | 100 requests | 1 minute |
| `/api/analytics` POST | 200 requests | 1 minute |
| `/api/analytics` GET/PATCH | 100 requests | 1 minute |

All rate limits are per IP address and use sliding window algorithm.

---

## Testing Tips

1. **Use session IDs**: Generate unique session IDs per user session for analytics and chat
2. **Test rate limits**: Try exceeding limits to verify error handling
3. **Validate inputs**: Send invalid data to test Zod validation
4. **Check CORS**: Test from different origins
5. **Monitor headers**: Check rate limit headers in responses

## Postman Collection

A Postman collection with all endpoints is available at:
`/docs/postman_collection.json` (TODO)
