<template>
  <div class="Insectpest">
    <div class="Insectpest_t">
      <!-- 左边数据 -->
      <div class="Insectpest_t_left">
        <div class="scrollable-content">
          <left1 />
          <left2 style="margin-top: 2vh;" />
          <left3 style="margin-top: 2vh;" />
          <left4 style="margin-top: 2vh;" />
        </div>
      </div>
      <!-- 中间地图 -->
      <div class="Insectpest_t_center">
        <!-- <div style="text-align: center;color: rgb(55, 209, 259);font-size: 32px;position: absolute;">
          电力碳中和智能化调度
        </div> -->
        <Map />
      </div>
      <!-- 右边数据 -->
      <!-- <div class="title">源网储荷优化调度</div> -->
      <div class="Insectpest_t_right">
        <div class="title">源网储荷优化调度</div>
        <div class="content">
          <div class="top">
            <chart1 />
          </div>
          <div class="bot">
            <chart2 />
          </div>
          <div class="bot">
            <chart3 />
          </div>
          <div class="bot">
            <chart4 />
          </div>
        </div>
      </div>


    </div>
    <!-- 底部 -->
    <div class="Insectpest_b">
      <div class="Insectpest_b_left">
        <left5 />
      </div>
      <div class="Insectpest_b_center">
        <warningInformation />
      </div>
      <div class="Insectpest_b_right">
        <greenServices />
      </div>
    </div>
  </div>
</template>

<script>
import left1 from './Insectpest/left/left1'
import left2 from './Insectpest/left/left2'
import left3 from './Insectpest/left/left3'
import left4 from './Insectpest/left/left4'
import left5 from './Insectpest/left5'
import Map from './Insectpest/map'
import chart1 from './Insectpest/rightDate/chart1'
import chart2 from './Insectpest/rightDate/chart2'
import chart3 from './Insectpest/rightDate/chart3'
import chart4 from './Insectpest/rightDate/chart4'

// import watcherStatistical from './Insectpest/watcherStatistical'
// import watcherEnvironmental from './Insectpest/watcherEnvironmental'
import warningInformation from './Insectpest/warningInformation'
import greenServices from './Insectpest/greenServices'

import Vue from 'vue';
export default {
  components: {
    Map,
    left1,
    left2,
    left3,
    left4,
    left5,
    warningInformation,
    greenServices,
    chart1,
    chart2,
    chart3,
    chart4
  },
  data() {
    return {
      role: 'watcher'
    }
  },
  created() {
    this.role = 'production' // 生产者
  }
}
</script>

<style lang="scss" scoped>
.Insectpest {
  width: 100%;
  height: 100%;

  .Insectpest_t {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 20px;
  }

  .Insectpest_t_left {
    width: 27%;
    height: 60vh;

    .scrollable-content {
      width: 100%;
      height: 60vh;
      /* 启用垂直滚动条 */
      overflow-y: auto;

      /* 自定义滚动条样式 */
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: #4f668e;
        /* 滚动条滑块的颜色 */
        border-radius: 4px;
      }

      &::-webkit-scrollbar-track {
        background: #525579;
        /* 滚动条轨道的颜色 */
        border-radius: 4px;
      }
    }
  }

  .Insectpest_t_center {
    display: flexs;
    width: 45%;
    height: 60vh;
    position: relative;
    overflow: hidden;
  }

  .Insectpest_t_right {
    width: 27%;
    height: 60vh;
    position: relative;

    .title {
      width: 100%;
      height: 40px;
      padding-bottom: 10px;
      color: #fff;
      // background: pink;
      font-size: 28px;
      text-align: center;
      position: absolute;
      top: -25px;
      right: 0px;
    }

    .content {
      width: 100%;
      height: 58vh;
      overflow-x: hidden;
      overflow-y: scroll;
      margin-top: 26px;
    }

    /* 定义滚动条的样式 */
    .content::-webkit-scrollbar {
      width: 4px;
    }

    .content::-webkit-scrollbar-track {
      background: #525579;
    }

    .content::-webkit-scrollbar-thumb {
      background: #4f668e;
      /* 滚动条滑块颜色 */
    }

    .top {
      width: 100%;
      height: 28vh;
      // background-color: red;
    }

    .bot {
      margin-top: 2vh;
      width: 100%;
      height: 28vh;
      // background-color: red;
    }
  }

  .Insectpest_b {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 1.5%;

    .Insectpest_b_left {
      width: 27%;
      // background-color: #fff;
      height: 24vh;
    }

    .Insectpest_b_center {
      width: 45%;
      height: 24vh;
      // background-color: #fff;
    }

    .Insectpest_b_right {
      width: 27%;
      height: 24vh;
      // background-color: #fff;
    }
  }
}</style>