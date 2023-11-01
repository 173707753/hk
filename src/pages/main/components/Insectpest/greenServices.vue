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
    <div class="st_bo" v-if="!tabs">
      <!-- <div class="nyzb">
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
        <p class="desc">服务人数</p>
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
        <p class="desc">服务面积</p>
      </div>
      <div class="lszz">
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
        <p class="desc">农药减排</p>
      </div> -->
    </div>
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
  // height: 20vh;
  height: 100%;
  background-image: url("../../../../assets/img/ch/绿色服务/绿色服务.png");
  background-size: 100% 107%;
  background-repeat: no-repeat;

}
 
</style>
