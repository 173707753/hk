<template>
    <div class="bot">
        <div class="st_titles">
            负荷数据
        </div>
        <!-- 渲染位置 -->
        <div id="main4" style="height: calc(100% - 4vh);width: 100%;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            leftData: [
                {
                    name: '负荷',
                    data: [2460, 3009, 2638, 2679, 2585, 2645, 2666, 2552, 2576, 2494, 2508, 2481, 2484, 2562, 2505, 2584, 2575, 2526, 2402, 2461, 2455, 2491, 2412, 2476, 2376, 2593, 2538, 2549, 2453, 2404, 2454, 2332, 2227, 2339, 2316, 2355, 2353, 2348, 2322, 2305, 2367, 2334, 2352, 2343, 2285, 2479, 2399, 2277, 2303, 2324, 2285, 2284, 2246, 2298, 2268, 2324, 2355, 2365, 2437, 2572, 2542, 2515, 2537, 2480, 2526, 2575, 2557, 2688, 2733, 2673, 2593, 2717, 2681, 2750, 2883, 2755, 2760, 2724, 2709, 2715, 2761, 2795, 2837, 2825, 2874, 2863, 2933, 2855, 2846, 2916, 2804, 2872, 2755, 2904, 2869, 2875]
                }
            ],
        };
    },
    created() {
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main4');
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
                    bottom:10,
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
