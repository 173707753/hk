<template>
    <div id="chartMain" class="chart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    props: {
        allcharts: Object, // 声明名为 alldata 的 prop，其类型为对象
    },
    data() {
        return {
            legendData: [],
        }
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('chartMain');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                title: {
                    text: this.allcharts.txt,
                    textStyle: {
                        fontSize: 18,  // 根据需要设置标题的字体大小
                        fontWeight: 'bold',  // 根据需要设置标题的字体粗细
                    },
                },
                legend: {
                    bottom: '0',
                },
                radar: {
                    indicator: [
                        { name: '6:00', },
                        { name: '10:00', },
                        { name: '12:00', },
                        { name: '14:00', },
                        { name: '16:00', },
                        { name: '20:00', }
                    ]
                },
                series: [
                    {
                        type: 'radar',
                        data: [
                            {
                                value: this.allcharts.data[0],
                                name: this.allcharts.name[0] + '(P/MW)',
                                label: {
                                    show: true,
                                }
                            },
                            {
                                value: this.allcharts.data[1],
                                name: this.allcharts.name[1] + '(P/MW)',
                                label: {
                                    show: true,
                                }
                            }
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);
        },
    },
    mounted() {
        this.initChart();
    },
}
</script>

<style lang="scss" scoped>
.chart {
    position: absolute;
    top: 13.5%;
    left: 28.94%;
    width: 39.9%;
    height: 50%;
    border: 3px solid #4187B3;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    padding: 20px;
    z-index: 9999;
    border-radius: 6px;
    background-color: #fff;
}
</style>