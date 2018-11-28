<template>
  <div v-if="show" class="request_modal">
    <mo-mask></mo-mask>
    <div class="modal_main">
      <div class="title">Invite friends to send you test tokens</div>
      <div class="text_area">
        <span>1. Invite your friends to send test tokens to your wallet.</span>
        <span>2. You will earn a reward of 20 TOP tokens.</span>
      </div>
      <div class="method_one">
        <span class="title">Method 1:</span>
        <div class="wallet_adress">
          <span class="label">Wallet Address:</span>
          <input v-model="address" readonly="readonly" type="text" class="w_input" placeholder="Enter your address here"/>
        </div>
        <div class="link_area">
          <span class="label">Invite link:</span>
          <input v-model="link" readonly="readonly" type="text" class="l_input" placeholder="Enter your link here"/>
        </div>
        <div :data-clipboard-text="shareText" class="copy_btn" @click="copyLink()">Copy Address &amp; Link</div>
      </div>
      <div class="method_sec">
        <span class="title">Method 2:</span>
        <div class="btn_area">
          <div class="share_btn" @click="shareToTwitter()">Share to Twitter</div>
          <!-- <div class="share_btn" @click="shareToFb()">Share to Facebook</div> -->
          <div class="share_btn" @click="shareToTelegram()">Share to Telegram</div>
          <!-- <div class="share_btn" @click="shareToWechat()">Share to Wechat</div>
          <div id="qrcode"></div> -->
        </div>
      </div>
      <img src="@/assets/images/close.png" class="cancel" @click="cancel()">
    </div>
  </div>
</template>

