const { BeforeAll, Before, After, AfterAll, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { HomePage } = require('../../pages/HomePage');
const { UsersPage } = require('../../pages/UsersPage');
const { ExercisesPage } = require('../../pages/ExercisesPage');
const { HeaderPage } = require('../../pages/HeaderPage');

/** @type {import('playwright').Browser} */
let browser;

function isHeadless() {
  if (process.env.HEADLESS === 'false') return false;
  if (process.env.HEADLESS === 'true' || process.env.CI === 'true') return true;
  return false;
}

async function launchBrowser() {
  const headless = isHeadless();
  const options = {
    headless,
    slowMo: headless ? 0 : 250,
    args: ['--start-maximized'],
  };

  try {
    return await chromium.launch({ ...options, channel: 'chrome' });
  } catch {
    console.warn(
      'Google Chrome não encontrado. Abrindo o Chromium do Playwright.',
    );
    return await chromium.launch(options);
  }
}

async function ensureBrowser() {
  if (!browser || !browser.isConnected()) {
    browser = await launchBrowser();
  }

  return browser;
}

BeforeAll(async function () {
  await ensureBrowser();
});

Before(async function () {
  await ensureBrowser();

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
