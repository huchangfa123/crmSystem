<template>
  <div class="header">
    <div class="userPic">
      <img :src="this.userData.avatar">
    </div>
    <div class="userMsg">
      <p><span style="font-size: 16px">{{this.userData.realName}}</span>[{{this.userData.agent}}]</p>
      <p style="margin-top: 10px;">上级名:{{this.userData.manager}}</p>
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
      height: 100px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      color: black;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
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
