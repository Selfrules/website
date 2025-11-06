# 🔥 Firebase Execution Plan

**Data Decisione**: 2025-11-06
**Database Strategy**: Firebase/Firestore (✅ Setup Complete)
**Status**: Infrastructure Ready → Implementation Phase

---

## ✅ COMPLETED: Infrastructure Setup

### Firebase Migration (Completed Today)
- ✅ Project ID: `mattia-web`
- ✅ Firestore Database: `europe-west1`
- ✅ Firebase SDK installed (`firebase` + `firebase-admin`)
- ✅ Configuration files created (`lib/firebase/`)
- ✅ TypeScript types for all collections
- ✅ CRUD utility functions
- ✅ Service account key added (`firebase-admin-key.json`)
- ✅ Environment variables configured

**Time Saved vs PostgreSQL**: ~1 day (no server setup needed)

---

## 🎯 EXECUTION ROADMAP

### Priority Order (Based on BLOCKERS)
1. 🔴 **Phase 3A**: Security & Auth (2 days)
2. 🔴 **Phase 3B**: Chatbot with Firebase (2-3 days)
3. 🔴 **Phase 3C**: Calendar/Booking (2-3 days)
4. 🟡 **Phase 3D**: Admin Dashboard (3-4 days)
5. 🟡 **Phase 3E**: Blog & Spotify (2 days)
6. 🟢 **Phase 3F**: Testing & Deploy (2 days)

**Total Estimated Time**: 13-18 days

---

## 🔴 PHASE 3A: SECURITY & AUTHENTICATION

**Time**: 2 days | **Priority**: CRITICAL BLOCKER

### Task 3A.1: NextAuth.js + Rate Limiting

#### Backend Setup (Day 1 Morning)
```bash
# Install dependencies
npm install next-auth @upstash/ratelimit @upstash/redis bcrypt
npm install -D @types/bcrypt
```

**Files to Create**:
1. `lib/auth/config.ts` - NextAuth configuration
2. `app/api/auth/[...nextauth]/route.ts` - Auth API route
3. `lib/middleware/rate-limit.ts` - Rate limiting utilities
4. `middleware.ts` - Route protection middleware
5. `lib/auth/session.ts` - Session helpers

#### Frontend Setup (Day 1 Afternoon)
**Files to Create**:
1. `app/admin/login/page.tsx` - Login page
2. `components/admin/LoginForm.tsx` - Login form component
3. `components/admin/LogoutButton.tsx` - Logout button

#### Environment Variables Required
```bash
# Add to .env
NEXTAUTH_SECRET="[generate: openssl rand -base64 32]"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="mattia@selfrules.org"
ADMIN_PASSWORD_HASH="[generate via bcrypt]"

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"
```

#### Acceptance Criteria
- [ ] Admin routes protected (redirect to login if not authenticated)
- [ ] Login/logout functional
- [ ] Session management working
- [ ] Rate limiting on all API routes (10/min chat, 100/min analytics)
- [ ] Middleware protecting `/admin/*` routes

**Estimated Time**: 2 days
**Blockers**: Need Upstash Redis account (free tier available)

---

## 🔴 PHASE 3B: CHATBOT WITH FIREBASE

**Time**: 2-3 days | **Priority**: CRITICAL PRD FEATURE

### Task 3B.1: Claude API + Firebase Integration

#### Backend Implementation (Day 1-2)

**File: `app/api/chat/route.ts`** (migrate from `route.firebase.ts` example)
- POST endpoint for chat messages
- GET endpoint for conversation history
- Claude API integration
- Firebase conversation storage
- Auto-categorization (lead/networking/curious)
- Lead scoring algorithm

**Firebase Collections Used**:
```typescript
COLLECTIONS.CHAT_CONVERSATIONS {
  sessionId: string;
  userId?: string;
  messages: ChatMessage[];  // Native array - no JSON.stringify!
  category?: string;
  sentiment?: string;
  metadata?: object;
}
```

#### Frontend Implementation (Day 2-3)

