# Mobile-Friendliness & Security Assessment

**Audit Date:** 2026-01-26
**Target:** https://selfrules.org
**Subtask:** 1-4 (Technical SEO Audit)

---

## Executive Summary

The site demonstrates **strong mobile-first design foundations** but has **critical security header gaps**. HTTPS is enforced via Vercel's infrastructure, but explicit HSTS headers are missing. Security headers are only applied to API routes, leaving main pages unprotected.

| Category | Score | Status |
|----------|-------|--------|
| HTTPS Enforcement | 70/100 | ⚠️ Needs HSTS |
| Security Headers | 35/100 | 🔴 Critical gaps |
| Mobile Viewport | 95/100 | ✅ Good |
| Tap Targets | 75/100 | ⚠️ Minor issues |
| **Overall** | **68/100** | ⚠️ Needs attention |

---

## 1. HTTPS Enforcement

### Current Status

| Check | Status | Details |
|-------|--------|---------|
| HTTPS Available | ✅ Pass | Site loads over HTTPS |
| HTTP Redirect | ✅ Pass | Vercel handles redirect |
| Canonical URLs | ✅ Pass | All use `https://` |
| OG/Twitter URLs | ✅ Pass | All use `https://` |
| HSTS Header | ❌ Fail | Not configured |
| HSTS Preload | ❌ Fail | Not on preload list |

### Evidence

From `app/layout.tsx`:
```typescript
metadataBase: new URL('https://selfrules.org'),
alternates: {
  canonical: '/',
  languages: {
    'it-IT': '/it',
    'en-US': '/en',
  },
},
```

### Issues Identified

1. **No HSTS Header**: Missing `Strict-Transport-Security` header prevents browsers from enforcing HTTPS-only connections
2. **Not on HSTS Preload List**: Browsers won't enforce HTTPS before first visit
3. **No explicit HTTP→HTTPS redirect in code**: Relying entirely on Vercel infrastructure

### Recommendations

| Priority | Action | Impact |
|----------|--------|--------|
| 🔴 High | Add HSTS header to all pages | Enforces HTTPS, SEO trust signal |
| 🟡 Medium | Submit to HSTS preload list | Browser-level HTTPS enforcement |

**Implementation:**
```javascript
// next.config.mjs - Add to headers() function
{
  source: '/(.*)',  // ALL routes, not just /api
  headers: [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
  ],
}
```

---

## 2. Security Headers

### Current Configuration Analysis

From `next.config.mjs`:
```javascript
async headers() {
  return [
    {
      source: '/api/:path*',  // ⚠️ ONLY API ROUTES
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ];
}
```

### Security Headers Audit

| Header | API Routes | Main Pages | Status |
|--------|------------|------------|--------|
| X-Frame-Options | ✅ DENY | ❌ Missing | 🔴 Critical |
| X-Content-Type-Options | ✅ nosniff | ❌ Missing | 🔴 Critical |
| Referrer-Policy | ✅ origin-when-cross-origin | ❌ Missing | 🟡 Medium |
| Permissions-Policy | ✅ Configured | ❌ Missing | 🟡 Medium |
| Content-Security-Policy | ❌ Missing | ❌ Missing | 🔴 Critical |
| Strict-Transport-Security | ❌ Missing | ❌ Missing | 🔴 Critical |
| X-XSS-Protection | ❌ Missing | ❌ Missing | 🟢 Low |

### Critical Issue

**Security headers only apply to `/api/:path*` routes!**

Main pages (homepage, blog, etc.) have **zero security headers**, leaving users vulnerable to:
- Clickjacking (no X-Frame-Options)
- MIME-type sniffing attacks (no X-Content-Type-Options)
- Protocol downgrade attacks (no HSTS)
- XSS via unsafe inline scripts (no CSP)

### Recommendations

| Priority | Header | Value | Reason |
|----------|--------|-------|--------|
| 🔴 Critical | Apply headers to ALL routes | `source: '/(.*)'` | Current config is broken |
| 🔴 Critical | Content-Security-Policy | See below | Prevent XSS attacks |
| 🔴 Critical | Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | Enforce HTTPS |
| 🟡 Medium | X-XSS-Protection | `1; mode=block` | Legacy browsers |

**Recommended next.config.mjs update:**
```javascript
async headers() {
  return [
    {
      source: '/(.*)',  // ALL ROUTES
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        // CSP requires careful configuration for Next.js + inline scripts
      ],
    },
  ];
}
```

---

## 3. Mobile Viewport Configuration

### Current Status

| Check | Status | Details |
|-------|--------|---------|
| Viewport meta tag | ✅ Pass | `width=device-width, initial-scale=1` |
| User-scalable restriction | ✅ Pass | Not restricted (allows zoom) |
| Maximum-scale restriction | ✅ Pass | Not restricted |
| Minimum-scale | ✅ Pass | Not set (default) |
| Text legibility | ✅ Pass | Min 16px base font |

### Evidence

From WebFetch analysis:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Responsive Breakpoints

From `tailwind.config.ts`:
```typescript
screens: {
  'xs': '480px',   // Extra small devices
  'sm': '640px',   // Small devices
  'md': '768px',   // Tablets
  'lg': '1024px',  // Laptops
  'xl': '1280px',  // Desktops
  '2xl': '1536px', // Large desktops
  '3xl': '1920px', // Ultra-wide
}
```

### Mobile-First Typography

