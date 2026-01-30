# Core Web Vitals Report - selfrules.org

## Executive Summary

This document provides comprehensive Core Web Vitals measurements for selfrules.org, analyzing the three key metrics that Google uses for search ranking and user experience assessment: **LCP** (Largest Contentful Paint), **INP** (Interaction to Next Paint), and **CLS** (Cumulative Layout Shift).

### Overall Status

| Metric | Desktop | Mobile | Target | Status |
|--------|---------|--------|--------|--------|
| **LCP** | 0.7s | 3.1s | < 2.5s | Desktop ✅ / Mobile ❌ |
| **INP/TBT** | 0ms | 50-102ms | < 200ms | ✅ PASS |
| **CLS** | 0 | 0 | < 0.1 | ✅ PASS |

**Key Finding:** Mobile LCP is the critical issue requiring immediate optimization attention.

---

## 1. LCP (Largest Contentful Paint)

### Definition
LCP measures the time it takes for the largest visible content element (image, video, or text block) to render on the screen from when the user first requests the page.

### Thresholds
| Rating | Time |
|--------|------|
| 🟢 Good | ≤ 2.5s |
| 🟡 Needs Improvement | 2.5s - 4.0s |
| 🔴 Poor | > 4.0s |

### Measurements

#### Production (selfrules.org) - Desktop
| Locale | LCP Value | Rating | Score |
|--------|-----------|--------|-------|
| Italian (`/it`) | **0.7s** (697ms) | 🟢 Good | 100 |
| English (`/en`) | **0.7s** (675ms) | 🟢 Good | 100 |

#### Production (selfrules.org) - Mobile (Simulated 4G)
| Locale | LCP Value | Rating | Score |
|--------|-----------|--------|-------|
| Italian (`/it`) | **3.1s** (3056ms) | 🟡 Needs Improvement | 91 |
| English (`/en`) | **3.1s** (3062ms) | 🟡 Needs Improvement | 93 |

#### Simulated Tests (Lighthouse)
| Device | LCP Value | Rating |
|--------|-----------|--------|
| Desktop | **1.3s** (1256ms) | 🟢 Good |
| Mobile | **3.2s** (3151ms) | 🟡 Needs Improvement |

### LCP Analysis

**Desktop Performance: EXCELLENT**
- LCP well under 1 second on production
- Fast server response (63-91ms TTFB)
- Efficient resource loading

**Mobile Performance: NEEDS OPTIMIZATION**
- LCP exceeds the 2.5s threshold by ~600ms
- Main contributing factors:
  1. **Network latency** on throttled connections
  2. **JavaScript execution** blocking paint
  3. **Resource prioritization** not optimized for mobile

### LCP Optimization Recommendations

1. **Image Optimization** (High Priority)
   - Implement `priority` attribute on hero images
   - Use `sizes` attribute for responsive images
   - Consider WebP format with AVIF fallback
   - Expected improvement: 300-500ms

2. **Resource Hints** (Medium Priority)
   - Add `<link rel="preload">` for critical fonts
   - Preconnect to critical third-party origins
   - Expected improvement: 100-200ms

3. **Server-Side Rendering Optimization**
   - Ensure critical content is in initial HTML
   - Reduce client-side rendering blocking LCP element
   - Expected improvement: 200-300ms

---

## 2. INP (Interaction to Next Paint)

### Definition
INP measures the latency of all user interactions (clicks, taps, keyboard inputs) throughout the page lifecycle. It replaced FID (First Input Delay) in March 2024 as the official Core Web Vital for responsiveness.

### Thresholds
| Rating | Time |
|--------|------|
| 🟢 Good | ≤ 200ms |
| 🟡 Needs Improvement | 200ms - 500ms |
| 🔴 Poor | > 500ms |

### Measurements (via TBT proxy)

Lighthouse measures **Total Blocking Time (TBT)** as a proxy for INP during lab tests. TBT represents the total time the main thread was blocked for long enough to prevent input responsiveness.

