<template>
  <div class="contain">
    <div class="setting-config">
      <el-form :inline="true" :model="configForm" class="demo-form-inline">
        <el-form-item label="用户id">
          <el-input v-model="configForm.id" placeholder="用户id"></el-input>
        </el-form-item>
        <el-form-item label="时间段">
          <el-select v-model="configForm.timeRange" placeholder="月">
            <el-option label="日" value="dsummary"></el-option>
            <el-option label="月" value="msummary"></el-option>
            <el-option label="年" value="ysummary"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="profitList"
      style="width: 700px"
      height="50px"
      class="profit-table"
      border
    >
      <el-table-column
        prop="userName"
        label="用户姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userLevel"
        label="用户等级">
      </el-table-column>
      <el-table-column
        prop="goodsNum"
        label="出货量">
      </el-table-column>
      <el-table-column
        prop="sumPrice"
        label="总交易金额(￥)">
      </el-table-column>
      <el-table-column
        prop="profit"
        label="具体商品详情">
        <template slot-scope="scope">
          <el-button @click="showGoods(scope.$index)" type="text" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="profit-bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        @prev-click="goPage(currentPage - 1)"
        @next-click="goPage(currentPage + 1)"
        :current-page.sync="currentPage"
        :page-size="7"
        layout="prev, pager, next, jumper"
        :total="profitCount">
      </el-pagination>
    </div>
    <el-dialog width="25%" title="商品列表" :visible.sync="goodsVisible">
      <el-table :data="selectGoods" border>
        <el-table-column property="name" label="商品名" width="150"></el-table-column>
        <el-table-column property="num" label="数量" width="150"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  async created () {
    await this.goPage(this.currentPage)
  },
  computed: {
    ...mapGetters(['profitList', 'profitCount'])
  },
  data () {
    return {
      configForm: {
        id: '',
        timeRange: 'msummary'
      },
      currentPage: 1,
      goodsVisible: false,
      selectGoods: []
    }
  },
  methods: {
    ...mapActions(['getProfitList']),
    async handleCurrentChange (val) {
      await this.goPage(val)
    },
    async goPage (page) {
      await this.getProfitList({
        page,
        limit: 7,
        urlType: 'msummary',
        conditions: {},
        sort: {createAt: -1}
      })
    },
    async search () {
      console.log(123123)
      let conditions = {}
      if (this.configForm.id) {
        conditions.user = this.configForm.id
      }
      let result = await this.getProfitList({
        page: 1,
        limit: 7,
        conditions,
        urlType: this.configForm.timeRange,
        sort: {createAt: -1}
      })
      if (result.data.code !== 200) {
        return this.$message({
          showClose: true,
          message: '查询信息有误',
          type: 'warning'
        })
      }
    },
    showGoods (index) {
      this.goodsVisible = true
      this.selectGoods = this.profitList[index].goods
    }
  }
}
</script>
<style lang='less' scoped>
  .contain {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .setting-config {
      margin: 20px;
      height: 50px;
    }
    .profit-table {
      flex: 1;
      margin: 0 20px 10px 20px;
      height: 394px;
    }
    .profit-bottom {
      height: 50px;
      display: flex;
      align-items: center;
      margin-left: 20px;
      border-top: 1px solid #e3e3e3;
    }
  }
</style>
