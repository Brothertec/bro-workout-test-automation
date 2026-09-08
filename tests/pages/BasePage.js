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

  async buttonClickByText(text) {
    await this.page.getByText(text).click();
  }

  async buttonClickByRole(role, name) {
    await this.page.getByRole(role, { name: name }).click();
  }
}

module.exports = { BasePage };
