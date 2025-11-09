# Comprehensive Implementation Workflow - Mattia's Portfolio Website

**Generated**: 2025-11-08
**Based on**: IMPLEMENTATION_GUIDE.md + 7 Section Specifications
**Strategy**: Systematic with Parallel Optimization
**Estimated Duration**: 48-70 hours (depending on parallelization)

---

## Executive Summary

This workflow provides a systematic approach to implementing Mattia's neobrutalist portfolio website from the ground up. The implementation is organized into 5 phases with clear dependencies, quality gates, and parallel execution opportunities.

**Key Success Metrics:**
- ✅ 100% specification compliance
- ✅ WCAG AA accessibility achieved
- ✅ Lighthouse score > 90 (all categories)
- ✅ Core Web Vitals all green
- ✅ Zero critical bugs in production

---

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS with custom neobrutalist utilities
- **State Management**: Zustand (global), React Query (server state)
- **Forms**: React Hook Form + Zod validation
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel with Edge Network
- **Testing**: Vitest, Playwright, axe-core

### Design System Foundation
**Color Palette** (Cold-Tone Professional):
```typescript
primary: {
  electricBlue: '#1E90FF',  // Design/UX projects
  slateBlue: '#6A7B9F',     // Development projects
  deepNavy: '#3E526A'       // PM/Strategy projects
}
accent: {
  magenta: '#FF1B8D',
  purple: '#9333EA',
  yellow: '#FFD93D',
  teal: '#2A687A'
}
```

**Typography Scale** (Desktop):
- Hero: 72px (Space Grotesk 900)
- Display: 58px
- H1: 46px
- H2: 37px
- H3: 29px
- Body: 17px (Inter 400)

**Neobrutalist Patterns**:
- Borders: 4-6px solid black
- Shadows: 8px offset, no blur
- Border radius: 6-8px (professional, reduced from 12px)
- Transitions: max 0.3s ease
- Hover: translate(-3px, -3px) + shadow growth

---

## Phase 0: Foundation Setup (8-12 hours)

**Priority**: 🔴 CRITICAL - All subsequent work depends on this phase

### Task 0.1: Tailwind Configuration (2 hours)

**File**: `tailwind.config.ts`

**Deliverables**:
```typescript
// Design tokens
export default {
  theme: {
    extend: {
      colors: {
        // Cold-tone palette
        'electric-blue': '#1E90FF',
        'slate-blue': '#6A7B9F',
        'deep-navy': '#3E526A',
        // ... all palette colors
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace']
      },
      spacing: {
        // 8pt grid system
        // ... spacing scale
      },
      borderRadius: {
        'brutal': '6px',
        'brutal-lg': '8px',
        'brutal-sm': '4px'
      },
      boxShadow: {
        'brutal': '8px 8px 0 #000',
        'brutal-hover': '11px 11px 0 #000',
        'brutal-active': '3px 3px 0 #000'
      }
    }
  },
  plugins: []
}
```

**Custom Utilities**:
```css
/* globals.css */
@layer utilities {
  .border-brutal {
    @apply border-4 border-black;
  }
  .border-brutal-thick {
    @apply border-6 border-black;
  }
  .shadow-brutal {
    @apply shadow-[8px_8px_0_#000];
  }
  .shadow-brutal-hover {
    @apply shadow-[11px_11px_0_#000];
  }
}
```

**Validation**:
- [ ] Design tokens accessible via Tailwind classes
- [ ] Custom utilities work correctly
- [ ] Font families loaded properly
- [ ] Build succeeds without errors

---

### Task 0.2: Base Component Library (4-6 hours)

**Files**:
- `components/ui/Card.tsx`
- `components/ui/Button.tsx`
- `components/ui/Badge.tsx`
- `components/ui/Input.tsx`

#### Card Component

**Spec**: `components/ui/Card.tsx`

```typescript
interface CardProps {
  variant?: 'default' | 'highlighted' | 'dark' | 'gradient';
  borderColor?: string;
  shadowColor?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({
  variant = 'default',
  borderColor = '#000',
  shadowColor = '#000',
  children,
  className
}: CardProps) {
  const variants = {
    default: 'bg-white',
    highlighted: 'bg-gradient-to-br from-blue-50 to-purple-50',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-electric-blue to-magenta'
  };

  return (
    <div
      className={cn(
        'border-brutal rounded-brutal shadow-brutal',
        'transition-all duration-300 ease-out',
        'hover:translate-x-[-3px] hover:translate-y-[-3px]',
        'hover:shadow-brutal-hover',
        variants[variant],
        className
      )}
      style={{
        borderColor,
        boxShadow: `8px 8px 0 ${shadowColor}`
      }}
    >
      {children}
    </div>
  );
}
```

**Variants to Implement**:
- Default (white background)
- Highlighted (gradient background for current position)
- Dark (for dark sections)
- Gradient (for CTA cards)

**Testing**:
- [ ] All variants render correctly
- [ ] Hover effects smooth (60fps)
- [ ] Custom border/shadow colors work
- [ ] Responsive on all breakpoints

#### Button Component

**Spec**: `components/ui/Button.tsx`

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'yellow' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-electric-blue text-white border-black',
    secondary: 'bg-white text-black border-black',
    yellow: 'bg-yellow text-black border-black',
    outline: 'bg-transparent text-black border-black'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        'font-space-grotesk font-bold',
        'border-brutal rounded-brutal shadow-brutal',
        'transition-all duration-200 ease-out',
        'hover:translate-x-[-2px] hover:translate-y-[-2px]',
        'hover:shadow-[8px_8px_0_#000]',
        'active:translate-x-[2px] active:translate-y-[2px]',
        'active:shadow-brutal-active',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
