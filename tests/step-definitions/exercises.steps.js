const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('The user goes to exercises page by card', async function (){
    await this.homePage.goToExercises();
});

When('The user goes to exercises page by navBar', async function (){
    await this.homePage.goToExercisesNavBar();
});

When('The user clicks on the button {string}', async function(buttonText) {
    await this.exercisesPage.buttonClickByText(buttonText);
})

Then('A warning of fail pops', async function () {
   await this.exercisesPage.warningFailVerify();
});