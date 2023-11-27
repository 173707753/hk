<template>
    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="top" @mouseenter="showPopup"
        @mouseleave="onBotMouseLeave">
        <div class="st_titles">储能数据</div>
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="chart3" class="chart">

            </div>
            <div class="button-container">
                <div @click="changeEnergy(1)" class="energy-button conventional">发电功率</div>
                <div @click="changeNewenergy(1)" class="energy-button new">抽蓄电量</div>
            </div>
            <PopupComponent v-if="isMouseOverBot" ref="popup3" @close-popup="hidePopup" :alldata="tableData" />
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
import PopupComponent from '../PopupComponent.vue'
export default {
    components: { PopupComponent },
    data() {
        return {
            loading: true,
            isMouseOverBot: false,
            colorLine: ['#bfc', '#FFC22E', '#FF4528', '#5EC2F2', '#fff'],
            tabindex: 0,
            chartDate: [
                {
                    name: '储能 数据',
                    data: []
                },
            ],
            conventionalData: [
                {
                    name: '储能 数据',
                    data: []
                },
            ],
            newData: [
                {
                    name: '储能 数据',
                    data: []
                },
                {
                    name: '储能 数据',
                    data: []
                },
            ],
            tableData: [
                {
                    name: '储能 数据',
                    data: []
                },
                {
                    name: '抽蓄电量',
                    data: []
                },
            ]
        };
    },
    created() {
        this.$bus.$on('left3', () => {
            this.changeEnergy(2)
        })
        this.$bus.$on('left4', () => {
            this.changeNewenergy(2)
        })
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('chart3');
            this.chartInstance = echarts.init(chartDom);
            var option = this.getOption();
            this.chartInstance.setOption(option);
        },
        changeEnergy(flag) {
            this.updateChart(this.conventionalData);
            if (flag === 2) return
            this.$bus.$emit('chart3')
        },
        changeNewenergy(flag) {
            this.updateChart(this.newData);
            if (flag === 2) return
            this.$bus.$emit('chart4')
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
            const popupElement = this.$refs.popup3.$refs.popup;
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

        this.$bus.$on('rightData', (alldata) => {
            // console.log("alldataqqqq", alldata);
            alldata.forEach((item) => {
                this.chartDate[0].data.push(item.take_quantity)
            })
            this.updateChart(this.chartDate)
            this.loading = false
        })

        this.$bus.$on('threeData', (threeData) => {
            threeData.forEach((item) => {
                if(item.region === '南阳上'){
                    this.newData[0].data.push(item.take_take_quantity)
                }else{
                    this.newData[1].data.push(item.take_take_quantity)
                }
            })
            this.updateChart(this.chartDate)
            this.loading = false
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