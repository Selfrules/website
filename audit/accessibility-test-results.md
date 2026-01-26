# Accessibility E2E Test Results

**Test Date:** 2026-01-26
**Target:** https://selfrules.org
**Test Suite:** `e2e/accessibility.spec.ts`
**Browser:** Chromium (Desktop)
**Locale:** it-IT

## Executive Summary

| Status | Count | Percentage |
|--------|-------|------------|
| **Passed** | 10 | 71% |
| **Failed** | 4 | 29% |
| **Total** | 14 | 100% |

**Overall Assessment:** The site has a solid accessibility foundation with passing keyboard navigation, screen reader support, and semantic structure. However, there are **critical color contrast issues** that need immediate attention for WCAG AA compliance.

---

## Passed Tests (10/14)

### 1. Blog Page Accessibility Scan
- **Test:** `blog page should not have accessibility violations`
- **Status:** ✅ PASS
- **Duration:** 7.0s
- **Axe Tags:** wcag2a, wcag2aa
- **Notes:** Blog page passes automated WCAG 2.0/2.1 AA checks

### 2. Skip to Main Content Link
- **Test:** `should have skip to main content link`
- **Status:** ✅ PASS
- **Duration:** 6.2s
- **Notes:** Skip link present at `#main-content`, appears on Tab focus

### 3. Focus Indicators
- **Test:** `should have proper focus indicators`
- **Status:** ✅ PASS
- **Duration:** 5.8s
- **Notes:** Interactive elements have visible focus states (outline or box-shadow)

### 4. Image Alt Text
- **Test:** `should have proper image alt text`
- **Status:** ✅ PASS
- **Duration:** 6.1s
- **Notes:** All content images have descriptive alt text, decorative images properly handled

### 5. Heading Hierarchy
- **Test:** `should have proper heading hierarchy`
- **Status:** ✅ PASS
- **Duration:** 5.5s
- **Notes:** Single H1 present, proper heading nesting (H1 → H2 → H3 → H4)

### 6. Keyboard Navigation
- **Test:** `should support keyboard navigation`
- **Status:** ✅ PASS
- **Duration:** 6.5s
- **Notes:** Tab navigation works forward and backward, focus remains visible

### 7. Button Accessible Names
- **Test:** `buttons should have accessible names`
- **Status:** ✅ PASS
- **Duration:** 1.7s
- **Notes:** All buttons have text content or aria-label (e.g., `aria-label="Italiano"`)

### 8. Link Accessible Names
- **Test:** `links should have accessible names`
- **Status:** ✅ PASS
- **Duration:** 1.9s
- **Notes:** All links have descriptive text or aria-label

### 9. Screen Reader Navigation
- **Test:** `should support screen reader navigation`
- **Status:** ✅ PASS
- **Duration:** 0.6s
- **Notes:** ARIA landmarks present: `navigation`, `main`, `contentinfo`

### 10. Reduced Motion Preference
- **Test:** `should handle reduced motion preference`
- **Status:** ✅ PASS
- **Duration:** 1.4s
- **Notes:** Site respects `prefers-reduced-motion` media query

---

## Failed Tests (4/14)

### 1. ❌ Homepage WCAG Automated Scan
- **Test:** `homepage should not have automatically detectable accessibility issues`
- **Status:** FAIL
- **Duration:** 7.4s
- **Error Type:** Color contrast violations (axe-core)
- **WCAG Tags:** wcag2a, wcag2aa, wcag21a, wcag21aa
- **Impact:** Serious

**Violations Found:**

| Element | Foreground | Background | Ratio | Expected | Issue |
|---------|------------|------------|-------|----------|-------|
| Language button (IT) | #ffffff | #ff006e (Neon Pink) | 3.83:1 | 4.5:1 | Contrast too low |
| Language button hover | #ffffff | #ff83b3 | 1.49:1 | 4.5:1 | Severely low |
| CTA "Parliamone" button | #ffffff | #0d7eff (Electric Blue) | 3.85:1 | 4.5:1 | Contrast too low |
| Section numbers (01, 02, 03) | Deep Purple @ 20% opacity | #ffffff | 1.46:1 | 3:1 | Decorative text fails |

**Affected Elements (Sample):**
```html
<button class="bg-neon-pink text-white" aria-label="Italiano">IT</button>
<button class="bg-electric-blue text-white">Parliamone</button>
<span class="text-6xl opacity-20 text-deep-purple">01</span>
```

**Recommendations:**
1. Darken Neon Pink to #C50058 or use dark text on pink background
2. Darken Electric Blue to #0A5CC0 or increase text size for 3:1 requirement
3. Increase opacity on decorative section numbers or remove them from accessibility tree with `aria-hidden="true"`

---

### 2. ❌ Document Structure
- **Test:** `should have proper document structure`
- **Status:** FAIL
- **Duration:** 6.1s
- **Error:** Nested `<main>` elements detected

**Issue Analysis:**
The page structure shows:
```yaml
- main [ref=e20]:
  - main [ref=e21]:
    - content...
```

**Problem:** There are two nested `<main>` elements. HTML5 spec allows only one `<main>` per document, and they should not be nested.

**Recommendation:**
- Remove the inner `<main>` element
- Use `<section>` or `<div>` for inner content wrappers

---

### 3. ❌ Form Input Labels
- **Test:** `form inputs should have labels`
- **Status:** FAIL
- **Duration:** 1.7s

**Affected Elements:**
- Anonymous question textarea: `textbox "La tua domanda *" [ref=e593]`

**Issue Analysis:**
The textarea appears to have a placeholder but may be missing:
- Explicit `<label for="id">` association
- Or proper `aria-labelledby` reference

