// @ts-nocheck
/// <reference types="vitest" />
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { installPlugin } from './src/plugins'

//
export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    minify: 'terser',
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    transformer: {
      css: 'lightningcss',
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
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3333,
    proxy: {
      '/api': {
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        target: 'https://jsonplaceholder.typicode.com',
      },
    },
  },
  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
