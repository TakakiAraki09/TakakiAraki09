import { definePreset } from '@pandacss/dev';
import { pandaBaseColors } from "./config/baseColors";
import { pandaBreakpoints } from "./config/breakpoints";
import { pandaSemanticColors } from "./config/colors";
import { pandaConditions } from "./config/conditions";
import { pandaDurations } from "./config/durations";
import { pandaEasings } from "./config/easings";
import { pandaFontSizes } from "./config/fontSizes";
import { pandaFontWeights } from "./config/fontWeights";
import { pandaRadii } from "./config/radii";
import { pandaRecipes } from "./config/recipes";
import { pandaShadows } from "./config/shadows";
import { pandaSizes } from "./config/sizes";
import { pandaSpacing } from "./config/spacing";
import { pandaUtilities } from "./config/utilities";

export default definePreset({
  presets: ["@pandacss/preset-base"],
  theme: {
    extend: {
      tokens: {
        colors: pandaBaseColors,
        fontSizes: pandaFontSizes,
        fontWeights: pandaFontWeights,
        spacing: pandaSpacing,
        radii: pandaRadii,
        shadows: pandaShadows,
        sizes: pandaSizes,
        durations: pandaDurations,
        easings: pandaEasings,
      },
      semanticTokens: {
        colors: pandaSemanticColors,
      },
      keyframes: {
      },
      recipes: pandaRecipes,
      breakpoints: pandaBreakpoints,
    },
  },
  conditions: pandaConditions,
  utilities: pandaUtilities,
});
