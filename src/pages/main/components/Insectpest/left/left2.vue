<template>
    <div class="bot">
        <div class="st_titles">
            电网数据
        </div>
        <!-- 渲染位置 -->
        <div id="main2" style="height: calc(100% - 4vh);width: 100%;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            colorLine: ['#bfc','#FFC22E', '#5EC2F2', '#FF4528',  '#fff'],
            tabindex: 0,
            leftData: [
                {
                    name: '断面数据',
                    data: [
                        2410.27, 3800, 3800, 3800, 3800, 3800, 3175.235, 2621.535, 2120.017557, 1824.496346, 1864.61, 1264.41, 958.15, 1265.31, 1534.9, 1938.86, 2035.8, 2015.72, 1714.98, 1858.54, 1437.81, 1576.877361, 1829.56, 2649.85, 3198.38, 3112.755, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3617.587105, 3548.414121, 2432.665066, 2221.536633, 2546.727124, 1730.239546, 875.5616174, 768.6928239, 446.3551938, 20.865, 154.0326695, 250.6634437, 518.4214486, 621.2954051, 930.96, 1211.77, 1106.12, 1159.42, 1312.2, 1751.77, 1722.67, 1861.86, 2047.29, 1965.1, 2048.87, 736.555, 1160.57, 984.93, 1191.94, 1197.19, 1841.41, 2827.83, 2295.810629, 3714.36, 2454.165, 1802.357343, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800
                    ],
                }
            ],
        };
    },
    created() {
        this.generateData();
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main2');
            this.chartInstance = echarts.init(chartDom);
            var option = this.getOption();
            this.chartInstance.setOption(option);
        },
        changeEnergy() {
            this.updateChart(this.conventionalData);
        },
        changeNewenergy() {
            this.updateChart(this.newData);
        },
        updateChart(data) {
            if (this.chartInstance) {
                this.chartInstance.dispose(); // 销毁图表实例
            }
            this.initChart();
            this.chartInstance.setOption(this.getOption(data)); // 设置新数据
        },
        getOption(data = this.leftData) {
            return {
                title: {
                    // text: 'Bar Animation Delay',
                },
                legend: {
                    bottom: 10,
                    textStyle: {
                        color: 'rgb(55, 209, 259)',
                    },
                    data: data.map(item => item.name),
                },
                toolbox: {

                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    name: 't/min',
                    data: Array.from({ length: 101 }, (_, i) => i),
                    axisLabel: {
                        show: true,
                        interval: 9,
                        textStyle: {
                            fontWeight: 'bold'
                        }
                    },
                },
                yAxis: [
                    {
                        name: 'P/MW',
                        type: 'value',
                        nameTextStyle: {
                            fontWeight: 'bold'
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                fontWeight: 'bold'
                            }
                        },
                        axisPointer: {
                            snap: true,
                        },
                    },
                ],
                series: data.map((item,index) => ({
                    name: item.name,
                    type: 'line',
                    data: item.data,
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        color: this.colorLine[index], // 设置单独的颜色
                    },
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                })),
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            };
        }
    },

    mounted() {
        this.initChart()
        // GIS数据
        this.$bus.$on('allData', (data) => {
            this.leftData[0].data = data[2][1];
            this.initChart();
        });
        const that = this
        this.$bus.$on('allData1', (data) => {
            if (that.tabindex === 0) {
                this.leftData[0].data = data[1][5];
                this.initChart();
            }
            if (that.tabindex === 1) {
                this.leftData[0].data = data[2][5];
                this.initChart();
            }
        })

        // index数据
        this.$bus.$on('indexData', (params) => {
            const data = params.param1;
            this.tabindex = params.param2;
            this.leftData[0].data = data[5];
            this.updateChart(this.leftData)
        })
    },
    beforeDestroy() {
        this.$bus.$off('allData');
        this.$bus.$off('indexData')
    }

}
</script>

<style lang="scss" scoped>
.bot {
    width: 100%;
    /* height: 100%; */
    z-index: 99999;
    height: 34vh;
    /* padding-bottom: 5.5vh; */
    /* height: 28vh; */
    background-size: 100% 107%;
    background-repeat: no-repeat;
    background-image: url('../../../../../assets/img/ch/chbg.png');
}
</style>
