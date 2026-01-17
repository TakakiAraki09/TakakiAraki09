import preset from '@repo/panda-config/config';
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  jsxFramework: "qwik",
  outdir: "src/styled-system",
  preflight: true,
  strictTokens: true,
  strictPropertyValues: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],

});
