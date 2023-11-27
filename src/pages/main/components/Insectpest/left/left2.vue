<template>
    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="bot" @mouseenter="showPopup"
        @mouseleave="onBotMouseLeave">
        <div class="st_titles">
            电网数据
        </div>
        <!-- 渲染位置 -->
        <div id="main2" style="height: calc(100% - 4vh);width: 100%;"></div>
        <PopupComponent v-if="isMouseOverBot" ref="popup1" @close-popup="hidePopup" :alldata="leftData" />
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
            isMouseOverBot: false,
            colorLine: ['#bfc', '#FFC22E', '#5EC2F2', '#FF4528', '#fff'],
            tabindex: 0,
            leftData: [
                {
                    name: '断面数据',
                    data: [
                    ],
                }
            ],
        };
    },
    created() {
        this.generateData();
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main2');
            this.chartInstance = echarts.init(chartDom);
            var option = this.getOption();
            this.chartInstance.setOption(option);
        },
        changeEnergy() {
            this.updateChart(this.conventionalData);
        },
        changeNewenergy() {
            this.updateChart(this.newData);
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
                series: data.map((item, index) => ({
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
            const popupElement = this.$refs.popup1.$refs.popup;
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
        this.$bus.$on("trueData1", (data) => {
            // console.log("你好", data);
            this.leftData[0].data = []
            data.forEach((item) => {
                this.leftData[0].data.push(item.fracture_data)
            })
            this.updateChart(this.leftData)
            this.loading = false
        })

    },
    beforeDestroy() {
        this.$bus.$off('trueData1');
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
</style>
