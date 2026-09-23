const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('The user navigates to {string} page', async function (page) {
    switch (page) {
        case 'home':
            await this.homePage.goto();
            break;
        case 'users':
            await this.usersPage.goto();
            break;
        case 'exercises':
            await this.exercisesPage.goto();
            break;
    }
});

When('The user navigates to {string} page through the {string}', async function (page, button) {
    switch (button) {
        case 'card':
            switch (page) {
                case 'users':
                    await this.homePage.goToUsers();
                    break;
                case 'exercises':
                    await this.homePage.goToExercises();
                    break;
            }
            break;
        case 'navbar':
            switch (page) {
                case 'users':
                    await this.homePage.goToUsersNavBar();
                    break;
                case 'exercises':
                    await this.homePage.goToExercisesNavBar();
                    break;
            }
            break;
    }
});