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
      tabindex: 0,
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
            data: [
              49100, 48783, 48019, 47363, 46921, 46673, 46086, 45767, 45142, 44714, 44316, 43945, 43648, 43461, 43276, 42982, 42955, 42579, 42421, 42393, 42525, 42620, 42884, 43396, 44765, 45257, 45341, 44744, 44278, 44605, 44688, 44964, 45485, 46680, 47094, 47751, 47996, 48853, 49814, 49761, 50204, 50600, 51115, 51734, 52318, 53114, 52935, 52617, 52793, 52837, 53178, 53150, 52763, 52391, 52425, 52615, 53302, 53494, 53589, 53436, 53169, 53306, 52659, 53000, 53373, 53770, 54305, 53979, 53852, 53813, 53904, 53667, 53601, 53233, 53004, 52954, 53614, 53733, 54005, 54268, 54117, 53854, 53922, 54294, 54660, 54482, 53886, 53294, 52944, 52000, 51311
            ],
            type: 'line',
            // symbol: 'circle',
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
      this.tabindex = index
      // console.log(this.tabindex,'tab4');
    });
    // 接收gis的数据
    const that = this
    this.$bus.$on('allData1', (selectData) => {
      // console.log(that.tabindex,'kkk');
      if (that.tabindex === 0) {
        this.option.series[0].data = selectData[1][3];
        this.init(selectData[1][3])
      }
      if (that.tabindex === 1) {
        this.option.series[0].data = selectData[2][3];
        this.init(selectData[2][3])
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