import { defineConfig } from "@pandacss/dev";
import preset from "./panda.preset";

export default defineConfig({
  outdir: "styled-system",
  preflight: true,
  strictTokens: true,
  strictPropertyValues: true,
  presets: [preset],
});
