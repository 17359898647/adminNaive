/// <reference types="vitest" />
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { installPlugin } from './src/plugins'

export default defineConfig({
  server: {
    port: 3333,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    installPlugin(),
    Vue({
      script: {
        propsDestructure: true,
      },
    }),
    vueJsx(),
    UnoCSS(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
