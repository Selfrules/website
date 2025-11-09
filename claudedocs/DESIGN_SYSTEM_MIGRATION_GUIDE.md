# Design System Migration Guide
**From**: Warm-Tone Palette → **To**: Cold-Tone Professional Palette
**Date**: 2025-11-08
**Version**: 2.0

---

## 🎯 Migration Overview

This guide helps developers migrate from the old warm-tone design system to the new professional cold-tone palette with enhanced accessibility features.

**Migration Status**: ✅ **COMPLETE** - All components updated
**Breaking Changes**: ❌ **NONE** - Fully backward compatible
**Action Required**: ⚠️ **RECOMMENDED** - Update custom components to use new variants

---

## 📊 What Changed

### Color Palette Migration

| Category | Old (v1.0) | New (v2.0) | Usage |
|----------|------------|------------|-------|
| **Primary** | Yellow #FFD93D | Electric Blue #1E90FF | Design/UX projects |
| **Secondary** | Purple #6C5CE7 | Slate Blue #6A7B9F | Development projects |
| **Accent** | - | Deep Navy #3E526A | PM/Strategy projects |
| **Alternative** | - | Teal #2A687A | Analytics/Tools |

### Visual Changes

| Element | Old (v1.0) | New (v2.0) | Migration |
|---------|------------|------------|-----------|
| **Border Radius** | 8-12px | 6-8px | Use `rounded-brutal` (6px) |
| **Borders** | 2-4px | 4-6px | Use `border-brutal` (4px) |
| **Shadows** | 6px offset | 8px offset | Use `shadow-brutal` (8px) |
| **Spacing** | Ad-hoc | 8pt grid | Use spacing scale 1-20 |

### New Features

- ✅ **Skip Links** - Keyboard navigation accessibility
- ✅ **Touch Targets** - 48×48px minimum on mobile
- ✅ **Reduced Motion** - User preference support
- ✅ **8pt Spacing Grid** - Systematic spacing scale
- ✅ **Component Variants** - Color-coded categorization

---

## 🔄 Migration Steps

### Step 1: Update Color References

#### Replace Hardcoded Colors
```tsx
// ❌ OLD - Hardcoded warm colors
<div className="bg-[#FFD93D] text-[#6C5CE7]">

// ✅ NEW - Use design tokens
<div className="bg-primary text-secondary">
```

#### Update Tailwind Classes
```tsx
// ❌ OLD - Yellow/Purple
bg-yellow-400 text-purple-600

// ✅ NEW - Electric Blue/Slate Blue
bg-primary text-secondary
```

#### Semantic Color Usage
```tsx
// Design/UX content
<Badge className="bg-primary">Figma</Badge>

// Development content
<Badge className="bg-secondary">React</Badge>

// PM/Strategy content
<Badge className="bg-accent">Roadmap</Badge>
```

---

### Step 2: Update Border Radius

#### Component Styling
```tsx
// ❌ OLD - 12px radius
className="rounded-lg"        // 12px
className="rounded-xl"        // 16px

// ✅ NEW - 6-8px radius
className="rounded-brutal"    // 6px (recommended)
className="rounded-brutal-lg" // 8px (large elements)
className="rounded-md"        // 6px (alternative)
```

#### Card Components
```tsx
// ❌ OLD
<Card className="rounded-lg">

// ✅ NEW
<Card className="rounded-brutal">
// OR use default (already has rounded-brutal)
<Card>
```

---

### Step 3: Adopt Spacing Grid

#### Before (Ad-hoc Spacing)
```tsx
// ❌ OLD - Random spacing values
<div className="p-5 m-7 gap-9">
```

#### After (8pt Grid)
```tsx
// ✅ NEW - Systematic 8pt grid
<div className="p-6 m-8 gap-10">
//           ↑    ↑     ↑
//          48px 64px  80px
//          (6×8) (8×8) (10×8)
```

#### Spacing Scale Reference
```
1  = 8px    (1 unit)
2  = 16px   (2 units)
3  = 24px   (3 units)
4  = 32px   (4 units)
5  = 40px   (5 units)
6  = 48px   (6 units)
8  = 64px   (8 units)
10 = 80px   (10 units)
12 = 96px   (12 units)
16 = 128px  (16 units)
20 = 160px  (20 units)
```

**Rule of Thumb**: Use multiples of 8px (1, 2, 3, 4, 6, 8, 10, 12, 16, 20)

---

### Step 4: Use Component Variants

#### Card Header Variants (NEW)
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// Design/UX projects - Electric Blue accent
<Card>
  <CardHeader variant="design">
    <CardTitle>Figma Component Library</CardTitle>
  </CardHeader>
  <CardContent>Design system work</CardContent>
</Card>

// Development projects - Slate Blue accent
<Card>
  <CardHeader variant="dev">
    <CardTitle>Next.js Migration</CardTitle>
  </CardHeader>
  <CardContent>Full-stack development</CardContent>
</Card>

