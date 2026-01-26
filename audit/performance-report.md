# Performance Report - selfrules.org
## Comprehensive Front-End Audit

**Audit Date:** January 26, 2026
**Production URL:** https://selfrules.org
**Project:** Next.js 14.2.33 + TypeScript + Tailwind CSS
**Lighthouse Version:** 13.0.1

---

## EXECUTIVE SUMMARY

The selfrules.org website demonstrates **strong desktop performance** with perfect 100% Performance scores, but has **mobile performance challenges** that impact Core Web Vitals compliance. The primary bottleneck is **Mobile LCP at 3.1s** (target: <2.5s).

### Overall Performance Rating: **7.5/10**

| Category | Desktop | Mobile | Status |
|----------|---------|--------|--------|
| Performance | 100 | 91-93 | Good Desktop / Mobile Needs Work |
| Core Web Vitals | All Pass | LCP Fails | Desktop ✅ / Mobile ⚠️ |
| Bundle Health | 7/10 | 7/10 | Good with optimization opportunities |
| Build Pipeline | 6.5/10 | - | Dependency organization issues |

### Key Actions Required:
1. **Critical**: Reduce Mobile LCP from 3.1s to <2.5s (SEO impact)
2. **High**: Fix dependency organization (12 packages misplaced)
3. **Medium**: Optimize homepage bundle from 178 kB to <150 kB
4. **Low**: Implement build caching for design system

---

## 1. LIGHTHOUSE SCORES

### Production Results (selfrules.org)

#### Italian Locale (`/it`)

| Category | Desktop | Mobile |
|----------|---------|--------|
| **Performance** | **100** | **91** |
| Accessibility | 96 | 96 |
| Best Practices | 96 | 96 |
| SEO | 92 | 92 |

#### English Locale (`/en`)

| Category | Desktop | Mobile |
|----------|---------|--------|
| **Performance** | **100** | **93** |
| Accessibility | 96 | 96 |
| Best Practices | 96 | 96 |
| SEO | 92 | 92 |

### Score Analysis

**Desktop Excellence:**
- Perfect 100 Performance score on both locales
- Consistent scores across all categories
- No critical performance bottlenecks

**Mobile Gap (-7 to -9 points):**
- Performance drops significantly on mobile
- Primary cause: Network-constrained resource loading
- LCP element takes 3+ seconds on simulated 4G

### Score Breakdown Visualization

```
         Desktop                     Mobile
Performance:  ████████████████████ 100%   ██████████████████░░ 91-93%
Accessibility ███████████████████░ 96%    ███████████████████░ 96%
Best Practices ███████████████████░ 96%   ███████████████████░ 96%
SEO           ██████████████████░░ 92%    ██████████████████░░ 92%
```

---

## 2. CORE WEB VITALS

### Summary Table

| Metric | Target | Desktop | Mobile | Status |
|--------|--------|---------|--------|--------|
| **LCP** | < 2.5s | **0.7s** | **3.1s** | Desktop ✅ / Mobile ❌ |
| **INP/TBT** | < 200ms | **0ms** | **50-102ms** | ✅ PASS |
| **CLS** | < 0.1 | **0.00006** | **0** | ✅ EXCELLENT |

### 2.1 LCP (Largest Contentful Paint)

**Thresholds:**
- 🟢 Good: ≤ 2.5s
- 🟡 Needs Improvement: 2.5s - 4.0s
- 🔴 Poor: > 4.0s

**Detailed Measurements:**

| Locale | Device | LCP Value | Score | Rating |
|--------|--------|-----------|-------|--------|
| Italian `/it` | Desktop | **697ms** (0.7s) | 100 | 🟢 Excellent |
| Italian `/it` | Mobile | **3056ms** (3.1s) | 91 | 🟡 Needs Improvement |
| English `/en` | Desktop | **675ms** (0.7s) | 100 | 🟢 Excellent |
| English `/en` | Mobile | **3062ms** (3.1s) | 93 | 🟡 Needs Improvement |

**Analysis:**
- Desktop LCP is exceptional (under 1 second)
- Mobile LCP exceeds threshold by ~600ms
- LCP element: Hero section content (text/image)
- Primary bottleneck: Resource loading on throttled networks

**Impact on SEO:**
- Mobile-first indexing means Google primarily uses mobile performance
- 3.1s LCP may negatively affect search rankings
- Fix priority: **CRITICAL**

### 2.2 INP/TBT (Interaction to Next Paint / Total Blocking Time)

**Thresholds:**
- 🟢 Good: ≤ 200ms
- 🟡 Needs Improvement: 200ms - 500ms
- 🔴 Poor: > 500ms

**Measurements:**

