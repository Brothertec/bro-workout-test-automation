const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');

const usersUrl = 'https://broworkout.back.brothertec.com.br/users';
test.use({ trace: 'off' });
test.describe.configure({ retries: 0 });

test('GET /users returns 200 and a list of users', async ({ request }) => {
    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);
    for (const user of users) {
        expect(typeof user._id).toBe('string');
        expect(typeof user.nome).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(Array.isArray(user.treinos)).toBe(true);
    }
});

test('POST /users returns 201 and persists a new user', async ({ request }) => {
    const userData = {
        nome: `Automated QA User ${randomUUID()}`,
        email: `qa.automated.${randomUUID()}@example.com`,
        password: 'TestPassword123',
    };
    const response = await request.post(usersUrl, { data: userData });
    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');
    const createdUser = await response.json();
    expect(typeof createdUser._id).toBe('string');
    expect(createdUser._id).not.toBe('');
    expect(createdUser.nome).toBe(userData.nome);
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.treinos).toEqual([]);
    expect(typeof createdUser.createdAt).toBe('string');
    expect(Number.isNaN(Date.parse(createdUser.createdAt))).toBe(false);
    expect(typeof createdUser.updatedAt).toBe('string');
    expect(Number.isNaN(Date.parse(createdUser.updatedAt))).toBe(false);
    expect(Date.parse(createdUser.updatedAt)).toBeGreaterThanOrEqual(Date.parse(createdUser.createdAt));
    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);
    const savedUser = users.find(user => user._id === createdUser._id);
    expect(savedUser !== undefined, 'Created user must appear in GET response').toBe(true);
    expect(savedUser.nome).toBe(userData.nome);
    expect(savedUser.email).toBe(userData.email);
});

test('POST /users rejects user without name', async ({ request }) => {
    const userData = {
        email: `qa.automated.${randomUUID()}@example.com`,
        password: 'TestPassword123',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.email === userData.email);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user without email', async ({ request }) => {
    const userData = {
        nome: `Automated QA User ${randomUUID()}`,
        password: 'TestPassword123',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.nome === userData.nome);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user with empty name', async ({ request }) => {
    const userData = {
        nome: '',
        email: `qa.automated.${randomUUID()}@example.com`,
        password: 'TestPassword123',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.email === userData.email);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user with empty email', async ({ request }) => {
    const userData = {
        nome: `Automated QA User ${randomUUID()}`,
        email: '',
        password: 'TestPassword123',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.nome === userData.nome);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user with invalid email', async ({ request }) => {
    const userData = {
        nome: `Automated QA User ${randomUUID()}`,
        email: `invalid-email-${randomUUID()}`,
        password: 'TestPassword123',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.nome === userData.nome);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user without password', async ({ request }) => {
    const userData = {
        nome: `Automated QA User ${randomUUID()}`,
        email: `qa.automated.${randomUUID()}@example.com`,
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.email === userData.email);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user with empty name and email', async ({ request }) => {
    const userData = {
        nome: '',
        email: '',
        password: 'TestPassword123',
    };

    const beforeResponse = await request.get(usersUrl);
    expect(beforeResponse.status()).toBe(200);
    expect(beforeResponse.headers()['content-type']).toContain('application/json');
    const beforeUsers = await beforeResponse.json();
    expect(Array.isArray(beforeUsers)).toBe(true);
    const previousIds = beforeUsers.map(user => user._id);

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user =>
        !previousIds.includes(user._id) && user.nome === '' && user.email === '');
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user with empty password', async ({ request }) => {
    const userData = {
        nome: `Automated QA User ${randomUUID()}`,
        email: `qa.automated.${randomUUID()}@example.com`,
        password: '',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.email === userData.email);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user with whitespace password', async ({ request }) => {
    const userData = {
        nome: `Automated QA User ${randomUUID()}`,
        email: `qa.automated.${randomUUID()}@example.com`,
        password: '   ',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.email === userData.email);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user with whitespace name', async ({ request }) => {
    const userData = {
        nome: '   ',
        email: `qa.automated.${randomUUID()}@example.com`,
        password: 'TestPassword123',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.email === userData.email);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user with whitespace email', async ({ request }) => {
    const userData = {
        nome: `Automated QA User ${randomUUID()}`,
        email: '   ',
        password: 'TestPassword123',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.nome === userData.nome);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects user with numeric name', async ({ request }) => {
    const userData = {
        nome: 123,
        email: `qa.automated.${randomUUID()}@example.com`,
        password: 'TestPassword123',
    };

    const response = await request.post(usersUrl, { data: userData });
    expect.soft(response.status()).toBeGreaterThanOrEqual(400);
    expect.soft(response.status()).toBeLessThan(500);

    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);

    const savedUser = users.find(user => user.email === userData.email);
    expect(savedUser === undefined, 'Invalid user must not be persisted').toBe(true);
});

