# Component Usage Examples
**Design System**: Cold-Tone Professional Palette v2.0
**Date**: 2025-11-08

---

## 📦 Component Library Overview

All components are fully typed with TypeScript and follow the neobrutalist design system with WCAG AA compliance.

**Import Path**: `@/components/ui/[Component]`

---

## 🔘 Button Component

### Basic Usage

```tsx
import { Button } from '@/components/ui/Button';

// Default button (medium, primary)
<Button>Click me</Button>

// With onClick handler
<Button onClick={() => console.log('Clicked!')}>
  Submit Form
</Button>

// Disabled state
<Button disabled>
  Processing...
</Button>
```

### Size Variants

```tsx
// Small button (16×36px) - Compact UI
<Button size="sm">Small</Button>

// Medium button (24×48px) - Default, meets touch target
<Button size="md">Medium</Button>

// Large button (32×56px) - Prominent actions
<Button size="lg">Large</Button>

// Extra Large button (40×64px) - Hero CTA
<Button size="xl">Get Started</Button>
```

### Color Variants

```tsx
// Primary - Electric Blue
<Button variant="primary">Design Project</Button>

// Secondary - Slate Blue
<Button variant="secondary">Development</Button>

// Accent - Deep Navy
<Button variant="accent">PM Strategy</Button>

// Outline - Transparent with border
<Button variant="outline">Learn More</Button>

// Ghost - Minimal styling
<Button variant="ghost">Cancel</Button>
```

### Full Example

```tsx
import { Button } from '@/components/ui/Button';

function CTASection() {
  return (
    <div className="flex gap-4">
      <Button
        variant="primary"
        size="lg"
        onClick={() => window.location.href = '/contact'}
      >
        Book a Call
      </Button>
      <Button variant="outline" size="lg">
        View Portfolio
      </Button>
    </div>
  );
}
```

**Visual Effect**:
- 4px thick border
- 8px hard shadow
- Hover: translates -4px x/y, shadow grows to 12px
- Active: translates +4px x/y, shadow shrinks to 4px

---

## 🃏 Card Component

### Basic Usage

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    Footer content or actions
  </CardFooter>
</Card>
```

### Interactive Cards

```tsx
// Hoverable card (hover effects enabled)
<Card hoverable>
  <CardContent>Hover me!</CardContent>
</Card>

// Clickable card (cursor pointer + hover effects)
<Card clickable onClick={() => navigate('/project/1')}>
  <CardContent>Click to view project</CardContent>
</Card>
```

### Color Variants

```tsx
// Default - White/Dark background
<Card variant="default">...</Card>

// Primary - Electric Blue background
<Card variant="primary">...</Card>

// Secondary - Slate Blue background
<Card variant="secondary">...</Card>

// Accent - Deep Navy background
<Card variant="accent">...</Card>
```

### Color-Coded Headers (NEW!)

```tsx
// Design/UX projects - Electric Blue accent
<Card>
  <CardHeader variant="design">
    <CardTitle>Figma Component Library</CardTitle>
    <CardDescription>Design system work</CardDescription>
  </CardHeader>
  <CardContent>
    Created a comprehensive design system in Figma...
  </CardContent>
</Card>

// Development projects - Slate Blue accent
<Card>
  <CardHeader variant="dev">
    <CardTitle>Next.js Migration</CardTitle>
    <CardDescription>Full-stack development</CardDescription>
  </CardHeader>
  <CardContent>
    Migrated legacy app to Next.js 14...
  </CardContent>
</Card>

// PM/Strategy projects - Deep Navy accent
<Card>
  <CardHeader variant="pm">
    <CardTitle>Q4 Product Roadmap</CardTitle>
    <CardDescription>Strategic planning</CardDescription>
  </CardHeader>
  <CardContent>
    Defined product vision for next quarter...
  </CardContent>
</Card>
```

**Visual Effect**:
- 4px left border in category color
- Background tint: 5% opacity (light mode) / 10% opacity (dark mode)
- Clear visual categorization at a glance

### Project Card Example

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

function ProjectCard({ project }) {
  return (
    <Card hoverable>
      <CardHeader variant={project.category}>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-body mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.skills.map(skill => (
            <Badge key={skill.name} variant={skill.category}>
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

// Usage
<ProjectCard
  project={{
    title: "Design System Overhaul",
    category: "design",
    description: "Complete redesign of component library",
    skills: [
      { name: "Figma", category: "design" },
      { name: "React", category: "dev" },
      { name: "Storybook", category: "tool" }
    ]
  }}
/>
```

---

## 🏷️ Badge Component

### Basic Usage

```tsx
import { Badge } from '@/components/ui/Badge';

// Default badge
<Badge>New</Badge>

// With custom className
<Badge className="uppercase">Featured</Badge>
```

