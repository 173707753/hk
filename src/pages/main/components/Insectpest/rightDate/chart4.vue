<template>
  <div class="top" @mouseenter="showPopup" @mouseleave="onBotMouseLeave">
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
      isMouseOverBot: false,
      colorLine: ['#bfc'],
      tabindex: 0,
      leftData: [
        {
          name: '负荷数据',
          data: [
            // 49100, 48783, 48019, 47363, 46921, 46673, 46086, 45767, 45142, 44714, 44316, 43945, 43648, 43461, 43276, 42982, 42955, 42579, 42421, 42393, 42525, 42620, 42884, 43396, 44765, 45257, 45341, 44744, 44278, 44605, 44688, 44964, 45485, 46680, 47094, 47751, 47996, 48853, 49814, 49761, 50204, 50600, 51115, 51734, 52318, 53114, 52935, 52617, 52793, 52837, 53178, 53150, 52763, 52391, 52425, 52615, 53302, 53494, 53589, 53436, 53169, 53306, 52659, 53000, 53373, 53770, 54305, 53979, 53852, 53813, 53904, 53667, 53601, 53233, 53004, 52954, 53614, 53733, 54005, 54268, 54117, 53854, 53922, 54294, 54660, 54482, 53886, 53294, 52944, 52000, 51311
          ],
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
    // 接收tab切换的数据
    // this.$bus.$on('indexData', (params) => {
    //   const dataAll = params.param1;
    //   const index = params.param2;
    //   this.leftData[0].data = dataAll[3];
    //   this.updateChart(this.leftData)
    //   this.tabindex = index
    //   // console.log(this.tabindex,'tab4');
    // });
    // // 接收gis的数据
    // const that = this
    // this.$bus.$on('allData1', (selectData) => {
    //   // console.log(that.tabindex,'kkk');
    //   if (that.tabindex === 0) {
    //     this.leftData[0].data = selectData[1][3];
    //     this.updateChart(this.leftData)
    //   }
    //   if (that.tabindex === 1) {
    //     this.leftData[0].data = selectData[2][3];
    //     this.updateChart(this.leftData)
    //   }
    // });
    // // 
    // this.$bus.$on('allData', (selectData) => {
    //   // console.log(that.tabindex,'kkk');
    //   if (that.tabindex === 0) {
    //     this.leftData[0].data = selectData[0][3];
    //     this.updateChart(this.leftData)
    //   }
    //   if (that.tabindex === 1) {
    //     this.leftData[0].data = selectData[1][3];
    //     this.updateChart(this.leftData)
    //   }
    // });
    this.$bus.$on('rightData', (alldata) => {
            alldata.forEach((item) => {
                this.leftData[0].data.push(item.load_power)
            })
            this.initChart()
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