const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'obgy2t',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
