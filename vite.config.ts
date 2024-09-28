import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          monacoEditor: ['monaco-editor'],
        },
      },
    },
    target: 'es2023',
  },
} satisfies UserConfig;