#### Production Results
| Locale | Device | TBT | Estimated INP | Rating |
|--------|--------|-----|---------------|--------|
| Italian (`/it`) | Desktop | **0ms** | ~0-50ms | 🟢 Excellent |
| Italian (`/it`) | Mobile | **50ms** | ~50-100ms | 🟢 Good |
| English (`/en`) | Desktop | **0ms** | ~0-50ms | 🟢 Excellent |
| English (`/en`) | Mobile | **102ms** | ~100-150ms | 🟢 Good |

#### Simulated Tests
| Device | TBT | Estimated INP | Rating |
|--------|-----|---------------|--------|
| Desktop | **0ms** | ~0-50ms | 🟢 Excellent |
| Mobile | **142ms** | ~150-200ms | 🟢 Good (borderline) |

### INP Analysis

**Status: PASSING**
- Desktop INP is excellent (0ms blocking time)
- Mobile INP is within acceptable range but near threshold
- No long tasks blocking the main thread significantly

**Main Thread Work Breakdown (Desktop):**
| Category | Time |
|----------|------|
| Other | 235ms |
| Style & Layout | 180ms |
| Script Evaluation | 107ms |
| Rendering | 30ms |
| Script Parsing | 13ms |
| **Total** | **568ms** |

### INP Recommendations

1. **Code Splitting** (Preventive)
   - Continue using dynamic imports for non-critical components
   - Keep main thread work under 200ms
   - Status: Currently acceptable

2. **Event Handler Optimization**
   - Ensure click/tap handlers don't block main thread
   - Use `requestIdleCallback` for non-urgent updates
   - Status: Currently acceptable

---

## 3. CLS (Cumulative Layout Shift)

### Definition
CLS measures the total of all individual layout shift scores that occur during the entire lifespan of the page. A layout shift occurs when a visible element changes its position from one rendered frame to the next.

### Thresholds
| Rating | Score |
|--------|-------|
| 🟢 Good | ≤ 0.1 |
| 🟡 Needs Improvement | 0.1 - 0.25 |
| 🔴 Poor | > 0.25 |

### Measurements

#### Production Results
| Locale | Device | CLS Value | Rating |
|--------|--------|-----------|--------|
| Italian (`/it`) | Desktop | **0.00006** | 🟢 Excellent |
| Italian (`/it`) | Mobile | **0** | 🟢 Excellent |
| English (`/en`) | Desktop | **0.00006** | 🟢 Excellent |
| English (`/en`) | Mobile | **0** | 🟢 Excellent |

#### Simulated Tests
| Device | CLS Value | Rating |
|--------|-----------|--------|
| Desktop | **0.006** | 🟢 Excellent |
| Mobile | **0** | 🟢 Excellent |

### CLS Analysis

**Status: EXCELLENT**
- CLS is virtually zero across all tests
- No layout shifts detected during page load
- Excellent visual stability

**Why CLS is Excellent:**
1. **Font display strategy**: Fonts load without causing text reflow
2. **Image dimensions**: Images have explicit width/height or aspect ratio
3. **Dynamic content**: Animations use Framer Motion (transform-based, no layout shifts)
4. **Skeleton loaders**: Content placeholders prevent layout jumps

### CLS Best Practices (Currently Implemented)

✅ Explicit dimensions on images
✅ Font-display: swap with preloaded fonts
✅ CSS transforms for animations (not position changes)
✅ Reserved space for dynamic content
✅ No late-injecting ads or embeds

---

## 4. Summary by Page/Locale

### Homepage - Italian (`/it`)

| Metric | Desktop | Mobile | Status |
|--------|---------|--------|--------|
| LCP | 0.7s | 3.1s | ⚠️ Mobile needs work |
| INP/TBT | 0ms | 50ms | ✅ Passing |
| CLS | 0 | 0 | ✅ Excellent |
| **Performance Score** | **100** | **91** | Good |

### Homepage - English (`/en`)

