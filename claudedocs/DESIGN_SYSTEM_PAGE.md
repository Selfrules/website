# Design System Showcase Page

Comprehensive interactive design system documentation page for Mattia's portfolio.

## Overview

**Route**: `/design-system` (localized: `/en/design-system` or `/it/design-system`)

**Purpose**: Live demonstration of all UI components with interactive previews, code examples, and complete design token documentation.

**Target Audience**: Developers and designers evaluating the neobrutalist design system for their projects.

## File Structure

```
app/[locale]/design-system/
├── page.tsx              # Main showcase page with all sections
├── layout.tsx            # Metadata and SEO configuration

components/design-system/
├── ComponentShowcase.tsx # Reusable component showcase container
├── DesignTokens.tsx      # Design token display components
└── index.ts              # Barrel exports for easier imports
```

## Key Features

### 1. Component Showcase System

**ComponentShowcase Component** (`components/design-system/ComponentShowcase.tsx`)

Features:
- **Preview/Code Tabs**: Toggle between live preview and syntax-highlighted code
- **Props Table**: Automatically generated props documentation
- **Variant Display**: Grid of component variants (sizes, colors, states)
- **Copy to Clipboard**: One-click code copying with success feedback
- **Syntax Highlighting**: Uses `react-syntax-highlighter` with `oneDark` theme

Props:
```typescript
interface ComponentShowcaseProps {
  title: string;                    // Component name
  description: string;               // Brief description
  component: React.ReactNode;        // Live preview component
  code: string;                      // Code snippet to display
  props?: PropDefinition[];          // Props documentation
  variants?: Array<{                 // Component variants
    label: string;
    component: React.ReactNode;
  }>;
  className?: string;
}
```

### 2. Design Tokens Display

**Color Swatches** (`ColorSwatch`)
- Visual color preview with hover effects
- Hex value display
- Usage guidelines
- Automatic text color contrast

**Typography Scale** (`TypeScale`)
- Font family, size, weight, line-height
- Live text example
- Usage context badges

**Shadow Examples** (`ShadowExample`)
- Visual shadow preview
- CSS value display
- Usage context

**Spacing Scale** (`SpacingScale`)
- Visual bar representing size
- Rem/px value display
- Consistent spacing system

**Border Radius** (`BorderRadius`)
- Visual preview with different radii
- Value display
- Tailwind class reference

### 3. Search and Filter

**Search Bar**:
- Real-time component search
- Searches titles and descriptions
- Persistent state during browsing

**Category Filters**:
- All Components
- Colors (design tokens)
- Typography (type scale, spacing)
- Components (interactive UI elements)

Categories are represented by icons:
- Package: All Components
- Palette: Colors
- Type: Typography
- Zap: Components

### 4. Page Sections

#### Hero Section
- Neobrutalist design system introduction
- Search bar for quick component lookup
- Category filter buttons

#### Design Principles
- 4 core principles in card grid:
  - Bold borders (4-6px solid black)
  - Hard shadows (8px offset, no blur)
  - Vibrant colors (high contrast)
  - Clear hierarchy (obvious interactive elements)

#### Color System
- 9 color swatches (Primary, Secondary, Accent with light/dark variants)
- 4 shadow examples (brutal, brutal-hover, brutal-active, brutal-sm)
- 4 border radius options (brutal, brutal-sm, brutal-lg, full)

#### Typography System
- 10 type scales (display-1 to body-sm)
- Font family indicators (Space Grotesk, Inter, JetBrains Mono)
- 9 spacing scale examples (space-1 to space-20)

#### Component Library
- Button component (5 variants, 4 sizes)
- Card component (4 variants, hoverable/clickable)
- Input component (with validation and helper text)
- Badge component (5 variants, 3 sizes)

Each component showcase includes:
- Live interactive preview
- Syntax-highlighted code
- Complete props table
- Visual variant grid

#### Getting Started
- Installation instructions
- Basic usage examples
- Quick start code snippets

## Component Showcases

### Button Component
```tsx
<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary" size="md">Secondary action</Button>
<Button variant="accent" size="md">Alert action</Button>
```

**Variants**: primary | secondary | accent | outline | ghost
**Sizes**: sm | md | lg | xl

### Card Component
```tsx
<Card hoverable>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
</Card>
```

**Variants**: default | primary | secondary | accent
**Props**: hoverable, clickable

### Input Component
```tsx
<Input
  label="Email address"
  type="email"
  placeholder="your@email.com"
  helperText="Helper text"
  error="Error message"
/>
```

**Props**: label, error, helperText, type

### Badge Component
```tsx
<Badge variant="primary">New</Badge>
<Badge variant="secondary">Popular</Badge>
```

