# Core Web Vitals Assessment - selfrules.org

**Assessment Date:** 2026-01-26
**Subtask:** subtask-1-3
**Phase:** Technical SEO Audit

---

## Executive Summary

This assessment analyzes Core Web Vitals (CWV) metrics for selfrules.org, examining both the current Lighthouse CI configuration and identifying critical testing gaps. **Key finding: The site only has desktop testing configured - mobile testing is completely absent from CI/CD validation.**

---

## Current Lighthouse CI Configuration Analysis

### Configuration Source: `lighthouserc.json`

| Setting | Value | Impact |
|---------|-------|--------|
| **Preset** | `desktop` | Only desktop metrics tested |
| **Form Factor** | `desktop` | Mobile experience untested |
| **Mobile Emulation** | `false` | No mobile simulation |
| **Screen Width** | 1350px | Desktop viewport only |
| **Number of Runs** | 3 | Good statistical significance |
| **CPU Slowdown** | 1x | No throttling (desktop conditions) |
| **Network RTT** | 40ms | Fast desktop network |
| **Throughput** | 10240 Kbps | ~10 Mbps (desktop broadband) |

### Configured Thresholds

| Metric | Threshold | Google "Good" | Status |
|--------|-----------|---------------|--------|
| **LCP** (Largest Contentful Paint) | ≤2500ms | ≤2.5s | Aligned |
| **CLS** (Cumulative Layout Shift) | ≤0.1 | ≤0.1 | Aligned |
| **TBT** (Total Blocking Time) | ≤300ms | N/A (proxy for INP) | Set |
| **FCP** (First Contentful Paint) | ≤2000ms | ≤1.8s | Slightly lenient |
| **Speed Index** | ≤3000ms | ≤3.4s | Good |
| **TTI** (Time to Interactive) | ≤3500ms | ≤3.8s | Good |

**Note:** INP (Interaction to Next Paint) is not directly tested in current config. TBT serves as a lab proxy.

---

## Core Web Vitals Metrics Explained

### LCP (Largest Contentful Paint)
- **What it measures:** Time until the largest content element becomes visible
- **Threshold:** ≤2.5s (good), >4.0s (poor)
- **Current Config:** Testing at 2500ms threshold
- **Likely Elements:** Hero section image, main heading typography

### INP (Interaction to Next Paint)
- **What it measures:** Responsiveness to user interactions
- **Threshold:** ≤200ms (good), >500ms (poor)
- **Current Config:** NOT DIRECTLY TESTED
- **Lab Proxy:** TBT (Total Blocking Time) at 300ms threshold
- **Gap:** INP requires real-user measurement for accuracy

### CLS (Cumulative Layout Shift)
- **What it measures:** Visual stability during page load
- **Threshold:** ≤0.1 (good), >0.25 (poor)
- **Current Config:** Testing at 0.1 threshold
- **Common Causes:** Images without dimensions, dynamic content injection, web fonts

---

## Critical Gap: Mobile Testing Absent

### Impact Assessment

| Factor | Desktop-Only Risk | Mobile Reality |
|--------|-------------------|----------------|
| **User Traffic** | ~40% desktop | ~60% mobile (global average) |
| **Google Ranking** | Mobile-first indexing | Mobile CWV used for ALL rankings |
| **Network Conditions** | 10 Mbps simulated | Often 3G/4G variable speeds |
| **CPU Performance** | 1x (no throttling) | 4x slowdown typical for mobile |
| **Viewport** | 1350px | 375-428px typical mobile |

### Severity: HIGH

Google uses **mobile CWV scores** for ranking ALL pages, regardless of device. Testing only desktop means:
- No visibility into actual mobile performance
- CI/CD passes despite potential mobile failures
- SEO ranking impact unknown

---

## Recommended Configuration Changes

### 1. Add Mobile Testing Profile

```json
{
  "ci": {
    "collect": {
      "settings": {
        "preset": "mobile",
        "throttling": {
          "rttMs": 150,
          "throughputKbps": 1638,
          "cpuSlowdownMultiplier": 4
        },
        "screenEmulation": {
          "mobile": true,
          "width": 412,
          "height": 823,
          "deviceScaleFactor": 2.625,
          "disabled": false
        },
        "formFactor": "mobile"
      }
    }
  }
}
```

### 2. Dual-Profile Strategy