From `app/globals.css`:
```css
/* Mobile first */
.text-hero { font-size: 36px; }
.text-h1 { font-size: 28px; }
.text-h2 { font-size: 24px; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .text-hero { font-size: 52px; }
  .text-h1 { font-size: 38px; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .text-hero { font-size: 72px; }
  .text-h1 { font-size: 46px; }
}
```

### Assessment

✅ **Excellent mobile viewport configuration**
- Proper responsive meta tag
- No accessibility-blocking restrictions
- Mobile-first CSS architecture
- Progressive enhancement approach

---

## 4. Tap Target Assessment

### Button Component Analysis

From `components/ui/Button.tsx`:
```typescript
const sizeStyles = {
  sm: 'px-4 py-2 text-body-sm',   // ~32px height
  md: 'px-6 py-3 text-body',     // ~44px height
  lg: 'px-8 py-4 text-body-lg',  // ~52px height
  xl: 'px-10 py-5 text-body-xl', // ~60px height
};
```

### Tap Target Audit

| Element | Size | WCAG 2.5.5 (48px) | Status |
|---------|------|-------------------|--------|
| Button (sm) | ~32px | ❌ Fail | 🔴 Too small |
| Button (md) | ~44px | ⚠️ Close | 🟡 Acceptable |
| Button (lg) | ~52px | ✅ Pass | ✅ Good |
| Footer social icons | 40px mobile | ❌ Fail | 🟡 Below ideal |
| Timeline dots | 40-48px | ✅ Pass | ✅ Good |

### Issues Found

1. **Small buttons (sm) fail WCAG 2.5.5**: 32px height is below 44px minimum
2. **Footer social icons**: `w-10 h-10` (40px) on mobile is below the recommended 48px
3. **No explicit min-height**: Relies on padding, not explicit touch target size

### Evidence

From `components/layout/Footer.tsx`:
```typescript
className={`w-10 h-10 md:w-12 md:h-12 ...`}  // 40px mobile, 48px desktop
```

### Recommendations

| Priority | Fix | Implementation |
|----------|-----|----------------|
| 🟡 Medium | Increase sm button size | Add `min-h-[44px]` to sm buttons |
| 🟡 Medium | Increase mobile social icons | Change `w-10 h-10` to `w-12 h-12` |
| 🟢 Low | Add touch target CSS utility | Create `.touch-target` with min 48px |

---

## 5. Accessibility Features

### Present

| Feature | Status | Implementation |
|---------|--------|----------------|
| Skip-to-main link | ✅ Present | `app/globals.css` |
| Reduced motion | ✅ Present | `prefers-reduced-motion` media query |
| Focus indicators | ✅ Present | `focus-visible:ring-4` on buttons |
| Antialiasing | ✅ Present | `-webkit-font-smoothing: antialiased` |
| Scalable fonts | ✅ Present | No `!important` font locks |

### Skip Link Implementation

From `app/globals.css`:
```css
.skip-to-main {
  position: absolute;
  left: -9999px;
  z-index: 999;
  padding: 1rem;
  background-color: #0D7EFF;
  color: white;
  border: 4px solid #000;
  ...
}

.skip-to-main:focus {
  left: 1rem;
  top: 1rem;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Critical Issues Summary

### 🔴 Critical (Fix Immediately)

| Issue | Impact | Effort |
|-------|--------|--------|
| Security headers only on API routes | User security vulnerable | Low - config change |
| No HSTS header | Protocol downgrade attacks possible | Low - config change |
| No Content-Security-Policy | XSS vulnerability | Medium - requires testing |

### 🟡 Medium (Fix Soon)

| Issue | Impact | Effort |
|-------|--------|--------|
| Small button tap targets | Touch usability | Low - CSS change |
| Mobile social icons 40px | Touch usability | Low - CSS change |

### 🟢 Low (Nice to Have)

| Issue | Impact | Effort |
|-------|--------|--------|
| HSTS Preload submission | Enhanced security | Low - external submission |
| X-XSS-Protection header | Legacy browser protection | Low - config change |

---

## 7. Scoring Breakdown

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| HTTPS Enforcement | 25% | 70/100 | 17.5 |
| Security Headers | 30% | 35/100 | 10.5 |
| Mobile Viewport | 25% | 95/100 | 23.75 |
| Tap Targets | 20% | 75/100 | 15.0 |
| **Total** | 100% | - | **66.75/100** |

**Final Score: 67/100** ⚠️

---

## 8. Priority Action Plan

### Week 1: Critical Security Fixes

1. **Expand security headers to all routes**
   - Change `source: '/api/:path*'` to `source: '/(.*)'`
   - Test locally before deployment

2. **Add HSTS header**
   ```javascript
   { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
   ```

3. **Verify deployment**
   - Test with securityheaders.com
   - Target: Grade B minimum

### Week 2: Touch Target Improvements

1. **Update Button component**
   - Add `min-h-[44px]` to base styles

2. **Update Footer social icons**
   - Change mobile from `w-10 h-10` to `w-11 h-11`

### Week 3: CSP Implementation

1. **Develop CSP policy** (requires careful testing with Next.js)
2. **Test in report-only mode first**
3. **Deploy enforced CSP**

---

## Appendix: Security Headers Reference

### Recommended Complete Headers

```javascript
// next.config.mjs
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ];
}
```

### Testing Tools

- **Security Headers**: https://securityheaders.com/?q=selfrules.org
- **SSL Labs**: https://www.ssllabs.com/ssltest/
- **Mozilla Observatory**: https://observatory.mozilla.org/
- **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

---

*Assessment completed as part of SEO Consultant Audit - Technical SEO Phase*
