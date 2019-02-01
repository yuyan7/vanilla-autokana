module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'no-continue': 'off'
  },
  env: {
    browser: true,
  },
};