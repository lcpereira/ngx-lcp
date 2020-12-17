module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/@angular-builders/jest/dist/jest-config/setup.js',
    '<rootDir>/jest.setup.ts',
  ],
  moduleNameMapper: {
    '^@ngx-lcp/speech-recognition(.*)$': '<rootDir>/dist/ngx-speech-recognition/$1',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/projects/**/**/*.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
