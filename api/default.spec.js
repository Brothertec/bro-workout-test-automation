// const { test, expect } = require('@playwright/test');
import { expect, test } from '@playwright/test';
// Aqui teremos os testes para a API de Default. Usar o método GET.
const BASE_URL = 'https://broworkout.back.brothertec.com.br';
test('API is running - STATUS 200', async ({ request }) => {
    const response = await request.get(BASE_URL);
    expect(response.status()).toEqual(200);
});