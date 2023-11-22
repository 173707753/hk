<template>
  <div class="top">
    <div class="st_titles">运行评估总览</div>
    <div class="st_tops">
    </div>
    <div class="dwasda" v-if="!tabs">
      <div class="st_bo">
        <div class="nyzb">
          <div>
            <img
              width="120%"
              src="../../../../assets/img/ch/绿色服务/service2.png"
              alt=""
              class="rotating2_pic"
            />
          </div>
            <div class="count">
              <chat :id="`hnchat`" :option="gethnoption(1)"></chat>
            </div>
          <p class="desc">湖北省发电</p>
        </div>
        <div class="nyzb">
          <div>
            <img
              width="120%"
              src="../../../../assets/img/ch/绿色服务/service2.png"
              alt=""
              class="rotating2_pic"
            />
          </div>
            <div class="count">
              <chat :id="`hnchat1`" :option="gethnoption(2)"></chat>
            </div>
          <p class="desc">河南省发电</p>
        </div>
        <div class="nyzb">
          <div>
            <img
              width="120%"
              src="../../../../assets/img/ch/绿色服务/service2.png"
              alt=""
              class="rotating2_pic"
            />
          </div>
            <div class="count">
              <chat :id="`hnchat2`" :option="gethnoption(3)"></chat>
            </div>
          <p class="desc">江西省发电</p>
        </div>
        <div class="nyzb">
          <div>
            <img
              width="120%"
              src="../../../../assets/img/ch/绿色服务/service2.png"
              alt=""
              class="rotating2_pic"
            />
          </div>
            <div class="count">
              <chat :id="`hnchat3`" :option="gethnoption(4)"></chat>
            </div>
          <p class="desc">湖南省发电</p>
        </div>
      </div>
      <div class="st_bo">
        <div class="nyzb">
          <div>
            <img
              width="120%"
              src="../../../../assets/img/ch/绿色服务/service2.png"
              alt=""
              class="rotating2_pic"
            />
          </div>
            <div class="count">
              <chat :id="`hnchat4`" :option="gethnoption(5)"></chat>
            </div>
          <p class="desc">全网发电</p>
        </div>
        <div class="nyzb">
          <div>
            <img
              width="120%"
              src="../../../../assets/img/ch/绿色服务/service2.png"
              alt=""
              class="rotating2_pic"
            />
          </div>
            <div class="count">
              <chat :id="`hnchat5`" :option="gethnoption(6)"></chat>
            </div>
          <p class="desc">全网备用</p>
        </div>
        <div class="nyzb">
          <div>
            <img
              width="120%"
              src="../../../../assets/img/ch/绿色服务/service2.png"
              alt=""
              class="rotating2_pic"
            />
          </div>
            <div class="count">
              <chat :id="`hnchat6`" :option="gethnoption(7)"></chat>
            </div>
          <p class="desc">全网送电</p>
        </div>
        <div class="nyzb">
          <div>
            <img
              width="120%"
              src="../../../../assets/img/ch/绿色服务/service2.png"
              alt=""
              class="rotating2_pic"
            />
          </div>
            <div class="count">
              <chat :id="`hnchat7`" :option="gethnoption(8)"></chat>
            </div>
          <p class="desc">全网受电</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chat from '../../../../components/EChart.vue'
