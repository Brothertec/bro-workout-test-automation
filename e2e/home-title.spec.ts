// spec: specs/home-smoke.md
// seed: seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Página inicial — verificações sem interação', () => {
  test('Verificar o título da página inicial', async ({ page }) => {
    // Preparação reproduzida do seed.spec.ts em um contexto novo.
    await page.goto('https://bro-workout-frontend.vercel.app/');
    await expect(page).toHaveURL('https://bro-workout-frontend.vercel.app/');

    // 1. Partindo de um contexto novo preparado pelo seed.spec.ts, consultar o título da página inicial sem realizar interações.
    await expect(page).toHaveTitle('Bro Workout');
  });
});
