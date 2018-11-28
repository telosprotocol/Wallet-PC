<template>
  <div class="app-container">
    <div class="wallet-wrapper">
      <div class="wallet-page">
        <personal />
        <div class="search">
          <div class="record">
            <span class="my">My Transaction Records</span>
          </div>
        </div>
        <div class="my-transaction-record">
          <ul class="myResult">
            <li>Address</li>
            <li>HASH</li>
            <li>Vol</li>
            <li class="short-item">Status</li>
            <li class="endmarginr middle-item">Time</li>
          </ul>
          <ul v-for="item in list" :key="item.id" class="perResult">
            <li>
              <div class="oneline">{{ item.source }}</div>
              <div class="twoline">{{ item.source_tag }}</div>
            </li>
            <li class="hash-style">{{ item.tx_digest }}</li>
            <li>
              <div :class="[item.amount<0?'color1':'color2']">{{ item.amount }}</div>
              <!-- <div v-if="item.amount<0" class="twoline">0.00</div>
              <div v-else class="twoline">-</div> -->
            </li>
            <li class="small short-item"><span class="circle"/>success</li>
            <li class="small middle-item endmarginr">{{ item.rpc_time }}</li>
          </ul>
          <div v-if="count" class="paginations">
            <div class="total">{{ count }} records in total</div>
            <el-pagination
              :current-page.sync="currentPage1"
              :page-size="15"
              :total="count"
              layout="total, prev, pager, next"
              @current-change="handleCurrentChange1"/>
          </div>
          <div v-if="!count" class="norecord">No records</div>
        </div>
      </div>
    </div>
    <common-footer/>
  </div>
</template>

<script>
import Personal from '@/components/pages/wallet/Personal'
import { accountPending, transferIn, accountInfo, getuserinfo } from '@/api/fetch'
import { myHistory, genKey } from '@/utils/common'
import CommonFooter from '@/components/pages/common/Footer'
// import { getCookie } from '@/store/modules/cookie.js'

