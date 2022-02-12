import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

export default defineConfig((): UserConfig | Promise<UserConfig> => {
  let config: UserConfig = {
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
      minify: 'terser',
      brotliSize: false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        output: {
          comments: true
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks: {
            vue: ['vue', 'vue-router', 'vuex'],
            express: ['express']
          }
        }
      }
    }
  }
  if(process.argv[5] === '--ssr') config.build.rollupOptions = {}
  return config
})