```

**States to Implement**:
- Default, Hover, Active, Disabled, Loading
- Focus-visible with Electric Blue outline

**Testing**:
- [ ] All variants and sizes work
- [ ] Loading state shows spinner
- [ ] Disabled state prevents interaction
- [ ] Focus visible for keyboard users

#### Badge Component

**Spec**: `components/ui/Badge.tsx`

```typescript
interface BadgeProps {
  variant?: 'design' | 'dev' | 'pm' | 'tool' | 'outlined';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({ variant = 'design', size = 'md', children }: BadgeProps) {
  const variants = {
    design: 'bg-electric-blue text-white',
    dev: 'bg-slate-blue text-white',
    pm: 'bg-deep-navy text-white',
    tool: 'bg-teal text-white',
    outlined: 'bg-transparent text-black border-2'
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm'
  };

  return (
    <span className={cn(
      'inline-flex items-center',
      'font-space-grotesk font-bold uppercase tracking-wider',
      'border-2 border-black rounded-brutal-sm',
      'shadow-[4px_4px_0_#000]',
      variants[variant],
      sizes[size]
    )}>
      {children}
    </span>
  );
}
```

**Testing**:
- [ ] All color variants render correctly
- [ ] Sizes appropriate for use cases
- [ ] Used correctly in sections (design/dev/pm/tool categorization)

#### Input/Textarea Components

**Spec**: `components/ui/Input.tsx`

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  darkMode?: boolean;
}

export function Input({ label, error, darkMode = false, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-inter font-medium text-sm">
          {label}
        </label>
      )}
      <input
        className={cn(
          'px-4 py-3 font-inter',
          'border-2 rounded-brutal-sm',
          'transition-all duration-200',
          'focus:outline-none focus:border-magenta',
          'focus:shadow-[0_0_0_3px_rgba(255,27,141,0.2)]',
          darkMode ? 'bg-white/5 border-white/20 text-white' : 'bg-white border-black',
          error && 'border-red-500',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${props.id}-error`} className="text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
}
```

**Validation**:
- [ ] Focus states work (magenta border + glow)
- [ ] Error states display correctly
- [ ] Dark mode variant works
- [ ] Accessible (labels, error announcements)

---

### Task 0.3: Animation Utilities (1-2 hours)

**File**: `lib/animations.ts` + `globals.css`

**Keyframe Animations**:
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes icon-pop {
  0% {
    transform: scale(0) rotate(-180deg);
  }
  60% {
    transform: scale(1.15) rotate(15deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Intersection Observer Utility**:
```typescript
// lib/animations.ts
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}
```

**Testing**:
- [ ] Animations smooth (60fps)
- [ ] Reduced motion preference respected
- [ ] Intersection Observer triggers correctly
- [ ] No animation jank on scroll

---

### Task 0.4: Theme & i18n Setup (2-3 hours)

**Theme Provider**: `providers/ThemeProvider.tsx`

```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) setTheme(stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

**i18n Setup**: Already configured with `next-intl`

**Layout Structure**: `app/[locale]/layout.tsx`

```typescript
import { ThemeProvider } from '@/providers/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-inter">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Validation**:
- [ ] Theme persists across page reloads
- [ ] Dark mode styling works correctly
- [ ] Language switching works (it/en)
- [ ] Translations load properly

---

### Phase 0 Quality Gate

**Validation Checklist**:
- [ ] Tailwind config generates correct design tokens
- [ ] All base components render with brutal styling
- [ ] Theme toggle works (light/dark)
- [ ] i18n switches between Italian/English
- [ ] Animations respect prefers-reduced-motion
- [ ] TypeScript compilation succeeds (no errors)
- [ ] Storybook stories created for all base components
- [ ] Visual regression baseline captured

**Required Deliverables**:
- ✅ Tailwind config with design tokens
- ✅ Card, Button, Badge, Input, Textarea components
- ✅ Animation utilities + Intersection Observer
- ✅ Theme provider + i18n setup
- ✅ Storybook documentation
- ✅ Unit tests for components (>80% coverage)

**Exit Criteria**: All checklist items pass, no blocking issues

---

## Phase 1: Static Sections (6-8 hours)

**Priority**: 🟡 HIGH - Foundation complete, can parallelize

**Parallelization Opportunity**: Hero + Footer can be built simultaneously by 2 developers

### Task 1.1: Hero Section (3-4 hours)

**File**: `components/sections/Hero.tsx`

**Spec Reference**: `files/HERO_SECTION_SPECS.md`

**Key Components**:
1. **Geometric Shapes** (decorative background elements)
2. **Grid Texture** (subtle background pattern)
3. **Hero Badge** (top label: "PM • DESIGNER • DEV")
4. **Title** (4 lines with highlight on line 4)
5. **Subtitle** (with <strong> highlight)
6. **CTA Buttons** (Primary + Secondary)

**Implementation Details**:

```typescript
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-b from-white to-off-white border-b-4 border-black">

      {/* Background decorations */}
      <HeroDecorations />
      <GridTexture />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-magenta border-3 border-black rounded-brutal shadow-[4px_4px_0_#000] animate-fade-in-up">
          <span className="text-base">✨</span>
          <span className="font-space-grotesk font-bold text-sm uppercase tracking-wider text-white">
            PM • DESIGNER • DEV
          </span>
        </div>

        {/* Title */}
        <h1 className="font-space-grotesk font-black text-[clamp(40px,6vw,72px)] leading-tight text-near-black mb-8 animate-fade-in-up animation-delay-200">
          <span className="block">Ho fallito come designer.</span>
          <span className="block">Poi come developer.</span>
          <span className="block">Ora sono un PM che sa</span>
          <span className="block relative inline-block text-electric-blue">
            davvero cosa costruire.
            <span className="absolute left-0 right-0 bottom-1 h-3 bg-yellow border-2 border-black -z-10 -skew-x-2" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-[clamp(18px,2vw,22px)] leading-relaxed text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
          Perché? Perché ho imparato che <strong className="font-bold text-magenta">il prodotto perfetto non esiste.</strong><br />
          Esiste solo quello che risolve problemi reali per persone reali.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap animate-fade-in-up animation-delay-600">
          <Button variant="primary" size="lg">
            Parliamone →
          </Button>
          <Button variant="secondary" size="lg">
            Leggi la storia
          </Button>
        </div>

      </div>
    </section>
  );
}
```

**Geometric Shapes Component**:
```typescript
function HeroDecorations() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Pink circle - top left */}
      <div className="absolute top-[8%] left-[5%] w-20 h-20 bg-magenta border-3 border-black rounded-full shadow-brutal animate-float-gentle" />

      {/* Diamond - middle left */}
      <div className="absolute top-[45%] left-[3%] w-12 h-12 bg-magenta border-3 border-black rotate-45 shadow-brutal animate-float-gentle animation-delay-500" />

      {/* Purple circle - bottom left */}
      <div className="absolute bottom-[12%] left-[8%] w-15 h-15 bg-purple border-3 border-black rounded-full shadow-brutal animate-float-gentle animation-delay-1000" />

      {/* Blue circle - top right */}
      <div className="absolute top-[15%] right-[10%] w-24 h-24 bg-electric-blue border-3 border-black rounded-full shadow-brutal animate-float-gentle animation-delay-1500" />

      {/* Yellow square - bottom right */}
      <div className="absolute bottom-[20%] right-[8%] w-22 h-22 bg-yellow border-3 border-black rounded-brutal shadow-brutal animate-float-gentle animation-delay-2000" />
    </div>
  );
}
```

**Grid Texture Component**:
```typescript
function GridTexture() {
  return (
    <div
      className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    />
  );
}
```

**Responsive Considerations**:
- Mobile (< 768px): Hide some geometric shapes, reduce font sizes
- Tablet (768-1024px): Intermediate sizing
- Desktop (1024px+): Full visual impact

**Validation**:
- [ ] Matches Figma design exactly
- [ ] Geometric shapes positioned correctly
- [ ] Animations smooth and staggered
- [ ] Responsive on all breakpoints
- [ ] Accessibility: h1 hierarchy, keyboard navigation

---

### Task 1.2: Footer Section (3-4 hours)

**File**: `components/sections/Footer.tsx`

**Spec Reference**: `files/FOOTER_SECTION_SPECS.md`

**Key Components**:
1. **Gradient Border** (top colored stripe)
2. **Brand Section** (name, bio, social links)
3. **Navigation Columns** (Quick Links, Resources)
4. **Copyright** (with heartbeat emoji)
5. **Meta Links** (Privacy, Terms, Cookie)

**Implementation**:

```typescript
export function Footer() {
  return (
    <footer className="relative bg-near-black text-white">

      {/* Gradient top border */}
      <div
        className="w-full h-1"
        style={{
          background: 'linear-gradient(90deg, #1E90FF 0%, #FF1B8D 33%, #9333EA 66%, #FFD93D 100%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Main footer grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-15 pb-12 border-b-2 border-white/10 md:grid-cols-2 md:gap-10 sm:grid-cols-1">

          {/* Brand section */}
          <div className="flex flex-col gap-6">
            <div className="font-space-grotesk text-3xl font-bold">
              Mattia <span className="text-electric-blue">Cintura</span>
            </div>

            <p className="font-inter text-base leading-relaxed text-white/75 max-w-md">
              Product Manager con un passato da designer e developer.
              Trasformo fallimenti in feature e idee in prodotti che le
              persone amano usare.
            </p>

            {/* Social links */}
            <div className="flex gap-3 flex-wrap">
              <SocialLink href="#" icon={<LinkedInIcon />} variant="blue" label="LinkedIn" />
              <SocialLink href="#" icon={<TwitterIcon />} variant="magenta" label="Twitter" />
              <SocialLink href="#" icon={<GitHubIcon />} variant="purple" label="GitHub" />
              <SocialLink href="#" icon={<EmailIcon />} variant="yellow" label="Email" />
            </div>
          </div>

          {/* Quick Links */}
          <FooterNav title="Link veloci" links={[
            { href: '#', label: 'Home' },
            { href: '#', label: 'Il mio percorso' },
            { href: '#', label: 'Blog' },
            { href: '#', label: 'Contatti' }
          ]} />

          {/* Resources */}
          <FooterNav title="Risorse" links={[
            { href: '#', label: 'Product Tools' },
            { href: '#', label: 'Design Resources' },
            { href: '#', label: 'Dev Stack' },
            { href: '#', label: 'Newsletter' }
          ]} />

        </div>

        {/* Footer bottom */}
        <div className="flex flex-col gap-4 pt-8">

          <div className="flex justify-between items-center flex-wrap gap-4 sm:flex-col sm:items-start">
            {/* Copyright */}
            <p className="font-inter text-sm text-white/60">
              © 2025 Mattia Cintura. Fatto con{' '}
              <span className="text-magenta inline-block animate-heartbeat">❤️</span>
              {' '}e troppi caffè
            </p>

            {/* Meta links */}
            <div className="flex items-center gap-3 text-sm text-white/60">
              <a href="#" className="hover:text-electric-blue transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-electric-blue transition-colors">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-electric-blue transition-colors">Cookie</a>
            </div>
          </div>

          {/* Credits */}
          <p className="font-jetbrains-mono text-xs text-white/40 text-center mt-4">
            Design neobrutalist • Built with React & Tailwind • Deployed con amore
          </p>

        </div>

      </div>
    </footer>
  );
}
```

**Social Link Component**:
```typescript
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  variant: 'blue' | 'magenta' | 'purple' | 'yellow';
  label: string;
}

function SocialLink({ href, icon, variant, label }: SocialLinkProps) {
  const variants = {
    blue: 'bg-electric-blue text-white',
    magenta: 'bg-magenta text-white',
    purple: 'bg-purple text-white',
    yellow: 'bg-yellow text-black'
  };

  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        'w-12 h-12 flex items-center justify-center',
        'border-3 border-black rounded-brutal',
        'shadow-[4px_4px_0_#000]',
        'transition-all duration-200',
        'hover:translate-x-[-2px] hover:translate-y-[-2px]',
        'hover:shadow-[6px_6px_0_#000]',
        'active:translate-x-[1px] active:translate-y-[1px]',
        'active:shadow-[2px_2px_0_#000]',
        variants[variant]
      )}
    >
      {icon}
    </a>
  );
}
```

**Validation**:
- [ ] Gradient border renders correctly
- [ ] Social links have proper hover states
- [ ] Navigation links functional
- [ ] Heartbeat animation works
- [ ] Responsive layout on mobile
- [ ] Accessibility: semantic HTML, ARIA labels

---

### Phase 1 Quality Gate

**Validation Checklist**:
- [ ] Hero section matches Figma specifications exactly
- [ ] Geometric shapes positioned and animated correctly
- [ ] CTA buttons have proper hover/active states
- [ ] Footer social links functional and accessible
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Accessibility: keyboard navigation, focus indicators
- [ ] Performance: FCP < 2s, smooth animations (60fps)

**Exit Criteria**: Visual regression tests pass, accessibility audit clean

---

## Phase 2: Content Sections (12-16 hours)

**Priority**: 🟡 MEDIUM - Can parallelize Timeline, Blog, What's Up

**Parallelization**: 3 developers can work simultaneously

### Task 2.1: Journey Timeline (5-6 hours)

**File**: `components/sections/Journey.tsx`

**Spec Reference**: `files/JOURNEY_TIMELINE_SPECS.md`

**Key Components**:
1. **Timeline Line** (vertical gradient line)
2. **Timeline Nodes** (circular icons with shadows)
3. **Experience Cards** (alternating left/right layout)
4. **Role Badges** (color-coded: purple/yellow/blue)
5. **Skills Tags** (code-style badges)
6. **Bottom Label** (gradient card)

**Data Structure**:
```typescript
interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  skills: string[];
  icon: string; // emoji
  roleBadgeVariant: 'purple' | 'yellow' | 'blue';
  current?: boolean;
}

