<template>
  <div class="main">
    <div class="main_top">
      <div class="left">
        <img width="100%" height="90%" src="../../assets/img/ch/菜单栏.png" alt="">
        <div class="main_g">
          <img width="20%" height="20%" src="../../assets/img/home/g.png" alt="">
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
        title: '智慧种植',
        show: false,
        type: 'itermStylezz',
        class: 'animated fadeIn',
      }, {
        title: '智慧林业',
        show: false,
        type: 'itermStylely',
        class: 'animated fadeIn',
      }, {
        title: '智慧虫害',
        show: false,
        type: 'itermStylech',
        class: 'animated fadeIn',
      }, {
        title: '智慧养殖',
        show: false,
        type: 'itermStyleyz',
        class: 'animated fadeIn',
      }, {
        title: '智慧溯源',
        show: false,
        type: 'itermStylesy',
        class: 'animated fadeIn',
      }, {
        title: '数字建党',
        show: false,
        type: 'itermStyleKeydj',
        class: 'animated fadeIn',
      }
      ]
    }
  },
  created() {
    this.tabList.map(val => {
      if (val.type === this.$route.query.type) {
        val.show = true
      }
    })
  },
  methods: {
    chaneTab(index) {
      this.tabList.map(val => {
        val.class = 'animated fadeOut'
        val.show = false
      })
      this.tabList[index].class = 'animated fadeIn'
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
        width: 38%;
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
            top: -78%;
            z-index: 999;
            cursor: pointer;
            right: -2%;
          }
        }
      }
    }
  }
}
</style>