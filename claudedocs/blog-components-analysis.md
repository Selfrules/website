# Blog Components Analysis - Designprototipo Repository

**Analysis Date:** 2025-11-14
**Repository:** https://github.com/Selfrules/Designprototipo
**Branch:** main

---

## Summary

Three blog components fetched from the Designprototipo repository:
1. **BlogSection.tsx** - Homepage blog section (7323 bytes)
2. **BlogPage.tsx** - Blog listing page with filters (14854 bytes)
3. **BlogArticle.tsx** - Individual article template (39771 bytes)

All components use a **neobrutalist design system** with hard-coded colors, spacing, and typography values that need to be mapped to the design tokens defined in `C:\Users\Utente\Desktop\selfrules\mattia_web\tailwind.config.ts`.

---

## Component 1: BlogSection.tsx

### Overview
- **Size:** 7323 bytes
- **Purpose:** Homepage section displaying featured + regular blog posts
- **Layout:** Responsive grid (1 col mobile → 3 cols desktop)

### Key Colors Used
```typescript
// Featured post gradient
from-[#0D7EFF] via-[#7209B7] to-[#FF006E]

// Background
bg-[#FFFCF2]  // Cream background

// Borders
border-[#000]  // Black borders

// Category badges (dynamic per post)
#FF006E  // Neon Pink (Product category)
#7209B7  // Deep Purple (Strategy category)
#0D7EFF  // Electric Blue (OKRs category)

// CTA Button
bg-[#FFD60A]  // Cyber Yellow
text-[#0A0A0A]  // Black text on yellow

// Text colors
text-[#2D2D2D]  // Body text
text-[#6B7280]  // Muted text (meta info)
```

### Spacing & Layout
```
// Padding
py-16 md:py-24     // Section vertical padding
px-5 md:px-8       // Container horizontal padding
p-6 md:p-10        // Featured card padding
p-6                // Regular card padding

// Gaps
gap-6 md:gap-8     // Grid gap
gap-4              // Meta info gap

// Min heights
min-h-[300px] md:min-h-[350px]  // Featured card

// Border radius
rounded-lg         // All cards (needs mapping to rounded-brutal)

// Borders
border-4           // Thick brutalist borders
border-b-4         // Section bottom border

// Shadows
shadow-brutal      // Standard shadow
shadow-brutal-lg   // Large shadow on hover
```

### Typography
```typescript
// Headings
text-h1            // Section title
text-h2 md:text-h1 // Featured post title
text-body          // Regular post title

// Body text
text-body          // Description
text-body-small md:text-body  // Featured excerpt
text-body-small    // Meta info
text-sm            // Button text

// Font families (inline styles)
fontFamily: 'Space Grotesk, sans-serif'  // Headings, buttons
fontFamily: 'Space Mono, monospace'      // Category badges
fontFamily: 'Inter, sans-serif'          // Body text

// Font weights
fontWeight: 700    // Bold (badges, buttons, titles)
```

### Dependencies
```typescript
import { NeoBadge } from './NeoBadge';
import { Clock, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
```

### Animation Patterns
```
hover:-translate-y-1       // Featured card lift
hover:shadow-brutal-lg     // Shadow increase
hover:-translate-y-2       // Regular card lift
hover:translate-x-1        // Arrow icon slide
transition-all duration-300
```

### Component Structure
```typescript
interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  date: string;
  color: string;        // Dynamic hex color per category
  featured?: boolean;
}

interface BlogSectionProps {
  onArticleClick?: (article: BlogPost) => void;
  onViewAllClick?: () => void;
}
```

### Design Token Mapping Requirements

| Current Hard-Coded | Should Use Design Token | Notes |
|--------------------|-------------------------|-------|
| `bg-[#FFFCF2]` | `bg-cream` | Already defined |
| `border-[#000]` | `border-black` | Already defined |
| `#0D7EFF` | `bg-electric-blue` | Update from #1E90FF to #0D7EFF |
| `#7209B7` | `bg-deep-purple` | Already defined |
| `#FF006E` | `bg-neon-pink` | Already defined |
| `#FFD60A` | `bg-cyber-yellow` | Already defined |
| `rounded-lg` | `rounded-brutal` | Consistency |
| `shadow-brutal` | Already correct | ✓ |
| `border-4` | `border-brutal` | Consistency |