**Components to Create**:
1. `components/chat/ChatTrigger.tsx` - Floating button (bottom-right)
2. `components/chat/ChatInterface.tsx` - Main chat UI (slide-in panel)
3. `components/chat/ChatMessage.tsx` - Message bubbles with markdown
4. `components/chat/ChatInput.tsx` - Text input with send button
5. `components/chat/TypingIndicator.tsx` - Animated dots

**Integration**:
- Add `<ChatTrigger />` to root layout
- Session ID generation (use `nanoid`)
- SWR or React Query for real-time updates
- Markdown rendering for responses

#### System Prompt
Create `lib/chatbot/system-prompt.ts`:
```typescript
export const MATTIA_SYSTEM_PROMPT = `
You are Mattia's digital assistant...
[Full prompt from NEXT_SESSION_TODOS.md]
`;
```

#### Acceptance Criteria
- [ ] Chat button visible on all pages
- [ ] Chat opens/closes smoothly
- [ ] Messages send and receive correctly
- [ ] Claude API responds with Mattia's tone
- [ ] Conversations stored in Firebase
- [ ] Auto-categorization working
- [ ] Mobile responsive

**Estimated Time**: 2-3 days
**Blockers**: ANTHROPIC_API_KEY required

---

## 🔴 PHASE 3C: CALENDAR/BOOKING WITH FIREBASE

**Time**: 2-3 days | **Priority**: REVENUE FEATURE

### Task 3C.1: Google Calendar Integration + Firebase

#### Backend Implementation (Day 1-2)

**Files to Create**:
1. `app/api/calendar/availability/route.ts` - GET available slots
2. `app/api/calendar/book/route.ts` - POST create booking
3. `app/api/calendar/cancel/route.ts` - DELETE cancel booking
4. `lib/integrations/google-calendar.ts` - Google Calendar API wrapper
5. `lib/utils/timezone.ts` - Timezone utilities

**Firebase Collections Used**:
```typescript
COLLECTIONS.CALENDAR_BOOKINGS {
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  dateTime: Timestamp;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  type: string;
  notes?: string;
  googleEventId?: string;
}
```

**Google Calendar Setup**:
1. Enable Google Calendar API in console
2. Create OAuth credentials
3. Generate refresh token
4. Store in environment variables

#### Frontend Implementation (Day 2-3)

**Components to Create**:
1. `components/booking/CalendarView.tsx` - Month/week view
2. `components/booking/TimeSlotPicker.tsx` - Available slots selector
3. `components/booking/BookingForm.tsx` - User details form
4. `components/booking/BookingConfirmation.tsx` - Success state

**Page to Create**:
- `app/[locale]/book/page.tsx` - Booking page

#### Environment Variables Required
```bash
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxxxx"
GOOGLE_CALENDAR_ID="mattia@selfrules.org"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/calendar/callback"
GOOGLE_REFRESH_TOKEN="xxxxx"  # Generate via OAuth Playground
```

#### Acceptance Criteria
- [ ] Calendar shows next 30 days
- [ ] Only available slots displayed
- [ ] Users can select slot and fill form
- [ ] Booking creates event in Google Calendar
- [ ] Confirmation email sent (optional)
- [ ] Booking stored in Firebase
- [ ] Timezone handling correct

**Estimated Time**: 2-3 days
**Blockers**: Google Calendar API credentials required

---

## 🟡 PHASE 3D: ADMIN DASHBOARD WITH FIREBASE

**Time**: 3-4 days | **Priority**: HIGH

### Task 3D.1: Admin Dashboard Foundation

#### Layout & Navigation (Day 1)

**Files to Create**:
1. `app/admin/layout.tsx` - Admin layout with sidebar
2. `app/admin/page.tsx` - Dashboard overview
3. `components/admin/AdminSidebar.tsx` - Navigation sidebar
4. `components/admin/StatsCard.tsx` - Metric cards

**Dashboard Stats**:
- Total conversations (from Firebase)
- Lead conversations count
- Bookings count
- Published blog posts

#### Article Creator with AI (Day 2)

**Files to Create**:
1. `app/admin/articles/page.tsx` - Article list
2. `app/admin/articles/new/page.tsx` - Article editor
3. `components/admin/ArticleEditor.tsx` - Rich text editor
4. `components/admin/AIAssistant.tsx` - Claude API for drafts
5. `app/api/blog/route.ts` - CRUD for blog posts

