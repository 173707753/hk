<template>
    <div class="gis-selection">
        <div class="date-selection">
            <div class="select">
                <label>单位：</label>
                <select v-model="selectedProvince" @change="onProvinceChange">
                    <option value="" disabled>
                        <span>请选择单位</span>
                    </option>
                    <option v-for="(province, index) in provinces" :key="index" :value="province">{{ province }}</option>
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

            <div class="select">
                <label>日期：</label>
                <select v-model="selectedTime">
                    <option value="" disabled style="color: #fff;">
                        <span>请选择日期</span>
                    </option>
                    <option v-for="(time, index) in filteredTimes" :key="index" :value="time">{{ time }}</option>
                </select>
            </div>
        </div>

        <div class="button-container">
            <div @click="onSubmit" class="energy-button conventional">确定</div>
            <div @click="onCancel" class="energy-button new">重置</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            provinces: ["河南省", "江西省", "湖北省"],
            times: ["2023/8/24",],
            areas: {
                湖北省: ["武汉市"],
                // 以省份为 key 的片区数据
                河南省: ["安鹤", "官渡南怀德", "惠济官渡北", '开商', '洛北济源', '洛阳南', '漯河', '南阳', '平顶山北区', '平顶山南区',
                    '濮阳', '三门峡新安', '新乡', '信阳', '许昌', '郑州西南', '周口', '驻马店',],
                江西省: ["北部", "东部", "抚州", "赣州", "南昌东", "西南部", "中部"],
            },
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
                }
            ]
            ,
            selectedProvince: "",
            selectedArea: "",
            selectedTime: ""
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
    methods: {
        onProvinceChange() {
            // Reset片区 and时间选择
            this.selectedArea = "";
            this.selectedTime = "";
        },
        onAreaChange() {
            // Reset时间选择
            this.selectedTime = "";
        },
        onSubmit() {
            // 根据 selectedArea 进行筛选
            const filteredData = this.left5Data.filter(item => item.areaName === this.selectedArea);
            console.log(filteredData);
            // 触发事件，将筛选后的数据发送给全局事件总线
            this.$bus.$emit('left5Data', filteredData);

            // 重置选择
            this.selectedProvince = "";
            this.selectedArea = "";
            this.selectedTime = "";
        },
        onCancel() {
            // 在取消时重置选择
            this.selectedProvince = "";
            this.selectedArea = "";
            this.selectedTime = "";
        }
    }
};
</script>

<style lang="scss" scoped>
.gis-selection {
    display: flex;
    flex-direction: column;
    font-size: 20px;

    .date-selection {
        display: flex;
        flex-direction: column;
    }

    .button-container {
        display: flex;
        flex-direction: row;

        .energy-button {
            padding: 1px 2px;
            margin-top: 3px;
            margin-left: 2px;
            border-radius: 3px;
            font-size: 18px;
            cursor: pointer;
            text-align: center;
            font-weight: bold;
            width: 40.5%;
            color: rgb(55, 209, 259);
            transition: background-color 0.3s;

            &.conventional {
                margin-left: 13%;
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
    margin: 10px;

    label {
        font-weight: bold;
        color: rgb(55, 209, 259);
    }

    select {
        background-color: rgb(7, 39, 87);
        width: 86%;
        height: 34px;
        font-weight: bold;
        color: #fff;
    }

}
</style>