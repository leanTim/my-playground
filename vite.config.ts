import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html'
import { envDir } from './scripts/build'
// element-plus按需导入https://element-plus.org/zh-CN/guide/quickstart.html
import AutoImport from 'unplugin-auto-import/vite'
// https://github.com/unplugin/unplugin-vue-components#installation
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir)

  return {
    plugins: [
      vue({ include: [/\.vue$/, /\.md$/, /\.db$/] }),
      VueDevTools(),
      /**
       * 按需自动导入api 不需要每次都import
       * @link https://github.com/unplugin/unplugin-auto-import#install
       *
       */
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/types/declaration-files/auto-import.d.ts',
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      /**
       * 自动导入组件 不需要每次import
       * 配合autoimport插件实现element组件的按需导入
       *@link https://github.com/unplugin/unplugin-vue-components#installation
       */
      Components({
        // directoryAsNamespace: true,
        collapseSamePrefixes: true,
        globalNamespaces: [],
        extensions: ['vue', 'ts'],
        deep: true,
        resolvers: [ElementPlusResolver()],
        dts: 'src/types/declaration-files/components.d.ts'
      }),
      /**
       * 为入口文件增加 EJS 模版能力
       * 添加一些description， kewords并且压缩html
       *@link https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
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
        '~': fileURLToPath(new URL('./', import.meta.url))
      }
    }
  }
})
