# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Mattia's personal website - a neobrutalist portfolio and blog platform built with Next.js 14, featuring AI-powered interactions and a unique brand identity that combines pragmatic directness with purpose-driven storytelling.

## Key Commands

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Run tests
npm test

# Run specific test file
npm test -- path/to/test.spec.ts

# Database operations
npm run db:push      # Push schema changes
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
```

## Architecture & Design Patterns

### Core Architecture
The application follows a **Jamstack approach** with pre-rendering for SEO and client-side interactivity, using:
- **API Gateway Pattern**: Single entry point (`/api`) for all external integrations
- **Webhook Architecture**: Real-time updates from Spotify/Calendar APIs
- **Progressive Enhancement**: Fully functional without JavaScript, enhanced with JS

### Project Structure
```
/app/[locale]/          # i18n routing with Italian/English support
  - page.tsx            # Homepage sections (Hero, Journey, Blog, etc.)
  - /blog/[slug]/       # Individual blog posts with MDX support
  - /api/               # API routes for Calendar, Chat, Analytics

/components/
  - /ui/                # Neobrutalist design system components
  - /sections/          # Homepage section components

/lib/
  - /api/               # External API integrations (Claude, Spotify, Google)
  - /utils/             # Helper functions and utilities
```

### State Management & Data Flow
- **Global State**: Zustand stores for theme, language, user preferences
- **Server State**: React Query for API data with optimistic updates
- **Form State**: React Hook Form with Zod validation
- **Database**: PostgreSQL with Prisma ORM for content and analytics

## Brand Identity & Content Guidelines

### Neobrutalist Design System (Cold-Tone Palette)

**Updated**: 2025-11-08 - Migrated to professional cold-tone palette with WCAG AA compliance

#### Color Palette
- **Primary**: Electric Blue #1E90FF (Design/UX projects)
- **Secondary**: Slate Blue #6A7B9F (Development projects)
- **Accent**: Deep Navy #3E526A (PM/Strategy projects)
- **Alternative**: Teal #2A687A (Analytics/Tools)

#### Visual Elements
- **Borders**: 4-6px solid black (`border-brutal`, `border-brutal-thick`)
- **Shadows**: Hard shadows 8px offset, no blur (`shadow-brutal`, `shadow-brutal-hover`)
- **Border Radius**: 6-8px standard (reduced from 12px for professional look)
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (code)

#### Spacing System
- **8pt Grid**: Systematic spacing scale (8px → 160px)
- Usage: `p-1` (8px), `m-3` (24px), `gap-6` (48px), `p-12` (96px)

#### Accessibility Features (WCAG AA Compliant)
- **Skip Links**: Keyboard navigation bypass (Tab to reveal)
- **Touch Targets**: Minimum 48×48px on mobile (`@media (pointer: coarse)`)
- **Reduced Motion**: Respects user preference (`prefers-reduced-motion`)
- **Focus Indicators**: 4px solid Electric Blue outline
- **Color Contrast**: All colors ≥4.5:1 contrast ratio

### Content Tone of Voice
The content follows a hybrid style combining:
- **Romei's pragmatism**: Direct, no-nonsense approach
- **Toon's accessibility**: Conversational, relatable language
- **Sinek's purpose**: Always start with "why"

Key writing rules:
1. Start with the problem, not the solution
2. Use everyday metaphors for complex concepts
3. Employ constructive irony to highlight issues
4. Create mental scenes instead of abstractions
5. Use sentence case (only initial capital)
6. Keep paragraphs to 3-4 lines max
7. Use "we" instead of "you should"

### Content Examples
Instead of: "Implement robust authentication system with JWT tokens"
Write: "We're solving the '3am password reset' problem - when users are locked out and frustrated"

Instead of: "Optimized performance metrics"
Write: "Cut payment times by 12%. How? Reduced clicks from 7 to 3. Sometimes the answer isn't complex."

## API Integrations

### Claude API (Chatbot & Content)
- Custom context with Mattia's background and tone
- Content generation for blog drafts
- Conversation categorization (lead/networking/curious)

### Google Calendar API
- OAuth2 flow for appointment booking
- Available slots management
- Timezone handling

### Spotify Web API
- Now Playing widget
- Auto token refresh
- Fallback for offline status

## Performance & Security Guidelines

### Performance Targets
- First Contentful Paint: <2s
- Interaction to Next Paint: <100ms
- Core Web Vitals: All green
- Image optimization: WebP with fallback

### Security Considerations
- Rate limiting on all API endpoints (sliding window)
- CORS whitelist for specific domains
- Environment variables for all API keys
- Session management with Redis
- Input validation with Zod schemas

## Development Workflow

### Feature Development
1. Create feature branch from `main`
2. Implement with mobile-first approach
3. Add appropriate Framer Motion animations
4. Ensure i18n support for new content
5. Test dark mode compatibility
6. Verify Core Web Vitals impact

### Blog Content Workflow
1. Create MDX file in `/content/blog/`
2. Add frontmatter with metadata
3. Use Claude API for draft generation if needed
4. Apply tone of voice guidelines
5. Add interactive components where appropriate

### Admin Features
The admin dashboard (`/admin`) includes:
- Article creator with AI assistance
- Conversation manager for chatbot interactions
- Analytics dashboard with heatmaps and insights

## Common Patterns

### Neobrutalist Component Pattern
```tsx
// Always include thick borders and hard shadows
// Use rounded-brutal (6px) or rounded-brutal-lg (8px) instead of rounded-lg
className="border-brutal border-black shadow-brutal rounded-brutal"

