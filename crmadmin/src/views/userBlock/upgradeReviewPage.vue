<template>
  <div class="contain">
    <div class="setting-config">
      <el-form :inline="true" :model="configForm" class="demo-form-inline">
        <!-- <el-form-item label="申请用户">
          <el-input v-model="configForm.applyUserName" placeholder="真实姓名"></el-input>
        </el-form-item> -->
        <el-form-item label="审核状态">
          <el-select v-model="configForm.deel" placeholder="无限制">
            <el-option label="无限制" value="-1"></el-option>
            <el-option label="待处理" value="1"></el-option>
            <el-option label="已批准" value="2"></el-option>
            <el-option label="已拒绝" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="reviewList"
      style="width: 850px"
      height="50px"
      class="user-table"
      border
    >
      <el-table-column
        prop="applyUserName"
        label="真实姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="applyUserLevel"
        label="等级">
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="申请时间"
        min-width="140px"
      >
      </el-table-column>
      <el-table-column
        prop="applyLevel"
        label="申请等级"
        min-width="100"
      >
      </el-table-column>
      <el-table-column align="center" label="收款截图">
        <template slot-scope="scope">
          <el-button @click="showPhoto(scope.$index)" type="text" size="mini">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="处理状态">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button :disabled="parseInt(reviewList[scope.$index].deel)!== 1" @click="editState(scope.$index, 2)" type="text" size="mini">批准升级</el-button>
          <el-button :disabled="parseInt(reviewList[scope.$index].deel)!== 1" @click="editState(scope.$index, 3)" type="text" size="mini">拒绝升级</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="user-bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        @prev-click="goPage(currentPage - 1)"
        @next-click="goPage(currentPage + 1)"
        :current-page.sync="currentPage"
        :page-size="7"
        layout="prev, pager, next, jumper"
        :total="reviewCount">
      </el-pagination>
    </div>
    <el-dialog :center="true" title="付款截图" :visible.sync="showPhotoVisible" class="dialog">
      <img class="pay-pic" :src="srcUrl" >
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
    ...mapGetters(['reviewList', 'reviewCount'])
  },
  data () {
    return {
      configForm: {
        applyUserName: '',
        deel: ''
      },
      currentPage: 1,
      showPhotoVisible: false,
      srcUrl: ''
    }
  },
  methods: {
    ...mapActions(['getReviewList', 'dealLevelUpApply']),
    async handleCurrentChange (val) {
      await this.goPage(val)
    },
    async goPage (page) {
      await this.getReviewList({
        page,
        limit: 7,
        conditions: {},
        sort: {createAt: -1}
      })
    },
    async search () {
      let conditions = {}
      // if (this.configForm.applyUserName) {
      //   conditions.applyUserName = this.configForm.applyUserName
      // }
      if (this.configForm.deel && this.configForm.deel !== '-1') {
        conditions.deel = parseInt(this.configForm.deel)
      }
      let result = await this.getReviewList({
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
    async editState (index, state) {
      let result = await this.dealLevelUpApply({
        id: this.reviewList[index].id,
        index,
        deel: state
      })
      console.log('11', this.reviewList[index].deel)
      if (result.data.code === 200) {
        return this.$message({
          showClose: true,
          type: 'success',
          message: '处理成功'
        })
      } else {
        return this.$message({
          showClose: true,
          type: 'error',
          message: result.data.error
        })
      }
    },
    showPhoto (index) {
      this.srcUrl = this.reviewList[index].screenshots
      this.showPhotoVisible = true
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
    .user-table {
      flex: 1;
      margin: 0 20px 10px 20px;
      height: 394px;
    }
    .user-bottom {
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
