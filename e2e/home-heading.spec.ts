// spec: specs/home-smoke.md
// seed: seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Página inicial — verificações sem interação', () => {
  test('Verificar o heading principal', async ({ page }) => {
    // Preparação reproduzida do seed.spec.ts em um contexto novo.
    await page.goto('https://bro-workout-frontend.vercel.app/');
    await expect(page).toHaveURL('https://bro-workout-frontend.vercel.app/');

    // 1. Partindo de um contexto novo preparado pelo seed.spec.ts, localizar o heading de nível 1 pelo nome acessível “Bem-vindo ao Bro Workout”, sem clicar.
    await expect(
      page.getByRole('heading', {
        name: 'Bem-vindo ao Bro Workout',
        level: 1,
        exact: true,
      }),
    ).toBeVisible();
  });
});
