<template>
  <div class="header">
    <div class="userPic">1</div>
    <div class="userMsg">
      <p><span style="font-size: 16px">{{this.userData.realName}}</span>[{{this.userData.agent}}]</p>
      <p style="margin-top: 10px;">上级:呜呜开</p>
      <p>团队:开挂团队</p>
      <router-link style="color: white; margin-top:5px;" to="message">系统信息({{this.userData.messageUnRead}})</router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'header',
  computed: {
    ...mapGetters(['userData'])
  }
}
</script>
<style lang='scss'>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 200px;
    width: 100%;
    background-color: #665b5b;
    .userPic {
      border-radius: 50%;
      height: 70px;
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      color: black;
    }
    .userMsg {
      font-size: 14px;
      color: white;
      font-weight: 700;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
    }
  }
</style>
