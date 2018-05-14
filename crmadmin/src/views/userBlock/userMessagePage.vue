<template>
  <div class="contain">
    <div class="setting-config">
      <el-form :inline="true" :model="configForm" class="demo-form-inline">
        <el-form-item label="真实姓名">
          <el-input v-model="configForm.realName" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="configForm.level" placeholder="无限制">
            <el-option label="黄金" value="6"></el-option>
            <el-option label="白金" value="5"></el-option>
            <el-option label="钻石" value="4"></el-option>
            <el-option label="执行董事" value="3"></el-option>
            <el-option label="企业合伙人" value="2"></el-option>
            <el-option label="无限制" value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="userList"
      style="width: 1000px"
      height="50px"
      class="user-table"
      border
    >
      <el-table-column
        prop="id"
        label="用户id"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级">
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="注册时间"
        min-width="140px"
      >
      </el-table-column>
      <el-table-column
        prop="isManager"
        label="是否为管理员">
      </el-table-column>
      <el-table-column
        prop="profit"
        label="直接上级">
        <template slot-scope="scope">
          <el-button @click="showBoss(scope.$index)" type="text" size="mini">查看</el-button>
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
        :total="listCount">
      </el-pagination>
    </div>
    <el-dialog title="上级信息" :visible.sync="bossVisible">
      <el-form :model="bossForm" label-width="80px">
        <el-form-item label="上级id:">
          <el-input v-model="bossForm.id"></el-input>
        </el-form-item>
        <el-form-item label="上级姓名:">
          <el-input :disabled="true" v-model="bossForm.managerName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveBoss">保存修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  async created () {
    await this.goPage(this.currentPage)
  },
  computed: {
    ...mapGetters(['userList', 'listCount'])
  },
  data () {
    return {
      configForm: {
        realName: '',
        level: ''
      },
      bossForm: {
        id: '',
        managerName: ''
      },
      currentPage: 1,
      bossVisible: false,
      selectItem: ''
    }
  },
  methods: {
    ...mapActions(['getUserList', 'editBoss']),
    formatList () {
      let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
      for (let item of this.userList) {
        item.level = levelName[item.level - 1] || '未激活'
        item.createAt = moment(item.createAt).format('YYYY-MM-DD HH:mm')
        item.isManager = item.isManager ? '是' : '否'
      }
    },
    async handleCurrentChange (val) {
      await this.goPage(val)
    },
    async goPage (page) {
      await this.getUserList({
        page,
        limit: 7,
        conditions: {},
        sort: {createAt: -1}
      })
      this.formatList()
      console.log('userList', this.userList)
    },
    async search () {
      let conditions = {}
      if (this.configForm.realName) {
        conditions.realName = this.configForm.realName
      }
      if (this.configForm.level && this.configForm.level !== -1) {
        conditions.level = parseInt(this.configForm.level)
      }
      let result = await this.getUserList({
        page: 1,
        limit: 7,
        conditions,
        sort: {createAt: -1}
      })
      if (result.data.code === 200) {
        this.formatList()
      } else {
        return this.$message({
          showClose: true,
          message: '查询信息有误',
          type: 'warning'
        })
      }
    },
    showBoss (index) {
      this.bossForm.id = this.userList[index].managerId
      this.bossForm.managerName = this.userList[index].managerName
      this.selectItem = index
      this.bossVisible = true
    },
    async saveBoss () {
      let result = await this.editBoss({
        userId: this.userList[this.selectItem].id,
        managerId: this.bossForm.id,
        index: this.selectItem
      })
      this.bossVisible = false
      if (result.data.code === 200) {
        return this.$message({
          showClose: true,
          type: 'success',
          message: '修改成功'
        })
      }
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
  }
</style>
