import { test, expect } from '@playwright/test';

test('seed: open Bro Workout home page', async ({ page }) => {
  await page.goto('https://bro-workout-frontend.vercel.app/');

  await expect(page).toHaveURL(
    'https://bro-workout-frontend.vercel.app/'
  );
});