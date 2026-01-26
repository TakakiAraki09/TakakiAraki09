import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
import preset from "./panda.preset";

const globalCss = defineGlobalStyles({
  "p, h1, h2, h3, h4, h5, h6": {
    margin: 0,
  },
});

export default defineConfig({
  outdir: "styled-system",
  preflight: true,
  strictTokens: true,
  strictPropertyValues: true,
  presets: [preset],
});
