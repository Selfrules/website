# Cross-Touchpoint Consistency Evaluation - selfrules.org

**Audit Phase:** 2.3 - Cross-Touchpoint Consistency
**Date:** 2026-01-26
**Methodology:** Art Director Step 5 - Cross-Touchpoint Evaluation
**Standard:** Neobrutalist Design System defined in tailwind.config.ts

---

## Executive Summary

selfrules.org achieves **good cross-touchpoint consistency** with an **Overall Consistency Score of 7.8/10**. The site demonstrates strong adherence to typography, section header patterns, and CTA components, but shows inconsistencies in decorative element opacity levels and minor border-radius variations between card components.

**Strengths:**
- Unified typography system across all sections
- Consistent section header structure (Badge → Title → Subtitle)
- Strong color semantic system for badges and accents
- Cohesive button component usage (NeoButton throughout)
- Well-defined background alternation pattern (cream/white/dark rhythm)

**Weaknesses:**
- Decorative shape opacity ranges wildly (0.05 to 0.80)
- CollaborationCard uses `rounded-lg` instead of `rounded-brutal-lg`
- No blog section integrated into homepage (missing touchpoint)
- Card background colors lack strategic rationale

---

## Touchpoints Analyzed

| # | Touchpoint | Component | Background | Status |
|---|------------|-----------|------------|--------|
| 1 | **Header** | `Header.tsx` | `bg-cream` | ✅ Present |
| 2 | **Hero** | `Hero.tsx` | `bg-cream` | ✅ Present |
| 3 | **Journey (About)** | `Journey.tsx` | `bg-white` | ✅ Present |
| 4 | **What I'm Up To** | `WhatImUpTo.tsx` | `bg-white` | ✅ Present |
| 5 | **Work Together (CTA)** | `WorkTogether.tsx` | `bg-cream` | ✅ Present |
| 6 | **Ask Me Anything (Contact)** | `AskMeAnything.tsx` | `bg-dark` | ✅ Present |
| 7 | **Footer** | `Footer.tsx` | `bg-dark` | ✅ Present |
| 8 | **Blog** | N/A | N/A | ❌ Missing |

> **Note**: Blog section is not integrated into the homepage. This limits cross-touchpoint evaluation for content pages.

---

## Consistency Matrix

### 1. Background Alternation Pattern

```
LIGHT ZONE                           DARK ZONE
┌─────────────────────────────────┐ ┌───────────────────────┐
│ Header (cream)                  │ │                       │
│ Hero (cream)                    │ │ AskMeAnything (dark)  │
│ Journey (white)                 │ │ Footer (dark)         │
│ WhatImUpTo (white)              │ │                       │
│ WorkTogether (cream)            │ │                       │
└─────────────────────────────────┘ └───────────────────────┘
```

| Section | Background | Pattern Position | Score |
|---------|------------|------------------|-------|
| Header | `bg-cream` | Light anchor | ✅ |
| Hero | `bg-cream` | Light, warm welcome | ✅ |
| Journey | `bg-white` | Light, neutral narrative | ✅ |
| WhatImUpTo | `bg-white` | Light, neutral continuation | ✅ |
| WorkTogether | `bg-cream` | Light, warm invitation | ✅ |
| AskMeAnything | `bg-dark` | Dark, contrast shift | ✅ |
| Footer | `bg-dark` | Dark, page terminus | ✅ |

**Assessment: 9/10** - Clear intentional rhythm with strategic dark sections at the end for CTA emphasis.

---

### 2. Section Border Treatment

| Section | Border Bottom | Color | Score |
|---------|--------------|-------|-------|
| Header | `border-b-brutal` | `border-black` | ✅ |
| Hero | `border-b-brutal` | `border-black` | ✅ |
| Journey | `border-b-brutal` | `border-black` | ✅ |
| WhatImUpTo | `border-b-brutal` | `border-black` | ✅ |
| WorkTogether | `border-b-brutal` | `border-black` | ✅ |
| AskMeAnything | None | N/A | ✅ (Expected) |
| Footer | `border-t-brutal` | `border-cyber-yellow` | ✅ (Accent) |

**Assessment: 10/10** - Perfectly consistent brutalist border treatment. Footer uses cyber-yellow top border as intentional accent marker.

---

### 3. Decorative Element Strategy ⚠️ INCONSISTENT

| Section | Element Type | Opacity | Animation | Issue |
|---------|-------------|---------|-----------|-------|
| Hero | Floating shapes (circle, squares) | **0.70-0.80** | `animate-float`, `animate-wiggle` | Too prominent |
| Journey | Static shapes (square, circle) | **0.20** | None | Appropriate |
| WhatImUpTo | Gradient blob with `blur-3xl` | N/A (blur effect) | None | Different treatment |
| WorkTogether | Dot pattern | **0.05** | None | Very subtle |
| AskMeAnything | Floating shapes | **0.30** | `animate-float`, `animate-wiggle` | Good balance |
| Footer | Static shapes | **0.10** | None | Very subtle |

