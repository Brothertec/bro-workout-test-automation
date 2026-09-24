const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  outputDir: 'test-results',
  use: {
    baseURL: process.env.BASE_URL,
    locale: 'pt-BR',
    trace: 'on',
  },
});
