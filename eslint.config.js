import antfu from '@antfu/eslint-config'
import plugin from '@unocss/eslint-plugin'
import eslint_config_standard_jsx from 'eslint-config-standard-jsx'
import react from 'eslint-plugin-react'
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
  /**
   * vue rules
   */
  {
    rules: {
      'yml/no-empty-mapping-value': 'off',
      'vue/component-name-in-template-casing': [2, 'PascalCase'],
      'linebreak-style': [2, 'unix'],
      'vue/multi-word-component-names': 'off',
      'vue/html-indent': [2, 2],
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
      'quote-props': [2, 'as-needed'],
      'vue/attributes-order': [
        2,
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
        2,
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
      'vue/first-attribute-linebreak': [2, {
        singleline: 'beside',
        multiline: 'below',
      }],
      'vue/attribute-hyphenation': [1, 'never', {
        ignore: ['custom-prop'],
      }],
      'vue/prop-name-casing': [1, 'camelCase'],
      'vue/max-attributes-per-line': [2, {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
      'vue/prefer-true-attribute-shorthand': [2, 'never'],
      'ts/ban-ts-comment': 'off',
      'vue/v-on-event-hyphenation': [2, 'never', {
        autofix: true,
      }],
      'vue/custom-event-name-casing': [2, 'camelCase', {
        ignores: [],
      }],
    },
  },
  /*
  * jsx rules
  * */
  {
    plugins: {
      react,
    },
    rules: {
      ...eslint_config_standard_jsx.rules,
      'react/jsx-max-props-per-line': [2, {
        maximum: 1,
        when: 'always',
      }],
      'react/jsx-indent': [2, 2],
      'react/jsx-sort-props': [2, {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: true,
        multiline: 'last',
      }],
      'react/jsx-boolean-value': [2, 'always'],
      'react/jsx-one-expression-per-line': [2, {
        allow: 'literal',
      }],
      'react/jsx-wrap-multilines': [2, {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      }],
    },
  },
)