// PM/Strategy projects - Deep Navy accent
<Card>
  <CardHeader variant="pm">
    <CardTitle>Q4 Product Roadmap</CardTitle>
  </CardHeader>
  <CardContent>Strategic planning</CardContent>
</Card>
```

**Visual Effect**:
- 4px left border in category color
- Subtle background tint (5% opacity light, 10% dark)
- Clear visual categorization

#### Badge Semantic Variants (NEW)
```tsx
import { Badge } from '@/components/ui/Badge';

// Before - Generic variants
<Badge variant="primary">Figma</Badge>
<Badge variant="secondary">React</Badge>

// After - Semantic variants
<Badge variant="design">Figma</Badge>     // Electric Blue
<Badge variant="dev">React</Badge>        // Slate Blue
<Badge variant="pm">Strategy</Badge>      // Deep Navy
<Badge variant="tool">Analytics</Badge>   // Teal
```

---

### Step 5: Implement Accessibility Features

#### Skip Links (Automatic)
Already implemented in `app/[locale]/layout.tsx`. No action required.

**Test**: Press Tab on page load → Skip link appears

#### Touch Targets (Automatic)
Already enforced via CSS for mobile devices. No action required.

**Verify**: All buttons/links ≥48×48px on mobile

#### Reduced Motion (Automatic)
Respects user preference automatically. No action required.

**Test**: DevTools → Rendering → Emulate prefers-reduced-motion

---

## 🛠️ Component-Specific Migrations

### Button Component

```tsx
// ❌ OLD - No size variants
<button className="px-6 py-3 bg-primary">

// ✅ NEW - Use size prop
import { Button } from '@/components/ui/Button';

<Button size="sm">Small</Button>    // 16×36px (compact)
<Button size="md">Medium</Button>   // 24×48px (default, meets touch target)
<Button size="lg">Large</Button>    // 32×56px (prominent)
<Button size="xl">XL</Button>       // 40×64px (hero CTA)
```

### Card Component

```tsx
// ❌ OLD - Manual styling
<div className="border-4 border-black shadow-[8px_8px_0px_#000] rounded-lg p-6">
  <h3 className="font-bold">Title</h3>
  <p>Content</p>
</div>

// ✅ NEW - Use Card components
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card hoverable>
  <CardHeader variant="design">
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

**Benefits**:
- Consistent styling
- Built-in hover/active states
- Color-coded categorization
- Type-safe props

### Badge Component

```tsx
// ❌ OLD - Inline styles
<span className="inline-flex px-3 py-1 bg-primary rounded-sm">
  Tag
</span>

// ✅ NEW - Use Badge component
import { Badge } from '@/components/ui/Badge';

<Badge variant="design" size="md">Figma</Badge>
<Badge variant="dev" size="sm">React</Badge>
<Badge variant="pm">Strategy</Badge>
```

### Input Component

```tsx
// ❌ OLD - Manual styling
<input
  className="border-4 border-black rounded-lg px-4 py-3"
  placeholder="Email"
/>

// ✅ NEW - Use Input component
import { Input } from '@/components/ui/Input';

<Input
  label="Email Address"
  placeholder="you@example.com"
  error={errors.email?.message}
  helperText="We'll never share your email"
/>
```

**Features**:
- Electric Blue focus state (WCAG compliant)
- Error state with red border/shadow
- Accessible labels and descriptions
- 6px border radius

---

## 📱 Responsive & Accessibility Testing

### Testing Checklist

#### Keyboard Navigation
- [ ] Press Tab on page load
- [ ] Skip link appears with Electric Blue background
- [ ] Press Enter → focus moves to main content
- [ ] All interactive elements focusable with visible indicator

#### Mobile Touch Targets
- [ ] Open Chrome DevTools → Toggle device toolbar
- [ ] Select iPhone/iPad device
- [ ] Verify all buttons/links ≥48×48px
- [ ] Test tap accuracy on small screens

#### Reduced Motion
- [ ] DevTools → Rendering → Emulate prefers-reduced-motion: reduce
- [ ] All animations disabled/instant
- [ ] Focus indicators still visible
- [ ] Site fully functional without motion

#### Color Contrast
- [ ] Use axe DevTools or similar
- [ ] All text ≥4.5:1 contrast (WCAG AA)
- [ ] Test both light and dark modes
- [ ] Color-blind simulation (protanopia, deuteranopia, tritanopia)

---

## 🚨 Common Migration Issues

### Issue 1: Yellow/Purple Colors Still Visible

**Problem**: Old warm colors appear in custom components

**Solution**:
```bash
# Search for hardcoded color references
grep -r "#FFD93D" components/
grep -r "#6C5CE7" components/
grep -r "bg-yellow" components/
grep -r "bg-purple" components/

# Replace with design tokens
# Yellow → bg-primary (Electric Blue)
# Purple → bg-secondary (Slate Blue)
```

### Issue 2: Border Radius Too Large

**Problem**: Cards/buttons look rounded (12px radius)

**Solution**:
```tsx
// Find instances
grep -r "rounded-lg" components/
grep -r "rounded-xl" components/

// Replace
rounded-lg → rounded-brutal (6px)
rounded-xl → rounded-brutal-lg (8px)
```

