const { expect } = require('playwright/test');
const { BasePage } = require('./BasePage');

class UsersPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Usuários', level: 1 });
    this.table = page.getByRole('grid');
    this.addUserButton = page.getByRole('button', {
      name: 'Adicionar Usuário',
      exact: true,
    });
    this.userCreationModal = page.getByRole('dialog');
    this.userNameInput = this.userCreationModal.getByLabel('Nome', {
      exact: true,
    });
    this.userEmailInput = this.userCreationModal.getByLabel('Email', {
      exact: true,
    });
    this.userPasswordInput = this.userCreationModal.getByLabel('Senha', {
      exact: true,
    });
    this.createUserButton = this.userCreationModal.getByRole('button', {
      name: 'Criar',
      exact: true,
    });
    this.userName = this.table.getByRole('gridcell', { name: 'DSADHASIOUDHIA' });
    this.userEmail = this.table.getByRole('gridcell', { name: 'TESTSD' });
    this.trainings = this.table.getByRole('gridcell', { name: 'DSADHASIOUDHIA' }).locator('..').locator('span')
    this.buttons = this.table.getByRole('gridcell', { name: 'DSADHASIOUDHIA' }).locator('..').locator('button')
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

  async openUserCreationForm() {
    await this.addUserButton.click();
    await this.userCreationModal.waitFor();
  }

  async fillUserFormWithout(field) {
    if (field !== 'name') {
      await this.userNameInput.fill('Usuário Automação');
    }

    if (field !== 'email') {
      await this.userEmailInput.fill(
        `usuario.automacao.${Date.now()}@email.com`,
      );
    }

    if (field !== 'password') {
      await this.userPasswordInput.fill('Senha123!');
    }
  }

  async submitUserCreationForm() {
    await this.createUserButton.click();
  }

  async requiredMessageShouldBeVisibleBelowField(field, message) {
    const fieldContainers = {
      name: this.userCreationModal.locator(
        '.MuiFormControl-root:has(input[type="text"])',
      ),
      email: this.userCreationModal.locator(
        '.MuiFormControl-root:has(input[type="email"])',
      ),
      password: this.userCreationModal.locator(
        '.MuiFormControl-root:has(input[type="password"])',
      ),
    };

    await expect(
      fieldContainers[field].getByText(message, { exact: true }),
    ).toBeVisible();
  }

  async userVerify() {
    await expect(this.userName).toBeVisible();
    await expect(this.userEmail).toBeVisible();
    await expect(this.trainings).toHaveCount(3);
    await expect(this.buttons).toHaveCount(7);
  }
}

module.exports = { UsersPage };
