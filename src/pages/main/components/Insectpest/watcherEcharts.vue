<template>
 <div class="bot">
  <div class="st_titles">
   虫害指数
  </div>
  <div class="chStatisticChart">
   <e-chart id="chStatisticChart"
            class="chStatisticChart"
            ref="chStatisticChartOption"
            :option="chStatisticChartOption"></e-chart>
  </div>
 </div>
</template>

<script>
import EChart from '@/components/EChart.vue'
import * as echarts from 'echarts'
export default {
 components: {
  EChart,
 },
 data() {
  return {
   tabs: false,
   statics: 0,
   chStatisticChartOption: {
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
      borderRadius: 0,
      borderWidth:0,
      formatter: function (params, ticket, callback) {
          var res = `<span style="color:#37D1F9;font-size:16px">${params[0].axisValue}</span>`
          for (var i = 0, l = params.length; i < l; i++) {
              res += '<br/>' + params[i].marker + '<span style="color:#FFC22E">' + params[i].seriesName + '　' + params[i].value + `${i==0 ? '只' : '亩'}` + '</span>'
          }
          res = '<div style="border:1px solid #5EC3F3;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
          setTimeout(function () {
              // 仅为了模拟异步回调
              callback(ticket, res);
          }, 1000)
          return res
      }
    },
    legend: [{
      left: '20',
      top: '20',
      textStyle:{//图例文字的样式
          color:'#D1D1D1',
          fontSize:12
      },
      data: ['靶标虫量']
    },{
      right: '20',
      top: '20',
      textStyle:{//图例文字的样式
          color:'#D1D1D1',
          fontSize:12
      },
      data: ['影响面积']
    },
    ],
    grid: {
     left: '13%',
     right: '13%',
    },
    xAxis: [
     {
      type: 'category',
      data: ['夜蛾', '夜蛾', '夜蛾', '夜蛾', '草地螟', '草地螟', '草地螟'],
      axisPointer: {
       type: 'shadow',
      },
      axisLabel: {
          show: true,
          textStyle: {
              color: '#D1D1D1'
          }
      }
     },
    ],
    yAxis: [
     {
      type: 'value',
      nameTextStyle: {
          color: '#D1D1D1',
      },
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
       formatter: '{value}',
       show: true,
          textStyle: {
              color: '#D1D1D1'
          }
      },
      splitLine: {
       //网格线
       show: false,
      },
      axisLine: {
       show: true,
      },
     },
     {
      type: 'value',
      nameTextStyle: {
          color: '#D1D1D1',
      },
      min: 0,
      max: 500,
      interval: 100,
      axisLabel: {
       formatter: '{value}',
       show: true,
          textStyle: {
              color: '#D1D1D1'
          }
      },
      splitLine: {
       //网格线
       show: false,
      },
      axisLine: {
       show: true,
      },
     },
    ],
    series: [
     {
      type: 'bar',
      name: '靶标虫量',
      itemStyle: {
       normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
         { offset: 0, color: '#FFEBAE' },
         { offset: 1, color: '#FEE654' },
        ]),
        barBorderRadius:[3, 3, 0, 0],
       },
      },
      data: [22, 42, 7, 23, 2, 76, 135],
     },
     {
      type: 'bar',
      name: '影响面积',
      itemStyle: {
      normal: {
        barBorderRadius:[3, 3, 0, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#356CE0' },
          { offset: 1, color: '#75D3F0' },
        ]),
      }
      },
      data: [22, 5, 9, 2, 287, 70, 175],
     },
    ],
   },
  }
 },
 created() {
  this.chEcharts() // 绘制图表
 },
 methods: {
  chEcharts() {
   this.$nextTick(() => {
    this.$refs.chStatisticChartOption.chart.setOption(
     this.chStatisticChartOption
    )
   })
  },
  changeStatis(val) {
   this.statics = val
   setTimeout(() => {
    // 为了体现按钮动画 点击动画时长300ms
    if (val === 1 || val === 3) {
     this.tabs = false
    } else {
     this.tabs = true
    }
   }, 150)
  },
 },
}
</script>

<style lang="scss" scoped>
.bot {
 width: 100%;
 z-index: 99999;
 height: 34.2vh;
 background-image: url('../../../../assets/img/ch/chbg.png');
 background-size: 100% auto;
 background-repeat: no-repeat;
 .chStatisticChart {
  width: 100%;
  height: 100%;
 }
}
</style>
