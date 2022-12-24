module.exports = {
  root: true,
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 0,
  },
};
