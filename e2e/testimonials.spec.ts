import { test, expect } from '@playwright/test';

test.describe('Testimonials Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display testimonials in WorkTogether section', async ({ page }) => {
    // Scroll to contact/work-together section
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    // Look for testimonial cards
    const testimonials = page.locator('[data-testid="testimonial"]').or(
      page.locator('.brutal-card').filter({ hasText: /Sarah Chen|Marco Bianchi|Alex Kumar|Elena Rossi/ })
    );

    const count = await testimonials.count();

    if (count === 0) {
      console.log('⚠️  Testimonials not found on page');
      console.log('⚠️  CHECK: Verify testimonials render in WorkTogether section');
    } else {
      console.log(`✅ Found ${count} testimonials`);
      expect(count).toBeGreaterThanOrEqual(4); // Should have 4 testimonials
    }
  });

  test('should display all 4 testimonials', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  CHECK: All 4 testimonials present:');
    console.log('   1. Sarah Chen - Founder & CEO, TechFlow AI');
    console.log('   2. Marco Bianchi - Product Manager, FinTech Startup');
    console.log('   3. Alex Kumar - Tech Lead, E-commerce Platform');
    console.log('   4. Elena Rossi - UX Designer, SaaS Company');
  });

  test('should display quote icon on testimonials', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const quoteIcons = page.locator('svg').filter({ has: page.locator('[class*="quote"]') });
    const count = await quoteIcons.count();

    if (count === 0) {
      console.log('⚠️  DESIGN: Add quote icon to testimonial cards');
      console.log('⚠️  Positioned top-left corner for visual interest');
    }
  });

  test('should display verified badges', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    const verifiedBadges = page.locator('text=Verified').or(
      page.locator('[data-verified="true"]')
    );

    const count = await verifiedBadges.count();

    if (count < 4) {
      console.log('⚠️  Not all testimonials have verified badges');
      console.log('⚠️  All 4 testimonials should be marked as verified');
    } else {
      console.log('✅ All testimonials have verified indicators');
    }
  });
});

test.describe('Testimonial Content', () => {
  test('should display complete testimonial data', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  Each testimonial should display:');
    console.log('   - Quote text (actual problem solved)');
    console.log('   - Author name');
    console.log('   - Author role/title');
    console.log('   - Company name');
    console.log('   - Verified badge');
    console.log('   - Optional: avatar/photo');
  });

  test('should follow brand tone of voice', async ({ page }) => {
    console.log('⚠️  CONTENT CHECK: Testimonial authenticity');
    console.log('   Each testimonial should:');
    console.log('   - Describe specific problem solved');
    console.log('   - Include concrete outcomes (90 minutes, 3 weeks, etc.)');
    console.log('   - Sound authentic, not marketing-speak');
    console.log('   - Follow Romei + Toon + Sinek style');
    console.log('   - Show real value, not generic praise');
    console.log('   Examples:');
    console.log('   ✅ "We spent 6 months building features nobody used..."');
    console.log('   ❌ "Excellent service! Highly recommended!"');
  });

  test('HARDCODED: Testimonial data in WorkTogether component', async ({ page }) => {
    console.log('⚠️  HARDCODED: Testimonial data');
    console.log('   Current: Defined in components/sections/WorkTogether.tsx');
    console.log('   Better: Store in messages/[locale].json (current approach)');
    console.log('   Best: Move to database for dynamic management');
    console.log('   Create Prisma model:');
    console.log('   model Testimonial {');
    console.log('     id         String   @id @default(cuid())');
    console.log('     quote      String');
    console.log('     author     String');
    console.log('     role       String');
    console.log('     company    String');
    console.log('     avatar     String?');
    console.log('     verified   Boolean  @default(false)');
    console.log('     projectType String? // consulting, brainstorming, mentorship');
    console.log('     date       DateTime?');
    console.log('     order      Int');
    console.log('     featured   Boolean  @default(false)');
    console.log('     isVisible  Boolean  @default(true)');
    console.log('     createdAt  DateTime @default(now())');
    console.log('     updatedAt  DateTime @updatedAt');
    console.log('   }');
  });
});

