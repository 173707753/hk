<template>
    <div class="bot">
        <div class="st_titles">
            电源
        </div>
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="main1" class="chart"></div>
            <!-- 按钮浮动在折线图上 -->
            <div class="button-container">
                <el-tag @click="changeEnergy()" size="mini">常规电源</el-tag>
                <el-tag type="success" @click="changeNewenergy()" size="mini">新能源</el-tag>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            xAxisData: [],
            data1: [],
            data2: [],
        };
    },
    created() {
        this.generateData();
    },
    methods: {
        generateData() {
            for (var i = 0; i < 100; i++) {
                this.xAxisData.push('A' + i);
                this.data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                this.data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
            }
        },
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main1');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    // text: 'Bar Animation Delay',
                },
                legend: {
                    data: ['bar', 'bar2'],
                },
                tooltip: {},
                xAxis: {
                    data: this.xAxisData,
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: {},
                series: [
                    {
                        name: 'bar',
                        type: 'bar',
                        data: this.data1,
                        emphasis: {
                            focus: 'series',
                        },
                        animationDelay: function (idx) {
                            return idx * 10;
                        },
                    },
                    {
                        name: 'bar2',
                        type: 'bar',
                        data: this.data2,
                        emphasis: {
                            focus: 'series',
                        },
                        animationDelay: function (idx) {
                            return idx * 10 + 100;
                        },
                    },
                ],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                },
            };

            option && myChart.setOption(option);
        },
        changeEnergy() {
            console.log(111);
        },
        changeNewenergy() {
            console.log(222);
        }
    },

    mounted() {
        this.initChart()
    },

}
</script>

<style lang="scss" scoped>
.bot {
    width: 100%;
    z-index: 99999;
    height: 34.2vh;
    background-image: url('../../../../../assets/img/ch/chbg.png');
    background-size: 100% auto;
    background-repeat: no-repeat;

    .chart-container {
        position: relative;
        height: 100%;

        /* 设置相对定位以容纳图表和按钮 */
        .chart {
            width: 100%;
            height: 100%;
        }

        .button-container {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }
}
</style>
