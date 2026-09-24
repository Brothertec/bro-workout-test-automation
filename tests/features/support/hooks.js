const fs = require('fs');
const path = require('path');
const { BeforeAll, Before, After, AfterAll, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const playwrightConfig = require('../../../playwright.config');
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
    args: headless ? [] : ['--start-maximized'],
  };

  if (process.env.CI === 'true') {
    return chromium.launch(options);
  }
   
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

  const headless = isHeadless();
  this.context = await browser.newContext({
    baseURL: process.env.BASE_URL,
    locale: 'pt-BR',
    viewport: headless ? { width: 1920, height: 1080 } : null,
  });
  this.page = await this.context.newPage();

  if (!headless) {
    const session = await this.context.newCDPSession(this.page);
    const { windowId } = await session.send('Browser.getWindowForTarget');
    await session.send('Browser.setWindowBounds', {
      windowId,
      bounds: { windowState: 'maximized' },
    });
  }

  this.tracingStarted = Boolean(
    playwrightConfig.use?.trace && playwrightConfig.use.trace !== 'off',
  );
  if (this.tracingStarted) {
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });
  }

  this.homePage = new HomePage(this.page);
  this.usersPage = new UsersPage(this.page);
  this.exercisesPage = new ExercisesPage(this.page);
  this.headerPage = new HeaderPage(this.page);
});

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  if (this.tracingStarted && this.context) {
    const outputDir = playwrightConfig.outputDir || 'test-results';
    const traceName = (pickle?.name || 'scenario').replace(/[^\w.-]+/g, '_');
    fs.mkdirSync(outputDir, { recursive: true });
    await this.context.tracing.stop({
      path: path.join(outputDir, `${traceName}.zip`),
    });
  }

  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
