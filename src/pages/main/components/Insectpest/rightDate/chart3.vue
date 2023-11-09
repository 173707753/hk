<template>
    <div class="top">
        <div class="st_titles">储能数据</div>
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="chart3" class="chart">

            </div>
            <div class="button-container">
                <div @click="changeEnergy(1)" class="energy-button conventional">发电功率</div>
                <div @click="changeNewenergy(1)" class="energy-button new">抽蓄电量</div>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            colorLine: ['#bfc', '#FFC22E', '#FF4528', '#5EC2F2', '#fff'],
            tabindex: 0,
            chartDate: [
                {
                    name: '储能 数据',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
            ],
            conventionalData: [
                {
                    name: '储能 数据',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
            ],
            newData: [
                {
                    name: '储能 数据',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: '储能 数据',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
            ],
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
        }
    },
    mounted() {
        this.initChart()
        // 接收tab切换的数据
        this.$bus.$on('indexData', (params) => {
            const dataAll = params.param1;
            const index = params.param2;
            this.chartDate[0].data = dataAll[2][1];
            this.newData[0].data = dataAll[2][0];
            this.conventionalData = this.chartDate

            this.updateChart(this.chartDate);
            this.tabindex = index
            // console.log( this.tabindex,'tab31');
        });
        //接收gis的数据
        const that = this
        this.$bus.$on('allData1', (selectData) => {
            // console.log(that.tabindex,'tab32');
            if (that.tabindex === 0) {
                this.chartDate[0].data = selectData[1][2][0];
                this.newData[0].data = selectData[1][2][1];
                this.newData[1].data = selectData[1][2][2]
                this.conventionalData = this.chartDate;
                this.updateChart(this.conventionalData)
                // console.log(this.conventionalData,'ok');
            }
            if (that.tabindex === 1) {
                this.chartDate[0].data = selectData[2][2][0]; //发电功率
                this.newData[0].data = selectData[2][2][1]; //南阳上水库
                this.newData[1].data = selectData[2][2][2]   //南阳下水库
                console.log(this.newData[1].data, '南阳下');
                this.conventionalData = this.chartDate;
                // console.log(this.conventionalData,'ok');
                this.updateChart(this.conventionalData)
            }

        })
        // 
        this.$bus.$on('allData', (selectData) => {
            // console.log(that.tabindex,'tab32');
            if (that.tabindex === 0) {
                this.chartDate[0].data = selectData[0][2][0];
                this.newData[0].data = selectData[0][2][1];
                // this.newData[1].data= selectData[0][2][2]
                this.conventionalData = this.chartDate;
                this.updateChart(this.conventionalData)
                // console.log(this.conventionalData,'ok');
            }
            if (that.tabindex === 1) {
                this.chartDate[0].data = selectData[1][2][0]; //发电功率
                this.newData[0].data = selectData[1][2][1]; //南阳上水库
                //  this.newData[1].data= selectData[2][2][2]   //南阳下水库
                //  console.log( this.newData[1].data,'南阳下');
                this.conventionalData = this.chartDate;
                // console.log(this.conventionalData,'ok');
                this.updateChart(this.conventionalData)
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