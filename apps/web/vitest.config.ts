import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths({ root: "." })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.{test,spec}.{ts,tsx}",
        "src/entry.*.tsx",
        "src/routes.config.tsx",
        "src/styled-system/**",
      ],
    },
  },
  resolve: {
    alias: {
      "~/styled-system/css": new URL(
        "./test/mocks/styled-system.ts",
        import.meta.url,
      ).pathname,
      "~/styled-system/jsx": new URL(
        "./test/mocks/styled-system.ts",
        import.meta.url,
      ).pathname,
    },
  },
});
