# Neobrutalist Design System Documentation

Complete documentation for Mattia's portfolio design system.

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Components](#components)
5. [Animations](#animations)
6. [Accessibility](#accessibility)
7. [Usage Examples](#usage-examples)

---

## Design Principles

### Core Philosophy
Neobrutalism celebrates honesty in design through:
- **Bold borders** (4-6px solid black)
- **Hard shadows** (no blur, 8px offset)
- **Vibrant colors** (high contrast)
- **Clear hierarchy** (obvious interactive elements)
- **Generous whitespace** (breathing room)

### Visual Language
```
Element = Content + Border (4-6px black) + Shadow (8px offset) + Border Radius (8-12px)
```

### Interaction Pattern
```
Rest State → Hover (shadow grows, element moves -4px) → Active (shadow shrinks, element moves +4px)
```

---

## Color System

### Primary Colors
```typescript
primary: {
  DEFAULT: '#FFD93D',  // Yellow - Main CTA color
  light: '#FFEB99',
  dark: '#E6C300',
}

secondary: {
  DEFAULT: '#6C5CE7',  // Purple - Secondary actions
  light: '#A29BF8',
  dark: '#5344C5',
}

accent: {
  DEFAULT: '#FF6B6B',  // Red - Attention/alerts
  light: '#FF9999',
  dark: '#FF3838',
}
```

### System Colors
```typescript
brutalist: {
  border: '#000000',           // All borders
  shadow: '#000000',           // All shadows
  bg: {
    light: '#FAFAFA',         // Light mode background
    dark: '#1A1A1A',          // Dark mode background
  },
  surface: {
    light: '#FFFFFF',         // Light mode cards
    dark: '#242424',          // Dark mode cards
  },
  text: {
    light: '#1A1A1A',         // Light mode text
    dark: '#FAFAFA',          // Dark mode text
  },
}
```

### Usage Guidelines
- **Primary**: Main CTAs, important actions, highlights
- **Secondary**: Secondary actions, navigation, supporting elements
- **Accent**: Warnings, errors, urgent actions, special callouts
- **Black borders/shadows**: Universal across all elements

---

## Typography

### Font Families
```css
--font-space-grotesk: 'Space Grotesk'  /* Headings */
--font-inter: 'Inter'                   /* Body text */
--font-jetbrains-mono: 'JetBrains Mono' /* Code */
```

### Type Scale
```css
display-1:  72px / 900 weight / 1.1 line-height
display-2:  60px / 900 weight / 1.1 line-height
h1:         48px / 800 weight / 1.2 line-height
h2:         36px / 700 weight / 1.2 line-height
h3:         30px / 700 weight / 1.3 line-height
h4:         24px / 600 weight / 1.4 line-height
h5:         20px / 600 weight / 1.4 line-height
body-xl:    20px / 400 weight / 1.6 line-height
body-lg:    18px / 400 weight / 1.6 line-height
body:       16px / 400 weight / 1.6 line-height
body-sm:    14px / 400 weight / 1.5 line-height
```

### Responsive Typography
```tsx
<h1 className="text-responsive-h1">  // 3xl → 4xl → h1
<h2 className="text-responsive-h2">  // 2xl → 3xl → h2
<h3 className="text-responsive-h3">  // xl → 2xl → h3
```

### Rules
- All headings use **sentence case** (only first letter capitalized)
- Minimum body text: 16px on mobile
- Line height: 1.6 for body text (readability)
- Headings: Space Grotesk (bold/black weights)
- Body: Inter (regular/medium weights)

---

## Components

### Button
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">
  Click me
</Button>
```

**Variants**: `primary` | `secondary` | `accent` | `outline` | `ghost`
**Sizes**: `sm` | `md` | `lg` | `xl`
**Features**:
- 4px border, 8px shadow
- Hover: shadow grows to 12px, element moves -4px
- Active: shadow shrinks to 4px, element moves +4px
- Disabled: 50% opacity, no interactions

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

<Card hoverable>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content here
  </CardContent>
</Card>
```

**Variants**: `default` | `primary` | `secondary` | `accent`
**Props**:
- `hoverable`: Enable hover effects
- `clickable`: Add cursor pointer + hover effects

### Input
```tsx
import { Input } from '@/components/ui';

<Input
  label="Email address"
  type="email"
  placeholder="your@email.com"
  helperText="We'll never share your email"
  error="This field is required"
/>
```

**Features**:
- Automatic label-input association
- Error state styling (accent border + ring)
- Helper text support
- Full accessibility (ARIA attributes)

### Badge
```tsx
import { Badge } from '@/components/ui';

<Badge variant="primary" size="md">
  New
</Badge>
```

**Variants**: `default` | `primary` | `secondary` | `accent` | `outline`
**Sizes**: `sm` | `md` | `lg`

### Section
```tsx
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui';

<Section spacing="md" variant="default">
  <SectionHeader>
    <SectionTitle>Section title</SectionTitle>
    <SectionDescription>
      Section description text
    </SectionDescription>
  </SectionHeader>
  {/* Content */}
</Section>
```

**Spacing**: `sm` | `md` | `lg`
**Variants**: `default` | `primary` | `secondary` | `accent`
**Props**:
- `contained`: Wrap content in container (default: true)

### ThemeToggle
```tsx
import { ThemeToggle } from '@/components/ui';

<ThemeToggle />
```

**Features**:
- Persists to localStorage
- Animated icon transition
- Accessible (ARIA labels)
- SSR-safe (no flash)

---

## Animations

### Available Variants
```typescript
import {
  fadeIn, fadeInUp, fadeInDown,
  slideInLeft, slideInRight,
  brutalHover,
  staggerContainer,
  scrollReveal
} from '@/lib/animations';
```

### Usage with Framer Motion
```tsx
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={fadeInUp}>
    Content 1
  </motion.div>
  <motion.div variants={fadeInUp}>
    Content 2
  </motion.div>
</motion.div>
```

### Brutal Hover Effect
```tsx
import { AnimatedButton, AnimatedCard } from '@/components/ui';

<AnimatedButton variant="primary">
  Hover me
</AnimatedButton>

<AnimatedCard>
  Hover me too
</AnimatedCard>
```

### Timing
- **Duration**: 200-500ms (fast interactions)
- **Easing**: `cubic-bezier(0.25, 0.1, 0.25, 1)` (brutal easing)
- **Stagger**: 50-100ms between children

---

## Accessibility

### WCAG 2.1 AA Compliance

#### Color Contrast
- Primary text on light: 17:1 ratio
- Primary text on dark: 16:1 ratio
- All combinations meet 4.5:1 minimum

#### Keyboard Navigation
- All interactive elements focusable
- Focus visible: 4px primary outline + 2px offset
- Tab order follows visual hierarchy
- Skip to main content link

#### Screen Reader Support
- Semantic HTML throughout
- ARIA labels on icon-only buttons
- Form error associations
- Live region announcements

#### Focus Management
```css
*:focus-visible {
  outline: 4px solid theme('colors.primary.DEFAULT');
  outline-offset: 2px;
}
```

### Best Practices
- Minimum touch target: 44x44px
- Generous spacing between interactive elements
- Clear visual feedback on all interactions
- Text alternatives for all non-text content

---

## Usage Examples

### Hero Section
```tsx
<Section spacing="lg" variant="default">
  <SectionHeader>
    <SectionTitle>
      Ho fallito come designer. Poi come developer. Ora sono un Product Manager che sa davvero cosa costruire.
    </SectionTitle>
    <SectionDescription>
      Perché ho imparato che il prodotto perfetto non esiste. Esiste solo quello che risolve problemi reali.
    </SectionDescription>
  </SectionHeader>

  <div className="flex gap-4 justify-center">
    <AnimatedButton variant="primary" size="lg">
      Parliamone
    </AnimatedButton>
    <AnimatedButton variant="outline" size="lg">
      Scopri di più
    </AnimatedButton>
  </div>
</Section>
```

### Blog Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {posts.map(post => (
    <AnimatedCard key={post.id} hoverable>
      <CardHeader>
        <div className="flex gap-2 mb-2">
          <Badge variant="primary">{post.category}</Badge>
          <Badge variant="outline">{post.readTime}</Badge>
        </div>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.excerpt}</CardDescription>
      </CardHeader>
    </AnimatedCard>
  ))}
