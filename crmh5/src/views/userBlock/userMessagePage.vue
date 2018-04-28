<template>
  <div class="userMessage">
    <mt-header class="useMsgHead" title="用户信息">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="userhead-pic">
      <mt-palette-button content="+">
        <div class="my-icon-button"></div>
      </mt-palette-button>
    </div>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="userName"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="email" v-model="num"></mt-field>
    <mt-field label="用户上级" type="text" disabled v-model="boss"></mt-field>
    <div class="bottom">
      <mt-button class="button" type="primary">保存修改</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userMessagePage',
  data () {
    return {
      userName: '呜呜开',
      email: 'asdsad',
      num: '13546545454',
      boss: '开挂团队'
    }
  }
}
</script>
<style lang='scss'>
.userMessage {
  display: flex;
  flex-direction: column;
  .useMsgHead {
    background-color: green;
    height: 60px;
    font-size: 18px;
  }
  .userhead-pic {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    height: 100px;
    color: white;
    .mint-main-button {
      background-color: green;
    }
  }
  .bottom {
    margin: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    .button {
      background-color: green;
      font-size: 16px;
    }
  }
}
</style>
