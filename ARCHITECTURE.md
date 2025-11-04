# Project Architecture - Mattia Portfolio Website

## Overview
Neobrutalist portfolio website for Mattia, Product Manager with design and development background.

**Framework**: Next.js 14 with App Router + TypeScript
**Database**: PostgreSQL with Prisma ORM
**Styling**: Tailwind CSS with custom neobrutalist design tokens
**State**: Zustand for global state management
**Animations**: Framer Motion for micro-interactions

---

## Directory Structure

```
mattia_web/
├── app/
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx            # Root layout with i18n provider
│   │   ├── page.tsx              # Homepage
│   │   ├── blog/                 # Blog listing and posts
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/           # Individual blog post
│   │   │       └── page.tsx
│   │   └── admin/                # Admin dashboard (protected)
│   │       └── ...
│   ├── api/                      # API routes
│   │   ├── calendar/             # Google Calendar integration
│   │   ├── chat/                 # AI chatbot (Claude)
│   │   ├── analytics/            # Custom analytics
│   │   └── spotify/              # Spotify Now Playing
│   ├── globals.css               # Global styles + Tailwind
│   └── fonts.ts                  # Font configurations
│
├── components/
│   ├── ui/                       # Design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── sections/                 # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── JourneySection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── WorkTogetherSection.tsx
│   │   └── ...
│   └── admin/                    # Admin-only components
│       └── ...
│
├── lib/
│   ├── api/                      # External API integrations
│   │   ├── anthropic.ts          # Claude API
│   │   ├── google-calendar.ts    # Calendar integration
│   │   ├── spotify.ts            # Spotify API
│   │   └── prisma.ts             # Prisma client singleton
│   ├── utils/                    # Utility functions
│   │   ├── cn.ts                 # Class name utility (clsx + twMerge)
│   │   ├── format.ts             # Date/time formatting
│   │   └── mdx.ts                # MDX processing
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAnalytics.ts
│   │   └── useTheme.ts
│   └── stores/                   # Zustand stores
│       ├── themeStore.ts
│       └── chatStore.ts
│
├── content/
│   └── blog/                     # Blog posts (MDX files)
│       ├── post-1.mdx
│       └── post-2.mdx
│
├── public/
│   ├── fonts/                    # Local fonts (if needed)
│   ├── images/                   # Static images
│   └── icons/                    # SVG icons
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeding script
│
├── messages/                     # i18n translation files
│   ├── en.json
│   └── it.json
│
├── i18n.ts                       # i18n configuration
├── middleware.ts                 # Next.js middleware (i18n routing)
├── tailwind.config.ts            # Tailwind + design tokens
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── .env.example                  # Environment variables template
```

---

## Core Features & Architecture

### 1. Internationalization (i18n)
- **Library**: `next-intl`
- **Locales**: Italian (default), English
- **Strategy**: Route-based locale detection (`/it/*`, `/en/*`)
- **Implementation**:
  - Middleware for locale routing
  - Server-side translations with `getTranslations`
  - Client-side with `useTranslations` hook

### 2. Database Layer
- **ORM**: Prisma with PostgreSQL
- **Models**:
  - `User`: Admin authentication
  - `BlogPost`: Blog content with locale support
  - `ChatConversation`: AI chatbot history
  - `ChatMessage`: Individual messages
  - `CalendarBooking`: Consultation bookings
  - `AnalyticsEvent`: Custom analytics tracking
  - `SpotifyCache`: Cached Now Playing data
  - `NewsletterSubscriber`: Email list (future)

### 3. API Integrations

#### Claude API (Anthropic)
- **Purpose**: AI chatbot ("digital twin")
- **Implementation**: `/app/api/chat/route.ts`
- **Context**: Pre-loaded with Mattia's background and tone of voice
- **Categorization**: Auto-categorize users (lead/networking/curious)

#### Google Calendar API
- **Purpose**: Book consultation calls
- **Implementation**: `/app/api/calendar/route.ts`
- **OAuth Flow**: Server-side authentication
- **Features**:
  - Available slot retrieval
  - Booking creation with Google Meet link
  - Automatic reminders

#### Spotify Web API
- **Purpose**: "Now Playing" widget
- **Implementation**: `/app/api/spotify/route.ts`
- **Token Refresh**: Automatic refresh token handling
- **Caching**: Redis/database cache for rate limit optimization

### 4. Blog Engine
- **Format**: MDX (Markdown + React components)
- **Processing**: `gray-matter` for frontmatter, `remark` for parsing
- **Features**:
  - Reading time calculation
  - Category filtering (Design, Dev, Product, Personal, AMA)
  - Locale-specific content
  - View tracking
  - SEO metadata

### 5. Analytics
- **Custom Events**: Database-backed custom analytics
- **Events Tracked**:
  - Page views
  - CTA clicks
  - Blog read time
  - Chat interactions
  - Booking conversions