Run Lighthouse CI with both profiles:
- **Desktop profile:** Current configuration (fast network, no CPU throttling)
- **Mobile profile:** 4G network simulation, 4x CPU slowdown, mobile viewport

### 3. Add INP Monitoring

Since INP cannot be measured in lab:
- Integrate Real User Monitoring (RUM) via Umami or Google Search Console
- Monitor field data from Chrome User Experience Report (CrUX)

---

## PageSpeed Insights Reference

### How to Run Manual Tests

1. **Desktop Test:**
   ```
   https://pagespeed.web.dev/analysis?url=https://selfrules.org&form_factor=desktop
   ```

2. **Mobile Test:**
   ```
   https://pagespeed.web.dev/analysis?url=https://selfrules.org&form_factor=mobile
   ```

### Expected Metrics to Monitor

| Metric | Mobile Target | Desktop Target |
|--------|---------------|----------------|
| **LCP** | ≤2.5s | ≤2.5s |
| **INP** | ≤200ms | ≤200ms |
| **CLS** | ≤0.1 | ≤0.1 |
| **FCP** | ≤1.8s | ≤1.8s |
| **TTFB** | ≤800ms | ≤800ms |

---

## Site-Specific Performance Factors

### Observed from Page Analysis

| Factor | Status | Impact on CWV |
|--------|--------|---------------|
| **Framework** | Next.js 14 | SSR/SSG options for fast LCP |
| **Fonts** | Preloaded (Space Grotesk, Inter, JetBrains Mono) | Good - prevents CLS from font swap |
| **Images** | Multiple hero assets | Potential LCP optimization target |
| **JavaScript** | Chunked, React-based | Potential TBT/INP impact |
| **Analytics** | Umami (lightweight) | Minimal impact |
| **Animations** | Framer Motion | Could cause CLS if not handled properly |

### Recommendations for LCP Optimization

1. **Hero Image Optimization:**
   - Use `next/image` with priority loading
   - Implement WebP format with fallbacks
   - Set explicit width/height to prevent CLS

2. **Font Loading:**
   - Already preloaded (good)
   - Verify `font-display: swap` is set
   - Consider subsetting for faster load

3. **Critical CSS:**
   - Inline above-the-fold styles
   - Defer non-critical CSS

### Recommendations for CLS Prevention

1. **Image Dimensions:**
   - All images must have explicit width/height
   - Use aspect-ratio CSS for responsive images

2. **Dynamic Content:**
   - Reserve space for skeleton loaders
   - Avoid inserting content above existing content

3. **Animations:**
   - Use transform/opacity only
   - Avoid layout-triggering properties

---

## Assessment Scores

### Lighthouse CI Configuration Health

| Aspect | Score | Notes |
|--------|-------|-------|
| **Desktop Testing** | 90/100 | Well-configured thresholds |
| **Mobile Testing** | 0/100 | Not configured at all |
| **Threshold Alignment** | 85/100 | FCP slightly lenient |
| **INP Coverage** | 30/100 | Only TBT proxy available |

### Overall CWV Testing Score: 51/100

**Breakdown:**
- Desktop configuration: +45 points
- Mobile configuration gap: -40 points
- INP measurement gap: -9 points
- Threshold alignment: +5 points

---

## Priority Actions

| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| **HIGH** | Add mobile Lighthouse profile | Medium | Critical for SEO |
| **HIGH** | Run manual PageSpeed tests (mobile + desktop) | Low | Immediate visibility |
| **MEDIUM** | Integrate CrUX/RUM for INP monitoring | Medium | Real user data |
| **MEDIUM** | Audit hero section for LCP optimization | Medium | Performance improvement |
| **LOW** | Tighten FCP threshold to 1800ms | Low | Alignment with Google standards |

---

## Summary

**Current State:**
- Lighthouse CI is configured but only tests desktop performance
- Thresholds are generally aligned with Google's recommendations
- INP (a Core Web Vital since March 2024) is not directly measured

**Critical Gaps:**
1. **No mobile testing** - Google ranks using mobile CWV scores
2. **No INP measurement** - Only lab proxy (TBT) available
3. **No field data integration** - CrUX/RUM not configured

**Recommended Next Steps:**
1. Add mobile Lighthouse profile immediately
2. Run manual PageSpeed Insights tests for current baseline
3. Set up RUM for INP monitoring
4. Optimize hero section for LCP

---

*Assessment completed as part of SEO Consultant Audit for selfrules.org*
