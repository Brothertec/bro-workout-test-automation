const { Given, When, Then } = require('@cucumber/cucumber');

Given('The user is on the users page', async function () {
    await this.usersPage.goto();
});

Given('The user opens the user creation form', async function () {
    await this.usersPage.openUserCreationForm();
});

When(
    'The user fills the user form without the {string} field',
    async function (field) {
        await this.usersPage.fillUserFormWithout(field);
    },
);

When('The user submits the user creation form', async function () {
    await this.usersPage.submitUserCreationForm();
});

When('I go to users page by navBar', async function (){
    await this.homePage.goToUsersNavBar();
})

When('I go to users page by card', async function (){
    await this.homePage.goToUsers();
})

Then('I should see a user and his features', async function () {
    await this.usersPage.userVerify();
});

Then(
    'The user should see {string} below the {string} field',
    async function (message, field) {
        await this.usersPage.requiredMessageShouldBeVisibleBelowField(
            field,
            message,
        );
    },
);
