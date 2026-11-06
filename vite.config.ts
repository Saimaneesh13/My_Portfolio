import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl({
      include: [
        '**/*.glsl',
        '**/*.vert',
        '**/*.frag',
        '**/*.vs',
        '**/*.fs'
      ],
      defaultExtension: 'glsl',
      warnDuplicatedImports: true,
      compress: false,
      watch: true,
      root: '/'
    })
  ],
  build: {
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: 3000,
    host: true
  }
});

