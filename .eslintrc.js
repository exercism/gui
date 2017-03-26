module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
  },
  globals: {
    process: true,
    requireNode: true,
    server: true
  }
};
