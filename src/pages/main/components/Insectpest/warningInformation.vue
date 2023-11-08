<template>
  <div class="top">
    <div class="st_titles">电网优化运行指标库</div>
    <div style="display: flex;">
      <div class="title" style="color:#FFC22E;">供电能力指标</div>
      <div class="title" style="color:#5EC2F2;">清洁能源消纳能力指标</div>
      <div class="title" style="color:#FF4528;">综合调节能力指标</div>
      <div class="title" style="color:#bfc;">备用均衡度指标</div>
    </div>
    <div class="st_tops">
      <div v-for="(item, index) in dataimg" :key="index" class="item">
        <img width="88%" height="auto" class="bg" :src="item.src" alt="">
        <div class="contant" @click="showChart(item)"
          :style="item.style ? item.style : item.type == 1 ? 'color:#FFC22E' : item.type == 2 ? 'color:#5EC2F2' : item.type == 3 ? 'color:#FF4528' : 'color:#bfc'">
          <!-- <img width="13%" height="auto" :src="item.summer" alt=""> -->
          <p class="txt" :title="item.txt">
            {{ item.txt.length > 10 ? item.txt.slice(0, 9) + '...' : item.txt }}
          </p>
          <!-- <p class="date">{{ item.date }}</p> -->
        </div>
      </div>
    </div>
    <charts v-if="isClickOverBot" :allcharts="allcharts"></charts>
  </div>
</template>

<script>
import charts from './charts.vue';
export default {
  components: { charts },
  data() {
    return {
      tabs: false,
      statics: 0,
      isClickOverBot: false,
      allcharts: {},
      dataimg: [
        // {
        //   // src: require("../../../../assets/img/ch/card.png"),
        //   txt: "供电能力指标",
        //   type: 1,
        //   style: 'color:#FFC22E;'
        // },
        // {
        //   // src: require("../../../../assets/img/ch/card.png"),
        //   txt: "清洁能源消纳能力指标",
        //   type: 2,
        //   style: 'color:#5EC2F2;'
        // },
        // {
        //   // src: require("../../../../assets/img/ch/card.png"),
        //   txt: "综合调节能力指标",
        //   type: 3,
        //   style: 'color:#FF4528;'
        // },
        // {
        //   // src: require("../../../../assets/img/ch/card.png"),
        //   txt: "备用均衡度指标",
        //   type: 4,
        //   style: 'color:#bfc;'
        // },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网电力保供裕度系数",
          name: ["省网电力保供裕度系数"],
          type: 1,
          data: [
            //电力 6 10 12 14 16 20
            [0.778393, 0.780356, 0.761555, 0.738178, 0.627902, 0.312963],
          ]
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网水电电力电量消纳率",
          name: ['省网水电电力消纳率', '省网水电电量消纳率'],
          type: 2,
          data: [
            //电力 6 10 12 14 16 20
            [1.462710505, 1.496391, 1.478749, 1.493986, 0.879711, 1.278268],
            //电量
            [1.027465918, 1.496592, 1.477346, 1.281476, 0.37811, 1.297514]]
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网跨区消纳直流能力",
          name: ["省网跨区消纳直流能力"],
          type: 3,
          data: [
            [0.941529, 1.00833, 0.99983, 0.999792, 1.00372, 1.662200367]
          ]
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网保供备用均衡度",
          type: 4
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网电量保供裕度系数",
          name: ["省网电量保供裕度系数"],
          type: 1,
          data: [
            //电量 6 10 12 14 16 20
            [0.7161, 0.769858, 0.761004, 0.714304, 0.566868, 0.321235]
          ]
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网水电电力电量消纳率",
          type: 2,
          data: []
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网跨区消纳直流能力",
          type: 3
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网应急备用均衡度",
          type: 4
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网电力保供裕度系数",
          type: 1
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网新能源电力电量消纳率",
          type: 2,
          name: ['省网新能源电力消纳率', '省网新能源电量消纳率'],
          data: [
            // 电力 6 10 12 14 16 20
            [1.928554111, 0.758588, 0.632431, 0.76139, 1.002611, 11.42749],
            // 电量
            [2.570979678, 0.672332, 0.638077, 0.711882, 1.330991, 12.78544]
          ]
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "紧急大功率支撑",
          type: 3
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网保供备用均衡度",
          type: 4
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网电量保供裕度系数",
          type: 1
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网网新能源电力电量消纳率",
          type: 2,
          data: []
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "跨区转送能力",
          type: 3
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网应急备用均衡度",
          type: 4
        },
        // {
        //   src: require("../../../../assets/img/ch/card.png"),
        //   summer: require("../../../../assets/img/ch/预警信息/暴雨预警.png"),
        //   txt: "暴雨预警",
        //   date: '2021-03-12',
        //   type: 2
        // },
      ],
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
    showChart(data) {
      this.isClickOverBot = !this.isClickOverBot;
      this.allcharts = data;
      // console.log(this.allcharts, '数据');
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

  .title {
    width: 25%;
    text-align: center;
    font-size: 1.5vh;
    font-weight: bold;
  }

  .st_tops {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.7%;

    .item {
      &:hover {
        animation: clickSmall 800ms infinite;
        -webkit-animation: clickSmall 800ms infinite;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
       
      }

      text-align: center;
      position: relative;
      width: 25%;

      .bg {
        margin-bottom: 1.5%;
      }

      .contant {
        img {
          // animation: myfirst 1s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
        }
        position: absolute;
        top: 15%;
        width: 80%;
        left: 5%;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .contant_txt {
          display: flex;
          align-items: center;
        }

        .date {
          font-size: 1vh;
          transform: scale(0.8, 0.8);
          margin-top: 5px;
          cursor: default;
        }

        .txt {
          cursor: pointer;
          font-size: 1.5vh;
          // cursor: default;
          margin-left: 13%;
          margin-top: 3px;
        }
      }
    }
  }
}
</style>

