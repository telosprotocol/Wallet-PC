import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

import Layout from '../views/layout/Layout'
import activePage from '../views/activepage/activepage'

export const constantRouterMap = [{
  path: '/login',
  name: 'login',
  component: () =>
            import('@/views/login/index'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/',
  name: 'index',
  hidden: true,
  children: [{
    path: '/',
    component: () =>
                import('@/views/index/index')
  }]
},
{
  path: '/activepage',
  component: activePage,
  name: 'activepage',
  hidden: true
},
{
  path: '/testnet',
  component: Layout,
  redirect: '/testnet/wallet',
  name: 'Testnet',
  meta: { title: 'Testnet', icon: 'testnet' },
  children: [{
    path: 'wallet',
    name: 'Wallet',
    component: () =>
                    import('@/views/wallet/index'),
    meta: { title: 'Wallet', icon: 'wallet' }
  },
    // 区块浏览器路由配置
  {
    path: 'explorer',
    name: 'Explorer',
    component: () =>
                    import('@/views/explorer/index'),
    meta: { title: 'Explorer', icon: 'explorer' }
  }
  ]
}
  // { path: '/', redirect: '/testnet', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
