const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "reports",
    overwrite: false,
    html: true,
    json: true,
  },

  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://restful-booker.herokuapp.com",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
