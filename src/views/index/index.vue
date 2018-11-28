<template>
  <div>
    <carousel/>
    <status/>
    <nodes/>
    <common-footer/>
  </div>
</template>

<script>
import Carousel from '@/components/pages/index/Carousel'
import Status from '@/components/pages/index/Status'
import Nodes from '@/components/pages/index/Nodes'
import CommonFooter from '@/components/pages/common/Footer'
// import { getCookie } from '@/store/modules/cookie.js'
export default {
  name: 'Index',
  components: {
    Carousel,
    Status,
    Nodes,
    CommonFooter
  },
  created() {
    // this.checkLogin()
  },
  methods: {
    // 判断登录状态
    // checkLogin() {
    //   if (!getCookie('facebookUname') || !getCookie('googleUname')) {
    //     this.$router.push('/login')
    //   }
    // }
  }
}
</script>

<style lang="stylus" scoped>

</style>
