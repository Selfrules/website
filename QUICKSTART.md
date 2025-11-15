# Quick Start Guide

Get up and running with the neobrutalist design system in 5 minutes.

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
mattia_web/
├── app/
│   ├── fonts.ts          # Font configuration
│   ├── globals.css       # Global styles + utilities
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Homepage
│   └── demo/
│       └── page.tsx      # Component showcase
├── components/
│   ├── providers/
│   │   └── ThemeProvider.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── Section.tsx
│       ├── ThemeToggle.tsx
│       ├── AnimatedButton.tsx
│       ├── AnimatedCard.tsx
│       └── index.ts      # Barrel exports
├── lib/
│   ├── animations.ts     # Framer Motion variants
│   ├── theme-store.ts    # Zustand theme state
│   ├── utils.ts          # Utility functions
│   └── index.ts          # Barrel exports
└── tailwind.config.ts    # Design tokens
```

## 5-Minute Tutorial

### 1. Import Components
```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Section,
  ThemeToggle
} from '@/components/ui';
```

### 2. Build a Section
```tsx
<Section spacing="lg">
  <SectionHeader>
    <SectionTitle>Your section title</SectionTitle>
    <SectionDescription>
      Your section description
    </SectionDescription>
  </SectionHeader>

  {/* Your content */}
</Section>
```

### 3. Add Cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card hoverable>
    <CardHeader>
      <CardTitle>Card title</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Card content here</p>
    </CardContent>
  </Card>
</div>
```

### 4. Add CTAs
```tsx
<div className="flex gap-4">
  <Button variant="primary" size="lg">
    Primary action
  </Button>
  <Button variant="outline" size="lg">
    Secondary action
  </Button>
</div>
```

### 5. Add Theme Toggle
```tsx
<ThemeToggle />
```

## Common Patterns

### Hero Section
```tsx
<Section variant="default" spacing="lg">
  <div className="text-center space-y-8">
    <h1 className="font-heading font-black text-responsive-display">
      Your headline
    </h1>
    <p className="text-body-xl max-w-3xl mx-auto">
      Your subheading
    </p>
    <div className="flex gap-4 justify-center">
      <Button variant="primary" size="lg">
        Primary CTA
      </Button>
      <Button variant="outline" size="lg">
        Secondary CTA
      </Button>
    </div>
  </div>
</Section>
```

### Content Grid
```tsx
<Section>
  <div className="brutal-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {items.map(item => (
      <Card key={item.id} hoverable>
        <CardHeader>
          <Badge variant="primary">{item.category}</Badge>
          <CardTitle>{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{item.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</Section>
```

### Form
```tsx
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

## Adding Animations

### Import Framer Motion
```tsx
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
```

### Animate Elements
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={fadeInUp}>
    First item
  </motion.div>
  <motion.div variants={fadeInUp}>
    Second item
  </motion.div>
</motion.div>
```

### Use Animated Components
```tsx
import { AnimatedButton, AnimatedCard } from '@/components/ui';

<AnimatedButton variant="primary">
  Hover me
</AnimatedButton>

<AnimatedCard hoverable>
  <CardContent>
    I have hover effects
  </CardContent>
</AnimatedCard>
```

## Customization

### Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: '#FFD93D',  // Change this
  },
}
```

### Typography
Edit font sizes in `tailwind.config.ts`:
```typescript
fontSize: {
  'h1': ['3rem', { lineHeight: '1.2', fontWeight: '800' }],
}
```

### Spacing
Edit section spacing in `tailwind.config.ts`:
```typescript
spacing: {
  'section': '6rem',  // Adjust this
}
```

## Responsive Design

All components are mobile-first. Use Tailwind breakpoints:

```tsx
<div className="px-4 md:px-8 xl:px-16">
  <h1 className="text-3xl md:text-4xl xl:text-h1">
    Responsive text
  </h1>
</div>
```

Breakpoints:
- `xs`: 480px
- `sm`: 640px
- `md`: 768px (primary mobile breakpoint)
- `lg`: 1024px
- `xl`: 1440px (primary desktop breakpoint)
- `2xl`: 1920px

## Utility Classes

### Containers
```tsx
<div className="brutal-container">
  {/* Max-width 1440px with responsive padding */}
</div>
```

### Cards
```tsx
<div className="brutal-card">
  {/* Pre-styled neobrutalist card */}
</div>
```

### Grids
```tsx
<div className="brutal-grid">
  {/* Responsive grid with generous gaps */}
</div>
```

### Sections
```tsx
<section className="brutal-section">
  {/* Responsive vertical padding */}
</section>
```

## Accessibility

### Focus States
All interactive elements have visible focus states automatically.

### Skip Links
```tsx
<a href="#main-content" className="skip-to-main">
  Skip to main content
</a>

<main id="main-content">
  {/* Your content */}
</main>
```

### Form Labels
```tsx
<Input
  label="Email"  // Automatically associated
  type="email"
  required
  aria-required="true"
/>
```

## View the Component Demo

Visit `/demo` to see all components in action:
```
http://localhost:3000/demo
```

## Next Steps

1. Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation
2. Explore components in `components/ui/`
3. Check animation variants in `lib/animations.ts`
4. Review design tokens in `tailwind.config.ts`
5. Build your pages!

## Common Issues

### Fonts not loading?
Make sure you've run `npm install` and the fonts are downloaded from Google Fonts.

### Components not styled?
Ensure Tailwind is configured correctly and you've imported `globals.css` in your layout.

### TypeScript errors?
Run `npm run type-check` to see all errors. Most issues are import path related.

## Support

- Component demos: `/demo`
- Full documentation: `DESIGN_SYSTEM.md`
- PRD reference: `PRD_Mattia_Website.md`
