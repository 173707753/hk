<template>
  <div class="top">
    <div class="st_titles">专家服务</div>
    <div class="st_tops">
      <!-- <div></div> -->
      <span></span>
      <div class="st_dw">
        <!-- <img width="10%" height="auto" src="../../../../assets/img/ch/zb.png" alt=""> -->
        总答疑：
        <span class="count">568</span><span>次</span>
      </div>
    </div>
    <div>
      <el-carousel :interval="3000" arrow="never" height="11vh" type="card" >
        <el-carousel-item v-for="item in dataimg" :key="item.id">
          <div class="grid-content">
            <div>
              <img :src="item.src" style="height: 11vh" />
              <img
                :src="item.images"
                style="
                  position: relative;
                  bottom: 10vh;
                  font-size: 0.05vh;
                  color: #d1d1d1;
                  width: 3.5vw;
                  height: 4vw;
                  float: left;
                "
              />
              <p
                style="
                  position: relative;
                  bottom: 10vh;
                  font-size: 0.05vh;
                  color: #d1d1d1;
                  width: 8vw;
                  float: right;
                "
              >
                {{ item.txt }}
              </p>
              <p
                style="
                  position: relative;
                  bottom: 10vh;
                  font-size: 0.05vh;
                  color: #d1d1d1;
                  width: 8vw;
                  float: right;
                "
              >
                {{ item.txt3 }}
              </p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carouseId:0,
      tabs: false,
      statics: 0,
      dataimg: [
        {
          src: require("../../../../assets/img/ch/专家服务/专家服务-小框.png"),
          images: require("../../../../assets/img/ch/专家服务/1615447876(1).png"),
          txt: "张振明",
          txt3:
            '"农业科学院学术委员会委员 浙江省棉花学会理事 获省政府“黑山棉一号”推广二等奖"',
        },
        {
          src: require("../../../../assets/img/ch/专家服务/专家服务-小框.png"),
          images: require("../../../../assets/img/ch/专家服务/1615447876(1).png"),
          txt: "张振明",
          txt3:
            '"农业科学院学术委员会委员 浙江省棉花学会理事 获省政府“黑山棉一号”推广二等奖"',
        },
        {
          src: require("../../../../assets/img/ch/专家服务/专家服务-小框.png"),
          images: require("../../../../assets/img/ch/专家服务/1615447876(1).png"),
          txt: "张振明",
          txt3:
            '"农业科学院学术委员会委员 浙江省棉花学会理事 获省政府“黑山棉一号”推广二等奖"',
        },
      ],
    };
  },
  mounted(){
		// this.setPY();
	},
  methods: {

		// carouselChange:function(now,old){
		// 	console.log(now+"，"+old,'2222222'); 
		// 	this.carouseId = now;
		// 	this.setPY();
		// },
		// setPY(){
		// 	var _carouseId = this.carouseId;
		// 	if(_carouseId == 0){
		// 		$("#0").css("left","-15%");
		// 		$("#0").next().css("left","32%");				
		// 		$("#0").next().next().css("left","-62%");
		// 	}else if(_carouseId == 1){
		// 		$("#1").css("left","-15%");
		// 		$("#1").prev().css("left","-62%");
		// 		$("#1").next().css("left","32%");
		// 	}else{
		// 		$("#2").css("left","-15%");
		// 		$("#2").prev().css("left","-62%");		
		// 		$("#2").prev().prev().css("left","32%");
		// 	}
		// },
// 	}
// })

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
  height: 28vh;
  background-image: url("../../../../assets/img/ch/专家服务/expertService.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  .st_dw {
    width: 60%;
    font-size: 1vh;
    display: flex;
    align-items: center;
    // justify-content: center;
    color: #afbae0;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    .count {
      font-family: countFont;
      color: #ffbf2c;
      font-weight: 600;
      font-size: 3vh;
    }
  }
  .smalltab {
    width: 45%;
    position: relative;
    display: flex;
    margin-right: 2%;
    justify-content: flex-end;
    align-items: flex-end;
    img {
      z-index: 9999;
      cursor: pointer;
    }
    .small_tabs {
      position: relative;
      p {
        cursor: pointer;
        z-index: 9999;
        right: 13%;
        top: 4%;
        margin-top: 5%;
        position: absolute;
      }
      font-size: 1vh;
      text-align: right;
    }
    .small_tabsed {
      position: relative;
      p {
        cursor: pointer;
        z-index: 9999;
        left: 8%;
        top: 4%;
        position: absolute;
      }
      font-size: 0.5vh;
      text-align: left;
      margin-left: -1px;
    }
  }
  .st_bo {
    display: flex;
    margin-top: 5%;
    justify-content: space-around;
    .desc {
      font-size: 1vh;
      color: #afbae0;
    }
    p {
      margin-top: 1vh;
    }
    .nyzb {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;
      //   .water_zb {
      //     // 水波纹的大小位置设置
      //     width: 4vw;
      //     height: 4vw;
      //     left: 23%;
      //     top: -9%;
      //     border: 2px solid #FF650B;
      //     box-shadow: 2px 2px 30px #FF650B; /* 阴影效果 */
      //   }
      //   .water_zs{
      //     // 水波纹的大小位置设置
      //     width: 5vw;
      //     height: 5vw;
      //     left: 28%;
      //     top: -13%;
      //     border: 2px solid #FF650B;
      //     box-shadow: 2px 2px 30px #FF650B; /* 阴影效果 */
      //   }
      //   .count {
      //     font-family: countFont;
      //     color: #ffbf2c;
      //     font-weight: 600;
      //     font-size: 3vh;
      //   }
      .dw {
        font-size: 1vh;
        margin-left: 2px;
        color: #ffbf2c;
      }
    }
    .lsjp {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;
      .water_jp {
        // 水波纹的大小位置设置
        width: 4vw;
        height: 4vw;
        left: 23%;
        top: -9%;
        border: 2px solid #35ece8;
        box-shadow: 2px 2px 30px #35ece8; /* 阴影效果 */
      }
      .count {
        font-family: countFont;
        color: #35ece8;
        font-weight: 600;
        font-size: 3vh;
      }
      .dw {
        font-size: 1vh;
        color: #35ece8;
        margin-left: 2px;
      }
    }
    .lszz {
      flex: 1;
      text-align: center;
      position: relative;
      .water_zz {
        // 水波纹的大小位置设置
        width: 4vw;
        height: 4vw;
        left: 23%;
        top: -9%;
        border: 2px solid #59ff85;
        box-shadow: 2px 2px 30px #59ff85; /* 阴影效果 */
      }
      .water_bj {
        // 水波纹的大小位置设置
        width: 5vw;
        height: 5vw;
        left: 28%;
        top: -13%;
        border: 2px solid #35ece8;
        box-shadow: 2px 2px 30px #35ece8; /* 阴影效果 */
      }
      .count {
        font-family: countFont;
        color: #3dd780;
        font-weight: 600;
        font-size: 3vh;
      }
      .dw {
        font-size: 1vh;
        color: #3dd780;
        margin-left: 2px;
      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 1vh;
    opacity: 0.75;
    line-height: 100%;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    // background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    // background-color: #d3dce6;
  }
}
</style>
