module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["**/*.test.ts"],
    verbose: true, 
    collectCoverage: true, 
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['text', 'lcov'], 
    moduleFileExtensions: ['ts', 'js'],
  };
  