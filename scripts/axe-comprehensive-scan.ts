/**
 * Comprehensive Axe-core Accessibility Scan
 * Scans all main pages for WCAG 2.0/2.1 AA compliance
 */

import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import * as fs from 'fs'
import * as path from 'path'

interface PageScanResult {
  url: string
  pageName: string
  timestamp: string
  wcagTags: string[]
  violations: AxeViolation[]
  passes: AxePass[]
  incomplete: AxeIncomplete[]
  inapplicable: AxeInapplicable[]
  summary: {
    totalViolations: number
    totalPasses: number
    totalIncomplete: number
    criticalCount: number
    seriousCount: number
    moderateCount: number
    minorCount: number
  }
}

interface AxeViolation {
  id: string
  impact: 'critical' | 'serious' | 'moderate' | 'minor'
  description: string
  help: string
  helpUrl: string
  tags: string[]
  nodes: AxeNode[]
}

interface AxePass {
  id: string
  description: string
  help: string
  tags: string[]
  nodes: number
}

interface AxeIncomplete {
  id: string
  impact: string
  description: string
  help: string
  helpUrl: string
  tags: string[]
  nodes: AxeNode[]
}

interface AxeInapplicable {
  id: string
  description: string
  help: string
  tags: string[]
}

interface AxeNode {
  html: string
  target: string[]
  failureSummary?: string
}

interface ScanResults {
  scanInfo: {
    baseUrl: string
    timestamp: string
    totalPagesScanned: number
    wcagStandards: string[]
    browser: string
  }
  pages: PageScanResult[]
  overallSummary: {
    totalViolationsAcrossPages: number
    pagesWithViolations: number
    pagesWithCriticalIssues: number
    uniqueViolationTypes: string[]
    violationsByImpact: {
      critical: number
      serious: number
      moderate: number
      minor: number
    }
  }
}

// Pages to scan - includes both locales for main site
const PAGES_TO_SCAN = [
  { path: '/it', name: 'Homepage (Italian)' },
  { path: '/en', name: 'Homepage (English)' },
  { path: '/it/blog', name: 'Blog Page (Italian)' },
  { path: '/en/blog', name: 'Blog Page (English)' },
  { path: '/design-system', name: 'Design System' },
  { path: '/demo', name: 'Demo Page' },
]

// WCAG tags to test
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']

async function scanPage(
  browser: ReturnType<typeof chromium.launch> extends Promise<infer T> ? T : never,
  baseUrl: string,
  pageConfig: { path: string; name: string }
): Promise<PageScanResult | null> {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  })
  const page = await context.newPage()

  try {
    const fullUrl = `${baseUrl}${pageConfig.path}`
    console.log(`  Scanning: ${fullUrl}`)

    // Navigate and wait for page to be fully loaded
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 })

    // Wait a bit more for any client-side rendering
    await page.waitForTimeout(2000)

    // Run axe-core scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze()

    // Process violations
    const violations: AxeViolation[] = accessibilityScanResults.violations.map((v) => ({
      id: v.id,
      impact: v.impact as 'critical' | 'serious' | 'moderate' | 'minor',
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      tags: v.tags,
      nodes: v.nodes.map((n) => ({
        html: n.html,
        target: n.target as string[],
        failureSummary: n.failureSummary,
      })),
    }))

    // Process passes (summarized)
    const passes: AxePass[] = accessibilityScanResults.passes.map((p) => ({
      id: p.id,
      description: p.description,
      help: p.help,
      tags: p.tags,
      nodes: p.nodes.length,
    }))

    // Process incomplete
    const incomplete: AxeIncomplete[] = accessibilityScanResults.incomplete.map((i) => ({
      id: i.id,
      impact: i.impact || 'unknown',
      description: i.description,
      help: i.help,
      helpUrl: i.helpUrl,
      tags: i.tags,
      nodes: i.nodes.map((n) => ({
        html: n.html,
        target: n.target as string[],
        failureSummary: n.failureSummary,
      })),
    }))

    // Process inapplicable
    const inapplicable: AxeInapplicable[] = accessibilityScanResults.inapplicable.map((i) => ({
      id: i.id,
      description: i.description,
      help: i.help,
      tags: i.tags,
    }))

    // Calculate summary
    const summary = {
      totalViolations: violations.length,
      totalPasses: passes.length,
      totalIncomplete: incomplete.length,
      criticalCount: violations.filter((v) => v.impact === 'critical').length,
      seriousCount: violations.filter((v) => v.impact === 'serious').length,
      moderateCount: violations.filter((v) => v.impact === 'moderate').length,
      minorCount: violations.filter((v) => v.impact === 'minor').length,
    }

    return {
      url: fullUrl,
      pageName: pageConfig.name,
      timestamp: new Date().toISOString(),
      wcagTags: WCAG_TAGS,
      violations,
      passes,
      incomplete,
      inapplicable,
      summary,
    }
  } catch (error) {
    console.error(`  Error scanning ${pageConfig.name}: ${error}`)
    return null
  } finally {
    await context.close()
  }
}

