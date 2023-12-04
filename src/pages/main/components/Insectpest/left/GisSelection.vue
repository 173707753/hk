<template>
    <div class="gis-selection">
        <div class="date-selection">
            <div class="select">
                <label>单位：</label>
                <select v-model="selectedProvince" @change="onProvinceChange">
                    <option value="" disabled>
                        <span>请选择单位</span>
                    </option>
                    <option v-for="(province, index) in provinces" :key="index" :value="province">{{ province }}
                    </option>
                </select>
            </div>

            <div class="select">
                <label>片区：</label>
                <select v-model="selectedArea" @change="onAreaChange">
                    <option value="" disabled>
                        <span>请选择片区</span>
                    </option>
                    <option v-for="(area, index) in filteredAreas" :key="index" :value="area">{{ area }}</option>
                </select>
            </div>

            <!-- <div class="select">
                <label>日期：</label>
                <select v-model="selectedTime">
                    <option value="" disabled style="color: #fff;">
                        <span>请选择日期</span>
                    </option>
                    <option v-for="(time, index) in filteredTimes" :key="index" :value="time">{{ time }}</option>
                </select>
            </div> -->
        </div>

        <div class="button-container">
            <div @click="onSubmit" class="energy-button conventional">确定</div>
            <div @click="onCancel" class="energy-button new">重置</div>
        </div>
    </div>
</template>

