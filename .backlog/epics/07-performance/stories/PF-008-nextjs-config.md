# [PF-008] Next.js Build Configuration Optimization

## Metadata
- **Story ID**: PF-008
- **Epic**: [EPIC-007](../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Completamento**: -

## User Story
**Come** sviluppatore **Voglio** che il build di Next.js sia ottimizzato al massimo **Così che** il deploy sia veloce e il bundle efficiente

## Problema Attuale
`next.config.mjs` manca diverse ottimizzazioni:
- No `optimizePackageImports` (auto-tree-shaking per librerie comuni)
- No bundle analyzer configurato
- No compression esplicita
- AVIF non abilitato (coperto in PF-003, ma da verificare)
- No performance budgets
- Webpack config base (potrebbe essere ottimizzato)

**Impatto misurato**: Build più lento, bundle più grande del necessario

## Criteri di Accettazione
- [ ] **AC1**: Bundle analyzer configurato (`npm run analyze`)
- [ ] **AC2**: `optimizePackageImports` per Framer Motion, Lucide, recharts
- [ ] **AC3**: Compression enabled (gzip + brotli)
- [ ] **AC4**: AVIF image format enabled
- [ ] **AC5**: Server-only packages excluded from client bundle
- [ ] **AC6**: Build time ridotto di 10-20%
- [ ] **AC7**: Performance budgets configurati (warnings se superati)

## Implementazione Guidata

### Step 1: Current Config Audit
**File**: `next.config.mjs`

Leggere config attuale e identificare cosa manca.

### Step 2: Complete Optimized Config
**File**: `next.config.mjs`

**SOSTITUIRE** con config completo ottimizzato:

```javascript
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ========================================
  // IMAGES
  // ========================================
  images: {
    formats: ['image/avif', 'image/webp'], // ✅ Modern formats (AVIF first)
    minimumCacheTTL: 31536000, // ✅ 1 year cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true, // Se usi SVG
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ========================================
  // COMPILER OPTIMIZATIONS
  // ========================================
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Keep error/warn
    } : false,
  },

  // ========================================
  // EXPERIMENTAL FEATURES
  // ========================================
  experimental: {
    // ✅ Auto-optimize imports for common packages
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'recharts',
      '@anthropic-ai/sdk',
      'date-fns',
    ],

    // ✅ Optimize server components
    serverComponentsExternalPackages: [
      'firebase-admin',
      'googleapis',
      '@prisma/client', // Se usi Prisma
    ],
  },

  // ========================================
  // WEBPACK CUSTOMIZATION
  // ========================================
  webpack: (config, { isServer, webpack }) => {
    // ✅ Exclude server-only packages from client bundle
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'firebase-admin': false,
        'googleapis': false,
        '@prisma/client': false,
      }
    }

    // ✅ Bundle analyzer plugin (already handled by withBundleAnalyzer)

    // ✅ Ignore sourcemaps for node_modules (faster builds)
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      exclude: /node_modules/,
    })

    return config
  },

  // ========================================
  // HEADERS & SECURITY
  // ========================================
  async headers() {
    return [
      // ✅ Static assets caching
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // ✅ Security headers
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // ========================================
  // COMPRESSION
  // ========================================
  compress: true, // ✅ Enable gzip compression

  // ========================================
  // I18N (se presente)
  // ========================================
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
  },

  // ========================================
  // PRODUCTION SOURCE MAPS
  // ========================================
  productionBrowserSourceMaps: false, // ✅ Disable for faster builds & smaller bundle

  // ========================================
  // DEVELOPMENT
  // ========================================
  reactStrictMode: true, // ✅ Already present, good!

  // ========================================
  // TYPESCRIPT
  // ========================================
  typescript: {
    // ❌ DON'T do this in production (only for emergency deploys)
    // ignoreBuildErrors: false,
  },

  // ========================================
  // ESLint
  // ========================================
  eslint: {
    // ❌ DON'T do this (only for emergency)
    // ignoreDuringBuilds: false,
  },
}

// ✅ Export with bundle analyzer wrapper
export default withBundleAnalyzer(nextConfig)
```

### Step 3: Install Bundle Analyzer
```bash
npm install --save-dev @next/bundle-analyzer
```

### Step 4: Add NPM Scripts
**File**: `package.json`

**AGGIUNGERE**:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "analyze": "ANALYZE=true next build",
    "analyze:server": "BUNDLE_ANALYZE=server next build",
    "analyze:browser": "BUNDLE_ANALYZE=browser next build"
  }
}
```

### Step 5: Performance Budgets (Optional - Advanced)
**File**: `.lighthouserc.json` (NEW)

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.95}],

        // Performance budgets
        "total-byte-weight": ["error", {"maxNumericValue": 1500000}],
        "dom-size": ["error", {"maxNumericValue": 1500}],
        "bootup-time": ["error", {"maxNumericValue": 3000}],
        "mainthread-work-breakdown": ["error", {"maxNumericValue": 4000}],
        "speed-index": ["error", {"maxNumericValue": 3000}],
        "interactive": ["error", {"maxNumericValue": 3800}],
        "first-contentful-paint": ["error", {"maxNumericValue": 1800}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**Install Lighthouse CI**:
```bash
npm install --save-dev @lhci/cli
```

**Package.json**:
```json
{
  "scripts": {
    "lighthouse": "lhci autorun"
  }
}
```

### Step 6: GitHub Actions Integration (Optional)
**File**: `.github/workflows/lighthouse-ci.yml` (NEW)

```yaml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## Test Plan
```bash
# 1. Bundle Analyzer
npm run analyze
# Browser apre automaticamente
# Verificare:
# - Main bundle <500KB gzipped
# - No duplicate packages
# - Server-only packages (firebase, googleapis) NOT in client bundle

# 2. Build Speed Test
# BEFORE optimization
time npm run build
# Note time (es. 45s)

# AFTER optimization
time npm run build
# Note time (es. 38s) → -15% target

# 3. Compression Test
npm run build
npm run start
curl -I -H "Accept-Encoding: gzip" http://localhost:3000
# Verificare header: Content-Encoding: gzip

# 4. Image Format Test
# Aprire DevTools > Network > Img
# Verificare che Chrome serve AVIF (Type: avif)

# 5. Lighthouse CI (se configurato)
npm run lighthouse
# Verificare che rispetta performance budgets
```

