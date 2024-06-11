import { createRouter, createWebHashHistory } from 'vue-router'
import IndexPage from '@/views/IndexPage.vue'
import Layout from '@/components/Layout.vue'
import LevelPage from '@/views/LevelPage.vue'
import PlaygroundPage from '@/views/PlaygroundPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/learn'
    },
    {
      path: '/learn',
      component: IndexPage
    },
    {
      path: '/learn/:levelKey',
      component: IndexPage,
      props: true
    },
    {
      path: '/levels',
      component: LevelPage
    },
    {
      path: '/playground',
      component: PlaygroundPage
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/learn'
    }
  ]
})

export default router
