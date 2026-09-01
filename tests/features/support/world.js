const { World, setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000 * 10);

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.baseURL = process.env.BASE_URL;
    this.page = undefined;
    this.context = undefined;
    this.homePage = undefined;
    this.usersPage = undefined;
    this.exercisesPage = undefined;
    this.headerPage = undefined;
  }
}

setWorldConstructor(CustomWorld);