**Current Implementation:**
```html
<textbox "La tua domanda *" [ref=e593]>
```

**Recommendation:**
Ensure the input has one of:
```html
<!-- Option 1: Explicit label -->
<label for="question-input">La tua domanda *</label>
<textarea id="question-input"></textarea>

<!-- Option 2: aria-label -->
<textarea aria-label="La tua domanda"></textarea>

<!-- Option 3: aria-labelledby -->
<label id="label-question">La tua domanda *</label>
<textarea aria-labelledby="label-question"></textarea>
```

---

### 4. ❌ Color Contrast
- **Test:** `should have sufficient color contrast`
- **Status:** FAIL
- **Duration:** 2.7s
- **Axe Rule:** `color-contrast`
- **Impact:** Serious

**This test specifically validates WCAG 2.1 Level AA color contrast requirements (4.5:1 for normal text, 3:1 for large text).**

**Color Contrast Failures Summary:**

| Color | Hex | Use Case | Contrast with White | Status |
|-------|-----|----------|---------------------|--------|
| Neon Pink | #FF006E | Active language toggle | 3.83:1 | ❌ FAIL |
| Neon Pink (hover) | #FF83B3 | Hover state | 1.49:1 | ❌ FAIL |
| Electric Blue | #0D7EFF | Primary CTAs | 3.85:1 | ❌ FAIL |
| Deep Purple @ 20% | #E3CEF1 | Decorative numbers | 1.46:1 | ❌ FAIL |

**Recommended Color Adjustments:**

| Current Color | Current Contrast | Recommended | New Contrast | WCAG |
|---------------|------------------|-------------|--------------|------|
| #FF006E | 3.83:1 | #C50058 | 5.2:1 | ✅ AA |
| #0D7EFF | 3.85:1 | #0A5CC0 | 5.0:1 | ✅ AA |
| #7209B7 @ 20% | 1.46:1 | Use `aria-hidden="true"` | N/A | ✅ |

---

## Test Configuration

### Playwright Settings
```typescript
// From playwright.config.ts
{
  baseURL: 'https://selfrules.org',
  locale: 'it-IT',
  projects: ['chromium'],
  reporter: ['list', 'json']
}
```

### Axe-Core Tags Used
- `wcag2a` - WCAG 2.0 Level A
- `wcag2aa` - WCAG 2.0 Level AA
- `wcag21a` - WCAG 2.1 Level A
- `wcag21aa` - WCAG 2.1 Level AA

---

## Page Structure Analysis

Based on the accessibility tree snapshot:

### Landmarks Present ✅
| Landmark | Element | Status |
|----------|---------|--------|
| Banner | `<header>` | ✅ Present |
| Navigation | `<nav>` | ✅ Present |
| Main | `<main>` | ⚠️ Present (but nested) |
| Contentinfo | `<footer>` | ✅ Present |

### Heading Hierarchy ✅
| Level | Count | Example |
|-------|-------|---------|
| H1 | 1 | "Ho fallito come designer..." |
| H2 | 5 | "Perché faccio l'interprete...", "Progetti in corso", etc. |
| H3 | 10+ | "Selfrules", "FLOWING", "ActiveProspect", etc. |
| H4 | 5+ | "Navigazione", "Risorse", etc. |

### Interactive Elements
| Type | Count | Accessibility |
|------|-------|--------------|
| Links | 30+ | ✅ All accessible |
| Buttons | 8+ | ✅ All accessible |
| Form inputs | 1 | ⚠️ Missing label association |

---

## Priority Remediation List

### P0 - Critical (Blocks WCAG AA Compliance)
1. **Color Contrast Fixes** - All primary brand colors need adjustment
   - Neon Pink (#FF006E → #C50058)
   - Electric Blue (#0D7EFF → #0A5CC0)
   - Effort: 2-4 hours
   - Files: `tailwind.config.ts`, potentially component-level overrides

### P1 - High
2. **Nested Main Elements** - Remove inner `<main>` wrapper
   - Effort: 30 minutes
   - Files: Layout component(s)

3. **Form Input Labels** - Add explicit label to textarea
   - Effort: 15 minutes
   - Files: Anonymous question form component

### P2 - Medium
4. **Decorative Number Opacity** - Add `aria-hidden="true"` to decorative section numbers
   - Effort: 15 minutes
   - Files: Work section component

---

## Appendix: Raw Test Output

```
Running 14 tests using 8 workers

  ok  1 [chromium] blog page accessibility violations (7.0s)
  ok  2 [chromium] skip to main content link (6.2s)
  ok  3 [chromium] proper focus indicators (5.8s)
  ok  4 [chromium] proper image alt text (6.1s)
  ok  5 [chromium] proper heading hierarchy (5.5s)
  ok  6 [chromium] keyboard navigation (6.5s)
  ok  7 [chromium] buttons accessible names (1.7s)
  ok  8 [chromium] links accessible names (1.9s)
  ok  9 [chromium] screen reader navigation (0.6s)
  ok 10 [chromium] reduced motion preference (1.4s)
  x  11 [chromium] homepage auto accessibility issues (7.4s)
  x  12 [chromium] proper document structure (6.1s)
  x  13 [chromium] form inputs have labels (1.7s)
  x  14 [chromium] sufficient color contrast (2.7s)

  10 passed (10.6s)
  4 failed
```

---

## Related Documentation

- Full JSON results: `./audit/playwright-accessibility-results.json`
- Axe violation details: `./test-results/accessibility-*/error-context.md`
- Test specification: `./e2e/accessibility.spec.ts`
