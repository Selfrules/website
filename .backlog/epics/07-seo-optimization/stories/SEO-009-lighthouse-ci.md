# [SEO-009] Setup Lighthouse CI e Web Vitals Monitoring

## Metadata
- **Story ID**: SEO-009
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Not Started | **Data Completamento**: -

## User Story
**Come** developer **Voglio** Lighthouse CI che verifica automaticamente SEO/Performance/Accessibility **Così che** ogni PR mantenga standard qualitativi senza controlli manuali

## Criteri di Accettazione
- [ ] **AC1**: Lighthouse CI configurato in GitHub Actions
- [ ] **AC2**: Lighthouse run automatico su ogni PR
- [ ] **AC3**: PR viene bloccato se SEO score < 95/100
- [ ] **AC4**: PR viene bloccato se Accessibility score < 95/100
- [ ] **AC5**: PR viene bloccato se Performance score < 80/100
- [ ] **AC6**: Core Web Vitals monitorati e reportati nei commenti PR
- [ ] **AC7**: Dashboard Lighthouse accessibile per tracking storico

## Problema & Contesto

### Situazione Attuale (da audit)
```bash
# Audit findings:
$ cat package.json | grep lighthouse
"lighthouse": "lighthouse https://..."

# ✅ Script exists but:
# ❌ No .lighthouserc.json config
# ❌ No CI/CD integration
# ❌ No automated enforcement
```

**Conseguenze**:
- ❌ SEO/Performance regressions non vengono rilevate prima del merge
- ❌ Nessun tracking storico dei Core Web Vitals
- ❌ Developer devono ricordare di run Lighthouse manualmente
- ❌ No accountability: chi introduce regressione non riceve feedback immediato

### Use Cases
1. **PR Review**: Lighthouse report automatico su ogni PR
2. **Regression Detection**: Score drop → PR bloccato
3. **Historical Tracking**: Trend di performance nel tempo
4. **Core Web Vitals**: LCP, FID, CLS monitored continuamente

## Implementazione Tecnica

### 1. Lighthouse CI Configuration

```javascript
// .lighthouserc.json (NEW FILE)
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run start",
      "url": [
        "http://localhost:3000/it",
        "http://localhost:3000/it/blog",
        "http://localhost:3000/it/blog/come-gestiamo-product-roadmaps"
      ]
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        // SEO assertions
        "categories:seo": ["error", { "minScore": 0.95 }],
        "viewport": "error",
        "document-title": "error",
        "meta-description": "error",
        "link-text": "warn",
        "crawlable-anchors": "error",
        "canonical": "error",
        "hreflang": "error",
        "structured-data": "warn",

        // Accessibility assertions
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "color-contrast": "error",
        "image-alt": "error",
        "label": "error",
        "aria-valid-attr": "error",
        "button-name": "error",

        // Performance assertions
        "categories:performance": ["warn", { "minScore": 0.80 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["warn", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 300 }],

        // Best Practices
        "categories:best-practices": ["warn", { "minScore": 0.90 }],
        "errors-in-console": "warn",
        "no-vulnerable-libraries": "error"
      }
    },
    "upload": {
      "target": "temporary-public-storage"
      // Per production: Lighthouse CI server o Vercel Analytics
    }
  }
}
```

### 2. GitHub Actions Workflow

```yaml
# .github/workflows/lighthouse-ci.yml (NEW FILE)
name: Lighthouse CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js app
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Upload Lighthouse results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: lighthouse-results
          path: .lighthouseci

      - name: Comment PR with results
        uses: treosh/lighthouse-ci-action@v10
        if: github.event_name == 'pull_request'
        with:
          urls: |
            http://localhost:3000/it
            http://localhost:3000/it/blog
          uploadArtifacts: true
          temporaryPublicStorage: true
          runs: 3
```

### 3. Core Web Vitals Reporting

```typescript
// lib/analytics/web-vitals.ts (MODIFY or CREATE)
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function reportWebVitals() {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}

function sendToAnalytics(metric: any) {
  // Send to Umami Analytics
  if (window.umami) {
    window.umami.track('web-vital', {
      metric: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    })
  }

  // Log to console in dev
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }
}
```

**Integrate in app**:
```typescript
// app/layout.tsx (MODIFY)
'use client'

import { useEffect } from 'react'
import { reportWebVitals } from '@/lib/analytics/web-vitals'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    reportWebVitals()
  }, [])

  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### 4. Local Lighthouse Script Enhancement

```json
// package.json (MODIFY scripts)
{
  "scripts": {
    "lighthouse": "npm run build && npm run lighthouse:ci",
    "lighthouse:ci": "lhci autorun",
    "lighthouse:desktop": "lighthouse http://localhost:3000/it --view --preset=desktop",
    "lighthouse:mobile": "lighthouse http://localhost:3000/it --view --preset=mobile",
    "lighthouse:full": "npm run lighthouse:desktop && npm run lighthouse:mobile"
  }
}
```

## Files da Modificare

```
📝 NEW FILES:
- /.lighthouserc.json                      # Lighthouse CI configuration
- /.github/workflows/lighthouse-ci.yml     # GitHub Actions workflow

