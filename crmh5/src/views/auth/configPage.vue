<template>
  <div class="config">
    <mt-header class="configHead" title="信息配置"></mt-header>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model="name"></mt-field>
    <mt-field label="身份证" placeholder="请输入身份证" v-model="idCard"></mt-field>
    <mt-field label="推荐人id" placeholder="请输入推荐人id" v-model="recommendId"></mt-field>
    <div class="bottom">
      <mt-button @click="submitData" class="button" type="primary">提交</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'configPage',
  data () {
    return {
      password: '',
      name: '',
      idCard: '',
      recommendId: ''
    }
  },
  methods: {
    submitData () {
    }
  }
}
</script>
<style lang="scss">
.config {
  display: flex;
  flex-direction: column;
  .configHead{
    background-color: #378ade;
    height: 60px;
    font-size: 18px;
  }
  .bottom {
    margin: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    .button {
      width: 80%;
      background-color: #378ade;
      font-size: 16px;
    }
  }
}
</style>
