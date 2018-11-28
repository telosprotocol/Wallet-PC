<template>
  <div class="footer">
    <div class="footer-area">
      <div class="copy-term">
        <div class="copy">Copyright © 2018 Telos Foundation All rights reserved</div>
        <div class="term">
          <a class="terms" href="https://www.topnetwork.org/terms">Terms Of Service</a>
          <span>|</span>
          <a class="terms" href="https://www.topnetwork.org/policy">Privacy Policy</a>
        </div>
      </div>
      <div class="emailsubmit">
        <input v-model="email" :class="{error:errEmail}" type="e-mail" placeholder="Enter your email" class="email-input">
        <span class="btn" @click="addEmailInfo()">STAY TUNED</span>
        <ul class="linklist">
          <li @click="openMedium">Medium</li>
          <li @click="openFace">Facebook</li>
          <li @click="openBlog">Blog</li>
          <li @click="openTwitter">Twitter</li>
          <li @click="openTelegram">Telegram</li>
          <li class="wechat-item" @mouseenter="showpic" @mouseleave="hidepic">WeChat
            <img v-if="show" src="@/assets/images/erweima.png" class="wechat">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { addContactInfo } from '@/api/fetch'
export default {
  name: 'VFooter',
  data() {
    return {
      show: false,
      email: '',
      message: '0',
      errEmail: ''
    }
  },
  methods: {
    openMedium() {
      window.open('https://medium.com/top-network', '_blank')
    },
    openFace() {
      window.open('https://www.facebook.com/topnetworktop/', '_blank')
    },
    openBlog() {
      window.open(' https://www.topnetwork.org/blog', '_blank')
    },
    openTwitter() {
      window.open('https://twitter.com/topnetwork_top', '_blank')
    },
    openTelegram() {
      window.open('https://t.me/topnetwork_top', '_blank')
    },
    showpic() {
      this.show = true
    },
    hidepic() {
      this.show = false
    },
    addEmailInfo() {
      let isemail = this.checkEmail(this.email)
      if (!isemail) {
        this.errEmail = true
        this.$ga.event('sendBtn', 'click', 'Email_error')
        return false
      }
      const isUpdate = 1
      addContactInfo(this.email, this.message, isUpdate)
        .then(res => {
          if (res.Result === 1) {
            this.email = ''
            this.$toast({
              'toastMsg': 'We’ll notify you with the latest news, recent bounties and other activities via this email. Stay tuned!'
            })
          } else if (res.Result === 0 && res.errorCode === 10001) {
            this.$toast({
              'toastMsg': 'Please leave a message so we can better communicate with you.'
            })
            return false
          }
        })
    },
    checkEmail(s) {
      var regu =
                    /^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+.){1,63}[A-Za-z0-9]+$/
      var re = new RegExp(regu)
      if (re.test(s)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer{
    width:100%;
    background:#061b55;
    height: 140px;
    .footer-area{
      width:938px;
      height: 140px;
      // overflow: hidden;
      margin:0 auto;
      .copy-term{
        width:418px;
        margin-right:89px;
        margin-top:41px;
        float: left;
        .copy{
          text-align:left;
          width:100%;
          height:29px;
          font-size:16px;
          font-family:Arial;
          font-weight:400;
          line-height:29px;
          color:rgba(65,84,99,1);
        }
        .term{
          text-align:left;
          width:100%;
          height:17px;
          font-size:16px;
          font-family:Arial;
          font-weight:400;
          line-height:17px;
          color:rgba(65,84,99,1);
          span{
            margin:0 5px;
          }
          a{
            border-bottom: 1px solid rgba(65,84,99,1);
            padding-bottom: 1px;
          }
        }
      }
      .emailsubmit{
        float: left;
        margin-top:26px;
        text-align: left;
        width:431px;
        .email-input{
          background:#061b55;
          color:#415463;
          border: 0px;
          border-bottom: 1px solid #77BBD3;
          margin-right: 20px;
          font-size:16px;
        }
        .btn{
          width:140px;
          height:40px;
          background:rgba(0,89,165,1);
          text-align: center;
          line-height: 40px;
          border-radius:66px;
          display: inline-block;
          font-size:14px;
          font-family:PF Din Text Universal;
          font-weight:500;
          color:rgba(255,255,255,1);
          cursor: pointer;
        }
        .linklist{
          width: 100%;
          margin-top:21px;
          height:17px;
          // overflow: hidden;
          li{
            float: left;
            margin-right: 16px;
            height:17px;
            font-size:16px;
            font-family:Arial;
            font-weight:400;
            line-height:17px;
            color:rgba(119,187,211,1);
            cursor: pointer;
          }
          .wechat-item{
            position: relative;
            .wechat{
              position: absolute;
              left:-45px;
              top:-135px;
              width:129px;
              height: 129px;
            }
          }
        }
      }
    }
  }
</style>
