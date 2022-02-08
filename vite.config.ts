import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src")
    },
    extensions: ['.js', '.ts', '.json', '.scss']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/variable.scss";`
      }
    }
  },
  build: {
    // minify: 'esbuild', // terser
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
