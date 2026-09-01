const { Given, When, Then } = require('@cucumber/cucumber');

When('I go to users page by navBar', async function (){
    await this.homePage.goToUsersNavBar();
})

When('I go to users page by card', async function (){
    await this.homePage.goToUsers();
})

Then('I should see a user and his features', async function () {
    await this.usersPage.userVerify();
});
