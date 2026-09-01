const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I go to exercises page by card', async function (){
    await this.homePage.goToExercises();
});

When('I go to exercises page by navBar', async function (){
    await this.homePage.goToExercisesNavBar();
});

When('I click on the button {string}', async function(buttonText) {
    await this.exercisesPage.clickButton(buttonText);
})

Then('A warning of fail pops', async function () {
   await this.exercisesPage.warningFailVerify();
});