<template>
  <div class="publicMessage">
    <mt-header class="publicMessageHead" title="公共资源">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content" v-if='this.publicMessage.length > 0'>
      <div>网盘：{{this.publicMessage[0].des}}</div>
      <div>账号：{{this.publicMessage[0].Link}}</div>
      <div>密码：{{this.publicMessage[0].pass}}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'publicMessagePage',
  computed: {
    ...mapGetters(['publicMessage'])
  },
  async created () {
    await this.getPublicMessage()
    console.log(this.publicMessage)
  },
  methods: {
    ...mapActions(['getPublicMessage'])
  }
}
</script>
<style lang="scss">
.publicMessage {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .publicMessageHead{
    background-color: green;
    height: 60px;
    font-size: 18px;
  }
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    height: 100%;
    width: 100%;
    div {
      font-size: 16px;
      text-align: left;
      width: 80%;
    }
  }
}
</style>
