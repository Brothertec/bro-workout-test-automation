// const { test, expect } = require('@playwright/test');
import { expect, test } from '@playwright/test';
// Aqui teremos os testes para a API de Exercises. Usar os métodos GET e POST.

const BASE_URL = 'https://broworkout.back.brothertec.com.br';

test('Display exercises - STATUS 200', async ({ request }) => {
    const response = await request.get(
        `${BASE_URL}/exercicios`
    );
    expect(response.status()).toEqual(200);
    const body = await response.json();
    expect(Array.isArray(body)).toEqual(true);
});

test('Create exercise - STATUS 201', async ({ request }) => {
    const response = await request.post(
        `${BASE_URL}/exercicios`,
        {
            data: {
                nome: 'ExercicioTeste',
                video: 'https://example.com/exercicio.mp4',
                imagem: 'https://example.com/exercicio.jpg'
            }
        }
    );
    expect(response.status()).toEqual(201);
    const body = await response.json();
    expect(body).toHaveProperty('_id');
    expect(body.nome).toEqual('ExercicioTeste');
    expect(body.video).toEqual(
        'https://example.com/exercicio.mp4'
    );
    expect(body.imagem).toEqual(
        'https://example.com/exercicio.jpg'
    );
});