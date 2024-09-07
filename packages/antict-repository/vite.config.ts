import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ tsconfigPath: './tsconfig.app.json' }), tsconfigPaths()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'index',
      formats: ['es'],
      fileName: 'index',
    }},
})
