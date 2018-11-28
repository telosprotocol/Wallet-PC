<template>
  <div class="navbar-header">
    <ul class="navbar">
      <li class="logo-interval"><a href="https://www.topnetwork.org/" target="_self"><img src="@/assets/images/logo.png" class="logo"></a></li>
      <div class="menu">
        <li class="endmargin"><a href="https://www.topnetwork.org/redeem" target="_self">REDEEM</a></li>
        <li class="testnet" @mouseenter="showBountyItem" @mouseleave="hideBountyItem">BOUNTY<img :class="[rotate3?'iconfont arrow1':'iconfont arrow2']" src="@/assets/images/arrow.png">
          <ul v-if="showBounty" class="path">
            <li><a href="https://bitcointalk.org/index.php?topic=5070267.msg47953223#msg47953223" target="_blank">BITCOINTALK  &nbsp;BOUNTY</a></li>
            <li><a href="https://medium.com/@topnetwork/top-network-bounty-campaign-released-2a3e9a9f1e65" target="_blank">BOUNTY &nbsp;GUIDE</a></li>
            <li><a href="https://bitcointalk.org/index.php?topic=5049339.msg46994432#msg46994432" target="_blank">BITCOINTALK  &nbsp;ANN</a></li>
            <li><a href="https://medium.com/top-network/weekly-limited-time-bounty-offer-3-on-up-to-130-tokens-for-grab-54ffad5d033e" target="_blank">LIMITED-TIME &nbsp;BOUNTY</a></li>
          </ul>
        </li>
        <li><a href="https://www.topnetwork.org/event" target="_self">EVENT</a></li>
        <li><a href="https://www.topnetwork.org/ambassador" target="_self">AMBASSADORS</a></li>
        <li class="executive testnet" @mouseenter="showWhiteRouter" @mouseleave="hideWhiteRouter">
          WHITEPAPER<img :class="[rotate1?'iconfont arrow1':'iconfont arrow2']" src="@/assets/images/arrow.png">
          <ul v-if="showWhite" class="path">
            <li><a href="https://www.topnetwork.org/submitemail" target="_self" class="wallet-path">WHITEPAPER</a></li>
            <li><a href="https://www.topnetwork.org/pdf" target="_self" class="wallet-path">EXECUTIVE SUMMARY</a></li>
          </ul>
        </li>
        <li class="testnet" @mouseenter="showRouter" @mouseleave="hideRouter">
          <router-link to="/">TESTNET</router-link><img :class="[rotate?'iconfont arrow1':'iconfont arrow2']" src="@/assets/images/arrow.png">
          <ul v-if="show" class="path">
            <li><router-link to="/activepage" tag="a" class="wallet-path">TESTNET BOUNTY</router-link></li>
            <li><router-link to="/" tag="a" class="wallet-path">TOP TESTNET</router-link></li>
            <li><router-link to="/testnet/wallet" tag="a" class="wallet-path">WALLET</router-link></li>
            <li><router-link to="/testnet/explorer" tag="a" class="wallet-path">EXPLORER</router-link></li>
          </ul>
        </li>
        <li class="executive testnet" @mouseenter="showAbouts" @mouseleave="hideAbouts">
          ABOUT<img :class="[rotate2?'iconfont arrow1':'iconfont arrow2']" src="@/assets/images/arrow.png">
          <ul v-if="showAbout" class="path">
            <li><a href="https://www.linkedin.com/company/topnetwork" target="_blank" class="wallet-path">TEAM</a></li>
            <li><a href="https://www.topnetwork.org/faq" target="_self" class="wallet-path">FAQ</a></li>
          </ul>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  data() {
    return {
      show: false,
      rotate: false,
      showWhite: false,
      rotate1: false,
      rotate2: false,
      rotate3: false,
      showTest: false,
      showAbout: false,
      langshow: false,
      showBounty: false
    }
  },
  methods: {
    showRouter() {
      this.show = true
      this.rotate = true
    },
    showWhiteRouter() {
      this.rotate1 = true
      this.showWhite = true
    },
    hideRouter() {
      this.show = false
      this.rotate = false
    },
    hideWhiteRouter() {
      this.rotate1 = false
      this.showWhite = false
    },
    showitem() {
      this.show = true
    },
    hideitem() {
      this.show = false
    },
    showTestnet() {
      this.showTest = true
    },
    hideTestnet() {
      this.showTest = false
    },
    showAbouts() {
      this.rotate2 = true
      this.showAbout = true
    },
    hideAbouts() {
      this.rotate2 = false
      this.showAbout = false
    },
    showlang() {
      this.langshow = true
    },
    hidelang() {
      this.langshow = false
    },
    showBountyItem() {
      this.rotate3 = true
      this.showBounty = true
    },
    hideBountyItem() {
      this.rotate3 = false
      this.showBounty = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .navbar-header
    width:100%
    height: 90px
    background:#061b55
    .navbar
      width:80%
      margin:0 auto
      height:90px
      position relative
      .logo-interval
        width:21.9%
        height:90px
        position absolute
        left 0
        top 50%
        transform translateY(-50%)
        .logo
          height 36px
          margin-top:31px
          display: block
      .menu
        position absolute
        height 100%
        width 80%
        right 0
      .executive
        // width:14.2%
      .endmargin
        margin-right:0
      .testnet
        position: relative
        .arrow1
          display :inline-block
          width:16px
          height:12px
          margin-left:4px
          color:rgba(255,255,255,1)
          opacity:1
          transform:rotate(180deg)
          transform-origin:center center
          transition: transform .5s ease
          position:relative;
          top:-2px;
        .arrow2
          display :inline-block
          width:16px
          height:12px
          margin-left:4px
          color:rgba(255,255,255,1)
          opacity:1
          transform:rotate(0deg)
          transition: transform .5s ease
          transform-origin:center center
          position:relative;
          top:-2px;
        .path
          position: absolute
          background:#ff0
          left:0
          top: 80px
          width: 210px
          color:rgba(255,255,255,1)
          background:#0D1458
          font-size:16px
          z-index:1000
        .path li
          width:210px
          height:50px
          text-align:center
          line-height:50px
          cursor:pointer
          .wallet-path
            width:100%
            height:50px
            display:block
        .path li:hover
          background:#5968f0
    .navbar li
      float: right
      margin-left:4%
      height:90px
      text-align:center
      color:rgba(255,255,255,1)
      font-size:16px
      font-family:PF Din Text Universal;
      font-weight:500;
      line-height:90px
      cursor:pointer
      a
        font-family:PF Din Text Universal;
        font-weight:500;
</style>
