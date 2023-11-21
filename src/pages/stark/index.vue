<template>
  <div class="stark">
    <div class="title">双碳目标下新型电力系统电力平衡评价指标体系</div>
    <div class="contain">
      <div v-for="(item, index) in tabList" :key="index" class="tabs">
        <div class="tabitem" @click="chaneTab(index, item.title)">
          {{ item.title }}
        </div>
        <img class="tabimg" width="170%" v-if="item.show" height="auto" src="../../assets/img/ch/tabg.png" alt="">
      </div>
    </div>
    <div class="chartsZB">
      <div style="width:60vw">
        <div style="margin-bottom: 10px;display: flex;align-items: center;">
          <el-select size="small" clearable v-model="time" placeholder="添加时间点" @change="addtime">
            <el-option v-for="item in timeoptions" :key="item.value" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
          <div :class="item.sel ? 'tablag' : ''" class="tabsel" v-for="item in tagitems" :key="item.label"
            @click="changeType(item)">
            {{ item.label }}
          </div>
        </div>
        <tables v-if="type == 1" style="height: 20vw;" :tableData="tableData" :tagtype="tagtype"></tables>
        <tables2 v-if="type == 2" style="height: 20vw;" :tableData="tableData2" :tagtype="tagtype"></tables2>
      </div>
      <charts :key="chatkey" ref="charts" :id="`chartsZB`" :option="optionsss"></charts>
      <div class="chartsZB2">
        <charts2 v-if="type == 2" :key="chatkey1" ref="charts2" :id="`chartsZB2`" :option="optionsss2"></charts2>
      </div>
    </div>
  </div>
</template>

