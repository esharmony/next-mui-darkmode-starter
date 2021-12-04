module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
  },
  setupFiles: ['<rootDir>/test-setup.ts'],
  testEnvironment: 'jsdom',
};
