const baseConfig = require('../../jest.base.config');

module.exports = {
    ...baseConfig,
    coverageDirectory: '<rootDir>/coverage/app',
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    },
};
