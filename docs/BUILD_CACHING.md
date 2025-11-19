# Next.js Build Caching Configuration

This document explains the build caching setup for faster rebuilds in development and CI/CD environments.

## Overview

Next.js build caching significantly reduces build times by caching compilation results, webpack builds, and SWC transformations between builds.

## Cache Directory Structure

```
.next/cache/
├── config.json          # Cache configuration
├── swc/                 # SWC compiler cache (TypeScript/JavaScript transformations)
└── webpack/             # Webpack module cache
```

## Configuration

### 1. GitHub Actions CI/CD Cache

**Location**: `.github/workflows/ci.yml`

The CI workflow caches the `.next/cache` directory between builds:

```yaml
- name: Cache Next.js build
  uses: actions/cache@v4
  with:
    path: |
      .next/cache
    key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}
    restore-keys: |
      ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-
      ${{ runner.os }}-nextjs-
```

**Cache Key Strategy**:
- **Primary key**: OS + package-lock.json hash + source code hash
- **Restore keys**: Falls back to package-lock.json hash, then any Next.js cache

This ensures:
- Cache is invalidated when dependencies change
- Cache is invalidated when source code changes
- Partial cache restoration when exact match isn't found

### 2. Next.js Configuration

**Location**: `next.config.mjs`

Build optimization settings:

```javascript
const nextConfig = {
  // Build ID generation for cache busting
  generateBuildId: async () => {
    return process.env.GIT_COMMIT_SHA || `build-${Date.now()}`;
  },

  // Optional: Enable Turbopack for faster local dev
  experimental: {
    // turbo: {},
  },
};
```

### 3. Local Development

For local development, Next.js automatically uses `.next/cache`:

```bash
# First build (no cache)
npm run build  # Takes ~60-120s

# Second build (with cache)
npm run build  # Takes ~15-30s (50-75% faster)
```

The cache persists until:
- You run `rm -rf .next/cache`
- You change dependencies
- You upgrade Next.js version

## Deployment Platforms

### Vercel

Vercel automatically handles Next.js caching:
- Build cache persists between deployments
- No additional configuration needed
- Cache invalidation is automatic

### Other Platforms (Railway, Netlify, etc.)

For other platforms, ensure:
1. `.next/cache` is included in build cache
2. Cache persists between builds
3. Cache is cleared when dependencies change

**Example for Railway**:
```yaml
build:
  buildCommand: npm run build
  cacheDirectories:
    - node_modules
    - .next/cache
```

## Performance Impact

### Expected Improvements

| Scenario | First Build | Cached Build | Improvement |
|----------|-------------|--------------|-------------|
| No changes | 60s | 15s | **75%** |
| Minor code changes | 60s | 20s | **66%** |
| Dependency changes | 60s | 45s | **25%** |
| Major refactor | 60s | 40s | **33%** |

### Cache Size

Typical cache sizes:
- **Small project**: 50-100 MB
- **Medium project**: 100-300 MB (this project)
- **Large project**: 300-500 MB

## Troubleshooting

### Warning: "No build cache found"

**Cause**: First build or cache was cleared

**Solution**: This is expected on first run. Subsequent builds will use cache.

### Cache Not Working in CI

**Check**:
1. `.next/cache` is included in cache path
2. Cache key is consistent across builds
3. GitHub Actions cache limit not exceeded (10 GB per repo)

### Slow Builds Despite Caching

**Possible causes**:
1. Source code changes invalidate most cached modules
2. Dependencies changed (invalidates all cache)
3. Next.js version upgrade (incompatible cache)

**Solutions**:
1. Use incremental static regeneration (ISR) for pages
2. Split large components into smaller modules
3. Use `next/dynamic` for code splitting

## Best Practices

### 1. Keep Dependencies Stable

Minimize dependency updates during active development to maximize cache hits.

### 2. Modular Architecture

Split code into smaller modules for better cache granularity:

```typescript
// ❌ Large monolithic component - invalidates entire cache
export default function Dashboard() {
  // 1000 lines of code
}

// ✅ Modular components - only changed modules invalidate
export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardMetrics />
      <DashboardCharts />
    </>
  );
}
```

### 3. Monitor Cache Performance

Track build times to ensure caching is effective:

```bash
# Add to CI workflow
- name: Build with timing
  run: |
    START_TIME=$(date +%s)
    npm run build
    END_TIME=$(date +%s)
    echo "Build took $((END_TIME - START_TIME))s"
```

### 4. Clean Cache When Needed

Clean cache after major changes:

```bash
# Local development
rm -rf .next/cache

# CI/CD: Add workflow_dispatch trigger to clear cache
```

## Environment Variables

Caching behavior can be controlled with environment variables:

```bash
# Disable cache (for debugging)
NEXT_PRIVATE_SKIP_CACHE=1 npm run build

# Set custom build ID
GIT_COMMIT_SHA=$(git rev-parse HEAD) npm run build
```

## Maintenance

### Cache Invalidation Schedule

- **Automatic**: On dependency or source code changes
- **Manual**: After Next.js upgrades or major refactors
- **Scheduled**: Not needed (cache invalidates automatically)

### GitHub Actions Cache Limits

GitHub Actions has cache limits:
- **Maximum cache size**: 10 GB per repository
- **Cache eviction**: LRU (least recently used)
- **Cache retention**: 7 days if not accessed

Monitor cache usage:
```bash
gh cache list
```

## Additional Resources

- [Next.js Build Cache Documentation](https://nextjs.org/docs/app/building-your-application/deploying#caching)
- [GitHub Actions Cache Documentation](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [Vercel Build Cache](https://vercel.com/docs/concepts/deployments/build-cache)

## Changelog

- **2025-11-19**: Initial caching configuration
  - Added GitHub Actions cache for `.next/cache`
  - Configured build ID generation in `next.config.mjs`
  - Expected 50-75% build time reduction in CI/CD
