import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default {
  plugins: [
    react(),
    visualizer({
      open: false,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
    target: 'es2023',
  },
  optimizeDeps: {
    // avoid late discovered deps
    include: ['typescript'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
} satisfies UserConfig;
