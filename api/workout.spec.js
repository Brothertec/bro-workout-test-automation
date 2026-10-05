const { faker } = require('@faker-js/faker');
const { test, expect } = require('@playwright/test');
const usersUrl = 'https://broworkout.back.brothertec.com.br/users';
const idExercise = '6882f02ee87e15cb925ed6a4';

// Aqui teremos os testes para a API de Workout. Usar os métodos GET, PATCH, DELETE.

// colocar o teardown 

test.beforeAll(async ({ request }) => {
    const response = await request.post(usersUrl, {
        data: {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    });
    const content = await response.json();
    process.env.ID_USER = await content._id;
});

test('Display the workout list of a User - STATUS 200', async ({ request }) => {
    const response = await request.get(`${usersUrl}/${process.env.ID_USER}/treinos`);
    expect(response.status()).toEqual(200);
});

test('Display the workout list of a User - STATUS 404', async ({ request }) => {
    const response = await request.get(`${usersUrl}/${process.env.ID_USER}/treinoss`);
    expect(response.status()).toEqual(404);
});

test('Adding a workout to a User - STATUS 201', async ({ request }) => {
    const response = await request.patch(`${usersUrl}/${process.env.ID_USER}/treinos`, {
        data: {
            nome: "TreinoTeste",
            series: [
                {
                    exercicio: idExercise,
                    repeticoes: 3,
                    execucoes: 3,
                    carga: 3
                }
            ]
        }
    });
    const idWorkout = await response.json();
    process.env.ID_WORKOUT = await idWorkout.treinos[0]._id;
    expect(response.status()).toEqual(201);
});

test('Adding a workout to a User - STATUS 404', async ({ request }) => {
    const response = await request.patch(`${usersUrl}/${process.env.ID_USER}/treinoss`, {
        data: {
            nome: "TreinoTeste",
            series: [
                {
                    exercicio: idExercise,
                    repeticoes: 3,
                    execucoes: 3,
                    carga: 3
                }
            ]
        }
    });
    expect(response.status()).toEqual(404);
});

test('Editing a workout of a User - STATUS 200', async ({ request }) => {
    const response = await request.patch(`${usersUrl}/${process.env.ID_USER}/treinos/${process.env.ID_WORKOUT}`, {
        data: {
            nome: "TreinoTeste67",
            series: [
                {
                    exercicio: idExercise,
                    repeticoes: 67,
                    execucoes: 67,
                    carga: 67
                }
            ]
        }
    });
    expect(response.status()).toEqual(200);
});

test('Editing a workout of a User - STATUS 404', async ({ request }) => {
    const response = await request.patch(`${usersUrl}/${process.env.ID_USER}/treinos/${process.env.ID_WORKOUT}67`, {
        data: {
            nome: "TreinoTeste67",
            series: [
                {
                    exercicio: idExercise,
                    repeticoes: 67,
                    execucoes: 67,
                    carga: 67
                }
            ]
        }
    });
    expect(response.status()).toEqual(404);
});

test('Deleting a workout of a User - STATUS 200', async ({ request }) => {
    const response = await request.delete(`${usersUrl}/${process.env.ID_USER}/treinos/${process.env.ID_WORKOUT}`);
    expect(response.status()).toEqual(200);
});

test('Deleting a workout of a User - STATUS 404', async ({ request }) => {
    const response = await request.delete(`${usersUrl}/${process.env.ID_USER}/treinos/${process.env.ID_WORKOUT}67`);
    expect(response.status()).toEqual(404);
});
