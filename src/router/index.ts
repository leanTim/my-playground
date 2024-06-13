import { createRouter, createWebHashHistory } from 'vue-router'
import IndexPage from '@/views/IndexPage.vue'
import LevelPage from '@/views/LevelPage.vue'
import PlaygroundPage from '@/views/PlaygroundPage.vue'
import TsPlayground from '@/views/TsPlayground.vue'

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
    },
    {
      path: '/ts',
      component: TsPlayground
    }
  ]
})

export default router
