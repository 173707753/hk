<template>
  <div class="top">
      <div class="st_titles">
          电网数据
      </div>
      <div class="chart-container">
          <!-- 折线图容器 -->
          <div id="chart2" class="chart"></div>
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
      return {
          leftData: [
              {
                  name: '火电发电',
                  data: [2678, 2677, 2657, 2679, 2500, 2269, 2271, 2385, 2298, 2221, 2221, 2152, 2112, 2113, 2124, 2169, 2211, 2149, 1947, 1938, 1893, 1951, 1975, 2023, 2117, 2189, 2192, 2211, 2247, 2080, 2106, 2132, 2084, 2017, 1960, 1927, 1843, 1722, 1672, 1627, 1627, 1623, 1622, 1621, 1614, 1625, 1613, 1621, 1605, 1606, 1621, 1603, 1624, 1608, 1622, 1631, 1630, 1615, 1627, 1624, 1627, 1684, 1719, 1721, 1808, 1880, 2016, 2242, 2418, 2600, 2811, 3000, 3258, 3420, 3574, 3606, 3528, 3379, 3473, 3512, 3538, 3542, 3501, 3631, 3730, 3790, 3720, 3677, 3646, 3595, 3472, 3509, 3393, 3394, 3412, 3162],
              },
              {
                  name: '水电发电',
                  data: [243, 541, 314, 380, 73, 891, 1022, 396, 527, 407, 229, 75, 306, 532, 531, 738, 298, 247, 85, 83, 80, 391, 81, 534, 81, 830, 757, 827, 72, 592, 539, 80, 78, 303, 292, 62, 61, 61, 39, 37, 39, 37, 38, 41, 186, 533, 531, 88, 61, 65, 63, 62, 42, 44, 43, 43, 42, 43, 203, 940, 543, 393, 543, 912, 809, 913, 917, 803, 1255, 1011, 351, 496, 40, 375, 567, 58, 49, 271, 206, 353, 311, 39, 518, 280, 323, 96, 772, 622, 512, 369, 468, 697, 69, 1034, 1051, 1024],
              },
              {
                  name: '抽蓄发电',
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              }
          ],
      };
  },
  created() {
  },
  methods: {
      //Echarts数据渲染
      initChart() {
          var chartDom = document.getElementById('chart2');
          this.chartInstance = echarts.init(chartDom);
          var option = this.getOption();
          this.chartInstance.setOption(option);
      },
      updateChart(data) {
          if (this.chartInstance) {
              this.chartInstance.dispose(); // 销毁图表实例
          }
          this.initChart();
          this.chartInstance.setOption(this.getOption(data)); // 设置新数据
      },
      getOption(data = this.leftData) {
          return {
              title: {
              },
            //   legend: {
            //       textStyle: {
            //           color: '#fff',
            //       },
            //       data: data.map(item => item.name),
            //       left:'center'
            //   },
              toolbox: {
              },
              tooltip: {},
              xAxis: {
                  name: 't/min',
                  data: Array.from({ length: 101 }, (_, i) => i),
                  axisLabel: {
                      show: true,
                      interval: 9,
                      textStyle: {
                          fontWeight: 'bold'
                      }
                  },
              },
              yAxis: [
                  {
                      name: 'P/MW',
                      type: 'value',
                      nameTextStyle: {
                          fontWeight: 'bold'
                      },
                      axisLabel: {
                          show: true,
                          textStyle: {
                              fontWeight: 'bold'
                          }
                      },
                      axisPointer: {
                          snap: true,
                      },
                  },
              ],
              series: data.map(item => ({
                  name: item.name,
                  type: 'line',
                  data: item.data,
                  emphasis: {
                      focus: 'series'
                  },
                  animationDelay: function (idx) {
                      return idx * 10;
                  }
              })),
              animationEasing: 'elasticOut',
              animationDelayUpdate: function (idx) {
                  return idx * 5;
              }
          };
      }
  },
  mounted() {
      this.initChart()
  },
}
</script>
<style>

.top {
    width: 100%;
    z-index: 99999;
    height: 28vh;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-image: url("../../../../../assets/img/ch/环境指数/环境指数.png");
}

.chart-container {
  position: relative;
  height: 100%;

  .chart {
    width: 100%;
    height: 100%;
  }

  .button-container {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

</style>