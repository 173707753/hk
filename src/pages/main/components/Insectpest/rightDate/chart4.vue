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
      tabindex: '',
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
            data: [2460, 3009, 2638, 2679, 2585, 2645, 2666, 2552, 2576, 2494, 2508, 2481, 2484, 2562, 2505, 2584, 2575, 2526, 2402, 2461, 2455, 2491, 2412, 2476, 2376, 2593, 2538, 2549, 2453, 2404, 2454, 2332, 2227, 2339, 2316, 2355, 2353, 2348, 2322, 2305, 2367, 2334, 2352, 2343, 2285, 2479, 2399, 2277, 2303, 2324, 2285, 2284, 2246, 2298, 2268, 2324, 2355, 2365, 2437, 2572, 2542, 2515, 2537, 2480, 2526, 2575, 2557, 2688, 2733, 2673, 2593, 2717, 2681, 2750, 2883, 2755, 2760, 2724, 2709, 2715, 2761, 2795, 2837, 2825, 2874, 2863, 2933, 2855, 2846, 2916, 2804, 2872, 2755, 2904, 2869, 2875],
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
      this.tabindex = index
      // console.log(this.tabindex,'tab4');
    });
    // 接收gis的数据
    const that = this
    this.$bus.$on('allData', (selectData) => {
      // console.log(that.tabindex,'kkk');
      if (that.tabindex === 0) {
        this.option.series[0].data = selectData[0][3];
        this.init(selectData[0][3])
      }
      if (that.tabindex === 1) {
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