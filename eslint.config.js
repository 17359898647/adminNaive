import eslint from 'ge-eslint'

export default eslint({
  ignores: [
    'node_modules',
    'src/types/*',
  ],
  sortKeysOptions: true,
})
