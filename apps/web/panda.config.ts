import { defineConfig } from "@pandacss/dev";
import config from "@repo/panda-config/config";

export default defineConfig({
  ...config,
  outdir: "styled-system",
  include: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  importMap: "@repo/panda-config",
});
