<template>
  <div class="contain">
    <div class="form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公告主题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input type="textarea" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from '../../api/normal'
export default {
  data () {
    return {
      ruleForm: {
        title: '',
        content: ''
      },
      rules: {
        title: [ { required: true, message: '请输入主题', trigger: 'blur' } ],
        content: [ { required: true, message: '请输入内容', trigger: 'blur' } ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          let result = await api.submitAnnouncement({
            title: this.ruleForm.title,
            message: this.ruleForm.content
          })
          if (result.data.code === 200) {
            this.ruleForm.title = ''
            this.ruleForm.content = ''
            return this.$message({
              showClose: true,
              message: '发布成功',
              type: 'success'
            })
          } else {
            return this.$message({
              showClose: true,
              message: '发布失败',
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
