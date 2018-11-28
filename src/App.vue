<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getuserinfo } from '@/api/fetch'
export default {
  name: 'App',
  created() {
    function checkIE() {
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    }
    if (checkIE()) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
    this.setScale()
    this.setUserInfo()
    this.initCode()
  },
  methods: {
    setScale() {
      let body = document.getElementsByTagName('body')[0]
      // body.style.cssText += 'transform: scale(' + scale + ');'
      body.style.cssText += 'min-width: 1400px;'
      body.style.cssText += 'overflow-x: auto;'
      body.style.cssText += 'overflow-y: auto;'
    },
    setUserInfo() {
      let userInfo = localStorage.getItem('userInfoV1')
      if (userInfo) {
        this.$store.commit('SET_USERDATA', JSON.parse(userInfo))
        // let ammount = JSON.parse(userInfo).address
        getuserinfo().then(res => {
          this.$store.commit('SET_USERDATA', res.data)
          // })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    getUrlKey(name) {
      try {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
      } catch (err) {
        // console.log(err)
        return
      }
    },
    initCode() {
      let code = this.getUrlKey('code')
      if (code) {
        this.$store.commit('setCode', code)
      }
    }
  }
}
</script>
