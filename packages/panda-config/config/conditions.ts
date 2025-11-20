import type { Config } from "@pandacss/dev";

export const pandaConditions: Required<Config>["conditions"] = {
  extend: {
    // dark: "@media (prefers-color-scheme: dark)",
    light: "@media (prefers-color-scheme: light)",
  },
};
