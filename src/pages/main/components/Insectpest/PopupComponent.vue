<template>
    <div class="popup" ref="popup" @mouseleave="closePopup">
        <div style="text-align: center;font-size: 24px;font-weight: bold;color: #fff;">电源数据</div>
        <el-table :header-cell-style="{ background: 'rgba(0,25,47,0.7)', color: '#fff' }" :data="tableData"
            style="width: 100%;margin-top: 2%;" border max-height="400">
            <el-table-column prop="date" label="日期" align="center"
                v-if="tableData.some(item => item.date !== '')">2023/8/24</el-table-column>
            <el-table-column prop="time" label="时间" align="center"
                v-if="tableData.some(item => item.time !== '')"></el-table-column>
            <el-table-column prop="area" label="片区" align="center"
                v-if="tableData.some(item => item.area !== '')"></el-table-column>
            <el-table-column prop="thermalPower" label="火电发电" align="center"
                v-if="tableData.some(item => item.thermalPower !== '')"></el-table-column>
            <el-table-column prop="hydroelectric" label="水电发电" align="center"
                v-if="tableData.some(item => item.hydroelectric !== '')"></el-table-column>
            <!-- <el-table-column prop="pumpedStorage" label="抽蓄发电" align="center"
                v-if="tableData.some(item => item.pumpedStorage !== '')"></el-table-column> -->
        </el-table>
        <!-- 分页器 固定在底部 -->
        <!-- <el-pagination style=" position: absolute;bottom: 4px;left: 0;right: 0;" :current-page="currentPage"
            :page-sizes="[4, 6, 8]" :page-size="pageSize" :total="tableData.length"
            layout="total, sizes, prev, pager, next, jumper" @size-change="handlePageSizeChange"
            @current-change="handlePageChange">
        </el-pagination> -->
    </div>
</template>

