<template>
    <div class="bot">
        <div class="st_titles">
            电网:断面数据
        </div>
        <!-- 渲染位置 -->
        <div id="main2" style="height: 100%;width: 100%;"></div>
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
            var chartDom = document.getElementById('main2');
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

}
</style>