**Variants**: default | primary | secondary | accent | outline
**Sizes**: sm | md | lg

## Technical Implementation

### Syntax Highlighting
- Package: `react-syntax-highlighter`
- Theme: `oneDark` (dark mode optimized)
- Language: TypeScript/TSX
- Features: Line numbers, custom styling

### Copy to Clipboard
- Native `navigator.clipboard.writeText()` API
- Success feedback with icon change (Copy → Check)
- 2-second timeout for feedback reset
- Error handling for unsupported browsers

### Animations
- Framer Motion for page entrance animations
- `fadeInUp` for sequential reveals
- `staggerContainer` for coordinated animations
- Smooth transitions between tabs (Preview/Code)

### Responsive Design
- Mobile-first approach
- Grid layouts adapt: 1 column → 2 → 3 → 4
- Search bar full width on mobile
- Category filters wrap on small screens
- Component previews stack vertically on mobile

### Performance Optimizations
- `useMemo` for filtered component list
- Lazy rendering of code blocks (only when Code tab active)
- Efficient search with `toLowerCase()` caching
- Minimal re-renders with proper React keys

## SEO and Metadata

**Metadata** (`app/[locale]/design-system/layout.tsx`):
```typescript
{
  title: 'Design System - Neobrutalist Components',
  description: 'Interactive design system showcase featuring neobrutalist UI components, color palette, typography scale, and code examples for developers.',
  openGraph: {
    title: 'Design System - Neobrutalist Components',
    description: 'Explore the complete neobrutalist design system...',
    type: 'website',
  },
}
```

## Accessibility

### Keyboard Navigation
- All interactive elements focusable
- Tab order follows visual hierarchy
- Focus visible on all elements

### Screen Reader Support
- Semantic HTML throughout
- ARIA labels on icon-only buttons
- Component descriptions for context

### Color Contrast
- All text meets WCAG AA standards
- Primary yellow: 17:1 contrast ratio on light
- Dark mode: 16:1 contrast ratio

### Interactive Elements
- Minimum 44x44px touch targets
- Clear focus indicators
- Hover states for visual feedback

## Usage Examples

### Adding New Component Showcase

```tsx
const newComponentShowcase = {
  title: 'New Component',
  description: 'Description of the component',
  category: 'components',
  component: (
    <NewComponent variant="primary" />
  ),
  code: `import { NewComponent } from '@/components/ui/NewComponent';

<NewComponent variant="primary" />`,
  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary'",
      default: "'primary'",
      description: 'Component style variant',
      required: false,
    },
  ],
  variants: [
    { label: 'Primary', component: <NewComponent variant="primary" /> },
    { label: 'Secondary', component: <NewComponent variant="secondary" /> },
  ],
};

// Add to componentShowcases array
```

### Using ComponentShowcase Directly

```tsx
import { ComponentShowcase } from '@/components/design-system';

<ComponentShowcase
  title="Custom Component"
  description="My custom component showcase"
  component={<MyComponent />}
  code={myComponentCode}
  props={myComponentProps}
/>
```

## Design System Integration

This page serves as the **single source of truth** for the design system:

1. **Component Documentation**: Live examples replace static documentation
2. **Design Tokens**: Visual reference for colors, typography, spacing
3. **Code Examples**: Copy-paste ready code snippets
4. **Props Reference**: Complete API documentation

## Future Enhancements

Potential improvements:
- [ ] Interactive props playground (adjust props in real-time)
- [ ] Responsive preview toggle (mobile/tablet/desktop views)
- [ ] Dark/light mode preview toggle
- [ ] Export components as code sandbox
- [ ] Accessibility checker for custom implementations
- [ ] Performance metrics for each component
- [ ] Component usage statistics from codebase
- [ ] Version history and changelog

## Dependencies

```json
{
  "react-syntax-highlighter": "^15.x",
  "@types/react-syntax-highlighter": "^15.x",
  "framer-motion": "^11.x",
  "lucide-react": "^0.x"
}
```

## Performance Metrics

Target metrics:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2s
- Largest Contentful Paint: < 2s
- Total Bundle Size: < 200KB (gzipped)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Documentation

- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) - Complete design system documentation
- [CLAUDE.md](../CLAUDE.md) - Project overview and guidelines
- Component source files in `components/ui/`

## Maintenance

**Update Frequency**:
- Add new components immediately after creation
- Review design tokens quarterly
- Update code examples when APIs change
- Verify accessibility annually

**Quality Checks**:
- Run Lighthouse CI on page changes
- Verify all code examples compile
- Test keyboard navigation
- Validate props tables match component types
