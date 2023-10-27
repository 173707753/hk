<template>
    <div class="top">
      <div class="st_titles">负荷数据</div>
      <div id="main" style="width: 400px; height: 200px;"></div>
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
        option :{
          xAxis: {
            name: 't/min',
            nameTextStyle: {
              // fontWeight: 'bold' ,// 将名称的字体加粗
            //   fontSize: '16px'
            },
            type: 'category',
            data: Array.from({ length: 97 }, (_, i) => i),
            axisLabel: {
              show: true,
              interval: 3,
              textStyle: {
                // fontWeight: 'bold' ,
                // fontSize: '16'// 将字体加粗,
              }
            },
            axisLine: {
              lineStyle: {
                color: 'black' // 设置轴线的颜色为黑色
              }
            },
          },
          yAxis: {
            type: 'value',
            min: 1.18,
            // splitLine: {
            //       show: true,
            //       lineStyle: {
            //           width: 1, // 设置线条宽度，加粗
            //           color: 'black' // 设置线条颜色
            //       }
            //   },
            name: '[1+(∑△P)/L][t]',
            nameTextStyle: {
              // fontWeight: 'bold', // 将名称的字体加粗
              fontSize: '16px',
              color: 'black' // 设置轴线的颜色为黑色
            },
            axisLabel: {
              textStyle: {
                // fontWeight: 'bold' ,// 将字体加粗
                fontSize: '16px',
                color: 'black'
              }
            },
  
          },
          legend: {
            data: ['模型1 供电能力', '模型2 供电能力',],
            left: 'center',
            bottom: 0,
            textStyle: {
              fontSize: 16 // 设置字体大小为 16px
            }
          },
          title: [
            {
              left: 'center',
              text: '供电能力对比',
            }
          ],
          series: [
            {
              data: [1.437334941, 1.396603415, 1.403733217, 1.404255626, 1.407375312, 1.412554372, 1.418608173, 1.421058654, 1.423502155, 1.429201845, 1.433617941, 1.433113629, 1.438426015, 1.438817412, 1.44249221, 1.443887884, 1.444671681, 1.446338845, 1.44234993, 1.440527385, 1.43749995, 1.429962343, 1.422498056, 1.412203363, 1.399987898, 1.389568911, 1.377153453, 1.36466563, 1.350668806, 1.336910239, 1.319718651, 1.30936152, 1.294933011, 1.284650514, 1.278595113, 1.273976553, 1.272283633, 1.270041396, 1.269047009, 1.266372359, 1.265934983, 1.262426909, 1.260719968, 1.258119095, 1.25699763, 1.256727292, 1.261028603, 1.267318899, 1.274039411, 1.278912942, 1.282443906, 1.283969037, 1.285566927, 1.28621318, 1.287353325, 1.287110398, 1.288156556, 1.28678673, 1.287424114, 1.286696269, 1.285871911, 1.283269898, 1.280194026, 1.276684705, 1.273593586, 1.269442872, 1.264539774, 1.258548639, 1.250775009, 1.245862394, 1.245334819, 1.246218128, 1.247311886, 1.253950471, 1.254907733, 1.258791564, 1.258444121, 1.261477565, 1.261056462, 1.265134237, 1.268361919, 1.269948471, 1.273916008, 1.279009499, 1.285771274, 1.294512869, 1.302627169, 1.310865113, 1.31817162, 1.321955946, 1.327225081, 1.338431233, 1.346693509],
              type: 'line',
              symbol: 'circle',
              name: '模型1 供电能力',
              smooth: true,
            },
            {
              data: [1.369318509, 1.334080017, 1.338836954, 1.341843801, 1.347044859, 1.352256307, 1.356654752, 1.361696758, 1.365912217, 1.370942158, 1.375391092, 1.377435823, 1.380337893, 1.382320337, 1.38522342, 1.387585697, 1.389132591, 1.389464623, 1.387681918, 1.386333161, 1.384192859, 1.380679436, 1.373693676, 1.364137932, 1.352239551, 1.340608344, 1.327628967, 1.319052434, 1.311448409, 1.304977549, 1.291308008, 1.28363503, 1.266162243, 1.255932537, 1.249782109, 1.244505422, 1.244001467, 1.238471285, 1.237104835, 1.234996247, 1.235254112, 1.229471251, 1.228482802, 1.22581508, 1.226220638, 1.225205587, 1.230272305, 1.235183993, 1.237522686, 1.241369987, 1.243468791, 1.247821663, 1.248894597, 1.248753893, 1.251601089, 1.250764457, 1.254473231, 1.249932053, 1.25188904, 1.250704868, 1.248614267, 1.247262915, 1.245174682, 1.243311085, 1.242045701, 1.235732759, 1.229550209, 1.218373772, 1.209084769, 1.199645877, 1.196139587, 1.196341014, 1.198045809, 1.201770724, 1.203205601, 1.205507665, 1.206271428, 1.209599004, 1.212938644, 1.216392239, 1.220850678, 1.223466755, 1.228831792, 1.235279834, 1.243733764, 1.252302476, 1.259047316, 1.267931718, 1.274311339, 1.280617513, 1.286729165, 1.29819851, 1.305016602],
              type: 'line',
              symbol: 'circle',
              name: '模型2 供电能力'
            },
          ]
        }
      }
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById('main'));
      this.myChart.setOption(this.option);
    },
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
    .diseases {
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
  }</style>
  