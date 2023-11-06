<template>
    <div class="bot" @mouseenter="showPopup" @mouseleave="onBotMouseLeave">
        <div class="st_titles">
            电源数据
        </div>
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="main1" class="chart"></div>
            <!-- 按钮浮动在折线图上 -->
            <div class="button-container">
                <div @click="changeEnergy(1)" class="energy-button conventional">常规电源</div>
                <div @click="changeNewenergy(1)" class="energy-button new">新能源</div>
            </div>
        </div>
        <PopupComponent v-if="isMouseOverBot" @close-popup="hidePopup" :alldata="alldata" />
    </div>
</template>

<script>
import * as echarts from 'echarts'
import PopupComponent from '../PopupComponent.vue'
export default {
    components: {
        PopupComponent,
    },
    data() {
        return {
            tabindex: 0,
            leftData: [
                {
                    name: '火电发电',
                    data: [2678, 2677, 2657, 2679, 2500, 2269, 2271, 2385, 2298, 2221, 2221, 2152, 2112, 2113, 2124, 2169, 2211, 2149, 1947, 1938, 1893, 1951, 1975, 2023, 2117, 2189, 2192, 2211, 2247, 2080, 2106, 2132, 2084, 2017, 1960, 1927, 1843, 1722, 1672, 1627, 1627, 1623, 1622, 1621, 1614, 1625, 1613, 1621, 1605, 1606, 1621, 1603, 1624, 1608, 1622, 1631, 1630, 1615, 1627, 1624, 1627, 1684, 1719, 1721, 1808, 1880, 2016, 2242, 2418, 2600, 2811, 3000, 3258, 3420, 3574, 3606, 3528, 3379, 3473, 3512, 3538, 3542, 3501, 3631, 3730, 3790, 3720, 3677, 3646, 3595, 3472, 3509, 3393, 3394, 3412, 3162],
                },
                {
                    name: '水电发电',
                    data: [243, 541, 314, 380, 73, 891, 1022, 396, 527, 407, 229, 75, 306, 532, 531, 738, 298, 247, 85, 83, 80, 391, 81, 534, 81, 830, 757, 827, 72, 592, 539, 80, 78, 303, 292, 62, 61, 61, 39, 37, 39, 37, 38, 41, 186, 533, 531, 88, 61, 65, 63, 62, 42, 44, 43, 43, 42, 43, 203, 940, 543, 393, 543, 912, 809, 913, 917, 803, 1255, 1011, 351, 496, 40, 375, 567, 58, 49, 271, 206, 353, 311, 39, 518, 280, 323, 96, 772, 622, 512, 369, 468, 697, 69, 1034, 1051, 1024],
                },
                // {
                //     name: '抽蓄发电',
                //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                // }
            ],
            conventionalData: [
                {
                    name: '火电发电',
                    data: [2678, 2677, 2657, 2679, 2500, 2269, 2271, 2385, 2298, 2221, 2221, 2152, 2112, 2113, 2124, 2169, 2211, 2149, 1947, 1938, 1893, 1951, 1975, 2023, 2117, 2189, 2192, 2211, 2247, 2080, 2106, 2132, 2084, 2017, 1960, 1927, 1843, 1722, 1672, 1627, 1627, 1623, 1622, 1621, 1614, 1625, 1613, 1621, 1605, 1606, 1621, 1603, 1624, 1608, 1622, 1631, 1630, 1615, 1627, 1624, 1627, 1684, 1719, 1721, 1808, 1880, 2016, 2242, 2418, 2600, 2811, 3000, 3258, 3420, 3574, 3606, 3528, 3379, 3473, 3512, 3538, 3542, 3501, 3631, 3730, 3790, 3720, 3677, 3646, 3595, 3472, 3509, 3393, 3394, 3412, 3162],
                },
                {
                    name: '水电发电',
                    data: [243, 541, 314, 380, 73, 891, 1022, 396, 527, 407, 229, 75, 306, 532, 531, 738, 298, 247, 85, 83, 80, 391, 81, 534, 81, 830, 757, 827, 72, 592, 539, 80, 78, 303, 292, 62, 61, 61, 39, 37, 39, 37, 38, 41, 186, 533, 531, 88, 61, 65, 63, 62, 42, 44, 43, 43, 42, 43, 203, 940, 543, 393, 543, 912, 809, 913, 917, 803, 1255, 1011, 351, 496, 40, 375, 567, 58, 49, 271, 206, 353, 311, 39, 518, 280, 323, 96, 772, 622, 512, 369, 468, 697, 69, 1034, 1051, 1024],
                },
                // {
                //     name: '抽蓄发电',
                //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                // }
            ],
            newData: [
                {
                    name: '风电发电',
                    data: [24, 35, 54, 115, 134, 135, 101, 71, 38, 14, 5, 4, 4, 3, 0, 3, 4, 5, 9, 6, 7, 11, 19, 19, 23, 20, 11, 10, 16, 18, 26, 26, 28, 23, 19, 11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 7, 16, 18, 20, 20, 39, 61, 86, 95, 96, 100, 87, 73, 75, 69, 63, 69]
                },
                {
                    name: '光伏发电',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 7, 14, 25, 40, 59, 77, 98, 93, 118, 151, 158, 177, 175, 179, 230, 265, 262, 255, 274, 227, 308, 270, 290, 344, 355, 329, 354, 343, 330, 312, 322, 322, 335, 356, 326, 327, 312, 293, 258, 236, 209, 187, 164, 133, 109, 87, 67, 46, 31, 22, 14, 11, 9, 9, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
            alldata: [
                // thermalPower 火电
                {
                    name: '火电发电',
                    data: [2678, 2677, 2657, 2679, 2500, 2269, 2271, 2385, 2298, 2221, 2221, 2152, 2112, 2113, 2124, 2169, 2211, 2149, 1947, 1938, 1893, 1951, 1975, 2023, 2117, 2189, 2192, 2211, 2247, 2080, 2106, 2132, 2084, 2017, 1960, 1927, 1843, 1722, 1672, 1627, 1627, 1623, 1622, 1621, 1614, 1625, 1613, 1621, 1605, 1606, 1621, 1603, 1624, 1608, 1622, 1631, 1630, 1615, 1627, 1624, 1627, 1684, 1719, 1721, 1808, 1880, 2016, 2242, 2418, 2600, 2811, 3000, 3258, 3420, 3574, 3606, 3528, 3379, 3473, 3512, 3538, 3542, 3501, 3631, 3730, 3790, 3720, 3677, 3646, 3595, 3472, 3509, 3393, 3394, 3412, 3162],
                },
                // hydroelectric 水电
                {
                    name: '水电发电',
                    data: [243, 541, 314, 380, 73, 891, 1022, 396, 527, 407, 229, 75, 306, 532, 531, 738, 298, 247, 85, 83, 80, 391, 81, 534, 81, 830, 757, 827, 72, 592, 539, 80, 78, 303, 292, 62, 61, 61, 39, 37, 39, 37, 38, 41, 186, 533, 531, 88, 61, 65, 63, 62, 42, 44, 43, 43, 42, 43, 203, 940, 543, 393, 543, 912, 809, 913, 917, 803, 1255, 1011, 351, 496, 40, 375, 567, 58, 49, 271, 206, 353, 311, 39, 518, 280, 323, 96, 772, 622, 512, 369, 468, 697, 69, 1034, 1051, 1024],
                },
                // windPower 风电
                {
                    name: '风电发电',
                    data: [24, 35, 54, 115, 134, 135, 101, 71, 38, 14, 5, 4, 4, 3, 0, 3, 4, 5, 9, 6, 7, 11, 19, 19, 23, 20, 11, 10, 16, 18, 26, 26, 28, 23, 19, 11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 7, 16, 18, 20, 20, 39, 61, 86, 95, 96, 100, 87, 73, 75, 69, 63, 69]
                },
                // photovoltaicPanel 光伏
                {
                    name: '光伏发电',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 7, 14, 25, 40, 59, 77, 98, 93, 118, 151, 158, 177, 175, 179, 230, 265, 262, 255, 274, 227, 308, 270, 290, 344, 355, 329, 354, 343, 330, 312, 322, 322, 335, 356, 326, 327, 312, 293, 258, 236, 209, 187, 164, 133, 109, 87, 67, 46, 31, 22, 14, 11, 9, 9, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
            isMouseOverBot: false,
        };
    },
    created() {

    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main1');
            this.chartInstance = echarts.init(chartDom);
            var option = this.getOption();
            this.chartInstance.setOption(option);
        },
        changeEnergy(flag) {
            this.updateChart(this.conventionalData);
            if (flag === 2) return;
            this.$bus.$emit('left1')
        },
        changeNewenergy(flag) {
            this.updateChart(this.newData);
            if (flag === 2) return;
            this.$bus.$emit('left2')
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
        },
        //鼠标移入移出
        showPopup() {
            this.isMouseOverBot = true;
            //传输数据
            // this.$bus.$emit('tableData', this.alldata)
        },
        hidePopup() {
            this.isMouseOverBot = false;
        },
        onBotMouseLeave(event) {
            // 获取鼠标位置
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // 获取 PopupComponent 的 DOM 元素
            const popupElement = this.$refs.popup;

            // 获取 PopupComponent 的位置和尺寸
            const popupRect = popupElement.getBoundingClientRect();

            // 判断鼠标是否在 PopupComponent 区域内
            if (
                mouseX < popupRect.left ||
                mouseX > popupRect.right ||
                mouseY < popupRect.top ||
                mouseY > popupRect.bottom
            ) {
                this.hidePopup();
            }
        },
    },
    mounted() {
        this.$bus.$on('chart1', () => {
            this.changeEnergy(2)
        });
        this.$bus.$on('chart2', () => {
            this.changeNewenergy(2)
        });
        this.initChart();
        // GIS数据
        this.$bus.$on('allData', (data) => {
            console.log(data, '我接受的省份数据');
            this.leftData[0].data = data[2][0][0][0];
            this.leftData[1].data = data[2][0][0][1];
            this.conventionalData = this.leftData;
            this.newData[0].data = data[2][0][1][0];
            this.newData[1].data = data[2][0][1][1];
            this.alldata[0] = this.leftData[0];
            this.alldata[1] = this.leftData[1];
            this.alldata[2] = this.newData[0];
            this.alldata[3] = this.newData[1];
            this.initChart();
        });
        const that = this
        this.$bus.$on('allData1', (data) => {
            if (that.tabindex === 0) {
                this.leftData[0].data = data[1][4][0][0];
                this.leftData[1].data = data[1][4][0][1];
                this.conventionalData = this.leftData;
                this.newData[0].data = data[1][4][1][0];
                this.newData[1].data = data[1][4][1][1];
                this.alldata[0] = this.leftData[0];
                this.alldata[1] = this.leftData[1];
                this.alldata[2] = this.newData[0];
                this.alldata[3] = this.newData[1];
                this.initChart();
            }
            if (that.tabindex === 1) {
                this.leftData[0].data = data[2][4][0][0];
                this.leftData[1].data = data[2][4][0][1];
                this.conventionalData = this.leftData;
                this.newData[0].data = data[2][4][1][0];
                this.newData[1].data = data[2][4][1][1];
                this.alldata[0] = this.leftData[0];
                this.alldata[1] = this.leftData[1];
                this.alldata[2] = this.newData[0];
                this.alldata[3] = this.newData[1];
                this.initChart();
            }
        })
        // index数据
        this.$bus.$on('indexData', (params) => {
            const data = params.param1;
            this.tabindex = params.param2;
            this.leftData[0].data = data[4][0][0];
            this.leftData[1].data = data[4][0][1];
            this.conventionalData = this.leftData;
            this.newData[0].data = data[4][1][0];
            this.newData[1].data = data[4][1][1];
            this.alldata[0] = this.leftData[0];
            this.alldata[1] = this.leftData[1];
            this.alldata[2] = this.newData[0];
            this.alldata[3] = this.newData[1];
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
        display: flex;
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