const experiences: Experience[] = [
  {
    id: 'selfrules',
    period: '2012-2018',
    role: 'DESIGNER & FOUNDER',
    company: 'Selfrules',
    description: 'Ho fondato un\'agenzia. Ho fallito...',
    achievements: [
      'Fondato e venduto un\'agenzia di design',
      'Gestito team di 5 designer',
      'Portfolio di 50+ progetti'
    ],
    skills: ['UI/UX Design', 'Branding', 'Business Strategy', 'Team Management', 'Adobe Suite'],
    icon: '😊',
    roleBadgeVariant: 'purple'
  },
  // ... more experiences
];
```

**Implementation**:
```typescript
export function JourneySection() {
  return (
    <section className="relative px-6 py-24 bg-white border-b-4 border-black overflow-hidden">

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="purple" className="mb-6">IL MIO PERCORSO</Badge>
          <h2 className="font-space-grotesk font-black text-[clamp(36px,5vw,56px)] leading-tight mb-5">
            Da zero a Product Manager
          </h2>
          <p className="font-inter text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
            La maggior parte dei PM arriva dalla consulenza. Io ho fatto design, sviluppo,
            imprenditoria. <strong className="font-bold text-purple">Questo è il mio superpotere.</strong>
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 sm:left-8"
            style={{
              background: 'linear-gradient(to bottom, #9333EA 0%, #1E90FF 50%, #FFD93D 100%)'
            }}
          />

          {/* Experience items */}
          <div className="space-y-15">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                experience={exp}
                position={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>

        </div>

        {/* Bottom label */}
        <div className="mt-20 text-center">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-electric-blue to-purple border-4 border-black rounded-brutal-lg shadow-brutal hover:shadow-brutal-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <span className="font-space-grotesk font-bold text-lg text-white flex items-center gap-2">
              12 anni di fallimenti trasformati in esperienza 💪
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
```

**Timeline Item Component**:
```typescript
interface TimelineItemProps {
  experience: Experience;
  position: 'left' | 'right';
}

function TimelineItem({ experience, position }: TimelineItemProps) {
  const isLeft = position === 'left';

  return (
    <div className={cn(
      'grid grid-cols-[1fr_auto_1fr] gap-10 items-center',
      'sm:grid-cols-[auto_1fr] sm:gap-5',
      isLeft ? 'grid-areas-[card_node_empty]' : 'grid-areas-[empty_node_card]'
    )}>

      {/* Node */}
      <div className="w-16 h-16 flex items-center justify-center bg-white border-4 border-black rounded-full shadow-[0_0_0_8px_#FEFEFE,6px_6px_0_#000] relative z-20">
        <span className="text-3xl">{experience.icon}</span>
      </div>

      {/* Card */}
      <Card
        variant={experience.current ? 'highlighted' : 'default'}
        className={cn(
          'p-7',
          isLeft ? 'text-right' : 'text-left',
          experience.current && 'border-electric-blue shadow-[8px_8px_0_#1E90FF]'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="px-3 py-1.5 font-jetbrains-mono text-sm bg-white border-2 border-black rounded-brutal-sm">
            {experience.period}
          </span>
          <Badge variant={experience.roleBadgeVariant === 'purple' ? 'purple' : experience.roleBadgeVariant === 'yellow' ? 'yellow' : 'design'} size="sm">
            {experience.role}
          </Badge>
        </div>

        {/* Company */}
        <h3 className="font-space-grotesk font-bold text-3xl mb-4">
          {experience.company}
        </h3>

        {/* Description */}
        <p className="font-inter text-base leading-relaxed text-gray-600 mb-5">
          {experience.description}
        </p>

        {/* Achievements */}
        <ul className="space-y-1 mb-6">
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="font-inter text-sm flex items-start gap-2">
              <span className="text-electric-blue font-bold">→</span>
              {achievement}
            </li>
          ))}
        </ul>

        {/* Skills */}
        <div className="border-t-2 border-gray-200 pt-5">
          <span className="font-jetbrains-mono text-xs font-bold text-gray-500 block mb-3">
            SKILLS:
          </span>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 font-jetbrains-mono text-sm bg-gray-100 border-2 border-gray-300 rounded-brutal-sm hover:border-black hover:bg-white transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </Card>

    </div>
  );
}
```

**Responsive Strategy**:
- Desktop (1024px+): Alternating left/right layout
- Mobile (< 768px): Single column with timeline line on left, all cards on right

**Validation**:
- [ ] Timeline line gradient renders correctly
- [ ] Cards alternate left/right on desktop
- [ ] Current position highlighted (blue border/shadow)
- [ ] Skills tags hover states work
- [ ] Mobile single-column layout correct
- [ ] Scroll animations trigger properly

---

### Task 2.2: Blog Section (4-5 hours)

**File**: `components/sections/Blog.tsx`

**Spec Reference**: `files/BLOG_SECTION_SPECS.md`

**Key Components**:
1. **Featured Article** (full-width gradient card)
2. **Secondary Articles** (2-column grid)
3. **Category Badges**
4. **Reading Time + Date**
5. **CTA Links/Buttons**

**Data Structure**:
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number; // minutes
  publishedAt: string; // ISO date
  featured?: boolean;
}
```

**Implementation** (see comprehensive blog section code in spec)

**MDX Configuration**:
```typescript
// next.config.mjs
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx']
});
```

**Validation**:
- [ ] Featured article gradient background correct
- [ ] Category badges color-coded properly
- [ ] Reading time calculated correctly
- [ ] Grid layout responsive (2 cols → 1 col mobile)
- [ ] Hover states smooth
- [ ] Links to blog posts work

---

### Task 2.3: What's Up Section (3-5 hours)

**File**: `components/sections/WhatsUp.tsx`

**Spec Reference**: `files/WHATS_UP_SECTION_SPECS.md`

**Key Components**:
1. **Icon Cards** (circular colored icons)
2. **Metric Badge** (stats display)
3. **Spotify Widget** (music player)
4. **Three-column grid**

**Implementation** (see spec for complete code)

**Spotify Integration** (placeholder for now, full API in Phase 4):
```typescript
function SpotifyWidget() {
  return (
    <div className="bg-black/5 border-2 border-white/10 rounded-brutal p-5 flex flex-col gap-4">
      <div className="w-full aspect-square rounded-brutal-sm overflow-hidden border-2 border-white/20">
        <img src="/placeholder-album.jpg" alt="Album cover" className="w-full h-full object-cover" />
      </div>

      <div>
        <p className="font-space-grotesk font-bold text-white">Deep Focus Playlist</p>
        <p className="font-inter text-sm text-white/70">Coding & Creating</p>
      </div>

      {/* Audio visualizer bars */}
      <div className="flex items-end justify-center gap-1 h-10">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="w-1 bg-[#1DB954] rounded-sm animate-audio-wave"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
```

**Validation**:
- [ ] Three cards display correctly
- [ ] Icons rotate on hover
- [ ] Metric badge renders properly
- [ ] Spotify placeholder displays
- [ ] Responsive grid (3 cols → 1 col mobile)

---

### Phase 2 Quality Gate

**Validation Checklist**:
- [ ] Timeline alternating layout correct on desktop
- [ ] Blog featured gradient renders properly
- [ ] Skills badges and category badges display correctly
- [ ] Card hover effects smooth (60fps)
- [ ] Grid layouts responsive on all breakpoints
- [ ] MDX content renders correctly (if blog posts exist)
- [ ] No layout shift (CLS < 0.1)

**Exit Criteria**: Content sections match specifications, accessibility tests pass

---

## Phase 3: Interactive Sections (8-12 hours)

**Priority**: 🟠 MEDIUM - Requires backend integration prep

### Task 3.1: Work Together Section (4-6 hours)

**File**: `components/sections/WorkTogether.tsx`

**Spec Reference**: `files/WORK_TOGETHER_SECTION_SPECS.md`

**Key Features**:
- Service cards with large number overlay
- Benefits list with animated checkmarks
- Icon rotation effects
- Gradient CTA card

**Implementation** (see spec for complete code)

**Validation**:
- [ ] Number overlays positioned correctly
- [ ] Benefits checkmarks animate (SVG stroke animation)
- [ ] Icons rotate on card hover
- [ ] CTA gradient card renders
- [ ] Form integration prepared

---

### Task 3.2: Ask Me Anything Section (4-6 hours)

**File**: `components/sections/AskMeAnything.tsx`

**Spec Reference**: `files/ASK_ME_ANYTHING_SECTION_SPECS.md`

**Key Features**:
- Glassmorphic cards on dark background
- Chat button with modal
- Anonymous form with Zod validation
- Glow effects on hover

**Form Validation**:
```typescript
import { z } from 'zod';

const anonymousQuestionSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  question: z.string().min(10, 'Question must be at least 10 characters').max(1000, 'Question too long')
});

type AnonymousQuestionData = z.infer<typeof anonymousQuestionSchema>;
```

**Form Component**:
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function AnonymousQuestionForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AnonymousQuestionData>({
    resolver: zodResolver(anonymousQuestionSchema)
  });

  const onSubmit = async (data: AnonymousQuestionData) => {
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Submission failed');

      // Success feedback
      alert('Domanda inviata! Risponderò entro 48 ore.');
    } catch (error) {
      console.error('Error:', error);
      alert('Errore. Riprova.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('name')}
        placeholder="Nome (opzionale)"
        darkMode
      />

      <Input
        {...register('email')}
        type="email"
        placeholder="Email (opzionale)"
        darkMode
      />

      <div>
        <textarea
          {...register('question')}
          placeholder="La tua domanda *"
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border-2 border-white/20 rounded-brutal-sm text-white focus:border-magenta focus:shadow-[0_0_0_3px_rgba(255,27,141,0.2)] transition-all"
        />
        {errors.question && (
          <span className="text-red-400 text-sm">{errors.question.message}</span>
        )}
      </div>

      <Button
        type="submit"
        variant="yellow"
        className="w-full"
        loading={isSubmitting}
      >
        Invia domanda
      </Button>
    </form>
  );
}
```

**API Endpoint** (Phase 4):
```typescript
// app/api/questions/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = anonymousQuestionSchema.parse(body);

    // Save to database (Prisma/Firestore)
    // await saveQuestion(validated);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
```

**Validation**:
- [ ] Glassmorphic cards render correctly
- [ ] Chat modal opens/closes
- [ ] Form validation works (Zod)
- [ ] Dark background with glow effects
- [ ] Accessibility: form labels, error announcements

---

### Phase 3 Quality Gate

**Validation Checklist**:
- [ ] Forms validate inputs correctly with Zod
- [ ] Service cards animate on interaction
- [ ] Chat modal accessible (focus trap, ESC to close)
- [ ] Form submissions prepare for API integration
- [ ] Error states display correctly
- [ ] Dark section maintains WCAG AA contrast

**Exit Criteria**: E2E tests pass for form interactions

---

## Phase 4: API Integrations (6-10 hours)

**Priority**: 🟠 MEDIUM - Backend functionality

**Parallelization**: 3 backend developers can work simultaneously

### Task 4.1: Spotify Integration (2-3 hours)

**Files**:
- `app/api/spotify/now-playing/route.ts`
- `lib/spotify.ts`

**Implementation**:
```typescript
// lib/spotify.ts
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!
    })
  });

  return response.json();
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const song = await response.json();

  return {
    isPlaying: song.is_playing,
    title: song.item.name,
    artist: song.item.artists.map((artist: any) => artist.name).join(', '),
    albumArt: song.item.album.images[0].url,
    songUrl: song.item.external_urls.spotify
  };
}
```

**API Route**:
```typescript
// app/api/spotify/now-playing/route.ts
import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';

