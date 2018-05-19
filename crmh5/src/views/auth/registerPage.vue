<template>
  <div class='register'>
    <h2>注册</h2>
    <mt-field class="rsinput-box" placeholder="手机号" type="tel" v-model="phone"></mt-field>
    <mt-field class="rsinput-box" placeholder="密码" type="password" style="border-bottom: 1px solid rgb(139, 196, 240)" v-model="password"></mt-field>
    <mt-field class="rsinput-box" placeholder="真实姓名" v-model="name"></mt-field>
    <mt-field class="rsinput-box" placeholder="身份证" v-model="idCard"></mt-field>
    <mt-field class="rsinput-box" placeholder="推荐人id" v-model="recommendId"></mt-field>
    <mt-field class="rsinput-box" placeholder="验证码" v-model="code">
      <mt-button @click="getIdentifyCode" type="primary" :disabled=closeBtn>
        获取
        <span v-if="closeBtn">({{rTime}}s)</span>
      </mt-button>
    </mt-field>
    <mt-button @click="goToMain" class="register-btn" type="primary">注册</mt-button>
    <div class='bottom'>
      <span @click="goToLogin">直接登录</span>
    </div>
  </div>
</template>
<script>
import { checkPhone, checkName, checkidCard } from '../../utils/format'
import { Toast } from 'mint-ui'
import { mapActions } from 'vuex'
import api from '../../api/auth'

export default {
  created () {
    if (this.$route.query.recommendId) {
      this.recommendId = this.$route.query.recommendId
    }
  },
  data () {
    return {
      closeBtn: false,
      rTime: 60,
      phone: '',
      password: '',
      name: '',
      idCard: '',
      recommendId: '',
      numIsTrue: false,
      code: ''
    }
  },
  methods: {
    ...mapActions(['register', 'login']),
    checkData () {
      if (!(this.phone && this.password && this.name && this.idCard && this.recommendId)) {
        return Toast({
          message: '信息不能为空'
        })
      }
      if (checkPhone(this.phone)) {
        if (checkName(this.name)) {
          if (checkidCard(this.idCard)) {
            return 'success'
          } else {
            return Toast({
              message: '身份证有误'
            })
          }
        } else {
          return Toast({
            message: '名字有误'
          })
        }
      } else {
        Toast({
          message: '手机号错误'
        })
      }
    },
    Timer () {
      if (this.rTime > 0) {
        this.rTime--
        setTimeout(this.Timer, 1000)
      } else {
        this.closeBtn = false
        this.rTime = 60
      }
    },
    async getIdentifyCode () {
      if (!this.phone) {
        return Toast({
          message: '请先填手机号'
        })
      }
      if (!checkPhone(this.phone)) {
        return Toast({
          message: '手机号输入有误'
        })
      }
      let result = await api.getNumVcode({phone: this.phone})
      if (result.data.code !== 200) {
        return Toast({
          message: result.data.error
        })
      }
      this.closeBtn = true
      this.Timer()
    },
    async goToMain () {
      if (this.checkData() !== 'success') {
        return
      }
      let checkVcode = await api.checkVcode({
        phone: this.phone,
        code: this.code
      })
      if (checkVcode.data.code === 200) {
        this.numIsTrue = true
      }
      if (!this.numIsTrue) {
        return Toast({
          message: '验证码有误或为空'
        })
      }
      let result = await this.register({
        phoneNumber: this.phone,
        password: this.password,
        realName: this.name,
        idCard: this.idCard,
        recommendId: this.recommendId
      })
      if (result.data.code === 200) {
        let login = await this.login({
          phoneNumber: this.phone,
          password: this.password,
          target: 1
        })
        if (login.data.code === 200) {
          this.$router.push('/main')
        } else {
          Toast({
            message: login.data.error
          })
        }
      } else {
        Toast({
          message: result.data.error
        })
      }
    },
    goToLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang='scss'>
  .register {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #1e77ba;
    h2 {
      color: white;
      margin-bottom: 10px;
      font-size: 25px;
    }
    .rsinput-box {
      width: 90%;
    }
    .register-btn {
      width: 90%;
      margin-top: 10px;
    }
    .bottom {
      display: flex;
      span {
        position: absolute;
        color: white;
        margin-top: 10px;
        right: 20px;
      }
    }
  }
</style>
