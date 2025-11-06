# TODO List - Prossima Sessione

**Data Analisi**: 2025-11-06 (Aggiornato con E2E Test Findings)
**Completion Status**: Phase 2 = 100% ✅ | Overall PRD = 75%
**Tempo Stimato Rimanente**: 15-20 giorni lavorativi

---

## 🧪 E2E TEST FINDINGS - CRITICAL ANALYSIS

**Date**: 2025-11-06
**Test Suites Created**: 8 comprehensive E2E test files
**Total Issues Identified**: 50+ critical/high priority items
**Detailed Report**: See `E2E_TEST_FINDINGS.md`

### 🚨 **BLOCKERS CRITICI - Must Fix Before Production**

#### 1. **❌ SECURITY & AUTHENTICATION MISSING**
   - **Admin Dashboard**: Completamente non protetto (`/admin/*` routes)
   - **API Endpoints**: Nessuna autenticazione sui routes
   - **Rate Limiting**: Assente su tutti gli endpoints
   - **Impact**: Vulnerabilità critica, abuse possibile
   - **Solution**: Implementare NextAuth.js + rate limiting (Upstash)
   - **Time**: 2-3 giorni

#### 2. **❌ DATABASE PRODUCTION NON CONFIGURATO**
   - **Current**: SQLite (dev.db) - non scalabile
   - **Required**: PostgreSQL con connection pooling
   - **Missing**: Indexes su tabelle critiche
   - **Impact**: Blocca deployment production
   - **Solution**: Migrazione PostgreSQL + aggiungere indexes
   - **Time**: 1 giorno

#### 3. **❌ CHATBOT COMPLETAMENTE ASSENTE**
   - **Missing**: `/api/chat` endpoint
   - **Missing**: Chat UI components (ChatTrigger, ChatInterface, ChatMessage)
   - **Missing**: Conversation storage (database model)
   - **Impact**: Feature principale PRD non implementata
   - **Solution**: Implementare chatbot completo con Claude API
   - **Time**: 2-3 giorni

#### 4. **❌ CALENDAR/BOOKING SYSTEM ASSENTE**
   - **Missing**: `/api/calendar/availability` endpoint
   - **Missing**: `/api/calendar/book` endpoint
   - **Missing**: Google Calendar integration
   - **Missing**: Booking UI components
   - **Impact**: Impossibile accettare prenotazioni (revenue feature)
   - **Solution**: Integrare Google Calendar API + UI
   - **Time**: 2-3 giorni

#### 5. **❌ ADMIN DASHBOARD MISSING**
   - **Missing**: Tutti i routes `/admin/*`
   - **Missing**: Article Creator con AI
   - **Missing**: Conversation Manager
   - **Missing**: Analytics Dashboard UI
   - **Impact**: Gestione contenuti impossibile
   - **Solution**: Build admin dashboard completo
   - **Time**: 3-4 giorni

---

### ⚠️ **CRITICAL ENVIRONMENT VARIABLES MISSING**

Aggiungere al file `.env.local`:

```bash
# ===== DATABASE (CRITICAL) =====
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
DIRECT_URL="postgresql://user:pass@host:5432/dbname"

# ===== AUTHENTICATION (CRITICAL) =====
NEXTAUTH_SECRET="[generate: openssl rand -base64 32]"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="mattia@example.com"

# ===== CLAUDE API (Chatbot) =====
ANTHROPIC_API_KEY="sk-ant-xxxxx"
CLAUDE_MODEL="claude-3-sonnet-20240229"
CLAUDE_MAX_TOKENS="1024"
CLAUDE_TEMPERATURE="0.7"

# ===== GOOGLE CALENDAR =====
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxxxx"
GOOGLE_CALENDAR_ID="xxxxx@group.calendar.google.com"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/calendar/callback"
GOOGLE_REFRESH_TOKEN="xxxxx"

# ===== SPOTIFY =====
SPOTIFY_CLIENT_ID="xxxxx"
SPOTIFY_CLIENT_SECRET="xxxxx"
SPOTIFY_REFRESH_TOKEN="xxxxx"
NEXT_PUBLIC_SPOTIFY_ENABLED="true"

# ===== RATE LIMITING (Upstash Redis) =====
UPSTASH_REDIS_REST_URL="xxxxx"
UPSTASH_REDIS_REST_TOKEN="xxxxx"

# ===== OPTIONAL =====
ANALYTICS_RETENTION_DAYS="90"
EMAIL_API_KEY="xxxxx"  # SendGrid/Resend
SENTRY_DSN="xxxxx"     # Error monitoring
```

