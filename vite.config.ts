import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      TESTE: env.TESTE,
    },
    plugins: [react()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        src: path.resolve('./src'),
      },
    },
  };
});