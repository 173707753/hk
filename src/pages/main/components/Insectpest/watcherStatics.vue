<template>
  <div class="top">
    <div class="st_titles">
      电源
    </div>
    <div class="st_tops">
      <div class="st_dw">
        <img width="10%" height="auto" src="../../../../assets/img/ch/zb.png" alt="">
        湖北省武汉市洪山区
      </div>
      <div class="smalltab">
        <img width="40%" height="auto" @click="changeStatis(1)" :class="statics == '1' ? `clickSmalls` : ''" v-if="!tabs"
          src="../../../../assets/img/ch/sjx.png" alt="">
        <img width="40%" height="auto" @click="changeStatis(2)" :class="statics == '2' ? `clickSmalls` : ''" v-if="!tabs"
          src="../../../../assets/img/ch/chw.png" alt="">
        <img width="40%" height="auto" @click="changeStatis(3)" :class="statics == '3' ? `clickSmalls` : ''" v-if="tabs"
          src="../../../../assets/img/ch/sjw.png" alt="">
        <img width="40%" height="auto" @click="changeStatis(4)" :class="statics == '4' ? `clickSmalls` : ''" v-if="tabs"
          src="../../../../assets/img/ch/chx.png" alt="">
      </div>
    </div>
    <div class="st_bo" v-if="!tabs">
      <div class="nyzb">
        <img width="40%" height="auto" src="../../../../assets/img/ch/nyzb.png" alt="">
        <!-- 水波纹 -->
        <div class="waterpulse water_zb"></div>
        <div class="waterpulse1 water_zb"></div>
        <!-- 水波纹 -->
        <p>
          <span class="count">8623</span><span class="dw">台</span>
        </p>
        <p class="desc">农业装备数</p>
      </div>
      <div class="lsjp">
        <img width="40%" height="auto" src="../../../../assets/img/ch/lsjp.png" alt="">
        <!-- 水波纹 -->
        <div class="waterpulse water_jp"></div>
        <div class="waterpulse1 water_jp"></div>
        <!-- 水波纹 -->
        <p>
          <span class="count">558</span><span class="dw">亩</span>
        </p>
        <p class="desc">绿色减排</p>
      </div>
      <div class="lszz">
        <img width="40%" height="auto" src="../../../../assets/img/ch/lszz.png" alt="">
        <!-- 水波纹 -->
        <div class="waterpulse water_zz"></div>
        <div class="waterpulse1 water_zz"></div>
        <!-- 水波纹 -->
        <p>
          <span class="count">58</span><span class="dw">%</span>
        </p>
        <p class="desc">绿色增值</p>
      </div>
    </div>
    <div class="st_bo" v-if="tabs">
      <div class="nyzb">
        <img width="30%" height="auto" src="../../../../assets/img/ch/hczs.png" alt="">
        <!-- 水波纹 -->
        <div class="waterpulse water_zs"></div>
        <div class="waterpulse1 water_zs"></div>
        <!-- 水波纹 -->
        <p>
          <span class="count">8623</span><span class="dw">只</span>
        </p>
        <p class="desc">虫害总数</p>
      </div>
      <div class="lszz">
        <img width="30%" height="auto" src="../../../../assets/img/ch/hcbj.png" alt="">
        <!-- 水波纹 -->
        <div class="waterpulse water_bj"></div>
        <div class="waterpulse1 water_bj"></div>
        <!-- 水波纹 -->
        <p>
          <span class="count">58</span><span class="dw">只</span>
        </p>
        <p class="desc">同时段比较</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: false,
      statics: 0,
    }
  },
  methods: {
    changeStatis(val) {
      this.statics = val
      setTimeout(() => {
        // 为了体现按钮动画 点击动画时长300ms
        if (val === 1 || val === 3) {
          this.tabs = false
        } else {
          this.tabs = true
        }
      }, 150)
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  z-index: 99999;
  height: 28vh;
  background-image: url('../../../../assets/img/ch/statis.png');
  background-size: 100% auto;
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
    display: flex;
    margin-top: 5%;
    justify-content: space-around;

    .desc {
      font-size: 1vh;
      color: #AFBAE0;
    }

    p {
      margin-top: 1vh;
    }

    .nyzb {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00A3FF3d;

      .water_zb {
        // 水波纹的大小位置设置
        width: 4vw;
        height: 4vw;
        left: 23%;
        top: -9%;
        border: 2px solid #FF650B;
        box-shadow: 2px 2px 30px #FF650B;
        /* 阴影效果 */
      }

      .water_zs {
        // 水波纹的大小位置设置
        width: 5vw;
        height: 5vw;
        left: 28%;
        top: -13%;
        border: 2px solid #FF650B;
        box-shadow: 2px 2px 30px #FF650B;
        /* 阴影效果 */
      }

      .count {
        font-family: countFont;
        color: #FFBF2C;
        font-weight: 600;
        font-size: 3vh;
      }

      .dw {
        font-size: 1vh;
        margin-left: 2px;
        color: #FFBF2C;
      }
    }

    .lsjp {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00A3FF3d;

      .water_jp {
        // 水波纹的大小位置设置
        width: 4vw;
        height: 4vw;
        left: 23%;
        top: -9%;
        border: 2px solid #35ECE8;
        box-shadow: 2px 2px 30px #35ECE8;
        /* 阴影效果 */
      }

      .count {
        font-family: countFont;
        color: #35ECE8;
        font-weight: 600;
        font-size: 3vh;
      }

      .dw {
        font-size: 1vh;
        color: #35ECE8;
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
        border: 2px solid #59FF85;
        box-shadow: 2px 2px 30px #59FF85;
        /* 阴影效果 */
      }

      .water_bj {
        // 水波纹的大小位置设置
        width: 5vw;
        height: 5vw;
        left: 28%;
        top: -13%;
        border: 2px solid #35ECE8;
        box-shadow: 2px 2px 30px #35ECE8;
        /* 阴影效果 */
      }

      .count {
        font-family: countFont;
        color: #3DD780;
        font-weight: 600;
        font-size: 3vh;
      }

      .dw {
        font-size: 1vh;
        color: #3DD780;
        margin-left: 2px;
      }
    }
  }
}</style>
