import { dependencies } from '../../package.json';
import { UserConfig } from 'vite';

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
};