---

### 📦 **MISSING DATABASE MODELS**

Aggiungere a `prisma/schema.prisma`:

```prisma
// ===== USER & AUTH =====
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      String   @default("admin")
  avatar    String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  conversations Conversation[]
  bookings      Booking[]
  posts         BlogPost[]
}

// ===== CHATBOT =====
model Conversation {
  id          String   @id @default(cuid())
  sessionId   String
  userId      String?
  messages    Json     // Array of {role, content, timestamp}
  category    String   // lead, networking, curious
  sentiment   String?  // positive, neutral, negative
  leadScore   Int      @default(0) // 0-100
  startedAt   DateTime @default(now())
  endedAt     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user User? @relation(fields: [userId], references: [id])

  @@index([sessionId])
  @@index([category])
  @@index([leadScore])
}

// ===== BLOG =====
model BlogPost {
  id            String    @id @default(cuid())
  slug          String    @unique
  title         String
  excerpt       String
  content       String    @db.Text
  authorId      String
  publishedAt   DateTime?
  status        String    @default("draft") // draft, published, scheduled
  featuredImage String?
  tags          String[]
  category      String?
  views         Int       @default(0)
  readTime      Int       // minutes
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  author User @relation(fields: [authorId], references: [id])

  @@index([slug])
  @@index([publishedAt])
  @@index([status])
}

// ===== CALENDAR/BOOKING =====
model Booking {
  id          String   @id @default(cuid())
  userId      String?
  email       String
  name        String
  phone       String?
  slotId      String
  startTime   DateTime
  endTime     DateTime
  timezone    String
  status      String   @default("pending") // pending, confirmed, cancelled
  notes       String?  @db.Text
  meetingLink String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user User? @relation(fields: [userId], references: [id])

  @@index([startTime])
  @@index([status])
}

// ===== CERTIFICATIONS =====
model Certification {
  id              String    @id @default(cuid())
  title           String
  tagline         String
  issuer          String
  issueDate       String
  expiryDate      String?
  credentialId    String?
  verificationUrl String?
  description     String?   @db.Text
  skills          String[]
  icon            String
  imageUrl        String?
  order           Int
  isVisible       Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// ===== TESTIMONIALS =====
model Testimonial {
  id          String   @id @default(cuid())
  quote       String   @db.Text
  author      String
  role        String
  company     String
  avatar      String?
  verified    Boolean  @default(false)
  projectType String?  // consulting, brainstorming, mentorship
  date        DateTime?
  linkedinUrl String?
  order       Int
  featured    Boolean  @default(false)
  isVisible   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

### 📋 **MISSING API ENDPOINTS**

Creare i seguenti routes:

#### Critical (Block Key Features)
```
❌ POST   /api/chat                          # Claude chatbot
❌ GET    /api/conversations                  # List conversations
❌ GET    /api/conversations/[id]             # Get single conversation
❌ POST   /api/conversations/[id]/categorize  # ML categorization

❌ GET    /api/calendar/availability          # Check available slots
❌ POST   /api/calendar/book                  # Create booking
❌ GET    /api/bookings                       # List bookings
❌ PUT    /api/bookings/[id]/confirm          # Confirm booking

❌ GET    /api/admin/stats                    # Dashboard overview
❌ GET    /api/blog                           # List blog posts
❌ POST   /api/blog                           # Create blog post
❌ PUT    /api/blog/[id]                      # Update blog post
```

#### Important (Enhance Functionality)
```
⚠️  POST   /api/analytics/batch               # Bulk event tracking
⚠️  GET    /api/spotify/now-playing           # Current track
⚠️  GET    /api/spotify/refresh               # Token refresh
⚠️  GET    /api/certifications                # List certifications
⚠️  GET    /api/testimonials                  # List testimonials
⚠️  GET    /api/blog/[slug]/stats             # Blog analytics
```

---

### 🎨 **MISSING UI COMPONENTS**

#### Admin Dashboard (Priority 1)
```
❌ app/admin/layout.tsx                    # Admin layout
❌ app/admin/page.tsx                      # Dashboard overview
❌ app/admin/articles/page.tsx             # Article list
❌ app/admin/articles/new/page.tsx         # Article creator
❌ app/admin/conversations/page.tsx        # Conversation manager
❌ app/admin/analytics/page.tsx            # Analytics dashboard
❌ app/admin/bookings/page.tsx             # Booking management

