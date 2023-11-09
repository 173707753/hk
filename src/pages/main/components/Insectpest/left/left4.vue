<template>
    <div class="bot" @mouseenter="showPopup" @mouseleave="onBotMouseLeave">
        <div class="st_titles">
            负荷数据
        </div>
        <!-- 渲染位置 -->
        <div id="main4" style="height: calc(100% - 4vh);width: 100%;"></div>
        <PopupComponent v-if="isMouseOverBot" ref="popup3" @close-popup="hidePopup" :alldata="leftData" />
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
            isMouseOverBot: false,
            colorLine: ['#bfc', '#FFC22E', '#5EC2F2', '#FF4528', '#fff'],
            tabindex: 0,
            leftData: [
                {
                    name: '负荷数据',
                    data: [
                        49100, 48783, 48019, 47363, 46921, 46673, 46086, 45767, 45142, 44714, 44316, 43945, 43648, 43461, 43276, 42982, 42955, 42579, 42421, 42393, 42525, 42620, 42884, 43396, 44765, 45257, 45341, 44744, 44278, 44605, 44688, 44964, 45485, 46680, 47094, 47751, 47996, 48853, 49814, 49761, 50204, 50600, 51115, 51734, 52318, 53114, 52935, 52617, 52793, 52837, 53178, 53150, 52763, 52391, 52425, 52615, 53302, 53494, 53589, 53436, 53169, 53306, 52659, 53000, 53373, 53770, 54305, 53979, 53852, 53813, 53904, 53667, 53601, 53233, 53004, 52954, 53614, 53733, 54005, 54268, 54117, 53854, 53922, 54294, 54660, 54482, 53886, 53294, 52944, 52000, 51311
                    ]
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
        // GIS数据
        this.$bus.$on('allData', (data) => {
            this.leftData[0].data = data[2][3];
            this.initChart();
        });
        const that = this
        this.$bus.$on('allData1', (data) => {
            if (that.tabindex === 0) {
                this.leftData[0].data = data[1][7];
                this.initChart();
            }
            if (that.tabindex === 1) {
                this.leftData[0].data = data[2][7];
                this.initChart();
            }
        })
        // index数据
        this.$bus.$on('indexData', (params) => {
            const data = params.param1;
            this.tabindex = params.param2;
            this.leftData[0].data = data[7];
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
    z-index: 99999;
    height: 34.2vh;
    background-image: url('../../../../../assets/img/ch/chbg.png');
    background-size: 100% auto;
    background-repeat: no-repeat;

}
</style>
