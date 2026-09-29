const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  webServer: {
    command: 'serve src -l 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});