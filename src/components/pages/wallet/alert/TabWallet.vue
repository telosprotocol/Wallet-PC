<template>
  <div class="tableWallet">
    <div class="money">
      <span class="wallet">My Wallet</span><span ref="switch" class="change" @click="tabWallet">switch</span>
      <div id="mask" class="mask"/>
    </div>
    <div ref="toggle" class="toggle-area">
      <div class="toggle-key">Switch Private Key</div>
      <div class="key-input">
        <span class="personalKey">Private key:</span>
        <input ref="newAccount" v-model="newAccount" type="text" name="text" placeholder="" class="input-text">
        <span/>
      </div>
      <div class="sure-close">
        <span class="sure" @click="switchWallet()">YES</span>
        <span class="close" @click="closeKey">Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
import { fromByteArray } from 'base64-js'
import bitcoinjs from 'bitcoinjs-lib'
const Base64 = require('js-base64').Base64
import { getInfo, getProperty, AddressIsExit } from '@/utils/common'
import { myHistory } from '@/utils/common'
export default {
  name: 'TabWallet',
  data() {
    return {
      newAccount: '',
      address: ''
    }
  },
  methods: {
    // 打开切换私钥弹窗
    tabWallet() {
      this.$refs.toggle.style.display = 'block'
      var mask = document.getElementById('mask')
      mask.style.width = '100%'
      mask.style.height = '100%'
      this.$refs.newAccount.focus()
      this.newAccount = ''
    },
    // 关闭切换私钥窗口
    closeKey() {
      this.$refs.toggle.style.display = 'none'
      var mask = document.getElementById('mask')
      mask.style.width = '0px'
      mask.style.height = '0px'
    },
    switchWallet() {
      this.newAccount = this.newAccount.trim()
      if (!this.newAccount) {
        this.$toast({
          'toastMsg': 'the wallet address must not be empty'
        })
        return
      }
      AddressIsExit(this.newAccount, res => {
        if (res.Result === 0) {
          this.$toast({
            'toastMsg': 'sorry，the wallet address does not exist'
          })
          return
        } else {
          this.getSignByAccount(this.newAccount)
          getInfo(this, this.newAccount)
          this.address = Base64.encode(this.newAccount)
          localStorage.account = this.address
          getProperty(this)
          this.$store.commit('SetAccount', this.address)
          myHistory(this, 0, 15)
          this.$toast({
            'toastMsg': 'Switching wallet successfully'
          })
          this.closeKey()
          this.newAccount = ''
        }
      })
    },
    getSignByAccount(account) {
      var bitjs = bitcoinjs
      var ecpair = bitjs.ECPair.makeRandom()
      this.address = account
      var tx = {
        transaction_type: 0,
        sender_addr: this.address,
        receiver_addr: this.address,
        property_key: '$$',
        transaction_params: '',
        timestamp: '0',
        last_msg_digest: '0',
        random_nounce: '0',
        work_proof: '0'
      }

      var str =
          tx.sender_addr +
          tx.receiver_addr +
          tx.property_key +
          tx.transaction_params +
          tx.transaction_type +
          tx.timestamp +
          tx.random_nounce +
          tx.work_proof +
          tx.last_msg_digest
      var digest = bitjs.crypto.sha256(str)
      this.digest = fromByteArray(digest)
      var txSign = ecpair.sign(digest)
      this.sign = fromByteArray(txSign)
      localStorage.sign = this.sign
    }
  }
}
</script>

<style lang="stylus" scoped>
  .money
    position: relative
    margin-top: 28px
    border-bottom: 1px solid #cccccc
    padding-bottom: 7px
    width:100%
    .wallet
      font-size:18px
      line-height:19px
      height:19px
      font-weight:bold
      color:rgba(68,68,68,1)
      display: inline-block
      margin-right: 11px
    .change
      color: blue
      display: none
      width:42px
      height:12px
      font-size:14px
      font-weight:400
      color:rgba(89,104,240,1)
      line-height:12px
      cursor pointer
  // .money:hover .change
  //     display: inline-block
    .mask
      position: fixed
      bottom:0
      right:0
      background:black
      opacity:.6
      width:0
      height:0
      z-index: 1
  .toggle-area
    position: fixed
    left: 50%
    top: 30%
    transform translateX(-50%)
    display: none
    width: 500px
    height: 180px
    background: #fff
    padding: 20px 0 0 20px
    z-index:1000
    .toggle-key
      font-size: 16px
      font-weight: 550
    .key-input
      margin-top: 15px
      .personalKey
        display:inline-block
        margin-right: 15px
      .input-text
        padding-left:10px
        height: 40px
        width: 350px
        border 1px solid #888888
    .sure-close
      margin-top: 30px
      .sure
        display: inline-block
        width: 80px
        height: 32px
        color: #ffffff
        text-align:center
        line-height: 32px
        background:#5968F0
        margin-right: 20px
        cursor pointer
      .close
        display: inline-block
        width: 80px
        height: 32px
        line-height: 32px
        background:#fff
        color #5968F0
        margin-right: 20px
        cursor pointer
</style>