### Size Variants

```tsx
// Small badge (0.75rem text)
<Badge size="sm">Small</Badge>

// Medium badge (0.875rem text) - Default
<Badge size="md">Medium</Badge>

// Large badge (1rem text)
<Badge size="lg">Large</Badge>
```

### Color Variants

```tsx
// Default - Surface color
<Badge variant="default">Default</Badge>

// Primary - Electric Blue
<Badge variant="primary">Primary</Badge>

// Secondary - Slate Blue
<Badge variant="secondary">Secondary</Badge>

// Accent - Deep Navy
<Badge variant="accent">Accent</Badge>

// Outline - Transparent with border
<Badge variant="outline">Outline</Badge>
```

### Semantic Variants (NEW!)

```tsx
// Design/UX - Electric Blue
<Badge variant="design">Figma</Badge>
<Badge variant="design">UI/UX</Badge>
<Badge variant="design">Design Systems</Badge>

// Development - Slate Blue
<Badge variant="dev">React</Badge>
<Badge variant="dev">Next.js</Badge>
<Badge variant="dev">TypeScript</Badge>

// PM/Strategy - Deep Navy
<Badge variant="pm">Product Strategy</Badge>
<Badge variant="pm">Roadmapping</Badge>
<Badge variant="pm">User Research</Badge>

// Tools/Analytics - Teal
<Badge variant="tool">Google Analytics</Badge>
<Badge variant="tool">Figma</Badge>
<Badge variant="tool">Jira</Badge>
```

### Skills Section Example

```tsx
import { Badge } from '@/components/ui/Badge';

function SkillsSection() {
  const skills = {
    design: ['Figma', 'Adobe XD', 'Sketch', 'Design Systems'],
    dev: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    pm: ['Product Strategy', 'Roadmapping', 'User Research'],
    tools: ['Google Analytics', 'Mixpanel', 'Jira', 'Notion']
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-bold text-h4 mb-3">Design & UX</h3>
        <div className="flex flex-wrap gap-2">
          {skills.design.map(skill => (
            <Badge key={skill} variant="design" size="md">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-h4 mb-3">Development</h3>
        <div className="flex flex-wrap gap-2">
          {skills.dev.map(skill => (
            <Badge key={skill} variant="dev" size="md">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-h4 mb-3">Product Management</h3>
        <div className="flex flex-wrap gap-2">
          {skills.pm.map(skill => (
            <Badge key={skill} variant="pm" size="md">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 📝 Input Component

### Basic Usage

```tsx
import { Input } from '@/components/ui/Input';

// Simple input
<Input placeholder="Enter your name" />

// With label
<Input
  label="Email Address"
  placeholder="you@example.com"
/>

// With helper text
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>
```

### Error State

```tsx
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, formState: { errors } } = useForm();

  return (
    <form>
      <Input
        label="Email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={errors.email?.message}
        helperText="We'll never share your email"
      />
    </form>
  );
}
```

### Full Form Example

```tsx
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';

function BookingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Full Name"
        placeholder="John Doe"
        {...register('name', { required: 'Name is required' })}
        error={errors.name?.message}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={errors.email?.message}
        helperText="We'll send confirmation here"
      />

      <Input
        label="Company (Optional)"
        placeholder="Acme Inc."
        {...register('company')}
      />

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Book Appointment
      </Button>
    </form>
  );
}
```

**Visual Features**:
- Electric Blue focus state (shadow changes from 3px to 5px)
- Red error state with red border/shadow
- 6px border radius (professional look)
- Hover effect: translate -2px x/y
- Accessible labels and descriptions (aria-describedby)

---

## 🎨 Spacing Grid Examples

### Using 8pt Grid

```tsx
// Padding (internal spacing)
<div className="p-1">   {/* 8px padding */}
<div className="p-3">   {/* 24px padding */}
<div className="p-6">   {/* 48px padding */}
<div className="p-12">  {/* 96px padding */}

// Margin (external spacing)
<div className="m-2">   {/* 16px margin */}
<div className="m-4">   {/* 32px margin */}
<div className="m-8">   {/* 64px margin */}