export async function GET() {
  try {
    const nowPlaying = await getNowPlaying();
    return NextResponse.json(nowPlaying);
  } catch (error) {
    return NextResponse.json({ isPlaying: false }, { status: 200 });
  }
}

export const revalidate = 60; // Cache for 60 seconds
```

**Validation**:
- [ ] Token refresh works automatically
- [ ] Now playing data updates correctly
- [ ] Fallback displays when not playing
- [ ] No API errors in console

---

### Task 4.2: Google Calendar Integration (2-3 hours)

**Files**:
- `app/api/calendar/availability/route.ts`
- `app/api/calendar/book/route.ts`
- `lib/calendar.ts`

**OAuth Setup** (already exists with NextAuth):
```typescript
// lib/calendar.ts
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function getAvailableSlots(date: string) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // Query for free/busy information
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: new Date(date).toISOString(),
      timeMax: new Date(date + 'T23:59:59').toISOString(),
      items: [{ id: 'primary' }]
    }
  });

  // Process and return available slots
  return processSlots(response.data);
}

export async function createBooking(data: BookingData) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const event = {
    summary: `Consulenza con ${data.name}`,
    description: data.message,
    start: {
      dateTime: data.startTime,
      timeZone: 'Europe/Rome'
    },
    end: {
      dateTime: data.endTime,
      timeZone: 'Europe/Rome'
    },
    attendees: [{ email: data.email }]
  };

  return calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
    sendUpdates: 'all'
  });
}
```

**Validation**:
- [ ] OAuth flow works correctly
- [ ] Available slots display properly
- [ ] Booking creates calendar event
- [ ] Email notifications sent
- [ ] Timezone handling correct

---

### Task 4.3: Claude AI Chatbot (2-4 hours)

**Files**:
- `app/api/chat/route.ts`
- `lib/claude.ts`
- `components/chat/ChatWidget.tsx`

**Implementation**:
```typescript
// lib/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const SYSTEM_PROMPT = `You are Mattia Cintura's AI assistant. You know:
- He's a Product Manager with background in design and development
- Experience: Selfrules (founder), FLOWING (developer), ActiveProspect (PO), QubicaAMF (PM)
- Skills: Product strategy, user research, stakeholder management, Agile/Scrum
- Philosophy: Products should solve real problems for real people
- Tone: Direct, pragmatic, no marketing fluff

