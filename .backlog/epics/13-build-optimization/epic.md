# [EPIC-013] Build Performance & Dependency Optimization

## Metadata
- **Epic ID**: EPIC-013
- **Priorità**: 🟠 Alta
- **Stato**: 📋 Not Started
- **Execution Environment**: 🌐 Claude Code Web
- **Stima Totale**: S (2-3 giorni)
- **Data Creazione**: 2025-11-19
- **Ultima Modifica**: 2025-11-19

## Contesto e Problema

### Problema Corrente
Build configuration has **critical inefficiencies** identified in comprehensive audit:

**Critical Issues**:
- ❌ **12 packages misplaced** in `dependencies` (should be `devDependencies`): @types/*, typescript, tsx, eslint, autoprefixer, postcss
- ❌ **8 npm security vulnerabilities** (3 HIGH, 1 MODERATE): glob, js-yaml, tmp
- ❌ **Duplicate testing frameworks**: Both Jest AND Vitest configured (~200-300MB node_modules)
- ❌ **Design system generation uncached**: Runs on every build (500-2000ms overhead)
- ❌ **Missing build optimizations**: No webpack cache, no AVIF format, limited CI workers

### Impatto
- **Build Time**: 20-30s (could be 15-20s)
- **CI/CD**: Slow deploys, expensive compute
- **npm install**: +10-20% slower due to misplaced deps
- **Security**: Vulnerable dependencies in production
- **Developer Experience**: Confusing dual test setup

### Audit Report
Full analysis: `/home/user/website/BUILD_PERFORMANCE_ANALYSIS.md`

## Obiettivo
Optimize build pipeline for **20-30% faster builds** and eliminate security vulnerabilities.

### Metriche di Successo
- [x] **Build Time**: -5-15% local, -20-40% CI
- [x] **npm install**: -10-20% faster
- [x] **Security**: 0 HIGH/MODERATE vulnerabilities
- [x] **Dependencies**: 100% correctly categorized
- [x] **Testing**: Single framework (Vitest)
- [x] **Design System**: Cached generation (only rebuild on changes)

## User Stories

### Priority 0 - Critical (Week 1)
- [ ] [BO-001](./stories/BO-001-fix-dependencies.md) Move 12 packages to devDependencies (🔴 S, 15min)
- [ ] [BO-002](./stories/BO-002-fix-vulnerabilities.md) Fix npm security vulnerabilities (🔴 S, 10min)
- [ ] [BO-003](./stories/BO-003-remove-jest.md) Remove Jest, consolidate on Vitest (🟠 M, 45min)

### Priority 1 - High (Week 1-2)
- [ ] [BO-004](./stories/BO-004-cache-design-system.md) Add hash-based caching to design system generation (🟠 M, 45min)
- [ ] [BO-005](./stories/BO-005-nextjs-optimizations.md) Add AVIF format, webpack cache, Vercel buildCache (🟠 S, 30min)

### Priority 2 - Medium (Week 2)
- [ ] [BO-006](./stories/BO-006-typescript-config.md) Remove `downlevelIteration`, optimize tsconfig (🟡 S, 15min)
- [ ] [BO-007](./stories/BO-007-ci-optimizations.md) Increase Jest workers, add parallel builds (🟡 S, 20min)

## Ordine di Esecuzione Raccomandato

### Phase 1: Immediate Fixes (15 min)
1. **BO-001**: Move dependencies (5 min) → -10-20% npm install
2. **BO-002**: Fix vulnerabilities (10 min) → Security compliance

**Impact**: Security fixed, install faster

### Phase 2: Medium Priority (45-90 min)
3. **BO-003**: Remove Jest (45 min) → -200MB node_modules, -10-15% build time
4. **BO-004**: Cache design system (45 min) → -500-2000ms per build

**Impact**: -20-40% CI build time

### Phase 3: Polish (30 min)
5. **BO-005**: Next.js optimizations (30 min) → Better caching, AVIF support
6. **BO-006**: TypeScript config (15 min) → -5-10% tsc time
7. **BO-007**: CI optimizations (20 min) → Faster CI pipelines

**Total Effort**: ~3 hours for 20-30% improvement

## Dipendenze
- Nessuna dipendenza bloccante
- Beneficia tutte le altre epiche (faster feedback loops)

---

**Created**: 2025-11-19 | **Author**: Claude Code | **Full Report**: BUILD_PERFORMANCE_ANALYSIS.md
