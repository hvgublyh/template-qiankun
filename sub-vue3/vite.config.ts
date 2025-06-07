import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import qiankun from 'vite-plugin-qiankun'
const selectorNamespace = require('postcss-selector-namespace');

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [
    vue(),
    qiankun('vite', {
      useDevMode: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        selectorNamespace({ namespace: '.vite-qiankun' }) // 先执行样式隔离
      ]
    }
  },
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
      name: 'vite',
      formats: ['umd'],
      fileName: (format) => `vite.${format}.js`
    },
    cssCodeSplit: false, // 将 CSS 提取到单独的文件
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter'
        },
        // 添加资源文件名格式化配置
        assetFileNames: (assetInfo: any) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'style/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
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