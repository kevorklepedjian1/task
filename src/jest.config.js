module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript support
    testEnvironment: 'jsdom', 
    // Use jsdom for a browser-like environment
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest to transform JavaScript/TypeScript
    },
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy', // Mock CSS imports (for CSS Modules)
      '\\.svg$': 'jest-svg-transformer', // Mock SVG imports
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Setup file for configuring test environment
    globals: {
      'ts-jest': {
        isolatedModules: true, // Speed up compilation for isolated modules (optional)
      },
    },
  };
  