<template>
  <div class="contain">
    <el-form :model="userForm" :rules="rules" ref="ruleForm" label-width="120px" class="userForm">
      <el-form-item label="电话:" prop="phone">
        <el-input class="userInput" placeholder="电话" v-model="userForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input class="userInput" placeholder="密码" v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称:" prop="nickname">
        <el-input class="userInput" placeholder="昵称" v-model="userForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名:" prop="realName">
        <el-input class="userInput" placeholder="真实姓名" v-model="userForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="身份证18位:" prop="idCard">
        <el-input class="userInput" placeholder="身份证18位" v-model="userForm.idCard"></el-input>
      </el-form-item>
      <el-form-item label="等级:" prop="level">
        <el-select v-model="userForm.level" placeholder="黄金">
          <el-option label="黄金" value="6"></el-option>
          <el-option label="白金" value="5"></el-option>
          <el-option label="钻石" value="4"></el-option>
          <el-option label="执行董事" value="3"></el-option>
          <el-option label="企业合伙人" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级id:" prop="managerId">
        <el-input class="userInput" placeholder="上级id" v-model="userForm.managerId"></el-input>
      </el-form-item>
      <el-form-item label="是否为管理员:" prop="isManager">
        <el-select v-model="userForm.isManager" placeholder="否">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      userForm: {
        phone: '',
        password: '',
        nickname: '',
        realName: '',
        idCard: '',
        level: '6',
        managerId: '',
        isManager: '0'
      },
      rules: {
        phone: { required: true, message: '请输入电话', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
        realName: { required: true, message: '请输入真实姓名', trigger: 'blur' },
        idCard: { required: true, message: '请输入身份证', trigger: 'blur' },
        level: { required: true, message: '请输入等级', trigger: 'blur' },
        managerId: { required: true, message: '请输入上级id', trigger: 'blur' }
      }
    }
  },
  methods: {
    ...mapActions(['addUser']),
    onSubmit () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          let result = await this.addUser({
            phoneNumber: this.userForm.phone,
            password: this.userForm.password,
            nickname: this.userForm.nickname,
            realName: this.userForm.realName,
            idCard: this.userForm.idCard,
            level: parseInt(this.userForm.level),
            managerId: this.userForm.managerId,
            isManager: this.userForm.isManager === '1'
          })
          if (result.data.code === 200) {
            return this.$message({
              showClose: true,
              type: 'success',
              message: '添加成功'
            })
          } else {
            return this.$message({
              showClose: true,
              type: 'warning',
              message: result.data.error
            })
          }
        } else {
          return this.$message({
            showClose: true,
            message: '信息不能留空',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
  .contain {
    width: 100%;
    height: 80vh;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 56px;
    .userForm {
      height: 100%;
      .userInput {
        width: 300px;
        height: 50px;
      }
      .form-table {
        width: 200px;
        margin: 0 auto;
      }
    }
  }
</style>
