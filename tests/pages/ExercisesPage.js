const { BasePage } = require('./BasePage');

class ExercisesPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Exercícios', level: 1 });
    this.exerciseList = page.getByRole('list');
  }

  async goto() {
    await super.goto('/exercises');
    await this.heading.waitFor();
  }

  async waitUntilLoaded() {
    await this.page.waitForURL('**/exercises');
    await this.heading.waitFor();
  }
}

module.exports = { ExercisesPage };
