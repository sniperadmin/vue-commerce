module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: 'node',
  roots:['<rootDir>/tests/unit'],
  setupFiles: [
    '<rootDir>/register-context.js',
    '<rootDir>/jest-setup.js'
  ],
  modulePaths: [
    '<rootDir>',
  ],
  modulePathIgnorePatterns: [
    'node_modules',
  ],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    // process `*.vue` files with `vue-jest`
    '.*\\.vue$': 'vue-jest',
    '.*\\.js$': 'babel-jest',
    // '^.+\\.tsx?$': 'ts-jest',
    // ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  transformIgnorePatterns: ['node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "^~/(.*)$": "<rootDir>/src/$1",
    '^vue$': 'vue/dist/vue.common.js',
  },
}