### Issue 3: Inconsistent Spacing

**Problem**: Random spacing values (5px, 7px, 9px)

**Solution**:
```tsx
// Use 8pt grid multiples
p-5 → p-6   (40px → 48px)
m-7 → m-8   (28px → 64px)
gap-9 → gap-10 (36px → 80px)

// Round to nearest 8pt grid value
```

### Issue 4: Missing Touch Targets on Mobile

**Problem**: Buttons too small (<48px) on mobile

**Solution**:
```tsx
// Use Button component with size prop
<Button size="md">Click</Button>  // Default 48px height

// OR enforce minimum
className="min-w-[48px] min-h-[48px]"
```

---

## 📊 Migration Verification

### Before Migration Checklist
- [ ] Read this migration guide completely
- [ ] Review component inventory
- [ ] Identify hardcoded colors
- [ ] Create feature branch
- [ ] Backup current state

### During Migration
- [ ] Update colors to design tokens
- [ ] Adjust border radius to 6-8px
- [ ] Adopt 8pt spacing grid
- [ ] Use component variants where applicable
- [ ] Test on multiple devices/browsers

### After Migration
- [ ] Run accessibility audit (axe DevTools)
- [ ] Test keyboard navigation
- [ ] Verify mobile touch targets
- [ ] Check reduced motion support
- [ ] Visual regression testing
- [ ] Update Storybook examples

---

## 🎨 Design Token Reference

### Colors
```typescript
// Primary - Electric Blue (Design/UX)
primary.DEFAULT: '#1E90FF'
primary.light: '#5CB3FF'
primary.dark: '#1873CC'

// Secondary - Slate Blue (Development)
secondary.DEFAULT: '#6A7B9F'
secondary.light: '#8B9FBA'
secondary.dark: '#4F5F7F'

// Accent - Deep Navy (PM/Strategy)
accent.DEFAULT: '#3E526A'
accent.light: '#5A7088'
accent.dark: '#2D3C4F'

// Alternative - Teal (Analytics/Tools)
alternative.teal: '#2A687A'
alternative.steel: '#6B7280'
alternative.ice: '#B8D4E8'
```

### Border Radius
```typescript
'sm': '4px'          // Small elements
'DEFAULT': '6px'     // Standard (recommended)
'md': '6px'          // Medium
'lg': '8px'          // Large
'brutal': '6px'      // Brutalist default
'brutal-sm': '4px'   // Brutalist small
'brutal-lg': '8px'   // Brutalist large
```

### Shadows
```typescript
'brutal': '8px 8px 0px #000000'       // Default
'brutal-sm': '4px 4px 0px #000000'    // Small
'brutal-lg': '12px 12px 0px #000000'  // Large
'brutal-hover': '12px 12px 0px #000000'
'brutal-active': '4px 4px 0px #000000'
```

### Text Shadows
```typescript
'hard': '6px 6px 0 #000'      // Default
'hard-sm': '4px 4px 0 #000'   // Small
'hard-lg': '8px 8px 0 #000'   // Large
```

---

## 💡 Best Practices

### Do's ✅
- Use design tokens (`bg-primary`) instead of hardcoded colors
- Adopt 8pt spacing grid for consistency
- Use component variants for categorization
- Test accessibility with real users
- Maintain WCAG AA compliance (≥4.5:1 contrast)
- Document custom components with Storybook

### Don'ts ❌
- Don't hardcode color values (`#1E90FF`)
- Don't use random spacing values (5px, 7px, 9px)
- Don't ignore reduced motion preferences
- Don't create touch targets <48×48px on mobile
- Don't skip accessibility testing
- Don't mix old and new design tokens

---

## 📚 Additional Resources

### Documentation
- `new-DESIGN_SYSTEM.md` - Complete specification
- `DESIGN_SYSTEM_COMPLETE_VERIFICATION.md` - Implementation verification
- `FASE1-2-IMPLEMENTATION-REPORT.md` - Implementation details
- `CLAUDE.md` - Updated developer guide

### Tools
- **axe DevTools** - Accessibility testing
- **Chromatic** - Visual regression testing
- **Storybook** - Component documentation
- **Lighthouse** - Performance & accessibility audits

### Support
- GitHub Issues: Tag with `design-system` label
- Slack: #design-system channel
- Documentation: `/claudedocs` folder

---

## 🎉 Migration Complete!

Once you've completed all steps:

1. ✅ Run full test suite
2. ✅ Perform accessibility audit
3. ✅ Visual regression testing
4. ✅ Cross-browser verification
5. ✅ Update Storybook examples
6. ✅ Deploy to staging
7. ✅ QA approval
8. ✅ Deploy to production

**Congratulations!** Your components are now using the professional cold-tone design system with full WCAG AA compliance.

---

**Migration Guide Version**: 1.0
**Last Updated**: 2025-11-08
**Maintainer**: Design System Team
**Questions?** Open an issue or contact the team
