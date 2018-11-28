<template>
  <transition v-if="show">
    <div id="createModal" class="createModal">
      <mo-mask></mo-mask>
      <div class="modal_main">
        <div class="notice">Notice</div>
        <div class="msg">Please create your wallet first and claim 100,000 test tokens.</div>
        <div class="btn_area">
          <span class="create" @click="create()">Create Wallet &amp; Claim Test Tokens</span>
          <span class="cancel" @click="cancel()">Give up the claim</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Mask from '@/components/base/mask/mask'
export default {
  components: {
    'mo-mask': Mask
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    cancel() {
      this.$store.commit('setCreateModalShow', false)
    },
    create() {
      if (!this.$store.state.user.accessToken) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.fade-enter-active, .fade-leave-active
  transition opacity 1s ease
.fade-enter, .fade-leave-active
  opacity 0
.createModal
  height 100%
  width 100%
  position fixed
  top 0
  left 0
  .modal_main
    height 185px
    width 550px
    background-color #ffffff
    border:1px solid #ffffff
    border-radius:2px
    position fixed
    top 30%
    left 50%
    transform translateX(-50%)
    z-index 100
    padding-left:22px
    padding-right:22px
    .notice
      width:100%
      font-size:14px
      font-family:Microsoft YaHei
      font-weight:400
      color:rgba(136,136,136,1)
      padding:10px 0px 10px 0px
      border-bottom:1px solid rgba(229,229,229,.5)
    .msg
      width 100%
      margin-top:15px
      font-size:16px
      font-family:Microsoft YaHei
      font-weight:400
      color:rgba(68,68,68,1)
    .btn_area
      height 40px
      width 100%
      margin-top:56px
      .create
        display inline-block
        width:230px
        height:32px
        line-height :32px
        text-align:center
        font-size:16px
        color:#fff
        background:rgba(89,104,240,1)
        border-radius:2px
        cursor pointer
      .cancel
        display inline-block
        cursor pointer
        width:150px
        height:32px
        line-height :32px
        text-align:right
        font-size:16px
        font-family:Microsoft YaHei
        font-weight:400
        line-height:24px
        color:rgba(89,104,240,1)
        margin-left:115px
</style>
