class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async title() {
    return this.page.title();
  }

  async url() {
    return this.page.url();
  }
}

module.exports = { BasePage };
