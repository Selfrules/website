# Mattia Portfolio - Neobrutalist Design System

A modern portfolio website built with Next.js 14 featuring a complete neobrutalist design system.

## Design System Overview

📚 **[View Complete Design System Documentation](./DESIGN_SYSTEM.md)**

### Core Principles
- **Bold borders**: 4-6px solid black on all interactive elements
- **Hard shadows**: 8px offset, no blur (#000000)
- **Cold-tone palette**: Electric Blue #0D7EFF, Teal #2A687A, Deep Purple #7209B7, Cyber Yellow #FFD60A, Neon Pink #FF006E
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (code)
- **Mobile-first**: Breakpoints at 768px and 1440px

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **State Management**: Zustand
- **TypeScript**: Full type safety
- **Fonts**: Google Fonts (Space Grotesk, Inter, JetBrains Mono)

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Design System Components

### Base Components
- **Button**: 5 variants (primary, secondary, accent, outline, ghost), 4 sizes
- **Card**: Container with neobrutalist styling, header, content, footer sections
- **Input**: Form field with label, error states, and helper text
- **Badge**: Category tags with multiple variants
- **Section**: Page section wrapper with spacing variants

### Animated Components
- **AnimatedButton**: Button with brutal hover effects
- **AnimatedCard**: Card with motion animations

## Tailwind Configuration

### Custom Colors
```typescript
electric-blue: #0D7EFF    // Design/UX projects
teal: #2A687A             // Development projects
deep-purple: #7209B7      // PM/Strategy projects
cyber-yellow: #FFD60A     // Featured/Special items (use black text #0A0A0A)
neon-pink: #FF006E        // Analytics/Tools projects
brutalist-border: #000000
brutalist-shadow: #000000
```

### Custom Shadows
```css
shadow-brutal: 8px 8px 0px #000000
shadow-brutal-sm: 4px 4px 0px #000000
shadow-brutal-lg: 12px 12px 0px #000000
```

### Typography Scale
- Display: 72px / 60px
- H1: 48px
- H2: 36px
- H3: 30px
- Body: 16px (minimum)
- Line height: 1.6

## Animation Variants

All animations use the brutal easing function: `cubic-bezier(0.25, 0.1, 0.25, 1)`

Available variants:
- `fadeIn`, `fadeInUp`, `fadeInDown`
- `slideInLeft`, `slideInRight`
- `brutalHover` (shadow offset effect)
- `staggerContainer` (children animations)
- `scrollReveal`

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- Focus visible states (4px primary outline)
- Skip to main content link
- Semantic HTML throughout

## File Structure

```
mattia_web/
├── app/
│   ├── fonts.ts           # Font configuration
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── providers/         # Context providers
│   └── ui/               # Design system components
├── lib/
│   ├── animations.ts      # Framer Motion variants
│   └── utils.ts           # Utility functions
└── tailwind.config.ts     # Tailwind configuration
```

## Development

Type checking:
```bash
npm run type-check
```

Linting:
```bash
npm run lint
```

Build:
```bash
npm run build
```

## Performance

- Target First Contentful Paint: <2s
- Target Interaction to Next Paint: <100ms
- Font display strategy: swap
- Image optimization: WebP format
- Code splitting: Route-based

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project - All rights reserved
