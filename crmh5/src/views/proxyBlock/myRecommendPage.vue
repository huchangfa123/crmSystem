<template>
  <div class="myRecommend">
    <mt-header class="myRecommendHead" title="我的推荐">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'myRecommendPage'
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
}
</style>
