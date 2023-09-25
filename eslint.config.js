import antfu from '@antfu/eslint-config'
import plugin from '@unocss/eslint-plugin'
import vuePlugin from 'eslint-plugin-vue'

export default antfu(
  {
    ignores: [],
  },
  {
    plugins: {
      '@unocss': plugin,
      vue: vuePlugin,
    },
    rules: plugin.configs.recommended.rules,
  },
  {
    rules: {
      'yml/no-empty-mapping-value': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'linebreak-style': ['error', 'unix'],
      'vue/multi-word-component-names': 'off',
      'vue/html-indent': ['error', 2],
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
      'quote-props': ['error', 'as-needed'],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: true,
        },
      ],
      'import/order': [
        'error',
        {
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      'vue/one-component-per-file': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-assertions': 0,
      'prefer-promise-reject-errors': 'off',
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside',
        multiline: 'below',
      }],
      'vue/attribute-hyphenation': [1, 'never', {
        ignore: ['custom-prop'],
      }],
      'vue/prop-name-casing': [1, 'camelCase'],
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
    },
  },
)
