# Next.js Bundle Size Analysis Report
## Mattia's Portfolio Website

**Analysis Date:** January 2025
**Project:** Next.js 14.2.33 + TypeScript + Tailwind CSS
**Build Command:** `npm run build`

---

## EXECUTIVE SUMMARY

The bundle analysis reveals **moderate optimization opportunities** with the homepage being the heaviest page at **178 kB First Load JS**. The shared bundle is well-optimized at **87.3 kB**, but several large dependencies could benefit from lazy loading or code splitting.

### Key Findings:
- **First Load JS (shared):** 87.3 kB (Good - under 100 kB target)
- **Homepage First Load:** 178 kB (Above 150 kB threshold)
- **Middleware Size:** 54 kB (Acceptable)
- **Total Static Chunks:** ~1.2 MB
- **Total Build Output:** 533 MB (includes cache/traces)

### Bundle Health Score: **7/10** (Good with room for improvement)

---

## 1. BUILD OUTPUT ANALYSIS

### Route Sizes Summary

| Route | Page Size | First Load JS | Status |
|-------|-----------|---------------|--------|
| `/[locale]` (Homepage) | 25.6 kB | **178 kB** | **Needs optimization** |
| `/design-system` | 20.2 kB | 114 kB | OK |
| `/demo` | 4.01 kB | 134 kB | OK |
| `/_not-found` | 873 B | 88.2 kB | Excellent |
| API Routes | 0 B | 0 B | Server-only |

### First Load JS Breakdown

```
First Load JS shared by all: 87.3 kB
├─ chunks/117-cb1ce7b62bfd23de.js    31.7 kB (Vendor chunk)
├─ chunks/fd9d1056-7071ca6594bb0603.js  53.6 kB (Vendor chunk)
└─ other shared chunks (total)        1.96 kB
```

### Route Types

| Type | Count | Description |
|------|-------|-------------|
| **Static (SSG)** | 2 | `/[locale]` with `/en` and `/it` variants |
| **Dynamic (SSR)** | 14 | API routes (calendar, chat, spotify, etc.) |
| **Static HTML** | 4 | `/_not-found`, `/demo`, `/design-system`, etc. |

---

## 2. CHUNK SIZE ANALYSIS

### Largest Chunks (Client-Side)

| Chunk | Size | Likely Contents | Priority |
|-------|------|-----------------|----------|
| `fd9d1056-*.js` | **172.8 KB** | framer-motion, shared vendors | Monitor |
| `framework-*.js` | **139.9 KB** | React 18 framework | Expected |
| `117-*.js` | **124.3 KB** | Shared vendor code | Investigate |
| `polyfills-*.js` | **112.6 KB** | Browser polyfills | Consider reducing |
| `main-*.js` | **117.5 KB** | Next.js runtime | Expected |
| `521-*.js` | **110.5 KB** | Vendor chunk | Investigate |

### Chunk Categories

```
Total client-side chunks: ~1.2 MB

├─ Framework/Runtime:     ~257 KB (21%)
│   ├─ framework-*.js     139.9 KB
│   └─ main-*.js          117.5 KB
│
├─ Vendor Libraries:      ~408 KB (34%)
│   ├─ fd9d1056-*.js      172.8 KB
│   ├─ 117-*.js           124.3 KB
│   └─ 521-*.js           110.5 KB
│
├─ Polyfills:             ~113 KB (9%)
│   └─ polyfills-*.js     112.6 KB
│
├─ Page-Specific:         ~195 KB (16%)
│   ├─ [locale]/page-*.js  53.6 KB
│   ├─ 651-*.js            57.9 KB
│   └─ others             ~83 KB
│
└─ Other Chunks:          ~227 KB (19%)
```

---

## 3. DEPENDENCY BUNDLE IMPACT

### Heavy Dependencies (Production)

| Package | Estimated Size | Impact | Recommendation |
|---------|----------------|--------|----------------|
| `firebase` | ~500 KB | Client-side auth | Consider Firebase Lite |
| `googleapis` | ~600 KB | Calendar API | Server-only (OK) |
| `@anthropic-ai/sdk` | ~400 KB | Chat API | Server-only (OK) |
| `recharts` | ~300 KB | Charts | Lazy load if used |
| `framer-motion` | ~60 KB | Animations | Tree-shakeable (OK) |
| `react-markdown` | ~50 KB | Blog rendering | Lazy load for blog |
| `lucide-react` | ~30 KB | Icons | Use explicit imports |

### Properly Server-Only Dependencies

These packages appear in the build but are correctly isolated to server:

- `firebase-admin` - Server-side Firebase
- `googleapis` - Google Calendar API
- `@anthropic-ai/sdk` - Claude AI integration
- `ioredis` / `@upstash/redis` - Rate limiting

### Client-Side Concerns

| Issue | Impact | Severity |
|-------|--------|----------|
| `firebase` full bundle | +500 KB if not tree-shaken | Medium |
| `recharts` not lazy-loaded | +300 KB on pages with charts | Medium |
| `framer-motion` in shared chunk | +60 KB on all pages | Low |

---

## 4. PAGE-SPECIFIC ANALYSIS

### Homepage (`/[locale]`) - Heaviest Page

**Total First Load:** 178 kB (25.6 kB page + 152.4 kB shared)

**Contributing Factors:**
1. **Framer Motion animations** - Used heavily for sections
2. **Multiple section components** - Hero, Journey, Blog, Contact
3. **Internationalization** - next-intl translations
4. **Zustand stores** - Global state management

**Optimization Potential:** -20-30 kB with lazy loading

### Design System Page (`/design-system`)

