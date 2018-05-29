<template>
  <div class='changePass'>
    <h2>改密码</h2>
    <mt-field class="rsinput-box" placeholder="新密码" type="password" style="border-bottom: 1px solid rgb(139, 196, 240)" v-model="password"></mt-field>
    <mt-field class="rsinput-box" placeholder="验证码" v-model="code">
      <mt-button @click="getIdentifyCode" type="primary" :disabled=closeBtn>
        获取
        <span v-if="closeBtn">({{rTime}}s)</span>
      </mt-button>
    </mt-field>
    <mt-button @click="goToLogin" class="changePass-btn" type="primary">确定</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { mapActions } from 'vuex'
import api from '../../api/auth'

export default {
  created () {
    if (this.$route.query.userPhone) {
      this.phone = this.$route.query.userPhone
    }
  },
  data () {
    return {
      closeBtn: false,
      rTime: 60,
      phone: '',
      password: '',
      code: ''
    }
  },
  methods: {
    ...mapActions(['changePass']),
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
      let result = await api.getNumVcode({phone: this.phone})
      if (result.data.code !== 200) {
        return Toast({
          message: result.data.error
        })
      }
      this.closeBtn = true
      this.Timer()
    },
    async goToLogin () {
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
      let result = await this.changePass({
        phoneNumber: this.phone,
        password: this.password,
        code: this.code
      })
      if (result.data.code === 200) {
        Toast({
          message: '修改成功'
        })
        this.$router.replace('/login')
      } else {
        return Toast({
          message: result.data.error
        })
      }
    }
  }
}
</script>
<style lang='scss'>
  .changePass {
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
    .changePass-btn {
      width: 90%;
      margin-top: 10px;
    }
  }
</style>
