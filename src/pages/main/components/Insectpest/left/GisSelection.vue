<template>
    <div class="gis-selection">
        <div class="date-selection" style="text-align: center;">
            <div class="select">
                <label>单位:</label>
                <select v-model="selectedProvince" @change="onProvinceChange">
                    <option value="" disabled>
                        <span>请选择单位</span>
                    </option>
                    <option v-for="(province, index) in provinces" :key="index" :value="province">{{ province }}</option>
                </select>
            </div>

            <div class="select">
                <label>片区:</label>
                <select v-model="selectedArea" @change="onAreaChange">
                    <option value="" disabled>
                        <span>请选择片区</span>
                    </option>
                    <option v-for="(area, index) in filteredAreas" :key="index" :value="area">{{ area }}</option>
                </select>
            </div>

            <div class="select">
                <label>日期:</label>
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
            provinces: ["河南省", "江西省"],
            times: ["2023/8/24",],
            areas: {
                // 以省份为 key 的片区数据
                河南省: ["安鹤", "官渡南怀德", "惠济官渡北", '开商', '洛北济源', '洛阳南', '漯河', '南阳', '平顶山北区', '平顶山南区',
                    '濮阳', '三门峡新安', '新乡', '信阳', '许昌', '郑州西南', '周口', '驻马店',],
                江西省: ["北部", "东部", "抚州", "赣州", "南昌东", "西南部"],
            },
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
            // 处理提交选定的数据
            // 您可以使用 this.selectedProvince、this.selectedArea 和 this.selectedTime 来访问选定的值
            // 在这里执行必要的操作，如向服务器发送请求或更新状态。

            // 将选定的数据存储在数组中
            const submittedData = [
                this.selectedProvince,
                this.selectedArea,
                this.selectedTime
            ];

            console.log("提交的数据:");
            console.log(submittedData);

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

    .energy-button {
        padding: 1px 2px;
        margin-left: 180px;
        margin-top: 3px;
        border-radius: 3px;
        font-size: 18px;
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        width: 200px;
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

.select {
    margin: 10px;

    label {
        font-weight: bold;
        color: rgb(55, 209, 259);
    }

    select {
        background-color: rgb(7, 39, 87);
        width: 300px;
        height: 34px;
        font-weight: bold;
        color: #fff;
    }

}
</style>
