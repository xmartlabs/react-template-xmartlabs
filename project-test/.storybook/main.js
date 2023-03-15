const { resolve } = require('path');
const svgrPlugin = require('vite-plugin-svgr');
const viteTsconfig = require('vite-tsconfig-paths');
const tsconfigPaths = viteTsconfig.default;

const { mergeConfig } = require('vite');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": ['@storybook/addon-links', '@storybook/addon-essentials'],
  "core": {
    "builder": '@storybook/builder-vite',
  },
  async viteFinal(config) {
    config.plugins = [
      ...config.plugins,
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      })
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      $fonts: resolve('./src/assets/fonts')
    }
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },
};
