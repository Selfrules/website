# Component Index

Quick reference for all design system components with import statements and usage examples.

---

## Base Components

### Button

**Import**:
```tsx
import { Button } from '@/components/ui';
```

**Props**:
```typescript
variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
size?: 'sm' | 'md' | 'lg' | 'xl'
disabled?: boolean
```

**Usage**:
```tsx
<Button variant="primary" size="lg">
  Click me
</Button>
```

---

### Card

**Import**:
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui';
```

**Props**:
```typescript
variant?: 'default' | 'primary' | 'secondary' | 'accent'
hoverable?: boolean
clickable?: boolean
```

**Usage**:
```tsx
<Card hoverable>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

---

### Input

**Import**:
```tsx
import { Input } from '@/components/ui';
```

**Props**:
```typescript
label?: string
error?: string
helperText?: string
type?: string
disabled?: boolean
required?: boolean
```

**Usage**:
```tsx
<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  helperText="We'll never share your email"
  error="This field is required"
  required
/>
```

---

### Badge

**Import**:
```tsx
import { Badge } from '@/components/ui';
```

**Props**:
```typescript
variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline'
size?: 'sm' | 'md' | 'lg'
```

**Usage**:
```tsx
<Badge variant="primary" size="md">
  New
</Badge>
```

---

### Section

**Import**:
```tsx
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription
} from '@/components/ui';
```

**Props**:
```typescript
variant?: 'default' | 'primary' | 'secondary' | 'accent'
spacing?: 'sm' | 'md' | 'lg'
contained?: boolean
```

**Usage**:
```tsx
<Section spacing="lg" variant="default">
  <SectionHeader>
    <SectionTitle>Section title</SectionTitle>
    <SectionDescription>
      Section description
    </SectionDescription>
  </SectionHeader>

  {/* Your content */}
</Section>
```

---

### ThemeToggle

**Import**:
```tsx
import { ThemeToggle } from '@/components/ui';
```

**Props**:
```typescript
className?: string
```

**Usage**:
```tsx
<ThemeToggle />
```

---

## Animated Components

### AnimatedButton

**Import**:
```tsx
import { AnimatedButton } from '@/components/ui';
```

**Props**:
```typescript
variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
size?: 'sm' | 'md' | 'lg' | 'xl'
disabled?: boolean
```

**Usage**:
```tsx
<AnimatedButton variant="primary" size="lg">
  Hover me
</AnimatedButton>
```

---

### AnimatedCard

**Import**:
```tsx
import { AnimatedCard } from '@/components/ui';
```

**Props**:
```typescript
variant?: 'default' | 'primary' | 'secondary' | 'accent'
hoverable?: boolean
```

**Usage**:
```tsx
<AnimatedCard hoverable>
  <div className="p-6">
    Content with hover animation
  </div>
</AnimatedCard>
```

---

## Utilities

### Theme Hook

**Import**:
```tsx
import { useTheme } from '@/lib/theme-store';
```

**Usage**:
```tsx
'use client';

export function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current: {theme}
    </button>
  );
}
```

---

### Class Name Utility

**Import**:
```tsx
import { cn } from '@/lib/utils';
```

**Usage**:
```tsx
const className = cn(
  'base-class',
  condition && 'conditional-class',
  'tailwind-class'
);
```

---

## Animation Variants

### Import All Variants

**Import**:
```tsx
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  brutalBounce,
  brutalHover,
  staggerContainer,
  staggerFast,
  staggerSlow,
  cardFlip,
  navMenu,
  navItem,
  timelineItem,
  modalBackdrop,
  modalContent,
  progressBar,
  scrollReveal
} from '@/lib/animations';
```

### Common Patterns

**Fade In Up**:
```tsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

<motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```

**Stagger Children**:
```tsx
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={fadeInUp}>Child 1</motion.div>
  <motion.div variants={fadeInUp}>Child 2</motion.div>
  <motion.div variants={fadeInUp}>Child 3</motion.div>
</motion.div>
```

**Scroll Reveal**:
```tsx
import { motion } from 'framer-motion';
import { scrollReveal } from '@/lib/animations';

<motion.div
  variants={scrollReveal}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  Reveals on scroll
</motion.div>
```

