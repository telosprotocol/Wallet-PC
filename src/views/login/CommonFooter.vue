<template>
  <div class="footer">
    <div class="footer_main">
      <img src="@/assets/images/foot-logo.png" class="logo">
      <div class="left_area">
        <div>Copyright © 2018 Telos Foundation</div>
        <div>All rights reserved</div>
      </div>
      <div class="right_area">
        <div class="social">
          <a title="Medium" target="_blank" href="https://medium.com/@topnetwork" class="icon medium">
            <img src="@/assets/images/link3.png" class="link-logo">
          </a>
          <a title="Telegram" target="_blank" href="https://t.me/topnetwork_top" class="icon telegram">
            <img src="@/assets/images/link1.png" class="link-logo">
          </a>
          <a title="Twitter" target="_blank" href="https://twitter.com/topnetwork_top" class="icon twitter">
            <img src="@/assets/images/link2.png" class="link-logo endmargin">
          </a>
        </div>
        <div class="text">
          <a>Terms of Service |</a>
          <a>Privacy Policy</a>
        </div>
      </div>
    </div>
</div></template>

<script>
export default {
  name: 'CommonFooter'
}
</script>

<style lang="stylus" scoped>
  .footer
    // margin-top:90px
    background:#0E1456
    width:100%
    height:300px
    .footer_main
      width:62.5%
      margin:0 auto
      overflow:hidden
      padding-top:120px
      .logo
        float:left
        width:80px
        display:inline-block
      .left_area
        float:left
        margin-left:20px
        font-size:16px
        color:#fff
        line-height:25px
      .right_area
        float:right
        font-size:16px
        color:#fff
        cursor:pointer
        .social
          text-align:right
          .link-logo
            width:20px
            height 20px
            display inline-block
            margin-right:20px
            margin-bottom:20px
          .endmargin
            margin-right:0
    .top
      width:83px
      height:83px
      display:block
      text-align:center
      line-height:70px
      position: fixed
      right:13%
      bottom:10px
</style>
