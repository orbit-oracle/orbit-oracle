import { test, expect } from '@playwright/test';

test('user can login and view dashboard', async ({ page }) => {
  await page.goto('/login');

  await page.getByText('Fill demo credentials').click();

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/\/dashboard/);

  await expect(
    page.getByText('Dashboard')
  ).toBeVisible();
});