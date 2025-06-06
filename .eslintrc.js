module.exports = {
  "env": {
    "node": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:security/recommended",
    "plugin:node/recommended",
    "plugin:sonarjs/recommended"
  ],
  "plugins": [
    "security",
    "node",
    "sonarjs"
  ],
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module"
  },
  "rules": {
    "security/detect-non-literal-regexp": "error",
    "security/detect-non-literal-require": "error",
    "security/detect-possible-timing-attacks": "error",
    "security/detect-eval-with-expression": "error",
    "security/detect-no-csrf-before-method-override": "error",
    "security/detect-buffer-noassert": "error",
    "security/detect-child-process": "error",
    "security/detect-disable-mustache-escape": "error",
    "security/detect-object-injection": "warn",
    "security/detect-unsafe-regex": "error",
    "security/detect-new-buffer": "error",
    "sonarjs/cognitive-complexity": ["error", 15],
    "sonarjs/no-duplicate-string": "warn",
    "sonarjs/no-identical-functions": "warn"
  }
}
