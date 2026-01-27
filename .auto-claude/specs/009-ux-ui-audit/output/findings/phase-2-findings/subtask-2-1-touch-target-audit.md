# Touch Target & Thumb Zone Accessibility Audit

**Subtask ID:** subtask-2-1
**Date:** 2026-01-27
**Auditor:** Claude (Senior UX/UI Designer)
**Viewport Tested:** 375px (iPhone SE), 390px (iPhone 12/13/14), 428px (iPhone 12/13/14 Pro Max)

---

## Executive Summary

This audit evaluates all interactive elements on selfrules.org against WCAG 2.1 AA touch target requirements (minimum 44×44px, recommended 48×48px). The analysis reveals **13 distinct interactive element types** with varying compliance levels. Overall, the site shows **moderate compliance** with touch target guidelines, but several critical CTAs and navigation elements require attention.

**Overall Touch Target Score: 6.5/10**

### Key Findings
- ✅ Primary CTA buttons (md/lg sizes) meet or exceed 48px minimum
- ⚠️ Small button variants fall below minimum target size
- ❌ Language switcher buttons critically undersized (33px)
- ⚠️ Mobile hamburger menu borderline at 40×40px
- ✅ Form inputs exceed minimum requirements
- ❌ Desktop navigation links too small for touch (mobile should use menu)

---

## Touch Target Requirements Reference

| Standard | Minimum Size | Recommended |
|----------|--------------|-------------|
| WCAG 2.1 AA | 44×44px | 48×48px |
| Apple HIG | 44×44 points | 48×48 points |
| Material Design | 48×48dp | 48×48dp |
| WCAG 2.2 AAA | 44×44px | 48×48px |

**Note:** WCAG 2.2 introduced Target Size Level AAA requiring 44×44px and Level AA requiring 24×24px minimum with adequate spacing.

---

## Component-by-Component Analysis

### 1. NeoButton (Primary Hero/Section CTAs)

**Usage:** Hero "Parliamone" CTA, Hero "Explore" link, WorkTogether CTA, AskMeAnything CTA

| Size | CSS Classes | Calculated Height | Width | Status |
|------|-------------|-------------------|-------|--------|
| sm | `px-4 py-2 text-sm` | ~37px | Variable | ❌ FAILS |
| md (mobile) | `px-6 py-3 text-base` | ~48px | Variable | ✅ PASSES |
| md (desktop) | `px-8 py-3 text-base` | ~48px | Variable | ✅ PASSES |
| lg (mobile) | `px-8 py-4 text-lg` | ~60px | Variable | ✅ PASSES |
| lg (desktop) | `px-10 py-4 text-lg` | ~60px | Variable | ✅ PASSES |

**Calculation Breakdown (md size):**
- Vertical padding: 12px × 2 = 24px
- Line height (text-base, ~16px × 1.5): ~24px
- **Total height: ~48px** ✅

**Recommendation:** Remove `sm` variant from mobile touchable contexts or add minimum height constraint.

---

### 2. Button Component (Design System)

**Usage:** General buttons throughout the site

| Size | CSS Classes | Calculated Height | Status |
|------|-------------|-------------------|--------|
| sm | `px-4 py-2 text-body-sm` | ~37px | ❌ FAILS |
| md | `px-6 py-3 text-body` | ~51px | ✅ PASSES |
| lg | `px-8 py-4 text-body-lg` | ~61px | ✅ PASSES |
| xl | `px-10 py-5 text-body-xl` | ~70px | ✅ PASSES |

**Calculation Breakdown (md size):**
- Vertical padding: 12px × 2 = 24px
- Line height (text-body 17px × 1.6): ~27px
- **Total height: ~51px** ✅

**Recommendation:** Add `min-h-12` (48px) as baseline for all button sizes on touch devices.

---

### 3. CTAButton Component (Animated)

**Usage:** Special call-to-action buttons with animations

| Size | Mobile CSS | Mobile Height | Desktop Height | Status |
|------|------------|---------------|----------------|--------|
| sm | `px-3 py-2` | ~38px | ~38px | ❌ FAILS |
| md | `px-5 py-2.5` | ~47px | ~51px | ⚠️ BORDERLINE |
| lg | `px-6 py-3` | ~51px | ~60px | ✅ PASSES |
| xl | `px-8 py-4` | ~60px | ~70px | ✅ PASSES |

**Recommendation:** Increase `md` mobile vertical padding from `py-2.5` (10px) to `py-3` (12px).

---

### 4. Header Navigation Elements

#### 4.1 Logo (MFDL)
| Element | CSS | Dimensions | Status |
|---------|-----|------------|--------|
| Logo Link | `px-4 py-2 text-xl` | ~32px × ~40px | ⚠️ BORDERLINE |

**Calculation:** 8px padding × 2 + ~24px text = ~40px height

**Recommendation:** Increase to `py-3` for 48px minimum height.

#### 4.2 Desktop Navigation Links
| Element | CSS | Dimensions | Status |
|---------|-----|------------|--------|
| Nav Link | `px-4 py-2 text-sm` | Variable × ~37px | ❌ FAILS |

