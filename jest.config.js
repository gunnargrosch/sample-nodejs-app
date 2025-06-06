export default {
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.mjs'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