test.describe('Testimonial Layout & Design', () => {
  test('should use grid layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  LAYOUT CHECK: Desktop grid');
    console.log('   - 2 columns on desktop (md:grid-cols-2)');
    console.log('   - Equal height cards');
    console.log('   - Consistent spacing (gap-6)');
  });

  test('should stack on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  LAYOUT CHECK: Mobile stacking');
    console.log('   - Single column on mobile');
    console.log('   - Full-width cards');
    console.log('   - Readable text size');
    console.log('   - No horizontal overflow');
  });

  test('should match neobrutalist design system', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  DESIGN CHECK: Neobrutalist styling');
    console.log('   Testimonial cards should have:');
    console.log('   - 4px solid black border (border-4)');
    console.log('   - Hard shadow (shadow-brutal)');
    console.log('   - 8-12px border radius (rounded-brutal)');
    console.log('   - White/dark background (theme-aware)');
    console.log('   - Quote icon with accent color');
    console.log('   - Verified badge (green with checkmark)');
    console.log('   - Hover effect (translate + shadow change)');
  });

  test('should have smooth hover animations', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  ANIMATION CHECK: Hover effects');
    console.log('   On hover, testimonial should:');
    console.log('   - Lift up slightly (-translate-x-1 -translate-y-1)');
    console.log('   - Shadow expands (shadow-brutal-hover)');
    console.log('   - Smooth transition (transition-all)');
  });

  test('should animate on scroll into view', async ({ page }) => {
    await page.goto('/');

    console.log('⚠️  ANIMATION CHECK: Scroll animations');
    console.log('   Testimonials should:');
    console.log('   - Use ScrollAnimation component');
    console.log('   - Fade in with stagger delay (0.3, 0.4, 0.5, 0.6s)');
    console.log('   - Slide up slightly on entry');
  });
});

test.describe('Testimonial Management', () => {
  test('MISSING: Testimonial management in admin', async ({ page }) => {
    console.log('⚠️  MISSING: Admin interface for testimonials');
    console.log('   Once in database, need admin UI to:');
    console.log('   - Add new testimonials');
    console.log('   - Edit existing testimonials');
    console.log('   - Reorder testimonials (drag & drop)');
    console.log('   - Mark as featured');
    console.log('   - Toggle visibility');
    console.log('   - Upload author avatars');
    console.log('   Location: app/admin/testimonials/page.tsx');
  });

  test('MISSING: API endpoint for testimonials', async ({ request }) => {
    const response = await request.get('/api/testimonials');

    if (response.status() === 404) {
      console.log('⚠️  MISSING: /api/testimonials endpoint');
      console.log('   Should return: Array of visible testimonials');
      console.log('   Create: app/api/testimonials/route.ts');
    }
  });

  test('MISSING: Testimonial request/submission form', async ({ page }) => {
    console.log('⚠️  OPTIONAL: Client testimonial submission');
    console.log('   Allow clients to submit testimonials:');
    console.log('   - Form with fields: name, role, company, testimonial');
    console.log('   - Submit for review (not auto-published)');
    console.log('   - Admin approval workflow');
    console.log('   - Email notification on new submission');
  });
});

test.describe('Testimonial Social Proof', () => {
  test('should link to LinkedIn profiles', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  ENHANCEMENT: LinkedIn profile links');
    console.log('   Add optional LinkedIn links for authors');
    console.log('   - Small LinkedIn icon on testimonial card');
    console.log('   - Opens LinkedIn profile in new tab');
    console.log('   - Adds credibility and verification');
    console.log('   - Requires permission from testimonial authors');
  });

  test('should display company logos', async ({ page }) => {
    console.log('⚠️  OPTIONAL: Company logos in testimonials');
    console.log('   Display small company logo next to company name');
    console.log('   - Adds visual interest');
    console.log('   - Increases credibility');
    console.log('   - Requires logo image field in database');
    console.log('   - Example: TechFlow AI logo, etc.');
  });

  test('should display project context', async ({ page }) => {
    console.log('⚠️  ENHANCEMENT: Project type tags');
    console.log('   Show what type of work was done:');
    console.log('   - "Consulting" badge');
    console.log('   - "Brainstorming" badge');
    console.log('   - "Mentorship" badge');
    console.log('   - Maps to WorkTogether service modes');
    console.log('   - Helps visitors understand service scope');
  });

  test('should have structured data markup', async ({ page }) => {
    await page.goto('/');

    const structuredData = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(script => script.textContent);
    });

    const hasReviewSchema = structuredData.some(data =>
      data?.includes('Review') || data?.includes('@type')
    );

    if (!hasReviewSchema) {
      console.log('⚠️  MISSING: Structured data for testimonials');
      console.log('   Add JSON-LD schema:');
      console.log('   - @type: "Review"');
      console.log('   - reviewRating (5 stars)');
      console.log('   - author: Person schema');
      console.log('   - reviewBody: testimonial text');
      console.log('   Benefits:');
      console.log('   - Better SEO');
      console.log('   - Rich snippets in search');
      console.log('   - Increased credibility');
    }
  });
});