**Brutal Hover**:
```tsx
import { motion } from 'framer-motion';
import { brutalHover } from '@/lib/animations';

<motion.div
  variants={brutalHover}
  initial="rest"
  whileHover="hover"
  whileTap="tap"
>
  Hover for brutal effect
</motion.div>
```

---

## CSS Utility Classes

### Container
```tsx
<div className="brutal-container">
  Max-width 1440px with responsive padding
</div>
```

### Card Pattern
```tsx
<div className="brutal-card">
  Pre-styled neobrutalist card
</div>
```

### Grid
```tsx
<div className="brutal-grid">
  Responsive grid with generous gaps
</div>
```

### Section Spacing
```tsx
<section className="brutal-section">
  Responsive vertical padding
</section>
```

### Responsive Typography
```tsx
<h1 className="text-responsive-display">Display</h1>
<h1 className="text-responsive-h1">H1</h1>
<h2 className="text-responsive-h2">H2</h2>
<h3 className="text-responsive-h3">H3</h3>
```

### Sentence Case
```tsx
<h1 className="text-sentence-case">
  Only first letter capitalized
</h1>
```

### Hover Effect
```tsx
<div className="hover-brutal">
  Brutal hover effect utility
</div>
```

---

## Common Patterns

### Hero Section
```tsx
import { Section, SectionHeader, SectionTitle, SectionDescription, AnimatedButton } from '@/components/ui';

<Section spacing="lg">
  <SectionHeader>
    <SectionTitle>
      Your compelling headline
    </SectionTitle>
    <SectionDescription>
      Your supporting subheading
    </SectionDescription>
  </SectionHeader>

  <div className="flex gap-4 justify-center">
    <AnimatedButton variant="primary" size="lg">
      Primary CTA
    </AnimatedButton>
    <AnimatedButton variant="outline" size="lg">
      Secondary CTA
    </AnimatedButton>
  </div>
</Section>
```

### Card Grid
```tsx
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, Badge } from '@/components/ui';
import { staggerContainer, fadeInUp } from '@/lib/animations';

<motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeInUp}>
      <Card hoverable>
        <CardHeader>
          <Badge variant="primary">{item.category}</Badge>
          <CardTitle>{item.title}</CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  ))}
</motion.div>
```

### Form
```tsx
import { Input, Button } from '@/components/ui';

<form className="space-y-6 max-w-xl mx-auto">
  <Input
    label="Name"
    type="text"
    required
  />

  <Input
    label="Email"
    type="email"
    helperText="We'll never share your email"
    required
  />

  <Button variant="primary" size="lg" type="submit">
    Submit
  </Button>
</form>
```

### Timeline
```tsx
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, Badge } from '@/components/ui';
import { timelineItem } from '@/lib/animations';

<div className="space-y-8">
  {timeline.map(item => (
    <motion.div
      key={item.id}
      variants={timelineItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card hoverable>
        <CardHeader>
          <Badge variant="primary">{item.year}</Badge>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  ))}
</div>
```

### Modal
```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '@/components/ui';
import { modalBackdrop, modalContent } from '@/lib/animations';

<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        variants={modalBackdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        variants={modalContent}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle>Modal Title</CardTitle>
          </CardHeader>
          <CardContent>
            Modal content here
          </CardContent>
          <CardFooter>
            <Button variant="primary" onClick={onClose}>
              Close
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## Type Definitions

All components export their prop types:

```tsx
import type {
  ButtonProps,
  CardProps,
  InputProps,
  BadgeProps,
  SectionProps,
  ThemeToggleProps,
  AnimatedButtonProps,
  AnimatedCardProps
} from '@/components/ui';
```

---

## Quick Import Reference

**All UI Components**:
```tsx
import {
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Input,
  Badge,
  Section, SectionHeader, SectionTitle, SectionDescription,
  ThemeToggle,
  AnimatedButton,
  AnimatedCard
} from '@/components/ui';
```

**All Utilities**:
```tsx
import { cn, useTheme } from '@/lib';
```

**All Animations**:
```tsx
import * as animations from '@/lib/animations';
```

**Providers**:
```tsx
import { ThemeProvider } from '@/components/providers';
```

---

## Resources

- **Demo Page**: `/demo` - See all components in action
- **Documentation**: `DESIGN_SYSTEM.md` - Complete design system guide
- **Quick Start**: `QUICKSTART.md` - Get started in 5 minutes
- **Source Code**: `components/ui/` - Component implementations
