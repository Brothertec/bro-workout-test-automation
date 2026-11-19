// spec: specs/home-smoke.md
// seed: seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Página inicial — verificações sem interação', () => {
  test('Verificar os links de navegação e de acesso da página inicial', async ({ page }) => {
    // Preparação reproduzida do seed.spec.ts em um contexto novo.
    await page.goto('https://bro-workout-frontend.vercel.app/');
    await expect(page).toHaveURL('https://bro-workout-frontend.vercel.app/');

    // 1. Partindo de um contexto novo preparado pelo seed.spec.ts, verificar por papel e nome acessível a presença dos links do banner, sem clicar: “Início”, “Usuários”, “Exercícios” e “Treino Ativo”.
    const banner = page.getByRole('banner');
    for (const name of ['Início', 'Usuários', 'Exercícios', 'Treino Ativo']) {
      await expect(banner.getByRole('link', { name, exact: true })).toBeVisible();
    }

    // 2. Verificar por papel e nome acessível a presença dos links dos cartões da página inicial, sem clicar: “Ver Usuários”, “Ver Exercícios” e “Começar Acompanhamento”.
    for (const name of ['Ver Usuários', 'Ver Exercícios', 'Começar Acompanhamento']) {
      await expect(page.getByRole('link', { name, exact: true })).toBeVisible();
    }
  });
});
