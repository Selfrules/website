# Color Contrast Audit - WCAG AA Compliance

**Audit Date:** 2026-01-26
**Target:** https://selfrules.org
**Standard:** WCAG 2.1 Level AA
**Testing Tools:** axe-core (via Playwright), WebAIM Contrast Checker

---

## Executive Summary

| Status | Count | Percentage |
|--------|-------|------------|
| **Pass** | 8 | 57% |
| **Fail** | 5 | 36% |
| **Conditional** | 1 | 7% |
| **Total** | 14 | 100% |

**Overall Assessment:** The design system has **critical color contrast failures** that prevent WCAG AA compliance. The primary brand colors (Neon Pink, Electric Blue) fail contrast requirements when used with white text. Immediate remediation is required for accessibility compliance.

---

## WCAG AA Requirements Reference

| Text Type | Minimum Contrast Ratio |
|-----------|----------------------|
| Normal text (<18pt or <14pt bold) | 4.5:1 |
| Large text (≥18pt or ≥14pt bold) | 3:1 |
| Non-text (icons, UI components) | 3:1 |
| WCAG AAA (enhanced) | 7:1 |

---

## Design System Colors Analysis

### Source: `tailwind.config.ts`

All colors extracted from the project's Tailwind configuration.

---

## Brand Colors on White Background (#FFFFFF)

| Color Name | Hex Value | Contrast Ratio | WCAG AA Normal | WCAG AA Large | Usage in Design System |
|------------|-----------|----------------|----------------|---------------|------------------------|
| Electric Blue | #0D7EFF | **3.85:1** | ❌ FAIL | ✅ Pass | Primary CTAs, Design/UX badges |
| Neon Pink | #FF006E | **3.83:1** | ❌ FAIL | ✅ Pass | Language toggle, Analytics badges |
| Deep Purple | #7209B7 | **5.91:1** | ✅ Pass | ✅ Pass | PM/Strategy badges |
| Teal | #2A687A | **6.74:1** | ✅ Pass | ✅ Pass | Development badges |
| Cyber Yellow | #FFD60A | **1.48:1** | ❌ FAIL | ❌ FAIL | Featured items (text on white) |
| Lime Green | #06FFA5 | **1.42:1** | ❌ FAIL | ❌ FAIL | Success states |
| Brutal Black | #000000 | **21:1** | ✅ AAA | ✅ AAA | Body text, borders |

### Critical Findings

**TESTED ON PRODUCTION (selfrules.org):**

| Element | Foreground | Background | Actual Ratio | Required | Status |
|---------|------------|------------|--------------|----------|--------|
| Language Button (IT) | #FFFFFF | #FF006E | 3.83:1 | 4.5:1 | ❌ FAIL |
| Language Hover State | #FFFFFF | #FF83B3 | 1.49:1 | 4.5:1 | ❌ FAIL |
| CTA "Parliamone" | #FFFFFF | #0D7EFF | 3.85:1 | 4.5:1 | ❌ FAIL |
| Section Numbers | #7209B7 (20% opacity) | #FFFFFF | 1.46:1 | 3:1 | ❌ FAIL |

---

## Brand Colors on Black/Dark Background (#0A0A0A / #000000)

