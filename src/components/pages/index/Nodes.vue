<template>
  <div class="nodes-area">
    <div class="nodes-title">Nodes</div>
    <div class="map">
      <ul class="nodes">
        <li>
          <div><span class="circle bg1"/>Advance node</div>
          <div class="nodes-number">({{ $store.state.metrics.serverCountData.ADVANCE }})</div>
        </li>
        <li>
          <div><span class="circle bg2"/>Consensus node</div>
          <div class="nodes-number">({{ $store.state.metrics.serverCountData.CONSENSUS }})</div>
        </li>
        <li>
          <div><span class="circle bg3"/>Edge node</div>
          <div class="nodes-number">({{ $store.state.metrics.serverCountData.EDGE }})</div>
        </li>
      </ul>
      <div id="main" class="worldmap"/>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../../node_modules/echarts/map/js/world.js'

export default {
  name: 'Nodes',
  data() {
    return {}
  },
  created() {
    this.$store
      .dispatch('GetMetrics', { withoutAnimation: false })
      .then(res => {
        this.handleMapData(res)
      })
  },
  methods: {
    handleMapData(data) {
      var arry = []
      let mydict = {}
      for (var i = 0; i < data.servers.length; i++) {
        var total = data.servers[i].total
        var key = data.servers[i].longitude + data.servers[i].latitude
        var geo = [data.servers[i].longitude, data.servers[i].latitude]
        var v = mydict[key]
        if (v) {
          v.v += total
        } else {
          v = {}
          v.geo = geo
          v.v = total
          mydict[key] = v
        }
      }
      for (let prop in mydict) {
        let geo = mydict[prop].geo
        let val = mydict[prop].v
        arry.push({
          type: 'Node',
          value: geo.concat(val)
        })
      }

      this.drawMap(arry)
    },
    // 节点地图分布
    drawMap(nodesData) {
      var myChart = echarts.init(document.getElementById('main'))
      window.onresize = function() {
        myChart.resize()
      }
      myChart.setOption({
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.value[2]
          }
        },
        legend: {
          orient: 'vertical',
          x: 'left'
          // data: ['Consensus node', 'Advance  node', 'Edge node']
        },
        geo: {
          map: 'world',
          label: {
            emphasis: {
              show: false
            }
          },
          scaleLimit: { min: 1, max: 3 },
          itemStyle: {
            normal: {
              areaColor: '#ACD6FF',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#ACD6FF'
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            // data: convertData([
            //   { type: 'EDGE', value: 50 },
            //   { type: 'CONSENSUS', value: 100 },
            //   { type: 'ADVANCE', value: 250 }
            // ]),
            data: nodesData,
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.nodes-area {
  width: 100%;

  .nodes-title {
    width: 62.5%;
    margin: 0 auto;
    font-size: 32px;
    font-family: Arial-BoldMT;
    font-weight: bold;
    color: rgba(68, 68, 68, 1);
    margin-top: 70px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
  }

  .map {
    width: 62.5%;
    margin: 0 auto;
    overflow: hidden;

    .nodes {
      float: left;
      width: 14.5%;
      margin-top: 92px;
    }

    .nodes li {
      width: 100%;
      // height:30px
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      color: rgba(68, 68, 68, 1);

      .nodes-number {
        text-indent: 20px;
        margin-bottom: 31px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
        margin-top: 6px;
      }

      .circle {
        width: 8px;
        height: 8px;
        text-align: center;
        display: inline-block;
        margin-right: 9px;
        margin-bottom: 2.5px;
      }

      .bg1 {
        background: red;
      }

      .bg2 {
        background: red;
      }

      .bg3 {
        background: red;
      }
    }

    .worldmap {
      float: right;
      width: 63%;
      height: 406px;
      // border: 1px dashed #ccc;
    }
  }
}
</style>