<script>
import charts from './chart.vue'
import charts2 from './chart2.vue'
import tables from './tables.vue'
import tables2 from './tables2.vue';
export default {
  data() {
    return {
      chatkey: 0,
      chatkey1: 1,
      tabList: [{
        title: '供电能力',
        show: true,
        type: '1',
        class: 'animated fadeIn',
      }, {
        title: '清洁能源消纳',
        show: false,
        type: '2',
        class: 'animated fadeIn',
      }, {
        title: '综合调节能力',
        show: false,
        type: '3',
        class: 'animated fadeIn',
      }, {
        title: '备用均衡度',
        show: false,
        type: '4',
        class: 'animated fadeIn',
      }],
      tagitems: [
        { label: '电力保供系数', tagtype: 1, sel: true },
        { label: '电量保供系数', tagtype: 2, sel: false },
      ],
      tagtype: 1,
      type: 1,
      optionsss: {
        color: ['blue', 'yellow', '#67F9D8', '#FFE434', '#56A3F1',],
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '供电能力指标',
          left: 'center',
          textStyle: {
            fontSize: 18,  // 根据需要设置标题的字体大小
            fontWeight: 'bold',  // 根据需要设置标题的字体粗细
            color: '#fff'
          },
        },
        legend: {
          bottom: '0',
          textStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
          data: ['6:30', '7:30']
        },
        radar: {
          indicator: [
            { name: '河南', max: 6500 },
            { name: '湖北', max: 16000 },
            { name: '湖南', max: 30000 },
            { name: '江西', max: 38000 },
            { name: '全网', max: 52000 }
          ],
          axisName: {
            formatter: '{value}',
            color: '#fff',
            fontWeight: 'bold',
          },
          splitNumber: 3,
          splitArea: {
            areaStyle: {
              color: ['rgba(0,0,0,0)'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
        },
        series: [
          {
            name: '',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000],
                name: '6:30'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000],
                name: '7:30'
              }
            ]
          }
        ]
      },
      optionsss2: {
        color: ['blue', 'yellow', '#67F9D8', '#FFE434', '#56A3F1',],
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '清洁能源消纳指标',
          left: 'center',
          textStyle: {
            fontSize: 18,  // 根据需要设置标题的字体大小
            fontWeight: 'bold',  // 根据需要设置标题的字体粗细
            color: '#fff'
          },
        },
        legend: {
          bottom: '0',
          textStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
          data: ['6:30', '7:30']
        },
        radar: {
          indicator: [
            { name: '河南', max: 6500 },
            { name: '湖北', max: 16000 },
            { name: '湖南', max: 30000 },
            { name: '江西', max: 38000 },
          ],
          axisName: {
            formatter: '{value}',
            color: '#fff',
            fontWeight: 'bold',
          },
          splitNumber: 3,
          splitArea: {
            areaStyle: {
              color: ['rgba(0,0,0,0)'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
        },
        series: [
          {
            name: '',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000],
                name: '6:30'
              },
              {
                value: [5000, 14000, 28000, 26000],
                name: '7:30'
              }
            ]
          }
        ]
      },
      tableData: [
        {
          date: '6.30',
          name: '河南',
          hnprovince: '供电能力提升量',
          city: '当前负荷',
          address: 123,
          zip: 111,
          jxzip: '222',
          jxaddress: 122,

        },
        {
          date: '7.30',
          name: '河南',
          hnprovince: '供电能力提升量',
          city: '当前负荷',
          address: 123,
          zip: 111,
          jxzip: '222',
          jxaddress: 122,

        }
      ],
      tableData2: [
        {
          name: '河南',
          // 电力
          powered: '685',
          powering: '320',
          // 电量
          electriced: '1907',
          electricing: '1249',
        },
        {
          name: '湖北',
          powered: '21189',
          powering: '2107',
          electriced: '84186',
          electricing: '7851',
        },
        {
          name: '湖南',
          powered: '3074',
          powering: '4886',
          electriced: '11331',
          electricing: '19099',
        },
        {
          name: '江西',
          powered: '1083',
          powering: '584',
          electriced: '4327',
          electricing: '2488',
        },
        {
          name: '全国',
          powered: '26031',
          powering: '7897',
          electriced: '101751',
          electricing: '30687',
        }
      ],
      timeoptions: [{
        value: '1',
        label: '10.30'
      }, {
        value: '2',
        label: '11.30'
      }, {
        value: '3',
        label: '12.30'
      }, {
        value: '4',
        label: '13.30'
      }, {
        value: '5',
        label: '14.30'
      }],
      time: ''
    };
  },
  components: {
    charts,
    charts2,
    tables,
    tables2
  },
  methods: {
    changeType(item) {
      this.tagitems.map(val => {
        val.sel = false
      })
      if (item.label === '水电消纳' || item.label === '新能源消纳') {
        // console.log("我进来没有");
        this.optionsss.title.text = item.label + '电力指标'
        this.optionsss2.title.text = item.label + '电量指标'
        this.$refs.charts.setchart()
        this.$refs.charts2.setchart()
      }
      // console.log("item是什么", item);
      this.tagtype = item.tagtype
      item.sel = !item.sel
    },
    chaneTab(index, title) {
      console.log(title);
      this.tabList.map(val => {
        val.show = false
      })
      this.tagtype = 1 // 初始化标签
      // this.tableData = [] // 视情况决定是否清空表格数据
      if (index == 0) {
        this.optionsss.title.text = title + '指标'
        this.tagitems = [
          { label: '电力保供系数', tagtype: 1, sel: true },
          { label: '电量保供系数', tagtype: 2, sel: false },
        ]
      }
      if (index == 1) {
        this.optionsss.title.text = '水电消纳电力指标'
        this.optionsss2.title.text = '水电消纳电量指标'
        this.optionsss.color = this.optionsss2.color
        this.optionsss.radar.indicator = this.optionsss2.radar.indicator
        this.tagitems = [
          { label: '水电消纳', tagtype: 1, sel: true },
          { label: '新能源消纳', tagtype: 2, sel: false },
        ]
      }
      if (index == 2) {
        this.optionsss.title.text = title + '指标'
        this.tagitems = [
          { label: '省网', tagtype: 1, sel: true },
          { label: '区域电网', tagtype: 2, sel: false },
        ]
      }
      if (index == 3) {
        this.optionsss.title.text = title + '指标'
        this.tagitems = [
          { label: '保供场景', tagtype: 1, sel: true },
          { label: '应急场景', tagtype: 2, sel: false },
        ]
      }
      this.type = this.tabList[index].type
      this.tabList[index].show = true
      this.$refs.charts.setchart()
      this.$refs.charts2.setchart()
    },
    addtime() {
      this.$confirm(`确定添加${this.time}时间段吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.time = ''
        // 发接口
        // this.tabledata.push() or this.tabledata重新赋值
        this.tableData.push({
          date: '10.30',
          name: '河南',
          hnprovince: '供电能力提升量',
          city: '当前负荷',
          address: 123,
          zip: 111,
          jxzip: '222',
          jxaddress: 122,

        })
        this.optionsss.legend.data = ['6:30', '7:30', '10:30']
        this.optionsss.series[0].data = [
          {
            value: [4200, 3000, 20000, 35000, 50000],
            name: '6:30'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000],
            name: '7:30'
          },
          {
            value: [5200, 11000, 23000, 21000, 32000],
            name: '10:30'
          }
        ]
        this.$refs.charts.setchart()
        this.chatkey++
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
    }
  },
};
</script>


<style scoped lang="scss">
.stark {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/map/bg.jpg');
  background-size: 100% auto;
  background-position-y: 100%;

  .title {
    font-size: 2vw;
    color: #fff;
    padding: 20px;
    text-align: center;
  }

  .contain {
    color: #fff;
    width: 30vw;
    margin-left: 3vw;
    display: flex;
    border-bottom: 2px solid #5b61b1;
    padding-bottom: 14px;
    margin-top: 20px;
  }

  .tabs {
    width: 100%;
    position: relative;

    .tabitem {
      cursor: pointer;
      font-size: 1.8vh;
      text-align: center;
    }

    .tabimg {
      position: absolute;
      top: -123%;
      z-index: 999;
      cursor: pointer;
      right: -34%;
    }
  }

  .chartsZB {
    display: flex;
    margin-top: 20px;
    padding: 0 50px;
    align-items: center;
    width: 100%;
    justify-content: space-around;
  }

  /deep/.el-input__inner {
    background: rgba(0, 25, 47, 0.7);
    color: #fff;
  }

  .tabsel {
    color: #fff;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
      color: #5b61b1;
    }
  }

  .tablag {
    color: #5b61b1;
  }
}
</style>