<script>
export default {
    name: 'PopupComponent',
    data() {
        return {
            tableData: [
                { time: ' 0:00', area: '洛北济源', thermalPower: 2678, hydroelectric: 243, pumpedStorage: 0 },
                { time: ' 0:15', area: '洛北济源', thermalPower: 2677, hydroelectric: 541, pumpedStorage: 0 },
                { time: ' 0:30', area: '洛北济源', thermalPower: 2657, hydroelectric: 314, pumpedStorage: 0 },
                { time: ' 0:45', area: '洛北济源', thermalPower: 2679, hydroelectric: 380, pumpedStorage: 0 },
                { time: ' 1:00', area: '洛北济源', thermalPower: 2500, hydroelectric: 73, pumpedStorage: 0 },
                { time: ' 1:15', area: '洛北济源', thermalPower: 2269, hydroelectric: 891, pumpedStorage: 0 },
                { time: ' 1:30', area: '洛北济源', thermalPower: 2271, hydroelectric: 1022, pumpedStorage: 0 },
                { time: ' 1:45', area: '洛北济源', thermalPower: 2385, hydroelectric: 396, pumpedStorage: 0 },
                { time: ' 2:00', area: '洛北济源', thermalPower: 2298, hydroelectric: 527, pumpedStorage: 0 },
                { time: ' 2:15', area: '洛北济源', thermalPower: 2221, hydroelectric: 407, pumpedStorage: 0 },
                { time: ' 2:30', area: '洛北济源', thermalPower: 2221, hydroelectric: 229, pumpedStorage: 0 },
                { time: ' 2:45', area: '洛北济源', thermalPower: 2152, hydroelectric: 75, pumpedStorage: 0 },
                { time: ' 3:00', area: '洛北济源', thermalPower: 2112, hydroelectric: 306, pumpedStorage: 0 },
                { time: ' 3:15', area: '洛北济源', thermalPower: 2113, hydroelectric: 532, pumpedStorage: 0 },
                { time: ' 3:30', area: '洛北济源', thermalPower: 2124, hydroelectric: 531, pumpedStorage: 0 },
                { time: ' 3:45', area: '洛北济源', thermalPower: 2169, hydroelectric: 738, pumpedStorage: 0 },
                { time: ' 4:00', area: '洛北济源', thermalPower: 2211, hydroelectric: 298, pumpedStorage: 0 },
                { time: ' 4:15', area: '洛北济源', thermalPower: 2149, hydroelectric: 247, pumpedStorage: 0 },
                { time: ' 4:30', area: '洛北济源', thermalPower: 1947, hydroelectric: 85, pumpedStorage: 0 },
                { time: ' 4:45', area: '洛北济源', thermalPower: 1938, hydroelectric: 83, pumpedStorage: 0 },
                { time: ' 5:00', area: '洛北济源', thermalPower: 1893, hydroelectric: 80, pumpedStorage: 0 },
                { time: ' 5:15', area: '洛北济源', thermalPower: 1951, hydroelectric: 391, pumpedStorage: 0 },
                { time: ' 5:30', area: '洛北济源', thermalPower: 1975, hydroelectric: 81, pumpedStorage: 0 },
                { time: ' 5:45', area: '洛北济源', thermalPower: 2023, hydroelectric: 534, pumpedStorage: 0 },
                { time: ' 6:00', area: '洛北济源', thermalPower: 2117, hydroelectric: 81, pumpedStorage: 0 },
                { time: ' 6:15', area: '洛北济源', thermalPower: 2189, hydroelectric: 830, pumpedStorage: 0 },
                { time: ' 6:30', area: '洛北济源', thermalPower: 2192, hydroelectric: 757, pumpedStorage: 0 },
                { time: ' 6:45', area: '洛北济源', thermalPower: 2211, hydroelectric: 827, pumpedStorage: 0 },
                { time: ' 7:00', area: '洛北济源', thermalPower: 2247, hydroelectric: 72, pumpedStorage: 0 },
                { time: ' 7:15', area: '洛北济源', thermalPower: 2080, hydroelectric: 592, pumpedStorage: 0 },
                { time: ' 7:30', area: '洛北济源', thermalPower: 2106, hydroelectric: 539, pumpedStorage: 0 },
                { time: ' 7:45', area: '洛北济源', thermalPower: 2132, hydroelectric: 80, pumpedStorage: 0 },
                { time: ' 8:00', area: '洛北济源', thermalPower: 2084, hydroelectric: 78, pumpedStorage: 0 },
                { time: ' 8:15', area: '洛北济源', thermalPower: 2017, hydroelectric: 303, pumpedStorage: 0 },
                { time: ' 8:30', area: '洛北济源', thermalPower: 1960, hydroelectric: 292, pumpedStorage: 0 },
                { time: ' 8:45', area: '洛北济源', thermalPower: 1927, hydroelectric: 62, pumpedStorage: 0 },
                { time: ' 9:00', area: '洛北济源', thermalPower: 1843, hydroelectric: 61, pumpedStorage: 0 },
                { time: ' 9:15', area: '洛北济源', thermalPower: 1722, hydroelectric: 61, pumpedStorage: 0 },
                { time: ' 9:30', area: '洛北济源', thermalPower: 1672, hydroelectric: 39, pumpedStorage: 0 },
                { time: ' 9:45', area: '洛北济源', thermalPower: 1627, hydroelectric: 37, pumpedStorage: 0 },
                { time: ' 10:00', area: '洛北济源', thermalPower: 1627, hydroelectric: 39, pumpedStorage: 0 },
                { time: ' 10:15', area: '洛北济源', thermalPower: 1623, hydroelectric: 37, pumpedStorage: 0 },
                { time: ' 10:30', area: '洛北济源', thermalPower: 1622, hydroelectric: 38, pumpedStorage: 0 },
                { time: ' 10:45', area: '洛北济源', thermalPower: 1621, hydroelectric: 41, pumpedStorage: 0 },
                { time: ' 11:00', area: '洛北济源', thermalPower: 1614, hydroelectric: 186, pumpedStorage: 0 },
                { time: ' 11:15', area: '洛北济源', thermalPower: 1625, hydroelectric: 533, pumpedStorage: 0 },
                { time: ' 11:30', area: '洛北济源', thermalPower: 1613, hydroelectric: 531, pumpedStorage: 0 },
                { time: ' 11:45', area: '洛北济源', thermalPower: 1621, hydroelectric: 88, pumpedStorage: 0 },
                { time: ' 12:00', area: '洛北济源', thermalPower: 1605, hydroelectric: 61, pumpedStorage: 0 },
                { time: ' 12:15', area: '洛北济源', thermalPower: 1606, hydroelectric: 65, pumpedStorage: 0 },
                { time: ' 12:30', area: '洛北济源', thermalPower: 1621, hydroelectric: 63, pumpedStorage: 0 },
                { time: ' 12:45', area: '洛北济源', thermalPower: 1603, hydroelectric: 62, pumpedStorage: 0 },
                { time: ' 13:00', area: '洛北济源', thermalPower: 1624, hydroelectric: 42, pumpedStorage: 0 },
                { time: ' 13:15', area: '洛北济源', thermalPower: 1608, hydroelectric: 44, pumpedStorage: 0 },
                { time: ' 13:30', area: '洛北济源', thermalPower: 1622, hydroelectric: 43, pumpedStorage: 0 },
                { time: ' 13:45', area: '洛北济源', thermalPower: 1631, hydroelectric: 43, pumpedStorage: 0 },
                { time: ' 14:00', area: '洛北济源', thermalPower: 1630, hydroelectric: 42, pumpedStorage: 0 },
                { time: ' 14:15', area: '洛北济源', thermalPower: 1615, hydroelectric: 43, pumpedStorage: 0 },
                { time: ' 14:30', area: '洛北济源', thermalPower: 1627, hydroelectric: 203, pumpedStorage: 0 },
                { time: ' 14:45', area: '洛北济源', thermalPower: 1624, hydroelectric: 940, pumpedStorage: 0 },
                { time: ' 15:00', area: '洛北济源', thermalPower: 1627, hydroelectric: 543, pumpedStorage: 0 },
                { time: ' 15:15', area: '洛北济源', thermalPower: 1684, hydroelectric: 393, pumpedStorage: 0 },
                { time: ' 15:30', area: '洛北济源', thermalPower: 1719, hydroelectric: 543, pumpedStorage: 0 },
                { time: ' 15:45', area: '洛北济源', thermalPower: 1721, hydroelectric: 912, pumpedStorage: 0 },
                { time: ' 16:00', area: '洛北济源', thermalPower: 1808, hydroelectric: 809, pumpedStorage: 0 },
                { time: ' 16:15', area: '洛北济源', thermalPower: 1880, hydroelectric: 913, pumpedStorage: 0 },
                { time: ' 16:30', area: '洛北济源', thermalPower: 2016, hydroelectric: 917, pumpedStorage: 0 },
                { time: ' 16:45', area: '洛北济源', thermalPower: 2242, hydroelectric: 803, pumpedStorage: 0 },
                { time: ' 17:00', area: '洛北济源', thermalPower: 2418, hydroelectric: 1255, pumpedStorage: 0 },
                { time: ' 17:15', area: '洛北济源', thermalPower: 2600, hydroelectric: 1011, pumpedStorage: 0 },
                { time: ' 17:30', area: '洛北济源', thermalPower: 2811, hydroelectric: 351, pumpedStorage: 0 },
                { time: ' 17:45', area: '洛北济源', thermalPower: 3000, hydroelectric: 496, pumpedStorage: 0 },
                { time: ' 18:00', area: '洛北济源', thermalPower: 3258, hydroelectric: 40, pumpedStorage: 0 },
                { time: ' 18:15', area: '洛北济源', thermalPower: 3420, hydroelectric: 375, pumpedStorage: 0 },
                { time: ' 18:30', area: '洛北济源', thermalPower: 3574, hydroelectric: 567, pumpedStorage: 0 },
                { time: ' 18:45', area: '洛北济源', thermalPower: 3606, hydroelectric: 58, pumpedStorage: 0 },
                { time: ' 19:00', area: '洛北济源', thermalPower: 3528, hydroelectric: 49, pumpedStorage: 0 },
                { time: ' 19:15', area: '洛北济源', thermalPower: 3379, hydroelectric: 271, pumpedStorage: 0 },
                { time: ' 19:30', area: '洛北济源', thermalPower: 3473, hydroelectric: 206, pumpedStorage: 0 },
                { time: ' 19:45', area: '洛北济源', thermalPower: 3512, hydroelectric: 353, pumpedStorage: 0 },
                { time: ' 20:00', area: '洛北济源', thermalPower: 3538, hydroelectric: 311, pumpedStorage: 0 },
                { time: ' 20:15', area: '洛北济源', thermalPower: 3542, hydroelectric: 39, pumpedStorage: 0 },
                { time: ' 20:30', area: '洛北济源', thermalPower: 3501, hydroelectric: 518, pumpedStorage: 0 },
                { time: ' 20:45', area: '洛北济源', thermalPower: 3631, hydroelectric: 280, pumpedStorage: 0 },
                { time: ' 21:00', area: '洛北济源', thermalPower: 3730, hydroelectric: 323, pumpedStorage: 0 },
                { time: ' 21:15', area: '洛北济源', thermalPower: 3790, hydroelectric: 96, pumpedStorage: 0 },
                { time: ' 21:30', area: '洛北济源', thermalPower: 3720, hydroelectric: 772, pumpedStorage: 0 },
                { time: ' 21:45', area: '洛北济源', thermalPower: 3677, hydroelectric: 622, pumpedStorage: 0 },
                { time: ' 22:00', area: '洛北济源', thermalPower: 3646, hydroelectric: 512, pumpedStorage: 0 },
                { time: ' 22:15', area: '洛北济源', thermalPower: 3595, hydroelectric: 369, pumpedStorage: 0 },
                { time: ' 22:30', area: '洛北济源', thermalPower: 3472, hydroelectric: 468, pumpedStorage: 0 },
                { time: ' 22:45', area: '洛北济源', thermalPower: 3509, hydroelectric: 697, pumpedStorage: 0 },
                { time: ' 23:00', area: '洛北济源', thermalPower: 3393, hydroelectric: 69, pumpedStorage: 0 },
                { time: ' 23:15', area: '洛北济源', thermalPower: 3394, hydroelectric: 1034, pumpedStorage: 0 },
                { time: ' 23:30', area: '洛北济源', thermalPower: 3412, hydroelectric: 1051, pumpedStorage: 0 },
                { time: ' 23:45', area: '洛北济源', thermalPower: 3162, hydroelectric: 1024, pumpedStorage: 0 }
            ],
            // // 当前页数
            // currentPage: 1,
            // // 每页条数
            // pageSize: 8,
        };
    },
    methods: {
        // //计算当前页
        // handlePageChange(newPage) {
        //     this.currentPage = newPage;
        // },
        // //每页多少条数据
        // handlePageSizeChange(newSize) {
        //     this.pageSize = newSize;
        //     this.currentPage = 1;
        // },
        closePopup() {
            this.$emit('close-popup'); // 发送关闭弹窗事件
        },
    }
};
</script>

