# Directory Structure - Mattia Portfolio

Complete project structure with descriptions of each directory's purpose.

```
mattia_web/
│
├── 📁 app/                          # Next.js 14 App Router
│   ├── 📁 [locale]/                 # Internationalized routes (it/en)
│   │   ├── layout.tsx               # Root layout with i18n provider
│   │   ├── page.tsx                 # Homepage (Hero + sections)
│   │   ├── 📁 blog/                 # Blog section
│   │   │   ├── page.tsx             # Blog listing page
│   │   │   └── 📁 [slug]/           # Dynamic blog post routes
│   │   │       └── page.tsx         # Individual blog post
│   │   └── 📁 admin/                # Admin dashboard (protected)
│   │       ├── page.tsx             # Dashboard home
│   │       ├── 📁 blog/             # Blog management
│   │       ├── 📁 conversations/    # Chat management
│   │       └── 📁 analytics/        # Analytics views
│   │
│   ├── 📁 api/                      # API Routes (server-side)
│   │   ├── 📁 calendar/             # Google Calendar integration
│   │   │   ├── route.ts             # GET available slots
│   │   │   └── book/route.ts        # POST create booking
│   │   ├── 📁 chat/                 # AI Chatbot (Claude)
│   │   │   └── route.ts             # POST chat message
│   │   ├── 📁 analytics/            # Custom analytics
│   │   │   └── route.ts             # POST track event
│   │   └── 📁 spotify/              # Spotify Now Playing
│   │       └── route.ts             # GET current track
│   │
│   ├── layout.tsx                   # Root app layout
│   ├── page.tsx                     # Root page (redirects to locale)
│   ├── globals.css                  # Global styles + Tailwind
│   └── fonts.ts                     # Font configurations
│
├── 📁 components/                   # React Components
│   ├── 📁 ui/                       # Design System Components
│   │   ├── Button.tsx               # Neobrutalist button
│   │   ├── Card.tsx                 # Card with shadow
│   │   ├── Input.tsx                # Form input
│   │   ├── Badge.tsx                # Category badge
│   │   ├── Section.tsx              # Section wrapper
│   │   ├── ThemeToggle.tsx          # Dark mode toggle
│   │   └── index.ts                 # Barrel export
│   │
│   ├── 📁 sections/                 # Homepage Sections
│   │   ├── HeroSection.tsx          # Hero with headline + CTA
│   │   ├── JourneySection.tsx       # Timeline of experience
│   │   ├── BlogSection.tsx          # Latest blog posts
│   │   ├── WorkTogetherSection.tsx  # Services offered
│   │   ├── WhatImUpToSection.tsx    # Current work + Spotify
│   │   └── AskMeSection.tsx         # Chatbot + contact form
│   │
│   ├── 📁 admin/                    # Admin-Only Components
│   │   ├── BlogEditor.tsx           # MDX blog editor
│   │   ├── ConversationList.tsx     # Chat conversations
│   │   └── AnalyticsDashboard.tsx   # Metrics visualization
│   │
│   └── 📁 providers/                # Context Providers
│       └── ThemeProvider.tsx        # Theme context
│
├── 📁 lib/                          # Utilities & Logic
│   ├── 📁 api/                      # External API Integrations
│   │   ├── anthropic.ts             # Claude API client
│   │   ├── google-calendar.ts       # Calendar API + OAuth
│   │   ├── spotify.ts               # Spotify API + refresh
│   │   └── prisma.ts                # Prisma client singleton
│   │
│   ├── 📁 utils/                    # Utility Functions
│   │   ├── cn.ts                    # Class name helper (clsx + twMerge)
│   │   ├── format.ts                # Date/time formatting
│   │   ├── mdx.ts                   # MDX processing
│   │   └── validation.ts            # Zod schemas
│   │
│   ├── 📁 hooks/                    # Custom React Hooks
│   │   ├── useAnalytics.ts          # Track events
│   │   ├── useTheme.ts              # Theme management
│   │   └── useMediaQuery.ts         # Responsive breakpoints
│   │
│   ├── 📁 stores/                   # Zustand State Stores
│   │   ├── themeStore.ts            # Theme state
│   │   └── chatStore.ts             # Chat state
│   │
│   ├── 📁 middleware/               # API Middleware
│   │   ├── cors.ts                  # CORS configuration
│   │   └── rate-limit.ts            # Rate limiting
│   │
│   └── 📁 security/                 # Security Utilities
│       ├── 📁 config/               # Security configs
│       ├── 📁 oauth/                # OAuth flows
│       ├── 📁 validation/           # Input validation
│       └── 📁 sanitization/         # XSS prevention
│
├── 📁 content/                      # Content Files
│   └── 📁 blog/                     # Blog Posts (MDX)
│       ├── design-journey.mdx       # Example post
│       └── product-lessons.mdx      # Example post
│
├── 📁 public/                       # Static Assets
│   ├── 📁 fonts/                    # Local fonts (if needed)
│   ├── 📁 images/                   # Static images
│   ├── 📁 icons/                    # SVG icons
│   └── favicon.ico                  # Site favicon
│
├── 📁 prisma/                       # Database
│   ├── schema.prisma                # Database schema
│   └── seed.ts                      # Seeding script
│
├── 📁 messages/                     # i18n Translations
│   ├── en.json                      # English translations
│   └── it.json                      # Italian translations
│
├── 📁 scripts/                      # Utility Scripts
│   ├── generate-sitemap.ts          # SEO sitemap
│   └── migrate-content.ts           # Content migration
│
├── 📁 docs/                         # Documentation
│   └── 📁 deployment/               # Deployment guides
│
├── 📄 Configuration Files
│   ├── next.config.mjs              # Next.js config (i18n, MDX)
│   ├── tailwind.config.ts           # Tailwind + design tokens
│   ├── tsconfig.json                # TypeScript config
│   ├── postcss.config.mjs           # PostCSS for Tailwind
│   ├── i18n.ts                      # i18n configuration
│   ├── middleware.ts                # Next.js middleware (routing)
│   ├── package.json                 # Dependencies
│   ├── .eslintrc.json               # ESLint rules
│   ├── .gitignore                   # Git ignore patterns
│   └── .env.example                 # Environment variables template
│
└── 📄 Documentation Files
    ├── README.md                    # Getting started guide
    ├── ARCHITECTURE.md              # Technical architecture
    ├── PROJECT_STATUS.md            # Current status & next steps
    ├── DIRECTORY_STRUCTURE.md       # This file
    ├── PRD_Mattia_Website.md        # Product requirements
    ├── DESIGN_SYSTEM.md             # Design system guide
    └── CLAUDE.md                    # Claude integration notes
```

