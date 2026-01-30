# Keyboard Navigation & Focus Management Audit

**Audit Date:** 2026-01-26
**Target:** https://selfrules.org
**Standard:** WCAG 2.1 Level AA (Success Criteria 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11)
**Testing Method:** Manual keyboard testing + E2E automated tests (Playwright)

---

## Executive Summary

| Category | Status | Issues Found |
|----------|--------|--------------|
| **Tab Navigation** | ✅ Pass | 0 |
| **Skip Links** | ✅ Pass | 0 |
| **Focus Indicators** | ✅ Pass | 0 |
| **Modal Focus Traps** | ⚠️ Partial | 2 |
| **Escape Key Handling** | ⚠️ Partial | 2 |
| **Focus Restoration** | ⚠️ Partial | 2 |
| **Form Accessibility** | ⚠️ Partial | 1 |
| **Mobile Menu** | ⚠️ Partial | 1 |

**Overall Assessment:** The site has a solid foundation for keyboard accessibility with working tab navigation, skip links, and visible focus indicators. However, there are **accessibility gaps in modal implementations** that need attention for full WCAG AA compliance.

---

## WCAG Requirements Reference

| Success Criterion | Level | Requirement |
|-------------------|-------|-------------|
| 2.1.1 Keyboard | A | All functionality operable via keyboard |
| 2.1.2 No Keyboard Trap | A | Focus never gets trapped |
| 2.4.3 Focus Order | A | Focus order preserves meaning and operability |
| 2.4.7 Focus Visible | AA | Keyboard focus indicator is visible |
| 2.4.11 Focus Not Obscured | AA | Focused element is not fully hidden |

---

## 1. Tab Navigation Analysis

### Test Methodology
- Loaded https://selfrules.org/it and https://selfrules.org/en
- Navigated using Tab (forward) and Shift+Tab (backward)
- Verified all interactive elements receive focus in logical order

### Results

| Page Area | Tab Order | Status | Notes |
|-----------|-----------|--------|-------|
| Skip Link | 1 | ✅ Pass | Hidden until focused, links to `#main-content` |
| Logo (MFDL) | 2 | ✅ Pass | Focusable link to homepage |
| Desktop Nav Links | 3-7 | ✅ Pass | Home, Percorso, Now, Lavoriamo insieme, Parliamo |
| Language Toggle (IT/EN) | 8-9 | ✅ Pass | Both buttons accessible with aria-labels |
| Mobile Menu Button | 10 | ✅ Pass | Visible on mobile, has `aria-label="Toggle menu"` |
| Hero CTA | 11 | ✅ Pass | "Parliamone" button |
| Section Content | 12+ | ✅ Pass | Cards, links, buttons all accessible |
| Anonymous Question Form | ~30 | ⚠️ Partial | Textarea focusable but lacks proper label |
| Chat Trigger Button | Last | ✅ Pass | Floating button, always accessible |

### Tab Order Verification

```
[Observed Tab Order on Homepage]
1. Skip to main content (hidden until focused)
2. MFDL logo (link)
3-7. Navigation links
8. IT language button
9. EN language button
10. Hero CTA button
11+. Content area (cards, links, buttons)
Final. Chat trigger button
```

**Assessment:** ✅ **PASS** - Tab order follows visual/logical reading order.

---

## 2. Skip Link Implementation

### Location
**File:** `app/[locale]/layout.tsx:33-34`

```tsx
<a href="#main-content" className="skip-to-main">
  Skip to main content
</a>
```

### Test Results

| Test | Result | Notes |
|------|--------|-------|
| Visibility on focus | ✅ Pass | Appears when Tab pressed |
| Target exists | ✅ Pass | `#main-content` on `<main>` element |
| Skips to content | ✅ Pass | Focus moves to main content area |
| Text is descriptive | ✅ Pass | "Skip to main content" |
| Works in both locales | ⚠️ Partial | Text not translated (always English) |

### Recommendation

| Priority | Issue | Fix |
|----------|-------|-----|
| Low | Skip link text not translated | Use `useTranslations()` for "Salta al contenuto principale" / "Skip to main content" |

---

## 3. Focus Indicators

### Component Analysis

**File:** `components/ui/Button.tsx:16`

```tsx
'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary'
```

### Test Results