Answer questions about Mattia's background, experience, and approach to product management.`;

export async function chat(message: string, conversationHistory: any[]) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      ...conversationHistory,
      { role: 'user', content: message }
    ]
  });

  return response.content[0].text;
}
```

**API Route**:
```typescript
// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { chat } from '@/lib/claude';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  // Rate limiting
  const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await rateLimit(identifier);

  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const { message, conversationHistory } = await request.json();
    const response = await chat(message, conversationHistory);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 });
  }
}
```

**Chat Widget Component**:
```typescript
'use client';

import { useState } from 'react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages
        })
      });

      const { response: assistantResponse } = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-electric-blue text-white rounded-full border-3 border-black shadow-brutal hover:shadow-brutal-hover transition-all flex items-center justify-center"
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-96 h-[500px] bg-white border-4 border-black rounded-brutal-lg shadow-brutal flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-4 border-black bg-electric-blue">
            <span className="font-space-grotesk font-bold text-white">
              Chat con Mattia AI
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-black transition-colors"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  'p-3 rounded-brutal-sm',
                  msg.role === 'user'
                    ? 'bg-electric-blue text-white ml-auto max-w-[80%]'
                    : 'bg-gray-100 text-black mr-auto max-w-[80%]'
                )}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-100 text-black p-3 rounded-brutal-sm animate-pulse">
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t-4 border-black">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border-2 border-black rounded-brutal-sm focus:outline-none focus:border-electric-blue"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-electric-blue text-white border-2 border-black rounded-brutal-sm hover:shadow-brutal transition-all disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

