import { Config } from "@pandacss/dev";
import { pandaBaseColors } from "./baseColors";
import { pandaBreakpoints } from "./breakpoints";
import { pandaSemanticColors } from "./colors";
import { pandaConditions } from "./conditions";
import { pandaDurations } from "./durations";
import { pandaEasings } from "./easings";
import { pandaFontSizes } from "./fontSizes";
import { pandaFontWeights } from "./fontWeights";
import { pandaRadii } from "./radii";
import { pandaRecipes } from "./recipes";
import { pandaShadows } from "./shadows";
import { pandaSizes } from "./sizes";
import { pandaSpacing } from "./spacing";
import { pandaUtilities } from "./utilities";

export const baseConfig: Partial<Config> = {
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
} as const;