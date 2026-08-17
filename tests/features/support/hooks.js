const { BeforeAll, Before, After, AfterAll, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { HomePage } = require('../../pages/HomePage');
const { UsersPage } = require('../../pages/UsersPage');
const { ExercisesPage } = require('../../pages/ExercisesPage');
const { HeaderPage } = require('../../pages/HeaderPage');

/** @type {import('playwright').Browser} */
let browser;

BeforeAll(async function () {
  const headless = process.env.HEADLESS !== 'false';
  browser = await chromium.launch({ headless });
});

Before(async function () {
  this.context = await browser.newContext({
    baseURL: process.env.BASE_URL,
    locale: 'pt-BR',
    viewport: { width: 1280, height: 720 },
  });
  this.page = await this.context.newPage();

  this.homePage = new HomePage(this.page);
  this.usersPage = new UsersPage(this.page);
  this.exercisesPage = new ExercisesPage(this.page);
  this.headerPage = new HeaderPage(this.page);
});

After(async function ({ result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