**Critical Finding:** Decorative element opacity ranges from **0.05 to 0.80** (16x variance).

**Recommended Standard:**
- Light backgrounds: `opacity-20` to `opacity-30`
- Dark backgrounds: `opacity-10` to `opacity-20`
- Animated elements: `opacity-20` max (to avoid distraction)

**Assessment: 5/10** - Significant inconsistency. Hero shapes at 0.70-0.80 compete with content (as noted in Visual Hierarchy analysis). Needs standardization.

---

### 4. Section Header Pattern

All sections follow an identical structure:

```tsx
// Consistent Pattern Across All Sections
<div className="text-center mb-12 md:mb-16">
  <div className="flex justify-center mb-4">
    <NeoBadge color="{color}">{badge}</NeoBadge>
  </div>
  <h2 className="text-h1 mb-4 md:mb-6 text-brutalist-text-primary">
    {title} <span className="text-{accent}">{highlight}</span>
  </h2>
  <p className="text-body text-brutalist-text-secondary max-w-[600px/700px] mx-auto">
    {subtitle}
  </p>
</div>
```

| Section | Badge Color | Title Accent | Max Width |
|---------|-------------|--------------|-----------|
| Hero | `pink` | cyber-yellow, electric-blue underlines | 900px |
| Journey | `purple` | cyber-yellow underline | 700px |
| WhatImUpTo | `blue` | electric-blue highlight | 600px |
| WorkTogether | `yellow` | neon-pink text | 700px |
| AskMeAnything | `yellow` | No accent (dark theme) | 600px |

**Assessment: 9/10** - Excellent consistency in structure. Minor variation in max-width (600px-900px) is contextually appropriate.

---

### 5. Card Component Consistency ⚠️ MINOR ISSUES

| Section | Component | Border Radius | Background | Hover Effect |
|---------|-----------|---------------|------------|--------------|
| Journey | Custom card | `rounded-brutal-lg` | `bg-cream` | `-translate-y-1 shadow-brutal-lg` |
| WhatImUpTo | `ActivityCard` | `rounded-brutal-lg` | `bg-cream` | `-translate-y-1 shadow-brutal-lg` |
| WorkTogether | `CollaborationCard` | **`rounded-lg`** ⚠️ | `bg-white` | `-translate-y-1 shadow-brutal-lg` |
| AskMeAnything | Custom cards | `rounded-brutal-lg` | `bg-surface-dark` | None |

**Issues Found:**
1. **Border Radius Mismatch:** `CollaborationCard` uses vanilla Tailwind `rounded-lg` instead of design token `rounded-brutal-lg`
2. **Background Inconsistency:** Cards alternate between `bg-cream` (Journey, WhatImUpTo) and `bg-white` (WorkTogether)

**Evidence from CollaborationCard.tsx line 98:**
```tsx
'bg-white border-brutal border-black rounded-lg shadow-brutal p-6 md:p-8',
//                                  ^^^^^^^^^^
//                        Should be: rounded-brutal-lg
```

**Assessment: 7/10** - Strong pattern with one component breaking design token convention.

---

### 6. Icon Container Consistency ⚠️ MINOR ISSUES

| Component | Size | Border Radius | Border |
|-----------|------|---------------|--------|
| Header mobile menu | `w-10 h-10` | `rounded-brutal` | `border-brutal-thin` |
| Journey milestone | `w-10 h-10` / `w-12 h-12` | `rounded-full` (intentional) | `border-brutal` |
| ActivityCard | `w-12 h-12` | `rounded-brutal-lg` | `border-brutal-thin` |
| CollaborationCard | `w-14 h-14` | **`rounded-lg`** ⚠️ | `border-brutal` |
| AskMeAnything | `w-12 h-12 md:w-14 md:h-14` | `rounded-brutal-lg` | `border-brutal-thin` |

**Issue:** CollaborationCard icon uses `rounded-lg` instead of `rounded-brutal-lg`

**Evidence from CollaborationCard.tsx line 109:**
```tsx
'w-14 h-14 rounded-lg border-brutal border-black',
//         ^^^^^^^^^^
// Should be: rounded-brutal-lg
```

**Assessment: 7/10** - Mostly consistent with one outlier component.

---

### 7. Typography Hierarchy

| Element | Class | Font | Consistency |
|---------|-------|------|-------------|
| Section Badge | `NeoBadge` | Space Grotesk (Bold, Uppercase) | ✅ 100% |
| Section Title | `text-h1` | Space Grotesk (Bold) | ✅ 100% |
| Section Subtitle | `text-body` | Inter (Regular) | ✅ 100% |
| Card Title | `text-h3` | Space Grotesk (Bold) | ✅ 100% |
| Card Body | `text-body-small` | Inter (Regular) | ✅ 100% |
| Labels | `text-xs font-heading font-bold` | Space Grotesk | ✅ 100% |
| Mono elements | `font-mono` | Space Mono | ✅ 100% |

