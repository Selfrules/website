# Testing Infrastructure Documentation

## Overview

Comprehensive testing infrastructure for Mattia's portfolio website with unit tests, component tests, E2E tests, accessibility tests, and performance monitoring.

## Test Coverage Goals

- **Unit Tests**: >80% code coverage
- **Component Tests**: All UI components with variants
- **E2E Tests**: Critical user journeys
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse scores >90

## Testing Frameworks

### Jest + React Testing Library
- **Purpose**: Unit and component testing
- **Config**: `jest.config.js`, `jest.setup.js`
- **Run**: `npm test` (watch mode) or `npm run test:ci` (CI mode)

### Playwright
- **Purpose**: E2E testing across browsers
- **Config**: `playwright.config.ts`
- **Run**: `npm run test:e2e`
- **UI Mode**: `npm run test:e2e:ui`

### Vitest (Alternative)
- **Purpose**: Fast unit testing alternative
- **Config**: `vitest.config.ts`
- **Run**: `npm run test:vitest`

### Lighthouse CI
- **Purpose**: Performance, accessibility, SEO monitoring
- **Config**: `lighthouserc.json`
- **Run**: `npm run lighthouse`

## Test Structure

```
mattia_web/
├── lib/utils/__tests__/          # Utility function tests
│   ├── date.test.ts
│   ├── string.test.ts
│   └── validation.test.ts
├── components/ui/__tests__/      # Component tests
│   ├── Button.test.tsx
│   ├── Card.test.tsx
│   ├── Input.test.tsx
│   └── ThemeToggle.test.tsx
├── e2e/                          # E2E tests
│   ├── homepage.spec.ts
│   ├── blog.spec.ts
│   └── accessibility.spec.ts
└── __mocks__/                    # Mock files
    ├── fileMock.js
    └── styleMock.js
```

## Running Tests

### Unit Tests
```bash
# Watch mode (development)
npm test

# Single run with coverage
npm run test:coverage

# CI mode (coverage + reporting)
npm run test:ci
```

### Component Tests
```bash
# Run all tests including component tests
npm run test:unit
```

### E2E Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run with UI for debugging
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Install browsers (first time only)
npm run playwright:install
```

### Accessibility Tests
```bash
# Run accessibility-specific tests
npm run test:a11y
```

### Performance Tests
```bash
# Run Lighthouse CI
npm run lighthouse
```

## Test Coverage

Current coverage targets (configured in `jest.config.js`):
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

View coverage reports:
```bash
npm run test:coverage
# Open coverage/lcov-report/index.html
```

## Writing Tests

### Unit Test Example
```typescript
import { formatDate } from '@/lib/utils/date'

describe('formatDate', () => {
  it('should format date in short format', () => {
    const date = new Date('2024-03-15')
    const result = formatDate(date, 'short', 'en')
    expect(result).toContain('Mar')
  })
})
```

### Component Test Example
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('should call onClick when clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test'

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Mattia/i)
})
```

### Accessibility Test Example
```typescript
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/')

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()

  expect(results.violations).toEqual([])
})
```

## Best Practices

### Unit Tests
- Test pure functions and business logic
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test edge cases and error conditions

### Component Tests
- Test user interactions, not implementation
- Use accessible queries (getByRole, getByLabelText)
- Test all variants and states
- Verify accessibility attributes
- Test keyboard navigation

### E2E Tests
- Test critical user journeys
- Use Page Object pattern for complex flows
- Test across multiple browsers
- Verify performance metrics
- Test responsive behavior

### Accessibility Tests
- Run axe-core on all pages
- Test keyboard navigation
- Verify ARIA attributes
- Check color contrast
- Test with screen readers

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:ci
      - run: npm run test:e2e
      - run: npm run lighthouse
```

## Performance Budgets

Configured in `lighthouserc.json`:
- **Performance**: >90
- **Accessibility**: >90
- **Best Practices**: >90
- **SEO**: >90
- **First Contentful Paint**: <2s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Total Blocking Time**: <300ms

## Visual Regression Testing

### Chromatic Setup (Recommended)
```bash
# Install Chromatic
npm install --save-dev chromatic

# Add to package.json scripts
"chromatic": "chromatic --project-token=<token>"

# Run visual tests
npm run chromatic
```

### Percy Setup (Alternative)
```bash
# Install Percy
npm install --save-dev @percy/cli @percy/playwright

# Add to package.json scripts
"percy": "percy exec -- playwright test"

# Run visual tests
npm run percy
```

## Troubleshooting

### Tests Failing Locally
1. Clear Jest cache: `npm test -- --clearCache`
2. Update snapshots: `npm test -- -u`
3. Check Node version compatibility

### E2E Tests Timing Out
1. Increase timeout in `playwright.config.ts`
2. Use `page.waitForLoadState('networkidle')`
3. Add explicit waits for dynamic content

### Coverage Not Meeting Threshold
1. Identify uncovered files: Check coverage report
2. Add tests for uncovered branches
3. Exclude test files and mocks from coverage

### Accessibility Violations
1. Check axe-core report for details
2. Fix WCAG violations (proper ARIA, contrast, etc.)
3. Re-run tests to verify fixes

## Useful Commands

```bash
# Run specific test file
npm test -- Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should render"

# Update snapshots
npm test -- -u

# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Run single E2E test
npm run test:e2e -- homepage.spec.ts

# Generate coverage badge
npm run test:coverage -- --coverageReporters=json-summary
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse Performance](https://web.dev/lighthouse-performance/)

## Test Maintenance

### Regular Tasks
- Review and update test coverage monthly
- Update E2E tests when features change
- Run accessibility audits before releases
- Monitor performance budgets in CI
- Update test dependencies quarterly

### Code Review Checklist
- [ ] New features have tests
- [ ] Tests follow naming conventions
- [ ] Accessibility tests pass
- [ ] Coverage meets threshold
- [ ] E2E tests cover critical paths
- [ ] No skipped or disabled tests without reason

## Contact

For questions about testing infrastructure:
- Check this documentation first
- Review test examples in codebase
- Consult team testing guidelines
