<template>
  <div class="top">
    <div class="st_titles">电网优化运行指标库</div>
    <div class="st_tops">
      <div v-for="(item, index) in dataimg" :key="index" class="item">
        <img width="88%" height="auto" class="bg" :src="item.src" alt="">
        <div class="contant"
          :style="item.type == 1 ? 'color:#FFC22E' : item.type == 2 ? 'color:#5EC2F2' : item.type == 3 ? 'color:#FF4528' : 'color:#bfc'">
          <img width="13%" height="auto" :src="item.summer" alt="">
          <p class="txt" :title="item.txt">
            {{ item.txt.length > 10 ? item.txt.slice(0, 9) + '...' : item.txt }}
          </p>
          <p class="date">{{ item.date }}</p>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: false,
      statics: 0,
      dataimg: [
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网电力保供裕度系数",
          type: 1
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网电量保供裕度系数",
          type: 1
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网电力保供裕度系数",
          type: 1
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网电量保供裕度系数",
          type: 1
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网水电电力电量消纳率",
          type: 2
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网水电电力电量消纳率",
          type: 2
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网新能源电力电量消纳率",
          type: 2
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网网新能源电力电量消纳率",
          type: 2
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "省网跨区消纳直流能力",
          type: 3
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "区域电网跨区消纳直流能力",
          type: 3
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "紧急大功率支撑",
          type: 3
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "跨区转送能力",
          type: 3
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "应急备用平衡度",
          type: 4
        },
        {
          src: require("../../../../assets/img/ch/card.png"),
          txt: "保供备用平衡度",
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
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  z-index: 99999;
  height: 100%;
  background-image: url("../../../../assets/img/ch/预警信息/预警信息.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position-y: 10%;

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
        margin-bottom: 1%;
      }

      .contant {
        img {
          // animation: myfirst 1s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
        }

        position: absolute;
        top: 15%;
        width: 80%;
        left: 10%;
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
          font-size: 1.5vh;
          cursor: default;
        }
      }
    }
  }
}
</style>