</div>
```

### Contact Form
```tsx
<form className="space-y-6 max-w-xl">
  <Input
    label="Nome"
    type="text"
    required
  />

  <Input
    label="Email"
    type="email"
    helperText="Per ricontattarti"
    required
  />

  <Button variant="primary" size="lg" type="submit">
    Invia messaggio
  </Button>
</form>
```

### Timeline
```tsx
<motion.div
  className="space-y-8"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {timeline.map(item => (
    <motion.div key={item.id} variants={fadeInUp}>
      <Card hoverable>
        <CardHeader>
          <Badge variant="primary">{item.year}</Badge>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  ))}
</motion.div>
```

---

## Responsive Breakpoints

```typescript
screens: {
  'xs': '480px',
  'sm': '640px',
  'md': '768px',   // Primary mobile breakpoint
  'lg': '1024px',
  'xl': '1440px',  // Primary desktop breakpoint
  '2xl': '1920px',
}
```

### Mobile-First Approach
```tsx
// Default styles = mobile
<div className="px-4 md:px-8 xl:px-16">
  <h1 className="text-3xl md:text-4xl xl:text-h1">
    Responsive heading
  </h1>
</div>
```

---

## CSS Utilities

### Container
```tsx
<div className="brutal-container">
  {/* Max-width 1440px, responsive padding */}
</div>
```

### Card Pattern
```tsx
<div className="brutal-card">
  {/* Pre-styled neobrutalist card */}
</div>
```

### Grid
```tsx
<div className="brutal-grid">
  {/* Responsive grid with generous gaps */}
</div>
```

### Section Spacing
```tsx
<section className="brutal-section">
  {/* py-16 md:py-24 lg:py-32 */}
</section>
```

---

## Performance Optimization

### Font Loading
- Display: swap (prevents invisible text)
- Preload critical fonts
- Subset to Latin characters only

### Animation Performance
- GPU-accelerated transforms only
- Will-change for frequently animated elements
- Reduced motion support built-in

### Image Optimization
- Next.js Image component
- WebP format with fallbacks
- Lazy loading by default
- Responsive srcSet

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dark Mode

Automatic theme detection with manual override:
```tsx
import { useTheme } from '@/lib/theme-store';

const { theme, setTheme, toggleTheme } = useTheme();
```

All components automatically adapt to dark mode using Tailwind's `dark:` variants.

---

## Migration from Other Systems

### From Plain Tailwind
Replace utility classes with design system components for consistency.

### From Other Design Systems
Map semantic names to neobrutalist equivalents:
- `Button primary` → `Button variant="primary"`
- `Card elevated` → `Card hoverable`
- `Text body` → Use `text-body` utility

---

## Support

For questions or issues with the design system:
- Check component demos at `/demo`
- Review this documentation
- Inspect component source in `components/ui/`
