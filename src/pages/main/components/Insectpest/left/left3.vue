<template>
    <div class="bot">
        <div class="st_titles">
            储能:抽蓄
        </div>
        <!-- 渲染位置 -->
        <div id="main3" style="height: 100%;width: 100%;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            leftData: [
                {
                    name: '抽蓄发电',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                }
            ],
        };
    },
    created() {
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main3');
            this.chartInstance = echarts.init(chartDom);
            var option = this.getOption();
            this.chartInstance.setOption(option);
        },
        getOption(data = this.leftData) {
            return {
                title: {
                    // text: 'Bar Animation Delay',
                },
                legend: {
                    textStyle: {
                        color: 'rgb(55, 209, 259)',
                    },
                    data: data.map(item => item.name),
                },
                toolbox: {

                },
                tooltip: {},
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
