import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/css/reset.css'
import '@/assets/icon/iconfont.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// 引入echarts图表
import echarts from 'echarts'
// 引入vue-i18n
import VueI18n from 'vue-i18n'
import toast from '@/components/base/toast/toast'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import ga from 'vue-ga'

Es6Promise.polyfill()
if (Number.parseInt === undefined) Number.parseInt = window.parseInt
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat

ga(router, '')

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.use(ElementUI)

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en', // 语言标识
  messages: {
    'zh': require('./assets/lang/zh'),
    'en': require('./assets/lang/en')
  }
})

Vue.prototype.$echarts = echarts

Vue.use(ElementUI, { locale })
Vue.use(toast)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (store.state.user.uid === 0) {
    let userInfo = localStorage.getItem('userInfoV1')
    if (userInfo) {
      store.commit('SET_USERDATA', JSON.parse(userInfo))
    }
  }
  if (to.path === '/login' || to.path === '/' || to.path === '/testnet/explorer' || to.path === '/explorer' || to.path === '/activepage') {
    next()
  } else {
    if (store.state.user.uid === 0) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

const _this = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
export default _this
