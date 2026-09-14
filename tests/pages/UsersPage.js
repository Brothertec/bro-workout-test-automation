const { expect } = require('playwright/test');
const { faker } = require('@faker-js/faker');
const { BasePage } = require('./BasePage');

class UsersPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Usuários', level: 1 });
    this.table = page.getByRole('grid');
    this.nextPageButton = page.getByLabel('Go to next page');
    this.modal = page.getByRole('dialog');
    this.workoutName = this.modal.getByLabel('Nome do Treino');
    this.reps = this.modal.getByLabel('Repetições');
    this.series = this.modal.getByLabel('Séries');
    this.weight = this.modal.getByLabel('Peso (kg)');
    this.addWorkoutButton = this.modal.getByText('Adicionar Treino');
    this.nameColumn = page.getByRole('columnheader', { name: 'Nome' });
    this.emailColumn = page.getByRole('columnheader', { name: 'Email' });
    this.workoutsColumn = page.getByRole('columnheader', { name: 'Treinos' });
    this.actionsColumn = page.getByRole('columnheader', { name: 'Ações' });
  }

  async goto() {
    await super.goto('/users');
    await this.heading.waitFor();
  }

  async waitUntilLoaded() {
    await this.page.waitForURL('**/users');
    await this.heading.waitFor();
    await this.table.waitFor();
  }

  async userVerify(userName, userEmail, userId) {
    await this.addWorkout(userId, 3);
    await this.page.reload();
    await this.page.pause();
    if(userEmail === undefined){
      throw new Error(' User not found');
    } else{
      await this.findUserByEmail(userEmail);
    }
    if (await this.page.getByText(userEmail).isVisible()) {
      await expect(this.table.getByRole('gridcell', { name: userName })).toBeVisible();
      await expect(this.table.getByRole('gridcell', { name: userEmail })).toBeVisible();
      await expect(this.table.getByRole('gridcell', { name: userName }).locator('..').locator('.MuiChip-root')).toHaveCount(3);
      await expect(this.table.getByRole('gridcell', { name: userName }).locator('..').locator('button')).toHaveCount(7);
    }
  }

  async workoutVerify(userEmail) {
    await expect(this.table.getByRole('gridcell', { name: userEmail }).locator('..').locator('.MuiChip-root')).toHaveCount(1);
    await expect(this.table.getByRole('gridcell', { name: userEmail }).locator('..').locator('button')).toHaveCount(3);
  }

  async deleteWorkout(userId) {
    const urlGet = `https://broworkout.back.brothertec.com.br/users//${userId}/treinos`;
    const response = await this.page.request.get(urlGet);
    const workoutId = (await response.json())[0]._id;
    const urlDelete = `https://broworkout.back.brothertec.com.br/users//${userId}/treinos/${workoutId}`;
    const responseDelete = await this.page.request.delete(urlDelete);
    await expect(responseDelete.status()).toBe(200);
  }

  async createWorkoutClick(userEmail) {
    await this.page.reload();
    await this.findUserByEmail(userEmail);
    if (await this.page.getByText(userEmail).isVisible()) {
      await this.table.getByRole('gridcell', { name: userEmail }).locator('..').getByLabel('Adicionar Treino').click();
    }
  }

  async createUser() {
    const user = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const urlCreate = 'https://broworkout.back.brothertec.com.br/users';
    const responseCreate = await this.page.request.post(urlCreate, {
      data: {
        nome: user,
        email: email,
        password: password,
      }
    });
    await expect(responseCreate.status()).toBe(201);
    return responseCreate.json();
  }

  async addWorkout(userId, workoutQuantity) {
    for (let i = 0; i < workoutQuantity; i++) {
      const workout = faker.lorem.word();
      const urlAddWorkout = `https://broworkout.back.brothertec.com.br/users//${userId}/treinos`;
      const responseAddWorkout = await this.page.request.patch(urlAddWorkout, {
        data: {
          nome: workout,
          series: [
            {
              exercicio: "6882f02ee87e15cb925ed6a4",
              repeticoes: 3,
              execucoes: 12,
              carga: 8
            }
          ],
        }
      });
      await expect(responseAddWorkout.status()).toBe(201);
    }
  }

  async fillFormWorkout(workoutName, exercise, reps, series, weight) {
    await expect(this.modal).toBeVisible();
    await this.workoutName.fill(workoutName);
    await this.buttonClickByRole('combobox', '');  
    await this.buttonClickByText(exercise);
    await this.reps.fill(reps);
    await this.series.fill(series);
    await this.weight.fill(weight);
  }

  async submitFormWorkout() {
    await this.buttonClickByText('Adicionar Treino');
  }

  async findUserByEmail(userEmail){
    while (await this.page.getByText(userEmail).isVisible() != true) {
      await this.nextPageButton.click();
    };
  }
}

module.exports = { UsersPage };