| Locale | Device | TBT | Est. INP | Rating |
|--------|--------|-----|----------|--------|
| Italian `/it` | Desktop | **0ms** | ~0-50ms | 🟢 Excellent |
| Italian `/it` | Mobile | **50ms** | ~50-100ms | 🟢 Good |
| English `/en` | Desktop | **0ms** | ~0-50ms | 🟢 Excellent |
| English `/en` | Mobile | **102ms** | ~100-150ms | 🟢 Good |

**Main Thread Work Breakdown (Desktop):**

| Category | Time |
|----------|------|
| Other | 235ms |
| Style & Layout | 180ms |
| Script Evaluation | 107ms |
| Rendering | 30ms |
| Script Parsing | 13ms |
| **Total** | **568ms** |

**Status:** All measurements within acceptable range. No immediate action required.

### 2.3 CLS (Cumulative Layout Shift)

**Thresholds:**
- 🟢 Good: ≤ 0.1
- 🟡 Needs Improvement: 0.1 - 0.25
- 🔴 Poor: > 0.25

**Measurements:**

| Locale | Device | CLS Value | Rating |
|--------|--------|-----------|--------|
| Italian `/it` | Desktop | **0.00006** | 🟢 Excellent |
| Italian `/it` | Mobile | **0** | 🟢 Excellent |
| English `/en` | Desktop | **0.00006** | 🟢 Excellent |
| English `/en` | Mobile | **0** | 🟢 Excellent |

**Why CLS is Excellent:**
1. Fonts load without causing text reflow
2. Images have explicit width/height or aspect ratio
3. Animations use Framer Motion (transform-based, no layout shifts)
4. Skeleton loaders prevent layout jumps
5. No late-injecting ads or embeds

**Status:** Excellent - no action required.

---

## 3. BUNDLE ANALYSIS

### 3.1 Bundle Size Summary

| Metric | Size | Target | Status |
|--------|------|--------|--------|
| **First Load JS (shared)** | 87.3 kB | <100 kB | ✅ Pass |
| **Homepage First Load** | 178 kB | <150 kB | ❌ **Needs optimization** |
| **Middleware** | 54 kB | <60 kB | ✅ Pass |
| **Total Static Chunks** | ~1.2 MB | <1 MB | ⚠️ Slightly over |

### 3.2 Chunk Breakdown

**Shared First Load JS (87.3 kB):**
```
├─ chunks/117-*.js           31.7 kB (Vendor chunk)
├─ chunks/fd9d1056-*.js      53.6 kB (Vendor chunk)
└─ other shared chunks        1.96 kB
```

**Largest Chunks (Client-Side):**

| Chunk | Size | Contents | Optimization |
|-------|------|----------|--------------|
| `fd9d1056-*.js` | **172.8 KB** | framer-motion, vendors | Consider LazyMotion |
| `framework-*.js` | **139.9 KB** | React 18 framework | Expected |
| `117-*.js` | **124.3 KB** | Shared vendor code | Investigate |
| `polyfills-*.js` | **112.6 KB** | Browser polyfills | Reduce targets |
| `main-*.js` | **117.5 KB** | Next.js runtime | Expected |
| `521-*.js` | **110.5 KB** | Vendor chunk | Investigate |

**Chunk Categories:**
```
Total client-side chunks: ~1.2 MB

├─ Framework/Runtime:     ~257 KB (21%)
├─ Vendor Libraries:      ~408 KB (34%)
├─ Polyfills:             ~113 KB (9%)
├─ Page-Specific:         ~195 KB (16%)
└─ Other Chunks:          ~227 KB (19%)
```

### 3.3 Route Analysis

| Route | Page Size | First Load JS | Status |
|-------|-----------|---------------|--------|
| `/[locale]` (Homepage) | 25.6 kB | **178 kB** | ❌ Above threshold |
| `/design-system` | 20.2 kB | 114 kB | ✅ OK |
| `/demo` | 4.01 kB | 134 kB | ✅ OK |
| `/_not-found` | 873 B | 88.2 kB | ✅ Excellent |

### 3.4 Heavy Dependencies Impact

| Package | Size | Usage | Recommendation |
|---------|------|-------|----------------|
| `firebase` | ~500 KB | Auth | Consider Firebase Lite or modular imports |
| `recharts` | ~300 KB | Charts | Lazy load if used |
| `framer-motion` | ~60 KB | Animations | Use LazyMotion feature |
| `react-markdown` | ~50 KB | Blog | Lazy load for blog only |
| `lucide-react` | ~30 KB | Icons | Use explicit imports |

**Server-Only (Correctly Isolated):**
- `googleapis` (~600 KB) - Calendar API
- `firebase-admin` (~400 KB) - Server Firebase
- `@anthropic-ai/sdk` (~400 KB) - Claude AI

