<template>
  <el-table :data="tableData" height="20vw" :header-cell-style="{ background: 'rgba(0,25,47,0.7)', color: '#fff' }"
    style="width: 100%">
    <!-- <div v-if="type == 1"> -->
    <el-table-column prop="date" align="center" label="时间" width="100">
    </el-table-column>
    <el-table-column align="center" label="河南">
      <el-table-column v-if="tagtype == 1" prop="hnaddress" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="80" prop="hnjxzip" v-if="tagtype == 1" align="center" label="当前负荷">
      </el-table-column>
      <el-table-column v-if="tagtype == 2" prop="hnaddress2" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="" v-if="tagtype == 2" prop="hnjxzip1" align="center" label="当前负荷用电量">
      </el-table-column>
    </el-table-column>
    <el-table-column align="center" label="江西">
      <el-table-column v-if="tagtype == 1" prop="jxaddress" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="80" prop="jxjxzip" v-if="tagtype == 1" align="center" label="当前负荷">
      </el-table-column>
      <el-table-column v-if="tagtype == 2" prop="jxaddress2" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="" v-if="tagtype == 2" prop="jxjxzip1" align="center" label="当前负荷用电量">
      </el-table-column>
    </el-table-column>
    <el-table-column align="center" label="湖北">
      <el-table-column v-if="tagtype == 1" prop="hbaddress" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="80" prop="hbjxzip" v-if="tagtype == 1" align="center" label="当前负荷">
      </el-table-column>
      <el-table-column v-if="tagtype == 2" prop="hbaddress2" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="" v-if="tagtype == 2" prop="hbjxzip1" align="center" label="当前负荷用电量">
      </el-table-column>
    </el-table-column>
    <el-table-column align="center" label="湖南">
      <el-table-column v-if="tagtype == 1" prop="hn1address" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="80" prop="hn1jxzip" v-if="tagtype == 1" align="center" label="当前负荷">
      </el-table-column>
      <el-table-column v-if="tagtype == 2" prop="hn1address2" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="" v-if="tagtype == 2" prop="hn1jxzip1" align="center" label="当前负荷用电量">
      </el-table-column>
    </el-table-column>
    <el-table-column align="center" label="全网">
      <el-table-column v-if="tagtype == 1" prop="alladdress" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="80" prop="alljxzip" v-if="tagtype == 1" align="center" label="当前负荷">
      </el-table-column>
      <el-table-column v-if="tagtype == 2" prop="alladdress2" align="center" label="供电能力提升量">
      </el-table-column>
      <el-table-column width="" v-if="tagtype == 2" prop="alljxzip1" align="center" label="当前负荷用电量">
      </el-table-column>
    </el-table-column>
    <!-- </div> -->
  </el-table>
</template>
  
<script>
export default {
  props: ['tableData', 'tagtype'],
  data() {
    return {
    }
  },
  created() {
    // console.log('tableData', this.tableData);
  },
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