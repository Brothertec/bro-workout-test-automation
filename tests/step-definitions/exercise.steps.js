const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I access the exercises page from the home page', async function () {
    await this.homePage.goto();
    await this.homePage.goToExercises();
    await this.exercisesPage.waitUntilLoaded();
});

Given('the user accesses the exercises page from the home page', async function () {
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

Then('the user should see the created exercise in the exercises list', async function () {
    const createdExercise = this.exercisesPage.getExerciseByName(this.createdExerciseName);
    await expect(createdExercise).toBeVisible();
});

Then('the created exercise should not display the "Assistir Vídeo" link', async function () {
    const videoLink = this.exercisesPage.getVideoLinkForExercise(this.createdExerciseName);
    await expect(videoLink).toHaveCount(0);
});

When('the user creates an exercise with an image', async function () {
    this.createdExerciseName = `Exercício com imagem ${Date.now()}`;
    this.createdExerciseImageUrl = 'https://placehold.co/120x120.png';
    await this.exercisesPage.openExerciseCreationModal();
    await this.exercisesPage.fillExerciseName(this.createdExerciseName);
    await this.exercisesPage.fillExerciseImageUrl(this.createdExerciseImageUrl);
    await this.exercisesPage.createExercise();
});

Then('the registered image should be displayed to the left of the created exercise name', async function () {
    const exerciseImage = this.exercisesPage.getImageForExercise(this.createdExerciseName);
    const exerciseName = this.exercisesPage.getNameForExercise(this.createdExerciseName);
    const imagePosition = await exerciseImage.boundingBox();
    const namePosition = await exerciseName.boundingBox();
    const imageRightEdge = imagePosition
        ? imagePosition.x + imagePosition.width
        : null;
    await expect(exerciseImage).toBeVisible();
    await expect(exerciseImage).toHaveAttribute(
        'src',
        this.createdExerciseImageUrl
    );
    expect(imagePosition).not.toBeNull();
    expect(namePosition).not.toBeNull();
    expect(imageRightEdge).toBeLessThanOrEqual(namePosition.x);
});
