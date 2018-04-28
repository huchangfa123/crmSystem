<template>
  <div class="cancelUpgrade">
    <mt-header class="cancelUpgradeHead" title="取消申请">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'cancelUpgradePage'
}
</script>
<style lang="scss">
.cancelUpgrade {
  display: flex;
  flex-direction: column;
  .cancelUpgradeHead{
    background-color: #ee3737;
    height: 60px;
    font-size: 18px;
  }
}
</style>
