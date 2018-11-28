<template>
  <div class="tps">
    <div class="statistics">
      <ul class="data-display">
        <li>
          <div class="number">{{ $store.state.metrics.metrics.TX_TOTAL_NUM }}</div>
          <div class="data-item">Total Transactions</div>
        </li>
        <li>
          <div class="number">{{ $store.state.metrics.metrics.RECENT_TPS }}</div>
          <div class="data-item">Latest TPS</div>
        </li>
        <li>
          <div class="number">{{ $store.state.metrics.metrics.SHARD_NUM }}</div>
          <div class="data-item">Shards</div>
        </li>
        <li>
          <div class="number">{{ $store.state.metrics.metrics.NODES_NUM }}</div>
          <div class="data-item">Nodes</div>
        </li>
        <li>
          <div class="number">{{ $store.state.metrics.metrics.ACCOUNT_NUM }}</div>
          <div class="data-item">Total Addresses</div>
        </li>
      </ul>
    </div>
    <div class="tps-area">
      <div class="status">
        <div class="status-title">Stats - All Shards</div>
        <!-- <select id="area" v-model="shard" class="selected-box">
          <option value="0">All</option>
          <option value="1">Shard one</option>
          <option value="2">Shard two</option>
          <option value="3">Shard three</option>
          <option value="4">Shard four</option>
          <option value="5">Shard five</option>
          <option value="6">Shard six</option>
        </select> -->
        <div class="lineChart">
          <div v-if="shard == 0" class="summary">
            <div class="total">Summary</div>
            <div class="max max1">Maximum TPS</div>
            <div class="number">{{ $store.state.metrics.metrics.MAX_TPS }}</div>
            <div class="max">Average Transaction Confirmation Time</div>
            <div class="number">{{ $store.state.metrics.metrics.TX_TIME_AVE }}s</div>
            <div class="max">Minimum Transaction Confirmation Time</div>
            <div class="number">{{ $store.state.metrics.metrics.TX_TIME_MIN }}s</div>
          </div>
          <div v-else class="summary">
            <div class="total">shard {{ shard }}</div>
            <div class="max">Maximum TPS</div>
            <div class="number">{{ $store.state.metrics.metrics.SHARD_MAX_TPS[shard-1] }}</div>
          </div>
          <div id="transactionChart" class="transaction"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Status',
  data() {
    return {
      shard: 0,
      show: false
    }
  },
  watch: {
    shard(val, oldval) {
      if (val > 0) {
        this.show = true
      }
      this.$store.dispatch('GetMetrics', { withoutAnimation: false }).then(res => {
        this.handleChartData(res, val)
      })
    }
  },
  created() {
    this.$store.dispatch('GetMetrics', { withoutAnimation: false }).then(res => {
      this.handleChartData(res, 0)
    }).catch(err => {
      console.log(err)
    })
  },
  mounted() {
    this.pollingTps()
  },
  beforeDestroy() {
    clearInterval(this.tpsId)
  },
  methods: {
    handleChartData(data, number) {
      const tranDate = []
      const tranAmount = []
      var shard_TX = data.metrics.SHARD_TX
      var shardArry = shard_TX[number - 1]
      for (var index in shardArry) {
        tranDate.push(shardArry[index].day)
        tranAmount.push(shardArry[index].val)
      }
      this.drawLine(tranDate, tranAmount)
    },
    // 5s刷新一次
    pollingTps() {
      this.tpsId = setInterval(() => {
        this.$store.dispatch('GetMetrics', { withoutAnimation: false })
      }, 5000)
    },
    // 每日交易图表
    drawLine(x, y) {
      const transactionChart = this.$echarts.init(
        document.getElementById('transactionChart')
      )
      window.onresize = function() {
        transactionChart.resize()
      }
      transactionChart.setOption({
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'left',
          text: 'Daily transcations'
        },
        grid: {
          x: 100,
          x2: 40
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: x
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'blue'
            },
            data: y
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.statistics {
  width: 100%;
  height: 141px;
  background: rgba(243, 199, 89, 1);

  .data-display {
    width: 62.5%;
    margin: 0 auto;
    height: 141px;
  }

  .data-display li {
    width: 20%;
    float: left;
    height: 141px;
    // line-height:141px
    text-align: center;

    .number {
      width: 100%;
      font-size: 32px;
      text-align: center;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-top: 47px;
    }

    .data-item {
      width: 100%;
      margin-top: 9px;
      font-size: 14px;
      font-family: ArialMT;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      opacity: 0.7;
    }
  }
}

.tps-area {
  width: 100%;
  background: rgba(247, 247, 247, 1);

  .status {
    position: relative;
    width: 62.5%;
    margin: 0 auto;

    .selected-box {
      position: absolute;
      right: 0;
      top: 34px;
      z-index: 10;
      width: 107px;
      height: 26px;
      border: 1px solid rgba(89, 104, 240, 1);
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      padding-left: 8px;
      color: rgba(188, 188, 188, 1);
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background: url('../../../assets/images/arrowSelect.jpg') no-repeat scroll right center;
    }

    .status-title {
      width: 100%;
      font-size: 32px;
      font-family: Arial-BoldMT;
      font-weight: bold;
      color: rgba(69, 69, 69, 1);
      line-height: 36px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      padding: 35px 0 21px 0;
    }

    .lineChart {
      margin-top: 30px;
      overflow: hidden;
      width: 100%;
      position: relative;

      .summary {
        float: left;
        border: 1px solid #eee;
        width:240px;
        height: 377px;
        padding: 23px 0 0 23px;
        background: #A4B5F2;
        word-wrap:break-word
        .total {
          width: 97px;
          font-size: 20px;
          font-family: Arial-BoldMT;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }

        .max {
          margin-top: 29px;
          width: 220px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
        }

        .max1 {
          margin-top: 34px;
        }

        .number {
          width: 75px;
          font-size: 24px;
          font-family: Arial-BoldMT;
          font-weight: bold;
          color: rgba(82, 93, 189, 1);
          margin-top: 13px;
          margin-bottom: 29px;
        }
      }

      .transaction {
        width: 67%;
        height: 400px;
        float: right;
      }
    }
  }
}
</style>