---

## Component 2: BlogPage.tsx

### Overview
- **Size:** 14854 bytes
- **Purpose:** Full blog listing page with search and category filters
- **Features:** Search bar, category filter chips, pagination-style grid

### Key Colors Used
```typescript
// Hero gradient
from-[#0D7EFF] via-[#7209B7] to-[#FF006E]

// Backgrounds
bg-[#FFFCF2]  // Page background
bg-white      // Card backgrounds

// Category filter chips (active state)
backgroundColor: categoryColor (dynamic: #0D7EFF, #7209B7, #FF006E, #FFD60A)
text-white    // Active chip text

// CTA sections
bg-[#FFD60A]  // Yellow callout box
bg-[#0A0A0A]  // Black contact button
text-white

// Search bar
bg-white
border-[#000]
text-[#0A0A0A]

// Muted colors
text-[#6B7280]  // Meta info, placeholders
text-[#2D2D2D]  // Regular text
```

### Spacing & Layout
```
// Hero section
py-16 md:py-24

// Container
max-w-[1200px]
px-6 md:px-8

// Search bar
px-12 py-4       // Large input padding
pl-12 pr-12      // Icon spacing

// Filter chips
px-5 py-2.5

// Cards grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
gap-6 md:gap-8

// Card internals
p-6              // Card padding
mb-4             // Badge margin
gap-3            // Meta info gap

// CTA callout
p-8 md:p-12      // Large padding
-rotate-1        // Brutalist tilt
```

### New Features Not in BlogSection
1. **Search Input**
   - Icon positioning with absolute/relative
   - Clear button (X icon)
   - Focus states: `focus:shadow-brutal-lg`

2. **Category Filter Chips**
   - Active/inactive states
   - Dynamic color mapping from post colors
   - Post count per category

3. **Empty State**
   - Search icon illustration
   - "Reset filters" button
   - Helpful messaging

4. **Featured Badge**
   - Yellow star badge on featured articles
   - Different badge style than category badge

5. **Back Navigation**
   - Breadcrumb-style navigation
   - Arrow icon
   - Hover states

### Component Structure
```typescript
interface BlogPageProps {
  onArticleClick: (article: BlogPost) => void;
  onBackToHome: () => void;
}

// State management
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState<string>('All');

// Filtering logic
const filteredPosts = useMemo(() => {
  return allBlogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}, [searchQuery, selectedCategory]);
```

### Design Token Mapping Requirements

| Current Hard-Coded | Should Use Design Token | Priority |
|--------------------|-------------------------|----------|
| All colors from BlogSection | Same mappings | High |
| `rounded-lg` → `rounded-brutal` | Consistency | High |
| `px-5 py-2.5` filter chips | `p-brutal-sm`? | Medium |
| `p-8 md:p-12` CTA | `p-brutal-lg` `md:p-brutal-xl` | Medium |
| Inline styles for fonts | Use `font-` classes | High |

---

## Component 3: BlogArticle.tsx

### Overview
- **Size:** 39771 bytes (LARGEST component)
- **Purpose:** Full article view with ToC, reading progress, share buttons
- **Features:**
  - Reading progress bar
  - Sticky ToC sidebar
  - Share menu (Twitter, LinkedIn, Copy)
  - Related articles carousel
  - Scroll spy for ToC active states