<script>
import util from '@/utils/request.js';
export default {
    data() {
        return {
            provinces: [],
            times: ["2023/8/24",],
            areas: {},
            // 地图调转数据
            left5Data: [
                {
                    name: '江西省',
                    cityName: '抚州',
                    areaName: '抚州',
                    value: [116.34, 28],
                    value1: [116.34, 28],
                    value2: [116.36, 28.2],
                    value3: [116.38, 28.5],
                    value4: [116.40, 28.7],
                },
                {
                    name: '江西省',
                    cityName: '赣州',
                    areaName: '赣州',
                    value: [114.92, 25.85],
                    value1: [114.92, 25.85],
                    value2: [114.94, 25.87],
                    value3: [114.96, 25.89],
                    value4: [114.98, 25.95],
                },
                {
                    name: '江西省',
                    cityName: '南昌',
                    areaName: '南昌东',
                    value: [115.89, 28.68],
                    value1: [115.89, 28.68],
                    value2: [115.91, 28.70],
                    value3: [115.93, 28.73],
                    value4: [115.95, 28.77],
                },
                {
                    name: '湖北省',
                    cityName: '武汉市',
                    areaName: '武汉市',
                    value: [114.34375, 30.49989],
                    value1: [114.34375, 30.50989],
                    value2: [114.36375, 30.51989],
                    value3: [114.38375, 30.52989],
                    value4: [114.40378, 30.53989],
                },
                {
                    name: '河南省',
                    cityName: '洛阳市',
                    areaName: '洛阳市',
                    value: [112.34375, 34.39989],
                    value1: [112.34375, 33.30989],
                    value2: [112.36375, 33.31989],
                    value3: [112.28375, 33.32989],
                    value4: [112.30378, 33.33989],
                }
            ]
            ,
            selectedProvince: "",
            selectedArea: "",
            selectedTime: "",
            // 折线图数据
            flag: 2,
            // post初始化接收数据
            postData: {
                region: '河南省',
                district: '洛北济源',
                flag: 2,
            }
        };
    },
    computed: {
        filteredAreas() {
            // 根据所选省份筛选片区
            return this.areas[this.selectedProvince] || [];
        },
        filteredTimes() {
            // 这里可以根据所选省份和片区筛选时间
            // 实现筛选逻辑
            return this.times;
        }
    },
    created() {
        localStorage.setItem('area', JSON.stringify(this.postData))
        util.get('/api/get_region')
            .then((response) => {
                // console.log(response, '11111');
                this.processRegionData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        util.post('/api/get_elect_start', this.postData)
            .then(response => {

                // 处理POST请求的响应
                if (response && response.code === 200) {
                    // 请求成功的处理逻辑
                    // console.log('POST请求成功1', response);
                    this.computerAreaData(response);
                } else {
                    // 请求失败的处理逻辑
                    // console.error('POST请求失败', response);
                    this.$message.error('服务器错误')
                }
            })
            .catch(error => {
                // 处理POST请求的错误
                console.error('POST请求错误', error);
            });

        util.post('/api/get_fracture_data', this.postData)
            .then(response => {
                // 处理POST请求的响应
                if (response && response.code === 200) {
                    // 请求成功的处理逻辑
                    // console.log('POST请求成功1222', response);
                    this.$bus.$emit('trueData1', response.data)
                } else {
                    // 请求失败的处理逻辑
                    // console.error('POST请求失败', response);
                    this.$message.error('服务器错误')
                }
            })
            .catch(error => {
                // 处理POST请求的错误
                // console.error('POST请求错误', error);
                this.$message.error('服务器错误', error)
            });

        // 初始化右边的数据
        util.post('/api/get_result_data', this.postData)
            .then(response => {
                // 处理POST请求的响应
                if (response && response.code === 200) {
                    // 请求成功的处理逻辑
                    this.computerRightData(response);
                } else {
                    this.$message.error('服务器错误')
                }
            })
            .catch(error => {
                this.$message.error('服务器错误', error)
            });

        // 默认选中河南省洛北济源
        this.selectedProvince = "河南省";
        this.selectedArea = "洛北济源";
    },
    methods: {
        // 接收后端传递过来的省份，区域数据
        processRegionData(data) {
            // 处理从API获取到的数据，将数据转换为适用于组件的格式
            const provinces = Array.from(new Set(data.map(item => item.region)));
            const areas = {};
            provinces.forEach(province => {
                areas[province] = data.filter(item => item.region === province).map(item => item.district);
            });

            // 更新组件的数据
            this.provinces = provinces;
            this.areas = areas;
        },
        // 接收各区域具体数据
        computerAreaData(data) {
            this.$bus.$emit('trueData', data)
            // console.log('具体区域数据', data);
        },
        // 接收右侧具体数据
        computerRightData(data) {
            this.$bus.$emit('rightData', data)
            // console.log('具体区域数据', data);
        },
        onProvinceChange() {
            // Reset片区 and时间选择
            this.selectedArea = "";
            this.selectedTime = "";
        },
        onAreaChange() {
            // Reset时间选择
            this.selectedTime = "";
        },
        // 传递数据出去
        onSubmit() {
            // 根据 selectedArea 进行筛选
            // const filteredData = this.left5Data.filter(item => item.name === this.selectedProvince);
            // console.log(filteredData, 111);

            // 地图跳转
            // this.$bus.$emit('left5Data', filteredData);

            // 传递省份，区域给index.vue
            this.$bus.$emit('allData2', { selectedProvince: this.selectedProvince, selectedArea: this.selectedArea })

            // 重置选择
            // this.selectedProvince = "";
            // this.selectedArea = "";
            // this.selectedTime = "";

            // 构建需要发送的数据
            const postData = {
                region: this.selectedProvince,
                district: this.selectedArea,
                flag: this.flag,
            };
            localStorage.setItem('area', JSON.stringify(postData))
            if (this.selectedProvince) {
                // 发起POST请求
                util.post('/api/get_elect_start', postData)
                    .then(response => {
                        // 处理POST请求的响应
                        if (response && response.code === 200) {
                            // 请求成功的处理逻辑
                            //console.log('POST请求成功11111', response);
                            this.computerAreaData(response);
                        } else {
                            // 请求失败的处理逻辑
                            this.$message.error('服务器错误')
                        }
                    })
                    .catch(error => {
                        // 处理POST请求的错误
                        console.error('POST请求错误', error);
                    });
                // 
                // 右侧结果数据
                util.post('/api/get_result_data', postData)
                    .then(response => {
                        // 处理POST请求的响应
                        if (response && response.code === 200) {
                            // 请求成功的处理逻辑
                            this.$bus.$emit('rightData', response.data)
                        } else {
                            // 请求失败的处理逻辑
                            this.$message.error('服务器错误')
                        }
                    })
                    .catch(error => {
                        // 处理POST请求的错误
                        console.error('POST请求错误', error);
                    });
                // 右侧储能结果
                util.post('/api/get_take_quantity', postData)
                    .then(response => {
                        // 处理POST请求的响应
                        if (response && response.code === 200) {
                            // 请求成功的处理逻辑
                            // console.log('POST请求成功lm333', response);
                            this.$bus.$emit('threeData', response.data)
                        } else {
                            // 请求失败的处理逻辑
                            this.$message.error('服务器错误')
                        }
                    })
                    .catch(error => {
                        // 处理POST请求的错误
                        this.$message.error('服务器错误', error)
                    });

            }

        },
        onCancel() {
            // 在取消时重置选择
            this.selectedProvince = "";
            this.selectedArea = "";
            this.selectedTime = "";
            // 传递省份，区域给index.vue
            this.$bus.$emit('allData2', { selectedProvince: this.selectedProvince, selectedArea: this.selectedArea })
        },

    },
    mounted() {
        this.$bus.$on("flagData", (data) => {
            // console.log('flag数据', data);
            this.flag = data;
        })
    },
};
</script>


<style lang="scss" scoped>
.gis-selection {
    display: flex;
    flex-direction: column;
    font-size: 2.2vh;

    .date-selection {
        display: flex;
        flex-direction: column;
    }

    .button-container {
        display: flex;
        flex-direction: row;
        margin-left: 0.29vw;

        .energy-button {
            padding: 0.1vh 0.2vh;
            margin-top: 0.3vh;
            margin-left: 0.2vh;
            border-radius: 0.4vh;
            font-size: 2vh;
            cursor: pointer;
            text-align: center;
            font-weight: bold;
            width: 40.5%;
            color: rgb(55, 209, 259);
            transition: background-color 0.3s;

            &.conventional {
                margin-left: 4.3rem;
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
}

.select {
    margin: 1.2vh;

    label {
        font-weight: bold;
        color: rgb(55, 209, 259);
        // margin-right: 10px;
    }

    select {
        background-color: rgb(7, 39, 87);
        width: 86%;
        height: 4vh;
        font-weight: bold;
        color: #fff;
    }

}
</style>