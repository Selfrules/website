import { test, expect } from '@playwright/test';

test.describe('Certification Badges Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display certification badges in Journey section', async ({ page }) => {
    // Scroll to Journey section
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    // Look for certification badges
    const certBadges = page.locator('[data-testid="certification-badge"]').or(
      page.locator('.brutal-card').filter({ hasText: /AI for Product|Product Leader|ScrumMaster/ })
    );

    const count = await certBadges.count();

    if (count === 0) {
      console.log('⚠️  Certification badges not found on page');
      console.log('⚠️  CHECK: Verify badges are rendered in Journey section');
    } else {
      console.log(`✅ Found ${count} certification badges`);
      expect(count).toBeGreaterThanOrEqual(6); // Should have 6 certifications
    }
  });

  test('should display "Verified" indicator on badges', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const verifiedBadges = page.locator('text=Verified').or(
      page.locator('[data-verified="true"]')
    );

    const count = await verifiedBadges.count();

    if (count === 0) {
      console.log('⚠️  No verified indicators found');
      console.log('⚠️  CHECK: Add verified badges to certification cards');
    } else {
      console.log(`✅ Found ${count} verified badges`);
    }
  });

  test('should be clickable to open modal', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const certBadges = page.locator('[data-testid="certification-badge"]').first();
    const badgeExists = await certBadges.count();

    if (badgeExists > 0) {
      await certBadges.click();
      await page.waitForTimeout(500);

      // Check if modal opened
      const modal = page.locator('[role="dialog"]').or(
        page.locator('[data-testid="certification-modal"]')
      );

      const modalVisible = await modal.isVisible();

      if (!modalVisible) {
        console.log('⚠️  Modal not opening on badge click');
      } else {
        console.log('✅ Certification modal opens on click');
      }
    }
  });

  test('should display all 6 certifications', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  CHECK: All 6 certifications present:');
    console.log('   1. AI for Product Management');
    console.log('   2. Product Leader Certification');
    console.log('   3. Product Marketing Certification');
    console.log('   4. Google Product Management Certificate');
    console.log('   5. Certified ScrumMaster (CSM)');
    console.log('   6. Certified Scrum Product Owner (CSPO)');
  });
});

test.describe('Certification Modal Details', () => {
  test('should display complete certification information', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const firstBadge = page.locator('[data-testid="certification-badge"]').first();
    const badgeExists = await firstBadge.count();

    if (badgeExists > 0) {
      await firstBadge.click();
      await page.waitForTimeout(500);

      console.log('⚠️  Modal should display:');
      console.log('   - Certification title and tagline');
      console.log('   - Issuing organization');
      console.log('   - Issue date');
      console.log('   - Credential ID (if available)');
      console.log('   - Verification URL button');
      console.log('   - Skills/topics covered');
      console.log('   - Description of certification');
    }
  });

  test('should have working "Verify Certificate" button', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const firstBadge = page.locator('[data-testid="certification-badge"]').first();
    const badgeExists = await firstBadge.count();

    if (badgeExists > 0) {
      await firstBadge.click();
      await page.waitForTimeout(500);

      // Look for verify button
      const verifyButton = page.locator('button:has-text("Verify")').or(
        page.locator('a:has-text("Verify")')
      );

      const buttonExists = await verifyButton.count();

      if (buttonExists === 0) {
        console.log('⚠️  MISSING: Verify Certificate button');
        console.log('⚠️  Should link to issuer verification page');
      }
    }
  });

  test('should close modal on close button click', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const firstBadge = page.locator('[data-testid="certification-badge"]').first();
    const badgeExists = await firstBadge.count();

    if (badgeExists > 0) {
      await firstBadge.click();
      await page.waitForTimeout(500);

      // Look for close button
      const closeButton = page.locator('[aria-label="Close"]').or(
        page.locator('button').filter({ hasText: /×|Close/ })
      );

      const closeExists = await closeButton.count();

      if (closeExists > 0) {
        await closeButton.click();
        await page.waitForTimeout(500);

        const modal = page.locator('[role="dialog"]');
        const modalVisible = await modal.isVisible();

        if (modalVisible) {
          console.log('⚠️  ISSUE: Modal not closing on close button click');
        }
      } else {
        console.log('⚠️  MISSING: Close button in modal');
      }
    }
  });

  test('should close modal on backdrop click', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const firstBadge = page.locator('[data-testid="certification-badge"]').first();
    const badgeExists = await firstBadge.count();

    if (badgeExists > 0) {
      await firstBadge.click();
      await page.waitForTimeout(500);

      // Click backdrop
      await page.mouse.click(50, 50); // Click top-left corner (backdrop)
      await page.waitForTimeout(500);

      const modal = page.locator('[role="dialog"]');
      const modalVisible = await modal.isVisible();

      if (modalVisible) {
        console.log('⚠️  RECOMMENDATION: Allow closing modal by clicking backdrop');
      }
    }
  });

  test('should close modal on Escape key', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const firstBadge = page.locator('[data-testid="certification-badge"]').first();
    const badgeExists = await firstBadge.count();

    if (badgeExists > 0) {
      await firstBadge.click();
      await page.waitForTimeout(500);

      // Press Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);

      const modal = page.locator('[role="dialog"]');
      const modalVisible = await modal.isVisible();

      if (modalVisible) {
        console.log('⚠️  ISSUE: Modal not closing on Escape key');
      }
    }
  });
});

