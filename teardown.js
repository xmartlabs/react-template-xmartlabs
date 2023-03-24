const vi = require('vitest');

module.exports = async () => {
  // Run this code before any tests are executed
  vi.configure({
    // Set up a global afterEach hook
    afterEach: () => {
      vi.clearAllMocks();
      vi.resetAllMocks();
    },
  });
};
