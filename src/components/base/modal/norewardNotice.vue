<template>
  <transition>
    <div v-if="show" class="rewardModal">
      <mo-mask></mo-mask>
      <div class="modal_main">
        <div class="notice">Reward notice</div>
        <div class="msg">Congratulations! You have received your reward for today's transaction! Reward delivered on TOP Network Telegram bot.</div>
        <div class="btngroup">
          <span class="checkBot"><a href="https://t.me/TOPNetworkBot" target="_blank">Check My Reward on Bot</a></span>
          <span @click="cancel()">Close</span>
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
      this.$store.commit('setNoRewardModalShow', false)
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
    height 170px
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
    .btngroup
        cursor pointer
        width:100%
        height:30px
        line-height :30px
        text-align:right
        margin-top:30px
        font-size:14px
        font-family:Microsoft YaHei
        font-weight:400
        line-height:24px
        color:rgba(89,104,240,1)
        .checkBot
          margin-right:40px
</style>