export default {
  data() {
    return {
      tabs: false,
      statics: 0,
      hnoption: {
        tooltip: {
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['41%', '49%'],
            radius: ['2%', '60%'],
            roseType: 'radius',
            itemStyle: {
              // borderRadius: 2
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
            ]
          },
        ]
      }
    };
  },
  components: {
    chat
  },
  methods: {
    gethnoption(val) {
      let obj = JSON.parse(JSON.stringify(this.hnoption))
      obj.tooltip = {
        backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
          borderRadius: 0,
          borderWidth: 0,
          trigger: 'item',
          
          formatter: function (params) {
            var res = ''
            res = `
              <div style="padding:0px 5px;background:rgba(0,0,0,0.6);border:1px solid #5EC3F3">
                <p style="font-size:14px;color:#37D1F9">${params.name}</p>
                <p style="font-size:14px;color:#37D1F9">${params.value}(P/MW)</p>
              </div>
            `
            return res
          }
      }
      if (val == 1) {
        obj.tooltip = {
          backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
          borderRadius: 0,
          borderWidth: 0,
          trigger: 'item',
          
          formatter: function (params) {
            var res = ''
            res = `
              <div style="padding:0px 5px;background:rgba(0,0,0,0.6);border:1px solid #5EC3F3">
                <p style="font-size:14px;color:#37D1F9">${params.name}</p>
                <p style="font-size:14px;color:#37D1F9">${params.value}(P/MW)</p>
              </div>
            `
            return res
          },
          position: function (point, params, dom, rect, size) {
            // 获取可视区域的宽度和高度
            const viewWidth = size.viewSize[0];
            const viewHeight = size.viewSize[1];
            
            // 获取提示框内容的宽度和高度
            const tooltipWidth = dom.offsetWidth;
            const tooltipHeight = dom.offsetHeight;
            
            // 设置提示框的位置
            let left = point[0];
            let top = point[1];
            
            // 判断提示框是否超出可视范围，如果超出则调整位置
            if (left + tooltipWidth > viewWidth) {
              left = viewWidth - tooltipWidth;
            }
            if (top + tooltipHeight > viewHeight) {
              top = viewHeight - tooltipHeight;
            }
            
            return [left, top];
          },
        }
        obj.series[0].data = [
        { value: 245114.639, name: '火力发电' },
        { value: 336636.93976, name: '水力发电' },
        { value: -32481.375, name: '抽蓄发电' },
        { value: 239013.00 , name: '光伏发电' },
        { value: 217983.00 , name: '风力发电' }]
        return obj
      }  if (val == 2) {
        obj.series[0].data = [{ value: 245114.639, name: '火力发电' },
        { value: 336636.93976, name: '水力发电' },
        { value: 232481.375, name: '抽蓄发电' },
        { value: 139013.00 , name: '光伏发电' },
        { value: 217983.00 , name: '风力发电' }]
        return obj
      }  if (val == 3) {
        obj.series[0].data = [{ value: 245114.639, name: '火力发电' },
        { value: 336636.93976, name: '水力发电' },
        { value: -32481.375, name: '抽蓄发电' },
        { value: 639013.00 , name: '光伏发电' },
        { value: 217983.00 , name: '风力发电' }]
        return obj
      }  if (val == 4) {
        obj.series[0].data = [{ value: 245114.639, name: '火力发电' },
        { value: 336636.93976, name: '水力发电' },
        { value: -32481.375, name: '抽蓄发电' },
        { value: 139013.00 , name: '光伏发电' },
        { value: 217983.00 , name: '风力发电' }]
        return obj
      }  if (val == 5) {
        obj.tooltip = {
          backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
          borderRadius: 0,
          borderWidth: 0,
          trigger: 'item',
          
          formatter: function (params) {
            var res = ''
            res = `
              <div style="padding:0px 5px;background:rgba(0,0,0,0.6);border:1px solid #5EC3F3">
                <p style="font-size:14px;color:#37D1F9">${params.name}</p>
                <p style="font-size:14px;color:#37D1F9">${params.value}(P/MW)</p>
              </div>
            `
            return res
          },
          position: function (point, params, dom, rect, size) {
            // 获取可视区域的宽度和高度
            const viewWidth = size.viewSize[0];
            const viewHeight = size.viewSize[1];
            
            // 获取提示框内容的宽度和高度
            const tooltipWidth = dom.offsetWidth;
            const tooltipHeight = dom.offsetHeight;
            
            // 设置提示框的位置
            let left = point[0];
            let top = point[1];
            
            // 判断提示框是否超出可视范围，如果超出则调整位置
            if (left + tooltipWidth > viewWidth) {
              left = viewWidth - tooltipWidth;
            }
            if (top + tooltipHeight > viewHeight) {
              top = viewHeight - tooltipHeight;
            }
            
            return [left, top];
          },
        }
        obj.series[0].data = [{ value: 245114.639, name: '火力发电' },
        { value: 336636.93976, name: '水力发电' },
        { value: -32481.375, name: '抽蓄发电' },
        { value: 139013.00 , name: '光伏发电' },
        { value: 217983.00 , name: '风力发电' }]
        return obj
      }  if (val == 6) {
        obj.series[0].data = [{ value: 245114.639, name: '火力发电' },
        { value: 336636.93976, name: '水力发电' },
        { value: -32481.375, name: '抽蓄发电' },
        { value: 239013.00 , name: '光伏发电' },
        { value: 217983.00 , name: '风力发电' }]
        return obj
      }  if (val == 7) {
        obj.series[0].data = [{ value: 245114.639, name: '火力发电' },
        { value: 336636.93976, name: '水力发电' },
        { value: -32481.375, name: '抽蓄发电' },
        { value: 239013.00 , name: '光伏发电' },
        { value: 217983.00 , name: '风力发电' }]
        return obj
      }  if (val == 8) {
        obj.series[0].data = [{ value: 245114.639, name: '火力发电' },
        { value: 336636.93976, name: '水力发电' },
        { value: -32481.375, name: '抽蓄发电' },
        { value: 339013.00 , name: '光伏发电' },
        { value: 217983.00 , name: '风力发电' }]
        return obj
      }
      // console.log(obj, 111)
      // return obj
    },
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
  height: 26vh;
  // height: 100%;
  background-image: url("../../../../assets/img/ch/绿色服务/绿色服务.png");
  background-size: 100% 107%;
  background-repeat: no-repeat;
  .st_dw {
    width: 55%;
    font-size: 1.6vh;
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin-top: -2%;
    justify-content: space-around;
    height: 20vh;
    .desc {
      font-size: 1.8vh;
      color: #C5C5C5;
      font-family: PingFangSC-Medium, PingFang SC;
          position: relative;
    // top: -6vh;
    }
    p {
      // margin-top: 1vh;
    }
    .nyzb {
      flex: 1;
      text-align: center;
      position: relative;
      border-right: 1px solid #00a3ff3d;
      .rotating_pic {
        animation: myfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .rotating2_pic {
        position: relative;
        margin-top: 0vh;
        margin-left: -0.7vw;
        animation: nmyfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      // .water_zb {
      //   // 水波纹的大小位置设置
      //   width: 4vw;
      //   height: 4vw;
      //   left: 23%;
      //   top: -9%;
      //   border: 2px solid #FF650B;
      //   box-shadow: 2px 2px 30px #FF650B; /* 阴影效果 */
      // }
      // .water_zs{
      //   // 水波纹的大小位置设置
      //   width: 5vw;
      //   height: 5vw;
      //   left: 28%;
      //   top: 0%;
      //   border: 2px solid #FF650B;
      //   box-shadow: 2px 2px 30px #FF650B; /* 阴影效果 */
      // }
      .count {
        position: absolute;
        top: 0;
      }
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
      .rotating_pic {
        animation: myfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .rotating2_pic {
        position: relative;
        margin-top: 0vh;
        margin-left: -0.7vw;
       animation: nmyfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      // .water_jp {
      //   // 水波纹的大小位置设置
      //   width: 4vw;
      //   height: 4vw;
      //   left: 23%;
      //   top: -9%;
      //   border: 2px solid #35ece8;
      //   box-shadow: 2px 2px 30px #35ece8; /* 阴影效果 */
      // }
      .count {
        font-family: countFont;
        color: #35ece8;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -11vh;
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
      .rotating_pic {
        animation: myfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      .rotating2_pic {
        position: relative;
        margin-top: 0vh;
        margin-left: -0.7vw;
        animation: nmyfirst 1.5s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
      // .water_zz {
      //   // 水波纹的大小位置设置
      //   width: 4vw;
      //   height: 4vw;
      //   left: 23%;
      //   top: -9%;
      //   border: 2px solid #59ff85;
      //   box-shadow: 2px 2px 30px #59ff85; /* 阴影效果 */
      // }
      // .water_bj {
      //   // 水波纹的大小位置设置
      //   width: 5vw;
      //   height: 5vw;
      //   left: 28%;
      //   top: 0%;
      //   border: 2px solid #35ece8;
      //   box-shadow: 2px 2px 30px #35ece8; /* 阴影效果 */
      // }
      .count {
        font-family: countFont;
        color: #3dd780;
        font-weight: 600;
        font-size: 3vh;
        position: relative;
        top: -11vh;
      }
      .dw {
        font-size: 1vh;
        color: #3dd780;
        margin-left: 2px;
      }
    }
  }
  .dwasda{
    max-height: 20vh;
    overflow: hidden;
    overflow-y: scroll;
  }
  .dwasda::-webkit-scrollbar {
      width: 4px;
    }

    .dwasda::-webkit-scrollbar-track {
      background: #525579;
    }

    .dwasda::-webkit-scrollbar-thumb {
      background: #4f668e;
      /* 滚动条滑块颜色 */
    }
}
</style>