### Key Colors Used
```typescript
// Progress bar gradient
from-[#0D7EFF] via-[#7209B7] to-[#FF006E]

// Header sticky
bg-[#FFFCF2]

// ToC active state
bg-[#0D7EFF]      // Active section highlight
text-white

// Share buttons
bg-[#1DA1F2]      // Twitter blue
bg-[#0A66C2]      // LinkedIn blue
bg-white          // Copy link button

// Callout boxes
bg-[#FFD60A]      // Insight callout (yellow)
bg-[#FFFCF2]      // Neutral callout (cream)
bg-white          // Standard cards

// Article text
text-[#0A0A0A]    // Headings
text-[#2D2D2D]    // Body text
text-[#6B7280]    // Muted/meta

// Highlights/accents
text-[#0D7EFF]    // Blue highlights
text-[#FF006E]    // Pink highlights
text-[#7209B7]    // Purple highlights
```

### Spacing & Layout
```
// Sticky header
sticky top-0
py-4

// Reading progress bar
fixed top-0 h-1

// Container
max-w-[1200px]
px-6 md:px-8
py-8 md:py-12

// Grid layout
grid grid-cols-1 lg:grid-cols-12
gap-8 lg:gap-12

// Sidebar
lg:col-span-3
sticky top-28    // Below header

// Main content
lg:col-span-9

// Article sections
mb-16            // Section spacing
mb-10            // Sub-section spacing
mb-6             // Paragraph spacing
leading-relaxed  // Comfortable reading

// Callouts
p-6              // Standard callout
p-5              // ToC/sidebar cards
-rotate-1        // Tilt effect
hover:rotate-0   // Straighten on hover

// Stats grid
grid grid-cols-3
gap-4
```

### New Features Not in Previous Components

1. **Reading Progress Bar**
```typescript
useEffect(() => {
  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setReadingProgress(scrolled);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

2. **Table of Contents with Scroll Spy**
```typescript
interface TableOfContentItem {
  id: string;
  title: string;
  level: number;  // 1 = h2, 2 = h3
}

// Active section tracking
const [activeSection, setActiveSection] = useState<string>('');

// Smooth scroll to section
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
  }
};
```

3. **Share Menu**
```typescript
const [showShareMenu, setShowShareMenu] = useState(false);

const handleShare = (platform: string) => {
  const urls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  if (platform === 'copy') {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copiato negli appunti!');
  } else if (urls[platform]) {
    window.open(urls[platform], '_blank', 'width=600,height=400');
  }
  setShowShareMenu(false);
};
```

4. **Insight Callout Box**
```tsx
<div className="bg-[#FFD60A] border-4 border-[#000] rounded-lg shadow-brutal-lg p-6 my-8 -rotate-1 hover:rotate-0 transition-transform">
  <div className="rotate-1">
    <p className="text-body text-[#0A0A0A] m-0 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
      💡 <span className="underline decoration-4 decoration-[#FF006E]">Insight chiave:</span> Il 70% delle feature richieste dagli stakeholder non risolvevano problemi reali degli utenti.
    </p>
  </div>
</div>
```

5. **Stats Grid**
```tsx
<div className="bg-white border-3 border-[#E5E5E5] rounded-lg p-5 my-6">
  <div className="grid grid-cols-3 gap-4 text-center">
    <div>
      <p className="text-[#0A0A0A] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '28px' }}>8</p>
      <p className="text-body-small text-[#6B7280]">Sviluppatori</p>
    </div>
    {/* ... more stats */}
  </div>
</div>
```

6. **Challenge/Solution Cards**
```tsx
<div className="flex items-start gap-3 p-4 bg-[#FFFCF2] border-2 border-[#E5E5E5] rounded-lg hover:border-[#FF006E] transition-colors">
  <div className="w-6 h-6 rounded-full bg-[#FF006E] flex-shrink-0 flex items-center justify-center text-white" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '12px' }}>1</div>
  <p className="text-body text-[#2D2D2D] m-0">Roadmap sovraffollata di feature request non validate</p>
