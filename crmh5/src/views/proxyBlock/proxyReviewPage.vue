<template>
  <div class="proxyReview">
    <mt-header class="proxyReviewHead" title="代理审核">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">审核授权</mt-tab-item>
      <mt-tab-item id="2">授权取消</mt-tab-item>
    </mt-navbar>
  </div>
</template>
<script>
export default {
  name: 'proxyReviewPage',
  data () {
    return {
      selected: 0
    }
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
}
</style>
