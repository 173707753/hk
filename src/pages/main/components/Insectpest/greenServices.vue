<template>
  <div class="top">
    <div class="st_titles">数据总览</div>
    <!-- <div class="st_tops">
      <div class="st_dw">
        <img width="10%" height="auto" src="../../../../assets/img/ch/zb.png" alt="">
        浙江省杭州市拱墅区
      </div>
      <div class="smalltab">
        <img width="40%" height="auto" @click="changeStatis(1)" :class="statics == '1' ? `clickSmalls` : ''" v-if="!tabs" src="../../../../assets/img/ch/sjx.png" alt="">
        <img width="40%" height="auto" @click="changeStatis(2)" :class="statics == '2' ? `clickSmalls` : ''" v-if="!tabs" src="../../../../assets/img/ch/chw.png" alt="">
        <img width="40%" height="auto" @click="changeStatis(3)" :class="statics == '3' ? `clickSmalls` : ''" v-if="tabs" src="../../../../assets/img/ch/sjw.png" alt="">
        <img width="40%" height="auto" @click="changeStatis(4)" :class="statics == '4' ? `clickSmalls` : ''" v-if="tabs" src="../../../../assets/img/ch/chx.png" alt="">
      </div>
    </div> -->
    <!-- <div class="st_bo" v-if="!tabs">
      <div class="nyzb">
        <img
          width="50%"
          height="auto"
          src="../../../../assets/img/ch/绿色服务/service.png"
          alt=""
          class="rotating_pic"
        />
        <img
          src="../../../../assets/img/ch/绿色服务/service2.png"
          alt=""
          class="rotating2_pic"
        />
        <p>
          <span class="count">2456</span>
        </p>
        <p class="desc">河南省出力</p>
      </div>
      <div class="lsjp">
        <img
          width="50%"
          height="auto"
          src="../../../../assets/img/ch/绿色服务/area.png"
          alt=""
          class="rotating_pic"
        />
        <img
          src="../../../../assets/img/ch/绿色服务/area2.png"
          alt=""
          class="rotating2_pic"
        />
        <p>
          <span class="count">2234</span>
        </p>
        <p class="desc">江西省出力</p>
      </div>
      <div class="lszz ">
        <img
          width="50%"
          height="auto"
          src="../../../../assets/img/ch/绿色服务/pesticide.png"
          alt=""
          class="rotating_pic"
        />
        <img
          src="../../../../assets/img/ch/绿色服务/pesticide2.png"
          alt=""
          class="rotating2_pic"
        />
        <p>
          <span class="count">2234</span>
        </p>
        <p class="desc">湖北省出力</p>
      </div>
      <div class="hns">
        <img
          width="50%"
          height="auto"
          src="../../../../assets/img/ch/绿色服务/service.png"
          alt=""
          class="rotating_pic"
        />
        <img
          src="../../../../assets/img/ch/绿色服务/service2.png"
          alt=""
          class="rotating2_pic"
        />
        <p>
          <span class="count">2456</span>
        </p>
        <p class="desc">湖南省出力</p>
      </div>
      <div class="hzdwc">
        <img
          width="50%"
          height="auto"
          src="../../../../assets/img/ch/绿色服务/area.png"
          alt=""
          class="rotating_pic"
        />
        <img
          src="../../../../assets/img/ch/绿色服务/area2.png"
          alt=""
          class="rotating2_pic"
        />
        <p>
          <span class="count">2234</span>
        </p>
        <p class="desc">华中电网出力</p>
      </div>
      <div class="hzdwb ">
        <img
          width="50%"
          height="auto"
          src="../../../../assets/img/ch/绿色服务/pesticide.png"
          alt=""
          class="rotating_pic"
        />
        <img
          src="../../../../assets/img/ch/绿色服务/pesticide2.png"
          alt=""
          class="rotating2_pic"
        />
        <p>
          <span class="count">2234</span>
        </p>
        <p class="desc">华中电网备份</p>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: false,
      statics: 0,
    };
  },
  methods: {
    changeStatis(val) {
      this.statics = val;
      setTimeout(() => {
        // 为了体现按钮动画 点击动画时长300ms
        if (val === 1 || val === 3) {
          this.tabs = false;
        } else {
          this.tabs = true;
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
  height: 26vh;
  // height: 100%;
  background-image: url("../../../../assets/img/ch/绿色服务/绿色服务.png");
  background-size: 100% 107%;
  background-repeat: no-repeat;
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
    // width: 100%;
    display: flex;
    margin-top: 5%;
    justify-content: space-around;
    .desc {
      font-size: 1.5vh;
      color: #C5C5C5;
      font-weight: 600;
      font-family: PingFangSC-Medium, PingFang SC;
          position: relative;
    top: -7vh;
    }
    p {
      margin-top: 1vh;
    }
    .nyzb {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;
      .rotating_pic {
        animation: myfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .rotating2_pic {
        position: relative;
        margin-top: -10.5vh;
        animation: nmyfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      // .water_zb {
      //   // 水波纹的大小位置设置
      //   width: 4vw;
      //   height: 4vw;
      //   left: 23%;
      //   top: -9%;
      //   border: 2px solid #FF650B;
      //   box-shadow: 2px 2px 30px #FF650B; /* 阴影效果 */
      // }
      // .water_zs{
      //   // 水波纹的大小位置设置
      //   width: 5vw;
      //   height: 5vw;
      //   left: 28%;
      //   top: -13%;
      //   border: 2px solid #FF650B;
      //   box-shadow: 2px 2px 30px #FF650B; /* 阴影效果 */
      // }
      .count {
        font-family: countFont;
        color: #ffbf2c;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -10.4vh;
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
      .rotating_pic {
        animation: myfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .rotating2_pic {
        position: relative;
        margin-top: -10.5vh;
       animation: nmyfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      // .water_jp {
      //   // 水波纹的大小位置设置
      //   width: 4vw;
      //   height: 4vw;
      //   left: 23%;
      //   top: -9%;
      //   border: 2px solid #35ece8;
      //   box-shadow: 2px 2px 30px #35ece8; /* 阴影效果 */
      // }
      .count {
        font-family: countFont;
        color: #35ece8;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -10.4vh;
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
      border-right: 1px solid #00a3ff3d;
     
      .rotating_pic {
        animation: myfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .rotating2_pic {
        position: relative;
        margin-top: -10.5vh;
        animation: nmyfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .count {
        font-family: countFont;
        color: #3dd780;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -10.4vh;
      }
      .dw {
        font-size: 1vh;
        color: #3dd780;
        margin-left: 2px;
      }
    }
    .hns {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;
     
      .rotating_pic {
        animation: myfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .rotating2_pic {
        position: relative;
        margin-top: -10.5vh;
        animation: nmyfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .count {
        font-family: countFont;
        color: #3dd780;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -10.4vh;
      }
      .dw {
        font-size: 1vh;
        color: #3dd780;
        margin-left: 2px;
      }
    }
    .hzdwc {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;
     
      .rotating_pic {
        animation: myfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .rotating2_pic {
        position: relative;
        margin-top: -10.5vh;
        animation: nmyfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .count {
        font-family: countFont;
        color: #3dd780;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -10.4vh;
      }
      .dw {
        font-size: 1vh;
        color: #3dd780;
        margin-left: 2px;
      }
    }
    .hzdwb {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;
     
      .rotating_pic {
        animation: myfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .rotating2_pic {
        position: relative;
        margin-top: -10.5vh;
        animation: nmyfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .count {
        font-family: countFont;
        color: #3dd780;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -10.4vh;
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
