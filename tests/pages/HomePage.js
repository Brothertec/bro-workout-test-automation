const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Bem-vindo ao Bro Workout',
      level: 1,
    });
    this.subtitle = page.getByText(
      'Seu companheiro fitness definitivo para acompanhar treinos e gerenciar exercícios',
    );
    this.usersCardHeading = page.getByRole('heading', {
      name: 'Gerenciar Usuários',
      level: 2,
    });
    this.exercisesCardHeading = page.getByRole('heading', {
      name: 'Biblioteca de Exercícios',
      level: 2,
    });
    this.workoutsCardHeading = page.getByRole('heading', {
      name: 'Acompanhamento de Treinos',
      level: 2,
    });
    this.viewUsersLink = page.getByRole('link', { name: 'Ver Usuários' });
    this.viewExercisesLink = page.getByRole('link', { name: 'Ver Exercícios' });
    this.startTrackingLink = page.getByRole('link', {
      name: 'Começar Acompanhamento',
    });
  }

  async goto() {
    await super.goto('/');
    await this.heading.waitFor();
  }

  async goToUsers() {
    await this.viewUsersLink.click();
  }

  async goToExercises() {
    await this.viewExercisesLink.click();
  }
}

module.exports = { HomePage };