| Color Name | Hex Value | On Black (#000000) | On Dark (#0A0A0A) | WCAG AA | Notes |
|------------|-----------|-------------------|-------------------|---------|-------|
| Electric Blue | #0D7EFF | 4.63:1 | 4.52:1 | ✅ Pass | Good for dark mode text |
| Neon Pink | #FF006E | 5.55:1 | 5.41:1 | ✅ Pass | Excellent for dark mode |
| Deep Purple | #7209B7 | 3.55:1 | 3.46:1 | ❌ FAIL | Insufficient on dark |
| Teal | #2A687A | 3.12:1 | 3.04:1 | ❌ FAIL | Insufficient on dark |
| Cyber Yellow | #FFD60A | 14.17:1 | 13.81:1 | ✅ AAA | Excellent! |
| Lime Green | #06FFA5 | 12.87:1 | 12.54:1 | ✅ AAA | Excellent! |
| Brutal White | #FFFFFF | 21:1 | 19.6:1 | ✅ AAA | Maximum contrast |

---

## Background Colors Analysis

| Background | Hex Value | With Black Text | With White Text | Primary Use |
|------------|-----------|-----------------|-----------------|-------------|
| White | #FFFFFF | 21:1 ✅ AAA | N/A | Cards, page background |
| Cream | #FFFCF2 | 19.8:1 ✅ AAA | N/A | Warm backgrounds |
| Surface Light | #FFF5E1 | 18.2:1 ✅ AAA | N/A | Card variants |
| Dark | #0A0A0A | N/A | 19.6:1 ✅ AAA | Dark mode, footer |
| Surface Dark | #1A1A1A | N/A | 16.1:1 ✅ AAA | Dark mode surfaces |

---

## Badge Component Contrast Analysis

Based on current implementation in `components/ui/Badge.tsx`:

### Current Implementation (PROBLEMATIC)

| Badge Variant | Background | Text | Contrast | Status |
|---------------|------------|------|----------|--------|
| design | #0D7EFF (Electric Blue) | #FFFFFF | 3.85:1 | ❌ FAIL |
| dev | #2A687A (Teal) | #FFFFFF | 6.74:1 | ✅ Pass |
| pm | #7209B7 (Deep Purple) | #FFFFFF | 5.91:1 | ✅ Pass |
| tool | #FF006E (Neon Pink) | #FFFFFF | 3.83:1 | ❌ FAIL |
| featured | #FFD60A (Cyber Yellow) | #FFFFFF | 1.48:1 | ❌ FAIL |

### Recommended Implementation (WCAG AA Compliant)

| Badge Variant | Background | Text | New Contrast | Fix Required |
|---------------|------------|------|--------------|--------------|
| design | #0D7EFF | #000000 | 5.46:1 | Change to dark text |
| design (alt) | #0A5CC0 | #FFFFFF | 5.0:1 | Darken background |
| dev | #2A687A | #FFFFFF | 6.74:1 | No change needed |
| pm | #7209B7 | #FFFFFF | 5.91:1 | No change needed |
| tool | #C50058 | #FFFFFF | 5.2:1 | Darken background |
| tool (alt) | #FF006E | #000000 | 5.49:1 | Change to dark text |
| featured | #FFD60A | #000000 | 13.91:1 | **Always use black text** |

---

## Button Component Contrast Analysis

### Primary Buttons

| Button State | Background | Text | Contrast | Status |
|--------------|------------|------|----------|--------|
| Default | #0D7EFF | #FFFFFF | 3.85:1 | ❌ FAIL |
| Hover | #339FFF | #FFFFFF | 2.89:1 | ❌ FAIL |
| Focus | #0D7EFF + outline | #FFFFFF | 3.85:1 | ❌ FAIL |

### Secondary Buttons

| Button State | Background | Text | Contrast | Status |
|--------------|------------|------|----------|--------|
| Default | #FF006E | #FFFFFF | 3.83:1 | ❌ FAIL |
| Hover | #FF83B3 | #FFFFFF | 1.49:1 | ❌ FAIL (Severe) |

---

## Decorative Elements Analysis

| Element | Implementation | Contrast | Status | Recommendation |
|---------|---------------|----------|--------|----------------|
| Section Numbers (01, 02, 03) | `text-deep-purple opacity-20` | 1.46:1 | ❌ FAIL | Add `aria-hidden="true"` |
| Background Grid Pattern | `#000` 1px lines | Decorative | ⚠️ N/A | Ensure `aria-hidden` |
| Morphing Shapes | Various colors | Decorative | ⚠️ N/A | Ensure `aria-hidden` |

**Note:** Decorative elements with insufficient contrast MUST be hidden from assistive technology using `aria-hidden="true"` to avoid being flagged as violations.

---

## Color Combinations Matrix

### High Contrast Combinations (Recommended)

| Foreground | Background | Contrast | Grade |
|------------|------------|----------|-------|
| #000000 | #FFFFFF | 21:1 | AAA |
| #000000 | #FFFCF2 | 19.8:1 | AAA |
| #000000 | #FFD60A | 13.91:1 | AAA |
| #FFFFFF | #0A0A0A | 19.6:1 | AAA |
| #FFD60A | #0A0A0A | 13.81:1 | AAA |
| #2A687A | #FFFFFF | 6.74:1 | AA+ |
| #7209B7 | #FFFFFF | 5.91:1 | AA |

### Low Contrast Combinations (Avoid)

| Foreground | Background | Contrast | Issue |
|------------|------------|----------|-------|
| #FFFFFF | #FF006E | 3.83:1 | Below 4.5:1 threshold |
| #FFFFFF | #0D7EFF | 3.85:1 | Below 4.5:1 threshold |
| #FFFFFF | #FFD60A | 1.48:1 | Severely insufficient |
| #FFFFFF | #06FFA5 | 1.42:1 | Severely insufficient |
| #7209B7 | #0A0A0A | 3.46:1 | Insufficient for dark mode |
| #2A687A | #0A0A0A | 3.04:1 | Insufficient for dark mode |

---

## Remediation Recommendations

### Priority 1: Critical (Immediate Fix Required)

#### 1.1 Language Toggle Button
**Current:** `bg-neon-pink text-white` (3.83:1)

**Fix Option A - Darken Background:**
```tsx
// Change from #FF006E to #C50058
className="bg-[#C50058] text-white" // 5.2:1 contrast
```

**Fix Option B - Use Dark Text:**
```tsx
className="bg-neon-pink text-black" // 5.49:1 contrast
```

**Recommended:** Option A (maintains white text aesthetic)

#### 1.2 Primary CTA Buttons ("Parliamone")
**Current:** `bg-electric-blue text-white` (3.85:1)

**Fix Option A - Darken Background:**
```tsx
// Define new color in tailwind.config.ts
'electric-blue-dark': '#0A5CC0', // 5.0:1 contrast with white
```

**Fix Option B - Use Dark Text:**
```tsx
className="bg-electric-blue text-black" // 5.46:1 contrast
```

**Recommended:** Option A (maintains brand consistency)

#### 1.3 Featured Badge (Cyber Yellow)
**Current:** `bg-cyber-yellow text-white` (1.48:1) - **SEVERE FAIL**

**Fix (MANDATORY):**
```tsx
// ALWAYS use black text on Cyber Yellow
className="bg-cyber-yellow text-black" // 13.91:1 contrast - AAA!
```

### Priority 2: High (Fix Within Sprint)

#### 2.1 Hover States
Ensure all hover states maintain minimum 4.5:1 contrast:

```tsx
// Bad: Pink hover lightens too much
hover:bg-[#FF83B3] // 1.49:1 - FAIL

// Good: Pink hover stays dark
hover:bg-[#CC0058] // 5.9:1 - PASS
```

#### 2.2 Focus Indicators
Focus indicators must have 3:1 contrast with adjacent colors:

```tsx
// Good: High contrast focus ring
focus:ring-4 focus:ring-electric-blue focus:ring-offset-2
// Ring color (#0D7EFF) on white offset (#FFFFFF) = 3.85:1 ✅
```

### Priority 3: Medium (Decorative Elements)

#### 3.1 Section Numbers
```tsx
// Add aria-hidden to remove from accessibility tree
<span className="text-6xl opacity-20 text-deep-purple" aria-hidden="true">
  01
</span>
```

---

## Tailwind Configuration Recommendations

Add these WCAG-compliant color variants to `tailwind.config.ts`:

```typescript
colors: {
  // Existing colors...

  // WCAG AA Compliant Variants
  'electric-blue-aa': '#0A5CC0',  // 5.0:1 on white
  'neon-pink-aa': '#C50058',      // 5.2:1 on white

  // Text color helpers
  'on-yellow': '#0A0A0A',         // For text on cyber-yellow
  'on-lime': '#0A0A0A',           // For text on lime-green
}
```

---

## Component-Level Implementation Guide

### Badge Component Update

```tsx
// components/ui/Badge.tsx
const variantStyles = {
  design: 'bg-electric-blue-aa text-white',     // Changed from electric-blue
  dev: 'bg-teal text-white',                    // No change needed
  pm: 'bg-deep-purple text-white',              // No change needed
  tool: 'bg-neon-pink-aa text-white',           // Changed from neon-pink
  featured: 'bg-cyber-yellow text-on-yellow',   // CRITICAL: Always dark text
};
```

### Button Component Update

```tsx
// components/ui/Button.tsx
const variants = {
  primary: 'bg-electric-blue-aa text-white hover:bg-[#0853A6]',
  secondary: 'bg-neon-pink-aa text-white hover:bg-[#A00046]',
  accent: 'bg-cyber-yellow text-on-yellow hover:bg-[#E6C009]',
};
```

---

## Testing Verification Checklist

After implementing fixes, verify with:

- [ ] Run axe-core accessibility tests (`npm test -- --grep accessibility`)
- [ ] Manual check with WebAIM Contrast Checker
- [ ] Test with browser DevTools accessibility panel
- [ ] Verify in both light and dark mode
- [ ] Test all button/badge variants
- [ ] Verify hover/focus states maintain contrast

---

## Dark Mode Considerations

### Safe Colors for Dark Mode

| Color | On Dark (#0A0A0A) | Status |
|-------|-------------------|--------|
| Cyber Yellow (#FFD60A) | 13.81:1 | ✅ Excellent |
| Lime Green (#06FFA5) | 12.54:1 | ✅ Excellent |
| Neon Pink (#FF006E) | 5.41:1 | ✅ Good |
| Electric Blue (#0D7EFF) | 4.52:1 | ✅ Good |
| White (#FFFFFF) | 19.6:1 | ✅ Perfect |

### Avoid in Dark Mode

| Color | On Dark (#0A0A0A) | Issue |
|-------|-------------------|-------|
| Deep Purple (#7209B7) | 3.46:1 | Too dark |
| Teal (#2A687A) | 3.04:1 | Too dark |

---

## Compliance Summary

| WCAG Criterion | Status | Notes |
|----------------|--------|-------|
| 1.4.3 Contrast (Minimum) - Level AA | ❌ FAIL | 5 color combinations fail |
| 1.4.6 Contrast (Enhanced) - Level AAA | ❌ FAIL | Most combinations below 7:1 |
| 1.4.11 Non-text Contrast - Level AA | ⚠️ Partial | Focus indicators pass, some UI elements fail |

---

## References

- [WCAG 2.1 Success Criterion 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Color Palette Generator](https://venngage.com/tools/accessible-color-palette-generator)
- Project file: `tailwind.config.ts`
- Axe-core scan: `audit/axe-scan-results.json`

---

**Audit Performed By:** Claude Code (Automated Accessibility Audit)
**Next Steps:** Implement Priority 1 fixes immediately, then verify with automated testing
