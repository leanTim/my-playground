import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/views/IndexPage.vue'
import Layout from '@/components/Layout.vue'
import LevelPage from '@/views/LevelPage.vue'
import PlaygroundPage from '@/views/PlaygroundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'learn',
          component: IndexPage,
          name: 'indexpage'
        },
        {
          path: 'level',
          component: LevelPage,
          name: 'levelpage'
        },
        {
          path: 'playground',
          component: PlaygroundPage,
          name: 'playgroundpage'
        }
      ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/learn' }
  ]
})

export default router
