<template>
  <div class="main">
    <div class="main_top">
      <div class="left">
        <img width="100%" height="90%" src="../../assets/img/ch/顶部背景.png" alt="">
        <div class="main_g" style="margin-top: -6px;">
          <img width="20%" height="20%" src="../../assets/img/home/g.png" alt="">
        </div>
        <div style="color: rgb(226, 236, 255);font-size: 3vh;font-weight: bold;position: absolute;top: 30%;left: 6%;">
          大电网调度数据管理
        </div>
        <div style="color: rgb(226, 236, 255);font-size: 4.8vh;font-weight: bold;position: absolute;top: 50%;left: 35%;">
          <!-- 电力碳中和智能化调度 -->
          新型电力系统智能化调度评估
        </div>
        <div class="right">
          <div v-for="(item, index) in tabList" :key="index" class="tabs">
            <div class="tabitem" @click="chaneTab(index)">
              {{ item.title }}
            </div>
            <!-- <div class="tabimg"> -->

            <img :class="item.title === '新能源消纳'? 'newstyle':'tabimg'" width="150%" v-if="item.show" height="auto" src="../../assets/img/ch/tabg.png" alt="">
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
import util from '@/utils/request.js';
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
        title: '新能源消纳',
        show: false,
        type: 'itermStylely',
        class: 'animated fadeIn',
      }, {
        title: '直流消纳',
        show: false,
        type: 'itermStylech',
        class: 'animated fadeIn',
      }, {
        title: '电力支援',
        show: false,
        type: 'itermStyleyz',
        class: 'animated fadeIn',
      },
      ],
      // 省份数据
      data1: {
        selectedProvince: '河南省',
        selectedArea: '洛北济源'
      },
      flag: 2,
    }
  },
  created() {
    this.tabList[0].show = true;
    this.tabList.map(val => {
      console.log(val);
      // if (val.type === this.$route.query.type) {
      //   val.show = true
      // }

    })

  },
  mounted() {
    this.chaneTab(0);
    // 发送标识符
    this.$bus.$emit('flagData', this.flag)
  },
  methods: {
    chaneTab(index) {
      if (index === 0) {
        this.flag = 2
      } else if (index === 1) {
        this.flag = 1
      }
      // 发送标识符
      this.$bus.$emit('flagData', this.flag)

      const postData = {
        region: this.data1.selectedProvince,
        district: this.data1.selectedArea,
        flag: this.flag,
      };
      // 右侧结果数据
      util.post('/api/get_result_data', postData)
        .then(response => {
          // 处理POST请求的响应
          if (response && response.code === 200) {
            // 请求成功的处理逻辑
            this.$bus.$emit('rightData', response.data)
          } else {
            // 请求失败的处理逻辑
            this.$message.error('服务器错误')
            // console.error('POST请求失败', response);
          }
        })
        .catch(error => {
          // 处理POST请求的错误
          console.error('POST请求错误', error);
        });
      // 接收省份区域数据
      this.$bus.$on("allData2", (data) => {
        this.data1 = data;
      })
      this.tabList.map(val => {
        // val.class = 'animated fadeOut'
        val.show = false
      })
      // this.tabList[index].class = 'animated fadeIn'
      this.tabList[index].show = true
    }
  },
  beforeDestroy() {
    this.$bus.$off('allData2')
  },
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
      padding: 15px 0 0 20px;

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
          .newstyle{
            position: absolute;
            top: -110%;
            z-index: 999;
            cursor: pointer;
            right: -5%;
          }
        }
      }
    }
  }
}
</style>