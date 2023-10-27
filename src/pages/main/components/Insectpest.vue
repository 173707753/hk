<template>
  <div class="Insectpest">
    <div class="Insectpest_t">
      <!-- 左边数据 -->
      <div class="Insectpest_t_left">
        <watcherStatics />
        <!-- <div class="bot"></div> -->
        <watcherEcharts />
      </div>
      <!-- 中间地图 -->
      <div class="Insectpest_t_center">
        <Map />
      </div>
      <!-- 右边数据 -->

      <div class="Insectpest_t_right">
        <div class="title">源网储荷优化调度</div>
        <div class="content">
          <div class="top">
            <chartPower1 />
          </div>
          <div class="bot">
            <chartPower2></chartPower2>
          </div>
          <div class="bot">
            <chartPower3></chartPower3>
          </div>
          <div class="bot">
            <chartPower4></chartPower4>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="Insectpest_b">
      <div class="Insectpest_b_left">
        <expert />
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
import watcherStatics from './Insectpest/watcherStatics' // 左边数据的上半部分(观察者)
import watcherEcharts from './Insectpest/watcherEcharts' // 左边数据的下半部分(观察者)
import Map from './Insectpest/map' // 中间地图
// import watcherStatistical from './Insectpest/watcherStatistical' //右边数据的上半部分(观察者)
// import watcherEnvironmental from './Insectpest/watcherEnvironmental' //右边中间数据
import warningInformation from './Insectpest/warningInformation' //预警信息
import expert from './Insectpest/expert' //专家服务
import chartPower1 from './Insectpest/rightDate/chart1.vue'
import chartPower2 from './Insectpest/rightDate/chart2.vue'
import chartPower3 from './Insectpest/rightDate/chart3.vue'
import chartPower4 from './Insectpest/rightDate/chart4.vue'

import greenServices from './Insectpest/greenServices' //绿色服务
export default {
  components: { watcherStatics, watcherEcharts, Map, expert, greenServices,warningInformation, chartPower1, chartPower2, chartPower3, chartPower4 },
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
    width: 24%;
    height: 60vh;
  }

  .Insectpest_t_center {
    width: 49%;
    height: 60vh;
    position: relative;
    overflow: hidden;
  }

  .Insectpest_t_right {
    width: 24%;
    height: 60vh;

    .title {
      color: #fff;
      font-size: 24px;
      text-align: center;
      margin-bottom: 10px;
    }

    .content {
      height: 58vh;

      overflow-y: scroll;
      overflow-x: hidden;
    }
    .content::-webkit-scrollbar {
      width: 4px;
    }

    /* 定义滚动条的轨道样式 */
    .content::-webkit-scrollbar-track {
      background: #4f668e ;
      /* 滚动条轨道颜色 */
    }

    /* 定义滚动条滑块（thumb）的样式 */
    .content::-webkit-scrollbar-thumb {
      background: #525579;
      /* 滚动条滑块颜色 */
    }

    .top {
      width: 100%;
      height: 30vh;
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
      width: 24%;
      // background-color: #fff;
      height: 20vh;
    }

    .Insectpest_b_center {
      width: 48%;
      // height: 20vh;
      // background-color: #fff;
    }

    .Insectpest_b_right {
      width: 24%;
      height: 20vh;
      // background-color: #fff;
    }
  }
}

/* 定义滚动条的样式 */
.title::-webkit-scrollbar {
  width: 4px;
  /* 设置滚动条宽度 */
}

/* 定义滚动条的轨道样式 */
.title::-webkit-scrollbar-track {
  background: #4f668e;
  /* 滚动条轨道颜色 */
}

/* 定义滚动条滑块（thumb）的样式 */
.title::-webkit-scrollbar-thumb {
  background: #525579;
  /* 滚动条滑块颜色 */
}</style>