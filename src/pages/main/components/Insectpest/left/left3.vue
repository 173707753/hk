<template>
    <div class="bot">
        <div class="st_titles">
            储能数据
        </div>
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="main3" class="chart"></div>
            <!-- 按钮浮动在折线图上 -->
            <div class="button-container">
                <div @click="changeEnergy(1)" class="energy-button conventional">抽蓄电量</div>
                <div @click="changeNewenergy(1)" class="energy-button new">发电功率</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            chartDate: [
                {
                    name: '南阳',
                    data: [2678, 2677, 2657, 2679, 2500, 2269, 2271, 2385, 2298, 2221, 2221, 2152, 2112, 2113, 2124, 2169, 2211, 2149, 1947, 1938, 1893, 1951, 1975, 2023, 2117, 2189, 2192, 2211, 2247, 2080, 2106, 2132, 2084, 2017, 1960, 1927, 1843, 1722, 1672, 1627, 1627, 1623, 1622, 1621, 1614, 1625, 1613, 1621, 1605, 1606, 1621, 1603, 1624, 1608, 1622, 1631, 1630, 1615, 1627, 1624, 1627, 1684, 1719, 1721, 1808, 1880, 2016, 2242, 2418, 2600, 2811, 3000, 3258, 3420, 3574, 3606, 3528, 3379, 3473, 3512, 3538, 3542, 3501, 3631, 3730, 3790, 3720, 3677, 3646, 3595, 3472, 3509, 3393, 3394, 3412, 3162],
                },
            ],
            conventionalData: [
                {
                    name: '南阳',
                    data: [2678, 2677, 2657, 2679, 2500, 2269, 2271, 2385, 2298, 2221, 2221, 2152, 2112, 2113, 2124, 2169, 2211, 2149, 1947, 1938, 1893, 1951, 1975, 2023, 2117, 2189, 2192, 2211, 2247, 2080, 2106, 2132, 2084, 2017, 1960, 1927, 1843, 1722, 1672, 1627, 1627, 1623, 1622, 1621, 1614, 1625, 1613, 1621, 1605, 1606, 1621, 1603, 1624, 1608, 1622, 1631, 1630, 1615, 1627, 1624, 1627, 1684, 1719, 1721, 1808, 1880, 2016, 2242, 2418, 2600, 2811, 3000, 3258, 3420, 3574, 3606, 3528, 3379, 3473, 3512, 3538, 3542, 3501, 3631, 3730, 3790, 3720, 3677, 3646, 3595, 3472, 3509, 3393, 3394, 3412, 3162],
                },

            ],
            newData: [
                {
                    name: '南阳',
                    data: [24, 35, 54, 115, 134, 135, 101, 71, 38, 14, 5, 4, 4, 3, 0, 3, 4, 5, 9, 6, 7, 11, 19, 19, 23, 20, 11, 10, 16, 18, 26, 26, 28, 23, 19, 11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 7, 16, 18, 20, 20, 39, 61, 86, 95, 96, 100, 87, 73, 75, 69, 63, 69]
                },

            ],
        };
    },
    created() {
        this.$bus.$on('chart3', () => {
            this.changeEnergy(2)
        })
        this.$bus.$on('chart4', () => {
            this.changeNewenergy(2)
        })
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main3');
            this.chartInstance = echarts.init(chartDom);
            var option = this.getOption();
            this.chartInstance.setOption(option);
        },
        changeEnergy(flag) {
            this.updateChart(this.conventionalData);
            if (flag === 2) return
            this.$bus.$emit('left3')
        },
        changeNewenergy(flag) {
            this.updateChart(this.newData);
            if (flag === 2) return
            this.$bus.$emit('left4')
        },
        updateChart(data) {
            if (this.chartInstance) {
                this.chartInstance.dispose(); // 销毁图表实例
            }
            this.initChart();
            this.chartInstance.setOption(this.getOption(data)); // 设置新数据
        },
        getOption(data = this.chartDate) {
            return {
                title: {
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    bottom: 10,
                    textStyle: {
                        color: '#fff',
                    },
                    data: data.map(item => item.name),
                    left: 'center'
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
                    type: 'bar',
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
            this.chartDate[0].data = data[2][2];
            this.conventionalData[0].data = data[2][2];
            this.newData[0].data = data[2][2];
            this.initChart();
        });
        // index数据
        this.$bus.$on('indexData', (data) => {
            this.chartDate[0].data = data[6];
            this.conventionalData[0].data = data[6];
            this.newData[0].data = data[6];
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

.chart-container {
    position: relative;
    height: calc(100% - 4vh);

    .chart {
        width: 100%;
        height: 100%;
    }

    .button-container {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .energy-button {
        padding: 1px 2px;
        margin: 2px;
        border-radius: 3px;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        color: rgb(55, 209, 259);
        transition: background-color 0.3s;

        &.conventional {
            background-color: rgba(84, 122, 194, .5);
        }

        &.new {
            background-color: rgba(84, 122, 194, .5);
        }

        &:hover {
            color: rgb(2, 188, 233);
            background-color: rgb(14, 33, 72);
        }
    }
}

/* .chartclass{

} */
</style>
