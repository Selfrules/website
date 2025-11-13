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

**Updated**: 2025-11-13 - Updated with correct Figma Make palette

#### Color Palette
- **Electric Blue**: #0D7EFF (Design/UX projects)
- **Teal**: #2A687A (Development projects)
- **Deep Purple**: #7209B7 (PM/Strategy projects)
- **Cyber Yellow**: #FFD60A (Featured/Special items - use black text #0A0A0A)
- **Neon Pink**: #FF006E (Analytics/Tools projects)

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

## Design System Usage (PRIORITÀ MASSIMA)

### Regola d'Oro
**SEMPRE** utilizzare il design system custom. **MAI** utilizzare utility Tailwind vanilla quando esiste un'alternativa custom.

### Design Tokens Reference

Tutti i design tokens sono definiti in `tailwind.config.ts`. Utilizzare SEMPRE questi invece di valori hard-coded.

#### Colori

**Palette Principale (Badge e Progetti)**
| Uso | Utility Class | Hex | Text Color | Quando Usare |
|-----|---------------|-----|------------|--------------|
| Electric Blue | `bg-electric-blue` `text-electric-blue` | #0D7EFF | white | Design/UX projects, design badges |
| Teal | `bg-teal` `text-teal` | #2A687A | white | Development projects, dev badges |
| Deep Purple | `bg-deep-purple` `text-deep-purple` | #7209B7 | white | PM/Strategy projects, strategy badges |
| Cyber Yellow | `bg-cyber-yellow` `text-cyber-yellow` | #FFD60A | black (#0A0A0A) | ⭐ Featured/Special projects |
| Neon Pink | `bg-neon-pink` `text-neon-pink` | #FF006E | white | Analytics/Tools projects |

**Colori Strutturali**
| Uso | Utility Class | Hex | Quando Usare |
|-----|---------------|-----|--------------|
| Borders | `border-black` | #000000 | Bordi brutalist standard |
| Card Borders | `border-white` | #FFFFFF | Bordi card su sfondo scuro |
| Card Background | `bg-cream` | #FFFCF2 | Sfondo card light mode |

#### Borders
| Utility | Width | Quando Usare |
|---------|-------|--------------|
| `border-brutal` | 4px | Standard borders |
| `border-brutal-thick` | 6px | Emphasis borders |
| `border-brutal-thin` | 3px | Subtle borders |

#### Shadows
| Utility | Offset | Quando Usare |
|---------|--------|--------------|
| `shadow-brutal` | 8px | Standard elements |
| `shadow-brutal-hover` | 12px | Hover states |
| `shadow-brutal-sm` | 4px | Small elements |
| `shadow-brutal-lg` | 16px | Hero elements |

#### Border Radius
| Utility | Radius | Quando Usare |
|---------|--------|--------------|
| `rounded-brutal` | 6px | Standard |
| `rounded-brutal-lg` | 8px | Large elements |

#### Spacing (8pt Grid)
| Utility | Value | Quando Usare |
|---------|-------|--------------|
| `p-brutal-xs` / `m-brutal-xs` | 8px | Tight spacing |
| `p-brutal-sm` / `m-brutal-sm` | 16px | Small spacing |
| `p-brutal-md` / `m-brutal-md` | 24px | Medium spacing |
| `p-brutal-lg` / `m-brutal-lg` | 32px | Large spacing |
| `p-brutal-xl` / `m-brutal-xl` | 48px | Extra large spacing |

### Componenti Riusabili

**SEMPRE** riutilizzare componenti esistenti da `/components/ui/` prima di crearne di nuovi.

| Componente | Path | Quando Usare |
|------------|------|--------------|
| Button | `/components/ui/Button.tsx` | Tutti i bottoni, CTAs |
| Card | `/components/ui/Card.tsx` | Contenitori di contenuto, project cards |
| Badge | `/components/ui/Badge.tsx` | Tag, labels, categorie (varianti: design, dev, pm, tool, featured) |
| Input | `/components/ui/Input.tsx` | Form inputs |
| Textarea | `/components/ui/Textarea.tsx` | Multi-line text inputs |

Per riferimenti visivi completi, consultare: `/app/[locale]/design-system/page.tsx`

### Pattern DO/DON'T

#### ✅ DO: Usa Design System Custom
```tsx
// Button con design system
<Button variant="primary" size="lg">
  Click me
</Button>

// Badge con colori corretti
<Badge variant="design">Design/UX</Badge>  // Electric Blue
<Badge variant="dev">Development</Badge>   // Teal
<Badge variant="pm">PM/Strategy</Badge>    // Deep Purple
<Badge variant="featured">Featured</Badge> // Cyber Yellow
<Badge variant="tool">Analytics</Badge>    // Neon Pink

// Card con utility custom
<div className="border-brutal shadow-brutal rounded-brutal bg-cream p-brutal-md">
  Content
</div>
```

#### ❌ DON'T: Usa Tailwind Vanilla
```tsx
// SBAGLIATO: Valori hard-coded
<button className="bg-[#0D7EFF] px-6 py-3 rounded-lg shadow-lg">
  Click me
</button>

// SBAGLIATO: Utility vanilla quando esiste alternativa custom
<div className="border-4 shadow-xl rounded-lg bg-white p-6">
  Content
</div>

// SBAGLIATO: Colori vecchi
<Badge className="bg-[#1E90FF]">Design</Badge>  // Vecchio Electric Blue
<Badge className="bg-slate-blue">Dev</Badge>    // Non esiste più
```

### Checklist per Nuovi Componenti

Quando crei un nuovo componente UI:
- [ ] Usa design tokens da `tailwind.config.ts`
- [ ] Applica utility brutalist (`border-brutal`, `shadow-brutal`, `rounded-brutal`)
- [ ] Rispetta 8pt grid per spacing (`p-brutal-*`, `m-brutal-*`)
- [ ] Implementa tutte le varianti colore necessarie (electric-blue, teal, deep-purple, cyber-yellow, neon-pink)
- [ ] Aggiungi JSDoc con `@component` e `@category` per auto-catalogazione
- [ ] Testa dark mode
- [ ] Verifica contrasto WCAG AA (colori ≥4.5:1)
- [ ] Aggiungi animazioni Framer Motion se appropriato

### Riferimento Rapido

- **Design Tokens**: `tailwind.config.ts`
- **Componenti UI**: `/components/ui/`
- **Pagina Design System**: `/app/[locale]/design-system/page.tsx`
- **Esempi Pattern**: Vedi sezione "Neobrutalist Component Pattern" sotto

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