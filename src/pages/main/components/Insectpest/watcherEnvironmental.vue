<template>
  <div class="top">
    <div class="st_titles">环境指数</div>
    <div class="st_tops">
      <div class="st_dw">
        <!-- <img
          width="10%"
          height="auto"
          src="../../../../assets/img/ch/zb.png"
          alt=""
        />
        浙江省杭州市拱墅区 -->
      </div>
      <div class="smalltab">
        <img width="40%" height="auto" @click="changeStatis(1)" :class="statics == '1' ? `clickSmalls` : ''" v-if="!tabs"
          src="../../../../assets/img/ch/climate.png" alt="" />
        <img width="40%" height="auto" @click="changeStatis(2)" :class="statics == '2' ? `clickSmalls` : ''" v-if="!tabs"
          src="../../../../assets/img/ch/soils.png" alt="" />
        <img width="40%" height="auto" @click="changeStatis(3)" :class="statics == '3' ? `clickSmalls` : ''" v-if="tabs"
          src="../../../../assets/img/ch/climates.png" alt="" />
        <img width="40%" height="auto" @click="changeStatis(4)" :class="statics == '4' ? `clickSmalls` : ''" v-if="tabs"
          src="../../../../assets/img/ch/soil.png" alt="" />
      </div>
    </div>
    <div class="environmentChart" v-if="!tabs">
      <e-chart id="environmentChart" class="environmentChart" ref="environmentChartOption"
        :option="environmentChartOption"></e-chart>
    </div>
    <div class="soil" v-if="tabs">
      <e-chart id="soil" class="soil" ref="soilOption" :option="soilOption"></e-chart>
    </div>
  </div>
</template>

<script>
import EChart from "@/components/EChart.vue";
export default {
  components: {
    EChart,
  },
  data() {
    return {
      tabs: false,
      statics: 0,
      environmentChartOption: {
        tooltip: {
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
        legend: {
          itemWidth: 5,
          itemHeight: 5,
          // itemGap: 10,
          data: [
            { name: "全部", icon: "circle" },
            { name: "空气温度", icon: "circle" },
            { name: "空气湿度", icon: "circle" },
            { name: "二氧化碳", icon: "circle" },
            { name: "降雨量", icon: "circle" },
            { name: "光照", icon: "circle" },
            { name: "气压", icon: "circle" },
            { name: "风速", icon: "circle" },
          ],
          textStyle: {
            fontSize: 12,
            color: "#2E80AD",
          },
          orient: "vertical",
          //标识的位置
          right: 1,
          top: 6,
          bottom: 50,
        },
        //设置canvas内部表格的内距
        grid: {
          // left: '3%',
          // right: '4%',
          // bottom: '3%',
          x: 10,
          y: 10,
          x2: 70,//x轴向右
          y2: 110,
          borderWidth: 10,
          borderHeight: 10,
          containLabel: true,
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
          type: "category",
          axisLabel: { interval: 0 },
          axisLine: {
            lineStyle: {
              color: "#999",
              width: 1,
            },
          },
          // boundaryGap: false,
          data: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          interval: 20,
          splitLine: {
            //网格线
            show: false,
          },
          axisLine: {
            show: true,
          },
        },
        series: [
          { name: "全部", type: "line", stack: "总量" },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "空气温度",
            type: "line",
            stack: "总量",
            data: [2, 5, 10, 15, 8, 12, 14, 20, 23, 26, 30, 35, 40],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "空气湿度",
            type: "line",
            stack: "总量",
            data: [5, 7, 10, 15, 8, 12, 14, 80, 23, 50, 30, 35, 60],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "二氧化碳",
            type: "line",
            stack: "总量",
            data: [34, 67, 23, 77, 8, 12, 80, 20, 23, 26, 30, 50, 40],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "降雨量",
            type: "line",
            stack: "总量",
            data: [],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "光照",
            type: "line",
            stack: "总量",
            data: [],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "气压",
            type: "line",
            stack: "总量",
            data: [],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "风速",
            type: "line",
            stack: "总量",
            data: [],
          },
        ],
      },
      soilOption: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            { name: "土壤温度", icon: "circle" },
            { name: "土壤湿度", icon: "circle" },
            { name: "PH", icon: "circle" },
            { name: "含水量", icon: "circle" },
            { name: "导电", icon: "circle" },
          ],
          textStyle: {
            fontSize: 12,
            color: "#2E80AD",
          },
          orient: "vertical",
          //标识的位置
          right: 1,
          top: 20,
          bottom: 50,
        },
        //设置canvas内部表格的内距
        grid: {
          // left: '3%',
          // right: '4%',
          // bottom: '3%',
          x: 10,
          y: 10,
          x2: 100,
          y2: 110,
          borderWidth: 10,
          borderHeight: 20,
          containLabel: true,
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
          type: "category",
          axisLabel: { interval: 0 },
          // boundaryGap: false,
          data: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "土壤温度",
            type: "line",
            stack: "总量",
            data: [2, 5, 10, 15, 8, 12, 14, 20, 23, 26, 30, 35, 40],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "土壤湿度",
            type: "line",
            stack: "总量",
            data: [2, 5, 10, 7, 8, 12, 10, 20, 23, 26, 20, 35, 40],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "PH",
            type: "line",
            stack: "总量",
            data: [],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "含水量",
            type: "line",
            stack: "总量",
            data: [],
          },
          {
            symbolSize: 1, //拐点大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.5, //折线宽度
                  // color:"#FF0000"//折线颜色
                },
              },
            },
            name: "导电",
            type: "line",
            stack: "总量",
            data: [],
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
        this.$refs.environmentChartOption.chart.setOption(
          this.environmentChartOption
        );
      });
    },
    soilEcharts() {
      this.$nextTick(() => {
        this.$refs.soilOption.chart.setOption(this.soilOption);
      });
    },
    changeStatis(val) {
      this.statics = val;
      setTimeout(() => {
        // 为了体现按钮动画 点击动画时长300ms
        if (val === 1 || val === 3) {
          this.tabs = false;
          this.chEcharts(); // 绘制图表
        } else {
          this.tabs = true;
          this.soilEcharts();
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

  .environmentChart {
    width: 100%;
    height: 100%;
  }

  .soil {
    width: 100%;
    height: 100%;
  }

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
        box-shadow: 2px 2px 30px #ff650b;
        /* 阴影效果 */
      }

      .water_zs {
        // 水波纹的大小位置设置
        width: 5vw;
        height: 5vw;
        left: 28%;
        top: -13%;
        border: 2px solid #ff650b;
        box-shadow: 2px 2px 30px #ff650b;
        /* 阴影效果 */
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
        box-shadow: 2px 2px 30px #35ece8;
        /* 阴影效果 */
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
        box-shadow: 2px 2px 30px #59ff85;
        /* 阴影效果 */
      }

      .water_bj {
        // 水波纹的大小位置设置
        width: 5vw;
        height: 5vw;
        left: 28%;
        top: -13%;
        border: 2px solid #35ece8;
        box-shadow: 2px 2px 30px #35ece8;
        /* 阴影效果 */
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
