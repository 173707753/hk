<template>
  <div class="stark">
    <div class="title">双碳目标下新型电力系统电力平衡评价指标体系</div>
    <div class="contain">
      <div v-for="(item, index) in tabList" :key="index" class="tabs">
        <div class="tabitem" @click="chaneTab(index, item.title)">
          {{ item.title }}
        </div>
        <img class="tabimg" width="170%" v-if="item.show" height="auto" src="../../assets/img/ch/tabg.png" alt="" />
      </div>
    </div>
    <!-- <div class="chartsZB"  > -->

    <div class="chartsZB">

      <div style="width: 60vw">
        <div style="
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          " :class="type === '3' ? 'threestyle' : ''">
          <el-select size="small" clearable v-model="time" placeholder="添加时间点" @change="addtime">
            <el-option v-for="item in timeoptions" :key="item.value" :label="item.label" :value="item.label">
            </el-option>
          </el-select>

          <div v-if="showInput">
            <el-select style="margin-left: 5px" v-if="type === '3'" size="small" clearable v-model="power"
              placeholder="直流电路选择">
              <el-option v-for="item in poweroptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select style="margin-left: 5px" v-if="type === '3'" size="small" clearable v-model="road"
              placeholder="转送通道选择">
              <el-option v-for="item in roadoptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select style="margin-left: 5px" v-if="type === '3'" size="small" clearable v-model="bad"
              placeholder="故障路线选择">
              <el-option v-for="item in badoptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div :class="item.sel ? 'tablag' : ''" class="tabsel" v-for="item in tagitems" :key="item.label"
            @click="changeType(item)">
            {{ item.label }}
          </div>
        </div>
        <tables v-if="type == 1" style="height: 20vw" :tableData="tableData" :tagtype="tagtype"></tables>
        <tables2 v-if="type == 2" style="height: 20vw" :tableData="tableData2" :tagtype="tagtype"></tables2>

        <charts v-if="type === '3'" style="margin-left: 10%;" :key="chatkey2" ref="charts" :id="`chartsZB22`"
          :option="optionsss3"></charts>

        <tables4 v-if="type == 4" style="height: 20vw" :tableData="tableData4" :tagtype="tagtype"></tables4>
        <div v-if="type === '3'" style="height: 20vw;">
          <charts style="margin: 0 auto;" :key="chatkey2" ref="charts" :id="`chartsZB22`" :option="optionsss3"></charts>
        </div>
      </div>
      <charts v-if="type === '1'" :key="chatkey" ref="charts" :id="`chartsZB`" :option="optionsss"></charts>
      <charts4 v-if="type === '4'" :key="chatkey" ref="charts" :id="`chartsZB`" :option="optionsss5"></charts4>
      <div class="chartsZB2">
        <charts3 v-if="type === '2'" :key="chatkey1" ref="charts3" :id="`chartsZB2`" :option="optionsss4"></charts3>
      </div>
      <div class="chartsZB3">
        <charts2 v-if="type === '2'" :key="chatkey1" ref="charts2" :id="`chartsZB3`" :option="optionsss2"></charts2>
      </div>
      <div v-if="type === '3'" class="chartsZB4">
        <!-- <charts2 v-if="type === '2'" :key="chatkey1" ref="charts2" :id="`chartsZB3`" :option="optionsss2"></charts2> -->
      </div>
    </div>
  </div>
</template>

