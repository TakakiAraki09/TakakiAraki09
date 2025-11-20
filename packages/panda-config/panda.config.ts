import { defineConfig } from '@pandacss/dev';
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

export default defineConfig({
  outdir: './dist',
  preflight: true,
  strictTokens: true,
  strictPropertyValues: true,
  jsxFramework: 'react',
  theme: {
    extend: {
      tokens: {
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
        // bounce: {
        //   "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
        //   "50%": { transform: "translateX(-50%) translateY(-10px)" },
        // },
      },
      recipes: pandaRecipes,
      breakpoints: pandaBreakpoints,
    },
  },
  conditions: pandaConditions,
  utilities: pandaUtilities,
});
