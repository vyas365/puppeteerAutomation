module.exports = {
  globalSetup: "./setup.js",
  globalTeardown: "./teardown.js",
  testEnvironment: "./puppeteer_environment.js",
  testTimeout: 50000
};
// jest.setTimeout(30000)