</div>
```

### Component Structure
```typescript
interface BlogArticleProps {
  onBack: () => void;
  article: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    color: string;
    featured?: boolean;
  };
  currentLang?: 'IT' | 'EN';
  onLanguageChange?: (lang: 'IT' | 'EN') => void;
  onLogoClick?: () => void;
  onViewAllArticles?: () => void;
}
```

### Design Token Mapping Requirements

| Current Hard-Coded | Should Use Design Token | Priority | Notes |
|--------------------|-------------------------|----------|-------|
| All BlogSection/BlogPage colors | Same mappings | High | Consistency |
| Twitter Blue `#1DA1F2` | `bg-[#1DA1F2]` | Low | Platform brand color |
| LinkedIn Blue `#0A66C2` | `bg-[#0A66C2]` | Low | Platform brand color |
| Gray border `#E5E5E5` | `border-gray-200` or custom? | Medium | Currently not in design system |
| `border-3` | `border-brutal-thin`? | High | New token needed |
| Leading classes | Already using Tailwind | ✓ | Good |
| Prose typography | Consider `@tailwindcss/typography`? | Low | For rich article content |

---

## Cross-Component Design Patterns

### 1. Gradient Pattern (Consistent across all components)
```
bg-gradient-to-br from-[#0D7EFF] via-[#7209B7] to-[#FF006E]
```
**Usage:** Featured cards, hero sections, progress bars
**Should become:** Utility class `bg-gradient-brutal` or similar

### 2. Card Pattern
```tsx
className="bg-white border-4 border-[#000] rounded-lg shadow-brutal
  hover:-translate-y-2 hover:shadow-brutal-lg transition-all cursor-pointer"
```
**Usage:** All blog post cards
**Already exists:** Can use `<Card>` component from `/components/ui/Card.tsx`

### 3. Badge Pattern
```tsx
<span
  className="inline-block px-3 py-1 border-2 border-[#000] rounded-lg text-white"
  style={{
    backgroundColor: post.color,
    fontFamily: 'Space Mono, monospace',
    fontSize: '11px',
    fontWeight: 700,
  }}
>
  {post.category}
</span>
```
**Usage:** Category badges
**Already exists:** Can use `<Badge variant="design|dev|pm|tool|featured">` from `/components/ui/Badge.tsx`

### 4. Button Pattern
```tsx
className="px-6 py-3 bg-[#FFD60A] text-[#0A0A0A] border-3 border-[#000]
  rounded shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal
  transition-all font-bold text-sm"
style={{ fontFamily: 'Space Grotesk, sans-serif' }}
```
**Usage:** CTAs throughout
**Already exists:** Can use `<Button variant="primary">` from `/components/ui/Button.tsx`

---

## Critical Issues to Resolve

### 1. Color Palette Discrepancy ⚠️ HIGH PRIORITY
**Current Figma Design (from `CLAUDE.md`):**
- Electric Blue: `#0D7EFF`
- Teal: `#2A687A`
- Deep Purple: `#7209B7`
- Cyber Yellow: `#FFD60A`
- Neon Pink: `#FF006E`

**Designprototipo Components:**
- ✓ Correctly using `#0D7EFF` (Electric Blue)
- ✓ Correctly using `#7209B7` (Deep Purple)
- ✓ Correctly using `#FFD60A` (Cyber Yellow)
- ✓ Correctly using `#FF006E` (Neon Pink)
- ✗ NOT using `#2A687A` (Teal) - needs to be added for Development category

**Action Required:** Ensure `tailwind.config.ts` has correct hex codes (already verified in previous analysis).

### 2. Inline Styles vs. Tailwind Classes ⚠️ HIGH PRIORITY
**Problem:** Heavy use of inline `style={{}}` for fonts breaks design system consistency.

**Example:**
```tsx
// BAD (current)
<h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>Title</h3>

// GOOD (should be)
<h3 className="font-heading font-bold">Title</h3>
```

**Action Required:** Create font utility classes in `tailwind.config.ts`:
```typescript
fontFamily: {
  heading: ['Space Grotesk', 'sans-serif'],
  body: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
},
```

### 3. Border Width Inconsistency
**Problem:** Using `border-2`, `border-3`, `border-4` but only `border-brutal` (4px) and `border-brutal-thick` (6px) are defined.

