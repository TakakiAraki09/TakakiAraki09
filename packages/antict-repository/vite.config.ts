import packageJson from './package.json';
import react from '@vitejs/plugin-react';
import { dependencies } from '../../package.json';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true }),
    tsconfigPaths(),
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: packageJson.name,
      formats: ['es', 'umd'],
      fileName: 'index',
    },

    rollupOptions: {
      external: [...Object.keys(dependencies)],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