## Definition of Done
- [ ] Bundle analyzer installed e configurato
- [ ] `npm run analyze` funzionante
- [ ] `optimizePackageImports` configurato per 5+ packages
- [ ] Server-only packages excluded da client bundle
- [ ] Compression enabled
- [ ] AVIF format enabled
- [ ] Security headers configurati
- [ ] `removeConsole` enabled in production
- [ ] Performance budgets configurati (optional)
- [ ] Lighthouse CI in GitHub Actions (optional)
- [ ] Build time ridotto di 10-20%
- [ ] Build production senza errori/warnings

## Metriche di Successo
**Prima**:
- Build time: ~45s
- Bundle size: ~1.2MB gzipped
- No bundle analyzer
- No performance budgets

**Dopo** (target):
- Build time: <40s (-10-15%)
- Bundle size: ~500KB gzipped (-60%)
- Bundle analyzer available
- Performance budgets enforced
- Lighthouse Performance: +2-4 punti

## Files da Modificare
- ✏️ `next.config.mjs` (complete rewrite con ottimizzazioni)
- ✏️ `package.json` (add scripts: analyze, lighthouse)
- ✏️ `.lighthouserc.json` (NEW - optional)
- ✏️ `.github/workflows/lighthouse-ci.yml` (NEW - optional)

## Checklist Configurazione
```typescript
// next.config.mjs checklist:
// [ ] images.formats: ['image/avif', 'image/webp']
// [ ] images.minimumCacheTTL: 31536000
// [ ] compiler.removeConsole: true (production)
// [ ] experimental.optimizePackageImports: [...]
// [ ] experimental.serverComponentsExternalPackages: [...]
// [ ] webpack: exclude server packages from client
// [ ] headers: static assets cache (1 year)
// [ ] headers: security headers (HSTS, X-Frame, etc)
// [ ] compress: true
// [ ] productionBrowserSourceMaps: false
// [ ] withBundleAnalyzer wrapper
```

## Note Tecniche
- **optimizePackageImports**: Auto tree-shaking, riduce bundle 20-30% per alcuni packages
- **serverComponentsExternalPackages**: Previene bundling di server libs nel client
- **removeConsole**: Rimuove console.log in prod (debugging più difficile, ma bundle più piccolo)
- **Bundle Analyzer**: Visualizza tree map del bundle (essenziale per debugging bloat)
- **Lighthouse CI**: Automated performance testing in PR reviews

## Quick Wins (Immediate Impact)
1. **Bundle Analyzer** (5min) → Immediate visibility su bundle composition
2. **optimizePackageImports** (10min) → -20-30% bundle per alcuni packages
3. **removeConsole** (2min) → -10-20KB
4. **AVIF format** (2min, se non fatto in PF-003) → -20-30% image size

**Total**: ~20min per -25-35% bundle size!

## Riferimenti
- [Next.js Configuration](https://nextjs.org/docs/app/api-reference/next-config-js)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Performance Budgets](https://web.dev/performance-budgets-101/)

---

## Tracking
**Creata**: 2025-11-15
**Assegnata a**: Claude Code
**Dipendenze**: Nessuna (ma completa tutte le altre ottimizzazioni)
**Priorità**: FARE DOPO PF-001, PF-002, PF-004 (quelle con più impatto)
