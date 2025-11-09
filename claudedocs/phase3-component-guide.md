# Phase 3 Component Redesigns - Quick Reference Guide

## Component Usage Examples

### 1. SkillsMatrix Component

#### Import
```tsx
import SkillsMatrix from '@/components/sections/SkillsMatrix';
```

#### Usage
```tsx
<SkillsMatrix
  animated={true}      // Optional: default true
  delay={0.6}          // Optional: animation delay
  className="mt-12"    // Optional: additional classes
/>
```

#### Features
- **Desktop**: Static grid display, 2-3 columns
- **Mobile**: Expandable accordion cards
- **NO** hover effects
- **NO** percentages
- 6 skill categories with icons
- SEO-friendly semantic HTML

---

### 2. CertificationsSection Component

#### Import
```tsx
import CertificationsSection from '@/components/sections/CertificationsSection';
import { CertificationData } from '@/components/ui/CertificationBadge';
```

#### Data Structure
```tsx
const certifications: CertificationData[] = [
  {
    id: '1',
    title: 'AI for Product',
    tagline: 'Because the future is augmented, not replaced',
    issuer: 'Reforge',
    date: '2024',
    icon: <Brain className="w-6 h-6 text-primary" />,
    credentialId: 'ABC123',           // Optional
    verificationUrl: 'https://...',   // Optional
  },
  // ...
];
```

#### Usage
```tsx
<CertificationsSection
  certifications={certifications}
  title="Certifications & Credentials"
  subtitle="Continuous learning is part of the journey"
  animated={true}
  delay={0.7}
/>
```

#### Features
- **Desktop**: Grid of compact cards (h-48, ~192px)
- **Mobile**: Single expandable card showing all certs
- Click card → Opens modal
- Modal does NOT show blockchain verification
- Optional external link button

---

### 3. Testimonial + TestimonialModal

#### Import
```tsx
import Testimonial, { TestimonialData } from '@/components/ui/Testimonial';
import TestimonialModal from '@/components/ui/TestimonialModal';
```

#### Data Structure
```tsx
const testimonialData: TestimonialData = {
  id: '1',
  quote: 'Full testimonial text here...',
  author: 'Sarah Chen',
  role: 'Founder & CEO',
  company: 'TechFlow AI',
  verified: true,  // Optional
};
```

#### Usage
```tsx
function TestimonialsSection() {
  const [selected, setSelected] = useState<TestimonialData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (testimonial: TestimonialData) => {
    setSelected(testimonial);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Testimonial
          testimonial={testimonialData}
          onClick={() => handleClick(testimonialData)}
          animated={true}
          delay={0.3}
        />
      </div>

      <TestimonialModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        testimonial={selected}
      />
    </>
  );
}
```

#### Features
- **All cards**: Fixed height h-64 (256px)
- Text truncated to 4 lines (line-clamp-4)
- "Read full testimonial →" indicator
- Click → Opens modal with full content
- Modal shows: full quote, name, role, company
- Verified badge if applicable

---

## Responsive Breakpoints

### Tailwind Breakpoints Used
```tsx
// Mobile: < 768px (base styles)
// Tablet: >= 768px (md:)
// Desktop: >= 1024px (lg:)
```

### Component Breakpoints

#### SkillsMatrix
```tsx
// Desktop
<div className="hidden md:block">
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Static cards */}
  </div>
</div>

// Mobile
<div className="md:hidden space-y-4">
  {/* Accordion cards */}
</div>
```

#### CertificationsSection
```tsx
// Desktop
<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Certification cards */}
</div>

// Mobile
<div className="md:hidden">
  {/* Single expandable card */}
</div>
```

#### Testimonials
```tsx
// All devices (just columns change)
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Uniform height cards */}
</div>
```

---

## Animation Patterns

### Scroll-triggered Animations
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.4, delay: 0.1 }}
>
  {/* Content */}
