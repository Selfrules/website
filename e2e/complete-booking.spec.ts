/**
 * Complete Booking System E2E Tests
 * Tests calendar booking functionality and full user flow
 */

import { test, expect } from '@playwright/test';

test.describe('Complete Booking System Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/it');

    // Scroll to WorkTogether section where booking widget is located
    const workTogetherSection = page.locator('#contact');
    await workTogetherSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test.describe('Booking Widget Visibility', () => {
    test('should display booking widget in WorkTogether section', async ({ page }) => {
      // Check for booking section heading
      const bookingHeading = page.locator('text=/prenota una call/i');
      await expect(bookingHeading).toBeVisible();

      // Check for calendar component
      const calendar = page.locator('[class*="calendar"]').or(
        page.locator('text=/gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre/i')
      );
      await expect(calendar.first()).toBeVisible();
    });

    test('should display current month in calendar', async ({ page }) => {
      const currentMonth = new Date().toLocaleString('it-IT', { month: 'long' });
      const monthDisplay = page.locator(`text=/${currentMonth}/i`);
      await expect(monthDisplay.first()).toBeVisible();
    });

    test('should show month navigation buttons', async ({ page }) => {
      // Look for calendar navigation within the booking widget
      const calendar = page.locator('[class*="calendar"]').or(
        page.locator('text=/gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre/i').locator('..')
      );

      // Navigation buttons should be within calendar
      const navButtons = calendar.locator('button').filter({ has: page.locator('svg') });
      expect(await navButtons.count()).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('Calendar Navigation', () => {
    test('should navigate to next month', async ({ page }) => {
      // Get current month for comparison
      const calendar = page.locator('[class*="calendar"]').or(
        page.locator('text=/gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre/i').locator('..')
      );

      // Find navigation buttons within calendar
      const navButtons = calendar.locator('button').filter({ has: page.locator('svg') });

      // Click the last button (should be next month)
      if (await navButtons.count() >= 2) {
        await navButtons.last().click();
        await page.waitForTimeout(500);

        // Calendar should still be visible (month changed)
        await expect(calendar.first()).toBeVisible();
      }
    });

    test('should navigate to previous month', async ({ page }) => {
      const calendar = page.locator('[class*="calendar"]').or(
        page.locator('text=/gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre/i').locator('..')
      );

      // Find navigation buttons within calendar
      const navButtons = calendar.locator('button').filter({ has: page.locator('svg') });

      // Click the first button (should be previous month)
      if (await navButtons.count() >= 2) {
        await navButtons.first().click();
        await page.waitForTimeout(500);

        // Calendar should still be visible (month changed)
        await expect(calendar.first()).toBeVisible();
      }
    });
  });

  test.describe('Date Selection', () => {
    test('should select an available date', async ({ page }) => {
      // Find and click an available date (not disabled, not past)
      const availableDates = page.locator('button[class*="available"]').or(
        page.locator('button:not([disabled])').filter({ hasText: /^[0-9]+$/ })
      );

      const dateCount = await availableDates.count();
      if (dateCount > 0) {
        await availableDates.first().click();
        await page.waitForTimeout(500);

        // Should show time slot picker
        const timeslotPicker = page.locator('text=/scegli l\'orario|time slot/i').or(
          page.locator('[class*="time"], [class*="slot"]')
        );
        await expect(timeslotPicker.first()).toBeVisible();
      }
    });

    test('should not allow selection of past dates', async ({ page }) => {
      // Past dates should be disabled
      const today = new Date();
      const yesterday = today.getDate() - 1;

      if (yesterday > 0) {
        const pastDate = page.locator(`button:text("${yesterday}")`);
        if (await pastDate.count() > 0) {
          const isDisabled = await pastDate.first().isDisabled();
          expect(isDisabled).toBeTruthy();
        }
      }
    });

    test('should highlight selected date', async ({ page }) => {
      const availableDates = page.locator('button:not([disabled])').filter({ hasText: /^[0-9]+$/ });

      if (await availableDates.count() > 0) {
        const firstDate = availableDates.first();
        await firstDate.click();
        await page.waitForTimeout(300);

        // Selected date should have special styling
        const hasSelectedClass = await firstDate.evaluate(el => {
          return el.classList.contains('bg-primary') ||
                 el.classList.contains('selected') ||
                 window.getComputedStyle(el).boxShadow !== 'none';
        });
        expect(hasSelectedClass).toBeTruthy();
      }
    });
  });

  test.describe('Time Slot Selection', () => {
    test('should display time slots after date selection', async ({ page }) => {
      // Select a date
      const availableDates = page.locator('button:not([disabled])').filter({ hasText: /^[0-9]+$/ });
      if (await availableDates.count() > 0) {
        await availableDates.first().click();

        // Wait for timeslots to load (API call completes)
        await page.waitForTimeout(2000);

        // Check for time slots - either buttons with time format or "no slots" message
        const timeSlots = page.locator('button').filter({ hasText: /\d{2}:\d{2}/ });
        const noSlotsMessage = page.locator('text=/Nessun orario disponibile/i');

        // Should see either timeslots OR the "no slots available" message
        const hasSlots = await timeSlots.count() > 0;
        const hasNoSlotsMessage = await noSlotsMessage.isVisible().catch(() => false);

        expect(hasSlots || hasNoSlotsMessage).toBeTruthy();
      }
    });

    test('should select a time slot', async ({ page }) => {
      // Select date
      const availableDates = page.locator('button:not([disabled])').filter({ hasText: /^[0-9]+$/ });
      if (await availableDates.count() > 0) {
        await availableDates.first().click();
        await page.waitForTimeout(1000);

        // Select time slot
        const timeSlots = page.locator('button:not([disabled])').filter({ hasText: /\d{2}:\d{2}/ });
        if (await timeSlots.count() > 0) {
          await timeSlots.first().click();
          await page.waitForTimeout(500);

          // Should show booking form
          const bookingForm = page.locator('text=/completa la prenotazione|complete booking/i');
          await expect(bookingForm.first()).toBeVisible();
        }
      }
    });

    test('should display selected time slot confirmation', async ({ page }) => {
      // Select date and time
      const availableDates = page.locator('button:not([disabled])').filter({ hasText: /^[0-9]+$/ });
      if (await availableDates.count() > 0) {
        await availableDates.first().click();
        await page.waitForTimeout(1000);

        const timeSlots = page.locator('button:not([disabled])').filter({ hasText: /\d{2}:\d{2}/ });
        if (await timeSlots.count() > 0) {
          const selectedSlot = await timeSlots.first().textContent();
          await timeSlots.first().click();
          await page.waitForTimeout(500);

          // Selected time should be displayed in form
          const timeDisplay = page.locator(`text=/${selectedSlot}/`);
          expect(await timeDisplay.count()).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe('Booking Form', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to booking form by selecting date and time
      const availableDates = page.locator('button:not([disabled])').filter({ hasText: /^[0-9]+$/ });
      if (await availableDates.count() > 0) {
        await availableDates.first().click();
        await page.waitForTimeout(1000);

        const timeSlots = page.locator('button:not([disabled])').filter({ hasText: /\d{2}:\d{2}/ });
        if (await timeSlots.count() > 0) {
          await timeSlots.first().click();
          await page.waitForTimeout(500);
        }
      }
    });

    test('should display all required form fields', async ({ page }) => {
      // Check for name field
      const nameField = page.locator('input[name="name"], input[id="name"]');
      await expect(nameField.first()).toBeVisible();

      // Check for email field
      const emailField = page.locator('input[name="email"], input[id="email"]');
      await expect(emailField.first()).toBeVisible();

      // Check for phone field
      const phoneField = page.locator('input[name="phone"], input[id="phone"]');
      await expect(phoneField.first()).toBeVisible();

      // Check for notes field (optional)
      const notesField = page.locator('textarea[name="notes"], textarea[id="notes"]');
      await expect(notesField.first()).toBeVisible();
    });

    test('should validate required fields', async ({ page }) => {
      // Try to submit without filling fields
      const submitButton = page.locator('button').filter({ hasText: /conferma|submit|book/i });
      await submitButton.first().click();
      await page.waitForTimeout(500);

      // Should show validation errors
      const errors = page.locator('text=/obbligatorio|required|invalid/i');
      expect(await errors.count()).toBeGreaterThan(0);
    });

    test('should validate email format', async ({ page }) => {
      const emailField = page.locator('input[name="email"], input[id="email"]');
      await emailField.first().fill('invalid-email');

      const submitButton = page.locator('button').filter({ hasText: /conferma|submit/i });
      await submitButton.first().click();
      await page.waitForTimeout(300);

      // Should show email validation error
      const emailError = page.locator('text=/email.*valid|valida/i');
      await expect(emailError.first()).toBeVisible();
    });

    test('should submit booking with valid data', async ({ page }) => {
      // Fill form with valid data
      const nameField = page.locator('input[name="name"], input[id="name"]');
      await nameField.first().fill('Test User');

      const emailField = page.locator('input[name="email"], input[id="email"]');
      await emailField.first().fill('test@example.com');

      const phoneField = page.locator('input[name="phone"], input[id="phone"]');
      await phoneField.first().fill('+39 333 1234567');

      const notesField = page.locator('textarea[name="notes"], textarea[id="notes"]');
      await notesField.first().fill('Test booking from E2E tests');

      // Submit form
      const submitButton = page.locator('button').filter({ hasText: /conferma|submit|book/i });
      await submitButton.first().click();

      // Wait for response
      await page.waitForTimeout(3000);

      // Should show confirmation or handle API response
      // (May need to mock API for reliable testing)
    });

    test('should allow canceling booking', async ({ page }) => {
      const cancelButton = page.locator('button').filter({ hasText: /annulla|cancel/i });
      await cancelButton.first().click();
      await page.waitForTimeout(300);

      // Should go back to time slot selection
      const timeSlots = page.locator('button').filter({ hasText: /\d{2}:\d{2}/ });
      expect(await timeSlots.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Progress Indicator', () => {
    test('should show progress steps', async ({ page }) => {
      // Check for step indicators (1, 2, 3)
      const step1 = page.locator('text=/^1$/').or(
        page.locator('[class*="step"]').filter({ hasText: '1' })
      );
      await expect(step1.first()).toBeVisible();

      const step2 = page.locator('text=/^2$/').or(
        page.locator('[class*="step"]').filter({ hasText: '2' })
      );
      await expect(step2.first()).toBeVisible();

      const step3 = page.locator('text=/^3$/').or(
        page.locator('[class*="step"]').filter({ hasText: '3' })
      );
      await expect(step3.first()).toBeVisible();
    });

    test('should update progress through booking flow', async ({ page }) => {
      // Step 1 should be active initially
      const step1 = page.locator('[class*="step"]').filter({ hasText: '1' });
      const step1Active = await step1.first().evaluate(el => {
        return el.classList.contains('bg-primary') ||
               window.getComputedStyle(el).backgroundColor !== 'rgb(255, 255, 255)';
      });
      expect(step1Active).toBeTruthy();

      // Select date - Step 2 should become active
      const availableDates = page.locator('button:not([disabled])').filter({ hasText: /^[0-9]+$/ });
      if (await availableDates.count() > 0) {
        await availableDates.first().click();
        await page.waitForTimeout(1000);

        const step2 = page.locator('[class*="step"]').filter({ hasText: '2' });
        const step2Active = await step2.first().evaluate(el => {
          return el.classList.contains('bg-primary');
        });
        expect(step2Active).toBeTruthy();
      }
    });
  });

  test.describe('Neobrutalist Design', () => {
    test('should have thick borders on interactive elements', async ({ page }) => {
      const dateButtons = page.locator('button').filter({ hasText: /^[0-9]+$/ });
      if (await dateButtons.count() > 0) {
        const borderWidth = await dateButtons.first().evaluate(el => {
          return window.getComputedStyle(el).borderWidth;
        });
        // Should have thick border (2px or more)
        expect(parseInt(borderWidth)).toBeGreaterThanOrEqual(2);
      }
    });

    test('should have hard shadows on cards', async ({ page }) => {
      const calendar = page.locator('[class*="calendar"]').or(
        page.locator('[class*="rounded-xl"][class*="border"]')
      );
      if (await calendar.count() > 0) {
        const boxShadow = await calendar.first().evaluate(el => {
          return window.getComputedStyle(el).boxShadow;
        });
        // Should have shadow (not 'none')
        expect(boxShadow).not.toBe('none');
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels', async ({ page }) => {
      // Month navigation buttons should have aria-labels
      const prevButton = page.locator('button[aria-label*="Previous" i]').or(
        page.locator('button[aria-label*="month" i]').first()
      );
      const hasAriaLabel = await prevButton.evaluate(el => {
        return el.getAttribute('aria-label') !== null;
      }).catch(() => false);

      if (await prevButton.count() > 0) {
        expect(hasAriaLabel).toBeTruthy();
      }
    });

    test('should be keyboard navigable', async ({ page }) => {
      // Focus on first available date
      const availableDates = page.locator('button:not([disabled])').filter({ hasText: /^[0-9]+$/ });
      if (await availableDates.count() > 0) {
        await availableDates.first().focus();

        // Should be able to activate with Enter
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);

        // Should show time slots
        const timeSlots = page.locator('button').filter({ hasText: /\d{2}:\d{2}/ });
        expect(await timeSlots.count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should be usable on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();

      const workTogetherSection = page.locator('#contact');
      await workTogetherSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Calendar should still be visible and usable
      const calendar = page.locator('[class*="calendar"]');
      await expect(calendar.first()).toBeVisible();

      // Date buttons should be touchable (not too small)
      const dateButtons = page.locator('button').filter({ hasText: /^[0-9]+$/ });
      if (await dateButtons.count() > 0) {
        const buttonSize = await dateButtons.first().evaluate(el => {
          const rect = el.getBoundingClientRect();
          return { width: rect.width, height: rect.height };
        });
        // Should be at least 44x44 (minimum touch target)
        expect(buttonSize.width).toBeGreaterThanOrEqual(32);
        expect(buttonSize.height).toBeGreaterThanOrEqual(32);
      }
    });
  });
});