test('POST /users rejects duplicate email and preserves original user', async ({ request }) => {
    const userData = {
        nome: `Automated QA User ${randomUUID()}`,
        email: `qa.automated.${randomUUID()}@example.com`,
        password: 'TestPassword123',
    };
    const firstResponse = await request.post(usersUrl, { data: userData });
    expect(firstResponse.status()).toBe(201);
    const createdUser = await firstResponse.json();
    const beforeResponse = await request.get(usersUrl);
    expect(beforeResponse.status()).toBe(200);
    expect(beforeResponse.headers()['content-type']).toContain('application/json');
    const beforeUsers = await beforeResponse.json();
    expect(Array.isArray(beforeUsers)).toBe(true);
    const original = beforeUsers.find(user => user._id === createdUser._id);
    expect(original !== undefined, 'Original user must exist').toBe(true);
    const duplicateResponse = await request.post(usersUrl, {
        data: { ...userData, nome: `Duplicate QA User ${randomUUID()}` },
    });
    expect.soft(duplicateResponse.status()).toBeGreaterThanOrEqual(400);
    expect.soft(duplicateResponse.status()).toBeLessThan(500);
    const afterResponse = await request.get(usersUrl);
    expect(afterResponse.status()).toBe(200);
    expect(afterResponse.headers()['content-type']).toContain('application/json');
    const afterUsers = await afterResponse.json();
    expect(Array.isArray(afterUsers)).toBe(true);
    const matches = afterUsers.filter(user => user.email === userData.email);
    expect(matches.length).toBe(1);
    const savedUser = matches[0];
    expect(savedUser._id).toBe(original._id);
    expect(savedUser.nome).toBe(original.nome);
    expect(savedUser.email).toBe(original.email);
    expect(savedUser.createdAt).toBe(original.createdAt);
    expect(savedUser.updatedAt).toBe(original.updatedAt);
    expect(savedUser.password === original.password, 'Original password must remain unchanged').toBe(true);
    expect(savedUser.treinos).toEqual(original.treinos);
});

test('GET /users does not expose password', async ({ request }) => {
    const listResponse = await request.get(usersUrl);
    expect(listResponse.status()).toBe(200);
    expect(listResponse.headers()['content-type']).toContain('application/json');
    const users = await listResponse.json();
    expect(Array.isArray(users)).toBe(true);
    const exposed = users.some(user => 'password' in user);
    expect(exposed, 'GET must not return the password field').toBe(false);
});

test('POST /users does not expose password', async ({ request }) => {
    const response = await request.post(usersUrl, { data: {
        nome: `Automated QA User ${randomUUID()}`,
        email: `qa.automated.${randomUUID()}@example.com`,
        password: 'TestPassword123',
    } });
    expect(response.status()).toBe(201);
    const createdUser = await response.json();
    const exposed = 'password' in createdUser;
    expect(exposed, 'POST must not return the password field').toBe(false);
});
