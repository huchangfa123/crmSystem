<template>
  <div class="proxyBlock">
    <div class="proxy-head">
      <div class="lbar"></div>
      <span>代理管理</span>
    </div>
    <div class="proxy-choice-blank">
      <div class="row">
        <div @click="goToLowerProxyPage">
          <i class="iconfont proxyfont">&#xe604;</i>
          <span>我的下级</span>
        </div>
        <div @click="goToProxyStructurePage">
          <i class="iconfont proxyfont">&#xe672;</i>
          <span>下级团队结构</span>
        </div>
        <div @click="goToMyRecommendPage">
          <i class="iconfont proxyfont">&#xe630;</i>
          <span>我的推荐</span>
        </div>
      </div>
      <div class="row">
        <div @click="goToLevelUpPage">
          <i class="iconfont proxyfont">&#xe600;</i>
          <span>等级提升</span>
        </div>
        <div @click="goToReviewProxyPage">
          <i class="iconfont proxyfont">&#xe630;</i>
          <span>升级审核状态</span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToLowerProxyPage () {
      this.$router.replace({path: '/lowerProxy'})
    },
    goToProxyStructurePage () {
      this.$router.replace({path: '/proxyStructure'})
    },
    goToReviewProxyPage () {
      this.$router.replace({path: '/reviewProxy'})
    },
    goToMyRecommendPage () {
      this.$router.replace({path: '/myRecommend'})
    },
    goToLevelUpPage () {
      this.$router.replace({path: '/levelUp'})
    }
  }
}
</script>
<style lang='scss'>
  .proxyBlock {
    margin: 10px 0;
    .proxy-head {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      background-color: #e8dfdf;
      .lbar {
        height: 60%;
        width: 5px;
        background-color: #ee3737;
        margin: 0 8px;
        border-radius: 25%;
      }
    }
    .proxy-choice-blank {
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        flex-direction: row;
        height: 120px;
        width: 100%;
        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #e8dfdf;
          span {
            margin: 5px 0;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
