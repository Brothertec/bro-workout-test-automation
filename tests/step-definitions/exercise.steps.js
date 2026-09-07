const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I access the exercises page from the home page', async function () {
    await this.homePage.goto();
    await this.homePage.goToExercises();
    await this.exercisesPage.waitUntilLoaded();
});

When('I create an exercise without a video', async function () {
    this.createdExerciseName = `Exercício sem vídeo ${Date.now()}`;
    await this.exercisesPage.openExerciseCreationModal();
    await this.exercisesPage.fillExerciseName(this.createdExerciseName);
    await this.exercisesPage.createExercise();
});

Then('I should see the created exercise in the exercises list', async function () {
    const createdExercise = this.exercisesPage.getExerciseByName(this.createdExerciseName);
    await expect(createdExercise).toBeVisible();
});

Then('the created exercise should not display the "Assistir Vídeo" link', async function () {
    const videoLink = this.exercisesPage.getVideoLinkForExercise(this.createdExerciseName);
    await expect(videoLink).toHaveCount(0);
});

When('The user is on the {string} page', async function (page) {
    switch (page) {
        case 'Home':
            await this.homePage.goto();
            break;
        case 'Exercises':
            await this.exercisesPage.goto();
            break;
        case 'Active Training':
            await this.activeTrainingPage.goto();
            break;
        case 'Users':
            await this.usersPage.goto();
            break;
        default:
            throw new Error(`Page ${page} not found`);
    }
});

Then('The {string} button is displayed on the exercises grid', async function (button) {
    await expect(this.exercisesPage.exerciseList).toBeVisible();
    switch (button) {
        case 'Edit':
            await expect(this.exercisesPage.editButton).toBeVisible();
            break;
        case 'Delete':
            await expect(this.exercisesPage.deleteButton).toBeVisible();
            break;
        default:
            throw new Error(`Button ${button} not found`);
    }
});
