<template>
    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="bot" @mouseenter="showPopup"
        @mouseleave="onBotMouseLeave">
        <div class="st_titles">
            电源数据
        </div>
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="main1" class="chart"></div>
            <!-- 按钮浮动在折线图上 -->
            <div class="button-container">
                <div @click="totalEnergy(1)" class="energy-button new">总电源</div>
                <div @click="changeEnergy(1)" class="energy-button conventional">常规电源</div>
                <div @click="changeNewenergy(1)" class="energy-button new">新能源</div>
            </div>
        </div>
        <PopupComponent v-if="isMouseOverBot" ref="popup" @close-popup="hidePopup" :alldata="alldata" />
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
            loading: true,
            tabindex: 0,
            titleName: '河南省洛北济源',
            colorLine: ['#bfc', '#FFC22E', '#5EC2F2', '#FF4528', '#fff'],
            leftData: [
                // thermalPower 火电
                {
                    name: '火电发电',
                    data: [
                    ],
                },
                // hydroelectric 水电
                {
                    name: '水电发电',
                    data: [
                    ],
                },
            ],
            conventionalData: [
            ],
            newData: [
                {
                    name: '风电发电',
                    data: [
                    ]
                },
                {
                    name: '光伏发电',
                    data: [
                    ]
                }
            ],
            alldata: [
                // thermalPower 火电
                {
                    name: '火电发电',
                    data: [
                    ],
                },
                // hydroelectric 水电
                {
                    name: '水电发电',
                    data: [
                    ],
                },
                // 抽蓄发电
                {
                    name: '抽蓄发电',
                    data: [
                    ],
                },
                // windPower 风电
                {
                    name: '风电发电',
                    data: [
                    ]
                },
                // photovoltaicPanel 光伏
                {
                    name: '光伏发电',
                    data: [
                    ]
                },
            ],
            isMouseOverBot: false,
        };
    },
    // created() {
    //     this.updateChart(this.alldata)
    // },
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

        totalEnergy(flag) {
            this.updateChart(this.alldata)
            if (flag === 2) return
            this.$bus.$emit('total1')
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
                    text: this.titleName,
                    textStyle: {
                        color: '#fff',
                    },
                    left: '5%',
                },
                legend: {
                    bottom: 10,
                    textStyle: {
                        color: 'rgb(55, 209, 259)',
                    },
                    // data: data.map(item => item.name),
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
                series: data.map((item, index) => ({
                    name: item.name,
                    type: 'bar',
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
            // this.$bus.$emit('tableData', this.alldata)
        },
        hidePopup() {
            this.isMouseOverBot = false; // 隐藏弹窗
        },
        onBotMouseLeave(event) {
            // 获取鼠标位置
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            // 获取 PopupComponent 的 DOM 元素
            const popupElement = this.$refs.popup.$refs.popup;
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
                // console.log('离开');
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
        this.$bus.$on('total2', () => {
            this.totalEnergy(2)

        });
        this.initChart();
        this.$bus.$on('allData2', (data) => {
            this.titleName = data.selectedProvince + data.selectedArea
        })
        this.$bus.$on('trueData', (alldata) => {
            // console.log('具体区域数据1', alldata.data);
            this.leftData[0].data = []
            this.leftData[1].data = []
            this.newData[0].data = []
            this.newData[1].data = []
            this.conventionalData = []
            this.alldata[0].data = []
            this.alldata[1].data = []
            this.alldata[2].data = []
            this.alldata[3].data = []
            this.alldata[4].data = []
            alldata.data.forEach((item) => {
                // 火电
                this.leftData[0].data.push(item.fire_generation)
                // 水电
                this.leftData[1].data.push(item.water_generation)
                // 风电
                this.newData[0].data.push(item.wind_generation)
                // 光伏
                this.newData[1].data.push(item.light_generation)
                // 抽蓄
                this.alldata[2].data.push(item.take_generation)
            })
            this.conventionalData = this.leftData
            this.alldata[0].data = this.leftData[0].data
            this.alldata[1].data = this.leftData[1].data
            this.alldata[3].data = this.newData[0].data
            this.alldata[4].data = this.newData[1].data
            this.updateChart(this.alldata)
            this.loading = false
            // console.log("具体数据left", this.leftData);
        })
    },
    beforeDestroy() {
        this.$bus.$off('trueData');
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
