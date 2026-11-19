import { test, expect } from '@playwright/test';

test('healer pilot: home heading is visible', async ({ page }) => {
  await page.goto('https://bro-workout-frontend.vercel.app/');

  // Piloto do healer: seletor corrigido de h2 para h1.
  // Requisito: o h1 "Bem-vindo ao Bro Workout" deve estar visível.
  const heading = page.getByRole('heading', {
    name: 'Bem-vindo ao Bro Workout',
    level: 1,
    exact: true,
  });

  await expect(heading).toBeVisible();
});