**Note:** Desktop nav links are only shown above 1024px (lg breakpoint), where mouse/trackpad is expected. This is acceptable as mobile uses hamburger menu.

#### 4.3 Language Switcher Buttons (CRITICAL)
| Element | CSS | Dimensions | Status |
|---------|-----|------------|--------|
| IT/EN Button | `px-3 py-1.5 text-sm` | ~24px × ~33px | ❌ FAILS |

**Calculation:**
- Horizontal: 12px × 2 = 24px + ~8px text = ~32px
- Vertical: 6px × 2 = 12px + ~21px text = ~33px

**🚨 CRITICAL ISSUE:** Language switcher is visible on ALL viewports including mobile but is only 33px in height - significantly below the 44px minimum.

**Recommendation:**
```tsx
// Current
'px-3 py-1.5 transition-all font-bold text-sm'

// Recommended
'px-4 py-3 transition-all font-bold text-sm min-w-12' // ~48px height
```

#### 4.4 Mobile Menu Button (Hamburger)
| Element | CSS | Dimensions | Status |
|---------|-----|------------|--------|
| Menu Toggle | `w-10 h-10` | 40×40px | ⚠️ BORDERLINE |

**Recommendation:** Increase to `w-12 h-12` (48×48px).

#### 4.5 Mobile Navigation Links
| Element | CSS | Dimensions | Status |
|---------|-----|------------|--------|
| Mobile Nav Link | `px-4 py-3 text-sm` | Full width × ~45px | ⚠️ CLOSE |

**Calculation:**
- Vertical: 12px × 2 = 24px + ~21px text = ~45px

**Recommendation:** Increase to `py-3.5` or `py-4` for clearer 48px+ height.

---

### 5. Form Elements

#### 5.1 Input Component
| Element | CSS | Height | Status |
|---------|-----|--------|--------|
| Text Input | `px-4 py-3 text-body` | ~51px | ✅ PASSES |

**Calculation:** 12px × 2 + ~27px line-height = ~51px

#### 5.2 Textarea Component
| Element | CSS | Min-Height | Status |
|---------|-----|------------|--------|
| Textarea | `px-4 py-3 min-h-[120px]` | 120px | ✅ PASSES |

#### 5.3 Anonymous Form Submit Button
| Element | CSS | Mobile Height | Desktop Height | Status |
|---------|-----|---------------|----------------|--------|
| Submit Button | `px-6 py-3 md:py-4 text-sm` | ~45px | ~53px | ⚠️ BORDERLINE mobile |

**Recommendation:** Change `py-3` to `py-3.5` for mobile (47px+).

---

### 6. Badge Components

**Note:** Badges are typically non-interactive display elements.

| Size | CSS | Height | Interactive? |
|------|-----|--------|--------------|
| sm | `px-2 py-0.5 text-body-xs` | ~25px | No |
| md | `px-3 py-1 text-body-sm` | ~30.5px | No |
| lg | `px-4 py-1.5 text-body` | ~39px | No |

**Status:** N/A - Non-interactive elements don't require touch target compliance.

---

### 7. GoogleCalendarPopup Modal

#### 7.1 Close Button
| Element | CSS | Dimensions | Status |
|---------|-----|------------|--------|
| Close X | `p-brutal-sm` (16px) + 24px icon | ~56×56px | ✅ PASSES |

#### 7.2 Retry Button (Error State)
| Element | CSS | Height | Status |
|---------|-----|--------|--------|
| Retry | `px-brutal-md py-brutal-sm` (24px, 16px) | ~48px | ✅ PASSES |

#### 7.3 Backdrop Overlay
| Element | Function | Status |
|---------|----------|--------|
| Backdrop | Click-to-close | ✅ Full viewport |

---

### 8. Card Components (Clickable)

| Component | Variant | Interactive | Minimum Dimension |
|-----------|---------|-------------|-------------------|
| Card | hoverable | Hover only | N/A |
| Card | clickable | Yes | Full card |
| CollaborationCard | clickable | Yes | 200px+ |
| ExperienceCard | clickable | Yes | 150px+ |

**Status:** ✅ All clickable cards exceed minimum touch targets as they are full-width containers.

---

## Thumb Zone Analysis

### Mobile Thumb Zone Diagram (375px viewport)

```
┌─────────────────────────────┐
│     ⬆️ STRETCH ZONE         │  Top 20%
├─────────────────────────────┤
│                             │
│     📱 NEUTRAL ZONE         │  Middle 40%
│                             │
├─────────────────────────────┤
│     👍 NATURAL ZONE         │  Bottom 30%
│     (Optimal Touch)         │
├─────────────────────────────┤
│     👎 DANGER ZONE          │  Bottom 10%
│     (System gestures)       │
└─────────────────────────────┘
```

### CTA Placement by Thumb Zone

