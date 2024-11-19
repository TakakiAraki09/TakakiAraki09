import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';
import { CONFIGRATIONS } from 'config';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true }),
    tsconfigPaths(),
  ],
  build: {
    ...CONFIGRATIONS.viteConfig.libraryConfig.build,
    lib: {
      entry: 'src/index.tsx',
      name: packageJson.name,
      formats: ['es', 'umd'],
      fileName: 'index',
    },
  },
});
