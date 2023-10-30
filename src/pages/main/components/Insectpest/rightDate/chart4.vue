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
import EChart from "@/components/EChart.vue";
import * as echarts from "echarts";
export default {
  components: {
    EChart,
  },
  data() {
    return {
      myChart: null,
      option: {
        xAxis: {
          name: 't/min',
          type: 'category',
          data: ['0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45', '3:00', '3:15', '3:30', '3:45', '4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45', '24:00']
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
    this.myChart = echarts.init(document.getElementById('chart4'));
    this.myChart.setOption(this.option);
  },
  methods: {
  }
};
</script>
  
<style lang="scss" scoped>
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
  width: 100%;
  height: 100%;

  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
  