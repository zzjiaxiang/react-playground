import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default {
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          monacoEditor: ['monaco-editor'],
          lodashEs: ['lodash-es'],
        },
      },
    },
    target: 'es2023',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
} satisfies UserConfig;