// Interactive hover effects
className="hover:shadow-brutal-hover hover:translate-x-[-4px] hover:translate-y-[-4px]
           active:shadow-brutal-active active:translate-x-[4px] active:translate-y-[4px]"
```

### Animation Pattern
```tsx
// Purposeful animations, not decorative
whileHover={{ x: -4, y: -4 }}
transition={{ type: "spring", stiffness: 400 }}
```

### Component Variants Pattern
```tsx
// Color-coded Card Headers for project categorization
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// Design/UX projects - Electric Blue
<Card>
  <CardHeader variant="design">
    <CardTitle>Figma Component Library</CardTitle>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>

// Development projects - Slate Blue
<CardHeader variant="dev">
  <CardTitle>Next.js Migration</CardTitle>
</CardHeader>

// PM/Strategy projects - Deep Navy
<CardHeader variant="pm">
  <CardTitle>Product Roadmap 2024</CardTitle>
</CardHeader>

// Semantic Badges for skills/tags
import { Badge } from '@/components/ui/Badge';

<Badge variant="design">Figma</Badge>        // Electric Blue
<Badge variant="dev">React</Badge>           // Slate Blue
<Badge variant="pm">Product Strategy</Badge> // Deep Navy
<Badge variant="tool">Google Analytics</Badge> // Teal
```

### API Route Pattern
```ts
// Consistent error handling and rate limiting
export async function POST(request: Request) {
  const rateLimitCheck = await checkRateLimit(request);
  if (!rateLimitCheck.success) return rateLimitResponse();

  try {
    const body = await request.json();
    const validated = schema.parse(body);
    // Process request
  } catch (error) {
    return handleApiError(error);
  }
}
```

## Key Technical Decisions

1. **Next.js App Router over Pages**: Better layouts, streaming, and server components
2. **Tailwind over CSS-in-JS**: Better performance and developer experience
3. **PostgreSQL over MongoDB**: Relational data needs for analytics and content relationships
4. **Vercel/Railway deployment**: Optimized for Next.js with preview deployments
5. **MDX over CMS**: Developer-friendly content with component embedding
6. **Zustand over Redux**: Lighter weight for simple global state needs

## Testing Strategy

- **Unit Tests**: Core utilities and hooks
- **Integration Tests**: API routes and database operations
- **E2E Tests**: Critical user paths (booking, chat, blog reading)
- **Visual Regression**: Chromatic for design system components
- **Performance Tests**: Lighthouse CI in GitHub Actions