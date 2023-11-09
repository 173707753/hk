<template>
    <div class="top" @mouseenter="showPopup" @mouseleave="onBotMouseLeave">
        <div class="st_titles">
            电网数据
        </div>
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="chart2" class="chart"></div>
        </div>
        <PopupComponent v-if="isMouseOverBot" ref="popup2" @close-popup="hidePopup" :alldata="leftData" />
        
    </div>
</template>

<script>
import * as echarts from 'echarts'
import PopupComponent from '../PopupComponent.vue'
export default {
    components: { PopupComponent },
    data() {
        return {
            isMouseOverBot: false,
            colorLine:['#bfc'],
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
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('chart2');
            this.chartInstance = echarts.init(chartDom);
            var option = this.getOption();
            this.chartInstance.setOption(option);
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
                },
                legend: {
                    bottom: 10,
                    textStyle: {
                        color: '#fff',
                    },
                    data: data.map(item => item.name),
                    left: 'center'
                },
                toolbox: {
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
                tooltip: {
                    trigger: 'axis'
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
        },
                //鼠标移入移出
                showPopup() {
            this.isMouseOverBot = true;
            //传输数据
            this.$bus.$emit('tableData', this.alldata)
        },
        hidePopup() {
            this.isMouseOverBot = false;
        },
        onBotMouseLeave(event) {
            // 获取鼠标位置
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            // 获取 PopupComponent 的 DOM 元素
            const popupElement = this.$refs.popup2.$refs.popup;
            const leftElement = this.$el;
            // 获取 PopupComponent 的位置和尺寸
            const popupRect = popupElement.getBoundingClientRect();
            const leftRect = leftElement.getBoundingClientRect();

            // 判断鼠标是否在 PopupComponent 区域内
            if (
                // mouseX < popupRect.left ||
                mouseX > popupRect.right ||
                mouseY < popupRect.top ||
                mouseY > popupRect.bottom ||
                mouseX < leftRect.left ||
                // mouseX > leftRect.right ||
                mouseY < leftRect.top ||
                mouseY > leftRect.bottom
            ) {
                console.log('离开');
                this.hidePopup();
            }
        },
    },
    mounted() {
        this.initChart()
        // 接收tab切换的数据
        this.$bus.$on('indexData', (params) => {
            const dataAll = params.param1;
            const index = params.param2;
            // console.log(dataAll,'all',index);
            this.leftData[0].data = dataAll[1];
            this.updateChart(this.leftData)
            this.tabindex = index
        });
        // 接收gis的数据
        const that = this
        this.$bus.$on('allData1', (selectData) => {
            console.log(that.tabindex,'tab2');
            if (that.tabindex === 0) {
                this.leftData[0].data = selectData[1][1];
                // console.log( this.leftData[0].data,'yes');
                this.updateChart(this.leftData)
            }
            if (that.tabindex === 1) {
                this.leftData[0].data = selectData[2][1];
                // console.log( this.leftData[0].data,'ok');
                this.updateChart(this.leftData)
            }
        })
        // 
        this.$bus.$on('allData', (selectData) => {
            if (that.tabindex === 0) {
                this.leftData[0].data = selectData[0][1];
                // console.log( this.leftData[0].data,'yes');
                this.updateChart(this.leftData)
            }
            if (that.tabindex === 1) {
                this.leftData[0].data = selectData[1][1];
                // console.log( this.leftData[0].data,'ok');
                this.updateChart(this.leftData)
            }
        })
    },
}
</script>
<style lang="scss" scoped>
.top {
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