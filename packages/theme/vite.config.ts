import pkg from './package.json';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ exclude: ['src/main.ts'] })],
  build: {
    outDir: 'dist', // default の設定と同じ
    lib: {
      entry: 'src/index.ts',
      name: pkg.name,
      fileName: 'index',
      formats: ['es', 'umd'], // default の設定と同じ
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
