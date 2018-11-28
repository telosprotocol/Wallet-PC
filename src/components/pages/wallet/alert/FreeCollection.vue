<template>
  <div class="freeCollection">
    <div class="remainingMoney">
      <span class="remaining">Balance:</span>
      <span class="number">{{ $store.state.user.balance }}</span>
      <span class="user">Test token</span>
      <span v-if="show" class="activity" @click="freeCollection">get test token for free</span>
    </div>
    <div ref="collection" class="toggle-area">
      <img src="@/assets/images/free_token.png" class="image">
      <div class="sure" @click="sureCollection">YES</div>
    </div>
    <create-modal v-if="createModal"></create-modal>
  </div>
</template>

<script>
import { isLogin } from '@/utils/common'
import createModal from '@/components/base/modal/createWalletModal'
export default {
  name: 'FreeCollection',
  components: {
    createModal
  },
  data() {
    return {
      destination: '',
      showModal: false,
      show: !isLogin(this)
    }
  },
  computed: {
    createModal() {
      return this.$store.state.top.createModal
    }
  },
  methods: {
    // 打开免费领取弹窗
    freeCollection() {
      this.$store.commit('setCreateModalShow', true)
    },
    // 关闭创建property窗口
    sureCollection() {
      this.$refs.collection.style.display = 'none'
      var mask = document.getElementById('mask')
      mask.style.width = '0px'
      mask.style.height = '0px'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .remainingMoney
    margin-top:20px
    .remaining
      display:inline-block
      // margin-right: 15px
    .user
      display:inline-block
      color #888888
    .activity
      color: #5968F0
      font-size 14px
      cursor pointer
    .number
      color #888888
    .mask
      position: fixed
      bottom:0
      right:0
      background:black
      opacity:.6
      width:0
      height:0
      z-index: 999
  .toggle-area
    position: fixed
    left: 50%
    top: 30%
    transform translateX(-50%)
    display: none
    width: 500px
    height: 270px
    background: #fff
    z-index:1000
    .image
      width:96%
      margin 10px auto
      height: 80%
      opacity: 0.8
      display block
    .text
      width: 350px
      position: absolute
      left: 90px
      top: 50px
      font-weight:550
      font-size: 24px
      text-align center
      color #ffffff
    .sure
      width: 92px
      height: 24px
      color: #ffffff
      text-align:center
      line-height: 24px
      background:#5968f0
      margin:10px auto
      font-size 14px
      cursor pointer
</style>
