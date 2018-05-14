<template>
  <div class="contain">
    <div class="form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="云盘地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="云盘密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="内容描述" prop="des">
          <el-input type="textarea" v-model="ruleForm.des"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      ruleForm: {
        address: '',
        password: '',
        des: '',
        id: ''
      },
      rules: {
        address: [ { required: true, message: '请输入地址', trigger: 'blur' } ],
        password: [ { required: true, message: '请输入密码', trigger: 'blur' } ],
        des: [ { required: true, message: '请输入描述', trigger: 'blur' } ]
      }
    }
  },
  computed: {
    ...mapGetters(['yunData'])
  },
  async created () {
    await this.getYunData()
    if (this.yunData.length !== 0) {
      this.ruleForm.address = this.yunData[0].Link
      this.ruleForm.password = this.yunData[0].pass
      this.ruleForm.des = this.yunData[0].des
      this.ruleForm.id = this.yunData[0].id
    }
  },
  methods: {
    ...mapActions(['getYunData', 'addYunData', 'editYunData']),
    submitForm () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          let result = {}
          if (this.yunData.length === 0) {
            result = await this.addYunData({
              des: this.ruleForm.des,
              Link: this.ruleForm.address,
              pass: this.ruleForm.password
            })
          } else {
            result = await this.editYunData({
              id: this.ruleForm.id,
              des: this.ruleForm.des,
              Link: this.ruleForm.address,
              pass: this.ruleForm.password
            })
          }
          if (result.data.code === 200) {
            return this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
          } else {
            return this.$message({
              showClose: true,
              message: '修改失败',
              type: 'warning'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
  .contain {
    width: 100%;
    height: 100%;
    overflow: auto;
    .form {
      margin: 20px;
      width: 400px;
      .el-input__inner {
        width: 200px;
      }
      .el-textarea__inner {
        width: 200px;
      }
    }
  }
</style>
