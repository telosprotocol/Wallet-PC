<template>
  <div class="carousel">
    <div class="start-testnet">
      <div class="title">TOP Testnet</div>
      <div class="entry">
        <router-link to="/testnet/wallet" class="wallet-page" tag="a">Wallet · Get free test tokens</router-link>
        <router-link to="/testnet/explorer" class="explorer-page" tag="a">Explorer</router-link>
      </div>
    </div>
    <!-- <div class="Bounty-area">
      <div class="title">Bounty for Helping Testnet</div>
      <div class="upto">Up to <span class="amount-color">$1000</span> Rewards</div>
      <div class="addsign">+</div>
      <div class="giveaway"><span class="amount-color">1,000,000</span> Tokens Giveaway</div>
      <router-link to="/activepage" class="information">More information</router-link>
    </div> -->
    <div class="image"><img src="@/assets/images/img_banner.png" class="carsouel-img"></div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      imgList: [
        {
          url: require('@/assets/images/img_banner.png')
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .carousel
    width:100%
    position:relative
    background:url('../../../assets/images/indexBackground.png') no-repeat
    // background-image: radial-gradient(29% 48%, #1751A3 0%, #152E8E 49%);
    background:radial-gradient(circle,rgba(21,80,160,1) 0%,rgba(46,28,106,1) 100%);
    // height:506px
    z-index:100
    .image
      width:80%
      margin:0 auto
      overflow hidden
      .carsouel-img
        width:52%
        display:block
        float:right
        z-index 0
    .start-testnet
      width:30.6%
      position:absolute
      top:123px
      left:13.75%
      z-index:100
      .title
        width:100%
        height:45px
        font-size:56px
        font-weight:bold
        color:rgba(255,255,255,1)
        line-height:45px
      .entry
        margin-top:110px
        .wallet-page
          width:55.6%
          height:48px
          display:inline-block
          font-size:16px
          font-weight:bold
          color:rgba(255,255,255,1)
          line-height:48px
          text-align:center
          background: rgba(0,30,109,0.70);
          border: 1px solid #FFFFFF;
          border-radius:4px
          margin-right:15px
          cursor pointer
          &:hover
            opacity 0.9
        .explorer-page
          width:28.7%
          height:48px
          line-height:48px
          text-align:center
          display:inline-block
          font-size:16px
          font-weight:bold
          color:rgba(255,255,255,1)
          background: rgba(0,30,109,0.70);
          border: 1px solid #FFFFFF;
          border-radius:4px
          cursor pointer
          &:hover
            opacity 0.9
    .Bounty-area
      position:absolute
      right: 12.75%
      top:142px
      color: #FFFFFF
      text-align:right
      z-index 100
      .title
        font-family: Arial-BoldMT
        font-size: 40px
        margin-bottom:25px
        font-weight 600
      .upto
        font-family: ArialMT
        font-size: 30px
        .amount-color
          color:#f3c759
      .addsign
        font-size: 28px
      .giveaway
        font-family: Arial-BoldMT
        font-size: 26px
        .amount-color
          color:#f3c759
      .information
        font-family: ArialMT
        font-size: 14px
        cursor:pointer
        margin-top 80px
        display inline-block
        height 44px
        width 196px
        background-color #F3C759
        border-radius 6px
        text-align center
        line-height 44px
        text-decoration none
        font-size 18px
</style>

<style>
  .carousel .el-carousel{
    width:62.5%;
    margin:0 auto;
  }
  .carousel .el-carousel__container{
    height:500px;
  }
  .carousel .el-carousel__arrow{
    display: none;
  }
  .carousel .el-carousel__indicators{
    left:35%;
    bottom:18px;
  }
  .carousel .el-carousel__indicator{
    width:10px;
    height:10px;
    margin-right:10px;
    background:rgba(255,255,255,1);
    opacity: 0.3;
    border-radius:50%;
    padding:0px
    /* margin-bottom: 18px; */
  }
  .carousel .el-carousel__button{
    display: none;
  }
</style>