<script>
import Mask from '@/components/base/mask/mask'
import Clipboard from 'clipboard'
import QRcode from 'qrcodejs2'
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
      return this.$store.state.user.address
    },
    link() {
      // let str = 'https://www.topnetwork.org/testnet/#/activepage?code=' + this.$store.state.user.code + ''
      let str = location.href.replace('/testnet/wallet', '/activepage').concat('?code=' + this.$store.state.user.code)
      return str
    },
    shareText() {
      let str = 'Wallet Address:"' + this.address + '",Invite link:"' + this.link + '"'
      return str
    }
  },
  // created() {
  //   this.qrcode()
  // },
  methods: {
    cancel() {
      this.$store.commit('setRequestModalShow', false)
    },
    // 动态生成微信分享二维码
    qrcode() {
      this.$nextTick(() => {
        let qrcode = new QRcode('qrcode', {
          width: 100,
          height: 100, // 高度
          text: this.link, // 二维码内容
          background: '#f00'
          // image: '../../../../favicon2.ico'
        })
        console.log(qrcode)
      })
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
    shareToTwitter() {
      let shareContent = '🎁🎁TOP Network @topnetwork_top is giving away 💰5,000,000 tokens for its #Testnet. Send a test transaction to me on ' + this.link + '. We can both get rewards. My Testnet wallet address is ' + this.address
      // let shareContent = 'TOP Network @topnetwork_top is giving away 💰1 million tokens for its Testnet. Make a TEST transfer on ' + this.link + ' to my Testnet wallet address "' + this.address + '". Let’s get tokens together! '
      // let shareLink = this.link
      let shareUrl = 'https://twitter.com/intent/tweet?text='.concat(encodeURIComponent(shareContent)).concat(
        ' ')
      this.popupwindow(shareUrl, 'Twitter', 600, 400)
    },
    shareToFb() {
      let shareContent = 'TOP Network Testnet is officially launched. Join here ' + this.link + ' and make a transfer to my Testnet wallet address "' + this.address + '". Let’s earn tokens together! '
      let shareLink = this.link
      let shareUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareLink) + '&t=' + encodeURIComponent(shareContent) + ''
      this.popupwindow(shareUrl, 'Facebook', 600, 400)
    },
    shareToTelegram() {
      let shareContent = 'TOP Network is giving away 5,000,000 tokens!!! Join here ' + this.link + ' and send a transaction to my Testnet wallet address ' + this.address + '. Let us get tokens together!'
      // let shareContent = 'TOP Network is giving away 1,000,000 tokens!!! Join here and make a transfer to my Testnet wallet address "' + this.address + '". Let’s get tokens together. '
      // let shareLink = this.link
      let shareUrl = 'https://telegram.me/share/url?url=' + ' ' + '&text=' + encodeURIComponent(shareContent) + ''
      this.popupwindow(shareUrl, 'Telegram', 600, 400)
    },
    copyLink() {
      const clipboard = new Clipboard('.copy_btn')
      clipboard.on('success', e => {
        this.$toast({
          'toastMsg': 'Copy successfully'
        })
        clipboard.destroy()
      })
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
#qrcode
  position:absolute
  right:10px
  top:-10px
.request_modal
  height 100%
  width 100%
  position fixed
  top 0
  left 0
  .modal_main
    height 420px
    width 640px
    background-color #ffffff
    position fixed
    top 30%
    left 50%
    transform translateX(-50%)
    z-index 100
    padding:34px 25px 0px 25px
    .title
      width:100%
      font-size:22px
      font-family:Arial
      font-weight:bold
      color:rgba(0,0,0,1)
      opacity:0.8
    .text_area
      width:100%
      margin-top 10px
      span
        display block
        width:100%
        height:28px
        font-size:18px
        font-family:Arial
        font-weight:400
        line-height:28px
        color:rgba(0,0,0,1)
        opacity:0.54
    .method_one
      width:100%
      margin-top 30px
      position relative
      .label
        width:100%
        font-size:18px
        font-family:Arial
        font-weight:bold
        color:rgba(0,0,0,1)
        opacity:0.8
      .wallet_adress
        margin-top 10px
        width:100%
        height 32px
        line-height:32px
        .label
          width:30%
          font-size:16px
          font-family:Arial
          font-weight:400
          line-height:32px
          color:rgba(0,0,0,1)
          opacity:0.8
        .w_input
          width 70%
          height:30px;
          border:1px solid rgba(0,0,0,0.1)
          border-radius:2px
          font-size:14px
          font-family:Arial
          font-weight:400
          color:rgba(0,0,0,1)
          opacity:0.8
          padding-left:10px
          margin-left:10px
      .link_area
        width:100%
        height:32px
        margin-top:20px
        .label
          font-size:16px
          font-family:Arial
          font-weight:400
          line-height:32px
          color:rgba(0,0,0,1)
          opacity:0.8
        .l_input
          width 70%
          height:30px
          border:1px solid rgba(0,0,0,0.1)
          border-radius:2px
          font-size:14px
          font-family:Arial
          font-weight:400
          line-height:31px
          color:rgba(0,0,0,1)
          opacity:0.8
          margin-left:10px
          padding-left:10px
      .copy_btn
        width :32%
        height:32px
        line-height:32px
        text-align:center
        border-radius:2px
        font-size:14px
        font-family:SF Pro Display
        font-weight:bold
        // color:rgba(89,104,240,1)
        color:#fff
        background:rgba(89,104,240,1)
        opacity:1
        margin-top:10px
        cursor:pointer
    .method_sec
      margin-top 30px
      width:100%
      .title
        width:100%
        font-size:18px
        font-family:Arial
        font-weight:bold
        color:rgba(0,0,0,1)
        opacity:0.8
      .btn_area
        margin-top 10px
        position relative
      .share_btn
        display inline-block
        line-height 30px
        text-align center
        color #fff
        border-radius 3px
        cursor pointer
        font-size 14px
        margin-left 30px
        width:154px
        height:30px
        background:rgba(89,104,240,1)
        opacity:1
        border-radius:2px
        &:first-child
          margin-left 0
    .cancel
      width :16px
      height:16px
      position absolute
      top 22px
      right 22px
      cursor pointer

</style>
