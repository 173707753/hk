<template>
  <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="top" @mouseenter="showPopup"
    @mouseleave="onBotMouseLeave">
    <div class="st_titles">负荷数据</div>
    <div class="chart-container">
      <!-- 折线图容器 -->
      <div id="chart4" class="chart" style="width: 100%; height: 100%;"></div>
    </div>
    <PopupComponent v-if="isMouseOverBot" ref="popup4" @close-popup="hidePopup" :alldata="leftData" />
  </div>
</template>
  
<script>
import * as echarts from "echarts";
import PopupComponent from '../PopupComponent.vue'
export default {
  components: { PopupComponent },
  data() {
    return {
      loading: true,
      isMouseOverBot: false,
      colorLine: ['#bfc'],
      tabindex: 0,
      leftData: [
        {
          name: '负荷数据',
          data: [],
        },
      ],
    };
  },
  created() {
  },
  methods: {
    //Echarts数据渲染
    initChart() {
      var chartDom = document.getElementById('chart4');
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
        legend: {
          bottom: 10,
          textStyle: {
            color: '#fff',
          },
          data: data.map(item => item.name),
          left: 'center'
        },
        toolbox: {
        },
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
        tooltip: {
          trigger: 'axis'
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
        series: data.map((item, index) => ({
          name: item.name,
          type: 'line',
          data: item.data,
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: this.colorLine[index], // 设置单独的颜色
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
    },
    //鼠标移入移出
    showPopup() {
      this.isMouseOverBot = true;
      //传输数据
      this.$bus.$emit('tableData', this.alldata)
    },
    hidePopup() {
      this.isMouseOverBot = false;
    },
    onBotMouseLeave(event) {
      // 获取鼠标位置
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      // 获取 PopupComponent 的 DOM 元素
      const popupElement = this.$refs.popup4.$refs.popup;
      const leftElement = this.$el;
      // 获取 PopupComponent 的位置和尺寸
      const popupRect = popupElement.getBoundingClientRect();
      const leftRect = leftElement.getBoundingClientRect();

      // 判断鼠标是否在 PopupComponent 区域内
      if (
        // mouseX < popupRect.left ||
        mouseX > popupRect.right ||
        mouseY < popupRect.top ||
        mouseY > popupRect.bottom ||
        mouseX < leftRect.left ||
        // mouseX > leftRect.right ||
        mouseY < leftRect.top ||
        mouseY > leftRect.bottom
      ) {
        console.log('离开');
        this.hidePopup();
      }
    },
  },
  mounted() {
    this.initChart()
    this.$bus.$on('rightData', (alldata) => {
      alldata.forEach((item) => {
        this.leftData[0].data.push(item.load_power)
      })
      this.initChart()
      this.loading = false
    })
  },
}
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