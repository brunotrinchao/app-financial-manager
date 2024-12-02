module.exports = {
  root: true,

  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },

  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],

  parserOptions: {
    parser: '@babel/eslint-parser'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/block-tag-newline': 'warn',
    'vue/component-definition-name-casing': 'warn',
    'vue/component-name-in-template-casing': 'warn',
    'vue/component-options-name-casing': 'warn',
    'vue/html-self-closing': 'off',
    'vue/match-component-file-name': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-useless-template-attributes': 'off',
    'prettier/prettier': ['error', { endOfLine: 'crlf' }],
    quotes: ['error', 'single']
  }
};
