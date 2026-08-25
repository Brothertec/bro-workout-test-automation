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

  async userVerify() {
    await expect(this.userName).toBeVisible();
    await expect(this.userEmail).toBeVisible();
    await expect(this.trainings).toHaveCount(3);
    await expect(this.buttons).toHaveCount(7);
  }
}

module.exports = { UsersPage };
