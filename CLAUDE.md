# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Mattia's personal website - a neobrutalist portfolio and blog platform built with Next.js 14, featuring AI-powered interactions and a unique brand identity that combines pragmatic directness with purpose-driven storytelling.

## Backlog System

This project uses a structured backlog system with **Epics** and **User Stories** designed specifically for Claude Code to interpret and execute as tasks.

### Quick Start
1. **View Backlog**: Read `.backlog/backlog.md` for complete overview
2. **Select Story**: Choose based on priority, size, and execution environment
3. **Follow Story**: Each story has detailed implementation steps, test plans, and Definition of Done
4. **Track Progress**: Update story status when completing tasks

### Structure
```
.backlog/
  ├── backlog.md                 # Master backlog with all epics
  ├── templates/                 # Templates for new epics/stories
  ├── epics/
  │   ├── 01-design-system/
  │   │   ├── epic.md           # Epic overview
  │   │   └── stories/          # User stories for this epic
  │   ├── 02-google-calendar/
  │   ├── 03-copy-content/
  │   ├── 04-chatbot/
  │   ├── 05-spotify-player/
  │   └── 06-blog/
  └── README.md                  # Backlog system documentation
```

### Story Execution Environments
Stories are tagged for where they can be executed:
- **🌐 Claude Code Web**: Can be completed on claude.ai/code
- **💻 Claude Code Locale**: Requires agents/MCP tools only available in local Claude Code
- **🔄 Entrambi**: Partially web, partially local

**When using agents** (copywriter-hybrid, hormozi-conversion-optimizer, etc.), you MUST use Claude Code Locale.

### Current Epics
1. **EPIC-001**: Design System Consolidation (🔴 High Priority)
2. **EPIC-002**: Google Calendar Widget Fix (🔴 High Priority)
3. **EPIC-003**: Copy & Content Optimization (🟠 High Priority)
4. **EPIC-004**: AI Chatbot Implementation (🔴 High Priority)
5. **EPIC-005**: Spotify Player Integration (🟡 Medium Priority)
6. **EPIC-006**: Blog Redesign & Content Generation (🟠 High Priority)

### How to Use
When you receive a task request from the user:
1. Check if it relates to an existing story in the backlog
2. If yes, reference the story and follow its implementation guide
3. If no, work on it independently or suggest creating a new story

**Important**: The backlog is in `.claudeignore` to avoid context overload. Load it explicitly when:
- User asks about backlog/roadmap
- Starting work on a planned epic/story
- Planning new features

For complete documentation, see: `.backlog/README.md`

### PR Title Convention (IMPORTANT)

When creating Pull Requests for stories from the backlog, ALWAYS use this format:

```
[STORY-ID] Description
```

**Examples**:
- `[GC-002] Add E2E tests for booking flow`
- `[DS-003] Update CLAUDE.md design guidelines`
- `[BL-001] Redesign blog section with neobrutalist cards`

This enables automatic story status updates when PRs are merged. GitHub Actions will:
1. Extract the Story ID from the PR title
2. Find the story file in `.backlog/epics/*/stories/`
3. Update status to `✅ Done`
4. Update completion date
5. Commit the changes automatically

**Note**: PRs without Story IDs (hotfixes, chores, docs) can still be merged - the automation gracefully skips them.

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
Utilizza le utility Tailwind definite in `tailwind.config.ts`:
- **Borders**: `border-brutal`, `border-brutal-thick` (4-6px solid black)
- **Shadows**: `shadow-brutal`, `shadow-brutal-hover` (8px hard shadows)
- **Radius**: `rounded-brutal` (6px), `rounded-brutal-lg` (8px)
- **Hover effects**: Translate (-4px, -4px) with shadow increase

**Reference implementations**: `components/ui/Card.tsx`, `components/ui/Button.tsx`

### Animation Pattern
Purposeful animations using Framer Motion: `whileHover={{ x: -4, y: -4 }}` with spring physics.

### Component Variants Pattern
Color-coded variants for project categorization:
- **design** (Electric Blue #1E90FF): Design/UX projects
- **dev** (Slate Blue #6A7B9F): Development projects
- **pm** (Deep Navy #3E526A): PM/Strategy projects
- **tool** (Teal #2A687A): Analytics/Tools

**Reference implementations**: `components/ui/Card.tsx`, `components/ui/Badge.tsx`

### API Route Pattern
Consistent error handling with rate limiting and Zod validation.
**Reference implementation**: `app/api/chat/route.ts:252`

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