**Firebase Collections Used**:
```typescript
COLLECTIONS.BLOG_POSTS {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  locale: string;
  published: boolean;
  publishedAt?: Timestamp;
  coverImage?: string;
  readingTime?: number;
}
```

**Features**:
- Rich text editor (TipTap or similar)
- "Generate Draft" button (Claude API)
- Schedule publishing
- Preview mode
- SEO metadata

#### Conversation Manager (Day 3)

**Files to Create**:
1. `app/admin/conversations/page.tsx` - Conversation list
2. `components/admin/ConversationList.tsx` - List with filters
3. `components/admin/ConversationDetail.tsx` - Full chat display

**Features**:
- Filter by category (lead/networking/curious)
- Filter by date range
- Lead score sorting
- Manual categorization override
- Export to CSV

#### Analytics Dashboard (Day 4)

**Files to Create**:
1. `app/admin/analytics/page.tsx` - Analytics page
2. `components/charts/AnalyticsChart.tsx` - Charts (Recharts)
3. `app/api/analytics/summary/route.ts` - Aggregated stats

**Firebase Collections Used**:
```typescript
COLLECTIONS.ANALYTICS_EVENTS {
  sessionId: string;
  eventType: string;
  eventName: string;
  page?: string;
  metadata?: object;
  timestamp: Timestamp;
}
```

**Metrics to Display**:
- Page views over time
- CTA click rates
- Conversion funnel
- Popular pages
- User flow visualization

#### Acceptance Criteria
- [ ] Admin accessible only after login
- [ ] Dashboard shows real-time stats from Firebase
- [ ] Article creator functional with AI assistance
- [ ] Conversation manager displays all chats
- [ ] Analytics dashboard shows charts
- [ ] Mobile responsive
- [ ] All CRUD operations working

**Estimated Time**: 3-4 days

---

## 🟡 PHASE 3E: BLOG MIGRATION & SPOTIFY

**Time**: 2 days | **Priority**: HIGH

### Task 3E.1: Blog Migration to Firebase (Day 1)

**Migration Script**:
Create `scripts/migrate-blog-to-firebase.ts`:
- Read existing MDX files from `content/blog/`
- Parse frontmatter
- Upload to Firebase `COLLECTIONS.BLOG_POSTS`
- Preserve slugs and metadata

**Update Blog Pages**:
- `app/[locale]/blog/page.tsx` - Fetch from Firebase
- `app/[locale]/blog/[slug]/page.tsx` - Fetch single post from Firebase

**API Routes**:
- `app/api/blog/route.ts` - GET (list), POST (create)
- `app/api/blog/[slug]/route.ts` - GET (single), PUT (update), DELETE

### Task 3E.2: Spotify Widget (Day 2)

**Files to Create**:
1. `app/api/spotify/now-playing/route.ts` - Current track API
2. `app/api/spotify/refresh/route.ts` - Token refresh
3. `components/widgets/SpotifyNowPlaying.tsx` - Widget UI

**Integration**:
- Add to homepage sidebar or footer
- SWR with 30s revalidation
- Skeleton loader for loading state
- Fallback when offline

**Environment Variables**:
```bash
SPOTIFY_CLIENT_ID="xxxxx"
SPOTIFY_CLIENT_SECRET="xxxxx"
SPOTIFY_REFRESH_TOKEN="xxxxx"
NEXT_PUBLIC_SPOTIFY_ENABLED="true"
```

**Acceptance Criteria**:
- [ ] Blog posts migrated to Firebase
- [ ] Blog pages fetch from Firebase
- [ ] Admin can create/edit posts
- [ ] Spotify widget shows current track
- [ ] Auto-refresh every 30 seconds
- [ ] Graceful offline handling

**Estimated Time**: 2 days

---

## 🟢 PHASE 3F: TESTING & DEPLOYMENT

**Time**: 2 days | **Priority**: POLISH

### Task 3F.1: E2E Testing (Day 1)

**Run Test Suite**:
```bash
npx playwright test
npx playwright test --ui  # Debug mode
```

