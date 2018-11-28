<template>
  <div class="page">
    <navbar/>
    <!-- <div class="top_img"></div> -->
    <!-- <div class="register_area">
      <div class="register_main">
        <div class="btn_area">
          <div class="item">
            <span class="text center">Rewards: <span class="notice_text">$100 - $1000</span> for each node.
            This round we only need 100 nodes. </span>
          </div>
          <div class="item">
            <div class="close_item">{{ closeStr }}</div>
            <div class="btn" @click="registerBtn()">Register Now</div>
            <a class="increase" @click="openShareModal()">Increase Your Chance</a>
          </div>
          <div class="item">
            <div class="center need_area paddingleft">
              <span class="title text">You need to:</span>
              <span class="content">• Contribute a server to our Testnet for a week.<br>
                • Share the test results on social media.</span>
            </div>
          </div>
        </div>
        <div class="content_area">
          <div class="item">
            <span class="title">1. Server Requirements:</span>
            <span class="content">CentOS 7.x, 4 Core CPU (Minimum 2 Core), 8G Memory (Minimum 4G), 500G Disk (Minimum 100G), 100M Bandwidth, Fixed Public IP Address.</span>
          </div>
          <div class="item">
            <span class="title">2. Increase Your Chance to Win.</span>
            <span class="content">
              <div>You can increase your chance to be selected by</div>
              <div>a) getting more test tokens before application is closed. You can share your wallet address with your friends or TOP Network Telegram group to get more test tokens!</div>
              <div>b) sharing our recruitment drives on social media or participating actively in the conversations in our Telegram group.</div>
            </span>
          </div>
          <div class="item">
            <span class="title">3. More Rounds Are Coming.</span>
            <span class="content">We will run multiple rounds of recruitment for our Testnet before we roll out the mainnet.<br>
              You will be added automatically to our candidate pool for the next round if you are not selected for this round. </span>
          </div>
        </div>
        <div class="bottom_text">Lists of selected nodes will be released at the end of each round. We reserve the right to explain the terms and conditions.</div>
      </div>
    </div> -->
    <div class="bottom_img"></div>
    <div class="transfer_area">
      <div class="transfer_main">
        <div class="actitle">Get 10 Tokens Every Day and Even More! </div>
        <div class="btn_area">
          <div class="item">
            <div class="btn" @click="transferBtn()">Send a Transaction</div>
          </div>
          <div class="item">
            <div class="text center smallfontsize paddingleft2">20 tokens for inviting friends to send transactions to your Testnet wallet.</div>
            <a class="invite paddingleft2" @click="transferBtn()">Invite Friends to Send Transactions</a>
          </div>
          <div class="item">
            <span class="text center bounty-pool">Bounty Pool: 5,000,000 tokens<br>
              No cap on the number of participants.</span>
          </div>
        </div>
        <div class="content_area">
          <div class="item">
            <span class="title">How to get free TOP tokens?</span>
            <span class="content2">
              <p>1.	Join our <a href="https://t.me/topnetwork_top" target="_blank">Telegram group</a> and register an account in our <a href="https://t.me/TOPNetworkBot" target="_blank">Bounty Bot</a> to get at least 100 tokens. More bounties are available in this Bounty Bot!</p>
              <p>2. Register your Testnet wallet address in <a href="https://t.me/TOPNetworkBot" target="_blank">Bounty Bot</a> before making the first transfer. Rewards will be automatically added to your account after you complete the corresponding tasks.</p>
              <p>3. Invite friend to the Testnet and send you transactions to get 20 tokens. You can invite up to 15 friends.</p>
              <p>4. Transfer test tokens to a new wallet address each day. Each transaction will earn you 10 EXTRA tokens. </p>
              <p>5. If you get token rewards by sending transactions for 7 days in a row, you can get EXTRA 20 tokens. 15 days in a row, you can get EXTRA 50 tokens. 30 days in a row, you can get EXTRA 100 tokens! You will get one extra reward after the activity ends based on how many continuous days you get rewards.</p>
              <p class="endmarginbtom">6. Special gift will be sent to everyone’s bounty bot account on Thanksgiving Day! Stay tuned!</p>
            </span>
          </div>
          <div class="item notice-item">
            <div class="notice title">Notice: </div>
            <span class="content2">
              <p>1.	The friends you invite to our Testnet can also receive rewards by following the instructions above. </p>
              <p>2.	We encourage you to make test transfers to other participants in our <a href="https://t.me/topnetwork_top" target="_blank">Telegram group</a>.  </p>
              <p>3.	We reserve the right to explain the terms and conditions.</p>
            </span>
          </div>
        </div>
      </div>
    </div>
    <v-footer/>
  </div>
