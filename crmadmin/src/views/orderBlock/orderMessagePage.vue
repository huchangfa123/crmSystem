<template>
  <div class="contain">
    <div class="setting-config">
      <el-form :inline="true" :model="configForm" class="demo-form-inline">
        <el-form-item label="订单状态">
          <el-select v-model="configForm.state" placeholder="无限制">
            <el-option label="无限制" value="-1"></el-option>
            <el-option label="待接单" value="1"></el-option>
            <el-option label="已接单" value="2"></el-option>
            <el-option label="已拒绝" value="3"></el-option>
            <el-option label="已出货" value="4"></el-option>
            <el-option label="交易已确定" value="5"></el-option>
            <el-option label="正在申请取消" value="6"></el-option>
            <el-option label="已取消" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="orderList"
      style="width: 1000px"
      height="50px"
      class="order-table"
      border
    >
      <el-table-column
        prop="fromUserName"
        label="下单者"
        width="120">
      </el-table-column>
      <el-table-column
        prop="fromUserLevel"
        label="下单者等级">
      </el-table-column>
      <el-table-column
        prop="toUserName"
        label="接单者"
        min-width="140px"
      >
      </el-table-column>
      <el-table-column
        prop="toUserLevel"
        label="接单者等级">
      </el-table-column>
      <el-table-column
        prop="sumPrice"
        label="订单总额">
      </el-table-column>
      <el-table-column
        prop="state"
        label="订单状态">
      </el-table-column>
      <el-table-column
        min-width="120px"
        prop="createAt"
        label="创建时间">
      </el-table-column>
      <el-table-column align="center" label="收款截图">
        <template slot-scope="scope">
          <el-button @click="showPhoto(scope.$index)" type="text" size="mini">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品列表">
        <template slot-scope="scope">
          <el-button @click="showGoods(scope.$index)" type="text" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="order-bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        @prev-click="goPage(currentPage - 1)"
        @next-click="goPage(currentPage + 1)"
        :current-page.sync="currentPage"
        :page-size="7"
        layout="prev, pager, next, jumper"
        :total="orderCount">
      </el-pagination>
    </div>
    <el-dialog :center="true" title="付款截图" :visible.sync="showPhotoVisible" class="dialog">
      <img class="pay-pic" :src="srcUrl" >
    </el-dialog>
    <el-dialog title="商品列表" :visible.sync="showGoodsVisible">
      <el-table :data="selectGoods" border>
        <el-table-column property="name" label="商品名" width="150"></el-table-column>
        <el-table-column property="price" label="单价" width="200"></el-table-column>
        <el-table-column property="num" label="数量"></el-table-column>
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
    ...mapGetters(['orderList', 'orderCount'])
  },
  data () {
    return {
      configForm: {
        state: ''
      },
      currentPage: 1,
      srcUrl: '',
      selectGoods: [],
      showPhotoVisible: false,
      showGoodsVisible: false
    }
  },
  methods: {
    ...mapActions(['getOrderList']),
    async handleCurrentChange (val) {
      await this.goPage(val)
    },
    async goPage (page) {
      await this.getOrderList({
        page,
        limit: 7,
        conditions: {},
        sort: {createAt: -1}
      })
    },
    async search () {
      let conditions = {}
      if (this.configForm.state && this.configForm.state !== '-1') {
        conditions.state = parseInt(this.configForm.state)
      }
      let result = await this.getOrderList({
        page: 1,
        limit: 7,
        conditions,
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
    showPhoto (index) {
      this.srcUrl = this.orderList[index].screenshots
      this.showPhotoVisible = true
    },
    showGoods (index) {
      this.selectGoods = this.orderList[index].goods
      this.showGoodsVisible = true
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
    .order-table {
      flex: 1;
      margin: 0 20px 10px 20px;
      height: 394px;
    }
    .order-bottom {
      height: 50px;
      display: flex;
      align-items: center;
      margin-left: 20px;
      border-top: 1px solid #e3e3e3;
    }
    .pay-pic {
      width: 300px;
      height: 300px;
    }
  }
</style>
