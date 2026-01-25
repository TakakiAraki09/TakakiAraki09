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
};

export default config;
