import type { GetPandaSematicToken } from "./interfaces";

export const pandaSemanticColors: GetPandaSematicToken<"colors"> = {
  // Light mode (default)
  bg: {
    // DEFAULT: { value: "{colors.white}" },
    // dark: { value: "{colors.darkBg}" },
    // gray: { value: "{colors.gray.300}" },
  },
  text: {
    // DEFAULT: { value: "{colors.primary.dark}" },
  },
  card: {
    // pink: { value: "{colors.pink.DEFAULT}" },
  },
  highlight: {
    // red: { value: "{colors.red}" },
  },
};