**Validation**:
- [ ] Chat widget opens/closes
- [ ] Messages send and receive correctly
- [ ] Rate limiting works
- [ ] Conversation context maintained
- [ ] Error handling graceful

---

### Phase 4 Quality Gate

**Validation Checklist**:
- [ ] Spotify widget updates in real-time
- [ ] Calendar booking flow works end-to-end
- [ ] Chatbot responds appropriately with context
- [ ] API error handling works (graceful degradation)
- [ ] Rate limiting prevents abuse
- [ ] All APIs have proper error boundaries

**Exit Criteria**: API integration tests pass, manual testing successful

---

## Phase 5: Quality Assurance (8-12 hours)

**Priority**: 🔴 CRITICAL - Final validation before launch

### Task 5.1: Accessibility Audit (3-4 hours)

**Tools**:
- axe DevTools browser extension
- Pa11y automated testing
- NVDA/JAWS screen readers
- Keyboard navigation manual testing

**Automated Testing**:
```bash
# Install Pa11y
npm install -D pa11y pa11y-ci

# pa11y-ci.json
{
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/blog",
    "http://localhost:3000/blog/article-slug"
  ],
  "standard": "WCAG2AA",
  "chromeLaunchConfig": {
    "args": ["--no-sandbox"]
  }
}

# Run tests
npm run test:a11y
```