---

## Key Directories Explained

### 🎨 Frontend Structure

#### `/app/[locale]`
**Purpose**: Internationalized pages using Next.js App Router
**Pattern**: Route-based locale detection (e.g., `/it/blog`, `/en/blog`)
**Key Files**:
- `layout.tsx`: Root layout with i18n provider and fonts
- `page.tsx`: Homepage with all sections

#### `/components`
**Purpose**: Reusable React components organized by function
**Structure**:
- **ui/**: Design system primitives (Button, Card, Input)
- **sections/**: Homepage sections (Hero, Journey, Blog, etc.)
- **admin/**: Admin dashboard components
- **providers/**: React context providers

#### `/lib`
**Purpose**: Business logic, utilities, and integrations
**Key Subdirectories**:
- **api/**: External service integrations (Claude, Google, Spotify)
- **utils/**: Helper functions (formatting, validation)
- **hooks/**: Custom React hooks
- **stores/**: Zustand global state
- **security/**: Authentication and security utilities

---

### 🔌 Backend Structure

#### `/app/api`
**Purpose**: Server-side API routes (Next.js serverless functions)
**Routes**:
- `/calendar`: Google Calendar booking
- `/chat`: Claude AI chatbot
- `/analytics`: Custom event tracking
- `/spotify`: Now Playing integration

#### `/prisma`
**Purpose**: Database schema and migrations
**Files**:
- `schema.prisma`: Database models (User, BlogPost, etc.)
- `seed.ts`: Sample data for development

---

### 📝 Content & i18n

#### `/content/blog`
**Purpose**: Blog posts in MDX format
**Format**: Markdown + React components
**Frontmatter**: Title, slug, category, locale, date

#### `/messages`
**Purpose**: Translation files for i18n
**Files**:
- `en.json`: English translations
- `it.json`: Italian translations

---

### ⚙️ Configuration

#### Root Config Files
- **next.config.mjs**: Framework settings, i18n, MDX, images
- **tailwind.config.ts**: Design tokens (colors, spacing, shadows)
- **tsconfig.json**: TypeScript strict mode
- **i18n.ts**: Locale configuration
- **middleware.ts**: Route interception for i18n

---

## File Naming Conventions

### Components
```typescript
// PascalCase for components
Button.tsx
HeroSection.tsx
AnimatedCard.tsx
```

### Utilities
```typescript
// camelCase for utilities
format.ts
validation.ts
cn.ts (class names)
```

### API Routes
```typescript
// route.ts for all API endpoints
app/api/chat/route.ts
app/api/calendar/book/route.ts
```

### Stores
```typescript
// camelCase + Store suffix
themeStore.ts
chatStore.ts
```

---

## Import Aliases

Configured in `tsconfig.json`:

```typescript
// Instead of ../../../lib/utils
import { cn } from '@/lib/utils';

// Instead of ../../components/ui/Button
import { Button } from '@/components/ui';

// Works from any file in the project
```

---

## Code Organization Principles

### 1. Co-location
Place related files together:
```
components/ui/Button/
├── Button.tsx
├── Button.test.tsx
└── Button.stories.tsx
```

### 2. Barrel Exports
Use `index.ts` for clean imports:
```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';

// Usage elsewhere
import { Button, Card } from '@/components/ui';
```

### 3. Feature Folders
Group by feature, not file type:
```
app/api/calendar/
├── route.ts          # GET available slots
├── book/
│   └── route.ts      # POST booking
└── cancel/
    └── route.ts      # DELETE booking
```

---

## Environment-Specific Files

```
.env                 # Local development (gitignored)
.env.example         # Template for required variables
.env.production      # Production secrets (not in repo)
.env.test            # Test environment
```

---

## Generated Directories (gitignored)

```
node_modules/        # NPM packages
.next/               # Next.js build output
coverage/            # Test coverage reports
dist/                # Production build
.vercel/             # Vercel deployment cache
```

---

## Next Steps for Organization

### When to create new directories:

**Create `/components/forms/`** when you have 3+ form-specific components

**Create `/lib/email/`** when adding email functionality

**Create `/app/api/admin/`** for admin-specific API routes

**Create `/content/case-studies/`** if adding portfolio case studies

---

*This structure follows Next.js 14 App Router best practices and scales well for future features.*
