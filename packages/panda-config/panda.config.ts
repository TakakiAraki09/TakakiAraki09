import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // outdirでstyled-systemの出力先を指定する
  outdir: './dist',
  preflight: true,
  strictTokens: true,
  strictPropertyValues: true,
  jsxFramework: 'react',
  theme: {},
  globalCss: {},
});
