<template>
  <div class="message">
    <mt-header class="messageHead" title="系统信息">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">未读信息</mt-tab-item>
      <mt-tab-item id="2">全部信息</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item class="message-body" id="1">
        <div class="message-item" v-for="(item, index) in unreadList" :key="index">
          <div class="message-header">
            <h3>{{item.title}}</h3>
            <span>{{item.createAt}}</span>
          </div>
          <div class="message-content">{{item.message}}</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item class="message-body" id="2">
        <div class="message-item" v-for="(item, index) in messageList" :key="index">
          <div class="message-header">
            <h3>{{item.title}}</h3>
            <span>{{item.createAt}}</span>
          </div>
          <div class="message-content">{{item.message}}</div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'messagePage',
  computed: {
    ...mapGetters(['unreadList', 'messageList'])
  },
  data () {
    return {
      selected: '1'
    }
  },
  async created () {
    await this.getUnreadList()
    await this.getMessageList({page: 1, limit: 6})
    await this.cleanMess()
    this.formatData()
  },
  methods: {
    ...mapActions(['getMessageList', 'getUnreadList', 'cleanMess']),
    formatData () {
      for (let item of this.unreadList) {
        item.createAt = moment(item.createAt).format('MM-DD HH:mm')
      }
      for (let item of this.messageList) {
        item.createAt = moment(item.createAt).format('MM-DD HH:mm')
      }
    }
  }
}
</script>
<style lang="scss">
.message {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .messageHead{
    background-color: #378ade;
    height: 60px;
    min-height: 60px;
    font-size: 18px;
  }
  .mint-navbar {
    height: 46px;
    min-height: 46px;
  }
  .mint-tab-container {
    overflow: scroll;
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
</style>
