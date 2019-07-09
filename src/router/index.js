import Vue from 'vue'
import Router from 'vue-router'
const Recommend = () => import('components/recommend/recommend')
const Rank = () => import('components/rank/rank')
const Search = () => import('components/search/search')
const Singer = () => import('components/singer/singer')
const SingerDetail=()=>import  ('components/singer-detail/singer-detail')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          name:'singerDetail',
          component: SingerDetail
        }
      ]
    }
  ],
  // mode: 'history'
})
