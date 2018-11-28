
<template>
  <div class="transfer-receipt">
    <div class="transction">
      <span class="send" @click="openTransfer">Send</span>
      <span class="send" @click="openRecepit">Receive</span>
    </div>
    <div id="mask" class="mask"></div>
    <div ref="transfer" class="transfer-area">
      <div class="title">Send</div>
      <div class="beneficiary">To:</div>
      <textarea ref="toAdress" v-model="toAdress" spellcheck ="false" class="transfer-input" placeholder="TOP testnet wallet address" @input="getProperty()" />
      <div v-if="showAlias" class="property">Alias name:{{ property }}</div>
      <span v-show="notice" class="notice1">*{{ notice }}</span>
      <div v-if="!showPop" class="telegraph">Don't know who to send test tokens to? Get an address from our Telegram group! <a href="https://t.me/topnetwork_top" class="goto" target="_blank">GO>></a></div>
      <div v-if="showPop" class="telegraph">You have sent to this address before! Get a new address from our Telegram group to earn TOP token rewards! <a class="goto" href="https://t.me/topnetwork_top" target="_blank">GO>></a></div>
      <div class="amount_area">
        <div>Amounts</div>
        <input v-model="amount" onkeyup="if(isNaN(value))execCommand('undo')" type="text" placeholder="at least 0.001" class="amount-input">
      </div>
      <div class="item">
        <span class="balance">Balance: {{ balance }} Test token
          <span v-show="amount_notice" class="notice2">*{{ amount_notice }}</span>
        </span>
      </div>
      <!-- <div class="invite-area">
        <div>Invite code</div>
        <input v-model="$store.state.user.code" type="text" placeholder="Automatic filling or manual filling" class="invite-code">
      </div> -->
      <div class="sure-close">
        <span class="sure btn" @click="transferOutBalance()">Send</span>
        <span class="btn close" @click="closeTransfer">Cancel</span>
      </div>
    </div>
    <div ref="receipt" class="transfer-area">
      <div class="transfer-party">Request</div>
      <div class="beneficiary">Wallet Address:</div>
      <div class="public-key">{{ address }}</div>
      <div class="copy_text">*copy the wallet address and send it to payor</div>
      <div class="sure-close">
        <span :data-clipboard-text="address" class="sure btn copyBtn" @click="closeRecepit">Copy</span>
      </div>
    </div>
    <div ref="collection" class="toggle-area">
      <img src="@/assets/images/free_token.png" class="image">
      <!-- <div class="text">100000 Test tokens has arrived</div> -->
      <div class="sure" @click="sureCollection">YES</div>
    </div>
    <create-modal :show="showCreateModal"></create-modal>
    <request-modal :show="showrequestModal"></request-modal>
    <reward-modal :show="showRewardModal"></reward-modal>
    <noreward-modal :show="shownoRewardModal"></noreward-modal>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { transferOut, accountInfo, queryAllProperty, getuserinfo, checkIsTransferAddress } from '@/api/fetch'