**Action Required:** Add `border-brutal-thin: 3px` to design tokens.

### 4. Missing Design Token: `#E5E5E5` (Light Gray Border)
**Usage:** Non-hover states on callout boxes, stat grids
**Action Required:** Add to Tailwind config as `colors.gray[200]` or `colors.border-light`.

### 5. Prose Typography for Article Content
**Problem:** Long-form article content in BlogArticle.tsx could benefit from typography plugin.

**Action Required:** Consider adding `@tailwindcss/typography` and using `prose` classes for article body.

---

## Dependencies Needed

### lucide-react Icons
Already installed? Verify in `package.json`:
```json
"lucide-react": "^0.x.x"
```

**Icons used:**
- `Clock` - Reading time
- `Calendar` - Publish date
- `ArrowRight`, `ChevronRight` - Navigation
- `Search`, `X` - Search functionality
- `Filter` - Filter UI
- `Share2`, `Twitter`, `Linkedin`, `Link2` - Sharing
- `Bookmark`, `TrendingUp`, `Users`, `CheckCircle` - Article features

### Sub-Components
- `NeoBadge` - Custom badge component (not found in current codebase)
- `Footer` - Footer component
- `ChatBot` - Chatbot component

**Action Required:** Either:
1. Fetch `NeoBadge.tsx` from Designprototipo
2. Replace with existing `<Badge>` component from `/components/ui/Badge.tsx`

---

## Implementation Roadmap

### Phase 1: Foundation (Day 1)
1. ✓ Verify design tokens in `tailwind.config.ts`
2. Add missing tokens:
   - `border-brutal-thin: 3px`
   - `colors.border-light: #E5E5E5`
3. Add font utility classes:
   - `font-heading`, `font-body`, `font-mono`
4. Create gradient utility class: `bg-gradient-brutal`

### Phase 2: Component Migration (Days 2-3)
1. Create/update sub-components:
   - Verify `NeoB adge` or adapt existing `Badge`
   - Create `BlogPostCard` component (shared pattern)
2. Migrate BlogSection.tsx:
   - Replace hard-coded colors with design tokens
   - Replace inline styles with utility classes
   - Use existing `Card`, `Badge`, `Button` components
3. Migrate BlogPage.tsx:
   - Same replacements
   - Implement search/filter UI
4. Migrate BlogArticle.tsx:
   - Same replacements
   - Implement ToC, reading progress, share menu

### Phase 3: Integration (Day 4)
1. Connect to MDX blog system (if needed)
2. Integrate with existing blog data structure
3. Add i18n support (IT/EN)
4. Test responsive behavior
5. Verify WCAG AA compliance (color contrast, touch targets)

### Phase 4: Polish (Day 5)
1. Add Framer Motion animations
2. Optimize images (if using)
3. Add E2E tests for blog flow
4. Performance audit
5. SEO optimization (meta tags, structured data)

---

## File Size Concerns

BlogArticle.tsx is 40KB - consider:
1. Code splitting (lazy load article view)
2. Extract ToC logic to custom hook
3. Extract share menu to separate component
4. Consider virtual scrolling for long articles

---

## Questions for User

Before proceeding with implementation, clarify:

1. **NeoB adge Component:** Should we fetch it from Designprototipo or adapt the existing `Badge` component?
2. **Blog Data Source:** Are we:
   - Migrating existing MDX files?
   - Creating new Italian content?
   - Using mock data for now?
3. **Feature Scope:** Implement all features (ToC, reading progress, share buttons) or start minimal?
4. **Related Articles:** How should this work with the existing blog structure?
5. **Category Mapping:** How do Figma Make palette colors map to blog categories?
   - Electric Blue → Design/UX
   - Teal → Development
   - Deep Purple → PM/Strategy
   - Cyber Yellow → Featured
   - Neon Pink → Analytics/Tools

---

**End of Analysis**
**Next Step:** Wait for user confirmation on questions above, then proceed with implementation plan.
