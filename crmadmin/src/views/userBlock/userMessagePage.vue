<template>
  <div class="contain">
    <div class="setting-config">
      <el-form :inline="true" :model="configForm" class="demo-form-inline">
        <el-form-item label="真实姓名">
          <el-input v-model="configForm.realName" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="configForm.region" placeholder="等级">
            <el-option label="黄金" value="2"></el-option>
            <el-option label="白金" value="3"></el-option>
            <el-option label="钻石" value="4"></el-option>
            <el-option label="执行董事" value="5"></el-option>
            <el-option label="企业合伙人" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="userList"
      style="width: 700px"
      height="50px"
      class="user-table"
      border
    >
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
        prop="profit"
        label="个人盈利">
      </el-table-column>
      <el-table-column
        prop="profit"
        label="直接上级">
      </el-table-column>
    </el-table>
    <div class="user-bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  async created () {
    await this.getUserList({
      page: 1,
      limit: 8,
      conditions: {},
      sort: {createAt: -1}
    })
    this.formatList()
  },
  computed: {
    ...mapGetters(['userList'])
  },
  data () {
    return {
      configForm: {
        realName: '',
        region: ''
      },
      currentPage: 1
    }
  },
  methods: {
    ...mapActions(['getUserList']),
    formatList () {
      let levelName = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
      for (let item of this.userList) {
        item.level = levelName[item.level - 1]
        item.createAt = moment(item.createAt).format('YYYY-MM-DD HH:mm')
      }
    },
    handleCurrentChange () {
      console.log('1')
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
