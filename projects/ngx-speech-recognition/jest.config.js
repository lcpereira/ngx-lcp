const baseConfig = require('../../jest.base.config');

module.exports = {
    ...baseConfig,
    coverageDirectory: '<rootDir>/coverage/ngx-speech-recognition',
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$'
      },
    },
};
