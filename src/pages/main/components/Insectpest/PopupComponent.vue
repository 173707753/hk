<template>
    <div class="popup" ref="popup" @mouseleave="closePopup">
        <div style="text-align: center;font-size: 24px;font-weight: bold;color: #fff;">电源数据</div>
        <div v-if="tableData.length === 0" style="text-align: center; margin-top: 20%;color: #fff;font-size: 24px;">
            数据正在接收请稍后...
        </div>
        <el-table v-else :header-cell-style="{ background: 'rgba(0,25,47,0.7)', color: '#fff' }" :data="tableData"
            style="width: 100%;margin-top: 2%;" border max-height="400">
            <el-table-column prop="date" label="日期" align="center"
                v-if="tableData.some(item => item.date !== '')">2023/8/24</el-table-column>
            <el-table-column prop="time" label="时间" align="center"
                v-if="tableData.some(item => item.time !== '')"></el-table-column>
            <!-- <el-table-column prop="area" label="片区" align="center"
                v-if="tableData.some(item => item.area !== '')">洛北济源</el-table-column> -->
            <el-table-column prop="thermalPower" label="火电发电" align="center"
                v-if="tableData.some(item => item.thermalPower !== '')"></el-table-column>
            <el-table-column prop="hydroelectric" label="水电发电" align="center"
                v-if="tableData.some(item => item.hydroelectric !== '')"></el-table-column>
            <el-table-column prop="windPower" label="风电发电" align="center"
                v-if="tableData.some(item => item.windPower !== '')"></el-table-column>
            <el-table-column prop="photovoltaicPanel" label="光伏发电" align="center"
                v-if="tableData.some(item => item.photovoltaicPanel !== '')"></el-table-column>
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
            // tableData: [
            //     { time: ' 0:00', area: '洛北济源', thermalPower: 2678, hydroelectric: 243, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 0:15', area: '洛北济源', thermalPower: 2677, hydroelectric: 541, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 0:30', area: '洛北济源', thermalPower: 2657, hydroelectric: 314, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 0:45', area: '洛北济源', thermalPower: 2679, hydroelectric: 380, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 1:00', area: '洛北济源', thermalPower: 2500, hydroelectric: 73, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 1:15', area: '洛北济源', thermalPower: 2269, hydroelectric: 891, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 1:30', area: '洛北济源', thermalPower: 2271, hydroelectric: 1022, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 1:45', area: '洛北济源', thermalPower: 2385, hydroelectric: 396, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 2:00', area: '洛北济源', thermalPower: 2298, hydroelectric: 527, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 2:15', area: '洛北济源', thermalPower: 2221, hydroelectric: 407, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 2:30', area: '洛北济源', thermalPower: 2221, hydroelectric: 229, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 2:45', area: '洛北济源', thermalPower: 2152, hydroelectric: 75, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 3:00', area: '洛北济源', thermalPower: 2112, hydroelectric: 306, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 3:15', area: '洛北济源', thermalPower: 2113, hydroelectric: 532, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 3:30', area: '洛北济源', thermalPower: 2124, hydroelectric: 531, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 3:45', area: '洛北济源', thermalPower: 2169, hydroelectric: 738, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 4:00', area: '洛北济源', thermalPower: 2211, hydroelectric: 298, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 4:15', area: '洛北济源', thermalPower: 2149, hydroelectric: 247, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 4:30', area: '洛北济源', thermalPower: 1947, hydroelectric: 85, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 4:45', area: '洛北济源', thermalPower: 1938, hydroelectric: 83, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 5:00', area: '洛北济源', thermalPower: 1893, hydroelectric: 80, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 5:15', area: '洛北济源', thermalPower: 1951, hydroelectric: 391, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 5:30', area: '洛北济源', thermalPower: 1975, hydroelectric: 81, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 5:45', area: '洛北济源', thermalPower: 2023, hydroelectric: 534, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 6:00', area: '洛北济源', thermalPower: 2117, hydroelectric: 81, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 6:15', area: '洛北济源', thermalPower: 2189, hydroelectric: 830, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 6:30', area: '洛北济源', thermalPower: 2192, hydroelectric: 757, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 6:45', area: '洛北济源', thermalPower: 2211, hydroelectric: 827, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 7:00', area: '洛北济源', thermalPower: 2247, hydroelectric: 72, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 7:15', area: '洛北济源', thermalPower: 2080, hydroelectric: 592, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 7:30', area: '洛北济源', thermalPower: 2106, hydroelectric: 539, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 7:45', area: '洛北济源', thermalPower: 2132, hydroelectric: 80, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 8:00', area: '洛北济源', thermalPower: 2084, hydroelectric: 78, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 8:15', area: '洛北济源', thermalPower: 2017, hydroelectric: 303, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 8:30', area: '洛北济源', thermalPower: 1960, hydroelectric: 292, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 8:45', area: '洛北济源', thermalPower: 1927, hydroelectric: 62, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 9:00', area: '洛北济源', thermalPower: 1843, hydroelectric: 61, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 9:15', area: '洛北济源', thermalPower: 1722, hydroelectric: 61, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 9:30', area: '洛北济源', thermalPower: 1672, hydroelectric: 39, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 9:45', area: '洛北济源', thermalPower: 1627, hydroelectric: 37, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 10:00', area: '洛北济源', thermalPower: 1627, hydroelectric: 39, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 10:15', area: '洛北济源', thermalPower: 1623, hydroelectric: 37, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 10:30', area: '洛北济源', thermalPower: 1622, hydroelectric: 38, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 10:45', area: '洛北济源', thermalPower: 1621, hydroelectric: 41, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 11:00', area: '洛北济源', thermalPower: 1614, hydroelectric: 186, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 11:15', area: '洛北济源', thermalPower: 1625, hydroelectric: 533, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 11:30', area: '洛北济源', thermalPower: 1613, hydroelectric: 531, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 11:45', area: '洛北济源', thermalPower: 1621, hydroelectric: 88, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 12:00', area: '洛北济源', thermalPower: 1605, hydroelectric: 61, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 12:15', area: '洛北济源', thermalPower: 1606, hydroelectric: 65, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 12:30', area: '洛北济源', thermalPower: 1621, hydroelectric: 63, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 12:45', area: '洛北济源', thermalPower: 1603, hydroelectric: 62, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 13:00', area: '洛北济源', thermalPower: 1624, hydroelectric: 42, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 13:15', area: '洛北济源', thermalPower: 1608, hydroelectric: 44, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 13:30', area: '洛北济源', thermalPower: 1622, hydroelectric: 43, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 13:45', area: '洛北济源', thermalPower: 1631, hydroelectric: 43, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 14:00', area: '洛北济源', thermalPower: 1630, hydroelectric: 42, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 14:15', area: '洛北济源', thermalPower: 1615, hydroelectric: 43, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 14:30', area: '洛北济源', thermalPower: 1627, hydroelectric: 203, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 14:45', area: '洛北济源', thermalPower: 1624, hydroelectric: 940, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 15:00', area: '洛北济源', thermalPower: 1627, hydroelectric: 543, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 15:15', area: '洛北济源', thermalPower: 1684, hydroelectric: 393, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 15:30', area: '洛北济源', thermalPower: 1719, hydroelectric: 543, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 15:45', area: '洛北济源', thermalPower: 1721, hydroelectric: 912, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 16:00', area: '洛北济源', thermalPower: 1808, hydroelectric: 809, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 16:15', area: '洛北济源', thermalPower: 1880, hydroelectric: 913, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 16:30', area: '洛北济源', thermalPower: 2016, hydroelectric: 917, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 16:45', area: '洛北济源', thermalPower: 2242, hydroelectric: 803, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 17:00', area: '洛北济源', thermalPower: 2418, hydroelectric: 1255, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 17:15', area: '洛北济源', thermalPower: 2600, hydroelectric: 1011, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 17:30', area: '洛北济源', thermalPower: 2811, hydroelectric: 351, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 17:45', area: '洛北济源', thermalPower: 3000, hydroelectric: 496, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 18:00', area: '洛北济源', thermalPower: 3258, hydroelectric: 40, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 18:15', area: '洛北济源', thermalPower: 3420, hydroelectric: 375, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 18:30', area: '洛北济源', thermalPower: 3574, hydroelectric: 567, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 18:45', area: '洛北济源', thermalPower: 3606, hydroelectric: 58, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 19:00', area: '洛北济源', thermalPower: 3528, hydroelectric: 49, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 19:15', area: '洛北济源', thermalPower: 3379, hydroelectric: 271, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 19:30', area: '洛北济源', thermalPower: 3473, hydroelectric: 206, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 19:45', area: '洛北济源', thermalPower: 3512, hydroelectric: 353, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 20:00', area: '洛北济源', thermalPower: 3538, hydroelectric: 311, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 20:15', area: '洛北济源', thermalPower: 3542, hydroelectric: 39, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 20:30', area: '洛北济源', thermalPower: 3501, hydroelectric: 518, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 20:45', area: '洛北济源', thermalPower: 3631, hydroelectric: 280, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 21:00', area: '洛北济源', thermalPower: 3730, hydroelectric: 323, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 21:15', area: '洛北济源', thermalPower: 3790, hydroelectric: 96, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 21:30', area: '洛北济源', thermalPower: 3720, hydroelectric: 772, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 21:45', area: '洛北济源', thermalPower: 3677, hydroelectric: 622, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 22:00', area: '洛北济源', thermalPower: 3646, hydroelectric: 512, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 22:15', area: '洛北济源', thermalPower: 3595, hydroelectric: 369, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 22:30', area: '洛北济源', thermalPower: 3472, hydroelectric: 468, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 22:45', area: '洛北济源', thermalPower: 3509, hydroelectric: 697, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 23:00', area: '洛北济源', thermalPower: 3393, hydroelectric: 69, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 23:15', area: '洛北济源', thermalPower: 3394, hydroelectric: 1034, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 23:30', area: '洛北济源', thermalPower: 3412, hydroelectric: 1051, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' },
            //     { time: ' 23:45', area: '洛北济源', thermalPower: 3162, hydroelectric: 1024, pumpedStorage: 0, windPower: '', photovoltaicPanel: '' }
            // ],
            tableData: [
            ],
            time: [
                '0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45', '3:00', '3:15', '3:30', '3:45', '4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'
            ],
            alldata: [
                // // thermalPower 火电
                // {
                //     name: '火电发电',
                //     data: [2678, 2677, 2657, 2679, 2500, 2269, 2271, 2385, 2298, 2221, 2221, 2152, 2112, 2113, 2124, 2169, 2211, 2149, 1947, 1938, 1893, 1951, 1975, 2023, 2117, 2189, 2192, 2211, 2247, 2080, 2106, 2132, 2084, 2017, 1960, 1927, 1843, 1722, 1672, 1627, 1627, 1623, 1622, 1621, 1614, 1625, 1613, 1621, 1605, 1606, 1621, 1603, 1624, 1608, 1622, 1631, 1630, 1615, 1627, 1624, 1627, 1684, 1719, 1721, 1808, 1880, 2016, 2242, 2418, 2600, 2811, 3000, 3258, 3420, 3574, 3606, 3528, 3379, 3473, 3512, 3538, 3542, 3501, 3631, 3730, 3790, 3720, 3677, 3646, 3595, 3472, 3509, 3393, 3394, 3412, 3162],
                // },
                // // hydroelectric 水电
                // {
                //     name: '水电发电',
                //     data: [243, 541, 314, 380, 73, 891, 1022, 396, 527, 407, 229, 75, 306, 532, 531, 738, 298, 247, 85, 83, 80, 391, 81, 534, 81, 830, 757, 827, 72, 592, 539, 80, 78, 303, 292, 62, 61, 61, 39, 37, 39, 37, 38, 41, 186, 533, 531, 88, 61, 65, 63, 62, 42, 44, 43, 43, 42, 43, 203, 940, 543, 393, 543, 912, 809, 913, 917, 803, 1255, 1011, 351, 496, 40, 375, 567, 58, 49, 271, 206, 353, 311, 39, 518, 280, 323, 96, 772, 622, 512, 369, 468, 697, 69, 1034, 1051, 1024],
                // },
                // // windPower 风电
                // {
                //     name: '风电发电',
                //     data: [24, 35, 54, 115, 134, 135, 101, 71, 38, 14, 5, 4, 4, 3, 0, 3, 4, 5, 9, 6, 7, 11, 19, 19, 23, 20, 11, 10, 16, 18, 26, 26, 28, 23, 19, 11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 7, 16, 18, 20, 20, 39, 61, 86, 95, 96, 100, 87, 73, 75, 69, 63, 69]
                // },
                // // photovoltaicPanel 光伏
                // {
                //     name: '光伏发电',
                //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 7, 14, 25, 40, 59, 77, 98, 93, 118, 151, 158, 177, 175, 179, 230, 265, 262, 255, 274, 227, 308, 270, 290, 344, 355, 329, 354, 343, 330, 312, 322, 322, 335, 356, 326, 327, 312, 293, 258, 236, 209, 187, 164, 133, 109, 87, 67, 46, 31, 22, 14, 11, 9, 9, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                // }
            ]
            // // 当前页数
            // currentPage: 1,
            // // 每页条数
            // pageSize: 8,
        };
    },
    created() {
        this.updatedTable();
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
        updatedTable() {
            for (let i = 0; i < this.time.length; i++) {
                this.tableData.push({
                    time: this.time[i],
                    area: '洛北济源',  // 你的地区信息
                    thermalPower: this.alldata[0].data[i],
                    hydroelectric: this.alldata[1].data[i],
                    windPower: this.alldata[2].data[i],
                    photovoltaicPanel: this.alldata[3].data[i],  // 你的光伏发电信息
                });
            }
        },
    },
    mounted() {
        this.$bus.$on('tableData', (data) => {
            this.alldata[0] = data[0];
            this.alldata[1] = data[1];
            this.alldata[2] = data[2];
            this.alldata[3] = data[3];
            // console.log(this.alldata, '我是表格数据');
            this.updatedTable();
            // console.log(this.tableData, '我是更新后表格数据');
        })
    },
    beforeDestroy() {
        this.$bus.$off('tableData')
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



