<template>
  <div class='register'>
    <h2>注册</h2>
    <mt-field class="rsinput-box" type="tel" placeholder="手机号"></mt-field>
    <mt-field class="rsinput-box" placeholder="验证码">
      <mt-button @click="getIdentifyCode" type="primary" :disabled=closeBtn>
        获取
        <span v-if="closeBtn">({{rTime}}s)</span>
      </mt-button>
    </mt-field>
    <mt-button @click="goToConfig" class="register-btn" type="primary">注册</mt-button>
    <div class='bottom'>
      <span @click="goToLogin">直接登录</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      closeBtn: false,
      rTime: 5
    }
  },
  methods: {
    Timer () {
      if (this.rTime > 0) {
        this.rTime--
        setTimeout(this.Timer, 1000)
      } else {
        this.closeBtn = false
        this.rTime = 5
      }
    },
    getIdentifyCode () {
      this.closeBtn = true
      this.Timer()
    },
    goToConfig () {
      this.$router.push('/config')
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
