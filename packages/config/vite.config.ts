import { UserConfig } from 'vite';
import { dependencies } from '../../package.json';

// https://vitejs.dev/config/
export const libraryConfig: UserConfig = {
  build: {
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
}