---

## 4. BUILD PERFORMANCE

### 4.1 Build Time Breakdown

```
Total: ~20-30 seconds

├─ Design system generation: 500ms - 2s (2-6%)
├─ TypeScript compilation:   5-8s (17-27%)
├─ ESLint:                   1-2s (3-7%)
├─ Next.js bundling:         10-15s (33-50%)
├─ Image optimization:       2-5s (7-17%)
└─ Output generation:        1-2s (3-7%)
```

### 4.2 Dependency Organization Issues

**Current Status:**
- Production Dependencies: 43 (❌ BLOATED)
- Dev Dependencies: 18 (✅ Good)

**Misplaced Dependencies (should be devDependencies):**

| Package | Category | Impact |
|---------|----------|--------|
| `@types/fs-extra` | Type definitions | +2-5 MB install |
| `@types/node` | Type definitions | +2-5 MB install |
| `@types/react` | Type definitions | +2-5 MB install |
| `@types/react-dom` | Type definitions | +2-5 MB install |
| `@types/uuid` | Type definitions | +2-5 MB install |
| `typescript` | Build tool | +8-12 MB install |
| `tsx` | Build tool | +8-12 MB install |
| `ts-morph` | Build tool | +8-12 MB install |
| `eslint` | Build tool | +8-12 MB install |
| `eslint-config-next` | Build tool | +8-12 MB install |
| `autoprefixer` | Build tool | +8-12 MB install |
| `postcss` | Build tool | +8-12 MB install |

**Impact:** 10-20% slower dependency installation in CI/CD

### 4.3 TypeScript Configuration

**Good Practices Enabled:**
- ✅ `incremental: true` - Caches compilation state
- ✅ `skipLibCheck: true` - Skips declaration file checks
- ✅ `moduleResolution: "bundler"` - Modern, faster resolution
- ✅ `noEmit: true` - Type checking only

**Performance Concern:**
- ⚠️ `downlevelIteration: true` - Adds +5-10% compilation time

---

## 5. BOTTLENECKS IDENTIFIED

### Critical (SEO Impact)

| Issue | Current | Target | Expected Improvement | Priority |
|-------|---------|--------|---------------------|----------|
| Mobile LCP | 3.1s | <2.5s | -600-900ms | 🔴 **CRITICAL** |

### High Priority (Performance)

| Issue | Current | Target | Expected Improvement | Priority |
|-------|---------|--------|---------------------|----------|
| Homepage First Load | 178 kB | <150 kB | -28-48 kB (16-27%) | 🔴 HIGH |
| Dependency misorganization | 43 prod | ~28 prod | -10-20% CI time | 🔴 HIGH |
| Polyfills bundle | 112.6 KB | ~70 KB | -30-40 KB | 🟡 MEDIUM |

### Medium Priority (Build Time)

| Issue | Current | Expected Improvement | Priority |
|-------|---------|---------------------|----------|
| Design system regenerates every build | +500-2000ms | -500-2000ms per build | 🟡 MEDIUM |
| Duplicate test frameworks (Jest + Vitest) | ~200-300 MB | -100-150 MB node_modules | 🟡 MEDIUM |

### Low Priority (Nice to Have)

| Issue | Expected Improvement | Priority |
|-------|---------------------|----------|
| Add AVIF image format | -5-10% image bandwidth | 🟠 LOW |
| Remove `downlevelIteration` | -5-10% TS compilation | 🟠 LOW |

---

## 6. PERFORMANCE METRICS DEEP DIVE

### 6.1 Loading Performance

**Desktop Metrics (Italian Locale):**

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| First Contentful Paint (FCP) | **0.5s** | <1.8s | ✅ Excellent |
| Largest Contentful Paint (LCP) | **0.7s** | <2.5s | ✅ Excellent |
| Speed Index | **0.5s** | <3.4s | ✅ Excellent |
| Time to Interactive | ~0.5s | <3.9s | ✅ Excellent |
| Total Blocking Time | **0ms** | <200ms | ✅ Excellent |

**Mobile Metrics (Italian Locale - Simulated 4G):**

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| First Contentful Paint (FCP) | **1.6s** | <1.8s | ✅ Good |
| Largest Contentful Paint (LCP) | **3.1s** | <2.5s | ❌ Needs Work |
| Speed Index | **4.3s** | <3.4s | ⚠️ Needs Work |
| Time to Interactive | ~3.5s | <3.9s | ✅ Borderline |
| Total Blocking Time | **50ms** | <200ms | ✅ Good |

### 6.2 Server Performance

