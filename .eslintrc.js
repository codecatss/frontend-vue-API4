module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '.eslintrc-auto-import.json',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',

  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'vue',
    'regex',
  ],
  ignorePatterns: ['src/@iconify/*.js', 'node_modules', 'dist'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'comma-spacing': ['error', { before: false, after: true }],
    'key-spacing': ['error', { afterColon: true }],

    'vue/first-attribute-linebreak': ['error', {
      singleline: 'beside',
      multiline: 'below',
    }],

    'indent': ['error', 2],

    'comma-dangle': ['error', 'always-multiline'],

    'object-curly-spacing': ['error', 'always'],

    'max-len': 'off',

    'semi': ['error', 'never'],

    'arrow-parens': ['error', 'as-needed'],

    'newline-before-return': 'error',

    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],

    'array-element-newline': ['error', 'consistent'],
    'array-bracket-newline': ['error', 'consistent'],

    'vue/multi-word-component-names': 'off',

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'expression', next: 'const' },
      { blankLine: 'always', prev: 'const', next: 'expression' },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
      { blankLine: 'always', prev: '*', next: 'multiline-const' },
    ],

    'import/prefer-default-export': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'no-restricted-imports': ['error', 'vuetify/components'],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'import/no-unresolved': [2, {
      ignore: [
        '~pages$',
        'virtual:generated-layouts',
        '.*\?raw',
      ],
    }],

    'no-shadow': 'off',

    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',

    'vue/block-tag-newline': 'error',
    'vue/component-api-style': 'error',
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
    'vue/custom-event-name-casing': ['error', 'camelCase', {
      ignores: [
        '/^(click):[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/',
      ],
    }],
    'vue/define-macros-order': 'error',
    'vue/html-comment-content-newline': 'error',
    'vue/html-comment-content-spacing': 'error',
    'vue/html-comment-indent': 'error',
    'vue/match-component-file-name': 'error',
    'vue/no-child-content': 'error',
    'vue/require-default-prop': 'off',

    'vue/no-empty-component-block': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/v-on-function-call': 'error',
    'vue/no-restricted-class': ['error', '/^(p|m)(l|r)-/'],
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],

    'vue/no-irregular-whitespace': 'error',
    'vue/template-curly-spacing': 'error',

    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-nested-template-literals': 'off',

    'regex/invalid': [
      'error',
      [
        {
          regex: '@/assets/images',
          replacement: '@images',
          message: 'Use \'@images\' path alias for image imports',
        },
        {
          regex: '@/styles',
          replacement: '@styles',
          message: 'Use \'@styles\' path alias for importing styles from \'src/styles\'',
        },
        {
          regex: '@core/\\w',
          message: 'You can\'t use @core when you are in @layouts module',
          files: {
            inspect: '@layouts/.*',
          },
        },
        {
          regex: 'useLayouts\\(',
          message: '`useLayouts` composable is only allowed in @layouts & @core directory. Please use `useThemeConfig` composable instead.',
          files: {
            inspect: '^(?!.*(@core|@layouts)).*',
          },
        },
        {
          regex: 'import axios from \'axios\'',
          replacement: 'import axios from \'@axios\'',
          message: 'Use axios instances created in \'src/plugin/axios.js\' instead of unconfigured axios',
          files: {
            ignore: '^.*plugins/axios.js.*',
          },
        },
      ],

      '\.eslintrc\.js',
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.js', '.jsx', '.jsx', '.mjs', '.png', '.jpg'],
      }, alias: { 'extensions': ['.ts', '.js', '.tsx', '.jsx', '.mjs'], 'map': [["@", "./src"], ["@core", "./src/@core"], ["@layouts", "./src/@layouts"], ["@images", "./src/assets/images/"], ["@styles", "./src/styles/"], ["@configured-variables", "./src/styles/variables/_template.scss"], ["@axios", "./src/plugins/axios"], ["apexcharts", "node_modules/apexcharts-clevision"]] },
    },
  },
}