**Manual Testing Checklist**:
- [ ] Keyboard navigation (Tab order logical)
- [ ] Focus indicators visible (4px Electric Blue)
- [ ] Screen reader announces all content properly
- [ ] Color contrast ≥ 4.5:1 (body), ≥ 3:1 (large text)
- [ ] Touch targets ≥ 48×48px on mobile
- [ ] Forms have associated labels
- [ ] ARIA labels on icon-only buttons
- [ ] Skip links work ("Skip to main content")
- [ ] No focus traps (except modals)
- [ ] Reduced motion respected

**Remediation**:
- Fix all critical and serious issues
- Document minor issues for future sprints
- Re-test after fixes

---

### Task 5.2: Performance Optimization (2-3 hours)

**Lighthouse CI Setup**:
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

**Performance Budget**:
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

**Optimization Tasks**:
- [ ] Convert images to WebP
- [ ] Implement lazy loading
- [ ] Code splitting verified
- [ ] Font loading optimized
- [ ] Unused CSS purged
- [ ] Bundle size analyzed
- [ ] Caching headers set

**Validation**:
- [ ] Lighthouse score > 90 all categories
- [ ] FCP < 2s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TTI < 3s

---

### Task 5.3: Responsive Testing (2-3 hours)

**Devices to Test**:
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- iPad (768px)
- iPad Pro (1024px)
- Desktop (1440px)
- Large Desktop (1920px)

**Browsers**:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest version)

**Testing Checklist**:
- [ ] All sections render correctly at each breakpoint
- [ ] Navigation works on mobile
- [ ] Forms usable on touch devices
- [ ] Images maintain aspect ratio
- [ ] Text readable at all sizes
- [ ] No horizontal scroll
- [ ] Touch targets adequate (48×48px minimum)

**Tools**:
- BrowserStack for cross-browser testing
- Real device testing when possible
- Chrome DevTools device emulation

---

### Task 5.4: E2E Testing (1-2 hours)

**Playwright Tests**:
```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display all main sections', async ({ page }) => {
    await page.goto('/');

    // Hero section
    await expect(page.locator('h1')).toContainText('Ho fallito come designer');

    // Journey section
    await expect(page.getByText('Il mio percorso')).toBeVisible();

    // Blog section
    await expect(page.getByText('Dal blog')).toBeVisible();

    // Work Together section
    await expect(page.getByText('Come possiamo lavorare insieme')).toBeVisible();

    // Ask Me Anything section
    await expect(page.getByText('Hai domande? Chiedi pure')).toBeVisible();

    // Footer
    await expect(page.getByText('Mattia Cintura')).toBeVisible();
  });

  test('should navigate to blog post', async ({ page }) => {
    await page.goto('/');

    // Click on first blog article
    await page.click('text=Leggi articolo');

    // Should navigate to blog post page
    await expect(page).toHaveURL(/\/blog\/.+/);
  });

  test('should submit anonymous question', async ({ page }) => {
    await page.goto('/');

    // Scroll to Ask Me Anything section
    await page.locator('text=Hai domande? Chiedi pure').scrollIntoViewIfNeeded();

    // Fill form
    await page.fill('textarea[placeholder*="domanda"]', 'Test question from E2E test');

    // Submit
    await page.click('button[type="submit"]');

    // Check success message
    await expect(page.locator('text=Inviato')).toBeVisible({ timeout: 5000 });
  });
});
```

