<template>
  <div class="bot">
    <div class="st_titles">
      GIS数据筛选
    </div>
    <GisSelection></GisSelection>
  </div>
</template>

<script>
import GisSelection from './left/GisSelection.vue';
export default {
  components: {
    GisSelection
  },
  data() {
    return {

    };
  },
  created() {

  },
  methods: {

  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.bot {
  width: 100%;
  z-index: 99999;
  // height: 20vh;
  height: 100%;
  background-image: url("../../../../assets/img/ch/绿色服务/绿色服务.png");
  background-size: 100% 107%;
  background-repeat: no-repeat;

}
</style>
