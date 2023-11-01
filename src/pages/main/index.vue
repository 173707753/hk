<template>
  <div class="main">
    <div class="main_top">
      <div class="left">
        <img width="100%" height="90%" src="../../assets/img/ch/顶部背景.png" alt="">
        <div class="main_g" style="margin-top: -20px;">
          <img width="20%" height="20%" src="../../assets/img/home/g.png" alt="">
        </div>
        <div style="color: rgb(226, 236, 255);font-size: 28px;font-weight: bold;position: absolute;top: 18%;left: 9%;">
          电力大数据
        </div>
        <div style="color: rgb(226, 236, 255);font-size: 36px;font-weight: bold;position: absolute;top: 28%;left: 28%;">
          电力碳中和智能化调度
        </div>
        <div class="right">
          <div v-for="(item, index) in tabList" :key="index" class="tabs">
            <div class="tabitem" @click="chaneTab(index)">
              {{ item.title }}
            </div>
            <!-- <div class="tabimg"> -->

            <img class="tabimg" width="150%" v-if="item.show" height="auto" src="../../assets/img/ch/tabg.png" alt="">
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="main_center">
      <Insectpest style="z-index:-9" :class="tabList[2].class" />
    </div>
  </div>
</template>

<script>
import Insectpest from './components/Insectpest'
export default {
  components: {
    Insectpest
  },
  data() {
    return {
      tabList: [{
        title: '供电能力',
        show: false,
        type: 'itermStylezz',
        class: 'animated fadeIn',
      }, {
        title: '清洁能源消纳',
        show: false,
        type: 'itermStylely',
        class: 'animated fadeIn',
      }, {
        title: '储能调控',
        show: false,
        type: 'itermStylech',
        class: 'animated fadeIn',
      }, {
        title: '应急调度',
        show: false,
        type: 'itermStyleyz',
        class: 'animated fadeIn',
      },
      ]
    }
  },
  created() {
    this.tabList.map(val => {
      console.log(val);
      // if (val.type === this.$route.query.type) {
      //   val.show = true
      // }
    })
  },
  methods: {
    chaneTab(index) {
      this.tabList.map(val => {
        // val.class = 'animated fadeOut'
        val.show = false
      })
      // this.tabList[index].class = 'animated fadeIn'
      this.tabList[index].show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/map/bg.jpg');
  background-size: 100% auto;
  background-position-y: 100%;

  .main_top {
    display: flex;

    .left {
      position: relative;

      .right {
        position: absolute;
        color: #fff;
        display: flex;
        width: 28%;
        justify-content: space-around;
        right: 0;
        top: 37%;
        z-index: 999;

        .tabs {
          width: 100%;
          position: relative;

          .tabitem {
            cursor: pointer;
            font-size: 1.8vh;
          }

          .tabimg {
            position: absolute;
            top: -110%;
            z-index: 999;
            cursor: pointer;
            right: 2%;
          }
        }
      }
    }
  }
}
</style>