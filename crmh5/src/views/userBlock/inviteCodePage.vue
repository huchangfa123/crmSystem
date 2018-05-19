<template>
  <div class="inviteCode">
    <mt-header class="inviteCodeHead" title="邀请二维码">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="img-content">
      <img :src=userData.qrcode>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'inviteCodePage',
  computed: {
    ...mapGetters(['userData'])
  }
}
</script>
<style lang="scss">
.inviteCode {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .inviteCodeHead{
    background-color: green;
    height: 60px;
    font-size: 18px;
  }
  .img-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    img {
      width: 80%;
      height: auto;
    }
  }
}
</style>
