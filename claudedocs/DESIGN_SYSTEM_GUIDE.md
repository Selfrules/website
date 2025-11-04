# 🎨 Neobrutalist Design System Guide

## Overview
A comprehensive design system for Mattia's portfolio website featuring extended color palettes, geometric patterns, advanced animations, and neobrutalist components.

## 📊 Color System

### Primary Colors with Gradations
```css
/* Yellow Spectrum */
primary-50: #FFFBEB
primary-100: #FFF5CC
primary-200: #FFEB99
primary-300: #FFE066
primary-DEFAULT: #FFD93D
primary-400: #FFC700
primary-500: #E6B000
primary-600: #CC9900
primary-700: #B38600
primary-800: #997300
primary-900: #806000

/* Purple Spectrum */
secondary-50: #F3F1FF
secondary-100: #E5E1FF
secondary-200: #C9C2FF
secondary-300: #A29BF8
secondary-DEFAULT: #6C5CE7
secondary-400: #5B4BD9
secondary-500: #5344C5
secondary-600: #4236A3
secondary-700: #362D85
secondary-800: #2B2467
secondary-900: #1F1B4A

/* Coral/Red Spectrum */
accent-50: #FFF1F1
accent-100: #FFE4E4
accent-200: #FFBEBE
accent-300: #FF9999
accent-DEFAULT: #FF6B6B
accent-400: #FF4747
accent-500: #FF3838
accent-600: #E61E1E
accent-700: #CC0000
accent-800: #B30000
accent-900: #990000
```

### Neon Accent Colors
```css
neon-cyan: #00D9FF
neon-pink: #FF0099
neon-lime: #84CC16
neon-orange: #F97316
neon-blue: #3B82F6
neon-purple: #8B5CF6
neon-yellow: #EAB308
neon-green: #10B981
neon-red: #EF4444
```

## 🔲 Pattern Components

### DotPattern
Creates dot matrix backgrounds with customizable size and opacity.

```tsx
import DotPattern from '@/components/patterns/DotPattern';

// Basic usage
<DotPattern className="h-96">
  <h1>Content over dot pattern</h1>
</DotPattern>

// Customized
<DotPattern
  color="text-primary/20"
  size="lg"
  opacity={0.15}
>
  {content}
</DotPattern>
```

### GridPattern
Creates grid overlays with multiple variants.

```tsx
import GridPattern from '@/components/patterns/GridPattern';

// Grid variants
<GridPattern variant="grid" />      // Standard grid
<GridPattern variant="diagonal" />  // Diagonal lines
<GridPattern variant="cross" />     // Crosshatch pattern

// Custom styling
<GridPattern
  color="text-neon-cyan/10"
  size="sm"
  opacity={0.08}
  variant="diagonal"
/>
```

### GeometricTextures
Floating geometric shapes for decorative purposes.

```tsx
import GeometricTextures from '@/components/patterns/GeometricTextures';

// Position presets
<GeometricTextures variant="hero" />    // Hero section layout
<GeometricTextures variant="section" /> // Section decoration
<GeometricTextures variant="card" />    // Card accent

// Custom colors
<GeometricTextures
  colors={{
    square: 'border-neon-lime',
    circle: 'border-neon-pink',
    triangle: 'border-primary'
  }}
  animated={true}
/>
```

## 🔘 Button Components

### CTAButton
Enhanced button with icon support and loading states.

```tsx
import CTAButton from '@/components/ui/CTAButton';
import { Calendar, ArrowRight } from 'lucide-react';

// With icon
<CTAButton
  icon={Calendar}
  iconPosition="left"
  variant="primary"
  size="lg"
>
  Book a call
</CTAButton>

// Loading state
<CTAButton loading={true}>
  Processing...
</CTAButton>

// Animated icon
<CTAButton
  icon={ArrowRight}
  iconPosition="right"
  iconAnimation={true}
>
  Get started
</CTAButton>
```

### MagneticButton
Button that follows cursor movement.

