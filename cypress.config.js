const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    TEST_ENV: "development",
    DEV_SITE: "https://www.saucedemo.com/",
    UAT_SITE: "https://www.saucedemo.com/",
  },
});
