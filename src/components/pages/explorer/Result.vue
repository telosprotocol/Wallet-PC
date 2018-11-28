<template>
  <div class="result">
    <div class="search">
      <div class="path">
        <div class="breadcrumbs"><router-link tag="a" to="/">Home</router-link> / Explorer</div>
      </div>
      <div class="searchArea">
        <input v-model="account" type="text" placeholder="Wallet address" class="search-border" @keyup="closeResult">
        <div class="search-btn" @click="searchTran">Search</div>
      </div>
    </div>
    <div v-show="!show" class="logo-sign"><img ref="arrowdown" src="@/assets/images/arrowdown.png" class="arrow" @click="arrowOpen"></div>
    <div v-show="show" ref="result" class="seacrh-result">
      <div class="result-title">Search Result</div>
      <ul v-if="address.length" class="result-items">
        <li class="long-item">Wallet Address:{{ address }}</li>
        <li class="short-item">Alias name：{{ property }}</li>
        <li>Creation time：{{ createtime }}</li>
        <li class="balance-item"> Banlance：{{ balance }}</li>
      </ul>
      <div v-if="!address.length" class="noresult">No data or Search content is not detailed !</div>
      <div v-if="list.length" class="paginations">
        <div v-if="list.length" class="record-page">Transaction Records</div>
        <div v-if="list.length" class="total-item">
          <div class="total">{{ count }} record(s) in total</div>
          <el-pagination
            v-if="list.length"
            :current-page.sync="currentPage1"
            :page-size="15"
            :total="count"
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"/>
        </div>
      </div>
      <ul v-if="list.length" class="allResult">
        <li>From</li>
        <li>HASH</li>
        <li>Vol</li>
        <li class="short-item">Status</li>
        <li class="endmarginr middle-item">Time</li>
      </ul>
      <div v-if="list.length" class="result">
        <ul v-for="item in list" :key="item.id" class="result-list">
          <li>
            <div class="oneline">{{ item.source }}</div>
            <div class="twoline">{{ item.source_tag }}</div>
          </li>
          <li class="hash-style">{{ item.tx_digest }}</li>
          <li class="amount-item">
            <div :class="[item.amount<0?'color1':'color2']">{{ item.amount }}</div>
            <!-- <div v-if="item.amount<0" class="twoline">0.00</div>
            <div v-else class="twoline">-</div> -->
          </li>
          <li class="small short-item"><span class="circle"/>success</li>
          <li class="small middle-item endmarginr">{{ item.rpc_time }}</li>
        </ul>
      </div>
      <div ref="norecords" class="noresult">
        No records
      </div>
      <div class="logo-sign"><img src="@/assets/images/arrowup.png" class="arrow" @click="arrowClose"></div>
    </div>
  </div>
</template>

