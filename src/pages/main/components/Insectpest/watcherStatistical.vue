<template>
  <div class="top">
    <div class="st_titles">病虫害趋势</div>
    <div class="st_tops">
      <div class="st_dw">
        <img
          width="10%"
          height="auto"
          src="../../../../assets/img/ch/zb.png"
          alt=""
        />
        浙江省杭州市拱墅区
      </div>
      <div class="smalltab">
        <img
          width="40%"
          height="auto"
          @click="changeStatis(1)"
          :class="statics == '1' ? `clickSmalls` : ''"
          v-if="!tabsyear"
          src="../../../../assets/img/ch/年月日/年月日/years.png"
          alt=""
        />
        <img
          width="40%"
          height="auto"
          @click="changeStatis(4)"
          :class="statics == '4' ? `clickSmalls` : ''"
          v-if="tabsyear"
          src="../../../../assets/img/ch/年月日/年月日/year.png"
          alt=""
        />
        <img
          width="40%"
          height="auto"
          @click="changeStatis(2)"
          :class="statics == '2' ? `clickSmalls` : ''"
          v-if="!tabsmon"
          src="../../../../assets/img/ch/年月日/年月日/months.png"
          alt=""
        />
        <img
          width="40%"
          height="auto"
          @click="changeStatis(5)"
          :class="statics == '5' ? `clickSmalls` : ''"
          v-if="tabsmon"
          src="../../../../assets/img/ch/年月日/年月日/month.png"
          alt=""
        />
        <img
          width="40%"
          height="auto"
          @click="changeStatis(3)"
          :class="statics == '3' ? `clickSmalls` : ''"
          v-if="!tabsday"
          src="../../../../assets/img/ch/年月日/年月日/days.png"
          alt=""
        />
        <img
          width="40%"
          height="auto"
          @click="changeStatis(6)"
          :class="statics == '2' ? `clickSmalls` : ''"
          v-if="tabsday"
          src="../../../../assets/img/ch/年月日/年月日/day.png"
          alt=""
        />
        <!-- <img
          width="40%"
          height="auto"
          @click="changeStatis(3)"
          :class="statics == '3' ? `clickSmalls` : ''"
          v-if="tabs"
          src="../../../../assets/img/ch/年月日/年月日/years.png"
          alt=""
        /> -->
        <!-- <img
          width="40%"
          height="auto"
          @click="changeStatis(4)"
          :class="statics == '4' ? `clickSmalls` : ''"
          v-if="tabs"
          src="../../../../assets/img/ch/年月日/年月日/month.png"
          alt=""
        /> -->
        <!-- <img
          width="40%"
          height="auto"
          @click="changeStatis(6)"
          :class="statics == '6' ? `clickSmalls` : ''"
          v-if="!tabs"
          src="../../../../assets/img/ch/年月日/年月日/day.png"
          alt=""
        /> -->
      </div>
    </div>
    <div class="diseases">
      <e-chart
        id="diseases"
        class="diseases"
        ref="diseasesOption"
        :option="diseasesOption"
      ></e-chart>
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
      tabsyear: true,
      tabsmon: false,
      tabsday: false,
      statics: 1,
      diseasesOption: {
        title: [
          {
            text: "\n温湿度",
            left: "40",
            color: "#9BA3B4",
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12,
            },
          },
          {
            text: "广谱虫量\n靶标虫量",
            right: "0",
            color: "#9BA3B4",
            textStyle: {
              color: "#FFFFFF",
              fontSize: 12,
            },
          },
        ],
        tooltip: {
          show: true,
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0)", //背景颜色（此时为默认色）
          borderRadius: 0,
          borderWidth: 0,
          formatter: function (params, ticket, callback) {
            var res = `<span style="color:#37D1F9;font-size:16px">${params[0].axisValue}</span>`;
            for (var i = 0, l = params.length; i < l; i++) {
              res +=
                "<br/>" +
                params[i].marker +
                '<span style="color:#FFC22E">' +
                params[i].seriesName +
                "　" +
                params[i].value +
                `${i == 0 ? "℃" : ""}` +
                "</span>";
            }
            res =
              '<div style="border:1px solid #5EC3F3;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' +
              res +
              "</div>";
            setTimeout(function () {
              // 仅为了模拟异步回调
              callback(ticket, res);
            }, 1000);
            return res;
          },
        },
        // legend:{
        //   itemWidth: 5,
        //   itemHeight: 5,
        // }
        legend: {
          itemWidth: 20, // 设置宽度
          itemHeight: 10, // 设置高度
          data: [
            // "温度", "湿度", "广谱虫量、靶标虫量"
            {
              name: "温度",
              icon: "rect",

              itemGap: 50, // 设置间距
              textStyle: {
                fontSize: 10,
                color: "#CE753E",
              },
            },
            {
              name: "湿度",
              icon: "rect",
              // itemWidth: 0.5, // 设置宽度
              // itemHeight: 0.5, // 设置高度
              itemGap: 50, // 设置间距
              textStyle: {
                fontSize: 12,
                color: "#08C8EC",
              },
            },
            {
              name: "广谱虫量、靶标虫量",
              icon: "rect", //图标样式
              // itemWidth: 0.5, // 设置宽度
              // itemHeight: 0.5, // 设置高度
              itemGap: 50, // 设置间距
              textStyle: {
                fontSize: 12,
                color: "#C72021",
              },
            },
          ],
          //标识的位置
          left: 90,
          top: 180,
          bottom: 30,
        },
        grid: {
          // left: "13%",
          // right: "13%",
          x: 55,
          y: 40,
          x2: 35,
          y2: 140,
        },
        xAxis: [
          {
            type: "category",
            data: ["11-25", "11-26", "11-27", "11-28"],
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#D1D1D1",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            nameTextStyle: {
              color: "#D1D1D1",
            },
            min: 0,
            max: 80,
            interval: 14,
            axisLabel: {
              formatter: "{value}℃",
              show: true,
              textStyle: {
                color: "#D1D1D1",
              },
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
            type: "value",
            nameTextStyle: {
              color: "#D1D1D1",
            },
            min: 0,
            max: 200,
            interval: 40,
            axisLabel: {
              formatter: "{value}",
              show: true,
              textStyle: {
                color: "#D1D1D1",
              },
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
            type: "line",
            smooth: true, //使折现变圆滑
            name: "温度",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#CE753E" },
                  { offset: 1, color: "#98695C" },
                ]),
                barBorderRadius: [3, 3, 0, 0],
              },
            },
            data: [22, 42, 7, 23, 2, 76, 135],

            symbol: "pin", //标注类型
            symbolSize: 10, //标记大小
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
          },
          {
            type: "line",
            smooth: true,
            name: "湿度",
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#08C8EC" },
                  { offset: 1, color: "#4C9EFF" },
                ]),
              },
            },
            data: [24, 32, 7, 2, 25, 34, 20],

            markLine: {
              data: [
                { type: "average", name: "平均值" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max",
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "最大值",
                    },
                    type: "max",
                    name: "最高点",
                  },
                ],
              ],
            },
          },
          {
            type: "line",
            smooth: true,
            name: "广谱虫量、靶标虫量",
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#64334E" },
                  { offset: 1, color: "#C72021" },
                ]),
              },
            },
            data: [22, 5, 9, 2, 287, 70, 175],
          },
        ],
      },
    };
  },
  created() {
    this.chEcharts(); // 绘制图表
  },
  methods: {
    chEcharts() {
      this.$nextTick(() => {
        this.$refs.diseasesOption.chart.setOption(this.diseasesOption);
      });
    },
    // soilEcharts() {
    //   this.$nextTick(() => {
    //     this.$refs.soilOption.chart.setOption(this.soilOption);
    //   });
    // },
    changeStatis(val) {
      console.log(val);
      this.statics = val;
      setTimeout(() => {
        // 为了体现按钮动画 点击动画时长300ms
        if (val === 1) {
          this.tabsyear = true;
          this.tabsmon = false;
          this.tabsday = false;
        } else if (val === 2) {
          this.tabsyear = false;
          this.tabsmon = true;
          this.tabsday = false;
        } else if (val === 3) {
          this.tabsyear = false;
          this.tabsmon = false;
          this.tabsday = true;
        }
      }, 150);
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  z-index: 99999;
  height: 28vh;
  background-image: url("../../../../assets/img/ch/环境指数/环境指数.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  .diseases {
    width: 100%;
    height: 100%;
  }
  // .soil {
  //   width: 100%;
  //   height: 100%;
  // }
  .st_dw {
    width: 55%;
    font-size: 1.6vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .smalltab {
    width: 45%;
    position: relative;
    display: flex;
    margin-right: 2%;
    justify-content: flex-end;
    align-items: flex-end;
    img {
      z-index: 9999;
      cursor: pointer;
      width: 10%;
    }
    .small_tabs {
      position: relative;
      p {
        cursor: pointer;
        z-index: 9999;
        right: 13%;
        top: 4%;
        margin-top: 5%;
        position: absolute;
      }
      font-size: 1vh;
      text-align: right;
    }
    .small_tabsed {
      position: relative;
      p {
        cursor: pointer;
        z-index: 9999;
        left: 8%;
        top: 4%;
        position: absolute;
      }
      font-size: 0.5vh;
      text-align: left;
      margin-left: -1px;
    }
  }
  .st_bo {
    display: flex;
    margin-top: 5%;
    justify-content: space-around;
    .desc {
      font-size: 1vh;
      color: #afbae0;
    }
    p {
      margin-top: 1vh;
    }
    .nyzb {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;
      .water_zb {
        // 水波纹的大小位置设置
        width: 4vw;
        height: 4vw;
        left: 23%;
        top: -9%;
        border: 2px solid #ff650b;
        box-shadow: 2px 2px 30px #ff650b; /* 阴影效果 */
      }
      .water_zs {
        // 水波纹的大小位置设置
        width: 5vw;
        height: 5vw;
        left: 28%;
        top: -13%;
        border: 2px solid #ff650b;
        box-shadow: 2px 2px 30px #ff650b; /* 阴影效果 */
      }
      .count {
        font-family: countFont;
        color: #ffbf2c;
        font-weight: 600;
        font-size: 3vh;
      }
      .dw {
        font-size: 1vh;
        margin-left: 2px;
        color: #ffbf2c;
      }
    }
    .lsjp {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;
      .water_jp {
        // 水波纹的大小位置设置
        width: 4vw;
        height: 4vw;
        left: 23%;
        top: -9%;
        border: 2px solid #35ece8;
        box-shadow: 2px 2px 30px #35ece8; /* 阴影效果 */
      }
      .count {
        font-family: countFont;
        color: #35ece8;
        font-weight: 600;
        font-size: 3vh;
      }
      .dw {
        font-size: 1vh;
        color: #35ece8;
        margin-left: 2px;
      }
    }
    .lszz {
      flex: 1;
      text-align: center;
      position: relative;
      .water_zz {
        // 水波纹的大小位置设置
        width: 4vw;
        height: 4vw;
        left: 23%;
        top: -9%;
        border: 2px solid #59ff85;
        box-shadow: 2px 2px 30px #59ff85; /* 阴影效果 */
      }
      .water_bj {
        // 水波纹的大小位置设置
        width: 5vw;
        height: 5vw;
        left: 28%;
        top: -13%;
        border: 2px solid #35ece8;
        box-shadow: 2px 2px 30px #35ece8; /* 阴影效果 */
      }
      .count {
        font-family: countFont;
        color: #3dd780;
        font-weight: 600;
        font-size: 3vh;
      }
      .dw {
        font-size: 1vh;
        color: #3dd780;
        margin-left: 2px;
      }
    }
  }
}
</style>
