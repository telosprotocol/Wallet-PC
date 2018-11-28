<template>
  <transition v-if="show">
    <div class="rewardModal">
      <mo-mask></mo-mask>
      <div class="modal_main">
        <div class="notice">Reward notice</div>
        <div class="msg">Congratulations! You earned 10 TOP tokens reward for transaction today! Submit your wallet address to our Telegram bot and claim your reward!</div>
        <div class="btn_area">
          <div :data-clipboard-text="$store.state.user.address" class="reward" @click="openBot()">Copy Address &amp; Claim Reward</div>
          <div class="cancel" @click="cancel()">Not Now</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Mask from '@/components/base/mask/mask'
import Clipboard from 'clipboard'
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
      this.$store.commit('setRewardModalShow', false)
    },
    openBot() {
      const clipboard = new Clipboard('.reward')
      clipboard.on('success', e => {
        this.$toast({
          'toastMsg': 'Copy successfully'
        })
        clipboard.destroy()
      })
      this.$toast({
        'toastMsg': 'Copy successfully'
      })
      setTimeout(() => {
        // window.location.href = 'https://t.me/TOPNetworkBot'
        window.open('https://t.me/TOPNetworkBot', '_blank')
      }, 2000)
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.fade-enter-active, .fade-leave-active
  transition opacity 1s ease
.fade-enter, .fade-leave-active
  opacity 0
.rewardModal
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
      font-size:12px
      font-family:Microsoft YaHei
      font-weight:400
      color:rgba(136,136,136,1)
      padding:10px 0px 5px 0px
      border-bottom:1px solid rgba(229,229,229,.5)
    .msg
      width 100%
      margin-top:15px
      font-size:14px
      line-height:18px
      font-family:Microsoft YaHei
      font-weight:400
      color:rgba(68,68,68,1)
    .btn_area
      height 40px
      width 100%
      margin-top:56px
      .reward
        display inline-block
        width:280px
        height:30px
        line-height :30px
        text-align:center
        color:#fff
        background:rgba(89,104,240,1)
        border-radius:2px
        cursor pointer
      .cancel
        display inline-block
        cursor pointer
        width:150px
        height:30px
        line-height :30px
        text-align:right
        font-size:14px
        font-family:Microsoft YaHei
        font-weight:400
        line-height:24px
        color:rgba(89,104,240,1)
        margin-left:55px
</style>
