import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

import { createHtmlPlugin } from 'vite-plugin-html'
import { envDir } from './scripts/build'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir)

  return {
    plugins: [
      vue(),
      VueDevTools(),
      /**
       * 为入口文件增加 EJS 模版能力
       * 添加一些description， kewords并且压缩html
       */
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            appTitle: env.VITE_APP_TITLE,
            appDesc: env.VITE_APP_DESC,
            appKeywords: env.VITE_APP_KEYWORDS
          }
        }
      })
    ],
    envDir: envDir,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@env': fileURLToPath(new URL('./scripts/dev', import.meta.url))
      }
    }
  }
})