import { genKey } from '@/utils/common'
import Clipboard from 'clipboard'
import createModal from '@/components/base/modal/createWalletModal'
import rewardModal from '@/components/base/modal/rewardNotice'
import requestModal from '@/components/base/modal/requestModal'
import norewardModal from '@/components/base/modal/norewardNotice'
// const Base64 = require('js-base64').Base64
export default {
  name: 'Transfer',
  components: {
    createModal, rewardModal, requestModal, norewardModal
  },
  data() {
    return {
      fee: 0,
      property: '-',
      toAdress: '',
      amount: '',
      notice: '',
      amount_notice: '',
      sign: '',
      showAlias: false,
      showPop: false
    }
  },
  computed: {
    balance() {
      return Number(this.$store.state.user.balance).toFixed(3)
    },
    give() {
      return this.$store.state.user.give
    },
    address() {
      return this.$store.state.user.address
    },
    showCreateModal() {
      return this.$store.state.modal.createModal
    },
    showRewardModal() {
      return this.$store.state.modal.rewardModal
    },
    showrequestModal() {
      return this.$store.state.modal.requestModal
    },
    shownoRewardModal() {
      return this.$store.state.modal.norewardModal
    }
  },
  watch: {
    amount(value, oldVal) {
      if (value) {
        if (value.toString().indexOf('.') === -1) {
          if (value.toString().length > 30) {
            this.amount = oldVal
          } else if (Number(value) <= 0) {
            // 判断正数
            if (value.toString().indexOf('0') === 0) {
              this.amount = value
            } else {
              this.amount = ''
            }
          }
        } else {
          // this.amount = ''
          let count = value.match(/\./g).length
          if (count > 1) {
            this.amount = oldVal
          }
          let floatLen = value.toString().split('.')[1].length
          if (Number(value) < 0) {
            this.amount = oldVal
          }
          if (floatLen > 3) {
            this.amount = oldVal
          }
        }
        // 输入金额不能超过余额
        if (Number(value) > this.balance) {
          this.amount_notice = 'Insufficient balance'
        } else {
          this.amount_notice = ''
        }
        // this.getFee(value)
      } else {
        this.amount = ''
      }
    },
    toAdress(newVal, oldVal) {
      let account = this.$store.state.user.address
      if (!newVal) {
        this.showPop = false
        this.notice = 'The address must not be empty'
        this.property = ''
        return
      } else if (newVal.trim() === account) {
        this.notice = "Can't transfer money to yourself"
        return
      } else {
        this.toAdress = newVal.trim()
        this.notice = ''
        this.getProperty(newVal)
      }
    }
  },
  methods: {
    // 打开转账窗口
    openTransfer() {
      // if (isLogin(this)) {
      // if (true) {
      this.$refs.transfer.style.display = 'block'
      var mask = document.getElementById('mask')
      mask.style.width = '100%'
      mask.style.height = '100%'
      this.$refs.toAdress.focus()
      // this.toAdress = ''
      this.amount = ''
      // } else {
      //   this.$store.commit('setCreateModalShow', true)
      // }
    },
    // 关闭转账窗口
    closeTransfer() {
      this.$refs.transfer.style.display = 'none'
      var mask = document.getElementById('mask')
      mask.style.width = '0px'
      mask.style.height = '0px'
      this.amount_notice = ''
      this.property = ''
      this.toAdress = ''
    },
    // 打开收款窗口
    openRecepit() {
      this.$store.commit('setRequestModalShow', true)
    },
    isLogin() {
      if (this.$store.state.user.uid) {
        return true
      } else {
        return false
      }
    },
    // 关闭收款窗口
    closeRecepit() {
      const clipboard = new Clipboard('.copyBtn')
      clipboard.on('success', e => {
        this.$toast({
          'toastMsg': 'Copy successfully'
        })
        clipboard.destroy()
      })
      this.$refs.receipt.style.display = 'none'
    },
    transferOutBalance() {
      var account = this.address
      if (this.notice) {
        return
      }
      if (!this.toAdress) {
        this.notice = 'The address must not be empty'
        return
      } else {
        this.notice = ''
      }
      if (!this.amount) {
        this.amount_notice = 'The amount must not be empty'
        return
      }
      if (Number(this.amount) <= 0) {
        this.amount_notice = 'The amount should not be less than or equal to 0'
        return
      }
      if (Number(this.amount) > this.balance) {
        this.amount_notice = 'Insufficient balance'
        return
      } else {
        this.amount_notice = ''
      }
      accountInfo(this.toAdress).then(res => {
        if (res.Result === 1) {
          genKey(this)
          accountInfo(account).then(res => {
            if (res.Result === 1) {
              let user = this.$store.state.user
              user.lasthash = res.lasthash
              user.balance = res.balance
              this.$store.commit('SETBALANCE', res.balance)
              this.$store.commit('SETLASTHASH', res.lasthash)
              let lasthash_new = res.lasthash
              let mic_amount = Number(this.amount) * 1000000
              transferOut(
                account,
                this.toAdress,
                '$$',
                lasthash_new,
                this.sign,
                mic_amount
              ).then(res => {
                if (res.Result === 1) {
                  getuserinfo().then(res => {
                    this.$store.commit('SET_USERDATA', res.data)
                    if (this.$store.state.user.bindBot) {
                      this.$store.commit('setNoRewardModalShow', true)
                    } else {
                      this.closeTransfer()
                      this.$store.commit('setRewardModalShow', true)
                    }
                    this.notice = ''
                    this.amount_notice = ''
                    this.amount = ''
                    this.toAdress = ''
                    this.closeTransfer()
                  }).catch(err => {
                    console.log(err)
                  })
                  this.notice = ''
                  this.amount_notice = ''
                  this.amount = ''
                  this.toAdress = ''
                }
                accountInfo(account).then(res => {
                  if (res.Result === 1) {
                    let user = this.$store.state.user
                    user.lasthash = res.lasthash
                    user.balance = res.balance
                    this.$store.commit('SETBALANCE', res.balance)
                    this.$store.commit('SETLASTHASH', res.lasthash)
                    this.notice = ''
                    this.amount_notice = ''
                    this.amount = ''
                    this.toAdress = ''
                    this.closeTransfer()
                  }
                }).catch(res => {
                  console.log('查询账户信息失败')
                })
                this.closeTransfer()
              }).catch(err => {
                console.log(err)
                this.$toast({
                  'toastMsg': 'Transfer failed, please try again later.'
                })
                this.closeTransfer()
              })
            }
          }).catch(res => {
            console.log('查询账户信息失败')
          })
        } else {
          this.$toast({
            'toastMsg': 'sorry，the wallet address does not exist'
          })
          return
        }
      })
    },
    getProperty() {
      queryAllProperty(this.toAdress).then(res => {
        if (res.Result === 1) {
          if (Object.getOwnPropertyNames(res).length > 1) {
            this.property = ''
            this.showAlias = true
          } else {
            this.showAlias = false
          }
          for (var index in res) {
            if (index !== 'Result') {
              this.property += res[index]
            }
          }
          checkIsTransferAddress(this.$store.state.user.userId, this.toAdress).then(res => {
            if (res.data === null) {
              this.showPop = false
            } else {
              this.showPop = true
            }
          })
        } else {
          this.property = '-'
          this.showAlias = false
        }
        if (this.property && this.property !== '-') {
          let str = this.property.toString()
          str = str.substr(0, str.length)
          this.property = str
        }
      })
      // accountInfo(this.toAdress).then(res => {
      //   debugger
      //   console.log(res)
      //   if (res.Result === 1) {
      //     // let user = this.$store.state.user
      //     // user.lasthash = res.lasthash
      //     // user.balance = res.balance
      //     // this.$store.commit('SET_USERDATA', JSON.parse(user))
      //     console.log(res)
      //   }
      // }).catch(res => {
      //   console.log('查询账户信息失败')
      // })
    },
    // 关闭创建property窗口
    sureCollection() {
      this.$refs.collection.style.display = 'none'
      var mask = document.getElementById('mask')
      mask.style.width = '0px'
      mask.style.height = '0px'
      this.openTransfer()
    }
  }
}
</script>

