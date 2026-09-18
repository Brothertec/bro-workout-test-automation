const common = {
  paths: ['tests/features/**/*.feature'],
  require: ['tests/features/support/**/*.js', 'tests/step-definitions/**/*.js'],
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json',
  ],
  formatOptions: {
    snippetInterface: 'async-await',
  },
  parallel: 1,
};

module.exports = {
  default: {
    ...common,
    tags: 'not @bug',
  },
  bugs: {
    ...common,
    tags: '@bug',
  },
  all: {
    ...common,
  },
};
