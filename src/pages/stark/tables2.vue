<template>
    <el-table :data="tableData" height="20vw" :header-cell-style="{ background: 'rgba(0,25,47,0.7)', color: '#fff' }"
        style="width: 100%">
        <!-- <div v-if="type == 1"> -->
        <el-table-column prop="times" label="时间" width="100"></el-table-column>
        <el-table-column prop="name" v-if="tagtype == 1" label="水电消纳" width="100"></el-table-column>
        <el-table-column prop="name" v-if="tagtype == 2" label="新能源消纳" width="100"></el-table-column>
        <el-table-column label="电力" style="text-align: center;">
            <el-table-column prop="powered" label="已消纳">
            </el-table-column>
            <el-table-column prop="powering" label="可再消纳">
            </el-table-column>
        </el-table-column>
        <el-table-column label="电量">
            <el-table-column prop="electriced" label="已消纳">
            </el-table-column>
            <el-table-column prop="electricing" label="可再消纳">
            </el-table-column>
        </el-table-column>
    </el-table>
</template>
  
<script>
export default {
    props: ['tableData', 'tagtype'],
    data() {
        return {
        }
    }
}
</script>

<style >
.el-table {
    background-color: rgba(0, 0, 0, 0);
}

.el-table tr {
    background-color: rgba(0, 25, 47, 0.7);
}

.el-table,
.el-table__expanded-cell {
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
}

.el-table thead {
    background-color: rgba(0, 25, 47, 0.7);
}

.el-table tbody tr:hover>td {
    background-color: rgba(67, 145, 228, 0.2);
}

.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
    background-color: rgba(67, 145, 228, 0.2);
}

.el-table--scrollable-y .el-table__body-wrapper:-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}

.el-table--border,
.el-table--group {
    border-color: 4187B3;
}


::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background-color: rgba(32, 86, 131, 0.3);
}

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

.el-table--border th.el-table__cell.gutter:last-of-type {
    display: none;
}
</style>