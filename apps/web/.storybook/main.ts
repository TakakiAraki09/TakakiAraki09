import type { StorybookConfig } from "storybook-framework-qwik";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "storybook-framework-qwik",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: async (config) => {
    if (config.build) {
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        onLog(level, log, handler) {
          // Suppress PURE comment warnings from Panda CSS
          if (log.message?.includes('__PURE__')) {
            return;
          }
          // Suppress eval warnings from Storybook
          if (log.message?.includes('Use of eval')) {
            return;
          }
          handler(level, log);
        },
      };
    }
    return config;
  },
};

export default config;