<style lang="stylus" scoped>

input::-webkit-outer-spin-button, input::-webkit-inner-spin-button
  -webkit-appearance none
input[type='number']
  -moz-appearance textfield
.transfer-receipt
  width:100%
.title
  color #000
  border-bottom 2px solid #e5e5e5
  height 30px
  line-height 30px
  font-size 20px
.transction
  margin-top 20px
  .send
    color #ffffff
    display inline-block
    width 100px
    height 36px
    line-height 36px
    font-size 16px
    text-align center
    border-radius 2px
    background #5968F0
    margin-right 15px
    cursor pointer
.mask
  position:absolute
  bottom:0
  right:0
  background:black
  opacity:.6
  width:0
  height:0
  z-index: 998
.transfer-area
  padding 20px
  width 500px
  position fixed
  left 50%
  top 20%
  transform translateX(-50%)
  display none
  font-size 16px
  background #fff
  z-index 1000
  .transfer-party
    font-weight 550
  .beneficiary
    margin-top 25px
  .transfer-input
    width 100%
    height 150px
    padding-left 10px
    margin 10px 0 0px 0
    opacity 0.7
    resize none
    padding-top 10px
    border 1px solid #888888
    text-decoration none
    border-radius:2px
  .property
    position absolute
    left 30px
    top 200px
    color #888888
  .telegraph
    width:100%
    background:#ffebeb
    border-radius:2px
    color:#ff5b5b
    padding:10px 10px
    line-height:20px
    margin-bottom:30px
    .goto
      display:inline-block
      color:#5968f0
      cursor:pointer
  .default-receipt
    position absolute
    right 30px
    top 230px
    color #5968F0
    cursor pointer
  .notice1
    // position absolute
    // left 20px
    // top 256px
    display:block;
    margin:10px 0;
    color #FF5B5B
    font-size 14px
  .amount_area
    margin-top 30px
  .amount-input
    width 100%
    height 50px
    margin 10px 0 20px 0
    padding-left 10px
    border 1px solid #888888
    border-radius:2px
  .item
    font-size 14px
    .balance
      display inline-block
      text-align left
      width 75%
      .notice2
        color #FF5B5B
        font-size 14px
        display block
    .free
      display inline-block
      text-align center
      width 45%
      vertical-align top
  .token_area
    height 20px
    line-height 20px
    width 100%
    background rgba(255, 235, 235, 1)
    color #FF5B5B
    font-size 12px
    margin-top 20px
    a
      color #5968F0
      text-decoration none
      padding-left 20px
  .invite-area
    width:100%
    margin-top:30px
    .invite-code
      width 100%
      height 50px
      margin 10px 0 20px 0
      padding-left 10px
      border 1px solid #888888
      border-radius:2px
  .sure-close
    width 100%
    margin 0 auto
    margin-top 30px
    position relative
    height 40px
    .btn
      display inline-block
      width 92px
      height 32px
      color #ffffff
      text-align center
      line-height 32px
      border-radius 2px
      cursor pointer
      font-size 14px
    .sure
      background #5968F0
      position absolute
      left 0px
      top 0
    .close
      background #FFF
      position absolute
      left 120px
      top 0
      color #5968F0
  .public-key
    margin 20px 0 20px 0
  .copy_text
    color #888888
    font-size 14px
    margin-top 30px
.toggle-area
    position: fixed
    left: 50%
    top: 30%
    transform translateX(-50%)
    display: none
    width: 500px
    height: 270px
    background: #fff
    z-index:1000
    .image
      width:96%
      margin 10px auto
      height: 80%
      opacity: 0.8
      display block
    .text
      width: 350px
      position: absolute
      left: 90px
      top: 50px
      font-weight:550
      font-size: 24px
      text-align center
      color #ffffff
    .sure
      width: 92px
      height: 24px
      color: #ffffff
      text-align:center
      line-height: 24px
      background:#5968f0
      margin:10px auto
      font-size 14px
      cursor pointer
</style>
