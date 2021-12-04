module.exports = {
  typescript: { reactDocgen: false },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    'storybook-addon-themes',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },

  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../pages-stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
};
