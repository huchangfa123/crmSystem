<template>
  <div class="proxyReview">
    <mt-header class="proxyReviewHead" title="升级审核状态">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">我的升级</mt-tab-item>
      <mt-tab-item id="2">下级升级</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="item-body">
          <div class="message-item" v-for="(item, index) in myUpgraderList" :key="index">
            <div class="message-header">
              <h3>申请等级: {{item.applyLevel}}</h3>
              <span>{{item.createAt}}</span>
            </div>
            <div class="message-content">审核状态: {{item.deel}}</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="item-body">
          <div class="message-item" v-for="(item, index) in otherUpgradeList" :key="index">
            <div class="message-header">
              <h3>申请等级: {{item.applyLevel}}</h3>
              <span>{{item.createAt}}</span>
            </div>
            <div class="message-content">审核状态: {{item.deel}}</div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'proxyReviewPage',
  computed: {
    ...mapGetters(['myUpgraderList', 'otherUpgradeList'])
  },
  data () {
    return {
      selected: '1'
    }
  },
  async created () {
    await this.getMyUpgradeList()
    await this.getOtherUpgradeList()
  },
  methods: {
    ...mapActions(['getMyUpgradeList', 'getOtherUpgradeList'])
  }
}
</script>
<style lang="scss">
.proxyReview {
  display: flex;
  flex-direction: column;
  .proxyReviewHead {
    background-color: #ee3737;
    height: 60px;
    font-size: 18px;
  }
  .mint-tab-item-label {
    font-size: 16px;
  }
  .mint-tab-container {
    overflow: scroll;
    .item-body {
      width: 100%;
      height: 100%;
      .message-item {
        height: 80px;
        min-height: 80px;
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #e3e3e3;
        .message-header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 20px;
          span {
            margin-right: 30px;
            color: #8a7f7f
          }
        }
        .message-content {
          margin-top: 10px;
          width: 92%;
          flex: 1;
          overflow: hidden;
          font-size: 14px;
          word-break: break-all;
          color: #817878;
        }
      }
    }
  }
}
</style>
