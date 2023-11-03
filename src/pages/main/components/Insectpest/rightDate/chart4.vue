<template>
  <div class="top">
    <div class="st_titles">负荷数据</div>
    <div class="chart-container">
      <!-- 折线图容器 -->
      <div id="chart4" class="chart" style="width: 100%; height: 100%;"></div>
    </div>
  </div>
</template>
  
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      tabindex:'',
      myChart: null,
      option: {
        xAxis: {
          name: 't/min',
          type: 'category',
          data: Array.from({ length: 101 }, (_, i) => i),
          axisLabel: {
            show: true,
            interval: 9,
            textStyle: {
              fontWeight: 'bold'
            }
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          name: 'P/MW',
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisPointer: {
            snap: true
          }
        },
        legend: {
          bottom: 10,
          data: ['负荷'],
          left: 'center',
          textStyle: {
            color: '#fff',
          },
        },
        series: [
          {
            data: [-699, -456, -597, -705, -335, -865, -937, -510, -498, -351, -152, 40, -147, -291, -356, -536, -148, -86, 156, 229, 266, -74, 128, -305, -53, -657, -625, -735, -145, -572, -528, -237, -291, -346, -322, -23, 59, 184, 230, 215, 236, 206, 224, 187, 33, -206, -239, 55, 67, 64, 43, 33, 0, 78, 55, 90, 124, 146, 22, -548, -190, -102, -243, -643, -550, -631, -765, -730, -1273, -1266, -881, -1074, -897, -1313, -1516, -1161, -1068, -1173, -1223, -1396, -1341, -1031, -1432, -1329, -1447, -1312, -1870, -1761, -1636, -1374, -1442, -1621, -992, -1802, -1866, -1592],
            type: 'line',
            symbol: 'circle',
            name: '负荷',
          },
        ]
      }
    }
  },
  mounted() {
    this.init();
    // 接收tab的数据
    this.$bus.$on('indexData', (params) => {
      const dataAll = params.param1;
      const index = params.param2;
      this.option.series[0].data = dataAll[3];
      this.init(dataAll[3])
      this.tabindex=index
      // console.log(this.tabindex,'tab4');
    });
    // 接收gis的数据
    const that=this
    this.$bus.$on('allData', (selectData) => {
      // console.log(that.tabindex,'kkk');
      if(that.tabindex === 0) {
        this.option.series[0].data = selectData[0][3];
      this.init(selectData[0][3])
      }
      if(that.tabindex === 1) {
        this.option.series[0].data = selectData[1][3];
      this.init(selectData[1][3])
      }
    });
  },
  methods: {
    init(seriesData) {
      if (this.myChart) {
        this.myChart.dispose(); // 销毁图表实例
      }
      this.myChart = echarts.init(document.getElementById("chart4"));
      const eChartsOption = this.option;
      seriesData && (eChartsOption.series[0].data = seriesData);
      this.myChart.setOption(eChartsOption);
    },
  },
};
</script>
  
<style lang="scss" scoped>
.top {
  width: 100%;
  /* height: 100%; */
  z-index: 99999;
  height: 34vh;
  /* height: 28vh; */
  background-size: 100% 107%;
  background-repeat: no-repeat;
  background-image: url("../../../../../assets/img/ch/chbg.png");
  /* background-color: pink; */
}

.chart-container {
  position: relative;
  height: calc(100% - 4vh);

  .chart {
    width: 100%;
    /* height: 100%; */
    /* padding-bottom: 36px; */
  }
}
</style>