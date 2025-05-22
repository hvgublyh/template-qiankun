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