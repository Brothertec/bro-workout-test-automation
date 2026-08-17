const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the home page', async function () {
  await this.homePage.goto();
});

When('I open the users list from the home page', async function () {
  await this.homePage.goToUsers();
});

Then('the page title should be {string}', async function (title) {
  await expect(this.page).toHaveTitle(title);
});

Then('I should see the heading {string}', async function (heading) {
  await expect(
    this.page.getByRole('heading', { name: heading, level: 1 }),
  ).toBeVisible();
});

Then('I should see the card {string}', async function (cardTitle) {
  await expect(
    this.page.getByRole('heading', { name: cardTitle, level: 2 }),
  ).toBeVisible();
});

Then('I should be on the users page', async function () {
  await this.usersPage.waitUntilLoaded();
  await expect(this.usersPage.heading).toBeVisible();
});

Then('the users table should be visible', async function () {
  await expect(this.usersPage.table).toBeVisible();
  await expect(this.usersPage.nameColumn).toBeVisible();
  await expect(this.usersPage.emailColumn).toBeVisible();
});