| Metric | Desktop | Mobile | Status |
|--------|---------|--------|--------|
| LCP | 0.7s | 3.1s | ⚠️ Mobile needs work |
| INP/TBT | 0ms | 102ms | ✅ Passing |
| CLS | 0 | 0 | ✅ Excellent |
| **Performance Score** | **100** | **93** | Good |

---

## 5. Field Data vs Lab Data

### Current Measurements (Lab Data)

All metrics above are from **lab data** (Lighthouse simulations). Lab data is useful for:
- Identifying issues before they affect users
- Reproducible testing conditions
- Debugging specific problems

### Recommended Field Data Collection

To complement lab testing, implement **Real User Monitoring (RUM)**:

```javascript
// Example: web-vitals library integration
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP((metric) => {
  // Report to analytics
  umami.track('cwv-lcp', { value: metric.value });
});

onINP((metric) => {
  umami.track('cwv-inp', { value: metric.value });
});

onCLS((metric) => {
  umami.track('cwv-cls', { value: metric.value });
});
```

**Benefits of Field Data:**
- Reflects actual user experience
- Captures device/network diversity
- Required for Google Search Console CWV report

---

## 6. Google Search Console Implications

### Current Status Assessment

| Metric | Assessment | SEO Impact |
|--------|------------|------------|
| LCP (Mobile) | Needs Improvement | ⚠️ May affect rankings |
| INP | Good | ✅ No impact |
| CLS | Good | ✅ No impact |

### Recommendations for SEO

1. **Priority: Fix Mobile LCP**
   - Target: Reduce from 3.1s to < 2.5s
   - Expected SEO benefit: Improved mobile rankings
   - Effort: Medium (image optimization, resource hints)

2. **Maintain Current CLS Excellence**
   - Continue best practices for visual stability
   - Monitor for regressions with new features

3. **Monitor INP in Field**
   - Lab TBT is borderline on mobile (142ms)
   - Implement RUM to catch real-world issues

---

## 7. Detailed Optimization Roadmap

### Week 1: Quick Wins (LCP Focus)

| Task | Expected LCP Improvement | Effort |
|------|-------------------------|--------|
| Add `priority` to hero image | 200-300ms | Low |
| Preload critical fonts | 50-100ms | Low |
| Add preconnect hints | 50-100ms | Low |
| **Total Estimated** | **300-500ms** | |

### Week 2-3: Medium Effort (LCP Focus)

| Task | Expected LCP Improvement | Effort |
|------|-------------------------|--------|
| Implement responsive images | 200-400ms | Medium |
| Optimize hero section SSR | 100-200ms | Medium |
| Lazy load below-fold images | 100-200ms (indirect) | Low |
| **Total Estimated** | **400-800ms** | |

### Projected Results

| Metric | Current | Target | Projected |
|--------|---------|--------|-----------|
| LCP (Mobile) | 3.1s | < 2.5s | **~2.2-2.4s** |
| INP (Mobile) | 50-102ms | < 200ms | Maintained |
| CLS | 0 | < 0.1 | Maintained |

---

## 8. Audit Metadata

| Field | Value |
|-------|-------|
| Audit Date | January 26, 2026 |
| Lighthouse Version | 13.0.1 |
| Production URL | https://selfrules.org |
| Locales Tested | `/it`, `/en` |
| Devices | Desktop, Mobile (simulated 4G) |
| Tool | Lighthouse CLI + PageSpeed Insights |

---

## Conclusion

The selfrules.org website demonstrates **excellent visual stability (CLS)** and **good interactivity (INP)**, but has a **mobile LCP issue** that exceeds Google's recommended threshold.

**Priority Actions:**
1. 🔴 **Critical**: Reduce mobile LCP from 3.1s to under 2.5s
2. 🟡 **Monitor**: Keep TBT/INP under 200ms as features are added
3. 🟢 **Maintain**: Preserve excellent CLS through continued best practices

With the recommended optimizations, the site should achieve **"Good" status across all Core Web Vitals** and maintain strong search engine ranking signals.