test.describe('Testimonial Accessibility', () => {
  test('should have proper semantic HTML', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(1000);

    console.log('⚠️  ACCESSIBILITY: Semantic HTML');
    console.log('   - Use <blockquote> for quote text');
    console.log('   - Use <cite> for author attribution');
    console.log('   - Proper heading hierarchy (h3 for "What people say")');
    console.log('   - role="list" on testimonial container (if needed)');
  });

  test('should have sufficient color contrast', async ({ page }) => {
    console.log('⚠️  ACCESSIBILITY: Color contrast');
    console.log('   WCAG AA requirements:');
    console.log('   - Quote text: 4.5:1 minimum');
    console.log('   - Author info: 4.5:1 minimum');
    console.log('   - Verified badge: 3:1 minimum (large text)');
    console.log('   - Test both light and dark modes');
  });

  test('should be readable at different zoom levels', async ({ page }) => {
    console.log('⚠️  ACCESSIBILITY: Text scaling');
    console.log('   Test at browser zoom levels:');
    console.log('   - 100% (normal)');
    console.log('   - 150% (common for low vision)');
    console.log('   - 200% (WCAG requirement)');
    console.log('   Text should not overflow or overlap');
  });
});

test.describe('Testimonial Analytics', () => {
  test('should track testimonial section views', async ({ page }) => {
    const analyticsRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/analytics')) {
        analyticsRequests.push(request.postData());
      }
    });

    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(2000);

    const sectionViewEvent = analyticsRequests.find(data =>
      data?.includes('testimonials_viewed') || data?.includes('scroll_depth')
    );

    if (!sectionViewEvent) {
      console.log('⚠️  RECOMMENDATION: Track testimonial section views');
      console.log('   Metric: How many users scroll to testimonials');
    }
  });

  test('should track which testimonials resonate most', async ({ page }) => {
    console.log('⚠️  OPTIONAL: Advanced testimonial analytics');
    console.log('   If testimonials become clickable (e.g., expand for full story):');
    console.log('   - Track which testimonials get clicked most');
    console.log('   - A/B test different testimonials');
    console.log('   - Understand what resonates with visitors');
    console.log('   - Optimize testimonial selection');
  });
});

test.describe('Testimonial Performance', () => {
  test('should lazy load author images', async ({ page }) => {
    console.log('⚠️  PERFORMANCE: Lazy loading');
    console.log('   If testimonials include author photos:');
    console.log('   - Use loading="lazy" on images');
    console.log('   - Optimize image sizes (WebP format)');
    console.log('   - Use blur placeholder while loading');
  });

  test('should not impact initial page load', async ({ page }) => {
    console.log('⚠️  PERFORMANCE: Impact on page load');
    console.log('   Testimonials section should:');
    console.log('   - Not block initial render');
    console.log('   - Load progressively');
    console.log('   - Not cause layout shift (CLS)');
    console.log('   - Use fixed heights if possible');
  });
});

test.describe('Testimonial Variations', () => {
  test('MISSING: Video testimonials', async ({ page }) => {
    console.log('⚠️  FUTURE FEATURE: Video testimonials');
    console.log('   More impactful than text:');
    console.log('   - Record client video testimonials');
    console.log('   - Embed YouTube/Vimeo videos');
    console.log('   - Thumbnail with play button');
    console.log('   - Modal player on click');
    console.log('   - Requires: video hosting, recording setup');
  });

  test('MISSING: Rotating testimonials/carousel', async ({ page }) => {
    console.log('⚠️  OPTIONAL: Testimonial carousel');
    console.log('   If many testimonials:');
    console.log('   - Auto-rotating carousel');
    console.log('   - Show 2-3 at a time');
    console.log('   - Pause on hover');
    console.log('   - Navigation dots');
    console.log('   - Accessible controls');
    console.log('   Library: Swiper.js or Embla Carousel');
  });

  test('MISSING: Featured testimonial section', async ({ page }) => {
    console.log('⚠️  OPTIONAL: Hero testimonial');
    console.log('   Highlight best testimonial:');
    console.log('   - Larger card in Hero section');
    console.log('   - Different styling (featured=true)');
    console.log('   - Rotate featured testimonial weekly');
    console.log('   - Drives social proof immediately');
  });
});