- **Dashboard**: Admin-only analytics visualization

### 6. Design System (Neobrutalist)

#### Color Palette
```typescript
primary: '#FFD93D' (Yellow)
secondary: '#6C5CE7' (Purple)
accent: '#FF6B6B' (Coral Red)
border: '#000000' (Black, 4-6px)
shadow: '#000000' (8px offset, no blur)
```

#### Typography
- **Headings**: Space Grotesk (bold/black)
- **Body**: Inter (regular/medium)
- **Code**: JetBrains Mono (monospace)
- **Style**: Sentence case for all titles

#### Components
- Thick borders (4-6px solid black)
- Hard shadows (8px 8px 0px black)
- Rounded corners (8-12px)
- Generous whitespace (min 32px padding)

---

## State Management

### Zustand Stores

#### Theme Store (`lib/stores/themeStore.ts`)
```typescript
interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

#### Chat Store (`lib/stores/chatStore.ts`)
```typescript
interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
}
```

---

## Security & Performance

### Security
- **Authentication**: bcrypt hashed passwords for admin
- **Rate Limiting**: Redis-based rate limiting on API routes
- **CORS**: Whitelist specific domains
- **Input Validation**: Zod schemas for all inputs
- **Sanitization**: XSS prevention on user-generated content

### Performance
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Route-based automatic splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**:
  - API responses cached in Redis
  - Static generation for blog posts
  - ISR for dynamic content
- **Database Indexing**: Strategic indexes on frequent queries

---

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Run database migrations
npm run db:push

# Generate Prisma client
npm run db:generate

# Start dev server
npm run dev
```

### Environment Variables
See `.env.example` for required variables:
- Database connection
- API keys (Claude, Google, Spotify)
- Redis URL
- JWT secret

### Database Management
```bash
# Open Prisma Studio
npm run db:studio

# Create migration
npm run db:migrate

# Seed database
npm run db:seed
```

---

## Deployment Architecture

### Frontend (Vercel)
- Automatic deployments from `main` branch
- Preview deployments for PRs
- Edge network distribution
- Environment variables in Vercel dashboard

### Backend APIs
- Serverless functions on Vercel
- Redis instance for caching/rate limiting
- PostgreSQL database (managed service)

### Infrastructure
- **CDN**: Cloudflare for static assets
- **Storage**: Cloudinary for optimized images
- **Monitoring**: Sentry for error tracking
- **CI/CD**: GitHub Actions for automated testing

---

## Next Steps for Development

### Immediate Tasks
1. Create UI component library (Button, Card, Input, etc.)
2. Build homepage sections as per PRD
3. Implement blog listing and detail pages
4. Setup Google Calendar OAuth flow
5. Integrate Claude API for chatbot
6. Implement Spotify Now Playing widget

### Phase 2
1. Admin dashboard for content management
2. Analytics tracking implementation
3. Newsletter subscription system
4. Dark mode toggle functionality
5. Performance optimization

### Phase 3
1. Advanced analytics visualization
2. A/B testing framework
3. Progressive Web App (PWA) features
4. Accessibility audit and improvements
5. SEO optimization

---

## Technical Decisions & Trade-offs

### Why Next.js 14 App Router?
- Server Components for better performance
- Built-in internationalization support
- Optimized image loading
- API routes for backend logic
- Excellent developer experience

### Why Prisma?
- Type-safe database queries
- Automatic migrations
- Excellent TypeScript integration
- Studio GUI for database management

### Why Zustand over Redux?
- Simpler API, less boilerplate
- Better TypeScript support
- Smaller bundle size
- Easier to learn and maintain

### Why PostgreSQL?
- Robust relational database
- JSON support for flexible schema
- Excellent performance
- Wide ecosystem and hosting options

---

## Performance Targets

- **First Contentful Paint (FCP)**: < 2s
- **Interaction to Next Paint (INP)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3s
- **Lighthouse Score**: > 90 across all metrics

---

## Maintenance & Monitoring

### Logging
- Server errors: Sentry integration
- API errors: Structured logging
- User actions: Custom analytics events

### Monitoring
- Uptime monitoring: Vercel Analytics
- Performance: Web Vitals tracking
- Error tracking: Sentry
- Database: Prisma query logging

### Updates
- Dependencies: Monthly security updates
- Framework: Follow Next.js LTS releases
- Database migrations: Tested in staging first
- Content: Regular blog posts and portfolio updates

---

## Contact & Support

**Project Owner**: Mattia
**Repository**: Private GitHub repository
**Documentation**: This file + inline code comments
**Issues**: GitHub Issues for bug tracking

---

*Last Updated*: 2025-11-04
*Next.js Version*: 14.2.18
*Status*: Initial Setup Complete ✅