**Fix Critical Failures**:
- Update test files for Firebase instead of Prisma
- Update API endpoint tests
- Fix authentication flows
- Update database queries

**Test Files to Update**:
- `e2e/database.spec.ts` → Firebase tests
- `e2e/api-routes.spec.ts` → Update for new endpoints
- `e2e/chatbot.spec.ts` → Test Firebase storage
- `e2e/admin-dashboard.spec.ts` → Test auth + Firebase

### Task 3F.2: Production Deployment (Day 2)

**Pre-Deployment Checklist**:
- [ ] All environment variables set in Vercel/hosting
- [ ] Firebase security rules deployed
- [ ] Firebase indexes created
- [ ] Rate limiting configured (Upstash)
- [ ] Auth working in production
- [ ] SSL configured
- [ ] Error monitoring (Sentry - optional)
- [ ] Performance tested (Lighthouse)

**Deploy Steps**:
1. Push to GitHub
2. Connect to Vercel/hosting
3. Configure environment variables
4. Deploy
5. Test production endpoints
6. Monitor for errors

**Acceptance Criteria**:
- [ ] All E2E tests passing
- [ ] Production deployment successful
- [ ] All features working in production
- [ ] Performance metrics acceptable (Core Web Vitals)
- [ ] No console errors

**Estimated Time**: 2 days

---

## 📋 ENVIRONMENT VARIABLES CHECKLIST

### Required Immediately
```bash
# Firebase (already configured)
✅ NEXT_PUBLIC_FIREBASE_API_KEY
✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID
✅ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
✅ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
✅ NEXT_PUBLIC_FIREBASE_APP_ID
✅ FIREBASE_ADMIN_PROJECT_ID

# Auth (Phase 3A)
⏳ NEXTAUTH_SECRET
⏳ NEXTAUTH_URL
⏳ ADMIN_EMAIL
⏳ ADMIN_PASSWORD_HASH

# Rate Limiting (Phase 3A)
⏳ UPSTASH_REDIS_REST_URL
⏳ UPSTASH_REDIS_REST_TOKEN

# Claude API (Phase 3B)
⏳ ANTHROPIC_API_KEY
⏳ ANTHROPIC_MODEL
⏳ ANTHROPIC_MAX_TOKENS

# Google Calendar (Phase 3C)
⏳ GOOGLE_CLIENT_ID
⏳ GOOGLE_CLIENT_SECRET
⏳ GOOGLE_CALENDAR_ID
⏳ GOOGLE_REDIRECT_URI
⏳ GOOGLE_REFRESH_TOKEN

# Spotify (Phase 3E)
⏳ SPOTIFY_CLIENT_ID
⏳ SPOTIFY_CLIENT_SECRET
⏳ SPOTIFY_REFRESH_TOKEN
⏳ NEXT_PUBLIC_SPOTIFY_ENABLED
```

---

## 🎯 IMMEDIATE NEXT STEPS

### Today's Focus: Phase 3A.1 (Security & Auth)

1. **Setup Upstash Redis** (5 min)
   - Create account: https://console.upstash.com
   - Create Redis database (free tier)
   - Copy REST URL and token

2. **Install Dependencies** (2 min)
   ```bash
   npm install next-auth @upstash/ratelimit @upstash/redis bcrypt
   npm install -D @types/bcrypt
   ```

3. **Generate Secrets** (2 min)
   ```bash
   # NEXTAUTH_SECRET
   openssl rand -base64 32

   # ADMIN_PASSWORD_HASH (for password: admin123)
   node -e "const bcrypt = require('bcrypt'); bcrypt.hash('admin123', 12).then(console.log)"
   ```

4. **Create Auth Files** (2-3 hours)
   - NextAuth configuration
   - Auth API route
   - Rate limiting middleware
   - Login page
   - Protected route middleware

5. **Test Authentication** (1 hour)
   - Login flow
   - Session persistence
   - Route protection
   - Rate limiting

**Ready to start Phase 3A.1?** Let me know and I'll create the first files!

---

**Last Updated**: 2025-11-06
**Next Review**: After Phase 3A completion
**Total Estimated Time**: 13-18 days
