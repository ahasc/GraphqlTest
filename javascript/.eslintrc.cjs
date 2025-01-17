module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "import/extensions": 'off',
    "no-useless-escape": 'warn',
    "import/prefer-default-export": 'off',
    'no-shadow': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
        paths: ["src", 'specs'],
      },
    },
  },
};