<script>
import { timeDecorate, createTime } from '@/utils/date'
import { accountHistory, queryAllProperty, accountInfo } from '@/api/fetch'
import { isOutIn } from '@/utils/arry'
export default {
  name: 'Result',
  data() {
    return {
      account: '', // 搜索框钱包地址
      address: '',
      balance: '', // 查询用户余额
      createtime: '', // 查询用户的创建时间
      property: '',
      currentPage1: 1, // 当前页
      count: 0, // 页数
      list: [],
      show: false
    }
  },
  methods: {
    searchTran() {
      // 查询账户基本信息
      this.address = ''
      this.list = []
      this.show = true
      this.$refs.arrowdown.style.display = 'none'
      this.resultIsShow()
      this.account = this.account.trim()
      accountInfo(this.account).then(res => {
        if (res.Result === 1) {
          this.address = this.account
          this.balance = Number(res.balance / 1000000).toFixed(3)
          this.createtime = createTime(Number(res.createtime))
          this.$refs.arrowdown.style.display = 'none'
          this.getHistory()
        }
      }).catch(res => {
        console.log('查询账户信息失败')
      })
      // 查询propety
      queryAllProperty(this.account).then(res => {
        for (var index in res) {
          if (index !== 'Result') {
            this.property = res[index]
          }
        }
      })
    },
    // 查询账户的交易记录
    getHistory() {
      accountHistory(this.account, 0, 15).then(res => {
        if (res.Result === 1) {
          timeDecorate(res.blocks, 'rpc_time')
          this.list = res.blocks
          this.count = Number(res.count)
          isOutIn(this.account, this.list, 'transaction_type', 'amount', 'destination', 'source', 'source_tag', 'destination_tag')
          this.$refs.norecords.style.display = 'none'
          return
        }
      }).catch(res => {
        this.list = []
        this.$refs.norecords.style.display = 'block'
      })
    },
    // 点击请求用户交易记录
    handleCurrentChange(val) {
      accountHistory(this.address, val - 1, 15).then(res => {
        if (res.Result === 1) {
          timeDecorate(res.blocks, 'rpc_time')
          this.list = res.blocks
          this.count = Number(res.count)
          isOutIn(this.account, this.list, 'transaction_type', 'amount', 'destination', 'source', 'source_tag', 'destination_tag')
          this.$refs.norecords.style.display = 'none'
          return
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 打开折叠板
    arrowOpen() {
      this.resultIsShow()
      this.show = !this.show
      this.$refs.arrowdown.style.display = 'none'
    },
    // 关闭面板
    arrowClose() {
      this.show = !this.show
      this.$refs.arrowdown.style.display = 'block'
    },
    // 账户不存在
    resultIsShow() {
      if (!this.address) {
        this.$refs.norecords.style.display = 'none'
        return
      }
      if (this.address && !this.list) {
        this.$refs.norecords.style.display = 'block'
        return
      }
    },
    closeResult() {
      if (!this.account) {
        // this.show = !this.show
        this.show = false
        this.address = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .result
    width: 62.5%
    margin: 0 auto
    .search
      width:100%
      padding: 18px 0 78px 21px
      background: #ffffff
      border-bottom:1px solid rgba(229,229,229,1)
      .path
        width: 100%
        .breadcrumbs
          width:163px
          font-size:14px
          font-weight:400
          color:rgba(148,148,148,1)
      .searchArea
        width: 50%
        margin:0 auto
        margin-top: 48px
        height: 42px
        .search-border
          float: left
          border: 1px solid #ccc
          width: 70%
          height 42px
          padding-left: 13px
          font-size:14px
          font-weight:400
        .search-btn
          float:left
          width: 20%
          height: 42px
          color: #fff
          font-size: 14px
          line-height: 42px
          text-align: center
          cursor:pointer
          background:rgba(89,104,240,1)
          border-radius:0px 2px 2px 0px
    .logo-sign
      width:100%
      height 35px
      // line-height:35px
      background:#fff
      padding:15px 0
      .arrow
        width:15px
        height:12px
        margin:0 auto
        display:block
        cursor:pointer
    .seacrh-result
      width:100%
      // margin-top:16px
      background:#fff
      .result-title
        font-size: 18px
        font-weight: 550
        padding-left: 21px
        height: 50px
        line-height :50px
        text-align: left
        border-bottom: 1px solid rgba(229,229,229,1)
        width:100%
        box-sizing:border-box
        font-weight:bold
        color:rgba(68,68,68,1)
      .result-items
        font-size: 13px
        padding-left:21px
        width: 100%
        overflow:hidden
        font-weight:400
        height:49px
        color:rgba(68,68,68,1)
        background:rgba(244,245,255,1)
        .long-item
          width:41%
          margin-right:.5%
        .short-item
          width:16%
          margin-right:.5%
        .balance-item
          margin-left:2%
          width:20%
      .result-items li
        float: left
        height 49px
        line-height:49px
        width: 20%
      .noresult
        width:100%
        height:103px
        font-size:16px
        font-weight:400
        color:rgba(68,68,68,1)
        border-bottom:1px solid rgba(229,229,229,1)
        line-height :103px
        text-align:center
      .allResult
        width: 100%
        padding-left: 30px
        height: 40px
        line-height: 40px
        background:rgba(244,245,255,1)
        font-size:14px
        font-weight:400
        color:rgba(68,68,68,1)
        text-align:center
        .short-item
          width:7.5%
        .middle-item
          width:15%
        .endmarginr
          margin-right:0
      .allResult li
        float: left
        width: 24%
        margin-right:1%
      .result
        width: 100%
        background: #fff
        padding-left: 21px
        line-height: 50px
        border-bottom: 1px solid #ccc
        .result-list
          width:100%
          border-bottom:1px solid #eee
          text-align:center
          height:85px
          background:#fff
          text-align:center
          .short-item
            width:7.5%
          .middle-item
            width:16%
          .endmarginr
            margin-right:0
        .result-list li
          float: left
          width: 24%
          height:85px
          margin-right:1%
          .oneline
            width:100%
            color:rgba(68,68,68,1)
            // margin:21px auto 13px
            height:50px
            line-height:50px
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
            height 85px
            text-align:center
            line-height:85px
          .color2
            color:green
            font-size:15px
            font-weight:400
            width:100%
            height 85px
            text-align:center
            line-height:85px
          .twoline
            width:100%
            height:13px
            font-weight:400
            color:rgba(136,136,136,1)
            height:35px
            line-height:35px
            // margin: 0 auto
            font-size:15px
          .circle
            width:8px
            height:8px
            display: inline-block
            margin-right:5px
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
      .noresult
        width:100%
        height:103px
        font-size:16px
        font-weight:400
        color:rgba(68,68,68,1)
        line-height:103px
    @media screen and (max-width:1600px)
        .result-items
          font-size:10px !important
          .long-item
            width:44% !important
          .balance-item
            width:17% !important
            margin-left:2% !important
</style>

<style lang="stylus">
  .paginations
    width:100%
    height 82px
    margin: 0 auto
    overflow hidden
    position relative
    // padding:0 25%
  .record-page
    width:100%
    text-align:left
    line-height:82px
    float:left
    padding-left:21px
  .total-item
    position:absolute
    right 0px
    top:0
    width:35%
    float:right
    text-align:right
    margin:0 auto
    overflow hidden
    .total
      width:50%
      float left
      // text-align:center
      line-height:82px
      // margin-right:3%
      color:rgba(155,155,155,1)
    .el-pagination
      width:50%
      font-size:14px
      float:left
      padding-top 28px
      // text-align:center
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
