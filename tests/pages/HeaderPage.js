class HeaderPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.brand = page.getByText('Bro Workout', { exact: true }).first();
    this.homeLink = page.getByRole('link', { name: 'Início' });
    this.usersLink = page.getByRole('link', { name: 'Usuários' });
    this.exercisesLink = page.getByRole('link', { name: 'Exercícios' });
    this.activeWorkoutLink = page.getByRole('link', { name: 'Treino Ativo' });
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async goToUsers() {
    await this.usersLink.click();
  }

  async goToExercises() {
    await this.exercisesLink.click();
  }
}

module.exports = { HeaderPage };
