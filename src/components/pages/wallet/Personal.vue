<template>
  <div>
    <div class="personal">
      <img src="@/assets/images/small-banner.png" class="banner" @click="openActivity">
      <div class="info-area">
        <div class="path-language">
          <div class="path"><a href="https://www.topnetwork.org">Home</a>/ <router-link to="/" tag="a">Testnet</router-link> / Wallet</div>
        </div>
        <div class="wallet-title">My wallet</div>
        <free-collection/>
        <div class="account-name">
          <span class="account-title">Login account:</span>
          <span class="name">{{ $store.state.user.displayName }}</span>
        </div>
        <div class="key">
          <span class="selfkey">Private key:</span>
          <span class="keyword">
            <div v-if="pwdType">{{ $store.state.user.privateKey }}</div>
            <div v-else>******************</div>
          </span>
          <span class="eye">
            <img :src="seen?seenImg:unseenImg" class="closeEye" @click="changeType()">
          </span>
        </div>
        <div class="account-name">
          <span class="public-title">Public key:</span>
          <span class="name">{{ $store.state.user.publicKey }}</span>
        </div>
        <div class="account-name">
          <span class="address-title">Wallet address:</span>
          <span class="name">{{ $store.state.user.address }}</span>
          <span class="submit" @click="openBot()">Submit address to our Telegram bot for rewards</span>
        </div>
        <div class="setName">
          <span class="name">Alias name:</span>
          <span class="noset">{{ Aliasesname }}</span>
          <span v-if="!Aliasesname" v-cloak class="register" @click="openProperty">Create alias name</span>
        </div>
        <set-property v-if="showProp"></set-property>
        <div class="warnning">Warning: Test token is only used for testnet, it has no value and will be cleared out from your account after test.</div>
        <transfer-receipt/>
      </div>
    </div>
  </div>
</template>

<script>
import SetProperty from '@/components/pages/wallet/alert/SetProperty'
import FreeCollection from '@/components/pages/wallet/alert/FreeCollection'
import TransferReceipt from '@/components/pages/wallet/alert/TransferReceipt'
const Base64 = require('js-base64').Base64
export default {
  name: 'Personal',
  components: {
    SetProperty,
    FreeCollection,
    TransferReceipt
  },
  data() {
    return {
      pwdType: false,
      password: { psd: '1234567890' },
      seen: '',
      seenImg: require('@/assets/images/eye_open.png'),
      unseenImg: require('@/assets/images/eye_close.png'),
      show: true
      // alias: localStorage.getItem('alias')
    }
  },
  computed: {
    account() {
      return Base64.decode(this.$store.state.top.account)
    },
    showProp() {
      return this.$store.state.top.showProp
    },
    Aliasesname() {
      return this.$store.state.user.alias
    }
  },
  methods: {
    // 密码显示隐藏
    changeType() {
      this.seen = !this.seen
      this.pwdType = !this.pwdType
    },
    openProperty() {
      this.$store.commit('SetShowProp', true)
    },
    openBot() {
      window.open('https://t.me/TOPNetworkBot', '_blank')
    },
    openActivity() {
      this.$router.push('/activepage')
    }
  }
}
</script>

<style lang="stylus" scoped>
[v-cloak]{
  display:none !important;
}
.info-area{
  padding: 19px 20px;
}
.banner {
  width: 100%
  cursor: pointer
  // margin-bottom: 20px
  .image{
    width:100%
  }
}
.personal:hover >>> .change {
  display: inline-block
}

.setName {
  margin-top: 17px
  font-size: 16px

  .name {
    display: inline-block
    // width: 105px
    // height: 16px
    font-size: 16px
    font-weight: 400
    color: rgba(68, 68, 68, 1)
  }

  .noset{
    // margin: 0 13px
    // width:75px
    height:12px
    font-size:14px
    font-weight:400
    color:rgba(136,136,136,1)
  }

  .register{
      width:103px
      height:13px
      font-size:14px
      font-weight:400
      color:#5968F0
      cursor pointer
  }
}

.personal {
  width: 100%
  margin: 0 auto
  background: rgba(255, 255, 255, 1)
  border-radius: 2px
  box-shadow: 5px 5px 10px rgba(157, 166, 242, 0.2)
  font-size: 16px

  .path-language {
    width: 100%
    overflow: hidden

    .path {
      float: left
      // width: 120px
      font-size: 16px
      font-family: MicrosoftYaHei
      font-weight: 400
      color: rgba(148, 148, 148, 1)
    }

    .language {
      float: right
      border: 1px solid #ccc
    }
  }

  .wallet-title {
    width: 100%
    margin-top: 25px
    padding-bottom: 9px
    border-bottom: 1px solid rgba(229, 229, 229, 0.5)
    font-size: 18px
    font-family: Arial
    font-weight: bold
    color: rgba(68, 68, 68, 1)
  }

  .account-name {
    width: 100%
    margin-top: 17px

    .account-title {
      display: inline-block
      // width: 113px
    }

    .name {
      color: #888
      font-size: 14px
    }

    .submit{
      display inline-block
      color:#5968f0
      text-decoration:underline
      font-size:14px
      cursor pointer
      margin-left:10px
    }
    .public-title {
      display: inline-block
      // width: 85px
    }

    .address-title {
      display: inline-block
    }
  }

  .key {
    margin-top: 17px
    font-size: 16px

    .selfkey {
      display: inline-block
      // width: 90px
      // height: 17px
      font-size: 16px
      font-weight: 400
      color: rgba(68, 68, 68, 1)
    }

    .keyword {
      display: inline-block
      height: 6px
      font-size: 14px
      font-weight: 400
      color: rgba(136, 136, 136, 1)
    }

    .eye {
      .closeEye {
        display: inline-block
        width: 20px
        height: 15px
        margin-left: 7px
      }
    }
  }

  .warnning {
    margin-top: 19px
    color: #FF5B5B
    word-break: break-word
    line-height: 30px
    text-align: left
    padding: 0 10px
    background: rgba(255, 235, 235, 1)
  }
  @media screen and (max-width:1600px){
    .warnning{
      font-size:13px;
    }
  }
}
</style>
