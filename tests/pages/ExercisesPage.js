const { expect } = require('playwright/test');
const { BasePage } = require('./BasePage');

class ExercisesPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Exercícios', level: 1 });
    this.exerciseList = page.getByRole('list');
    this.addExerciseButton = page.getByRole('button', { name: 'Adicionar Exercício', });
    this.exerciseCreationModal = page.getByRole('dialog');
    this.exerciseNameInput = this.exerciseCreationModal.getByLabel('Nome do Exercício', {
      exact: true
    });
    this.createExerciseButton = this.exerciseCreationModal.getByRole('button', {
      name: 'Criar',
      exact: true
    });
    this.exerciseImageUrlInput = this.exerciseCreationModal.getByLabel('URL da Imagem (opcional)', {
      exact: true
    });
    this.createExerciseModal = page.getByRole('dialog');
  }

  async goto() {
    await super.goto('/exercises');
    await this.heading.waitFor();
  }

  async waitUntilLoaded() {
    await this.page.waitForURL('**/exercises');
    await this.heading.waitFor();
  }

  async openExerciseCreationModal() {
    await this.addExerciseButton.click();
  }

  async fillExerciseName(name) {
    await this.exerciseNameInput.fill(name);
  }

  async createExercise() {
    await this.createExerciseButton.click();
  }

  getExerciseByName(name) {
    return this.exerciseList.locator('li').filter({
      hasText: name
    });
  }

  getVideoLinkForExercise(name) {
    return this.getExerciseByName(name).getByRole('link', {
      name: 'Assistir Vídeo',
      exact: true,
    });
  }

  async fillExerciseImageUrl(imageUrl) {
    await this.exerciseImageUrlInput.fill(imageUrl);
  }

  getImageForExercise(name) {
    return this.getExerciseByName(name).locator('img');
  }

  getNameForExercise(name) {
    return this.getExerciseByName(name).getByText(name, {
      exact: true,
    });
  }

  // TODO: Mover para BasePage
  async clickButton(buttonText) {
    await this.page.getByRole('button', {name: `${buttonText}`}).click();
  }

  async warningFailVerify() {
    await expect(this.createExerciseModal.getByText('Falha ao criar exercício')).toBeVisible();
  }
}

module.exports = { ExercisesPage };
