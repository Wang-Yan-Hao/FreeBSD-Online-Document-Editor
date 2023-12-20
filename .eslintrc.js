module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        source_type: 'script'
      }
    }
  ],
  parserOptions: {
    ecma_version: 'latest',
    source_type: 'module'
  },
  rules:
  {
    indent: ['error', 2]
  }
}
