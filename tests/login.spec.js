import { test, expect } from '@playwright/test';

test('login page displays correctly', async ({ page }) => {
  await page.goto('/login');

  await expect(
    page.getByRole('heading', { name: 'Sign in to Orbit Oracle' })
  ).toBeVisible();

  await expect(
    page.getByText('Mission Operations Copilot')
  ).toBeVisible();

  await expect(
    page.getByPlaceholder('operator@mission.space')
  ).toBeVisible();

  await expect(
    page.getByPlaceholder('••••••••')
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Sign In' })
  ).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'Register' })
  ).toBeVisible();
});


test('login shows error when fields are empty', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(
    page.getByText('Please fill all fields.')
  ).toBeVisible();
});


test('login shows validation when fields are empty', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(
    page.getByText('Please fill all fields.')
  ).toBeVisible();
});



