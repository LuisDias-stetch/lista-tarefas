const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
testDir: './tests',
use: {
    baseURL: 'http://127.0.0.1:3000',
},

webServer: {
    command: 'npx serve src -l 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
},

});
