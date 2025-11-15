# [SV-006] Update Dependencies & Security Headers

## Metadata
- **Story ID**: SV-006
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟢 S (0.5 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** developer **Voglio** aggiornare le dipendenze vulnerabili e migliorare gli security headers **Così che** riduciamo la superficie di attacco

## Vulnerabilità Correlate
- **10.1**: js-yaml Prototype Pollution (MODERATE)
- **10.2**: tmp Arbitrary File Write (LOW)

## Criteri di Accettazione
- [ ] **AC1**: `npm audit` mostra zero vulnerabilità high/critical
- [ ] **AC2**: js-yaml aggiornato a versione ≥4.1.1
- [ ] **AC3**: tmp aggiornato a versione >0.2.3
- [ ] **AC4**: Tutte le dipendenze con vulnerabilità note aggiornate
- [ ] **AC5**: CI/CD pipeline include security audit check

## Implementazione

```bash
# 1. Audit corrente
npm audit

# 2. Auto-fix vulnerabilities
npm audit fix

# 3. Force fix breaking changes (se necessario)
npm audit fix --force

# 4. Update specific packages
npm update js-yaml@latest
npm update tmp@latest

# 5. Verify
npm audit
```

**File**: `.github/workflows/security-audit.yml` (NEW)
```yaml
name: Security Audit

on:
  push:
    branches: [main, develop]
  pull_request:
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm audit --audit-level=high
```

## Test Plan
```bash
# Verify no vulnerabilities
npm audit --audit-level=high
# Expected: 0 vulnerabilities

# Verify build works
npm run build
# Expected: Success
```

## Definition of Done
- [ ] `npm audit` shows 0 high/critical vulnerabilities
- [ ] All packages updated
- [ ] Tests pass
- [ ] Build succeeds
- [ ] GitHub Actions security audit workflow created
