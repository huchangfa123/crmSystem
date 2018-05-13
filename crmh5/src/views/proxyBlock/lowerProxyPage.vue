<template>
  <div class="lowerProxy">
    <mt-header class="lowerProxyHead" title="下级代理">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="lowerLevel-list">
      <div class="lowerLevel-item" v-for="(item, index) in lowerLevelList" :key="index">
        <div class="item-head">
          <h3>用户名:{{item.realName}}</h3>
          <p>{{item.createAt}}</p>
        </div>
        <div class="item-content">
          <span>当前用户等级: {{item.level}}</span>
          <span>电话: {{item.phoneNumber}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'lowerProxyPage',
  computed: {
    ...mapGetters(['lowerLevelList', 'userData'])
  },
  async created () {
    let result = await this.getLowerLevelList({id: this.userData.id})
    console.log('result', result)
  },
  methods: {
    ...mapActions(['getLowerLevelList'])
  }
}
</script>
<style lang="scss">
.lowerProxy {
  display: flex;
  flex-direction: column;
  .lowerProxyHead{
    background-color: #ee3737;
    height: 60px;
    font-size: 18px;
  }
  .lowerLevel-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    .lowerLevel-item {
      height: 100px;
      padding: 10px;
      border-bottom: 1px solid #e3e3e3;
      .item-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        p {
          color: #9b9292;
          font-size: 15px;
        }
      }
      .item-content {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        span {
          color: #746e6e;
        }
      }
    }
  }
}
</style>
