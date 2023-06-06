import { defineConfig } from 'cypress';

module.exports = defineConfig({
  projectId: 'h1difc',
  reporter: 'cypress-mochawesome-reporter',
  retries: {
    runMode: 1,
    openMode: 0,
  },
  reporterOptions: {
    reportDir: 'cypress/results',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: false,
    saveAllAttempts: true,
    overwrite: true,
  },
  // video: false,
  e2e: {
    watchForFileChanges: false,
    env: {
      someUrl: 'https://api.demoblaze.com',
    },
    // baseUrl: 'https://api.demoblaze.com',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
