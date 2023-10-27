<template>
    <div class="top">
      <div class="st_titles">储能数据</div>
     
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
  