async function runComprehensiveScan() {
  const baseUrl = process.env.BASE_URL || 'https://selfrules.org'
  console.log(`\n🔍 Starting comprehensive axe-core accessibility scan`)
  console.log(`   Base URL: ${baseUrl}`)
  console.log(`   WCAG Standards: ${WCAG_TAGS.join(', ')}\n`)

  const browser = await chromium.launch({ headless: true })

  const results: PageScanResult[] = []
  const startTime = Date.now()

  for (const pageConfig of PAGES_TO_SCAN) {
    const result = await scanPage(browser, baseUrl, pageConfig)
    if (result) {
      results.push(result)
      console.log(
        `    ✓ ${result.pageName}: ${result.summary.totalViolations} violations, ${result.summary.totalPasses} passes`
      )
    }
  }

  await browser.close()

  // Calculate overall summary
  const allViolations = results.flatMap((r) => r.violations)
  const uniqueViolationIds = [...new Set(allViolations.map((v) => v.id))]

  const scanResults: ScanResults = {
    scanInfo: {
      baseUrl,
      timestamp: new Date().toISOString(),
      totalPagesScanned: results.length,
      wcagStandards: WCAG_TAGS,
      browser: 'Chromium (Playwright)',
    },
    pages: results,
    overallSummary: {
      totalViolationsAcrossPages: allViolations.length,
      pagesWithViolations: results.filter((r) => r.summary.totalViolations > 0).length,
      pagesWithCriticalIssues: results.filter((r) => r.summary.criticalCount > 0).length,
      uniqueViolationTypes: uniqueViolationIds,
      violationsByImpact: {
        critical: allViolations.filter((v) => v.impact === 'critical').length,
        serious: allViolations.filter((v) => v.impact === 'serious').length,
        moderate: allViolations.filter((v) => v.impact === 'moderate').length,
        minor: allViolations.filter((v) => v.impact === 'minor').length,
      },
    },
  }

  // Write results to file
  const outputPath = path.join(process.cwd(), 'audit', 'axe-scan-results.json')
  fs.writeFileSync(outputPath, JSON.stringify(scanResults, null, 2))

  const duration = ((Date.now() - startTime) / 1000).toFixed(2)
  console.log(`\n✅ Scan complete in ${duration}s`)
  console.log(`   Results saved to: ${outputPath}`)
  console.log(`\n📊 Overall Summary:`)
  console.log(`   Pages scanned: ${scanResults.scanInfo.totalPagesScanned}`)
  console.log(`   Total violations: ${scanResults.overallSummary.totalViolationsAcrossPages}`)
  console.log(`   Pages with violations: ${scanResults.overallSummary.pagesWithViolations}`)
  console.log(`   Critical issues: ${scanResults.overallSummary.violationsByImpact.critical}`)
  console.log(`   Serious issues: ${scanResults.overallSummary.violationsByImpact.serious}`)
  console.log(`   Moderate issues: ${scanResults.overallSummary.violationsByImpact.moderate}`)
  console.log(`   Minor issues: ${scanResults.overallSummary.violationsByImpact.minor}`)
  console.log(`   Unique violation types: ${scanResults.overallSummary.uniqueViolationTypes.length}`)
}

runComprehensiveScan().catch(console.error)
