<template>
  <div class="map">
    <img class="map_topleft" width="4%" height="auto" src="../../../../assets/img/map/1.png" alt="">
    <img class="map_topright" width="4%" height="auto" src="../../../../assets/img/map/2.png" alt="">
    <img class="map_bottomleft" width="4%" height="auto" src="../../../../assets/img/map/3.png" alt="">
    <img class="map_bottomright" width="4%" height="auto" src="../../../../assets/img/map/4.png" alt="">
    <div class="map_name_topleft">
      <div>
        {{ mapChartOption.geo.map == 'china' ? '中国' : mapChartOption.geo.map }}
      </div>

    </div>
    <div @showSelect="false" class="chart-container" @contextmenu.prevent="show()">
      <div id="mapChart" :style="heightStyle"></div>
    </div>
    <div class="exports" title="报告导出" @click="exportbg">
      <i class="el-icon-upload2"></i>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import chinaMapJson from "@/assets/js/china.json";
// import province from '@/assets/js/province'
import axios from 'axios'
export default {
  data() {
    return {
      fenleiOption: [
      ],
      //初始数据
      left5Data: [
        //市区
        {
          name: '武汉市',
          value: [114.34375, 30.49989],
        },
        //区域
        {
          name: '洪山区',
          value: [114.34375, 30.49989],
        },
        //火电
        {
          name: '洪山区',
          value: [114.34375, 30.50989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        },
        //水电
        {
          name: '洪山区',
          value: [114.36375, 30.51989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        },
        //光伏
        {
          name: '洪山区',
          value: [114.38375, 30.52989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        },
        //风电
        {
          name: '洪山区',
          value: [114.40378, 30.53989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        },
      ],
      mapJson: [],
      province: [],//所有省
      city: [], //某个市
      area: [], //某个区
      provinceName: '',
      cityName: '',
      areaName: '',
      ishow: true,
      showSelect: false,
      heightStyle: {
        height: '80vh'
      },
      geoCoordMap: [
      ],
      mapChart: null, // 全国地区热力图实例
      nextDow: true, // 点击事件的终止条件
      nowType: 'country', // 现在的类型是全国
      mapChartOption: {
        tooltip: {
          trigger: "item",
        },
        geo: {
          map: "china", // 表示中国地图
          roam: true,
          selectedMode: false,
          label: {
            normal: {
              show: false, // 是否显示对应地名
            }
          },
          regions: [
            {
              name: "南海诸岛",
              itemStyle: {
                // 隐藏地图
                normal: {
                  opacity: 0, // 为 0 时不绘制该图形
                }
              },
              label: {
                show: false // 隐藏文字
              }
            }
          ],
          itemStyle: {
            // 图形上的地图区域
            normal: {
              borderColor: "#5EC2F3", //图形的描边颜色
              areaColor: 'rgba(0,0,0,0)', //地图区域的颜色。
              borderWidth: 1.1,
            },
            emphasis: {
              // 高亮时
              areaColor: "#5EC2F3",
              show: false,
            }
          }
        },
        series: [
          {
            type: "map",
            geoIndex: 0,
            data: [
              {
                name: "湖北省",
                value: [114.34375, 30.49989],
              }
            ],
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              borderColor: '#333',
              formatter: function (params) {
                var res = ''
                res = `
                  <div style="padding:10px;background:rgba(0,0,0,0.6);border:1px solid #5EC3F3">
                  <p style="font-size:14px;color:#37D1F9">${params.name}</p>
                  </div>
                `
                return res
              }
            }
          },
          {
            geoIndex: 0,
            silent: true,
            type: 'effectScatter',
            name: "片区名称",
            coordinateSystem: 'geo',
            data: [
              { name: '洪山区', value: [114.34375, 30.49989] }
            ],
            symbolSize: 10,
            rippleEffect: {              //涟漪特效相关配置。
              period: 4,               //动画的时间。
              scale: 3,              //动画中波纹的最大缩放比例。
              brushType: 'fill',      //波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            itemStyle: {                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              normal: {
                color: "#FFC22E",
              },
            },
          },
          // 江西
          //火电
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "火电发电",
            symbolSize: [28, 32],
            data: [],
            symbol: 'image://' + require('../../../../assets/img/map/火电.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //水电
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "水电发电",
            symbolSize: [28, 32],
            data: [{
              name: '抚州',
              value: [116.34, 28],
              datas: [{ bianhao: 123, zhuangtai: '123' }]
            }],
            symbol: 'image://' + require('../../../../assets/img/map/水电.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //风电
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "风电发电",
            symbolSize: [28, 32],
            data: [],
            symbol: 'image://' + require('../../../../assets/img/map/风电.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //光伏
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "光伏发电",
            symbolSize: [28, 32],
            data: [{
              name: '九江',
              value: [115.40378, 29.53989],
              datas: [{ bianhao: 123, zhuangtai: '123' }]
            }],
            symbol: 'image://' + require('../../../../assets/img/map/光伏.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //湖北 水电
          //水电
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "水电发电",
            symbolSize: [28, 32],
            data: [{
              name: '随州',
              value: [113.34, 31.55],
              datas: [{ bianhao: 123, zhuangtai: '123' }]
            }],
            symbol: 'image://' + require('../../../../assets/img/map/水电.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //光伏
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "光伏发电",
            symbolSize: [28, 32],
            data: [],
            symbol: 'image://' + require('../../../../assets/img/map/光伏.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //风电
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "风电发电",
            symbolSize: [28, 32],
            data: [],
            symbol: 'image://' + require('../../../../assets/img/map/风电.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //火电
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "火电发电",
            symbolSize: [28, 32],
            data: [{
              name: '宜昌',
              value: [111.51378, 31.23989],
              datas: [{ bianhao: 123, zhuangtai: '123' }]
            }],
            symbol: 'image://' + require('../../../../assets/img/map/火电.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          // 河南
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "水电发电",
            symbolSize: [28, 32],
            data: [{
              name: '洛阳',
              value: [112.36375, 34.31989],
              datas: [{ bianhao: 123, zhuangtai: '123' }]
            }],
            symbol: 'image://' + require('../../../../assets/img/map/水电.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //光伏
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "光伏发电",
            symbolSize: [28, 32],
            data: [],
            symbol: 'image://' + require('../../../../assets/img/map/光伏.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //风电
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "风电发电",
            symbolSize: [28, 32],
            data: [],
            symbol: 'image://' + require('../../../../assets/img/map/风电.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
          //火电
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            name: "火电发电",
            symbolSize: [28, 32],
            data: [{
              name: '南阳',
              value: [112.30378, 33.33989],
              datas: [{ bianhao: 123, zhuangtai: '123' }]
            }],
            symbol: 'image://' + require('../../../../assets/img/map/火电.png'),
            label: {
              offsetCenter: ['50%', "-100%"],
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',//背景颜色（此时为默认色）
              borderRadius: 0,
              borderWidth: 0,
              formatter: function (params, ticket, callback) {
                var res = ''
                res = `<p style="color:#19D5FF;font-size:16px">${params.seriesName}</p>`
                // '<p style="color:#19D5FF;margin-top:10px">运行状态：' + params.data.datas[0].zhuangtai + '</p>' +
                // '<p style="color:#BBBBBB">设备编号:' + params.data.datas[0].bianhao + '</p>'
                res = '<div style="border:1px solid #FF53AAD8;background-color:rgba(0,25,47,0.7);padding:5px 10px;">' + res + '</div>'
                setTimeout(function () {
                  // 仅为了模拟异步回调
                  callback(ticket, res);
                }, 1000)
                return res
              }
            },
          },
        ],
      },
    }
  },
  created() {
  },
  mounted() {
    this.geoCoordMap = [
      // { name: '武汉市', value: [114.34375, 30.49989] },
      // { name: '抚州', value: [117.34, 28] },
      // { name: '赣州', value: [114.92, 25.85] },
      // { name: '南昌', value: [115.89, 28.68] },
    ]
    this.mapChartOption.series[1].data = this.geoCoordMap.slice(0, 400)
    this.mapJson = chinaMapJson
    this.initChart()
    axios.get('https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json').then(res => {
      this.province = res.data
    });
    // 接收left5的map跳转数据
    // this.$bus.$on('left5Data', (filteredData) => {
    //   this.nowType = 'country'
    //   // console.log(filteredData);
    //   this.clickMap(filteredData[0])
    // });
  },
  methods: {
    goSearch(val) {
      this.searchData.name = val.label
      this.showSelect = false
    },
    //回退  右键
    show() {
      // 右键回退
      if (this.nowType === 'province') {
        this.mapChart.dispose()
        // 回到全国
        this.heightStyle.height = '80vh'
        this.mapJson = this.province
        this.nowType = 'country'
        this.ishow = true // 彻底清除表格重绘
        this.nextDow = true
        this.mapChartOption.geo.map = 'china'
        this.mapChartOption.series[1].data = this.geoCoordMap
        this.$nextTick(() => {
          this.initChart()
        })
      }
      if (this.nowType === 'city') {
        this.mapChart.dispose()
        // 回到省
        this.mapJson = this.city
        this.nowType = 'province'
        this.ishow = true // 彻底清除表格重绘
        this.nextDow = true
        this.heightStyle.height = '65vh'
        this.mapChartOption.geo.map = this.provinceName
        this.mapChartOption.series[1].data = this.geoCoordMap
        this.$nextTick(() => {
          this.initChart(this.provinceName)
        })
      }
      if (this.nowType === 'area') {
        this.mapChart.dispose()
        // 回到市
        this.mapJson = this.area
        this.nowType = 'city'
        this.ishow = true // 彻底清除表格重绘
        this.nextDow = true
        this.mapChartOption.geo.map = this.cityName
        this.mapChartOption.series[1].data = this.geoCoordMap
        this.mapChartOption.series[2].data = []
        this.mapChartOption.series[3].data = []
        this.mapChartOption.series[4].data = []
        this.mapChartOption.series[5].data = []
        this.heightStyle.height = '65vh'
        this.$nextTick(() => {
          this.initChart(this.cityName)
        })
      }
      return false
    },
    //初始化地图
    initChart(name) {
      if (!this.nextDow) return // 地图到底了
      var that = this
      this.mapChart = echarts.init(document.getElementById("mapChart")); // 选中地图的容器
      echarts.registerMap(name || 'china', this.mapJson); // 这个地方是将国/省/市的json塞入到地图中进行绘画
      this.mapChart.setOption(this.mapChartOption); // 画图
      this.mapChart.on('click', function (params) {
        that.clickMap(params);
      })
    },
    clickMap(data) {
      // console.log(data);
      if (data.seriesType == 'scatter') return
      this.nextDow = false
      if (this.nowType === 'country') {
        // console.log(1111);
        this.mapChart.dispose() // 销毁地图
        // this.mapChartOption.series[1].data = [this.left5Data[0]] // 更新坐标为武汉市
        // this.geoCoordMap = [this.left5Data[0]] // 缓存波纹点
        this.getProvince(data)
      }
      if (this.nowType === 'province') {
        this.mapChart.dispose() // 销毁地图
        this.mapChartOption.series[2].data = [{
          name: '南昌',
          value: [115.89, 28.68],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[3].data = [{
          name: '抚州',
          value: [116.34, 28],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[4].data = [{
          name: '宜春',
          value: [115.40378, 28.53989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[5].data = [{
          name: '九江',
          value: [115.40378, 29.53989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        //湖北
        this.mapChartOption.series[6].data = [{
          name: '随州',
          value: [113.34, 31.55],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[7].data = [{
          name: '黄冈市',
          value: [115.29, 31.24],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[8].data = [{
          name: '洪山区',
          value: [114.40378, 30.53989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[9].data = [{
          name: '宜昌',
          value: [111.51378, 31.23989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        // this.geoCoordMap = [this.left5Data[1]] // 缓存波纹点
        this.getCity(data)
      }
      if (this.nowType === 'city') {
        this.mapChart.dispose() // 销毁地图
        this.mapChartOption.series[2].data = [{
          name: '南昌',
          value: [115.89, 28.68],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[3].data = [{
          name: '抚州',
          value: [116.34, 28],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[4].data = [{
          name: '宜春',
          value: [115.40378, 28.53989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[5].data = [{
          name: '宜春',
          value: [115.40378, 28.53989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        //湖北
        this.mapChartOption.series[6].data = [{
          name: '随州',
          value: [113.34, 31.55],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[7].data = [{
          name: '黄冈市',
          value: [115.29, 31.24],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[8].data = [{
          name: '洪山区',
          value: [114.40378, 30.53989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.mapChartOption.series[9].data = [{
          name: '宜昌',
          value: [111.51378, 31.23989],
          datas: [{ bianhao: 123, zhuangtai: '123' }]
        }]
        this.getArea(data)
      }
      if (this.nowType === 'area') {
        this.ishow = true
        this.nextDow = false
        return false
      }
    },
    getProvince(data) {
      // console.log(data);
      var a = ''
      this.province.features.map(val => {
        if (val.properties.name === data.name) {
          // console.log(22222)
          if (val.properties.childrenNum > 0) {
            a = '_full'
          }
          // 如果现在是全国的话 则去选中的省份
          this.city = []
          axios.get(`https://geo.datav.aliyun.com/areas_v2/bound/${val.properties.adcode}${a}.json`).then(res => {
            this.mapJson = res.data
            this.city = res.data
            this.nowType = 'province'
            this.nextDow = true
            this.mapChartOption.geo.map = data.name
            this.provinceName = data.name
            this.heightStyle.height = '65vh'
            this.$nextTick(() => {
              this.initChart(data.name)
            })
          })
        }
      })
      return
    },
    getCity(data) {
      var a = ''
      this.city.features.map(val => {
        if (val.properties.name === data.name) {
          this.area = []
          if (val.properties.childrenNum > 0) {
            a = '_full'
          }
          // 如果现在是全国的话 则去选中的省份
          axios.get(`https://geo.datav.aliyun.com/areas_v2/bound/${val.properties.adcode}${a}.json`).then(res => {
            this.mapJson = res.data
            this.area = res.data
            this.nowType = 'city'
            this.nextDow = true
            // this.mapChartOption.geo.zoom = 1.5
            this.mapChartOption.geo.map = data.name
            this.cityName = data.name
            this.heightStyle.height = '65vh'
            this.$nextTick(() => {
              this.initChart(data.name)
            })
          })
        }
      })
      return
    },
    getArea(data) {
      var a = ''
      this.area.features.map(val => {
        if (val.properties.name === data.name) {
          if (val.properties.childrenNum > 0) {
            a = '_full'
          }
          // 如果现在是全国的话 则去选中的省份
          axios.get(`https://geo.datav.aliyun.com/areas_v2/bound/${val.properties.adcode}${a}.json`).then(res => {
            this.mapJson = res.data
            // this.area = res.data
            this.nowType = 'area'
            this.nextDow = true
            // this.mapChartOption.geo.zoom = 1.5
            this.mapChartOption.geo.map = data.name
            this.areaName = data.name
            this.heightStyle.height = '65vh'
            this.$nextTick(() => {
              this.initChart(data.name)
            })
          })
        }
      })
      return
    },
    // exportbg() {
    //   let obj = JSON.parse(localStorage.getItem('area'))
    //   console.log(obj)
    //   window.open(`/api/get_send_pdf?region=${obj.region}&district=${obj.district}&datatime=${Date.now()}&flag=${obj.flag}`)
    // },
    downloadFile(filePath, name) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = filePath
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
    },
    exportbg() {
      let obj = JSON.parse(localStorage.getItem('area'))
      // console.log(obj, 'obj')
      const url = `/api/get_send_pdf?region=${obj.region}&district=${obj.district}&datetimes=${obj.datetimes}&flag=${obj.flag}`
      this.downloadFile(url, '报告.pdf')
    },
  },
  beforeDestroy() {
    this.$bus.$off('left5Data')
  },
}
</script>

<style lang="scss" scoped>
.map {
  .map_topleft {
    position: absolute;
    top: 0;
    left: 0;
  }

  .map_topright {
    position: absolute;
    top: 0;
    right: 0;
  }

  .map_bottomleft {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
  }

  .map_bottomright {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: flex-end;
  }

  .map_name_topleft {
    position: absolute;
    top: 10px;
    z-index: 999999999999999999999999999;
    left: 10px;
    font-size: 18px;
    color: #37D1F9;

    .cl {
      font-size: 14px;
      margin-top: 10px;
    }

    .shuju {
      font-size: 3vh;
      font-family: countFont;
    }

    .select {
      position: relative;
      font-size: 1.5vh;
      margin-top: 5px;
      cursor: pointer;

      .select_item {
        position: absolute;
        right: 20%;
        background-color: RGBA(1, 22, 46, 0.4);
        z-index: 999999;
        color: #fff;

        .select_itemp {
          padding: 6px 12px;
          border: 1px solid #4187B3;
          border-bottom: none;

          &:hover {
            color: #333;
            background-color: #5EC3F3;
          }
        }

        .select_itemp:last-child {
          border-bottom: 1px solid #4187B3 !important;
        }
      }
    }

    .leibie {
      margin-top: 5px;

      .leibie_item {
        margin-top: 2px;

        span {
          display: inline-block;
          margin-right: 5px;
          color: #D8D8D8;
        }

        .leibie_items1 {
          color: #F7FF52;
        }

        .leibie_items2 {
          color: #23BFE8;
        }

        .leibie_items3 {
          color: #46DFC7;
        }
      }

      .leibie_item1 {
        padding-left: 10px;
        position: relative;

        ::after {
          content: ' ';
          position: absolute;
          left: 0;
          top: 4px;
          width: 8px;
          height: 8px;
          background-color: #F7FF52;
          border-radius: 4px;
        }
      }

      .leibie_item2 {
        padding-left: 10px;
        position: relative;

        ::after {
          content: ' ';
          position: absolute;
          left: 0;
          top: 5px;
          width: 8px;
          height: 8px;
          background-color: #23BFE8;
          border-radius: 4px;
        }
      }

      .leibie_item3 {
        padding-left: 10px;
        position: relative;

        ::after {
          content: ' ';
          position: absolute;
          left: 0;
          top: 5px;
          width: 8px;
          height: 8px;
          background-color: #46DFC7;
          border-radius: 4px;
        }
      }
    }
  }

  #mapChart {
    width: 100%;
    z-index: 1;
  }

}

.exports {
  // width: 100px;
  // height: 100px;
  // background: red;
  position: absolute;
  // right: 50%;
  top: 10px;
  z-index: 999999999999999999999999999;
  right: 10px;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
}
</style>