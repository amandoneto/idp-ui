import { test, expect } from '@playwright/test';

test.describe('Assessment Flow', () => {
  test.beforeEach(async ({ page, context }) => {
    // 1. Mock Authentication
    await context.addCookies([
      {
        name: 'auth_token',
        value: 'mock-token',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.route('**/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            uuid: 'user-1',
            name: 'Test User',
            email: 'test@example.com',
          },
        }),
      });
    });

    // 2. Mock the assessments list API
    await page.route('**/assessments?page=0&size=8', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          content: [
            {
              uuid: 'test-uuid-1',
              year: 2024,
              status: 'DRAFT',
              leaderName: 'John Doe',
              project: 'PDI 2024',
              position: 'Senior Engineer',
              employee: 'Test User',
            },
          ],
          number: 0,
          size: 8,
          totalElements: 1,
          totalPages: 1,
          last: true,
        }),
      });
    });

    // Mock levels API
    await page.route('**/assessments/levels', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { value: 1, description: 'Basic' },
          { value: 2, description: 'Intermediate' },
          { value: 3, description: 'Advanced' },
        ]),
      });
    });

    // Mock assessment details API
    await page.route('**/assessments/test-uuid-1', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          uuid: 'test-uuid-1',
          year: 2024,
          status: 'DRAFT',
          leaderName: 'John Doe',
          categories: [
            {
              uuid: 'cat-1',
              name: 'Technical Skills',
              subcategories: [
                {
                  uuid: 'sub-1',
                  name: 'Frontend',
                  answers: [
                    {
                      uuid: 'ans-1',
                      question: 'React Knowledge',
                      employeeLevelValue: null,
                      leaderLevelValue: 2,
                    },
                  ],
                },
              ],
            },
          ],
        }),
      });
    });

    // Mock save answers API
    await page.route('**/assessments/answers/test-uuid-1/drafts', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });
  });

  test('should navigate from list to details and save a draft', async ({ page }) => {
    // 1. Go to assessments page
    await page.goto('/assessment');

    // 2. Verify assessment card is visible
    const card = page.locator('text=PDI 2024');
    await expect(card).toBeVisible();
    await expect(page.locator('text=DRAFT').first()).toBeVisible();

    // 3. Click to view details
    // The button text is "Analyze" for DRAFT
    await page.locator('text=Analyze').click();

    // 4. Verify details page loaded
    await expect(page).toHaveURL(/\/assessment\/details\/test-uuid-1/);
    await expect(page.locator('h1')).toContainText('PDI 2024');

    // 5. Select a level for the question
    // The trigger is a button with "Select..." text
    const dropdownTrigger = page.locator('button[role="combobox"]').first();
    await dropdownTrigger.click();

    // Select Level 3
    await page.locator('text=Level 3').click();

    // 6. Verify selection
    await expect(dropdownTrigger).toContainText('3');

    // 7. Save draft
    const saveButton = page.locator('button:has-text("Save Draft")');
    await expect(saveButton).not.toBeDisabled();
    await saveButton.click();

    // 8. Verify success toast (sonner)
    await expect(page.locator('text=Draft saved successfully!')).toBeVisible();
  });

  test('should show read-only state for completed assessments', async ({ page }) => {
    // Mock a completed assessment
    await page.route('**/assessments/test-uuid-done', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          uuid: 'test-uuid-done',
          year: 2023,
          status: 'DONE',
          categories: [
            {
              uuid: 'cat-1',
              name: 'Technical Skills',
              subcategories: [
                {
                  uuid: 'sub-1',
                  name: 'Frontend',
                  answers: [
                    {
                      uuid: 'ans-1',
                      question: 'React Knowledge',
                      employeeLevelValue: 3,
                      leaderLevelValue: 3,
                    },
                  ],
                },
              ],
            },
          ],
        }),
      });
    });

    await page.goto('/assessment/details/test-uuid-done');

    // Verify status is DONE
    await expect(page.locator('text=Status: DONE')).toBeVisible();

    // Verify Save buttons are NOT visible
    await expect(page.locator('button:has-text("Save Draft")')).not.toBeVisible();
    await expect(page.locator('button:has-text("Save Assessment")')).not.toBeVisible();

    // Verify dropdown is disabled
    const dropdownTrigger = page.locator('button[role="combobox"]').first();
    await expect(dropdownTrigger).toBeDisabled();
  });
});
