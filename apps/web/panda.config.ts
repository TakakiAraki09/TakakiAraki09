import { defineConfig } from "@pandacss/dev";
import config from "@repo/panda-config/config";

export default defineConfig({
  ...config,
  include: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  importMap: "@repo/panda-config",
});