```tsx
import MagneticButton from '@/components/ui/MagneticButton';

<MagneticButton
  variant="secondary"
  strength={0.4} // Magnetic strength
>
  Hover me
</MagneticButton>
```

## 🎨 Illustration Components

### AskMeAnything
Animated question/answer illustration.

```tsx
import AskMeAnything from '@/components/illustrations/AskMeAnything';

<AskMeAnything
  size="md"      // sm | md | lg
  animated={true}
/>
```

### SimpleIllustration
Morphing shape containers with icons.

```tsx
import SimpleIllustration from '@/components/illustrations/SimpleIllustration';
import { Star, Heart, Zap } from 'lucide-react';

<SimpleIllustration
  type="blob"         // blob | burst | wave | circle
  icon={Star}
  iconColor="text-neon-yellow"
  bgColor="bg-primary/10"
  size="lg"
  animated={true}
/>
```

### DecorativeAccents
Scattered decorative elements.

```tsx
import DecorativeAccents from '@/components/illustrations/DecorativeAccents';

// Preset layouts
<DecorativeAccents preset="hero" />    // Hero section accents
<DecorativeAccents preset="section" /> // Section decoration
<DecorativeAccents preset="random" />  // Random placement

// Custom accents
<DecorativeAccents
  accents={[
    { type: 'plus', color: 'text-neon-lime', position: { top: '10%', left: '5%' } },
    { type: 'dot', color: 'text-neon-pink', position: { bottom: '20%', right: '10%' } },
    { type: 'star', color: 'text-primary', position: { top: '50%', left: '50%' } }
  ]}
/>
```

## 🎬 Animation Library

### ScrollAnimations
Viewport-triggered animations.

```tsx
import { ScrollAnimation, ScrollStagger } from '@/components/animations/ScrollAnimations';

// Single element
<ScrollAnimation animation="fadeInUp" delay={0.2}>
  <Card>Content</Card>
</ScrollAnimation>

// Staggered children
<ScrollStagger staggerDelay={0.1} childAnimation="scaleIn">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</ScrollStagger>

// Available animations:
// fadeInUp, fadeInDown, fadeInLeft, fadeInRight
// scaleIn, rotateIn, blurIn, brutalSlide
```

### HoverEffects
Interactive hover animations.

```tsx
import {
  MagneticHover,
  TiltEffect,
  GlowEffect,
  ShadowLift
} from '@/components/animations/HoverEffects';

// Magnetic effect
<MagneticHover strength={0.3}>
  <Card>Magnetic card</Card>
</MagneticHover>

// 3D tilt
<TiltEffect maxTilt={20}>
  <Card>Tiltable card</Card>
</TiltEffect>

// Glow on hover
<GlowEffect glowColor="primary" glowSize="lg">
  <Button>Glowing button</Button>
</GlowEffect>

// Shadow lift
<ShadowLift liftDistance={12}>
  <Card>Lifting card</Card>
</ShadowLift>
```

### PageTransitions
Route and component transitions.

```tsx
import {
  PageTransition,
  ModalTransition,
  TabTransition
} from '@/components/animations/PageTransitions';

// Page transition
<PageTransition variant="brutal" transition="spring">
  <PageContent />
</PageTransition>

// Modal animation
<ModalTransition isOpen={isModalOpen}>
  <Modal>Content</Modal>
</ModalTransition>

// Tab switching
<TabTransition activeKey={activeTab}>
  <TabContent />
</TabTransition>
```

## 📐 Layout Components

### BentoGrid
Flexible grid layout system.

```tsx
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';

<BentoGrid columns={3} gap="md" animated>
  <BentoGridItem colSpan={2} rowSpan={2} variant="primary">
    Featured content
  </BentoGridItem>
  <BentoGridItem variant="secondary">
    Small item
  </BentoGridItem>
  <BentoGridItem>
    Regular item
  </BentoGridItem>
</BentoGrid>

// Using presets
import { BentoPresets } from '@/components/ui/BentoGrid';

<BentoGrid>
  {BentoPresets.masonry(items)}
</BentoGrid>
```

### Marquee
Infinite scrolling content.