</template>

<script>
import { Navbar, AppMain } from '../layout/components'
import vFooter from '@/components/pages/common/Footer'
export default {
  components: {
    Navbar, AppMain, vFooter
  },
  data() {
    return {
      closeStr: 'Close in - Days',
      closeDay: 0,
      showModal: false
    }
  },
  created() {
    this.getDiffDays()
    this.setMeta()
    this.setScale()
    this.initCode()
  },
  methods: {
    getCode() {
      let htmlHref = window.location.href
      htmlHref = htmlHref.replace(/^http:\/\/[^/]+/, '')
      var addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1)
      var index = addr.lastIndexOf('/')
      var str = decodeURI(addr.substring(0, index))
      str = str.replace('#', '')
      return str
    },
    getCode2() {
      let htmlHref = window.location.href
      var index = htmlHref.lastIndexOf('\/')
      var str = str.substring(index + 1, str.length)
      return str
    },
    getUrlKey(name) {
      try {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
      } catch (err) {
        console.log(err)
      }
    },
    initCode() {
      let code = this.getUrlKey('code')
      if (code) {
        this.$store.commit('setCode', code)
      }
    },
    getTimeByTimeZone(timeZone, type) { // type=1 当前时间；type=2 11-05日时间
      let d = new Date()
      if (type === 2) {
        let arr2 = '2018-11-05 23:59:59'.split(/[- : \/]/)
        d = new Date(arr2[0], arr2[1] - 1, arr2[2], arr2[3], arr2[4], arr2[5]) // 兼容ios的写法，不然获取不到时间戳
      }
      let localTime = Date.parse(d)
      let localOffset = d.getTimezoneOffset() * 60000 // 获得当地时间偏移的毫秒数,这里可能是负数
      let utc = localTime + localOffset // utc即GMT时间
      let offset = timeZone // 时区，北京市+8  美国华盛顿为 -5
      let localSecondTime = utc + (3600000 * offset) // 本地对应的毫秒数
      return Math.floor(localSecondTime / 1000)
    },
    getDiffDays(localSecond) {
      let end_time = this.getTimeByTimeZone(-8, 2)
      let now_time = this.getTimeByTimeZone(-8, 1)
      let total = Math.floor(end_time - now_time)
      let days = Math.ceil(total / (24 * 3600))
      this.closeDay = days
      this.closeStr = 'Close in ' + days + ' Days'
      if (days === 1 || days === 0) {
        this.closeStr = 'Close in ' + days + ' Day'
      }
    },
    registerBtn() {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSeRi3Ssdu3Ws5WsH28QPkFemRbm0u8QixHV7pC-fniIzt6RBQ/viewform', '_blank')
    },
    transferBtn() {
      this.$router.push('/testnet/wallet')
    },
    setMeta() {
      var oMeta_title = document.createElement('meta')
      oMeta_title.property = 'og:title'
      oMeta_title.content = 'Get $1000 for being a Test Node'
      document.getElementsByTagName('head')[0].appendChild(oMeta_title)
      var oMeta_des = document.createElement('meta')
      oMeta_des.property = 'og:description'
      oMeta_des.content = 'Apply for TOP Network Testnet node, up to $1000 rewards only 100 test nodes needed. '
      document.getElementsByTagName('head')[0].appendChild(oMeta_des)
    },
    openShareModal() {
      this.showModal = !this.showModal
    },
    setScale() {
      let body = document.getElementsByTagName('body')[0]
      // body.style.cssText += 'transform: scale(' + scale + ');'
      body.style.cssText += 'min-width: 1400px;'
      body.style.cssText += 'overflow-x: auto;'
      body.style.cssText += 'overflow-y: auto;'
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@font-face{
  font-family: 'Cera Pro Bold';
  src:url('/static/fonts/CeraProBold.otf')
}
@font-face{
  font-family: 'Cera Pro Medium';
  src:url('/static/fonts/CeraProMedium.otf')
}
@font-face{
  font-family: 'Cera Pro Regular';
  src:url('/static/fonts/CeraProRegular.otf')
}
.navbar-header
.page
  width 100%
  background-color #061b55
  .top_img
    width 100%
    height 533px
    background-size cover
    background-position center
    background-repeat no-repeat
    background-image url('banner1.png')
  .register_area,.transfer_area
    .register_main,.transfer_main
      width 1280px
      margin 0 auto
      .actitle
        width:100%;
        margin:50px auto 30px auto;
        font-size:22px;
        font-family:Cera Pro;
        font-weight:500;
        color:rgba(255,255,255,1);
        text-align:center;
      .btn_area
        width 100%
        font-size 0
        color #fff
        .actitle
          width:100%;
          margin:50px auto 30px auto ;
          font-size:22px;
          font-family:Cera Pro;
          font-weight:500;
          color:rgba(255,255,255,1);
        .item
          width 100%
          height 100%
          .center
            text-align center
            width:100%;
            display:block;
            margin-top:30px;
          .text
            font-size 22px
            line-height 26px
            width 100%
            font-family 'Cera Pro Medium'
          .bounty-pool
            text-align:left
            margin-top:50px;
            font-family:Cera Pro;
            font-weight:300;
          .notice_text
            color #ffb400
          .btn
            width:412px;
            height:60px;
            line-height 60px
            margin:0 auto;
            background-color #ffb400
            color #fff
            font-size:32px;
            border-radius 6px
            text-align center
            cursor pointer
            font-family:Cera Pro;
            font-weight:bold;
          .close_item
            font-size 22px
            width 300px
            text-align center
            font-family 'Cera Pro Medium'
          .increase
            font-size 22px
            text-decoration underline
            transform translateX(-50%)
            width 300px
            text-align center
            font-family 'Cera Pro Medium'
          .need_area
            width 100%
          .title
            display block
            margin-bottom 10px
            font-family:Cera Pro;
            font-weight:bold;
          .content
            font-size 18px
            line-height 20px
          .invite
            color #ffc400
            font-size 22px
            bottom 32px
            text-decoration underline
            cursor pointer
            text-align:center
            margin-top:15px
            display:block
            font-family:Cera Pro;
            font-weight:500;
          .smallfontsize
            font-size:22px
            font-family:Cera Pro;
            font-weight:500;
          .paddingleft
            padding-left 13%
          .paddingleft2
            padding-left 29px
          .day
            text-align center
            font-family 'Cera Pro Medium'
      .content_area
        color #fff
        .item
          margin-top 50px
          margin-bottom 44px
          display block
          .title
            display block
            font-size:30px;
            margin-bottom 30px
          .content
            display block
            margin-left 26px
            line-height 20px
          .content2
            display block
            margin-left 0px
            line-height 25px
            font-size:20px;
            p{
              margin-bottom:30px;
              font-family:Cera Pro;
              font-weight:300;
              a{
                color:#FFB400
                border-bottom:1px solid #FFB400
                padding-bottom:2px
              }
            }
            .endmarginbotom{
              margin-bottom:0;
            }
      .bottom_text
        color #fff
        font-size 16px
        margin-bottom 120px
  .bottom_img
    background-image url('banner2.png')
    background-repeat no-repeat
    background-size cover
    background-position center
    width 100%
    height 533px
  .transfer_area
    padding-bottom 30px

</style>
