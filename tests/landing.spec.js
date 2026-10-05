import { test, expect } from '@playwright/test';

test('landing page loads successfully', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/$/);

  await expect(page.locator('body')).toBeVisible();
});