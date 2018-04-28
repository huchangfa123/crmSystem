<template>
  <div class='login'>
    <h2>登录</h2>
    <mt-field class="logininput-box" placeholder="手机号"></mt-field>
    <mt-field class="logininput-box" placeholder="验证码">
      <mt-button @click="getIdentifyCode" type="primary" :disabled=closeBtn>
        获取
        <span v-if="closeBtn">({{rTime}}s)</span>
      </mt-button>
    </mt-field>
    <mt-button class="login-btn" type="primary">登录</mt-button>
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
    }
  }
}
</script>
<style lang='scss'>
  .login {
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
    .logininput-box {
      width: 90%;
    }
    .login-btn {
      width: 90%;
      margin-top: 10px;
    }
  }
</style>
