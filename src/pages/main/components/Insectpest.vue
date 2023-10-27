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
        <div class="top">
          <watcherStatistical />
        </div>
        <div class="bot">
          <watcherEnvironmental />
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
import watcherStatistical from './Insectpest/watcherStatistical' //右边数据的上半部分(观察者)
import watcherEnvironmental from './Insectpest/watcherEnvironmental' //右边中间数据
import warningInformation from './Insectpest/warningInformation' //预警信息
import expert from './Insectpest/expert' //专家服务
import greenServices from './Insectpest/greenServices' //绿色服务
export default {
  components: { watcherStatics, watcherEcharts, Map, watcherStatistical ,watcherEnvironmental,expert,warningInformation,greenServices},
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
.Insectpest{
  width: 100%;
  height: 100%;
  .Insectpest_t{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 20px;
  }
  .Insectpest_t_left{
    width: 24%;
    height: 60vh;
  }
  .Insectpest_t_center{
    width: 49%;
    height: 60vh;
    position: relative;
    overflow: hidden;
  }
  .Insectpest_t_right{
    width: 24%;
    height: 60vh;
    .top{
      width: 100%;
      height: 30vh;
      // background-color: red;
    }
    .bot{
      margin-top: 2vh;
      width: 100%;
      height: 28vh;
      // background-color: red;
    }
  }
  .Insectpest_b{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 1.5%;
    .Insectpest_b_left{
      width: 24%;
      // background-color: #fff;
      height: 20vh;
    }
    .Insectpest_b_center{
      width: 48%;
      // height: 20vh;
      // background-color: #fff;
    }
    .Insectpest_b_right{
      width: 24%;
      height: 20vh;
      // background-color: #fff;
    }
  }
}
</style>