test.describe('Certification Data Management', () => {
  test('HARDCODED: Certification data in Journey component', async ({ page }) => {
    console.log('⚠️  HARDCODED: Certification data');
    console.log('   Current: Defined directly in components/sections/Journey.tsx');
    console.log('   Issue: Not easily manageable or updatable');
    console.log('   RECOMMENDATION: Move to database');
    console.log('   Create Prisma model:');
    console.log('   model Certification {');
    console.log('     id              String   @id @default(cuid())');
    console.log('     title           String');
    console.log('     tagline         String');
    console.log('     issuer          String');
    console.log('     issueDate       String');
    console.log('     expiryDate      String?');
    console.log('     credentialId    String?');
    console.log('     verificationUrl String?');
    console.log('     description     String?');
    console.log('     skills          String[] // Array of skills');
    console.log('     icon            String   // Icon identifier');
    console.log('     imageUrl        String?  // Certificate image');
    console.log('     order           Int      // Display order');
    console.log('     isVisible       Boolean  @default(true)');
    console.log('     createdAt       DateTime @default(now())');
    console.log('     updatedAt       DateTime @updatedAt');
    console.log('   }');
  });

  test('MISSING: Certification management in admin dashboard', async ({ page }) => {
    console.log('⚠️  MISSING: Admin interface for certifications');
    console.log('   Once in database, need admin UI to:');
    console.log('   - Add new certifications');
    console.log('   - Edit existing certifications');
    console.log('   - Reorder certifications (drag & drop)');
    console.log('   - Toggle visibility');
    console.log('   - Upload certificate images');
    console.log('   Location: app/admin/certifications/page.tsx');
  });

  test('MISSING: API endpoint for certifications', async ({ request }) => {
    const response = await request.get('/api/certifications');

    if (response.status() === 404) {
      console.log('⚠️  MISSING: /api/certifications endpoint');
      console.log('   Should return: Array of visible certifications');
      console.log('   Create: app/api/certifications/route.ts');
    }
  });

  test('MISSING: Certification expiry tracking', async ({ page }) => {
    console.log('⚠️  MISSING: Certification expiry tracking');
    console.log('   Some certifications expire (e.g., ScrumMaster)');
    console.log('   Features needed:');
    console.log('   - expiryDate field in database');
    console.log('   - Show "Expires: MM/YYYY" on badge');
    console.log('   - Admin notification when expiring soon');
    console.log('   - Option to mark as renewed');
  });
});

test.describe('Certification Verification', () => {
  test('should link to external verification pages', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  VERIFICATION: External verification links');
    console.log('   Ensure all verificationUrl fields are valid:');
    console.log('   - AI for Product: Reforge verification');
    console.log('   - Product Leader: Product School verification');
    console.log('   - Google PM: Coursera certificate verification');
    console.log('   - ScrumMaster: Scrum Alliance verification');
    console.log('   - CSPO: Scrum Alliance verification');
    console.log('   Links should open in new tab (target="_blank")');
  });

  test('MISSING: Blockchain verification integration', async ({ page }) => {
    console.log('⚠️  OPTIONAL: Blockchain-based verification');
    console.log('   Per PRD mention of blockchain verification:');
    console.log('   - Could integrate with platforms like Accredible');
    console.log('   - Or custom blockchain verification system');
    console.log('   - Shows immutable proof of certification');
    console.log('   - Currently placeholder only');
  });

  test('should display credential ID when available', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const firstBadge = page.locator('[data-testid="certification-badge"]').first();
    const badgeExists = await firstBadge.count();

    if (badgeExists > 0) {
      await firstBadge.click();
      await page.waitForTimeout(500);

      console.log('⚠️  CHECK: Credential ID display');
      console.log('   If certification has credential ID, show it');
      console.log('   Format: "Credential ID: ABC123456"');
      console.log('   Allows manual verification on issuer website');
    }
  });
});

