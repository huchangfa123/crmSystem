<template>
  <div class="myRecommend">
    <mt-header class="myRecommendHead" title="我的推荐">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="recommend-list">
      <div class="recommend-item" v-for="(item, index) in myRecommendList" :key="index">
        <div class="item-head">
          <h3>用户名:{{item.toUserName}}</h3>
          <p>{{item.createAt}}</p>
        </div>
        <div class="item-content">
          <span>当前用户等级:{{item.toUserLevel}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'myRecommendPage',
  computed: {
    ...mapGetters(['myRecommendList'])
  },
  async created () {
    let result = await this.getRecommendList()
    console.log('recommend', result)
  },
  methods: {
    ...mapActions(['getRecommendList'])
  }
}
</script>
<style lang="scss">
.myRecommend {
  display: flex;
  flex-direction: column;
  .myRecommendHead{
    background-color: #ee3737;
    height: 60px;
    font-size: 18px;
  }
  .recommend-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    .recommend-item {
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
        span {
          color: #746e6e;
        }
      }
    }
  }
}
</style>