🔧 MODIFY:
- /package.json                            # Add lighthouse:* scripts
- /lib/analytics/web-vitals.ts             # Enhance Web Vitals tracking
- /app/layout.tsx                          # Integrate reportWebVitals()
```

## Test Plan

### 1. Local Lighthouse Test
```bash
# Build app
npm run build

# Start production server
npm run start

# In another terminal, run Lighthouse
npm run lighthouse:ci

# Expected output:
# ✅ Checking assertions against Lighthouse results...
# ✅ All assertions passed!
```

### 2. Simulate Score Failure
```typescript
// Temporarily break SEO (for testing)
// app/layout.tsx - remove metadataBase
export const metadata: Metadata = {
  // metadataBase: new URL('https://mattiacintura.com'), // COMMENT OUT
}

# Run Lighthouse
npm run lighthouse:ci

# Expected:
# ❌ Assertion failed: categories:seo
# ❌ Expected score >= 0.95, got 0.85

# Fix and re-run
# Expected: ✅ All assertions passed
```

### 3. GitHub Actions Test
```bash
# Create test PR
git checkout -b test/lighthouse-ci
git commit --allow-empty -m "Test Lighthouse CI"
git push origin test/lighthouse-ci

# Create PR on GitHub
# Expected:
# - GitHub Action runs automatically
# - Lighthouse report posted as PR comment
# - Checks pass if scores meet thresholds
```

### 4. Web Vitals Tracking Test
```bash
# Run dev server
npm run dev

# Open browser DevTools Console
# Navigate to http://localhost:3000/it

# Expected console logs:
# {name: 'FCP', value: 1200, rating: 'good'}
# {name: 'LCP', value: 1800, rating: 'good'}
# {name: 'CLS', value: 0.05, rating: 'good'}
```

## Definition of Done
- [ ] `.lighthouserc.json` created with SEO/A11y/Perf assertions
- [ ] GitHub Actions workflow created (`.github/workflows/lighthouse-ci.yml`)
- [ ] Lighthouse runs on every PR to `main`
- [ ] PR blocked if SEO < 95, Accessibility < 95, Performance < 80
- [ ] Lighthouse report posted as PR comment
- [ ] Core Web Vitals tracking integrated in app
- [ ] Web Vitals sent to Umami Analytics
- [ ] Local lighthouse scripts working (`npm run lighthouse`)
- [ ] Test PR passes with good scores
- [ ] Documentation updated with Lighthouse workflow

---

## Note Implementative

### Lighthouse Score Thresholds
```
SEO:             95-100 (strict - SEO is critical)
Accessibility:   95-100 (strict - WCAG AA compliance)
Performance:     80-100 (lenient - varies by network)
Best Practices:  90-100 (lenient - some are warnings)
```

### Core Web Vitals Targets
```
LCP (Largest Contentful Paint):  < 2.5s (good)
FID (First Input Delay):          < 100ms (good)
CLS (Cumulative Layout Shift):    < 0.1 (good)
FCP (First Contentful Paint):     < 1.8s (good)
TTFB (Time to First Byte):        < 600ms (good)
```

### Lighthouse CI Storage Options
```
1. Temporary Public Storage (default):
   - Free, reports expire after 7 days
   - Good for testing

2. Lighthouse CI Server (self-hosted):
   - Permanent storage, historical trends
   - Requires server setup

3. Vercel Analytics:
   - Integrated Web Vitals dashboard
   - Paid feature
```

### GitHub Actions Optimization
```yaml
# Cache dependencies for faster runs
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

# Only run on changed files (optional)
paths:
  - 'app/**'
  - 'components/**'
  - 'public/**'
```

### Useful Lighthouse CLI Flags
```bash
# Desktop preset
lighthouse URL --preset=desktop

# Mobile preset (default)
lighthouse URL --preset=mobile

# Only specific categories
lighthouse URL --only-categories=seo,accessibility

# Output to JSON
lighthouse URL --output=json --output-path=./report.json

# Throttling simulation
lighthouse URL --throttling-method=simulate
```

---

## Post-Implementation: Monitoring

Dopo setup:
1. **PR Reviews**: Check Lighthouse bot comment su ogni PR
2. **Weekly Review**: Controlla trend di performance nel tempo
3. **Regression Alerts**: Investigate score drops immediatamente
4. **Web Vitals Dashboard**: Monitor Core Web Vitals in Umami Analytics

**Useful Dashboard URLs**:
- Lighthouse CI temporary storage: Linked in PR comments
- Umami Analytics: https://cloud.umami.is (custom events for web-vitals)
- Google Search Console: Core Web Vitals report

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Story creata da SEO audit |