**Total First Load:** 114 kB (20.2 kB page + 93.8 kB shared)

**Contributing Factors:**
- Component showcase/preview
- Syntax highlighting (if any)
- Multiple UI component imports

### Demo Page (`/demo`)

**Total First Load:** 134 kB (4.01 kB page + 130 kB shared)

- Smaller page-specific bundle
- Most weight from shared dependencies

---

## 5. MIDDLEWARE ANALYSIS

**Middleware Size:** 54 kB

### Middleware Responsibilities:
- Internationalization routing (next-intl)
- Locale detection and redirect
- Path matching for `/en` and `/it`

**Status:** Acceptable size for i18n middleware

---

## 6. OPTIMIZATION RECOMMENDATIONS

### HIGH Priority

**1. Lazy Load Heavy Components** (Est. savings: -30-50 kB)
```typescript
// Before
import { HeavyChartComponent } from '@/components/charts';

// After
const HeavyChartComponent = dynamic(
  () => import('@/components/charts').then(mod => mod.HeavyChartComponent),
  { loading: () => <ChartSkeleton /> }
);
```

**2. Use Firebase Modular SDK** (Est. savings: -200-300 kB)
```typescript
// Before (full bundle)
import firebase from 'firebase/app';

// After (modular)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
```

**3. Optimize lucide-react Imports** (Est. savings: -10-20 kB)
```typescript
// Before (barrel import)
import { Home, User, Settings } from 'lucide-react';

// After (direct imports)
import Home from 'lucide-react/dist/esm/icons/home';
import User from 'lucide-react/dist/esm/icons/user';
```

### MEDIUM Priority

**4. Consider Reducing Polyfills** (Est. savings: -30-50 kB)
- Target modern browsers only
- Review `browserslist` configuration
- Remove unnecessary ES5 polyfills

**5. Code Split by Route** (Est. savings: -20-30 kB on initial load)
- Ensure blog components load only on blog pages
- Separate admin/dashboard code if exists

**6. Review Framer Motion Usage**
```typescript
// Use LazyMotion for reduced bundle
import { LazyMotion, domAnimation, m } from 'framer-motion';

<LazyMotion features={domAnimation}>
  <m.div animate={{ opacity: 1 }} />
</LazyMotion>
```

### LOW Priority

**7. Enable Module Concatenation**
Add to `next.config.mjs`:
```javascript
experimental: {
  optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-tabs'],
}
```

**8. Analyze with Bundle Analyzer**
```bash
npm install @next/bundle-analyzer
# Add to next.config.mjs for detailed analysis
```

---

## 7. PERFORMANCE TARGETS

### Current vs Target

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| First Load JS (shared) | 87.3 kB | <100 kB | Pass |
| Homepage First Load | 178 kB | <150 kB | **Needs work** |
| Middleware | 54 kB | <60 kB | Pass |
| Largest Chunk | 172.8 kB | <170 kB | **Slightly over** |

### Achievable Goals

With recommended optimizations:
- **Homepage First Load:** 178 kB **130-140 kB** (-22-28%)
- **Largest Chunk:** 172.8 kB **140-150 kB** (-13-18%)
- **Total Chunks:** 1.2 MB **900 KB - 1 MB** (-17-25%)

---

## 8. BUILD WARNINGS & ISSUES

### Warnings Observed

| Warning | Impact | Fix |
|---------|--------|-----|
| ESLint plugin load failure | Build continues | Fix eslintrc reference |
| Upstash Redis config missing | Runtime warnings | Configure env vars |
| `themeColor` in metadata | Deprecated usage | Move to viewport export |
| `locale` parameter deprecated | next-intl warning | Update getRequestConfig |

### Missing Module Warning
```
Module not found: Can't resolve '../../firebase-admin-key.json'
```
**Impact:** Warning only, server-side functionality may fail
**Fix:** Ensure Firebase admin credentials are properly configured

---

## 9. SUMMARY SCORECARD

| Aspect | Status | Score | Notes |
|--------|--------|-------|-------|
| Shared Bundle Size | OK | 8/10 | Under 100 kB target |
| Homepage Bundle | Needs Work | 6/10 | 178 kB - optimize heavy imports |
| Tree Shaking | Good | 7/10 | framer-motion properly shaken |
| Server Isolation | Good | 8/10 | Heavy APIs server-only |
| Polyfill Size | Moderate | 6/10 | Consider modern-only target |
| Code Splitting | Adequate | 7/10 | More dynamic imports needed |
| **OVERALL** | **Good** | **7/10** | **20-30% improvement possible** |

---

## 10. QUICK WIN CHECKLIST

- [ ] Add `optimizePackageImports` for framer-motion and lucide-react
- [ ] Lazy load recharts components
- [ ] Review and potentially reduce polyfills
- [ ] Fix metadata `themeColor` deprecation warnings
- [ ] Consider Firebase modular imports
- [ ] Add bundle analyzer for ongoing monitoring

---

## CONCLUSION

The Next.js bundle is **reasonably optimized** with the shared bundle well under the 100 kB target. The main concern is the **homepage at 178 kB First Load JS**, which exceeds the recommended 150 kB threshold for optimal user experience.

**Priority Actions:**
1. **Lazy load heavy components** (recharts, complex sections)
2. **Optimize icon imports** (lucide-react direct imports)
3. **Consider Firebase modular SDK** for significant reduction

**Estimated Total Improvement:** 20-30% reduction in bundle size with medium effort.

---

**Report generated:** January 2025
**Analysis tool:** Next.js build output + manual chunk inspection
**Next steps:** Implement HIGH priority optimizations, then measure improvement