<script>
import charts from "./chart.vue";
import charts2 from "./chart2.vue";
import charts3 from "./chart3.vue";
import charts4 from "./chart4.vue";
import tables from "./tables.vue";
import tables2 from "./tables2.vue";
import tables4 from "./tables4.vue";
import util from '@/utils/request.js';
export default {
  data() {
    return {
      chatkey: 0,
      chatkey1: 1,
      chatkey2: 2,
      showInput: false,
      tabList: [
        {
          title: "供电能力",
          show: true,
          type: "1",
          class: "animated fadeIn",
        },
        {
          title: "清洁能源消纳",
          show: false,
          type: "2",
          class: "animated fadeIn",
        },
        {
          title: "综合调节能力",
          show: false,
          type: "3",
          class: "animated fadeIn",
        },
        {
          title: "备用均衡度",
          show: false,
          type: "4",
          class: "animated fadeIn",
        },
      ],
      tagitems: [
        { label: "电力保供系数", tagtype: 1, sel: true },
        { label: "电量保供系数", tagtype: 2, sel: false },
      ],
      tagtype: 1,
      type: "1",
      optionsss: {
        color: ["#eee", "yellow", "#67F9D8", "#FFE434", "#56A3F1"],
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "电力保供系数指标",
          left: "center",
          textStyle: {
            fontSize: 18, // 根据需要设置标题的字体大小
            fontWeight: "bold", // 根据需要设置标题的字体粗细
            color: "#fff",
          },
        },
        legend: {
          bottom: "0",
          textStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
          data: ["6:30:00", "11:30:00"],
        },
        radar: {
          indicator: [
            { name: "河南" },
            { name: "江西" },
            { name: "湖北" },
            { name: "湖南" },
            { name: "全网" },
          ],
          axisName: {
            formatter: "{value}",
            color: "#fff",
            fontWeight: "bold",
          },
          splitNumber: 3,
          splitArea: {
            areaStyle: {
              color: ["rgba(0,0,0,0)"],
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowBlur: 10,
            },
          },
        },
        series: [
          {
            name: "",
            type: "radar",
            data: [
              {
                value: [0.399, 0.405, 0.195, 0.482, 0.336],
                name: "6:30:00",
              },
              {
                value: [0.447, 0.385, 0.244, 0.323, 0.325],
                name: "11:30:00",
              },
            ],
          },
        ],
      },
      optionsss2: {
        color: ["#eee", "yellow", "#67F9D8", "#FFE434", "#56A3F1"],
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "",
          left: "center",
          textStyle: {
            fontSize: 18, // 根据需要设置标题的字体大小
            fontWeight: "bold", // 根据需要设置标题的字体粗细
            color: "#fff",
          },
        },
        legend: {
          bottom: "0",
          textStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
          data: ["6:30:00", "11:30:00"],
        },
        radar: {
          indicator: [
            { name: "河南" },
            { name: "湖北" },
            { name: "湖南" },
            { name: "江西" },
          ],
          axisName: {
            formatter: "{value}",
            color: "#fff",
            fontWeight: "bold",
          },
          splitNumber: 3,
          splitArea: {
            areaStyle: {
              color: ["rgba(0,0,0,0)"],
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowBlur: 10,
            },
          },
        },
        series: [
          {
            name: "",
            type: "radar",
            data: [
              {
                value: [0.399, 0.405, 0.195, 0.482, 0.336],
                name: "6:30:00",
              },
              {
                value: [0.447, 0.385, 0.244, 0.323, 0.325],
                name: "11:30:00",
              },
            ],
          },
        ],
      },
      optionsss24Indicator: [
        { name: "河南", max: 6500 },
        { name: "湖北", max: 16000 },
        { name: "湖南", max: 30000 },
        { name: "江西", max: 38000 },
      ],
      optionsss24data: [
        {
          value: [4200, 3000, 20000, 35000],
          name: "6:30",
        },
        {
          value: [5000, 14000, 28000, 26000],
          name: "7:30",
        },
      ],
      optionsss25Indicator: [
        { name: "河南", max: 6500 },
        { name: "湖北", max: 16000 },
        { name: "湖南", max: 30000 },
        { name: "江西", max: 38000 },
        { name: "全网", max: 52000 },
      ],
      optionsss25data: [
        {
          value: [4200, 3000, 20000, 35000, 50000],
          name: "6:30",
        },
        {
          value: [5000, 14000, 28000, 26000, 42000],
          name: "7:30",
        },
      ],
      optionsss3: {
        color: ["#eee", "yellow", "#67F9D8", "#FFE434", "#56A3F1"],
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "综合调节能力指标",
          left: "center",
          textStyle: {
            fontSize: 18, // 根据需要设置标题的字体大小
            fontWeight: "bold", // 根据需要设置标题的字体粗细
            color: "#fff",
          },
        },
        legend: {
          bottom: "0",
          textStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
          data: ["6:30", "7:30"],
        },
        radar: {
          indicator: [
            { name: "河南", max: 9500 },
            { name: "湖北", max: 16000 },
            { name: "湖南", max: 30000 },
            { name: "江西", max: 38000 },
          ],
          axisName: {
            formatter: "{value}",
            color: "#fff",
            fontWeight: "bold",
          },
          splitNumber: 3,
          splitArea: {
            areaStyle: {
              color: ["rgba(0,0,0,0)"],
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowBlur: 10,
            },
          },
        },
        series: [
          {
            name: "",
            type: "radar",
            data: [
              // {
              //   value: [8000, 3000, 20000, 5000],
              //   name: "6:30",
              // },
              // {
              //   value: [9000, 4000, 28000, 6000],
              //   name: "7:30",
              // },
            ],
          },
        ],
      },
      optionsss4: {
        color: ["#eee", "yellow", "#67F9D8", "#FFE434", "#56A3F1"],
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "",
          left: "center",
          textStyle: {
            fontSize: 18, // 根据需要设置标题的字体大小
            fontWeight: "bold", // 根据需要设置标题的字体粗细
            color: "#fff",
          },
        },
        legend: {
          bottom: "0",
          textStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
          data: ["6:30:00", "11:30:00"],
        },
        radar: {
          indicator: [
            { name: "河南" },
            { name: "湖北" },
            { name: "湖南" },
            { name: "江西" },
          ],
          axisName: {
            formatter: "{value}",
            color: "#fff",
            fontWeight: "bold",
          },
          splitNumber: 3,
          splitArea: {
            areaStyle: {
              color: ["rgba(0,0,0,0)"],
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowBlur: 10,
            },
          },
        },
        series: [
          {
            name: "",
            type: "radar",
            data: [
              {
                value: [0.379, 0.385, 0.215, 0.462, 0.316],
                name: "6:30:00",
              },
              {
                value: [0.417, 0.375, 0.274, 0.353, 0.355],
                name: "11:30:00",
              },
            ],
          },
        ],
      },
      optionsss5: {
        title: {
          text: "省网支援自身及省网支援全网",
          left: "center",
          textStyle: {
            fontSize: 18, // 根据需要设置标题的字体大小
            fontWeight: "bold", // 根据需要设置标题的字体粗细
            color: "#fff",
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: "0",
          textStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['河南', '湖北', '湖南', '江西'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                color: '#fff',  // 修改字体颜色
                fontSize: 14,   // 修改字体大小
                fontWeight: 'bold'  // 字体加粗
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#fff',  // 修改字体颜色
                fontSize: 14,    // 修改字体大小
                fontWeight: 'bold'  // 字体加粗
              }
            }
          }
        ],
        series: [
          {
            name: '省网支援自身',
            type: 'bar',
            color: '#981',
            barWidth: 20,  // 减少柱状图宽度
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',  // 修改字体颜色
                fontWeight: 'bold'
              }
            },
            data: [0.708, 0.999, 1, 1]
          },
          {
            name: '省网支援全网',
            type: 'bar',
            color: '#799',
            barWidth: 20,  // 减少柱状图宽度
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',  // 修改字体颜色
                fontWeight: 'bold'
              }
            },
            data: [0.6551, 1, 0.774, 0.998]
          }
        ]
      },
      tableData: [
      ],
      tableData2: [
      ],
      tableData4: [
        {
          leixing: '省网支援自身',
          henan: '0.708',
          hubei: '0.999',
          hunan: '1',
          jiangxi: '1',
          quyu: ''
        },
        {
          leixing: '省网支援全网',
          henan: '0.6551',
          hubei: '1',
          hunan: '0.774',
          jiangxi: '0.998',
          quyu: ''
        }
        ,
        {
          leixing: '区域电网',
          henan: '',
          hubei: '',
          hunan: '',
          jiangxi: '',
          quyu: '0.778898'
        }
      ],
      timeoptions: [
      ],
      poweroptions: [
        {
          value: "1",
          label: "天中直流",
        },
        // {
        //   value: "2",
        //   label: "跨区转送能力",
        // },
        // {
        //   value: "3",
        //   label: "区域电网功率应急消纳能力",
        // },
      ],
      roadoptions: [
        {
          value: "1",
          label: "西北送华东",
        },
        {
          value: "2",
          label: "华东送华北",
        },
        {
          value: "3",
          label: "华南送华西",
        },
      ],
      badoptions: [
        {
          value: "1",
          label: "故障1",
        },
        // {
        //   value: "2",
        //   label: "否",
        // },
      ],
      time: "",
      power: '1',
      road: '1',
      bad: '1',
      henanthreeData: [],
      hubeithreeData: [],
      hunanthreeData: [],
      jiangxithreeData: [],
      powergrid1: [],
      powergrid2: [],
      powergrid3: [],
      // power: "",
      // road: "",
      // bad: "",
      postData: {
        datatimes: '',
        flag: 1,
      },
      chaneTabIndex: 0
    };
  },
  components: {
    charts,
    charts2,
    charts3,
    charts4,
    tables,
    tables2,
    tables4,
  },
  methods: {
    changeType(item) {
      this.tagitems.map((val) => {
        val.sel = false;
      });
      if (item.label === "电力保供系数" || item.label === "电量保供系数") {
        this.optionsss.title.text = item.label + "指标";
        if (item.label === "电力保供系数") {
          this.optionsss.series[0].data = [{
            value: [0.399, 0.405, 0.195, 0.482, 0.336],
            name: "6:30:00",
          },
          {
            value: [0.447, 0.385, 0.244, 0.323, 0.325],
            name: "11:30:00",
          },]
        } else {
          this.optionsss.series[0].data = [{
            value: [0.407, 0.305, 0.204, 0.353, 0.305],
            name: "6:30:00",
          },
          {
            value: [0.457, 0.395, 0.264, 0.343, 0.345],
            name: "11:30:00",
          },]
        }
        this.$refs.charts.setchart();
      }
      if (item.label === "水电消纳" || item.label === "新能源消纳") {
        if (item.label === "水电消纳") {
          this.optionsss2.radar.indicator = this.optionsss24Indicator
          this.optionsss4.radar.indicator = this.optionsss24Indicator
          this.optionsss2.series[0].data = this.optionsss24data
          this.optionsss4.series[0].data = this.optionsss24data
          this.postData.flag = 1
        } else {
          this.optionsss2.radar.indicator = this.optionsss25Indicator
          this.optionsss4.radar.indicator = this.optionsss25Indicator
          this.optionsss2.series[0].data = this.optionsss25data
          this.optionsss4.series[0].data = this.optionsss25data
          this.postData.flag = 2
        }
        this.optionsss2.title.text = item.label + "电量指标";
        this.optionsss4.title.text = item.label + "电力指标";
        this.$refs.charts2.setchart();
        this.$refs.charts3.setchart();
        // 发送清洁能源消纳能力指标表格数据
        util.post('/api/get_clean_energy', this.postData)
          .then((response) => {
            // console.log('发送没有', this.postData);
            // console.log(response.data, 'get_clean_energy');
            this.computerFuel(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // if(item === )
      if (item.label === "省网" || item.label === "区域电网") {
        if (item.label === "区域电网") {
          this.showInput = true;
          this.optionsss3.radar.indicator = [
            { name: "区域电网跨区", max: 9500 },
            { name: "跨区转送能力", max: 16000 },
            { name: "区域电网大功率", max: 30000 },
          ];
          this.optionsss3.series[0].data = [
            {
              value: [this.powergrid1[0].synthesize_target, this.powergrid2[0].synthesize_target, this.powergrid3[0].synthesize_target],
              name: this.powergrid1[0].timing,
            },
            {
              value: [this.powergrid1[1].synthesize_target, this.powergrid2[1].synthesize_target, this.powergrid3[1].synthesize_target],
              name: this.powergrid1[1].timing,
            },
            {
              value: [this.powergrid1[2].synthesize_target, this.powergrid2[2].synthesize_target, this.powergrid3[2].synthesize_target],
              name: this.powergrid1[2].timing,
            },
            {
              value: [this.powergrid1[3].synthesize_target, this.powergrid2[3].synthesize_target, this.powergrid3[3].synthesize_target],
              name: this.powergrid1[3].timing,
            },
            {
              value: [this.powergrid1[4].synthesize_target, this.powergrid2[4].synthesize_target, this.powergrid3[4].synthesize_target],
              name: this.powergrid1[4].timing,
            },
          ];
        } else {
          this.showInput = false;
          this.optionsss3.radar.indicator = [
            { name: "河南", max: 9500 },
            { name: "湖北", max: 16000 },
            { name: "湖南", max: 30000 },
            { name: "江西", max: 38000 },
          ];
          this.optionsss3.series[0].data = [
            {
              value: [this.henanthreeData[0].synthesize_target, this.hubeithreeData[0].synthesize_target, this.hunanthreeData[0].synthesize_target, this.jiangxithreeData[0].synthesize_target],
              name: this.henanthreeData[0].timing,
            },
            {
              value: [this.henanthreeData[1].synthesize_target, this.hubeithreeData[1].synthesize_target, this.hunanthreeData[1].synthesize_target, this.jiangxithreeData[1].synthesize_target],
              name: this.henanthreeData[1].timing,
            },
            {
              value: [this.henanthreeData[2].synthesize_target, this.hubeithreeData[2].synthesize_target, this.hunanthreeData[2].synthesize_target, this.jiangxithreeData[2].synthesize_target],
              name: this.henanthreeData[0].timing,
            },
            {
              value: [this.henanthreeData[3].synthesize_target, this.hubeithreeData[3].synthesize_target, this.hunanthreeData[3].synthesize_target, this.jiangxithreeData[3].synthesize_target],
              name: this.henanthreeData[3].timing,
            },
            {
              value: [this.henanthreeData[4].synthesize_target, this.hubeithreeData[4].synthesize_target, this.hunanthreeData[4].synthesize_target, this.jiangxithreeData[4].synthesize_target],
              name: this.henanthreeData[4].timing,
            },
          ];
        }
        this.$refs.charts.setchart();
      }
      // console.log("item是什么", item);
      this.tagtype = item.tagtype;
      item.sel = !item.sel;
    },
    chaneTab(index, title) {
      // console.log(title);
      this.chaneTabIndex = index
      this.tabList.map((val) => {
        val.show = false;
      });
      this.tagtype = 1; // 初始化标签
      // this.tableData = [] // 视情况决定是否清空表格数据
      if (index == 0) {
        this.optionsss.title.text = "电力保供系数指标";
        this.tagitems = [
          { label: "电力保供系数", tagtype: 1, sel: true },
          { label: "电量保供系数", tagtype: 2, sel: false },
        ];
      }
      if (index == 1) {
        // 发送清洁能源消纳能力指标表格数据
        util.post('/api/get_clean_energy', this.postData)
          .then((response) => {
            // console.log(response.data, 'get_clean_energy');
            this.computerFuel(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
        this.optionsss2.title.text = "水电消纳电量指标";
        this.optionsss4.title.text = "水电消纳电力指标";
        this.tagitems = [
          { label: "水电消纳", tagtype: 1, sel: true },
          { label: "新能源消纳", tagtype: 2, sel: false },
        ];
      }
      if (index == 2) {
        this.optionsss.title.text = title + "指标";
        this.tagitems = [
          { label: "省网", tagtype: 1, sel: true },
          { label: "区域电网", tagtype: 2, sel: false },
        ];
      }
      if (index == 3) {
        this.optionsss.title.text = title + "指标";
        this.tagitems = [
          { label: "保供场景", tagtype: 1, sel: true },
          { label: "应急场景", tagtype: 2, sel: false },
        ];
      }
      this.type = this.tabList[index].type;
      this.tabList[index].show = true;
      this.$refs.charts.setchart();
      this.$refs.charts2.setchart();
      this.$refs.charts3.setchart();
    },
    addtime() {
      this.$confirm(`确定添加${this.time}时间段吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.time = "";
          this.postData.datatimes = this.time
          // console.log(this.postData.datatimes, 'this.postData.datatimes');
          // console.log(this.postData.datatimes.split(' ')[1], 'this.postData.datatimes.split');
          const dateTime = this.postData.datatimes.split(' ')[1]
          if (this.chaneTabIndex == 0) {
            // 发送时间改变接口
            util.post('/api/get_electricity_target_timing', this.postData)
              .then((response) => {
                // console.log(response.data, 'get_electricity_target_timing');
                const alldata = response.data
                this.tableData.push({
                  date: dateTime,
                  hnprovince: "供电能力提升量",
                  city: "当前负荷",
                  // 河南
                  hnaddress: alldata[2].power_supply_lift,
                  hnaddress2: parseInt(alldata[2].load_power_quantity * 0.407),
                  hnjxzip: alldata[2].load_power,
                  hnjxzip1: alldata[2].load_power_quantity,
                  // 江西
                  jxaddress: alldata[1].power_supply_lift,
                  jxaddress2: parseInt(alldata[1].load_power_quantity * 0.305),
                  jxjxzip: alldata[1].load_power,
                  jxjxzip1: alldata[1].load_power_quantity,
                  // 湖北
                  hbaddress: alldata[3].power_supply_lift,
                  hbaddress2: parseInt(alldata[3].load_power_quantity * 0.204),
                  hbjxzip: alldata[3].load_power,
                  hbjxzip1: alldata[2].load_power_quantity,
                  // 湖南
                  hn1address: alldata[4].power_supply_lift,
                  hn1address2: parseInt(alldata[4].load_power_quantity * 0.353),
                  hn1jxzip: alldata[4].load_power,
                  hn1jxzip1: alldata[4].load_power_quantity,
                  // 全国
                  alladdress: alldata[0].power_supply_lift,
                  alladdress2: parseInt(alldata[0].load_power_quantity * 0.305),
                  alljxzip: alldata[0].load_power,
                  alljxzip1: alldata[0].load_power_quantity,
                },);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          else if (this.chaneTabIndex == 1) {
            // 发送时间改变接口
            util.post('/api/get_clean_energy_timing', this.postData)
              .then((response) => {
                // console.log(response.data, 'get_clean_energy_timing');
                const alldata = response.data
                let index = 0
                let j = 5
                const henanData = {
                  name: alldata[index].region,
                  // 时间
                  times: alldata[index].timing,
                  // 电力
                  powered: alldata[index].fuel,
                  powering: alldata[index].fuel_to,
                  // 电量
                  electriced: alldata[j + 2].fuel_quantity,
                  electricing: alldata[j + 2].fuel_to_quantity,
                }
                this.tableData2.push(henanData);
                const hubeiData = {
                  name: alldata[index + 1].region,
                  // 时间
                  times: alldata[index + 1].timing,
                  // 电力
                  powered: alldata[index + 1].fuel,
                  powering: alldata[index + 1].fuel_to,
                  // 电量
                  electriced: alldata[j + 3].fuel_quantity,
                  electricing: alldata[j + 3].fuel_to_quantity,
                }
                this.tableData2.push(hubeiData);
                const hunanData = {
                  name: alldata[index + 2].region,
                  // 时间
                  times: alldata[index + 2].timing,
                  // 电力
                  powered: alldata[index + 2].fuel,
                  powering: alldata[index + 2].fuel_to,
                  // 电量
                  electriced: alldata[j + 4].fuel_quantity,
                  electricing: alldata[j + 4].fuel_to_quantity,
                }
                this.tableData2.push(hunanData);
                const jiangxiData = {
                  name: alldata[index + 3].region,
                  // 时间
                  times: alldata[index + 3].timing,
                  // 电力
                  powered: alldata[index + 3].fuel,
                  powering: alldata[index + 3].fuel_to,
                  // 电量
                  electriced: alldata[j + 1].fuel_quantity,
                  electricing: alldata[j + 1].fuel_to_quantity,
                }
                this.tableData2.push(jiangxiData);
                const quanwangData = {
                  name: alldata[index + 4].region,
                  // 时间
                  times: alldata[index + 4].timing,
                  // 电力
                  powered: alldata[index + 4].fuel,
                  powering: alldata[index + 4].fuel_to,
                  // 电量
                  electriced: alldata[j].fuel_quantity,
                  electricing: alldata[j].fuel_to_quantity,
                }
                this.tableData2.push(quanwangData);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          else if (this.chaneTabIndex == 2) {
            // 发接口
            util.post('/api/get_synthesize_target',)
              .then(response => {
                console.log(response, 'time');
                // 处理POST请求的响应
                if (response && response.code === 200) {
                  // 请求成功的处理逻辑

                } else {
                  // 请求失败的处理逻辑
                  this.$message.error('服务器错误')
                }
              })
              .catch(error => {
                // 处理POST请求的错误
                this.$message.error('服务器错误', error)
              });

          }
          this.optionsss.legend.data.push(dateTime)
          this.optionsss.series[0].data.push({
            value: [0.507, 0.385, 0.284, 0.343, 0.355],
            name: dateTime,
          });
          this.$refs.charts.setchart();
          this.chatkey++;
          this.postData.datatimes = ''
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 处理时间点
    computerTimes(alldata) {
      this.timeoptions = alldata.map((item, index) => ({
        value: index + 1,
        // label: `2023-08-24 ${item}`,
        label: `2023-08-24 ${item}`,

      }));
      // console.log(this.timeoptions, 'this.timeoptions');
    },
    //处理供电能力表格数据
    computerTable(alldata) {
      // console.log(alldata, '供电能力表格');
      for (let index = 0; index < 25; index = index + 5) {
        // 提取当前地区的数据
        const henanData = alldata[index + 2];
        const hubeiData = alldata[index + 3];
        const hunanData = alldata[index + 4];
        const jiangxiData = alldata[index + 1];
        const quanwangData = alldata[index];
        const processedData = {
          date: henanData.timing,
          hnprovince: "供电能力提升量",
          city: "当前负荷",
          // 河南
          hnaddress: henanData.power_supply_lift,
          hnaddress2: parseInt(henanData.load_power_quantity * 0.407),
          hnjxzip: henanData.load_power,
          hnjxzip1: henanData.load_power_quantity,
          // 江西
          jxaddress: jiangxiData.power_supply_lift,
          jxaddress2: parseInt(jiangxiData.load_power_quantity * 0.305),
          jxjxzip: jiangxiData.load_power,
          jxjxzip1: jiangxiData.load_power_quantity,
          // 湖北
          hbaddress: hubeiData.power_supply_lift,
          hbaddress2: parseInt(hubeiData.load_power_quantity * 0.204),
          hbjxzip: hubeiData.load_power,
          hbjxzip1: hubeiData.load_power_quantity,
          // 湖南
          hn1address: hunanData.power_supply_lift,
          hn1address2: parseInt(hunanData.load_power_quantity * 0.353),
          hn1jxzip: hunanData.load_power,
          hn1jxzip1: hunanData.load_power_quantity,
          // 全国
          alladdress: quanwangData.power_supply_lift,
          alladdress2: parseInt(quanwangData.load_power_quantity * 0.305),
          alljxzip: quanwangData.load_power,
          alljxzip1: quanwangData.load_power_quantity,
        };
        this.tableData.push(processedData);
      }
      // console.log(this.tableData, 'this.tableData');
    },
    //清洁能源消纳能力指标表格数据
    computerFuel(alldata) {
      // console.log(alldata, '清洁alldata');
      this.tableData2 = [];
      let j = 25;
      for (let index = 0; index < 5; index++) {
        const henanData = {
          name: alldata[index].region,
          // 时间
          times: alldata[index].timing,
          // 电力
          powered: alldata[index].fuel,
          powering: alldata[index].fuel_to,
          // 电量
          electriced: alldata[j + 2].fuel_quantity,
          electricing: alldata[j + 2].fuel_to_quantity,
        }
        this.tableData2.push(henanData);
        const hubeiData = {
          name: alldata[index + 5].region,
          // 时间
          times: alldata[index + 5].timing,
          // 电力
          powered: alldata[index + 5].fuel,
          powering: alldata[index + 5].fuel_to,
          // 电量
          electriced: alldata[j + 3].fuel_quantity,
          electricing: alldata[j + 3].fuel_to_quantity,
        }
        this.tableData2.push(hubeiData);
        const hunanData = {
          name: alldata[index + 10].region,
          // 时间
          times: alldata[index + 10].timing,
          // 电力
          powered: alldata[index + 10].fuel,
          powering: alldata[index + 10].fuel_to,
          // 电量
          electriced: alldata[j + 4].fuel_quantity,
          electricing: alldata[j + 4].fuel_to_quantity,
        }
        this.tableData2.push(hunanData);
        const jiangxiData = {
          name: alldata[index + 15].region,
          // 时间
          times: alldata[index + 15].timing,
          // 电力
          powered: alldata[index + 15].fuel,
          powering: alldata[index + 15].fuel_to,
          // 电量
          electriced: alldata[j + 1].fuel_quantity,
          electricing: alldata[j + 1].fuel_to_quantity,
        }
        this.tableData2.push(jiangxiData);
        const quanwangData = {
          name: alldata[index + 20].region,
          // 时间
          times: alldata[index + 20].timing,
          // 电力
          powered: alldata[index + 20].fuel,
          powering: alldata[index + 20].fuel_to,
          // 电量
          electriced: alldata[j].fuel_quantity,
          electricing: alldata[j].fuel_to_quantity,
        }
        this.tableData2.push(quanwangData);
        j = j + 5
      }
    }
  },
  mounted() {
    // 获取时间点
    util.get('/api/get_data_timing')
      .then((response) => {
        // console.log(response.data, '11111');
        this.computerTimes(response.data.times)
      })
      .catch((error) => {
        console.log(error);
      });
    // 初始化综合能力的图
    util.post('/api/get_region_target', this.time)
      .then(response => {
        // console.log(response,'time');
        // 处理POST请求的响应
        if (response && response.code === 200) {
          // 请求成功的处理逻辑
          // 河南
          this.henanthreeData[0] = response.data[0]
          this.henanthreeData[1] = response.data[1]
          this.henanthreeData[2] = response.data[2]
          this.henanthreeData[3] = response.data[3]
          this.henanthreeData[4] = response.data[4]
          // 湖北
          this.hubeithreeData[0] = response.data[5]
          this.hubeithreeData[1] = response.data[6]
          this.hubeithreeData[2] = response.data[7]
          this.hubeithreeData[3] = response.data[8]
          this.hubeithreeData[4] = response.data[9]
          // 湖南
          this.hunanthreeData[0] = response.data[10]
          this.hunanthreeData[1] = response.data[11]
          this.hunanthreeData[2] = response.data[12]
          this.hunanthreeData[3] = response.data[13]
          this.hunanthreeData[4] = response.data[14]
          // 江西
          this.jiangxithreeData[0] = response.data[15]
          this.jiangxithreeData[1] = response.data[16]
          this.jiangxithreeData[2] = response.data[17]
          this.jiangxithreeData[3] = response.data[18]
          this.jiangxithreeData[4] = response.data[19]
          // 
          this.powergrid1[0] = response.data[20]
          this.powergrid1[1] = response.data[21]
          this.powergrid1[2] = response.data[22]
          this.powergrid1[3] = response.data[23]
          this.powergrid1[4] = response.data[24]
          // 
          this.powergrid2[0] = response.data[25]
          this.powergrid2[1] = response.data[26]
          this.powergrid2[2] = response.data[27]
          this.powergrid2[3] = response.data[28]
          this.powergrid2[4] = response.data[29]
          // 
          this.powergrid3[0] = response.data[30]
          this.powergrid3[1] = response.data[31]
          this.powergrid3[2] = response.data[32]
          this.powergrid3[3] = response.data[33]
          this.powergrid3[4] = response.data[34]

        } else {
          // 请求失败的处理逻辑
          this.$message.error('服务器错误')
        }
      })
      .catch(error => {
        // 处理POST请求的错误
        this.$message.error('服务器错误', error)
      });
    //获取供电能力表格数据
    util.post('/api/get_electricity_target', this.postData)
      .then((response) => {
        // console.log(response.data, 'get_electricity_target');
        this.computerTable(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped lang="scss">
.stark {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/map/bg.jpg");
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

  .chartsZB4 {
    width: 30vw;
    height: 30vw;
  }

  .threestyle {
    margin-top: 4%;
  }

  ::v-deep .el-input__inner {
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