| Element Type | Focus Style | Color | Contrast | Status |
|--------------|-------------|-------|----------|--------|
| Buttons | 4px ring | Electric Blue (#0D7EFF) | 3.85:1 on white | ✅ Pass (UI component) |
| Links | Bottom underline + color change | Electric Blue | Good | ✅ Pass |
| Navigation | Border-bottom expand | Electric Blue | Good | ✅ Pass |
| Form Inputs | Border color change | Neon Pink | 3.83:1 | ✅ Pass (border = 3:1 min) |
| Cards | Translate + shadow | N/A | N/A | ✅ Pass |

### Focus Visibility Check

```
[Tested interactive elements]
✅ All buttons have visible focus ring
✅ All links have visible focus state
✅ Form inputs change border color on focus
✅ Focus never disappears unexpectedly
```

**Assessment:** ✅ **PASS** - Focus indicators meet WCAG 2.4.7 requirements.

---

## 4. Modal Focus Management

### Modals Analyzed

1. **GoogleCalendarPopup** (`components/ui/GoogleCalendarPopup.tsx`)
2. **CertificationModal** (`components/ui/CertificationModal.tsx`)
3. **TestimonialModal** (`components/ui/TestimonialModal.tsx`)

### Comparison Table

| Feature | GoogleCalendarPopup | CertificationModal | TestimonialModal |
|---------|---------------------|-------------------|------------------|
| Opens with animation | ✅ | ✅ | ✅ |
| `role="dialog"` | ✅ | ❌ Missing | ❌ Missing |
| `aria-modal="true"` | ✅ | ❌ Missing | ❌ Missing |
| `aria-label` | ✅ | ❌ Missing | ❌ Missing |
| Focus trap | ✅ Implemented | ❌ Missing | ❌ Missing |
| Escape key closes | ✅ Implemented | ❌ Missing | ❌ Missing |
| Auto-focus on open | ✅ Close button | ❌ Missing | ❌ Missing |
| Return focus on close | ✅ (via useEffect cleanup) | ❌ Missing | ❌ Missing |
| Backdrop closes modal | ✅ | ✅ | ✅ |
| Close button | ✅ With aria-label | ✅ With aria-label | ✅ With aria-label |

### GoogleCalendarPopup (Reference Implementation) ✅

**File:** `components/ui/GoogleCalendarPopup.tsx`

**Good Practices Implemented:**

```tsx
// Focus trap (lines 57-84)
useEffect(() => {
  if (!isOpen) return;
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const modal = modalRef.current;
    // ... focus trap logic
  };
  window.addEventListener('keydown', handleTabKey);
  return () => window.removeEventListener('keydown', handleTabKey);
}, [isOpen]);

// Escape key (lines 46-55)
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      handleClose();
    }
  };
  window.addEventListener('keydown', handleEscape);
  return () => window.removeEventListener('keydown', handleEscape);
}, [isOpen, handleClose]);

// Auto-focus close button (lines 34-35)
setTimeout(() => closeButtonRef.current?.focus(), 100);
```

### CertificationModal & TestimonialModal (Issues) ❌

**Files:**
- `components/ui/CertificationModal.tsx`
- `components/ui/TestimonialModal.tsx`

**Missing Implementations:**

| Missing Feature | Impact | WCAG |
|----------------|--------|------|
| `role="dialog"` + `aria-modal="true"` | Screen readers don't announce modal | 4.1.2 |
| Focus trap | Users can Tab outside modal while it's open | 2.1.2 |
| Escape key handler | Users can't close modal with keyboard | 2.1.1 |
| Auto-focus management | Focus doesn't move to modal content | 2.4.3 |
| Return focus | Focus lost when modal closes | 2.4.3 |

---

## 5. Form Accessibility

### Anonymous Question Form

**File:** `components/forms/AnonymousQuestionForm.tsx`

### Issues Found

| Element | Issue | Impact | WCAG |
|---------|-------|--------|------|
| Textarea | No `<label>` element | Screen readers only announce placeholder | 1.3.1, 3.3.2 |
| Textarea | No `id` attribute | Cannot associate label | 1.3.1 |
| Error message | No `aria-describedby` | Screen readers don't announce errors | 4.1.3 |
| Success message | No `aria-live` region | Changes not announced | 4.1.3 |
| Submit button | ✅ Good | Has text content + icon | - |

### Current Implementation

```tsx
// Line 112-119
<textarea
  placeholder={t.questionPlaceholder}
  value={formData.question}
  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
  required
  rows={4}
  className="..."
/>
```

### Recommended Fix

```tsx
// Add unique ID and associate with visible label
<label htmlFor="anonymous-question" className="sr-only">
  {t.questionPlaceholder}
</label>
<textarea
  id="anonymous-question"
  aria-describedby={submitStatus === 'error' ? 'question-error' : undefined}
  aria-invalid={submitStatus === 'error'}
  placeholder={t.questionPlaceholder}
  ...
/>
{submitStatus === 'error' && (
  <p id="question-error" role="alert" className="...">
    <AlertCircle /> {errorMessage}
  </p>
)}
```

---

## 6. Mobile Menu Focus Management

### Header Component

**File:** `components/ui/Header.tsx`

### Issues Found

| Issue | Impact | Status |
|-------|--------|--------|
| No focus trap when open | Users can Tab to elements behind overlay | ⚠️ Medium |
| No Escape key handler | Users can't close menu with keyboard | ⚠️ Medium |
| No auto-focus on open | Focus stays on trigger, not menu | ⚠️ Low |
| Closes on route change | ✅ Good - closes when link clicked | ✅ Pass |

### Current Implementation

```tsx
// Line 136-150
{mobileMenuOpen && (
  <nav className="lg:hidden mt-4 pt-4 border-t-brutal-thin border-black">
    <div className="flex flex-col gap-2">
      {navLinks.map((link) => (
        <a key={link.href} href={link.href} className="...">
          {link.label}
        </a>
      ))}
    </div>
  </nav>
)}
```

### Missing

- No `<nav aria-label="Mobile navigation">`
- No `aria-expanded` on toggle button
- No focus management when opened/closed
- No keyboard trap when menu is open

---

## 7. E2E Test Results

### Playwright Accessibility Tests

**File:** `e2e/accessibility.spec.ts`

| Test | Result | Duration |
|------|--------|----------|
| `should support keyboard navigation` | ✅ Pass | 6.5s |
| `should have proper focus indicators` | ✅ Pass | 5.8s |
| `should have skip to main content link` | ✅ Pass | 6.2s |

### Test Coverage

```typescript
// Lines 75-89 - Tab navigation test
test('should support keyboard navigation', async ({ page }) => {
  await page.goto('/');
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  }
  await page.keyboard.press('Shift+Tab');
  const focusedElement = page.locator(':focus');
  await expect(focusedElement).toBeVisible();
});
```

---

## Priority Remediation List

### P0 - Critical (Blocks WCAG AA Compliance)

#### 1. Add Focus Trap to All Modals
**Affected Files:**
- `components/ui/CertificationModal.tsx`
- `components/ui/TestimonialModal.tsx`

**Effort:** 2 hours

**Implementation Pattern (from GoogleCalendarPopup):**
```tsx
// Copy focus trap logic from GoogleCalendarPopup.tsx lines 57-84
```

#### 2. Add Escape Key Handler to All Modals
**Affected Files:**
- `components/ui/CertificationModal.tsx`
- `components/ui/TestimonialModal.tsx`

**Effort:** 30 minutes

**Implementation Pattern:**
```tsx
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  window.addEventListener('keydown', handleEscape);
  return () => window.removeEventListener('keydown', handleEscape);
}, [onClose]);
```

### P1 - High Priority

#### 3. Add ARIA Attributes to Modals
**Affected Files:**
- `components/ui/CertificationModal.tsx`
- `components/ui/TestimonialModal.tsx`

**Changes:**
```tsx
<motion.div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  ...
>
  <h2 id="modal-title">{certification.title}</h2>
</motion.div>
```

#### 4. Fix Anonymous Question Form Labels
**Affected File:** `components/forms/AnonymousQuestionForm.tsx`

**Effort:** 30 minutes

**Changes:**
- Add `id="anonymous-question"` to textarea
- Add visually hidden `<label for="anonymous-question">`
- Add `aria-describedby` for error messages
- Add `role="alert"` to error message

### P2 - Medium Priority

#### 5. Mobile Menu Focus Management
**Affected File:** `components/ui/Header.tsx`

**Effort:** 1 hour

**Changes:**
- Add `aria-expanded` to toggle button
- Add focus trap when menu is open
- Add Escape key handler
- Move focus to first menu item on open

#### 6. Translate Skip Link
**Affected File:** `app/[locale]/layout.tsx`

**Effort:** 15 minutes

**Changes:**
```tsx
const skipText = locale === 'it' ? 'Salta al contenuto principale' : 'Skip to main content';
<a href="#main-content" className="skip-to-main">
  {skipText}
</a>
```

---

## Testing Checklist for Remediation

After implementing fixes, verify:

- [ ] All modals can be closed with Escape key
- [ ] Focus is trapped inside open modals
- [ ] Focus returns to trigger element when modal closes
- [ ] Tab navigation doesn't escape open modal
- [ ] Form errors are announced by screen readers
- [ ] Mobile menu can be operated with keyboard only
- [ ] Skip link is translated for both locales
- [ ] Run `npm test -- --grep accessibility` (all tests pass)

---

## Appendix: Keyboard Shortcuts

### Current Shortcuts (Documented)

| Shortcut | Action | Context |
|----------|--------|---------|
| Tab | Move to next focusable element | Global |
| Shift+Tab | Move to previous focusable element | Global |
| Enter | Activate button/link | When focused |
| Space | Activate button | When focused |
| Escape | Close modal (GoogleCalendarPopup only) | When modal open |

### Recommended Additions

| Shortcut | Action | Context |
|----------|--------|---------|
| Escape | Close all modals | When any modal open |
| Escape | Close mobile menu | When menu open |
| Arrow keys | Navigate within menu | Mobile menu (optional) |

---

## References

- [WCAG 2.1 Keyboard Accessible](https://www.w3.org/WAI/WCAG21/Understanding/keyboard-accessible.html)
- [ARIA Authoring Practices - Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN - ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)
- Test file: `e2e/accessibility.spec.ts`
- Reference implementation: `components/ui/GoogleCalendarPopup.tsx`

---

**Audit Performed By:** Claude Code (Automated Keyboard Navigation Audit)
**Next Steps:** Implement P0 fixes immediately to achieve WCAG AA compliance for keyboard accessibility
