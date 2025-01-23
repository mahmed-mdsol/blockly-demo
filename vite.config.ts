import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/blockly-demo/' : '/',
  plugins: [
    react(),
    federation({
      name: 'medirules',
      filename: 'remoteEntry.js',
      exposes: {
        './Calculator': './src/components/Calculator/Calculator.tsx',
      },
      shared: ['react', 'react-dom', 'blockly'],
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
