const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('The user is on the home page', async function () {
  await this.homePage.goto();
});

When('The user opens the users list from the home page', async function () {
  await this.homePage.goToUsers();
});

Then('The page title should be {string}', async function (title) {
  await expect(this.page).toHaveTitle(title);
});

Then('The user should see the heading {string}', async function (heading) {
  await expect(
    this.page.getByRole('heading', { name: heading, level: 1 }),
  ).toBeVisible();
});

Then('The user should see the card {string}', async function (cardTitle) {
  await expect(
    this.page.getByRole('heading', { name: cardTitle, level: 2 }),
  ).toBeVisible();
});

Then('The user should be on the users page', async function () {
  await this.usersPage.waitUntilLoaded();
  await expect(this.usersPage.heading).toBeVisible();
});

Then('The users table should be visible', async function () {
  await expect(this.usersPage.table).toBeVisible();
  await expect(this.usersPage.nameColumn).toBeVisible();
  await expect(this.usersPage.emailColumn).toBeVisible();
});