**Assessment: 10/10** - Perfect typography consistency across all touchpoints.

---

### 8. CTA Button Patterns

| Location | Component | Variant | Action |
|----------|-----------|---------|--------|
| Hero Primary | `NeoButton` | `primary` (Electric Blue) | Open Calendar |
| Hero Secondary | `NeoButton` | `outline` | Scroll to Journey |
| WorkTogether Banner | `NeoButton` | `accent` (Cyber Yellow) | Open Calendar |
| AskMeAnything Chat | `NeoButton` | `primary` | Toggle Chat |

**Button Variant System:**
- **Primary** (Electric Blue): Main page CTAs, chat trigger
- **Accent** (Cyber Yellow): Secondary emphasis CTAs
- **Outline** (White/Cream): Exploratory actions

**Assessment: 9/10** - Consistent component usage with clear semantic variants.

---

### 9. Color Semantic Mapping

| Section | Badge Color | Semantic Meaning | Consistent? |
|---------|-------------|------------------|-------------|
| Hero | `pink` | Attention/Call to Action | ✅ |
| Journey | `purple` | PM/Strategy/History | ✅ |
| WhatImUpTo | `blue` | Current Work/Design | ✅ |
| WorkTogether | `yellow` | Featured/Special | ✅ |
| AskMeAnything | `yellow` | Featured/Special | ✅ |

**Within Journey section, role colors are semantic:**
- Designer phase: `purple`
- Developer phase: `yellow`
- PO phase: `pink`
- PM phase (current): `blue`

**Assessment: 9/10** - Strong semantic color system with clear meaning.

---

### 10. Container & Spacing

| Section | Max Width | Padding X | Padding Y |
|---------|-----------|-----------|-----------|
| Header | `max-w-[1440px]` | `px-5 md:px-8` | `py-4 md:py-5` |
| Hero | `max-w-[1440px]` | `px-6 md:px-8 lg:px-12` | `py-8 md:py-12` |
| Journey | `max-w-[1200px]` | `px-5 md:px-8` | `py-16 md:py-24` |
| WhatImUpTo | `max-w-[1200px]` | `px-5 md:px-8` | `py-16 md:py-24` |
| WorkTogether | `max-w-[1200px]` | `px-5 md:px-8` | `py-16 md:py-24` |
| AskMeAnything | `max-w-[1200px]` | `px-5 md:px-8` | `py-16 md:py-24` |
| Footer | `max-w-[1200px]` | `px-5 md:px-8` | `py-12 md:py-16` |

**Pattern:**
- Hero/Header use `1440px` for impact
- Content sections use `1200px` for readability
- Footer slightly less vertical padding (appropriate)

**Assessment: 9/10** - Intentional variation with clear rationale.

---

### 11. Animation Patterns

| Section | Library | Entry Animation | Viewport Trigger |
|---------|---------|-----------------|------------------|
| Hero | Framer Motion | `opacity: 0, y: 20` | On mount |
| Journey | Framer Motion | `opacity: 0, x: ±50` | `whileInView` |
| WhatImUpTo | None | N/A | N/A |
| WorkTogether | None | N/A | N/A |
| AskMeAnything | Framer Motion (decorative) | `animate-float` | CSS |
| Footer | Framer Motion (social hover) | Scale/translate | Hover |

**Finding:** Not all sections use Framer Motion entry animations. Hero and Journey have them; WhatImUpTo and WorkTogether do not.

**Assessment: 6/10** - Inconsistent animation application. Either all sections should animate in or none should.

---

## Missing Touchpoint: Blog

The homepage does not include a Blog section, which limits the cross-touchpoint evaluation. Based on the spec, Blog is mentioned as a key touchpoint.

**Recommendation:** When Blog is implemented, ensure it follows:
- Background: `bg-white` (alternating from Hero/Journey pattern)
- Badge: Use `pink` (content/writing) or `blue` (educational)
- Card style: `bg-cream border-brutal rounded-brutal-lg shadow-brutal`
- Same section header structure

---

## Consistency Score Card

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Background Pattern | 9/10 | 10% | 0.90 |
| Border Treatment | 10/10 | 10% | 1.00 |
| Decorative Elements | 5/10 | 15% | 0.75 |
| Section Headers | 9/10 | 10% | 0.90 |
| Card Components | 7/10 | 15% | 1.05 |
| Icon Containers | 7/10 | 5% | 0.35 |
| Typography | 10/10 | 15% | 1.50 |
| CTA Buttons | 9/10 | 10% | 0.90 |
| Color Semantics | 9/10 | 5% | 0.45 |
| Spacing | 9/10 | 5% | 0.45 |
| **TOTAL** | | | **7.8/10** |

