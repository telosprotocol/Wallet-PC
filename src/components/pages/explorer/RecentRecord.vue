<template>
  <div class="network">
    <div class="record">Latest Transactions on Testnet </div>
    <div class="transaction-record">
      <ul class="allResult">
        <li>From</li>
        <li>To</li>
        <li>HASH</li>
        <li class="amount-item">Vol</li>
        <li class="short-item">Status</li>
        <li class="endmarginr middle-item">time</li>
      </ul>
      <ul v-for="item in transactionList" :key="item.id" class="result">
        <li class="hash-style">{{ item.sender }}</li>
        <li class="hash-style">{{ item.receiver }}</li>
        <li class="hash-style">{{ item.tx_digest }}</li>
        <li class="amount-item">
          <div class="color1">{{ item.amount }}</div>
          <!-- <div class="twoline">0.00</div> -->
        </li>
        <li class="small short-item"><span class="circle"/>success</li>
        <li class="small middle-item endmarginr">{{ item.rpc_time }}</li>
      </ul>
      <div v-if="lcount" class="paginations">
        <el-pagination
          :current-page.sync="currentPage1"
          :page-size="15"
          :total="lcount"
          layout="total, prev, pager, next"
          @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>

<script>

import { getlatelyHistory } from '@/utils/common'
export default {
  name: 'RecentRecord',
  data() {
    return {
      account: '', // 钱包地址
      currentPage1: 1 // 当前页
    }
  },
  computed: {
    transactionList() {
      return this.$store.state.top.transactionList
    },
    lcount() {
      return this.$store.state.top.lcount
    }
  },
  created() {
    this.newLatelyHistory()
    this.PollingLatelyResult()
  },
  beforeDestroy() {
    clearInterval(this.recentResultId)
  },
  methods: {
    // 请求最近交易记录
    newLatelyHistory() {
      var lpage = Number(sessionStorage.getItem('lpage'))
      if (!lpage) {
        getlatelyHistory(this, 0, 15)
      } else {
        this.currentPage1 = lpage + 1
        getlatelyHistory(this, lpage, 15)
      }
    },
    // 点击请求近期交易记录
    handleCurrentChange(val) {
      sessionStorage.setItem('lpage', val - 1)
      getlatelyHistory(this, val - 1, 15)
    },
    PollingLatelyResult() {
      this.recentResultId = setInterval(() => {
        var lpage = Number(sessionStorage.getItem('lpage'))
        if (!lpage) {
          getlatelyHistory(this, 0, 15)
          // handleAmount(this.transactionList, 'amount')
          // arrySplice(this.transactionList, 'sender')
        }
      }, 5000)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .network
    width: 62.5%
    margin: 0 auto
    margin-top:16px
    position:relative
    margin-bottom:20px
    .record
      width: 100%
      background: #ffffff
      padding: 21px 0 16px 21px
      font-size:18px
      font-weight:bold
      color:rgba(68,68,68,1)
    .transaction-record
      width:100%
      background:#fff
      .allResult
        width: 100%
        background:rgba(244,245,255,1)
        padding-left: 21px
        font-weight: 550
        height: 40px
        line-height: 40px
        text-align:center
        .amount-item
          width:17%
        .short-item
          width:7.5%
        .middle-item
          width:15%
        .endmarginr
          margin-right:0
      .allResult li
        float: left
        width: 18%
        margin-right:1%
      .result
        width: 100%
        background: #fff
        padding-left: 30px
        height: 85px
        border-bottom: 1px solid #ccc
        text-align:center
        .amount-item
          width:17%
          .color1
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
        .short-item
          width:8.5%
        .middle-item
          width:15%
        .endmarginr
          margin-right:0
      .result li
        float: left
        width: 18%
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
        .twoline
          width:100%
          height:35px
          line-height:35px
          font-weight:400
          color:rgba(136,136,136,1)
          font-size:15px
        .circle
          width:8px
          height:8px
          display: inline-block
          margin-right:5px
          background:green
          border-radius:50%
      .amount-item
        width:17%
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
      .endmarginr
        margin-right:0
      .small
        line-height:85px
</style>

<style lang="stylus">
.paginations
  width:100%
  height 82px
  margin: 0 auto
  overflow hidden
  // padding:0 25%
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
    text-align:center
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