</motion.div>
```

### Expand/Collapse Accordion
```tsx
<AnimatePresence>
  {isExpanded && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Expandable content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Icon Rotation
```tsx
<motion.div
  animate={{ rotate: isExpanded ? 180 : 0 }}
  transition={{ duration: 0.3 }}
>
  <ChevronDown className="w-5 h-5" />
</motion.div>
```

### Modal Entry
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.9, y: 20 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
>
  {/* Modal content */}
</motion.div>
```

---

## Styling Patterns

### Neobrutalist Card
```tsx
className="brutal-card p-6"
// Defined in global styles:
// .brutal-card {
//   border: 4px solid black;
//   border-radius: 8px;
//   box-shadow: 8px 8px 0px #000000;
// }
```

### Neobrutalist Button
```tsx
className="border-4 border-black rounded-brutal shadow-brutal
           hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1
           transition-all"
```

### Icon Badge
```tsx
<div className="p-2 bg-primary/20 border-2 border-primary rounded-brutal">
  <Icon className="w-4 h-4 text-primary" />
</div>
```

### Text Truncation
```tsx
<p className="line-clamp-2">
  {/* Text will truncate to 2 lines with ellipsis */}
</p>

<p className="line-clamp-4">
  {/* Text will truncate to 4 lines with ellipsis */}
</p>
```

### Fixed Height with Flex
```tsx
<div className="h-64 flex flex-col">
  <div className="mb-auto">{/* Top content */}</div>
  <div>{/* Bottom content (always at bottom) */}</div>
</div>
```

---

## Accessibility Patterns

### Accordion Button
```tsx
<button
  onClick={handleToggle}
  aria-expanded={isExpanded}
  aria-controls="content-id"
  className="w-full text-left"
>
  <div className="flex items-center justify-between">
    <span>Category Name</span>
    <ChevronDown />
  </div>
</button>

<div id="content-id">
  {/* Expandable content */}
</div>
```

### Modal Close Button
```tsx
<button
  onClick={onClose}
  aria-label="Close modal"
  className="p-2 hover:bg-gray-100 rounded-brutal"
>
  <X className="w-6 h-6" />
</button>
```

### Semantic Structure
```tsx
<article>           {/* Skill category */}
  <header>          {/* Category header */}
    <h3>Title</h3>
  </header>
  <div>             {/* Content */}
    <span>Skill</span>
  </div>
</article>
```

---

## Common Issues & Solutions

### Issue: Card heights not uniform
**Solution**: Use fixed height class
```tsx
// ❌ Wrong
className="p-6"

// ✅ Correct
className="h-64 p-6 flex flex-col"
```

### Issue: Bottom content not aligned
**Solution**: Use flex with `mb-auto`
```tsx
<div className="flex flex-col">
  <div className="mb-auto">{/* Top */}</div>
  <div>{/* Bottom - always at bottom */}</div>
</div>
```

### Issue: Text overflow breaking layout
**Solution**: Use line-clamp
```tsx
// ❌ Wrong
<p>{longText}</p>

// ✅ Correct
<p className="line-clamp-4">{longText}</p>
```

### Issue: Accordion not smooth
**Solution**: Use AnimatePresence with height: auto
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
    >
      {content}
    </motion.div>
  )}
</AnimatePresence>
```

### Issue: Mobile accordion visible on desktop
**Solution**: Use responsive display classes
```tsx
// Desktop only
<div className="hidden md:block">...</div>

// Mobile only
<div className="md:hidden">...</div>
```

---

## Testing Checklist

### Visual Testing
- [ ] Desktop (1920px): All cards visible, proper grid
- [ ] Tablet (768px): 2 columns, proper spacing
- [ ] Mobile (375px): Single column, accordions work
- [ ] Dark mode: All colors appropriate
- [ ] Hover states: Shadows and translations work

### Functional Testing
- [ ] Click certification → Modal opens
- [ ] Click testimonial → Modal opens
- [ ] Modal close button works
- [ ] Click backdrop → Modal closes
- [ ] Accordion expand/collapse smooth
- [ ] Only one skill category open at a time (mobile)

### Accessibility Testing
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals
- [ ] Screen reader announces headings
- [ ] ARIA expanded states correct
- [ ] Focus visible on all elements

### Performance Testing
- [ ] Animations smooth (60fps)
- [ ] No layout shift on load
- [ ] Modal doesn't lag
- [ ] Accordion height animation smooth
- [ ] No console errors

---

## Migration Guide

### From Old SkillsRadarChart
```tsx
// ❌ Old
import SkillsRadarChart from '@/components/charts/SkillsRadarChart';
<SkillsRadarChart animated delay={0.6} />

// ✅ New
import SkillsMatrix from '@/components/sections/SkillsMatrix';
<SkillsMatrix animated delay={0.6} />
```

### From Old Certifications
```tsx
// ❌ Old
const [selected, setSelected] = useState<CertificationData | null>(null);
const [isOpen, setIsOpen] = useState(false);

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {certs.map(cert => (
    <CertificationBadge
      cert={cert}
      onClick={() => {
        setSelected(cert);
        setIsOpen(true);
      }}
    />
  ))}
</div>
<CertificationModal isOpen={isOpen} onClose={...} cert={selected} />

// ✅ New
<CertificationsSection
  certifications={certs}
  title="Certifications"
  subtitle="Continuous learning"
  animated
  delay={0.7}
/>
```

### From Old Testimonials
```tsx
// ❌ Old (no click, different heights)
<Testimonial testimonial={data} />

// ✅ New (uniform height, clickable, modal)
const [selected, setSelected] = useState<TestimonialData | null>(null);
const [isOpen, setIsOpen] = useState(false);

<Testimonial
  testimonial={data}
  onClick={() => {
    setSelected(data);
    setIsOpen(true);
  }}
/>
<TestimonialModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  testimonial={selected}
/>
```

---

## Color Reference

### Primary Colors
```tsx
bg-primary           // #FFD93D (yellow)
border-primary
text-primary

bg-secondary         // #6C5CE7 (purple)
border-secondary
text-secondary

bg-accent           // Accent color
border-accent
text-accent
```

### Brutalist Colors
```tsx
border-black                    // Always black borders
shadow-brutal                   // 8px 8px 0px #000000
shadow-brutal-hover             // 12px 12px 0px #000000

bg-brutalist-surface-dark       // Dark mode surface
text-brutalist-text-light       // Light mode text
text-brutalist-text-dark        // Dark mode text
border-brutalist-border         // Neutral border
```

### Semantic Colors
```tsx
bg-green-500         // Verified badges
text-white           // On green background

bg-yellow-100        // Warning backgrounds
border-yellow-500    // Warning borders
text-yellow-800      // Warning text
```

---

## Performance Tips

### 1. Avoid Re-renders
```tsx
// ❌ Creates new function every render
onClick={() => handleClick(data)}

// ✅ Use useCallback for frequently rendered items
const handleClick = useCallback(() => handleClick(data), [data]);
onClick={handleClick}
```

### 2. Optimize Animations
```tsx
// ✅ Use once: true to prevent re-animation
viewport={{ once: true, amount: 0.3 }}

// ✅ Use CSS transforms (GPU accelerated)
hover:-translate-x-1 hover:-translate-y-1

// ❌ Avoid animating position/margin/padding
```

### 3. Lazy Load Modals
```tsx
// ✅ Only render when open
{isModalOpen && (
  <TestimonialModal ... />
)}

// ❌ Always render (hidden)
<TestimonialModal isOpen={isModalOpen} ... />
```

### 4. Optimize Images (future)
```tsx
// When adding certificate images:
import Image from 'next/image';

<Image
  src="/certs/cert1.jpg"
  alt="Certificate name"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

---

## Future Enhancements

### Add Skill Filtering
```tsx
const [filter, setFilter] = useState<string | null>(null);

<select onChange={(e) => setFilter(e.target.value)}>
  <option value="">All Skills</option>
  <option value="frontend">Frontend</option>
  <option value="backend">Backend</option>
</select>

{skillCategories
  .filter(cat => !filter || cat.id === filter)
  .map(cat => <SkillCard key={cat.id} {...cat} />)}
```

### Add Certificate Images
```tsx
interface CertificationData {
  // ... existing
  imageUrl?: string;
}

// In modal:
{certification.imageUrl && (
  <Image
    src={certification.imageUrl}
    alt={certification.title}
    width={800}
    height={600}
    className="rounded-brutal border-4 border-black"
  />
)}
```

### Add Testimonial Photos
```tsx
interface TestimonialData {
  // ... existing
  photoUrl?: string;
}

// In modal:
{testimonial.photoUrl && (
  <Image
    src={testimonial.photoUrl}
    alt={testimonial.author}
    width={100}
    height={100}
    className="rounded-full border-4 border-black"
  />
)}
```

---

**Last Updated**: 2025-11-08
**Version**: 1.0
**Status**: Production Ready
