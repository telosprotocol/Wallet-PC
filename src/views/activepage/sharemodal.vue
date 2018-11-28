<template>
  <div v-if="show" class="share_modal">
    <mo-mask></mo-mask>
    <div class="modal_main">
      <div class="title">Increase Your Chance</div>
      <div class="share_area">
        <div class="item" @click="shareToTwitter()">
          <div class="twitter icon"></div>
        </div>
        <!-- <div class="item" @click="shareToFb()">
          <div class="facebook icon"></div>
        </div> -->
        <div class="item" @click="shareToTelegram()">
          <div class="telegram icon"></div>
        </div>
      </div>
      <div class="cancel_btn" @click="cancel()"></div>
    </div>
  </div>
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
  computed: {
    address() {
      if (this.$store.state.user.address) {
        return this.$store.state.user.address
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('openShareModal')
    },
    shareToTwitter() {
      let shareContent = 'TOP Network @topnetwork_top is recruiting #Testnet nodes! Up to 💰$1000 per node! Only 100 nodes needed! Apply right now 👉'
      let shareLink = window.location.href
      let shareUrl = 'http://twitter.com/home/?status='.concat(encodeURIComponent(shareContent)).concat(
        ' ').concat(encodeURIComponent(shareLink))
      this.popupwindow(shareUrl, 'Twitter', 600, 400)
    },
    shareToFb() {
      let shareContent = 'TOP Network Testnet is launched! Chance to win $1000 for being a Test node. Apply it right now 👉' + window.location.href + '. First come, first served!'
      let shareLink = window.location.href
      let shareUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareLink) + '&t=' + encodeURIComponent(shareContent) + ''
      this.popupwindow(shareUrl, 'Facebook', 600, 400)
    },
    shareToTelegram() {
      let shareContent = 'TOP Network is recruiting Testnet nodes! Up to $1000 per node! Only 100 nodes needed! Click here to apply: 👉' + window.location.href + '.'
      let shareLink = window.location.href
      let shareUrl = 'https://telegram.me/share/url?url=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareContent) + ''
      this.popupwindow(shareUrl, 'Telegram', 600, 400)
    },
    popupwindow(url, title, w, h) {
      let wLeft = window.screenLeft ? window.screenLeft : window.screenX
      let wTop = window.screenTop ? window.screenTop : window.screenY

      var left = wLeft + (window.innerWidth / 2) - (w / 2)
      var top = wTop + (window.innerHeight / 2) - (h / 2)
      return window.open(url, title,
        'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
            w + ', height=' + h + ', top=' + top + ', left=' + left)
    },
    isLogin() {
      if (this.$store.state.user.uid) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.share_modal
  height 100%
  width 100%
  position fixed
  left 0
  top 0
  .modal_main
    height 200px
    width 400px
    z-index 100
    background #ffffff
    border-radius 6px
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    .title
      font-size 14px
      position absolute
      top 10px
      left 10px
    .share_area
      height 60%
      width 80%
      position absolute
      left 50%
      top 50%
      transform translate(-50%,-50%)
      font-size 0
      .item
        height 100%
        width 50%
        display inline-block
        cursor pointer
        position relative
        &:hover
          opacity 0.8
      .icon
        background-size 100%
        background-repeat no-repeat
        height 48px
        width 48px
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
      .twitter
        background-image url('twitter.png')
      .facebook
        background-image url('facebook.png')
      .telegram
        background-image url('telegram.png')
    .cancel_btn
      color #000
      display inline-block
      position absolute
      right 10px
      top 10px
      font-size 16px
      cursor pointer
      background-image url('close.png')
      background-size 100%
      background-repeat no-repeat
      height 20px
      width 20px
</style>