// const Base64 = require('js-base64').Base64
export default {
  components: {
    Personal,
    CommonFooter
  },
  data() {
    return {
      account: '',
      currentPage1: 1, // 当前页
      sign: '',
      pending: false
    }
  },
  computed: {
    count() {
      return this.$store.state.top.count
    },
    list() {
      return this.$store.state.top.list
    }
  },
  mounted() {
    this.getMyHistory()
    this.PollingToTransfer()
    this.PollingResult()
  },
  beforeDestroy() {
    clearInterval(this.myResultId)
    clearInterval(this.transferId)
  },
  methods: {
    // 查询我的交易记录
    getMyHistory() {
      let account = this.$store.state.user.address
      var page = Number(sessionStorage.getItem('page'))
      if (!page) {
        myHistory(this, account, 0, 15)
      } else {
        this.currentPage1 = page + 1
        myHistory(this, account, page, 15)
      }
      myHistory(this, account, 0, 15)
    },
    // 点击请求我的交易记录
    handleCurrentChange1(val) {
      let account = this.$store.state.user.address
      sessionStorage.setItem('page', val - 1)
      myHistory(this, account, val - 1, 15)
    },
    // 5s刷新一次记录
    PollingResult() {
      let account = this.$store.state.user.address
      this.myResultId = setInterval(() => {
        var page = Number(sessionStorage.getItem('page'))
        if (!page) {
          myHistory(this, account, 0, 15)
        }
      }, 5000)
    },
    // 3s刷新一次转账接收
    PollingToTransfer() {
      this.transferId = setInterval(() => {
        this.getPendingInfo()
      }, 2000)
    },
    getPendingInfo() {
      let account = this.$store.state.user.address
      let vm = this
      accountPending(account, 1).then(res => {
        if (res.Result === 1) {
          var count = Number(res.count)
          if (count === 0) {
            return
          } else {
            for (let i = 0; i < count; i++) {
              let block = res.blocks[i].block
              let sender = res.blocks[i].sender
              let amount = Number(res.blocks[i].amount / 1000000).toFixed(3)
              vm.transIn(block, sender, amount)
            }
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    transIn(block, sender, amount) {
      if (this.pending) {
        return
      }
      this.pending = true
      let account = this.$store.state.user.address
      let lasthash = this.$store.state.user.lasthash
      let that = this
      genKey(this)
      transferIn(account, block, lasthash, sender, amount, this.sign).then(res => {
        that.pending = false
        if (res.Result === 1) {
          accountInfo(account).then(res => {
            if (res.Result === 1) {
              let user = this.$store.state.user
              user.lasthash = res.lasthash
              user.balance = res.balance
              this.$store.commit('SETBALANCE', res.balance)
              this.$store.commit('SETLASTHASH', res.lasthash)
              getuserinfo().then(res => {
                this.$store.commit('SET_USERDATA', res.data)
                // this.notice = ''
                // this.amount_notice = ''
                // this.amount = ''
                // this.toAdress = ''
                // this.closeTransfer()
              }).catch(err => {
                console.log(err)
              })
            }
          }).catch(res => {
            console.log('查询账户信息失败')
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wallet-wrapper
  padding-top:19px
  width:100%
  background:url('../../assets/images/background.png') no-repeat
  background-size:cover
  padding-bottom:50px
  .wallet-page
    width:62.5%
    margin:0 auto
    .search
      width:100%
      padding: 19px 20px 0 20px
      background:rgba(255,255,255,1)
      border-radius:2px
      box-shadow:5px 5px 10px rgba(157,166,242,0.2)
      margin-top:16px
      overflow: hidden
      .record
        float: left
        .my
          display: inline-block
          width:190px
          height:30px
          font-size:16px
          font-weight:400
          color:#000
          text-align: center
          font-size:16px
          font-weight:400
    .my-transaction-record
      width:100%
      background:#fff
      border-bottom:1px solid #eee
      .myResult
        width: 100%
        background:rgba(244,245,255,1)
        padding-left: 30px
        font-weight: 550
        height: 40px
        line-height: 40px
        text-align:center
        .short-item
          width:7.5%
        .middle-item
          width:16%
        .endmarginr
          margin-right:0
      .myResult li
        float: left
        width: 24%
        margin-right:1%
      .perResult
        width: 100%
        background: #fff
        padding-left: 30px
        height: 85px
        border-bottom: 1px solid #ccc
        text-align:center
        .short-item
          width:7.5%
        .middle-item
          width:16%
        .endmarginr
          margin-right:0
      .perResult li
        float: left
        width: 24%
        height:84px
        margin-right:1%
        .oneline
          width:100%
          height:50px
          line-height:50px
          color:rgba(68,68,68,1)
          text-overflow:ellipsis
          overflow:hidden
          white-space:nowrap
          font-size:15px
          font-weight:400
        .color1
          color:red
          font-size:15px
          font-weight:400
          width:100%
          height 84px
          text-align:center
          line-height:84px
        .color2
          color:green
          font-size:15px
          font-weight:400
          width:100%
          height 84px
          text-align:center
          line-height:84px
        .twoline
          width:100%
          height:35px
          line-height:35px
          font-weight:400
          color:rgba(136,136,136,1)
          font-size:15px
        .circle
          width:8%
          height:8%
          display: inline-block
          margin-right:1%
          background:green
          border-radius:50%
      .hash-style
        height:20px
        color:rgba(68,68,68,1)
        line-height:85px
        text-align:center
        text-overflow:ellipsis
        overflow:hidden
        white-space:nowrap
        font-size:15px
        font-weight:400
      .small
        line-height:85px
      .norecord
        width:100%
        height:103px
        font-size:16px
        font-weight:400
        color:rgba(68,68,68,1)
        border-bottom:1px solid rgba(229,229,229,1)
        line-height :103px
        text-align:center
</style>

<style lang="stylus">
.paginations
  width:100%
  height 82px
  margin: 0 auto
  overflow hidden
  display:flex
  justify-content:center
  .total
    width:35%
    float left
    text-align:right
    line-height:82px
    // margin-right:3%
    color:rgba(155,155,155,1)
  .el-pagination
    width:35%
    font-size:14px
    float:left
    // line-height:80px
    padding-top 28px
    text-align:left
    span
      display:none
    button
      min-width:4.4%
      font-size:14px
    .btn-prev
      padding-right:1.4%
    .btn-next
      padding-left:1.4%
    .el-pager li
      min-width:0
      width:24px
      height:24px
      line-height:24px
      text-align:center
      color:rgba(155,155,155,1)
    .el-pager li.active
      background:rgba(89,104,240,1)
      color:#fff
      border-radius:50%
</style>
