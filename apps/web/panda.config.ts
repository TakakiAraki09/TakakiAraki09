import preset from '@repo/panda-config/preset';
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  jsxFramework: "qwik",
  outdir: "src/styled-system",
  // preflight: true,
  // strictTokens: true,
  // strictPropertyValues: true,
  minify: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  globalCss: {
    body: {
      bg: "bg.primary",
      color: "accent.primary",
    },
    a: {
      color: "accent.primary",
      textDecoration: "underline",
    }
  }

});