**Critical Paths**:
- [ ] Homepage loads successfully
- [ ] Navigation works
- [ ] Blog post opens
- [ ] Form submission works
- [ ] Chat widget opens
- [ ] Calendar booking initiates
- [ ] Theme toggle works
- [ ] Language switch works

---

### Phase 5 Quality Gate (FINAL)

**Validation Checklist**:
- [ ] Lighthouse score: Performance >90, Accessibility 100, Best Practices >90, SEO >90
- [ ] Core Web Vitals: All green (FCP, LCP, CLS, FID)
- [ ] WCAG AA compliance: All critical issues resolved
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge work correctly
- [ ] Mobile responsive: All breakpoints tested on real devices
- [ ] No console errors in production build
- [ ] E2E tests: All critical paths pass
- [ ] Visual regression: No unexpected changes
- [ ] API integrations: All working in production environment
- [ ] Performance budget: Within limits

**Exit Criteria**:
- ✅ All checklist items pass
- ✅ Stakeholder approval received
- ✅ Ready for production deployment

---

## Deployment Strategy

### Pre-Deployment Checklist
- [ ] Environment variables configured (Vercel)
- [ ] Database migrations run (production)
- [ ] API keys verified (Spotify, Google, Anthropic)
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] Analytics tracking configured
- [ ] Error monitoring setup (Sentry)

### Deployment Steps
1. **Staging Deployment**:
   ```bash
   git push origin main
   # Vercel auto-deploys to staging
   ```

2. **Staging Validation**:
   - Run full E2E test suite
   - Manual smoke testing
   - API integrations check
   - Performance audit

3. **Production Deployment**:
   ```bash
   # Promote staging to production in Vercel dashboard
   ```

4. **Post-Deployment Monitoring**:
   - Check error rates (Sentry)
   - Monitor Core Web Vitals (Vercel Analytics)
   - Verify API endpoints responding
   - Test critical user journeys

### Rollback Plan
```bash
# If issues detected, rollback to previous deployment
vercel rollback <deployment-url>
```

---

## Risk Mitigation Summary

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Design system inconsistency | High | Medium | Storybook documentation, visual regression tests |
| Performance degradation | High | Medium | Lazy loading, code splitting, performance budgets |
| Accessibility failures | Critical | Low | Automated testing (axe, Pa11y), manual audits |
| API integration issues | Medium | Medium-High | Graceful fallbacks, error boundaries, health monitoring |
| Responsive layout breakage | Medium | Medium | Mobile-first development, BrowserStack testing |

---

## Success Metrics

**Technical Metrics**:
- ✅ Lighthouse: >90 all categories
- ✅ Core Web Vitals: All green
- ✅ Accessibility: WCAG AA compliant
- ✅ Test Coverage: >80% unit, 100% E2E critical paths
- ✅ Build Time: <5 minutes
- ✅ Bundle Size: <250KB (initial load)

**Quality Metrics**:
- ✅ Zero critical bugs in production
- ✅ Zero accessibility violations
- ✅ 100% specification compliance
- ✅ Cross-browser compatibility verified
- ✅ Mobile responsive on all devices

**Performance Metrics**:
- ✅ FCP: <2s
- ✅ LCP: <2.5s
- ✅ CLS: <0.1
- ✅ FID: <100ms
- ✅ TTI: <3s

---

## Timeline Summary

**With Parallel Execution (Recommended)**:
- Phase 0: 8-12 hours (Sequential)
- Phase 1: 6-8 hours (2 devs parallel)
- Phase 2: 12-16 hours (3 devs parallel)
- Phase 3: 8-12 hours (Sequential)
- Phase 4: 6-10 hours (3 devs parallel)
- Phase 5: 8-12 hours (Sequential)

**Total: ~48-70 hours** (2-3 weeks with 2-3 person team)

**Serial Execution**:
- Total: ~70 hours (3-4 weeks single developer)

---

## Next Steps

1. **Review this workflow** with stakeholders and development team
2. **Set up development environment** (Phase 0 prerequisites)
3. **Create project board** with tasks from this workflow
4. **Assign team members** to parallelizable tasks
5. **Begin Phase 0** foundation implementation
6. **Schedule quality gate reviews** at end of each phase

---

## Appendix: File Structure

```
mattia_web/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Homepage with all sections
│   │   ├── blog/
│   │   │   ├── page.tsx           # Blog list
│   │   │   └── [slug]/page.tsx    # Blog post detail
│   │   └── design-system/page.tsx # Component showcase
│   └── api/
│       ├── questions/route.ts     # Anonymous questions
│       ├── chat/route.ts          # Claude chatbot
│       ├── spotify/
│       │   └── now-playing/route.ts
│       └── calendar/
│           ├── availability/route.ts
│           └── book/route.ts
├── components/
│   ├── ui/                        # Base components
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   └── Input.tsx
│   ├── sections/                  # Page sections
│   │   ├── Hero.tsx
│   │   ├── Journey.tsx
│   │   ├── WhatsUp.tsx
│   │   ├── Blog.tsx
│   │   ├── WorkTogether.tsx
│   │   ├── AskMeAnything.tsx
│   │   └── Footer.tsx
│   └── chat/
│       └── ChatWidget.tsx
├── lib/
│   ├── animations.ts
│   ├── spotify.ts
│   ├── calendar.ts
│   ├── claude.ts
│   └── rate-limit.ts
├── content/
│   └── blog/                      # MDX blog posts
├── providers/
│   └── ThemeProvider.tsx
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

**Document Version**: 1.0
**Last Updated**: 2025-11-08
**Maintained By**: System Architect Agent
**Next Review**: After Phase 0 completion
