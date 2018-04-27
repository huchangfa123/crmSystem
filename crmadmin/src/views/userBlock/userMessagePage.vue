<template>
  <div class="contain">
    <el-table
      :data="tableData"
      style="width: 500px"
    >
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="profit"
        label="个人盈利">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        name: '王小虎',
        level: '黄金等级',
        createdAt: '2018-2-21',
        profit: '2131'
      }]
    }
  }
}
</script>
<style lang='less' scoped>
  .contain {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
</style>