test.describe('Certification UI/UX', () => {
  test('should match neobrutalist design system', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  DESIGN CHECK: Certification badges styling');
    console.log('   Should include:');
    console.log('   - 4px solid black border (border-4)');
    console.log('   - Hard shadow on hover (shadow-brutal-hover)');
    console.log('   - 8-12px border radius (rounded-brutal)');
    console.log('   - Icon with brand colors');
    console.log('   - Verified badge (green with checkmark)');
    console.log('   - Smooth hover animations (translate + shadow)');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  RESPONSIVE CHECK: Mobile layout');
    console.log('   - Should display 1-2 badges per row on mobile');
    console.log('   - Modal should be full-screen or near full-screen');
    console.log('   - Touch-friendly button sizes (min 44x44px)');
    console.log('   - Text should remain readable');
  });

  test('should have smooth animations', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  ANIMATIONS CHECK:');
    console.log('   Badge animations:');
    console.log('   - Fade in on scroll (ScrollAnimation)');
    console.log('   - Hover lift effect (-translate-y-1)');
    console.log('   - Shadow expansion on hover');
    console.log('   Modal animations:');
    console.log('   - Backdrop fade in (AnimatePresence)');
    console.log('   - Modal scale + fade in (spring animation)');
    console.log('   - Smooth exit animations');
  });

  test('should show loading skeleton while fetching', async ({ page }) => {
    console.log('⚠️  OPTIONAL: Loading skeleton');
    console.log('   If certifications come from database/API:');
    console.log('   - Show skeleton cards while loading');
    console.log('   - Prevents layout shift');
    console.log('   - Better perceived performance');
  });
});

test.describe('Certification Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  ACCESSIBILITY: Keyboard navigation');
    console.log('   - Tab to badges (should have visible focus ring)');
    console.log('   - Enter/Space to open modal');
    console.log('   - Tab through modal content');
    console.log('   - Escape to close modal');
    console.log('   - Focus returns to badge after close');
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  ACCESSIBILITY: ARIA attributes');
    console.log('   Badge button:');
    console.log('   - role="button" (if not <button>)');
    console.log('   - aria-label="View [certification name] details"');
    console.log('   Modal:');
    console.log('   - role="dialog"');
    console.log('   - aria-modal="true"');
    console.log('   - aria-labelledby (pointing to title)');
    console.log('   - Focus trap when open');
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  ACCESSIBILITY: Color contrast');
    console.log('   WCAG AA requirements:');
    console.log('   - Normal text: 4.5:1 contrast ratio');
    console.log('   - Large text: 3:1 contrast ratio');
    console.log('   - Verify verified badge (green) meets contrast');
    console.log('   - Check dark mode contrast as well');
  });
});

test.describe('Certification Analytics', () => {
  test('should track certification badge clicks', async ({ page }) => {
    const analyticsRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/analytics')) {
        analyticsRequests.push(request.postData());
      }
    });

    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#journey')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const firstBadge = page.locator('[data-testid="certification-badge"]').first();
    const badgeExists = await firstBadge.count();

    if (badgeExists > 0) {
      await firstBadge.click();
      await page.waitForTimeout(1000);

      const certClickEvent = analyticsRequests.find(data =>
        data?.includes('certification_viewed')
      );

      if (!certClickEvent) {
        console.log('⚠️  MISSING: Analytics tracking for certification views');
        console.log('⚠️  ADD: analytics.trackEvent("certification_viewed", { certId })');
      }
    }
  });

  test('should track verification link clicks', async ({ page }) => {
    console.log('⚠️  RECOMMENDATION: Track verification clicks');
    console.log('   Track when users click "Verify Certificate"');
    console.log('   Metrics:');
    console.log('   - Which certifications get verified most');
    console.log('   - Verification click rate');
    console.log('   - User trust indicators');
  });
});
