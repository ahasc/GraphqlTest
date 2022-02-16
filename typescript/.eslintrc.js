module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'no-useless-escape': 'warn',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
        paths: ['src', 'specs'],
      },
    },
  },
};