```tsx
import Marquee, { TextMarquee, LogoMarquee } from '@/components/ui/Marquee';

// Text marquee
<TextMarquee
  texts={['Innovation', 'Design', 'Development']}
  separator="✦"
  speed="normal"
/>

// Logo marquee
<LogoMarquee
  logos={[
    { name: 'React', icon: <ReactIcon /> },
    { name: 'Next.js', src: '/logos/nextjs.svg' },
  ]}
  speed="slow"
/>

// Custom content
<Marquee speed="fast" direction="right" pauseOnHover>
  <MarqueeItem><Card>Item 1</Card></MarqueeItem>
  <MarqueeItem><Card>Item 2</Card></MarqueeItem>
</Marquee>
```

### Timeline
Vertical or horizontal timeline display.

```tsx
import { Timeline, TimelineItem } from '@/components/ui/Timeline';

<Timeline orientation="vertical" animated>
  <TimelineItem
    date="2024"
    title="Launch"
    description="Portfolio goes live"
    variant="primary"
    active={true}
    icon={<RocketIcon />}
  >
    Additional content here
  </TimelineItem>

  <TimelineItem
    date="2023"
    title="Development"
    variant="secondary"
  >
    Building the platform
  </TimelineItem>
</Timeline>
```

## 🎯 Usage Examples

### Hero Section with Patterns
```tsx
<section className="relative min-h-screen">
  <GridPattern variant="diagonal" opacity={0.05} />
  <GeometricTextures variant="hero" animated />

  <div className="relative z-10 p-8">
    <ScrollAnimation animation="fadeInUp">
      <h1 className="text-display-1">Welcome</h1>
    </ScrollAnimation>

    <CTAButton icon={ArrowRight} iconPosition="right" size="xl">
      Explore
    </CTAButton>
  </div>
</section>
```

### Interactive Card Grid
```tsx
<BentoGrid columns={4} gap="lg" animated>
  {projects.map((project, index) => (
    <BentoGridItem
      key={project.id}
      colSpan={index === 0 ? 2 : 1}
      rowSpan={index === 0 ? 2 : 1}
      variant={index === 0 ? 'primary' : 'default'}
      delay={index * 0.1}
    >
      <TiltEffect maxTilt={15}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </TiltEffect>
    </BentoGridItem>
  ))}
</BentoGrid>
```

### Animated Timeline
```tsx
<Timeline orientation="vertical">
  {experiences.map((exp, index) => (
    <TimelineItem
      key={exp.id}
      date={exp.year}
      title={exp.role}
      description={exp.company}
      variant={index === 0 ? 'primary' : 'default'}
      active={index === 0}
      icon={<Briefcase />}
    >
      <ul className="mt-2">
        {exp.achievements.map(achievement => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </TimelineItem>
  ))}
</Timeline>
```

## 🛠️ Best Practices

### Performance
1. Use `animated={false}` for components above the fold
2. Leverage `once={true}` for scroll animations
3. Optimize pattern opacity (0.05-0.15 recommended)
4. Limit concurrent animations to 3-5 elements

### Accessibility
1. Provide `pauseOnHover` for marquee components
2. Use semantic HTML within custom components
3. Ensure color contrast ratios meet WCAG standards
4. Add `prefers-reduced-motion` media queries

### Responsive Design
1. Hide decorative patterns on mobile with `hidden lg:block`
2. Adjust animation intensity for touch devices
3. Use responsive size variants (sm on mobile, lg on desktop)
4. Test touch interactions for magnetic effects

### Dark Mode
1. All components support dark mode via Tailwind classes
2. Use `/10` opacity suffixes for patterns in dark mode
3. Adjust neon colors for better dark mode visibility
4. Test shadow visibility in both modes

## 🚀 Getting Started

1. **Import components** from their respective directories
2. **Apply patterns** as background layers with low opacity
3. **Add animations** to enhance user interaction
4. **Combine components** to create complex layouts
5. **Customize colors** using the extended palette

Remember: Neobrutalism is about bold borders (4-6px), hard shadows (no blur), and purposeful animations that enhance rather than distract.