// Gap (flexbox/grid spacing)
<div className="flex gap-2">  {/* 16px gap */}
<div className="grid gap-6">  {/* 48px gap */}
```

### Section Spacing

```tsx
// Section component with proper spacing
function HeroSection() {
  return (
    <section className="py-16 px-6 md:px-12">
      {/* py-16 = 128px vertical padding */}
      {/* px-6 = 48px horizontal padding (mobile) */}
      {/* md:px-12 = 96px horizontal padding (desktop) */}

      <div className="max-w-6xl mx-auto space-y-8">
        {/* space-y-8 = 64px vertical gap between children */}

        <h1 className="text-display-1 mb-6">
          {/* mb-6 = 48px bottom margin */}
          Hero Title
        </h1>

        <p className="text-body-lg mb-8">
          {/* mb-8 = 64px bottom margin */}
          Hero description paragraph
        </p>

        <div className="flex gap-4">
          {/* gap-4 = 32px gap between buttons */}
          <Button size="lg">Primary CTA</Button>
          <Button variant="outline" size="lg">Secondary</Button>
        </div>
      </div>
    </section>
  );
}
```

---

## 🌗 Dark Mode Support

All components automatically support dark mode via the `dark:` class prefix.

### Theme Toggle

```tsx
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
}
```

### Dark Mode Colors

```tsx
// Component automatically adapts
<Card>
  <CardContent>
    {/* Light mode: white background, black text */}
    {/* Dark mode: #242424 background, white text */}
    Content adapts automatically
  </CardContent>
</Card>

// Manual dark mode styling
<div className="bg-white dark:bg-[#242424] text-black dark:text-white">
  Custom dark mode
</div>
```

---

## ♿ Accessibility Examples

### Skip Links (Automatic)

Already implemented in layout. User presses Tab on page load to reveal skip link.

### Keyboard Navigation

```tsx
// All interactive components support keyboard navigation
<Button onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
}}>
  Keyboard Accessible Button
</Button>

// Input with proper labels
<Input
  label="Search"
  id="search-input"
  aria-label="Search the website"
  aria-describedby="search-help"
  helperText="Enter keywords to search"
/>
```

### ARIA Attributes

```tsx
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// Accessible card with proper semantics
<Card role="article" aria-labelledby="project-1-title">
  <CardHeader>
    <CardTitle id="project-1-title">
      Accessible Design System
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p>Project description</p>
    <div role="list" aria-label="Project skills">
      <Badge role="listitem" variant="design">Figma</Badge>
      <Badge role="listitem" variant="dev">React</Badge>
    </div>
  </CardContent>
</Card>
```

---

## 📱 Responsive Patterns

### Mobile-First Approach

```tsx
// Start with mobile, scale up
<div className="
  px-4          {/* 32px padding mobile */}
  md:px-8       {/* 64px padding tablet */}
  lg:px-12      {/* 96px padding desktop */}
">
  <h1 className="
    text-3xl    {/* 48px mobile */}
    md:text-4xl {/* 56px tablet */}
    lg:text-display-1 {/* 72px desktop */}
  ">
    Responsive Title
  </h1>
</div>
```

### Responsive Grid

```tsx
<div className="
  grid
  grid-cols-1        {/* 1 column mobile */}
  md:grid-cols-2     {/* 2 columns tablet */}
  lg:grid-cols-3     {/* 3 columns desktop */}
  gap-6              {/* 48px gap */}
">
  <Card>Project 1</Card>
  <Card>Project 2</Card>
  <Card>Project 3</Card>
</div>
```

---

## 🎯 Complete Page Example

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Design System Migration",
      category: "design",
      description: "Complete overhaul of component library with cold-tone palette",
      skills: ["Figma", "React", "Tailwind CSS"],
      link: "/projects/design-system"
    },
    {
      id: 2,
      title: "Next.js 14 Upgrade",
      category: "dev",
      description: "Migrated legacy app to Next.js 14 with App Router",
      skills: ["Next.js", "TypeScript", "React Server Components"],
      link: "/projects/nextjs-upgrade"
    },
    {
      id: 3,
      title: "Product Roadmap Q4",
      category: "pm",
      description: "Strategic planning and feature prioritization for Q4",
      skills: ["Product Strategy", "User Research", "Roadmapping"],
      link: "/projects/roadmap-q4"
    }
  ];

  return (
    <div className="min-h-screen px-6 py-16 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-display-1 font-black mb-4 text-shadow-hard">
            Projects
          </h1>
          <p className="text-body-lg text-brutalist-text-light/80 dark:text-brutalist-text-dark/80">
            Selected work across design, development, and product management
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Card key={project.id} hoverable>
              <CardHeader variant={project.category}>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-body text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.skills.map(skill => (
                    <Badge key={skill} variant={project.category} size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.location.href = project.link}
                >
                  View Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 📚 Additional Resources

- **Design System Spec**: `new-DESIGN_SYSTEM.md`
- **Migration Guide**: `DESIGN_SYSTEM_MIGRATION_GUIDE.md`
- **CLAUDE.md**: Updated developer guide
- **Storybook**: Component playground (run `npm run storybook`)

---

**Component Library Version**: 2.0
**Last Updated**: 2025-11-08
**Questions?** Check documentation or open an issue