<style lang="scss" scoped>
.popup {
    position: absolute;
    top: 13.5%;
    left: 28.94%;
    width: 39.9%;
    height: 50%;
    border: 3px solid #4187B3;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    padding: 20px;
    z-index: 9999;
    border-radius: 6px;
    background-color: rgba(0, 25, 47, 0.7);

    /deep/.el-table tr {
        background-color: rgba(0, 25, 47, 0.7);
    }

    /deep/ .el-table,
    .el-table__expanded-cell {
        background-color: rgba(0, 0, 0, 0);
        color: #fff;
    }

    /deep/.el-table thead {
        background-color: rgba(0, 25, 47, 0.7);
    }

    /deep/.el-table tbody tr:hover>td {
        background-color: rgba(67, 145, 228, 0.2);
    }

    /deep/.el-table--scrollable-y .el-table__body-wrapper:-webkit-scrollbar {
        /*隐藏滚轮*/
        display: none;
    }

    /deep/.el-table--border,
    .el-table--group {
        border-color: 4187B3;
    }

    ::v-deep .el-table--scrollable-x .el-table__body-wrapper {
        // overflow-x: hidden;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 8px;
        background-color: rgba(32, 86, 131, 0.3);
    }

    //里面滑块
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 2px rgba(0, 0, 0, .3);
        -webkit-box-shadow: inset 0 0 wpx rgba(0, 0, 0, .3);
        background-color: #205683;
        border-radius: 3px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.2);
    }

    /deep/.el-table--border th.el-table__cell.gutter:last-of-type {
        display: none;
    }
}
</style>