| Metric | Desktop | Mobile |
|--------|---------|--------|
| Server Response Time (TTFB) | **63ms** | **100ms** |
| Total Byte Weight | 331 KB | 331 KB |
| Main Thread Work | 904ms | 1060ms |
| Bootup Time | 80ms | 311ms |

### 6.3 Resource Utilization

**Transfer Sizes:**
| Resource Type | Size | Notes |
|---------------|------|-------|
| JavaScript | ~178 KB | First load |
| CSS | ~15 KB | Tailwind (purged) |
| HTML | ~15 KB | SSG output |
| Images | ~100 KB | Optimized |
| Fonts | ~50 KB | Self-hosted |

---

## 7. OPTIMIZATION ROADMAP

### Week 1: Quick Wins (LCP Focus)

| Task | Expected LCP Improvement | Effort |
|------|-------------------------|--------|
| Add `priority` to hero image | -200-300ms | Low |
| Preload critical fonts | -50-100ms | Low |
| Add preconnect hints | -50-100ms | Low |
| **Total Estimated** | **-300-500ms** | |

### Week 2-3: Medium Effort

| Task | Expected Improvement | Effort |
|------|---------------------|--------|
| Implement responsive images with `sizes` | -200-400ms LCP | Medium |
| Lazy load recharts components | -20-30 kB bundle | Medium |
| Use Firebase modular SDK | -200-300 kB bundle | Medium |
| Move misplaced dependencies to devDeps | -10-20% CI time | Low |

### Week 4: Polish

| Task | Expected Improvement | Effort |
|------|---------------------|--------|
| Optimize lucide-react imports | -10-20 kB | Low |
| Implement LazyMotion for framer-motion | -10-20 kB | Low |
| Add design system generation caching | -500-2000ms build | Medium |
| Reduce polyfills (modern browsers only) | -30-50 kB | Medium |

### Projected Results

| Metric | Current | Target | Projected After Optimization |
|--------|---------|--------|------------------------------|
| Mobile LCP | 3.1s | <2.5s | **~2.2-2.4s** |
| Homepage First Load | 178 kB | <150 kB | **~130-140 kB** |
| Total Chunks | 1.2 MB | <1 MB | **~900 KB - 1 MB** |
| CI Build Time | ~30s | <25s | **~22-25s** |

---

## 8. SUMMARY SCORECARD

| Aspect | Status | Score | Notes |
|--------|--------|-------|-------|
| **Desktop Performance** | ✅ Excellent | 10/10 | Perfect 100% Lighthouse |
| **Mobile Performance** | ⚠️ Needs Work | 7/10 | LCP exceeds threshold |
| **Core Web Vitals** | ⚠️ Partial Pass | 7/10 | Mobile LCP fails |
| **Bundle Size** | ⚠️ Acceptable | 7/10 | Homepage over target |
| **Build Pipeline** | ⚠️ Needs Work | 6.5/10 | Dependency issues |
| **CLS** | ✅ Excellent | 10/10 | Zero layout shift |
| **INP/TBT** | ✅ Good | 9/10 | Well within targets |
| **OVERALL** | **Good** | **7.5/10** | **20-30% improvement achievable** |

---

## 9. CONCLUSION

selfrules.org demonstrates **excellent desktop performance** with perfect Lighthouse scores and sub-second Core Web Vitals. The primary challenge is **mobile LCP at 3.1s**, which exceeds Google's 2.5s threshold and may impact search rankings under mobile-first indexing.

**Critical Actions:**
1. 🔴 **Reduce Mobile LCP to <2.5s** - Image optimization, resource hints, SSR improvements
2. 🔴 **Reorganize dependencies** - Move 12 packages to devDependencies
3. 🟡 **Optimize homepage bundle** - Target 130-140 kB from current 178 kB

**Strengths:**
- ✅ Perfect desktop performance (100/100)
- ✅ Excellent CLS (zero layout shift)
- ✅ Good interactivity (INP/TBT within targets)
- ✅ Well-structured SSG with proper caching

**Estimated achievable improvement:** 20-30% overall performance gain with medium effort

---

## 10. AUDIT METADATA

| Field | Value |
|-------|-------|
| **Audit Date** | January 26, 2026 |
| **Lighthouse Version** | 13.0.1 |
| **Production URL** | https://selfrules.org |
| **Locales Tested** | `/it`, `/en` |
| **Viewports** | Desktop, Mobile (simulated 4G) |
| **Tools Used** | Lighthouse CLI, Next.js Build Analyzer |
| **Analysis Branch** | `011-front-end-developer-audit` |

---

**Report generated:** January 26, 2026
**Analyst:** Front-End Developer Audit Agent
**Next steps:** Implement Week 1 quick wins for immediate LCP improvement
