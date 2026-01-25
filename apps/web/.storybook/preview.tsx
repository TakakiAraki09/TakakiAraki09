import type { Preview } from "storybook-framework-qwik";
import "../src/global.css";
import "../src/styled-system/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
