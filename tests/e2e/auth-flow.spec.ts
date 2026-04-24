import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Intercept API calls to avoid hitting the real backend
    await page.route("**/auth/login", async (route) => {
      const payload = route.request().postDataJSON();
      if (payload.email === "test@example.com" && payload.password === "password123") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            token: "fake-jwt-token",
            user: { id: "1", name: "Test User", email: "test@example.com" },
          }),
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({ message: "Invalid credentials" }),
        });
      }
    });
  });

  test("should sign in successfully", async ({ page }) => {
    await page.goto("/sign-in");

    await page.fill('input[id="email"]', "test@example.com");
    await page.fill('input[id="password"]', "password123");
    await page.click('button[type="submit"]');

    // Should show success toast
    await expect(page.locator("text=Signed in successfully")).toBeVisible();

    // Should redirect to dashboard
    await expect(page).toHaveURL("/dashboard");
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/sign-in");

    await page.fill('input[id="email"]', "wrong@example.com");
    await page.fill('input[id="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // Should show error toast
    await expect(page.locator("text=Invalid credentials")).toBeVisible();
    
    // Should stay on sign-in page
    await expect(page).toHaveURL("/sign-in");
  });

  test("should show validation errors on sign-up", async ({ page }) => {
    await page.goto("/sign-up");

    await page.click('button:has-text("Create Account")');

    await expect(page.locator("text=Name must be at least 5 characters long")).toBeVisible();
    await expect(page.locator("text=Invalid email format")).toBeVisible();
    await expect(page.locator("text=Password must be at least 8 characters long")).toBeVisible();
  });

  test("should successfully fill sign-up form", async ({ page }) => {
    await page.goto("/sign-up");

    await page.fill('input[id="name"]', "John Doe");
    await page.fill('input[id="email"]', "john@example.com");
    await page.fill('input[id="password"]', "password123");
    await page.fill('input[id="verifyPassword"]', "password123");

    // Since sign-up currently only console logs, we just check that no validation errors appear
    await page.click('button:has-text("Create Account")');
    
    await expect(page.locator("text=Name must be at least 5 characters long")).not.toBeVisible();
    await expect(page.locator("text=Invalid email format")).not.toBeVisible();
  });
});