❌ components/admin/AdminSidebar.tsx
❌ components/admin/ArticleEditor.tsx
❌ components/admin/ConversationList.tsx
❌ components/admin/BookingCalendar.tsx
```

#### Chatbot (Priority 1)
```
❌ components/chat/ChatTrigger.tsx         # Floating button
❌ components/chat/ChatInterface.tsx       # Main chat UI
❌ components/chat/ChatMessage.tsx         # Message bubbles
❌ components/chat/ChatInput.tsx           # Text input
❌ components/chat/TypingIndicator.tsx     # Loading animation
```

#### Spotify Widget (Priority 2)
```
⚠️  components/widgets/SpotifyNowPlaying.tsx
    - Album artwork with skeleton
    - Song info + live indicator
```

---

### 🔧 **HARDCODED CONTENT TO MOVE TO DATABASE**

1. **Certifications** (`components/sections/Journey.tsx`)
   - Currently: 6 certifications hardcoded
   - Move to: Certification model
   - Benefit: Admin management

2. **Testimonials** (`messages/[locale].json`)
   - Currently: 4 testimonials in i18n
   - Move to: Testimonial model
   - Benefit: Dynamic updates

3. **Blog Content** (`/content/blog/*.mdx`)
   - Currently: MDX files
   - Move to: BlogPost model
   - Benefit: Admin UI editing

4. **Chatbot System Prompt**
   - Move to: `lib/chatbot/context.ts`
   - Benefit: Update without deploys

---

## 🎯 REVISED EXECUTION PLAN

### **PHASE 3A: SECURITY & DATABASE (CRITICAL)**
**Time**: 3-4 giorni | **Priority**: 🔴 BLOCKERS

#### Task 3A.1: Security & Authentication
**Status**: ⏳ Pending
**Time**: 2 giorni
**Description**: Implementare NextAuth.js + rate limiting

**Subtasks**:
- [ ] Install NextAuth.js: `npm install next-auth`
- [ ] Create `app/api/auth/[...nextauth]/route.ts`
- [ ] Setup credentials provider (password for MVP)
- [ ] Protect `/admin/*` routes with middleware
- [ ] Install Upstash Redis: `npm install @upstash/ratelimit`
- [ ] Implement rate limiting on all API routes
- [ ] Configuration files per endpoint (10/min chat, 100/min analytics, etc.)

**Acceptance Criteria**:
- [ ] Admin routes protected (redirect to login)
- [ ] All API endpoints have rate limiting
- [ ] Login/logout functional
- [ ] Session management working

---

#### Task 3A.2: Database Migration PostgreSQL
**Status**: ⏳ Pending
**Time**: 1 giorno
**Description**: Migrare da SQLite a PostgreSQL + aggiungere models

**Subtasks**:
- [ ] Setup PostgreSQL (local or cloud)
- [ ] Update `prisma/schema.prisma` datasource
- [ ] Add all missing models (User, Conversation, BlogPost, Booking, etc.)
- [ ] Add database indexes
- [ ] Run migrations: `npx prisma migrate dev`
- [ ] Update DATABASE_URL environment variable
- [ ] Test all API routes with new database

**Acceptance Criteria**:
- [ ] PostgreSQL connected
- [ ] All models created
- [ ] Indexes added
- [ ] Migrations successful
- [ ] API routes functional

---

### **PHASE 3B: CHATBOT IMPLEMENTATION**
**Time**: 2-3 giorni | **Priority**: 🔴 CRITICAL PRD FEATURE

#### Task 3B.1: Claude API Chatbot
**Status**: ⏳ Pending
**Time**: 2-3 giorni
**Description**: Implementare chatbot completo con UI e backend

**Backend Subtasks**:
- [ ] Create `app/api/chat/route.ts` endpoint
- [ ] Integrate Claude API (Anthropic)
- [ ] Implement conversation storage in database
- [ ] Add conversation categorization logic (lead/networking/curious)
- [ ] Implement lead scoring algorithm
- [ ] Create system prompt with Mattia's context

**Frontend Subtasks**:
- [ ] Create `components/chat/ChatTrigger.tsx` (floating button)
- [ ] Create `components/chat/ChatInterface.tsx` (main UI)
- [ ] Create `components/chat/ChatMessage.tsx` (message bubbles)
- [ ] Create `components/chat/ChatInput.tsx` (text input)
- [ ] Create `components/chat/TypingIndicator.tsx` (loading)
- [ ] Add markdown support for responses
- [ ] Implement error handling and retry logic

**Acceptance Criteria**:
- [ ] Chatbot opens from floating button
- [ ] Messages send and receive correctly
- [ ] Conversation history maintained
- [ ] Claude API responds with brand tone
- [ ] Conversations stored in database
- [ ] Auto-categorization working

---

### **PHASE 3C: CALENDAR/BOOKING SYSTEM**
**Time**: 2-3 giorni | **Priority**: 🔴 REVENUE FEATURE

#### Task 3C.1: Google Calendar Integration
**Status**: ⏳ Pending
**Time**: 2-3 giorni
**Description**: Integrare Google Calendar per booking system

**Backend Subtasks**:
- [ ] Setup Google Calendar API credentials
- [ ] Create `app/api/calendar/availability/route.ts`
- [ ] Create `app/api/calendar/book/route.ts`
- [ ] Implement OAuth flow for calendar access
- [ ] Create Booking model CRUD operations
- [ ] Email notifications for bookings (optional)

**Frontend Subtasks**:
- [ ] Create calendar UI component
- [ ] Available slots display
- [ ] Booking form with validation
- [ ] Success/error states
- [ ] Timezone handling

**Acceptance Criteria**:
- [ ] Calendar shows available slots
- [ ] Users can book appointments
- [ ] Bookings sync with Google Calendar
- [ ] Email confirmations sent
- [ ] Admin can manage bookings

---

### **PHASE 3D: ADMIN DASHBOARD**
**Time**: 3-4 giorni | **Priority**: 🟡 HIGH

#### Task 3D.1: Admin Dashboard Foundation
**Status**: ⏳ Pending
**Time**: 3-4 giorni
**Description**: Build admin dashboard con 3 sezioni principali

**Subtasks**:
- [ ] Create admin layout with sidebar navigation
- [ ] Build dashboard overview page (stats)
- [ ] **Article Creator**: AI-assisted blog creation
  - Rich text editor (TipTap or similar)
  - Claude API integration for drafts
  - Scheduling functionality
- [ ] **Conversation Manager**: Chat history display
  - List with filters (category, lead score)
  - Detail view with full conversation
  - Manual categorization override
- [ ] **Analytics Dashboard**: Visualization
  - Charts for key metrics
  - Time period selection
  - Conversion funnel display

**Acceptance Criteria**:
- [ ] Admin accessible only after login
- [ ] Article creator functional with AI
- [ ] Conversation manager displays chats
- [ ] Analytics dashboard shows metrics
- [ ] Mobile responsive

---

### **PHASE 3E: BLOG MIGRATION & SPOTIFY**
**Time**: 2 giorni | **Priority**: 🟡 HIGH

#### Task 3E.1: Blog Migration to Database
**Status**: ⏳ Pending
**Time**: 1 giorno
**Description**: Migrare MDX files a database

**Subtasks**:
- [ ] Create blog API endpoints (GET, POST, PUT, DELETE)
- [ ] Migrate existing MDX content to database
- [ ] Update blog pages to fetch from API
- [ ] Admin blog management UI

#### Task 3E.2: Spotify Widget
**Status**: ⏳ Pending
**Time**: 1 giorno
**Description**: Implementare Spotify Now Playing widget

**Subtasks**:
- [ ] Create `app/api/spotify/now-playing/route.ts`
- [ ] Implement token refresh mechanism
- [ ] Create `components/widgets/SpotifyNowPlaying.tsx`
- [ ] Add SWR for auto-refresh (30s interval)
- [ ] Integrate in homepage

---

### **PHASE 3F: TESTING & DEPLOYMENT**
**Time**: 2 giorni | **Priority**: 🟢 POLISH

#### Task 3F.1: Run Full E2E Test Suite
**Status**: ⏳ Pending
**Time**: 1 giorno
**Description**: Run all E2E tests and fix failures

**Commands**:
```bash
npx playwright test
npx playwright test --ui  # Debug mode
```

#### Task 3F.2: Production Deployment
**Status**: ⏳ Pending
**Time**: 1 giorno
**Description**: Deploy to production

**Checklist**:
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Rate limiting configured
- [ ] Auth working
- [ ] SSL configured
- [ ] Error monitoring (Sentry)
- [ ] Performance tested

---

## ✅ PHASE 2 COMPLETION STATUS

### Task 2.1: Admin Dashboard Foundation
**Status**: ⏳ **MOVED TO PHASE 3D** (see above)

### Task 2.2: Timeline Stepper
**Status**: ✅ **ALREADY COMPLETE**
- Timeline component with animations
- Active states and scroll triggers
- Responsive layout

### Task 2.3: Skills Radar Chart
**Status**: ✅ **COMPLETED (2025-11-06)**
- Created `components/charts/SkillsRadarChart.tsx`
- Recharts integration with neobrutalist styling
- 6 skills displayed with custom tooltip
- Integrated in Journey section

### Task 2.4: Certification Badges
**Status**: ✅ **COMPLETED (2025-11-06)**
- Created `components/ui/CertificationBadge.tsx`
- Created `components/ui/CertificationModal.tsx`
- 6 certifications with unique icons
- Verified badges and modal animations
- Integrated in Journey section

### Task 2.5: Social Proof Testimonials
**Status**: ✅ **COMPLETED (2025-11-06)**
- Created `components/ui/Testimonial.tsx`
- 4 authentic testimonials added
- Grid layout (2 cols desktop, 1 mobile)
- Quote icons and verified badges
- Integrated in WorkTogether section

### Task 2.6: Analytics Event Tracking
**Status**: ✅ **COMPLETED (2025-11-06)**
- Client-side: `lib/hooks/useAnalytics.ts`
- Server-side: `lib/analytics/track.ts`
- Dashboard: `app/api/analytics/summary/route.ts`
- Provider: `components/providers/AnalyticsProvider.tsx`
- Tracking: page views, CTA clicks, scroll depth
- Integrated: Hero, WorkTogether sections

**Phase 2 Status**: ✅ **100% COMPLETE**

---

## 📊 UPDATED TIMELINE

### Realistic Production Timeline
- **Phase 3A** (Security & DB): 3-4 giorni
- **Phase 3B** (Chatbot): 2-3 giorni
- **Phase 3C** (Calendar): 2-3 giorni
- **Phase 3D** (Admin): 3-4 giorni
- **Phase 3E** (Blog/Spotify): 2 giorni
- **Phase 3F** (Testing/Deploy): 2 giorni

**Total**: 14-18 giorni lavorativi (2.5-3.5 settimane)

### Priority Execution Order
1. 🔴 **Security & Database** (blockers)
2. 🔴 **Chatbot** (main PRD feature)
3. 🔴 **Calendar/Booking** (revenue feature)
4. 🟡 **Admin Dashboard** (content management)
5. 🟡 **Blog/Spotify** (enhancements)
6. 🟢 **Testing/Deploy** (production ready)

---

## 📚 TEST FILES CREATED

8 comprehensive E2E test suites:
1. `e2e/analytics.spec.ts` - Event tracking, page views, CTAs
2. `e2e/database.spec.ts` - Database connectivity, models, CRUD
3. `e2e/api-routes.spec.ts` - All API endpoints testing
4. `e2e/spotify-integration.spec.ts` - Spotify API and widget
5. `e2e/chatbot.spec.ts` - Claude API, conversation flow
6. `e2e/admin-dashboard.spec.ts` - Admin features, article creator
7. `e2e/certifications.spec.ts` - Certification badges, modal
8. `e2e/testimonials.spec.ts` - Testimonial display, layout

**Detailed Findings**: `E2E_TEST_FINDINGS.md` (comprehensive report with all issues, recommendations, and solutions)

---

## 🎯 IMMEDIATE NEXT STEPS

1. **Review E2E Findings**: Read `E2E_TEST_FINDINGS.md` completely
2. **Setup Environment**: Add all missing environment variables
3. **Database Setup**: PostgreSQL local or cloud (Railway/Supabase)
4. **Start Phase 3A**: Security & Authentication implementation
5. **Parallel Work**: Chatbot while auth is being implemented

---

**Last Updated**: 2025-11-06 (After E2E Test Analysis)
**Next Review**: After Phase 3A completion
**Maintainer**: Claude Code + Human oversight
