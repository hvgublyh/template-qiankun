import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [
    vue(),
    qiankun('sub-vue3', {
      useDevMode: true,
    })
  ],
  base: '/vite',
  optimizeDeps: {
    include: ['common']
  },
  resolve: {
    preserveSymlinks: false,
    alias: {
      '@': resolve('./src')
    }
  },
  build: {
    target: 'es2015',
    lib: {
      entry: resolve('./src/main.ts'),
      name: 'sub-vue3',
      formats: ['umd'],
      fileName: (format) => `sub-vue3.${format}.js`
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter'
        }
      },
      external: ['vue', 'vue-router']
    }
  },
  server: {
    port: 8083,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})