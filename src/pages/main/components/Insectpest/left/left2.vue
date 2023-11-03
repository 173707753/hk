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
            tabindex: 0,
            leftData: [
                {
                    name: '断面数据',
                    data: [2678, 2677, 2657, 2679, 2500, 2269, 2271, 2385, 2298, 2221, 2221, 2152, 2112, 2113, 2124, 2169, 2211, 2149, 1947, 1938, 1893, 1951, 1975, 2023, 2117, 2189, 2192, 2211, 2247, 2080, 2106, 2132, 2084, 2017, 1960, 1927, 1843, 1722, 1672, 1627, 1627, 1623, 1622, 1621, 1614, 1625, 1613, 1621, 1605, 1606, 1621, 1603, 1624, 1608, 1622, 1631, 1630, 1615, 1627, 1624, 1627, 1684, 1719, 1721, 1808, 1880, 2016, 2242, 2418, 2600, 2811, 3000, 3258, 3420, 3574, 3606, 3528, 3379, 3473, 3512, 3538, 3542, 3501, 3631, 3730, 3790, 3720, 3677, 3646, 3595, 3472, 3509, 3393, 3394, 3412, 3162],
                },
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
                series: data.map(item => ({
                    name: item.name,
                    type: 'line',
                    data: item.data,
                    emphasis: {
                        focus: 'series'
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