| CTA | Section | Position | Zone | Assessment |
|-----|---------|----------|------|------------|
| "Parliamone" | Hero | Center viewport | 📱 Neutral | ✅ Accessible |
| "Explore" | Hero | Center viewport | 📱 Neutral | ✅ Accessible |
| "Book a call" | WorkTogether | Banner center | 📱 Neutral | ✅ Accessible |
| "Start Chat" | AskMeAnything | Card bottom | 👍 Natural | ✅ Optimal |
| "Submit Question" | AskMeAnything | Card bottom | 👍 Natural | ✅ Optimal |
| Hamburger Menu | Header | Top right | ⬆️ Stretch | ⚠️ Requires stretch |
| Language Switcher | Header | Top right | ⬆️ Stretch | ⚠️ Requires stretch |
| Logo | Header | Top left | ⬆️ Stretch | ⚠️ Requires stretch |

### Thumb Zone Recommendations

1. **Sticky Header on Mobile:** Consider reducing header height or hiding on scroll-down to minimize stretch zone usage
2. **Floating Action Button:** For primary CTA (Book Call), consider a persistent FAB in the natural thumb zone
3. **Bottom Navigation:** Alternative pattern for mobile - move key nav items to bottom bar

---

## Summary: Compliance Matrix

| Component | Status | Priority | Action Required |
|-----------|--------|----------|-----------------|
| NeoButton sm | ❌ FAILS | Medium | Add min-height or deprecate for mobile |
| Button sm | ❌ FAILS | Medium | Add min-height or deprecate for mobile |
| CTAButton sm | ❌ FAILS | Medium | Add min-height or deprecate for mobile |
| Language Switcher | ❌ FAILS | 🔴 HIGH | Increase padding urgently |
| Mobile Menu Button | ⚠️ BORDERLINE | High | Increase to 48×48px |
| Mobile Nav Links | ⚠️ CLOSE | Medium | Increase vertical padding |
| Logo Link | ⚠️ BORDERLINE | Low | Increase vertical padding |
| Anonymous Submit (mobile) | ⚠️ BORDERLINE | Medium | Increase vertical padding |
| CTAButton md (mobile) | ⚠️ BORDERLINE | Medium | Increase vertical padding |
| NeoButton md+ | ✅ PASSES | - | Maintain |
| Button md+ | ✅ PASSES | - | Maintain |
| Form Inputs | ✅ PASSES | - | Maintain |
| Calendar Close | ✅ PASSES | - | Maintain |
| Cards | ✅ PASSES | - | Maintain |

---

## Quick Win Recommendations

### Immediate Fixes (<1 hour each)

1. **Language Switcher** - Change `py-1.5` to `py-3` (+12px height)
   ```diff
   - 'px-3 py-1.5 transition-all font-bold text-sm'
   + 'px-4 py-3 transition-all font-bold text-sm'
   ```

2. **Mobile Menu Button** - Change `w-10 h-10` to `w-12 h-12`
   ```diff
   - 'w-10 h-10 bg-electric-blue...'
   + 'w-12 h-12 bg-electric-blue...'
   ```

3. **Mobile Nav Links** - Change `py-3` to `py-4`
   ```diff
   - 'px-4 py-3 bg-white...'
   + 'px-4 py-4 bg-white...'
   ```

### Design System Enhancement (Half-day)

Add a utility class or Tailwind plugin for touch-safe minimum dimensions:

```css
/* In globals.css */
@layer utilities {
  .touch-target-safe {
    min-height: 48px;
    min-width: 48px;
  }

  .touch-target-minimum {
    min-height: 44px;
    min-width: 44px;
  }
}
```

Then apply to small button variants:

```tsx
// In Button.tsx
const sizeStyles = {
  sm: 'px-4 py-2 text-body-sm touch-target-safe', // Added
  // ...
};
```

---

## Appendix: Pixel Dimension Calculations

### Tailwind Padding Reference
| Class | Value |
|-------|-------|
| py-0.5 | 2px |
| py-1 | 4px |
| py-1.5 | 6px |
| py-2 | 8px |
| py-2.5 | 10px |
| py-3 | 12px |
| py-3.5 | 14px |
| py-4 | 16px |
| py-5 | 20px |

### Typography Line Heights
| Class | Font Size | Line Height | Rendered Height |
|-------|-----------|-------------|-----------------|
| text-sm | 14px | 1.25 (default) | ~17.5px |
| text-base | 16px | 1.5 | ~24px |
| text-lg | 18px | 1.75 | ~31.5px |
| text-body-xs | 14px | 1.5 | ~21px |
| text-body-sm | 15px | 1.5 | ~22.5px |
| text-body | 17px | 1.6 | ~27px |
| text-body-lg | 18px | 1.6 | ~29px |

### Height Formula
```
Total Height = (vertical_padding × 2) + line_height
```

---

## Verification Checklist

- [x] All primary CTAs measured against 48×48px minimum
- [x] Language switcher identified as critical fail (33px)
- [x] Mobile hamburger menu measured (40×40px - borderline)
- [x] Form inputs verified (51px+ - compliant)
- [x] Thumb zone mapping for primary CTAs
- [x] Specific pixel dimensions documented for all interactive elements
- [x] Quick win recommendations with code examples

---

**Document Status:** Complete
**Next Steps:** Proceed to subtask-2-2 (Mobile navigation and scroll behavior)
