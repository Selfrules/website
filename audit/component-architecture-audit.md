# Component Architecture Audit

**Audit Date:** 2026-01-26
**Auditor:** Claude Code (Front-End Developer Audit)
**Project:** selfrules.org (Mattia's Personal Website)
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion

---

## Executive Summary

This audit reveals **significant architectural inconsistencies** in the component library that impact maintainability, developer experience, and code quality. The most critical finding is a **dual component system** where both base components (Button, Card, Badge) and "Neo" prefixed variants (NeoButton, NeoCard, NeoBadge) coexist without clear guidance on usage.

### Overall Assessment

| Category | Score | Status |
|----------|-------|--------|
| Component Reusability | 5/10 | 🟡 Needs Improvement |
| API Consistency | 4/10 | 🔴 Critical |
| Export Organization | 3/10 | 🔴 Critical |
| Design System Alignment | 6/10 | 🟡 Needs Improvement |
| Composition Patterns | 6/10 | 🟡 Needs Improvement |
| Prop Drilling | 7/10 | 🟢 Acceptable |
| Code Duplication | 3/10 | 🔴 Critical |

---

## Table of Contents

1. [Component Inventory](#1-component-inventory)
2. [Critical Issues](#2-critical-issues)
3. [Duplicate Component Analysis](#3-duplicate-component-analysis)
4. [Component Pattern Inconsistencies](#4-component-pattern-inconsistencies)
5. [Export Organization Issues](#5-export-organization-issues)
6. [Composition Patterns Analysis](#6-composition-patterns-analysis)
7. [Accessibility in Components](#7-accessibility-in-components)
8. [Recommendations](#8-recommendations)
9. [Refactoring Priority Matrix](#9-refactoring-priority-matrix)

---

## 1. Component Inventory

### Directory Structure

```
components/
├── analytics/        (1 component)
├── animations/       (1 component)
├── charts/           (1 component)
├── chat/             (5 components)
├── design-system/    (8 components)
├── forms/            (1 component)
├── illustrations/    (3 components)
├── integrations/     (3 components + tests)
├── layout/           (1 component)
├── patterns/         (2 components)
├── providers/        (2 components)
├── sections/         (7 components)
└── ui/               (28 components + tests)
```

**Total Components:** 63 (excluding tests)

### UI Components Classification

| Category | Components | Count |
|----------|-----------|-------|
| **Base UI** | Button, Card, Badge, Input, Textarea, Section | 6 |
| **Neo Variants** | NeoButton, NeoCard, NeoBadge, NeoInput, NeoSection, NeoContainer, NeoHeading, NeoText | 8 |
| **Specialized** | CertificationBadge, CertificationModal, Testimonial, TestimonialModal, ExperienceCard, CollaborationCard, ActivityCard | 7 |
| **Layout** | Header, BentoGrid, Marquee, Timeline | 4 |
| **Interactive** | AnimatedButton, CTAButton, GoogleCalendarPopup | 3 |

---

## 2. Critical Issues

### Issue #1: Dual Component System (CRITICAL)

**Severity:** 🔴 Critical
**Impact:** High - Causes confusion, increases bundle size, creates maintenance burden

The codebase maintains two parallel component systems:

| Base Component | Neo Variant | Both Used? |
|---------------|-------------|------------|
| Button | NeoButton | Yes - different files |
| Card | NeoCard | Yes - different files |
| Badge | NeoBadge | Yes - different files |
| Input | NeoInput | Yes - same features |
| Section | NeoSection | Yes - different features |
| - | NeoContainer | Unique |
| - | NeoHeading | Unique |
| - | NeoText | Unique |

**Evidence:**
- `components/sections/Hero.tsx` imports `NeoButton`, `NeoBadge`
- `components/design-system/ComponentShowcase.tsx` imports `Button`, `Badge`, `Card`
- `components/ui/index.ts` exports only base components, not Neo variants

**Impact:**
- 50% code duplication in UI component logic
- Inconsistent usage across codebase
- New developers unsure which to use
- Documentation references base, implementation uses Neo

### Issue #2: Missing Index Exports (CRITICAL)

**Severity:** 🔴 Critical
**Impact:** Medium - Inconsistent import patterns

`components/ui/index.ts` only exports:
```typescript
// Base UI Components
export { Button } from './Button';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
export { Input } from './Input';
export { Textarea } from './Textarea';
export { Badge } from './Badge';
export { Section, SectionHeader, SectionTitle, SectionDescription } from './Section';
export { AnimatedButton } from './AnimatedButton';
```

**Missing from exports:**
- All Neo* components (NeoButton, NeoCard, NeoBadge, NeoInput, NeoSection, etc.)
- CertificationBadge, CertificationModal
- TestimonialModal, Testimonial
- ExperienceCard, CollaborationCard, ActivityCard
- GoogleCalendarPopup
- BentoGrid, Marquee, Timeline
- Header, CTAButton

### Issue #3: Inconsistent Component Patterns (HIGH)

**Severity:** 🟠 High
**Impact:** Medium - Reduced code predictability

| Pattern | Button | NeoButton | Status |
|---------|--------|-----------|--------|
| forwardRef | ✅ Yes | ❌ No | Inconsistent |
| displayName | ✅ Yes | ❌ No | Inconsistent |
| TypeScript Interface | External | Inline | Inconsistent |
| Border class | `border-brutal` | `border-3 border-[#000]` | Inconsistent |
| Size prop values | sm/md/lg/xl | sm/md/lg | Inconsistent |

---

## 3. Duplicate Component Analysis

### Button vs NeoButton

**File:** `components/ui/Button.tsx` (69 lines)
**File:** `components/ui/NeoButton.tsx` (86 lines)

| Feature | Button | NeoButton |
|---------|--------|-----------|
| forwardRef | ✅ | ❌ |
| displayName | ✅ | ❌ |
| JSDoc | ❌ | ✅ |
| Size variants | sm, md, lg, xl | sm, md, lg |
| Variant variants | primary, secondary, accent, outline, ghost | Same |
| fullWidth prop | ❌ | ✅ |
| Hover animation | translate-x-[-4px] | translate-y-[-1px] |
| Border style | border-brutal | border-3 border-[#000] |

**Usage Pattern:**
```typescript
// Hero.tsx uses NeoButton
import { NeoButton } from '@/components/ui/NeoButton';

// ComponentShowcase.tsx uses Button
import { Button } from '@/components/ui/Button';
```

### Badge vs NeoBadge

**File:** `components/ui/Badge.tsx` (68 lines)
**File:** `components/ui/NeoBadge.tsx` (71 lines)

| Feature | Badge | NeoBadge |
|---------|-------|----------|
| forwardRef | ✅ | ❌ |
| displayName | ✅ | ❌ |
| Semantic variants | design, dev, pm, tool, featured | Same + color variants |
| Color variants | ❌ | blue, pink, yellow, purple, neutral, teal, lime |
| Legacy color prop | ❌ | ✅ |
| onClick support | ❌ | ✅ |
| CSS approach | Uses globals.css classes (badge-*) | Inline Tailwind |

**Key Difference:** Badge uses external CSS classes (`badge-design`, `badge-dev`), NeoBadge uses inline Tailwind utilities.

### Card vs NeoCard

**File:** `components/ui/Card.tsx` (106 lines)
**File:** `components/ui/NeoCard.tsx` (61 lines)

| Feature | Card | NeoCard |
|---------|------|---------|
| Sub-components | CardHeader, CardTitle, CardDescription, CardContent, CardFooter | ❌ None |
| forwardRef | ✅ | ❌ |
| hoverable prop | ✅ | ❌ (uses "elevated" variant) |
| clickable prop | ✅ | ❌ |
| Color shadows | ❌ | ✅ (shadow-brutal-blue, etc.) |
| noPadding prop | ❌ | ✅ |

### Input vs NeoInput

**File:** `components/ui/Input.tsx` (85 lines)
**File:** `components/ui/NeoInput.tsx` (77 lines)

| Feature | Input | NeoInput |
|---------|-------|----------|
| forwardRef | ✅ | ✅ |
| displayName | ✅ | ✅ |
| icon prop | ❌ | ✅ |
| fullWidth prop | ❌ | ✅ |
| ID generation | Random | Label-based |

---

## 4. Component Pattern Inconsistencies

### 4.1 Ref Forwarding Pattern

**Correct Pattern (Base Components):**
```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, children, ...props }, ref) => {
    // ...
  }
);
Button.displayName = 'Button';
```

**Incorrect Pattern (Neo Components):**
```typescript
export function NeoButton({
  children,
  variant = 'primary',
  // ... no ref support
}: NeoButtonProps) {
  // ...
}
```

**Files Affected:**
- `NeoButton.tsx` - Missing forwardRef
- `NeoBadge.tsx` - Missing forwardRef
- `NeoCard.tsx` - Missing forwardRef
- `NeoSection.tsx` - Missing forwardRef

### 4.2 Border Style Inconsistency

**Pattern A (Design Tokens):**
```typescript
// Uses Tailwind config custom utilities
className="border-brutal border-brutalist-border rounded-brutal"
```

**Pattern B (Hardcoded):**
```typescript
// Uses hardcoded values
className="border-3 border-[#000] rounded-lg"
```

| Component | Pattern Used |
|-----------|-------------|
| Button | A (border-brutal) |
| NeoButton | B (border-3) |
| Card | A (border-brutal) |
| NeoCard | B (border-4) |
| Input | A (border-brutal) |
| NeoInput | B (border-3) |

### 4.3 Hover Animation Inconsistency

**Pattern A (XY Translation):**
```typescript
'hover:translate-x-[-4px] hover:translate-y-[-4px]'
```

**Pattern B (Y-Only Translation):**
```typescript
'hover:-translate-y-1'
```

| Component | Hover Pattern |
|-----------|--------------|
| Button | XY (-4px, -4px) |
| NeoButton | Y-only (-1) |
| Card (hoverable) | XY (-4px, -4px) |
| NeoCard (elevated) | Y-only (-2) |

---

## 5. Export Organization Issues

### Current State

**`components/ui/index.ts`:**
- Exports 7 base components
- Exports 7 type definitions
- Does NOT export any Neo* components
- Does NOT export specialized components

### Import Pattern Analysis

| Import Style | Usage Count | Files |
|--------------|-------------|-------|
| Direct Neo import | 12 | Hero, Journey, WhatImUpTo, WorkTogether, AskMeAnything, DesignSystemSections, etc. |
| Index import (base) | 5 | ComponentShowcase, DesignTokens |
| Mixed imports | 3 | Various |

### Recommended Export Structure

```typescript
// components/ui/index.ts (proposed)

// Core Components (with Neo aliases for backward compatibility)
export { Button, type ButtonProps } from './Button';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type CardProps } from './Card';
export { Badge, type BadgeProps, type BadgeVariant } from './Badge';
export { Input, type InputProps } from './Input';
export { Textarea, type TextareaProps } from './Textarea';

// Section Components
export { Section, SectionHeader, SectionTitle, SectionDescription, type SectionProps } from './Section';

// Animated Components
export { AnimatedButton, type AnimatedButtonProps } from './AnimatedButton';

// Specialized Components
export { CertificationBadge, type CertificationData } from './CertificationBadge';
export { default as CertificationModal } from './CertificationModal';
export { Testimonial, type TestimonialData } from './Testimonial';
export { default as TestimonialModal } from './TestimonialModal';
export { ExperienceCard } from './ExperienceCard';
export { CollaborationCard } from './CollaborationCard';
export { ActivityCard } from './ActivityCard';

// Layout Components
export { Header } from './Header';
export { BentoGrid } from './BentoGrid';
export { Marquee } from './Marquee';
export { Timeline } from './Timeline';

// Interactive Components
export { CTAButton } from './CTAButton';
export { GoogleCalendarPopup, useGoogleCalendar } from './GoogleCalendarPopup';
```

---

## 6. Composition Patterns Analysis

### 6.1 Section Components

Section components (Hero, Journey, etc.) follow a reasonable composition pattern but have issues:

**Hero.tsx (110 lines):**
- ✅ Uses hook for calendar state (`useGoogleCalendar`)
- ✅ Uses analytics hook
- ✅ Uses i18n properly
- 🟡 Inline decorative element styles (could be extracted)

**Journey.tsx (329 lines):**
- ❌ Too long - should be split
- ❌ Contains local `renderMarkdown` function (should be extracted to utility)
- ❌ Hardcoded milestone data structure
- 🟡 Repeated color mapping objects (4 occurrences)

**Pattern to Extract:**

```typescript
// lib/utils/markdown.ts (proposed)
export function renderMarkdown(text: string): React.ReactNode {
  // Current implementation from Journey.tsx
}
```

### 6.2 Props Drilling Analysis

**Props drilling is minimal** - good use of:
- Context (via `useTranslations`)
- Custom hooks (`useAnalytics`, `useGoogleCalendar`)
- Local state management

**Example of Good Pattern:**
```typescript
// Hero.tsx
const { isOpen, openCalendar, closeCalendar } = useGoogleCalendar();
const analytics = useAnalytics();
```

### 6.3 Inline Styles vs Component Reuse

**AnonymousQuestionForm.tsx** (153 lines):
- ❌ Does NOT use design system Button component
- ❌ Has inline button styles that duplicate NeoButton
- ❌ Does NOT use Textarea component

```typescript
// Current (bad)
<button
  className="w-full px-6 py-3 md:py-4 bg-neon-pink text-white border-brutal border-black rounded-brutal shadow-brutal..."
>

// Should use
<NeoButton variant="accent" fullWidth>
```

**ChatInterface.tsx** (252 lines):
- ❌ Inline input styles instead of using Input/NeoInput
- ❌ Inline button styles instead of using Button/NeoButton

---

## 7. Accessibility in Components

### 7.1 Form Components

| Component | Label Support | Error ARIA | Helper Text ARIA |
|-----------|--------------|------------|------------------|
| Input | ✅ | ✅ aria-invalid, aria-describedby | ✅ |
| NeoInput | ✅ | ✅ aria-invalid, aria-describedby | ✅ |
| Textarea | ✅ | ✅ | ✅ |
| AnonymousQuestionForm | ❌ Missing label | Partial | ❌ |

### 7.2 Modal Components

| Component | Focus Trap | aria-modal | aria-labelledby | Escape Key |
|-----------|-----------|------------|-----------------|------------|
| CertificationModal | ❌ Missing | ❌ Missing | ❌ Missing | ✅ via onClick |
| TestimonialModal | ❌ Missing | ❌ Missing | ❌ Missing | ✅ via onClick |
| GoogleCalendarPopup | ✅ | ❌ Missing | ❌ Missing | ✅ |

### 7.3 Button Components

| Component | Disabled ARIA | Focus Visible | Loading State |
|-----------|--------------|---------------|---------------|
| Button | ✅ pointer-events-none | ✅ ring-4 | ❌ No loading |
| NeoButton | ❌ Missing pointer-events | ✅ ring-4 | ❌ No loading |
| AnimatedButton | ✅ | ✅ | ❌ No loading |
| CTAButton | ❌ No disabled state | ✅ | ❌ No loading |

---

## 8. Recommendations

### 8.1 Immediate Actions (Week 1)

#### R1: Consolidate Component System
**Priority:** P0 (Critical)
**Effort:** 3-5 days
**Impact:** High

1. **Choose ONE component set** - recommend keeping base components and merging Neo features into them
2. Add missing features to base components:
   - `fullWidth` prop to Button and Input
   - `icon` prop to Input
   - Color shadow variants to Card
3. Deprecate Neo* components with console warnings
4. Update all imports to use base components

#### R2: Fix Index Exports
**Priority:** P0 (Critical)
**Effort:** 1 day
**Impact:** High

Update `components/ui/index.ts` to export all components consistently.

### 8.2 Short-term Actions (Week 2-3)

#### R3: Standardize Component Patterns
**Priority:** P1 (High)
**Effort:** 2-3 days
**Impact:** Medium

1. Add `forwardRef` to all components
2. Add `displayName` to all components
3. Standardize border/shadow utilities (use design tokens)
4. Standardize hover animations (pick one pattern)

#### R4: Extract Utility Functions
**Priority:** P1 (High)
**Effort:** 1 day
**Impact:** Medium

1. Move `renderMarkdown` from Journey.tsx to `lib/utils/markdown.ts`
2. Create color mapping utilities for repeated objects

#### R5: Update Form Components
**Priority:** P1 (High)
**Effort:** 1-2 days
**Impact:** High (Accessibility)

1. Update `AnonymousQuestionForm` to use design system components
2. Update `ChatInterface` to use design system components
3. Add proper labels to all form fields

### 8.3 Medium-term Actions (Week 4-6)

#### R6: Add Accessibility Features to Modals
**Priority:** P1 (High)
**Effort:** 2-3 days
**Impact:** High (Accessibility)

1. Add focus trap to CertificationModal
2. Add focus trap to TestimonialModal
3. Add proper ARIA attributes (role="dialog", aria-modal="true", aria-labelledby)

#### R7: Add Loading States
**Priority:** P2 (Medium)
**Effort:** 2 days
**Impact:** Medium (UX)

1. Add loading prop to Button with spinner
2. Add loading prop to NeoButton
3. Standardize loading indicators

#### R8: Split Large Components
**Priority:** P2 (Medium)
**Effort:** 1-2 days
**Impact:** Medium

Split Journey.tsx (329 lines) into:
- JourneySection.tsx (container)
- MilestoneCard.tsx (individual milestone)
- milestoneData.ts (data)

---

## 9. Refactoring Priority Matrix

| Issue | Severity | Effort | Priority | Timeline |
|-------|----------|--------|----------|----------|
| Consolidate dual component system | 🔴 Critical | High | P0 | Week 1 |
| Fix index exports | 🔴 Critical | Low | P0 | Week 1 |
| Standardize forwardRef pattern | 🟠 High | Medium | P1 | Week 2 |
| Extract utility functions | 🟠 High | Low | P1 | Week 2 |
| Update forms to use design system | 🟠 High | Medium | P1 | Week 2-3 |
| Add modal focus traps | 🟠 High | Medium | P1 | Week 3 |
| Standardize border/shadow utilities | 🟡 Medium | Medium | P2 | Week 4 |
| Add loading states | 🟡 Medium | Medium | P2 | Week 4 |
| Split large components | 🟡 Medium | Low | P2 | Week 4 |
| Standardize hover animations | 🟢 Low | Low | P3 | Week 5+ |

---

## Appendix A: Component Usage Map

### Neo Components Usage

| Component | Files Using |
|-----------|-------------|
| NeoButton | Hero.tsx, WorkTogether.tsx, AskMeAnything.tsx, DesignSystemSections.tsx, DesignSystemAdditional.tsx |
| NeoBadge | Hero.tsx, Journey.tsx, WhatImUpTo.tsx, WorkTogether.tsx, AskMeAnything.tsx, design-system/page.tsx, DesignSystemSections.tsx, DesignSystemAdditional.tsx |
| NeoCard | DesignSystemSections.tsx, DesignSystemAdditional.tsx |
| NeoInput | Not used in production code |
| NeoSection | Not used in production code |

### Base Components Usage

| Component | Files Using |
|-----------|-------------|
| Button | ComponentShowcase.tsx |
| Card | ComponentShowcase.tsx, DesignTokens.tsx |
| Badge | ComponentShowcase.tsx, DesignTokens.tsx |
| Input | Not used directly |
| Textarea | Not used directly |

---

## Appendix B: Recommended Unified Component API

### Button (Unified)

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}
```

### Badge (Unified)

```typescript
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  // Semantic variants (project type)
  variant?: 'default' | 'design' | 'dev' | 'pm' | 'tool' | 'featured';
  // Color override
  color?: 'blue' | 'pink' | 'yellow' | 'purple' | 'teal' | 'lime' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
}
```

### Card (Unified)

```typescript
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'elevated';
  shadowColor?: 'blue' | 'pink' | 'yellow' | 'purple' | 'teal' | 'lime';
  hoverable?: boolean;
  clickable?: boolean;
  noPadding?: boolean;
}
```

---

## Appendix C: Files Requiring Changes

### High Priority (P0-P1)

1. `components/ui/index.ts` - Add all exports
2. `components/ui/Button.tsx` - Add fullWidth, loading
3. `components/ui/NeoButton.tsx` - Deprecate or merge
4. `components/ui/Badge.tsx` - Add color variants
5. `components/ui/NeoBadge.tsx` - Deprecate or merge
6. `components/ui/Card.tsx` - Add shadow colors
7. `components/ui/NeoCard.tsx` - Deprecate or merge
8. `components/forms/AnonymousQuestionForm.tsx` - Use design system
9. `components/chat/ChatInterface.tsx` - Use design system
10. `components/ui/CertificationModal.tsx` - Add focus trap
11. `components/ui/TestimonialModal.tsx` - Add focus trap

### Medium Priority (P2)

12. `components/sections/Hero.tsx` - Update imports
13. `components/sections/Journey.tsx` - Split, extract utilities
14. `components/sections/WorkTogether.tsx` - Update imports
15. `components/sections/AskMeAnything.tsx` - Update imports
16. `components/sections/WhatImUpTo.tsx` - Update imports

---

**Report Generated:** 2026-01-26
**Total Issues Identified:** 24
**Critical Issues:** 3
**Estimated Refactoring Effort:** 15-20 developer days