---

## Priority Fixes

### Quick Wins (< 1 day)

1. **Fix CollaborationCard border-radius**
   ```tsx
   // CollaborationCard.tsx line 98
   // Change:
   'rounded-lg'
   // To:
   'rounded-brutal-lg'
   ```

2. **Fix CollaborationCard icon border-radius**
   ```tsx
   // CollaborationCard.tsx line 109
   // Change:
   'rounded-lg'
   // To:
   'rounded-brutal-lg'
   ```

3. **Standardize Hero decorative opacity**
   ```tsx
   // Hero.tsx lines 20-23
   // Change: opacity-80, opacity-70, opacity-75
   // To: opacity-30 (consistent with AskMeAnything)
   ```

### Strategic Improvements (1-2 weeks)

4. **Create decorative element standard**
   - Define opacity levels in design system
   - Light sections: `opacity-20` to `opacity-30`
   - Dark sections: `opacity-10` to `opacity-20`
   - Update all sections to comply

5. **Add entry animations to all sections**
   - Apply consistent Framer Motion `whileInView` to WhatImUpTo, WorkTogether
   - Use same transition timing (`duration: 0.6`)

6. **Standardize card backgrounds**
   - Decide: `bg-cream` OR `bg-white` for all light-section cards
   - Update CollaborationCard to match

### Transformational Changes (1+ month)

7. **Implement Blog section**
   - Follow established section patterns
   - Include in cross-touchpoint consistency checks

---

## Cross-Touchpoint Flow Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                        HEADER (sticky)                         │
│  bg-cream │ border-b-brutal │ MFDL logo │ NeoBadge lang switch │
└────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────┐
│                           HERO                                  │
│  bg-cream │ floating shapes (⚠️ 0.70-0.80) │ NeoButton CTAs    │
│  NeoBadge (pink) │ text-hero headline                          │
└────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────┐
│                          JOURNEY                                │
│  bg-white │ shapes (0.20) │ Timeline cards (bg-cream)          │
│  NeoBadge (purple) │ Milestone color-coding                    │
└────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────┐
│                        WHAT I'M UP TO                           │
│  bg-white │ gradient blob │ ActivityCard (bg-cream)            │
│  NeoBadge (blue) │ Spotify widget integration                  │
└────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────┐
│                       WORK TOGETHER                             │
│  bg-cream │ dot pattern (0.05) │ CollaborationCard (⚠️ bg-white) │
│  NeoBadge (yellow) │ gradient-cta banner │ NeoButton (accent)  │
└────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────┐
│                      ASK ME ANYTHING                            │
│  bg-dark │ shapes (0.30) │ Two-column cards (bg-surface-dark)  │
│  NeoBadge (yellow) │ Chat trigger │ Anonymous form             │
└────────────────────────────────────────────────────────────────┘
                                 ↓
┌────────────────────────────────────────────────────────────────┐
│                          FOOTER                                 │
│  bg-dark │ shapes (0.10) │ gradient-cta divider                │
│  Social links │ Quick links │ Resources                        │
└────────────────────────────────────────────────────────────────┘
```

---

## Comparison to Brand Consistency Score

From Phase 2.2 Brand Consistency Score (18.5/25):
- Logo Usage: 2.5/5
- Color Adherence: 4.0/5
- Typography: 4.5/5
- Imagery Style: 3.0/5
- Voice & Tone: 4.5/5

**Cross-Touchpoint Alignment:**
| Brand Element | Score | Cross-Touchpoint Status |
|---------------|-------|-------------------------|
| Logo Usage | 2.5/5 | ✅ Consistent (MFDL everywhere) |
| Color Adherence | 4.0/5 | ⚠️ Decorative opacity inconsistent |
| Typography | 4.5/5 | ✅ 100% consistent |
| Imagery Style | 3.0/5 | ⚠️ No photography in any touchpoint |
| Voice & Tone | 4.5/5 | ✅ Consistent across sections |

---

## Conclusion

selfrules.org demonstrates **strong structural consistency** across touchpoints with identical section header patterns, typography usage, and CTA button implementations. The primary area requiring attention is the **decorative element strategy**, where opacity levels vary significantly (0.05 to 0.80), causing visual inconsistency.

The site would benefit from:
1. Standardizing decorative shape opacity to 0.20-0.30 range
2. Fixing the two `rounded-lg` usages in CollaborationCard
3. Adding entry animations to WhatImUpTo and WorkTogether sections

**Overall Cross-Touchpoint Consistency: 7.8/10 (Good with Clear Improvement Path)**

---

*Document generated as part of Art Director Brand Audit - Phase 2.3*
*Next: 2.4 Gap Analysis ("What site says" vs "What site shows")*
